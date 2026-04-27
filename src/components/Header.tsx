import { Activity, Menu, ShoppingBag, X } from "lucide-react";

export function Header({ cartCount, menuOpen, onCart, onMenu }: { cartCount: number; menuOpen: boolean; onCart: () => void; onMenu: () => void }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="RelaxNova home">
        <span className="brand-mark"><Activity size={18} /></span>
        <span>RelaxNova</span>
      </a>
      <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Primary navigation">
        <a href="#product">Product</a>
        <a href="#results">Before/After</a>
        <a href="#trust">Trust</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
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
