import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Clock3, CreditCard, HeartHandshake, Leaf, PackageCheck, ShieldCheck, Sparkles, Star, Truck, WandSparkles } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { ProductVisual } from "./components/ProductVisual";
import { addOns, mainProduct, products } from "./data/products";

type Cart = Record<string, number>;

const landingBlocks = [
  ["01", "Clinic-grade calm", "A premium device-led routine presented with clear benefits, refined pacing and an immediate purchase path."],
  ["02", "Giftable product system", "Every accessory feels intentional, from barrier serum to sonic cleanse and rose sculpting tools."],
  ["03", "Trust-first conversion", "Shipping, guarantees, reviews and policy sections appear before checkout to reduce hesitation."],
  ["04", "Responsive luxury", "Product photography, pricing and copy stay crisp across desktop, tablet and mobile screens."]
];

const reviews = [
  ["Amara L.", "The mask looks stunning on my vanity and the full set made the routine feel genuinely luxurious."],
  ["Vivienne R.", "Clear product details, beautiful photos and the guarantee made the purchase feel effortless."],
  ["Noelle K.", "The serum and cleansing brush are the perfect add-ons. Everything feels cohesive and premium."],
  ["Serena P.", "Fast tracked delivery, elegant packaging and a calm checkout experience from start to finish."],
  ["Elise M.", "The collection page made it easy to compare products without any confusing claims or clutter."],
  ["Mila T.", "A polished beauty-tech store that feels ready for a real luxury launch."]
];

