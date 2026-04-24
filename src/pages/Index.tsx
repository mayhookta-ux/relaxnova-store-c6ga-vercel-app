import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TrustBar } from "@/components/TrustBar";
import { CountdownBanner } from "@/components/CountdownBanner";
import { PressStrip } from "@/components/PressStrip";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { FounderNote } from "@/components/FounderNote";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { products, bundles, getProduct } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Check } from "lucide-react";
import heroImg from "@/assets/hero-posture.jpg";
import lifestyleImg from "@/assets/lifestyle-1.jpg";

const Index = () => {
  const { format } = useCurrency();
  const { addItem } = useCart();

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-warm overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 md:py-24 lg:py-32">
          <div className="space-y-7 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Smart Wellness · Quietly Engineered</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-balance">
              Stand taller.<br />
              <span className="italic text-gold-shimmer">Feel lighter.</span><br />
              Live better.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              Discreet, intelligent devices that retrain your posture, soothe your muscles and restore your skin — designed in California, loved by 80,000+ Americans.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-none h-13 px-8 text-sm tracking-wider uppercase">
                <Link to="/product/smart-posture-corrector">
                  Shop Bestseller <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none h-13 px-8 text-sm tracking-wider uppercase border-foreground">
                <Link to="/shop">Explore Collection</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-muted-foreground">
              {["60-day risk-free trial", "Free US shipping over $75", "FSA / HSA eligible"].map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-gold" /> {p}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImg}
              alt="Aurelis Aura Posture worn"
              width={1600}
              height={1280}
              className="w-full h-auto shadow-lift animate-fade-in"
            />
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-background p-5 shadow-lift max-w-[200px] hidden md:block">
              <p className="font-serif text-3xl text-gold">+38%</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                Average posture improvement in clinical 2-week trial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <PressStrip />

      {/* BESTSELLERS */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">The Bestsellers</p>
              <h2 className="font-serif text-4xl md:text-5xl">Loved by thousands.<br />Designed for everyone.</h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* EDITORIAL FEATURE */}
      <section className="bg-secondary/40 py-20 md:py-32">
        <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <img
            src={lifestyleImg}
            alt="Wellness lifestyle"
            loading="lazy"
            width={1400}
            height={1600}
            className="w-full h-auto"
          />
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">The Aurelis Method</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Wellness that disappears<br />into your daily ritual.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We don't believe in friction. Every Aurelis device is engineered to vanish into your lifestyle — invisible under cashmere, silent in meetings, beautiful on your nightstand.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The result? Habits that actually stick. Improvements you can see in the mirror within weeks, not years.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 pt-4">
              {[
                ["Clinically inspired", "Backed by biomechanics & dermatology research."],
                ["Discreet by design", "Wearable under any outfit, invisible to others."],
                ["Built to last", "Premium materials, 2-year warranty."],
                ["Trusted by 80,000+", "Across the US, with a 4.9★ average rating."],
              ].map(([t, b]) => (
                <div key={t}>
                  <p className="font-serif text-xl mb-1">{t}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FounderNote />

      <CountdownBanner />

      {/* BUNDLES */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Curated Bundles</p>
            <h2 className="font-serif text-4xl md:text-5xl">Save more. Live better.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {bundles.map((b) => {
              const items = b.products.map(getProduct).filter(Boolean) as ReturnType<typeof getProduct>[];
              return (
                <div key={b.id} className="bg-secondary/50 p-8 md:p-10">
                  <div className="flex gap-4 mb-6">
                    {items.map((p) => p && (
                      <img
                        key={p.id}
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-24 h-24 md:w-32 md:h-32 object-cover bg-background"
                      />
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-gold mb-2">Save {format(b.save)}</p>
                  <h3 className="font-serif text-3xl mb-3">{b.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    {items.map((p) => p?.name).join(" + ")}
                  </p>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-medium">{format(b.price)}</span>
                    <span className="text-sm text-muted-foreground line-through">{format(b.comparePrice)}</span>
                  </div>
                  <Button
                    onClick={() => b.products.forEach((id) => addItem(id))}
                    className="rounded-none bg-foreground text-background hover:bg-foreground/90"
                  >
                    Add Bundle to Cart
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GuaranteeStrip />

      <TestimonialSlider />

      <ReviewsSection />

      {/* FACEBOOK AD READY LANDING SECTION */}
      <section className="py-20 md:py-28 bg-gradient-ink text-primary-foreground">
        <div className="container max-w-3xl text-center space-y-7">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Limited Launch Offer</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            The smart posture corrector<br />
            <em className="text-gold-shimmer not-italic">38,000+ Americans</em><br />
            swear by.
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Just 28 grams. Invisible under your shirt. A whisper-soft pulse the moment you slouch — and visible posture improvement in 14 days, guaranteed.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold/90 rounded-none h-14 px-10 text-sm uppercase tracking-wider">
              <Link to="/product/smart-posture-corrector">Claim 40% Off — Today Only</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2 text-xs text-primary-foreground/60">
            <span>★ 4.9 / 5 (2,847 reviews)</span>
            <span>✓ Free US Shipping</span>
            <span>✓ 60-Day Money-Back</span>
          </div>
        </div>
      </section>

      {/* ABANDONED CART RECOVERY (informational section) */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Did you forget something?</p>
          <h3 className="font-serif text-3xl md:text-4xl mb-4">We saved your cart for 24 hours.</h3>
          <p className="text-muted-foreground mb-6">
            Sign in or check your email — we've held your selection and added a complimentary 5% off as our welcome back gift.
          </p>
          <Button asChild variant="outline" className="rounded-none border-foreground">
            <Link to="/checkout">Resume Checkout</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
