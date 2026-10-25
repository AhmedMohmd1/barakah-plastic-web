# Critic round 1 — summary and triage

Scores: A hero 6.5 / page 6.0 · B lens scores 6.5 (coherence, type, rhythm) · D dim 11 = 5, dim 12 = 5 · C integrity holds, 1 BROKEN a11y.
Reports: A.md, B.md, C.md, D.md (this folder).

## Fixed (round 2 build)
| Finding | Fix |
|---|---|
| A1/D1 BROKEN climax illegible | stage moved 56 px down (air above the handle); die = 4 px steel-rule outline (no navy block) dropping from −72 px in full view; cut at impact; chip has an edge + shadow and falls 70vh; jolt 6 px; hole shows the film tower in colour |
| A2 BROKEN headline arrives last | sub / CTAs / note fade up after the h1 (0.8–1.0 s); play fallback 4 s → 1.5 s |
| A3/B4 hero reads as a card | bag is portrait 5:6, back ply at the mouth, corners 3/6 px, seals .22 / ribs .14, solid weld patch, shadow token |
| A4/B9 1280 collisions | content starts below the patch; h1 sized from the bag width (`(100cqi − 72px) / 11.8`, rounded) → 2 lines at 1280; caption no longer overlaps |
| A8/B5 orange leaks + 2 orange CTAs on screen | step markers / ink chips / caption dot → blue; nav CTA hides while ANY primary CTA (hero, try, close) is visible |
| B3 h1 not the biggest type | h2 24/34/40, manifesto 26/34/42 (stepped, no fractional sizes), h1 30 → 56 |
| B1 BROKEN phone alignment | `.v2-ch span[dir=ltr] { text-align: right }` |
| B2 BROKEN wordmark seams | stroke removed; quiet fill |
| B11 arrow in system font | lucide `ArrowLeft` |
| B12 sheen over the printed name | `.v2-bag__print { z-index: 1 }` |
| B13 widows | `text-wrap: pretty` on li / dd / summary |
| B7 FAQ toggle | registration mark (circle + cross) that turns 45° |
| B8 same header stack everywhere | split headers (products, how-to), centred (who), sticky title column (FAQ) |
| A6/D6/F6 social flyers as proof | product cards use the clean photos in `PRODUCTS[i].images[1]` (real printed bags, no flyer text) |
| D3 factory + products same mechanism | products = card grid; each photo printed in by a right→left plate wipe when seen (IO, per card); factory opens THROUGH THE HANDLE SLOT (clip-path from the slot shape to full-bleed) as it scrolls in, then pins |
| D2 BROKEN closing stack | 5 bags, every bag printed with the visitor's name, spread so names stay readable, softer mask |
| D4 toy press is a fade | two plates: right→left clip wipe (380 ms) + off-register ghost sliding into register (420 ms); «احفظ صورة الشنطة» downloads a PNG of the visitor's bag (canvas) |
| D5 dead mobile sections | product wipe, factory crops open through the handle, who cards slide on mobile, contact sheet arrives (scroll-driven) |
| B10/D6 soft factory zoom | camera scale 1.9–2.1 → 1.55–1.6 |
| C1 BROKEN focus under mobile bar | `html:has(.v2-mbar[data-show=true]) { scroll-padding-bottom: 96px }` |
| C2 modal carry-over | modal re-mounts per open (`key`) |
| C3 h1 name doubled | `content: attr(data-ghost) / ''` |
| C4 duplicate ids | v2 form ids prefixed `v2c-` (payload keys unchanged — diffed) |
| C5 live region per keystroke | announces after typing pauses |
| C6 late first paint | `/v2` chunk preloaded at module load when it is the entry URL |
| C7 focus radius / title | focus ring no longer changes radius; document.title restored on leave |

## Rejected / deferred (with reason)
- A7 one factory photo reused 4× / A10 MOQ & lead time / B "real assets" — asset-blocked: needs the owner's photos and numbers (BRIEF §Missing assets). Not fakeable.
- B shared product data typos ('ziplock bags', stray spaces) — lives in `src/constants/products.ts`, shared with `/products/:id`; left for the owner (logged).
- C no-JS blank — the whole app is a client SPA (same as `/`); out of scope.
- C drawer outside-click / back-restores-scroll — POLISH, not done this round.
- D "conveyor" for products — replaced by the cheaper plate-wipe grid (breaks the repeat with less scroll length).
