# GolfSimCanada.site — Site Architecture, Content Structure & Legal Pages

> **File**: `03-site-architecture.md`  
> **Stack**: Custom HTML/CSS/JS — Deployed on Cloudflare Pages  
> **Reference Skills**: `architect-commander-v2.md`, `seo-advanced-specialist.md`

---

## 1. URL Slug Rules

**Principle**: Shorter = better. Closer to root = more authority. No repetition.

| Rule | Rationale |
|---|---|
| **No "canada" in slugs** | Domain is `golfsimcanada.site` — already implied |
| **No "golf-simulator" repetition** | Context is established by the site itself |
| **Flat over nested** | `/venues/toronto/` beats `/find/venues/ontario/toronto/` |
| **No category in product slug** | `/products/gcquad/` beats `/products/launch-monitors/foresight-gcquad/` |
| **`/vs/` for comparisons** | Shorter than `/compare/` |
| **`/build/` for configurator tool** | Single word, clear intent |
| **Blog: flat slugs** | `/blog/smash-factor/` beats `/blog/technique/smash-factor-golf/` |

---

## 2. Full URL Architecture

```
golfsimcanada.site/
│
├── /                              ← Homepage
│
├── /best-home-simulators/         ← PILLAR — Best (KW: best golf simulator canada)
├── /cost/                         ← PILLAR — Cost Guide
├── /packages/                     ← PILLAR — Packages
├── /indoor-golf/                  ← PILLAR — Year-round + directory entry
├── /build/                        ← Tool — Simulator Room Builder (lead gen)
│
├── /products/                     ← Product catalog HUB
│   ├── /products/launch-monitors/ ← Category index (paginated)
│   ├── /products/launch-monitors/portable/
│   ├── /products/launch-monitors/ceiling-mount/
│   ├── /products/enclosures/
│   ├── /products/enclosures/retractable/ ← NEW (SD 10)
│   ├── /products/projectors/
│   ├── /products/mats/
│   ├── /products/nets/            ← NEW — golf nets, netting (2400 vol)
│   ├── /products/putting-turf/    ← NEW — indoor putting green (880 vol)
│   ├── /products/sport-screens/   ← NEW — SportScreen, retractable screens (720 vol)
│   ├── /products/software/        ← Category index (links to /software/ hub)
│   ├── /products/packages/
│   ├── /products/accessories/
│   └── /products/[product-slug]/  ← FLAT — no category in URL
│       Planned: /products/gcquad/
│                /products/skytrak-plus/
│                /products/gc3/
│                /products/gc3s/
│                /products/bushnell-launch-pro/
│                /products/uneekor-eye-xo2/
│                /products/uneekor-eye-xr/   ← NEW (SD 14)
│                /products/full-swing-kit/
│                /products/gcquadmax/
│                /products/forecaddy-smart-cart/
│                /products/garmin-r10/       ← NEW 🔴 (3600 vol, SD 19)
│                /products/garmin-r50/       ← NEW 🔴 (1300 vol, SD 20)
│                /products/mlm2pro/          ← NEW 🔴 (1600 vol, SD 15)
│                /products/gspro/            ← NEW 🔴 (1900 vol, SD 18 — software)
│                /products/square-golf/      ← NEW 🔴 (1300 vol, SD 22)
│                /products/flightscope-mevo-gen2/ ← NEW (720 vol, SD 16)
│                /products/e6-connect/       ← NEW (590 vol, SD 19)
│                /products/trackman-io/      ← NEW (480 vol, SD 34)
│                /products/protee-vx/        ← NEW
│                /products/trugolf-launch-box/ ← NEW
│                /products/net-return-pro/   ← NEW
│
├── /software/                     ← Software HUB (was single page under /setup/)
│   ├── /software/gspro/           → redirect to /products/gspro/
│   ├── /software/e6-connect/      → redirect to /products/e6-connect/
│   └── /software/                 ← Pillar: Best Golf Simulator Software Canada
│                                    KW: "golf simulator software" (720 vol, SD 36)
│
├── /brands/                       ← Brand directory HUB
│   ├── /brands/foresight/
│   ├── /brands/skytrak/
│   ├── /brands/bushnell/
│   ├── /brands/uneekor/
│   ├── /brands/full-swing/
│   ├── /brands/trackman/
│   ├── /brands/garmin/            ← NEW 🔴 (R10 = 3600 vol)
│   ├── /brands/rapsodo/           ← NEW 🔴 (MLM2Pro = 1600 vol)
│   ├── /brands/flightscope/       ← NEW 🔴 (Mevo = 590 vol)
│   ├── /brands/square-golf/       ← NEW 🔴 (SD 11 Canada)
│   ├── /brands/carls-place/       ← NEW (enclosures, SD 17)
│   ├── /brands/trugolf/           ← NEW
│   └── /brands/[brand-slug]/
│
├── /vs/                           ← Comparison HUB (short: /vs/ not /compare/)
│   ├── /vs/skytrak-plus-bushnell/
│   ├── /vs/gc3-gcquad/
│   ├── /vs/uneekor-foresight/
│   ├── /vs/full-swing-gc3/
│   ├── /vs/trackman-foresight/
│   ├── /vs/simulator-launch-monitor/
│   ├── /vs/costco/                ← Costco comparison page ✅
│   ├── /vs/garmin-r10-mlm2pro/   ← NEW (high-vol budget segment)
│   ├── /vs/gspro-e6-connect/     ← NEW (software comparison)
│   ├── /vs/mevo-plus-mlm2pro/    ← NEW
│   └── /vs/trackman-io-trackman4/ ← NEW (90 vol, SD 19)
│
├── /setup/                        ← Install + Components HUB (B+C merged)
│   ├── /setup/installation/
│   ├── /setup/diy/
│   ├── /setup/garage/
│   ├── /setup/basement/
│   ├── /setup/shed/
│   ├── /setup/room-size/
│   ├── /setup/cost/
│   └── /setup/[component-slug]/   ← Components under /setup/
│       e.g. /setup/launch-monitors/
│            /setup/impact-screens/
│            /setup/enclosures/
│            /setup/projectors/
│            /setup/mats/
│            /setup/flooring/
│            /setup/software/
│
├── /venues/                       ← Indoor golf venues HUB (was /find/venues/)
│   ├── /venues/ontario/           ← Province hub
│   │   ├── /venues/toronto/       ← City (flat — province in meta, not URL)
│   │   ├── /venues/ottawa/
│   │   ├── /venues/hamilton/
│   │   ├── /venues/london-on/     ← Disambiguation suffix only if needed
│   │   └── /venues/niagara-falls/
│   ├── /venues/bc/
│   │   ├── /venues/vancouver/
│   │   ├── /venues/victoria/
│   │   ├── /venues/kelowna/
│   │   └── /venues/canmore/
│   ├── /venues/alberta/
│   │   ├── /venues/calgary/
│   │   └── /venues/edmonton/
│   ├── /venues/winnipeg/
│   ├── /venues/montreal/
│   └── /venues/[city]/            ← All 50+ cities, flat
│
├── /installers/                   ← Installer/dealer directory HUB
│   ├── /installers/ontario/
│   ├── /installers/bc/
│   ├── /installers/alberta/
│   ├── /installers/quebec/
│   ├── /installers/manitoba/
│   └── /installers/[province]/
│
├── /rentals/                      ← NEW CLUSTER 🔴 — Rental/Event (SD 8–10)
│   ├── /rentals/                  ← Pillar: Golf Simulator Rental Canada
│   │                                KW: "golf simulators for rent" (210, SD 8)
│   │                                    "rent a virtual golf simulator" (260, SD 10)
│   ├── /rentals/toronto/
│   ├── /rentals/vancouver/
│   ├── /rentals/calgary/
│   ├── /rentals/ottawa/
│   └── /rentals/[city]/           ← pSEO city pages
│
├── /used/                         ← NEW — Used/Pre-Owned Simulators Guide
│                                    KW: "used indoor golf simulator for sale" (110, SD 17)
│
├── /business/                     ← B2B (was /for-business/)
│   ├── /business/start/
│   ├── /business/franchise/
│   ├── /business/24-7-venue/
│   ├── /business/mobile/
│   └── /business/golf-course/
│
├── /alternatives/                 ← NEW — Alternative-to pages
│   └── /alternatives/[product-slug]/ e.g. /alternatives/trackman/
│                                         /alternatives/gcquad/
│                                    KW: "alternatives to X" | "cheaper than X" (high-intent, low SD)
│
├── /events/                       ← NEW — Golf Sim Events + Competitions Canada
│   ├── /events/                   ← Hub: leagues, tournaments, manufacturer events
│   ├── /events/toronto/
│   ├── /events/vancouver/
│   ├── /events/calgary/
│   └── /events/[city]/            ← pSEO city event pages
│
├── /tools/                        ← NEW — Interactive Tools HUB
│   ├── /tools/room-checker/       ← "Is my room big enough?" (W/H/L input)
│   ├── /tools/budget-calculator/  ← Budget → What sim can you get?
│   ├── /tools/compare/            ← Compare up to 3 products side-by-side
│   ├── /tools/installer-quote/    ← Province + space type → install cost range
│   └── /tools/software-match/     ← 3 questions → best software for you
│   NOTE: /build/ remains the flagship room design wizard; /tools/* = quick utilities
│
├── /glossary/                     ← Wiki HUB (paginated A–Z)
│   └── /glossary/[term-slug]/
│
├── /blog/                         ← Blog HUB (paginated)
│   ├── /blog/page/2/
│   └── /blog/[slug]/              ← FLAT — no category subfolder
│       e.g. /blog/smash-factor/
│            /blog/launch-angle/
│            /blog/history-golf-sim-canada/ ← NEW (Cluster H spoke)
│            /blog/canadian-winter-golf/
│            /blog/financing/
│            /blog/golf-sim-corporate-events/
│
├── /about/
├── /contact/
├── /list-venue/                   ← Shorter than /list-your-venue/
├── /list-business/
├── /sitemap/
├── /sitemap.xml
├── /robots.txt
├── /blog/feed.xml
│
├── /legal/privacy/                ← Shorter slugs
├── /legal/terms/
├── /legal/disclaimer/
├── /legal/cookies/
├── /legal/accessibility/
└── /legal/editorial/
│
└── /fr/                           ← French Quebec
    ├── /fr/
    ├── /fr/simulateur/            ← FR Pillar (880 vol, SD 12) ✅
    ├── /fr/meilleur-simulateur/
    ├── /fr/cout-simulateur/
    ├── /fr/venues/montreal/
    └── /fr/glossaire/[terme]/
```

