# BRIEF — البركة بلاست (Baraka Plast)

## Business in one sentence
Shop owners, clothing stores, supermarkets, factories and small brand owners across Egypt · get bags in bulk (and
their own logo printed on them) from one factory instead of five suppliers · Baraka Plast extrudes, prints, cuts and
delivers five bag categories from its own factory in Qalyub, running since 2011.

## Name
- Literal meaning / etymology: «البركة» = blessing, increase, abundance (a thing that "has baraka" keeps giving more
  than its size). «بلاست» = plast(ic).
- Sound, script, logo construction: the logo (`public/logo.png`, 1200×518, white background, no alpha) is a shopping-bag
  silhouette with a loop handle, split into a navy chevron (#002a4a) and an orange wedge (#f47a00), with the wordmark
  «البركة بلاست» set in a geometric, Kufi-like bold in navy.
- Objects or acts hidden in the word: abundance → a stack/pile that keeps growing; plast → film, roll, sheet; the
  logo itself IS a bag — the brand already draws its own product.

## Mechanism (how a bag is made in their factory — visible in their own factory photo `public/images/hero.webp`)
1. Polyethylene resin is extruded and blown upward into a thin film tube (the white towers in the factory photo).
2. The tube is flattened and wound onto big film rolls (the white rolls in the foreground of the photo).
3. The customer's logo is printed on the film (flexo / digital, 1 or 2 faces — `PRODUCTS[0].specifications`).
4. The film is cut, sealed and die-punched (the handle hole of a die-cut bag), then counted and packed.
5. Delivered to the customer's governorate (any of Egypt's governorates — existing claim).

## Customer before → after
- Before: plain, anonymous bags bought from several suppliers (one for plastic, one for cloth, one for cellophane…), no
  idea of the minimum order or the price until someone answers.
- After: every bag leaving the shop carries the shop's name; one factory relationship covers five bag types; a
  written quote for their exact quantity and size.

## Audience
- Who reads: B2B wholesale buyers (shop owners, clothing retailers, supermarkets, factories, purchasing managers) and
  brand-owner individuals who want their logo on bags (PRODUCT.md). Device: mostly phones (Egyptian SMB owners, often
  arriving from WhatsApp/Facebook). Register: Egyptian-flavoured MSA — the existing copy mixes «شنط» (Egyptian) with
  MSA; keep that: plain, direct, trust-forward, not playful.
- Fear: low print quality / colours off-register, late delivery, a "factory" that is really a broker, being forced
  into a huge minimum order. Trust comes from: a real factory address, years in business, real product photos,
  direct phone/WhatsApp, a clear process.

## Offer & conversion
- Primary action: «اطلب تسعيرة» → opens `RequestQuoteModal` (src/components/RequestQuoteModal.tsx), which POSTs to
  `LEAD_FORM_ENDPOINT` (src/constants/contact.ts, SheetDB). Must stay untouched: field names, payload keys (Arabic
  sheet columns), validation, endpoint.
- Price / guarantee: no public price, no MOQ, no capacity figure (PRODUCT.md: do not invent). Deflect: "tell us the
  quantity and we confirm the minimum and the price".
- Secondary action: WhatsApp `https://wa.me/+201009923040` and phone `tel:+201009923040`; the contact form in
  `Contact.tsx` (same endpoint, its own payload with «الرسالة» required).

## Copy status
**draft** — user chose (2026-10-25) "write new draft copy"; every fact comes from PRODUCT.md / existing components.
No invented numbers, testimonials, certifications, capacity or MOQ.

## Assets inventory
| Asset | Exists? | Where | Use |
|---|---|---|---|
| Logo (navy + orange, white bg) | yes | public/logo.png | nav, footer (needs a transparent knock-out for dark grounds) |
| Factory floor photo (blown-film towers, rolls, 5 operators) | yes — **real per the user** (2026-10-25) | public/images/hero.webp 1536×1024 | factory section (pinned camera), proof |
| Product photos — printed bags (social cards with text "ORDER NOW") | yes | plasticbag.webp, softbagsCover.webp, canvas.webp, solfan1.webp, ziplock-bag-2.webp | product section — cards have baked text/orange arcs; crop/frame consistently |
| Real-world product photos (Dolce Shoes bag, ziplock with clothes, soft bags) | yes | plasticbag2.webp, softbag2.webp, ziplockBag.webp, softbags3.webp | proof — real printed customer bags |
| Testimonials | **fake** (PRODUCT.md) | Testimonials.tsx | NOT used on v2 |
| Client logos, certifications, capacity, MOQ, delivery times | no | — | not shown; listed as asks |

Missing assets (exact shot list for the user):
1. Print station close-up: the flexo/print unit with a customer's logo coming off the cylinder, 3:2, side light, no faces.
2. Die-cut punch: an operator's gloved hand stacking freshly punched die-cut bags, 4:5, overhead, warm factory light.
3. Finished order: a pallet/stack of printed bags with a delivery note (customer name blurred), 3:2.
4. The owner/manager at the factory door with the logo sign visible, 4:5, eye level, daylight — for a "who you deal with" note.
5. Three real customer bags in use (shop counter, clothing store, bakery) with permission, 1:1.
Plus: real customer quotes (with permission) to replace the fake testimonials; a real MOQ and typical lead time.

## References the user admires
None given. Calibration = quality-bar.md (award-level), not a style.

## Constraints
Vite + React 18 + TS + Tailwind 3 + shadcn; static, GitHub Pages / Vercel (`vercel.json`). Arabic only, RTL. New page
at `/v2` (home `/` untouched until approved). No new npm dependencies unless necessary (none planned: CSS + IO + WAAPI).
Must-not-change: `RequestQuoteModal` + `Contact` form behaviour and payloads, `LEAD_FORM_ENDPOINT`, wa.me/tel links,
`/products/:id` routes, `index.html` gptengineer script. Dark mode: the old page has none on Index; v2 is light-only.

## Market truths a generic designer would miss
1. Egyptian SMB buyers decide on a phone, often after a WhatsApp chat — WhatsApp and a phone number are primary
   channels, not footers; a form-only funnel loses them.
2. "Factory, not broker" is THE trust signal in this market (PRODUCT.md positioning). Showing the machines and the
   address beats any adjective; quality claims without the factory read as reseller talk.
3. For brand owners, the bag is advertising that walks out of the shop in a customer's hand — the value moment is
   seeing *their* name printed, not seeing a bag.
4. Price is always "on quote" because it depends on size, thickness, colours and quantity — the page must make asking
   for a quote feel cheap and fast (what to send, how they answer), not hide that there is no price list.
5. Egyptian commerce copy mixes dialect nouns (شنطة/شنط) with MSA; Western digits (01009923040, 2011) are what buyers
   type into WhatsApp — keep Western digits for phone/years so they can be copied.
