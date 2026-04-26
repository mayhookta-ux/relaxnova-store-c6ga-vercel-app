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
  ["01", "Instant ritual clarity", "The main device is presented as a practical nightly anchor that adds calm structure, comfort and a more polished care moment from the first use."],
  ["02", "Daily-use confidence", "Every piece has a clear role, so the order feels useful, repeatable and worth keeping on the vanity instead of decorative alone."],
  ["03", "Reassurance beside action", "Checkout safety, guarantee language, delivery notes and support cues remain close to the buying decision."],
  ["04", "Premium presentation", "Contained imagery, readable hierarchy and balanced actions keep the store refined across desktop, tablet and mobile layouts."]
];

const conversionBenefits = [
  ["A calmer daily ritual", "The set turns a scattered care moment into a short, composed sequence that feels easier to begin and satisfying to finish."],
  ["Visible routine value", "The device adds a cleaner-looking ritual setup, a composed vanity presence and a care step buyers can understand without exaggerated claims."],
  ["Comfort-first appeal", "A cushioned feel, clear session guidance and included essentials help buyers picture regular use before they commit."],
  ["Protected purchase feeling", "Guarantee, delivery, payment and support cues appear before checkout so buyers do not need to search for reassurance."]
];

const trustBadges = [
  { icon: ShieldCheck, title: "Secure Checkout", body: "Protected payment path" },
  { icon: RotateCcw, title: "30-Day Guarantee", body: "Clear confidence window" },
  { icon: Truck, title: "Fast Delivery", body: "Tracked release on eligible orders" },
  { icon: HeartHandshake, title: "Premium Support", body: "Order help from first click" },
  { icon: BadgeCheck, title: "Verified Quality", body: "Reviewed product presentation" }
];

const paymentMethods = ["Major cards", "Digital wallet", "Express pay", "Encrypted form"];

const reviews = [
  ["Mara Ellis", "Verified buyer · evening routine", "I wanted something that would make my night routine feel less rushed. The page explained the purpose clearly, and the set feels refined without being fussy."],
  ["Ren Okafor", "Verified buyer · apartment vanity", "The safety and delivery details were easy to spot, which mattered to me. I added it after checking the guarantee and included pieces."],
  ["Lina Brooks", "Verified buyer · gift order", "I chose it as a gift because the products felt coordinated and useful. The presentation made it feel personal rather than like a random beauty tool."],
  ["Cam Rivera", "Verified buyer · nightly care user", "The wording felt honest about comfort and consistency. I liked that it did not promise too much, but still made the routine feel worth upgrading."],
  ["Noa Bennett", "Verified buyer · first device purchase", "I compared everything on my phone and nothing felt confusing. The price, stock note and support details helped me feel comfortable ordering."],
  ["Priya Hart", "Verified buyer · routine builder", "The add-ons made sense because each one had a job. It felt like building a quiet, complete care ritual instead of buying extra items just to spend more."]
];

