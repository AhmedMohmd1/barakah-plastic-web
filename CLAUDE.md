# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arabic-language marketing/catalog site for البركة بلاست (Baraka Plast), a plastic bag manufacturer. Single-page landing plus product detail pages. Originally generated with Lovable (see `lovable-tagger` plugin and the `gptengineer.js` script in `index.html` — that script tag has a comment saying not to remove it).

The entire UI is Arabic and the document is RTL (`<html lang="ar" dir="rtl">` in `index.html`). Keep new UI text in Arabic and layout RTL-aware. Fonts are Cairo/Tajawal (Tailwind `font-cairo` / `font-tajawal`).

## Commands

```bash
npm run dev        # Vite dev server on port 8080
npm run build      # production build (terser, drops console/debugger)
npm run build:dev  # build in development mode
npm run lint       # eslint .
npm run preview    # preview built dist
npm run deploy     # publish dist/ to GitHub Pages (runs build via predeploy)
```

There are no tests and no test runner configured.

## Architecture

Vite + React 18 + TypeScript + Tailwind + shadcn/ui (Radix primitives in `src/components/ui/`). Path alias `@` → `src/`.

**Routing** ([src/App.tsx](src/App.tsx)): three routes — `/` ([src/pages/Index.tsx](src/pages/Index.tsx)), `/products/:productId` ([src/pages/ProductDetails.tsx](src/pages/ProductDetails.tsx)), and `*` NotFound. App also wraps everything in ErrorBoundary + React Query provider, registers a service worker from `public/sw.js`, and calls `preloadCriticalResources()` on mount.

**Landing page** is a composition of section components rendered in order in `Index.tsx`: Navbar, Hero, ValueProposition, About, Products, Features, Testimonials, Faq, Contact, Footer, FloatingButtons. Dark mode is a `dark` class on `<html>` persisted to `localStorage('theme')`, toggled in Index/Navbar (not next-themes).

**Product data is static** — no backend. The catalog lives in `PRODUCTS` in [src/constants/products.ts](src/constants/products.ts) (Arabic names, descriptions, specs, image paths). Types in [src/types/product.ts](src/types/product.ts); `src/components/products/types.ts` just re-exports them for backward compatibility. Product images live in `public/images/` (some filenames are Arabic). `ProductDetails` looks up products by numeric id via `getProductById` in [src/utils/productUtils.ts](src/utils/productUtils.ts).

**Form submissions go to SheetDB** (Google Sheets REST bridge), each form with its own hardcoded endpoint:
- Contact form: `https://sheetdb.io/api/v1/az68rhltg636u` in [src/components/Contact.tsx](src/components/Contact.tsx)
- Product quote modal: `https://sheetdb.io/api/v1/8rd4nognbuv4g` in [src/components/products/QuoteRequestModal.tsx](src/components/products/QuoteRequestModal.tsx)

WhatsApp contact goes through `wa.me/+201009923040` ([src/components/FloatingButtons.tsx](src/components/FloatingButtons.tsx)).

**Quote modal duplication**: several quote-modal components exist (`RequestQuoteModal`, `BilingualRequestQuoteModal`, `ProductDetailModal`, `products/QuoteRequestModal`). The live flow used by `Products.tsx` is `products/QuoteRequestModal` with modal state from [src/hooks/useProductQuote.ts](src/hooks/useProductQuote.ts) — note its `submitQuoteRequest` is a stub (console.log + alert); the real POST happens inside `QuoteRequestModal` itself.

**Styling**: the brand palette is the "Industrial Precision Grid" navy/blue system defined as HSL CSS variables in `src/index.css` — `primary` #0f1b3d (navy), `primary-light` #1e3a5f, `secondary` #3b6fa0 (blue accent, replaces the original orange), and `secondary-ink` #1e3a5f (the AA-safe blue for small text on light backgrounds). `--accent*` is a legacy alias that now points at the same blue (the original "gold" accent was retired). Use `text-secondary-ink` for text under 18px — raw `text-secondary` (#3b6fa0) only clears WCAG AA contrast for large text, icons, and borders. Tailwind's color tokens in [tailwind.config.ts](tailwind.config.ts) map to these variables. Shared section classes like `section-padding`, `container-custom`, `heading-2`, and scroll animations (`scroll-animate` + `useScrollAnimation` hook) are used across all landing sections.

**Build config** ([vite.config.ts](vite.config.ts)): dev server on port 8080, `lovable-tagger` runs only in development, manual chunk splitting (vendor/router/ui/icons/utils), es2015 target.

## Deployment

GitHub Pages via `npm run deploy` (`gh-pages -d dist`, `homepage` set in package.json). `bun.lockb` exists from Lovable, but scripts/README assume npm.
