# Critic B: craft and system (round 3, final)

Page: http://127.0.0.1:4173/v2, the production build in `dist/` from 02:10. That build is newer than every file in `src/v2/`, so the line numbers below match what is served. Copy status: DRAFT.

**Evidence.**
- Screenshots are in `docs/landing/critics/r3/B-shots/`:
  - `top-*.png`: the first screen at 360, 390, 768, 1280, 1366 and 1440.
  - Section captures at 1440 and 390.
  - `zoom-*.png`: 2× crops.
  - `share.png`: the PNG that «احفظ صورة الشنطة» produces.
- Audit JSON:
  - `B-audit.json`: clean run.
  - `B-audit-run3.json`: a second clean run.
  - `B-audit-run1-contended.json`: the first run, made while the other critics' browsers were running.
- The CDP probe ran at 8 sizes (scratchpad `critB3-probe.mjs` / `critB3-probe.out`). It measured:
  - rendered fonts (`CSS.getPlatformFontsForNode`) and every visible type size;
  - hero geometry and manifesto centring;
  - where the ply ends relative to the slot on every bag;
  - widows and lines that start with punctuation;
  - radii, shadows and filters;
  - the close-stack print boxes and the Who bags.
- Every browser run blocked `*sheetdb.io*`. No form was submitted.

## Measured baseline
### audit.mjs: PASS at all 5 sizes (clean runs)

| Size | CTA bottom / fold | CLS run 2 | CLS run 3 |
|---|---|---|---|
| 360×740 | 545 / 740 | 0.018 | 0.023 |
| 390×844 | 562–567 / 844 | 0.022 | 0.025 |
| 768×1024 | 727 / 1024 | 0.042 | 0.029 |
| 1280×800 | 623 / 800 | 0.015 | 0.015 |
| 1440×900 | 685 / 900 | 0.019 | 0.019 |

All five sizes in both clean runs:
- 0 contrast fails, 0 targets under 24 px, no overflow and no errors.
- 7 distinct font sizes.
- Reduced motion leaves no invisible text.

### CLS spread at 360

| Run | Conditions | CLS |
|---|---|---|
| Full audit, run 1 | Contended: the other critics' browsers were running at the same time | **0.1004 (FAIL)** |
| Audit, 360 + 768 only | Own temp dir | 0.019 |
| Layout-shift probe | — | 0.018 |
| Full audit, run 2 | Clean | 0.018 |
| Full audit, run 3 | Clean | 0.023 |

- The coordinator's own run gave 0.054.
- So the 0.1004 does not reproduce: 4 clean runs range from 0.018 to 0.023.
- One more contended data point: a 768 run in that same window read **0.83**, against 0.025–0.042 in every clean run. That is a load artefact.

**What shifts (probe, `critB3-cls.mjs`).** One entry at load, scrollY 0.
- 360: 0.0177.
  - `div.v2-h1clip` goes from 248×88 to 296×130: 2 lines in the fallback face become 3 in Cairo.
  - `p.v2-hero__sub`, `div.v2-hero__ctas` and `span.v2-opener` are each pushed 21 px.
- 768: 0.022–0.024.
  - `div.v2-h1clip` goes from 447 to 626–639 px wide.
  - The CTA row reflows (376 → 398 px wide).

This is the round-2 N7 Cairo font swap (deferred). It is under the gate. On a slow network it lands later, but the size of the shift stays the same.

### Fonts actually rendered
Measured at all 8 sizes:
- **Cairo**: h1, the accent line, manifesto, h2, Who h3, «براندك», product h3, FAQ summaries, register numerals, toy name and close prints.
- **Tajawal / Tajawal Medium**: sub, fine print, buttons, inputs, openers, contact values and the footer slug.
- No system faces at steady state.

### Type steps rendered

| Width | Steps (px) | h1 |
|---|---|---|
| 360 / 390 | 13 · 15 · 17 · 20 · 24 · 26 | **30** |
| 768 | 13 · 15 · 17 · 20 · 26 · 34 | **54** |
| 1100×700 | 13 · 15 · 17 · 20 · 26 · 34 | **37** |
| 1280×800 | 13 · 15 · 17 · 20 · 26 · 34 | **43** |
| 1366×768 | 13 · 15 · 17 · 20 · 26 · 34 | **41** |
| 1440×900 | 13 · 15 · 17 · 20 · 26 · 40 | **51** |
| 1920×1080 | 13 · 15 · 17 · 20 · 26 · 40 | **56** |

