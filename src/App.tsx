import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, LockKeyhole, Mail, MapPin, MessageCircle, PackageCheck, RotateCcw, Send, ShieldCheck, Truck, X } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { StripeEmbeddedCheckout } from "./components/StripeEmbeddedCheckout";
import { mainProduct, products } from "./data/products";
import { supabase } from "./integrations/supabase/client";
import galleryDetail from "./assets/cj-exact-detail-1.jpg";
import galleryHumanWorn from "./assets/cj-exact-lifestyle-1.jpg";
import galleryLifestyle from "./assets/cj-exact-lifestyle-2.jpg";
import galleryProductAngle from "./assets/cj-exact-angle.jpg";
import galleryProductFront from "./assets/cj-exact-front.jpg";

type Cart = Record<string, number>;

const benefits = [
  ["Neck comfort support", "Gentle vibration cues help you notice forward-head posture during long laptop sessions."],
  ["Posture correction habit", "Smart sensing reminds you to reset your shoulders before slouching becomes automatic."],
  ["Daily comfort fit", "The lightweight adjustable strap is built for short, consistent daily wear."],
  ["Visible progress", "The LED counter helps track how often you correct posture throughout the day."]
];

const reviews = [
  { name: "Emily R.", location: "Austin, TX", rating: "★★★★★", label: "Verified buyer", photo: "ER", quote: "I wear it during long work calls and it catches my slouch before my neck gets tight. Simple, comfortable, and actually useful." },
  { name: "Michael T.", location: "Columbus, OH", rating: "★★★★★", label: "Verified buyer", photo: "MT", quote: "Driving and desk work were making my upper back feel tense. The reminders help me sit taller without thinking about it all day." },
  { name: "Lauren B.", location: "Phoenix, AZ", rating: "★★★★★", label: "Verified buyer", photo: "LB", quote: "Lightweight enough for daily use and the vibration is gentle, not annoying. Checkout was easy and free shipping was included." }
];

const faqs = [
  ["Is US shipping really free?", "Yes. The final price is $39 with Free US Shipping included, so checkout does not add a separate shipping fee."],
  ["How does the posture corrector work?", "It senses posture changes and sends a gentle vibration cue when you slouch, helping you build a more upright daily habit."],
  ["Can it help neck comfort?", "It is designed to support posture awareness and daily comfort habits. It is not medical treatment and does not diagnose, treat, or cure pain or health conditions."],
  ["What is included?", "Package content: 1 Smart Posture Corrector with adjustable strap and LED reminder counter."],
  ["How long is delivery to the United States?", "Estimated US delivery is 8–23 days with tracking once fulfilled."],
  ["Can I request a return review?", "Eligible orders may be reviewed within the 30-day satisfaction window when return instructions are followed and the item is complete, clean, undamaged, and safely packed."]
];

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Google Pay"];

const galleryImages = [
  { src: galleryProductFront, title: "RelaxNova Smart Posture Corrector", width: 1200, height: 1200 },
  { src: galleryProductAngle, title: "Angled product view", width: 1200, height: 1200 },
  { src: galleryDetail, title: "Close-up detail", width: 1200, height: 1200 },
  { src: galleryHumanWorn, title: "Worn fit view", width: 800, height: 800 },
  { src: galleryLifestyle, title: "Daily use view", width: 1200, height: 1200 }
];

type LegalPageKey = "privacy-policy" | "refund-policy" | "terms-of-service" | "shipping-policy" | "contact-us";

const businessInfo = {
  storeName: "RelaxNova",
  legalName: "RelaxNova",
  email: "relaxnova.store.support@gmail.com",
  location: "Pennsylvania 17013, USA",
  updated: "April 27, 2026"
};

