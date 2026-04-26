CREATE POLICY "Orders are server managed only"
ON public.orders
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Order items are server managed only"
ON public.order_items
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Checkout events are server managed only"
ON public.checkout_events
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);