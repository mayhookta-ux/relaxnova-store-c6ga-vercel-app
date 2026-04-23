import lifestyleImg from "@/assets/lifestyle-1.jpg";

const About = () => (
  <>
    <section className="container py-16 md:py-24 max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Our Story</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
        Wellness, <em className="text-gold-shimmer not-italic">quietly</em> engineered.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Aurelis was founded in 2022 by a team of biomechanics researchers, industrial designers and skincare scientists who believed wellness products had become loud, ugly and complicated.
      </p>
    </section>

    <img src={lifestyleImg} alt="Aurelis lifestyle" className="w-full h-[60vh] object-cover" loading="lazy" />

    <section className="container py-20 md:py-28 max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
      <p className="text-foreground font-serif text-2xl leading-snug">
        We make devices our co-founders are proud to leave on their own nightstands.
      </p>
      <p>
        Every product begins with a question: <em>what would this look like if we removed everything that wasn't essential?</em> The answer is what you find in our boxes — a discreet posture sensor that vanishes under cashmere, a neck massager that folds into the palm of your hand, an LED mask that genuinely improves skin in weeks.
      </p>
      <p>
        We test every device for thousands of hours before launch. We refuse to ship anything we wouldn't gift to our mothers. And we stand behind every order with a 60-day risk-free trial.
      </p>
      <p>
        Aurelis is independently owned, headquartered in Venice Beach, California, and proudly designed in the US.
      </p>
    </section>

    <section className="bg-secondary/40 py-20">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          ["80,000+", "Customers"],
          ["4.9★", "Average Rating"],
          ["60-Day", "Money-Back"],
          ["$0", "Plastic Waste"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-serif text-4xl md:text-5xl text-gold">{v}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{l}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default About;
