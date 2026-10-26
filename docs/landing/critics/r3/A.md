# Critic A: impression and motion (round 3, final)

Target: http://127.0.0.1:4173/v2 (production build, `vite preview`, not rebuilt). Source read only. Lens: would a demanding
Egyptian bag-factory owner and his B2B buyers be impressed? Copy is a DRAFT and is not scored.
All captures are in `docs/landing/critics/r3/A-shots/`.

## Method and captures
- **Real-time load, slowed to 1/10 speed.** Other critics were running Chrome at the same time, so plain screenshots took 1–4 s each and screencast gave only 9 frames.
  - Instead, the CDP `Animation.setPlaybackRate(0.1)` was set before navigation. Load, fonts and the `data-play` gating stay real-time.
  - Each frame is labelled with its true animation time in ms after `data-play`. Frames land about every 150–250 ms of animation time from 0 to 3.7 s.
  - `load/1440x900-a*.png`, `load/1280x800-a*.png` (+ `load/sheet-1280.png`), `load/390x844-a*.png` (+ `load/sheet-390.png`). Each set also has a `*-pre0-*` frame from before `data-play`.
- **Clock probe.** A script injected at document start logs, on every animation frame:
  - hero mount, `fonts.ready`, the `data-play` time and which fonts were loaded at that moment;
  - the first and last frame each element changes;
  - `getAnimations()` start times (`startTime + delay`).
  - Runs: 1440 ×3, 1280, 390, and 390 throttled (1.6 Mbps / 150 ms, cache off).
- **Paused/seeked climax.** After load, every hero animation is paused and seeked to the same t. Full frames are `seek/{1440x900,390x844}-seek-{0,1800,2100,2800}.png`. Slot zooms are in `seek/sheet-1440-zoom.png` (t = 1600…2800) and `seek/sheet-390-zoom.png`.
- **Wheel scroll of the whole page** (real `mouseWheel` events): `scroll1440/00…20` (+ `sheet-scroll1440-{a,b}.png`) and `scroll390/00…24` (+ `sheet-scroll390-{a,b}.png`).
  - Fine steps through the factory pin: `detail/fac-00…11` (`detail/sheet-fac.png`).
  - Product card at rest and on hover: `detail/sheet-prod.png`.
- **CTA states.**
  - Rest, hover and real keyboard focus: `cta/1440-{rest,hover,tabfocus}[-zoom].png` and `cta/sheet-cta.png`.
  - Touch fan on a coarse pointer (seeked): `cta/390-fan-{2750,3200,3500,3900,4250}.png` and `cta/sheet-fan.png`.
- **Geometry** at 1920×1080, 1440×900, 1366×768, 1280×800, 768×1024, 390×844 and 360×640.
- No form was touched. `*sheetdb.io*` was blocked in every run.

### Clock: one clock, h1 first (round-2 N1)
Animation start times are in ms relative to `data-play` (Web Animations `startTime + delay`). The visual first-change from the probe agrees within one frame.

| Event | 1440 clean | 1440 (load under contention) | 390 | 390 throttled |
|---|---|---|---|---|
| mount → `data-play` | 851 → 2170 | 547 → 2061 (**fallback timer**) | 841 → 2580 | 2151 → 3346 |
| Cairo 800 loaded at `data-play` | yes | **no** (fonts ready at +195) | yes | yes |
| stage rise | +32 | +32 | +32 | +32 |
| **h1 rises** | **+482** (done +1182) | +551 | +482 | +482 |
| ghost plate | +732 | — | — | — |
| sub | +832 | +920 | +877 | +913 |
| CTA | +932 | +1034 | +981 | +1013 |
| note | +1032 | +1124 | +1084 | +1113 |
| die drops | +1632 | +1701 | +1676 | +1713 |
| flash / slug / jolt | +1822 / +1832 / +1832 | +1883 / +1899 | +1872 / +1876 | +1896 / +1915 |
| touch fan (coarse only) | — | — | +2826 | +2863 |

