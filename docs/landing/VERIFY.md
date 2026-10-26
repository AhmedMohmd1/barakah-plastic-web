# VERIFY — البركة بلاست (/v2)

Build: working tree on `main` (new files under `src/v2/`, `src/assets/v2/`, route in `src/App.tsx`). Nothing committed by the builder.
· Preview: `npm run build && npx vite preview --port 4173` → http://127.0.0.1:4173/v2

## audit.mjs — FINAL build (`docs/landing/audit-final.json`)
| Size | Overflow | CTA fold | h1 lines | Fonts rendered | Contrast fails | Targets <24 | CLS |
|---|---|---|---|---|---|---|---|
| 360×740 m | no | ok 545/740 | 3 | Cairo / Tajawal | 0 | 0 | 0.019 |
| 390×844 m | no | ok 562/844 | 3 | Cairo / Tajawal | 0 | 0 | 0.022 |
| 768×1024 | no | ok 727/1024 | 2 | Cairo / Tajawal | 0 | 0 | 0.038 |
| 1280×800 | no | ok 623/800 | 2 | Cairo / Tajawal | 0 | 0 | 0.019 |
| 1440×900 | no | ok 685/900 | 2 | Cairo / Tajawal | 0 | 0 | 0.019 |
Reduced motion: no invisible text. 0 console errors. Verdict: **PASS**. The remaining layout shift is the Cairo font swap at load (h1 rewraps).
Last-fix checks on this build: FAQ click scrolls the page 0 px (was ~470 px on desktop); toy at 390×844 with the input focused keeps bag (68–307) and input (440–492) on screen.

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
Fixes and rejections per round: `critics/r1/SUMMARY.md`, `critics/r2/SUMMARY.md`; round 3 reports in `critics/r3/` (A, B, C, D).

| Round | A hero / page | B coherence / type / composition | C integrity & a11y | D dim 11 / dim 12 |
|---|---|---|---|---|
| 1 | 6.5 / 6.0 | 6.5 / 6.5 / 6.5 | 1 BROKEN | 5 / 5 |
| 2 | 7.5 / 6.9 | 7.5 / 6.5 / 7.0 | PASS, 0 BROKEN | 6.5 / 6 |
| 3 | **8.5 / 7.8** (8.1 without asset-blocked dim 7) | **8.5 / 8.0 / 8.0** | PASS; 0 SheetDB requests | **7.8 / 7.0** |

Ship bar: hero ≥ 8.5 ✅ · page ≥ 8 ✅ only with dim 7 excluded (7.8 with it — proof & assets need the owner's material) ·
dim 11 ≥ 8 ❌ (7.8) · no BROKEN ✅. Three rounds used (the maximum). Fixes made after the round-3 reports (A: W1/W2/P1/P6/P7;
B: W1/W4/W5; C: W1/W2/B1; D: F11–F14, F16–F20) were verified by the builder only, not re-judged by critics.

## Paid API spend
Veo: none (not approved). Codex image generation: attempted 4 shots ×2, tool unavailable in this environment — $0. Total spend: $0.

## Remaining gaps, asset requests, next lever
See BRIEF.md §Missing assets (5 shots + real customer quotes + a real MOQ and lead time). Still open after round 3:
- dim 7 (proof): only one factory photo (reused in hero, factory, share image) — needs press / cutter / carton / owner shots; no MOQ or lead time.
- copy is a DRAFT awaiting the owner (FAQ register, `ziplock` in product data lives in shared `src/constants/products.ts`).
- dim 11 lever (D): hero climax is ~1 % of the screen (F15); bag is 35–41 % of the first screen depending on viewport.
- font-swap layout shift (Cairo): fix needs `index.html` (shared with `/`).
- not tested on real devices: Web Share sheet, soft keyboard with the toy, over-swipe history-back on the rail.
- Lovable merge 8232b32 changed `/` (testimonials → FactoryProof, nav/footer label): owner to confirm.
