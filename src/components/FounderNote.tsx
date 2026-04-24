import founder from "@/assets/founder.jpg";

export function FounderNote() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5">
          <div className="relative max-w-md mx-auto lg:mx-0">
            <img
              src={founder}
              alt="Aurelis founder"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto shadow-soft"
            />
            <div className="absolute -bottom-4 -right-4 bg-background px-5 py-3 shadow-lift hidden md:block">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold">Founder</p>
              <p className="font-serif text-lg leading-tight mt-0.5">Lena Marchetti</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">A Letter From Our Founder</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.08] text-balance">
            "I built Aurelis because I was tired of wellness that demanded so much,
            <span className="italic text-gold-shimmer"> and gave so little back.</span>"
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-xl">
            <p>
              Five years ago, I was juggling a 60-hour week, two kids, and a body that was
              quietly falling apart. I tried every device, app, and supplement on the market.
              Most lasted a week. None lasted a season.
            </p>
            <p>
              So we built the opposite. Tools you forget you're using — until the mirror,
              your tailor, or your chiropractor reminds you. Engineered with clinicians.
              Manufactured in small batches. Tested for ten thousand wears before the first
              shipped.
            </p>
            <p className="text-foreground italic">
              If your first 60 days don't change something for you, we want it back. — Lena
            </p>
          </div>
          <div className="pt-4 flex items-center gap-6 border-t border-border">
            <div>
              <p className="font-serif text-3xl">5 yrs</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                In R&D
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-serif text-3xl">12</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                Clinicians on team
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-serif text-3xl">80k+</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                US customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
