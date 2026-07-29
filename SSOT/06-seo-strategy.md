# GolfSimCanada.site — SEO Strategy

> **File**: `06-seo-strategy.md`  
> **Active Skills**: `seo-advanced-specialist.md`, `topical-authority-koray.md`, `seo-content-architect.skill.md`  
> **Deploy**: Cloudflare Pages (static HTML — Core Web Vitals advantage)

---

## 1. SEO Framework Stack

| Layer | Method | Skill |
|---|---|---|
| Topical Coverage | Koray Topical Authority | `topical-authority-koray.md` |
| Entity SEO | Entity mapping + co-occurrence | `seo-advanced-specialist.md` |
| Schema | Structured data per page type | `seo-advanced-specialist.md` |
| EEAT | Author, trust signals, data | `seo-advanced-specialist.md` |
| AEO | Answer Engine / AI Overview | `seo-advanced-specialist.md` |
| GEO | Generative Engine Optimization | custom (LLM citation strategy) |
| Content Briefs | SERP entity extraction | `seo-content-architect.skill.md` |
| Audit | Post-build 6-phase audit | `seo-audit-protocol.md` |

---

## 2. Seed Entity & Semantic Map

### Core Entities (Must Appear on Every Major Page)
- **Home Golf Simulator** (macro entity)
- **Canada** / **Canadian** (geo-modifier)
- **Launch Monitor** (component entity)
- **Indoor Golf** (related entity)

### Brand Entities (appear in relevant product/brand pages)
- Foresight Sports, SkyTrak, Bushnell Launch Pro, Uneekor, Full Swing, Trackman, Garmin Approach

### Regulatory/Standards Entities (Canadian context — co-occurrence signals)
- PIPEDA (privacy), CASL (communications), HST/GST/PST (tax), AODA (accessibility)
- Golf Canada (governing body — authority signal)
- Canada Mortgage and Housing Corporation (CMHC) — for home installation content

### Location Entities (per local page)
- Province codes: ON, BC, AB, MB, QC, SK, NS, NB, NL, PEI
- Major cities: Toronto, Vancouver, Calgary, Edmonton, Winnipeg, Ottawa, Montreal
- Neighbourhoods (where relevant for venue pages)

### Product/Spec Entities (appear in product + comparison pages)
- Ball speed, club head speed, spin rate, launch angle, smash factor
- Doppler radar, photometric, camera-based (launch monitor technology types)
- FSX, E6 Connect, The Golf Club 2019, WGT Golf (software entities)

---

## 3. EEAT Implementation

### Experience (E)
- [ ] Editor-in-chief has real name, photo, bio on every article
- [ ] "Tested by our team" language where applicable
- [ ] "Last Verified: [Month Year]" on all pricing and specs
- [ ] Original data points: at least one per pillar (cost survey, space calculation, temperature test)
- [ ] Real Canadian context: specific provinces, garage setups, winter conditions

### Expertise (E)
- [ ] Author `Person` schema with `jobTitle`, `sameAs` (LinkedIn), `image`
- [ ] Credentials stated (golf background, tech background, or both)
- [ ] Expert citations where relevant (Golf Canada, certified instructors)
- [ ] Technical accuracy: spec data cross-referenced with manufacturer documentation

### Authoritativeness (A)
- [ ] Cite Golf Canada (golf.ca) as authority source
- [ ] Cite manufacturer spec sheets as sources
- [ ] Internal link cluster: every spoke links to its pillar with exact-match anchor text
- [ ] Target editorial backlinks: golf publications, home improvement, Canadian lifestyle

### Trustworthiness (T)
- [ ] HTTPS (Cloudflare handles)
- [ ] About page with real editorial team
- [ ] Privacy Policy, Terms, Disclaimer, Cookie Policy all live
- [ ] Editorial independence statement (clearly not a brand site)
- [ ] Correction email visible ("See an error? Tell us.")
- [ ] Affiliate + sponsored disclosure — clear and non-buried
- [ ] No broken links (Cloudflare 404 monitoring)

---

## 4. AEO — Answer Engine Optimization

