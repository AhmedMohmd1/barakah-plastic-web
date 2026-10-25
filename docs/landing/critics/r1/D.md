# Critic D, round 1: wow and section variety

Lens: *sections that are not alike, each with a distinctive, impressive animation or interactive motion.*
Page: http://127.0.0.1:4173/v2 (production build). Copy status: DRAFT (copy is not judged here).

## Method (what was actually run)
- Script: `C:\Users\AHMEDH~1\AppData\Local\Temp\claude\d--barakah-plastic-web\86bc40ec-ac8c-47df-9b47-fd93113ba7ab\scratchpad\critD.mjs`, using cdp.mjs. It scrolls natively with CDP `mouseWheel` events: 180 px steps at 1440×900 and 170 px steps at 390×844, waiting 260 ms per step and capturing a frame each time. It also records a 10-frame hero load timeline (300 ms to 7.2 s), hovers `.v2-cta-hero`, sweeps the pointer for the gloss, types «مخبز النور» into `#v2-try-name` one character at a time, switches all four ink radios (frames at 240 ms and 640 ms), opens FAQ items 1 and 3, and finally captures the closing stack with the typed name.
- Frames: `D-shots/desk/s000–s077.png` (78) and `D-shots/mob/s000–s093.png` (94). Section-at-centre logs are in `D-shots/desk/log.json` and `D-shots/mob/log.json`.
- Contact sheets (ffmpeg, frame index burnt in):
  - Desktop: `desk-sheet-0-hero-load.png`, `desk-sheet-1-hero-mf.png`, `desk-sheet-2-factory.png`, `desk-sheet-3-products.png`, `desk-sheet-4-try-who-how.png`, `desk-sheet-5-faq-contact-close.png`, `desk-sheet-6-interactions.png`, `desk-zoom-die.png`, `desk-hover-cta.png`.
  - Mobile: `mob-sheet-0-hero-load.png`, `mob-sheet-1-hero-mf-factory.png`, `mob-sheet-2-products.png`, `mob-sheet-3-try-who-how-faq.png`, `mob-sheet-4-contact-close-foot.png`, `mob-mf-zoom.png`.
- References were captured live with shot.mjs at 1440×900, scrollY 0 to 9900 in 900 px steps: `ref-sheet-terminal.png` (terminal-industries.com, SOTM Sep 2025, B2B industrial), `ref-sheet-lando.png` (landonorris.com, SOTY 2025; the capture shows the lime loader for 4 frames, then the collage, ON/OFF TRACK, the helmet grid), and `ref-sheet-airpods.png` (apple.com/airpods-pro, a sticky product object driven by CSS scroll timelines). palmer-dinnerware.com did not respond (curl 000) and was not used.

All paths below are relative to `docs/landing/critics/r1/D-shots/`.

## Section by section (desktop / mobile)

