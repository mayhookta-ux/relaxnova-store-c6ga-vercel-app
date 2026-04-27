import { corsHeaders } from "npm:@supabase/supabase-js/cors";

type SupportMessage = { role: "user" | "assistant"; content: string };

const fallbackAnswer = "For that, please visit our Contact Us page and our support team will help within 1–3 business days.";

function localAnswer(question: string) {
  const q = question.toLowerCase();
  if (/ship|delivery|tracking|arrive|carrier/.test(q)) return "US delivery is typically 8–23 days after processing, with tracking when available. Carrier delays can happen, but we’ll help review updates.";
  if (/refund|return|exchange|money back|cancel/.test(q)) return "Eligible orders can be reviewed within 30 days after delivery. Items should be complete, clean, undamaged, and approved before being sent back.";
  if (/pay|payment|stripe|card|checkout|safe|secure/.test(q)) return "Checkout is securely processed through Stripe with encrypted card handling. We do not store full card details on the storefront.";
  if (/use|wear|how|posture|vibration|charge|strap|fit/.test(q)) return "Wear it on the upper back with the strap adjusted comfortably. It gives gentle vibration reminders when posture shifts so you can reset naturally.";
  if (/order|email|support|wrong|damaged|defective|where/.test(q)) return "For order help, please include your order number, checkout email, shipping ZIP code, and photos if there is a product or package issue.";
  return "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { messages } = await req.json() as { messages?: SupportMessage[] };
    const cleanMessages = Array.isArray(messages) ? messages.filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string").slice(-6) : [];
    const latest = [...cleanMessages].reverse().find((m) => m.role === "user")?.content?.trim().slice(0, 500) || "";
    if (!latest) throw new Error("Please enter a question.");

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
          { role: "system", content: "You are a premium US ecommerce support agent for a Smart Posture Corrector storefront. Answer only buyer support questions about shipping, refunds, payment safety, product usage, and order support. Keep replies under 45 words, trustworthy, sales-friendly, and legally cautious. If unknown or outside scope, direct the customer to the Contact Us page." },
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