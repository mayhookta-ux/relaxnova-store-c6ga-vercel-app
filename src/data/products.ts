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
};

export const products: Product[] = [
  {
    id: "oreva-beam",
    name: "Oréva Beam",
    category: "LED Facial Device",
    price: 249,
    compareAt: 329,
    subtitle: "A salon-inspired LED facial ritual for luminous, rested-looking skin.",
    description: "A refined handheld light-care device designed for calm evenings, quick morning refreshes and consistent visible radiance routines at home.",
    bullets: ["Four targeted light modes", "Featherweight curved contact surface", "10-minute guided ritual", "Rechargeable travel cradle"],
    color: "pearl"
  },
  {
    id: "veloura-serum",
    name: "Veloura Serum",
    category: "Facial Serum",
    price: 68,
    subtitle: "A silky hydration concentrate created to pair with light-led beauty rituals.",
    description: "A weightless finishing serum with botanical humectants and a smooth, non-sticky feel for a polished glow before or after device care.",
    bullets: ["Fragrance-free finish", "Layerable under moisturizer", "Glass-skin texture", "Made for daily rituals"],
    color: "rose"
  },
  {
    id: "lysa-roller",
    name: "Lysa Roller",
    category: "Facial Roller",
    price: 54,
    subtitle: "A cool-touch sculpting tool for relaxed contours and a lifted ritual feel.",
    description: "A balanced dual-end facial roller with a luminous mineral-look finish, built for serum glide and gentle morning de-puffing routines.",
    bullets: ["Dual contour heads", "Naturally cool touch", "Quiet weighted handle", "Gift-ready storage sleeve"],
    color: "jade"
  },
  {
    id: "mira-cleanse",
    name: "Mira Cleanse",
    category: "Cleansing Brush",
    price: 89,
    compareAt: 118,
    subtitle: "A soft sonic cleansing brush that prepares skin for your full facial ritual.",
    description: "A premium cleansing brush with fine silicone touchpoints and gentle pulse settings for polished-feeling skin without harsh scrubbing.",
    bullets: ["Three pulse intensities", "Hygienic silicone surface", "Water-resistant design", "USB-C charging"],
    color: "ivory"
  }
];

export const mainProduct = products[0];
export const addOns = products.slice(1);