const legalPages: Record<LegalPageKey, { title: string; intro: string; sections: { heading: string; body: string[] }[] }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "This Privacy Policy explains how RelaxNova collects, uses, protects, and shares customer information for Smart Posture Corrector orders.",
    sections: [
      { heading: "Information we collect", body: ["We may collect your name, email address, shipping address, billing details, order history, support messages, device information, IP address, browser data, and checkout activity needed to operate the store.", "Payment card details are processed by Stripe. We do not intentionally store full card numbers, CVV codes, or complete payment credentials on our storefront systems."] },
      { heading: "How we use information", body: ["We use customer information to process orders, collect payment, arrange fulfillment through CJ Dropshipping, provide tracking, respond to support requests, prevent fraud, improve the store, comply with legal obligations, and maintain accurate business records.", "We may use order and browsing data to measure site performance, understand conversion activity, and improve the customer experience."] },
      { heading: "Cookies and analytics", body: ["Our store may use cookies, pixels, session storage, analytics tools, and similar technologies to keep the cart working, measure traffic, detect errors, prevent abuse, and understand how visitors interact with our pages.", "You can control cookies through your browser settings, but disabling them may affect checkout, cart behavior, fraud screening, or store functionality."] },
      { heading: "Payment processing disclosure", body: ["Payments are securely processed by Stripe and eligible wallet/payment providers. Stripe may collect and process payment, device, fraud-prevention, and transaction information under its own legal and privacy terms.", "By completing checkout, you authorize Stripe and our store to process the payment amount shown at checkout, including any applicable taxes, shipping, or adjustments disclosed before purchase."] },
      { heading: "Fulfillment and service providers", body: ["We share only the information reasonably necessary for fulfillment with CJ Dropshipping and related logistics providers, including customer name, delivery address, order item, quantity, and tracking details.", "We may also share information with email, analytics, fraud-prevention, hosting, customer support, legal, accounting, and compliance service providers who help us operate the business."] },
      { heading: "Data protection and retention", body: ["We use reasonable administrative, technical, and organizational safeguards designed to protect customer information from unauthorized access, misuse, alteration, or disclosure.", "No online system can be guaranteed completely secure. We retain business records for as long as reasonably needed for order support, tax, accounting, fraud prevention, dispute handling, and legal compliance."] },
      { heading: "Your privacy choices", body: [`You may contact RelaxNova at ${businessInfo.email} to request access, correction, deletion, or limitation of certain personal information where required by applicable law. We may need to verify your identity before fulfilling a privacy request.`, "We do not sell sensitive personal information. If advertising or analytics tools are added later, this policy should be updated to reflect any required opt-out rights."] }
    ]
  },
  "refund-policy": {
    title: "Refund Policy",
    intro: "This policy is designed to be fair to customers while protecting the store against misuse, hygiene issues, carrier problems, and non-recoverable fulfillment costs.",
    sections: [
      { heading: "30-day return review window", body: [`Eligible orders may be submitted for return review within 30 days after confirmed delivery. To start a request, email RelaxNova at ${businessInfo.email} with your order number, checkout email, delivery address, photos if relevant, and a clear explanation of the issue.`, "A return request is not automatically approved. We review each request for eligibility, product condition, delivery status, prior claim history, and signs of misuse, damage, tampering, or policy abuse before issuing instructions."] },
      { heading: "Return approval and condition requirements", body: ["Do not ship an item back until we provide written return instructions. Unauthorized returns, refused packages, or returns sent to the wrong address may be denied or reduced by unrecoverable fulfillment and handling costs.", "Returned products must be complete, clean, undamaged, safely packed, and include all parts, straps, accessories, manuals, packaging components, and any included product materials. Items that appear heavily used, altered, unsanitary, missing parts, or damaged after delivery may not qualify for refund."] },
      { heading: "Non-refundable situations", body: ["Shipping delays caused by carriers, customs, weather, incorrect addresses, failed delivery attempts, customer refusal, missed pickup, regional disruptions, or events outside our reasonable control do not automatically qualify for refund.", "We do not refund orders where tracking shows delivered unless the customer provides timely, credible evidence of a delivery issue and the carrier investigation supports the claim. Normal product wear, buyer’s remorse after use, accidental damage, improper fit caused by misuse, and failure to follow product instructions may be excluded."] },
      { heading: "Defective, damaged, or wrong items", body: ["If your item arrives defective, materially damaged, or not the product ordered, contact us within 7 days of delivery with clear photos or video of the item, packaging, shipping label, and issue so we can review the claim with fulfillment partners.", "When approved, we may offer replacement, partial refund, store credit, or refund depending on the circumstances, available inventory, proof provided, and fulfillment options. We may request return of the item before final refund approval."] },
      { heading: "Refund timing and deductions", body: ["Approved refunds are issued to the original payment method through Stripe. Bank and card processing times vary and may take several business days after the refund is submitted.", "Original fulfillment, handling, payment processing, reshipment, return postage, and inspection costs may be non-refundable unless required by law or unless we determine the issue was caused by our error. Any approved deduction will be based on the condition of the return and recoverable costs."] },
      { heading: "Chargebacks and abuse prevention", body: [`Please contact RelaxNova at ${businessInfo.email} before opening a payment dispute so we can review the issue and offer an appropriate resolution. We reserve the right to provide order, tracking, communication, and policy evidence to Stripe, payment networks, carriers, and fraud-prevention partners.`, "Repeated claims, suspicious activity, false statements, altered evidence, or abuse of return policies may result in denial of service, cancellation, or refusal of future orders."] }
    ]
  },
  "terms-of-service": {
    title: "Terms of Service",
    intro: "These Terms govern use of our storefront, checkout, customer support, and purchase of the Smart Posture Corrector.",
    sections: [
      { heading: "Store terms and acceptance", body: ["By visiting RelaxNova, placing an order, contacting support, or using any store feature, you agree to these Terms, our Privacy Policy, Refund Policy, and Shipping Policy.", `For legal or support contact related to these Terms, email RelaxNova at ${businessInfo.email}. We may update these Terms from time to time, and the version posted on this page applies to purchases made after the updated date shown below.`] },
      { heading: "Product information and medical disclaimer", body: ["The Smart Posture Corrector is a consumer posture-awareness support product. It is not a medical device, medical treatment, diagnosis tool, substitute for professional care, or guaranteed cure for pain, injury, posture conditions, or health problems.", "Consult a licensed healthcare professional before use if you have pain, injury, implanted devices, skin sensitivity, circulation issues, pregnancy, recent surgery, or any medical concern. Stop use if discomfort, irritation, dizziness, pain, numbness, or adverse reaction occurs."] },
      { heading: "Orders, pricing, and availability", body: ["Prices, offers, product availability, delivery estimates, and product descriptions may change without notice. We reserve the right to cancel or refuse any order for suspected fraud, pricing errors, stock issues, address concerns, compliance risk, or payment issues.", "Your order is accepted only after payment authorization and fulfillment review. Receiving an order confirmation does not guarantee shipment if a compliance, inventory, fraud, or address issue is discovered."] },
      { heading: "Stripe payment processing", body: ["Checkout is processed securely through Stripe. By submitting payment information, you authorize the charge shown at checkout and agree that Stripe and related payment providers may process transaction and fraud-prevention data.", "We are not responsible for bank declines, issuer holds, wallet provider errors, charge timing, foreign transaction fees, or other actions taken by your payment provider."] },
      { heading: "CJ Dropshipping fulfillment", body: ["Orders may be fulfilled by CJ Dropshipping and logistics partners. Product handling, processing, shipment routing, tracking updates, and delivery timing may depend on supplier inventory, carrier capacity, destination, customs, and operational conditions.", "Packaging, small visual presentation details, and tracking carriers may vary while remaining consistent with the product ordered."] },
      { heading: "Intellectual property and copyright", body: ["All RelaxNova store content, branding, design, text, product presentation, images, custom materials, page layouts, support copy, and other store assets belong to RelaxNova unless otherwise stated or licensed from authorized suppliers or service providers.", "Unauthorized copying, reproduction, distribution, scraping, republication, modification, resale, or commercial use of RelaxNova materials without written permission is prohibited. Violations may result in appropriate legal action under applicable intellectual property, copyright, trademark, and unfair competition laws."] },
      { heading: "Limitation of liability", body: ["To the maximum extent allowed by law, our store, owners, operators, suppliers, fulfillment partners, payment processors, and service providers are not liable for indirect, incidental, consequential, special, punitive, or exemplary damages, including lost profits, health claims, business interruption, delivery delays, or third-party service failures.", "Our total liability for any claim related to an order will not exceed the amount paid for the specific product giving rise to the claim, unless applicable law requires otherwise."] },
      { heading: "Disputes and governing law", body: [`Questions about RelaxNova orders, policies, or legal support requests should be sent to ${businessInfo.email}. We review customer messages in good faith and may request order details before providing account-specific help.`, "If any term is found unenforceable, the remaining terms remain in effect. Failure to enforce a term does not waive our right to enforce it later."] }
    ]
  },
  "shipping-policy": {
    title: "Shipping Policy",
    intro: "This Shipping Policy explains realistic processing, tracking, and delivery expectations for a US-focused dropshipping store using CJ Dropshipping fulfillment partners.",
    sections: [
      { heading: "Processing timeline", body: ["Most orders enter fulfillment review within 1–3 business days after payment approval. During high-volume periods, holidays, inventory checks, address verification, supplier backlogs, or carrier disruptions, processing may take up to 5 business days before active carrier movement begins.", "Business days exclude weekends and major US holidays. If we identify a payment, inventory, compliance, or address issue, we may contact you before shipment or cancel and refund the order when fulfillment is not possible."] },
      { heading: "US delivery estimate", body: ["Current US delivery estimate: typically 8–23 calendar days after processing, unless a different estimate is clearly shown at checkout or in order communication. Some orders may arrive sooner, while remote areas or carrier disruptions may take longer.", "Delivery estimates are not guaranteed delivery dates. The estimate includes international or supplier-side routing where applicable, carrier transfer time, customs or security screening when relevant, and last-mile delivery movement."] },
      { heading: "Fulfillment source and tracking", body: ["Orders may be sourced and shipped through CJ Dropshipping, supplier warehouses, and logistics partners. This allows us to offer a focused product at a lower price, but shipping timelines may be longer than domestic warehouse delivery.", "Tracking information is provided when available from the fulfillment and carrier network. Tracking scans may take 3–7 days to update after a label or logistics record is created, especially while the package transfers between fulfillment and carrier networks."] },
      { heading: "Shipping support", body: [`For RelaxNova shipping support, email ${businessInfo.email} with your order number, checkout email, delivery ZIP code, and tracking concern so our team can review the shipment details.`, "Please allow normal tracking scan delays before requesting an investigation, especially during supplier-to-carrier handoff periods."] },
      { heading: "Customer address responsibility", body: ["Customers are responsible for entering a complete and accurate shipping address, including apartment, unit, suite, building, ZIP code, and valid contact information.", "We are not responsible for failed delivery, non-delivery, returned packages, extra carrier fees, or replacement costs caused by incorrect, incomplete, inaccessible, or undeliverable addresses submitted by the customer."] },
      { heading: "Carrier delay disclaimer", body: ["Delivery dates are estimates, not guarantees. Carriers, customs agencies, weather events, regional disruptions, security checks, holiday volume, local delivery access, and last-mile delivery issues may delay packages outside our control.", "A delayed package is not considered lost while tracking remains active, recently updated, or while the carrier indicates the shipment is still moving through the network. We will support reasonable tracking investigations, but carrier delays alone do not automatically create refund eligibility."] },
      { heading: "Lost, delivered, or returned packages", body: [`If tracking shows delivered but you cannot locate the package, check household members, neighbors, mailrooms, lockers, building management, and the local carrier before contacting RelaxNova at ${businessInfo.email}.`, "If a package is returned, refused, abandoned, or undeliverable due to customer action or address problems, we may deduct fulfillment, reshipment, return, and handling costs from any approved resolution."] },
      { heading: "International orders", body: ["Storefront messaging is currently optimized for US buyers. If checkout accepts non-US destinations, delivery times, import duties, taxes, customs fees, and carrier availability may vary and remain the customer’s responsibility unless clearly stated otherwise at checkout."] }
    ]
  },
  "contact-us": {
    title: "Contact Us",
    intro: "Contact customer support for order questions, tracking updates, return review requests, product concerns, privacy requests, or general store assistance.",
    sections: [
      { heading: "Customer support", body: [`RelaxNova support email: ${businessInfo.email}`, `Temporary business location: ${businessInfo.location}`, "Support is handled by email so order details, tracking information, photos, and return review notes stay in one clear written thread.", "Response time: We aim to respond within 1–3 business days. Order investigations, carrier reviews, payment disputes, and return eligibility checks may require additional time."] },
      { heading: "What to include", body: ["For the fastest support, include your order number, checkout email, full shipping name, delivery ZIP code, a clear description of the issue, and photos or video when reporting damage, defects, wrong items, or package concerns.", "For privacy requests, include the email address used at checkout and enough information for us to verify the request without exposing your account or order data to someone else."] },
      { heading: "Response expectations", body: ["We aim to respond to customer support messages within 1–3 business days. Complex shipping investigations, supplier checks, carrier claims, payment disputes, and return reviews may take longer.", "Sending repeated messages may move your request down the queue if it creates duplicate tickets. Please reply in the same email thread whenever possible."] },
      { heading: "Professional assistance", body: ["For medical questions, product suitability, pain, injury, or health concerns, contact a licensed healthcare professional. RelaxNova customer support cannot provide medical advice.", `For store policy, privacy, refund, shipping, or order support, contact RelaxNova at ${businessInfo.email}.`] }
    ]
  }
};

