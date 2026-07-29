# GolfSimCanada.site — Master Build Flow

> **File**: `13-build-flow.md`  
> **Purpose**: Step-by-step build sequence for Gemini 3 Pro (or any dev agent). Each phase is self-contained and verifiable before moving to the next. Zero ambiguity.  
> **Stack**: Node.js build script → Static HTML/CSS/JS → Cloudflare Pages  
> **SSOT Reference**: Read `12-guardrails.md` FIRST. Then `08-design-system.md`, `10-cms-dev-spec.md`, `11-page-templates.md`.

---

## Pre-Build Checklist (Before Phase 0)

- [ ] Read `12-guardrails.md` fully
- [ ] Read `08-design-system.md` fully  
- [ ] Read `10-cms-dev-spec.md` fully
- [ ] Read `11-page-templates.md` fully
- [ ] Node.js 18+ installed
- [ ] Git initialized in `D:\golfsimcanada.site\`
- [ ] Cloudflare Pages project created (linked to repo)

---

## PHASE 0 — Project Scaffolding

**Goal**: Create the complete folder structure and config files. Zero HTML yet.

### 0.1 — Create Directory Structure

```
D:\golfsimcanada.site\
├── src/
│   ├── data/
│   ├── content/
│   │   ├── blog/
│   │   ├── setup/
│   │   └── legal/
│   ├── templates/
│   │   └── partials/
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │       ├── logo/
│   │       ├── products/
│   │       ├── blog/
│   │       └── venues/
│   └── scripts/
├── dist/           ← gitignored, build output only
├── SSOT/           ← already exists
└── [config files]
```

### 0.2 — package.json

```json
{
  "name": "golfsimcanada",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "node src/scripts/build.js",
    "dev": "node src/scripts/build.js --watch",
    "validate": "node src/scripts/validate.js"
  },
  "dependencies": {
    "marked": "^9.0.0",
    "gray-matter": "^4.0.3",
    "fast-glob": "^3.3.0",
    "sharp": "^0.33.0"
  }
}
```

### 0.3 — .gitignore

```
/dist/
/node_modules/
.env
*.log
.DS_Store
Thumbs.db
```

### 0.4 — .cfignore (Cloudflare Pages — excludes from upload)

```
/src/
/node_modules/
/SSOT/
*.md
*.json
*.config.js
.gitignore
.env
README.md
package.json
package-lock.json
```

### 0.5 — build.config.json

```json
{
  "baseUrl": "https://golfsimcanada.site",
  "siteName": "Golf Sim Canada",
  "defaultLocale": "en-CA",
  "supportedLocales": ["en-CA", "fr-CA"],
  "paginationSize": {
    "blog": 10,
    "products": 12,
    "venues": 20,
    "glossary": 24
  },
  "trailingSlash": true,
  "outputDir": "dist"
}
```

### 0.6 — Verify Phase 0
- [ ] All directories created
- [ ] `npm install` runs without errors
- [ ] `dist/` not in git

---

## PHASE 1 — Design System (CSS Foundation)

**Goal**: All CSS variables, base styles, and component styles ready. No templates yet.  
**Reference**: `08-design-system.md` — implement EXACTLY as specified.

### 1.1 — `src/assets/css/main.css`

Must contain in this order:
1. Google Fonts `@import`
2. CSS custom properties (`:root {}`) — ALL tokens from `08-design-system.md`:
   - Color system (backgrounds, primary green, accent gold, text, borders)
   - Typography (font stacks, full type scale with `clamp()`, weights)
   - Spacing system (space-1 through space-40)
   - Layout (container-max, grid vars)
   - Border radius system
   - Shadow system
   - Animation durations + easings
3. CSS Reset (modern minimal reset)
4. Base element styles (body, a, img, table, ul, ol)
5. Utility classes (`.visually-hidden`, `.sr-only`, `.container`, `.container-narrow`)
6. Prose styles (`.prose` — for editorial article body content)
7. Print styles (`@media print`)

**Typography enforcement** (from `08-design-system.md`):
```css
body {
  font-family: var(--font-ui);
  font-size: var(--text-body-lg);       /* 20px — NEVER below this */
  line-height: var(--leading-relaxed);  /* 1.7 */
  color: var(--color-text-primary);
  background-color: var(--color-bg-base);
}
```

### 1.2 — `src/assets/css/components.css`

Components in this exact order:
1. **Badge** — `.badge`, `.badge--editors-choice`, `.badge--featured`, `.badge--info`, `.badge--new`
2. **Button** — `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--sm`, `.btn--lg`, `.btn--xs`
3. **Card base** — `.card` (shared base)
4. **Product Card** — `.product-card`, `.product-card:hover`, `.product-card__image-wrap`, `.product-card__body`, `.product-card__footer`, `.product-price`, `.product-rating`
5. **Product Card Mini** — `.product-card-mini` (used in blog posts)
6. **Article Card** — `.article-card`, `.article-card__title`, `.article-card:hover`
7. **Venue Card** — `.venue-card`, `.venue-card--featured`, `.venue-card__body`, `.venue-card__footer`
8. **Dealer Card** — `.dealer-card`
9. **Breadcrumb** — `.breadcrumb`, `.breadcrumb a`
10. **TL;DR Box** — `.tldr-box`, `.tldr-box__heading`, `.tldr-box__content`
11. **TOC** — `.toc`, `.toc__heading`, `.toc__list`, `.toc__item`, `.toc__item--h3`
12. **Author Box** — `.author-box`, `.author-avatar`
13. **FAQ Block** — `.faq-block`, `.faq-item`
14. **Trust Verified Badge** — `.trust-verified`
15. **Specs Table** — `.specs-table`
16. **Pros/Cons** — `.pros-cons`, `.pros`, `.cons`
17. **Pagination** — `.pagination`, `.pagination__btn`, `.pagination__info`
18. **Tag** — `.tag`, `.tag--sm`
19. **Related Terms** — `.related-terms`, `.related-term-card`
20. **Star Rating** — `.stars`, `.star`, `.star--empty`, `.star--half`

### 1.3 — `src/assets/css/templates.css`

Per-template layout overrides:
- `.homepage-*` classes
- `.blog-post-*` classes
- `.product-single-*` classes
- `.collection-page-*` classes
- `.venue-city-*` classes
- `.glossary-term-*` classes
- `.pillar-page-*` classes
- `.compare-page-*` classes

### 1.4 — Verify Phase 1
- [ ] Open `main.css` in browser via file:// — no CSS errors in console
- [ ] All custom properties resolve (check with DevTools)
- [ ] Body font is Inter at 20px — confirmed in DevTools

---

## PHASE 2 — Base Template & Global Components

**Goal**: HTML shell that ALL pages use. Nav, footer, head meta, cookie consent.

### 2.1 — `src/templates/base.html`

```html
<!DOCTYPE html>
<html lang="{{lang}}" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{meta_title}}</title>
  <meta name="description" content="{{meta_description}}">
  <link rel="canonical" href="{{canonical_url}}">

  <!-- hreflang (injected by build script if bilingual page) -->
  {{hreflang_tags}}

  <!-- Open Graph -->
  <meta property="og:title" content="{{meta_title}}">
  <meta property="og:description" content="{{meta_description}}">
  <meta property="og:image" content="{{og_image}}">
  <meta property="og:url" content="{{canonical_url}}">
  <meta property="og:type" content="{{og_type}}">
  <meta property="og:locale" content="{{og_locale}}">
  <meta property="og:site_name" content="Golf Sim Canada">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{meta_title}}">
  <meta name="twitter:description" content="{{meta_description}}">
  <meta name="twitter:image" content="{{og_image}}">

  <!-- Robots (default: index, follow. Override per-page for legal/paginated) -->
  <meta name="robots" content="{{robots_directive}}">

  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/main.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/templates.css">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/assets/images/logo/favicon.ico">
  <link rel="apple-touch-icon" href="/assets/images/logo/apple-touch-icon.png">

  <!-- Pagination links (injected by build script when paginated) -->
  {{pagination_links}}

  <!-- JSON-LD (injected per page by build script) -->
  {{json_ld_blocks}}
