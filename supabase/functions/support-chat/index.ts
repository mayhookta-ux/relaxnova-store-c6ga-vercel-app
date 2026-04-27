import { corsHeaders } from "npm:@supabase/supabase-js/cors";

type SupportMessage = { role: "user" | "assistant"; content: string };

const fallbackAnswer = "I don’t want to guess on that. Please visit our Contact Us page and our support team will help within 1–3 business days.";
const storeContext = `Store context only: Smart Posture Corrector, black adjustable upper-back posture trainer with gentle vibration reminders, LED reminder counter, adjustable strap, daily posture-awareness support. It supports better posture habits and comfort awareness, but is not medical treatment. Price offer is $39 with Free US Shipping included. US processing is usually 1–3 business days, sometimes up to 5 during delays. US delivery is typically 8–23 calendar days after processing. Orders may be fulfilled through CJ Dropshipping and logistics partners, so tracking can take 3–7 days to update after label/logistics creation. Checkout is securely processed by Stripe; the storefront does not store full card numbers. Eligible return requests may be reviewed within 30 days after confirmed delivery. Returns require written approval first and items should be complete, clean, undamaged, safely packed, and include parts/accessories. Damaged, defective, or wrong item claims should be reported within 7 days with photos/video. Carrier delays, wrong addresses, refused packages, heavy use, missing parts, misuse, or policy abuse may not qualify for refund.`;

function localAnswer(question: string) {
  const q = question.toLowerCase();
  if (/free shipping|shipping free|ship fee|delivery fee/.test(q)) return "Yes — Free US Shipping is included in today’s $39 offer, so there’s no separate shipping fee added for US buyers.";
  if (/ship|delivery|tracking|arrive|carrier|cj|fulfill/.test(q)) return "Most US orders process in 1–3 business days, then delivery is typically 8–23 days. CJ fulfillment and carrier handoffs can make tracking take a few days to update.";
  if (/refund|return|exchange|money back|cancel/.test(q)) return "Eligible orders can be reviewed within 30 days after delivery. Please contact us first—items should be complete, clean, undamaged, and approved before return shipping.";
  if (/pay|payment|stripe|card|checkout|safe|secure|trust/.test(q)) return "Yes, checkout is secure. Payments are processed through Stripe with encrypted card handling, and we don’t store full card details on the storefront.";
  if (/benefit|pain|neck|back|comfort|slouch|hunch|posture/.test(q)) return "It’s designed to help you notice slouching and build better posture habits with gentle reminders. It may support daily comfort, but it isn’t medical treatment.";
  if (/use|wear|how|vibration|charge|strap|fit|adjust/.test(q)) return "Wear it on the upper back and adjust the strap so it feels secure but comfortable. When your posture shifts, it gives a gentle vibration reminder to reset.";
  if (/order|email|support|wrong|damaged|defective|where/.test(q)) return "For order help, send your order number, checkout email, shipping ZIP code, and photos if there’s a product or package issue. We’ll review it carefully.";
  return "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { messages } = await req.json() as { messages?: SupportMessage[] };
    const cleanMessages = Array.isArray(messages) ? messages.filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string").slice(-6) : [];
    const latest = [...cleanMessages].reverse().find((m) => m.role === "user")?.content?.trim().slice(0, 500) || "";
    if (!latest || latest.length > 500) return new Response(JSON.stringify({ answer: "Please send a short store-related question and I’ll help." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const instant = localAnswer(latest);
    if (instant) return new Response(JSON.stringify({ answer: instant }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return new Response(JSON.stringify({ answer: fallbackAnswer }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: `You are a real human-style premium US ecommerce support assistant. Use ONLY this store context and do not invent facts: ${storeContext}\nReply warmly, naturally, professionally, and under 45 words. Be conversion-friendly and trust-building. Answer only product usage, posture benefits, shipping, free shipping, refunds, Stripe payment safety, order process, tracking, CJ fulfillment timing, and checkout trust questions. For anything outside this context, politely direct the customer to the Contact Us page. Never make medical guarantees.` },
          ...cleanMessages,
          { role: "user", content: latest }
        ],
        max_tokens: 90
      })
    });

    if (!aiResponse.ok) return new Response(JSON.stringify({ answer: fallbackAnswer }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const data = await aiResponse.json();
    const answer = String(data.choices?.[0]?.message?.content || fallbackAnswer).trim().slice(0, 420);
    return new Response(JSON.stringify({ answer: answer || fallbackAnswer }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : fallbackAnswer;
    return new Response(JSON.stringify({ answer: message || fallbackAnswer }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});