import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { type Product } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";

export function ProductCard({ product }: { product: Product }) {
  const { format } = useCurrency();
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block animate-fade-up"
    >
      <div className="relative bg-secondary aspect-square overflow-hidden mb-5">
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 bg-foreground text-background text-[10px] uppercase tracking-[0.25em] px-2.5 py-1.5">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-elegant duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-elegant bg-foreground text-background text-center py-3 text-[10px] uppercase tracking-[0.25em]">
          Quick view →
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
      <h3 className="font-serif text-2xl mt-1.5 mb-1.5 leading-tight">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{product.tagline}</p>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">{format(product.price)}</span>
        <span className="text-sm text-muted-foreground line-through">{format(product.comparePrice)}</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-3 w-3 fill-gold text-gold" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews.toLocaleString()})</span>
      </div>
    </Link>
  );
}
