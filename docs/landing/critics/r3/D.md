# Critic D, round 3: wow and section variety

Lens: *sections that are not alike, each with a distinctive, impressive animation or interactive motion, and one shareable moment.*
Page: http://127.0.0.1:4173/v2 (the production build already being served). Copy is DRAFT and is not judged here.

## Method
- **Capture:** `critD3-cap.mjs` in the scratchpad (`C:\Users\AHMEDH~1\AppData\Local\Temp\claude\d--barakah-plastic-web\86bc40ec-ac8c-47df-9b47-fd93113ba7ab\scratchpad\`), using cdp.mjs with `*sheetdb.io*` blocked. **0 SheetDB requests**, and no form was submitted.
  - Scrolls with native CDP `mouseWheel`: 180 px steps at 1440×900 (72 frames) and 170 px at 390×844 (79 frames), with a 260 ms settle per step.
  - Interactions run inside the scroll:
    - Hovered and focused the hero CTA.
    - Typed «مخبز النور», switched all 4 inks, typed a phone number, and pressed save/share. Desktop: the anchor download was intercepted. Touch: `navigator.share` was stubbed and the file captured.
    - Hovered the product photos.
    - Hovered, then clicked, FAQ items 1 and 3.
  - Finer passes over the factory entry: 60 px steps on desktop, 85 px on mobile.
- **Extra probes:**
  - `critD3-heroslow.mjs`: hero at 0.25× via `Animation.setPlaybackRate` + `document.getAnimations()`.
  - `critD3-prod.mjs`: a MutationObserver timestamp on the proof sheet's `data-play`, plus real touch swipes on the rail.
  - `critD3-rail2.mjs`: rail swipes past the last card.
  - `critD3-jump.mjs`: scroll position before and after a focus or click.
- **Frames:** `D-shots/desk/`, `D-shots/mob/`, `desk-hero-slow/`, `desk-prod/`, `mob-prod/`. Logs: `desk/log.json` and `mob/log.json`, which include an animation-name census per section.
- **Contact sheets and zooms** (in `D-shots/`):
  - Desktop sheets: `desk-sheet-0-hero-slow`, `desk-sheet-1-hero-hover`, `desk-sheet-2-factory-handle`, `desk-sheet-3-mf-fac`, `desk-sheet-4-products`, `desk-sheet-5-try-who-how`, `desk-sheet-6-faq-contact-close`, `desk-sheet-7-prod-play-hover`, `desk-sheet-7b-prod-wheel`, `desk-sheet-8-try`, `desk-sheet-9-faq`, `desk-sheet-10-close-end`.
  - Zooms: `desk-zoom-fac-die`, `desk-zoom-try-press`.
  - Mobile sheets: `mob-sheet-1-hero-mf-fac`, `mob-sheet-fac-handle`, `mob-sheet-rail-try1`, `mob-sheet-try`, `mob-sheet-2-try-who-how-faq`, `mob-sheet-3-contact-close`.
  - Artefacts: `desk/saved-bag.png` and `mob/saved-bag.png`.

Measured (getBoundingClientRect):

| Element | R2 | R3 |
|---|---|---|
| Hero bag, desktop | 620 × 744 (43% of width) | **675 × 788 (47%)** |
| Hero slot | 196 × 64 | 204 × 72 |
| Toy bag, desktop | 400 × 500 | **480 × 600** |
| Toy name, desktop | 60 px | **76 px** |
| Toy bag, mobile | n/a | 320 × 400 |
| Toy name, mobile | n/a | 54 px |
| Page height, desktop | 13,264 | 14,052 |
| Page height, mobile | 15,960 | **13,696** |
| Products, mobile | 3,501 | **1,080** |
| Saved PNG | 1080×1350, hole at the slot | 1080×1350, **alpha min 255** (fully opaque) |

## Section by section

Columns: **Moment** (what is on screen), **Trigger**, and **Repeats previous?** (by mechanism, trigger, field or scale).

| # | Section | Moment (desktop / mobile) | Trigger | Repeats previous? | Verdict |
|---|---|---|---|---|---|
| 1 | Hero | Plays in order when seen (`desk-sheet-0-hero-slow` f0–f5): h1 lines rise, then the off-register ghost, then the sub and CTA, then the steel die drops, then the slot shows the factory in colour. CTA hover/focus fans the two copies (`desk-sheet-1` f2–f3, f6–f7). | load-when-seen + hover/focus | n/a | **OK, still small.** The sequencing is fixed. The climax still happens in a 204×72 slot (about 1% of the screen), on a bag at 47% of the width: a white card over a dark photo (F15). |
| 2 | Manifesto | Word fill over a sticky (`desk-sheet-3` f0–f4; `mob-sheet-1` f3–f7). | scroll-scrub | No | OK. Stock, but it fits. |
| 3 | Factory | **New on desktop:** the stage pins on navy. The hero's pill rides up, the steel die falls onto it, and the pill opens to full bleed (`desk-sheet-2-factory-handle` f0–f7, over about 600 px of scroll). The panel fades in after the window is wide, then the 4 camera stops play. Mobile: the first crop pops open from a pill (`mob-sheet-fac-handle` f2–f4); the other 3 just fade. | scroll-scrub → pin | No | **Strongest section; the match cut now happens on screen.** Two flaws: the slot already shows the factory *before* the die lands (F12), and on phones the die is never seen (F13). |
| 4 | Products | **Desktop:** one proof sheet on a film matte with crop marks. A colour bar marches across it, and the photos go from grayscale to colour (`desk-sheet-7b` f0–f1). Hover opens a photo from the handle pill to a full rectangle (`desk-sheet-7` f8–f11). **Mobile:** an RTL snap rail with a 5-patch cue. Real touch swipes go 1→2→3→4→5 (`mob-sheet-rail-try1`; scrollLeft −325/−660/−996/−1320). | enter once + hover / swipe | No. Mobile gets its **first horizontal axis**. | **OK.** The 9× repeat is gone, and the phone has a swipe verb. The ink-up fires early, so row 2 is already in colour before it is seen (F16). The oval rest crop cuts the logos (F17). |
| 5 | Try your name | Bigger stage. Plate wipe plus blue ghost at 76 px (`desk-zoom-try-press`); inks switch with a fresh press. The save button downloads a branded PNG on desktop. On touch it is labelled «ابعت الصورة على واتساب» and calls `navigator.share({files, text})` (captured: `baraka-plast-bag.png` plus «اسم محلنا على شنطة البركة بلاست»). | input + tap | Same plate-wipe primitive as How, different verb | **Strong. This is the page's shareable moment.** On phones the print lands off-screen while you type (F14). |
| 6 | Who | Two drawn bags with the copy printed on them. The wholesale stack fans out as you scroll (`desk-sheet-5` f6–f9; `mob-sheet-2` f7–f14). | scroll-scrub | Same object as the toy bag directly above (intended motif) | **OK for art direction, WEAK for motion.** The fan is about 36 px, so the section reads as still. |
| 7 | How to order | Dashed rail tears in, stations stamp in (unchanged; `desk-sheet-6` f0–f1; vertical on mobile, `mob-sheet-2` f16–f20). | enter once | No | OK, small. |
| 8 | FAQ | **New hover:** the row tints and the mark turns (`desk-sheet-9` f1). Click: the mark becomes ×, the answer drops 6 px. **But clicking a question on desktop makes the page jump about 480 px** (f1→f2: the clicked row leaves through the top). | hover + click | No | **BROKEN on desktop** (F11). |
| 9 | Contact | The sheet rises 160 px over a dimmed FAQ (`desk-sheet-6` f3–f4). It is followed by a long static form (`mob-sheet-3` f1–f6). | scroll-scrub | No | WEAK but acceptable: a form should be calm. |
| 10 | Close + footer | 5 bags (3 on phones, all names whole) rise with a stagger, each printed with the typed name; the centre one is in the chosen ink (`desk-sheet-10` f0, `mob-sheet-3` f9–f11). The footer is a plain link grid with a 13 px print slug and a ribbed seal band. | enter once | Same trigger as 7, not adjacent | **OK.** The payoff lands, but the names are 20 px (F19). |

**Count.**
- Desktop: 10 of 10 sections now have a moment of their own, and no two adjacent sections share a mechanism. Five are *impressive*:
  - the factory handle cut,
  - the toy and its PNG,
  - the products proof sheet,
  - the named close stack,
  - the hero story (correct now, but small).
- Mobile: 10 of 10 move. The rail adds the only change of **axis** on the page.

**Primitive census** (computed animation names per section, `desk/log.json`): the reading-start `clip-path: inset` now carries 2 sections on desktop (try `v2-plate`, how `v2-tear`) instead of 4.

**Thread.** The bag or slot appears at:
- the hero,
- the factory (slot),
- the products (pill hover),
- the toy,
- the Who bags,
- the close.

The hero → factory gap fell from about 7,000 px to about 1,500 px of scroll.

## Round-2 findings: status

| R2 | Finding | Status | Evidence |
|---|---|---|---|
| F1b | **BROKEN**: hero animations not gated, punch before headline | **FIXED** | `desk-hero-slow/log2.txt` n0: every hero animation at `0` with no `data-play`; n1+ runs in order. `desk-sheet-0-hero-slow` f1–f5: h1, then ghost, then sub/CTA, then die, then window. |
| F1 | Hero climax scale | **NOT FIXED** (marginal) | Bag 43% → 47% of the width; slot 196×64 → 204×72. Still a white card over a dark photo (`desk-sheet-1` f0). |
| F8 | Factory window opens off-screen | **FIXED (desktop) / PARTLY (mobile)** | Desktop: pinned and centred, die then open (`desk-sheet-2-factory-handle`, mask 196×64 → 300% over fine frames k11–k18). The panel waits for the open, so no words are clipped. New: the hole is pre-cut (F12). Mobile: the die is invisible (F13). |
| F9 | PNG has a transparent hole, no brand | **FIXED** | Desktop and mobile PNGs both have alpha 255 everywhere. They include the factory through the handle, a baked off-register ghost, ply/seal/ribs, logo, caption and phone (`desk/saved-bag.png`). Touch shares through the share sheet. |
| F10 | Chip over the h1; mobile close clips names | **FIXED** | No chip crosses the h1 in `desk-sheet-0-hero-slow`. The phone shows 3 bags with whole names (`mob-sheet-3` f9). |
| WEAK | Mobile Factory→Products: 9 identical reveals | **FIXED** | Crops 2–4 just fade; Products is a swipe rail (`mob-sheet-1` f9–f23). |
| WEAK | Products: generic card-grid wipe | **FIXED** (new F16, F17) | Proof sheet with colour bar, ink-up and pill hover (`desk-sheet-7`, `-7b`). |
| WEAK | Who: card pair with glyphs | **PARTLY** | Drawn bags replace the glyphs; the motion is a 36 px fan. |
| WEAK | FAQ has no hover | **FIXED** | `desk-sheet-9` f1. But see F11. |
| WEAK | Contact travel is only 90 px | **FIXED** | Now 160 px (`v2-sheet`). |
| F6 | Mixed photo grounds | **PARTLY** (asset-limited) | The matte unifies the frame. The photos still carry three customers' brands. |
| U2 | Toy too small | **FIXED** | 480×600 with a 76 px name, plus the 3 px dip. |

## New findings

### BROKEN

**F11. Desktop: focusing or clicking any control mid-page scrolls the page about 460–480 px.** This includes FAQ questions, product links, and keyboard Tab.
- **Cause:** `LandingV2.tsx` (the `focusin` effect at lines 107–121; the scroll happens at lines 116–117) runs whenever `mobileBar` is true. At ≥ 1100 px `mobileBar` is true mid-page, but `.v2-mbar` is `display:none` (`v2.css:814`).
  - So `bar.getBoundingClientRect().top === 0`.
  - That makes `overlap = el.bottom − 0`, and the handler calls `scrollBy(el.bottom + 16)`.
- **Evidence (`critD3-jump.mjs` at 1440):**

  | Action | scrollY before → after | Bar rect / state |
  |---|---|---|
  | Click on an FAQ summary | 10598 → **11078** | `[0,0,"none","true"]` |
  | Tab to «التفاصيل والصور» | 7182 → **7642** | n/a |

  - Visual: `desk-sheet-9` f1 → f2. The clicked question leaves through the top of the screen and its answer opens out of view.
- **Fix:** in `onFocus`, bail when the bar is not rendered: `if (!bar.getClientRects().length || getComputedStyle(bar).display === 'none') return;`. Or gate the whole effect on `matchMedia('(max-width: 1099px)').matches`.
- Note that `offsetParent` cannot be used for this test, because it is always null for `position: fixed`.

### WEAK

**F12. The die stamps a hole that is already cut.** The window shows the factory through the 196×64 pill *before* the die lands (`desk-zoom-fac-die`: frames k9 and k10 show the photo under the falling die). The hero gets the causality right: white film, then die, then photo. The factory reverses it, so the "punch" reads as decoration.
- **Fix: keep the pill as film until impact.**
  - Change `@keyframes v2-handle` to: `0%, 27% { mask-size: 0 0 }` → `28% { mask-size: 196px 64px }` → `100% { mask-size: 300% 300% }`, and change `.v2-fac__win`'s `animation-range` to `contain 0% contain 18%`. Die impact is at contain 5%, which is 27.8% of that range.
  - Add a 196×64 film pill (`#eef2f6`, `border-radius: 999px`) under the die, faded out at 28%. The die then visibly cuts the film and the factory appears.

**F13. Phones: the die is never seen, and the crop pops open in one swipe.**
- The die runs over `contain 0–16%` of a 584 px range, which is about 93 px of scroll. The clip opens over about 216 px.
- No 85 px or 170 px frame catches the die (`mob-sheet-fac-handle` f0–f6, die opacity 0 in every sample of `mob/log.json` facFine).
- **Fix:** on phones, play the punch on time, not on scroll: `usePlayOnce(0.6)` on the first `.v2-fac__cropwrap`, then die 0.6 s, then clip 0.9 s. This is the same recipe as the `@supports not` fallback that already exists.

**F14. Phones: the toy prints off-screen.** When the name input is in a comfortable typing position, the bag's name sits under the sticky header (`mob-sheet-try` f1–f3). Only the bag's bottom edge and phone line are visible. With the soft keyboard up, the bag is gone entirely. The press (the plate wipe and ghost), which is the moment, plays unseen.
- **Fix, under 960 px:**
  - `.v2-try__stage { position: sticky; top: calc(var(--hdr) + 8px); z-index: 1 }`.
  - `.v2-try__grid:focus-within .v2-try__stage .v2-bag { inline-size: min(52vw, 220px) }`, with a 0.3 s size transition.
  - Alternatively, place a compact live preview strip directly above the input.

**F15. The hero climax is still about 1% of the screen** (carried over from R2 F1). The bag grew from 43% to 47% of the width. At first glance the hero is a white card over a darkened photo (`desk-sheet-1` f0), and the stamp/window story happens in a 204×72 pill.
- **Fix (the R2 U1 hero bullet still applies):**
  - `.v2-hero__stage { inline-size: min(78vw, 1120px); aspect-ratio: auto }`, with content capped at 640 px.
  - Or scale the slot and die to at least 320×104 on ≥ 1100 px, so the factory window reads at 2–3× its current area.

**F16. The proof-sheet ink-up fires at 20% sheet visibility, so most of it happens off-screen.**
- `data-play` fires with the sheet top at 740 px (`desk-prod/log.json` k1→k2).
- Row 1 inks while in the bottom ~30% of the viewport (`desk-sheet-7b` f0–f1).
- Row 2 (3 of the 5 photos) is fully coloured before it scrolls in.
- **Fix:** trigger per row, or trigger on the grid at `threshold: 0.45`, and stagger by row: `animation-delay: calc(0.6s + var(--row) * 240ms + var(--i) * 90ms)`. Or arm row 2 separately with its own `usePlayOnce(0.5)`.

**F17 (art direction). The resting pill crop turns every product photo into an oval vignette.** It cuts the printed logos («DOLCE», `desk-sheet-4` f3) and reads like a dated cameo frame.
- **Fix:** rest at `inset(0 round var(--r-card))`. Spend the pill once, as motion: each photo opens from the pill *while* it inks up (pill to rectangle, plus grayscale to colour, in one 500 ms beat). Keep the hover as a 2–3% inset "breath".

### POLISH

**F18. The toy blanks and re-prints after a typing pause.** The text appears live as you type. At 260 ms the press is re-keyed, the name vanishes, and it wipes back in (`desk-zoom-try-press` bottom-left: red at t280 is almost empty).
- **Fix:** while typing, render only the ghost plate at `opacity .35`, and let plate 1 land once.

**F19. The close payoff is small.** The names are 20 px on 240 px bags, against 76 px on the toy (`desk-sheet-10` f0).
- **Fix:** `.v2-close__print { font-size: var(--t-26) }`, and a centre bag of 280×350.

**F20. Rail details.**
- At the last card the cue still reads «5 من 5 · اسحب للمزيد»; drop «اسحب للمزيد» at the end.
- In emulated Chrome, a 6th swipe past the last card triggered history-back to `about:blank` (`critD3-rail2.mjs`), despite `overscroll-behavior-x: contain` on the rail. Verify on a real Android/iOS device. If it reproduces, add `html { overscroll-behavior-x: none }` for this route.

**F21. Small visual weights.**
- The close-stack slots on navy read as heavy black bars on phones (`mob-sheet-3` f9–f11). Fill them with `--deeper`, or with the factory crop as in the hero.
- The footer slug is 13 px and the footer has no motion. That is fine for a footer, but it is not a "moment".

## Scores

| Dimension | R2 | R3 |
|---|---|---|
| **11 · Wow and section variety** | 6.5 | **7.8** |
| **12 · Art direction** | 6.0 | **7.0** |

**Dimension 11: 7.8.**
- **Gains:**
  - The hero's story is sequenced.
  - The factory's handle cut happens on screen, pinned and centred.
  - The toy is a real screenshot, with a keepable, branded, shareable PNG.
  - The catalogue has its own verb: proof-sheet ink plus pill hover, and a swipe rail on phones, the only axis change on the page.
  - The 9× mobile repeat is gone, and adjacent sections no longer share a mechanism.
- **Held back by:**
  - F11 (any FAQ click on desktop makes the page leap);
  - the hero climax still at about 1% of the screen;
  - a factory punch that hits a pre-cut hole, and is invisible on phones;
  - the phone toy printing off-screen;
  - Who, How, FAQ and Contact still sitting at decoration level.

**Dimension 12: 7.0.**
- **Better:**
  - One object system (the drawn bag) now runs through the hero, toy, Who and close.
  - The proof-sheet matte and crop marks.
  - A PNG that looks like a brand asset.
  - The print slug.
- **Still:**
  - the hero reads as a card over a photo;
  - the oval product vignettes crop logos and date the catalogue (F17);
  - the factory punch happens in a large empty navy field with no bag around it.

**Ship bar (dimension 11 ≥ 8): not met, by a small margin.** Three changes would carry it over 8: F11, then F12 + F13, then F14. F15 is the remaining lever to reach 8.5+.

## Shareable moment
**YES. «اسم محلك على شنطة البركة»: the visitor's shop name printed on a Baraka bag with the factory showing through the handle, saved as a 1080×1350 image** (`desk/saved-bag.png`).
- Two-plate red print with a blue ghost, optional phone line, ribbed seal, logo, and the caption «معاينة توضيحية — البركة بلاست · 01009923040».
- Fully opaque.
- On touch it goes straight to the share sheet with «اسم محلنا على شنطة البركة بلاست». On desktop it downloads.

The second, screen-recordable moment is the desktop factory cut: the hero's pill opens to full bleed while pinned.

## STATUS
**FAIL on dimension 11 by a narrow margin (7.8 < 8). Dimension 12: 7.0.** Up from 6.5 / 6.0. There is a shareable moment now.
- **BROKEN:** F11. On desktop, the mobile bar's `focusin` handler runs while the bar is `display:none`. Clicking an FAQ question or tabbing to a link scrolls the page about 480 px (`LandingV2.tsx:112–117`; `critD3-jump.mjs`; `desk-sheet-9` f1→f2). It is a one-line fix.
- **WEAK:**
  - F12: the die hits a pre-cut hole.
  - F13: the mobile die is never seen.
  - F14: the mobile toy prints off-screen.
  - F15: the hero climax is about 1% of the screen.
  - F16: the ink-up happens mostly off-screen.
  - F17: oval vignettes crop the logos.
- **POLISH:** F18 (re-print blink), F19 (small close names), F20 (rail cue and overscroll check), F21 (heavy slots on phones, static footer).
- **Fixed since R2:** F1b, F8 (desktop), F9, F10, the mobile 9× repeat, the Products grid wipe, the FAQ hover, Contact travel, the toy size.
