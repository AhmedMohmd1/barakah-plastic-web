# Redesign: Industrial Precision Grid (Bento)

Locked from your picks — used as hard constraints across every change:
- **Palette:** navy `#0f1b3d`, mid-navy `#1e3a5f`, accent blue `#3b6fa0`, near-white `#e8edf3`. Orange is fully removed as a CTA/accent color.
- **Fonts:** Sora (headings) + Manrope (body English). Cairo/Tajawal remain the Arabic faces so Arabic script keeps its correct rhythm.
- **Layout:** Bento hero (8/4 grid: navy content card + image/stats sidecard), 3 white feature cards with corner accents, client-proof strip.

## What changes

### 1. Design tokens (`src/index.css`)
Remap the CSS variables verbatim to the prototype hex values (converted to HSL). `--secondary` is repurposed from orange to the accent blue `#3b6fa0` so every existing `bg-secondary` / `text-secondary` reference across the codebase instantly picks up the new accent — no component-by-component color churn.

- `--background` → `#e8edf3`
- `--primary` → `#0f1b3d`, `--primary-light` → `#1e3a5f`
- `--secondary` → `#3b6fa0` (was orange `#F77F00`)
- `--secondary-ink` → mid-navy `#1e3a5f` (eyebrow text on light)
- `--ring`, focus colors realigned to the new blue

Add `.font-sora` + `.font-manrope` utilities for Latin-script accents (stats numbers, badges). Arabic text keeps `font-cairo` / `font-tajawal`.

### 2. Fonts (`index.html`, `tailwind.config.ts`)
- Add Sora + Manrope to the Google Fonts stylesheet link.
- Update `<meta name="theme-color">` to `#0f1b3d`.
- Add `sora` + `manrope` to `theme.extend.fontFamily`.

### 3. Navbar (`src/components/Navbar.tsx`)
Switch from full-width white bar to a floating **white pill navbar** matching the prototype:
- `rounded-2xl` card, `bg-white/90 backdrop-blur-md`, `shadow-sm`, sitting on top with side padding.
- Logo block: existing `/logo.png` on the right, keep as is.
- Nav links: `text-primary-light` semibold, hover → accent blue.
- "اطلب تسعيرة" button: `bg-secondary` (now blue), `rounded-xl`, keeps existing `RequestQuoteModal` flow. No behavior change.
- Mobile drawer keeps its current logic; only surface color/radius updated.

### 4. Hero (`src/components/Hero.tsx`)
Rebuild the composition to the chosen bento (RTL grid, 8/4 split on desktop, stacks on mobile):

```text
+---------------------------+---------------+
|                           |               |
|  Navy content card        |  Factory     |
|  (col-span-8)             |  image card  |
|                           |  (with       |
|  - eyebrow badge          |   caption)   |
|  - h1 (Sora)              |               |
|    highlight last line    +-------+-------+
|  - subtext (Manrope-      | 12+   | 5+    |
|    weighted Tajawal)      | خبرة  | خطوط  |
|  - CTAs (blue + ghost)    +-------+-------+
+---------------------------+
```

- Preserve the existing headline "صناعة أكياس بلاستيكية عالية الجودة" and subhead.
- Preserve the two CTAs and their existing scroll-to-section behavior (`#products`, `#contact`).
- Keep the image slider — but scope it **inside** the sidecard, not full-bleed. Same `HERO_IMAGES` array, same 4s auto-advance interval, same crossfade.
- Add the blueprint grid overlay (`linear-gradient` 40px squares at 10% opacity) to the navy card.
- Stats become the 2-card mini-grid inside the sidecard: "12+ سنة خبرة" (blue number) and "5+ خطوط إنتاج" (navy number). The "500+ عميل" moves to the client-proof strip below the value cards.
- Section wrapper becomes light (`bg-background`) with padded max-w-7xl inner grid.

### 5. Value proposition (`src/components/ValueProposition.tsx`)
Replace overlapping-cards look with the flat white bento row from the prototype:
- Drop `-mt-16` overlap. Section sits below the hero with normal `gap-6`.
- Each card: `bg-card` white, `rounded-3xl` (`1.5rem`), `border-primary/5`, corner quarter-circle wash in `bg-secondary/5` that intensifies on hover, `hover:border-secondary` transition.
- Keep the three existing items (`أحجام مخصصة`, `متانة عالية`, `تسليم سريع`) and their icons (`Ruler`, `Shield`, `Truck`).
- Add the hidden "learn more" chevron affordance that fades in on hover (matches prototype).

### 6. Client-proof strip (new, in `src/pages/Index.tsx`)
Small inline section between `ValueProposition` and `About`:
- Grayscale wordmarks (`INDUSTRIAL_CO`, `GLOBAL_LOGISTICS`, `PRIME_PACK`, `ECO_STORE`) in Sora black.
- One stat cluster: `500+` عملاء حول العالم.
- No new file needed; small enough to inline. If it grows, extract to `src/components/ClientProof.tsx`.

## What deliberately does NOT change

- **Product data / catalog:** `src/constants/products.ts`, product IDs, images, product cards, list/grid toggle, quote modal — all untouched.
- **Routing:** `App.tsx`, `ProductDetails.tsx`, breadcrumbs — untouched.
- **Form endpoints:** SheetDB URLs in `Contact.tsx` and `products/QuoteRequestModal.tsx` — untouched.
- **Products / Features / Testimonials / FAQ / Contact / Footer sections:** no structural changes. Because they use the semantic tokens (`bg-primary`, `text-secondary`, etc.), they automatically inherit the new palette. No component rewrites there.
- **Business logic, hooks, utils, service worker, preloader** — untouched.

## Verification

1. Build passes (auto-run by harness).
2. Playwright screenshot of `/` at 1440×900 to confirm the bento hero matches the chosen direction and RTL flow is intact.
3. Element screenshot of Navbar (pill radius + white background) and the value-card corner accent.
4. Spot-check `Products.tsx` and `Contact.tsx` still render — the new `--secondary` (blue) should read as accent, not orange.

## Technical notes

- Palette conversion (verified with HSL):
  `#0f1b3d` → `hsl(224 61% 15%)`, `#1e3a5f` → `hsl(213 52% 25%)`, `#3b6fa0` → `hsl(210 46% 43%)`, `#e8edf3` → `hsl(213 27% 93%)`.
- The existing `dot-pattern-overlay` utility gets a companion `blueprint-grid-overlay` in `index.css` (linear-gradient lines, 40px, `--secondary` at low alpha) — reused by hero + any future dark panel.
- `HERO_IMAGES` scope-reduction (only mounted slides) is preserved; only the container/positioning around it changes.
