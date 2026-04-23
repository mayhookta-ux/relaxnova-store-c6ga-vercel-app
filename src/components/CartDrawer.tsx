import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function CartDrawer() {
  const {
    open,
    setOpen,
    withProducts,
    subtotal,
    updateQuantity,
    removeItem,
    discountCode,
    discountAmount,
    total,
    applyDiscount,
    removeDiscount,
  } = useCart();
  const { format } = useCurrency();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleApply = () => {
    if (!code.trim()) return;
    if (applyDiscount(code)) {
      toast.success(`Code ${code.toUpperCase()} applied`);
      setCode("");
    } else {
      toast.error("Invalid discount code");
    }
  };

  const checkout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  const freeShippingTarget = 75;
  const remaining = Math.max(0, freeShippingTarget - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingTarget) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-serif text-xl">Your Cart</h3>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {withProducts.length > 0 && (
          <div className="px-6 py-3 border-b border-border bg-secondary/40">
            <p className="text-xs text-muted-foreground mb-2">
              {remaining > 0 ? (
                <>You're <span className="text-foreground font-medium">{format(remaining)}</span> away from free shipping</>
              ) : (
                <span className="text-gold font-medium">✓ You've unlocked free shipping</span>
              )}
            </p>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gold transition-elegant" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {withProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" strokeWidth={1} />
              <p className="font-serif text-2xl mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mb-6">Discover our wellness essentials.</p>
              <Button variant="default" onClick={() => { setOpen(false); navigate("/shop"); }}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {withProducts.map((i) => (
                <li key={i.productId} className="flex gap-4 p-6">
                  <img
                    src={i.product.image}
                    alt={i.product.name}
                    className="w-20 h-20 object-cover bg-secondary"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-serif text-lg leading-tight">{i.product.name}</p>
                      <button
                        onClick={() => removeItem(i.productId)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Remove"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{i.product.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          className="p-1.5 hover:bg-muted"
                          onClick={() => updateQuantity(i.productId, i.quantity - 1)}
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-sm">{i.quantity}</span>
                        <button
                          className="p-1.5 hover:bg-muted"
                          onClick={() => updateQuantity(i.productId, i.quantity + 1)}
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">{format(i.product.price * i.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {withProducts.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-card">
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Discount code"
                className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              />
              <Button variant="outline" onClick={handleApply} className="text-xs">Apply</Button>
            </div>
            {discountCode && (
              <div className="flex justify-between text-sm">
                <span>Code <span className="font-medium">{discountCode}</span></span>
                <button onClick={removeDiscount} className="text-xs text-muted-foreground underline">Remove</button>
              </div>
            )}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Discount</span>
                  <span>−{format(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>{format(total)}</span>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none"
              onClick={checkout}
            >
              Secure Checkout →
            </Button>
            <p className="text-[10px] text-center text-muted-foreground tracking-widest uppercase">
              Free Shipping · 60-Day Returns · Secure Payment
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
