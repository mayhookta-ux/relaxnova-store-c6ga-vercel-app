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
    category: "Verified Smart Posture Trainer",
    price: 39,
    compareAt: 89,
    subtitle: "A lightweight vibration posture trainer for desk work, daily comfort, and better shoulder alignment habits.",
    description: "Designed for long workdays, laptop posture, and neck-and-shoulder tension awareness. Smart sensing detects slouching and sends a gentle vibration cue so you can reset before poor posture becomes your default.",
    bullets: ["Gentle vibration reminders when you slouch", "Helps support neck comfort and upright posture habits", "Adjustable fit for daily work-from-home sessions", "LED reminder counter tracks visible daily progress"],
    details: "Lightweight black smart posture trainer with induction vibration, adjustable elastic shoulder strap, LED counter, and one focused job: helping you notice and correct slouching throughout the day.",
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
