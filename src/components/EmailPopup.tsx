import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("aurelis-email-shown")) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("aurelis-email-shown", "1");
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Welcome! Check your inbox for code WELCOME10.");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-background max-w-md w-full p-8 md:p-10 relative animate-fade-up shadow-lift">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">Limited Welcome Offer</p>
        <h3 className="font-serif text-3xl md:text-4xl mb-3 leading-tight">
          Take 10% off your first ritual.
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Join 80,000+ insiders who get early access to new arrivals, science-backed wellness rituals, and members-only offers.
        </p>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
            required
          />
          <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-12">
            Unlock 10% Off
          </Button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-xs text-muted-foreground underline pt-1"
          >
            No thanks, I'll pay full price
          </button>
        </form>
      </div>
    </div>
  );
}
