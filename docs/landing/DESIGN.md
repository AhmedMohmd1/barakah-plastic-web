# DESIGN — البركة بلاست (/v2)

Reading this as: a B2B quote-request landing page for Egyptian shop owners, buyers and brand owners, with a
"made-on-the-line" packaging-print language derived from «الشنطة هي الصفحة» (the page is the bag).
Dials: VARIANCE 7 · MOTION 7 · DENSITY 4 (trust-forward, BRIEF truth 2).

All copy on /v2 is **draft — user to approve** (BRIEF §Copy status).

## Tokens (CSS custom properties in `src/v2/v2.css`, scoped to `.v2`)
| Token | Light | Role |
|---|---|---|
| `--deep` | #0f1b3d | ground-deep: hero backdrop, factory, try-your-name, close (4 sections, never adjacent) |
| `--deeper` | #0a1430 | footer ground |
| `--paper` | #eceff3 | page paper (reading surfaces) |
| `--film` | #f4f6f8 | the bag / film panels |
| `--white` | #ffffff | form fields, proof frames |
| `--ink` / `--ink-2` / `--ink-3` | #0f1b3d / #33415c / #4a5873 | headings / body / secondary on light |
| `--inv` / `--inv-2` / `--inv-3` | #ffffff / #b7c3d6 / #8fa1bd | headings / body / secondary on deep |
| `--accent` | #3b6fa0 | register blue: the second print plate, lines, icons, large text (≥ 24 px) |
| `--accent-ink` | #2c5a86 | accent for small text on light |
| `--accent-inv` | #6f9bc8 | accent on deep |
| `--action` / `--action-hi` | #f47a00 / #ff8a1f | quote CTA fill only (text on it = `--ink`) — logo orange (user decision 2026-10-25) |
| `--line` / `--line-inv` | rgba(15,27,61,.14) / rgba(255,255,255,.16) | hairlines |
| `--danger` | #c62828 | form errors only |
| print inks (product depiction in the toy only) | navy #0f1b3d · black #1c1c1c · red #b3261e · green #1f6b3a | the visitor's print colour |

### Contrast table (computed WCAG ratios; re-measured on pixels by audit.mjs)
| Text token | on | ratio | pass |
|---|---|---|---|
| ink #0f1b3d | film #f4f6f8 | 15.58 | AA/AAA |
| ink-2 #33415c | film | 9.45 | AA |
| ink-3 #4a5873 | film / paper / white | 6.61 / 6.20 / 7.16 | AA |
| accent-ink #2c5a86 | film / paper | 6.65 / 6.25 | AA |
| accent #3b6fa0 | film | 4.89 | AA (used only ≥ 24 px) |
| ink #0f1b3d | action #f47a00 / action-hi #ff8a1f | 6.13 / 7.16 | AA |
| inv #ffffff | deep #0f1b3d | 16.87 | AA |
| inv-2 #b7c3d6 / inv-3 #8fa1bd | deep | 9.47 / 6.43 | AA |
| accent-inv #6f9bc8 | deep | 5.78 | AA |
| inv-3 #9fb0c9-ish on deeper | #0a1430 | 8.24 | AA |
Focus rings: on light = `--ink` 2 px + 2 px offset (15:1); on deep = `--action` 2 px (6.1:1).

## Typography
- Faces: display **Cairo** 700/800 (brand face, CLAUDE.md); text **Tajawal** 400/500/700; Latin runs (brand names in
  product data, "ziplock") use the same faces' Latin sets; digits Western (BRIEF truth 5), rendered in Cairo/Tajawal.
  Loaded by the existing Google Fonts `<link>` in `index.html` (display=swap). Verified by audit.mjs (F4).
- Scale (text steps): **13 · 15 · 17 · 20 · 26** px. Display steps: H2 `clamp(28px, 4vw, 44px)` → rendered 28/44;
  H1 `clamp(34px, 5.2vw, 68px)`; manifesto `clamp(28px, 4.4vw, 56px)`; step numerals 44.
- Line-heights: headings 1.4 (Cairo is not Kufi; 1.4 keeps diacritics safe), body 1.9, small 1.85.
- Measure: body blocks `max-inline-size: 32em` (≈ 70 Arabic chars at 17 px); never `ch`.
- `text-wrap: balance` on h1/h2/h3, `pretty` on p. Phrase bindings with `{" "}` in JSX («منذ 2011», «5 فئات»).

