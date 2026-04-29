import postureCorrector from "../assets/posture-gallery-product-front.jpg";

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
    id: "relaxnova-smart-posture-corrector",
    name: "RelaxNova Smart Posture Corrector",
    category: "Upper Back Posture Trainer",
    price: 39,
    compareAt: 89,
    subtitle: "An adjustable-angle smart posture corrector with induction vibration, elastic shoulder straps, and LED reminder counting.",
    description: "A black upper-back posture trainer that senses posture angle changes and sends a gentle vibration cue when you exceed the selected reminder angle.",
    bullets: ["Smart posture correction device designed for daily comfort and posture awareness.", "Adjustable reminder angle for sitting and standing", "High-elasticity black shoulder strap fit", "LED counter tracks posture reminder activity"],
    details: "Black belt English-display smart posture corrector with plastic sensor body, induction vibration reminder, adjustable elastic shoulder straps, LED counting, and a compact upper-back wearable form.",
    shipping: "Free US Shipping included. Estimated delivery: 8–23 days.",
    returns: "Easy Returns with a 30-day satisfaction review when returned complete, clean and safely packed.",
    stock: "Verified buyer favorite · Limited US offer",
    color: "onyx",
    image: postureCorrector
  }
];

export const mainProduct = products[0];
export const neckMassagerProduct = products[0];
export const addOns: Product[] = [];