const legalLinks: { key: LegalPageKey; label: string }[] = [
  { key: "privacy-policy", label: "Privacy Policy" },
  { key: "refund-policy", label: "Refund Policy" },
  { key: "terms-of-service", label: "Terms of Service" },
  { key: "shipping-policy", label: "Shipping Policy" },
  { key: "contact-us", label: "Contact Us" }
];

const pageFromHash = (hash: string): LegalPageKey | null => {
  const key = hash.replace("#", "") as LegalPageKey;
  return key in legalPages ? key : null;
};

const supportFallback = `I don’t want to guess on that. Please visit Contact Us or email ${businessInfo.email}, and RelaxNova support will help within 1–3 business days.`;

function LegalPageView({ pageKey }: { pageKey: LegalPageKey }) {
  const page = legalPages[pageKey];
  return <section className="legal-page"><div className="legal-hero"><p className="eyebrow">Store policy</p><h1>{page.title}</h1><p>{page.intro}</p><div className="legal-meta"><span>Last updated: {businessInfo.updated}</span><span>{businessInfo.legalName}</span><span>{businessInfo.location}</span></div></div><div className="legal-layout"><aside className="legal-contact-card"><strong>{pageKey === "contact-us" ? "Support response" : "RelaxNova contact"}</strong><span><Mail size={16} /> {businessInfo.email}</span><span><MessageCircle size={16} /> Email customer support</span><span><Clock3 size={16} /> 1–3 business day response</span><span><MapPin size={16} /> {businessInfo.location}</span><small>For order, privacy, refund, shipping, or policy questions, contact RelaxNova by email.</small></aside><div className="legal-content">{page.sections.map((section) => <article className="legal-card" key={section.heading}><h2>{section.heading}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></div></section>;
}

type ChatMessage = { role: "assistant" | "user"; content: string };
const starterQuestions = ["Shipping time?", "Is payment safe?", "How do I use it?"];

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "Hi — RelaxNova support can help with shipping, returns, secure checkout, product use, or order questions." }]);

  const askSupport = async (question = input) => {
    const content = question.trim();
    if (!content || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("support-chat", { body: { messages: nextMessages } });
      setMessages([...nextMessages, { role: "assistant", content: error || !data?.answer ? supportFallback : data.answer }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: supportFallback }]);
    } finally {
      setLoading(false);
    }
  };

  return <aside className={`support-chat ${open ? "support-chat-open" : ""}`} aria-label="RelaxNova support chat"><button className="support-chat-bubble" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close support chat" : "Open support chat"}>{open ? <X size={20} /> : <MessageCircle size={21} />}<span>Ask support</span></button>{open && <div className="support-chat-panel"><div className="support-chat-head"><div><strong>RelaxNova Support</strong><span>Quick answers about shipping, orders, and product help</span></div><button onClick={() => setOpen(false)} aria-label="Close support chat"><X size={17} /></button></div><div className="support-chat-messages" aria-live="polite">{messages.map((message, index) => <p className={message.role === "user" ? "chat-user" : "chat-assistant"} key={`${message.role}-${index}`}>{message.content}</p>)}{loading && <p className="chat-assistant">One moment — checking that for you.</p>}</div><div className="support-chat-prompts">{starterQuestions.map((question) => <button key={question} onClick={() => askSupport(question)} disabled={loading}>{question}</button>)}</div><form className="support-chat-form" onSubmit={(event) => { event.preventDefault(); askSupport(); }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your order" maxLength={240} /><button type="submit" disabled={loading || !input.trim()} aria-label="Send support question"><Send size={16} /></button></form></div>}</aside>;
}

