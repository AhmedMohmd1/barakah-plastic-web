# Critic C — Integrity & accessibility (round 2)

**Target:** `http://127.0.0.1:4173/v2`, a production build in `dist/` from 00:12:37. I compared it with `/` on the same server.
**Artefacts:** `docs/landing/critics/r2/C-shots/`. The probe scripts are in the session scratchpad; none of them edit project files.

**SheetDB safety.** Every test replaced `window.fetch` with a stub that records the body and returns `201 {"created":1}`. The CDP Fetch domain also blocked `*sheetdb.io*`, and the service worker was bypassed. Across all runs, the network-level block saw **0** real SheetDB requests.

**Caveats**
1. **The build is stale again.** `src/v2/v2.css` was edited at 01:19, after the 00:12 build. The edit touches 13 lines, mostly hero geometry (`.v2-hero__stage` top/bottom 56/28 → 44/16), chip/die styling, and `!important` on the paused hero animations. The fold and CLS numbers below are for the 00:12 build. They will move slightly once it is rebuilt.
2. **HEAD no longer matches the round-1 baseline for `/`.** See W3.
3. **Other critics ran Chrome at the same time** (up to 32 node processes). Performance numbers are single or double runs and are noisy.

## Round-1 findings: fixed or not

| R1 | Finding | Round 2 | Evidence |
|---|---|---|---|
| **C1** BROKEN | Focus hidden under the mobile bar (2.4.11 AA) | **FIXED** | Full Tab sweep, 57 stops each. At 360×640 and 390×844, **0 stops are fully or mostly covered by the bar**. `scroll-padding-bottom: 96px` is active while the bar shows. The only "offscreen" readings are elements still mid smooth-scroll; they settle at 342 and 444 px, clear of the bar (`c1-prodbtn-*.png`). A reverse Shift+Tab sweep at 390 also gives 0. One partial cover remains: the textarea is 41% under the bar, which is AAA only. See P1 |
| **C2** WEAK | Modal carries over the previous product and name | **FIXED** | Product 2 → type «محمد» → Esc → hero CTA gives the picker «اختر المنتج» and an empty name (`modal-v2-hero-after-prod2.png`). Try → Esc → close CTA gives «اختر المنتج». Reopening product 4 after typing clears the name. The fix is `key={quote.n}` |
| **C3** WEAK | h1 accessible name doubled | **FIXED** | The AX name is now «اسم محلك على كل شنطة، مطبوع في مصنعنا.» (once), and the region name is the same, at both 1440 and 390 |
| **C4** WEAK | Duplicate ids break the modal labels | **FIXED on v2** | 0 duplicate ids, both on the page and with the modal open. All 7 modal inputs resolve to their own label. `/` still has the clash (parity: shared code, left untouched) |
| **C5** WEAK | Live region speaks on every keystroke | **FIXED** | Typing «مخبز النور» (10 characters, 90 ms apart) gives **1** announcement, at +1.4 s / +1.6 s |
| **C6** WEAK | First paint later than `/` | **PARTIAL** | Desktop is fixed: FCP and LCP are now earlier than `/`. On throttled mobile, FCP is still 1.6–2.2 s later than `/`. See W1 |
| C7 | Focus ring changes the button radius | **FIXED** | The hero CTA stays at 12 px when focused (`:focus-visible` = true) |
| C8 | Focus not returned to the trigger after the modal closes | not fixed | After Esc, `activeElement` is BODY. `/` behaves the same |
| C9 | Drawer stays open when Tab leaves it | not fixed (deferred) | Tab moves from the drawer CTA into the hero while the drawer is still open |
| C10 | Title / scroll after leaving /v2 | **title FIXED**, scroll not | `/products/3` shows the site title. Back to /v2 lands at scrollY 0 |
| C11 | Header height read once | not fixed | `LandingV2.tsx:29` |
| C12 | Manifesto as h2; numbers inside headings | not fixed | h2 = 110-character sentence. Product and factory h3 names read «1 شُنط مطبوعة بشعارك» |
| C13 | No-JS blank | rejected (parity) | Body text empty, 0 `<noscript>`, same as `/` |
| C14 | Disk / repo hygiene | **FIXED** | `dist-r2/` is gone. The two stale round-1 profiles are gone. C: free space is now **8.5 GB** (it was 14 GB) |

## Pass/fail, full lens on the new build