### Redirect Map (Old → New)
Handle via `_redirects`:
```
/find/venues/*          /venues/:splat          301
/find/installers/*      /installers/:splat       301
/for-business/*         /business/:splat         301
/compare/*              /vs/:splat               301
/blog/*/               /blog/:splat/             301
/legal/privacy-policy/ /legal/privacy/           301
/legal/terms-of-use/   /legal/terms/             301
/legal/cookie-policy/  /legal/cookies/           301
/legal/editorial-policy/ /legal/editorial/       301
/setup/components/*    /setup/:splat             301
/best-golf-simulators-canada/ /best-home-simulators/ 301
/golf-simulator-cost-canada/  /cost/             301
/golf-simulator-packages-canada/ /packages/      301
```

---

## 2. Page Types & Templates

### Template 1: Homepage
- **Purpose**: Brand hub, authority signal, entry to all content types
- **Sections**: Hero (tagline + search bar), Featured Products (ecom cards), Top Editorial Picks, Local Directory Entry (find a sim near you), Latest Blog Posts, Trust Bar (brands we cover + editor bio)
- **Schema**: `WebSite`, `Organization`, `SiteLinksSearchBox`

### Template 2: Pillar Page
- **Purpose**: Tier 1 keyword ownership, content hub
- **Sections**: Hero answer block (AEO — 40-60 word direct answer), TOC, full guide, product cards embedded, FAQ block, CTA (find dealer / get quotes)
- **Schema**: `Article`, `FAQPage`, `BreadcrumbList`
- **Word count**: 2,500–4,000 words

