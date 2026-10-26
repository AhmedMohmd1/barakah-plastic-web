# Critic C: integrity and accessibility (round 3, final)

**Target:** `http://127.0.0.1:4173/v2`, the production build in `dist/` built at 02:10:42. I compared it with `/` on the same server, which was restarted later on the same build.
**Evidence:** `docs/landing/critics/r3/C-shots/`. The probe scripts are `critC3-*.mjs` in the session scratchpad. None of them edit project files.

**SheetDB safety.** Every page ran with these protections:
- `window.fetch` was replaced by a stub that records the body and returns `201 {"created":1}`.
- The CDP Fetch domain blocked `*sheetdb.io*` and counted every hit.
- `Network.setBypassServiceWorker` was set, and `serviceWorker.register` was stubbed out.

Across every run (Tab sweeps, modal, form parity, drawer, save/share, CLS, performance), **real SheetDB requests = 0**, and the network-level block saw 0 attempts.

**Caveats**
1. **The source has moved past the build.** `src/v2/LandingV2.tsx` was edited at 02:35, after the 02:10 build. That edit fixes B1 below. Everything else here was measured on the 02:10 build.
2. Other critics ran Chrome at the same time, so performance numbers are noisy.
3. The `/` route carries the Lovable merge `8232b32`, which was already flagged to the owner. This round, `/` shows «مصنعنا» in the nav, a `stamp-press` element, and no «آراء العملاء». That change is not v2 code and is not re-raised here.
4. Shared code is untouched: `git diff HEAD` lists only `src/v2/**`.

## Round-2 findings: fixed or not

| R2 | Finding | Round 3 | Evidence |
|---|---|---|---|
| W1 | Mobile first paint later than `/` | **Not fixed** | Throttled 390: FCP 5 600 / 5 636 ms on /v2 vs 3 856 / 4 748 ms on `/`. FCP still equals LCP equals the hero photo. See W3 |
| W2 | No persistent CTA at 768–1099 | **FIXED** | The bar shows up to 1099 px. At 768 and 1099, `display:flex`, `data-show=true` between the hero and the close section. The mbar CTA at 768 opens the modal and focus returns to it |
| W3 | `/` changed by the Lovable merge | Flagged to the owner (not v2) | `/` currently: «مصنعنا» nav link, 1 `.stamp-press`, no «آراء العملاء» |
| P1 | Textarea 41 % under the bar | **FIXED** (the ticket hides the bar) | 390 sweep: every contact field and submit has `barOn=false`, and the textarea sits at 542–673 px. **New regression from the same nudge: B1** |
| P2 | Transparent handle hole in the PNG | **FIXED** | 1080×1350, **0 non-opaque pixels** (`download-bag-1440.png`) |
| P3 | Layout shifts while scrolling | **FIXED** | Slow wheel scroll to the bottom: 0 shifts ≥ 0.001 after load at 390, 768 and 1440. All CLS now comes from the font swap at load |
| P4 | Bar and contact submit on screen together | **FIXED** | 390/360 sweeps: the bar is hidden at every ticket stop (8 fields and submit) |
| P5 | Bar scroll-padding on desktop | **FIXED** | Scoped to `max-width: 1099px` |
| C8 | Focus lost after the modal closes | **FIXED, except the drawer CTA** | 25 of 27 openers get focus back. The drawer CTA does not (W1) |
| C9 | Drawer stays open when focus leaves | **FIXED** | Tab past the drawer CTA closes it; Shift+Tab past the menu button closes it; an outside pointer-down closes it. A click inside keeps it open. Clicking the menu button toggles it |
| C10 | Back restores product-list scroll | Not fixed (POLISH, deferred) | n/a |
| C11 | `--hdr` read once | Not fixed (POLISH, deferred) | `LandingV2.tsx:39` |
| C12 | Manifesto as h2; numbers inside h3 names | Not fixed (POLISH, deferred) | The AX h3 names are «1 أبراج النفخ», «3 شنط قماش», and so on. The manifesto is a long h2 |

## Pass/fail on the 02:10 build

