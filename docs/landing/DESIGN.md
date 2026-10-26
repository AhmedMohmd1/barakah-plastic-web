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
| `--white` | #ffffff | form fields |
| `--ink` / `--ink-2` / `--ink-3` | #0f1b3d / #33415c / #4a5873 | headings / body / secondary on light |
| `--inv` / `--inv-2` / `--inv-3` | #ffffff / #b7c3d6 / #8fa1bd | headings / body / secondary on deep |
| `--accent` | #3b6fa0 | register blue: the second print plate, lines, icons, large text (≥ 24 px) |
| `--accent-ink` | #2c5a86 | accent for small text on light |
| `--accent-inv` | #6f9bc8 | accent on deep |
| `--action` / `--action-hi` | #f47a00 / #ff8a1f | quote CTA fill only (text on it = `--ink`) — logo orange (user decision 2026-10-25) |
| `--line` / `--line-inv` | rgba(15,27,61,.14) / rgba(255,255,255,.16) | hairlines |
| `--danger` | #c62828 | form errors only |
| `--wa` | #1f7a45 | WhatsApp icon only (UI role, not a print ink): 4.9:1 on film, 5.3:1 on white |
| `--ink-dim` | #76839a | manifesto words before they fill — display text ≥ 26 px only (3.3:1 on paper; large-text use) |
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
- Scale (text steps): **13 · 15 · 17 · 20 · 26** px. Display steps (stepped, whole pixels): H2 **24 / 34 / 40**
  (<768 / 768–1099 / ≥1100), and **34** on ≥1100 screens shorter than 900 px; manifesto **26 / 34 / = H2** (one
  display step on desktop); H1 sized to the bag:
  `round(down, clamp(30px, (100cqi − 72px) / 11.8, 56px), 1px)`. Measured (h1 / h2 / manifesto): 360–390 **30** / 24 / 26 ·
  768×1024 **54** / 34 / 34 · 1100×700 **37** / 34 / 34 · 1280×800 **43** / 34 / 34 · 1366×768 **41** / 34 / 34 ·
  1440×900 **51** / 40 / 40 · 1920×1080 **56** / 40 / 40 — always the largest type on screen.
  The visitor's printed name in the toy is a product depiction (fit-to-bag).
- Line-heights: headings 1.4 (Cairo is not Kufi; 1.4 keeps diacritics safe), body 1.9, small 1.85.
- Measure: body blocks `max-inline-size: 32em` (≈ 70 Arabic chars at 17 px); never `ch`.
- `text-wrap: balance` on h1/h2/h3, `pretty` on p. Phrase bindings with `{" "}` in JSX («منذ 2011», «5 فئات»).

