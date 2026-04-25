import { useMemo, useState } from "react";
import { Check, ChevronRight, Clock, CreditCard, Lock, PackageCheck, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
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

const beforeAfter = [
  ["Before ritual", "Skin can look tired, uneven and unprepared after long days, travel or screen-heavy work."],
  ["After steady use", "A polished routine helps skin appear smoother, calmer and more luminous in daily close-up moments."],
  ["Why it converts", "Customers are buying a premium routine, not just a gadget: cleanse, light, hydrate and sculpt." ]
];

const reviews = [
  ["Mara V.", "The device feels expensive, the routine is simple, and my evening skincare finally feels intentional."],
  ["Celeste R.", "The serum and roller bundle made the whole set feel like a private facial cabinet at home."],
  ["Nadia K.", "Beautiful packaging, fast shipping, and the checkout trust details made ordering feel safe." ]
];

const faqs = [
  ["Is Elyra Maison a real existing brand?", "No. Elyra Maison, Oréva Beam, Veloura Serum, Lysa Roller and Mira Cleanse are newly invented names for this original storefront and can be personalized before launch."],
  ["Does the checkout process take real payments?", "This front-end package includes a polished checkout experience and trust messaging. Connect your payment provider before accepting live orders."],
  ["How should the LED device be used?", "The store copy presents a general beauty ritual concept. Add your final safety directions, compliance statements and product manual before selling."],
  ["Can I change prices, policies and contact details?", "Yes. All copy is written as original placeholder business content so you can replace company details, domain, address and legal information." ]
];

export default function App() {
  const [cart, setCart] = useState<Cart>({ "oreva-beam": 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const cartLines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setCartOpen(true);
  };
  const removeFromCart = (id: string) => setCart((current) => {
    const next = { ...current, [id]: Math.max((current[id] || 0) - 1, 0) };
    if (!next[id]) delete next[id];
    return next;
  });

  return (
    <div id="home">
      <Header cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} lines={cartLines} onClose={() => setCartOpen(false)} onAdd={addToCart} onRemove={removeFromCart} />

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

        <section className="upsell-section">
          <div className="section-intro"><p className="eyebrow">Complete the ritual</p><h2>High-margin complementary products.</h2><p>Each add-on supports the main device purchase while increasing basket value.</p></div>
          <div className="cards-grid">{addOns.map((product) => <article className="product-card" key={product.id}><ProductVisual product={product} /><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.subtitle}</p><div className="card-bottom"><strong>${product.price}</strong><button onClick={() => addToCart(product.id)}>Add</button></div></article>)}</div>
        </section>

        <section className="guarantee-section">
          <div><p className="eyebrow">Premium guarantee</p><h2>Confidence promise for first-time buyers.</h2><p>Customers can try the Elyra ritual for 60 days. If it is not the right fit, your support team can guide an easy return according to the refund policy below.</p></div>
          <div className="guarantee-list"><span><PackageCheck /> Tracked delivery</span><span><ShieldCheck /> Secure payment messaging</span><span><Clock /> Limited launch savings block</span></div>
        </section>

        <section className="urgency-section">
          <p className="eyebrow">Launch window</p><h2>Reserve the Oréva Beam set while introductory pricing is active.</h2><button className="primary-action" onClick={() => addToCart(mainProduct.id)}>Claim launch offer</button>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="section-intro"><p className="eyebrow">Customer language</p><h2>Original reviews for a premium beauty audience.</h2></div>
          <div className="cards-grid">{reviews.map(([name, quote]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><p>“{quote}”</p><strong>{name}</strong></article>)}</div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-intro"><p className="eyebrow">FAQ</p><h2>Clear answers before checkout.</h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section id="policies" className="policy-section">
          <Policy title="Shipping Policy" body="Orders are prepared within a stated handling window and shipped with tracking when available. Delivery estimates, carrier availability, taxes and duties should be updated to match your final business location and fulfillment provider." />
          <Policy title="Refund Policy" body="Customers may request a return within the published trial period if products are complete, safely packaged and meet your hygiene and resale conditions. Final eligibility, exclusions and refund timing should be customized before launch." />
          <Policy title="Privacy Policy" body="Customer information is used to process orders, provide support, improve store performance and send requested communications. Replace this placeholder with your final data practices, processor list and regional compliance language." />
          <Policy title="Terms of Service" body="Use of this store means visitors agree to accurate account details, lawful purchases and the final product instructions you provide. Pricing, availability and promotions may change according to your published store terms." />
        </section>
      </main>

      <footer className="footer"><strong>Elyra Maison</strong><span>Original tagline: Beauty technology, softly illuminated.</span><span>Replace with your business address, support email and domain before launch.</span></footer>
    </div>
  );
}

function Policy({ title, body }: { title: string; body: string }) {
  return <article><h3>{title}</h3><p>{body}</p></article>;
}
