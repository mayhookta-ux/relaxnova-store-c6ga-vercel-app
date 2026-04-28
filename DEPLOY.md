# Deploy to Vercel

This is a clean **React + Vite + TypeScript** premium e-commerce store (RelaxNova), ready for instant Vercel deployment.

## Project structure

```
.
├── public/              # Static assets served at root
├── src/                 # React source
│   ├── assets/          # Imported images
│   ├── components/      # UI + feature components
│   ├── context/         # Cart, Currency providers
│   ├── data/            # Product catalog
│   ├── pages/           # Route pages (Home, Shop, Product, Checkout, FAQ, Policies, Contact, About, Track, OrderConfirmed, NotFound)
│   ├── App.tsx          # Routes
│   └── main.tsx         # Entry point
├── index.html           # Vite entry
├── package.json
├── vite.config.ts       # Output: dist
├── vercel.json          # SPA rewrites + build config
└── tailwind.config.ts
```

## Scripts

- `npm install` – install dependencies
- `npm run dev` – local dev server at http://localhost:8080
- `npm run build` – production build to `dist/`
- `npm run preview` – preview the production build

## Deploy on Vercel (3 ways)

### 1. GitHub → Vercel (recommended)
1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com/new → Import the repo.
3. Vercel auto-detects **Vite**. Settings (already in `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**. Done.

### 2. Vercel CLI
```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

### 3. Drag & drop
Run `npm run build` locally, then drag the resulting `dist/` folder into https://vercel.com/new.

## SPA routing

`vercel.json` rewrites all unknown paths to `/index.html` so React Router deep links (e.g. `/product/smart-posture-corrector`, `/faq`, `/policies`) work on refresh. A custom **404 page** is rendered by `src/pages/NotFound.tsx` for unmatched routes.

## Routes included

- `/` — Home
- `/shop` — Shop
- `/product/:slug` — Product detail
- `/checkout` — Checkout
- `/order-confirmed` — Order confirmation
- `/track` — Order tracking
- `/faq` — FAQ
- `/contact` — Contact
- `/about` — About
- `/privacy`, `/terms`, `/refund`, `/shipping` — Policies
- `*` — 404 NotFound

## Editing your business info

Update contact details in:
- `src/components/Footer.tsx` (email, social links)
- `src/pages/Contact.tsx` (phone, address, email)
- `src/pages/Policies.tsx` (legal entity, address)
- `index.html` (meta title/description, canonical URL)

## Environment

No environment variables required — the store runs fully client-side with localStorage cart persistence. To add a backend (payments, orders, auth), connect Lovable Cloud or your own API.
