import { useSearchParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderConfirmed = () => {
  const [params] = useSearchParams();
  const id = params.get("id") || "AURXXXXXX";
  return (
    <div className="container py-20 max-w-xl text-center">
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-6">
        <Check className="h-7 w-7 text-gold" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Order Placed</p>
      <h1 className="font-serif text-4xl md:text-5xl mb-4">Thank you.</h1>
      <p className="text-muted-foreground mb-2">Your order <span className="text-foreground font-medium">{id}</span> is confirmed.</p>
      <p className="text-muted-foreground mb-8">A receipt and tracking link will arrive in your inbox shortly.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild className="rounded-none bg-foreground text-background hover:bg-foreground/90">
          <Link to={`/track?order=${id}`}>Track Your Order</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-none border-foreground">
          <Link to="/shop">Keep Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmed;