</head>
<body class="{{body_class}}">

  <!-- Cookie Consent Banner -->
  {{> cookie-consent}}

  <!-- Navigation -->
  {{> nav}}

  <!-- Page Content -->
  <main id="main-content">
    {{page_content}}
  </main>

  <!-- Footer -->
  {{> footer}}

  <!-- JS -->
  <script src="/assets/js/main.js" defer></script>
  {{page_scripts}}

</body>
</html>
```

### 2.2 — `src/templates/partials/nav.html`

**Structure**:
```html
<header class="nav" role="banner">
  <div class="container">
    <div class="nav__inner">

      <!-- Logo -->
      <a href="/" class="nav__logo" aria-label="Golf Sim Canada — Home">
        <img src="/assets/images/logo/logo.svg" alt="Golf Sim Canada"
             width="160" height="40" fetchpriority="high">
      </a>

      <!-- Desktop Nav -->
      <nav class="nav__links" aria-label="Main navigation">
        <a href="/best-home-simulators/" class="nav__link">Best Simulators</a>
        <a href="/cost/" class="nav__link">Pricing</a>
        <div class="nav__dropdown">
          <button class="nav__link nav__link--dropdown" aria-expanded="false">
            Products <span aria-hidden="true">▾</span>
          </button>
          <div class="nav__dropdown-menu">
            <a href="/products/launch-monitors/">Launch Monitors</a>
            <a href="/products/packages/">Full Packages</a>
            <a href="/products/enclosures/">Enclosures</a>
            <a href="/products/projectors/">Projectors</a>
            <a href="/products/mats/">Hitting Mats</a>
            <a href="/products/software/">Software</a>
            <a href="/products/accessories/">Accessories</a>
          </div>
        </div>
        <div class="nav__dropdown">
          <button class="nav__link nav__link--dropdown" aria-expanded="false">
            Find <span aria-hidden="true">▾</span>
          </button>
          <div class="nav__dropdown-menu">
            <a href="/venues/">Indoor Golf Venues</a>
            <a href="/installers/">Find Installers</a>
          </div>
        </div>
        <a href="/setup/" class="nav__link">Setup Guides</a>
        <a href="/blog/" class="nav__link">Blog</a>
      </nav>

      <!-- CTA -->
      <a href="/installers/" class="btn btn--primary btn--sm nav__cta">
        Get Quotes
      </a>

      <!-- Mobile hamburger -->
      <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false"
              aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="nav__mobile" id="mobile-menu" aria-hidden="true">
    <!-- All nav links stacked -->
  </div>
