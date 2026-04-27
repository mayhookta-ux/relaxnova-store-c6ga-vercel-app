import { corsHeaders } from "npm:@supabase/supabase-js/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const product = {
  id: "cj-smart-posture-corrector",
  name: "Smart Posture Corrector",
  amount: 3499,
  sku: "CJJT100662701AZ",
  cjProductId: "1357500854936145920",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const supabase = () => createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const cleanText = (value: unknown, max = 160) => typeof value === "string" ? value.trim().slice(0, max) : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json();
    const quantity = Number(body.quantity || 1);
    const customerEmail = cleanText(body.customerEmail, 255).toLowerCase();
    const customerName = cleanText(body.customerName);
    const line1 = cleanText(body.addressLine1, 180);
    const city = cleanText(body.city, 100);
    const state = cleanText(body.state, 80).toUpperCase();
    const postalCode = cleanText(body.postalCode, 24);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error("Select a valid quantity");
    if (!emailPattern.test(customerEmail)) throw new Error("Enter a valid email address");
    if (!customerName || !line1 || !city || !state || !postalCode) throw new Error("Complete the shipping details to place a manual order");

    const subtotal = product.amount * quantity;
    const shipping = subtotal >= 25000 ? 0 : 1200;
    const orderNumber = `MANUAL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const db = supabase();

    const { data: order, error: orderError } = await db.from("orders").insert({
      order_number: orderNumber,
      customer_email: customerEmail,
      customer_name: customerName,
      status: "manual_review",
      payment_status: "manual_pending",
      fulfillment_status: "manual_order_received",
      cj_status: "manual_ready_for_review",
      currency: "usd",
      subtotal_amount: subtotal,
      shipping_amount: shipping,
      total_amount: subtotal + shipping,
      shipping_address: { line1, city, state, postal_code: postalCode, country: "US" },
      metadata: { source: "manual_checkout_fallback", fulfillmentPartner: "cj_dropshipping", paymentFollowUpRequired: true },
    }).select("id").single();
    if (orderError || !order) throw new Error("Could not place the manual order");

    await db.from("order_items").insert({
      order_id: order.id,
      product_id: product.id,
      product_name: product.name,
      sku: product.sku,
      quantity,
      unit_amount: product.amount,
      total_amount: subtotal,
      fulfillment_provider: "cj_dropshipping",
      cj_product_id: product.cjProductId,
      metadata: { manualCheckoutFallback: true },
    });

    await db.from("store_notifications").insert({
      type: "manual_order",
      title: "Manual checkout order received",
      message: `Smart Posture Corrector order ${orderNumber} was placed through the temporary manual checkout fallback.`,
      order_id: order.id,
      metadata: { orderNumber, totalAmount: subtotal + shipping, currency: "usd", paymentStatus: "manual_pending" },
    });

    return new Response(JSON.stringify({ orderId: order.id, orderNumber }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Manual order could not be placed";
    return new Response(JSON.stringify({ error: message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});