const faqs = [
  ["How long does delivery take?", "Orders are presented with tracked delivery and a 5–9 business day estimate after processing. Replace this with final carrier timing before launch."],
  ["Can I return my order?", "The storefront includes a 60-day confidence promise framework. Final hygiene exclusions and refund timing should be customized for your operating region."],
  ["Are payments secure?", "The checkout layout is ready for encrypted provider integration and clearly communicates secure handling before purchase."],
  ["What product should I start with?", "Start with the Luminara LED Mask, then add the serum and cleansing brush for a complete nightly ritual."],
  ["Is this brand content original?", "Yes. Elyra Maison and all product names, copy and generated product visuals are original storefront assets prepared for personalization."],
  ["Is the site deployment ready?", "The website is a Vite React storefront with local assets, responsive CSS and no new dependency requirements."]
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
            <p className="eyebrow">Elyra Maison · Premium beauty technology</p>
            <h1>Luxury facial technology for a luminous at-home ritual.</h1>
            <p className="hero-text">Discover a refined beauty-tech storefront built around realistic product photography, clear pricing, high-converting trust cues and a complete premium shopping structure.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => addToCart(mainProduct.id)}>Shop {mainProduct.name} — ${mainProduct.price}</button>
              <a className="secondary-action" href="#collection">Explore collection <ArrowRight size={17} /></a>
            </div>
            <div className="proof-row">
              <span><Star size={16} /> 4.9 average rating</span>
              <span><Truck size={16} /> Free shipping over $250</span>
              <span><ShieldCheck size={16} /> 60-day promise</span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual product={mainProduct} large priority />
          </div>
        </section>

        <section className="strip-section" aria-label="Store assurances">
          {["Premium product photography", "Responsive ecommerce structure", "Clear prices and descriptions", "Ready for Vercel deployment"].map((item) => <span key={item}>{item}</span>)}
        </section>

        <section className="landing-section">
          <div className="section-intro narrow"><p className="eyebrow">New premium template</p><h2>A complete storefront designed for beauty conversion.</h2></div>
          <div className="benefit-grid">{landingBlocks.map(([num, title, body]) => <article key={title}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section id="collection" className="collection-section">
          <div className="section-intro"><p className="eyebrow">Collection page</p><h2>Real premium products with clear buying paths.</h2><p>Each card uses realistic photography, visible copy, stable image sizing and clean spacing for desktop, tablet and mobile.</p></div>
          <div className="cards-grid">{products.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add to bag</button></div></article>)}</div>
        </section>

        <section id="product" className="product-section">
          <div className="section-intro"><p className="eyebrow">Product page</p><h2>{mainProduct.name}</h2><p>{mainProduct.subtitle}</p></div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Hero launch offer</p>
              <h3>Champagne LED facial mask</h3>
              <p>{mainProduct.description}</p>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><BadgeCheck size={17} /> {b}</li>)}</ul>
              <button className="primary-action full" onClick={() => addToCart(mainProduct.id)}>Add mask to bag</button>
              <div className="pay-row"><CreditCard size={18} /> Secure checkout structure · tracked delivery · transparent pricing</div>
            </div>
          </div>
        </section>

        <section id="ritual" className="ritual-section">
          <div className="section-intro"><p className="eyebrow">Landing page sections</p><h2>Build the full routine in one premium journey.</h2><p>Dedicated sections guide shoppers from discovery to bundle selection, trust validation and checkout.</p></div>
          <div className="gallery-grid">{products.map((product) => <article key={product.id} className="gallery-card"><ProductVisual product={product} /><h3>{product.name}</h3><p>{product.description}</p></article>)}</div>
        </section>

        <section id="trust" className="guarantee-section">
          <div><p className="eyebrow">Trust section</p><h2>Confidence signals placed before checkout.</h2><p>Luxury ecommerce needs clarity. This section highlights shipping, returns, secure checkout and support without hiding key details in small print.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Tracked delivery</span><span><ShieldCheck /> Secure payment-ready checkout</span><span><Clock3 /> 60-day confidence promise</span><span><HeartHandshake /> Responsive support framework</span></div>
        </section>

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Routine builder</p><h2>Curated add-ons to increase basket value.</h2><p>Complementary products support the hero purchase with practical, premium reasons to complete the set.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card compact" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Checkout page</p><h2>Complete your Elyra Maison order.</h2><p>Presentation-ready checkout flow with secure payment messaging and responsive order summary.</p></div><div className="checkout-grid"><form className="checkout-form" onSubmit={placeOrder}><fieldset><legend>Shipping details</legend><input required placeholder="Full name" /><input required type="email" placeholder="Email address" /><input required placeholder="Street address" /><div className="form-row"><input required placeholder="City" /><input required placeholder="Postal code" /></div><input required placeholder="Country or region" /></fieldset><fieldset><legend>Payment</legend><label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> <span><CreditCard size={18} /> Card payment structure</span></label>{paymentMethod === "card" && <div className="card-fields"><input required placeholder="Card number" inputMode="numeric" /><div className="form-row"><input required placeholder="MM / YY" /><input required placeholder="CVC" /></div><input required placeholder="Name on card" /></div>}<label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> <span><Sparkles size={18} /> Express wallet placeholder</span></label></fieldset><div className="checkout-trust"><span><ShieldCheck size={17} /> SSL-ready</span><span><BadgeCheck size={17} /> Fraud-screening placeholder</span><span><Truck size={17} /> Tracked shipping</span></div><button className="primary-action full" disabled={!cartLines.length}>Place secure order</button></form><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${line.product.price * line.quantity}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div><p>Connect live commerce/payment services before accepting real transactions.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your Elyra ritual reservation is confirmed.</h2><p>Order EM-{Date.now().toString().slice(-6)} has been recorded in this demo checkout flow.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ArrowRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Reviews section</p><h2>Visible social proof for a luxury buyer.</h2></div>
          <div className="cards-grid">{reviews.map(([name, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Clear answers before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Elyra Maison prepares orders during published handling days, then releases parcels to tracked carriers where service is available. Delivery estimates may change because of destination rules, customs review, weather or carrier volume." />
          <Policy title="Refund Policy" body="Customers may request a return during the stated confidence window when items are complete, safely packaged and eligible under hygiene standards. Final exclusions and refund timing should be customized before launch." />
          <Policy title="Privacy Policy" body="Customer information is collected to process orders, protect transactions, provide support, deliver updates and improve the store experience. Replace this wording with final regional disclosures." />
          <Policy title="Terms of Service" body="Visitors agree to provide accurate order information, use products according to published instructions and avoid unlawful resale or misuse of the website. Pricing and availability may change without notice." />
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
