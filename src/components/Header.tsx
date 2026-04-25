import { Menu, ShoppingBag, X } from "lucide-react";

export function Header({ cartCount, menuOpen, onCart, onMenu }: { cartCount: number; menuOpen: boolean; onCart: () => void; onMenu: () => void }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Elyra Maison home">
        <span className="brand-mark">E</span>
        <span>Elyra Maison</span>
      </a>
      <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Primary navigation">
        <a href="#product">Device</a>
        <a href="#ritual">Ritual</a>
        <a href="#gallery">Gallery</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
        <a href="#policies">Policies</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button menu-button" onClick={onMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <button className="cart-button" onClick={onCart} aria-label="Open cart">
          <ShoppingBag size={19} />
          <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
