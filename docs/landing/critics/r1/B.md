# Critic B — Craft & system (round 1)

Page: http://127.0.0.1:4173/v2 (production preview). Copy status: DRAFT. Screenshots: `docs/landing/critics/r1/B-shots/`
(`d1440/` sections at 1440×900, `top/` scroll 0 at 1440/1280/360, `m390/` and `t768/` sections, `zoom-*.png` 2× crops).
Raw measurements: audit.mjs (5 sizes) and a CDP probe (rendered fonts via `CSS.getPlatformFontsForNode`, orphans, bag
geometry, channel alignment, photo upscale). Both scripts used the skill's `cdp.mjs`: headless, analytics blocked, temp profile deleted.

## Measured baseline
- audit.mjs **PASS** at 360/390/768/1280/1440: no overflow, CTA above the fold (514/740 … 662/900), one h1, 0 contrast
  fails, 0 targets < 24 px, CLS 0.012–0.026, 0 errors, reduced-motion leaves no text invisible.
- Fonts actually rendered: h1/h2/h3/FAQ/manifesto/footer word = **Cairo** 700/800; body/labels/inputs = **Tajawal** 400/500/700.
  Faces loaded: Cairo 400/500/700/800 and Tajawal 400/500/700 (Arabic + Latin subsets). **One fallback:** the CTA arrow
  "←" renders in **Segoe UI (SYSTEM)** (`Tajawal×11, Segoe UI(SYSTEM)×1`). See #11.
- Distinct text sizes: 7 on mobile (13/15/17/20/26 + 28 + **30**), 8 on desktop (13/15/17/20/26 + h2 + manifesto + h1).
  Fractional sizes: 32.256, 43.52, 52.48, 53.76, 55.35 px.
- Longest reading line: 79 chars (768, product body), 73 chars (1440, FAQ answer). Under the 80 target.
- Hero bag: 806×780 (aspect 1.03, 49% of the first screen) at 1440; 717×680 (1.05) at 1280; 720×904 (0.80) at 768;
  366×756 (0.48) at 390; 336×652 (0.52) at 360.
- Deep grounds: hero, factory, try, close (4, none adjacent), plus the footer (deeper) directly after close.

## Ranked findings

### 1. BROKEN: phone numbers drift away from their labels in the contact channels
The `dir="ltr"` value spans take `text-align: start`, which means **left** in LTR. The labels and the e-mail are
right-aligned, so the two phone numbers float to the far side of their column. Measured drift between the label's
right edge and the number's right edge: **268 px** at 1440 and 1280, **508 px** at 768, 132–162 px on phones.
E-mail and address: 0 px. Evidence: `d1440/1440x900-08.png`, `m390/390x844-08.png`, `zoom-contact-channels.png`;
code at Contact.tsx:122 and :129, v2.css:546–550.
**Fix:** `.v2-ch span[dir='ltr'] { text-align: right; }`. Alternatively keep the span's direction and wrap the
digits in `<bdi>` without `dir` on the span.

### 2. BROKEN: the footer wordmark's outline shows the glyph overlaps at Arabic joins
`-webkit-text-stroke: 1px` strokes every contour, so the overlapping parts of joined glyphs show up as seams. You can
see lozenges and cross-bars at the baseline joins, a bar between the stems of «بلاست», and the dots drawn as hollow
squares. Evidence: `d1440/1440x900-10.png` (y≈880), `zoom-footer-wordmark.png`; code at v2.css:597. A giant outlined
wordmark is also the most common 2023–25 template footer.
**Fix (pick one):** (a) use a fill instead of a stroke, with `color: rgba(255,255,255,.06); -webkit-text-stroke: 0`.
(b) Keep the outline but hide the interior seams with `-webkit-text-stroke: 2px rgba(255,255,255,.16); paint-order:
stroke fill; color: var(--deeper)`. (c) Better for ownership: replace the word with a row of the `.v2-bag--xs`
silhouettes (the stack continuing into the footer).

