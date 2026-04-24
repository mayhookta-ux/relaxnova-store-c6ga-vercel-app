import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const slides = [
  {
    avatar: avatar1,
    name: "Eleanor Whitfield",
    title: "Editor, New York",
    quote:
      "I've reviewed dozens of wellness gadgets. This is the first one that actually became part of my routine — and stayed there for six months.",
    outcome: "Daily wear · 6 months",
    rating: 5,
  },
  {
    avatar: avatar2,
    name: "Imani Brooks",
    title: "Pilates Instructor, Atlanta",
    quote:
      "My clients ask what I changed. I tell them the truth: a small device, a few weeks, and the kind of posture you'd pay a coach for.",
    outcome: "Posture · 4 weeks",
    rating: 5,
  },
  {
    avatar: avatar3,
    name: "Marcus Hale",
    title: "Architect, Chicago",
    quote:
      "Sat at a desk for 22 years. Two years of chiropractor bills. Eight weeks of Aurelis fixed what neither one could.",
    outcome: "Recovery · 8 weeks",
    rating: 5,
  },
  {
    avatar: avatar4,
    name: "Mei Tanaka",
    title: "Founder, San Francisco",
    quote:
      "It feels designed by someone who actually cares. The materials, the silence, the box — every detail is considered.",
    outcome: "Verified buyer",
    rating: 5,
  },
];

export function TestimonialSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="bg-background py-24 md:py-32 border-t border-border">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">In Their Words</p>
          <h2 className="font-serif text-4xl md:text-5xl">Real outcomes, real people.</h2>
        </div>

        <div key={i} className="animate-fade-in">
          <Quote className="h-10 w-10 text-gold/30 mx-auto mb-6" strokeWidth={1.2} />
          <blockquote className="font-serif text-2xl md:text-4xl text-center leading-[1.25] text-balance text-foreground">
            "{s.quote}"
          </blockquote>

          <div className="flex flex-col items-center mt-10 gap-3">
            <img
              src={s.avatar}
              alt={s.name}
              loading="lazy"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex">
              {[...Array(s.rating)].map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.title}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold mt-2">
                ✓ {s.outcome}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {slides.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Go to testimonial ${k + 1}`}
              className={`h-1 transition-elegant ${
                k === i ? "w-10 bg-foreground" : "w-5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
