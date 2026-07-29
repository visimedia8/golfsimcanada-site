# GolfSimCanada.site — CMS & Dev Specification

> **File**: `10-cms-dev-spec.md`  
> **Lead**: Dev + SEO  
> **Stack**: Static Site Generator (custom Node.js build script) → Cloudflare Pages  
> **Principle**: Zero CMS database. All content = JSON data files + HTML templates → compiled to static HTML. GSC sees zero errors.

---

## 1. Architecture Overview

```
D:\golfsimcanada.site\
│
├── /src/                        ← SOURCE (never served directly)
│   ├── /data/                   ← All content as JSON (pSEO data layer)
│   │   ├── products.json
│   │   ├── brands.json
│   │   ├── venues.json
│   │   ├── installers.json
│   │   ├── rentals.json        ← NEW — rental providers per city
│   │   ├── events.json         ← NEW — tournaments, leagues, events
│   │   ├── cities.json
│   │   ├── glossary.json
│   │   ├── blog-posts.json      ← metadata only (slug, title, date, etc.)
│   │   └── comparisons.json
│   │
│   ├── /content/                ← Long-form content as Markdown (blog, guides)
│   │   ├── /blog/[slug].md
│   │   ├── /setup/[slug].md
│   │   └── /legal/[slug].md
│   │
│   ├── /templates/              ← HTML templates with {{placeholder}} vars
│   │   ├── base.html            ← Base layout (nav, mobile-bottom-nav, footer, head)
│   │   ├── homepage.html
│   │   ├── blog-post.html
│   │   ├── blog-index.html
│   │   ├── product-single.html
│   │   ├── product-collection.html  ← with filter sidebar
│   │   ├── brand-single.html        ← includes founding year, history, product lines
│   │   ├── brand-index.html
│   │   ├── compare-single.html
│   │   ├── alternatives-single.html ← NEW — "Alternatives to X" template
│   │   ├── venue-city.html          ← with landmark/distance fields + filter
│   │   ├── venue-province.html
│   │   ├── venue-index.html
│   │   ├── installer-province.html
│   │   ├── installer-index.html
│   │   ├── rental-city.html         ← NEW — Rental city pages
│   │   ├── rental-index.html        ← NEW
│   │   ├── events-city.html         ← NEW — Events city pages
│   │   ├── events-index.html        ← NEW
│   │   ├── glossary-term.html
│   │   ├── glossary-index.html
│   │   ├── pillar.html              ← Generic pillar page template
│   │   ├── software-pillar.html     ← NEW — /software/ hub template
│   │   ├── tool-page.html           ← NEW — Interactive tool template
│   │   ├── setup-guide.html
│   │   └── legal.html
│   │
│   ├── /assets/
│   │   ├── /css/
│   │   │   ├── main.css         ← All CSS variables + global styles
│   │   │   ├── components.css   ← Card, button, badge, nav, footer, mobile-bottom-nav
│   │   │   └── templates.css    ← Per-template overrides
│   │   ├── /js/
│   │   │   ├── main.js          ← Nav toggle, cookie consent, search
│   │   │   ├── mobile-nav.js    ← NEW — Bottom nav tray open/close/backdrop
│   │   │   ├── filters.js       ← NEW — Client-side filter (products + directory)
│   │   │   ├── tools.js         ← NEW — All 5 interactive tools logic
│   │   │   └── search.js        ← Client-side JSON search
│   │   └── /images/
│   │       ├── /logo/
│   │       ├── /products/
│   │       ├── /blog/
│   │       └── /venues/
│   │
│   └── /scripts/
│       └── build.js             ← Node.js build script (reads JSON + templates → outputs /dist/)
│
├── /dist/                       ← BUILD OUTPUT (what Cloudflare serves)
│   └── [compiled static HTML]   ← NEVER edit manually
│
├── .gitignore
├── .cfignore                    ← Cloudflare ignores (excludes /src/, node_modules)
├── _redirects                   ← Cloudflare 301/302 rules
├── _headers                     ← Cloudflare security + cache headers
├── package.json
└── build.config.json            ← Site-wide config (base URL, locale, etc.)
```