Every size is a whole pixel. The toy name (62.7 / 68 / 76) is a fit-to-bag depiction.

### Hero bag

| Size | Bag (px) | Aspect | Share of viewport |
|---|---|---|---|
| 1280×800 | 590×688 | 0.86 | 40% |
| 1366×768 | 562×656 | 0.86 | 35% |
| 1440×900 | 675×788 | 0.86 | 41% |
| 1920×1080 | 830×968 | 0.86 | — |
| 768 | 720×864 | 0.83 | — |
| 390 | 358×639 | **0.56** | — |
| 360 | 328×586 | **0.56** | — |

Clearance from the patch to the opener: 36 / 32 px on phones and 24–180 px on desktop. In round 2 it was 4 px at 360.

## Round-2 findings: status

| # | Round-2 finding | Status | Evidence |
|---|---|---|---|
| N1 | h1 smaller than the h2 at 1280×800 | **FIXED** | h1 / largest other type: 1280×800 **43/34 (1.26×)**, 1366×768 **41/34 (1.21×)**, 1440×900 **51/40 (1.27×)**, 1920 56/40 (1.40×), 768 54/34 (1.59×), phones 30/26 (1.15×). The manifesto now shares the h2 step on desktop. Edge case: 1100×700 is 37/34 (1.09×), see P1. `top-1280x800.png`, `top-1366x768.png` |
| N2 | Manifesto off-centre | **FIXED** | The text's centre is **0 px** from the viewport centre at all 8 sizes (was +181). `mf-1440.png` |
| N3 | Back ply plugs the handle | **FIXED** | `.v2-bag__ply` is `calc(var(--slot-top) - 2px)` tall from −7 px (v2.css:190), so it ends **9 px above the slot on every bag** (hero 40/31, sm 28/19, xs 16/7). The holes are clean on the hero (`zoom-hero-handle-1440/390.png`), the toy (`try-390.png`, `try-1440.png`), the Who bags (`zoom-who-handles-1440.png`) and the close stack (`zoom-close-stack-390/1440.png`): navy or factory shows through, no grey lid |
| N4 | Weld patch reads as an outlined UI box | **FIXED** on the page | `border: 0`. A stippled weld line plus a fold edge, with the ends masked out (v2.css:218–225). Reads as a second film layer, not a dropzone (`zoom-hero-handle-1440.png`). The PNG version still has hard ends, see W3 |
| N5 | Phone bag is a 0.49–0.53 strip | **FIXED** | 0.56 at 360 and 390. The small print moved under the bag onto a deep plate. The mouth, ply, patch and ribbed seal read as a bag (`top-360x740.png`, `top-390x844.png`) |
| N6 | Close stack clips names on phones | **FIXED** | 3 bags below 768. Print boxes 12–112 / 248–348 / 132–228 at 360, all inside the viewport and none covered (`zoom-close-stack-390.png`) |
| N7 | CLS / h1 paints in a system face first | **PARTIAL (deferred, logged)** | CLS 0.015–0.042 in clean runs (gate 0.1, aim ≤ 0.03: 768 misses the aim in one of two clean runs). The only source is the Cairo swap on the h1 (see above) |
| N8 | Template footer + giant wordmark | **FIXED** | The wordmark is gone. The print slug (22-px register mark, 4 ink patches, address · منذ 2011, ©) sits on a dashed rule above a ribbed seal band (`zoom-foot-slug-1440.png`, `foot-390.png`). The 4-column grid remains, but the page now ends on print furniture |
| N9 | Share PNG has a transparent hole and a different bag | **FIXED** | Generated 1080×1350 (`share.png`). **0 non-opaque pixels in the whole image** (min alpha 255). The slot region (425–655 × 120–189) has min alpha 255 and mean RGB 92/93/80: the factory photo. It now has the ply, 3/3/6/6 corners, seals, ribs and two-plate name. The weld patch drifts, see W3 |
| N10 | Three registration-mark geometries | **FIXED** | The FAQ toggle is `.v2-reg` (44 box, 32 circle). Marks in use are 44 (step/FAQ) and 22 (bag/footer SVG), the same drawing at two scales |
| N11 | Small collisions and orphans | **MOSTLY FIXED** | Opener guard ✓ (36 px). Fine print: the tel is `nowrap` ✓. `منذ 2011` is now U+00A0 in the hero and footer ✓. The ticket head no longer wraps. New: P2 |
| N12 | Colour roles | **FIXED** | `--wa` and `--ink-dim` are both in DESIGN's table |
| r1-6 | Radius / shadow lock, dead `.v2-proof` CSS | **PARTIAL** | The dead `.v2-proof` rules are deleted ✓. Ad-hoc box-shadows remain on the drawer, contact sheet, mobile bar and ink swatch. Phone product windows use a 10-px radius (P4) |
| r1-7 | Factory finder brackets and ticket scallop as extra languages | **OPEN (POLISH)** | Unchanged (v2.css:484–488, 746) |
| r1-14 | line-height 1.6 on inputs / channel labels | **OPEN (POLISH)** | v2.css:732, 755 |

