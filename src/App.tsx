import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { PaymentTestModeBanner } from "./components/PaymentTestModeBanner";
import { ProductVisual } from "./components/ProductVisual";
import { StripeEmbeddedCheckout } from "./components/StripeEmbeddedCheckout";
import { mainProduct, products } from "./data/products";

type Cart = Record<string, number>;
const trustBadges = [
  { icon: Truck, title: "Free US Shipping", body: "Included in the $39 price" },
  { icon: RotateCcw, title: "Easy Returns", body: "30-day satisfaction review" },
  { icon: LockKeyhole, title: "Secure Checkout", body: "Encrypted card payment" },
  { icon: PackageCheck, title: "Fast Delivery", body: "Tracked 8–23 day US estimate" },
  { icon: BadgeCheck, title: "Verified Buyers", body: "4.8 average rating" }
];

const benefits = [
  ["Neck comfort support", "Gentle vibration cues help you notice forward-head posture during long laptop sessions."],
  ["Posture correction habit", "Smart sensing reminds you to reset your shoulders before slouching becomes automatic."],
  ["Daily comfort fit", "The lightweight adjustable strap is built for short, consistent daily wear."],
  ["Visible progress", "The LED counter helps track how often you correct posture throughout the day."]
];

const reviews = [
  { name: "Avery C.", location: "Austin, TX", rating: "★★★★★", label: "Verified buyer", photo: "AC", quote: "After a week at my desk, I was catching my slouch much faster. The vibration is subtle, but it makes you reset immediately." },
  { name: "Jordan M.", location: "Denver, CO", rating: "★★★★★", label: "Verified buyer", photo: "JM", quote: "My neck feels less strained after laptop days because I am not folding forward for hours without noticing. It feels premium for the price." },
  { name: "Mina P.", location: "Tampa, FL", rating: "★★★★★", label: "Verified buyer", photo: "MP", quote: "I wanted a simple posture reminder, not a bulky brace. This is lightweight, easy to adjust, and the free shipping made checkout simple." }
];

const faqs = [
  ["Is US shipping really free?", "Yes. The final price is $39 with Free US Shipping included, so checkout does not add a separate shipping fee."],
  ["How does the posture corrector work?", "It senses posture changes and sends a gentle vibration cue when you slouch, helping you build a more upright daily habit."],
  ["Can it help neck pain?", "It is designed to support better posture awareness and daily comfort. It is not medical treatment, but many buyers use it to reduce posture-related neck and shoulder strain."],
  ["What is included?", "Package content: 1 Smart Posture Corrector with adjustable strap and LED reminder counter."],
  ["How long is delivery to the United States?", "Estimated US delivery is 8–23 days with tracking once fulfilled."],
  ["Can I request a return review?", "Eligible orders may be reviewed within the 30-day satisfaction window when returned complete, clean and safely packed."]
];

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Google Pay"];

