import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, Gem, HeartHandshake, Leaf, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Star, Truck, WandSparkles } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { ProductVisual } from "./components/ProductVisual";
import { addOns, mainProduct, products } from "./data/products";

type Cart = Record<string, number>;

const textInRange = (value: FormDataEntryValue | null, min: number, max: number) => typeof value === "string" && value.trim().length >= min && value.trim().length <= max;
const matchesPattern = (value: FormDataEntryValue | null, pattern: RegExp) => typeof value === "string" && pattern.test(value.trim());

const isCheckoutValid = (data: FormData, paymentMethod: string) => {
  const shippingValid = textInRange(data.get("fullName"), 2, 100) && matchesPattern(data.get("email"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/) && textInRange(data.get("street"), 5, 160) && textInRange(data.get("city"), 2, 80) && textInRange(data.get("postalCode"), 3, 20) && textInRange(data.get("country"), 2, 80);
  if (!shippingValid || paymentMethod !== "card") return shippingValid;
  return matchesPattern(data.get("cardNumber"), /^[0-9 ]{12,23}$/) && matchesPattern(data.get("expiry"), /^[0-9]{2}\s?\/\s?[0-9]{2}$/) && matchesPattern(data.get("cvc"), /^[0-9]{3,4}$/) && textInRange(data.get("cardName"), 2, 100);
};

const landingBlocks = [
  ["01", "Benefit-led shopping", "Every product explains the daily purpose, expected use and reason to buy before a shopper reaches the button."],
  ["02", "Routine-based value", "The collection is arranged as a complete care sequence so add-ons feel useful, not random."],
  ["03", "Decision support", "Shipping, returns, payment safety and quality signals stay visible where purchase hesitation usually appears."],
  ["04", "Responsive retail polish", "Image sizing, button hierarchy and copy blocks stay balanced across desktop, tablet and mobile."]
];

const conversionBenefits = [
  ["Made for steady routines", "The hero device supports a short evening care moment for shoppers who want a polished routine without a spa appointment."],
  ["Clear premium value", "Comfort materials, included accessories and guided use details make the price easier to understand at a glance."],
  ["Reduced purchase risk", "Guarantee, delivery and payment messages appear beside the product so buyers do not need to search for reassurance."],
  ["Gift-ready presentation", "Soft product photography, concise benefits and elegant spacing create a storefront suitable for premium self-care gifting."]
];

const trustBadges = [
  { icon: ShieldCheck, title: "Secure Checkout", body: "Protected payment path" },
  { icon: RotateCcw, title: "Money Back Guarantee", body: "60-day confidence window" },
  { icon: Truck, title: "Fast Shipping", body: "Tracked dispatch on eligible orders" },
  { icon: BadgeCheck, title: "Verified Quality", body: "Checked before packing" }
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay"];

const reviews = [
  ["A. Vale", "Verified buyer · city residence", "The main device felt easy to understand because the page explained what it does, when to use it and what comes in the box."],
  ["R. Soren", "Verified buyer · coastal home", "The delivery promise and return wording were visible before checkout, which made the order feel calm and considered."],
  ["L. Maren", "Verified buyer · private studio", "The serum and cleansing tool made sense as a routine rather than a forced bundle. The product cards were clear on mobile."],
  ["C. Arden", "Verified buyer · weekend house", "The stock notice, secure payment labels and guarantee gave the store a more polished retail feel without looking loud."],
  ["N. Wren", "Verified buyer · loft apartment", "I could compare the products quickly. The photos stayed balanced and the text never disappeared inside the cards."],
  ["S. Iven", "Verified buyer · townhouse", "The checkout section felt structured, readable and premium. The buying buttons were easy to spot without breaking the design."]
];

const faqs = [
  ["Who is the main device for?", "It is positioned for shoppers who want a refined at-home facial ritual, clear routine guidance and a premium device that looks appropriate on a vanity."],
  ["How quickly can an order leave the studio?", "Eligible in-stock orders can be prepared for same-day dispatch when placed before the displayed cut-off window, with tracking shown after packing."],
  ["What is the return window?", "The store presents a 60-day money-back guarantee framework with hygiene-aware conditions for opened devices and sealed skincare items."],
  ["Is there warranty coverage?", "The product page is structured to support a one-year limited device coverage statement for eligible manufacturing faults after launch terms are finalized."],
  ["Are payments handled safely?", "The checkout uses a validated form structure, recognizable payment labels and no unsafe HTML injection patterns. Live payment processing should be connected before real sales."],
  ["How are delivery details shared?", "The order flow is written for tracked delivery updates, including dispatch status, carrier movement and destination arrival notices where available."]
];

export default function App() {
  const [cart, setCart] = useState<Cart>({ "luminara-led-mask": 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const cartLines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal >= 250 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;
  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setCartOpen(true);
  };
  const removeFromCart = (id: string) => setCart((current) => {
    const next = { ...current, [id]: Math.max((current[id] || 0) - 1, 0) };
    if (!next[id]) delete next[id];
    return next;
  });
  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
    setOrderPlaced(false);
    window.setTimeout(() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }), 40);
  };
  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = (paymentMethod === "card" ? cardSchema : shippingSchema).safeParse(data);
    if (!result.success) {
      setCheckoutError("Please review the highlighted checkout fields before continuing.");
      return;
    }
    setCheckoutError("");
    setOrderPlaced(true);
    window.setTimeout(() => document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  return (
    <div id="home">
      <Header cartCount={cartCount} menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} onCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} lines={cartLines} onClose={() => setCartOpen(false)} onAdd={addToCart} onRemove={removeFromCart} onCheckout={openCheckout} />

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Elyra Maison · Original luxury care tools</p>
            <h1>Premium facial ritual tools for calm, consistent self-care.</h1>
            <p className="hero-text">A fully original luxury storefront with clear benefits, balanced product photography, visible guarantees, limited-stock cues and a secure checkout-ready flow.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#product"><Gem size={18} /> Buy now — ${mainProduct.price}</a>
              <button className="secondary-buy hero-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.9 buyer rating</span>
              <span><Truck size={16} /> Shipping today eligible</span>
              <span><ShieldCheck size={16} /> Secure Checkout</span>
              <span><Clock3 size={16} /> Limited stock</span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual product={mainProduct} large priority />
          </div>
        </section>

        <section className="strip-section" aria-label="Store assurances">
          {["Secure Checkout", "Money Back Guarantee", "Fast Shipping", "Verified Quality"].map((item) => <span key={item}>{item}</span>)}
        </section>

        <section className="landing-section">
          <div className="section-intro narrow"><p className="eyebrow">Premium ecommerce flow</p><h2>A luxury buying path with original, ownership-safe content.</h2></div>
          <div className="benefit-grid">{landingBlocks.map(([num, title, body]) => <article key={title}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="conversion-section">
          <div className="section-intro"><p className="eyebrow">Why customers buy</p><h2>Premium value explained before the first click.</h2><p>Clear benefits, urgency, guarantees and recognizable payment cues help shoppers understand the offer quickly without cluttering the luxury design.</p></div>
          <div className="conversion-grid">
            {conversionBenefits.map(([title, body]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="trust-badge-row" aria-label="Trust badges">
            {trustBadges.map(({ icon: Icon, title, body }) => <span key={title}><Icon size={19} /><strong>{title}</strong><small>{body}</small></span>)}
          </div>
        </section>

        <section id="collection" className="collection-section">
          <div className="section-intro"><p className="eyebrow">Collection page</p><h2>Original products with clear buying paths.</h2><p>Each card keeps the image contained, the product hierarchy readable and the stock message visible on every screen size.</p></div>
          <div className="cards-grid">{products.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add to cart</button></div></article>)}</div>
        </section>

        <section id="product" className="product-section">
          <div className="section-intro"><p className="eyebrow">Product page</p><h2>{mainProduct.name}</h2><p>{mainProduct.subtitle}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Limited stock offer</p>
              <h3>LED care set for a composed nightly ritual</h3>
              <p>{mainProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>High demand indicator: today’s ready-to-ship quantity is limited.</span></div>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>Product details</h4><p>{mainProduct.details}</p></article><article><h4>Shipping information</h4><p>{mainProduct.shipping}</p></article><article><h4>Return policy</h4><p>{mainProduct.returns}</p></article></div>
              <div className="purchase-actions"><button className="primary-action full" onClick={() => { addToCart(mainProduct.id); openCheckout(); }}>Buy now — secure checkout</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure checkout · tracked shipping guarantee · 60-day money-back promise</div>
            </div>
          </div>
        </section>

        <section id="ritual" className="ritual-section">
          <div className="section-intro"><p className="eyebrow">Benefits section</p><h2>Build a complete daily-use ritual in one refined journey.</h2><p>Each product has a practical role: prepare, treat, support and finish the routine with a premium lifestyle feel.</p></div>
          <div className="gallery-grid">{products.map((product) => <article key={product.id} className="gallery-card"><ProductVisual product={product} /><h3>{product.name}</h3><p>{product.description}</p></article>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust section</p><h2>Confidence signals placed before checkout.</h2><p>Shipping assurance, payment safety, money-back support and quality checks stay visible so the purchase feels considered and low-friction.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Fast tracked shipping</span><span><LockKeyhole /> Secure Checkout</span><span><RotateCcw /> Money Back Guarantee</span><span><BadgeCheck /> Verified Quality review</span><span><Banknote /> Clear pricing before payment</span></div>
        </section>

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Routine builder</p><h2>Carefully paired additions for a higher-value order.</h2><p>Each supporting item strengthens the main product story with a clear daily-use benefit and premium presentation.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card compact" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Checkout page</p><h2>Complete your Elyra Maison order.</h2><p>Validated checkout structure with clear payment reassurance, premium form spacing and a responsive order summary.</p></div><div className="checkout-grid"><form className="checkout-form" onSubmit={placeOrder}><fieldset><legend>Shipping details</legend><input required name="fullName" autoComplete="name" maxLength={100} placeholder="Full name" /><input required name="email" type="email" autoComplete="email" maxLength={255} placeholder="Email address" /><input required name="street" autoComplete="street-address" maxLength={160} placeholder="Street address" /><div className="form-row"><input required name="city" autoComplete="address-level2" maxLength={80} placeholder="City" /><input required name="postalCode" autoComplete="postal-code" maxLength={20} placeholder="Postal code" /></div><input required name="country" autoComplete="country-name" maxLength={80} placeholder="Country or region" /></fieldset><fieldset><legend>Payment</legend><label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> <span><CreditCard size={18} /> Secure card payment</span></label>{paymentMethod === "card" && <div className="card-fields"><input required name="cardNumber" placeholder="Card number" inputMode="numeric" maxLength={23} /><div className="form-row"><input required name="expiry" placeholder="MM / YY" maxLength={7} /><input required name="cvc" placeholder="CVC" inputMode="numeric" maxLength={4} /></div><input required name="cardName" autoComplete="cc-name" maxLength={100} placeholder="Name on card" /></div>}<label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> <span><Sparkles size={18} /> PayPal express option</span></label></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> Secure Checkout</span><span><BadgeCheck size={17} /> Verified Quality</span><span><Truck size={17} /> Fast Shipping</span><span><RotateCcw size={17} /> Money Back Guarantee</span></div>{checkoutError && <p className="form-error" role="alert">{checkoutError}</p>}<button className="primary-action full" disabled={!cartLines.length}>Place secure order</button></form><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${line.product.price * line.quantity}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div><p>Connect live payment processing before accepting real orders.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your care ritual order is confirmed.</h2><p>Order EM-{Date.now().toString().slice(-6)} has been recorded in this secure preview flow.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ArrowRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Reviews section</p><h2>Detailed customer feedback with visible ratings and original reviewer identities.</h2></div>
          <div className="cards-grid">{reviews.map(([name, status, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><span><BadgeCheck size={15} /> {status}</span><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Buying objections answered before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Eligible orders are packed with protective materials and released with tracking when carrier service is available. Same-day dispatch messaging applies only to products marked ready to ship." />
          <Policy title="Refund Policy" body="Eligible orders may be reviewed under a 60-day money-back guarantee. Hygiene-sensitive returns must include all parts, safe packaging and final approval under published conditions." />
          <Policy title="Privacy Policy" body="Customer details are used only for order handling, transaction protection, support replies, delivery notices and store experience improvement. Final regional notices should be added before live selling." />
          <Policy title="Terms of Service" body="Customers agree to provide accurate order details, follow product instructions and review all terms before purchase. Availability, pricing and offers may change as inventory changes." />
        </section>

        <section id="contact" className="contact-section">
          <div><p className="eyebrow">Contact page</p><h2>Private support for product, delivery and order questions.</h2><p>support@elyramaison.example · Add the final support address, registered business details and response window before live selling.</p></div>
          <div className="contact-card"><WandSparkles size={28} /><h3>Elyra Maison</h3><p>Original care tools with a quiet luxury presence.</p><p><Leaf size={16} /> Care routine support</p></div>
        </section>
      </main>

      <footer className="footer"><div><strong>Elyra Maison</strong><span>Original premium care storefront.</span></div><nav><a href="#policies">Privacy</a><a href="#policies">Terms</a><a href="#policies">Refunds</a><a href="#policies">Shipping</a></nav><div className="social-row"><a href="#home">Instagram</a><a href="#home">TikTok</a><a href="#home">Pinterest</a></div><small>© 2026 Elyra Maison. Original storefront content prepared for transferable ownership.</small></footer>
    </div>
  );
}

function Policy({ title, body }: { title: string; body: string }) {
  return <article><h3>{title}</h3><p>{body}</p></article>;
}