| # | Check | Result | Numbers / evidence |
|---|---|---|---|
| I1 | Contact form = `src/components/Contact.tsx` | **PASS** | 7 cases: empty, short phone, bad prefix, `a@b`, blank message, phone with spaces, all fields. All 7 give **IDENTICAL** native validity, inline errors, toast, POST count and field reset on /v2 and `/`. Both post to `…/az68rhltg636u` (`LEAD_FORM_ENDPOINT`), POST, `Content-Type: application/json`, with the same 8 Arabic keys: الأسم, اسم الشركة, رقم التليفون, البريد الالكتروني, الموضوع, الكمية المطلوبة, المقاس أو السماكة, الرسالة. Required set and input types are identical (`form-diff.json`) |
| I2 | Every quote CTA → `RequestQuoteModal` | **PASS** | 1440: hero, nav, 5 products, try, close. 768/390: hero, mbar, drawer, 5 products, try, close. All open «طلب عرض سعر». Generic CTAs show the «اختر المنتج» picker. Each product button prefills its own name and photo (1–5). The try CTA prefills «شُنط مطبوعة بشعارك». Stubbed submit of product 3: «الموضوع: شنط قماش», 8 keys, the dialog closes, and focus returns to the button (`modal-ctas.json`) |
| I3 | wa.me / tel / mailto / product links | PASS | 4× `https://wa.me/+201009923040` (`_blank`, `noopener noreferrer`), 4× `tel:+201009923040`, 2× `mailto:info@elbarkaplast.com`. All 21 `#` anchors resolve. Direct loads of `/products/1…5` show the right h1 and no 404 |
| I4 | `/` unaffected by v2 | PASS | `/` never requests the LandingV2 chunk. It has 0 `[class*=v2-]` nodes, and its title and h1 are its own. `App.tsx` preloads the chunk only when the path starts with `/v2` |
| A1 | `audit.mjs` at 5 sizes | **PASS** | verdict PASS, 0 hard fails, 0 contrast fails, 0 obstructed, no overflow. Folds: 545/740, 562/844, 732/1024, 623/800, 685/900. 1 h1 at every size. Cairo/Tajawal actually rendered. Advisory only: hero tel at 75×24 and 11 footer links at 40 px tall (`audit-v2.out`) |
| A2 | Tab / Shift+Tab sweeps, 360 · 390 · 768 | **PASS** | 56 stops each way at each size. 0 stops end under the bar, 0 off screen, 0 inside `inert`/`aria-hidden`, 0 without a ring. (One 360 reading was mid-scroll; the screenshot shows it settled clear: `tab-360x640m-fwd-07.png`.) Order: skip → logo → menu → hero CTA → try link → tel → 5×(quote, details) → try name, phone, ink, CTA, share → 7 FAQ → 3 channels → 8 fields → submit → close CTA, WhatsApp → 14 footer links |
| A2d | Tab sweep, 1440 | **FAIL (B1, fixed in source)** | 61 stops. **12 forward and 9 reverse stops end with the focused element completely above the viewport** (bottom at −16 px). See B1 |
| A3 | Snap rail by keyboard | PASS | Tab walks cards 1→5. The rail scrolls (scrollLeft 0 → −325 → −660 → −996 → −1320), each focused link is fully inside the rail, and the cue reads «1 من 5» → «5 من 5». Shift+Tab walks back. ArrowLeft/Right on a focused card link also page the rail and update the cue |
| A4 | Accessible names / semantics | PASS | 0 unnamed interactive nodes, 0 duplicate ids, one h1. 10 named regions plus banner, main and contentinfo. 11 named images. The Who bags expose their h3s («لو بتشتري بالجملة», «لو عندك براند أو محل»), and «براندك» is `aria-hidden`. The factory h2 is exposed once at 1440. The menu button toggles «فتح/إغلاق القائمة» with `aria-expanded` |
| A5 | Live regions | PASS (see W2 for save focus) | Two regions, both visually hidden and not inside `aria-hidden`: the preview (`aria-live=polite`) and save status (`role=status`). Typing «مخبز النور» (10 characters): 1–3 updates (debounced at 260 ms). Download path: «اتحفظت صورة الشنطة على جهازك.» once, and a repeat save clears and re-announces it. Share paths (stubbed `navigator.share`): success and cancel stay silent, which is right because the sheet is the feedback. `NotAllowedError` falls back to a download and announces it |
| A6 | Save / share | PASS (with W2) | 1440 fine pointer: label «احفظ صورة الشنطة», Enter downloads `شنطتي-البركة-بلاست.png`, 0 network requests. 390 coarse pointer: label «ابعت الصورة على واتساب», shares `baraka-plast-bag.png` as `image/png` with the text «اسم محلنا على شنطة البركة بلاست» |
| A7 | Reduced motion | PASS | At 1440 and 390, after a full scroll: 0 running animations, 0 invisible text, 0 `data-armed` sections. Factory window mask at final `300% 300%`, track `display:none`. Product photos have `filter:none`. Manifesto words full ink. The hero plays at once. (`scroll-behavior` is still `smooth`: P1) |
| A8 | CLS (load + full slow scroll) | PASS | 390: **0.039**; 768: **0.037**; 1440: **0.033** (session window). Every shift ≥ 0.001 is the hero font swap in the first 2 s. **0 shifts while scrolling.** Audit load CLS: 0.018 / 0.021 / 0.042 / 0.001 / 0.019 |
| A9 | Console errors / exceptions | PASS | 0 in every run |
| A10 | Modal focus return | **PASS except the drawer** | 25/27 openers get focus back. The drawer CTA at 768 and 390 leaves focus on BODY (W1) |
| A11 | Drawer | PASS | Enter opens it and focuses «المصنع». Esc closes it and refocuses the menu button. Focus-out and outside pointer-down both close it. A link click closes it and scrolls to the target (top 88 px, clear of the 60/72 px header). The drawer stays attached under the sticky header at y = 6000 |
| A12 | One primary CTA per screen | PASS | Sweeps: the bar is hidden at the try CTA, the ticket and the close CTA. The nav CTA is hidden while the hero CTA is visible |
| P | Performance vs `/` | **MIXED (W3)** | Table below |