</header>
```

### 2.3 — `src/templates/partials/footer.html`

**Sections** (4 column layout desktop, stacked mobile):

**Col 1 — Brand**
- Logo SVG
- Tagline: *"Canada's Home for Home Golf"*
- Short editorial independence statement (1 sentence)
- Social links (if any)

**Col 2 — Explore**
- Best Simulators `/best-home-simulators/`
- Golf Simulator Cost `/cost/`
- Packages `/packages/`
- Indoor Golf Venues `/venues/`
- Find Installers `/installers/`
- Build Your Simulator `/build/`

**Col 3 — Products & Brands**
- Launch Monitors `/products/launch-monitors/`
- Full Packages `/products/packages/`
- Brands `/brands/`
- Compare `/vs/`
- Glossary `/glossary/`

**Col 4 — Company**
- About `/about/`
- Contact `/contact/`
- List Your Venue `/list-venue/`
- List Your Business `/list-business/`
- Blog `/blog/`

**Bottom bar**:
- © 2025 Golf Sim Canada. All rights reserved.
- Privacy `/legal/privacy/` · Terms `/legal/terms/` · Disclaimer `/legal/disclaimer/` · Cookies `/legal/cookies/` · Accessibility `/legal/accessibility/`
- "Prices in CAD. Last verified dates shown on each page. We may earn commission from dealer links — [Editorial Policy](/legal/editorial/)."

### 2.4 — `src/templates/partials/cookie-consent.html`

**Behavior**:
- Hidden by default (`aria-hidden="true"`, `display:none` until JS checks `localStorage`)
- Appears on first visit (no consent stored)
- Does NOT set any cookies before interaction
- Consent stored in `localStorage` key `gsc_consent` as JSON: `{ "essential": true, "analytics": false, "advertising": false, "timestamp": "ISO date" }`

**HTML Structure**:
```html
<div class="cookie-banner" id="cookie-banner" role="dialog"
     aria-label="Cookie consent" aria-hidden="true">
  <div class="cookie-banner__inner">
    <div class="cookie-banner__text">
      <h2 class="cookie-banner__title">Your Privacy Choices</h2>
      <p>We use cookies to improve your experience. You can choose which types to allow.
         <a href="/legal/cookies/">Cookie Policy</a></p>
    </div>
    <div class="cookie-banner__options">
      <!-- Essential: always checked, disabled -->
      <label class="cookie-option">
        <input type="checkbox" name="essential" checked disabled>
        Essential (required)
      </label>
      <label class="cookie-option">
        <input type="checkbox" name="analytics" id="consent-analytics">
        Analytics
      </label>
      <label class="cookie-option">
        <input type="checkbox" name="advertising" id="consent-advertising">
        Advertising
      </label>
    </div>
    <div class="cookie-banner__actions">
      <button class="btn btn--ghost btn--sm" id="cookie-decline-all">Decline All</button>
      <button class="btn btn--secondary btn--sm" id="cookie-save">Save Preferences</button>
      <button class="btn btn--primary btn--sm" id="cookie-accept-all">Accept All</button>
    </div>
  </div>
</div>
```

**Cookie consent JS behavior** (in `main.js`):
- On load: check `localStorage.gsc_consent`
- If null → show banner after 500ms delay
- "Accept All" → set all true → hide banner
- "Decline All" → set analytics+advertising false → hide banner
- "Save Preferences" → read checkbox states → save → hide banner
- After analytics consent: load Cloudflare Web Analytics script dynamically

### 2.5 — `src/assets/js/main.js`

Functions required (in this order):
1. `initCookieConsent()` — reads localStorage, shows/hides banner, handles button clicks
2. `initNav()` — hamburger toggle, dropdown keyboard nav, aria-expanded
3. `initTOC()` — auto-generates TOC from H2/H3 in `.blog-post__body`, adds IDs to headings, populates `.toc__list`
4. `initSmoothScroll()` — smooth scroll for TOC anchor links
5. `initLazyImages()` — IntersectionObserver for `loading="lazy"` images
6. `initSearch()` — see Phase 15

### 2.6 — Verify Phase 2
- [ ] Nav renders correctly at 375px, 768px, 1280px
- [ ] Hamburger opens/closes mobile menu
- [ ] Footer links all point to correct URLs
- [ ] Cookie banner appears on first load
- [ ] Cookie banner does NOT appear after accepting
- [ ] No console errors

---

## PHASE 3 — Build Script (`src/scripts/build.js`)

**Goal**: The engine that reads JSON + Markdown + templates → outputs `/dist/`.

### 3.1 — build.js Core Logic

```javascript
// Pseudocode — implement in Node.js

