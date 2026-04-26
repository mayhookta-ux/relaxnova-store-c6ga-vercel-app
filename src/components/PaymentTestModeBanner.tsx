const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;

  return (
    <div className="payment-test-banner" role="status">
      Payments in this preview use the secure test environment. Live payments activate from the Payments dashboard.
    </div>
  );
}
