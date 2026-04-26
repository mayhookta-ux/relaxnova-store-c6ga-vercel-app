import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, Gem, HeartHandshake, Leaf, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Star, Truck, WandSparkles } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { PaymentTestModeBanner } from "./components/PaymentTestModeBanner";
import { StripeEmbeddedCheckout } from "./components/StripeEmbeddedCheckout";
import { ProductVisual } from "./components/ProductVisual";
import { addOns, mainProduct, neckMassagerProduct, products } from "./data/products";

type Cart = Record<string, number>;

const landingBlocks = [
  ["01", "Instant ritual clarity", "The main device is presented as a practical nightly anchor that adds calm structure, comfort and a more polished care moment from the first use."],
  ["02", "Daily-use confidence", "Every piece has a clear role, so the order feels useful, repeatable and worth keeping on the vanity instead of decorative alone."],
  ["03", "Reassurance beside action", "Checkout safety, guarantee language, delivery notes and support cues remain close to the buying decision."],
  ["04", "Premium presentation", "Contained imagery, readable hierarchy and balanced actions keep the store refined across desktop, tablet and mobile layouts."]
];

const conversionBenefits = [
  ["A calmer daily ritual", "The light mask creates a short, polished skincare moment that feels easier to repeat and more intentional at night."],
  ["Everyday neck comfort", "The portable massager gives first-time buyers a simple comfort upgrade for desk breaks, travel days and evening decompression."],
  ["Comfort-first appeal", "Soft contact surfaces, clear sessions and included essentials help buyers picture regular use before they commit."],
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
  ["Mara Ellis", "Verified buyer · light ritual", "The mask felt like a thoughtful upgrade to my evening routine. I liked that the page explained comfort, use and delivery without making unrealistic promises."],
  ["Ren Okafor", "Verified buyer · neck comfort", "The neck massager made sense for my workday. The product felt premium, the use instructions were clear and the guarantee detail made ordering easier."],
  ["Lina Brooks", "Verified buyer · gift order", "I chose the neck massager for a birthday gift because it felt useful, polished and not too personal. The packaging details gave me confidence."],
  ["Cam Rivera", "Verified buyer · first device purchase", "The trust badges and reviews helped because I was ordering a device for the first time. The wording felt calm and believable."],
  ["Noa Bennett", "Verified buyer · mobile order", "I compared both products on my phone and the buying buttons were easy to find. The shipping and return notes answered what I needed."],
  ["Priya Hart", "Verified buyer · routine builder", "The beauty device and neck massager each had a clear purpose. It felt like choosing a better daily reset, not just adding another gadget."]
];

const faqs = [
  ["When will my order move toward delivery?", "Items marked ready for the active packing window are prepared for tracked release after order details are complete and carrier service is available."],
  ["Is the payment area designed safely?", "The checkout keeps payment language clear, validates required fields and avoids unsafe script patterns. Connect a live payment provider before accepting real orders."],
  ["What if the order is not the right fit?", "Eligible orders may be reviewed within the 30-day guarantee window when the item is complete, carefully packed and aligned with the final return conditions."],
  ["What does the guarantee cover?", "The guarantee gives buyers a defined review window while keeping product condition and hygiene-aware rules clear before purchase."],
  ["Will I understand how to use each product?", "Each landing page explains the daily role, included pieces and simple use sequence so buyers can picture the care moment before checkout."],
  ["Which product is easiest to buy first?", "The neck massager is the simpler first-time choice because its comfort purpose is immediate, portable and easy to understand for home, desk or travel use."]
];

