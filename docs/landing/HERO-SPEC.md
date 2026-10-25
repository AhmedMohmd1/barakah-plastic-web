# HERO-SPEC — prompt-grade values

## Archetype and why
living object (the bag panel) on a real-photo backdrop — see STORYBOARD.md.

## Fonts
display: Cairo 800 (Google Fonts link in index.html, swap) · body: Tajawal 400/500/700 · digits: Western, in Tajawal.

## Layers (z-order, bottom → top)
| z | Element | Position | Size | Content / asset | Notes |
|---|---|---|---|---|---|
| 0 | `.v2-hero` | relative, `overflow-x: clip` | 100vw × max(100svh − header, 600px) | bg `--deep` | declares ground for contrast tools |
| 1 | backdrop `<img>` | absolute inset 0 | cover, object-position 50% 35% (mobile 22% 30%) | /images/hero.webp | `filter: grayscale(1) contrast(1.15) brightness(.55)`; `fetchpriority=high`; alt "" (decorative here; proof copy is in the factory section) |
| 2 | duotone veil | absolute inset 0 | — | `--deep` @ 0.72, `mix-blend-mode: multiply` + linear-gradient to `--deep` at the bottom 30% | |
| 3 | `.v2-bag-copy` ×2 | absolute, same box as the bag | — | film colour, 0.92 / 0.84 lightness | hidden exactly behind the bag; CTA coupling moves them |
| 4 | `.v2-bag` | absolute; inset-inline 40 px (md) / 12 px (sm); top 16 px; bottom 32 px | ≈ 86 % of first screen | film `--film` + noise + sheen | `mask` = stadium hole at (50 %, 40 px), size 188×56 (sm 128×40), `mask-composite: exclude`; radius 4 4 18 18; `--sh-bag` via a filter drop-shadow on the wrapper |
| 5 | patch | absolute, top 14 px, centred | 380×128 (sm 250×88) | lighter film + 1-px weld lines (dashed, `--line`) | sheen sweep idle |
| 6 | seals | absolute, inset-inline 14 px, top 0 / bottom 0 | 1 px lines | `--line` | draw on setup |
| 7 | register marks ×4 | absolute, 22 px from corners (top ones at 22 px under the top edge) | 22×22 SVG | circle r 7 + cross, stroke `--ink-3` 1 px | draw |
| 8 | content column | centred, `padding-top` = slot top + slot h + 40 | max-inline-size 46rem | opener, h1, p, CTA row, note | |
| 9 | colour bar | absolute, bottom 44 px, inset-inline-start 28 px | 4 × 14 px squares, gap 4 | navy, blue, `#f7b26b` (orange tint, non-CTA), `#1c1c1c` | |
| 10 | small print | absolute, bottom 16 px, centred | 13 px | address · tel link | like a real bag |
| 11 | chip (slug) | absolute at the slot | slot size | film + noise | climax: falls |
| 12 | die | absolute above the slot | slot + 10 px | 3-px steel outline (linear-gradient #c9d2df→#7d8aa0) on a 10-px dark "board" band | climax: drops |

## Typography
| Element | Text | Font | Size (clamp) | Line-height | Colour |
|---|---|---|---|---|---|
| opener | «مصنع شنط وأكياس · قليوب · منذ 2011» | Tajawal 700 | 15 | 1.85 | `--accent-ink` |
| h1 line 1 | «اسم محلك على كل شنطة،» | Cairo 800 | clamp(34px, 5.2vw, 68px) | 1.4 | `--ink` |
| h1 line 2 | «مطبوع في مصنعنا.» | Cairo 800 | same | 1.4 | `--accent` (≥ 34 px → large text, 4.89:1) |
| sub | «بلاستيك مطبوع، سوفت، قماش، سلوفان وزيبلوك — بالجملة ومن مصنع واحد، مع توصيل لكل محافظات مصر.» | Tajawal 500 | 17 (sm 15) | 1.9 | `--ink-2` |
| note | «قل لنا الكمية والمقاس، ونرد عليك بالسعر والحد الأدنى للطلب.» | Tajawal 500 | 13 | 1.85 | `--ink-3` |
| small print | «البركة بلاست — قليوب، طريق مصر إسكندرية الزراعي · 01009923040» | Tajawal 500 | 13 | 1.85 | `--ink-2` |

## Chrome
- Primary button `.v2-btn`: bg `--action`, text `--ink` 17/700, radius 12, padding 0 28 px, min-height 52 (sm 48),
  hover bg `--action-hi` + translateY(−1 px); active translateY(0); focus-visible outline 2 px `--ink` offset 3 px.
  Arrow glyph «←» after the label (forward in RTL), moves −4 px on hover.
- Text link `.v2-link`: 17/700 `--ink`, underline 1 px `--accent` offset 6 px, min-height 44 inline-flex.
- Header: sticky, height 72 (sm 60), bg `rgba(244,246,248,.92)` + blur(10px) (solid `--film` under
  prefers-reduced-transparency), logo 40 px tall, links 15/700 `--ink-2`, CTA small `.v2-btn--sm` min-height 44.

## Motion table
| Element | Property | From → To | Duration | Delay | Easing | Trigger |
|---|---|---|---|---|---|---|
| bag | translate | 0 24px → 0 0 | 450 ms | 0 | (.2,.8,.2,1) | data-play |
| seals | scale (Y) | 0 → 1, origin top | 450 ms | 100 ms | (.4,0,.2,1) | data-play |
| reg marks | stroke-dashoffset | 1 → 0 | 500 ms | 300 + i·90 ms | (.4,0,.2,1) | data-play |
| h1 lines | translate (Y) | 105% → 0 | 600 ms | 450 + i·90 ms | (.16,1,.3,1) | data-play |
| ghost line 2 | translate / opacity | (7px,−5px)/.55 → 0/0 | 500 ms | 1000 ms | (.65,0,.35,1) | data-play |
| colour patches | scale | 0 → 1 | 400 ms | 1050 + i·80 ms | (.2,.8,.2,1) | data-play |
| die | translate (Y) / opacity | −150px/1 → 0/1 (180 ms) → −50px/0 (400 ms) | 680 ms total | 1600 ms | ease-in then ease-out | data-play |
| bag inner (jolt) | translate | 0 → 3px → 0 | 220 ms | 1780 ms | (.2,.8,.2,1) | data-play |
| chip | translate / rotate / opacity | 0/0/1 → 160px/14deg/0 | 520 ms | 1780 ms | (.55,0,1,.45) | data-play |
| patch sheen | translate (X) | 120% → −120% | 1.2 s | 6 s, 2 cycles | linear | after play |
| sheen | background-position | ±3% from pointer | lerp .08 per rAF | — | — | pointermove, fine pointer, in view only |
| bag copies | translate | 0 → (−12px, 12px) / (−24px, 24px) | 450 ms | 0 / 60 ms | (.2,.8,.2,1) | CTA hover/focus |

## Breakpoints & mobile
≤ 768: slot 128×40, patch 250×88, bag inset 12 px, h1 34 px, CTA full width, note hidden below 700 px viewport height.
Fold check: CTA bottom ≤ 640 at 360×640.

## Reduced motion / no-JS / reduced transparency
`prefers-reduced-motion: reduce` → no animations/transitions; base CSS = final state (chip/die/ghost at opacity 0,
everything else in place). The SPA has no no-JS render (existing Vite app — logged). Reduced transparency → solid header.

## Performance budget
LCP = the h1 text (or the backdrop image, 166 KB webp, preloaded via fetchpriority). JS for the hero: one IO, one
pointer rAF loop that sleeps off-screen. No new libraries.
