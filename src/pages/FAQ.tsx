import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How long until I see results with Aura Posture?", a: "Most customers report visible posture improvement within 14 days of consistent daily use. Clinical inspiration suggests 4–6 weeks for full muscle memory adaptation." },
  { q: "Is the device visible under clothing?", a: "No. At just 28g and 8mm thick, Aura Posture is completely invisible under everything from t-shirts to fitted blazers." },
  { q: "Are your products FSA / HSA eligible?", a: "Yes. All Aurelis wellness devices qualify as FSA and HSA eligible expenses. We provide an itemized receipt with every order." },
  { q: "What's your return policy?", a: "We offer a 60-day risk-free trial on every device. If you're not in love, we'll refund you in full — no questions, no restocking fees." },
  { q: "How long does shipping take?", a: "Free standard shipping arrives in 3–5 business days within the US. Express (1–2 days) is available at checkout. We ship from our California facility." },
  { q: "Do you ship internationally?", a: "We currently ship to the US, Canada, UK, Australia and most of the EU. International orders typically arrive in 7–14 business days." },
  { q: "What's the warranty?", a: "Every Aurelis device is backed by a 2-year warranty covering defects and electronics failure. Extended coverage available at checkout." },
  { q: "Is the LED mask safe to use daily?", a: "Yes. Lumière LED uses cold, non-UV light therapy that's safe for daily 10-minute sessions. We recommend starting at 3–4 sessions per week and building up." },
];

const FAQ = () => (
  <div className="container py-16 md:py-24 max-w-3xl">
    <p className="text-xs uppercase tracking-[0.3em] text-gold text-center mb-3">Help Center</p>
    <h1 className="font-serif text-5xl md:text-6xl text-center mb-12">Questions, answered.</h1>
    <Accordion type="single" collapsible className="space-y-2">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`f${i}`} className="border-b border-border">
          <AccordionTrigger className="font-serif text-xl text-left">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQ;
