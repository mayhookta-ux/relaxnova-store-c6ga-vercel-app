import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";
import { useCurrency, SUPPORTED_CURRENCIES } from "@/context/CurrencyContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { label: "Shop", to: "/shop" },
  { label: "Bestsellers", to: "/shop?filter=bestseller" },
  { label: "About", to: "/about" },
  { label: "Reviews", to: "/#reviews" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { itemCount, setOpen } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-elegant ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-80">
              <nav className="mt-12 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="py-3 text-lg font-serif border-b border-border"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link to="/track" className="py-3 text-lg font-serif border-b border-border">
                  Track Order
                </Link>
                <Link to="/faq" className="py-3 text-lg font-serif border-b border-border">
                  FAQ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-xs uppercase tracking-[0.18em] transition-elegant hover:text-gold ${
                    active ? "text-gold" : "text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Logo className="absolute left-1/2 -translate-x-1/2" />

        <div className="flex items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as typeof currency)}
            aria-label="Select currency"
            className="hidden sm:block bg-transparent text-xs tracking-[0.15em] uppercase border-none focus:outline-none cursor-pointer"
          >
            {SUPPORTED_CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button aria-label="Search" className="hidden sm:block">
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label={`Open cart with ${itemCount} items`}
            onClick={() => setOpen(true)}
            className="relative"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-primary text-[10px] font-medium rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