### Template 3: Product Page (Ecom-style)
- **Purpose**: Commercial intent capture, affiliate/dealer CTA
- **Sections**: Hero (product image + badge + rating), Key Specs table, Editorial Review (pros/cons), Best For tags, Canada-Specific Notes, Where to Buy (dealers), Related Products
- **Schema**: `Product`, `Review`, `AggregateRating`, `Offer` (localized CA)
- **Word count**: 800–1,500 words

### Template 4: Brand Page
- **Purpose**: Capture brand-name searches
- **Sections**: Brand overview, Canada presence, full product line (cards), authorized dealers in Canada, editorial summary
- **Schema**: `Organization`, `BreadcrumbList`

### Template 5: Comparison Page
- **Purpose**: Commercial investigation keywords
- **Sections**: TL;DR verdict (first), side-by-side spec table, detailed breakdown, CAD pricing comparison, "Which one is right for you?" decision tree, CTA
- **Schema**: `Review`, `ItemList`
- **Word count**: 1,200–2,000 words

### Template 6: Directory — Province/City (Venue)
- **Purpose**: Local SEO, venue discovery
- **Sections**: City intro (local context), venue cards (name, hours, brands, price/hr, booking), map embed, FAQ block, CTA to list your venue
- **Schema**: `LocalBusiness`, `ItemList`, `BreadcrumbList`

