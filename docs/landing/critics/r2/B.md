# Critic B — Craft & system (round 2)

Page: http://127.0.0.1:4173/v2, the production build in `dist/` from 00:12. Copy status: DRAFT.
Screenshots are in `docs/landing/critics/r2/B-shots/`:
- `d1440/`: one capture per section at 1440×900.
- `m390/` and `t768/`: the same sections at 390 and 768.
- `top/`: scroll 0 at 360, 1280, 1440 and 1920.
- `zoom-*.png`: 2× crops.
- `toy-download.png`: the PNG that «احفظ صورة الشنطة» produces.

Raw data:
- `r2/B-audit.json`: audit.mjs at 5 sizes.
- A CDP probe at 6 sizes (scratchpad `probeB2.mjs` / `probeB2.out`): rendered fonts via `CSS.getPlatformFontsForNode`, the type steps, hero geometry, manifesto centring, widows, radii, shadows and the closing-stack print boxes.

All three scripts use the skill's `cdp.mjs`: headless, analytics blocked, temporary profile deleted.

**Note on line numbers.** `src/v2/v2.css` was edited after the build (mtime 01:14; the build is from 00:12). The working copy already changes `.v2-hero__stage` top/bottom (56/28 → 44/16), `.v2-foot__word` (now opaque `#1e2741`) and the die colours. My findings are measured on the **served build**. The `file:line` references point to the **current working copy**, so the builder can find them.

## Measured baseline
- **audit.mjs PASS at 5 sizes.**
  - No overflow.
  - CTA above the fold at 522/740, 586/844, 755/1024, 624/800 and 684/900.
  - One h1 (3 lines on phones, 2 lines from 768 up).
  - 0 contrast fails, 0 targets under 24 px, 0 errors.
  - Reduced motion leaves no invisible text.
  - CLS: 0.011 / 0.010 / **0.053** / 0.035 / 0.033. In round 1 it was 0.012–0.026. See N7.
- **Fonts actually rendered (CDP, all 6 sizes):**
  - Cairo 800: h1, the accent line, the manifesto, h2, FAQ summaries, the toy name, the close prints and the footer word.
  - Tajawal / Tajawal Medium: sub, fine print, buttons, inputs, openers, contact values, hours and legal.
  - The CTA arrow is now an SVG, so the button renders only Tajawal and the round-1 Segoe UI fallback is gone.
  - Exception: on its 768 run, audit.mjs caught the h1 as `Cairo, Segoe UI Black (system)`. A later probe at 768 shows Cairo only, so the h1 paints in a system face before Cairo 800 arrives. See N7.
- **Type steps rendered:**
  - 360/390: 13 · 15 · 17 · 20 · 24 · 26 · 30.
  - 768: 13 · 15 · 17 · 20 · 26 · 34 · 54.
  - 1280: 13 · 15 · 17 · 20 · 26 · **39 · 40 · 42**.
  - 1440: 13 · 15 · 17 · 20 · 26 · 40 · 42 · 46.
  - 1920: 13 · 15 · 17 · 20 · 26 · 40 · 42 · 56.
  - Every reading size is a whole pixel. The only fractional sizes are the decorative `15.5vw` footer word (55.8 / 119.04 / 198.4 / 223.2 / 297.6 px).
- **Hero bag:**
  - 620×744 at 1440 (aspect 0.83). It covers **36%** of the viewport, or 39% of the area below the header.
  - 537×644 at 1280 (0.83, 34%).
  - 720×864 at 768 (0.83).
  - 366×740 at 390 (**0.49**) and 336×636 at 360 (**0.53**).
- **Longest reading line:** under 80 characters at every size (audit `longLines` is empty).
- **Contact channels:** the drift between label and value is 0 px for all four channels at all six sizes.

