import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Package, Truck, Home } from "lucide-react";

const Track = () => {
  const [order, setOrder] = useState("");
  const [shown, setShown] = useState(false);

  const stages = [
    { Icon: Check, label: "Order Confirmed", date: "Apr 21, 2026", done: true },
    { Icon: Package, label: "Packed in California", date: "Apr 22, 2026", done: true },
    { Icon: Truck, label: "Out for Delivery", date: "Apr 24, 2026", done: true, current: true },
    { Icon: Home, label: "Delivered", date: "Expected Apr 25", done: false },
  ];

  return (
    <div className="container py-16 md:py-24 max-w-2xl">
      <p className="text-xs uppercase tracking-[0.3em] text-gold text-center mb-3">Order Tracking</p>
      <h1 className="font-serif text-4xl md:text-5xl text-center mb-10">Where's my Aurelis?</h1>

      <div className="flex gap-3 mb-12">
        <input
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Order number (e.g. AURABCDEF)"
          className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
        />
        <Button onClick={() => setShown(true)} className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-6">
          Track
        </Button>
      </div>

      {shown && (
        <div className="bg-secondary/40 p-6 md:p-10 animate-fade-up">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Order</span>
            <span className="font-medium">{order || "AURABCDEF"}</span>
          </div>
          <div className="flex justify-between mb-8 text-sm">
            <span className="text-muted-foreground">Estimated arrival</span>
            <span className="font-medium">April 25, 2026</span>
          </div>

          <ol className="space-y-6 relative">
            <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border" />
            {stages.map((s, i) => {
              const Icon = s.Icon;
              return (
                <li key={i} className="flex gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    s.done ? "bg-gold text-foreground" : "bg-muted text-muted-foreground"
                  } ${s.current ? "ring-4 ring-gold/20" : ""}`}>
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className={`font-medium ${!s.done && "text-muted-foreground"}`}>{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.date}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Track;
