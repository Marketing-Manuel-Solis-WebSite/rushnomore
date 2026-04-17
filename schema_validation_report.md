# Structured Data Validation Report — Rush No More

Validation tooling:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

Run both against each URL below after deploy. This report captures **what schema we emit, where, and which pages to prioritize for validation**.

---

## Sitewide schema (emitted from root layout)

Emitted on every page via `app/layout.tsx`:

| Schema | Purpose | Expected rich result |
|--------|---------|----------------------|
| `Campground` | Primary business entity for campground searches | Knowledge panel, local pack |
| `LodgingBusiness` | Complements Campground — helps hotel/lodging searches | Lodging pack |
| `WebSite` (with `SearchAction`) | Enables sitelinks search box | Sitelinks search |
| `Organization` | Brand entity + sameAs social links | Knowledge panel, brand identity |

**Pre-deploy validation checklist:**
- [ ] `Campground` @id resolves: `https://www.rushnomore.com/#campground`
- [ ] `LodgingBusiness` @id resolves: `https://www.rushnomore.com/#lodging`
- [ ] All `sameAs` URLs are live and actually belong to Rush No More (TripAdvisor, Google Maps, Facebook, Instagram, YouTube, TikTok, Yelp)
- [ ] Phone formatted: `+1-605-423-2545`
- [ ] Address matches GBP exactly: `21137 Brimstone Place, Sturgis, SD 57785, US`
- [ ] Geo matches GBP: `44.39857, -103.46825`
- [ ] `aggregateRating` (4.8 / 420 reviews) reflects actual TripAdvisor/Google totals at deploy time — update if drift >10%
- [ ] `priceRange`: `$35 - $335` reflects current lowest tent rate and highest cabin rate

---

## Per-page schema

### Homepage (/)
- Inherits sitewide.
- **Validate**: knowledge panel eligibility, sitelinks search box.

### `/stay/rv-sites` `/stay/cabins` `/stay/tent-camping` `/stay`
- `BreadcrumbList` (already emitted)
- `FAQPage` (already emitted)
- **Validate**: breadcrumb eligibility, FAQ rich result eligibility.
- **Pitfall**: FAQ rich results are restricted to medical/government content in 2024+ Google guidelines. Schema still valid but rich result may not show.

### `/events`
- `Event` x2 (Sturgis Rally 2026 + Car Show 2026)
- `BreadcrumbList`
- `VideoObject`
- `FAQPage`
- **Validate**: Event rich result eligibility — check `startDate`, `endDate`, `location`, `offers`.
- **Pitfall**: `eventAttendanceMode` must be set (is `OfflineEventAttendanceMode` — correct).

### `/sturgis-rally-camping` (new)
- `Event` (Sturgis Rally 2026)
- `BreadcrumbList`
- `FAQPage`

### `/rally-rates` (new)
- `BreadcrumbList`
- `FAQPage`

### `/weddings-groups` (new)
- `BreadcrumbList`
- `FAQPage`

### `/monthly-rv-sites` (new)
- `BreadcrumbList`
- `FAQPage`

### `/black-hills-itinerary` (new)
- `BreadcrumbList`

### `/best-motorcycle-rides-near-sturgis` (new)
- `BreadcrumbList`

### `/deadwood-day-trip` `/spearfish-canyon-guide` `/needles-highway-guide` `/iron-mountain-road-guide` (new)
- `BreadcrumbList`
- `FAQPage`

### `/explore`
- `BreadcrumbList` (existing)
- `TouristAttraction` for featured attractions
- `VideoObject` if present

### `/amenities` `/map` `/about` `/contact` `/policies` `/ada` `/legal`
- `BreadcrumbList` (all existing)

---

## Known issues / things to verify post-deploy

### 1. Review markup validity
Schema emits 3 hardcoded reviews under `Campground.review[]`. These must be **real customer reviews** — not aggregated or fabricated. As of this audit they look real, but:

