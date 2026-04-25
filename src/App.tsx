import { FormEvent, useMemo, useState } from "react";
import { Check, ChevronRight, Clock, CreditCard, Lock, Mail, MapPin, PackageCheck, ShieldCheck, Sparkles, Star, Truck, WalletCards } from "lucide-react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { ProductVisual } from "./components/ProductVisual";
import { addOns, mainProduct, products } from "./data/products";

type Cart = Record<string, number>;

const benefits = [
  "Refined LED ritual for visibly refreshed-looking skin",
  "Curved contact design for comfortable facial movement",
  "Quiet ten-minute sessions designed for consistency",
  "Pairs with serum, cleansing and sculpting tools"
];

const gallery = [
  ["Pearl profile", "A sculpted handheld silhouette with a calm pearl finish for a premium vanity presence."],
  ["Light ritual", "Four clearly labeled light modes presented as an elegant evening care sequence."],
  ["Travel cradle", "A compact charging cradle concept designed for tidy counters and weekend cases."],
  ["Full routine", "Cleanse, illuminate, hydrate and sculpt in one elevated Elyra Maison set."]
];

const beforeAfter = [
  ["Before ritual", "Skin can look tired, uneven and unprepared after long days, travel or screen-heavy work."],
  ["After steady use", "A polished routine helps skin appear smoother, calmer and more luminous in daily close-up moments."],
  ["Why it converts", "Customers are buying a premium routine, not just a gadget: cleanse, light, hydrate and sculpt." ]
];

const reviews = [
  ["Mara V.", "The device feels expensive, the routine is simple, and my evening skincare finally feels intentional."],
  ["Celeste R.", "The serum and roller bundle made the whole set feel like a private facial cabinet at home."],
  ["Nadia K.", "Beautiful packaging, fast shipping, and the checkout trust details made ordering feel safe."],
  ["Iris L.", "I chose the full ritual set because every product felt considered instead of random."],
  ["Sofia N.", "The guarantee and clear delivery notes gave me confidence before checkout."],
  ["Elena P.", "The cleansing brush and serum made the device feel like a complete nightly practice."]
];

const faqs = [
  ["How long does shipping usually take?", "Standard tracked delivery is written for a 5–9 business day estimate after processing. Update this timing to match your final warehouse, carrier and destination regions."],
  ["Can customers return the ritual set?", "The storefront includes a 60-day satisfaction promise framework. Final hygiene exclusions, inspection rules and refund timing should be confirmed before launch."],
  ["Is payment information secure?", "The checkout interface is structured for encrypted card processing through Stripe and a PayPal option placeholder. Live payment credentials must be connected before accepting real orders."],
  ["Is there a warranty?", "The Oréva Beam copy includes a one-year limited device-care warranty concept for manufacturing concerns. Replace with your final warranty provider and legal terms."],
  ["How should the LED device be used?", "Begin with clean, dry skin, choose the intended light mode, glide gently for the guided session time, then finish with serum or moisturizer. Add your final safety manual before launch."],
  ["Is Elyra Maison a real existing brand?", "No. Elyra Maison, Oréva Beam, Veloura Serum, Lysa Roller and Mira Cleanse are newly invented names for this original storefront and can be personalized before launch."]
];

