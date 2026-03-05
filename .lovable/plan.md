

## Inferred Behavioral Baseline

**Hero.tsx**: Renders a full-viewport hero section with a background image slider (5 images cycling every 4s via `setInterval`), overlaid with company title, subtitle, and a CTA button that smooth-scrolls to `#contact`. Images are declared inline on every render.

**Navbar.tsx**: Sticky navbar with desktop/mobile nav links (7 items duplicated between desktop and mobile), scroll-based shadow via throttled scroll listener, and a quote request modal. Nav items are hardcoded twice — once for desktop, once for mobile — with identical labels, hrefs, and hover styles. The `ChevronDown` icon on the quote button is misleading (it's not a dropdown).

**ProductCard.tsx**: Delegates to `GridProductCard` or `ListProductCard` based on `viewMode`. Wraps callbacks with `useCallback` for memo stability. The `onHover` prop creates two callbacks (`handleHover`/`handleLeave`) but `GridProductCard` calls `onHover(product.id)` and `onHover(null)` directly via inline lambdas, bypassing the memoized handlers.

**GridProductCard / ListProductCard**: Both render product cards with badge, image overlay with Eye button, "المزيد من التفاصيل" button, and "طلب عرض سعر" button. Significant structural duplication: badge rendering, overlay with Eye button, and the two action buttons appear in both components with near-identical logic.

**Products.tsx**: Manages view mode, hover state, fake loading delay, and quote modal via `useProductQuote`. Forces list view on mobile.

**VirtualizedProductGrid.tsx**: Exists but is never imported or used anywhere.

---

## Bugs Found (Not Fixed)

1. **`heroImages` recreated every render** — declared inside the component body, causing `useCallback` for `nextSlide` to have a stale dependency (`heroImages.length` is always 5, so no functional bug, but the `useCallback` dep is technically on a new value each render — no behavior change since the length is constant).

2. **`ProductCard` memoized handlers not used by `GridProductCard`** — `GridProductCard` receives `onHover` as a function reference but calls `() => onHover(product.id)` inline on `onMouseEnter`, and `() => onHover(null)` on `onMouseLeave`. The `handleHover`/`handleLeave` callbacks from `ProductCard` are passed but the prop names don't match — `GridProductCard` expects `onHover` to be the raw function, not the pre-bound one. This means `React.memo` on `ProductCard` provides limited benefit since `GridProductCard` creates new inline lambdas anyway.

3. **`ChevronDown` icon on Navbar quote button** — renders a dropdown chevron on a button that opens a modal, not a dropdown. Misleading but not a code bug.

4. **`VirtualizedProductGrid.tsx` is dead code** — imported nowhere.

---

## Refactoring Plan

### 1. Extract nav items data to eliminate duplication (DRY)
**File:** `src/components/Navbar.tsx`
- Extract the 7 nav links into a `NAV_ITEMS` array of `{ label, href }`.
- Render desktop and mobile nav from the same array.
- Removes ~30 lines of duplicated markup.

### 2. Hoist `heroImages` outside component (Performance)
**File:** `src/components/Hero.tsx`
- Move the `heroImages` array to module scope so it's not recreated on every render.
- This stabilizes the `useCallback` dependency and avoids unnecessary array allocation.
- **Estimated gain:** Negligible per-render, but correctness improvement for memoization.

### 3. Extract shared product card elements (DRY + Testability)
**Files:** New `src/components/products/shared/` directory
- Extract `ProductBadge` — the badge overlay used identically in both Grid and List cards.
- Extract `ProductImageOverlay` — the hover overlay with Eye button, used in both cards.
- Extract `ProductActionButtons` — the two action buttons ("المزيد من التفاصيل" + "طلب عرض سعر") used in both cards with only minor layout differences (passed via className prop).
- Each sub-component is independently testable with clear props.

### 4. Remove dead code (DRY)
**File:** `src/components/products/VirtualizedProductGrid.tsx`
- Delete the unused `VirtualizedProductGrid` component entirely.

### 5. Fix ProductCard memo effectiveness (Performance)
**File:** `src/components/products/ProductCard.tsx` + `GridProductCard.tsx`
- Pass pre-bound `onMouseEnter`/`onMouseLeave` handlers from `ProductCard` instead of raw `onHover`.
- Remove inline lambda creation in `GridProductCard` so `React.memo` on `ProductCard` actually prevents re-renders.
- **Estimated gain:** Prevents re-render of all product cards when only hover state changes for one card.

---

## Summary of Changes

| # | Change | Goal | Rationale |
|---|--------|------|-----------|
| 1 | Extract `NAV_ITEMS` array in Navbar | DRY | 7 nav links duplicated verbatim between desktop/mobile |
| 2 | Hoist `heroImages` to module scope | Performance | Avoids array recreation per render, stabilizes `useCallback` |
| 3 | Extract `ProductBadge`, `ProductImageOverlay`, `ProductActionButtons` | DRY + Testability | Near-identical markup in Grid and List cards |
| 4 | Delete `VirtualizedProductGrid.tsx` | DRY | Dead code, never imported |
| 5 | Fix `ProductCard` memo by passing pre-bound handlers | Performance | Current inline lambdas in `GridProductCard` negate `React.memo` |

