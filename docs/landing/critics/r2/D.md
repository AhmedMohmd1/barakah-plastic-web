# Critic D, round 2: wow and section variety

Lens: *sections that are not alike, each with a distinctive, impressive animation or interactive motion.*
Page: http://127.0.0.1:4173/v2 (fresh production build). Copy is DRAFT and is not judged here.

## Method
- **Capture script:** `C:\Users\AHMEDH~1\AppData\Local\Temp\claude\d--barakah-plastic-web\86bc40ec-ac8c-47df-9b47-fd93113ba7ab\scratchpad\critD2.mjs` (cdp.mjs, analytics blocked, temp profile deleted).
  - Scrolls with native CDP `mouseWheel`: 180 px steps at 1440×900 and 170 px at 390×844, with a 260 ms settle and one frame per step.
  - Interactions run *inside* the scroll, the way a visitor meets them:
    - Hovered `.v2-cta-hero`.
    - Typed «مخبز النور» into `#v2-try-name` (frames at 100–1300 ms after the last key), switched all four inks (frames at 280/420/600/1000 ms), typed a phone number, and pressed «احفظ صورة الشنطة». The download was intercepted and saved.
    - Opened FAQ items 1 and 3 (hover, then click).
  - Ran a second, finer 90 px pass over the Factory entry.
- **Slow motion:** `heroSlow2.mjs` replays the hero at 0.25× via `Animation.setPlaybackRate` and logs `currentTime` for each animation. `heroProbe.mjs` samples computed opacity and transform every 100 ms during load.
- **Frames:** `D-shots/desk/s000–s070` (71) and `D-shots/mob/s000–s091` (92). Section-at-centre logs are in `desk/log.json` and `mob/log.json`.
  - Desktop height is 13,264 px (round 1: 14,650).
  - Mobile height is 15,960 px.
- **Contact sheets** (in `D-shots/`, frame index burnt in):
  - Desktop: `desk-sheet-0-hero-load`, `desk-sheet-0c-climax-quarter-speed`, `desk-sheet-1-hero-mf`, `desk-sheet-2-factory`, `desk-sheet-2b-factory-entry`, `desk-sheet-3-products`, `desk-sheet-4-try-who-how`, `desk-sheet-5-faq-contact-close`, `desk-sheet-6-interactions`, `desk-sheet-7-inks-faq`.
  - Mobile: `mob-sheet-0…5`.
  - Zooms: `desk-zoom-climax`, `desk-zoom-handle-open`, `desk-zoom-press`, `desk-zoom-ink-red`.
  - Artefacts: `desk/saved-bag.png` (the downloaded PNG) and `desk/close-named.png`.
- **References:** the round-1 captures (`../r1/D-shots/ref-sheet-terminal.png`, `ref-sheet-lando.png`, `ref-sheet-airpods.png`) were reused, not recaptured.

Measured with getBoundingClientRect at 1440×900:

| Element | Size |
|---|---|
| Hero bag | 620 × 744 px (43% of the width) |
| Hero slot | 196 × 64 px |
| Toy bag | 400 × 500 px |
| Toy name | 60 px |
| Close bag | 284 × 334 px |
| Close print | 20 px |

## Section by section

Columns: **Moment**, what was seen. **Trigger**. **Repeats previous?**, with the dimension that repeats (mechanism, trigger, field or scale).

