import { corsHeaders } from "npm:@supabase/supabase-js/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const products = {
  "luminara-led-mask": { name: "Caldria Light Ritual Mask", amount: 32900, sku: "ELY-CALDRIA-MASK", cjProductId: null, cjVariantId: null },
  "seren-neck-massager": { name: "Seren Portable Neck Massager", amount: 11900, sku: "ELY-SEREN-NECK", cjProductId: null, cjVariantId: null },
  "aurelia-repair-serum": { name: "Liora Cushion Serum", amount: 9200, sku: "ELY-LIORA-SERUM", cjProductId: null, cjVariantId: null },
  "celeste-sonic-brush": { name: "Veyra Sonic Prep Wand", amount: 12800, sku: "ELY-VEYRA-WAND", cjProductId: null, cjVariantId: null },
  "roselle-sculpt-roller": { name: "Nerelle Cooling Sculpt Roller", amount: 6800, sku: "ELY-NERELLE-ROLLER", cjProductId: null, cjVariantId: null },
} as const;

type ProductId = keyof typeof products;
type CheckoutItem = { productId: string; quantity: number };

const supabase = () => createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanItems(items: unknown): Array<{ productId: ProductId; quantity: number }> {
  if (!Array.isArray(items) || items.length < 1 || items.length > 10) throw new Error("Add at least one valid item before checkout");
  return items.map((item: CheckoutItem) => {
    if (!item || typeof item.productId !== "string" || !(item.productId in products)) throw new Error("Checkout contains an unavailable product");
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error("Checkout quantity is not valid");
    return { productId: item.productId as ProductId, quantity };
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json();
    const env: StripeEnv = body.environment === "live" ? "live" : "sandbox";
    const items = cleanItems(body.items);
    const customerEmail = typeof body.customerEmail === "string" && emailPattern.test(body.customerEmail.trim()) ? body.customerEmail.trim() : undefined;
    const returnUrl = typeof body.returnUrl === "string" && body.returnUrl.startsWith("http") && body.returnUrl.length <= 500 ? body.returnUrl : undefined;
    if (!returnUrl) throw new Error("A secure return URL is required");

    const subtotal = items.reduce((sum, item) => sum + products[item.productId].amount * item.quantity, 0);
    const shipping = subtotal >= 25000 ? 0 : 1200;
    const orderNumber = `EM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const db = supabase();
    const { data: order, error: orderError } = await db.from("orders").insert({
      order_number: orderNumber,
      customer_email: customerEmail || "pending-customer@elyramaison.local",
      status: "pending",
      payment_status: "unpaid",
      fulfillment_status: "not_submitted",
      currency: "usd",
      subtotal_amount: subtotal,
      shipping_amount: shipping,
      total_amount: subtotal + shipping,
      metadata: { source: "embedded_checkout", environment: env, fulfillmentPartner: "cj_dropshipping" },
    }).select("id").single();
    if (orderError || !order) throw new Error("Could not prepare order");

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: products[item.productId].name,
      sku: products[item.productId].sku,
      quantity: item.quantity,
      unit_amount: products[item.productId].amount,
      total_amount: products[item.productId].amount * item.quantity,
      fulfillment_provider: "cj_dropshipping",
      cj_product_id: products[item.productId].cjProductId,
      cj_variant_id: products[item.productId].cjVariantId,
      metadata: { cjReady: true },
    }));
    const { error: itemsError } = await db.from("order_items").insert(orderItems);
    if (itemsError) throw new Error("Could not prepare order items");

    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      return_url: returnUrl,
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU", "NZ", "IE", "FR", "DE", "NL", "SE", "DK", "NO", "FI", "ES", "IT", "PT", "BE", "CH", "AT"] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: products[item.productId].amount,
          product_data: { name: products[item.productId].name, metadata: { productId: item.productId, sku: products[item.productId].sku } },
        },
      })).concat(shipping > 0 ? [{ quantity: 1, price_data: { currency: "usd", unit_amount: shipping, product_data: { name: "Tracked delivery", metadata: { productId: "shipping", sku: "ELY-SHIP" } } } }] : []),
      metadata: { orderId: order.id, orderNumber, fulfillmentPartner: "cj_dropshipping" },
      payment_intent_data: { metadata: { orderId: order.id, orderNumber, fulfillmentPartner: "cj_dropshipping" } },
    });

    await db.from("orders").update({ stripe_checkout_session_id: session.id }).eq("id", order.id);

    return new Response(JSON.stringify({ clientSecret: session.client_secret, orderId: order.id, orderNumber }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout could not be started";
    return new Response(JSON.stringify({ error: message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