| # | Check | Result | Numbers / evidence |
|---|---|---|---|
| F1 | `audit.mjs` at 5 sizes | **PASS** | verdict PASS, 0 hard fails (`audit-v2.json`) |
| F1a | Horizontal overflow | PASS | `overflowX:false` at 360, 390, 768, 1280 and 1440 |
| F1b | Hero CTA above the fold | PASS | CTA bottom / viewport height: 522/740, 586/844, 755/1024, 624/800, 684/900. At 360×640: 513/640 |
| F1c | One h1, line count | PASS | 1 h1 at every size; 3 lines at 360/390, 2 lines at 768/1280/1440 |
| F1d | Fonts actually rendered | PASS | h1/h2 Cairo; p Tajawal Medium |
| F1e | Text contrast (pixels) | PASS | 0 failures at all 5 sizes |
| F1f | Touch targets | PASS (advisory) | 0 under 24 px. Under 44 px on mobile: hero `tel` 75×24 and 11 footer links at 40 px tall (unchanged) |
| F1g | Obstruction | PASS | 0 obstructed controls. The skip link is on top when focused (`elementFromPoint` = `.v2-skip`) |
| F2 | CLS during load and full scroll | PASS | Audit: 0.011 / 0.049 / 0.029 / 0.034 / 0.033. Slow wheel scroll: 390 = **0.012** (font swap only), 1440 = **0.039**. Unlike round 1, there are now shifts *while scrolling*. See P3 |
| F3 | Console errors / exceptions | PASS | 0 in every run: perf at 1440 and 390, routes, modal, form, download |
| F4 | Reduced motion | PASS | Audit: 0 invisible text. `getAnimations()` = 0 running. Factory track `display:none` and list `grid`. 10/10 product windows have `clip-path:none` and opacity 1. Factory stick has `clip-path:none`. How/Close never armed. `scroll-behavior:auto` |
| F5 | Contact form = `src/components/Contact.tsx` | **PASS** | 7 cases (empty, short phone, bad prefix, `a@b`, blank message, phone with spaces, valid) give **IDENTICAL** native validity, errors, toast, POST count and field reset. Both pages post to `…/az68rhltg636u`: POST, `Content-Type: application/json`, the same 8 Arabic keys and values. The `required` set and input types are the same (`form-diff.json`) |
| F6 | Every quote CTA → `RequestQuoteModal` | **PASS** | Hero, nav, 5 products, try and close all open «طلب عرض سعر» with submit «طلب». The drawer CTA and the mobile-bar CTA call the same `openQuote()`. Product buttons pass the right name. The product-3 payload is **byte-identical** to `/`'s product-3 payload. The try CTA sends «الموضوع: شُنط مطبوعة بشعارك». After submit, the dialog closes |
| F7 | wa.me / tel / mailto / product links | PASS | 4× `https://wa.me/+201009923040` (`_blank`, `noopener noreferrer`), 4× `tel:+201009923040`, `mailto:info@elbarkaplast.com`. All 8 `#` anchors resolve. Direct loads of `/products/1…5` show the right h1 and no 404. SPA navigation to /products/3 and Back both work |
| F8 | `/` unchanged | **PASS (served build)** — see W3 | The v2 commit `611897c` touches only `src/App.tsx`, `src/v2/**` and docs. `git diff HEAD` on shared code is empty. At runtime on `/`: LandingV2 chunk never requested, 0 `[class*=v2-]` nodes, title and h1 unchanged. `LandingV2-*.css` has 491 selectors, all `.v2-*`, `.on-deep` or `html:has(.v2-mbar…)` |
| K1 | Tab order | PASS | 1440 (61 stops): skip → logo → 6 nav links → hero CTA → «جرّب اسمك» → tel → 5×(quote, details) → name → phone → ink radios → try CTA → **«احفظ صورة الشنطة»** → 7 FAQ → 3 channels → 8 fields → submit → close CTA → WhatsApp → 14 footer links. At 390 the menu button replaces the nav. 0 inert or `aria-hidden` stops (`kbd-1440.json`, `kbd-390.json`) |
| K2 | Visible focus ≥ 3:1 on every surface | PASS | Median contrast of changed pixels, focused vs. blurred: navy ring 12.2–16.9:1, orange ring on navy 6.0–6.6:1. Lowest median 6.02:1 (try name input at 390) |
| K3 | Nav CTA hides while ANY `.v2-cta-primary` is visible | PASS | 1440 scroll scan, every 50 px: hidden + `inert` over hero (0–600), try (7550–8400) and close (11250–12100), shown otherwise. **0 scroll positions with two primary CTAs on screen**; hidden always means `inert` |
| K4 | Mobile bar rules | PASS | 390: shown 550–7950 and 8850–13250. Hidden + `inert` + `aria-hidden` over hero, try and close (13300+). 360: the same pattern. 0 positions with bar + primary CTA. Never in the Tab order while hidden. **Gap at 768–1099 px — see W2** |
| K5 | Drawer | PASS | Enter → `aria-expanded=true`, focus on the first link. Esc → closed, focus back on the menu button. Open+Esc at once also works (C9 still open) |
| K6 | Skip link | PASS | Enter → `#main`; next Tab → hero CTA |
| K7 | Focus not obscured (2.4.11 AA) | **PASS** | See C1 above |
| SR | Screen-reader semantics | PASS | One h1, single name. 11 named regions. Factory: one exposed «ده مصنعنا في قليوب.» h2 per layout. 0 unnamed controls. 0 duplicate ids. Live region quiet |
| DL | «احفظ صورة الشنطة» download | **PASS** (with P2) | Keyboard Enter → `شنطتي-البركة-بلاست.png`, 1080×1350, 250 KB, completed at 1440 and 390. The empty name gives the default «اسم محلك». The name, phone (LTR) and chosen ink (red) render in Cairo (`download-bag.png`). **Network requests during save: 0** (data: URL, fonts already loaded), and 0 SheetDB requests. Focus stays on the button. The privacy note «لا يُرسل لأي مكان» holds |
| P | Performance vs `/` | MIXED | Table below; see W1 |