| # | Section | Moment actually seen | Trigger | Repeats previous? | Verdict |
|---|---|---|---|---|---|
| 1 | Hero | The bag panel settles, registration marks draw, the h1 rises, the blue line slides into register, a die drops, the chip falls, and the factory shows through the slot. Hovering the CTA slides two bag copies out by 14 and 28 px (`desk-hover-cta.png`). | load when seen, plus hover | n/a | **WEAK**. The story plays, but the climax is tiny (see F1). |
| 2 | Manifesto | Word-by-word dim→ink fill over a 170vh sticky (`desk-sheet-1` f4–f9; mobile `mob-mf-zoom.png`). Works on both sizes. | scroll-scrub | No | OK, but it is the stock B2 recipe: a grey→navy colour change only. |
| 3 | Factory | Pinned 400vh, 4 camera stops over the photo, a colour-bar progress, and the step text swapping (`desk-sheet-2` f13–f30). The strongest scroll moment on the page. | pin (IO step snap) | No | OK on desktop. **Mobile: none**. It becomes 4 stacked static crops (`mob-sheet-1` f12–f22). |
| 4 | Products | The sticky proof frame crossfades as the list spies, and the active number turns orange (`desk-sheet-3` f34–f47). | scroll position (IO index) | **Yes, in substance.** Same mechanism as 3: scroll position picks item *n* of a numbered register-mark list, and one sticky visual changes to match it. Field and scale differ; what the visitor does and the feedback do not. | **WEAK**. **Mobile: none**. A 4,348 px static list (`mob-sheet-2`, 25 frames with no motion). |
| 5 | Try your name | Typing mirrors the text onto a flat bag. The "press" is a 0.32 s fade from opacity 0.35 plus a 5 px offset (`desk-sheet-6`: the red frame at 240 ms is just pale text). | input | No | **WEAK**. This is the right idea and the only share candidate, but it is under-built (F4). |
| 6 | Who it's for | Two cards drift ±18% while entering (`desk-sheet-4` f53→f56). Generic two-card layout with 28 px line icons. | scroll-scrub | No | **WEAK**: card-pair slop. **Mobile: none** (`mob-sheet-3` f56–f62). |
| 7 | How to order | The dashed rail clips open right→left and the stations stamp in (`desk-sheet-4` f57–f60). | enter once (IO) | No | OK, small. |
| 8 | FAQ | Native `<details>`. The plus rotates to × and the answer fades down 6 px (`desk-sheet-6`, last tile). | click | No | **WEAK**: a stock accordion. The "register cross" has no circle, so it is a generic plus. |
| 9 | Contact | The FAQ dims to 35% as the sheet overlaps it (`desk-sheet-5` f63–f65). The contact section has no motion of its own: 1,248 px desktop and 1,935 px mobile of static form (`mob-sheet-4` f73–f83, 11 frames unchanged apart from position). | scroll (on the previous section) | No | **WEAK**. |
| 10 | Close + footer | Four small bags rise once in 0.8 s, half of their height lost to a mask. Giant outline wordmark (`desk/s077.png`). | enter once, plus scrub | **Yes**: the same trigger as 7 (enter-once IO with a one-shot stagger) two sections earlier. Not adjacent, but noted. | **BROKEN** (F2) / **WEAK** |

**Count.** On desktop, 7 of 10 sections have a moment beyond a plain reveal (1, 2, 3, 4, 5, 7, 10). Sections 6, 8 and 9 are decoration-level. That clears the 70% floor numerically, but only 1 (when it is seen) and 3 are *impressive*. On mobile only 5 of 10 have a moment (1, 2, 5, 7, 10). Factory, Products and Who all collapse to static stacks, so **the phone page fails the 70% rule.**

**Distribution.** Sections 3 and 4 together take 6,640 of 14,650 px on desktop (45% of the scroll). Both are "the sticky picture changes when the numbered item changes" (log: frames 11–47 of 77). For half the page the visitor's verb and feedback never change. This is the page's central variety failure.

**Thread.** The bag disappears from the screen between desktop frame 3 (y=540) and frame 48 (y=8,640), more than 8,000 px. The section-opener "handle slot" is a 28×10 px pill (`v2.css:95`). At reading distance it reads as a bullet, not a handle. Nothing travels: the hero object does not exit, morph or come back until the toy.

## Findings

**F1, WEAK (hero climax, the signature).** The punch, which CONCEPT.md calls the climax ("the moment the customer's product exists"), happens in a 188×56 px slot. That is about 0.8% of a 1440×900 screen. The die is a flat, translucent blue-grey rectangle with a pill outline (`desk-zoom-die.png`, top right). It reads as a loading skeleton, not a steel-rule die. The chip is white-on-white (`v2.css` `.v2-bag__chip`) and falls 160 px while fading, so it is effectively invisible. The bag jolts only 3 px. At t=1.1 s the second h1 line is caught half-clipped mid-rise (`desk-sheet-0` tile 2). The bag is `clamp(560px, 56vw, 820px)`, which is 56% of the width, not the ~86% the concept promised. Bag anatomy (seals, patch, ribs, registration marks) is 1 px at 6–10% alpha, so at a glance the hero reads as **"a white card on a dark photo"**. That is the exact look-alike CONCEPT.md said critics should check for (`desk-sheet-1` f0; mobile `mob-sheet-0`).

