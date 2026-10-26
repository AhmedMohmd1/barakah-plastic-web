# Critic round 2 — summary and triage

Scores (bar: hero ≥ 8.5, page ≥ 8, dim 11 ≥ 8):
- A (impression & motion): hero **7.5**, page **6.9** (7.1 without dim 7, asset-limited) — FAIL.
- B (craft & system): coherence 7.5 · type 6.5 · composition 7.0 — NOT READY (3 BROKEN, all small CSS).
- C (integrity & a11y): **PASS with reservations** — 0 BROKEN; audit PASS ×5; contact form 7/7 identical to `/`; 0 real SheetDB requests.
- D (wow & variety): dim 11 **6.5**, dim 12 **6** — FAIL; no shareable moment.

Reports: A.md, B.md, C.md, D.md (this folder). Fix work was split over three builder agents with
file/section ownership (hero + factory + Bag · toy + printBag · products/who/faq/contact/close/footer);
screenshots in `fix-shots/`.

## Fixed (round 3 build)
| Finding | Fix |
|---|---|
| A-N1 / D-F1b BROKEN hero runs on two clocks | pause rule `animation-play-state: paused !important` — later `animation` shorthands no longer un-pause sub/CTA/die/chip; story plays when seen, in order |
| A-N2/N4, D-F10 chip over the h1, chip looks like a button | no shadow at rest (shadow only inside the fall keyframes); shorter fall, gone before the headline |
| A-N3 die reads as a button press | darker steel rule + dark board line |
| A-N8 grey payoff window | `saturate(1.25) brightness(1.15)` |
| A-N7 / B wordmark seams | footer wordmark removed; replaced by a print slug (register mark, 4 ink patches, address · since 2011) + ribbed seal band |
| B-2 BROKEN manifesto off-centre | `margin: 0 auto` |
| A-N6 / D Who is a template | two `<Bag size="sm">` objects with the copy printed on them (wholesale = fanned stack, brand = «براندك» mark) |
| D-U3 Products = generic wipe grid; mobile repeats the factory reveal 9× | desktop: one film proof sheet with crop marks, colour bar marches in, photos grayscale→colour, open from the handle-pill on hover/focus; mobile: RTL snap rail with colour-bar position cue (Products 3,501 → 1,080 px; mobile page 15,960 → 13,696 px) |
| D-F9 / B-9 / C-P2 PNG has a transparent hole, flat bag | `printBag.ts` rewritten: factory crop through the slot (0 non-opaque px), baked off-register ghost, ply / seals / ribs / weld patch, logo, honest caption «معاينة توضيحية»; share sheet on touch («ابعت الصورة على واتساب»), download on desktop |
| D-U2 small toy | stage 480 px, fit-to-bag name up to 76 px, 3-px dip as the plate lands |
| B FAQ mark overshoots / FAQ no hover | toggle is the real `.v2-reg` symbol; hover/focus tint + 15° turn |
| D contact sheet weak / B ticket orphan / B WhatsApp uses an ink token | rise 160 px; heading nowrap; `--wa: #1f7a45` (AA) |
| B-6 / D-F10 close stack clips names at 390 | 3 bags on phones, every name whole |
| C-W2 no quote CTA at 768–1099 | mobile bar shows up to 1099 px |
| C-P3 nav shifts 64 px when the CTA toggles | CTA width reserved; fade + lift + `visibility` |
| C-P4 bar and the form's orange submit on screen together | the contact ticket counts as a primary CTA (hides bar + nav CTA) |
| C-P5 bar padding on desktop | scoped to < 1100 px |
| C-P1 textarea 41 % under the bar | focused control that ends behind the bar is scrolled clear |
| C8 focus lost after the modal | focus returns to the opener |
| C9 drawer stays open | closes on outside pointer-down and when focus leaves it |
| Hero / factory items (A-N5, D-U1, D-F8, B-1, B-3, B-4, B-5, C-W1) | see "Hero agent" below |

## Rejected / deferred (with reason)
- A dim 7 / A-F7 one factory photo / MOQ & lead time — asset-blocked: owner's photos and numbers (BRIEF §Missing assets).
- A-F10 copy register — copy is a DRAFT awaiting the owner.
- B-7 metric-matched Cairo fallback — CLS 0.053 max (< 0.1); needs `index.html` (shared with `/`). Logged.
- C-W3 `/` changed by Lovable merge 8232b32 — not v2 work; flagged to the owner. CONCEPT.md conflict markers from that merge resolved (both concepts kept, labelled).
- C10 Back restores scroll, C11, C12 — POLISH, not done.
- D desktop share sheet — desktop downloads on purpose (a "save" label must not open a share sheet).

## Rebuild after fixes (input to round 3)
- First audit of the fixed build FAILED: desktop CLS 0.29. Cause, isolated by probe: the factory window's animated
  `clip-path` and the camera's scale/pan `transform` changed `.v2-fac__cam`'s visual rect while pinned (Chrome counts
  both). Fix: the window opens with a mask (`mask-size` 196×64 → 300 %), the camera pans/zooms its `background`
  (paint-only, `cqw/cqh` maths); unzoom dropped. Also: FAQ exit-dim 0.35 → 0.22 (FAQ text dipped to 4.4:1 at 360)
  and the phone hero fine print got a solid navy backing (sampled 1.7:1 over bright photo pixels).
- audit-r3.json: **PASS** ×5 — folds 545/740, 562/844, 727/1024, 623/800, 685/900; CLS 0.054 / 0.021 / 0.042 /
  0.010 / 0.019; 0 contrast fails; 0 overflow; Cairo + Tajawal; 0 errors; reduced motion: no invisible text.
- DESIGN.md synced (tokens `--wa`, `--ink-dim`; patterns: FAQ toggle, photo window, close stack, footer slug,
  share PNG; section map rows 4/6/10; CTA visibility rule).
