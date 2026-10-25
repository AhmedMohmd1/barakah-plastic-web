<<<<<<< HEAD
# CONCEPT — البركة بلاست

## Candidates
| # | Metaphor (one line) | Hero object | Story beats | Climax | CTA coupling | Ownership (1 best–5) | Story | Buildable | Mobile | Culture | Total (lower ownership = better; others 5 = best) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **The first screen IS a bag** — a blank film panel gets your name printed and its handle punched | the hero section itself is a die-cut HDPE bag: film texture, side seals, a punched handle slot, print marks, the headline printed on it as ink | film panel settles → side seals draw → registration marks draw → the headline "prints" (plate lands, a mis-registered blue ghost slides into register) → the steel-rule die drops and punches the handle → chip falls, the factory shows through the hole | the die punch: the slug drops out and the bag becomes a bag (the moment the customer's product exists) | hover/focus the quote CTA → copies of the bag fan out behind it (an order = your bag, in quantity — «البركة») | 1 | 5 | 4 | 5 | 5 | **18** |
| 2 | Abundance counter — one bag multiplies into a growing stack | a stack of bags rising beside the headline | one bag → 10 → a pallet | the pallet completes | counter jumps by the next carton | 4 | 3 | 4 | 4 | 3 | 10 |
| 3 | Walking billboard — your printed bag carried across Egypt's governorates | a map of Egypt with bags lighting governorates | bag printed → handed over → lights spread | the 27th governorate lights | CTA lights your governorate | 3 | 4 | 3 | 3 | 4 | 11 |

Why the losers lost: (2) any wholesaler of anything can stack boxes — weak ownership, and counting implies capacity
numbers we do not have (PRODUCT.md forbids inventing them). (3) a lit map is a logistics grammar (close to this
skill's banned "route line" example), needs per-governorate claims we cannot prove, and illegible on phones.

## Chosen concept — «الشنطة هي الصفحة» (the page is the bag)
- Derivation chain: their product and their logo are both a bag (BRIEF §Name: the logo is a bag silhouette) and their
  mechanism is extrude → print → cut/punch (BRIEF §Mechanism, factory photo) → metaphor: "your bag being made" →
  object: the first screen as a blank die-cut bag panel → it moves the way a bag is made: the print lands in register,
  the die punches the handle → the quote CTA turns one bag into a stack of bags (the order).
- One sentence the user could say to a friend: «أول ما تفتح الموقع، الصفحة نفسها شنطة بتتطبع عليها الكلام ويتخرّم
  مكان الإيد قدامك — زي ما شنطتك هتتعمل في مصنعنا.»

## Hero object spec
- Geometry: a rectangle with 18 px bottom corners (heat-sealed bottom), a stadium-shaped handle slot (desktop 188×56,
  mobile 128×40) centred 40 px under the top edge, a 1-px side-seal line 14 px inside each edge, a reinforcement patch
  (slightly brighter rectangle 360×120 around the slot), registration marks (circle r=9 + cross) near four corners, a
  colour-control bar (4 ink patches) along the bottom-start edge, and the bag's small print (address · phone) at the
  bottom, exactly where real customer bags carry it (BRIEF assets: Dolce Shoes bag).
- Materials: generated HDPE film texture (ART.md shot 1) at 100% + a soft diagonal sheen gradient (white 0→18%) that
  follows a fine pointer by ±3%; ink = flat navy (#0f1b3d) and register blue (#3b6fa0); no drop shadow except one large
  ground-tinted shadow under the bag.
- Size on desktop: the bag panel is ~86% of the first screen (inset 40 px from the sides, top under the nav, bottom
  ~48 px above the fold) — the object is the stage. Behind it: the real factory photo, navy duotone, visible around the
  edges and through the punched handle.
- Climax position vs h1: the slot sits directly above the headline block (centre top of the bag); the h1 is the print.

## Narrative beats (each mapped to a business truth)
- setup (0–0.4 s): film panel settles 24 px up, side seals draw down — *a blank bag from our line* (truth 2: factory).
- build (0.4–1.5 s): registration marks draw, the headline lines rise into place, the blue line lands mis-registered
  and slides into register, ink patches fill one by one — *your print, in register* (fear: off-register printing).
- climax (1.6–2.0 s): the steel-rule die drops onto the slot, the bag jolts 3 px, the chip falls out, the factory
  appears through the hole — *the bag exists* (truth 3: the value is your bag).
- rest (≤ 2.8 s): die lifts out; everything still.
- idle hint: the reinforcement patch sheen sweeps once more at 6 s and 12 s (2 cycles), then stillness.

## Motif inventory (≥ 4 reuses)
1. Section opener: a small stadium "handle slot" outline + label (replaces the generic eyebrow).
2. Step marker: a registration mark (circle + cross) carrying the step number.
3. Progress indicator: the 4-patch colour-control bar — patches fill as the pinned factory story advances.
4. Artefact frame: real product photos sit in a "print proof" frame — hairline + crop marks at the four corners.
5. Closing callback: a stack of finished bags (the hero bag, multiplied) rising behind the last CTA.
6. Toy: the visitor's own shop name printed on a blank bag (section 5) — the hero's promise, made personal.

## Interaction
- hover / focus-visible on the hero «اطلب تسعيرة»: two copies of the bag edge slide out from behind the panel
  (8/16 px down and toward inline-end) — one bag becomes an order.
- press: opens the existing `RequestQuoteModal` (unchanged).

## Palette origin
- deep ground: navy #0f1b3d (existing system, matches the logo navy #002a4a family)
- paper: film white #f4f6f8 (the bag) / page paper #eceff3
- accent (you / your print / "here"): register blue #3b6fa0 (existing secondary; the second print plate)
- action (quote only): logo orange #f47a00 with navy text (user decision 2026-10-25)

## Originality test
1. Three other businesses that could use this hero object: a paper-bag maker, a packaging printer, a tote-bag brand
   — all are this company's own category (bag manufacturing). A restaurant, a SaaS or a clinic could not.
2. Overlap with the skill's example objects (roast curve, ledger, ECG, route line, tannour, nodes on a curve): none.
   No user references were given. The "card on a dark field" look is avoided by real bag anatomy (slot, seals,
   patch, register marks, small print, die punch) — critics should check this specifically.
3. «الصفحة نفسها شنطة بتتطبع وتتخرم قدامك — زي ما شنطتك هتتعمل في مصنعنا.»
=======
# CONCEPT — "الختم" (The Stamp)

Derivation: business fact (in-house logo printing, own factory since 2011) → metaphor (your mark pressed onto the bag) → object (dashed "شعارك هنا" stamp over the factory photo) → motion (stamp presses in at ~0.9s, ink ripple, done by ~2.3s) → CTA ("اطلب تسعيرة الآن" = get your mark on our bags).

Proof section uses only real facts from PRODUCT.md (2011, 5+ lines, 5 categories, delivery to all governorates). Invented testimonials removed from the page.
Reduced motion: final stamped state shown statically.
>>>>>>> 53214cf4861514c91d069980ba22f575dd23d481