### Template 7: Directory — Installer/Dealer
- **Purpose**: Lead gen, installer discovery
- **Sections**: Province/city intro, installer cards (company, brands, service area, lead form trigger), CTA to list your business
- **Schema**: `LocalBusiness`, `ProfessionalService`

### Template 8: Blog/Article
- **Purpose**: Topical authority, informational SEO
- **Sections**: Author byline + date + last verified, direct answer paragraph (AEO), body, internal link blocks, FAQ, CTA
- **Schema**: `Article`/`HowTo`/`FAQPage`, `BreadcrumbList`, `Person` (author)
- **Word count**: 800–1,500 (spoke) | 1,500–3,000 (pillar-blog)

### Template 9: Setup Guide (Cluster B+C combined)
- **Purpose**: Component + installation informational
- **Sections**: Requirements overview, step-by-step (HowTo schema), component recommendations (product cards embedded), Canadian notes (space, permits, winter), FAQ
- **Schema**: `HowTo`, `Step`, `FAQPage`

---

## 3. Canadian Legal Pages — Requirements

> Canada has specific digital laws that go beyond US/EU requirements. All must be live before launch.

### /legal/privacy-policy/
**Governing Law**: PIPEDA (Personal Information Protection and Electronic Documents Act) + provincial laws (Quebec Law 25 — most strict)

**Must Include**:
- [ ] What personal data we collect (form submissions, analytics, cookies)
- [ ] Why we collect it (lead gen, analytics, improve service)
- [ ] Who we share it with (installer leads sent to dealers — explicit disclosure)
- [ ] Right to access, correct, or delete their data
- [ ] Contact for privacy requests
- [ ] Quebec Law 25 compliance note (for Quebec users)
- [ ] Data retention periods
- [ ] Third-party services used (Google Analytics, Cloudflare, etc.)
- [ ] Last updated date

### /legal/terms-of-use/
**Must Include**:
- [ ] Site is informational only — not a retailer
- [ ] Prices are approximate CAD and may not reflect current dealer pricing
- [ ] Directory listings are user-submitted / periodically verified
- [ ] Lead form submissions may be shared with third-party installers
- [ ] Editorial independence statement
- [ ] Limitation of liability
- [ ] Governing law: [Province, Canada]
- [ ] DMCA / copyright notice

### /legal/disclaimer/
**Must Include**:
- [ ] Affiliate disclosure (we may earn commission from dealer links)
- [ ] Sponsored content disclosure (Featured listings are paid)
- [ ] Price accuracy disclaimer ("Last Verified [date] — confirm with dealer")
- [ ] "We are not affiliated with any golf simulator brand unless stated"
- [ ] Not professional installation advice — consult a licensed contractor