### Target: Featured Snippets + Google AI Overviews + ChatGPT/Perplexity Citations

**For each pillar page, include**:

1. **Direct Answer Paragraph** (40–60 words, first paragraph after H1):  
   Starts with: "The best home golf simulator in Canada is..." / "A home golf simulator in Canada costs..."  
   — verbatim answer format for Featured Snippet capture

2. **Definition Block** (for informational articles):  
   Format: "[Term] is [definition]. [One-sentence expansion]."

3. **FAQ Block** (minimum 5 Q&A per pillar):  
   - H3 format for each question
   - 40–80 word answers (complete, self-contained)
   - `FAQPage` schema on all FAQ blocks
   - Questions sourced from "People Also Ask" + AI prompt data

4. **Step-by-Step** (for setup/how-to pages):  
   - `<ol>` with numbered steps
   - `HowTo` + `Step` schema
   - Each step: 30–50 words, self-contained

5. **Comparison Table** (for compare/product pages):  
   - HTML `<table>` — not image
   - `ItemList` or `Review` schema

### GEO (Generative Engine Optimization) — LLM Citation Targets

| LLM Prompt | Our Target URL | Strategy |
|---|---|---|
| "Best indoor golf simulator Canada" | /best-golf-simulators-canada/ | Pillar with ItemList schema |
| "How much does a golf sim cost in Canada" | /golf-simulator-cost-canada/ | Direct answer paragraph + FAQPage |
| "Where to buy golf simulator in Canada" | /find/installers/ | LocalBusiness schema |
| "Best launch monitor for home use" | /products/launch-monitors/ | Review + AggregateRating |
| "Golf simulator garage setup" | /setup/golf-simulator-garage-canada/ | HowTo schema |
| "Simulateur golf Canada" | /fr/simulateur-golf-canada/ | FR Article schema |

**GEO Content Rules**:
- Each section must be "self-contained" (can be extracted by an LLM without context)
- Use canonical entity names (exact product names as registered)
- Include: price (CAD), where to buy (Canada), what it does — LLMs want these three

---

## 5. Schema Strategy (Full Implementation)

### Per Page Type

```
Homepage:
  - WebSite { name, url, description }
  - Organization { name, url, logo, contactPoint, sameAs }
  - SiteLinksSearchBox { url, potentialAction }

Pillar / Article:
  - Article { headline, author, datePublished, dateModified, image }
  - Person { name, jobTitle, sameAs, image } (author)
  - FAQPage { mainEntity: [Question, acceptedAnswer] }
  - BreadcrumbList

Product Page:
  - Product { name, brand, description, image }
  - Review { reviewBody, reviewRating, author }
  - AggregateRating { ratingValue, reviewCount }
  - Offer { price, priceCurrency: "CAD", areaServed: "CA", availability }

Brand Page:
  - Organization { name, url, logo, foundingDate, sameAs }
  - BreadcrumbList

Comparison Page:
  - Review { itemReviewed: [Product A, Product B], reviewBody, reviewRating }
  - ItemList
  - BreadcrumbList

Venue Listing Page:
  - ItemList (wrapping multiple LocalBusiness)
  - LocalBusiness { name, address, openingHours, priceRange, telephone }
  - GeoCoordinates { latitude, longitude }

Installer/Dealer Page:
  - LocalBusiness + ProfessionalService
  - addressRegion: [province code]

Setup / How-To:
  - HowTo { name, step: [HowToStep] }
  - FAQPage
  - BreadcrumbList

Blog Article:
  - BlogPosting { headline, author, datePublished, dateModified }
  - Person (author)
  - BreadcrumbList

Author Page:
  - Person { name, jobTitle, description, sameAs, image }

Legal Pages:
  - WebPage { name, url, dateModified }
```

---

## 6. Internal Link Siloing

**Per `seo-advanced-specialist.md`**:

### Anchor Text Ratio
- 40% Exact match (e.g., "home golf simulator Canada")
- 30% Partial / LSI (e.g., "best indoor golf setup," "Canadian golf simulator guide")
- 20% Branded (e.g., "Golf Sim Canada's review of...")
- 10% Generic ("read more," "see full guide")

