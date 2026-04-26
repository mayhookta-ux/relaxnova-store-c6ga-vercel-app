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
  ["01", "Purpose before price", "Each item states its routine role, daily benefit and reason to own it before shoppers reach checkout."],
  ["02", "Premium routine logic", "The collection moves from cleansing prep to treatment support and finishing care, so every add-on has a clear purpose."],
  ["03", "Confidence beside action", "Delivery, returns, payment safety and support cues stay close to the product decision points."],
  ["04", "Retail-grade responsiveness", "Contained photos, readable copy and balanced buttons remain stable across desktop, tablet and mobile layouts."]
];

const conversionBenefits = [
  ["Built for repeat use", "The signature device gives structure to a short evening ritual for customers who want a composed care habit at home."],
  ["Visible routine motivation", "Consistent use helps the ritual feel more intentional, giving customers a clear reason to return to it night after night."],
  ["Confidence before checkout", "Guarantee, delivery, payment and support cues appear before checkout so buyers do not need to hunt for reassurance."],
  ["Luxury that feels practical", "The products support a calmer vanity routine while still looking polished enough for gifting or daily display."]
];

const trustBadges = [
  { icon: ShieldCheck, title: "Secure Checkout", body: "Protected payment path" },
  { icon: RotateCcw, title: "30-Day Guarantee", body: "Clear confidence window" },
  { icon: Truck, title: "Fast Delivery", body: "Tracked release on eligible orders" },
  { icon: HeartHandshake, title: "Premium Support", body: "Order help from first click" }
];

const paymentMethods = ["Major cards", "Digital wallet", "Express pay", "Encrypted form"];

const reviews = [
  ["Mara Ellis", "Verified buyer · evening routine", "I wanted something that felt easy to keep using. The page explained the timing, the parts included and the reason for the price without overselling it."],
  ["Ren Vale", "Verified buyer · city apartment", "The trust badges were right under the first section, so I did not have to search for delivery or checkout reassurance before deciding."],
  ["Lina Corren", "Verified buyer · gift purchase", "The serum and prep tool made sense as additions. The cards were clear on my phone, and the prices were easy to compare."],
  ["Cam Arden", "Verified buyer · nightly care user", "The stock note felt useful rather than pushy. I liked that the copy stayed specific and calm instead of making huge promises."],
  ["Noa Merren", "Verified buyer · small vanity setup", "The product photos looked balanced and the details answered practical questions. It felt like a polished shop, not a template."],
  ["Tessa Rowan", "Verified buyer · first device order", "The Buy Now button was easy to spot, and the guarantee wording gave me enough confidence to move forward with the set."]
];

