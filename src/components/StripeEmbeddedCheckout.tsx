import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { supabase } from "../integrations/supabase/client";
import { getStripe, getStripeEnvironment } from "../lib/stripe";

export type CheckoutLineItem = {
  productId: string;
  quantity: number;
};

type StripeEmbeddedCheckoutProps = {
  items: CheckoutLineItem[];
  customerEmail?: string;
};

export function StripeEmbeddedCheckout({ items, customerEmail }: StripeEmbeddedCheckoutProps) {
  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        items,
        customerEmail,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/?checkout=complete&session_id={CHECKOUT_SESSION_ID}`,
      },
    });

    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Unable to start secure checkout");
    }

    return data.clientSecret;
  };

  return (
    <div className="embedded-checkout-shell">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
