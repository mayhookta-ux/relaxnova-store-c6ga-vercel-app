import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Check, Shield, Truck, RefreshCcw, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProduct, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { ProductCard } from "@/components/ProductCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import NotFound from "./NotFound";

const ProductPage = () => {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem, setOpen } = useCart();
  const { format } = useCurrency();
  const [qty, setQty] = useState(1);

  if (!product) return <NotFound />;

  const crossSells = products.filter((p) => p.id !== product.id).slice(0, 3);
  const savings = product.comparePrice - product.price;
  const savingsPct = Math.round((savings / product.comparePrice) * 100);

  const addAndOpen = () => {
    addItem(product.id, qty);
    setOpen(true);
  };

  return (
    <>
      <div className="container py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-foreground">Shop</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* IMAGE */}
          <div className="bg-secondary aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              width={1200}
              height={1200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFO */}
          <div className="space-y-6">
            {product.badge && (
              <span className="inline-block bg-foreground text-background text-[10px] uppercase tracking-[0.2em] px-2.5 py-1">
                {product.badge}
              </span>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">{product.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-3">{product.name}</h1>
              <p className="text-lg text-muted-foreground italic">{product.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-gold text-gold" />)}</div>
              <span className="text-sm">{product.rating} · {product.reviews.toLocaleString()} verified reviews</span>
            </div>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-medium">{format(product.price)}</span>
              <span className="text-lg text-muted-foreground line-through">{format(product.comparePrice)}</span>
              <span className="text-xs uppercase tracking-wider bg-gold/15 text-gold px-2 py-1">Save {savingsPct}%</span>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">{product.shortDescription}</p>

            <ul className="space-y-2 pt-2">
              {product.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" /> {b}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 pt-4">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-muted" aria-label="Decrease">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-muted" aria-label="Increase">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button
                onClick={addAndOpen}
                size="lg"
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-none h-12 text-sm uppercase tracking-wider"
              >
                Add to Cart — {format(product.price * qty)}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                [Truck, "Free US Shipping"],
                [RefreshCcw, "60-Day Returns"],
                [Shield, "2-Year Warranty"],
              ].map(([Icon, t], i) => {
                const I = Icon as typeof Truck;
                return (
                  <div key={i} className="text-center">
                    <I className="h-5 w-5 mx-auto mb-1.5 text-gold" strokeWidth={1.4} />
                    <p className="text-xs">{t as string}</p>
                  </div>
                );
              })}
            </div>

            <Accordion type="single" collapsible className="pt-2">
              <AccordionItem value="desc">
                <AccordionTrigger className="font-serif text-lg">Description</AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  {product.description.map((p, i) => <p key={i}>{p}</p>)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="features">
                <AccordionTrigger className="font-serif text-lg">Features</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {product.features.map((f) => (
                    <div key={f.title}>
                      <p className="font-medium text-sm">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.body}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="box">
                <AccordionTrigger className="font-serif text-lg">In the box</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.inTheBox.map((i) => <li key={i}>· {i}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs">
                <AccordionTrigger className="font-serif text-lg">Specifications</AccordionTrigger>
                <AccordionContent>
                  <dl className="text-sm space-y-2">
                    {product.specs.map((s) => (
                      <div key={s.label} className="flex justify-between border-b border-border py-1.5">
                        <dt className="text-muted-foreground">{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="font-serif text-lg">Shipping</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>· Free standard US shipping on orders over $75 (3–5 business days).</p>
                  <p>· Express shipping available at checkout (1–2 business days).</p>
                  <p>· All orders dispatched from our California fulfillment center.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* CROSS-SELL */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">You may also love</h2>
          <div className="grid sm:grid-cols-3 gap-x-6 gap-y-10">
            {crossSells.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* STICKY MOBILE ADD-TO-CART */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur border-t border-border p-3 flex items-center gap-3 shadow-lift">
        <div className="flex-shrink-0">
          <p className="text-sm font-medium">{format(product.price)}</p>
          <p className="text-xs text-muted-foreground line-through">{format(product.comparePrice)}</p>
        </div>
        <Button
          onClick={addAndOpen}
          className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-none h-12 text-xs uppercase tracking-wider"
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default ProductPage;