### Performance (cold cache, two runs each; throttled = 4× CPU, 1.6 Mbps, 150 ms RTT)

| | /v2 1440 | / 1440 | /v2 390 throttled | / 390 throttled |
|---|---|---|---|---|
| FCP | 2 676 / 1 792 ms | **1 384 / 1 576 ms** | 5 600 / 5 636 ms | **3 856 / 4 748 ms** |
| LCP | 2 676 / 1 792 ms (`img.v2-hero__photo`) | **1 468 / 1 660 ms** | **5 600 / 5 636 ms** | 5 704 / 6 248 ms |
| First-load transfer | **536 KB** | 714 KB | **536 KB** | 749 KB |
| Longest task | 474 / 278 ms | 352 / 465 ms | 1 731 / 2 064 ms | 1 928 / 2 556 ms |

The waterfall is unchanged. The `LandingV2` chunk is requested 340–470 ms (desktop) or 1.1–1.2 s (throttled) after `index.js`, and `hero.webp` only after that. No text paints before the photo. The desktop gap (+0.2 to +1.3 s) is within the noise of the concurrent runs but did not repeat round 2's lead. On mobile, LCP is equal or better than `/`, and FCP is still about 1–1.7 s behind (`perf.json`).

---

## Defects

### BROKEN

**B1 · Known: fixed in source, pending rebuild.** On desktop (≥ 1100 px), every Tab or click scrolls the focused element off the top of the screen.
- **Cause:** the mobile-bar `focusin` "nudge" runs while the bar is `display:none`. `bar.getBoundingClientRect().top` reads 0, so `overlap = el.bottom` and the page scrolls by `el.bottom + 16`.
- **Confirmed on the served build:**
  - At 1440, 1280 and 1100, Tab from product 1's quote button to «التفاصيل والصور» ends with that link at top −60 and bottom −16 (y jumps by about 480–530 px).
  - At 1099, where the bar is shown, the same Tab is fine.
  - 1440 sweep: 12/61 forward and 9/61 reverse stops are off screen (`nudge-1440-focus-lost.png`, `tab-1440x900-fwd-13.png`).
- **Fix:** already in `LandingV2.tsx` (02:35): `if (!bar.getClientRects().length) return;`. **Rebuild and re-run the 1440 sweep.**

### WEAK

**W1 · Focus is not returned after the modal opened from the drawer CTA (C8 residual).**
- `openQuote()` stores the drawer button as the opener. The drawer then closes (`hidden`), so `opener.focus()` fails silently and focus lands on BODY. This happens at 768 and 390.
- **Fix:** in `closeQuote`, fall back when the opener is not focusable. For example:
  ```js
  const t = opener.current;
  if (t?.isConnected && t.getClientRects().length) t.focus();
  else menuBtnRef.current?.focus();
  ```
  Or record the menu button as the opener in the drawer CTA's `onClick`.

