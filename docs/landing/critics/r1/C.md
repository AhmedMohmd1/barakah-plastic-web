# Critic C — Integrity & accessibility (round 1)

Target: `http://127.0.0.1:4173/v2`, run with `vite preview` from `dist/`, built 21:40:55. Compared against `/` on the same server.
Artefacts are in `docs/landing/critics/r1/C-shots/`. The probe scripts are in my scratchpad; none of them edit project files.
SheetDB safety: every form test replaced `window.fetch` with a stub that records the body and returns `201 {"created":1}`. The CDP Fetch domain also blocked `*sheetdb.io*`, and the service worker was bypassed. Real SheetDB requests seen by the network-level block: **0**.

> **Caveat (stale build):** `src/v2/v2.css` was modified at 21:46:06, after the build at 21:40:55. One example: the built `v2-stamp` easing is `cubic-bezier(.34,1.4,.64,1)`, while the source has `var(--ease-rise)`. All numbers below are for the 21:40 build. There is also a new untracked `dist-r2/` folder that is not git-ignored.

## Pass/fail table

| # | Check | Result | Evidence |
|---|---|---|---|
| F1 | Horizontal overflow (5 sizes) | PASS | `audit-v2.json`: `overflowX:false` at 360, 390, 768, 1280 and 1440 |
| F2 | Hero CTA above the fold | PASS | 514/740, 578/844, 691/1024, 641/800, 662/900. At 360×640: CTA bottom 505/640 (`fold-360x640.png`) |
| F3 | One h1, ≤ 3 lines on mobile | PASS | 1 h1 at every size; 3 lines at 360/390, 2 at 768/1440, 3 at 1280 |
| F4 | Fonts actually rendered | PASS | h1/h2 Cairo, p Tajawal Medium (CSS.getPlatformFontsForNode) |
| F8 | Text contrast (pixels) | PASS | 0 failures at all 5 sizes |
| F9 | Touch targets | PASS (advisory) | 0 under 24 px. Under 44 px on mobile: footer links 40 px tall; hero `tel` link 75×24 |
| F10 | Obstructed controls (audit) | PASS* | Audit reports 0, but it ignores fixed overlays. See defect **C1**: the sticky bar hides focused controls |
| F11 | CLS, load and full scroll | PASS | Audit: 0.021 / 0.025 / 0.008 / 0.022 / 0.016. Slow wheel scroll: 390 = 0.025, 1440 = 0.026. The only shift is the font swap at about 1.4 s (`v2-h1clip`, `v2-hero__ctas`); there are **0 shifts while scrolling** |
| F12 | Uncaught errors / console errors | PASS | 0 exceptions and 0 console errors or warnings (perf runs at 1440 and 390) |
| F13 | Reduced motion | PASS | Audit: 0 invisible text. With emulation at 1440: `document.getAnimations().length = 0`, factory track `display:none`, list `grid`, manifesto 538 px (not pinned), How/Close never armed. Screenshots `rm-1440-*.png` |
| F14a | Contact form = `src/components/Contact.tsx` | PASS | 7 cases (empty, short phone, bad prefix, `a@b`, blank message, phone with spaces, valid) give **identical** results for native validity, error text, toast, POST count and field reset. Same endpoint `…/az68rhltg636u`, POST, `Content-Type: application/json`, same 8 Arabic keys and values, same `required` set (name, phone, message), same input types (`form-diff.json`) |
| F14b | Quote CTAs open `RequestQuoteModal` | PASS (with **C2**) | All 10 entry points open the dialog «طلب عرض سعر» with submit «طلب»: hero, nav, drawer, 5 product buttons, try, close (and the mobile bar). Product buttons pass the right name and image. The product-3 payload is byte-identical to the old page's product-3 payload; the try CTA sends «الموضوع: شُنط مطبوعة بشعارك» |
| F14c | wa.me / tel links | PASS | 4× `https://wa.me/+201009923040` (`target=_blank rel=noopener noreferrer`), 4× `tel:+201009923040`, `mailto:info@elbarkaplast.com`. All `#` anchors resolve (0 missing ids) |
| F14d | `/products/:id` | PASS | Direct load of /products/1…5 shows the right h1 and no 404. SPA click from v2 to /products/3 works, and Back returns to /v2 |
| F14e | `/` unchanged | PASS | `git diff HEAD` on src/components, constants, pages, hooks, utils, index.html, public, vite/tailwind config and index.css is **empty**. Only `src/App.tsx` changed (+lazy route). At runtime on `/`: LandingV2 chunk never requested, 0 `[class*=v2-]` nodes, title and h1 unchanged. v2.css is fully scoped (`.v2-*` and `.on-deep`, which no old component uses) |
| K1 | Tab order | PASS | 1440: skip → logo → 6 nav links → hero CTA → «جرّب اسمك» → tel → 5×(quote, details) → name → phone → radio group (1 stop) → try CTA → 7 FAQ summaries → 3 contact channels → 7 fields + select → submit → close CTA → WhatsApp → 14 footer links. 390 is the same, with the menu button in place of the nav. No inert or aria-hidden element is ever focused (`kbd-1440.json`, `kbd-390.json`) |
| K2 | Visible focus ≥ 3:1 on every surface | PASS | Pixel diff focused vs. blurred, median ratio of the changed pixels. Navy ring on film/paper/white: 14.6–16.9:1. Orange ring on navy (try, close, footer): 5.7–6.6:1. Radio ring #f47a00 on #0f1b3d: 6.13:1. No stop under 5.59:1 |
| K3 | Nav CTA collapses with `inert` | PASS | scrollY 0/300/500: `inert`, width 0, opacity 0 (hero CTA bottom at 662/362/162). From 700 on: not inert, 128 px. Tab from the last nav link at top goes to the hero CTA; when scrolled, it goes to the nav CTA |
| K4 | Mobile bar only between hero CTA and close | PASS | 390×844: hidden and `inert` + `aria-hidden` for y < 600; shown y 600 → 13 800; hidden again at y 13 900 (close `.v2-wrap` top 14 708 enters the viewport). Never in the tab order while hidden |
| K5 | Drawer | PASS | Enter → `aria-expanded=true`, focus on the first link. Esc → closed and focus back on the menu button. The drawer CTA opens the modal and closes the drawer |
| K6 | Skip link | PASS | Visible on focus and on top (`elementFromPoint` = `.v2-skip`); Enter → `#main`; the next Tab reaches the hero CTA |
| K7 | Focus not obscured (WCAG 2.4.11) | **FAIL** | See **C1** |
| SR | Screen-reader semantics | PARTIAL | One h1. A named region per section. Factory desktop: visual steps `aria-hidden` with a 4-item sr-only `<ol>`; mobile/reduced: 4 h3 cards; only one «ده مصنعنا في قليوب.» h2 is ever exposed. Decorative parts (bags, stack, footer word, colour bars, regs) are `aria-hidden`. 0 unnamed controls. Defects **C3, C4, C5** |
| NJ | No-JS | PARITY | Blank page (`nojs-390.png`): it is an SPA with 0 `<noscript>`, the same as `/` |
| P | Performance, first load /v2 | MIXED | See the table below and **C6** |