## Round-1 findings: fixed or not
| # | Round-1 finding | Status | Evidence |
|---|---|---|---|
| 1 | Phone numbers drift away from their labels | **FIXED** | Drift `[0,0,0,0]` at 360–1920 (probe); `d1440/1440x900-08.png` |
| 2 | Footer outline shows glyph seams | **FIXED** in the build (stroke removed). The translucent `rgba(255,255,255,.08)` fill still doubles where glyphs overlap at the joins: faint lozenges on the baseline in `d1440/1440x900-10.png` (y≈880). The working copy's opaque `#1e2741` (v2.css:638) cures this; I have not verified it in a build. | The template shape is untouched: see N8 |
| 3 | h1 is not the dominant type | **PARTIAL / REGRESSED** | Phones 30/24/26 ✓ and 768 54/34/34 ✓. **1280: h1 39 < h2 40 < manifesto 42**, which is worse than round 1. 1440: 46 vs 42 (1.10×). See N1 |
| 4 | The bag reads as a card | **MOSTLY FIXED on desktop** | Aspect 0.83, back ply at the mouth, 3/3/6/6 corners, seals and ribs (`zoom-hero-bag-1440.png`, `zoom-try-bag-named.png`). Still open: phones 0.49–0.53 (`top/360x740-00.png`); the patch is still an outlined box (`zoom-hero-patch.png`, see N4); the ply plugs the handle on the small bags (N3) |
| 5 | Action orange leaks | **FIXED** | `--action` is used only on `.v2-btn` fills/hover and on focus rings over deep grounds (v2.css:87, 136–137, 481, 488). Caption dot, step 5 and ink chips are now blue/white |
| 6 | Gaps in the radius, shadow and colour lock | **PARTIAL** | `--sh-bag` is now used (7× `drop-shadow`), and `--r-bag`, `--r-sheet` and the material greys are documented. Still ad hoc: the box-shadows on the chip (v2.css:235), die (237), contact sheet (575) and mobile bar (647). The **dead `.v2-proof` rules** (v2.css:124–131: 4 px radius, 8 px crop marks) are used by no TSX and contradict DESIGN; delete them |
| 7 | Signature patterns applied inconsistently | **PARTIAL** | FAQ toggle is now a registration mark ✓. Who bullet is a 12×2 accent dash ✓. Not fixed: the factory finder still uses 2 px white 22 px brackets (v2.css:389); the mobile factory list has no colour bar (Sections.tsx:92–117); the ticket scallop is still a fourth perforation language (v2.css:595, `zoom-ticket-top.png`); the registration mark now has three geometries (N10) |
| 8 | Template shapes mid-page | **PARTIAL** | Headers now vary (split, centred, sticky column) ✓. Who icons are bag glyphs ✓. FAQ is two columns ✓. Not fixed: card b is still `--film` against card a's white, so it reads as disabled (v2.css:504, `d1440/1440x900-05.png`); the footer is still 4 columns plus a giant wordmark |
| 9 | Hero collisions at 1280/1440 | **FIXED** | Caption overlap is 0 px horizontally at 1280, 1440 and 1920. The opener sits 46 / 86 / 162 px below the patch. New tight spot: **4 px** at 360 (N11) |
| 10 | Factory photo upscaled | **PARTIAL** (asset-blocked) | Scale 1.55–1.6 instead of 1.9–2.1. At 1440 the 1536-px photo still renders about 2300 px wide (1.5×, about 3× on DPR 2). Needs the owner's original |
| 11 | CTA arrow in a system font | **FIXED** | lucide `ArrowLeft`; `.v2-btn` renders only Tajawal |
| 12 | Name washed out / clipped | Toy **FIXED** (`zoom-try-bag-named.png`). Close stack **PARTIAL**: fine on desktop, clipped on phones (N6) |
| 13 | Orphans and phrase bindings | **PARTIAL** | `pretty` is now on li/dd/summary ✓, and the Who widow is gone. `منذ{' '}2011` (Hero.tsx:101) is still an ordinary space, so the binding does nothing. The fine print still starts line 2 with «· 01009923040» at 360/390 (`zoom-hero-fine-390.png`). New widow: ticket h3 «أمر طلب / تسعيرة» at 360 |
| 14 | Fractional sizes, line-height, counter format | **MOSTLY FIXED** | Text sizes are stepped whole pixels ✓. The counter is unified (products no longer show one) ✓. Still 1.6: `.v2-form .v2-in` and `.v2-ch b` line-height |
| 15 | DESIGN.md drift | **PARTIAL** (known) | DESIGN now lists h2 24/34/40, manifesto 26/34/42, `--r-bag`, `--r-sheet` and the filter `--sh-bag`. **Still false:** "h1 … ≈43 at 1280, ≈51 at 1440 — always the largest type on screen" (measured 39 and 46; not the largest at 1280). Also "FAQ toggle = the same registration mark", while it is a 30 px circle with a 36 px cross (v2.css:562–565) |

## New findings (ranked)