const config = require('../build.config.json');
const matter = require('gray-matter');
const { marked } = require('marked');
const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');

async function build() {

  // 1. Clean /dist/
  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist', { recursive: true });

  // 2. Copy /src/assets/ → /dist/assets/
  copyDir('src/assets', 'dist/assets');

  // 3. Generate pages from JSON data (pSEO)
  await buildProductPages();      // reads products.json
  await buildBrandPages();        // reads brands.json
  await buildVenuePages();        // reads venues.json + cities.json
  await buildInstallerPages();    // reads installers.json
  await buildGlossaryPages();     // reads glossary.json
  await buildComparisonPages();   // reads comparisons.json

  // 4. Generate pages from Markdown content
  await buildBlogPosts();         // reads src/content/blog/*.md
  await buildSetupGuides();       // reads src/content/setup/*.md
  await buildLegalPages();        // reads src/content/legal/*.md

  // 5. Generate hub/index pages (with pagination)
  await buildBlogIndex();
  await buildProductCollections();
  await buildVenueIndex();
  await buildGlossaryIndex();

  // 6. Generate pillar pages (from src/content/pillars/*.md)
  await buildPillarPages();

  // 7. Generate static utility pages
  await buildPage('homepage', 'src/templates/homepage.html', 'dist/index.html');
  await buildPage('about', 'src/content/about.md', 'dist/about/index.html');
  await buildPage('contact', 'src/templates/contact.html', 'dist/contact/index.html');
  await buildPage('build-tool', 'src/templates/build.html', 'dist/build/index.html');
  await buildPage('404', 'src/templates/404.html', 'dist/404.html');

  // 8. Generate FR pages
  await buildFrenchPages();

  // 9. Generate XML sitemap
  await generateSitemap();

  // 10. Generate RSS feed
  await generateRSSFeed();

  // 11. Generate robots.txt
  generateRobotsTxt();

  // 12. Generate search index
  await generateSearchIndex();

  console.log('✅ Build complete.');
}

// Helper: inject data into template
function renderTemplate(templatePath, data) {
  let html = fs.readFileSync(templatePath, 'utf8');
  // Replace {{variable}} placeholders with data values
  // Load base.html, inject rendered content into {{page_content}}
  // Inject JSON-LD blocks
  // Inject breadcrumbs
  // Handle partials: {{> nav}}, {{> footer}}, {{> cookie-consent}}
  return html;
}

