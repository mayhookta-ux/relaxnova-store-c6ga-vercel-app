import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";
import { submitOrderToCj } from "../_shared/cj.ts";

const supabase = () => createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

function normalizeAddress(address: any) {
  if (!address) return null;
  return {
    line1: address.line1 || null,
    line2: address.line2 || null,
    city: address.city || null,
    state: address.state || null,
    postal_code: address.postal_code || null,
    country: address.country || null,
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid environment" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  const env: StripeEnv = rawEnv;
  const db = supabase();

  try {
    const event = await verifyWebhook(req, env);

    if (event.id) {
      const { data: existing } = await db.from("checkout_events").select("id").eq("stripe_event_id", event.id).maybeSingle();
      if (existing) return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const object = event.data.object;
    let orderId = object?.metadata?.orderId || null;

    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const customerDetails = object.customer_details || {};
      const shippingDetails = object.shipping_details || {};
      const update = {
        customer_email: customerDetails.email || object.customer_email || "pending-customer@elyramaison.local",
        customer_name: customerDetails.name || shippingDetails.name || null,
        phone: customerDetails.phone || null,
        status: "confirmed",
        payment_status: "paid",
        fulfillment_status: "ready_for_cj",
        cj_status: "ready_for_fulfillment_export",
        stripe_payment_intent_id: typeof object.payment_intent === "string" ? object.payment_intent : null,
        subtotal_amount: object.amount_subtotal || 0,
        tax_amount: object.total_details?.amount_tax || 0,
        total_amount: object.amount_total || 0,
        shipping_address: normalizeAddress(shippingDetails.address),
        billing_address: normalizeAddress(customerDetails.address),
        confirmed_at: new Date().toISOString(),
        metadata: {
          source: "payments_webhook",
          environment: env,
          fulfillmentPartner: "cj_dropshipping",
          checkoutSessionId: object.id,
          paymentMethodSupport: ["Visa", "Mastercard", "Apple Pay", "Google Pay"],
        },
      };

      if (orderId) {
        await db.from("orders").update(update).eq("id", orderId);
      } else if (object.id) {
        const { data: order } = await db.from("orders").update(update).eq("stripe_checkout_session_id", object.id).select("id").maybeSingle();
        orderId = order?.id || null;
      }

      if (orderId) {
        const { data: order } = await db.from("orders").select("id, order_number, customer_email, customer_name, phone, shipping_address").eq("id", orderId).single();
        const { data: items } = await db.from("order_items").select("id, quantity, cj_variant_id").eq("order_id", orderId);

        let cjResult = null;
        let cjStatus = "submitted_to_cj";
        let fulfillmentStatus = "submitted_to_cj";
        try {
          cjResult = await submitOrderToCj({
            orderId,
            orderNumber: order?.order_number || object.metadata?.orderNumber || orderId,
            customerEmail: order?.customer_email || customerDetails.email || object.customer_email,
            customerName: order?.customer_name || customerDetails.name || shippingDetails.name,
            phone: order?.phone || customerDetails.phone,
            shippingAddress: order?.shipping_address || normalizeAddress(shippingDetails.address),
            items: items || [],
          });
        } catch (cjError) {
          cjStatus = "cj_sync_failed";
          fulfillmentStatus = "issue";
          console.error("CJ fulfillment sync failed", cjError);
          cjResult = { error: cjError instanceof Error ? cjError.message : "CJ fulfillment sync failed" };
        }

        await db.from("orders").update({
          fulfillment_status: fulfillmentStatus,
          cj_status: cjStatus,
          metadata: {
            source: "payments_webhook",
            environment: env,
            fulfillmentPartner: "cj_dropshipping",
            checkoutSessionId: object.id,
            paymentMethodSupport: ["Visa", "Mastercard", "Apple Pay", "Google Pay"],
            cjSyncResult: cjResult,
          },
        }).eq("id", orderId);

        await db.from("store_notifications").insert({
          type: cjStatus === "submitted_to_cj" ? "cj_order_submitted" : "cj_order_issue",
          title: cjStatus === "submitted_to_cj" ? "Paid order synced to CJ" : "CJ fulfillment sync needs review",
          message: cjStatus === "submitted_to_cj" ? `Smart Posture Corrector order ${object.metadata?.orderNumber || orderId} was paid and submitted to CJ Dropshipping.` : `Smart Posture Corrector order ${object.metadata?.orderNumber || orderId} was paid, but CJ sync needs review.`,
          order_id: orderId,
          metadata: {
            environment: env,
            checkoutSessionId: object.id,
            orderNumber: object.metadata?.orderNumber || null,
            totalAmount: object.amount_total || 0,
            currency: object.currency || "usd",
            fulfillmentPartner: "cj_dropshipping",
            cjStatus,
          },
        });
      }
    }

    if (event.type === "checkout.session.async_payment_failed" || event.type === "transaction.payment_failed") {
      if (orderId) await db.from("orders").update({ payment_status: "failed", status: "pending" }).eq("id", orderId);
    }

    if (event.id) {
      await db.from("checkout_events").insert({ stripe_event_id: event.id, event_type: event.type, order_id: orderId, payload: object || {} });
    }

    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Payment webhook error", error);
    return new Response("Webhook error", { status: 400 });
  }
});
