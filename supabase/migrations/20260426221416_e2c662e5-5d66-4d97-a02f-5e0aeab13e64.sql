CREATE TABLE public.store_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  order_id UUID NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_store_notifications_created_at ON public.store_notifications (created_at DESC);
CREATE INDEX idx_store_notifications_order_id ON public.store_notifications (order_id);
CREATE INDEX idx_store_notifications_is_read ON public.store_notifications (is_read);

ALTER TABLE public.store_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store notifications are server managed only"
ON public.store_notifications
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE TRIGGER set_store_notifications_updated_at
BEFORE UPDATE ON public.store_notifications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();