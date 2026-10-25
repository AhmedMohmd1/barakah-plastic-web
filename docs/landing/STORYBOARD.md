# STORYBOARD — hero «الشنطة هي الصفحة»

Archetype: **living object** (code-drawn bag panel = the hero's text surface) over a **real** factory photo backdrop
(navy duotone), seen around the bag and through the punched handle. Why: the object is geometric (a film rectangle,
a punched slot, seal lines, register marks) so code draws it crisply at every size; the only organic material (the
film) is a near-flat surface rendered with procedural noise + soft gradients; the proof (factory) is the real photo.
Codex image generation was unavailable in this environment (2026-10-25: "no image generation tool"), so no generated
bitmaps are used.

Composition (not the default "text start + object end"): **the object is the text panel** — the bag fills the first
screen and the headline is printed on it, centred like a real customer bag (name big, address + phone small at the
bottom). The handle slot sits at the top centre, directly above the headline, so the climax happens where the eye
lands first.

Budget: setup ≤ 0.4 s · build ≤ 1.6 s · climax ≈ 1.6–2.0 s · rest ≤ 2.8 s · idle hint finite.
Final state = reduced-motion state. Plays when SEEN (fonts ready + 2 rAF + IO ≥ 0.45, fallback 4 s).

| Beat | What changes on screen | Start (s) | Duration (s) | Easing | Technique | Meaning (business truth) |
|---|---|---|---|---|---|---|
| setup | bag panel rises 24 px into place; side seal lines draw top→bottom (scaleY 0→1) | 0.00 | 0.45 | cubic-bezier(.2,.8,.2,1) | translate + scale | a blank bag off our line (truth 2: factory) |
| build 1 | 4 registration marks draw (stroke-dashoffset 1→0, 90 ms stagger) | 0.30 | 0.50 | cubic-bezier(.4,0,.2,1) | draw | print starts — precision |
| build 2 | h1 line 1 and line 2 rise inside their line masks (translate 105%→0, 90 ms stagger) | 0.45 | 0.60 | cubic-bezier(.16,1,.3,1) | masked line rise (lines only, Arabic-safe) | your name lands on the bag |
| build 3 | blue ghost of line 2 starts 7 px / −5 px off and slides into register, fading .55→0 | 1.00 | 0.50 | cubic-bezier(.65,0,.35,1) | translate + opacity | the second plate lands in register (fear: off-register print) |
| build 4 | colour-bar patches fill (scale 0→1), 80 ms stagger | 1.05 | 0.40 | cubic-bezier(.2,.8,.2,1) | scale | every colour checked on the strip |
| climax | steel-rule die drops 150 px onto the slot (180 ms, ease-in), bag jolts 3 px, the film chip falls 160 px rotating 14° and fades, the factory appears through the hole | 1.60 | 0.45 | cubic-bezier(.55,0,1,.45) then (.2,.8,.2,1) | assemble (the ONE weighted move) | the bag exists — the customer's moment of value |
| rest | die lifts 50 px and fades | 1.95 | 0.40 | ease-out | fade | done; everything still by 2.4 s |
| idle hint | a light sweep crosses the reinforcement patch | 6.0 and 12.0 | 1.2 each (2 cycles) | linear | gradient translate | the handle invites the hand → CTA |

## CTA coupling
hover / focus-visible on the hero «اطلب تسعيرة» → two copies of the bag (behind the panel) slide out 12 / 24 px toward
the inline-end and down: one bag becomes an order (abundance, «البركة»). CSS only: `.v2-hero:has(.v2-cta-hero:hover,
.v2-cta-hero:focus-visible) .v2-bag-copy`. No connector line (avoids the borrowed "wire" grammar). Press → the existing
`RequestQuoteModal`.

## Mobile
The bag fills the width (12 px inset); slot 128×40; h1 + CTA inside the bag above the fold at 360×640; story plays when
the bag is ≥ 45 % visible (on load it already is). Backdrop photo is cropped to the towers (object-position 22% 30%).

## Closing callback
The close section shows four finished bags stacked and offset (the hero bag, multiplied), printed with the name the
visitor typed in the "try" section (default «اسم محلك»); they rise into place once when the section enters. Crop
softened with a mask gradient at the bottom; `pointer-events: none`.
