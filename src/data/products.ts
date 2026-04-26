import ledMask from "../assets/product-luminara-led-mask.jpg";
import serum from "../assets/product-silk-serum.jpg";
import cleansingBrush from "../assets/product-onyx-brush.jpg";
import roller from "../assets/product-marble-roller.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  subtitle: string;
  description: string;
  bullets: string[];
  color: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "luminara-led-mask",
    name: "Luminara LED Mask",
    category: "LED Facial Therapy",
    price: 289,
    compareAt: 369,
    subtitle: "A sculptural champagne LED mask for a calm, spa-level evening ritual.",
    description: "A premium light-therapy facial device with a soft-touch interior, balanced fit and guided ten-minute routine for luminous, rested-looking skin at home.",
    bullets: ["Four targeted LED modes", "Soft-touch contoured interior", "10-minute guided sessions", "USB-C magnetic charging"],
    color: "champagne",
    image: ledMask
  },
  {
    id: "aurelia-repair-serum",
    name: "Aurelia Repair Serum",
    category: "Barrier Support Serum",
    price: 78,
    subtitle: "A frosted-glass hydration serum made to finish a high-end facial ritual.",
    description: "A silky, fragrance-free serum with a refined slip, designed for layering after light care and before moisturizer without stickiness or shine.",
    bullets: ["Fragrance-free finish", "Glass bottle with gold pump", "Layers under cream", "Daily glow support"],
    color: "ivory",
    image: serum
  },
  {
    id: "celeste-sonic-brush",
    name: "Celeste Sonic Brush",
    category: "Sonic Cleansing Device",
    price: 118,
    compareAt: 148,
    subtitle: "An ivory sonic cleansing brush that prepares skin for serum and device care.",
    description: "A premium silicone cleansing tool with gentle pulse settings, a weighted ergonomic handle and a polished vanity-ready silhouette.",
    bullets: ["Three soft pulse levels", "Hygienic silicone bristles", "Water-resistant body", "Travel lock mode"],
    color: "pearl",
    image: cleansingBrush
  },
  {
    id: "roselle-sculpt-roller",
    name: "Roselle Sculpt Roller",
    category: "Facial Sculpting Tool",
    price: 64,
    subtitle: "A rose quartz-inspired roller for cool-touch contouring and serum glide.",
    description: "A dual-ended sculpting roller with warm gold hardware, balanced hand-feel and giftable presentation for elevated morning routines.",
    bullets: ["Dual contour heads", "Cool-touch stone feel", "Gold-tone hardware", "Gift-ready storage pouch"],
    color: "rose",
    image: roller
  }
];

export const mainProduct = products[0];
export const addOns = products.slice(1);
