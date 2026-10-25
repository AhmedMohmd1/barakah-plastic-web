# Critic A: impression and motion (round 1)

Target: http://127.0.0.1:4173/v2 (production build). Lens: would this impress a demanding Egyptian bag-factory owner and his B2B buyers?
All screenshots are in `docs/landing/critics/r1/A-shots/`.

## Captures and measurements
- Real-time hero time-lapse at 1440×900: `1440x900-t{300,800,1400,1700,1850,2000,2800,6000}.png`. At 390×844: `m/390x844-t{300,1400,1800,2000,2800}.png`.
- Deterministic climax frames: after `data-play`, every hero animation was paused and seeked to t ms. Files: `seek/1440x900-seek-{0…2400}.png`, zooms of the slot in `seek/*-zoom.png`, mobile frames in `seek/390x844-seek-{1660,1700,1780,2000}.png`. The seek script uses `captureBeyondViewport` clips, which changed the viewport and so made the header CTA appear in those frames. That is an artefact of the capture, not a bug in the page.
- Sections: `sec/1440x900-00…10.png`, `msec/390x844-00…10.png`. Products list: `prod/prod-*.png`. 1280×800 hero: `1280x800-00.png`.
- CTA states: `cta/1440x900-hover.png`. Real keyboard Tab focus: `cta/1440x900-tabfocus.png` (9 Tabs, `:focus-visible` true, copies at `matrix(-28,24)` / `matrix(-14,12)`). Programmatic `.focus()` in `cta/1440x900-focus.png` did not trigger `:focus-visible`, so ignore that file.
- Geometry at 1440×900:
  - bag panel [317,88 → 1123,868] = 806×780, which is 48.5 % of the first screen and nearly square (1.03:1)
  - header bottom at 72, so there is a 16 px gap above the bag
  - slot [626,128] 188×56
  - die at rest: top 110
  - h1 58 px, 2 lines
  - CTA bottom 662
- Geometry at 1280×800: h1 52.5 px, **3 lines**. The caption pill [939–1240, 754–782] overlaps the bag [282–998, 88–768] by 59×14 px.
- LCP 1864 ms (the hero photo). CLS 0.021. No horizontal overflow at 1440, 1280 or 390.

## Rubric scores (quality-bar §3)
| # | Dimension | Score | Why |
|---|---|---|---|
| 1 | Concept ownership | **7** | Owned by the category: only a bag maker can say "the page is the bag". Not owned by the name: it would work unchanged for any bag maker in Egypt. «البركة» (abundance) only appears in the hover copies, which are barely visible. |
| 2 | Hero presence | **7** | The object is the stage (48 % of the screen), the headline dominates and the orange CTA can't be missed. But on desktop it reads more as a white sheet than a bag (F3), and at 1280 the layout crowds (F4). |
| 3 | Motion storytelling | **5** | The climax can't be read (F1). The reveal order is wrong: the CTA appears before the headline (F2). The payoff, the hole, shows nothing recognisable (F5). CTA coupling exists and works on keyboard. |
| 6 | Composition & rhythm | **6** | Good surface alternation, plus the pinned factory story and the toy. But "Who it's for" is a template card pair (F9), the FAQ leaves the left third empty, and the products list is airy and repetitive. |
| 7 | Proof & assets | **5** (asset-limited) | One factory photo is reused 4 times (F7). The product "photos" are social-media ad creatives (F6). There are no real customer bags and no owner. |
| 8 | Conversion clarity | **6** | The quote path is clear and WhatsApp is everywhere. But two orange CTAs share one desktop screen (F8), MOQ and lead time are evasive (F10), and orange is spent on step markers. |
| 10 | Mobile | **7** | CTA bottom at 578 < 844, h1 in 3 lines, and the portrait bag reads more like a bag than on desktop. The die pops out from behind the header (F1), and the headline-last reveal is most visible on phones (F2). |

**Hero score: 6.5 / 10. Page score: 6 / 10** (average of the 7 dimensions = 6.1; without dimension 7 = 6.3).

## Explicit answers
- **Is the concept owned by this business?** By its *category*, yes. A restaurant, a SaaS or a clinic could not use it. By *this* business, only partly. The specifics are the Qalyub address, "since 2011" and the factory photo, and all three are text or backdrop, not the idea.
- **Could the business name be swapped?** Yes. Replace «البركة بلاست» with any other «… بلاست» and nothing breaks. The logo (a bag silhouette with an orange wedge) isn't echoed by the hero object. «البركة» = abundance only lives in a 14/28 px hover offset.
- **Does the hero read as a BAG or as a white card on a dark background?**
  - Desktop: about 60/40 *card*. The panel is near-square (806×780).
  - Its top edge sits 16 px under the header, so the handle end, which is the most "bag" part, is jammed against the nav.
  - The side seals are 1 px at `rgba(15,27,61,.09)`, which can't be seen in the screenshots. The bottom rib is 6 % alpha.
  - The register marks read as UI crosshairs.
  - The only strong bag cue is the stadium slot plus its dashed patch.
  - Mobile (354×684, portrait): reads as a bag.