## Shape & depth
- Radii: bag `0 0 18px 18px` (sealed bottom) · cards/frames 16 · controls 12 · pills 999.
- Shadows: `--sh-1: 0 1px 2px rgba(15,27,61,.08), 0 6px 16px rgba(15,27,61,.06)` (cards); `--sh-bag:
  0 48px 90px -30px rgba(3,8,24,.7)` (the hero bag and the toy bag only).
- Texture: the generated film texture appears ONLY on bag surfaces (hero bag, closing stack, toy stage); the factory
  photo duotone appears only on deep grounds.

## Signature patterns
| Pattern | Looks like | Concept meaning |
|---|---|---|
| section opener `.v2-opener` | 28×10 stadium outline (the handle slot) + label in 15/700 accent-ink | every section is "punched" from the same die |
| step marker `.v2-reg` | registration mark: 34-px circle + cross hairlines, number in Cairo 800 centred | print register = precision |
| artefact frame `.v2-proof` | white frame, 1-px line, 14-px crop marks outside each corner | a print proof you approve |
| progress indicator `.v2-colorbar` | 4 square ink patches (navy, blue, orange-tint, black) that fill per step | the colour-control strip on every printed roll |
| closing callback `.v2-stack` | 4 film panels with handle slots, stacked and offset, rising behind the last CTA | your order: the hero bag, multiplied |

## Section map
| # | Section (id) | Layout family | Ground | Real asset | Mobile collapse |
|---|---|---|---|---|---|
| 1 | Hero (`hero`) | full-bleed object as text panel (the bag) | deep + factory duotone | factory photo (backdrop, through the slot) | bag fills width − 24 px; h1 + CTA inside the bag; CTA above the fold at 360×640 |
| 2 | Manifesto (`story`) | centred statement, giant type | paper | — (type) | same, smaller type |
| 3 | Factory (`factory`) | sticky full-bleed media + step captions (pinned) | deep (photo) | factory photo, full colour | no pin: 4 stacked cards each with its own crop |
| 4 | Products (`products`) | sticky proof frame + scrolling list (scroll-spy) | white | 5 real product photos | stacked items, each with its photo |
| 5 | Try your name (`try`) | interactive stage + controls | deep | generated blank bags | stage on top, controls under |
| 6 | Who it's for (`who`) | two-card fit (opposite-side reveal) | paper | — | stacked |
| 7 | How to order (`how-it-works`) | horizontal ruler/timeline (tear line) | white | — | vertical timeline |
| 8 | FAQ (`faq`) | Q&A list, full-width hairlines | paper | — | same |
| 9 | Contact (`contact`) | form + direct-channel column (slides over FAQ as a sheet) | film | — | channels first, then form |
| 10 | Close (`close`) + footer | centred close + callback object; giant wordmark footer | deep / deeper | — | same |
Deep sections: 1, 3, 5, 10 (4, none adjacent).

## CTA map
- Primary label everywhere: **«اطلب تسعيرة»** (orange `--action`, navy text, 12 radius, min-height 52 desktop/48 mobile).
- Appears: hero (inside the bag), nav (desktop), products (per item, secondary weight: text link «اطلب تسعيرة لهذا
  المنتج»), try-your-name («اطلب تسعيرة لهذه الشنطة» — primary), close, mobile sticky bar.
- Visibility: the nav CTA collapses (`inert`, width 0) while the hero CTA button is on screen (IO on the button,
  rootMargin = −header height); the mobile sticky bar appears after the hero CTA leaves and hides while the close
  section or footer is visible.
- Secondary actions are text links: «جرّب اسمك على الشنطة» (hero), WhatsApp / call.

## Conflicts logged
| Rule | Source | Winner | Why |
|---|---|---|---|
| Orange retired, blue accent system | CLAUDE.md / old DESIGN | user decision 2026-10-25 | logo orange restored as action colour on /v2 only |
| Hero h1 animates translate only | 6-build §2 | kept | print effect uses a ghost duplicate (aria-hidden) for mis-registration, not clip on the h1 |
| One shared lead endpoint | src/constants/contact.ts | kept | v2 reuses `RequestQuoteModal` and the Contact payload byte-for-byte |