### N1. BROKEN: the headline is smaller than the section titles at 1280×800, and barely ahead at 1440
The h1 is sized from the bag's width: `(100cqi − 72px) / 11.8` (v2.css:273). The bag's width comes from the viewport *height* (5:6 stage, v2.css:255). Meanwhile h2 and the manifesto use fixed ≥ 1100 px steps (v2.css:73).

| Viewport | h1 | h2 | Manifesto |
|---|---|---|---|
| 1280×800 | 39 | 40 | 42 |
| 1440×900 | 46 | 40 | 42 |
| 1920×1080 | 56 | 40 | 42 |

At 1280×800, the most common laptop size, every section title outranks the headline. Three display steps sit within 3 px of each other (39 / 40 / 42), so the scale has no contrast. At 1440 the ratio is 1.10×. The round-1 bar was "h1 clearly dominant".

**Fix (do both):**
1. Let the bag grow. Use stage `top: 24px; bottom: 16px`. The working copy's 44/16 is not enough. This gives about 573 px at 1280 (h1 42) and 657 px at 1440 (h1 49). It also brings the bag to the 40% stage bar (36% → 40% at 1440).
2. Step the display sizes down on short laptops, and drop the manifesto's separate step:
   ```css
   @media (min-width:1100px) { .v2 { --t-mf: var(--t-h2); } }  /* 40 = 40: one display step */
   @media (min-width:1100px) and (max-height:899px) { .v2 { --t-h2: 34px; } }
   ```
   Result: 1280×800 is 42 / 34 (1.24×) and 1440×900 is 49 / 40 (1.23×). The desktop scale becomes 7 sizes.
3. Correct DESIGN.md's h1 row to the measured values.

### N2. BROKEN: the manifesto is visibly off-centre on every desktop
`.v2-mf__text` has `max-inline-size: 19em; margin: 0` (v2.css:360). In RTL the 798-px block sticks to the inline-start (right) edge of the 1160-px wrap and centres its text inside itself. Measured offset of the text's centre from the viewport centre: **+181 px at 1280, 1440 and 1920**, and +21 px at 768. Evidence: `d1440/1440x900-01.png` (text spans x 573–1229 on a 1440 page), `zoom-manifesto-1440.png`. It is the only centred statement on the page, and it is the one that is not centred.

**Fix:** `.v2-mf__text { margin-inline: auto; }`

### N3. BROKEN: the back ply plugs the punched handle on the toy and on all five closing bags
`.v2-bag__ply` is a solid 40 px strip from `top: -7px` (v2.css:192). It sits under the panel, so it shows through the slot:
- On the `xs` bag (slot from 16 to 38 px) it fills **17 of the 22 px** of the hole. In the closing stack every handle reads as a grey pill button with a navy sliver underneath (`zoom-close-bag-centre.png`, `zoom-close-stack-390.png`).
- On the toy's `sm` bag it leaves a 5 px grey lid across the top of the hole (`zoom-try-bag-named.png`).

The punched hole is the page's idea, and the last image of the page shows it filled in. A real back ply is punched by the same die.

**Fix:** give the ply the panel's mask (`-webkit-mask` / `mask` with the same `--slot-svg … exclude` pair, offset `calc(var(--slot-top) + 7px)`). The simpler alternative is `block-size: calc(var(--slot-top) + 1px)`, so the ply ends above the hole.

### N4. WEAK (originality): the reinforcement patch still reads as an empty UI box
At 1440 the patch is a 380×136 rectangle with a 1 px `rgba(15,27,61,.12)` outline and 3 px corners (v2.css:219; `zoom-hero-patch.png`, `t768/768x1024-00.png`). Together with the handle it looks like an image well or a dropzone. The outline is the last strong "card" cue on an otherwise convincing bag.

**Fix:** remove the outline and draw a heat weld:
```css
border: 0;
background: rgba(255,255,255,.35);
box-shadow: inset 0 -1px 0 rgba(15,27,61,.07), 0 1px 0 rgba(255,255,255,.9);
```
That is a fold edge only along the bottom. Optionally add two 6 px weld ticks at the lower corners.

### N5. WEAK: phones still get a 0.49–0.53 strip, so the bag reading holds only from 768 up
At 360 and 390 the stage is `left/right 12px; top 28; bottom 16` with `aspect-ratio: auto` (v2.css:256). The result is 336×636 and 366×740: a phone screen with seals, not a bag (`top/360x740-00.png`, `m390/390x844-00.png`). Phones are most of this audience (Egyptian shop owners via WhatsApp).

