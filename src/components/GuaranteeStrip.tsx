import { ShieldCheck, Lock, BadgeCheck, HeadphonesIcon } from "lucide-react";

const items = [
  {
    Icon: ShieldCheck,
    title: "60-Day Guarantee",
    body: "Wear it, test it, return it. Full refund — no questions, no fine print.",
  },
  {
    Icon: Lock,
    title: "Secure Checkout",
    body: "256-bit SSL encryption. Apple Pay, Google Pay, and PayPal accepted.",
  },
  {
    Icon: BadgeCheck,
    title: "Clinician Approved",
    body: "Co-developed with US-licensed PTs, dermatologists and biomechanists.",
  },
  {
    Icon: HeadphonesIcon,
    title: "Concierge Support",
    body: "Real humans in California. 7 days a week. Average reply: under 2 hours.",
  },
];

export function GuaranteeStrip() {
  return (
    <section className="py-20 md:py-24 bg-background border-t border-border">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">The Aurelis Promise</p>
          <h2 className="font-serif text-4xl md:text-5xl">Built around your trust.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {items.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-gold/40 mb-5">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
              </div>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