### 3. WEAK: the h1 is not the dominant type on the page
- Phones: h1 **30 px**, from an off-scale override at v2.css:265 that also breaks DESIGN's 34 px minimum. Every h2 and
  the manifesto are **28 px** (31 elements at 360). The headline is only 2 px larger than a section title.
- 1280×800: h1 52.48 px but manifesto **53.76 px**, so the manifesto is larger than the headline. Both come from vw
  clamps, `--t-h1 4.1vw` and `--t-mf 4.2vw` (v2.css:45–46); DESIGN.md specifies h1 5.2vw/68 and mf 4.4vw.
- 1280×800: the h1 wraps to **3 lines** («اسم محلك / على كل شنطة، / مطبوع في مصنعنا.»), which pushes the opener up
  against the reinforcement patch (`top/1280x800-00.png`, y≈222–230).
- 768: h1 34 px inside a 720-px-wide bag, so the headline fills about half the panel (`t768/768x1024-00.png`).

**Fix:** size the h1 from its stage. The panel is already a container (v2.css:196):
`.v2-hero h1 { font-size: clamp(30px, 7.2cqi, 60px) }` and `.v2-hero__content { padding-inline: 40px }`. Computed:
806→58 px, 717→51.6 px (line 1 ≈ 594 px wide < 637 available, so 2 lines), 720→51.8 px, 336→30 px. Then cap the
manifesto below it with `--t-mf: clamp(26px, 3.6vw, 48px)`, and set mobile h2 to 24 px
(`--t-h2: clamp(24px, 3.4vw, 44px)`) so h1/h2 on phones is 30/24. Delete the 30 px override.

### 4. WEAK (originality): on desktop the code-drawn bag reads as a white card or kiosk with a pill-shaped camera notch, not a die-cut bag
The idea is owned: no template has "the page is the bag", and the factory seen through the punched slot is a good
touch. But the object loses the bag reading at the most-seen sizes:
- **Proportion.** Aspect 1.03 at 1440 and 1.05 at 1280, nearly square. On phones it is 0.48–0.52, a phone-screen strip.
  Real die-cut bags are about 0.75–0.8. At 768 (0.80) and in the try section (4/5) it does read as a bag.
- **Card cues.**
  - Uniformly rounded 18 px bottom corners and a floating drop-shadow (v2.css:184, 187).
  - A fully opaque panel.
  - A diagonal "glass" sheen (v2.css:190–191, 202–204).
  - A **dashed** reinforcement patch that reads as a UI dropzone (v2.css:211; `top/1440x900-00.png` around the slot).
  - No mouth: there is no front/back ply at the top edge.

**Fix:**
- Stage width bound to a bag ratio: `.v2-hero__stage { inline-size: min(56vw, calc((100svh - var(--hdr) - 48px) * .8)) }`.
  This gives 662×828 at 1440, about 40% of the screen, still inside the 40–60% bar, and works with fix #3's cqi h1.
- Patch: `border: 1px solid rgba(15,27,61,.06); box-shadow: inset 0 -1px 0 #fff` (a heat-sealed fold-over, no dashes).
- Back ply: a 3–4 px strip peeking above the top edge (`.v2-bag__shadow::before { inset: -4px 6px auto; block-size: 6px;
  background: #e6ebf0; border-radius: 2px 2px 0 0 }`).
- Bottom corners: radius 4 px, keeping the rib seal.
- Translucency: about 4% (`opacity: .96` on the base gradient layer) so the duotone factory ghosts through the film.
- Creases: two vertical gradients at 3% alpha, at 33% and 67%.

### 5. WEAK: the action orange leaks beyond "quote CTA fill only" (DESIGN.md tokens)
`--action` is also used on:
- the active product registration mark (v2.css:415, `d1440/…-03.png`);
- How-to step 5 (v2.css:500, `…-06.png`);
- the hero caption dot (v2.css:245);
- the selected ink chip's border and a 12% fill, `rgba(244,122,0,.12)` (v2.css:457). This puts two orange objects
  next to each other in `…-04.png`.

