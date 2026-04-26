import type { Product } from "../data/products";

export function ProductVisual({ product, large = false, priority = false }: { product: Product; large?: boolean; priority?: boolean }) {
  return (
    <figure className={`product-photo ${large ? "product-photo-large" : ""}`} aria-label={`${product.name} product photo`}>
      <img src={product.image} alt={`${product.name} product photo`} width={1024} height={1024} loading={priority ? "eager" : "lazy"} />
    </figure>
  );
}
