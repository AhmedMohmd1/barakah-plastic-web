# Critic A: impression and motion (round 2)

Target: http://127.0.0.1:4173/v2 (production build, `vite preview`). Lens: would a demanding Egyptian bag-factory owner and his B2B buyers be impressed? All captures are in `docs/landing/critics/r2/A-shots/`.

## Captures and measurements
- **Real-time time-lapse**
  - 1440×900: `1440x900-t{300,800,1400,1600,1700,1800,1850,1950,2100,2800,6000}.png`
  - 390×844: `m/390x844-t{300,800,1400,1700,1850,2100,2800,6000}.png`
- **Deterministic climax frames**: after load, every hero animation was paused and seeked to the same t, which is the designed timeline.
  - Desktop: `seek/1440x900-seek-{0…2500}.png` plus a `-zoom.png` of the slot for each.
  - Mobile: `seek/390x844-seek-{900…2500}.png`.
- **Animation clock** (Web Animations `startTime + delay`, plus `performance.now()` at hero mount, at `fonts.ready` and at `data-play`):

  | Event | Desktop, normal network (ms) | 390 mobile, throttled 1.6 Mbps / 150 ms (ms) |
  |---|---|---|
  | Hero mounts | 557 | 2104 |
  | Fonts ready | 1950 | 3205 |
  | `data-play` set | 1981 | 3251 |
  | **Sub fades in** | **1754** | **3217** |
  | **CTA fades in** | **1854** | 3317 |
  | **h1 starts rising** | **2487** | **3833** |
  | Die falls | 2554 | 4017 |
  | Chip falls | 2754 | 4217 |

- **CTA states**
  - Hover: `cta/1440x900-hover.png`. The copies sit at `matrix(.9986,-.052,…,-40,28)` and `(-20,14)`.
  - Real keyboard focus: `cta/1440x900-tabfocus.png`. Reached after 9 Tabs. `:focus-visible` is true, and the ring is 2px navy at a 3px offset.
  - `cta/1440x900-focus.png` was taken with programmatic `.focus()`. It does not trigger `:focus-visible`, so ignore it.
- **Sections**: `sec/1440x900-00…10.png` and `msec/390x844-00…10.png`. The 1280 hero is `1280x800-00.png`.
- **Geometry**
  - 1440: stage [410,128 → 1030,872] = 620×744 (portrait 0.83), which is **35.6 % of the first screen**. h1 46px in 2 lines. CTA bottom 684.
  - 1280: stage [372–908], caption [939–1240] (no overlap). Patch bottom 264 < opener top 310. h1 39px in 2 lines.
  - 390: CTA bottom 586 < 844. h1 30px.
- No horizontal overflow at 1440, 1280 or 390.
- While the hero CTA is on screen, the header CTA has opacity 0 and width 0.

## Round-1 findings: fixed or not
| R1 | Finding | Status | Evidence |
|---|---|---|---|
| F1 | Climax can't be read | **Fixed on the designed timeline, broken in real loads (see N1)** | Seeked frames now read: a steel ring drops in view (`seek-1650-zoom`), sits on the slot (`-1800-zoom`), the hole opens and the chip falls (`-2000-zoom`, `-2200-zoom`). In real time the die lands while the headline is still rising, and the chip falls across it (`1440x900-t1400.png`, `m/390x844-t1400.png`). |
| F2 | Headline arrives last | **NOT FIXED in production** | Sub and CTA start 733 ms (desktop) and 616 ms (mobile) *before* the h1. `1440x900-t800.png` shows sub, CTA and note in the fallback font with an empty h1 slot. `m/390x844-t800.png` shows sub and CTA complete while the h1 is still on line 1. Cause: N1. |
| F3 | Reads as a card, not a bag | **Partial** | Portrait 5:6, back ply, seals and rib are visible (`1440x900-t2800.png`). Still reads as UI: the dashed patch is a bordered box, and at rest the slot holds a raised pill with a drop shadow that looks like a button (N4). |
| F4 | Breaks at 1280×800 | **Fixed** | `1280x800-00.png` plus the 1280 geometry above. |
| F5 | Payoff shows nothing | **Partial** | The film tower is now framed in the hole (`seek-2500-zoom`). It is grey-blue, not "in colour" as SUMMARY says. |
| F6 | Ad creatives used as proof | **Fixed** | `sec/1440x900-03.png`, `msec/390x844-03.png`: real printed customer bags (MORA STORE, DOLCE SHOES). |
| F7 | One factory photo used 4× | Open (asset-blocked) | `sec/1440x900-02.png`, `msec/390x844-02.png` |
| F8 | Two orange CTAs on one screen | **Fixed** | Header CTA is absent in `sec/1440x900-04.png` (try) and `sec/1440x900-09.png` (close). Step markers are blue (`sec/1440x900-06.png`). |
| F9 | "Who it's for" is a template | **Partial** | The icons are now bag line drawings, but it is still two white cards with dash bullets (`sec/1440x900-05.png`). |
| F10 | Copy register and evasive answers | Open (copy is DRAFT) | The FAQ is still formal MSA («كيف أطلب؟», «ما الحد الأدنى للطلب؟»: `sec/1440x900-06.png`). The footer still has «ziplock bags - اكياس ذات غالق» (`sec/1440x900-10.png`). There is no MOQ number. |
| F11 | CTA coupling faint, nothing on touch | **Partial** | On desktop the fan now reads (`cta/1440x900-hover.png`). There is still no touch equivalent: `v2.css:293-294` only fires on `:hover` / `:focus-visible`. |
| F12 | Footer wordmark stroke artifacts | **Mostly fixed** | The stroke is 0px. Faint seam dots remain at the glyph joins (N7). |