**F2, BROKEN (the closing callback).** The visitor's name is printed on only ONE of the four bags: the one whose ink they picked. For red, green or black that bag sits behind the others, rotated 9°, with the name clipped. `desk/close-named.png` shows «مخبز…» cut off on the back-right bag while the front bag still says «اسم محلك». The "your order, printed" payoff is lost for 3 of 4 inks, and the other three bags print the placeholder, which contradicts the claim. The 55% mask also cuts every bag in half. On mobile the bags are 150 px wide (`mob-sheet-4` f86–f89).

**F3, WEAK (sections 3→4 repeat).** See Distribution above. SECTIONS.md defends 3→4 as "pin→spy", but in the capture both are scroll-index-driven sticky media with a numbered list (`desk-sheet-2` vs `desk-sheet-3`).

**F4, WEAK (the toy).** Typing updates the text, and the "plate press" is a fade (`desk-sheet-6`, red tile). There is no impression, no second plate, and no register slide, even though the hero already built that language. The bag is the same flat rectangle as the hero, at the same 4:5 ratio, with the slot showing navy. There is no way to keep or share the result. At 1440×900 with the section top-aligned, the bag's bottom edge falls below the fold (`desk/try-ink-2-red-a.png`, bag runs from 431 px to about 931 px).

**F5, WEAK (mobile).** Three sections with no moment (3, 4, 6). Products is 4,348 px of static list. Contact is 1,935 px of static form. The phone story is: hero → manifesto → long static scroll → toy → long static scroll (`mob-sheet-2`, `mob-sheet-4`).

**F6, WEAK (art direction: mixed styles).** The product "photos" are social-media flyers. They carry baked-in orange arc swooshes, a teal ring, a logo lockup, Latin script titles and a fake «ORDER NOW» pill button (`desk/s039.png`). Inside the "print proof" crop-mark frame they clash with the page's navy film world, and the baked button sits next to a real «اطلب تسعيرة» link. The factory photo at the camera stops is upscaled about 1.8× from a 1536 px source (`s: 1.9`, `content.ts:33`) and turns visibly soft at 1440 (`desk/s023.png`: face and control panel smear).

**F7, POLISH.** The footer wordmark is a 1 px stroke at 16% white. It is barely visible, and `-webkit-text-stroke` exposes the Arabic glyph-overlap seams as little loops at the baseline joins (`desk/s077.png`, bottom row). FAQ × and Who card icons are generic UI kit.

**What works (credit where due).** The factory pin is a real, legible 4-beat story with progress. The hero CTA hover fan is visible and carries the claim (`desk-hover-cta.png`). The manifesto scrub is smooth and Arabic-safe (words only). The how-to-order rail tears in the reading direction. No scroll-jacking, and native speed is kept.

## Comparison with award references (captured)
- **terminal-industries.com** (`ref-sheet-terminal.png`): cinematic footage hero → logo wall → three cards → *"What's your yard costing you?"* calculator (visitor types, a big $ number answers) → x-ray wireframe over real footage. Its toy *returns a consequence* (a number). Ours returns an echo of the input. Its media changes at almost every boundary (video → photo → UI → wireframe). Ours goes photo → photo → photo-flyer for three sections in a row.
- **landonorris.com** (`ref-sheet-lando.png`): the ground changes every section (lime → stone → paper → black). Scale swings from collage to giant type to a dense helmet grid. Ours alternates fields well (credit), but scale stays "centred heading + content column" from section 4 to 9.
- **apple.com/airpods-pro** (`ref-sheet-airpods.png`): ONE object (the earbud) is the sticky protagonist that rotates, goes x-ray and returns across sections. Ours has the perfect object for this, the bag, and abandons it for 8,000 px.

