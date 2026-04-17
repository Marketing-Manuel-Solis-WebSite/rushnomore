# Manual Actions Outside the Repo
Tasks that cannot be executed from code. Complete in this order after the code changes deploy.

---

## 1. Google Search Console (day 0 after deploy)

- [ ] Confirm property: `https://www.rushnomore.com` (https + www). If the apex property also exists, leave it — it helps capture any stragglers, but the www version is canonical.
- [ ] **Submit sitemap**: `https://www.rushnomore.com/sitemap.xml` (Sitemaps → Add new sitemap)
- [ ] **URL Inspection** → **Request Indexing** for each new hub:
  - `/sturgis-rally-camping`
  - `/rally-rates`
  - `/weddings-groups`
  - `/monthly-rv-sites`
  - `/black-hills-itinerary`
  - `/best-motorcycle-rides-near-sturgis`
  - `/deadwood-day-trip`
  - `/spearfish-canyon-guide`
  - `/needles-highway-guide`
  - `/iron-mountain-road-guide`
- [ ] **Removals** → submit any old legacy URLs still showing in SERPs with stale snippets (use Removals → Temporary Removal for stale-snippet refresh)
- [ ] Monitor **Pages** → "Page with redirect" count — expect a spike (that's correct, it means legacy URLs are now 301'd)
- [ ] Monitor **Pages** → "Not found (404)" — should stay near zero; investigate any spike

---

## 2. Bing Webmaster Tools (day 0)

- [ ] Verify property for `https://www.rushnomore.com`
- [ ] Submit sitemap
- [ ] Use **URL Submission** to push the 10 new hub URLs (Bing has daily URL submission quotas — use them)

---

## 3. Google Business Profile (week 1)

NAP verification against our schema source of truth:

- **Name**: `Rush No More RV Resort & Campground`
- **Address**: `21137 Brimstone Place, Sturgis, SD 57785, US`
- **Phone**: `605-423-2545`
- **Website**: `https://www.rushnomore.com`
- **Hours**: `Daily 8 AM – 5 PM MT`
- **Category (primary)**: Campground / RV park
- **Category (secondary)**: Cabin rental agency, Event venue

- [ ] Check every field matches exactly — any mismatch is a local-SEO drag
- [ ] Add Products: RV Sites (from $41.22), Presidential Cabins (from $51.76), Tent Camping (from $35)
- [ ] Add Services: Sturgis Rally Camping, Weddings & Events, Monthly RV Sites
- [ ] Post weekly during rally season (August) — rally-specific posts drive clicks
- [ ] Upload new photos every month (Google rewards active profiles)

---

## 4. Citation audit (week 1–2)

Ensure identical NAP across:

| Directory | Priority |
|-----------|----------|
| Google Business Profile | Critical |
| Bing Places | Critical |
| Apple Maps (Apple Business Connect) | High |
| TripAdvisor | High |
| Yelp | High |
| Facebook Business | High |
| Instagram Business | High |
| RV Parky | High (category-specific) |
| Campendium | High (category-specific) |
| Good Sam Club | High (category-specific) |
| RV Life | Medium |
| Roadtrippers | Medium |
| AllStays | Medium |
| YellowPages | Low |
| Yellowbook | Low |
| Foursquare | Low |
| MapQuest | Low |

For each: confirm **exact string match** on name, address, phone, website. Any variation (e.g. "Rush No More Campground" vs "Rush No More RV Resort & Campground") splits entity signals.

---

## 5. AI bot policy decision (week 1)

Current state (`app/robots.ts`):

```
CCBot: disallow /
GPTBot: disallow /
ChatGPT-User: disallow /
Google-Extended: disallow /
```

**Recommendation**: Unblock `Google-Extended`. This bot feeds Google AI Overviews — the AI summaries at the top of Google SERPs. Blocking it means your content cannot appear in those summaries, which is where a growing share of hotel/campground research queries now resolve.