- In R2 the sub and CTA ran 733 ms *before* the h1.
- Now every hero animation starts within about 35 ms of `data-play`. The h1 starts 350 ms before the sub, and the h1 has finished before the die drops.
- Frames confirm it:
  - `load/1440x900-a0593.png`: h1 line 1 is in, line 2 is rising, and the sub and CTA are not yet visible.
  - `-a0875`: h1 done with the ghost plate, sub in, CTA still faint.
  - `-a1638`: all copy is set and the die enters.
  - `-a1863`: the die is seated.
  - `-a2046`: the slug drops behind the film.
  - `-a3707`: the factory shows through the hole.

### Geometry
| Viewport | Bag stage | Share of screen | Share of hero area | h1 | CTA bottom |
|---|---|---|---|---|---|
| 1920×1080 | 830×968 | 38.7 % | 41.5 % | 56 | 782 |
| **1440×900** | 676×788 | **41.1 %** (R2: 35.6 %) | 44.7 % | 51 | 685 |
| 1366×768 | 562×656 | **35.1 %** | 38.8 % | 41 | 605 |
| 1280×800 | 590×688 | 39.6 % | 43.6 % | 43 | 623 |
| 768×1024 | 720×864 | 79.1 % | 85.1 % | 54 | 727 |
| 390×844 | 358×640 | 69.6 % | 74.9 % | 30 (3 lines) | 562 |
| 360×640 | 328×524 | 74.6 % | 82.3 % | 30 | **521** (≤ 640 ✓) |

- There is no horizontal overflow at any size; `scrollWidth` equals the viewport width.
- While the hero CTA is on screen, the header CTA has `visibility: hidden`.
- At 1280 the "background" caption starts 4 px from the bag's edge (`capGap 4`).

### CTA states
- **Hover (1440):** the copies go from rest `(-12,8) −0.8°` / `(-24,16) −1.6°` to fan `(-28,16) −2°` / `(-56,30) −4°`. The button turns to `#ff8a1f`. The fan reads clearly as a stack fanning out behind the bag (`cta/1440-hover.png`). The copies return on mouse-out.
- **Keyboard:** the CTA is reached after 9 Tabs. `:focus-visible` is true, with a 2 px solid navy ring at a 3 px offset, and the same fan plays (`cta/1440-tabfocus.png`). The hole keeps showing the photo, not grey copy film (`cta/sheet-cta.png`), so R2-N9 is fixed.
- **Touch (390, `pointer: coarse`):**
  - A one-shot fan runs from +2.75 s to +4.3 s, peaking at `(-28,22) −3.2°` / `(-14,12) −1.6°`.
  - On screen it is nearly invisible. The bag sits 16 px from the left edge, so the copies slide into a 16 px gutter and off-screen (`cta/390-fan-3500.png`).
  - It is also not tied to the CTA.

## Round-2 findings: fixed or not
| R2 | Finding | Status | Evidence |
|---|---|---|---|
| N1 | BROKEN: two clocks, story out of order and not "when seen" | **Fixed** (order) / partial ("when seen", see W1) | Clock table: all on `data-play`, h1 +482 before sub +832 and CTA +932. Frames `load/1440x900-a0593 / a0875 / a1638`. `v2.css:346` now has `!important`. |
| N2 | Falling chip crosses the headline | **Fixed** | The slug flips under the panel at impact and is seen only through the hole (`seek/sheet-1440-zoom.png`, t = 1850–2200; mobile likewise). |
| N3 | Die reads as a button press | **Fixed** | The dark steel rule sits in a dark board with posts. At t = 1800–1900 it reads as tooling, not UI (`seek/sheet-1440-zoom.png`), and it holds at 390. |
| N4 | Raised button in the slot before the punch | **Fixed** | Flush film with a faint die line at rest (`load/1440x900-pre0-*.png`, `seek/…-1600-zoom`). |
| N5 | Bag below 40 % of the first screen | **Fixed at 1440** (41.1 %), partial elsewhere | 1280: 39.6 %, 1920: 38.7 %, 1366×768: 35.1 %. Copies now peek at rest, so the stack reads as more than one bag. |
| N6 | "Who" is a template card pair | **Fixed** | Two printed bags: a fanned wholesale stack and a «براندك» mark (`scroll1440/13-…`, `14-…`, `scroll390/12-…`, `13-…`). |
| N7 | Footer wordmark seams | **Fixed** (wordmark removed) | Print slug with a register mark, ink patches and a ribbed band (`scroll1440/19-y13098-v2-foot.png`). |
| N8 | Payoff window is grey | **Partial** | `saturate(1.25) brightness(1.15)` is applied. The window shows the film tower and machinery, but the crop is still mostly neutral grey-white, so it reads as "factory" without a colour pop (`load/1440x900-a3707.png`). |
| N9 | Copies block the payoff window on hover/focus | **Fixed** | `cta/sheet-cta.png` |
| N10 | No CTA coupling on touch | **Partial** | A one-shot fan exists on coarse pointers but is barely visible at 390 (W2). |
| R1-F7 | One factory photo used everywhere | Open (asset-blocked) | |
| R1-F10 | Copy register / MOQ | Open (copy is DRAFT) | |