## Rubric scores (quality-bar §3)
| # | Dimension | R1 | R2 | Why |
|---|---|---|---|---|
| 1 | Concept ownership | 7 | **7.5** | The bag now recurs with meaning: the factory opens through the handle slot, the who-section icons are bags, and the close is a stack of name-printed bags (`sec/1440x900-09.png`). The name is still swappable with any «… بلاست». |
| 2 | Hero presence | 7 | **7.5** | Portrait bag, dominant 2-line headline, unmissable orange CTA. But the object is 35.6 % of the screen (under the 40 % target), and the patch box plus the raised resting pill still say "UI". |
| 3 | Motion storytelling | 5 | **6** | The designed sequence is now a real punch. In production the clocks are split (N1): sub and CTA come first, the punch lands mid-headline, the chip covers the h1, and die and chip run on mount, not "when seen". |
| 6 | Composition & rhythm | 6 | **7** | The products are a proper photo grid, the FAQ has a sticky title column, and the how-to is a split header plus a rail. "Who" is still a card pair, and the manifesto leaves the left 40 % empty (`sec/1440x900-01.png`). |
| 7 | Proof & assets | 5 | **6** (asset-limited) | Real printed customer bags. Still one factory frame, no owner, no MOQ, no testimonials. |
| 8 | Conversion clarity | 6 | **7.5** | One orange CTA per screen on desktop, a mobile dock, and the try-your-name CTA. MOQ and lead time are still evasive. |
| 10 | Mobile | 7 | **7** | The CTA is above the fold and the dock works. But the N1 order bug is worst here: the chip covers line 1 of the headline (`m/390x844-t1400.png`), and there is no CTA coupling on touch. |

**Hero score: 7.5 / 10.**
**Page score: 6.9 / 10** (average of the 7 dimensions). **Without dimension 7: 7.1 / 10.**

## New findings (ranked)

**N1 · BROKEN: the hero has two clocks, so the story plays out of order and not "when seen"**
- **Evidence**:
  - The clock table above.
  - `1440x900-t800.png`: sub and CTA shown in the fallback font with no h1.
  - `1440x900-t1400.png`: the chip covers «على كل» while the h1 settles.
  - `m/390x844-t1400.png`.
- **Cause** (`src/v2/v2.css`):
  - Line 297 is `.v2-hero:not([data-play]) .v2-a { animation-play-state: paused }`, with specificity (0,3,0).
  - Lines 304–309 are `.v2-hero .v2-hero__sub.v2-a`, `.v2-hero__ctas.v2-a`, `.v2-hero__note.v2-a`, `.v2-bag__die.v2-a`, `.v2-bag__chip.v2-a` and `.v2-jolt.v2-a`. These are also (0,3,0) and come later.
  - Their `animation` shorthand therefore resets the play state to `running`.
  - Measured result: before `data-play`, `getAnimations()` reports the h1 as `paused` and the sub, CTA, die and chip as `running`.
- **Effect**:
  - The sub and CTA start at mount.
  - The punch lands while the headline is still rising.
  - If someone deep-links (`#faq`) and scrolls up, the punch has already happened unseen.
  - The sub and CTA also render before `fonts.ready`, so they swap fonts.
- **Fix** (one line): `.v2-hero:not([data-play]) .v2-a, … { animation-play-state: paused !important; }`. Alternatively, raise the selector to `.v2-hero:not([data-play]) .v2-a.v2-a`.
- **Re-check**: run the clock probe again. Every hero animation should start within one frame of `data-play`.

**N2 · WEAK: the falling chip crosses the headline even on the designed timeline** (`seek/1440x900-seek-2500-zoom.png`: a white pill sits over «على كل» for about 300 ms)
- Fix:
  - Send the chip behind the text column. Give `.v2-bag__at-slot` `z-index: 1` under `.v2-hero__content` (`z-index: 2`).
  - Or shorten `v2-chip` to `translateY(34vh) rotate(18deg)` and fade it out from 55 %, so it is gone before it reaches the opener.

