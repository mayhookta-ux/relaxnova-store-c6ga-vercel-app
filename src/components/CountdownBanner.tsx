import { useEffect, useState } from "react";

function getNextMidnight() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}

export function CountdownBanner() {
  const [target] = useState(getNextMidnight());
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  return (
    <section className="bg-gradient-ink text-primary-foreground py-10">
      <div className="container text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Flash Offer Ends In</p>
        <div className="flex justify-center gap-3 md:gap-6">
          {[
            { v: h, l: "Hours" },
            { v: m, l: "Minutes" },
            { v: s, l: "Seconds" },
          ].map((b, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-4xl md:text-6xl font-light tabular-nums">
                {String(b.v).padStart(2, "0")}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 mt-1">{b.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-primary-foreground/80">
          Up to <span className="text-gold">40% off</span> on bestsellers · Code <span className="font-mono text-gold">AURELIS15</span> for extra 15% off
        </p>
      </div>
    </section>
  );
}
