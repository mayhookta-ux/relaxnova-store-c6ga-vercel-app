CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_email text NOT NULL,
  customer_name text,
  phone text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'fulfilled', 'cancelled', 'refunded')),
  payment_status text NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'failed', 'refunded', 'partially_refunded')),
  fulfillment_status text NOT NULL DEFAULT 'not_submitted' CHECK (fulfillment_status IN ('not_submitted', 'ready_for_cj', 'submitted_to_cj', 'in_transit', 'delivered', 'issue')),
  cj_status text DEFAULT 'pending_export',
  stripe_checkout_session_id text UNIQUE,
  stripe_payment_intent_id text,
  currency text NOT NULL DEFAULT 'usd',
  subtotal_amount integer NOT NULL DEFAULT 0,
  shipping_amount integer NOT NULL DEFAULT 0,
  tax_amount integer NOT NULL DEFAULT 0,
  total_amount integer NOT NULL DEFAULT 0,
  shipping_address jsonb,
  billing_address jsonb,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  sku text,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_amount integer NOT NULL CHECK (unit_amount >= 0),
  total_amount integer NOT NULL CHECK (total_amount >= 0),
  fulfillment_provider text NOT NULL DEFAULT 'cj_dropshipping',
  cj_product_id text,
  cj_variant_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.checkout_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  processed_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_orders_customer_email ON public.orders (customer_email);
CREATE INDEX idx_orders_stripe_checkout_session ON public.orders (stripe_checkout_session_id);
CREATE INDEX idx_orders_fulfillment_status ON public.orders (fulfillment_status);
CREATE INDEX idx_order_items_order_id ON public.order_items (order_id);
CREATE INDEX idx_checkout_events_order_id ON public.checkout_events (order_id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_events ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();