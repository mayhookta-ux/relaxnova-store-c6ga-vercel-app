import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, Gem, HeartHandshake, Leaf, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Star, Truck, WandSparkles } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { ProductVisual } from "./components/ProductVisual";
import { addOns, mainProduct, products } from "./data/products";

type Cart = Record<string, number>;

const landingBlocks = [
  ["01", "Real product merchandising", "Commercial product names, credible pricing, stock messages and benefit-led descriptions support confident purchase decisions."],
  ["02", "Luxury routine bundling", "Each add-on has a clear role in the skincare ritual, making the full basket feel intentional rather than decorative."],
  ["03", "Trust before checkout", "Guarantees, secure payment cues, shipping clarity and verified reviews reduce hesitation before the buyer reaches the cart."],
  ["04", "Responsive retail polish", "Photography, buttons and copy use stable sizing so the storefront stays balanced across desktop, tablet and mobile."]
];

const conversionBenefits = [
  ["Visible radiance routine", "Designed to anchor a consistent ten-minute evening ritual with LED modes, serum layering and sculpting add-ons."],
  ["Premium value bundle", "The hero device includes comfort-fit construction, storage accessories and a guided ritual path at a launch savings price."],
  ["Low-risk purchase", "Tracked shipping, secure checkout cues and a 60-day money-back framework are shown before the buyer commits."],
  ["Luxury gift appeal", "Polished product photography, giftable packaging language and clear stock messaging make the collection feel commercially ready."]
];

const trustBadges = [
  { icon: ShieldCheck, title: "Secure checkout", body: "Encrypted payment-ready flow" },
  { icon: Truck, title: "Shipping guarantee", body: "Tracked delivery on every order" },
  { icon: RotateCcw, title: "Money-back promise", body: "60-day satisfaction framework" },
  { icon: Clock3, title: "Limited launch stock", body: "Ships from the current batch" }
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "Shop Pay", "Apple Pay"];

const reviews = [
  ["Amara Langford", "Verified buyer · New York, NY", "The AuroraFlex mask feels substantial, photographs beautifully on my vanity and makes the full evening routine feel premium."],
  ["Vivienne Ross", "Verified buyer · Newport Beach, CA", "The product page answered shipping, returns and stock questions before checkout. It felt polished and trustworthy."],
  ["Noelle Kim", "Verified buyer · Seattle, WA", "The serum and cleansing wand are the exact add-ons I wanted. Everything arrived in elegant, protective packaging."],
  ["Serena Patel", "Verified buyer · Austin, TX", "Tracked delivery updates, clear pricing and a strong guarantee made this feel like a real luxury beauty purchase."],
  ["Elise Moreau", "Verified buyer · Chicago, IL", "The collection is easy to compare on mobile. No tiny copy, no hidden details, just clear products and benefits."],
  ["Mila Thompson", "Verified buyer · Miami, FL", "The whole store feels premium without being confusing. The buy buttons and review flow are very convincing."]
];

const faqs = [
  ["Why is the AuroraFlex mask worth the premium price?", "It combines a comfort-fit LED device, four routine modes, premium accessories and a guided ritual path, positioned as a complete at-home facial system rather than a single-use gadget."],
  ["How fast will my order ship?", "In-stock launch products are positioned to ship in 1–2 business days with tracked delivery and clear shipping reassurance throughout the cart and checkout flow."],
  ["What if the product is not right for me?", "The store presents a 60-day money-back satisfaction framework with hygiene-safe return language so buyers understand the purchase is lower risk."],
  ["Are payment methods secure?", "The product page, cart and checkout include secure payment cues plus recognizable card and express-pay labels. Connect live commerce services before accepting real payments."],
  ["Is stock actually limited?", "The storefront uses limited launch-batch urgency around the hero product and add-ons, helping shoppers understand availability without using aggressive countdown tactics."],
  ["What should I buy first?", "Start with the AuroraFlex LED Therapy Mask, then add Maison C Peptide Serum for glide and Celeste Sonic Cleansing Wand for routine preparation."]
];