## Scores
| # | Dimension | R2 | R3 | Why |
|---|---|---|---|---|
| 1 | Concept ownership | 7.5 | **8** | The bag recurs with meaning in every section: hero slot → factory opened from the same 196×64 pill → product photos resting in the handle pill → try-your-name bag → printed "who" bags → closing stack with the visitor's name → footer print slug. |
| 2 | Hero presence | 7.5 | **8.5** | The portrait bag owns 41 % of a 1440 screen with the stack peeking. The rest state is a clean film surface with no UI pill, and the headline dominates. Held back by the modest payoff window (N8) and 35 % on 1366×768. |
| 3 | Motion storytelling | 6 | **8** | One clock, the right order, and a punch that reads as steel → slug → factory. The factory section opens from the same slot with the same die. Deductions: the punch can fire unseen (W1), the die drops out from under the nav (P1), the touch fan is invisible (W2), and the factory pre-roll has dead air (P2). |
| 6 | Composition & rhythm | 7 | **8** | "Who" is now objects, products are a proof sheet with a pill→full hover (`detail/sheet-prod.png`), the manifesto is centred, and deep grounds alternate. The factory pre-roll leaves about one screen of near-empty navy. |
| 7 | Proof & assets | 6 | **6** (asset-blocked) | Real printed customer bags. Still one factory frame, no owner, no MOQ or lead time. |
| 8 | Conversion clarity | 7.5 | **8** | One orange CTA per screen. The nav CTA hides without shifting the layout, plus a mobile dock, the try-your-name CTA and the close CTA. |
| 10 | Mobile | 7 | **8** | The bag is 70 % of the first screen, plays in order, has its CTA above the fold even at 360×640, shows 3 whole bags in the close, and nothing overflows. The touch fan is invisible. |

- **Hero: 8.5 / 10** (R2: 7.5).
- **Page: 7.8 / 10** (average of the 7 dimensions; R2: 6.9).
- **Page without dimension 7: 8.1 / 10** (R2: 7.1).

## New findings (ranked)
No BROKEN findings.

**W1 · WEAK: the "play when seen" gate has an unconditional 1.5 s fallback** (`Hero.tsx:33`, `setTimeout(go, 1500)`; the comment says 4 s)
- **Evidence**:
  - I scrolled to y = 6000 right after mount. `data-play` was still set at mount + 1.24 s, and the die, slug and h1 animations were `finished` by the time the hero could be seen again.
  - In one 1440 load the fallback fired before Cairo had loaded (`cairoAtPlay: false`). Cairo arrived 195 ms later, just before the h1 moved, so there was no visible swap this time. On slower links the h1 can rise in the fallback face and swap.
  - Chrome restores scroll on reload, so reloading mid-page spends the punch off-screen.
- **Fix**: in the fallback, call `go()` only if `heroRef.current.getBoundingClientRect().bottom > 0` and `top < innerHeight`; otherwise leave the IO armed. Raise the timer to the 2.5–4 s the comment intends, and fire it from `fonts.ready` or that timeout, whichever comes first.

**W2 · WEAK: the touch fan is invisible on phones** (`v2.css:333-343`, `cta/390-fan-3500.png`)
- **Evidence**: at 390 the bag starts 16 px from the left edge. The phone `--fan` values (−14 / −28 px x) push the copies into that gutter and off-screen, so the peak looks the same as rest.
- **Fix**: on phones, fan up instead of sideways. There are about 40 px of deep ground above the bag. Use `--fan: translate(-6px, -14px) rotate(-1.6deg)` and `translate(6px, -26px) rotate(1.8deg)`, so the copies rise above the top edge like a pulled stack. Optionally replay it once when the CTA is pressed (`:active`).