## New findings (ranked)

**There are no BROKEN findings.**

### W1. WEAK: the Who handles read as grey pill buttons on the paper ground
- On paper (#eceff3), the hole shows the `--sh-bag` drop-shadow cast through it: 0.45 alpha, 36 px down.
- So the slot reads as a uniform grey gradient pill. In other words it looks like a raised button, not a cut (`zoom-who-handles-1440.png`, `who-b-390.png`).
- On bag a, the fanned copies add offset pill edges inside it.
- The hero, toy and close bags avoid this because a photo or navy shows through their holes.

**Fix.**
1. Give every slot a cut edge: an inner lip at `.v2-bag__at-slot`-style position on all bags. Use `box-shadow: inset 0 3px 4px -2px rgba(3,8,24,.35), inset 0 -1px 0 rgba(255,255,255,.7); border-radius: var(--r-pill)` with no fill. printBag already draws exactly this "depth" gradient.
2. Soften the shadow on light grounds: `.v2-who .v2-bag__shadow { filter: drop-shadow(0 18px 22px rgba(15,27,61,.18)); }`, and add a matching `--sh-bag-light` token to DESIGN.

### W2. WEAK: the product photos rest in ovals, not in the handle slot
- `clip-path: inset(7% 5% round 999px)` on a 4:3 window (v2.css:570) produces a 1.4:1 stadium.
- At 459×329 the ends are almost semicircles the full height of the photo. All five products read as oval vignette frames, a portrait-studio cliché (`prod-1440-a.png`, `prod-1440-b.png`).
- The real handle is 3:1 (196×64), so the "photo rests in the handle-slot pill" meaning does not come through.
- The proof-sheet frame around them works: film sheet, outside crop marks, and the colour bar marching across.

**Fix (pick one).**
- (a) Rest state `clip-path: inset(7% 5% round 3px 3px 6px 6px)`, which is `--r-bag`: a die-cut panel that opens to the full frame. This keeps the grayscale→colour proof pass.
- (b) Rest in a true 3:1 slot, `inset(calc(50% - 16.7%) 5% round 999px)`. It is very cropped, so use it only if the hover is the point.

Option (a) is safer.

### W3. WEAK: the share PNG's weld patch is a hard-edged box
- In `share.png` the patch is a 490×174 lighter rectangle with visible vertical edges and two 8-px "weld ticks" (printBag.ts:279–290). It is the outlined-box look that N4 removed from the page.
- The page patch fades out at both ends (mask 0 → 9% / 91% → 100%) and carries a stippled weld line. The canvas has neither.

**Fix.**
- Fill with `createLinearGradient(px,0,px+pw,0)`, stops `0 → rgba(255,255,255,0)`, `.09 → .35`, `.91 → .35`, `1 → 0`.
- Use the same gradient as the alpha for the bottom fold edge, and draw the stipple (2 px dash / 3 px gap, `rgba(15,27,61,.2)`) 6×S above the bottom.
- Delete the ticks.
- Update DESIGN's PNG row once it matches.

### W4. WEAK: the Who bag is a square at 768–899
- In a single column, bag a is 420×**421** (aspect 1.00) and bag b is 460×525 (`who-a-768.png`).
- The bag grows with its print, and a's print is short. A square bag with a centred list reads as a card again, at a tablet size where the rest of the page holds the bag reading.
- The phones go the other way: 0.51–0.61 tall strips. They read better because the ply and ribs still show.

**Fix:** `.v2-who .v2-bag { min-block-size: 525px; }` (≥ 768 px), or `aspect-ratio: 4/5` as a floor on `.v2-who__item`.

### W5. WEAK (type hierarchy): the Who card titles outrank the section title on phones
- Below 768: section h2 «مين بيطلب من البركة؟» is **24 px**, and the two card h3s are **26 px** (v2.css:645, a fixed `--t-26`).
- This is the only section where a child heading is larger than its parent. Product h3s already step down to 20 on phones (v2.css:581).

**Fix:** `@media (max-width:767px) { .v2-who h3 { font-size: var(--t-20); } }`.

### P1. POLISH: the h1 lead is thin at 1100×700
- 37 / 34 = 1.09×. DESIGN documents it, and the size is rare.
- **Fix:** `@media (min-width:1100px) and (max-height:759px) { .v2 { --t-h2: 30px; --t-mf: 30px; } }`. This also covers 1366×768 (1.21× → 1.37×).

### P2. POLISH: orphans and line-start punctuation
- **390.** Hero sub line 2 starts with «— بالجملة» (`top-390x844.png`). Bind the dash with `وزيبلوك&nbsp;—` (Hero.tsx:112).
- **360.**
  - FAQ summaries end on single words «المتاحة؟» and «التوصيل؟». `text-wrap: pretty` does not apply to the summary's anonymous flex item, so wrap the question text in a `<span>`.
  - Product 4's h3 ends «… / بشريطه».
- **768.** Product 1's h3 ends «… / بشعارك» (cards span 3 of 6 columns there).
- **Footer.** The about paragraph splits «منذ / سنة 2011.» (Close.tsx:87). Use `منذ سنة&nbsp;2011`.

### P3. POLISH: off-scale literals
- `.v2-who__brand` is 30 px: not a token, and equal to the phone h1. Use `--t-26`.
- Its text-shadow hard-codes `rgba(59,111,160,.3)` (the accent).
- Phone `.v2-pcard__win` uses a 10-px radius (v2.css:579). Use `--r-ctl` 12.

### P4. POLISH: shadow tokens
- Four ad-hoc box-shadows: drawer `--sh-1` ✓, contact sheet (v2.css:725), mobile bar (810), ink swatch ring (626).
- Name the two upward shadows as `--sh-up` and list them in DESIGN, or reuse one.

### P5. POLISH: DESIGN.md drift (otherwise in sync; every measured h1/h2/manifesto value in its table matches)
- `--ink-dim` says "display text ≥ 28 px only", but the phone manifesto uses it at **26 px**. 26 px at weight 800 is large text, so 3.3:1 passes. Restate the rule as "≥ 24 px (WCAG large text)" in DESIGN and in the v2.css:17 comment.
- "always the largest type on screen" is true for the h1. Add the Who h3 rule from W5 once fixed.
- The PNG row says "weld patch" (see W3).

## Lens scores

| Lens | R2 | R3 | Why |
|---|---|---|---|
| Design-language coherence | 7.5 | **8.5** | The ply, patch, register mark, footer slug and share PNG now all speak the bag's print language. Dead CSS is gone; one mark drawn at two scales. Held back by the oval photo rest state (W2), the PNG patch (W3), finder brackets and ticket scallop, and stray shadows and radii |
| Typography | 6.5 | **8.0** | h1 dominant at every measured size (1.15–1.59×). One whole-pixel scale of 7 sizes. Cairo and Tajawal only. Held back by the inverted Who h3 on phones (W5), the thin 1100×700 lead, a few orphans and dash breaks, and the font-swap shift |
| Composition and rhythm | 7.0 | **8.0** | Manifesto truly centred. Hero at 40–41% on laptops. Phone close stack whole. The footer ends on print furniture. Section families still vary. Held back by the square Who bag at 768 (W4) and the grey-pill holes on paper (W1) |
| Originality gate (hero = die-cut HDPE bag, not a card) | PASS (desktop only) | **PASS at every size** | Phones are now 0.56 with mouth, ply, patch and ribbed seal. The handle is a clean punched hole with the factory behind it, on the hero, toy, close stack and PNG |

## STATUS
**READY.** There are no BROKEN findings, and every round-2 BROKEN (N1–N3) is fixed and verified by measurement and pixels. All three lenses are at 8 or more. The audit passes at all 5 sizes in two clean runs, and the 360 CLS fail does not reproduce outside contention.

Recommended before launch, all small CSS / canvas changes, in this order: W5, W1, W2, W4, W3.