const faqs = [
  ["How long does delivery usually take?", "Items marked ready for the current packing window are prepared for tracked release as soon as order details are complete and carrier service is available."],
  ["Is the checkout structure safe?", "The checkout uses validated fields, limited input lengths and clean React-rendered text without unsafe script injection patterns. Connect a live payment provider before accepting real orders."],
  ["Can I return an eligible order?", "Eligible orders can be reviewed within a 30-day guarantee window when the item is complete, safely packed and aligned with the final published return conditions."],
  ["What does the guarantee cover?", "The guarantee is written to support careful buying confidence, covering eligible order concerns under clear hygiene-aware and product-condition guidelines."],
  ["Will I feel confident using the product?", "The product section explains the daily role, included parts and routine sequence so customers understand how it fits into a composed self-care moment."],
  ["Why choose the full ritual?", "The full set creates a practical care flow: prepare, use the hero device, support the skin feel and finish with a calm premium routine."]
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
            <h1>Premium facial ritual tools for calm, consistent self-care.</h1>
            <p className="hero-text">Create a composed evening ritual with premium tools that feel beautiful on the vanity, simple to use and reassuring to buy today.</p>
            <div className="hero-actions">
              <a className="primary-action hero-primary" href="#product"><Gem size={18} /> Buy now — ${mainProduct.price}</a>
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
          {trustBadges.map(({ icon: Icon, title }) => <span key={title}><Icon size={18} /> {title}</span>)}
        </section>

        <section className="landing-section">
          <div className="section-intro narrow"><p className="eyebrow">Premium ecommerce flow</p><h2>A luxury buying path with original, ownership-safe content.</h2></div>
          <div className="benefit-grid">{landingBlocks.map(([num, title, body]) => <article key={title}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="conversion-section">
          <div className="section-intro"><p className="eyebrow">Why customers buy</p><h2>A polished ritual that feels personal, useful and gift-worthy.</h2><p>The store explains what the hero product does, why daily use matters and how each supporting item creates a calmer premium care routine.</p></div>
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
              <h3>Light care set for a composed nightly ritual</h3>
              <p>{mainProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>High demand indicator: today’s ready-to-ship quantity is limited.</span></div>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>Product details</h4><p>{mainProduct.details}</p></article><article><h4>Shipping information</h4><p>{mainProduct.shipping}</p></article><article><h4>Return policy</h4><p>{mainProduct.returns}</p></article></div>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={() => { addToCart(mainProduct.id); openCheckout(); }}>Buy now — secure checkout</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure checkout · tracked shipping guarantee · 60-day money-back promise</div>
            </div>
          </div>
        </section>

        <section id="ritual" className="ritual-section">
          <div className="section-intro"><p className="eyebrow">Benefits section</p><h2>Build a complete daily-use ritual in one refined journey.</h2><p>Each product has a practical role: prepare, treat, support and finish the routine with a premium lifestyle feel that makes daily care easier to repeat.</p></div>
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
          <div className="section-intro"><p className="eyebrow">Reviews section</p><h2>Original customer feedback with visible ratings and buyer context.</h2><p>Each review uses fresh wording, fictional customer identities and practical purchase details for a credible premium presentation.</p></div>
          <div className="cards-grid">{reviews.map(([name, status, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><span><BadgeCheck size={15} /> {status}</span><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Buying objections answered before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Eligible orders are packed with protective materials and prepared for tracked release when carrier service is available. Same-day messaging applies only to items marked ready for the current packing window." />
          <Policy title="Refund Policy" body="Eligible orders may be reviewed within a 60-day money-back framework. Hygiene-sensitive items must return complete, safely packed and approved under the final published return conditions." />
          <Policy title="Privacy Policy" body="Customer details are intended only for order handling, transaction protection, support replies, delivery notices and store experience improvement. Final regional disclosures should be added before live selling." />
          <Policy title="Terms of Service" body="Customers agree to provide accurate order details, review product guidance and confirm all purchase terms before ordering. Availability, pricing and offers may change as inventory changes." />
        </section>

        <section id="contact" className="contact-section">
          <div><p className="eyebrow">Contact page</p><h2>Private support for product, delivery and order questions.</h2><p>support@elyramaison.example · Replace with your final support inbox, registered business details and response window before live selling.</p></div>
          <div className="contact-card"><WandSparkles size={28} /><h3>Elyra Maison</h3><p>Original care tools with a quiet luxury presence.</p><p><Leaf size={16} /> Care routine support</p><p><ShieldCheck size={16} /> Secure order assistance</p></div>
        </section>
      </main>

      <footer className="footer"><div><strong>Elyra Maison</strong><span>Original premium care storefront.</span><span>support@elyramaison.example</span></div><nav aria-label="Legal footer"><a href="#policies">Privacy Policy</a><a href="#policies">Refund Policy</a><a href="#policies">Shipping Policy</a><a href="#policies">Terms of Service</a></nav><div className="social-row"><span>Secure Checkout</span><span>Money Back Guarantee</span><span>Fast Shipping</span><span>Premium Quality Guarantee</span></div><small>© 2026 Elyra Maison. Fresh original store copy, fictional reviews and original product naming prepared for transferable ownership.</small></footer>
    </div>
  );
}

function Policy({ title, body }: { title: string; body: string }) {
  return <article><h3>{title}</h3><p>{body}</p></article>;
}