### Performance (single runs; the 390 run uses 4× CPU and 1.6 Mbps / 150 ms RTT)

| | /v2 1440 | / 1440 | /v2 390 throttled | / 390 throttled |
|---|---|---|---|---|
| First-load transfer | **553 KB** (JS 158, CSS 24, img 241, font 119) | 723 KB | **512 KB** (JS 158, CSS 24, img 200, font 119) | 756 KB |
| After a full scroll | 726 KB | 831 KB | 727 KB | 1 078 KB |
| FCP | **2 060 ms** | 1 012 ms | **6 576 ms** | 5 144 ms |
| LCP (element) | 2 060 ms `img.v2-hero__photo` | 1 148 ms hero img | **6 576 ms** `img.v2-hero__photo` | 7 744 ms |
| Longest task | 447 ms | 269 ms | 2 418 ms | 3 347 ms |

`perf-v2.json` and `perf-root.json`. The /v2 JS includes the whole old landing page (`index-*.js` 53 KB gz: Index is imported eagerly) plus the 11 KB LandingV2 chunk. A/B runs with grain, mask, filter or blend switched off did not change the long task, so it is app bootstrap, not the bag CSS.

---

## Defects

### C1 — BROKEN · On mobile, focused controls are completely hidden under the sticky CTA bar (WCAG 2.2 SC 2.4.11, AA)
When you Tab forward, the browser scrolls the focused element to the bottom of the viewport ("nearest"). The fixed `.v2-mbar` (≈ 69 px) is drawn on top of it.
- **360×640:** «كيف تحسبون السعر؟» summary **100%** covered; submit «إرسال أمر الطلب» **100%** covered; «كم تستغرق مدة التوصيل؟» 87%.
- **390×844:** «ما طرق الدفع المتاحة؟» **99%**; «كيف أطلب؟» **98%**; «اطلب تسعيرة لهذه الشنطة» 89%; textarea 53%; email 42%.
- Evidence: `focus-obscured-360-2.png` and `focus-obscured-360-3.png` (the focused submit button sits entirely behind the orange bar).
- Source: `v2.css:606` (bar fixed at bottom: 0). Nothing reserves scroll padding for it; the global `scroll-padding-top: 5.5rem` in `src/index.css:12` covers only the header.
- **Fix:** while the bar is shown, reserve the space. In the `mobileBar` effect (`LandingV2.tsx:74-78`) add `document.documentElement.style.scrollPaddingBottom = mobileBar ? '88px' : ''` (and clear it on unmount). A CSS-only alternative is `html:has(.v2-mbar[data-show='true']) { scroll-padding-block-end: 88px; }`. Then re-run the Tab sweep.

