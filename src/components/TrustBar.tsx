import { Shield, Truck, RefreshCcw, Award } from "lucide-react";

const items = [
  { Icon: Truck, title: "Free US Shipping", body: "On every order over $75" },
  { Icon: RefreshCcw, title: "60-Day Trial", body: "Risk-free returns, no questions" },
  { Icon: Shield, title: "2-Year Warranty", body: "On every device, guaranteed" },
  { Icon: Award, title: "FSA & HSA Eligible", body: "Use pre-tax wellness dollars" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border py-8 md:py-10 bg-background">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {items.map(({ Icon, title, body }) => (
          <div key={title} className="flex items-center gap-3 md:justify-center">
            <Icon className="h-5 w-5 text-gold flex-shrink-0" strokeWidth={1.4} />
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
