# Content Architecture — Rush No More
Strategy: **hub & spoke** with geographic + intent-based clustering.

All money pages live on short, human-readable slugs. Keyword-rich URL variants 301 to canonicals (zero duplicate content).

---

## Hub hierarchy

```
/ (homepage)
│
├─ STAY hub                       /stay
│   ├─ RV Sites                   /stay/rv-sites
│   ├─ Presidential Cabins        /stay/cabins
│   ├─ Tent Camping               /stay/tent-camping
│   └─ Monthly RV Sites           /monthly-rv-sites   ← new
│
├─ STURGIS RALLY hub              /sturgis-rally-camping   ← new
│   ├─ Rally Rates                /rally-rates             ← new
│   ├─ Best Rides Near Sturgis    /best-motorcycle-rides-near-sturgis   ← new
│   │     ├─ Needles Highway      /needles-highway-guide   ← new
│   │     ├─ Iron Mountain Road   /iron-mountain-road-guide   ← new
│   │     ├─ Spearfish Canyon     /spearfish-canyon-guide   ← new
│   │     └─ Deadwood day trip    /deadwood-day-trip        ← new
│   └─ Events (car show + weddings anchors)   /events
│
├─ EVENTS & GROUPS                /events          (existing hub)
│   └─ Weddings & Groups          /weddings-groups   ← new
│
├─ EXPLORE hub                    /explore
│   ├─ 6-Day Itinerary            /black-hills-itinerary   ← new
│   ├─ Deadwood Day Trip          /deadwood-day-trip       ← new
│   ├─ Spearfish Canyon Guide     /spearfish-canyon-guide  ← new
│   ├─ Needles Highway Guide      /needles-highway-guide   ← new
│   └─ Iron Mountain Road Guide   /iron-mountain-road-guide ← new
│
├─ AMENITIES                      /amenities
├─ MAP & DIRECTIONS               /map
├─ ABOUT                          /about
├─ CONTACT                        /contact
└─ LEGAL                          /policies  /ada  /legal
```

---

## Clusters by search intent

### 1. Branded / navigation
Keywords: `rush no more`, `rush no more campground`, `rush no more rv resort`, `rush no more prices`, `rush no more photos`, `rushnomore`.
Target pages: `/` (homepage), `/about`, `/map`.
**Strategy**: homepage dominates brand. About carries reviews anchor.

### 2. Sturgis campground intent
Keywords: `sturgis sd campgrounds`, `campground near sturgis sd`, `sturgis campground`, `sturgis rv park`.
Target pages: `/` (homepage), `/stay`.
**Strategy**: homepage H1 covers "near Mount Rushmore, Sturgis, SD." `/stay` covers the accommodation inventory.

### 3. RV park intent
Keywords: `rv park near mount rushmore`, `rv park sturgis sd`, `full hookup rv park black hills`, `50 amp rv park south dakota`, `pull through rv sites near mount rushmore`, `monthly rv rates`, `big rig friendly rv park`.
Target pages: `/stay/rv-sites`, `/monthly-rv-sites`.
**Strategy**: `/stay/rv-sites` ranks for general RV intent. `/monthly-rv-sites` captures long-term tail.

### 4. Rally intent
Keywords: `sturgis rally camping 2026`, `sturgis rally campground`, `where to stay sturgis rally`, `sturgis rally base camp`, `sturgis rally rv sites`, `sturgis rally cabin rental`.
Target page: `/sturgis-rally-camping` + `/rally-rates`.
**Strategy**: `/sturgis-rally-camping` is the rally landing. `/rally-rates` captures price-intent queries specifically. Cross-linked.

### 5. Rally pricing intent
Keywords: `sturgis rally rates 2026`, `sturgis rally prices`, `sturgis rally camping prices`, `how much sturgis rally camping`.
Target page: `/rally-rates`.
**Strategy**: structured rate table + FAQ schema.

