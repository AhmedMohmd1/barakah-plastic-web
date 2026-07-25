# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two overlapping buyer groups, both business-facing rather than end consumers:

- **B2B wholesale buyers** — shop owners, clothing retailers, supermarkets, factories, and purchasing managers who need bulk plastic/cloth/cellophane bags for their operations.
- **Brand-owner individuals** — small business owners and entrepreneurs who want their own logo printed on bags for their store or online brand (not reselling bags themselves, but branding their packaging).

Both groups arrive to request a price quote (bulk quantities), not to buy single units online — there is no retail checkout/cart, only quote-request modals and WhatsApp contact.

## Product Purpose

Baraka Plast (البركة بلاست) manufactures and sells five categories of bags — custom logo-printed plastic bags, soft/cloth bags for clothing stores, canvas bags, taped cellophane bags, and ziplock bags — and takes wholesale/bulk orders, including custom logo printing, with delivery across Egypt's governorates. Success is a qualified quote request (via the quote modal, contact form, or WhatsApp) that converts into a bulk order.

## Positioning

Own, vertically-integrated factory (not a broker/reseller) operating continuously since 2011, now with 5+ production lines and in-house custom logo printing across multiple bag material types. The five-category range under one factory relationship — rather than sourcing each bag type from a different supplier — is the differentiator competitors would need real manufacturing investment to copy.

## Operating Context

- No online checkout: every path (hero CTA, product detail pages, contact form) leads to a quote request, not a purchase.
- Quote requests land in Google Sheets via SheetDB (contact form and product quote modal use separate hardcoded endpoints).
- WhatsApp is a first-class contact channel alongside the form.
- Factory location: قليوب - طريق مصر اسكندرية الزراعي، المنطقة الصناعية الأولى. Delivery claimed to all Egypt governorates.
- Entire experience is Arabic/RTL; no other locale exists.

## Capabilities and Constraints

- Static product catalog (5 products, no backend/CMS) — adding a product means editing `src/constants/products.ts` and adding images to `public/images/`.
- **Minimum order quantity: not yet defined.** Hero copy currently deflects to "contact us to find out" — do not invent a number; surface work should keep this deflection until a real MOQ exists.
- **Production capacity: no verifiable figure yet.** Hero currently uses a vague qualitative claim ("طاقة إنتاجية كبيرة") in place of a real number/certification — do not fabricate a specific capacity, output volume, or certification.
- Several duplicate quote-modal components exist in the codebase (`RequestQuoteModal`, `BilingualRequestQuoteModal`, `ProductDetailModal`, `products/QuoteRequestModal`); only `products/QuoteRequestModal` is the live, wired-up flow from `Products.tsx`.

## Brand Commitments

- Name: البركة بلاست (Baraka Plast). Founded 2011, one production line initially, now an integrated factory with 5+ lines.
- Voice: direct, trust/reliability-forward (quality, delivery commitments, long-term partnership), not playful or irreverent.
- Palette/typography/visual system already established (navy/blue "Industrial Precision Grid" system, Cairo/Tajawal fonts) — governed separately if/when DESIGN.md is documented, not by this file.

## Evidence on Hand

- Real: founding year (2011), factory address, phone (01009923040), email (info@elbarkaplast.com), the 5 real product categories with real specs and photos.
- **Not real — fabricated placeholders:** the four customer testimonials in `Testimonials.tsx` (محمد أحمد, سارة محمود, أحمد خالد, فاطمة علي) are invented names/quotes, not real customer feedback. Future work must not extend, "improve," or treat them as genuine evidence — flag before shipping any surface that leans on them as proof, and prefer replacing them with real quotes/case studies when available rather than polishing the fake ones.
- No certifications, press mentions, or real production-capacity figures exist yet (see Capabilities and Constraints).

## Product Principles

1. Every path optimizes for a quote request, not a transaction — never design toward an implied cart/checkout.
2. Don't fabricate numbers or proof (MOQ, capacity, certifications, testimonials) where the business hasn't supplied real ones — deflect to contact instead.
3. Design for two buyer mindsets at once: a purchasing manager evaluating a bulk supplier, and a small brand owner who just wants their logo on a bag — copy and hierarchy should serve both without forking into separate sites.
4. Arabic/RTL is the only locale; there is no bilingual requirement despite `BilingualRequestQuoteModal` existing in the codebase.
5. One factory, five categories, since 2011 — reinforce this as the core credibility story rather than generic "quality" claims.
