import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    title: "I forgot what neck pain felt like.",
    body: "I work at a desk 10 hours a day. After two weeks with the Aura Posture, my chiropractor literally asked what I'd changed. Worth every penny.",
    verified: true,
    product: "Aura Posture",
  },
  {
    name: "Jessica T.",
    location: "Brooklyn, NY",
    rating: 5,
    title: "Replaced my $150/month massage habit.",
    body: "The Cervi Pro is genuinely shocking. 15 minutes after work and I feel like I just left a spa. The build quality is also stunning — feels like a $400 device.",
    verified: true,
    product: "Cervi Pro",
  },
  {
    name: "David K.",
    location: "Los Angeles, CA",
    rating: 5,
    title: "My posture in photos is unrecognizable.",
    body: "I'm 6'3\" and have slouched my whole life. Three weeks in and friends are commenting that I look taller and more confident. The vibration is so subtle nobody at the office knows I'm wearing it.",
    verified: true,
    product: "Aura Posture",
  },
  {
    name: "Maria L.",
    location: "Miami, FL",
    rating: 5,
    title: "Glow goals achieved.",
    body: "I was skeptical about LED masks but Lumière converted me completely. My fine lines around my eyes are visibly softer after 6 weeks. The build feels luxe — proper investment piece.",
    verified: true,
    product: "Lumière LED",
  },
  {
    name: "Mike R.",
    location: "Denver, CO",
    rating: 5,
    title: "Best work-from-home upgrade I've made.",
    body: "Bought the Posture & Recovery Set. Use the Aura all day, the Cervi Pro every evening. My migraines have decreased 80%. Should have done this years ago.",
    verified: true,
    product: "Bundle",
  },
  {
    name: "Amanda P.",
    location: "Seattle, WA",
    rating: 5,
    title: "Smoothies in my hotel room — yes please.",
    body: "Lume Blend is genuinely powerful. Crushes frozen berries with no problem and looks gorgeous on my counter. Travel game forever changed.",
    verified: true,
    product: "Lume Blend",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-secondary/40">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">7,000+ Five-Star Reviews</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Loved by 80,000+ wellness obsessives.</h2>
          <div className="inline-flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm">4.9 / 5 average · Verified Buyers</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="bg-background p-7 border border-border/50 shadow-soft animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex mb-3">
                {[...Array(r.rating)].map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <h4 className="font-serif text-xl mb-2 leading-tight">{r.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{r.body}</p>
              <div className="flex justify-between items-end pt-4 border-t border-border">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
                <div className="text-right">
                  {r.verified && (
                    <p className="text-[10px] uppercase tracking-wider text-gold">✓ Verified</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">{r.product}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