## Shape & depth
- Radii: `--r-bag` 3 3 6 6 (film is barely rounded — a bag, not a card) · cards/frames 16 · controls 12 ·
  `--r-sheet` 36 (the contact sheet's top edge only) · pills 999.
- Shadows: `--sh-1` (cards) · `--sh-bag: drop-shadow(0 36px 40px rgba(3,8,24,.45))` as a filter, so the shadow
  follows the punched hole (bags only).
- Texture: procedural film grain (SVG feTurbulence) + soft sheen ONLY on bag surfaces (hero bag, toy, closing stack);
  the factory photo duotone appears only on deep grounds; in colour only through the punched handle and in the
  factory section.
- Material greys of the bag (#f7f9fb … #c7d0da, ply #dfe5eb) are depiction values, kept inside the bag rules in v2.css.

## Signature patterns
| Pattern | Looks like | Concept meaning |
|---|---|---|
| section opener `.v2-opener` | 28×10 stadium outline (the handle slot) + label in 15/700 accent-ink | every section is "punched" from the same die |
| step marker `.v2-reg` | registration mark: 44-px box, 32-px circle + cross hairlines, number in Cairo 800 centred (the bag's own print marks are 22-px SVG — same symbol at print scale) | print register = precision |
| FAQ toggle `.v2-faq__x` | the same `.v2-reg` symbol (crosshair .6); turns 15° on hover/focus, 45° to × when open | print register |
| photo window `.v2-pcard__win` / factory | product photos wait as a film pill, then (per photo, when 60 % seen) open to their full rectangle while inking grayscale→colour; at rest they are whole rectangles with bag corners (3 3 6 6); hover = 1.025 image scale. The factory stays shut until a steel-rule die lands on a film pill, then opens from the hero's 196×64 slot (masks, paint-only; on phones the first crop plays on a timer at 90 % seen) | proof sheet / punched handle |
| progress indicator `.v2-colorbar` | 4 square ink patches (navy, blue, orange-tint, black) that fill per step | the colour-control strip on every printed roll |
| closing callback `.v2-close__stack` | 5 bags (3 on phones), each printed with the name the visitor typed, fanned and rising behind the last CTA | your order: the hero bag, multiplied |
| footer slug `.v2-foot__slug` | 22-px register mark, 4 ink patches, «البركة بلاست · قليوب، القليوبية · منذ 2011», © — on a dashed rule above a ribbed seal band | the small print on a bag's bottom edge |
| shareable PNG (`printBag.ts`) | 1080×1350: the visitor's bag (ply, seals, weld patch, ribs), name in two plates, factory through the handle, logo, «معاينة توضيحية» | the proof you send to your partner |

## Section map
| # | Section (id) | Layout family | Ground | Real asset | Mobile collapse |
|---|---|---|---|---|---|
| 1 | Hero (`hero`) | full-bleed object as text panel (the bag) | deep + factory duotone | factory photo (backdrop, through the slot) | bag = width − 32 px, height capped at w/0.56 and centred; small print moves under the bag; h1 + CTA inside the bag; CTA above the fold at 360×640 |
| 2 | Manifesto (`story`) | centred statement, giant type | paper | — (type) | same, smaller type |
| 3 | Factory (`factory`) | sticky full-bleed media + step captions (pinned) | deep (photo) | factory photo, full colour | no pin: 4 stacked cards each with its own crop |
| 4 | Products (`products`) | split header + one film proof sheet with crop marks (2 large + 3 small) | white / film | 5 real printed-bag photos (`images[1]`) | RTL snap rail (82vw cards) + colour-bar position cue |
| 5 | Try your name (`try`) | interactive stage + controls | deep | code-drawn bag + PNG download | stage on top, controls under |
| 6 | Who it's for (`who`) | two `<Bag size="sm">` objects with the copy printed on them (wholesale = fanned stack, brand = «براندك» mark) | paper | — | stacked bags |
| 7 | How to order (`how-it-works`) | horizontal ruler/timeline (tear line) | white | — | vertical timeline |
| 8 | FAQ (`faq`) | sticky title column + Q&A hairlines | paper | — | title above list |
| 9 | Contact (`contact`) | form + direct-channel column (slides over FAQ as a sheet) | film | — | channels first, then form |
| 10 | Close (`close`) + footer | centred close + callback object; footer with print slug | deep / deeper | — | 3-bag stack |
Deep sections: 1, 3, 5, 10 (4, none adjacent).

## CTA map
- Primary label everywhere: **«اطلب تسعيرة»** (orange `--action`, navy text, 12 radius, min-height 52 desktop/48 mobile).
- Appears: hero (inside the bag), nav (desktop), products (per item, secondary weight: text link «اطلب تسعيرة لهذا
  المنتج»), try-your-name («اطلب تسعيرة لهذه الشنطة» — primary), close, mobile sticky bar.
- Visibility: the nav CTA fades out (`inert` + `visibility: hidden`, width reserved so the nav never shifts) while ANY
  primary CTA (`.v2-cta-primary`: hero, try, close) or the contact ticket is on screen (IO, rootMargin = −header height);
  the sticky bar (all widths < 1100 px, i.e. wherever the nav CTA is absent) shows only when none of those is visible and
  before the close section; while it shows, `scroll-padding-bottom: 96px` and a focus nudge keep focused controls clear of it.
- Orange (`--action`) appears ONLY on quote CTAs; every other highlight uses the register blue.
- Secondary actions are text links: «جرّب اسمك على الشنطة» (hero), WhatsApp / call.

## Conflicts logged
| Rule | Source | Winner | Why |
|---|---|---|---|
| Orange retired, blue accent system | CLAUDE.md / old DESIGN | user decision 2026-10-25 | logo orange restored as action colour on /v2 only |
| Hero h1 animates translate only | 6-build §2 | kept | print effect uses a ghost duplicate (aria-hidden) for mis-registration, not clip on the h1 |
| One shared lead endpoint | src/constants/contact.ts | kept | v2 reuses `RequestQuoteModal` and the Contact payload byte-for-byte |
