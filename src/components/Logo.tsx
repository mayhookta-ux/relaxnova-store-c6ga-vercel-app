import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="AURELIS — Home" className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className="font-serif text-2xl tracking-[0.32em] text-foreground">AURELIS</span>
      <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
    </Link>
  );
}