- **Is the die-punch climax legible in the time-lapse?** No.
  - Real-time time-lapse: not one of the 8 desktop frames caught the die.
  - Seeked frames: the die starts at top −40 and the header ends at 72. So 112 of its 150 px of travel happens *behind the header* (`seek-1650-zoom`, `390x844-seek-1700`: nothing visible). On mobile only 22 of 150 px is in view. The die then pops into existence.
  - It is an opaque navy 248×92 block with a pale pill outline that reads as a UI badge or toggle. It covers the slot for about 240 ms, so the cut itself is hidden (`seek-1760/1800/1850`).
  - The hole then cross-fades in as the die dissolves (`seek-1950/2150`). The chip is white film falling on white film.
  - What a visitor perceives: "a dark badge blinked over the handle and a picture faded in". They do not see a punch.

## Ranked findings

**F1 · BROKEN: the die-punch climax can't be read** (`seek/1440x900-seek-1650-zoom.png`, `-1760-zoom`, `-1850-zoom`, `-1950-zoom`, `-2150-zoom`, `seek/390x844-seek-1700.png`, `-1780.png`)
Fix in `src/v2/v2.css`:
- Move the drop into view. `.v2-hero__stage { top: 40px; }` (mobile `top: 28px`), and in `@keyframes v2-die` start at `translateY(-72px)`, not −150px, so the whole fall happens over the film below the header.
- Make the die a steel rule, not a block:
  - `.v2-bag__die { inset: -6px; background: none; box-shadow: 0 10px 18px -8px rgba(3,8,24,.45); }`
  - `.v2-bag__die::after { inset: 0; border: 3px solid #c9d2df; box-shadow: inset 0 0 0 1px #7d8aa0, 0 0 0 1px #7d8aa0; }`
  - Optionally add a narrow dark "board" band only above the ring: `::before { inset: -22px -14px auto; block-size: 16px; background: #2a2f3a; border-radius: 3px }`.
- Make the cut instant. Change the hold from 26–35 % to 26–30 %, lift with ease-out, and fade only after 80 %, so the open hole is seen *while* the die rises.
- Make the chip visible as it falls: `box-shadow: 0 10px 16px -6px rgba(3,8,24,.35), inset 0 0 0 1px rgba(15,27,61,.18)`, and `v2-chip` to `translateY(220px) rotate(18deg)`.
- Make the jolt felt: `v2-jolt` 40 % → `translateY(6px) scale(.996)`.

**F2 · BROKEN (first impression): the headline arrives last** (`1440x900-t800.png`, `m/390x844-t1400.png`: opener, sub, CTA and note are on screen with an empty gap where the h1 goes)
- Cause: only the h1 is `.v2-a`. It is held at `translateY(105%)` until `fonts.ready + 2 rAF + IO`, with a 4 s fallback (`Hero.tsx`). Everything else is static.
- Fix:
  - Add `v2-a` to `.v2-hero__sub`, `.v2-hero__ctas` and `.v2-hero__note`, with `animation: v2-fade .5s var(--ease-out) var(--d) both` (opacity 0→1, `translateY(8px)`→0). Use `--d` .85 s, .95 s and 1.05 s.
  - Drop the fallback from 4000 → 1500 ms.
  - Result: headline, then sub, then CTA, then the punch.

**F3 · WEAK: the hero reads as a white card, not a bag** (`1440x900-t2800.png`)
Fix in `v2.css`:
- `.v2-hero__stage { top: 40px; bottom: 24px; inline-size: clamp(520px, 50vw, 760px); }`. This gives a portrait-leaning panel with air above the handle.
- `.v2-bag__seal`: alpha .09 → .22, `inline-size: 3px`.
- `.v2-bag__rib`: alpha .06 → .14, `block-size: 18px`.
- Add a top lip on `.v2-bag__panel`: `box-shadow: inset 0 1px 0 #fff, inset 0 4px 0 rgba(15,27,61,.05)`.
- Add a faint bottom-corner gusset crease, for example two 1 px diagonal gradients 10 % in from each bottom corner.

**F4 · WEAK: the hero breaks at 1280×800** (`1280x800-00.png`)
- What happens: the opener touches the patch's dashed bottom edge (patch bottom 222, opener about 230). The h1 wraps to 3 lines with «اسم محلك» alone on line 1. The caption pill overlaps the bag corner by 59×14 px.
- Fix:
  - `@media (min-width:1100px){ .v2-hero__stage { inline-size: clamp(600px, 60vw, 860px) } }`
  - `.v2-hero__content { padding: calc(var(--slot-top)*2 + var(--slot-h) + 28px) 40px 88px; }` so it clears the 136 px patch.
  - `.v2-hero__caption { top: 16px; bottom: auto; }`, or hide it below 1440.

**F5 · WEAK: the climax payoff shows nothing** (`1440x900-t2800.png`: the hole shows a 188×56 crop of grey machinery)
- Fix: `.v2-hero__window { background-position: 20% 28%; background-size: 1100px auto; filter: saturate(1.15) brightness(1.1); }`. Aim it at the white film bubble on the blown-film tower, so the hole literally shows "where your bag comes from".

