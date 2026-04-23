import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const categories = ["All", "Posture", "Recovery", "Nutrition", "Skincare"];

const Shop = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">The Collection</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Shop Wellness</h1>
        <p className="text-muted-foreground">
          Every device is engineered to disappear into your daily ritual — discreet, beautiful, and quietly transformative.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 border transition-elegant ${
              active === c
                ? "bg-foreground text-background border-foreground"
                : "border-border hover:border-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Shop;