### C2 — WEAK · One shared modal instance carries the previous CTA's product (and name) into generic quote requests, which changes lead data compared with `/`
`LandingV2.tsx:167-172` mounts **one** `RequestQuoteModal` for every CTA. `RequestQuoteModal.tsx:57-61` sets `product` only when `productName` is given, and it never clears it. Reproduced:
1. Product 2 → type «محمد» → Esc → hero CTA: the picker shows **«شنط سوفت للمحلات الملابس»** and the name is «محمد» (`modal-v2-hero-after-prod2.png`).
2. Try CTA → Esc → close CTA: the picker is pre-set to «شُنط مطبوعة بشعارك».

On `/`, Hero, Navbar and Products each own an instance, so a generic CTA always opened with «اختر المنتج». On v2, a visitor who only browsed a product and then asked a general question submits «الموضوع» = a product they never chose.
**Fix (v2-side only, the modal stays untouched):** remount per kind of request, e.g. `<RequestQuoteModal key={quote.name ? 'product' : 'generic'} …/>`. A stricter option is a counter that increments in `openQuote`.

### C3 — WEAK · The h1's accessible name repeats «مطبوع في مصنعنا.»
The AX tree gives the h1 name «اسم محلك على كل شنطة، مطبوع في مصنعنا. **مطبوع في مصنعنا.**». The hero region label is duplicated too.
Cause: `.v2-accent::after { content: attr(data-ghost) }` (`v2.css:269`). Generated content is exposed to assistive technology, and the AX child list ends with a `generic` pseudo node.
**Fix:** `content: attr(data-ghost) / "";` (alt-text syntax), or render the ghost as a real `<span aria-hidden="true">` inside the accent span.

### C4 — WEAK (exists on `/` too, but v2 could fix it at no cost) · Duplicate ids break the modal's labels
The v2 contact form uses `id="name|company|phone|email|quantity|size|message"` (`src/v2/Contact.tsx:167-211`). `FormField` in the modal uses the same ids (`form-field.tsx:50/64`). As a result, `label[for=name].control` inside the dialog is **the #contact input**, not the modal's own input, so the modal fields have no programmatic label. This happens on all 10 CTAs. The old page has the same clash.
**Fix:** rename only `id` and `htmlFor` in `src/v2/Contact.tsx` (for example `v2-c-name`). Keep the `name` attributes, which `handleChange` uses, and the payload is unchanged.

### C5 — WEAK · The preview `aria-live` region speaks on every keystroke
`Sections.tsx:356-358`: `<span aria-live="polite">المعاينة: {shown}</span>` updates on each character. Typing «مخبز النور» queues about 10 announcements, which compete with the screen reader's own typing echo.
**Fix:** drive the text from the 220 ms debounced `pressKey` (announce only after typing pauses), or drop the region, since the input value is already announced.

