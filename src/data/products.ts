import postureImg from "@/assets/product-posture.jpg";
import neckImg from "@/assets/product-neck.jpg";
import blenderImg from "@/assets/product-blender.jpg";
import ledImg from "@/assets/product-led.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  comparePrice: number;
  image: string;
  category: string;
  badge?: string;
  bestseller?: boolean;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string[];
  features: { title: string; body: string }[];
  bullets: string[];
  inTheBox: string[];
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: "smart-posture",
    slug: "smart-posture-corrector",
    name: "Aura Posture",
    tagline: "Stand taller in 14 days. Effortlessly.",
    price: 89,
    comparePrice: 149,
    image: postureImg,
    category: "Posture",
    badge: "Best Seller",
    bestseller: true,
    rating: 4.9,
    reviews: 2847,
    shortDescription:
      "An almost invisible smart device that gently vibrates the moment you slouch — retraining your posture in just 2 weeks.",
    description: [
      "The Aura Posture is the result of 3 years of biomechanics research, distilled into a 28-gram device you'll forget you're wearing.",
      "Calibrated to your body in 30 seconds, it uses a 9-axis motion sensor to detect the exact moment your shoulders begin to round forward — then delivers a whisper-soft vibration as a private reminder.",
      "No bulky braces. No restrictive straps. Just real, lasting change you can see in the mirror within two weeks.",
    ],
    features: [
      { title: "9-Axis Smart Sensor", body: "Detects forward head, rounded shoulders, and slumped lower back in real time." },
      { title: "14-Day Memory Training", body: "Clinically inspired protocol that retrains the deep postural muscles." },
      { title: "30-Day Battery Life", body: "Charge it monthly. Forget it daily." },
      { title: "Whisper Haptic", body: "A discreet pulse only you can feel — even through cashmere." },
    ],
    bullets: [
      "Visible improvement in 14 days — guaranteed",
      "Weighs less than two coins (28g)",
      "Hypoallergenic medical-grade adhesive pads",
      "Works under any clothing, invisible to others",
      "FSA / HSA eligible",
    ],
    inTheBox: ["Aura Posture device", "10 hypoallergenic pads", "Magnetic charging dock", "Velvet travel pouch", "Quick-start guide"],
    specs: [
      { label: "Weight", value: "28 g" },
      { label: "Battery", value: "30 days / charge" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    id: "neck-relief",
    slug: "neck-relief-massager",
    name: "Cervi Pro",
    tagline: "Melt away neck tension in 15 minutes.",
    price: 129,
    comparePrice: 199,
    image: neckImg,
    category: "Recovery",
    badge: "New",
    bestseller: true,
    rating: 4.8,
    reviews: 1934,
    shortDescription:
      "TENS pulse therapy + warming heat + deep kneading nodes — clinical-grade neck relief that fits in your bag.",
    description: [
      "Cervi Pro combines three therapeutic modalities chiropractors charge $120 a session for — into one elegant device you wear like premium headphones.",
      "Six intelligent modes target the cervical spine with electrical muscle stimulation, far-infrared heat, and rotating shiatsu nodes.",
      "Most users report measurable relief from chronic neck pain within the first session.",
    ],
    features: [
      { title: "TENS Pulse Therapy", body: "Six clinically-tuned waveforms loosen deep muscle knots." },
      { title: "42°C Warming Heat", body: "Far-infrared heat penetrates 3x deeper than surface warmth." },
      { title: "15-Min Auto Cycle", body: "A complete therapeutic session, on autopilot." },
      { title: "Travel Foldable", body: "Folds flat into the included leather case." },
    ],
    bullets: [
      "Replaces $120 chiropractor sessions",
      "15-minute hands-free relief",
      "USB-C, 8-hour battery",
      "Six intensity levels",
      "FDA-registered TENS technology",
    ],
    inTheBox: ["Cervi Pro device", "Leather travel case", "USB-C cable", "Remote control", "User guide"],
    specs: [
      { label: "Modes", value: "6" },
      { label: "Heat", value: "Up to 42 °C" },
      { label: "Battery", value: "~8 hours" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    id: "mini-blender",
    slug: "portable-mini-blender",
    name: "Lume Blend",
    tagline: "Your morning ritual, anywhere.",
    price: 79,
    comparePrice: 119,
    image: blenderImg,
    category: "Nutrition",
    rating: 4.7,
    reviews: 1208,
    shortDescription:
      "A 24,000-RPM cordless blender that fits in your bag and pulverizes frozen fruit in 40 seconds.",
    description: [
      "Lume Blend brings the smoothie ritual out of the kitchen and into your morning commute, hotel room, or office.",
      "Six titanium-coated blades spin at 24,000 RPM — enough to crush ice, frozen berries, and fibrous greens into a velvet-smooth blend in under a minute.",
      "Charge once. Blend twenty times.",
    ],
    features: [
      { title: "24,000 RPM Motor", body: "Pulverizes ice and frozen fruit effortlessly." },
      { title: "20 Blends Per Charge", body: "USB-C charging, all-day power." },
      { title: "Self-Cleaning Mode", body: "Drop in water, press once, done." },
      { title: "BPA-Free Tritan", body: "Doubles as your travel cup." },
    ],
    bullets: ["Pulverizes frozen fruit in 40 seconds", "20 blends per single charge", "BPA-free, dishwasher safe", "Self-cleaning mode", "Cordless USB-C"],
    inTheBox: ["Lume Blend bottle", "Spout lid", "USB-C cable", "Cleaning brush", "Recipe guide"],
    specs: [
      { label: "Capacity", value: "500 ml" },
      { label: "Power", value: "24,000 RPM" },
      { label: "Battery", value: "~20 blends" },
      { label: "Warranty", value: "1 year" },
    ],
  },
  {
    id: "led-skincare",
    slug: "led-skincare-mask",
    name: "Lumière LED",
    tagline: "Spa-grade radiance in 10 minutes.",
    price: 249,
    comparePrice: 399,
    image: ledImg,
    category: "Skincare",
    badge: "Editor's Choice",
    rating: 4.9,
    reviews: 962,
    shortDescription:
      "150 medical-grade LEDs across 7 wavelengths — the same red and near-infrared light therapy used by leading dermatologists.",
    description: [
      "Lumière LED brings clinical light therapy out of the dermatologist's office and into your nightly ritual.",
      "Seven precisely calibrated wavelengths — from collagen-boosting red to acne-clearing blue — work in 10-minute sessions to visibly transform your skin.",
      "Independent testing showed an average 32% reduction in fine lines after 12 weeks of use.",
    ],
    features: [
      { title: "150 Medical-Grade LEDs", body: "Even, full-face coverage with no hot spots." },
      { title: "7 Therapeutic Wavelengths", body: "Red, near-infrared, blue, and four targeted modes." },
      { title: "10-Minute Sessions", body: "Hands-free, comfortable silicone fit." },
      { title: "FDA-Cleared Technology", body: "Same wavelengths used in dermatology clinics." },
    ],
    bullets: ["Visible firming in 4 weeks", "150 medical-grade LEDs", "7 light therapy modes", "Silicone, latex-free fit", "Hands-free 10-min sessions"],
    inTheBox: ["Lumière LED mask", "Silicone strap", "Charging cable", "Eye guards", "Velvet pouch"],
    specs: [
      { label: "LEDs", value: "150" },
      { label: "Modes", value: "7" },
      { label: "Session", value: "10 min" },
      { label: "Warranty", value: "2 years" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const bundles = [
  {
    id: "posture-recovery",
    name: "The Posture & Recovery Set",
    products: ["smart-posture", "neck-relief"],
    price: 189,
    comparePrice: 348,
    save: 159,
  },
  {
    id: "ritual",
    name: "The Daily Ritual",
    products: ["smart-posture", "led-skincare"],
    price: 299,
    comparePrice: 548,
    save: 249,
  },
];
