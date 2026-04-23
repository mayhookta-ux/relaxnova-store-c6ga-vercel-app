import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill in all fields");
    toast.success("Thank you. Our team will respond within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Get in touch</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Talk to a human.</h1>
        <p className="text-muted-foreground">
          Our concierge team is based in California and responds within 24 hours, 7 days a week.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        {[
          { Icon: Mail, label: "Email", value: "care@aurelis.com" },
          { Icon: MessageSquare, label: "Live Chat", value: "Bottom-right · 24/7 AI + Human" },
          { Icon: MapPin, label: "HQ", value: "Venice Beach, California" },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="bg-secondary/40 p-6 text-center">
            <Icon className="h-5 w-5 text-gold mx-auto mb-3" strokeWidth={1.4} />
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
            <p className="text-sm font-medium">{value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="max-w-xl mx-auto space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email address"
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
          required
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={6}
          placeholder="How can we help?"
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground resize-none"
          required
        />
        <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-12">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;
