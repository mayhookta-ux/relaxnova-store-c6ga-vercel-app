import { ShoppingBag } from "lucide-react";

export function Header({ cartCount, onCart }: { cartCount: number; onCart: () => void }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Elyra Maison home">
        <span className="brand-mark">E</span>
        <span>Elyra Maison</span>
      </a>
      <nav className="nav" aria-label="Primary navigation">
        <a href="#product">Device</a>
        <a href="#ritual">Ritual</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
        <a href="#policies">Policies</a>
      </nav>
      <button className="cart-button" onClick={onCart} aria-label="Open cart">
        <ShoppingBag size={19} />
        <span>{cartCount}</span>
      </button>
    </header>
  );
}
