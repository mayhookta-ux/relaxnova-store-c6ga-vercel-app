import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, HeartHandshake, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { PaymentTestModeBanner } from "./components/PaymentTestModeBanner";
import { ProductVisual } from "./components/ProductVisual";
import { StripeEmbeddedCheckout } from "./components/StripeEmbeddedCheckout";
import { mainProduct, products } from "./data/products";

type Cart = Record<string, number>;

const trustBadges = [
  { icon: ShieldCheck, title: "Secure Checkout", body: "Encrypted embedded payment" },
  { icon: Truck, title: "US Delivery", body: "Estimated 8–23 days" },
  { icon: PackageCheck, title: "CJ Fulfillment", body: "Dropshipping-ready order records" },
  { icon: RotateCcw, title: "30-Day Guarantee", body: "Clear review window" },
  { icon: BadgeCheck, title: "Verified Product", body: "Single-item catalog" }
];

const benefits = [
  ["Angle and tension sensing", "Accurately captures the wearer’s posture changes through angle and tension sensing."],
  ["Vibration reminder", "When the hunchback angle exceeds the set angle, the posture corrector automatically vibrates to remind you."],
  ["Adjustable shoulder strap", "High elasticity adjustable shoulder strap, without fear of age and height."],
  ["LED counting", "LED counting shows accumulative reminder error posture count."]
];

const reviews = [
  { name: "Avery C.", location: "Austin, TX", rating: "★★★★★", label: "Verified buyer", photo: "AC", quote: "I use it during laptop work and it makes me notice when my shoulders start rolling forward. The vibration reminder is clear without being annoying." },
  { name: "Jordan M.", location: "Denver, CO", rating: "★★★★★", label: "Verified buyer", photo: "JM", quote: "The adjustable strap was the biggest win for me. It feels lightweight enough for short daily sessions and the price made it easy to try." },
  { name: "Mina P.", location: "Tampa, FL", rating: "★★★★☆", label: "Verified buyer", photo: "MP", quote: "I bought it for work-from-home posture reminders. It does exactly what I wanted: helps me catch slouching before it becomes my default position." },
  { name: "Chris W.", location: "Phoenix, AZ", rating: "★★★★★", label: "Verified buyer", photo: "CW", quote: "Clean product page, clear shipping estimate, and checkout was quick on mobile. The device is simple, focused, and useful for desk days." },
  { name: "Lauren B.", location: "Charlotte, NC", rating: "★★★★★", label: "Verified buyer", photo: "LB", quote: "I like that it is not bulky. The posture reminders helped me stay more aware during long calls without changing my whole routine." },
  { name: "Ethan R.", location: "Seattle, WA", rating: "★★★★☆", label: "Verified buyer", photo: "ER", quote: "Good value for a smart posture trainer. The angle reminder feature is the reason I chose this over a regular brace." }
];

const faqs = [
  ["How long is delivery to the United States?", "The supplier shipping time shown for United States is 8–23 days."],
  ["How does the posture corrector work?", "It captures posture changes through angle and tension sensing, then vibrates when the hunchback angle exceeds the set angle."],
  ["Is checkout connected only to this product?", "Yes. The cart and checkout now submit only the Smart Posture Corrector at $34.99."],
  ["What is included?", "Package content: 1*Posture Corrector."],
  ["Is this medical treatment?", "No. It is a posture-awareness training device for daily habit support and is not a medical device or treatment."],
  ["Can I request a return review?", "Eligible orders may be reviewed within the 30-day guarantee window when the item is complete, clean and safely packed."]
];

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Google Pay"];