**F6 · WEAK: the product "proof" is ad creatives** (`prod/prod-1.png`, `prod/prod-3.png`, `sec/1440x900-03.png`)
- What it shows: banner ribbon, orange arcs, logo, an "ORDER NOW" pill that looks clickable, the mockup brand "SHOPPINGOO" and the typo "Spovan". All of it sits inside a "print proof" frame.
- A B2B buyer reads these as Instagram posts or stock mockups.
- Fix now: `.v2-prod` frame img `{ object-position: 50% 58%; scale: 1.45; }` crops to the bag and drops the banner and pill.
- Real fix: ask the owner for 5 straight photos of real printed customer bags, using the ART.md shot list as the brief.

**F7 · WEAK: one factory photo carries all the proof** (`sec/1440x900-02.png`, `msec/390x844-02.png`)
- `hero.webp` is used as the hero backdrop, the through-hole window, all 4 pinned "camera" steps (zoomed `s` 1.9–2.1, so soft) and both mobile crops.
- "أكثر من 5 خطوط إنتاج" is claimed over that same single frame.
- Fix:
  - Ask for 3–4 more real frames: printing press, punching/cutting machine (the real die!), packed cartons.
  - Until then, cap `s` at 1.4 in `FACTORY_STEPS` (`content.ts`).

**F8 · WEAK: two orange primary CTAs on one screen, and the action colour is diluted** (`sec/1440x900-04.png`, `sec/1440x900-09.png`)
- The header CTA stays visible next to «اطلب تسعيرة لهذه الشنطة» and next to the close CTA.
- Fix in `LandingV2.tsx`: observe the try-section and close CTAs in the same IO as the hero CTA (keep a Set of visible ones) and collapse `.v2-hdr__cta` when any is visible.
- Orange is also used for the product step markers (`prod-1.png`) and process step 5 (`sec/1440x900-06.png`). Set `.v2-prod .v2-reg, .v2-steps .v2-reg { color: var(--accent) }`. CONCEPT reserves orange for the quote action.

**F9 · WEAK: "Who it's for" is the one template section** (`sec/1440x900-05.png`: two white cards, lucide icons, dash bullets)
- It breaks the bag thread.
- Fix: replace the icons with `<Bag size="sm">` art. Wholesale gets a stack of 3 plain bags; brand gets 1 bag printed with «براندك». Keep the bullet copy.

**F10 · POLISH (copy): mixed register and evasive answers**
- Egyptian sections («ده مصنعنا»، «مين بيطلب»، «أسئلة بتتسأل كتير»، «جاهزين نطبع اسمك») sit next to formal MSA («قل لنا… ونرد عليك»، «كيف أطلب؟»، «ما الحد الأدنى للطلب؟»).
- The inherited catalog copy is generic: «أكياس شراء مخصصة عالية الجودة… مصنوعة من مواد متينة ، مثالية» (stray space before the comma), «اكياس سلوفان بشريطه», and the footer has «ziplock bags - اكياس ذات غالق».
- Fix:
  - Pick light Egyptian throughout, e.g. «إزاي أطلب؟»، «أقل كمية كام؟».
  - Rewrite the product blurbs with specifics: thickness range, print colours, handle type.
  - The owner must supply MOQ and lead-time ranges. The current FAQ answer «يختلف حسب…» is the first thing a buyer will distrust.

**F11 · POLISH: CTA coupling is faint and missing on mobile** (`cta/1440x900-hover.png`, `cta/1440x900-tabfocus.png`)
- Two copies at 14/28 px read as a paper stack, not "an order". There is no equivalent on touch.
- Fix:
  - Use 3 copies: `(-16px,14px) rotate(-.6deg)`, `(-32px,28px) rotate(-1.2deg)`, `(-48px,42px) rotate(-1.8deg)`, with a 60 ms stagger.
  - On coarse pointers, play the fan once 400 ms after the punch finishes. It stays finite.

**F12 · POLISH: the footer wordmark shows stroke artifacts** (`sec/1440x900-10.png`: small ovals and inner strokes where Cairo's contours overlap)
- Cause: `-webkit-text-stroke` on `.v2-foot__word`.
- Fix: `color: rgba(255,255,255,.05); -webkit-text-stroke: 0;`, or use an SVG outline of the logotype.

## Single biggest lever
**Re-stage the climax on a bag that reads as a bag** (F1 + F3 + F2 together, all in `v2.css` / `Hero.tsx`):
- Drop the stage 40 px so the handle end has air under the header.
- Turn the navy block into an outline steel-rule die that falls in full view onto the film.
- Cut instantly, with a visible chip and a 6 px jolt.
- Reveal the headline before the sub and CTA.

That one change turns "white card with a fading badge" into "my bag was just punched in front of me". That is the sentence the whole concept was sold on. Today a factory owner would not see it.

## STATUS
**FAIL.** Hero 6.5 is below the 8.5 bar, page 6 is below the 8 bar, and dimension 3 scores 5. Dimension 7 is partly asset-blocked: needs real customer-bag photos and more factory frames. F1 and F2 must be fixed before round 2.
