const messages = [
  "✦ Free US shipping on orders over $75",
  "✦ 60-day risk-free trial",
  "✦ FSA & HSA eligible",
  "✦ Use code WELCOME10 for 10% off your first order",
];

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-ink text-primary-foreground py-2.5 overflow-hidden">
      <div className="flex whitespace-nowrap marquee">
        {[...messages, ...messages, ...messages].map((m, i) => (
          <span key={i} className="px-8 text-xs tracking-[0.2em] uppercase font-light">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