### Performance

Two runs per URL in the throttled rows; the 1440 row is a single run. Throttling: 4× CPU, 1.6 Mbps, 150 ms RTT, 390×844.

| | /v2 1440 | / 1440 | /v2 390 throttled | / 390 throttled |
|---|---|---|---|---|
| First-load transfer | **513 KB** | 723 KB | **513 KB** | 791 KB |
| After a full scroll | 975 KB | 831 KB | 976 KB | 1 078 KB |
| FCP | **1 548 ms** | 1 820 ms | **5 604 / 8 164 ms** | 4 036 / 5 960 ms |
| LCP | **1 548 ms** (`img.v2-hero__photo`) | 2 020 ms | **5 604 / 8 164 ms** | 6 952 / 8 696 ms |
| Longest task | 244 ms | 497 ms | 2 909 ms | 1 470 ms |

Throttled waterfall for /v2: `index.js` finishes at about 1.3 s; then `LandingV2.js` is requested at 1.57–1.87 s; then `hero.webp` (163 KB) is requested at 2.1–2.3 s and arrives at 3.8–4.3 s. The hero starts playing at 4.9 s and 8.8 s. Files: `perf-v2.out`, `perf-root.out`, `perf2.out` in the scratchpad. "After a full scroll" grew from 726 to 975 KB because the product cards now use `images[1]`.

---

## Defects

### BROKEN
None.

### W1 — WEAK · On mobile, the first paint is still later than on `/` (C6 residual)
- **Throttled 390:** FCP 5.6 s and 8.2 s vs. 4.0 s and 6.0 s on `/`. FCP equals LCP equals the hero photo, so **no text paints before the photo**. LCP itself is equal to or better than `/`. On desktop the fix worked (FCP 1.55 s vs. 1.82 s).
- **Why:**
  1. The preload in `App.tsx` runs only when `index.js` has run, so the chunk is still one waterfall step later (+0.3–0.6 s).
  2. The hero copy is `.v2-a`, and its animation is held at keyframe 0 (opacity 0) until `data-play`. That needs fonts ready, two frames and the IntersectionObserver (or the 1.5 s fallback, which stretches under a 2.9 s long task).
- **Fix:**
  - Let the h1 (and sub) paint visible at first render: animate only `transform`/`clip-path`, not opacity, for the text, or start the hero copy at its final state and animate decorative parts only.
  - Optionally, add an inline `<script>` in `index.html` that, on `/v2`, injects `<link rel="modulepreload">` for the LandingV2 chunk. That needs a Vite plugin or manifest lookup for the hashed name. Re-measure afterwards.

### W2 — WEAK (new) · At 768–1099 px there is no persistent quote CTA
- `.v2-hdr__cta` is `display:none` below 1100 px (`v2.css:164`), and `.v2-mbar` is `display:none` from 768 px up (`v2.css:646`).
- At 768×1024, from y = 700 to 8200 and from 9200 to 13050 (about 11 300 of 15 948 px), no primary CTA is on screen. The only quote paths are the per-product text links and the drawer behind the menu button.
- This covers tablets and small laptops.
- **Fix:** show the bar up to 1099 px (`@media (min-width: 1100px) { .v2-mbar { display:none } }`), or show the nav CTA from 768 px, keeping the same `inert` rule.

### W3 — WEAK (process / integrity flag, not caused by v2 code) · HEAD now changes `/`
Merge `8232b32` (00:55, after the served 00:12 build) brought in three Lovable-bot commits (`30a6bdc`, `4db2d30`, `c1f350f`, from 21:46):
- `FactoryProof.tsx` replaces `Testimonials` in `src/pages/Index.tsx`.
- `src/components/Hero.tsx` gains 15 lines.
- In the Navbar and Footer, «آراء العملاء» → «مصنعنا».
- `src/index.css` gains 22 lines of global keyframes and classes (`stamp-press`, `ink-line`).
- `docs/landing/CONCEPT.md` was also edited.