**N3 · WEAK: from 1–2 m away the die reads as a "button press", not a steel cut** (`seek/1440x900-seek-1800.png`)
- The light 4px ring on white film looks like a slightly bigger pill.
- Fix:
  - Darken the rule: `border-color: #8793a6 #4f5b70 #3d4859 #6b778b`.
  - Add the narrow dark board above it, as proposed in R1: `.v2-bag__die::before { inset: -20px -12px auto; block-size: 14px; background: #2a2f3a; border-radius: 3px }`.
  - Add a 60 ms white flash on the slot edge at impact.

**N4 · WEAK: before the punch, the slot holds a raised button** (`1440x900-t800.png`, `seek/1440x900-seek-1600-zoom.png`, `m/390x844-t800.png`)
- Cause: `.v2-bag__chip` has `0 8px 16px -4px rgba(3,8,24,.4)` at rest, and `both` fill makes it opaque from t=0.
- On a white bag the slot reads as a UI toggle, which pushes the hero back toward "card".
- Fix: at rest, the chip should be flush film. Use only `inset 0 0 0 1px rgba(15,27,61,.16)`, and add the drop shadow inside `@keyframes v2-chip` from 5 % onward.

**N5 · WEAK: the signature object fell below the stage share** (35.6 % at 1440×900, against R1's 48.5 % and the 40–60 % bar)
- Fix:
  - `.v2-hero__stage { top: 40px; bottom: 16px }` gives about 40 %.
  - On ≥1280 wide, let the "front" bag widen to `aspect-ratio: 6/7`.
  - Or show the two copies peeking 24/48 px at rest, so the stack (the "abundance" of «البركة») owns more of the screen without the front panel turning back into a square card.

**N6 · WEAK (carried over): "Who it's for" is still the one template section** (`sec/1440x900-05.png`, `msec/390x844-05.png`)
- Fix: replace the two cards with two bag objects from `<Bag size="sm">`. Use a wholesale stack of 3 plain bags and a single bag printed «براندك». Set each bag's bullets as print text on the bag, not in a card.

**N7 · POLISH: faint seams in the footer wordmark** (`sec/1440x900-10.png`, lighter dots at the joins near x≈270, 645, 908, 1083, y≈878)
- Cause: the semi-transparent fill (`rgba(255,255,255,.08)`) doubles its alpha where Cairo's contours overlap.
- Fix: use an opaque colour precomputed over `--deeper`, e.g. `color: #1c2645`.

**N8 · POLISH: the payoff window is grey** (`seek/1440x900-seek-2500-zoom.png`)
- Fix: on `.v2-hero__window`, add `filter: saturate(1.25) brightness(1.15) contrast(1.05)` and aim it at the lit film bubble. The "you see where your bag comes from" moment needs to pop against the navy veil.

**N9 · POLISH: on hover or focus, the copies block the payoff window** (`cta/1440x900-tabfocus.png`: the hole shows half photo, half grey copy)
- What happens: the copies shift left, their own holes shift with them, and the front hole then shows grey film.
- Fix: put `.v2-hero__window` above the copies (between the copies and the front panel), or clip the copies' tops to `top: calc(var(--slot-top) + var(--slot-h) + 8px)`.

**N10 · POLISH: there is no CTA coupling on touch** (`v2.css:293-294` is hover/focus only)
- Fix: on `(pointer: coarse)`, fan the copies once, 400 ms after the chip lands. Then return them; it plays once and stops.

## Single biggest lever
**Fix N1: one line of CSS specificity.**
- Today the sequence the page was built around (headline, then sub, then CTA, then punch) never plays in production. The CTA beats the headline by about 700 ms, and the punch is spent while the headline is still rising.
- With all hero animations on the `data-play` clock, the round-2 work shows: the ring drops, cuts, and the chip falls out. That is worth about +1.5 on dimension 3 and about +0.5 on the hero.
- Then N2 to N4, all small `v2.css` edits, give the punch the weight and the clean surface that hero ≥ 8.5 needs.

## STATUS
**FAIL.**
- Hero 7.5 (bar 8.5). Page 6.9, or 7.1 without dimension 7 (bar 8).
- One BROKEN: N1, where the R1 F2 fix is defeated in production.
- Dimension 7 stays asset-blocked: still needs factory frames (press, cutter, cartons), the owner, and MOQ / lead-time numbers.
- Clear progress since round 1:
  - The climax is legible on its designed timeline.
  - The 1280 layout is fixed.
  - Proof photos are real.
  - One orange CTA per screen.
