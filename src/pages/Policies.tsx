import { ReactNode } from "react";

function Policy({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="container py-16 md:py-24 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Legal</p>
      <h1 className="font-serif text-5xl mb-4">{title}</h1>
      <p className="text-muted-foreground mb-10 leading-relaxed">{intro}</p>
      <div className="prose-policy space-y-6 text-muted-foreground leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2">
        {children}
      </div>
    </div>
  );
}

export const Privacy = () => (
  <Policy title="Privacy Policy" intro="Last updated April 2026. We respect your privacy and are committed to protecting your personal data.">
    <h2>What we collect</h2>
    <p>We collect information you provide at checkout (name, email, shipping address) and basic browsing analytics to improve our store.</p>
    <h2>How we use it</h2>
    <p>To process orders, send order updates, occasionally email you about new products if you've opted in, and analyze site performance.</p>
    <h2>Sharing</h2>
    <p>We never sell your data. We share only with shipping carriers, payment processors (Stripe, PayPal) and email service providers strictly to fulfill your orders.</p>
    <h2>Your rights</h2>
    <p>You may request access, correction or deletion of your personal data at any time by emailing care@aurelis.com.</p>
    <h2>Cookies</h2>
    <p>We use essential cookies for cart functionality and analytics cookies you can opt out of in your browser.</p>
  </Policy>
);

export const Terms = () => (
  <Policy title="Terms of Service" intro="By using aurelis.com you agree to the following terms.">
    <h2>Use of the site</h2>
    <p>The site and all content are owned by Aurelis Wellness, Inc. You may not reproduce or redistribute content without written permission.</p>
    <h2>Orders & pricing</h2>
    <p>All prices are in USD unless otherwise specified. We reserve the right to refuse or cancel orders due to pricing errors or stock issues.</p>
    <h2>Health disclaimer</h2>
    <p>Our products are wellness devices, not medical devices, and are not intended to diagnose, treat or cure any disease. Consult your physician before use if you have any medical condition.</p>
    <h2>Liability</h2>
    <p>To the fullest extent permitted by law, Aurelis is not liable for indirect or consequential damages arising from product use.</p>
    <h2>Governing law</h2>
    <p>These terms are governed by the laws of the State of California.</p>
  </Policy>
);

export const Refund = () => (
  <Policy title="Refund Policy" intro="60-day risk-free trial on every Aurelis device. If you don't love it, we don't deserve to keep your money.">
    <h2>60-day money-back guarantee</h2>
    <p>You may return any product within 60 days of delivery for a full refund of the purchase price. No restocking fees, no questions asked.</p>
    <h2>How to return</h2>
    <p>Email care@aurelis.com with your order number. We'll send a prepaid return label within one business day.</p>
    <h2>Refund timing</h2>
    <p>Once we receive your return, refunds are issued within 3 business days to your original payment method.</p>
    <h2>Damaged or defective items</h2>
    <p>Covered by our 2-year warranty. Email us with photos and we'll ship a replacement immediately.</p>
    <h2>Exceptions</h2>
    <p>Hygiene-related items (LED mask silicone liners, posture pads) cannot be returned once opened, but are covered if defective.</p>
  </Policy>
);

export const Shipping = () => (
  <Policy title="Shipping Policy" intro="We ship from our California fulfillment center within 1 business day of your order.">
    <h2>US shipping</h2>
    <p>Free standard shipping (3–5 business days) on all orders over $75. Orders under $75 ship for a flat $8. Express shipping (1–2 business days) available at checkout for $14.</p>
    <h2>International</h2>
    <p>We ship to Canada, UK, Australia and most EU countries. Delivery typically takes 7–14 business days. Customs and duties may apply and are the responsibility of the recipient.</p>
    <h2>Order tracking</h2>
    <p>You'll receive a tracking link by email within 24 hours of dispatch. You can also track at /track using your order number.</p>
    <h2>Carriers</h2>
    <p>USPS, UPS and FedEx domestic. DHL Express international.</p>
  </Policy>
);
