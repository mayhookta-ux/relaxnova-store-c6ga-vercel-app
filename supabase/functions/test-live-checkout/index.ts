import { corsHeaders } from "npm:@supabase/supabase-js/cors";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const product = {
  id: "cj-smart-posture-corrector",
  name: "Smart Posture Corrector",
  amount: 3900,
  sku: "CJJT100662701AZ",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanReturnUrl(value: unknown) {
  if (typeof value !== "string" || value.length > 500) return undefined;
  try {
    const url = new URL(value);
    const allowedHosts = new Set(["relaxnova-store-c6ga-vercel-app.lovable.app", "id-preview--a0483a19-e2aa-4d4e-af72-989c0ed6541b.lovable.app"]);
    const isLocalDev = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !isLocalDev) return undefined;
    if (!allowedHosts.has(url.hostname) && !url.hostname.endsWith(".lovable.app") && !url.hostname.endsWith(".lovableproject.com") && !isLocalDev) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json();
    const quantity = Number(body.quantity || 1);
    const customerEmail = typeof body.customerEmail === "string" && emailPattern.test(body.customerEmail.trim()) ? body.customerEmail.trim() : undefined;
    const returnUrl = cleanReturnUrl(body.returnUrl);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error("Select a valid quantity");
    if (!returnUrl) throw new Error("A secure return URL is required");

    const env: StripeEnv = "live";
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      return_url: returnUrl,
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU", "NZ", "IE", "FR", "DE", "NL", "SE", "DK", "NO", "FI", "ES", "IT", "PT", "BE", "CH", "AT"] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      line_items: [{
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.amount,
          product_data: { name: product.name, metadata: { productId: product.id, sku: product.sku, liveCheckoutTest: "true" } },
        },
      }],
      metadata: { productId: product.id, sku: product.sku, source: "live_checkout_test" },
      payment_intent_data: { metadata: { productId: product.id, sku: product.sku, source: "live_checkout_test" } },
    });

    return new Response(JSON.stringify({ ok: true, sessionId: session.id, clientSecret: session.client_secret, clientSecretCreated: Boolean(session.client_secret), productName: product.name, amount: "$39.00 USD", environment: env }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Live checkout test failed", error);
    return new Response(JSON.stringify({ ok: false, error: "Live checkout test could not be started", environment: "live" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});