### /legal/cookie-policy/
**Governing Law**: CASL (Canadian Anti-Spam Legislation) + PIPEDA

**Must Include**:
- [ ] What cookies we use (essential, analytics, advertising)
- [ ] How to opt out
- [ ] Cookie consent mechanism (required for Quebec Law 25)
- [ ] List of third-party cookies (Google Analytics, Cloudflare)

### /legal/accessibility/
**Governing Law**: AODA (Accessibility for Ontarians with Disabilities Act) — best practice for all Canada

**Must Include**:
- [ ] Commitment to WCAG 2.1 AA compliance
- [ ] How to report accessibility issues
- [ ] Contact for accessibility requests

### /legal/editorial-policy/
**Purpose**: EEAT trust signal — editorial independence statement

**Must Include**:
- [ ] How products are selected for review
- [ ] Editorial independence from advertisers
- [ ] How featured/sponsored listings are labeled
- [ ] Review update policy
- [ ] Correction policy

---

## 4. Cookie Consent — Canadian Requirements

**Quebec Law 25** (in force since Sept 2023) requires:
- Explicit, prior consent before setting non-essential cookies
- A clear consent banner with granular choices (not just "Accept All")
- Easy withdrawal of consent
- Applies to ANY site collecting data from Quebec residents

**Implementation**:
- Cookie consent banner on first visit
- Three categories: Essential / Analytics / Advertising
- "Decline All" must be as prominent as "Accept All"
- Store consent preference in localStorage (not a cookie, to avoid circularity)
- Banner language in both English and French

---

## 5. CASL Compliance (Email / Lead Forms)

**CASL** (Canadian Anti-Spam Legislation) governs commercial electronic messages.

**For our lead gen forms**:
- [ ] Checkbox for consent to be contacted by installers (unchecked by default)
- [ ] Separate checkbox if we ever send our own newsletter (unchecked by default)
- [ ] Clear statement of who will contact them and why
- [ ] Unsubscribe mechanism in any follow-up emails
- [ ] Sender identification in any email we send

---

## 6. Cloudflare Pages — Deploy Notes

> Full config in `09-deploy-cloudflare.md`

**Key settings**:
- Static site — HTML/CSS/JS output
- `_redirects` file for 301 redirects + `/fr/` routing
- `_headers` file for security headers (CSP, HSTS, X-Frame-Options)
- Cloudflare Cache Rules for static assets (1 year) vs HTML (1 hour)
- Cloudflare Workers for: cookie consent logic, dynamic locale detection (`/fr/` auto-suggest for Quebec IPs)
- Web Analytics (Cloudflare native) — privacy-first, no cookies needed → PIPEDA compliant
- R2 bucket for image/media storage (avoid large repo)

---

## 7. Schema Strategy (Per Page Type)

| Page Type | Primary Schema | Secondary Schema |
|---|---|---|
| Homepage | `WebSite`, `Organization` | `SiteLinksSearchBox` |
| Pillar Page | `Article` | `FAQPage`, `BreadcrumbList` |
| Product Page | `Product`, `Review` | `AggregateRating`, `Offer` |
| Brand Page | `Organization` | `BreadcrumbList` |
| Comparison Page | `Review` | `ItemList` |
| Venue Listing | `LocalBusiness` | `ItemList`, `OpeningHoursSpecification` |
| Installer Listing | `LocalBusiness` | `ProfessionalService` |
| Blog Article | `Article`/`BlogPosting` | `Person` (author), `BreadcrumbList` |
| Setup Guide | `HowTo` | `Step`, `FAQPage` |
| FAQ Page | `FAQPage` | `BreadcrumbList` |
| Author Bio | `Person` | `ProfessionalService` |

**Global Rules** (from `seo-advanced-specialist.md`):
- All articles: `datePublished` + `dateModified`
- All product pages: `Offer` with `priceCurrency: "CAD"`, `areaServed: "CA"`
- All local pages: `LocalBusiness` with `addressCountry: "CA"`, `addressRegion: [province code]`
- Author: `Person` schema with `sameAs` to LinkedIn/real profile
- Breadcrumbs on ALL pages except homepage