---

## 2. CMS Hygiene Rules — Zero GSC Errors

### Rule 1: /dist/ is the Only Truth
- Cloudflare Pages ONLY serves `/dist/`
- `/src/` is NEVER uploaded — excluded via `.cfignore`
- No `.md` files, no draft files, no backup files ever reach `/dist/`

### .cfignore (Cloudflare Pages ignore file)
```
/src/
/node_modules/
*.md
*.json
*.config.js
.gitignore
.env
/SSOT/
README.md
```

### .gitignore
```
/dist/
/node_modules/
.env
*.log
.DS_Store
Thumbs.db
```

### Rule 2: No Duplicate Content — Ever
- Each piece of content has ONE canonical URL
- Content lives in ONE source file (`/src/data/` or `/src/content/`)
- Build script outputs ONE HTML file per URL
- No `index.html` AND `[slug].html` for the same page
- Pagination generates `/blog/page/2/` etc. — never duplicates page 1

### Rule 3: Drafts Never Build
```json
// In blog-posts.json — draft field controls whether it builds
{
  "slug": "my-draft-post",
  "status": "draft",     // "draft" | "published"
  "title": "..."
}
```
Build script skips `status: "draft"` entries entirely — they never appear in `/dist/`.

### Rule 4: Canonical on Every Page
Every generated HTML page includes:
```html
<link rel="canonical" href="https://golfsimcanada.site/[exact-slug]/">
```
Trailing slash consistent across ALL pages (with slash). `_redirects` enforces this:
```
/products  /products/  301
/blog      /blog/      301
```

### Rule 5: No Accidental Indexing
```
# robots.txt
User-agent: *
Allow: /
Disallow: /dist/    # should never be accessible but safeguard
Disallow: /src/
Sitemap: https://golfsimcanada.site/sitemap.xml
```

---

## 3. Build System — How It Works

### build.js — Core Logic
```
1. Read build.config.json (base URL, locale, etc.)
2. For each template type:
   a. Read corresponding JSON data file
   b. For each data entry with status: "published":
      - Inject data into HTML template
      - Inject JSON-LD schema
      - Inject meta tags (title, description, OG, canonical)
      - Inject breadcrumbs
      - Write to /dist/[slug]/index.html
3. Read /src/content/*.md files:
   a. Parse frontmatter (title, slug, date, schema_type, etc.)
   b. Convert Markdown body → HTML
   c. Inject into matching template
   d. Write to /dist/[slug]/index.html
4. Generate /dist/sitemap.xml from all published pages
5. Copy /src/assets/ → /dist/assets/
6. Done. Zero manual steps.
```

### Adding New Content — Workflow
| Task | Action | Time |
|---|---|---|
| New blog post | Add `.md` to `/src/content/blog/` with frontmatter | 2 min |
| New product | Add entry to `products.json` | 5 min |
| New venue | Add entry to `venues.json` | 2 min |
| New city page | Add city to `cities.json` | 1 min |
| New module/section | Edit relevant template in `/src/templates/` | varies |
| Remove a page | Set `status: "archived"` in JSON or delete `.md` → auto 410 gone | 1 min |
| Update content | Edit source → rebuild → deploy | instant |

### Deploy Command
```bash
npm run build    # runs build.js → outputs /dist/
# Cloudflare Pages auto-deploys from /dist/ on git push
```

---

## 4. pSEO — Programmatic SEO Strategy

Programmatic SEO = generate hundreds of pages from structured data with minimal manual effort. Our site has 4 strong pSEO opportunities.

### pSEO Opportunity 1: City Venue Pages (50+ pages)

