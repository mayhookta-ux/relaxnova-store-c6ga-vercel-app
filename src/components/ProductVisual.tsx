import type { Product } from "../data/products";

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`device device-${product.color} ${large ? "device-large" : ""}`} aria-label={`${product.name} product visual`}>
      <div className="device-glow" />
      <div className="device-shell">
        <div className="device-lens" />
        <div className="device-mark">EM</div>
      </div>
      <div className="device-shadow" />
    </div>
  );
}