**P1 · POLISH: the steel die drops out from under the fixed header** (`seek/sheet-1440-zoom.png` t = 1650–1750, same at 390)
- **Evidence**: the die starts at `translateY(-72px)` from a slot whose top is only 40 px below the bag top. The bag top is 24 px under a 72 px header (desktop) and 40 px under a 60 px header (390). For the first ~40 % of the fall the board and the top of the ring are hidden behind the nav, so it looks as if the die comes out of the header.
- **Fix**: start the die at `translateY(-40px)` (fade in from 0 to 6 %, as now). Or raise the hero stage's z-order above the header for the 700 ms of the die (`.v2-hero[data-play] .v2-bag__at-slot { z-index: 60 }` inside a non-isolated context). The simplest fix is the shorter drop.

**P2 · POLISH: the factory pre-roll is about one screen of dark navy with a dark pill** (`detail/fac-00…05`, `scroll1440/03-y2100-factory.png`)
- **Evidence**: before the die lands (rel −450 … +150 px of scroll), the window pill shows the dark ceiling of the photo. It reads as a black capsule floating in navy, not as a hole onto the factory.
- **Fix**:
  - Aim the starting `--tx/--ty` of `.v2-fac__cam` at the lit film tower, the same crop as the hero window (`-122px -188px / 1100px`). The pill then shows the same view the visitor just saw in the hero hole.
  - Shorten the pre-roll from 60vh to about 30vh, or start `v2-fac-die` at `entry 80%` instead of `contain 0%`.

**P3 · POLISH: the payoff window is still neutral (R2-N8 partial)** (`load/1440x900-a3707.png`, `seek/…-2800-zoom`)
- **Fix**: move the crop to frame an operator's blue uniform against white film, which gives the most colour this photo has. Alternatively, add a faint warm grade only inside the window (`filter: saturate(1.4) brightness(1.15) sepia(.08)`), so the "in colour" beat contrasts with the grayscale backdrop.

**P4 · POLISH: on 1366×768 the bag is 35.1 % of the screen** (1366 is the most common Egyptian office-laptop width)
- **Fix**: on `(min-width: 1100px) and (max-height: 800px)`, set `aspect-ratio: 7/8` and `top: 16px`. That gives about 38–40 % without the bag turning back into a square card. Or let the rest-state copies peek 8 px more on desktop.

**P5 · POLISH: at 1280×800 the background caption almost touches the bag** (4 px gap, `load/1280x800-a3715.png`)
- **Fix**: hide `.v2-hero__caption` below 1320 px wide, or give it `max-inline-size: calc((100vw - stage) / 2 - 24px)`.

**P6 · POLISH (for C): `/v2#faq` does not land on the FAQ** (scrollY 0 after 6 s)
- **Fix**: after mount and `fonts.ready`, if `location.hash` matches an element, call `document.querySelector(hash)?.scrollIntoView()`.

**P7 · POLISH: the hero shows an empty bag for 0.7–1.3 s before the headline starts** (`load/*-pre0-*.png`; mount → `data-play` gap measured at 0.7–1.3 s)
- **Evidence**: only the opener is visible during that time, and the h1 then waits another 450 ms. It is on-concept (a blank bag about to be printed), but the h1 is only fully set about 2.5 s after the hero paints.
- **Fix**: cut the h1 delay from 0.45 s to 0.25 s and shift the rest of the timeline back by 0.2 s. Preloading Cairo 800 would also help, but `index.html` is shared with `/`, so log that for the owner.

## What still needs the owner (dimension 7)
- Factory frames: the print station, the die-cut punch and finished cartons.
- The owner at the factory door.
- Real customer quotes.
- The real MOQ and lead time.

## STATUS
**PASS** (with the asset-blocked dimension 7 excluded).
- Hero 8.5 ≥ 8.5.
- Page 8.1 without dimension 7, 7.8 with it.
- No BROKEN findings.
- The two WEAK findings (W1 unseen-play fallback, W2 invisible touch fan) are small `Hero.tsx` / `v2.css` edits and worth doing before launch.