**Fix (no copy change):**
- Move `.v2-hero__fine` out of the bag on phones, onto the deep ground under it (`bottom: auto; top: 100%` with 8 px of margin, and the stage `bottom: 56px`).
- Hide `.v2-hero__note` below 400 px wide, as is already done below 700 px tall.

This buys about 70 px. Then bring the sides in to 20 px, so 360 becomes 320×≈580 (0.55) with a clear mouth. Also add a 10 px bottom gusset fold line (a second `.v2-bag__rib` 18 px above the first) so a tall bag still reads as a bag. A ratio of 0.75 is impossible on phones without cutting copy, so log it under copy.

### N6. WEAK: the closing stack clips names on phones
At 390 (`--k: .5`, v2.css:621):
- The outer bags' prints sit at x −59…41 and 349…449, half off-screen («سم محلك»).
- The second-tier black print is covered by the centre bag («اسم محلـ»).

Evidence: `zoom-close-stack-390.png`, `m390/390x844-09.png`. The round-1 triage says "spread so names stay readable", which is true only at 768 and up.

**Fix:** below 768, render 3 bags (hide the ±400 pair with `.v2-close__bag:nth-child(-n+2) { display: none }`) with `--k: .62`. Alternatively, keep 5 bags and give the side prints `padding-inline: 8px 45%` so the name sits in the visible half.

### N7. WEAK: CLS doubled, and the h1 paints in a system face first at 768
- **CLS.** It is now 0.033–0.053 on desktop and tablet, against 0.012–0.026 in round 1. That is under the 0.1 gate but above the ≤ 0.03 aim at 3 of 5 sizes.
- **Font fallback.** The audit's 768 run recorded `Cairo, Segoe UI Black (system)` on the h1. Steady state is Cairo only. So the 54 px headline is laid out in Segoe UI Black, then swaps (display=swap) and reflows. The hero's animation waits for `fonts.ready`, but the static first paint does not.

**Fix:**
- Preload the Arabic-subset Cairo 800 woff2 in `index.html`, scoped to `/v2`, or inject it in `LandingV2`.
- Add a metric-matched fallback: `@font-face { font-family: 'Cairo-fb'; src: local('Segoe UI'); size-adjust: …; ascent-override: … }` and put it in `--f-display` before `sans-serif`.

### N8. WEAK (template): the page's object stops at the close; the footer is the stock 4-column + giant-wordmark footer
`d1440/1440x900-10.png` shows four columns, a hairline, the legal row and then «البركة بلاست» at 15.5vw. That is the most common 2023–25 template ending, immediately after the page's best moment (five printed bags).

**Fix:** replace `.v2-foot__word` (Close.tsx:340–342) with the bag's own print furniture at footer scale: a single row of the four colour-bar ink patches plus the 22 px registration mark and «البركة بلاست · قليوب · منذ 2011» in 13 px, like the print slug on a roll. Or delete the word outright. Either way, the Close stays the visual ending.

### N9. WEAK: the share PNG has a transparent hole through the whole image and is not the page's bag
`printBag.ts:65` punches the handle with `destination-out` *after* filling the navy ground (line 40). The slot is therefore transparent through everything: pixel (540,214) of `toy-download.png` is **RGBA 0,0,0,0**. WhatsApp and gallery viewers flatten that to white or black, so the handle becomes a white or black sticker.

The canvas bag also drops the ply, the patch, the ribs and the grain, and it uses 8 px corners on all four sides (line 52), not `--r-bag` 3/3/6/6. The file comment says "same object as the page"; it is not.

**Fix:**
- Draw the bag onto an offscreen canvas, punch it there, then composite it over the ground. The quick version: after the punch, set `c.globalCompositeOperation = 'destination-over'; c.fillStyle = '#0f1b3d'; c.fillRect(0, 0, W, H)`.
- Add the ply strip, the rib band (1 px lines every 4 px over the bottom 24 px) and the patch outline-less fill, with corners 3/3/6/6.

### N10. POLISH: the registration mark now has three geometries
| Mark | Size | Circle | Crosshair |
|---|---|---|---|
| Bag SVG | 22 px | r 6.5 | 1 px, edge to edge (Bag.tsx:19–28) |
| Step marker | 44 px box | 32 px, 1.5 px | 0.35-alpha (v2.css:105–111) |
| FAQ | 30 px | 30 px, 1.5 px | **36 px**, overshooting the circle by 3 px each side (v2.css:562–565) |