**Data source**: `/src/data/cities.json`
```json
[
  {
    "slug": "toronto",
    "city": "Toronto",
    "province": "Ontario",
    "province_code": "ON",
    "population_rank": 1,
    "venues": [
      {
        "name": "Fore Everyone Golf",
        "address": "...",
        "hours": "Mon–Sun 10am–11pm",
        "brands": ["Foresight GCQuad"],
        "price_per_hour": 45,
        "booking_url": "...",
        "is_24_7": false,
        "featured": true
      }
    ],
    "meta_title": "Indoor Golf Toronto — Golf Simulators Near You | Golf Sim Canada",
    "meta_description": "Find indoor golf simulator venues in Toronto, ON. Compare prices, hours, and simulator brands. Updated {{last_verified}}."
  }
]
```

**Template**: `venue-city.html`  
**Output**: `/venues/toronto/index.html`  
**Scale**: Add new city = add JSON entry → rebuild → 1 new indexed page.

---

### pSEO Opportunity 2: Product Pages (20+ pages)

**Data source**: `/src/data/products.json`
```json
[
  {
    "slug": "foresight-gcquad",
    "name": "Foresight GCQuad",
    "brand_slug": "foresight-sports",
    "category": "launch-monitor",
    "sub_category": "photometric",
    "badge": "editors-choice",
    "price_range_cad": "$15,000–$18,000",
    "price_verified": "2025-07",
    "rating": 9.2,
    "filter_tags": {
      "best_for": ["serious-golfer", "commercial"],
      "space_type": ["dedicated-room", "garage"],
      "detection_tech": "camera",
      "software_compat": ["fsx", "gspro", "e6"],
      "budget_tier": "premium"
    },
    "specs": {
      "technology": "Photometric (4 cameras)",
      "ball_data_points": 16,
      "club_data": true,
      "indoor_outdoor": "Both",
      "software_included": "FSX Play"
    },
    "pros": ["Most accurate on market", "Full club + ball data", "Outdoor capable"],
    "cons": ["Highest price point", "Requires calibration space"],
    "canada_notes": "Sold through authorized Foresight dealers in Canada. Full Canadian warranty. HST applicable.",
    "dealers": [
      { "name": "Foresight Sports Canada", "url": "https://foresightsports.ca", "provinces": ["ON","BC","AB"] }
    ],
    "alternatives": ["foresight-gc3", "skytrak-plus", "uneekor-eye-xo2"],
    "status": "published"
  }
]
```

**Output**: `/products/foresight-gcquad/index.html`

---

### pSEO Opportunity 3: Glossary Terms (50+ pages)

**Data source**: `/src/data/glossary.json`
```json
[
  {
    "slug": "smash-factor",
    "term": "Smash Factor",
    "short_definition": "Smash factor is the ratio of ball speed to club head speed. A higher smash factor means more efficient energy transfer at impact.",
    "full_content_md": "smash-factor.md",
    "related_terms": ["ball-speed", "club-head-speed", "launch-angle"],
    "money_page_link": "/products/launch-monitors/",
    "money_page_anchor": "a launch monitor that tracks smash factor accurately",
    "status": "published"
  }
]
```

**Output**: `/glossary/smash-factor/index.html`

---

### pSEO Opportunity 4: Comparison Pages (combinatorial)

**Data source**: `/src/data/comparisons.json`
```json
[
  {
    "slug": "gc3-vs-gcquad",
    "product_a": "foresight-gc3",
    "product_b": "foresight-gcquad",
    "verdict": "The GC3 covers 95% of what home golfers need at half the price...",
    "verdict_winner": "foresight-gc3",
    "verdict_context": "home use under $10,000 CAD budget",
    "status": "published"
  }
]
```

**Output**: `/vs/gc3-gcquad/index.html`

---

## 5. Enterprise-Grade Technical Checklist

### Schema / JSON-LD
- [ ] Every page has at least 1 JSON-LD block in `<head>`
- [ ] Injected by build script from template + data — never hardcoded per page
- [ ] Validated via Google Rich Results Test before deploy
- [ ] Schema types per page: see `06-seo-strategy.md` §5

