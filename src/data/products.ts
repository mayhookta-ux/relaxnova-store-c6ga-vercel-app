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
    name: "Caldria Light Ritual Mask",
    category: "Light Care Device",
    price: 329,
    compareAt: 429,
    subtitle: "Champagne-toned facial device made to give nightly care a calmer rhythm, a clearer purpose and a more polished finish.",
    description: "A premium at-home light care device with four selectable settings, a cushioned inner feel and a short guided session for customers who want daily self-care to feel organized, comfortable and visually refined.",
    bullets: ["Four selectable light settings", "Comfort-focused inner surface", "10-minute guided session", "Vanity-ready premium finish"],
    details: "Includes device, adjustable strap, USB-C cable, soft storage sleeve and an original quick-start care card.",
    shipping: "Ready-to-pack units can leave during the active fulfillment window. Tracked delivery is included for qualifying carts.",
    returns: "Eligible orders may be reviewed under the 30-day guarantee when returned complete and safely packed.",
    stock: "Limited stock · shipping today eligible",
    color: "champagne",
    image: ledMask
  },
  {
    id: "aurelia-repair-serum",
    name: "Liora Cushion Serum",
    category: "Daily Finish Serum",
    price: 92,
    subtitle: "Frosted-glass serum with a smooth, cushion-like finish that makes daily layering feel softer and more complete.",
    description: "A lightweight finishing serum created to follow cleansing or device care, adding glide, comfort and a composed skin feel before moisturizer.",
    bullets: ["Smooth daily texture", "Peptide-inspired care story", "Frosted glass presentation", "Layers neatly under cream"],
    details: "30 ml pump bottle. Apply one to two pumps after cleansing and before cream during morning or evening care.",
    shipping: "Packed in a protective carton with tracked delivery on eligible orders.",
    returns: "Unopened bottles may qualify for return review within the published guarantee window.",
    stock: "Limited stock · high demand indicator",
    color: "ivory",
    image: serum
  },
  {
    id: "celeste-sonic-brush",
    name: "Veyra Sonic Prep Wand",
    category: "Cleansing Prep Tool",
    price: 128,
    compareAt: 168,
    subtitle: "Ivory prep wand with gentle pulse settings for a cleaner-feeling start and a more intentional care sequence.",
    description: "A water-resistant cleansing prep tool with three pulse levels, a balanced handle and a clean silhouette for shoppers who want their routine to feel orderly, comfortable and elevated.",
    bullets: ["Three gentle pulse levels", "Soft-touch contact surface", "Water-resistant outer body", "Travel lock setting"],
    details: "Includes prep wand, charging cable and protective sleeve. Pair with a mild cleanser and rinse after use.",
    shipping: "Packed in a structured gift carton and released with tracking where service is available.",
    returns: "Return review is available when accessories and original packaging are included under hygiene-aware conditions.",
    stock: "Limited stock · fast shipping eligible",
    color: "pearl",
    image: cleansingBrush
  },
  {
    id: "roselle-sculpt-roller",
    name: "Nerelle Cooling Sculpt Roller",
    category: "Cooling Sculpt Tool",
    price: 68,
    subtitle: "Pink cooling roller with warm metal hardware for a soothing finishing step that makes the routine feel complete.",
    description: "A dual-ended sculpting roller designed for serum glide, gentle facial massage and a quiet morning or evening finish with a refined self-care feel.",
    bullets: ["Two rolling ends", "Cooling stone-like finish", "Warm metal hardware", "Soft storage pouch"],
    details: "Use with light outward strokes across cheeks, jawline and brow area after serum. Store cool for a refreshing feel.",
    shipping: "Ships in a padded presentation carton with tracking on eligible orders.",
    returns: "Unused rollers may qualify for return review when complete with pouch and original packaging.",
    stock: "Limited stock · ready to gift",
    color: "rose",
    image: roller
  }
];

export const mainProduct = products[0];
export const addOns = products.slice(1);