| # | Section | Moment (desktop / mobile) | Trigger | Repeats previous? | Verdict |
|---|---|---|---|---|---|
| 1 | Hero | Steel-rule die drops into the slot, chip falls about 70vh, the slot shows the factory in colour, CTA hover fans two bag copies (`desk-sheet-0c` f0–f6, `desk-hover-cta` = `desk/hover-2-650ms.png`). Same on mobile. | load (meant to be "when seen") + hover | n/a | **WEAK**. Legible now, but the climax happens in a 196×64 px slot (about 1% of the screen). The bag *shrank* to 43% of the width. The chip falls **across the h1** (f4–f5: «على كل» and «مطبوع» are covered). The sequencing is **BROKEN** (F1b). |
| 2 | Manifesto | Word fill, dim to ink, over a 170vh sticky (`desk-sheet-1` f3–f10, `mob-sheet-1` f4–f11) | scroll-scrub | No | OK. Still the stock B2 recipe. |
| 3 | Factory | **New:** the photo opens through a pill-shaped window to full bleed (`desk-sheet-2b` f5–f10), then the 400vh pin with 4 camera stops (f10–f25). Mobile: each of the 4 crops opens from an oval (`mob-sheet-1` f12–f22). | scroll-scrub → pin | No (desktop) | **OK, strongest section.** The "through the handle" read is lost (F8). |
| 4 | Products | 2+3 card grid. Each photo wipes in right→left with a 1.12→1 unzoom, once (`desk-sheet-3` f2 and f6 show mid-wipe slivers; `mob-sheet-2` f2, f9, f13, f16). | enter once (IO, per card) | Desktop: no. **Mobile: yes.** Same visual (an image clip-revealing as it enters) as the 4 factory crops right before it: 9 images in a row revealed the same way over about 5,400 px (`mob-sheet-1` f12 → `mob-sheet-2` f21). | **WEAK**. A card grid with an image wipe is the most common reveal on the web. Mobile Products is still 3,501 px. |
| 5 | Try your name | **New:** two plates. The ink wipes right→left, then a blue ghost slides into register (`desk-zoom-press` t260: ghost visibly offset; `desk-zoom-ink-red` t280). «احفظ صورة الشنطة» downloads a 1080×1350 PNG (`desk/saved-bag.png`). | input | Same clip-inset primitive as 4, but the verb differs (type vs scroll) | **OK**. The best-built moment, but small: a 60 px name on a 400 px bag. The PNG has a hole (F9). |
| 6 | Who | Two cards drift in from opposite sides by ±18% (±10% on mobile) (`desk-sheet-4` f5–f7; `mob-sheet-3` f9–f13) | scroll-scrub | No | **WEAK**: the card pair with a 56 px glyph is unchanged in substance. |
| 7 | How to order | Dashed rail tears right→left (vertical on mobile), stations stamp in (`desk-sheet-4` f9–f11; `mob-sheet-3` f16–f19) | enter once | No | OK, small. Third use of `clip-path: inset(0 0 0 100%)` on the page. |
| 8 | FAQ | Registration mark (circle + cross) turns 45° to ×, answer drops 6 px. Hover gives no feedback (`desk-sheet-7` f16 vs f17 identical). | click | No | **WEAK**: a stock accordion with a nicer icon. |
| 9 | Contact | Sheet rises 90 px over the FAQ, which dims to 35% (`desk-sheet-5` f3–f6). After that, 1,243 px desktop / 1,950 px mobile of static form (`mob-sheet-4` f2–f12: 11 frames, only position changes). | scroll-scrub | No | **WEAK**. Sheet-over-sheet is in the catalog, but here it lasts 90 px. |
| 10 | Close + footer | **Fixed:** 5 bags rise with a 70 ms stagger. **Every bag** carries the typed name, the centre bag in the chosen ink (`desk/close-named.png`). Footer wordmark rises (scrub). Mobile: the outer bags are cut by the viewport, so 2 of 5 names are clipped (`mob-sheet-4` f14–f16). | enter once + scrub | Same trigger as 7, not adjacent | **OK**. The payoff now lands on desktop. |

**Count.**
- Desktop: 8 of 10 sections have a moment beyond a plain reveal. Who and FAQ are decoration-level. Only 3 are *impressive*:
  - the Factory window + pin,
  - the toy,
  - the named stack.
- Mobile: 10 of 10 move, up from 5 of 10, which clears the 70% floor. But sections 3 and 4 are one experience: "a picture clip-reveals as it enters", ×9.
- Primitive census: `clip-path: inset(...)` from the reading-start edge is the reveal in sections 3, 4, 5 and 7. It works as a grammar (printing = a plate wipe), but four sections share one visual verb. Nothing on the page changes **axis** or **scale**. Every section after the hero is "centred or split heading + content column" (same as round 1, vs `ref-sheet-lando.png`).

**Thread.** Desktop is improved: the bag returns at the toy (y≈7,743) and the close (y≈11,853), and the slot returns as the factory window. The gap from the hero to the next bag is still about 7,000 px (frames 3→41). Between them the slot-as-window appears once, and it does not read as the handle (F8).

## Round-1 findings: status