Verdict against the refs: the page has the *ingredients* (field changes, one pin, one toy) but none of the three things those sites have: an object that travels, a toy with a consequence, and one moment big enough to screenshot.

## Scores
- **Dimension 11, wow and section variety: 5 / 10.** Desktop is 7/10 sections with a moment, but only 2 are impressive. Sections 3 and 4 are the same experience for 45% of the scroll. Mobile has 5/10. No shareable moment yet.
- **Dimension 12, art direction: 5 / 10.** Navy and film are coherent, and the factory photo is real material. But the hero bag reads as a flat card, the product imagery is flyer-style with baked UI and swooshes (mixed styles), and the factory crops are soft at the zoom used.

**The moment people would share:** **none today.** The only candidate is "my shop name on their bag" (section 5). As built it is a text mirror on a flat rectangle, with no impression, no keepable artefact, and a payoff at the close that hides the name (F2).

## Slop patterns found (10-wow §6 / catalog-libs §4)
1. Card pair with line icons as the section's only idea (Who), plus a stock accordion (FAQ). Close to "same reveal on every block" for sections 6, 8 and 9.
2. A long sticky where nothing new happens per viewport: the Products spy runs 5 × 58vh with only a crossfade, directly after a 400vh pin.
3. A decorative giant outline wordmark that does nothing and is nearly invisible (F7).
4. Not slop by rule, but a smell: the signature climax is small enough to miss, so the hero degrades to "card over photo".

None of the hard bans were found: no Arabic character splitting, no scroll-jacking, no bouncy easing, no long loader, no unpaused loops.

## The three highest-impact upgrades (all plain CSS + React, no GSAP needed)

### U1. "Through the handle": the punched slot becomes the window into the factory (catalog-libs C1 clip-path window, plus catalog-refs #2/#7 grid-cell-to-hero; S–M)
Turn the Factory entry into the page's screenshot moment, and make the hero climax pay off at full scale.
- The Manifesto's sticky stage is already the film colour (paper). After the last word fills, a handle slot is centred under the text. The Factory photo sits behind the whole viewport, clipped to that slot.
- `.v2-fac__window { clip-path: inset(calc(50% - 28px) calc(50% - 94px) round 28px); }` → `inset(0 round 0)`. Use `animation: v2-open-slot linear both; animation-timeline: view(); animation-range: entry 15% cover 50%;`. Inside it, counter-zoom the image `scale(1.25)` → `1` on the same timeline. Mobile slot: `inset(calc(50% - 20px) calc(50% - 64px) round 20px)`.
- Add 120vh of pre-roll on desktop and 90vh on mobile, so the opening happens while the slot is centred.
- Fallback when `@supports not (animation-timeline: view())` (Firefox): toggle a class from IO at threshold 0.4 and transition `clip-path 1.1s cubic-bezier(.65,0,0,1)`.
- Reduced motion: the full photo with no clip.
- Fix the hero die in the same pass, because the hero must teach "the slot is a window":
  - Draw the die as a steel rule: a 3 px `#c9d2df` stadium stroke on a `#16224a` block, with no translucent fill.
  - Drop 220 ms `cubic-bezier(.55,0,1,.45)`, then jolt the bag 6 px with the shadow tightening from `0 48px 90px` to `0 30px 50px`.
  - Print the chip with a fragment of the patch tint (`#e3e8ee` plus a hairline) so it is visible as it falls 70vh, rotating 35° behind the h1.
  - Make the bag 78–86vw on desktop as CONCEPT.md specifies, and raise seal/rib alpha to ≥ 18% so it stops reading as a card.
- The result is that the phone visitor also gets the factory moment, which today is a static stack (F5).