export default function App() {
  const [cart, setCart] = useState<Cart>({ [mainProduct.id]: 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPageKey | null>(() => pageFromHash(window.location.hash));
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; body?: string } | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  const cartLines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = 0;
  const total = subtotal;
  const checkoutItems = cartLines.map((line) => ({ productId: line.product.id, quantity: line.quantity }));
  const productViewerImages = galleryImages.slice(0, 4);
  const selectedGalleryImage = productViewerImages[selectedGalleryIndex] || productViewerImages[0];

  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: Math.min((current[id] || 0) + 1, 10) }));
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart((current) => {
    const next = { ...current, [id]: Math.max((current[id] || 0) - 1, 0) };
    if (!next[id]) delete next[id];
    return next;
  });

  const openCheckout = () => {
    if (!cart[mainProduct.id]) setCart({ [mainProduct.id]: 1 });
    setCartOpen(false);
    setCheckoutOpen(true);
    setOrderPlaced(false);
    window.setTimeout(() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  const openImagePreview = (image: { src: string; title: string; body?: string }) => setPreviewImage(image);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if ((window.location.pathname === "/thank-you" || params.get("checkout") === "complete") && params.get("session_id")) {
      setOrderPlaced(true);
      setCheckoutOpen(false);
      setCart({});
      window.setTimeout(() => document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" }), 40);
    }
  }, []);

  useEffect(() => {
    const updatePageFromHash = () => {
      setActiveLegalPage(pageFromHash(window.location.hash));
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", updatePageFromHash);
    return () => window.removeEventListener("hashchange", updatePageFromHash);
  }, []);

  useEffect(() => {
    if (!previewImage) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [previewImage]);

  const footer = <footer className="footer"><div className="footer-brand"><strong>{businessInfo.storeName}</strong><span>Premium single-product posture support for US buyers.</span><small>© 2026 RelaxNova. All rights reserved. Product content is focused on posture-awareness support and does not make medical claims.</small></div><nav className="footer-legal" aria-label="Legal footer"><strong>Store policies</strong>{legalLinks.map((link) => <a key={link.key} href={`#${link.key}`}>{link.label}</a>)}</nav><div className="footer-trust"><strong>Buyer protection</strong><span><Truck size={15} /> Free US Shipping</span><span><RotateCcw size={15} /> 30-day return policy</span><span><ShieldCheck size={15} /> Secure Stripe checkout</span><span><Mail size={15} /> {businessInfo.email}</span></div><div className="footer-support"><strong>RelaxNova support</strong><span><Mail size={15} /> {businessInfo.email}</span><span><MapPin size={15} /> {businessInfo.location}</span><span><Clock3 size={15} /> 1–3 business day response</span><span><PackageCheck size={15} /> US delivery: 8–23 business days</span></div></footer>;
  const imagePreview = previewImage && <div className="image-preview-overlay" role="dialog" aria-modal="true" aria-label={`${previewImage.title} image preview`} onClick={() => setPreviewImage(null)}><div className="image-preview-panel clean-preview" onClick={(event) => event.stopPropagation()}><button className="image-preview-close" type="button" onClick={() => setPreviewImage(null)} aria-label="Close image preview"><X size={20} /></button><img src={previewImage.src} alt={previewImage.title} /></div></div>;

  if (activeLegalPage) {
    return <div id="home"><Header cartCount={cartCount} menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} onCart={() => setCartOpen(true)} /><CartDrawer open={cartOpen} lines={cartLines} onClose={() => setCartOpen(false)} onAdd={addToCart} onRemove={removeFromCart} onCheckout={openCheckout} onPreview={(product) => openImagePreview({ src: product.image, title: product.name, body: product.subtitle })} /><main><LegalPageView pageKey={activeLegalPage} /></main>{footer}{imagePreview}<SupportChat /></div>;
  }

  return (
    <div id="home">
      <Header cartCount={cartCount} menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} onCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} lines={cartLines} onClose={() => setCartOpen(false)} onAdd={addToCart} onRemove={removeFromCart} onCheckout={openCheckout} onPreview={(product) => openImagePreview({ src: product.image, title: product.name, body: product.subtitle })} />
      {!checkoutOpen && !orderPlaced && <div className="mobile-sticky-buy" role="region" aria-label="Quick purchase bar"><div><strong>$39 shipped</strong><span>Secure checkout · Free US Shipping</span></div><button onClick={openCheckout}>Buy now</button></div>}

      <main>
        <section id="product" className="product-viewer-section product-viewer-top" aria-label="RelaxNova product viewer">
          <div className="product-viewer-layout">
            <div className="product-viewer-media">
              <button className="product-viewer-main" type="button" onClick={() => openImagePreview(selectedGalleryImage)} aria-label={`Open larger preview of ${selectedGalleryImage.title}`}>
                <img src={selectedGalleryImage.src} alt={`${mainProduct.name} ${selectedGalleryImage.title.toLowerCase()}`} width={selectedGalleryImage.width} height={selectedGalleryImage.height} loading="lazy" />
              </button>
              <div className="product-thumbnail-strip" aria-label="Product image thumbnails">
                {productViewerImages.map((image, index) => <button className={`product-thumbnail ${selectedGalleryIndex === index ? "product-thumbnail-active" : ""}`} type="button" key={image.title} onClick={() => setSelectedGalleryIndex(index)} aria-label={`View ${image.title}`} aria-pressed={selectedGalleryIndex === index}><img src={image.src} alt={`${mainProduct.name} thumbnail ${index + 1}`} width={image.width} height={image.height} loading="lazy" /></button>)}
              </div>
            </div>
            <aside className="product-viewer-purchase">
              <p className="eyebrow">RelaxNova smart posture corrector</p>
              <h1>{mainProduct.name}</h1>
              <p>{mainProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="price-row"><strong>$39</strong><span>$89</span><em>Free US Shipping</em></div>
              <ul className="viewer-benefits">{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={openCheckout}>Buy now — $39 shipped</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="cta-trust-row" aria-label="Purchase trust badges"><span><Truck size={16} /> Free US Shipping</span><span><RotateCcw size={16} /> 30-Day Return Review</span><span><ShieldCheck size={16} /> Secure Checkout</span></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
            </aside>
          </div>
        </section>

        <section id="results" className="before-after-section">
          <div className="section-intro"><p className="eyebrow">Visible daily benefits</p><h2>From slouched screen time to active posture correction.</h2></div>
          <article className="before-after-card"><span>Before</span><div className="posture-visual posture-before" aria-hidden="true"><i /><b /></div><h3>Forward-head desk strain</h3><p>Hours at a laptop can round your shoulders, pull your neck forward, and leave your upper back feeling tight by the end of the day.</p></article>
          <article className="before-after-card"><span>After</span><div className="posture-visual posture-after" aria-hidden="true"><i /><b /></div><h3>Gentle reminders to reset</h3><p>Smart vibration cues make posture correction noticeable in the moment, helping you return to a more upright, comfortable position.</p></article>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Buyer confidence</p><h2>Built for shoppers who want clarity before checkout.</h2><p>Transparent pricing · Free US Shipping · Secure payment · Clear delivery and return expectations.</p></div>
          <div className="satisfaction-row" aria-label="Customer confidence indicators"><span><strong>$39</strong><small>Product offer</small></span><span><strong>$0</strong><small>US shipping fee</small></span><span><strong>30</strong><small>Day return review</small></span><span><strong>8–23</strong><small>Day US estimate</small></span></div>
          <article className="featured-review"><div><span className="stars">★★★★★</span><h3>“A simple reminder for better posture habits.”</h3><p>Customers can review the product fit, delivery estimate, return conditions, secure payment details, and fulfillment expectations before placing an order.</p></div><aside><strong>Clear</strong><small>checkout expectations</small></aside></article>
          <div className="cards-grid review-grid">{reviews.map((review) => <article className="review-card" key={review.name}><div className="review-photo" aria-hidden="true">{review.photo}</div><div className="stars">{review.rating}</div><span><BadgeCheck size={15} /> {review.label}</span><p>“{review.quote}”</p><strong>{review.name}</strong><small>{review.location}</small></article>)}</div>
        </section>

        <section className="conversion-section">
          <div className="section-intro"><p className="eyebrow">Why customers buy</p><h2>A simple, affordable posture upgrade with one clear job.</h2></div>
          <div className="conversion-grid">{benefits.map(([title, body]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust and delivery</p><h2>A clean $39 offer with no surprise shipping fee.</h2><p>US buyers see the full price upfront, with secure checkout, free shipping, easy returns, and a focused single-product order flow.</p></div>
          <div className="guarantee-list"><span><Truck /> Free US Shipping included</span><span><RotateCcw /> Easy Returns and 30-day satisfaction review</span><span><LockKeyhole /> Secure Checkout</span><span><PackageCheck /> Fast tracked delivery estimate: 8–23 days</span><span><Banknote /> $39 final product price</span></div>
        </section>


        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Secure RelaxNova checkout</p><h2>Complete your Smart Posture Corrector order.</h2><p>The secure Stripe payment form is ready below for the $39 Smart Posture Corrector offer with Free US Shipping included.</p></div><div className="checkout-grid"><div className="checkout-form"><div className="checkout-mode live"><ShieldCheck size={18} /><strong>Secure Stripe checkout</strong><span>Encrypted live payment for the $39 shipped RelaxNova Smart Posture Corrector offer.</span></div><div className="checkout-trust"><span><ShieldCheck size={17} /> Secure Checkout</span><span><CreditCard size={17} /> Visa and Mastercard</span><span><Truck size={17} /> Free US Shipping</span><span><RotateCcw size={17} /> 30-Day Return Review</span><span><Mail size={17} /> RelaxNova support</span></div>{cartLines.length ? <StripeEmbeddedCheckout items={checkoutItems} /> : <p className="form-error" role="alert">Add the Smart Posture Corrector before starting checkout.</p>}</div><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}<small>Free US Shipping included</small></span><strong>${(line.product.price * line.quantity).toFixed(2)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div><div className="summary-badges"><span><Truck size={15} /> Free US Shipping</span><span><RotateCcw size={15} /> 30-Day Return Review</span><span><LockKeyhole size={15} /> Secure Checkout</span></div><p>After payment, your order is saved securely with RelaxNova support at {businessInfo.email} if you need help.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Thank you</p><h2>Your Smart Posture Corrector order is confirmed.</h2><p>Your payment was completed securely. Your order is ready for fulfillment review, and your confirmation email will be sent to the checkout email address.</p></div><button className="secondary-action" onClick={() => { window.history.replaceState({}, "", "/"); setOrderPlaced(false); }}>Return to store <ArrowRight size={17} /></button></section>}

        <section className="cta-section">
          <p className="eyebrow">Limited $39 offer</p><h2>Start correcting posture awareness today.</h2><p>A premium smart posture trainer for neck comfort, daily confidence, and better desk-day habits—with Free US Shipping included.</p><button className="primary-action hero-primary" onClick={openCheckout}>Get Smart Posture Corrector — $39 shipped</button><div className="cta-trust-row" aria-label="Final trust badges"><span><Truck size={16} /> Free US Shipping</span><span><RotateCcw size={16} /> Easy Returns</span><span><BadgeCheck size={16} /> Verified buyer reviews</span></div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Buying questions answered before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>
      </main>

      {footer}
      {imagePreview}
      <SupportChat />
    </div>
  );
}