The FAQ version is a third drawing of the symbol, at a size DESIGN does not list.

**Fix:** make the FAQ toggle `.v2-reg` at a `--reg-sm: 32px` variant, using the same `inset` and alpha rules, and rotate it 45° when open.

### N11. POLISH: small collisions and orphans
- **360×740.** The opener sits **4 px** under the patch (probe `openerBelowPatch: 4`; `top/360x740-00.png`). Add a guard: `.v2-hero__content .v2-opener { margin-block-start: 12px }` below 768.
- **Fine print at 360/390.** Line 2 starts with «· 01009923040» (`zoom-hero-fine-390.png`). Wrap the `·` and the link in `<span style="white-space:nowrap">` (Hero.tsx:125–129).
- **Ticket h3 at 360.** «أمر طلب / تسعيرة» squeezes against the «الحقول المعلَّمة * مطلوبة» note in a flex row (v2.css:597). Add `flex-wrap: wrap` and let the note drop under it.
- **Phrase binding.** «منذ 2011» still uses a breakable space (Hero.tsx:101). Use `منذ 2011`.

### N12. POLISH: colour roles
- **WhatsApp icon.** It is coloured `--ink-green` (v2.css:591), and DESIGN reserves the print inks for "product depiction in the toy only". Give WhatsApp its own role (`--wa: #1f7a45` with a contrast row in DESIGN) or use `--accent` like the other channel icons.
- **`--ink-dim` (#76839a).** It is not in the DESIGN token table, yet it carries every unread manifesto word: 3.3:1 at ≥ 26 px. Add it to the table.

## Lens checks that pass
- **Fonts.** Cairo and Tajawal render everywhere at steady state. The canvas export also renders Cairo 800 (`toy-download.png`).
- **Arabic and bidi.**
  - Words are never split into letters.
  - Western digits are used throughout.
  - The `dir="ltr"` numbers now align with their labels.
  - The canvas caption «… · 01009923040» resolves in the right order.
  - «ziplock bags» resolves correctly in the footer list.
- **RTL motion.** Product plate wipes run right→left, the How rail tears right→left, and the colour bar fills from the right.
- **Line-heights.** Headings 1.4, body 1.85–1.9. The exceptions are the controls and labels noted in round-1 #14.
- **Layout families now vary.** Hero = object-as-panel; manifesto = pinned statement; factory = pinned camera through the handle; products = asymmetric 2+3 grid; try = toy split; who = centred card pair; how = rail; FAQ = sticky title column; contact = sheet + ticket; close = stack. No two adjacent sections share a mechanism.
- **Deep grounds.** Four deep sections (hero, factory, try, close), none adjacent; the footer is deeper.
- **Originality gate: PASS.**
  - On desktop the code-drawn object now reads as a **die-cut HDPE bag**: back ply at the mouth, side seals, ribbed bottom seal, film sheen, factory seen through a real punched hole (`zoom-hero-bag-1440.png`).
  - None of the skill's banned example objects appear.
  - It is not a reskin of any template.
  - It loses the reading on phones (N5), at the patch (N4) and in the plugged handles (N3).

## Lens scores (1–10)
- **Design-language coherence: 7.5** (was 6.5). Orange discipline, the shadow token, the bag radii and the FAQ mark are all fixed. Pulling it down: three registration-mark geometries, the finder brackets, the ticket scallop, dead proof CSS, and a share PNG that is a different bag.
- **Typography: 6.5** (unchanged). Whole-pixel steps and correct faces, but the h1 loses to the h2 at 1280, the 39/40/42 display steps collapse, the h1 paints in a fallback first at 768, and a few orphans remain.
- **Composition and rhythm: 7.0** (was 6.5). Real variety between sections now. Pulling it down: the off-centre manifesto, the template footer, the clipped phone close stack, and the hero at 36% of the screen.

## STATUS
**NOT READY.** The measured floor passes at all 5 sizes, but there are three BROKEN craft defects, all one-to-five-line CSS fixes:
- **N1:** the h1 is smaller than the h2 at 1280×800.
- **N2:** the manifesto is 181 px off-centre at ≥ 1280.
- **N3:** the back ply fills the punched handle on the toy and the closing stack.

Fix N1–N3, then N4 (the outlined patch) and N9 (the transparent hole in the share PNG). After that this lens would clear 8.
