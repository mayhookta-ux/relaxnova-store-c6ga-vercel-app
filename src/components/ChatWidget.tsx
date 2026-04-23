import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const replies = [
  "Hi! I'm Aria, your wellness concierge. How can I help today?",
  "Great question — our Aura Posture works for 95% of body types. Most customers feel a difference within the first week.",
  "Free US shipping on every order over $75 and 60-day returns, no questions asked.",
  "Yes, all our devices are FSA & HSA eligible! Just request the receipt at checkout.",
  "I'd recommend our Posture & Recovery Set — it's our most-loved bundle and saves you $159.",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    { from: "ai", text: replies[0] },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setInput("");
    setTimeout(() => {
      const r = replies[Math.floor(Math.random() * (replies.length - 1)) + 1];
      setMessages((m) => [...m, { from: "ai", text: r }]);
    }, 800);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-30 bg-foreground text-background p-4 rounded-full shadow-lift hover:scale-105 transition-elegant"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-30 w-[92vw] max-w-sm bg-background border border-border shadow-lift flex flex-col h-[500px] max-h-[80vh] animate-fade-up">
          <div className="bg-gradient-ink text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gold rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <p className="font-serif text-lg leading-tight">Aria</p>
                <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60">AI Wellness Concierge · Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === "ai"
                    ? "bg-background text-foreground rounded-r-xl rounded-bl-xl"
                    : "ml-auto bg-foreground text-background rounded-l-xl rounded-br-xl"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="p-3 border-t border-border flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground"
            />
            <button
              type="submit"
              className="bg-foreground text-background px-3 hover:bg-foreground/90"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
