# VERIFY — البركة بلاست (/v2)

Build: uncommitted working tree on `main` @ 0eddda8 (new files under `src/v2/`, `src/assets/v2/`, route in `src/App.tsx`)
· Preview: `npm run build && npx vite preview --port 4173` → http://127.0.0.1:4173/v2

## audit.mjs (production build) — round 1 build
| Size | Overflow | CTA fold | h1 lines | Fonts rendered | Sizes | Longest line | Contrast fails | Targets <24 | Obstructed | CLS |
|---|---|---|---|---|---|---|---|---|---|---|
| 360×740 m | no | ok 514/740 | 3 | Cairo / Cairo / Tajawal | 7 | ≤ 80 | 0 | 0 | 0 | 0.022 |
| 390×844 m | no | ok 578/844 | 3 | Cairo / Cairo / Tajawal | 7 | ≤ 80 | 0 | 0 | 0 | 0.025 |
| 768×1024 | no | ok 691/1024 | 2 | Cairo / Cairo / Tajawal | 8 | ≤ 80 | 0 | 0 | 0 | 0.018 |
| 1280×800 | no | ok 641/800 | 3 | Cairo / Cairo / Tajawal | 8 | ≤ 80 | 0 | 0 | 0 | 0.022 |
| 1440×900 | no | ok 662/900 | 2 | Cairo / Cairo / Tajawal | 8 | ≤ 80 | 0 | 0 | 0 | 0.026 |
Reduced motion: invisible text = none. Verdict: **PASS** (`docs/landing/audit-r1.json`).
Sizes: 5 text steps (13/15/17/20/26) + display steps (h1, h2, manifesto).

Fixes made to reach PASS (round 0 → 1): sticky header made `fixed` (text under a sticky header was sampled as
light background → false contrast fails); h1 restructured so it has direct text (fonts probe) and the mis-registered
second plate is a `::after` (not duplicated DOM text); manifesto statement is the section's `h2`; screen-reader step
list moved out of the photo panel; FAQ answer measure 34em; mobile h1 30 px (3 lines at 360).

## Integrity diff
- Text oracle: copy is DRAFT (new Arabic copy by request) — `docs/landing/text-after.txt` holds the v2 text; the old page
  `/` is unchanged (no edits to `src/components/*`, `src/constants/*`, `src/pages/*`).
- Logic: v2 contact form payload keys identical to `src/components/Contact.tsx` (diffed: identical), same validation,
  same `LEAD_FORM_ENDPOINT`; every quote CTA opens the existing `RequestQuoteModal` unchanged (product-scoped from the
  product list and the try-your-name section); wa.me / tel links identical (`+201009923040`); `/products/:id` links via
  react-router `Link`; the `open-quote-modal` window event still opens the modal on /v2. No analytics exist in the repo.

## Critic rounds
### Round 1
(pending)

## Paid API spend
Veo: none (not approved). Codex image generation: attempted 4 shots ×2, tool unavailable in this environment — $0.

## Remaining gaps, asset requests, next lever
See BRIEF.md §Missing assets (5 shots + real customer quotes + a real MOQ and lead time).