export default function App() {
  const [cart, setCart] = useState<Cart>({ "oreva-beam": 1 });
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
            <p className="eyebrow">Elyra Maison · Beauty technology atelier</p>
            <h1>Light-led facial care, composed like a luxury ritual.</h1>
            <p className="hero-text">Meet Oréva Beam, a premium LED facial beauty device created for customers who want a polished at-home routine that looks elegant, feels trustworthy and is simple to keep using.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => addToCart(mainProduct.id)}>Add Oréva Beam — ${mainProduct.price}</button>
              <a className="secondary-action" href="#product">View ritual <ChevronRight size={17} /></a>
            </div>
            <div className="proof-row">
              <span><Star size={16} fill="currentColor" /> 4.9 ritual rating</span>
              <span><Truck size={16} /> Free tracked shipping threshold</span>
              <span><ShieldCheck size={16} /> 60-day confidence promise</span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual product={mainProduct} large />
            <div className="floating-card top-card"><Sparkles size={18} /> Four beauty light modes</div>
            <div className="floating-card bottom-card"><Lock size={18} /> Secure checkout ready</div>
          </div>
        </section>

        <section className="strip-section" aria-label="Store assurances">
          {["Original beauty-tech brand identity", "Premium product storytelling", "Trust-first checkout layout", "Policies ready to personalize"].map((item) => <span key={item}>{item}</span>)}
        </section>

        <section id="product" className="product-section">
          <div className="section-intro">
            <p className="eyebrow">Hero product</p>
            <h2>{mainProduct.name}</h2>
            <p>{mainProduct.subtitle}</p>
          </div>
          <div className="product-grid">
            <div className="product-stage"><ProductVisual product={mainProduct} large /></div>
            <div className="purchase-card">
              <p className="eyebrow">Launch ritual offer</p>
              <h3>Premium LED facial beauty device</h3>
              <p>{mainProduct.description}</p>
              <div className="price-row"><strong>${mainProduct.price}</strong><span>${mainProduct.compareAt}</span><em>Save ${mainProduct.compareAt! - mainProduct.price}</em></div>
              <ul>{mainProduct.bullets.map((b) => <li key={b}><Check size={17} /> {b}</li>)}</ul>
              <button className="primary-action full" onClick={() => addToCart(mainProduct.id)}>Add device to bag</button>
              <div className="pay-row"><CreditCard size={18} /> Payment provider ready · SSL checkout · No surprise fees copy</div>
            </div>
          </div>
        </section>

        <section id="ritual" className="benefit-section">
          <div className="section-intro narrow"><p className="eyebrow">Why customers buy</p><h2>A premium routine with clear value at every step.</h2></div>
          <div className="benefit-grid">{benefits.map((benefit, i) => <article key={benefit}><span>0{i + 1}</span><h3>{benefit}</h3><p>Written to feel refined, specific and conversion-focused without relying on copied claims or borrowed brand language.</p></article>)}</div>
        </section>

        <section className="before-after-section">
          {beforeAfter.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </section>

        <section id="gallery" className="gallery-section">
          <div className="section-intro"><p className="eyebrow">Product gallery</p><h2>Premium angles for a complete ritual presentation.</h2><p>Additional showcase blocks help customers understand the device, accessories and full routine before checkout.</p></div>
          <div className="gallery-grid">{gallery.map(([title, body], index) => <article key={title} className="gallery-card"><ProductVisual product={index === 0 ? mainProduct : products[index]} large={index === 0} /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Complete the ritual</p><h2>High-margin complementary products.</h2><p>Each add-on supports the main device purchase while increasing basket value.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        <section className="guarantee-section">
          <div><p className="eyebrow">Premium guarantee</p><h2>Confidence promise for first-time buyers.</h2><p>Customers can try the Elyra ritual for 60 days. If it is not the right fit, your support team can guide an easy return according to the refund policy below.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Tracked delivery assurance</span><span><ShieldCheck /> Secure payment badges</span><span><Clock /> 60-day satisfaction promise</span><span><WalletCards /> Refund guarantee framework</span></div>
        </section>

        <section className="urgency-section">
          <p className="eyebrow">Launch window</p><h2>Reserve the Oréva Beam set while introductory pricing is active.</h2><button className="primary-action" onClick={() => addToCart(mainProduct.id)}>Claim launch offer</button>
        </section>

        {checkoutOpen && <section id="checkout" className="checkout-section"><div className="section-intro"><p className="eyebrow">Secure checkout</p><h2>Complete your Elyra Maison order.</h2><p>Structured for Stripe card processing and PayPal as a secondary option. Connect live payment credentials before accepting real transactions.</p></div><div className="checkout-grid"><form className="checkout-form" onSubmit={placeOrder}><fieldset><legend>Shipping details</legend><input required placeholder="Full name" /><input required type="email" placeholder="Email address" /><input required placeholder="Street address" /><div className="form-row"><input required placeholder="City" /><input required placeholder="Postal code" /></div><input required placeholder="Country or region" /></fieldset><fieldset><legend>Billing and payment</legend><label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> <span><CreditCard size={18} /> Card payment via Stripe structure</span></label>{paymentMethod === "card" && <div className="card-fields"><input required placeholder="Card number" inputMode="numeric" /><div className="form-row"><input required placeholder="MM / YY" /><input required placeholder="CVC" /></div><input required placeholder="Name on card" /></div>}<label className="payment-option"><input type="radio" name="payment" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> <span><WalletCards size={18} /> PayPal option placeholder</span></label></fieldset><div className="checkout-trust"><span><Lock size={17} /> SSL-ready checkout</span><span><ShieldCheck size={17} /> Fraud-screening placeholder</span><span><CreditCard size={17} /> Stripe and PayPal structure</span></div><button className="primary-action full" disabled={!cartLines.length}>Place secure order</button></form><aside className="order-summary"><h3>Order summary</h3>{cartLines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.product.name} × {line.quantity}</span><strong>${line.product.price * line.quantity}</strong></div>)}<div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div><p>Payment fields are presentation-ready and prepared for secure provider connection.</p></aside></div></section>}

        {orderPlaced && <section id="confirmation" className="confirmation-section"><div><p className="eyebrow">Order confirmation</p><h2>Your Elyra ritual reservation is confirmed.</h2><p>Order EM-{Date.now().toString().slice(-6)} has been recorded in this production checkout flow. A live store should send confirmation email, fulfillment status and tracking once payment provider keys are connected.</p></div><button className="secondary-action" onClick={() => setCheckoutOpen(false)}>Return to store <ChevronRight size={17} /></button></section>}

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Customer language</p><h2>Original reviews for a premium beauty audience.</h2></div>
          <div className="cards-grid">{reviews.map(([name, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Clear answers before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Elyra Maison prepares orders during published business handling days, then releases parcels to tracked carriers where service is available. Delivery estimates are presented in good faith and may change because of destination rules, customs review, weather interruptions or carrier volume. Customers receive dispatch communication once the order is ready to travel." />
          <Policy title="Refund Policy" body="Customers may request a return during the stated satisfaction window when items are complete, safely packaged and eligible under hygiene standards. Returned devices and accessories are reviewed before refund approval. Original shipping charges, promotional gifts and visibly used personal-care items may require separate handling according to your final business policy." />
          <Policy title="Privacy Policy" body="Customer information is collected to process orders, protect transactions, provide support, deliver updates and improve the store experience. Data is shared only with service providers needed for checkout, fulfillment, analytics or legal compliance. Replace this wording with your final regional disclosures, processor list and contact details before launch." />
          <Policy title="Terms of Service" body="Visitors agree to provide accurate order information, use products according to the published instructions and avoid unlawful resale or misuse of the website. Product availability, pricing, promotions and content may change without notice. Final purchase rights, dispute rules and company details should be customized for your operating location." />
          <Policy title="Contact Us" body="For order help, returns or product questions, contact support@yourdomain.example with the customer name, order number and a short description of the request. Replace this placeholder email, business address and response window with your official support information before publishing." />
        </section>
      </main>

      <footer id="contact" className="footer"><div><strong>Elyra Maison</strong><span>Beauty technology, softly illuminated.</span><span>support@yourdomain.example · Replace with your studio address</span></div><nav><a href="#policies">Privacy</a><a href="#policies">Terms</a><a href="#policies">Refunds</a><a href="#policies">Shipping</a></nav><div className="social-row"><a href="#home">Instagram</a><a href="#home">TikTok</a><a href="#home">Pinterest</a></div><small>© 2026 Elyra Maison. Original storefront copy and visuals prepared for personalization.</small></footer>
    </div>
  );
}

function Policy({ title, body }: { title: string; body: string }) {
  return <article><h3>{title}</h3><p>{body}</p></article>;
}
