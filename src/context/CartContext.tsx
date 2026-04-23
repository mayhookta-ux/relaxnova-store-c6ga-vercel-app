import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
  discountCode: string | null;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  discountAmount: number;
  total: number;
  withProducts: Array<CartItem & { product: Product }>;
};

const CartContext = createContext<CartContextValue | null>(null);

const DISCOUNTS: Record<string, number> = {
  WELCOME10: 0.1,
  AURELIS15: 0.15,
  VIP20: 0.2,
};

const STORAGE_KEY = "aurelis-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items || []);
        setDiscountCode(parsed.discountCode || null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, discountCode }));
  }, [items, discountCode]);

  const addItem = (productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    setOpen(true);
  };

  const removeItem = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clear = () => {
    setItems([]);
    setDiscountCode(null);
  };

  const withProducts = useMemo(
    () =>
      items
        .map((i) => {
          const product = products.find((p) => p.id === i.productId);
          return product ? { ...i, product } : null;
        })
        .filter(Boolean) as Array<CartItem & { product: Product }>,
    [items]
  );

  const subtotal = withProducts.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const discountAmount = discountCode ? subtotal * (DISCOUNTS[discountCode] || 0) : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const applyDiscount = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (DISCOUNTS[upper]) {
      setDiscountCode(upper);
      return true;
    }
    return false;
  };
  const removeDiscount = () => setDiscountCode(null);

  return (
    <CartContext.Provider
      value={{
        items,
        open,
        setOpen,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        subtotal,
        itemCount,
        discountCode,
        applyDiscount,
        removeDiscount,
        discountAmount,
        total,
        withProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
