# Genjis — Canvas Sneakers (Next.js)

This is the Genjis marketing site + storefront, converted from a single-file HTML build into a
Next.js (App Router) project so it's easier to keep building in VS Code.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.js          Root layout: fonts, <StoreProvider>
  page.js             Home page — assembles all sections
  globals.css         All styles (design tokens, layout, components)

components/
  PromoBar.jsx         Scrolling offers bar
  Header.jsx           Nav, account icon, cart icon, mobile menu
  Hero.jsx
  ProductCard.jsx      Single product card (size select, add to cart, view details)
  ProductGrid.jsx      "Pick your route" section — the three core builds
  CityEditions.jsx     "The India Line" — six city-themed special editions
  CraftSection.jsx
  FeaturesSection.jsx
  Testimonials.jsx
  Footer.jsx           Includes newsletter form
  Backdrop.jsx         Shared dim overlay behind cart/modals, handles Escape key
  CartDrawer.jsx        Cart contents, coupon code input, totals
  ProductModal.jsx      Product detail overlay (description, features, applicable coupons)
  CheckoutModal.jsx     3-step checkout: shipping → payment → review → confirmation
  AccountModal.jsx      Profile (view/edit) + Orders history tabs
  ShoeIllustration.jsx  The SVG sneaker illustration, recolored per product

context/
  StoreContext.jsx     All app state: cart, coupon, profile, orders, and which
                        overlay is open. This is the one file to read first if
                        you want to understand how data flows.

lib/
  products.js           Product catalog — core products plus CITY_EDITIONS
  coupons.js             Coupon codes and their rules
  format.js              ₹ currency formatting
  storage.js              localStorage read/write helpers (SSR-safe)
```

## How data is stored

There's no backend yet — cart, applied coupon, saved profile, and order history all live in the
browser's `localStorage`, scoped to whoever is using that browser. Keys used:

- `genjis_cart_v1`
- `genjis_coupon_v1`
- `genjis_profile_v1`
- `genjis_orders_v1`

This means orders and accounts are **per-device**, not shared across devices or verified in any
way. If you want real user accounts, real inventory, and real payments, you'll need a backend
(a database for products/orders/users, an auth system, and a payment gateway like Razorpay or
Stripe) — the current `StoreContext.jsx` is written so that swapping `localStorage` calls for API
calls should be a relatively contained change, since all reads/writes already go through one
place (`addToCart`, `placeOrder`, `setProfile`, etc.).

## Coupon codes (for testing)

- `WELCOME10` — 10% off the whole order
- `MONSOON10` — 10% off The Monsoon Slip only
- `FLAT200` — ₹200 off orders over ₹2,000