On a page whose rule is "orange = ask for a quote", these dilute the signal.
**Fix:** active reg mark and step 5 → `var(--accent)` / `var(--accent-inv)`; caption dot → `var(--accent-inv)`;
ink chip checked → `border-color: var(--inv); background: rgba(255,255,255,.08)`. Keep the orange focus rings on deep
grounds, which DESIGN allows.

### 6. WEAK: the radius, shadow and colour lock has gaps
- **Radii in use:** 4, 6, 12, 16, 18, 36, 50%, 999. Off-system values:
  - 4 px on the proof frame (v2.css:118). DESIGN says frames are 16.
  - 4 px top corners on the bag (v2.css:187, 231).
  - 6 px on the patch and the die (v2.css:211, 228).
  - **36 px** on the contact sheet (v2.css:542).
- **Shadows:** `--sh-bag` is defined (v2.css:53) but **never used**. The bag uses an ad-hoc
  `drop-shadow(0 36px 40px rgba(3,8,24,.45))` (v2.css:184). Three more ad-hoc shadows exist: die (228), contact
  sheet (542) and mobile bar (606).
- **Hex values not in DESIGN.md:**
  - WhatsApp green `#1f8a4c` (v2.css:551).
  - `--ink-dim #76839a` (v2.css:17).
  - `--patch-orange #f7b26b` (v2.css:34).
  - Twelve material greys and steels: `#f7f9fb #f1f4f7 #e9edf1 #edf1f4 #e6ebf0 #d9e0e7 #d5dce4 #c7d0da #24345c #16224a
    #c9d2df #7d8aa0`.
  - The shadow tint `rgba(3,8,24,…)`.
  - `#fff` ×8 in the factory finder.
- The `.tsx` files are clean: no literal colours.

**Fix:** add `--film-hi/--film-mid/--film-lo`, `--ply-1/--ply-2`, `--steel-*`, `--sh-drop`, `--r-proof: 2px` and
`--r-sheet: 36px` as tokens, and list them in DESIGN.md. Or collapse them: the contact sheet to `var(--r-card)` and the
proof to 0 or 2. Remove the dead `--sh-bag` or use it.

### 7. WEAK: the signature patterns are applied inconsistently
- **Real proof gets three different frames.** Products use the proof frame (1 px ink-3 crop marks, 8 px long; DESIGN
  says 14). The factory on desktop uses 2 px white 22 px "finder" brackets (v2.css:356–361). The factory on mobile uses
  plain rounded-16 crops with no frame (v2.css:389). The quality bar asks for consistent framing.
  **Fix:** give the finder the proof crop-mark geometry (1 px, 14 px, `--inv-3` on deep), and wrap the mobile factory
  crops in `.v2-proof` with an on-deep variant.
- **The registration mark has two implementations.** One is an SVG (22 px, r 6.5; Bag.tsx:18–28). The other is a CSS
  box (44 px with a 32 px circle; v2.css:99–104). DESIGN says 34 px. **Fix:** one size token, `--reg: 34px`.
- **The FAQ toggle is a bare plus** (v2.css:529–533). SECTIONS.md row 8 promises "register cross rotates to ×".
  **Fix:** add the circle, for example by reusing `.v2-reg` without a number.
- **The colour-bar progress disappears below 900 px:** the stacked factory list has none.
  **Fix:** add a `Colorbar on={i}` beside each card's reg mark.
- **The opener's handle-slot shape is reused as a list bullet** (Who list, v2.css:472). This cheapens the opener.
  **Fix:** use a 6 px square ink patch as the bullet.
- **The contact "ticket" scallop** (v2.css:555) is a fourth perforation language, next to the dashed rail in How.
  **Fix:** use the How rail's `repeating-linear-gradient(90deg, var(--ink-3) 0 8px, transparent 8px 14px)` as a tear
  line across the ticket top.

### 8. WEAK: template shapes in the middle of the page
- **Repeated header stack.** Eight of the ten sections open with the same start-aligned opener → H2 → lead stack:
  products, try, who, how, faq, contact, factory panel, and close (centred). That is an eyebrow template, reskinned.