| R1 | Finding | Status | Evidence |
|---|---|---|---|
| F1 | Hero climax tiny / die a skeleton / chip invisible | **PARTLY FIXED** | Die is a legible 4 px steel outline and the chip is visible as it falls (`desk-sheet-0c` f0–f6). Still small: slot 196×64. The bag shrank from 56% to 43% of the width (620 px), against the concept's 78–86%. New problem: the chip crosses the h1 (f5). |
| F2 | Close hides the typed name (BROKEN) | **FIXED** (desktop) | `desk/close-named.png`: all 5 bags read «مخبز النور», the front one in red. Mobile clips the outer 2. |
| F3 | Factory and Products are the same experience | **FIXED on desktop / REGRESSED on mobile** | Desktop: pin vs grid (`desk-sheet-2` vs `desk-sheet-3`). Mobile: factory crops and product wipes are the same reveal for 9 images in a row. |
| F4 | Toy press is a fade | **FIXED** | `desk-zoom-press.png` t260: off-register ghost; wipe at t100. The PNG download works (`desk/saved-bag.png`). |
| F5 | Three dead mobile sections | **PARTLY FIXED** | All sections now move (`mob-sheet-1..4`). But Products (3,501 px) and Contact (1,950 px) are still long single-verb stretches. |
| F6 | Flyer product images / soft factory zoom | **PARTLY FIXED** | No flyers, no baked buttons. Photos are real bags, but on mixed grounds (wood grain, beige, white seamless) with three different customer brands (`desk-sheet-3` f4, f9). Factory at s=1.55 is acceptable (`desk-sheet-2b` f10–f25). |
| F7 | Wordmark seams | **FIXED** | Solid 8% fill (`desk-sheet-5` f17–f18). |

## New findings

**F1b, BROKEN: the hero story is not gated, and the punch can play before the headline exists.** In `v2.css:297` the pause rule `.v2-hero:not([data-play]) .v2-a { animation-play-state: paused }` has specificity (0,3,0). The rules for the sub, CTAs, note, die and chip (`v2.css:304–308`, e.g. `.v2-hero .v2-bag__die.v2-a`) also have (0,3,0), come later, and use the `animation` shorthand. That shorthand resets `animation-play-state` to `running`. Only the h1 (`h1.v2-a`, (0,2,1)) stays paused.

Evidence:
- **Slow-motion log** (`desk-hero-slow/log2.txt` n0): before `data-play`, `v2-line` is at `0`, while `v2-die`, `v2-chip` and `v2-fadeup` are already at `229`.
- **Live probe** (`heroProbe.mjs`): at T=2028 ms, `data-play` is still false and the sub is at opacity 0.96 and the CTA at 0.88, while the h1 is still `translateY(135px)`. The h1 rises only between 2.5 and 3.1 s.
- **Effect:** the sub and CTA arrive before the headline. On a slow font load the die and chip fire before the h1 is up, so the concept's beat order breaks: the headline is meant to rise first and the punch to follow as the climax.
- **Fix:** add a selector at higher specificity, placed after the animation rules: `.v2-hero:not([data-play]) .v2-a.v2-a, .v2-hero:not([data-play]) .v2-a.v2-a > *, .v2-hero:not([data-play]) .v2-a.v2-a::after { animation-play-state: paused; }`

**F8, WEAK: the "through the handle" cut never shows a handle.**
- The clip starts at `entry 0%`, when the sticky stage's top touches the viewport bottom, so the pill-shaped start is off-screen.
- By the time the window is visible it is already about 560 px wide and cut by the bottom edge (`desk-zoom-handle-open.png`, frames fac-006/007). The panel title is clipped mid-word («عنعنا», «غليوب»).
- The visitor sees "a rounded window rising", not "the slot from the hero opening". This was the match-cut that would make the moment shareable.

**F9, WEAK: the saved PNG has a transparent hole through the background.** `printBag.ts` fills the navy ground first, then cuts the slot with `destination-out`, which cuts through the ground as well. The slot pixel (540, 212) is RGBA `0 0 0 0`, while the ground pixel is `15 27 61 255`. WhatsApp and gallery apps will render the hole white or black, never navy (`desk/saved-bag.png`). The artefact also has no logo mark and no factory view through the handle, so it is a plain mock-up and not something a shop owner would forward proudly.

**F10, POLISH:**
- The chip's 70vh fall passes in front of the h1 (`desk-sheet-0c` f5).
- The mobile close stack clips the outer bags at 390 px (`--k: .5` × ±400 px offsets).