### Pagination (Hub Pages)
```
/blog/           ← page 1 (canonical)
/blog/page/2/    ← page 2
/blog/page/3/    ← page 3
```
- `<link rel="prev">` and `<link rel="next">` on all paginated pages
- Page 1 canonical = `/blog/` NOT `/blog/page/1/` (redirect `/blog/page/1/` → `/blog/`)
- Each paginated page has unique meta description ("Page 2 of X")
- Applies to: `/blog/`, `/products/`, `/venues/`, `/glossary/`
- Default: 12 items per page (products), 10 per page (blog), 20 per page (venues)

### Mobile — Mobile-First Implementation
- All CSS written mobile-first (base styles = mobile, `@media (min-width: X)` = desktop)
- Tap targets minimum 44×44px (WCAG)
- Font sizes: minimum 18px body, 14px labels — never smaller on mobile
- No horizontal scroll at any breakpoint
- Images: `<img srcset="..." sizes="...">` for responsive images
- Hero images: `fetchpriority="high"`, explicit `width` + `height`
- Below-fold images: `loading="lazy"`
- Touch-friendly: hamburger nav on mobile, swipeable carousels if used
- Test breakpoints: 375px, 430px, 768px, 1024px, 1280px

### Performance Targets (Core Web Vitals)
| Metric | Target | How |
|---|---|---|
| LCP | < 1.5s | Cloudflare CDN + R2 images + `fetchpriority="high"` |
| CLS | < 0.05 | Explicit img dimensions + no late-loading layout shifts |
| INP | < 100ms | Minimal JS, defer non-critical |
| TTFB | < 200ms | Cloudflare edge static delivery |
| Total page weight | < 300KB | Compress images (WebP), no heavy JS frameworks |

### Security Headers (_headers file)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600
```

### Redirects (_redirects file)
```
# Trailing slash enforcement
/blog           /blog/          301
/products       /products/      301
/venues         /venues/        301
/glossary       /glossary/      301
/brands         /brands/        301

# Pagination canonical
/blog/page/1/   /blog/          301