**W2 · Saving the bag image drops keyboard focus.**
- The save/share button gets `disabled={saving}` while the PNG renders. Disabling the focused button blurs it, so `activeElement` becomes BODY. This was observed both during and after the save at 1440.
- A keyboard or screen-reader user loses their place: the status message is announced, but focus is gone. Round 2 had focus staying on the button.
- **Fix:** keep the button enabled and guard re-entry in `save()` (`if (saving) return`). Keep `aria-busy` and the label change, or use `aria-disabled="true"` instead of `disabled`.

**W3 · First paint still trails `/` (carried from R2 W1).**
- Throttled mobile FCP is 5.6 s vs 3.9–4.7 s, and the desktop runs were also behind this round.
- **Fix (unchanged from R2):**
  - Let the h1 and sub paint at their final state on first render. Animate only `transform`/`clip-path`, not opacity.
  - Optionally, inject `<link rel="modulepreload">` for the hashed LandingV2 chunk on `/v2`.

### POLISH

- **P1 · Reduced motion still smooth-scrolls.** `html { scroll-behavior: smooth }` from `src/index.css` (shared) stays active under `prefers-reduced-motion: reduce`. That covers anchor links, the bar nudge and focus scrolls. **Fix (v2-scoped):** `@media (prefers-reduced-motion: reduce) { html:has(.v2) { scroll-behavior: auto } }`. Also pass `behavior: 'auto'` in the nudge's `scrollBy` under reduced motion.
- **P2 · The ink radio label sits partly under the bar.**
  - At 390, Tab onto the ink radios: the radio input is 1 px tall (758–759), but its visible label `span` is 758–802 while the bar top is 775. That leaves **61 % of the focused chip under the bar** (2.4.12 AAA; AA holds because the top 17 px and the ring are visible).
  - The nudge measures the 1 px input, not the label.
  - **Fix:** in the nudge, measure `el.closest('label') ?? el`, or make the radio cover its label (`position:absolute; inset:0`).
- **P3 · The shared PNG is 1.6 MB** (round 2's was 250 KB). That is fine for WhatsApp but slow on 3G. **Fix:** consider `toBlob('image/jpeg', 0.9)` for the share path (the image has no transparency now) or quantising the grain.
- **P4 · A drawer link click leaves focus on BODY.** Navigation is correct, and Chrome's sequential focus starting point moves to the target. **Fix:** optionally, focus the target section's heading (`tabindex=-1`).
- **Carried, deferred:** C10 (Back restores the product-list scroll), C11 (`--hdr` read once), C12 (manifesto `<h2>` → styled `<p>`; `aria-hidden` on the `.v2-reg` numbers inside headings).

**Profiles:** every `lp-cdp-*` profile my runs created was deleted. The 15 other `lp-cdp-*` folders under `%TEMP%` (02:17–02:32) could not be attributed to my runs and were left alone.

---

## Summary
- **Integrity holds:**
  - The contact form is identical to `Contact.tsx` in 7/7 cases (same endpoint and 8 Arabic keys).
  - All 27 quote openers (hero, nav, mbar, drawer, 5 products, try, close, across 3 widths) open `RequestQuoteModal`, with the right product and photo prefilled.
  - wa.me, tel, mailto and `/products/1–5` all work.
  - `/` never loads v2 code.
  - **0 real SheetDB requests.**
- **The round-2 fixes are verified:**
  - W2 (bar up to 1099 px).
  - P1, P4, P5 (the bar hides at the ticket and is scoped below 1100 px).
  - P2 (0 transparent pixels).
  - P3 (0 shifts while scrolling).
  - C8 (focus return, except the drawer).
  - C9 (drawer closes on focus-out and outside click).
- **The measured floor passes:**
  - audit PASS at 5 sizes with 0 contrast fails;
  - CLS ≤ 0.039;
  - 0 console errors;
  - reduced-motion final states fully visible;
  - the snap rail works by Tab and arrow keys, and its cue updates;
  - accessible names complete;
  - the save/share live region announces correctly.
- **Open issues:**
  - B1, the desktop focus scrolled off screen, is fixed in source and needs a rebuild.
  - W1: no focus return from the drawer CTA.
  - W2: the save button drops focus.
  - W3: mobile first paint still behind `/`.

**STATUS: PASS with reservations, conditional on a rebuild.** 1 BROKEN (B1, already fixed in source and pending a rebuild plus a 1440 re-sweep), 3 WEAK (W1 drawer-CTA focus return, W2 save button drops focus, W3 first paint vs `/`), 4 new POLISH and 3 carried POLISH. Integrity is fully intact.