## Scores
- **Dimension 11, wow and section variety: 6.5 / 10** (round 1: 5).
  - Real gains: the factory window, a toy with an impression and a keepable output, a close that pays off with the visitor's name, and a page where every mobile section moves.
  - Held back by:
    - a hero climax still around 1% of the screen and sequenced wrong (F1b);
    - one clip-inset verb doing duty in 4 sections;
    - a generic card-grid wipe for the catalogue;
    - Who / FAQ / Contact at decoration level;
    - a mobile Factory→Products stretch that is one reveal repeated 9 times;
    - no change of axis or scale anywhere.
- **Dimension 12, art direction: 6 / 10** (round 1: 5).
  - Better: the flyers are gone, the die is drawn like steel, and the bag has plies, seals and ribs.
  - Still: the hero bag at 43% width over a darkened photo reads as a *card on a photo* (`desk-sheet-1` f0). The product photos sit on three different grounds with three different customers' logos, so the catalogue looks like a collection of WhatsApp photos, not one proof sheet.

**Ship bar: dimension 11 ≥ 8. Not met.**

## Shareable moment
**Still none.** The candidate is the toy plus «احفظ صورة الشنطة», which is now mechanically complete. But:
- the moment happens at 60 px on a 400 px bag;
- the exported image is a flat mock-up with a transparent hole (F9);
- the one cinematic idea, "the punched slot becomes the window into the factory", opens off-screen (F8).

## Slop patterns
1. A card grid where every image gets the same wipe (Products). "Same reveal on every block" in miniature: 5 identical wipes, and on mobile 9 in a row counting the factory crops.
2. Card pair with small line glyphs (Who), unchanged in substance from round 1.
3. A stock accordion (FAQ), with a nicer icon but no hover state.
4. One primitive (a reading-start clip-inset) carrying 4 of 10 sections.
5. Not slop by rule, but a smell: the hero's signature still degrades to "white card over a dark photo" at a glance.

No hard bans were found: no Arabic character splitting (the word scrub and h1 move by words and lines), no scroll-jacking, no bouncy easing, no long loader, and no unpaused loops (the sheen runs 2 iterations).

## The three highest-impact upgrades (React 18 + Vite + plain CSS, no new dependency)

### U1. Make the handle cut happen on screen, at full size (fixes F8 and F1 scale; the page's screenshot moment)
- **Start the window while the stage is pinned and centred.** The track already has `view-timeline: --fac`.
  - `.v2-fac__track { block-size: 460vh }`. That is 60vh of pre-roll on desktop; the mobile crops have their own fix in the last bullet.
  - On `.v2-fac__stick` and `.v2-fac__cam img`: `animation-range: contain 0% contain 18%`. For a subject taller than the viewport, `contain 0%` is the moment the stage pins, so the slot starts centred at `inset(calc(50% - 32px) calc(50% - 98px) round 999px)`. That is the hero's exact 196×64.
  - Shift the four step sentinels down by 60vh: `top: calc(60vh + i*100vh)`.
- **Stamp before opening.** Add `.v2-fac__die`, the same 4 px steel-rule pill as `.v2-bag__die`, centred on the slot.
  - Animate `translateY(-72px)` → `0` over `contain 0% contain 5%`.
  - Then open the clip from 5% to 18% with `animation-timing-function: cubic-bezier(.65,0,.35,1)` on the keyframe.
- **Hide the panel until the window is wide.** `.v2-fac__panel { animation: v2-fadeup linear both; animation-timeline: --fac; animation-range: contain 14% contain 20% }`. This removes the clipped words.
- **Fallback** for `@supports not (animation-timeline: view())`: an IO at `threshold: .5` toggles `[data-open]`, with `transition: clip-path 1.1s cubic-bezier(.65,0,0,1)`.
- **Reduced motion:** the full photo.
- **Mobile:** run the same thing on the first crop only (`.v2-fac__card:first-child .v2-fac__crop`). The other three take a plain fade, which removes the 9× repetition.
- **Hero, in the same pass:**
  - Fix F1b's specificity.
  - `.v2-hero__stage { aspect-ratio: auto; inline-size: min(78vw, 1120px); }` with content capped at `max-inline-size: 640px`. The bag stops being a card and becomes the ground.
  - Send the chip behind the content: `.v2-bag__at-slot { z-index: 1 }` under `.v2-hero__content { z-index: 2 }`, and change the keyframe end to `translate(-140px, 70vh) rotate(35deg)` so it falls beside the h1, not over it.

