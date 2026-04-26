import ledMask from "../assets/product-led-mask-pro.jpg";
import serum from "../assets/product-vitamin-c-serum.jpg";
import cleansingBrush from "../assets/product-sonic-cleanse-brush.jpg";
import roller from "../assets/product-pink-stone-roller.jpg";

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
    id: "luminara-led-mask",
    name: "AuroraFlex LED Therapy Mask",
    category: "LED Facial Therapy Device",
    price: 329,
    compareAt: 429,
    subtitle: "Champagne-gold flexible LED mask for a calm, visibly radiant evening ritual.",
    description: "A premium at-home light therapy mask with red, blue, amber and near-infrared modes, a cushioned interior and a ten-minute guided routine designed for consistent luxury skincare use.",
    bullets: ["4 targeted LED wavelengths", "Flexible comfort-fit silicone", "10-minute auto routine", "USB-C charging case compatible"],
    details: "Includes AuroraFlex mask, adjustable head strap, USB-C charging cable, satin storage pouch and quick-start ritual guide.",
    shipping: "In stock and ready to ship. Complimentary tracked shipping on orders over $250.",
    returns: "Eligible for the 60-day satisfaction guarantee when returned complete and hygienically handled.",
    stock: "In stock · ships in 1–2 business days",
    color: "champagne",
    image: ledMask
  },
  {
    id: "aurelia-repair-serum",
    name: "Maison C Peptide Serum",
    category: "Vitamin C + Peptide Serum",
    price: 92,
    subtitle: "Frosted-glass brightening serum with a refined, cushiony finish.",
    description: "A daily vitamin C and peptide serum created to pair with device-led routines, leaving skin feeling hydrated, smooth and ready for moisturizer without tackiness.",
    bullets: ["Vitamin C glow complex", "Peptide comfort support", "Frosted glass bottle", "Layers cleanly under cream"],
    details: "30 ml pump bottle. Apply one to two pumps after cleansing and before moisturizer, morning or evening.",
    shipping: "Ships with protective carton packaging and tracking on every order.",
    returns: "Unopened bottles qualify for returns inside the published confidence window.",
    stock: "In stock · limited launch batch",
    color: "ivory",
    image: serum
  },
  {
    id: "celeste-sonic-brush",
    name: "Celeste Sonic Cleansing Wand",
    category: "Sonic Cleansing Tool",
    price: 128,
    compareAt: 168,
    subtitle: "Ivory cleansing wand with soft sonic polish and gold detailing.",
    description: "A water-resistant sonic cleansing wand with three gentle pulse modes, a balanced ergonomic handle and a vanity-ready silhouette for daily facial preparation.",
    bullets: ["3 sonic pulse modes", "Soft hygienic touch surface", "Water-resistant body", "Travel lock function"],
    details: "Includes cleansing wand, charging cable and protective travel sleeve. Use with non-abrasive cleanser.",
    shipping: "Packed in a rigid gift box and shipped with tracking.",
    returns: "Eligible when returned with all accessories and original packaging according to hygiene policy.",
    stock: "In stock · ships this week",
    color: "pearl",
    image: cleansingBrush
  },
  {
    id: "roselle-sculpt-roller",
    name: "Roselle Quartz Sculpt Roller",
    category: "Facial Sculpting Tool",
    price: 68,
    subtitle: "Pink stone-inspired sculpting roller with warm brushed-gold hardware.",
    description: "A dual-ended facial roller designed for cool-touch contouring, serum glide and refined morning depuffing rituals with a balanced, giftable hand-feel.",
    bullets: ["Dual contour heads", "Cool-touch stone finish", "Brushed-gold hardware", "Satin storage pouch"],
    details: "Use after serum across cheeks, jawline and brow area with light outward strokes. Store cool for a refreshed ritual.",
    shipping: "Ships in a padded gift carton with tracked delivery.",
    returns: "Return eligible when unused and complete with pouch and original packaging.",
    stock: "In stock · ready to gift",
    color: "rose",
    image: roller
  }
];

export const mainProduct = products[0];
export const addOns = products.slice(1);