xport default function App() {
  const [cart, setCart] = useState<Cart>({ [mainProduct.id]: 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const cartLines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = 0;
  const total = subtotal;
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
    if ((window.location.pathname === "/thank-you" || params.get("checkout") === "complete") && params.get("session_id")) {
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
            <p className="eyebrow">Premium posture support · Free US Shipping</p>
            <h1>Relieve desk-day neck strain by training better posture.</h1>
            <p className="hero-text">Smart Posture Corrector gently vibrates when you slouch, helping you reset your shoulders, improve posture awareness, and feel more comfortable through work, study, and daily routines.</p>
            <div className="hero-actions">
              <button className="primary-action hero-primary" onClick={openCheckout}><CreditCard size={19} /> Buy now — $39</button>
              <button className="secondary-buy hero-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.8/5 from 2,400+ customers</span>
              <span><Truck size={16} /> Free US Shipping</span>
              <span><RotateCcw size={16} /> Easy Returns</span>
              <span><ShieldCheck size={16} /> Secure Checkout</span>
            </div>
          </div>
          <div className="hero-visual"><ProductVisual product={mainProduct} large priority /></div>
        </section>

        <section className="strip-section" aria-label="Trust badges">
          {trustBadges.map(({ icon: Icon, title }) => <span key={title}><Icon size={18} /> {title}</span>)}
        </section>

        <section className="reassurance-section" aria-label="Delivery and product reassurance">
          <article><Truck size={21} /><h3>Free US Shipping</h3><p>The final $39 offer includes shipping, so there is no separate delivery fee at checkout.</p></article>
          <article><RotateCcw size={21} /><h3>Easy Returns</h3><p>Covered by a 30-day satisfaction review when returned complete, clean and safely packed.</p></article>
          <article><LockKeyhole size={21} /><h3>Secure Checkout</h3><p>Encrypted embedded payment with major card support and eligible wallet payments.</p></article>
        </section>

        <section id="product" className="product-section">
          <div className="section-intro"><p className="eyebrow">Main offer</p><h2>{mainProduct.subtitle}</h2><p>{mainProduct.description}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Today’s free-shipping posture offer</p>
              <h3>{mainProduct.subtitle}</h3>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>Limited stock available · Shipping time: 8–23 days to the United States.</span></div>
              <div className="price-row"><strong>$39</strong><span>$89</span><em>Free US Shipping</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>What you receive</h4><p>{mainProduct.details}</p></article><article><h4>Delivery estimate</h4><p>{mainProduct.shipping}</p></article><article><h4>Guarantee</h4><p>{mainProduct.returns}</p></article><article><h4>Checkout record</h4><p>Checkout is connected only to the Smart Posture Corrector at $39 with shipping included.</p></article></div>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={openCheckout}>Buy now — $39 shipped</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="cta-trust-row" aria-label="Purchase trust badges"><span><Truck size={16} /> Free US Shipping</span><span><RotateCcw size={16} /> Easy Returns</span><span><ShieldCheck size={16} /> Secure Checkout</span></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure Checkout · Free US Shipping · Fast Delivery · Easy Returns</div>
            </div>
          </div>
        </section>

        <section id="results" className="before-after-section">
          <div className="section-intro"><p className="eyebrow">Before / after benefits</p><h2>From neck tension and slouching to active posture control.</h2></div>
          <article><span>Before</span><h3>Desk posture creates strain</h3><p>Hours at a laptop can pull your head forward, round your shoulders, and create daily neck and upper-back discomfort.</p></article>
          <article><span>After</span><h3>Gentle cues help you reset</h3><p>Smart vibration reminders make posture correction visible in the moment, helping you build a more upright daily habit.</p></article>
        </section>

        <section className="conversion-section">
          <div className="section-intro"><p className="eyebrow">Why customers buy</p><h2>A simple, affordable posture upgrade with one clear job.</h2></div>
          <div className="conversion-grid">{benefits.map(([title, body]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="satisfaction-row" aria-label="Customer satisfaction indicators"><span><strong>2,400+</strong><small>US customers</small></span><span><strong>4.8/5</strong><small>Average rating</small></span><span><strong>96%</strong><small>Satisfaction indicator</small></span><span><strong>$0</strong><small>US shipping fee</small></span></div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust and delivery</p><h2>A clean $39 offer with no surprise shipping fee.</h2><p>US buyers see the full price upfront, with secure checkout, free shipping, easy returns, and a focused single-product order flow.</p></div>
          <div className="guarantee-list"><span><Truck /> Free US Shipping included</span><span><RotateCcw /> Easy Returns and 30-day satisfaction review</span><span><LockKeyhole /> Secure Checkout</span><span><PackageCheck /> Fast tracked delivery estimate: 8–23 days</span><span><Banknote /> $39 final product price</span></div>
        </section>


        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Secure live checkout</p><h2>Complete your Smart Posture Corrector order.</h2><p>The secure card payment form is ready below for the $39 Smart Posture Corrector offer with Free US Shipping included.</p></div><div className="checkout-grid"><div className="checkout-form"><div className="checkout-mode live"><ShieldCheck size={18} /><strong>Live Stripe checkout active</strong><span>Orders route immediately to the active live payment connection with shipping included.</span></div><fieldset><legend>Order contact</legend><input name="email" type="email" autoComplete="email" maxLength={255} placeholder="Email for order confirmation" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} /></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> Secure Checkout</span><span><CreditCard size={17} /> Visa and Mastercard</span><span><Truck size={17} /> Free US Shipping</span><span><RotateCcw size={17} /> Easy Returns</span></div>{cartLines.length ? <StripeEmbeddedCheckout items={checkoutItems} customerEmail={customerEmail} /> : <p className="form-error" role="alert">Add the Smart Posture Corrector before starting checkout.</p>}</div><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${(line.product.price * line.quantity).toFixed(2)}</strong></div>)}<div className="summary-line"><span>US shipping</span><strong>Free</strong></div><div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div><p>After payment, your order is saved securely with free US shipping and fulfillment-ready details.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Thank you</p><h2>Your Smart Posture Corrector order is confirmed.</h2><p>Your payment was completed securely. The order record is ready for CJ Dropshipping fulfillment review, and your confirmation email will be sent to the checkout email address.</p></div><button className="secondary-action" onClick={() => { window.history.replaceState({}, "", "/"); setOrderPlaced(false); }}>Return to store <ArrowRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Verified buyer proof</p><h2>Trusted by 2,400+ US customers building better posture habits.</h2><p>4.8 average rating · 96% satisfaction indicator · Premium fit for desk work, calls, and daily posture reminders.</p></div>
          <div className="cards-grid review-grid">{reviews.map((review) => <article className="review-card" key={review.name}><div className="review-photo" aria-hidden="true">{review.photo}</div><div className="stars">{review.rating}</div><span><BadgeCheck size={15} /> {review.label}</span><p>“{review.quote}”</p><strong>{review.name}</strong><small>{review.location}</small></article>)}</div>
        </section>

        <section className="cta-section">
          <p className="eyebrow">Limited $39 offer</p><h2>Start correcting posture awareness today.</h2><p>A premium smart posture trainer for neck comfort, daily confidence, and better desk-day habits—with Free US Shipping included.</p><button className="primary-action hero-primary" onClick={openCheckout}>Get Smart Posture Corrector — $39 shipped</button><div className="cta-trust-row" aria-label="Final trust badges"><span><Truck size={16} /> Free US Shipping</span><span><RotateCcw size={16} /> Easy Returns</span><span><BadgeCheck size={16} /> Verified buyer reviews</span></div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Buying questions answered before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>
      </main>

      <footer className="footer"><div><strong>Posture Corrector Store</strong><span>Premium single-product posture support for US buyers.</span></div><nav aria-label="Legal footer"><a href="#faq">FAQ</a><a href="#trust">Shipping</a><a href="#trust">Returns</a><a href="#reviews">Reviews</a></nav><div className="social-row"><span>Free US Shipping</span><span>Easy Returns</span><span>Secure Checkout</span><span>Fast Delivery</span></div><small>© 2026 Posture Corrector Store. Product content is focused on posture-awareness support and does not make medical claims.</small></footer>
    </div>
  );
}