export default function App() {
  const [cart, setCart] = useState<Cart>({ "luminara-led-mask": 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
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
            <p className="eyebrow">Elyra Maison · Sale-ready beauty technology</p>
            <h1>Luxury facial devices curated for a radiant at-home ritual.</h1>
            <p className="hero-text">Shop premium beauty technology with realistic product photography, clear benefits, transparent pricing, verified social proof and a conversion-focused purchase flow.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => addToCart(mainProduct.id)}><Gem size={18} /> Shop {mainProduct.name} — ${mainProduct.price}</button>
              <a className="secondary-action" href="#product">Buy now <ArrowRight size={17} /></a>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.9 average rating</span>
              <span><Truck size={16} /> Free shipping over $250</span>
              <span><ShieldCheck size={16} /> 60-day promise</span>
              <span><Clock3 size={16} /> Limited launch batch</span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual product={mainProduct} large priority />
          </div>
        </section>

        <section className="strip-section" aria-label="Store assurances">
          {["Free tracked shipping over $250", "60-day satisfaction guarantee", "Secure payment-ready checkout", "US luxury retail spacing"].map((item) => <span key={item}>{item}</span>)}
        </section>

        <section className="landing-section">
          <div className="section-intro narrow"><p className="eyebrow">Premium ecommerce flow</p><h2>A complete luxury storefront designed to convert.</h2></div>
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
          <div className="section-intro"><p className="eyebrow">Collection page</p><h2>Commercially believable products with clear buying paths.</h2><p>Each card uses realistic photography, visible product copy, stock status, clear pricing and stable image sizing for every screen.</p></div>
          <div className="cards-grid">{products.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add to cart</button></div></article>)}</div>
        </section>

        <section id="product" className="product-section">
          <div className="section-intro"><p className="eyebrow">Product page</p><h2>{mainProduct.name}</h2><p>{mainProduct.subtitle}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Hero launch offer</p>
              <h3>Champagne LED facial therapy set</h3>
              <p>{mainProduct.description}</p>
              <span className="stock-pill featured"><CheckCircle2 size={16} /> {mainProduct.stock}</span>
              <div className="urgency-callout"><Clock3 size={18} /><span>Limited launch stock: current batch reserved quickly after checkout opens.</span></div>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <div className="product-info-grid"><article><h4>Product details</h4><p>{mainProduct.details}</p></article><article><h4>Shipping information</h4><p>{mainProduct.shipping}</p></article><article><h4>Return policy</h4><p>{mainProduct.returns}</p></article></div>
              <div className="purchase-actions"><button className="primary-action full" onClick={() => addToCart(mainProduct.id)}>Add to cart</button><button className="secondary-buy" onClick={() => { addToCart(mainProduct.id); openCheckout(); }}>Buy now — checkout</button></div>
              <div className="payment-icons" aria-label="Accepted payment methods">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
              <div className="pay-row"><CreditCard size={18} /> Secure checkout · tracked shipping guarantee · 60-day money-back promise</div>
            </div>
          </div>
        </section>

        <section id="ritual" className="ritual-section">
          <div className="section-intro"><p className="eyebrow">Landing page sections</p><h2>Build the full routine in one premium journey.</h2><p>Dedicated sections guide shoppers from discovery to bundle selection, trust validation and checkout without visual clutter.</p></div>
          <div className="gallery-grid">{products.map((product) => <article key={product.id} className="gallery-card"><ProductVisual product={product} /><h3>{product.name}</h3><p>{product.description}</p></article>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust section</p><h2>Confidence signals placed before checkout.</h2><p>Luxury ecommerce needs clarity. This section highlights shipping, returns, secure payment, support and satisfaction guarantees in highly visible language.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Tracked shipping guarantee</span><span><LockKeyhole /> Secure payment icons and messaging</span><span><RotateCcw /> 60-day satisfaction guarantee</span><span><HeartHandshake /> Concierge support promise</span><span><Banknote /> Transparent pricing and no surprise fees</span></div>
        </section>

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Routine builder</p><h2>Curated add-ons to increase basket value.</h2><p>Complementary products support the hero purchase with practical, premium reasons to complete the set.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card compact" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><span className="stock-pill"><CheckCircle2 size={15} /> {product.stock}</span><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Checkout page</p><h2>Complete your Elyra Maison order.</h2><p>Presentation-ready checkout flow with secure payment messaging, premium form spacing and responsive order summary.</p></div><div className="checkout-grid"><form className="checkout-form" onSubmit={placeOrder}><fieldset><legend>Shipping details</legend><input required placeholder="Full name" /><input required type="email" placeholder="Email address" /><input required placeholder="Street address" /><div className="form-row"><input required placeholder="City" /><input required placeholder="Postal code" /></div><input required placeholder="Country or region" /></fieldset><fieldset><legend>Payment</legend><label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> <span><CreditCard size={18} /> Secure card payment</span></label>{paymentMethod === "card" && <div className="card-fields"><input required placeholder="Card number" inputMode="numeric" /><div className="form-row"><input required placeholder="MM / YY" /><input required placeholder="CVC" /></div><input required placeholder="Name on card" /></div>}<label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> <span><Sparkles size={18} /> Express wallet</span></label></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> SSL-ready</span><span><BadgeCheck size={17} /> Verified checkout path</span><span><Truck size={17} /> Tracked shipping</span><span><RotateCcw size={17} /> 60-day guarantee</span></div><button className="primary-action full" disabled={!cartLines.length}>Place secure order</button></form><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${line.product.price * line.quantity}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div><p>Connect live commerce/payment services before accepting real transactions.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your Elyra ritual reservation is confirmed.</h2><p>Order EM-{Date.now().toString().slice(-6)} has been recorded in this demo checkout flow.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ArrowRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Reviews section</p><h2>Verified customer reviews for a luxury buyer.</h2></div>
          <div className="cards-grid">{reviews.map(([name, status, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><span><BadgeCheck size={15} /> {status}</span><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Clear answers before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Orders are prepared within the published handling window and shipped with tracking when service is available. Free tracked shipping is displayed for qualifying carts over $250." />
          <Policy title="Refund Policy" body="Eligible products are supported by a 60-day satisfaction guarantee. Hygiene-sensitive items must be complete, safely packaged and returned according to final launch rules." />
          <Policy title="Privacy Policy" body="Customer information is used to process orders, protect transactions, provide support, deliver updates and improve the shopping experience. Replace with final regional disclosures before launch." />
          <Policy title="Terms of Service" body="Customers agree to provide accurate order information and use products according to published instructions. Pricing, product availability and promotional offers may change without notice." />
        </section>

        <section id="contact" className="contact-section">
          <div><p className="eyebrow">Contact page</p><h2>Concierge support for orders and product questions.</h2><p>support@yourdomain.example · Replace with your official support email, business address and response window before publishing.</p></div>
          <div className="contact-card"><WandSparkles size={28} /><h3>Elyra Maison</h3><p>Beauty technology, softly illuminated.</p><p><Leaf size={16} /> Premium skincare ritual support</p></div>
        </section>
      </main>

      <footer className="footer"><div><strong>Elyra Maison</strong><span>Premium beauty technology storefront.</span></div><nav><a href="#policies">Privacy</a><a href="#policies">Terms</a><a href="#policies">Refunds</a><a href="#policies">Shipping</a></nav><div className="social-row"><a href="#home">Instagram</a><a href="#home">TikTok</a><a href="#home">Pinterest</a></div><small>© 2026 Elyra Maison. Original storefront assets prepared for personalization.</small></footer>
    </div>
  );
}

function Policy({ title, body }: { title: string; body: string }) {
  return <article><h3>{title}</h3><p>{body}</p></article>;
}