# Old URL cleanup (if any)
/find/venues/*  /venues/:splat  301
/find/installers/* /installers/:splat 301

# 404 fallback
/*              /404.html       404
```

### Sitemap — Auto-Generated by Build Script
```xml
<!-- /dist/sitemap.xml — generated fresh every build -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://golfsimcanada.site/</loc>
    <lastmod>2025-07-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- hreflang for bilingual pages -->
  <url>
    <loc>https://golfsimcanada.site/best-home-simulators/</loc>
    <xhtml:link rel="alternate" hreflang="en-CA" href="https://golfsimcanada.site/best-home-simulators/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://golfsimcanada.site/fr/meilleur-simulateur/"/>
  </url>
</urlset>
```

### Additional Enterprise Features
| Feature | Implementation |
|---|---|
| **RSS Feed** | `/blog/feed.xml` — auto-generated, last 20 posts |
| **Client-side Search** | `/assets/js/search.js` reads `search-index.json` — no external API |
| **Reading time** | Calculated in build script (words ÷ 200 = minutes) |
| **Breadcrumbs** | Auto-generated from URL structure + BreadcrumbList schema |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:type` on every page |
| **Twitter Cards** | `twitter:card`, `twitter:title`, `twitter:image` |
| **hreflang** | `en-CA` + `fr-CA` on all bilingual pages |
| **404 page** | Custom branded `/404.html` — links back to homepage + search |
| **Robots.txt** | Auto-generated, includes sitemap URL |
| **Favicon set** | `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` |
| **Print CSS** | `@media print` — clean article print layout |
| **Client-side Filter** | `/assets/js/filters.js` — reads `data-*` attrs, no reload |
| **Interactive Tools** | `/assets/js/tools.js` — 5 tools, pure JS, data from JSON |
| **Mobile Bottom Nav** | `/assets/js/mobile-nav.js` — tray open/close, backdrop click |

---

## 6. Updated JSON Schemas — New Data Fields

### venues.json — Updated with Local/Nearby Fields
```json
{
  "slug": "fore-everyone-toronto",
  "name": "Fore Everyone Golf",
  "city_slug": "toronto",
  "province_code": "ON",
  "address": "123 King St W, Toronto, ON M5H 1A1",
  "phone": "+1-416-555-0100",
  "hours": "Mon–Fri 10am–11pm, Sat–Sun 9am–12am",
  "is_24_7": false,
  "brands": ["Foresight GCQuad", "Full Swing"],
  "price_per_hour_cad": 45,
  "min_booking_hours": 1,
  "booking_url": "https://...",
  "booking_type": ["online", "walk-in"],
  "amenities": ["private-bay", "bar", "food", "lessons"],
  "nearby_landmark": "5 min walk from Union Station",
  "nearby_transit": "Union Station (Line 1)",
  "distance_from_downtown_km": 0.8,
  "summary": "Premium simulator facility in the Financial District. 6 private bays, each with GCQuad. Bar and food service available.",
  "website_url": "https://...",
  "google_maps_url": "https://maps.google.com/?cid=...",
  "featured": true,
  "verified_date": "2025-07",
  "has_rental": false,
  "has_events": true,
  "status": "published"
}
```

### brands.json — Updated with Founding + History
```json
{
  "slug": "foresight-sports",
  "name": "Foresight Sports",
  "founded_year": 2010,
  "founded_location": "San Diego, California, USA",
  "canada_presence_since": 2014,
  "canada_authorized_dealers": ["ON", "BC", "AB", "QC"],
  "hq": "San Diego, CA",
  "website": "https://foresightsports.com",
  "canadian_website": "https://foresightsports.ca",
  "technology_type": "Photometric",
  "product_lines": [
    { "name": "GCQuad", "category": "launch-monitor", "tier": "pro", "slug": "foresight-gcquad" },
    { "name": "GC3", "category": "launch-monitor", "tier": "mid", "slug": "foresight-gc3" },
    { "name": "Falcon", "category": "launch-monitor", "tier": "entry", "slug": "foresight-falcon" },
    { "name": "FSX Play", "category": "software", "tier": "entry", "slug": "fsx-play" },
    { "name": "FSX Pro", "category": "software", "tier": "pro", "slug": "fsx-pro" }
  ],
  "known_for": ["Highest accuracy photometric cameras", "Used by PGA Tour pros", "FSX software ecosystem"],
  "notable_clients_canada": ["TrackMan rival for commercial installs", "Used in Golf Canada training"],
  "brand_description_short": "Foresight Sports builds the most accurate photometric launch monitors in golf. Founded 2010, they pioneered 4-camera ball tracking.",
  "alternatives": ["skytrak", "uneekor", "trackman"],
  "editor_verdict": "Best-in-class accuracy. Overkill for casual home use, essential for serious players and commercial installations.",
  "status": "published"
}
```

### rentals.json — NEW
```json
{
  "slug": "toronto-golf-sim-rental",
  "provider_name": "GolfBox Toronto",
  "city_slug": "toronto",
  "province_code": "ON",
  "service_type": ["corporate-event", "private-party", "birthday", "teambuilding"],
  "delivery_area": "Greater Toronto Area (50km radius)",
  "equipment": ["Foresight GCQuad", "Full Swing"],
  "setup_time_hours": 2,
  "min_rental_hours": 3,
  "price_per_hour_cad": 250,
  "includes": ["simulator", "setup", "teardown", "attendant"],
  "max_players": 8,
  "indoor_outdoor": "Both",
  "phone": "+1-416-555-0200",
  "booking_url": "https://...",
  "summary": "Mobile golf simulator rental for events in Toronto. We bring the full setup to your venue.",
  "featured": true,
  "verified_date": "2025-07",
  "status": "published"
}
```

### events.json — NEW
```json
{
  "slug": "toronto-golfzon-winter-league-2025",
  "name": "Golfzon Winter League Toronto 2025",
  "type": "league",
  "city_slug": "toronto",
  "province_code": "ON",
  "venue_slug": "fore-everyone-toronto",
  "start_date": "2025-11-01",
  "end_date": "2026-02-28",
  "recurring": "weekly",
  "entry_fee_cad": 150,
  "format": "Stroke play, 18 holes per round",
  "simulator_brand": "Golfzon",
  "registration_url": "https://...",
  "prizes": "Gift cards + simulator time",
  "description": "12-week winter league on Golfzon simulators. All skill levels welcome. Weekly leaderboard.",
  "status": "published"
}
```

### alternatives — Data in products.json
```json
// No separate file — alternatives are a field in products.json
// The build script generates /alternatives/[base-product]/ by:
// 1. Finding the base product (e.g., "trackman-4")
// 2. Finding all products where "trackman-4" appears in their alternatives[] array
// 3. Ranking by budget_tier and rating
// 4. Rendering alternatives-single.html template

// In products.json (TrackMan IO as example):
{
  "slug": "trackman-io",
  "alternatives": ["foresight-gcquad", "foresight-gc3", "garmin-r10"],
  "positioned_as_alternative_to": ["trackman-4"]
}
```

---

## 7. filters.js — Behavioral Spec

```javascript
// /assets/js/filters.js
// Pure client-side filtering. No page reload. Uses data-* attributes.

// On collection pages, each card has:
// <div class="product-card"
//   data-brand="garmin"
//   data-budget-tier="budget"
//   data-best-for="beginner intermediate"
//   data-space-type="portable garage"
//   data-detection-tech="radar"
//   data-software="gspro e6">

// Filter logic:
// 1. User checks checkbox → add to activeFilters[group]
// 2. For each card: check ALL active filter groups
//   - Within a group: OR match (any selected = show)
//   - Between groups: AND match (must satisfy all active groups)
// 3. Hide non-matching cards instantly (display: none)
// 4. Update result count label
// 5. Show "No results" message if 0 cards visible
// 6. Active filters shown as removable chips above results

// URL state: activeFilters written to URLSearchParams on change
// → Shareable filter URLs, back button works
// → e.g. /products/?brand=garmin&best-for=beginner

// Mobile: filter panel hidden by default, show via "Filters" button
// Filter button shows active count badge: "Filters (3)"
```

---

## 8. tools.js — Behavioral Spec

```javascript
// /assets/js/tools.js — All 5 tools in one file, lazy-initialized

// TOOL 1: Room Size Checker
// Input: width_ft (number), height_ft (number), length_ft (number)
// Logic: check against MIN_REQUIREMENTS table (hardcoded)
//   { min_width: 12, min_height: 9, min_length: 15 } for standard sim
// Output: "Great!" | "Tight but possible — check ceiling height" | "Too small"
// Also: show recommended products for that space size

// TOOL 2: Budget Calculator
// Input: budget_cad (slider 500–30000), priority ("accuracy" | "value")
// Logic: filter products.json by price_range_cad ≤ budget
//   sort by rating DESC (accuracy) or value_score DESC (value)
//   return top 3 results
// Output: 3 product cards with links

// TOOL 3: Product Comparator
// Input: up to 3 product slugs (searchable dropdown, autocomplete from products.json)
// Logic: build side-by-side table of spec keys
//   highlight winner per row (highest = green badge)
//   pull verdict from comparisons.json if pair exists
// Output: comparison table + verdict text

// TOOL 4: Installer Quote Estimator
// Input: province (select), room_type ("garage" | "basement" | "dedicated"), completion ("rough" | "full")
// Logic: lookup PRICING_TIERS[province][room_type][completion] (hardcoded ranges)
// Output: "$X,XXX – $Y,YYY CAD estimated" + CTA to /installers/[province]/

// TOOL 5: Software Matchmaker
// Input: 3 questions:
//   Q1: "What launch monitor do you have?" (select from products.json category=launch-monitor)
//   Q2: "What's your budget for software?" (free / under $200 / $200+ / no limit)
//   Q3: "How do you play?" (casual / practice / compete)
// Logic: compatibility matrix (hardcoded JSON object)
// Output: 2 software recommendations with links to /products/[slug]/
```
