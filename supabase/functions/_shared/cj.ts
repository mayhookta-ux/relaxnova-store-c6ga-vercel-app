const CJ_API_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

type CjAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

type CjOrderItem = {
  id: string;
  quantity: number;
  sku?: string | null;
  cj_variant_id?: string | null;
};

type SubmitCjOrderInput = {
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  customerName?: string | null;
  phone?: string | null;
  shippingAddress: CjAddress | null;
  items: CjOrderItem[];
};

function requireEnv(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function requireField(value: string | null | undefined, field: string) {
  const clean = value?.toString().trim();
  if (!clean) throw new Error(`CJ fulfillment missing ${field}`);
  return clean;
}

export async function submitOrderToCj(input: SubmitCjOrderInput) {
  const token = requireEnv("CJ_ACCESS_TOKEN");
  const address = input.shippingAddress;
  const products = input.items.map((item) => ({
    ...(item.cj_variant_id ? { vid: item.cj_variant_id } : { sku: requireField(item.sku, `CJ SKU for order item ${item.id}`) }),
    quantity: item.quantity,
    storeLineItemId: item.id,
  }));

  const payload = {
    orderNumber: input.orderNumber,
    shippingZip: requireField(address?.postal_code, "shipping ZIP"),
    shippingCountry: requireField(address?.country, "shipping country"),
    shippingCountryCode: requireField(address?.country, "shipping country code"),
    shippingProvince: requireField(address?.state, "shipping state"),
    shippingCity: requireField(address?.city, "shipping city"),
    shippingCustomerName: requireField(input.customerName, "customer name"),
    shippingPhone: input.phone || "0000000000",
    shippingAddress: requireField(address?.line1, "shipping address"),
    shippingAddress2: address?.line2 || "",
    email: input.customerEmail,
    remark: `Paid storefront order ${input.orderNumber}`,
    logisticName: "CJPacket Ordinary",
    fromCountryCode: "CN",
    platform: "shopify",
    shopLogisticsType: 2,
    products,
  };

  const headers: Record<string, string> = {
    "CJ-Access-Token": token,
    "Content-Type": "application/json",
  };
  const platformToken = Deno.env.get("CJ_PLATFORM_TOKEN");
  if (platformToken) headers.platformToken = platformToken;

  const response = await fetch(`${CJ_API_BASE}/shopping/order/createOrderV2`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.result === false || result?.success === false) {
    throw new Error(`CJ create order failed [${response.status}]: ${JSON.stringify(result)}`);
  }

  return result;
}