### U2. "Your print run": a real impression in the toy, and the close becomes the visitor's order (catalog-libs F1 calculator spirit, A6 stacking; S–M)
- **Toy press.** On a typing pause (keep the 220 ms debounce), run two plates.
  - Plate 1 (the chosen ink) wipes in from the reading-start edge: `clip-path: inset(0 0 0 100%)` → `inset(0)`, 380 ms, `cubic-bezier(.2,.8,.2,1)`.
  - Plate 2 is a `--accent` ghost copy that starts `translate(7px,-5px)` at opacity 0.6 and slides into register over 420 ms. Reuse `v2-register` from the hero, so the toy *repeats the hero's grammar on the visitor's own name*.
  - The bag dips 2 px under the plate (`translateY` 0 → 2px → 0, 180 ms).
  - Under reduced motion, the text updates instantly.
- **Consequence.** Next to the bag, show a live line «أقل كمية للطباعة: … · المقاس: …» from real catalogue data (no invented prices). Add a «احفظ صورة الشنطة» button that draws the bag and name to a `<canvas>` and downloads a PNG. That gives the visitor something to send to a partner, which is the share mechanic.
- **Close.** Show a stack of 9 bags. Every bag carries the visitor's name in their chosen ink, so the order reads as *theirs* and placeholders no longer appear (fixes F2). Use DOM transforms only:
  - Front bag at full opacity, centred, no rotation. The others are offset `translateY(-6px*i)` and `rotate(±(1.5..6)deg)`.
  - Each bag drops in with a 70 ms stagger, `translateY(-40vh)` → 0 at 520 ms `cubic-bezier(.55,0,1,.45)`, ending with a 3 px settle.
  - Remove the 55% mask and show the whole bag front.
  - When no name was typed, show «اسم محلك» on the front bag only and a prompt link back to `#try`.

### U3. Products as an RTL conveyor (catalog-libs A5 horizontal track; S–M). This breaks the 3→4 repeat.
- After the vertical pin, change the axis.
  - Desktop: a sticky 100svh stage with a horizontal track of the 5 categories that moves right→left as you scroll: `translateX(calc(var(--p) * (trackW - 100vw)))`, with the sign flipped for RTL.
  - Wrapper height = track width (about 5 × 62vw ≈ 310vw → about 260vh).
  - Add a 2 px progress line using the colour-bar patches.
- Each card shows the product on a clean film-white crop (crop the flyers to the bag only, behind a `#f4f6f8` matte, so the baked swooshes and «ORDER NOW» disappear; fixes F6). Specs and «اطلب تسعيرة لهذا المنتج» stay as real DOM text.
- Mobile: native `overflow-x: auto; scroll-snap-type: x mandatory`, with 82vw cards and `scroll-snap-align: center`. That gives the phone a swipe verb it does not have today.
- Reduced motion: the native horizontal scroller.
- This changes axis (vertical pin → horizontal track), verb (watch → slide), and scale (full-bleed → cards), so 3 and 4 stop being the same experience.

Smaller fixes after these three:
- Who: replace the card pair with the two buyer types *as two bag sizes* (wholesale stack vs. branded single), or make it a still, calm section on purpose.
- Footer wordmark: 6% solid fill instead of a 1 px stroke (removes the glyph seams).
- Opener pill: raise to 40×14 px with a 2 px stroke so it reads as a handle.

A dependency is not justified: U1–U3 are CSS scroll timelines plus IO fallbacks. GSAP only pays if the team wants scrubbed multi-element choreography in U1 (`ScrollTrigger` scrub 0.35, about 45 KB gz). The CSS version above is enough.

## STATUS
**FAIL on dimension 11 (5/10 < 8) and below the bar on dimension 12 (5/10).**
- BROKEN: F2 (the typed name is hidden or clipped in the closing stack for 3 of 4 inks).
- WEAK: F1 hero climax scale, F3 sections 3→4 repeat, F4 toy press, F5 mobile has 3 dead sections, F6 mixed product imagery and soft factory crops.
- POLISH: F7.
- Shareable moment: none yet. U1 ("through the handle") and U2 ("your print run") are the two candidates.
