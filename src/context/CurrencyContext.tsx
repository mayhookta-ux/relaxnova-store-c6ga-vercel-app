import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
};

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
};

type CurrencyCtx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usd: number) => string;
};

const Ctx = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("aurelis-currency") as Currency | null;
    if (saved && RATES[saved]) setCurrencyState(saved);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("aurelis-currency", c);
  };

  const format = (usd: number) => {
    const converted = usd * RATES[currency];
    return `${SYMBOLS[currency]}${converted.toFixed(2)}`;
  };

  return <Ctx.Provider value={{ currency, setCurrency, format }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCurrency must be used within CurrencyProvider");
  return c;
};

export const SUPPORTED_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "CAD", "AUD"];