const faqs = [
  ["When will my order move toward delivery?", "Items marked ready for the active packing window are prepared for tracked release after order details are complete and carrier service is available."],
  ["Is the payment area designed safely?", "The checkout keeps payment language clear, validates required fields and avoids unsafe script patterns. Connect a live payment provider before accepting real orders."],
  ["What if the order is not the right fit?", "Eligible orders may be reviewed within the 30-day guarantee window when the item is complete, carefully packed and aligned with the final return conditions."],
  ["What does the guarantee cover?", "The guarantee gives buyers a defined review window while keeping product condition and hygiene-aware rules clear before purchase."],
  ["Will I understand how to use it?", "The product area explains the routine role, included pieces and daily sequence so buyers can picture the care moment before checkout."],
  ["Why consider the full ritual set?", "The full set creates a practical flow: prepare, complete the light ritual, add a smooth finish and make daily self-care feel more intentional."]
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
    const data = new FormData(form);
    if (!isCheckoutValid(data, paymentMethod)) {
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
            <h1>Give your nightly skincare a calmer, more polished reason to happen.</h1>
            <p className="hero-text">This refined light ritual set helps daily care feel organized, comfortable and visibly more considered, while trust cues stay close so the decision feels protected.</p>
            <div className="hero-actions">
              <a className="primary-action hero-primary" href="#product"><Gem size={19} /> Buy now — ${mainProduct.price}</a>
              <button className="secondary-buy hero-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.9 buyer rating</span>
              <span><Truck size={16} /> Fast delivery eligible</span>
              <span><ShieldCheck size={16} /> Secure Checkout</span>
              <span><Clock3 size={16} /> Limited stock</span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual product={mainProduct} large priority />
          </div>
        </section>

        <section className="strip-section" aria-label="Store assurances">
          {trustBadges.map(({ icon: Icon, title }) => <span key={title}><Icon size={18} /> {title}</span>)}
        </section>

        <section className="reassurance-section" aria-label="Buyer reassurance">
          <article><ShieldCheck size={21} /><h3>Protected from the first click</h3><p>Payment safety, delivery clarity and guarantee support stay visible so the buying path feels steady and easy to trust.</p></article>
          <article><Gem size={21} /><h3>Premium value beyond display</h3><p>The main device is framed as a repeatable self-care anchor that makes daily care feel more composed, not a one-time novelty.</p></article>
          <article><Clock3 size={21} /><h3>Measured popularity signal</h3><p>Availability cues stay calm and specific, giving first-time buyers confidence without loud pressure or forced urgency.</p></article>
        </section>

        <section className="landing-section">
          <div className="section-intro narrow"><p className="eyebrow">Premium ecommerce flow</p><h2>A refined buying path built around clarity, trust and daily-use value.</h2></div>
          <div className="benefit-grid">{landingBlocks.map(([num, title, body]) => <article key={title}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="conversion-section">
          <div className="section-intro"><p className="eyebrow">Why customers buy</p><h2>A polished ritual that feels personal, useful and gift-worthy.</h2><p>The hero product gives structure to a short care moment, while the supporting pieces add preparation, glide and finishing comfort for a routine customers can return to daily.</p></div>
          <div className="conversion-grid">
            {conversionBenefits.map(([title, body]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="trust-badge-row" aria-label="Trust badges">
            {trustBadges.map(({ icon: Icon, title, body }) => <span key={title}><Icon size={19} /><strong>{title}</strong><small>{body}</small></span>)}
          </div>
        </section>

        <section id="collection" className="collection-section">
          <div className="section-intro"><p className="eyebrow">Collection page</p><h2>Premium care pieces with clear reasons to buy.</h2><p>Each card keeps the image contained, the product hierarchy readable and the stock message visible on every screen size.</p></div>
          <div className="cards-grid">{products.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add to cart</button></div></article>)}</div>
        </section>

        <section id="product" className="product-section">
          <div className="section-intro"><p className="eyebrow">Product page</p><h2>{mainProduct.name}</h2><p>{mainProduct.subtitle}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Limited stock offer</p>
              <h3>A nightly ritual set for calmer, more confident care</h3>
              <p>{mainProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>High demand: today’s ready-to-pack quantity is reserved for orders completed during the active window.</span></div>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>Product details</h4><p>{mainProduct.details}</p></article><article><h4>Shipping information</h4><p>{mainProduct.shipping}</p></article><article><h4>Return policy</h4><p>{mainProduct.returns}</p></article></div>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={() => { addToCart(mainProduct.id); openCheckout(); }}>Buy now — secure checkout</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure Checkout · Fast Shipping · 30-Day Guarantee · Premium Support · Verified Quality</div>
            </div>
          </div>
        </section>

        <section id="ritual" className="ritual-section">
          <div className="section-intro"><p className="eyebrow">Benefits section</p><h2>Build a complete daily-use ritual in one refined journey.</h2><p>Each product has a practical role: prepare the skin feel, guide the light session, add cushion and finish with a quiet premium moment that makes daily care easier to repeat.</p></div>
          <div className="gallery-grid">{products.map((product) => <article key={product.id} className="gallery-card"><ProductVisual product={product} /><h3>{product.name}</h3><p>{product.description}</p></article>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust section</p><h2>Confidence signals placed before checkout.</h2><p>Delivery assurance, payment safety, guarantee support and premium assistance stay visible so the purchase feels considered, protected and easy to complete.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Fast tracked delivery</span><span><LockKeyhole /> Secure Checkout</span><span><RotateCcw /> 30-Day Guarantee</span><span><HeartHandshake /> Premium Support</span><span><BadgeCheck /> Verified Quality</span><span><Banknote /> Clear pricing before payment</span></div>
        </section>

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Routine builder</p><h2>Carefully paired additions for a higher-value order.</h2><p>Each supporting item strengthens the main product story with a clear daily-use benefit, smooth presentation and a stronger reason to complete the full care set.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card compact" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Checkout page</p><h2>Complete your Elyra Maison order.</h2><p>Validated checkout structure with clear payment reassurance, premium form spacing and a responsive order summary.</p></div><div className="checkout-grid"><form className="checkout-form" onSubmit={placeOrder}><fieldset><legend>Shipping details</legend><input required name="fullName" autoComplete="name" maxLength={100} placeholder="Full name" /><input required name="email" type="email" autoComplete="email" maxLength={255} placeholder="Email address" /><input required name="street" autoComplete="street-address" maxLength={160} placeholder="Street address" /><div className="form-row"><input required name="city" autoComplete="address-level2" maxLength={80} placeholder="City" /><input required name="postalCode" autoComplete="postal-code" maxLength={20} placeholder="Postal code" /></div><input required name="country" autoComplete="country-name" maxLength={80} placeholder="Country or region" /></fieldset><fieldset><legend>Payment</legend><label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> <span><CreditCard size={18} /> Secure card payment</span></label>{paymentMethod === "card" && <div className="card-fields"><input required name="cardNumber" placeholder="Card number" inputMode="numeric" maxLength={23} /><div className="form-row"><input required name="expiry" placeholder="MM / YY" maxLength={7} /><input required name="cvc" placeholder="CVC" inputMode="numeric" maxLength={4} /></div><input required name="cardName" autoComplete="cc-name" maxLength={100} placeholder="Name on card" /></div>}<label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "express"} onChange={() => setPaymentMethod("express")} /> <span><Sparkles size={18} /> Express checkout option</span></label></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> Secure Checkout</span><span><HeartHandshake size={17} /> Premium Support</span><span><Truck size={17} /> Fast Delivery</span><span><RotateCcw size={17} /> 30-Day Guarantee</span></div>{checkoutError && <p className="form-error" role="alert">{checkoutError}</p>}<button className="primary-action full" disabled={!cartLines.length}>Place secure order</button></form><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${line.product.price * line.quantity}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div><p>Connect live payment processing before accepting real orders.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your care ritual order is confirmed.</h2><p>Order EM-{Date.now().toString().slice(-6)} has been recorded in this secure preview flow.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ArrowRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Reviews section</p><h2>Natural premium reviews with visible ratings and buyer context.</h2><p>Customer-style feedback highlights daily use, delivery confidence, mobile clarity and practical buying reassurance in a believable tone.</p></div>
          <div className="cards-grid">{reviews.map(([name, status, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><span><BadgeCheck size={15} /> {status}</span><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Buying objections answered before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Eligible orders are packed with protective materials and prepared for tracked release when carrier service is available. Fast delivery language applies only to items marked ready for the current packing window." />
          <Policy title="Refund Policy" body="Eligible orders may be reviewed within a 30-day guarantee framework. Hygiene-sensitive items must return complete, safely packed and approved under the final published return conditions." />
          <Policy title="Privacy Policy" body="Customer details are intended only for order handling, transaction protection, support replies, delivery notices and store experience improvement. Final regional disclosures should be added before live selling." />
          <Policy title="Terms of Service" body="Customers agree to provide accurate order details, review product guidance and confirm all purchase terms before ordering. Availability, pricing and offers may change as inventory changes." />
        </section>

        <section id="contact" className="contact-section">
          <div><p className="eyebrow">Contact page</p><h2>Private support for product, delivery and order questions.</h2><p>support@elyramaison.example · Replace with your final support inbox, registered business details and response window before live selling.</p></div>
          <div className="contact-card"><WandSparkles size={28} /><h3>Elyra Maison</h3><p>Original care tools with a quiet luxury presence.</p><p><Leaf size={16} /> Care routine support</p><p><ShieldCheck size={16} /> Secure order assistance</p></div>
        </section>
      </main>

      <footer className="footer"><div><strong>Elyra Maison</strong><span>Original premium care storefront.</span><span>support@elyramaison.example</span></div><nav aria-label="Legal footer"><a href="#policies">Privacy Policy</a><a href="#policies">Refund Policy</a><a href="#policies">Shipping Policy</a><a href="#policies">Terms of Service</a><a href="#contact">Contact</a></nav><div className="social-row"><span>Secure Checkout</span><span>30-Day Guarantee</span><span>Fast Delivery</span><span>Premium Support</span><span>Verified Quality</span></div><small>© 2026 Elyra Maison. All store wording, product presentation and customer-style content are original to this storefront.</small></footer>
    </div>
  );
}

function Policy({ title, body }: { title: string; body: string }) {
  return <article><h3>{title}</h3><p>{body}</p></article>;
}