- **Who section.** Two white cards with a corner icon and a bullet list. The `StackIcon` (three bars) reads as a
  hamburger/list icon (`d1440/…-05.png`, x≈773 y≈306). Card b's `--film` background against card a's white looks like a
  disabled state (v2.css:473).
- **FAQ.** A plain accordion.
- **Footer.** A four-column footer plus a giant outline word (see #2).

**Fix (no copy change):**
- Who icons → `<Bag size="xs">`: a single bag for brand owners, three offset bags for wholesale. Card b's background →
  `var(--white)`.
- FAQ → two columns at ≥ 960 px: opener + H2 sticky at the inline-start, list at the end.
- How header → centred above the rail.

### 9. WEAK: hero collisions at laptop sizes
- The caption pill overlaps the bag's sealed corner by **59×14 px at 1280** and **24×14 px at 1440** (probe;
  `top/1280x800-00.png`, `top/1440x900-00.png`).
- At 1280 the opener sits 0–8 px under the dashed patch.

**Fix:** `.v2-hero__caption { max-inline-size: calc(22vw - 48px); inset-inline-start: 24px }` so it wraps inside the
side margin. The opener clears the patch once #3 brings the h1 back to 2 lines. Add `margin-block-start: 16px` on
`.v2-hero__content .v2-opener` as a guard.

### 10. WEAK: the pinned factory camera upscales a 1536-px photo
At 1440 the image renders **2736 px** wide (camera scale 1.9, so 1.78×). Step 3 (scale 2.1) is 1.97×. On DPR-2 screens
that is about 3.6–3.9×. The towers and operators go soft (`d1440/1440x900-02.png`).
**Fix:** cap the step scale at about 1.35 (content.ts:393–414, `s`), or get a ≥ 3000 px original from the user (add it
to the BRIEF shot list).

### 11. POLISH: the CTA arrow renders in a system font
"←" falls back to Segoe UI here (on Android it will be Roboto or Noto) and is visibly thin next to the 700-weight
label (`zoom-hero-cta-arrow.png`).
**Fix:** use lucide `<ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />` (lucide is already a dependency) at
Hero.tsx:116, Sections.tsx:338 and Close.tsx:272.

### 12. POLISH: the visitor's name is washed out on the toy and clipped in the closing stack
- **Toy.** The panel gloss `::after` (v2.css:202–204) paints above `.v2-bag__print`. Outside the hero `--mx` is never
  set, so a static 40%-white band crosses the print and «اسم محلك» renders as a gradient (`zoom-try-print.png`). This
  is the page's "see your name" moment.
- **Closing stack.** The overlapping bags cut the names: «محلك» shows without «اسم», and «اسم» is cut off on the red bag
  (`d1440/…-09.png`, `m390/…-09.png`).

**Fix:**
- `.v2-bag__print { z-index: 1 }`.
- `.v2-try .v2-bag__panel::after, .v2-close .v2-bag__panel::after { opacity: .25 }`.
- STACK offsets ±80/±230 (Close.tsx:10–15), or `.v2-close__print { padding-inline: 18px 40%; }` on the side bags so
  the print sits in the visible half.

### 13. POLISH: orphans, widows and phrase bindings
Single-word last lines, measured:
- Who «…سلوفان، / وزيبلوك» at 1280 and 1440, and «…أو / وجهين» at 390.
- FAQ «…والمواصفات / المتاحة؟» and «…على / الشنط؟» at 360/390.
- Spec values «…حسب / الاستخدام» at 360/390.
- The hero fine print's line 2 starts with «· 01009923040» at 360/390.

`text-wrap: pretty` covers only `p` (v2.css:79). `منذ{' '}2011` (Hero.tsx:100) is an ordinary breakable space, so
DESIGN's "phrase binding" does nothing.
**Fix:**
- `.v2 li, .v2 summary, .v2 dd { text-wrap: pretty }`.
- `منذ 2011`.
- `<span style={{whiteSpace:'nowrap'}}>· <a…>{PHONE}</a></span>`.

### 14. POLISH: fractional sizes, line-height and counter format
- **Fractional sizes.** The vw clamps produce 32.256 / 43.52 / 52.48 / 53.76 / 55.35 px (F5: "no half-pixel sizes").
  **Fix:** `round(clamp(...), 1px)`.
