# QA Checklist — Rush No More SEO Sprint
Run these checks before and after deploy.

## Automated (pre-deploy)

- [x] TypeScript compiles: `npx tsc --noEmit` → exit 0
- [x] 10 new hub routes exist with layout.tsx + page.tsx
- [x] No sitemap URL appears as a redirect source (no self-redirects)
- [x] All redirect destinations are either real routes or valid anchors
- [x] robots.ts no longer blocks `/_next/` (fixes Googlebot rendering)
- [x] NAP consistent across code: `605-423-2545`, `21137 Brimstone Place, Sturgis, SD 57785`

## Smoke tests (post-deploy)

Run as curl commands or via browser:

```bash
# Host canonical
curl -sI https://rushnomore.com/               | grep -Ei 'HTTP|location'
# Expected: 301 → https://www.rushnomore.com/

# Rally alias
curl -sI https://www.rushnomore.com/sturgis-bike-rally | grep -Ei 'HTTP|location'
# Expected: 301 → /sturgis-rally-camping

# Keyword alias
curl -sI https://www.rushnomore.com/rv-park-sturgis-sd | grep -Ei 'HTTP|location'
# Expected: 301 → /stay/rv-sites

# WordPress legacy
curl -sI https://www.rushnomore.com/wp-admin | grep -Ei 'HTTP|location'
# Expected: 301 → /

# Noindex on disabled routes
curl -sI https://www.rushnomore.com/book | grep -i x-robots-tag
# Expected: X-Robots-Tag: noindex, nofollow

# Sitemap
curl -s https://www.rushnomore.com/sitemap.xml | head -30
# Expected: XML with <loc> tags, 22 URLs, all canonical

# Robots
curl -s https://www.rushnomore.com/robots.txt
# Expected: allows /, disallows /api/, /admin/, /book/, /booking/, /my-reservation/, /thanks/
# Expected: does NOT disallow /_next/
```

## Rendered HTML checks

Visit each URL and confirm:

- [ ] `/` — canonical `<link>` = `https://www.rushnomore.com/`
- [ ] `/` — Organization + Campground + LodgingBusiness + WebSite JSON-LD present
- [ ] `/` — no "4.8★" in meta description
- [ ] `/stay/rv-sites` — canonical = `https://www.rushnomore.com/stay/rv-sites`
- [ ] `/sturgis-rally-camping` — Event schema + FAQ schema + Breadcrumb schema
- [ ] `/rally-rates` — visible rate table, FAQ schema
- [ ] `/weddings-groups` — FAQ schema, pavilion content
- [ ] `/monthly-rv-sites` — FAQ schema, long-term copy
- [ ] `/black-hills-itinerary` — 6 days visible
- [ ] `/best-motorcycle-rides-near-sturgis` — 6 rides listed
- [ ] Each guide page (deadwood, spearfish-canyon, needles-highway, iron-mountain-road) — 400+ words of unique content, FAQ, breadcrumbs

## Google Rich Results Test

Run `https://search.google.com/test/rich-results` on:

- [ ] `/` — Campground, LodgingBusiness, WebSite
- [ ] `/stay/rv-sites` — Breadcrumb, FAQ
- [ ] `/stay/cabins` — Breadcrumb, FAQ
- [ ] `/stay/tent-camping` — Breadcrumb, FAQ
- [ ] `/events` — Event (x2), Breadcrumb, FAQ
- [ ] `/sturgis-rally-camping` — Event, FAQ, Breadcrumb
- [ ] `/rally-rates` — FAQ, Breadcrumb
- [ ] `/weddings-groups` — FAQ, Breadcrumb

## Conversion path

Critical — DO NOT regress bookings:

- [ ] Every page shows "Book Now" header button linking to `SITE.booking` (NewBook)
- [ ] Every page has `BookingCTA` section with booking button + phone
- [ ] Phone links are `tel:+16054232545`
- [ ] Booking URL is `https://bookingsus.newbook.cloud/rushnomore/index.php`
- [ ] No accidental interception of external booking link via middleware

## Analytics

- [ ] Google Tag Manager container `GTM-KFGKRRJH` loads on every page
- [ ] GA4 `G-BXSP32TXZ1` fires on page view
- [ ] Vercel Analytics script loads
- [ ] Vercel Speed Insights script loads

## Mobile & Core Web Vitals

- [ ] PageSpeed Insights on `/` — mobile LCP <2.5s, CLS <0.1
- [ ] PageSpeed Insights on `/sturgis-rally-camping` — mobile LCP <2.5s
- [ ] Sticky booking CTA doesn't cause CLS
- [ ] All new pages use `next/font` (already inherited from root)

## Regression tests

- [ ] `/stay` still loads with accommodation grid
- [ ] `/stay/rv-sites` still shows all 5 RV tiers
- [ ] `/stay/cabins` still shows all 16 presidential cabins
- [ ] `/events` still renders rally + car show + weddings sections
- [ ] Header navigation still covers all top-level routes
- [ ] Footer shows 4 columns (Stay, Sturgis Rally, Black Hills, Info)
- [ ] No console errors on any page
- [ ] No layout shift when scrolling any page

## Pass criteria

All automated + smoke + rendered HTML + conversion path checks must pass before marking deploy successful.
