# Mobile UX Enhancement Strategy + Bottom Dock

## Goals
Deliver a measurably better mobile experience for Al Baraka Plast: faster taps, easier navigation, quicker load, cleaner accessibility — and add a persistent **bottom dock** (mobile-only) for one-thumb access to the most-used actions.

---

## Part 1 — Mobile UX Strategy (recommendations)

### 1. Touch target optimization
- Enforce minimum **44×44px** tap targets on all interactive elements (buttons, nav links, icon buttons, FloatingButtons, breadcrumb links).
- Add ≥8px spacing between adjacent tap targets in `Navbar`, `Footer`, `ProductCard` action rows.
- Replace shadcn `size="icon"` (36×36) buttons on mobile with `min-h-11 min-w-11`.
- Give every icon-only button an `aria-label` in Arabic.

### 2. Navigation patterns
- Add a **fixed bottom dock** on mobile (`md:hidden`) with 5 primary destinations:
  الرئيسية · المنتجات · عرض سعر · واتساب · اتصل
- Convert current mobile hamburger drawer into a full-height sheet with large row targets (56px) and section grouping.
- Sticky "Request Quote" CTA hides when the dock is visible to avoid overlap.
- Add `scroll-margin-top` on section anchors so in-page nav doesn't hide under the navbar.
- Swipe-friendly product gallery (already present) — add pagination dots and swipe hints on first visit.

### 3. Loading performance (mobile-first)
- Preload the LCP hero image with `<link rel="preload" as="image" fetchpriority="high">` and mark it `loading="eager"`; lazy-load everything else (`loading="lazy" decoding="async"`).
- Convert product images to WebP/AVIF via `vite-imagetools` (or pre-compress in `public/images/`); serve responsive `srcset`.
- Route-split heavy pages (`ProductDetails`, `Clients`) with `React.lazy` + Suspense skeletons.
- Defer non-critical sections (Testimonials, FAQ) with IntersectionObserver mount.
- Keep the current SW as network-first for HTML; precache only fonts + logo.

### 4. Accessibility (mobile)
- Use `h-dvh` instead of `h-screen` for full-height layouts (fixes iOS URL bar jump).
- Ensure text uses `text-secondary-ink` (not raw `text-secondary`) for AA contrast on small text — audit `ValueProposition`, `Footer`, product meta.
- Add visible `focus-visible` ring on all interactive elements; never remove outlines without a replacement.
- Single `<main>` per route; verify heading order (one `h1` per page, no skipped levels).
- Respect `prefers-reduced-motion` — disable hero slider auto-advance and scroll animations when set.
- Form inputs: use `inputMode="numeric"` and `autoComplete="tel"` on phone; `inputMode="numeric"` on quantity; labels always associated.

### 5. Responsive design principles
- Mobile-first Tailwind breakpoints; audit and remove desktop-only assumptions in `Hero` bento (stack to 1 column cleanly on `<md`).
- Fluid typography with `clamp()` for headings; body ≥16px to prevent iOS zoom-on-focus.
- Container padding `px-4` on mobile, `px-6` tablet, `px-8` desktop.
- Safe-area insets: `pb-[env(safe-area-inset-bottom)]` on the dock; `pt-[env(safe-area-inset-top)]` on sticky navbar.
- Test at 360×640, 390×844, 414×896, 768×1024.

### 6. UX metrics to track
| Metric | Target | Tool |
|---|---|---|
| LCP (mobile) | < 2.5s | Lighthouse / web-vitals |
| INP | < 200ms | web-vitals |
| CLS | < 0.1 | web-vitals |
| TTI (mobile 4G) | < 3.8s | Lighthouse |
| Quote-form completion rate | +20% | SheetDB submissions / sessions |
| Product → Quote conversion | Track baseline | Custom event |
| Dock CTA tap-through rate | ≥ 15% of mobile sessions | Custom event |
| Mobile bounce rate | -15% | Analytics |
| Accessibility score | ≥ 95 | Lighthouse a11y |
| Tap-target failures | 0 | Lighthouse |

---

## Part 2 — Build the mobile bottom dock

### Scope
A new `MobileDock` component visible only on mobile (`md:hidden`), fixed to the bottom, with 5 items and safe-area padding.

### Items (RTL order)
1. **الرئيسية** — Home icon → scroll to top / `/`
2. **المنتجات** — Package icon → scroll to `#products`
3. **عرض سعر** — FileText icon (primary highlighted pill) → opens `QuoteRequestModal` via `useProductQuote`
4. **واتساب** — MessageCircle icon → `wa.me/+201009923040`
5. **اتصل** — Phone icon → `tel:+201009923040`

### Design
- Height 64px + safe-area padding.
- Frosted white background (`bg-white/95 backdrop-blur border-t border-border`), navy icons, active item in `text-primary` with a top 2px accent bar.
- Middle "عرض سعر" item elevated as a filled navy circle (56px) floating slightly above the bar for prominence.
- `min-h-11 min-w-11` targets, `aria-label` on each, `role="navigation" aria-label="التنقل السفلي"`.

### Files
- **Create** `src/components/MobileDock.tsx` — the component (uses `useIsMobile`, `useLocation`, `useProductQuote` global trigger or a URL-based open).
- **Edit** `src/pages/Index.tsx` — mount `<MobileDock />` at the end.
- **Edit** `src/pages/ProductDetails.tsx` — mount `<MobileDock />` so it persists across routes.
- **Edit** `src/components/FloatingButtons.tsx` — hide on mobile (`hidden md:flex`) to avoid overlap with dock; keep desktop behavior.
- **Edit** `src/index.css` — add utility `.pb-safe { padding-bottom: env(safe-area-inset-bottom); }` and a body class `has-mobile-dock` adding `padding-bottom: 80px` on mobile so content isn't hidden behind the dock.

### Technical notes
- No new dependencies. Icons from `lucide-react` (already installed).
- The "عرض سعر" dock button opens the existing `QuoteRequestModal` — cleanest path: expose a lightweight zustand-free event (`window.dispatchEvent(new CustomEvent('open-quote-modal'))`) that `Products.tsx`/`useProductQuote` listens for. Or lift the modal into `App.tsx` behind a context. Will use the CustomEvent approach — smallest diff, no context refactor.
- RTL: dock is `flex-row` (naturally RTL-flipped by `dir="rtl"` on `<html>`); verify visually.
- Respect `prefers-reduced-motion` — no bounce animation on the elevated CTA.

### Out of scope (for this build)
- Image format conversion pipeline (recommended, but larger change — separate task).
- Route code-splitting refactor — separate task.
- Full web-vitals telemetry wiring — separate task.

Ship the dock now; the strategy sections above become follow-up tasks the user can approve one by one.