### C6 — WEAK · First paint is later than on `/` (lazy-route waterfall)
- FCP: 2 060 ms vs 1 012 ms at 1440; 6 576 ms vs 5 144 ms on throttled mobile.
- LCP is better on mobile (6 576 vs 7 744 ms) but worse on desktop (2 060 vs 1 148 ms).
- Cause: `App.tsx:14` `lazy(() => import('./v2/LandingV2'))`. The chunk and its CSS are requested only after `index.js` runs, and the Suspense fallback (a navy div) is not contentful.

**Fix:** start the import at module evaluation when the path is /v2. In `App.tsx`, use `const loadV2 = () => import('./v2/LandingV2'); if (location.pathname.startsWith('/v2')) loadV2();` together with `lazy(loadV2)`, so the chunk downloads in parallel with React bootstrap. These are single-run numbers; re-measure after the change.

### C7 — POLISH · The focus ring changes the button shape
`v2.css:80` `.v2 :focus-visible { … border-radius: 4px }` has specificity (0,2,0), which beats `.v2-btn { border-radius: 12px }`. Every orange CTA snaps from 12 px to 4 px corners on focus (`hero-cta-focus-1440.png`).
**Fix:** remove `border-radius` from the focus rule; outlines follow the element's own radius.

### C8 — POLISH · Focus is not returned to the trigger after the modal closes
After Esc, `document.activeElement` is BODY. `/` behaves the same, so this is parity. v2 can still fix it without touching the modal: store `document.activeElement` in `openQuote` and `.focus()` it in `onClose`.

### C9 — POLISH · Drawer details
- Clicking a drawer link leaves focus on BODY (the link becomes hidden).
- The drawer stays open while Tab moves into the page underneath, and it does not close on outside click or scroll.

It is acceptable as a disclosure. To tighten it, close the drawer on `focusout` outside it and on scroll.

### C10 — POLISH · Title and scroll state after leaving /v2
- `LandingV2.tsx:69-71` sets `document.title` and never restores it. After SPA navigation to /products/3, the tab still reads «…بطباعة اسم محلك». **Fix:** restore the previous title in the effect's cleanup.
- Back from a product page lands at scrollY 0 on /v2, so the visitor loses their place in the product list.

### C11 — POLISH · Header height is read once
`LandingV2.tsx:29` reads `matchMedia('(max-width: 767px)')` once at mount. After a rotate or resize across 767 px, the hero-CTA observer uses the wrong header margin. **Fix:** read `--hdr` inside the IntersectionObserver callback, or recreate the observer on a media-query change.

### C12 — POLISH · Semantics and outline noise
- The manifesto is an h2 holding a 110-character sentence (`Sections.tsx:28`). Consider a `<p>` styled as display text, keeping the region label «من نحن».
- Product `<ol>` items also carry a visible number span, so screen readers hear the number twice. Add `aria-hidden` to `.v2-reg` when it is inside an `<li>` of an `<ol>`.

### C13 — POLISH · No-JS fallback
The page is blank without JS, which matches `/`. A `<noscript>` in `index.html` with the phone number and WhatsApp link would keep the only conversion path. This is allowed: only the gptengineer tag is locked.

### C14 — POLISH · Disk and repo hygiene
- Two stale `lp-cdp-*` temp profiles (28 MB, 23–25 min old, no Chrome running) are left in `%TEMP%`. Their origin is unclear: possibly an interrupted run by another critic or by the builder. C: has **14 GB** free (the brief stated ~16).
- `dist-r2/` is untracked and not ignored.

---

## Summary
- **Business integrity holds.** The contact form matches `Contact.tsx` exactly: same endpoint, same 8 keys, same validation across 7 cases. All 10 quote entry points open the same `RequestQuoteModal` and send the same payload. wa.me and tel links are identical, /products/1–5 work, and `/` is untouched both in git and at runtime.
- **The measured floor passes:** audit PASS at all 5 sizes, 0 contrast fails, CLS ≤ 0.026, 0 errors. Keyboard order is logical, every focus ring is ≥ 5.6:1, and the inert nav CTA, the bar range, the drawer Esc/focus and reduced motion all behave as specified.
- **Open issues:** one AA failure (C1, focus hidden under the mobile bar), one lead-data regression (C2, product carried over in the shared modal), and three screen-reader defects (C3–C5).

**STATUS: FAIL — 1 BROKEN (C1), 5 WEAK (C2–C6), 8 POLISH.** C1 and C2 are small v2-only fixes; re-run the Tab sweep at 360×640 and 390×844, plus the modal carry-over test, on a fresh build.