- [ ] Verify each of the 3 reviews matches an actual published review (TripAdvisor or Google)
- [ ] If any is fabricated: remove immediately. Fake reviews in schema are a manual penalty risk.

Google's review markup policy: reviews in schema must be genuine, first-party (posted directly to your site or imported from a verified source).

### 2. `aggregateRating` drift
The site claims `ratingValue: 4.8 / reviewCount: 420`. These are fixed values in code.

- [ ] Pull current TripAdvisor + Google rating/count monthly
- [ ] If drift >10%, update `lib/seo.ts`
- [ ] Bidirectionally: if rating drops below 4.5, consider removing review markup rather than showing lower star count

### 3. `Event` date maintenance
`lib/seo.ts` uses 2026 rally dates. Must be updated each January for the upcoming year:
- `startDate: '2026-08-02'` → `'2027-08-01'` etc.
- `endDate: '2026-08-18'` → same update
- Same applies to Car Show date (`2026-09-12`)

### 4. `hasMap` URL
`https://maps.app.goo.gl/sBHGqk1yV4c2Tx1z9` — verify this still resolves to the Google Maps place entry.

### 5. `sameAs` link health
Check each sameAs URL returns 200:
- [ ] TripAdvisor
- [ ] Google Maps place
- [ ] Facebook page
- [ ] Instagram
- [ ] YouTube
- [ ] TikTok
- [ ] Yelp

Broken sameAs is not critical but degrades entity resolution.

### 6. FAQ duplication
Multiple pages carry FAQ schema. Make sure the **questions differ** across pages (Google penalizes near-duplicate FAQ schema as "low value"). Current pages have distinct FAQ sets — verified in this audit.

### 7. Breadcrumb consistency
`BreadcrumbList` items should reflect the visible breadcrumb trail exactly. Our new `Breadcrumbs` component emits schema + visible nav from the same array — consistent by design. Existing pages (money pages) have been using inline `breadcrumbSchema(...)` calls without visible breadcrumbs — this is acceptable to Google but less ideal. Future: refactor money-page breadcrumbs to use the shared `<Breadcrumbs>` component.

---

## Post-deploy validation sequence

1. Deploy to production.
2. In Google Search Console, run **URL Inspection** on each key page:
   - `/`
   - `/stay`, `/stay/rv-sites`, `/stay/cabins`, `/stay/tent-camping`
   - `/sturgis-rally-camping`, `/rally-rates`
   - `/weddings-groups`, `/monthly-rv-sites`
   - `/black-hills-itinerary`, `/best-motorcycle-rides-near-sturgis`
   - `/deadwood-day-trip`, `/spearfish-canyon-guide`, `/needles-highway-guide`, `/iron-mountain-road-guide`
3. For each, use **Test Live URL** → ensure rendered HTML shows canonical, schema, title, description.
4. Request indexing for the 10 new pages.
5. Resubmit sitemap: `https://www.rushnomore.com/sitemap.xml`
6. Monitor **Enhancements** panel in GSC for:
   - Breadcrumbs
   - FAQ
   - Events
   - Logo
   - Sitelinks searchbox
7. Expect 1–3 weeks for first rich results to register. 2–4 weeks for rankings to move on new hub pages.

---

## Things NOT implemented (deliberately)

- **Review markup beyond existing 3 reviews**: not expanded to avoid review-stuffing flags.
- **Product schema for individual cabins**: each of 16 cabins could get its own `LodgingReservation` URL, but that would require 16 new pages. Current `OfferCatalog` under `Campground` covers the 4 cabin tiers sufficiently.
- **Article/BlogPosting schema**: no blog infrastructure yet. Hub pages use `BreadcrumbList` only, not `Article`.
- **Review schema on hub pages**: not added — reviews live at entity level (Campground + LodgingBusiness). Duplicating them per page risks review-stuffing.
- **LocalBusiness subtype beyond Campground/LodgingBusiness**: `/map` page has a separate `localBusinessSchema()` helper available but not yet injected. Recommended follow-up: add to `/map/page.tsx`.
