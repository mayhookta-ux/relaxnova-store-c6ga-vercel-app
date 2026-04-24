const press = [
  { name: "VOGUE", quote: "A masterclass in invisible wellness." },
  { name: "FORBES", quote: "The most disciplined wellness brand of the year." },
  { name: "GQ", quote: "Quietly engineered. Loudly effective." },
  { name: "GOOP", quote: "An obsession-worthy upgrade." },
  { name: "HEALTHLINE", quote: "Clinically thoughtful. Beautifully made." },
];

export function PressStrip() {
  return (
    <section className="border-y border-border bg-background py-14 md:py-16">
      <div className="container">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-10">
          As Featured In
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
          {press.map((p, i) => (
            <figure
              key={p.name}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="font-serif text-2xl md:text-3xl tracking-[0.18em] mb-2.5">
                {p.name}
              </p>
              <blockquote className="text-[11px] md:text-xs text-muted-foreground italic leading-relaxed max-w-[180px] mx-auto">
                "{p.quote}"
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