### U2. Turn the toy's output into something people forward (the share mechanic; fixes F9)
- **`printBag.ts`:**
  - Fix the hole: after the `destination-out` cut, draw the slot back in. Either `c.globalCompositeOperation = 'destination-over'` and fill `#0f1b3d`, or better, `drawImage` the `/images/hero.webp` crop through the slot, the way the hero does. The factory shows through the handle.
  - Bake in the two-plate look: draw the name first in `#3b6fa0` at `(+7, -5)` with `globalAlpha .28`, then the ink at full opacity.
  - Put the logo (`logo-inv.png`, 160 px wide) under the caption.
  - Bag at 74% of the canvas width.
- **Share, not just download:**
  - If `navigator.canShare?.({ files: [file] })`, call `navigator.share({ files: [file], text: 'اسم محلنا على شنطة البركة بلاست' })`. Otherwise fall back to the download.
  - Label: «ابعت الصورة على واتساب» on touch devices, «احفظ صورة الشنطة» on desktop.
- **Make the press physical:**
  - The stage bag dips `translateY(0 → 3px → 0)` over 180 ms as plate 1 lands.
  - Name size `clamp(28px, calc(170cqi / var(--len)), 76px)`.
  - The stage grows to `inline-size: min(480px, 100%)` on desktop. A 76 px name on a 480 px bag is a screenshot. A 60 px name on a 400 px bag is a form preview.

### U3. Give the catalogue a different verb and axis (kills the mobile repeat and the grid slop)
- **Mobile (< 720 px): an RTL snap rail.**
  - `.v2-prod__grid { display: grid; grid-auto-flow: column; grid-auto-columns: 82vw; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px; overscroll-behavior-x: contain }` and `.v2-pcard { scroll-snap-align: center }`.
  - Add the existing `<Colorbar on={i}/>` under the rail as a 5-patch position cue. Update it from a `scroll` handler: `i = Math.round(Math.abs(el.scrollLeft) / el.firstElementChild.offsetWidth)`; `Math.abs` covers Chrome's negative RTL `scrollLeft`.
  - Remove the per-card wipe on mobile.
  - Section height drops from 3,501 px to about 1,000 px, and the phone gets a **swipe** verb it has nowhere else.
- **Desktop (≥ 1100 px): replace the five identical wipes with one proof-sheet moment.**
  - All five photos sit on one `#f4f6f8` matte with crop marks, which unifies the three grounds (F6).
  - On enter, the four colour-bar patches (`.v2-bag__bar` style, 14 px) march across the sheet right→left in 600 ms. Each card's photo goes from `filter: grayscale(1) contrast(1.1)` to full colour as the bar passes. Use a 90 ms stagger by DOM order, and transition `filter` only on the `<img>`; with 5 small images that is acceptable.
  - Hover a card: its photo shows `clip-path: inset(... round 999px)` → `inset(0)` in 260 ms. That is the handle-slot shape as the hover grammar, tying the catalogue to the hero.
  - Reduced motion: colour photos, no bar.

Smaller fixes after these three:
- **Who:** two drawn bag stacks (6 nested bags vs 1 branded bag) instead of the 56 px glyphs, or make it deliberately still.
- **FAQ:** a hover state, e.g. the mark rotating 15° and the row tinting `rgba(15,27,61,.04)`.
- **Contact:** a sheet travel of 90 px reads as a nudge; make it 160 px over `entry 0% entry 80%`.
- **Mobile close:** `--k: .34` so all 5 names stay inside 390 px.

## STATUS
**FAIL on dimension 11 (6.5/10 < 8). Dimension 12: 6/10.** Up from 5 / 5. The round-1 BROKEN (F2) is fixed and the toy is now real.
- **BROKEN:** F1b. The hero's pause rule is overridden by the later `animation` shorthands, so the sub, CTA, die and chip run before `data-play` and ahead of the h1 (`v2.css:297` vs `304–308`; `desk-hero-slow/log2.txt` n0; heroProbe T=2028).
- **WEAK:**
  - F1, hero climax scale (slot about 1% of the screen; bag 43% of the width).
  - F8, the factory window opens off-screen, so the handle never reads.
  - F9, the saved PNG has a transparent hole and no brand.
  - The mobile Factory→Products repeat (9 identical image reveals).
  - The Products grid wipe, Who, FAQ and Contact (decoration-level).
  - F6 remainder: mixed photo grounds.
- **POLISH:** F10 (chip over the h1; mobile close clipping).
- **Shareable moment:** none yet. U1, "through the handle" done on screen, and U2, "your bag, forwarded", are the two candidates.
