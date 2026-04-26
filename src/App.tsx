import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, CheckCircle2, Clock3, CreditCard, Gem, HeartHandshake, Leaf, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Star, Truck, WandSparkles } from "lucide-react";
import { z } from "zod";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { ProductVisual } from "./components/ProductVisual";
import { addOns, mainProduct, products } from "./data/products";

type Cart = Record<string, number>;

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  street: z.string().trim().min(5).max(160),
  city: z.string().trim().min(2).max(80),
  postalCode: z.string().trim().min(3).max(20),
  country: z.string().trim().min(2).max(80),
  cardNumber: z.string().trim().regex(/^[0-9 ]{12,23}$/),
  expiry: z.string().trim().regex(/^[0-9]{2}\s?\/\s?[0-9]{2}$/),
  cvc: z.string().trim().regex(/^[0-9]{3,4}$/),
  cardName: z.string().trim().min(2).max(100)
});

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
    const result = checkoutSchema.safeParse(data);
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
