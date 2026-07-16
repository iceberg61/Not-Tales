# Fashion. — E-commerce Store

Full-stack clothing store: Next.js frontend + Express/MongoDB backend, Flutterwave payments, Resend emails, Cloudinary uploads.

## Structure

```
fashion-store/
├── frontend/          Next.js (App Router) + Tailwind CSS
│   ├── app/           All 18 routes (home, shop, product, cart, checkout, orders, wishlist, auth, admin/*)
│   └── components/    Navbar, Footer, Hero, Collection, ProductGrid, CartDrawer, QuickView, CTA, WearIt, SearchModal, SEO
└── backend/           Express API
    └── src/
        ├── models/        User, Product, Order, Review, Wishlist, ContactMessage
        ├── controllers/   Route handlers (stubbed — see TODOs)
        ├── routes/        Wired up to controllers + auth middleware
        ├── middleware/     JWT auth (protect / adminOnly), error handler
        └── services/      Resend (email), Cloudinary (uploads), Flutterwave (payments)
```

## What's built (this pass — scaffold)

- Every page route exists and renders a labeled placeholder
- Every component exists as a stub
- Backend has real Mongoose schemas for all 6 models
- Every API route is wired to Express with the correct middleware (protect/adminOnly) already applied
- Controller functions exist with their exact signatures and a one-line TODO — logic comes in Phase 3
- Brand color tokens are in `tailwind.config.js` (cream / brown / ink / mustard), pulled from your reference screenshots

## What's NOT built yet (next passes)

- Phase 1: Real styled UI for Home page + Navbar/Footer/Hero/Collection/ProductGrid, matching your screenshots exactly
- Phase 2: Remaining pages styled and wired to mock data (Shop, Product Detail, Cart, Checkout, Auth, Admin)
- Phase 3: Backend logic — auth (bcrypt/JWT), product CRUD/filtering, order creation & stock deduction, reviews, wishlist
- Phase 4: Integrations wired for real — Flutterwave checkout + webhook, Resend email templates, Cloudinary upload flow
- Deploy: Vercel (frontend), Render (backend), MongoDB Atlas, Hostinger domain/DNS

## Local setup

**Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local   
npm run dev
```

**Backend**
```bash
cd backend
npm install
cp .env.example .env            
npm run dev
```

Backend runs on `http://localhost:5000`, frontend on `http://localhost:3000`.
