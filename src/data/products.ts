import postureCorrector from "../assets/product-smart-posture-corrector.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  subtitle: string;
  description: string;
  bullets: string[];
  details: string;
  shipping: string;
  returns: string;
  stock: string;
  color: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "cj-smart-posture-corrector",
    name: "Smart Posture Corrector",
    category: "CJ Dropshipping Verified Posture Device",
    price: 34.99,
    compareAt: 59.99,
    subtitle: "A wearable smart posture trainer for desk work, long commutes and daily alignment reminders without bulky equipment.",
    description: "This CJ Dropshipping verified smart posture corrector uses an adjustable upper-back brace with gentle vibration reminders to help customers notice slouching and build a more upright sitting habit during everyday routines.",
    bullets: ["Smart vibration posture reminders", "Adjustable shoulder and back fit", "Lightweight wearable design", "USB rechargeable daily-use device"],
    details: "Includes smart posture corrector, USB charging cable and setup guide. Wear over a thin shirt, adjust the straps, calibrate upright posture and use in short daily sessions.",
    shipping: "CJ Dropshipping fulfillment support with tracked United States delivery estimate of 7–12 business days after processing.",
    returns: "Eligible orders may be reviewed under the 30-day guarantee when returned complete, clean and safely packed.",
    stock: "CJ verified · United States delivery available",
    color: "onyx",
    image: postureCorrector
  }
];

export const mainProduct = products[0];
export const neckMassagerProduct = products[0];
export const addOns: Product[] = [];
