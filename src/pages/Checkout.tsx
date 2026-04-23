import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { withProducts, subtotal, discountCode, discountAmount, total, applyDiscount, clear, format: _f } = useCart();
  const { format } = useCurrency();
  const navigate = useNavigate();
  const [step, setStep] = useState<"info" | "shipping" | "payment">("info");
  const [code, setCode] = useState("");
  const [method, setMethod] = useState<"card" | "paypal" | "apple">("card");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (withProducts.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-4xl mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
      </div>
    );
  }

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const placeOrder = () => {
    const orderId = "AUR" + Math.random().toString(36).slice(2, 8).toUpperCase();
    sessionStorage.setItem("aurelis-last-order", JSON.stringify({ id: orderId, total, items: withProducts.length }));
    clear();
    navigate(`/order-confirmed?id=${orderId}`);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-10 md:py-16 grid lg:grid-cols-[1fr_440px] gap-12">
        <div>
          <h1 className="font-serif text-4xl mb-2">Checkout</h1>
          <div className="flex gap-1 text-xs uppercase tracking-widest text-muted-foreground mb-8">
            {(["info", "shipping", "payment"] as const).map((s, i) => (
              <span key={s} className={step === s ? "text-foreground" : ""}>
                {i + 1}. {s}
                {i < 2 && <span className="px-3 text-border">→</span>}
              </span>
            ))}
          </div>

          {step === "info" && (
            <section className="space-y-5">
              <h2 className="font-serif text-2xl">Contact</h2>
              <Input label="Email" value={form.email} onChange={(v) => update("email", v)} type="email" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="First name" value={form.firstName} onChange={(v) => update("firstName", v)} />
                <Input label="Last name" value={form.lastName} onChange={(v) => update("lastName", v)} />
              </div>
              <Button onClick={() => setStep("shipping")} className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-12">
                Continue to Shipping
              </Button>
            </section>
          )}

          {step === "shipping" && (
            <section className="space-y-5">
              <h2 className="font-serif text-2xl">Shipping address</h2>
              <Input label="Address" value={form.address} onChange={(v) => update("address", v)} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="City" value={form.city} onChange={(v) => update("city", v)} />
                <Input label="State" value={form.state} onChange={(v) => update("state", v)} />
                <Input label="ZIP" value={form.zip} onChange={(v) => update("zip", v)} />
              </div>
              <div className="bg-secondary/40 p-4 text-sm">
                <p className="font-medium mb-1">📦 Free Standard Shipping</p>
                <p className="text-muted-foreground text-xs">Delivered within 3–5 business days. We ship from California.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("info")} className="rounded-none">Back</Button>
                <Button onClick={() => setStep("payment")} className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-none h-12">
                  Continue to Payment
                </Button>
              </div>
            </section>
          )}

          {step === "payment" && (
            <section className="space-y-5">
              <h2 className="font-serif text-2xl">Payment</h2>
              <div className="grid grid-cols-3 gap-2">
                {(["card", "paypal", "apple"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`border p-3 text-xs uppercase tracking-wider transition-elegant ${
                      method === m ? "border-foreground bg-foreground text-background" : "border-border"
                    }`}
                  >
                    {m === "card" ? "Card" : m === "paypal" ? "PayPal" : "Apple Pay"}
                  </button>
                ))}
              </div>

              {method === "card" && (
                <>
                  <Input label="Card number" value={form.cardNumber} onChange={(v) => update("cardNumber", v)} placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry (MM/YY)" value={form.expiry} onChange={(v) => update("expiry", v)} />
                    <Input label="CVC" value={form.cvc} onChange={(v) => update("cvc", v)} />
                  </div>
                </>
              )}
              {method !== "card" && (
                <p className="text-sm text-muted-foreground bg-secondary/40 p-4">
                  You'll be redirected to {method === "paypal" ? "PayPal" : "Apple Pay"} to complete the purchase securely.
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> 256-bit SSL encrypted checkout
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("shipping")} className="rounded-none">Back</Button>
                <Button onClick={placeOrder} className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-none h-12">
                  Place Order — {format(total)}
                </Button>
              </div>
              <p className="text-[10px] text-center uppercase tracking-widest text-muted-foreground">
                Stripe & PayPal Ready · Demo Mode
              </p>
            </section>
          )}
        </div>

        {/* SUMMARY */}
        <aside className="bg-secondary/40 p-6 lg:p-8 h-fit space-y-5 lg:sticky lg:top-24">
          <h3 className="font-serif text-2xl">Order summary</h3>
          <ul className="space-y-4">
            {withProducts.map((i) => (
              <li key={i.productId} className="flex gap-3">
                <div className="relative">
                  <img src={i.product.image} alt={i.product.name} className="w-16 h-16 object-cover bg-background" />
                  <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {i.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base leading-tight">{i.product.name}</p>
                  <p className="text-xs text-muted-foreground">{i.product.category}</p>
                </div>
                <p className="text-sm">{format(i.product.price * i.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-4 border-t border-border">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Discount code"
              className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground"
            />
            <Button
              variant="outline"
              onClick={() => applyDiscount(code) ? toast.success("Code applied") : toast.error("Invalid code")}
              className="rounded-none text-xs"
            >
              Apply
            </Button>
          </div>

          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>{format(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-gold">
                <span>Discount {discountCode && `(${discountCode})`}</span><span>−{format(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span><span>{subtotal >= 75 ? "Free" : format(8)}</span>
            </div>
            <div className="flex justify-between text-base font-medium pt-3 border-t border-border">
              <span>Total</span><span>{format(total + (subtotal >= 75 ? 0 : 8))}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border">
            <ShieldCheck className="h-4 w-4 text-gold" />
            60-day money-back guarantee
          </div>
        </aside>
      </div>
    </div>
  );
};

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
      />
    </label>
  );
}

export default Checkout;