- **Line-height.** `.v2-ch span` and `.v2-in` use line-height 1.6 (v2.css:550, 564). The address wraps to 2–3 lines at
  1.6. **Fix:** 1.85.
- **Counter format.** The factory reads «1 من 4» and the products read «1 / 5». **Fix:** use «1 من 5» in both
  (Sections.tsx:254–256).

### 15. POLISH: DESIGN.md has drifted from the code
| Item | DESIGN.md | Code |
|---|---|---|
| h1 | clamp(34, 5.2vw, 68) | clamp(34, 4.1vw, 58), plus a 30 px mobile override |
| h2 | 4vw | 3.4vw |
| manifesto | 4.4vw | 4.2vw |
| step numerals | 44 | 15 px |
| reg circle | 34 | 32 |
| crop marks | 14 | 8 |
| frame radius | 16 | 4 |
| bag radius | 0 0 18 18 | 4 4 18 18 |

**Fix:** settle the values via #3, #6 and #7, then update DESIGN.md so the critics and the audit measure against one source.

## What passes in this lens
- Arabic is never split into letters (the manifesto splits words only; the ghost plate duplicates the whole line).
- Heading line-height is 1.4 and body text 1.85–1.9.
- RTL motion is correct throughout: arrow nudges left, the bag copies slide to inline-end, the rail tears right→left,
  the colour bar fills right→left, and the Who cards enter from their own sides.
- Phone numbers and years use Western digits everywhere, isolated with `dir="ltr"`.
- «اكياس ذات غالق - ziplock bags» resolves in the right order.
- Four deep sections, none adjacent.
- The hero concept is owned and none of the banned skill examples are reused.

## Rubric (this lens)
- **Design-language coherence: 6.5.** Tokens exist, but the radius, shadow and colour lock has gaps and the pattern
  implementations are inconsistent.
- **Typography: 6.5.** Fonts are correct, but the h1 is not dominant, there are orphans, and the arrow falls back to a
  system font.
- **Composition & rhythm: 6.5.** The repeated header stack and the template Who/FAQ/footer pull it down.
- **Originality gate: PASS (concept), WEAK (execution).** At 1440/1280 the bag reads as a card.

## Skill rules that conflict with the DRAFT copy status (to log, not fix)
1. **Proof & assets (rubric dimension 7, F15).**
   - The product "proof" frames hold social-media cards with baked «ORDER NOW» text, orange arcs and a third party's
     phone number (صيدلية النخيل, `d1440/…-03.png`). Replacing them needs real photos from the user, so dimension 7 is
     asset-blocked.
   - The factory needs a higher-resolution original (#10).
2. **Product data is shared with `/products/:id`** (src/constants/products.ts): lowercase «ziplock bags» against
   «Ziplock Bags» in Contact.tsx:14, «مواد متينة ،» spacing, «للمحلات الملابس». Fixing these changes the old routes'
   copy, so it needs the owner's approval.
3. **F3 (h1 ≤ 3 lines on mobile) against hierarchy.** A larger mobile h1 (34 px+) would need a shorter headline. That
   is a copy change, so #3 instead solves hierarchy by shrinking the h2s.
4. **Orphans that CSS cannot fix** (3-word product h3s at 360: «شُنط مطبوعة / بشعارك», «اكياس سلوفان / بشريطه") need
   rewording, so they wait for copy approval.
5. **"One primary CTA label everywhere" (DESIGN CTA map)** against the variants «اطلب تسعيرة لهذه الشنطة»,
   «اطلب تسعيرة لهذا المنتج» and «إرسال أمر الطلب». This is a copy decision.

## STATUS
**NOT READY.** The measured floor passes, but there are 2 BROKEN craft defects (#1 channel bidi alignment, #2 footer
outline seams) and 8 WEAK system issues. The ones that matter most for the page's idea are #3 (h1 hierarchy) and #4
(the bag reads as a card on desktop). Fix #1–#5 before round 2.