### Pillar → Spoke Rules
- Every Spoke article links UP to its Pillar with exact-match anchor
- Pillar links DOWN to all its Spokes with varied anchor text
- No direct Pillar-to-Pillar links unless strong topical overlap

### Cross-Cluster Links (Allowed)
- Product pages → Setup guides (natural journey)
- Comparison pages → Product pages (both in same cluster E)
- Venue pages → /indoor-golf-canada/ pillar
- Installer pages → /golf-simulator-cost-canada/ (pricing context)

### Hub Pages (High Internal Link Equity)
- `/best-golf-simulators-canada/` — links to all top product pages
- `/indoor-golf-canada/` — links to all province/city directories
- `/setup/` — links to all component + setup guides

---

## 7. Technical SEO — Cloudflare Pages Advantage

Cloudflare Pages static HTML gives us Core Web Vitals advantages:

### LCP (Largest Contentful Paint) — Target < 1.5s
- `fetchpriority="high"` on hero images
- Hero images served from Cloudflare R2 (CDN edge)
- Critical CSS inlined (no render-blocking stylesheet)
- Preconnect to Google Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com">`

### CLS (Cumulative Layout Shift) — Target < 0.05
- Explicit `width` + `height` on ALL `<img>` elements
- Font display: swap on web fonts
- No ads above the fold (display ads below content only)

### FID/INP — Target < 100ms
- Minimal JS (custom CMS = no heavy framework overhead)
- Defer all non-critical JS

### Additional Technical
- `robots.txt` — allow all, disallow `/legal/` from index if needed
- `sitemap.xml` — auto-generated, submitted to GSC
- `<link rel="canonical">` on every page
- `hreflang` tags: `en-CA` (main) + `fr-CA` (/fr/ pages)
- `<meta charset="UTF-8">` + `<meta name="viewport">`
- Open Graph + Twitter Card tags on all public pages
- `rel="noopener noreferrer"` on all external links
- 301 redirects via `_redirects` file (Cloudflare Pages)
- Security headers via `_headers` file:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=()`

---

## 8. Content Brief Template

> Activate `seo-content-architect.skill.md` for each new article.

### Brief Structure (per article)
```
Target URL: /[slug]/
H1: [Exact title]
Primary Entity: [main topic]
Secondary Entities: [list of must-include terms]
Primary KW: [keyword] | Vol: X | SD: X
Secondary KWs: [list]
Search Intent: [Informational / Commercial / Transactional]
Target Audience: [Canadian homeowner buying a golf sim / golf sim business owner / etc.]
Schema: [Article / HowTo / FAQPage / etc.]
AEO Block: [40-60 word direct answer to place at top]
H2 Outline: [full structure]
FAQ (5 Q&A): [questions]
Internal Links OUT: → [pillar or related spokes]
Internal Links IN: ← [which existing pages should link here]
Word Count Target: [X words]
Last Verified Date: [Month Year]
```

---

## 9. Backlink Strategy (Canadian Authority)

### Target Referring Domains
| Domain Type | Example | Strategy |
|---|---|---|
| Golf Media CA | Score Golf (scoregolf.com), Golf Canada (golf.ca) | Guest contribution, quote as expert |
| Home Improvement CA | HomeStars.ca, Houzz Canada | Directory listing + resource link |
| Tech Media CA | MobileSyrup, Techvibes | "Best home tech gifts" listicles |
| Local News | Toronto Star, Calgary Herald | Local directory angle |
| Golf Retailers | PGA Tour Superstore CA | "Where to buy" resource link |
| Reddit | r/golf, r/canadagolf | Organic community contribution |
| Facebook Groups | Canadian Golf groups | Content sharing, not spammy |

### Link-Earning Content (Create These for Natural Links)
1. **"Golf Simulator Cost Canada" guide** — journalists cite this
2. **Canada Indoor Golf Directory** — venues link to their listing
3. **Canadian Golf Sim Survey** — original data attracts citations
4. **Golf Simulator Room Calculator** — tool that gets embedded/shared