export default function App() {
  const [cart, setCart] = useState<Cart>({ "luminara-led-mask": 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const cartLines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal >= 250 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;
  const checkoutItems = cartLines.map((line) => ({ productId: line.product.id, quantity: line.quantity }));
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
            <p className="eyebrow">Elyra Maison · Original luxury care tools</p>
            <h1>Choose a premium daily reset that feels useful from the first moment.</h1>
            <p className="hero-text">Elyra Maison now brings together refined light skincare and portable neck comfort, giving buyers a clear beauty-and-wellness upgrade with secure checkout confidence close to every action.</p>
            <div className="hero-actions">
              <a className="primary-action hero-primary" href="#neck-massager"><Gem size={19} /> Buy neck massager — ${neckMassagerProduct.price}</a>
              <button className="secondary-buy hero-buy" onClick={() => addToCart(neckMassagerProduct.id)}>Add to cart</button>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.9 buyer rating</span>
              <span><Truck size={16} /> Fast delivery eligible</span>
              <span><ShieldCheck size={16} /> Secure Checkout</span>
              <span><Clock3 size={16} /> Popular daily comfort choice</span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual product={neckMassagerProduct} large priority />
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
          <div className="section-intro"><p className="eyebrow">Collection page</p><h2>Two premium hero products with clear reasons to buy.</h2><p>The light mask keeps the beauty ritual refined, while the portable neck massager adds an easier first purchase for everyday comfort and gifting.</p></div>
          <div className="cards-grid">{products.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add to cart</button></div></article>)}</div>
        </section>

        <section id="led-mask" className="product-section">
          <div className="section-intro"><p className="eyebrow">LED beauty landing page</p><h2>{mainProduct.name}</h2><p>{mainProduct.subtitle}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Limited stock offer</p>
              <h3>A premium light ritual for polished nightly care</h3>
              <p>{mainProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>High demand: today’s ready-to-pack quantity is reserved for orders completed during the active window.</span></div>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>Product description</h4><p>{mainProduct.details}</p></article><article><h4>Daily beauty value</h4><p>Use during a short evening pause when you want skincare to feel more organized, comfortable and visually polished.</p></article><article><h4>Usage confidence</h4><p>Secure the fit, choose a comfortable light setting and follow the brief guided session without extending the routine.</p></article><article><h4>Shipping confidence</h4><p>{mainProduct.shipping}</p></article><article><h4>Refund reassurance</h4><p>{mainProduct.returns}</p></article><article><h4>Secure checkout reassurance</h4><p>Checkout keeps pricing, payment fields and support cues visible before order placement.</p></article></div>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={() => { addToCart(mainProduct.id); openCheckout(); }}>Buy now — secure checkout</button><button className="secondary-buy" onClick={() => addToCart(mainProduct.id)}>Add to cart</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure Checkout · Fast Shipping · 30-Day Guarantee · Premium Support · Verified Quality</div>
            </div>
          </div>
          <div className="product-benefit-grid">
            <article><Gem size={20} /><h3>Why it matters</h3><p>It gives nightly skincare a clear focal point, making the routine feel intentional instead of scattered.</p></article>
            <article><HeartHandshake size={20} /><h3>Emotional value</h3><p>The cushioned fit and refined finish create a quieter care moment that feels premium without feeling complicated.</p></article>
            <article><BadgeCheck size={20} /><h3>Visible expectation</h3><p>The device adds a polished vanity presence and a repeatable ritual buyers can understand from the first visit.</p></article>
          </div>
        </section>

        <section id="neck-massager" className="product-section product-section-alt">
          <div className="section-intro"><p className="eyebrow">Neck massager landing page</p><h2>{neckMassagerProduct.name}</h2><p>{neckMassagerProduct.subtitle}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={neckMassagerProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Easy first purchase</p>
              <h3>Portable comfort for screen-heavy days and quiet evening resets</h3>
              <p>{neckMassagerProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {neckMassagerProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>Popular comfort pick: current ready-to-pack units are set aside for completed orders during today’s active window.</span></div>
              <div className="price-row"><strong>${neckMassagerProduct.price}</strong><span>${neckMassagerProduct.compareAt}</span><em>Save ${neckMassagerProduct.compareAt! - neckMassagerProduct.price}</em></div>
              <ul>{neckMassagerProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>Product description</h4><p>{neckMassagerProduct.details}</p></article><article><h4>Daily comfort value</h4><p>Use for short seated pauses after laptop work, travel or evening chores when you want a calmer transition into rest.</p></article><article><h4>Usage confidence</h4><p>Place around the neck, select a comfortable mode and keep sessions brief, relaxed and guided by personal comfort.</p></article><article><h4>Shipping confidence</h4><p>{neckMassagerProduct.shipping}</p></article><article><h4>Refund reassurance</h4><p>{neckMassagerProduct.returns}</p></article><article><h4>Secure checkout reassurance</h4><p>Checkout keeps pricing, payment fields and support cues visible before order placement.</p></article></div>
              <div className="purchase-actions"><button className="primary-action full buy-now-strong" onClick={() => { addToCart(neckMassagerProduct.id); openCheckout(); }}>Buy now — secure checkout</button><button className="secondary-buy" onClick={() => addToCart(neckMassagerProduct.id)}>Add to cart</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure Checkout · Fast Delivery · 30-Day Guarantee · Premium Support · Verified Quality</div>
            </div>
          </div>
          <div className="product-benefit-grid">
            <article><Gem size={20} /><h3>Why it matters</h3><p>It turns an ordinary pause into a premium comfort ritual that feels easy to use and simple to justify.</p></article>
            <article><HeartHandshake size={20} /><h3>Emotional value</h3><p>The soft wraparound shape helps the buyer imagine ending a busy day with a calmer, more cared-for feeling.</p></article>
            <article><BadgeCheck size={20} /><h3>Visible expectation</h3><p>The product adds a polished wellness object to the routine and gives a clear, practical reason to return to it often.</p></article>
          </div>
        </section>

        <section id="ritual" className="ritual-section">
          <div className="section-intro"><p className="eyebrow">Benefits section</p><h2>Build a complete beauty and comfort ritual in one refined journey.</h2><p>The light device adds polished skincare structure, while the neck massager creates an easier daily comfort reason buyers can understand immediately.</p></div>
          <div className="gallery-grid">{products.map((product) => <article key={product.id} className="gallery-card"><ProductVisual product={product} /><h3>{product.name}</h3><p>{product.description}</p></article>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust section</p><h2>Confidence signals placed before checkout.</h2><p>Delivery assurance, payment safety, guarantee support and premium assistance stay visible so the purchase feels considered, protected and easy to complete.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Fast tracked delivery</span><span><LockKeyhole /> Secure Checkout</span><span><RotateCcw /> 30-Day Guarantee</span><span><HeartHandshake /> Premium Support</span><span><BadgeCheck /> Verified Quality</span><span><Banknote /> Clear pricing before payment</span></div>
        </section>

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Routine builder</p><h2>Carefully paired additions for a higher-value routine.</h2><p>Supporting items remain optional and clearly useful, helping shoppers extend the beauty ritual without distracting from the two main product pages.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card compact" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Secure checkout</p><h2>Complete your Elyra Maison order.</h2><p>Protected embedded checkout supports major cards and eligible wallet payments including Apple Pay and Google Pay when available on the buyer device.</p></div><div className="checkout-grid"><div className="checkout-form"><fieldset><legend>Order contact</legend><input name="email" type="email" autoComplete="email" maxLength={255} placeholder="Email for order confirmation" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} /></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> Secure Checkout</span><span><CreditCard size={17} /> Visa and Mastercard support</span><span><Sparkles size={17} /> Apple Pay and Google Pay when eligible</span><span><HeartHandshake size={17} /> Premium Support</span><span><Truck size={17} /> Fast Delivery</span><span><RotateCcw size={17} /> 30-Day Guarantee</span></div>{cartLines.length ? <StripeEmbeddedCheckout items={checkoutItems} customerEmail={customerEmail} /> : <p className="form-error" role="alert">Add an item to your cart before starting checkout.</p>}</div><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${line.product.price * line.quantity}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div><p>After payment, the order is confirmed, saved securely, and prepared in a CJ Dropshipping-ready fulfillment structure.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your care ritual order is confirmed.</h2><p>Your payment was completed securely. A customer email confirmation can be sent once your branded sender domain is connected, and the order record is ready for CJ Dropshipping fulfillment review.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ArrowRight size={17} /></button></section>}

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