### 6. Mount Rushmore / Black Hills proximity
Keywords: `campground near mount rushmore`, `camping near mount rushmore`, `where to stay near mount rushmore`, `lodging near mount rushmore`.
Target pages: `/` (homepage), `/stay`.
**Strategy**: homepage H1 and meta target. `/stay` catches accommodation-specific tail.

### 7. Cabins
Keywords: `cabins near mount rushmore`, `cabins sturgis sd`, `cabins sturgis south dakota`, `presidential cabins black hills`, `cabin rentals near mount rushmore`, `family cabins black hills`.
Target page: `/stay/cabins`.
**Strategy**: one canonical money page for all cabin queries. Contains all 16 presidential cabins with individual names (good entity signals).

### 8. Tent camping
Keywords: `tent camping near mount rushmore`, `tent camping black hills`, `tent sites sturgis south dakota`, `tent camping with electric hookup south dakota`.
Target page: `/stay/tent-camping`.

### 9. Nearby attractions & cities (informational hubs)
Keywords: `things to do near mount rushmore`, `black hills attractions`, `black hills itinerary`, `deadwood day trip`, `spearfish canyon waterfalls`, `needles highway scenic drive`, `iron mountain road`.
Target pages: `/explore`, `/black-hills-itinerary`, `/deadwood-day-trip`, `/spearfish-canyon-guide`, `/needles-highway-guide`, `/iron-mountain-road-guide`.
**Strategy**: informational content linked outward to money pages. Captures top-of-funnel research queries that convert during trip planning.

### 10. Amenities / differentiators
Keywords: `campground with pool near mount rushmore`, `pet friendly campground south dakota`, `campground with beer garden`, `campground with hot tub sturgis`.
Target page: `/amenities`.

### 11. Rides / scenic routes (motorcycle-specific)
Keywords: `best motorcycle rides near sturgis`, `black hills motorcycle routes`, `needles highway motorcycle`, `sturgis rally rides`.
Target page: `/best-motorcycle-rides-near-sturgis` + the 4 guide pages.
**Strategy**: rider-specific hub that feeds into Rally conversion funnel.

### 12. Groups, events, extended stay
Keywords: `wedding venue sturgis sd`, `reunion venue black hills`, `corporate retreat black hills`, `group camping south dakota`, `monthly rv sites sturgis`.
Target pages: `/weddings-groups`, `/monthly-rv-sites`.

---

## Primary vs secondary keyword per page

See `metadata_plan.csv` for full URL → title → H1 → primary intent mapping.

---

## Internal linking rules

1. Every money page links to at least 2 supporting guides and the Rally hub.
2. Every guide links back to the Stay hub and at least 1 sibling guide.
3. Footer provides site-wide reach: Stay, Sturgis Rally, Black Hills, Info columns.
4. Header nav covers top-level only (Stay, Amenities, Explore, Events, Map, About, Contact) — hubs discoverable via content + footer.
5. No orphan pages.
6. Anchor text uses human-readable phrases matching intent (not exact-match keyword stuffing).

---

## Content quality gates (applied to new pages)

| Gate | Rule |
|------|------|
| Word count | Minimum 400 words of unique body copy per landing |
| H1 | Exactly one H1 per page, keyword-aligned |
| H2 structure | Sections broken by H2, scannable |
| FAQ | Minimum 5 FAQ per money page with FAQ schema |
| Internal links | Minimum 3 outbound internal links per page |
| Schema | BreadcrumbList + page-specific schema (Event, Campground, FAQ) |
| Image alt | Descriptive, specific |
| CTA | Booking + Phone both above the fold and at end |

---

## What we intentionally did NOT build

- No thin pages. Every URL has real content.
- No doorway pages. Keyword-rich aliases redirect, don't duplicate.
- No head-term chasing for irrelevant queries (`hotel`, `ski resort`, `gas`).
- No fake reviews or aggregated review stuffing beyond schema-declared 420 real reviews.
- No hreflang/`/es` simulation when no real ES content exists.