build();
```

### 3.2 — Template Engine Rules
- Placeholder format: `{{variable_name}}`
- Partial format: `{{> partial-name}}`
- Conditionals: `{{#if condition}}...{{/if}}`
- Loops: `{{#each array}}...{{/each}}`
- Use simple string replacement (no external template engine needed)
- Implement as a thin custom renderer — no Handlebars, no EJS, no Nunjucks

### 3.3 — validate.js (Pre-deploy checks)

Checks to run:
- [ ] No two pages share same `<title>`
- [ ] No page is missing `<meta name="description">`
- [ ] No page is missing `<link rel="canonical">`
- [ ] No page is missing at least one JSON-LD block
- [ ] No internal links point to non-existent pages (crawl `/dist/`)
- [ ] All image `src` paths exist in `/dist/assets/`
- [ ] Sitemap includes all published pages
- [ ] No `status: "draft"` pages appear in `/dist/`
- Report: total pages, errors, warnings

### 3.4 — Verify Phase 3
- [ ] `npm run build` completes with no errors
- [ ] `/dist/` folder created with at least `assets/` subfolder
- [ ] `npm run validate` runs (even if some checks are empty — no crash)

---

## PHASE 4 — Data Files (Seed Data)

**Goal**: Create all JSON data files with real initial content.

### 4.1 — `src/data/products.json`

Initial 10 products (see `04-topical-map.md` product list). Each entry must have ALL fields defined in `10-cms-dev-spec.md §4 pSEO Opportunity 2`. Required products:
1. `foresight-gcquad`
2. `foresight-gc3`
3. `foresight-gc3s`
4. `foresight-gcquadmax` ← new, from Foresight nav
5. `foresight-gchawk`
6. `foresight-falcon`
7. `skytrak-plus`
8. `bushnell-launch-pro`
9. `uneekor-eye-xo2`
10. `full-swing-kit`
11. `forecaddy-smart-cart` ← new, from Foresight nav

### 4.2 — `src/data/brands.json`

Initial 6 brands:
1. `foresight` (Foresight Sports)
2. `skytrak`
3. `bushnell`
4. `uneekor`
5. `full-swing`
6. `trackman`

### 4.3 — `src/data/cities.json`

Initial 12 cities (MVP launch):
1. `toronto` (ON)
2. `ottawa` (ON)
3. `hamilton` (ON)
4. `niagara-falls` (ON)
5. `vancouver` (BC)
6. `victoria` (BC)
7. `canmore` (BC — note: actually AB, check)
8. `calgary` (AB)
9. `edmonton` (AB)
10. `winnipeg` (MB)
11. `montreal` (QC)
12. `halifax` (NS)

Each city entry: slug, city name, province, province_code, venues array (can be empty initially), meta_title, meta_description, intro_paragraph.

### 4.4 — `src/data/venues.json`

Separate from cities — each venue has `city_slug` reference. Can be empty initially.

### 4.5 — `src/data/installers.json`

Province-level entries. Initially empty but file must exist with `[]`.

### 4.6 — `src/data/comparisons.json`

Initial 3 comparisons:
1. `gc3-gcquad`
2. `skytrak-plus-bushnell`
3. `costco` (special — not a product-vs-product)

### 4.7 — `src/data/glossary.json`

Initial 11 Phase 1 terms (from `06c-wiki-glossary.md §4 Phase 1`).

### 4.8 — `src/data/authors.json`

```json
[
  {
    "slug": "editor-in-chief",
    "name": "[REAL NAME — to be filled by owner]",
    "title": "Editor-in-Chief, Golf Sim Canada",
    "bio_short": "[Short bio — to be filled by owner]",
    "bio_full": "[Full bio — to be filled by owner]",
    "photo": "/assets/images/team/editor-in-chief.jpg",
    "linkedin_url": "[LinkedIn URL — to be filled]"
  }
]
```

### 4.9 — Verify Phase 4
- [ ] All JSON files valid (run `node -e "require('./src/data/products.json')"` for each)
- [ ] All required fields present in each product entry
- [ ] No trailing commas in JSON

---

## PHASE 5 — Homepage

**Goal**: Most important page. Brand hub. Entry to all content types.

### 5.1 — `src/templates/homepage.html`

**Sections in order**:

**Section 1: Hero**
- Full-width dark background
- H1: `"Canada's Home for Home Golf"` — display-2xl, Playfair Display, pure white
- Subheading: `"The independent guide to home golf simulators in Canada. Real reviews. Canadian prices. Local installers."` — body-xl, text-secondary
- Two CTAs: `[See Best Simulators →]` (btn-primary) + `[Find a Local Installer]` (btn-ghost)
- Trust bar below CTAs: `"Covering 50+ Canadian cities · 11 brands reviewed · Updated July 2025"`
- Background: dark gradient with subtle golf ball trajectory arc (CSS, not image)

**Section 2: Top Editorial Picks (Product Cards)**
- H2: `"Top-Rated Home Golf Simulators in Canada"`
- 3-column product card grid (top 3 from products.json by rating)
- "View all simulators →" link to `/best-home-simulators/`

**Section 3: Find a Sim Near You (Directory Entry)**
- H2: `"Find Indoor Golf in Your City"`
- Province quick-links: `[Ontario] [BC] [Alberta] [Manitoba] [Quebec]`
- Below: city pill links (top 6 cities)
- CTA: `"Browse all Canadian cities →"` → `/venues/`

**Section 4: How We're Different (Trust Section)**
- H2: `"Why Canadian Golfers Trust Golf Sim Canada"`
- 3 columns:
  - `🍁 Canada-Specific` — CAD prices, authorized dealers, province info
  - `✎ Independent Editorial` — not affiliated with any brand
  - `✓ Verified Data` — last-verified dates on all listings
- Editor-in-chief photo + name + quote

**Section 5: Latest from the Blog**
- H2: `"From the Golf Sim Canada Blog"`
- 3 article cards (latest 3 published posts)
- `"Read all guides →"` → `/blog/`

**Section 6: Build Your Simulator (Tool Teaser)**
- H2: `"Not Sure Where to Start?"`
- Copy: "Tell us your room size and budget. We'll spec out the right setup."
- CTA: `[Use Our Simulator Room Builder →]` → `/build/`
- Background: slightly different dark surface color

**Section 7: Get Installer Quotes (Lead Gen)**
- H2: `"Get Free Quotes from Verified Canadian Installers"`
- Inline mini-form (3 fields only — province, budget, space type)
- Full form on `/contact/`
- CASL checkbox: "I consent to be contacted by verified golf simulator installers in my area"
- Submit → `/contact/?submitted=true` (or Cloudflare form handling)

### 5.2 — Homepage Schema (JSON-LD)

```json
[
  { "@type": "WebSite", "name": "Golf Sim Canada", "url": "https://golfsimcanada.site", 
    "potentialAction": { "@type": "SearchAction", "target": "https://golfsimcanada.site/search/?q={search_term_string}" } },
  { "@type": "Organization", "name": "Golf Sim Canada", "url": "https://golfsimcanada.site",
    "logo": "https://golfsimcanada.site/assets/images/logo/logo.png",
    "description": "Canada's independent home golf simulator guide, directory, and marketplace." }
]
```

### 5.3 — Verify Phase 5
- [ ] Homepage renders at all breakpoints (375px, 768px, 1280px)
- [ ] All 7 sections visible and styled correctly
- [ ] All CTA links point to correct URLs
- [ ] Lead gen form visible (styled, not functional yet)
- [ ] Schema validates in Google Rich Results Test

---

## PHASE 6 — Product Pages

**Goal**: Ecom-style product catalog — most important commercial pages.

### 6.1 — Build product-single template

Implement `src/templates/product-single.html` exactly per `11-page-templates.md §Template 2`.

### 6.2 — Build product-collection template

Implement `src/templates/product-collection.html` exactly per `11-page-templates.md §Template 3`.

Includes:
- Filter buttons (Best For tags) — JS filtering, no page reload
- Sort dropdown — JS sorting by rating and price
- Pagination (12 per page)
- Item count display

### 6.3 — Build script generates:
- `/dist/products/index.html` — main products hub (links to all categories)
- `/dist/products/launch-monitors/index.html` — paginated collection
- `/dist/products/packages/index.html`
- `/dist/products/enclosures/index.html`
- `/dist/products/projectors/index.html`
- `/dist/products/mats/index.html`
- `/dist/products/software/index.html`
- `/dist/products/accessories/index.html`
- `/dist/products/[slug]/index.html` — one per product in products.json

### 6.4 — Product Card JS (in components.css + main.js)
- Filter: `data-best-for` attribute matching → show/hide cards
- Sort: rebuild grid order by rating or price field
- No page reload — client-side only

### 6.5 — Verify Phase 6
- [ ] 11 product pages generated in `/dist/products/`
- [ ] All collection pages have filter + sort working
- [ ] Pagination renders (even if only 1 page)
- [ ] Product schema validates for each product
- [ ] "Find a Canadian Dealer" section present on all products
- [ ] Price shows "Verified [date]" disclaimer

---

## PHASE 7 — Brand Pages

### 7.1 — `src/templates/brand-single.html`
- Brand logo, name, editorial summary
- Products by this brand (cards pulled from products.json filtered by brand_slug)
- Canada presence info
- Authorized dealers list

### 7.2 — Build generates:
- `/dist/brands/index.html` — all brands hub
- `/dist/brands/[slug]/index.html` — one per brand

### 7.3 — Verify Phase 7
- [ ] 6 brand pages generated
- [ ] Products filtered correctly per brand
- [ ] Organization schema present

---

## PHASE 8 — Comparison Pages (`/vs/`)

### 8.1 — `src/templates/compare-single.html`
- TL;DR verdict at top (winner + context)
- Side-by-side spec table (pulls from products.json for both products)
- Full editorial breakdown
- "Which is right for you?" decision matrix
- Both product mini-cards with links

### 8.2 — Special: `/vs/costco/`
Not a product-vs-product. Structure:
- What Costco actually sells (golf sim adjacent products)
- What you miss buying from Costco (no installer, no warranty support, limited brands)
- What you should do instead (authorized dealers + installer lead gen)

### 8.3 — Build generates:
- `/dist/vs/index.html`
- `/dist/vs/[slug]/index.html`

---

## PHASE 9 — Setup Guides (`/setup/`)

### 9.1 — `src/templates/setup-guide.html`
Uses HowTo schema. Structure:
- Requirements overview (specs, ceiling height, etc.)
- Step-by-step (numbered, each step self-contained)
- Component recommendations (product mini-cards)
- Canadian notes
- FAQ block

### 9.2 — Markdown files to create (in `/src/content/setup/`):
1. `installation.md` → `/setup/installation/`
2. `diy.md` → `/setup/diy/`
3. `garage.md` → `/setup/garage/`
4. `basement.md` → `/setup/basement/`
5. `shed.md` → `/setup/shed/`
6. `room-size.md` → `/setup/room-size/`
7. `cost.md` → `/setup/cost/`
8. `launch-monitors.md` → `/setup/launch-monitors/`
9. `impact-screens.md` → `/setup/impact-screens/`
10. `enclosures.md` → `/setup/enclosures/`
11. `projectors.md` → `/setup/projectors/`
12. `mats.md` → `/setup/mats/`
13. `flooring.md` → `/setup/flooring/`
14. `software.md` → `/setup/software/`

---

## PHASE 10 — Pillar Pages

### 10.1 — Create as Markdown in `src/content/pillars/`:

1. `best-home-simulators.md` → `/best-home-simulators/`
   - KW: "best golf simulator canada" (40.5K)
   - Schema: Article + ItemList + FAQPage
   - Must include: AEO paragraph (40-60 words), embedded top 5 product cards, FAQ (min 5)

2. `cost.md` → `/cost/`
   - KW: "golf simulator cost canada" (590)
   - Schema: Article + FAQPage
   - Must include: price tier table (entry/mid/pro in CAD), cost calculator CTA

3. `packages.md` → `/packages/`
   - KW: "golf simulator packages canada" (210)

4. `indoor-golf.md` → `/indoor-golf/`
   - KW: "indoor golf canada"
   - Doubles as directory entry — links to `/venues/` hub

### 10.2 — Pillar Page Template (`src/templates/pillar.html`)
- Hero with direct answer paragraph (AEO block, styled distinctively)
- Auto-generated TOC
- Body content
- Embedded product cards (mid-article)
- FAQ block
- Lead gen CTA (inline, not popup)
- Related guides (3 article cards)

---

## PHASE 11 — Local Directory

### 11.1 — Templates:
- `venue-index.html` → `/venues/` — all provinces hub
- `venue-province.html` → `/venues/[province]/` — province listing
- `venue-city.html` → `/venues/[city]/` — per-city (see `11-page-templates.md §Template 4`)
- `installer-index.html` → `/installers/` — hub
- `installer-province.html` → `/installers/[province]/` — province listing

### 11.2 — Build generates (from cities.json):
- `/dist/venues/index.html`
- `/dist/venues/ontario/index.html`, `/dist/venues/bc/index.html`, etc.
- `/dist/venues/toronto/index.html` etc. (FLAT city URLs)
- `/dist/installers/index.html`
- `/dist/installers/ontario/index.html` etc.

### 11.3 — Key: City Pages Have Home Sim CTA
Every city page bottom section links naturally to `/best-home-simulators/` and `/installers/[province]/`.

---

## PHASE 12 — Glossary / Wiki

### 12.1 — Templates:
- `glossary-index.html` → `/glossary/` — A–Z paginated hub
- `glossary-term.html` → `/glossary/[slug]/` (see `11-page-templates.md §Template 5`)

### 12.2 — Build generates 11 Phase 1 terms + hub page

### 12.3 — DefinedTerm schema on every term page

---

## PHASE 13 — Blog System

### 13.1 — Template: `src/templates/blog-post.html`
Implement exactly per `11-page-templates.md §Template 1`.
All 7 sections: breadcrumb, header (byline + last-verified), TL;DR, TOC, body, related products, author box, related posts, FAQ.

### 13.2 — Template: `src/templates/blog-index.html`
- Article card grid (10 per page)
- Pagination with rel=prev/next
- Page 1 URL = `/blog/` (NOT `/blog/page/1/` — redirect if accessed)

### 13.3 — Initial Blog Posts (3 minimum — create as Markdown):
1. `smash-factor.md` → `/blog/smash-factor/` (320 vol, SD 20)
2. `canadian-winter-golf.md` → `/blog/canadian-winter-golf/` (seasonal pillar)
3. `financing.md` → `/blog/financing/` (~0 vol, SD 4 — quick win)

---

## PHASE 14 — French Quebec (`/fr/`)

### 14.1 — FR pages (minimum MVP):
1. `/fr/index.html` — FR homepage (simplified)
2. `/fr/simulateur/index.html` — FR Pillar (880 vol, SD 12 — PRIORITY)
3. `/fr/meilleur-simulateur/index.html`
4. `/fr/venues/montreal/index.html`

### 14.2 — Implementation:
- Separate Markdown files in `src/content/fr/`
- Uses same base.html but with `lang="fr-CA"`
- `hreflang` tags on both EN and FR versions
- FR nav = simplified (not full EN nav)

---

## PHASE 15 — Legal Pages

### 15.1 — Create as Markdown in `src/content/legal/`:
All 6 pages. **Important**: legal content must be reviewed before publish (per `12-guardrails.md §5`).

| File | URL | robots |
|---|---|---|
| `privacy.md` | `/legal/privacy/` | `noindex, follow` |
| `terms.md` | `/legal/terms/` | `noindex, follow` |
| `disclaimer.md` | `/legal/disclaimer/` | `noindex, follow` |
| `cookies.md` | `/legal/cookies/` | `noindex, follow` |
| `accessibility.md` | `/legal/accessibility/` | `index, follow` |
| `editorial.md` | `/legal/editorial/` | `index, follow` |

---

## PHASE 16 — Utility Pages

### 16.1 — `/contact/` + Lead Form
**Fields**:
```
Name (text, required)
Email (email, required)
Province (select, required) — all Canadian provinces
City (text, optional)
Budget Range (select):
  - Under $3,000 CAD
  - $3,000–$8,000 CAD
  - $8,000–$20,000 CAD
  - $20,000+ CAD
Space Type (select): Garage / Basement / Dedicated Room / Shed / Other
Timeline (select): ASAP / 1–3 months / 3–6 months / Just researching
Message (textarea, optional)
CASL Consent (checkbox, unchecked by default, required):
  "I consent to be contacted by verified Canadian golf simulator installers regarding my inquiry."
```
**Submission**: Cloudflare Forms (native) or static form to email. On success → show thank you message (no redirect — prevents resubmission). No action until `status: "published"` in deployment.

### 16.2 — `/build/` — Simulator Room Builder Tool
**Purpose**: Interactive lead magnet — inputs room dimensions → outputs recommended spec.

**Step 1**: "What type of space?" → Radio buttons: Garage / Basement / Dedicated Room / Shed / Outdoor Covered

**Step 2**: "What are your room dimensions?" → Width (ft), Length (ft), Ceiling Height (ft) — inputs with Canadian home avg shown as hint

**Step 3**: "What's your budget?" → Slider or select: $1,500 / $3,000 / $5,000 / $10,000 / $20,000 / $30,000+ CAD

**Step 4**: "How serious a golfer?" → Casual / Improving / Competitive / Professional

**Output** (generated client-side from lookup table):
- Recommended launch monitor category (with link to `/products/launch-monitors/`)
- Recommended enclosure type
- Ceiling height note (ok / tight / too low)
- Estimated total budget range in CAD
- CTA: "Get a free quote from a verified installer in [province]" → pre-fills `/contact/` form

**Implementation**: Pure JS, no server. Lookup table in `build-config.js`.

### 16.3 — `/about/`
Sections:
- Editor-in-chief full bio + photo
- "Our editorial process" (how we test and review)
- "Our independence" (no brand affiliation)
- "How we make money" (transparent monetization disclosure)
- Contact link

### 16.4 — `/list-venue/` + `/list-business/`
Simple forms. Fields: business name, address, province, contact email, website, notes.
Submission: same as contact form.

### 16.5 — `404.html`
```
H1: "Looks like this shot went out of bounds."
Subtext: "The page you're looking for doesn't exist or has moved."
CTA buttons: [← Back to Home] [Browse Simulators] [Find a Venue]
```
No nav/footer clutter. Clean, on-brand. Brief, dry humour per brand voice.

---

## PHASE 17 — Technical SEO Files

### 17.1 — Sitemap Generation (in build.js)
- Auto-generated from all pages with `status: "published"`
- Excludes: legal pages (privacy, terms, disclaimer, cookies), 404
- Includes: `<lastmod>`, `<changefreq>`, `<priority>`
- Bilingual pages: include `<xhtml:link>` hreflang entries
- Output: `/dist/sitemap.xml`

### 17.2 — `robots.txt` (generated by build.js)
```
User-agent: *
Allow: /
Disallow: /legal/privacy/
Disallow: /legal/terms/
Disallow: /legal/disclaimer/
Disallow: /legal/cookies/
Sitemap: https://golfsimcanada.site/sitemap.xml
```

### 17.3 — RSS Feed (`/blog/feed.xml`)
- Last 20 published blog posts
- Standard RSS 2.0 format
- Auto-generated by build.js

### 17.4 — Search Index (`/assets/js/search-index.json`)
- Generated by build.js
- Contains: all page titles, URLs, meta descriptions, primary keywords
- Used by client-side `search.js`

### 17.5 — `_redirects` (Cloudflare Pages)
Exactly as specified in `03-site-architecture.md §Redirect Map`.
Plus: `/blog/page/1/ /blog/ 301`

### 17.6 — `_headers` (Cloudflare Pages)
Exactly as specified in `10-cms-dev-spec.md §Enterprise-Grade Technical Checklist §Security Headers`.

---

## PHASE 18 — Cloudflare Deploy

### 18.1 — Cloudflare Pages Config
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (project root)
- Node version: 18

### 18.2 — Validate Before First Deploy
- [ ] `npm run build` clean (zero errors)
- [ ] `npm run validate` passes all checks
- [ ] Google Rich Results Test — test homepage, 1 product page, 1 article
- [ ] PageSpeed Insights — run on homepage URL after first deploy
- [ ] GSC property verified
- [ ] sitemap.xml submitted to GSC
- [ ] Check `/robots.txt` is accessible
- [ ] Check `_redirects` working: `/vs/costco/` resolves correctly
- [ ] Check all 404 handling (bad URL → custom 404 page)
- [ ] Check cookie consent on fresh browser (incognito)
- [ ] Mobile test: Chrome DevTools 375px + real phone

### 18.3 — Post-Deploy GSC Checks (48 hours after)
- [ ] No Coverage errors
- [ ] No manual actions
- [ ] Sitemap shows all pages submitted = indexed
- [ ] No mixed content warnings
- [ ] Core Web Vitals report loading

---

## Build Sequence Summary

| Phase | What | Dependency |
|---|---|---|
| 0 | Project scaffold + config | None |
| 1 | CSS design system | Phase 0 |
| 2 | Base template + nav + footer + cookie consent | Phase 1 |
| 3 | Build script engine | Phase 0, 1, 2 |
| 4 | All JSON data files (seed data) | Phase 0 |
| 5 | Homepage | Phase 2, 3, 4 |
| 6 | Product pages | Phase 3, 4 |
| 7 | Brand pages | Phase 3, 4 |
| 8 | Comparison pages | Phase 3, 4, 6 |
| 9 | Setup guides | Phase 3 |
| 10 | Pillar pages | Phase 3, 6 |
| 11 | Local directory | Phase 3, 4 |
| 12 | Glossary/Wiki | Phase 3, 4 |
| 13 | Blog system | Phase 3 |
| 14 | French Quebec | Phase 3, 10 |
| 15 | Legal pages | Phase 3 |
| 16 | Utility pages (/build/, /contact/, /about/) | Phase 3 |
| 17 | Technical SEO (sitemap, robots, RSS, search index) | Phase 3, all pages |
| 18 | Cloudflare deploy + validation | All phases |
