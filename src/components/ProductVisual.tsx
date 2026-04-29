import type { Product } from "../data/products";

export function ProductVisual({ product, large = false, priority = false, onPreview }: { product: Product; large?: boolean; priority?: boolean; onPreview?: () => void }) {
  return (
    <figure className={`product-photo ${large ? "product-photo-large" : ""}`} aria-label={`${product.name} product photo`}>
      <button className="product-image-button" type="button" onClick={onPreview} aria-label={`Open larger preview of ${product.name}`}>
        <img src={product.image} alt={`${product.name} product`} className="w-full h-full object-contain object-center p-2" />
      </button>
    </figure>
  );
}
