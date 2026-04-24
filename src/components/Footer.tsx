import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-ink text-primary-foreground mt-24">
      <div className="container py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Logo className="text-primary-foreground" />
          <p className="text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
            Smart wellness, quietly engineered. Designed in California, crafted to last.
          </p>
          <div className="flex gap-4 pt-2 text-primary-foreground/70">
            <Instagram className="h-4 w-4 hover:text-gold cursor-pointer transition-elegant" />
            <Twitter className="h-4 w-4 hover:text-gold cursor-pointer transition-elegant" />
            <Facebook className="h-4 w-4 hover:text-gold cursor-pointer transition-elegant" />
            <Youtube className="h-4 w-4 hover:text-gold cursor-pointer transition-elegant" />
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { to: "/shop", label: "All Products" },
            { to: "/product/smart-posture-corrector", label: "Aura Posture" },
            { to: "/product/neck-relief-massager", label: "Cervi Pro" },
            { to: "/product/led-skincare-mask", label: "Lumière LED" },
            { to: "/product/portable-mini-blender", label: "Lume Blend" },
          ]}
        />
        <FooterCol
          title="Support"
          links={[
            { to: "/track", label: "Track Order" },
            { to: "/faq", label: "FAQ" },
            { to: "/contact", label: "Contact" },
            { to: "/refund", label: "Refund Policy" },
            { to: "/shipping", label: "Shipping" },
          ]}
        />
        <FooterCol
          title="Brand"
          links={[
            { to: "/about", label: "Our Story" },
            { to: "/privacy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms of Service" },
            { to: "/shipping", label: "Shipping" },
          ]}
        />
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Aurelis Wellness, Inc. All rights reserved.</p>
          <div className="flex gap-2 items-center">
            <span className="px-2 py-1 border border-primary-foreground/20 rounded">VISA</span>
            <span className="px-2 py-1 border border-primary-foreground/20 rounded">MC</span>
            <span className="px-2 py-1 border border-primary-foreground/20 rounded">AMEX</span>
            <span className="px-2 py-1 border border-primary-foreground/20 rounded">PayPal</span>
            <span className="px-2 py-1 border border-primary-foreground/20 rounded">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-primary-foreground/60">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-primary-foreground/85 hover:text-gold transition-elegant">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