The served build passes "`/` unchanged" (it still contains «آراء العملاء» and no `stamp-press`). **The next build or deploy will ship a different `/`.** Nothing in it collides with `.v2-*`. The owner should confirm that these upstream changes are intended before the next `npm run deploy`.

### POLISH
- **P1 — Textarea partly under the bar (2.4.12 AAA).** At 390×844, Tab from «المقاس أو السماكة» to the message textarea leaves it at 698–829 px, with the bar top at 775 px: **41% hidden**, 77 px visible (`c1-textarea-sweep-390.png`). Chrome does not scroll a partly visible element, even with `scroll-padding`. **Fix:** a `focusin` listener on `.v2` that runs `el.scrollIntoView({block:'nearest'})` when the bar is shown and `rect.bottom > innerHeight - 96`. That call respects the 96 px padding.
- **P2 — The downloaded PNG has a transparent handle hole.** The pixel at the slot centre is `rgba(0,0,0,0)`: `destination-out` in `printBag.ts` erases the navy ground as well as the bag. It shows white in most viewers and black or checkered in WhatsApp dark mode and some galleries. **Fix:** after punching, `c.globalCompositeOperation='destination-over'; c.fillStyle='#0f1b3d'; c.fillRect(0,0,W,H)`. Or draw the bag on its own canvas layer.
- **P3 — Layout shifts while scrolling (round 1 had 0).** At 1440:
  - `v2-fac__shade` gives 0.0238 when the factory "opens through the handle". Chrome counts the `clip-path` change of the sticky stick as a visual-rect shift: x 24→0, w 1416→1440.
  - The nav CTA's `max-inline-size` transition slides the 6 nav links 64 px on each toggle. There are 6 toggles per page, about 0.002 each.
  - Total 0.039, still a pass. **Fix:** reserve the CTA's width and animate it with `opacity`/`transform` (or position it absolutely). The factory shift is a Chrome measurement side effect and can stay.
- **P4 — Bar and contact submit button on screen together.** At 390 and 360, there are 160–200 px of scroll where both orange buttons show (`bar-and-submit-*.png`). The bar also stays visible while the visitor fills in the contact form, offering a second, competing form (the modal). **Fix:** add `#contact .v2-ticket` to the elements observed by `io1`, so it hides the bar the same way the primary CTAs do.
- **P5 — Desktop gets the bar's scroll padding.** `html:has(.v2-mbar[data-show='true'])` also matches at ≥ 768 px, where the bar is `display:none` (`data-show` is true between hero and close). Desktop therefore gets 96 px of bottom scroll padding for nothing. Harmless; scope it under `@media (max-width: 767px)`.
- **Carried over:** C8 (focus return after the modal), C9 (drawer: close on focus-out and outside click), C10 (Back restores the product-list scroll), C11 (`--hdr` read once), C12 (manifesto `<h2>` → styled `<p>`; `aria-hidden` on the `.v2-reg` numbers inside headings).

---

## Summary
- **All round-1 defects that blocked the page are fixed and re-measured:**
  - C1: 0 focus stops covered by the bar at 360×640 and 390×844.
  - C2: generic CTAs always open on «اختر المنتج».
  - C3: single h1 name.
  - C4: 0 duplicate ids, so modal labels resolve.
  - C5: 1 announcement per pause.
  - C7: the focus ring keeps the button radius.
- **Business integrity holds on the new build:**
  - The contact form is identical to `Contact.tsx` in 7 out of 7 cases (same endpoint and 8 keys).
  - All quote CTAs open `RequestQuoteModal`, and the product-3 payload is byte-identical to `/`'s.
  - The wa.me, tel, mailto and /products links are correct.
  - 0 real SheetDB requests.
- **The new download button** works by keyboard, produces a 1080×1350 PNG and sends nothing over the network. The only issue is the transparent hole (P2).
- **The measured floor passes:** audit PASS at 5 sizes, 0 contrast fails, CLS ≤ 0.049, 0 console errors, every focus ring ≥ 6.0:1, the reduced-motion final state is fully visible, and the nav CTA and mobile bar never double up with a primary CTA.
- **Open issues:** mobile FCP is still behind `/` (W1); tablets have no persistent CTA (W2); HEAD now carries upstream changes to `/` that need the owner's confirmation (W3); plus 5 new POLISH items.

**STATUS: PASS with reservations — 0 BROKEN, 3 WEAK (W1 mobile first paint, W2 768–1099 px CTA gap, W3 `/` changed in HEAD by the Lovable merge), 5 new POLISH + 5 carried POLISH.** The C1–C5 and C7 fixes are verified on the 00:12 build. Rebuild before the next round, because `v2.css` changed at 01:19.
