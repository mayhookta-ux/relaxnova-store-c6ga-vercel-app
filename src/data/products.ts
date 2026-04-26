import postureCorrector from "../assets/cj-smart-posture-corrector.jpg";

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
    subtitle: "Adjustable Anglel Smart Posture Corrector For Adults Children Correct Hunchback Clavicle Support Trainer Upper Back Brace Black.",
    description: "Accurately capture the wearer's posture changes through angle and tension sensing, and vibrate promptly. High elasticity adjustable shoulder strap, without fear of age and height. Sitting posture correction, full of confidence anytime, anywhere.",
    bullets: ["Angle and tension sensing", "Automatic vibration reminder", "High elasticity adjustable shoulder strap", "LED counting for accumulative reminder error posture"],
    details: "Material: Plastic. Applicable people: unisex. Scope of application: general. Style: induction vibration. Type: Orthotics. Color: black belt (English display). Package content: 1*Posture Corrector.",
    shipping: "CJ Dropshipping supplier shipping time shown for United States: 8–23 days.",
    returns: "Eligible orders may be reviewed under the 30-day guarantee when returned complete, clean and safely packed.",
    stock: "CJ verified · SKU CJJT100662701AZ",
    color: "onyx",
    image: postureCorrector
  }
];

export const mainProduct = products[0];
export const neckMassagerProduct = products[0];
export const addOns: Product[] = [];