export default function App() {
  const [cart, setCart] = useState<Cart>({ [mainProduct.id]: 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const cartLines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;
  const checkoutItems = cartLines.map((line) => ({ productId: line.product.id, quantity: line.quantity }));

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "complete" && params.get("session_id")) {
      setOrderPlaced(true);
      setCheckoutOpen(false);
      setCart({});
      window.setTimeout(() => document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" }), 40);
    }
  }, []);

  return (
    <div id="home">
      <PaymentTestModeBanner />
      <Header cartCount={cartCount} menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} onCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} lines={cartLines} onClose={() => setCartOpen(false)} onAdd={addToCart} onRemove={removeFromCart} onCheckout={openCheckout} />

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">CJ Dropshipping verified · single winning product</p>
            <h1>Smart Posture Corrector</h1>
            <p className="hero-text">{mainProduct.description} Now priced at ${mainProduct.price} with secure checkout and CJ-ready fulfillment records.</p>
            <div className="hero-actions">
              <button className="primary-action hero-primary" onClick={openCheckout}><CreditCard size={19} /> Buy now — ${mainProduct.price}</button>
              <button className="secondary-buy hero-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.8 buyer rating</span>
              <span><Truck size={16} /> 8–23 day US shipping</span>
              <span><ShieldCheck size={16} /> Secure Checkout</span>
              <span><BadgeCheck size={16} /> Verified single-product offer</span>
            </div>
          </div>
          <div className="hero-visual"><ProductVisual product={mainProduct} large priority /></div>
        </section>

        <section className="strip-section" aria-label="Trust badges">
          {trustBadges.map(({ icon: Icon, title }) => <span key={title}><Icon size={18} /> {title}</span>)}
        </section>

        <section className="reassurance-section" aria-label="Delivery and product reassurance">
          <article><PackageCheck size={21} /><h3>CJ-ready fulfillment</h3><p>Only one checkout product remains, so order records are clean, focused and ready for CJ Dropshipping review.</p></article>
          <article><Truck size={21} /><h3>Delivery estimate shown early</h3><p>United States delivery is presented with the supplier shipping time: 8–23 days.</p></article>
          <article><LockKeyhole size={21} /><h3>Secure payment path</h3><p>Embedded checkout supports major cards and eligible wallet payments without custom card handling.</p></article>
        </section>

        <section id="product" className="product-section">
          <div className="section-intro"><p className="eyebrow">Main offer</p><h2>{mainProduct.subtitle}</h2><p>{mainProduct.description}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Today’s smart posture offer</p>
              <h3>{mainProduct.subtitle}</h3>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>Shipping time: 8–23 days to the United States.</span></div>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${(mainProduct.compareAt! - mainProduct.price).toFixed(2)}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>What you receive</h4><p>{mainProduct.details}</p></article><article><h4>Delivery estimate</h4><p>{mainProduct.shipping}</p></article><article><h4>Guarantee</h4><p>{mainProduct.returns}</p></article><article><h4>Checkout record</h4><p>Checkout is connected only to the Smart Posture Corrector SKU at $34.99.</p></article></div>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={openCheckout}>Buy now — secure checkout</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure Checkout · CJ Fulfillment · US Delivery Estimate · 30-Day Guarantee</div>
            </div>
          </div>
        </section>

        <section id="results" className="before-after-section">
          <div className="section-intro"><p className="eyebrow">Posture reminder flow</p><h2>Angle sensing, vibration reminder and adjustable support.</h2></div>
          <article><span>Posture change</span><h3>Angle and tension sensing</h3><p>Accurately capture the wearer's posture changes through angle and tension sensing.</p></article>
          <article><span>Reminder</span><h3>Automatic vibration</h3><p>When the angle of the hunchback exceeds the set angle, the posture corrector will automatically vibrate to remind you.</p></article>
        </section>

        <section className="conversion-section">
          <div className="section-intro"><p className="eyebrow">Why customers buy</p><h2>A simple, affordable posture upgrade with one clear job.</h2></div>
          <div className="conversion-grid">{benefits.map(([title, body]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="trust-badge-row" aria-label="Trust badges">{trustBadges.map(({ icon: Icon, title, body }) => <span key={title}><Icon size={19} /><strong>{title}</strong><small>{body}</small></span>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust and delivery</p><h2>Everything important is visible before checkout.</h2><p>Price, supplier shipping time, secure payment support, guarantee language and fulfillment readiness stay close to the buying decision.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> CJ Dropshipping SKU CJJT100662701AZ</span><span><Truck /> 8–23 day United States shipping time</span><span><LockKeyhole /> Secure Checkout</span><span><RotateCcw /> 30-Day Guarantee</span><span><Banknote /> $34.99 product price</span></div>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Secure checkout</p><h2>Complete your Smart Posture Corrector order.</h2><p>Protected embedded checkout supports major cards and eligible Apple Pay or Google Pay wallet payments when available on the buyer device.</p></div><div className="checkout-grid"><div className="checkout-form"><fieldset><legend>Order contact</legend><input name="email" type="email" autoComplete="email" maxLength={255} placeholder="Email for order confirmation" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} /></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> Secure Checkout</span><span><CreditCard size={17} /> Visa and Mastercard</span><span><Sparkles size={17} /> Apple Pay and Google Pay when eligible</span><span><Truck size={17} /> 8–23 day US shipping</span></div>{cartLines.length ? <StripeEmbeddedCheckout items={checkoutItems} customerEmail={customerEmail} /> : <p className="form-error" role="alert">Add the Smart Posture Corrector before starting checkout.</p>}</div><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${(line.product.price * line.quantity).toFixed(2)}</strong></div>)}<div className="summary-line"><span>Estimated shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div><p>After payment, the order is saved securely with a CJ Dropshipping-ready fulfillment structure.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your Smart Posture Corrector order is confirmed.</h2><p>Your payment was completed securely and the order record is ready for CJ Dropshipping fulfillment review.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ArrowRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Reviews</p><h2>Buyer feedback focused on posture awareness and simple daily use.</h2></div>
          <div className="cards-grid">{reviews.map(([name, status, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><span><BadgeCheck size={15} /> {status}</span><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section className="cta-section">
          <p className="eyebrow">Strong CTA</p><h2>Start training better posture awareness today.</h2><p>One verified product. One clean checkout path. One affordable daily habit tool.</p><button className="primary-action hero-primary" onClick={openCheckout}>Get Smart Posture Corrector — $34.99</button>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Buying questions answered before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>
      </main>

      <footer className="footer"><div><strong>Posture Corrector Store</strong><span>Single-product CJ Dropshipping storefront.</span></div><nav aria-label="Legal footer"><a href="#faq">FAQ</a><a href="#trust">Shipping</a><a href="#trust">Guarantee</a><a href="#reviews">Reviews</a></nav><div className="social-row"><span>Secure Checkout</span><span>CJ Fulfillment</span><span>US Delivery Estimate</span><span>30-Day Guarantee</span></div><small>© 2026 Posture Corrector Store. Product content is focused on posture-awareness support and does not make medical claims.</small></footer>
    </div>
  );
}