Keep `GPTBot` and `CCBot` blocked if you want to prevent training-data harvesting without attribution.
Keep `ChatGPT-User` blocked if you want to prevent real-time browsing by ChatGPT users.

Business owner decision — not implemented in code until you confirm.

---

## 6. Backlink / PR opportunities (ongoing)

- [ ] Contact Visit South Dakota tourism — request listing for Rush No More with deep links to `/stay` and `/black-hills-itinerary`
- [ ] Contact Visit Sturgis — ensure campground is on the official lodging list
- [ ] Partner with Sturgis Motorcycle Rally official site (sturgismotorcyclerally.com) for a campground referral listing
- [ ] Partner with Black Hills Visitor Information — deep-link to `/black-hills-itinerary` as a trip-planning resource
- [ ] Guest post on motorcycle blogs linking to `/best-motorcycle-rides-near-sturgis`
- [ ] Reach out to wedding blogs (Black Hills/SD local) for venue listings linking to `/weddings-groups`

---

## 7. Ongoing content maintenance

- [ ] Every January: update rally dates in `lib/seo.ts` (`Event.startDate`, `Event.endDate`)
- [ ] Every quarter: update `aggregateRating` in `lib/seo.ts` if TripAdvisor/Google rating drifts >10%
- [ ] Every August after rally: take fresh rally photos, update hero imagery
- [ ] Every October: take fall-foliage photos, seasonally rotate hero images
- [ ] Monitor `/sturgis-rally-camping` and `/rally-rates` for seasonal search volume spikes (expect big swings in Jan/Feb and again in May/Jun)

---

## 8. Monitoring dashboard

Suggested GSC saved views:

1. **Branded queries** — filter: query contains "rush no more" → track brand SERP presence
2. **Rally queries** — filter: query contains "rally" → track rally hub performance
3. **Money page CTR** — filter: page = `/stay/*` → track accommodation conversion intent
4. **New hub impressions** — filter: page contains `/sturgis-rally-camping` OR `/rally-rates` OR `/black-hills-itinerary` etc. → track new-URL growth

Set alerts if:
- Impressions drop >20% week-over-week on money pages (regression signal)
- Coverage errors spike (redirect loop or broken link)
- Indexed count drops (check for accidental noindex)

---

## 9. PageSpeed / Core Web Vitals

- [ ] Run `https://pagespeed.web.dev/` on `/`, `/stay`, `/stay/rv-sites`, `/sturgis-rally-camping`
- [ ] Target: LCP <2.5s, INP <200ms, CLS <0.1 on mobile
- [ ] Main likely regression: large hero background images. If LCP is poor, consider converting hero backgrounds to `<Image priority>` for the homepage specifically.

---

## 10. Final QA (day 0 smoke test)

Use curl or a browser to verify:

- [ ] `curl -I https://rushnomore.com/` → 301 → `https://www.rushnomore.com/`
- [ ] `curl -I https://www.rushnomore.com/sturgis-bike-rally` → 301 → `/sturgis-rally-camping`
- [ ] `curl -I https://www.rushnomore.com/rv-park-sturgis-sd` → 301 → `/stay/rv-sites`
- [ ] `curl -I https://www.rushnomore.com/wp-admin` → 301 → `/`
- [ ] `curl -I https://www.rushnomore.com/book` → `X-Robots-Tag: noindex, nofollow` (and 307 redirect via middleware)
- [ ] `curl https://www.rushnomore.com/robots.txt` → reflects `app/robots.ts`
- [ ] `curl https://www.rushnomore.com/sitemap.xml` → 22 URLs, all canonical
- [ ] Each new hub page renders 200 with title, H1, breadcrumb, FAQ schema
- [ ] `/` source includes `<link rel="canonical" href="https://www.rushnomore.com/"/>`
- [ ] No console errors on any page
- [ ] Booking link on every page still opens NewBook — do not regress the conversion path
