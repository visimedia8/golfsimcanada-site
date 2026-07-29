# GolfSimCanada.site — Page Templates Specification

> **File**: `11-page-templates.md`  
> **Lead**: Dev + SEO + UI/UX  
> **Purpose**: Exact HTML structure spec for every template. Build.js reads these. Zero ambiguity for implementation.

---

## Template Engine — CONFIRMED CHOICE

**Engine**: Node.js with `handlebars` npm package (v4+)  
**Why**: Native `{{#each}}`, `{{#if}}`, `{{> partial}}` support. No custom regex. Matches syntax already used in this file.  
**npm install**: `npm install handlebars marked gray-matter fast-glob sharp`  
**Partials registered**: `nav`, `footer`, `cookie-consent`, `product-card`, `product-card-mini`, `article-card`, `faq-block`  
**Helpers registered**: `readingTime`, `formatDate`, `starRating`, `truncate`, `eq`

---

## Template 1: Blog Post (`blog-post.html`)

### Required Frontmatter (in `.md` file)
```yaml
---
title: "Best Golf Simulators for Canadian Winters — 2025 Guide"
slug: "best-golf-simulators-canadian-winter"
date_published: "2025-07-15"
date_modified: "2025-07-29"
author: "editor-in-chief"           # maps to authors.json
category: "buying-guides"           # buying-guides | setup | technique | canadian-golf | business
primary_keyword: "best golf simulator canadian winter"
meta_title: "Best Golf Simulators for Canadian Winter 2025 | Golf Sim Canada"
meta_description: "Playing golf through a Canadian winter starts with the right home simulator. We tested 8 setups in real Canadian conditions — here's what works."
og_image: "/assets/images/blog/best-golf-sim-winter-canada.jpg"
schema_type: "Article"              # Article | HowTo | FAQPage
related_products:                   # slugs from products.json
  - "foresight-gcquad"
  - "skytrak-plus"
related_posts:                      # slugs from other .md files
  - "golf-simulator-garage-canada"
  - "golf-simulator-cost-canada"
status: "published"                 # published | draft | archived
word_count_target: 1800
---
```

### HTML Structure
```html
<!-- blog-post.html -->
<article class="blog-post" itemscope itemtype="https://schema.org/Article">

  <!-- Breadcrumb -->
  <nav class="breadcrumb" aria-label="breadcrumb">
    <a href="/">Home</a> › <a href="/blog/">Blog</a> › <span>{{title}}</span>
  </nav>

  <!-- Header -->
  <header class="blog-post__header">
    <div class="blog-post__meta">
      <span class="badge badge--category">{{category_label}}</span>
      <span class="reading-time">{{reading_time}} min read</span>
    </div>
    <h1 class="blog-post__title" itemprop="headline">{{title}}</h1>
    <div class="blog-post__byline">
      <img src="{{author.photo}}" alt="{{author.name}}" width="40" height="40" class="author-avatar">
      <div>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">{{author.name}}</span>
        </span>
        <time datetime="{{date_published}}" itemprop="datePublished">{{date_published_formatted}}</time>
        <span class="trust-verified">✓ Last Verified: {{date_modified_formatted}}</span>
      </div>
    </div>
    <img src="{{og_image}}" alt="{{title}}" width="1200" height="630"
         fetchpriority="high" class="blog-post__hero">
  </header>

  <!-- TL;DR -->
  <aside class="tldr-box">
    <h2 class="tldr-box__heading">TL;DR</h2>
    <div class="tldr-box__content">{{tldr}}</div>
  </aside>

  <!-- TOC — auto-generated from H2/H3 in content -->
  <nav class="toc" aria-label="Table of contents">
    <h2 class="toc__heading">In This Guide</h2>
    <ol class="toc__list">
      {{#each toc_items}}
      <li class="toc__item toc__item--{{level}}">
        <a href="#{{anchor}}">{{text}}</a>
      </li>
      {{/each}}
    </ol>
  </nav>

  <!-- Body Content -->
  <div class="blog-post__body prose" itemprop="articleBody">
    {{content_html}}
  </div>

  <!-- Related Products (if any) -->
  {{#if related_products}}
  <section class="related-products">
    <h2 class="related-products__heading">Products Mentioned in This Guide</h2>
    <div class="product-card-grid product-card-grid--compact">
      {{#each related_products}}
      {{> product-card-mini}}
      {{/each}}
    </div>
  </section>
  {{/if}}

  <!-- Author Box -->
  <aside class="author-box">
    <img src="{{author.photo}}" alt="{{author.name}}" width="80" height="80">
    <div>
      <h3>{{author.name}}</h3>
      <p class="author-box__title">{{author.title}}</p>
      <p class="author-box__bio">{{author.bio_short}}</p>
    </div>
  </aside>

  <!-- Related Posts -->
  {{#if related_posts}}
  <section class="related-posts">
    <h2 class="related-posts__heading">Related Guides</h2>
    <div class="article-card-grid article-card-grid--3col">
      {{#each related_posts}}
      {{> article-card}}
      {{/each}}
    </div>
  </section>
  {{/if}}

  <!-- FAQ Schema Block -->
  {{#if faq_items}}
  <section class="faq-block" itemscope itemtype="https://schema.org/FAQPage">
    <h2>Frequently Asked Questions</h2>
    {{#each faq_items}}
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">{{question}}</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">{{answer}}</p>
      </div>
    </div>
    {{/each}}
  </section>
  {{/if}}

</article>

<!-- JSON-LD injected by build script -->
<script type="application/ld+json">{{article_schema_json}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
{{#if faq_items}}<script type="application/ld+json">{{faq_schema_json}}</script>{{/if}}
```

---

## Template 2: Product Single Page (`product-single.html`)

### Structure
```html
<main class="product-single">

  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/products/">Products</a> ›
    <a href="/products/{{category}}/">{{category_label}}</a> › <span>{{name}}</span>
  </nav>

  <!-- Hero Section -->
  <section class="product-hero">
    <div class="product-hero__gallery">
      <img src="{{hero_image}}" alt="{{name}}" width="600" height="450" fetchpriority="high">
    </div>
    <div class="product-hero__info">
      {{#if badge}}<span class="badge badge--{{badge_class}}">{{badge_label}}</span>{{/if}}
      <p class="product-brand"><a href="/brands/{{brand_slug}}/">{{brand_name}}</a></p>
      <h1 class="product-title">{{name}}</h1>

      <!-- Star Rating -->
      <div class="product-rating" itemprop="aggregateRating"
           itemscope itemtype="https://schema.org/AggregateRating">
        <span class="stars">{{star_html}}</span>
        <span itemprop="ratingValue">{{rating}}</span>/10
        <span class="rating-count">(<span itemprop="reviewCount">{{review_count}}</span> reviews)</span>
      </div>

      <!-- Price -->
      <div class="product-price">
        <span class="price-amount">{{price_range_cad}}</span>
        <span class="price-currency">CAD</span>
        <span class="price-verified">Verified {{price_verified_formatted}}</span>
      </div>

      <!-- Best For Tags -->
      <div class="best-for-tags">
        <span class="best-for-label">Best For:</span>
        {{#each best_for_tags}}
        <span class="tag">{{label}}</span>
        {{/each}}
      </div>

      <!-- Primary CTA -->
      <a href="#where-to-buy" class="btn btn--primary btn--lg">Find a Canadian Dealer →</a>
      <a href="/find/installers/" class="btn btn--ghost">Get Installation Quotes</a>
    </div>
  </section>

  <!-- Key Specs Table -->
  <section class="product-specs">
    <h2>Key Specifications</h2>
    <table class="specs-table">
      <tbody>
        {{#each specs}}
        <tr>
          <th scope="row">{{label}}</th>
          <td>{{value}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </section>

  <!-- Editorial Review -->
  <section class="product-review">
    <h2>Golf Sim Canada Review</h2>
    <div class="prose">{{review_html}}</div>

    <div class="pros-cons">
      <div class="pros">
        <h3>✓ Pros</h3>
        <ul>{{#each pros}}<li>{{this}}</li>{{/each}}</ul>
      </div>
      <div class="cons">
        <h3>✗ Cons</h3>
        <ul>{{#each cons}}<li>{{this}}</li>{{/each}}</ul>
      </div>
    </div>
  </section>

  <!-- Canada-Specific Notes -->
  <section class="canada-notes">
    <h2>Buying in Canada — What You Need to Know</h2>
    <div class="prose">{{canada_notes_html}}</div>
  </section>

  <!-- Where to Buy -->
  <section class="where-to-buy" id="where-to-buy">
    <h2>Authorized Canadian Dealers</h2>
    {{#each dealers}}
    <div class="dealer-card">
      <div class="dealer-info">
        <span class="dealer-name">{{name}}</span>
        <span class="dealer-provinces">{{provinces_formatted}}</span>
      </div>
      <a href="{{url}}" class="btn btn--secondary btn--sm" rel="noopener noreferrer" target="_blank">
        Visit Dealer →
      </a>
    </div>
    {{/each}}
    <p class="dealer-note">Or <a href="/find/installers/">find a local installer</a> in your province.</p>
  </section>

  <!-- Related Products -->
  <section class="related-products">
    <h2>Compare Similar Products</h2>
    <div class="product-card-grid product-card-grid--3col">
      {{#each related_products}}{{> product-card}}{{/each}}
    </div>
  </section>

</main>

<script type="application/ld+json">{{product_schema_json}}</script>
<script type="application/ld+json">{{review_schema_json}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 3: Product Collection Page (`product-collection.html`)

### Structure
```html
<main class="collection-page">

  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/products/">Products</a> › <span>{{category_label}}</span>
  </nav>

  <!-- Collection Header -->
  <header class="collection-header">
    <h1>{{collection_title}}</h1>
    <p class="collection-description">{{collection_description}}</p>
    <span class="collection-count">{{total_count}} products</span>
  </header>

  <!-- Filter + Sort Bar -->
  <div class="collection-controls">
    <div class="filters" role="group" aria-label="Filter products">
      <button class="filter-btn filter-btn--active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="beginner">Beginner</button>
      <button class="filter-btn" data-filter="serious">Serious Golfer</button>
      <button class="filter-btn" data-filter="commercial">Commercial</button>
    </div>
    <select class="sort-select" aria-label="Sort products">
      <option value="rating-desc">Top Rated</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  </div>

  <!-- Product Grid -->
  <div class="product-grid" role="list">
    {{#each products}}
    <article class="product-card" role="listitem"
             data-category="{{category}}" data-best-for="{{best_for_joined}}">
      <div class="product-card__image-wrap">
        <img src="{{hero_image}}" alt="{{name}}" width="400" height="300" loading="lazy">
        {{#if badge}}<span class="badge badge--{{badge_class}}">{{badge_label}}</span>{{/if}}
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">{{brand_name}}</p>
        <h2 class="product-card__title">
          <a href="/products/{{slug}}/">{{name}}</a>
        </h2>
        <div class="product-card__rating">
          {{star_html}} {{rating}}/10
        </div>
        <p class="product-card__price">
          <span class="price-amount">{{price_range_cad}}</span> CAD
        </p>
        <div class="product-card__tags">
          {{#each best_for_tags}}<span class="tag tag--sm">{{label}}</span>{{/each}}
        </div>
      </div>
      <div class="product-card__footer">
        <a href="/products/{{slug}}/" class="btn btn--secondary btn--sm">View Review</a>
        <a href="/find/installers/" class="btn btn--ghost btn--sm">Get Quotes</a>
      </div>
    </article>
    {{/each}}
  </div>

  <!-- Pagination -->
  {{#if has_pagination}}
  <nav class="pagination" aria-label="Products pagination">
    {{#if prev_page}}<a href="{{prev_page_url}}" class="pagination__btn" rel="prev">← Previous</a>{{/if}}
    <span class="pagination__info">Page {{current_page}} of {{total_pages}}</span>
    {{#if next_page}}<a href="{{next_page_url}}" class="pagination__btn" rel="next">Next →</a>{{/if}}
  </nav>
  {{/if}}

</main>

<script type="application/ld+json">{{itemlist_schema_json}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 4: Venue City Page (`venue-city.html`)

### Structure
```html
<main class="venue-city-page">

  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/venues/">Indoor Golf</a> ›
    <a href="/venues/{{province_slug}}/">{{province}}</a> › <span>{{city}}</span>
  </nav>

  <!-- City Header -->
  <header class="venue-city-header">
    <h1>Indoor Golf in {{city}}, {{province}} — Simulator Venues Near You</h1>
    <p class="lead">{{intro_paragraph}}</p>
    <div class="city-meta">
      <span>{{venue_count}} venues listed</span>
      <span class="trust-verified">✓ Last verified {{last_verified}}</span>
    </div>
  </header>

  <!-- Venue List -->
  <section class="venue-list">
    {{#each venues}}
    <article class="venue-card {{#if featured}}venue-card--featured{{/if}}">
      {{#if featured}}<span class="badge badge--featured">Featured</span>{{/if}}
      {{#if is_24_7}}<span class="badge badge--info">24/7</span>{{/if}}

      <div class="venue-card__body">
        <h2 class="venue-card__name">{{name}}</h2>
        <p class="venue-card__address">{{address}}</p>
        <div class="venue-card__details">
          <span class="venue-detail">🕐 {{hours}}</span>
          <span class="venue-detail">💰 From ${{price_per_hour}} CAD/hr</span>
          <span class="venue-detail">🎯 {{brands_formatted}}</span>
        </div>
        {{#if amenities}}
        <div class="venue-amenities">
          {{#each amenities}}<span class="tag tag--sm">{{this}}</span>{{/each}}
        </div>
        {{/if}}
      </div>

      <div class="venue-card__footer">
        {{#if booking_url}}
        <a href="{{booking_url}}" class="btn btn--primary btn--sm" rel="noopener" target="_blank">
          Book Now →
        </a>
        {{/if}}
        <a href="https://maps.google.com/?q={{address_encoded}}" class="btn btn--ghost btn--sm"
           rel="noopener" target="_blank">Get Directions</a>
      </div>
    </article>
    {{/each}}
  </section>

  <!-- Separator + Home Sim CTA -->
  <aside class="city-home-cta">
    <h2>Prefer Your Own Setup?</h2>
    <p>Many {{city}} golfers we've talked to started with drop-in venues, then invested in a
       <a href="/best-home-simulators/">home golf simulator</a> once they found their preferred setup.
       If you're at that stage, <a href="/find/installers/{{province_slug}}/">local installers in {{province}}</a>
       can spec out a build for your space.</p>
  </aside>

  <!-- FAQ -->
  {{> faq-block faq_items}}

</main>

<script type="application/ld+json">{{localbusiness_itemlist_schema}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 5: Glossary Term Page (`glossary-term.html`)

### Structure
```html
<main class="glossary-term-page">

  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/glossary/">Glossary</a> › <span>{{term}}</span>
  </nav>

  <article itemscope itemtype="https://schema.org/DefinedTerm">

    <header>
      <span class="breadcrumb-label">Golf Simulator Glossary</span>
      <h1 itemprop="name">{{term}}</h1>
      <!-- AEO block — 40-60 words, direct definition -->
      <p class="definition-lead" itemprop="description">{{short_definition}}</p>
    </header>

    <div class="prose" itemprop="description">
      {{full_content_html}}
    </div>

    <!-- Related Terms -->
    <aside class="related-terms">
      <h2>Related Terms</h2>
      <div class="related-terms__grid">
        {{#each related_terms}}
        <a href="/glossary/{{slug}}/" class="related-term-card">{{term}}</a>
        {{/each}}
      </div>
    </aside>

    <!-- Money Page CTA — natural prose, not a button box -->
    <p class="glossary-cta">{{money_page_cta_text}}</p>

  </article>

  <script type="application/ld+json">{{defined_term_schema}}</script>
  <script type="application/ld+json">{{breadcrumb_schema_json}}</script>
</main>
```

---

## Component: Product Card Mini (Partial `product-card-mini.html`)

Used in: blog posts, venue pages, glossary terms.

```html
<div class="product-card-mini">
  <img src="{{hero_image}}" alt="{{name}}" width="80" height="60" loading="lazy">
  <div class="product-card-mini__info">
    <span class="product-card-mini__brand">{{brand_name}}</span>
    <a href="/products/{{slug}}/" class="product-card-mini__name">{{name}}</a>
    <span class="product-card-mini__price">{{price_range_cad}} CAD</span>
  </div>
  <a href="/products/{{slug}}/" class="btn btn--ghost btn--xs">View →</a>
</div>
```

---

## Schema JSON-LD — Build Script Generates These

### Article Schema (blog post)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "author": {
    "@type": "Person",
    "name": "{{author.name}}",
    "jobTitle": "{{author.title}}",
    "sameAs": "{{author.linkedin_url}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Golf Sim Canada",
    "logo": {
      "@type": "ImageObject",
      "url": "https://golfsimcanada.site/assets/images/logo/logo.png"
    }
  },
  "datePublished": "{{date_published}}",
  "dateModified": "{{date_modified}}",
  "image": "{{og_image_url}}",
  "url": "https://golfsimcanada.site/blog/{{slug}}/",
  "inLanguage": "en-CA"
}
```

### Product Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{name}}",
  "brand": { "@type": "Brand", "name": "{{brand_name}}" },
  "image": "{{hero_image_url}}",
  "description": "{{meta_description}}",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "CAD",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "CAD",
      "minPrice": "{{price_min}}",
      "maxPrice": "{{price_max}}"
    },
    "areaServed": "CA",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{rating}}",
    "bestRating": "10",
    "reviewCount": "{{review_count}}"
  }
}
```

### Breadcrumb Schema (universal)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://golfsimcanada.site/" },
    { "@type": "ListItem", "position": 2, "name": "{{level2_name}}", "item": "{{level2_url}}" },
    { "@type": "ListItem", "position": 3, "name": "{{level3_name}}", "item": "{{level3_url}}" }
  ]
}
```

---

## Template 6: Comparison Page (`compare-single.html` → `/vs/[slug]/`)

```html
<main class="compare-page">
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/vs/">Compare</a> › <span>{{product_a_name}} vs {{product_b_name}}</span>
  </nav>

  <header class="compare-header">
    <h1>{{product_a_name}} vs {{product_b_name}} — Canada Comparison {{year}}</h1>
    <p class="compare-verdict-lead">{{tldr_verdict}}</p>
    <span class="trust-verified">✓ Last Verified: {{date_modified_formatted}}</span>
  </header>

  <!-- Winner Banner -->
  <div class="compare-winner-banner">
    <span class="compare-winner-label">Our Pick for Most Canadians</span>
    <strong>{{verdict_winner_name}}</strong>
    <span class="compare-winner-context">{{verdict_context}}</span>
  </div>

  <!-- Side-by-Side Product Cards -->
  <section class="compare-products">
    <div class="compare-products__grid">
      <div class="compare-product {{#if is_winner_a}}compare-product--winner{{/if}}">
        {{> product-card-mini product_a}}
        <a href="/products/{{product_a_slug}}/" class="btn btn--secondary btn--sm">Full Review →</a>
      </div>
      <div class="compare-divider">VS</div>
      <div class="compare-product {{#if is_winner_b}}compare-product--winner{{/if}}">
        {{> product-card-mini product_b}}
        <a href="/products/{{product_b_slug}}/" class="btn btn--secondary btn--sm">Full Review →</a>
      </div>
    </div>
  </section>

  <!-- Spec Comparison Table -->
  <section class="compare-specs">
    <h2>Spec Comparison</h2>
    <table class="specs-table specs-table--compare">
      <thead>
        <tr>
          <th>Specification</th>
          <th>{{product_a_name}}</th>
          <th>{{product_b_name}}</th>
        </tr>
      </thead>
      <tbody>
        {{#each spec_rows}}
        <tr class="{{#if winner}}spec-row--winner-{{winner}}{{/if}}">
          <td>{{label}}</td>
          <td>{{value_a}}</td>
          <td>{{value_b}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </section>

  <!-- Editorial Breakdown -->
  <section class="compare-editorial prose">
    <h2>The Full Breakdown</h2>
    {{editorial_html}}
  </section>

  <!-- Decision Matrix -->
  <section class="compare-decision">
    <h2>Which One Is Right for You?</h2>
    <div class="decision-grid">
      <div class="decision-card">
        <h3>Choose {{product_a_name}} if…</h3>
        <ul>{{#each choose_a}}<li>{{this}}</li>{{/each}}</ul>
      </div>
      <div class="decision-card decision-card--winner">
        <h3>Choose {{product_b_name}} if…</h3>
        <ul>{{#each choose_b}}<li>{{this}}</li>{{/each}}</ul>
      </div>
    </div>
  </section>

  <!-- Canada Notes -->
  <section class="compare-canada prose">
    <h2>Buying Either in Canada — What to Know</h2>
    {{canada_notes_html}}
  </section>

  {{> faq-block faq_items}}
</main>

<script type="application/ld+json">{{review_schema_json}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 7: Pillar Page (`pillar.html`)

```html
<main class="pillar-page">
  <nav class="breadcrumb">
    <a href="/">Home</a> › <span>{{title}}</span>
  </nav>

  <header class="pillar-header">
    <div class="pillar-header__meta">
      <span class="badge badge--category">{{category_label}}</span>
      <time datetime="{{date_modified}}">Updated {{date_modified_formatted}}</time>
    </div>
    <h1 class="pillar-title">{{title}}</h1>
    <!-- AEO block — 40-60 words, styled as callout -->
    <div class="pillar-aeo-block">
      <p>{{aeo_paragraph}}</p>
    </div>
    <div class="pillar-byline">
      <img src="{{author.photo}}" alt="{{author.name}}" width="40" height="40">
      <span>By <strong>{{author.name}}</strong> · <span class="trust-verified">✓ Last Verified {{date_modified_formatted}}</span></span>
    </div>
  </header>

  <!-- TOC -->
  <nav class="toc" aria-label="Table of contents">
    <h2 class="toc__heading">In This Guide</h2>
    <ol class="toc__list">{{toc_items_html}}</ol>
  </nav>

  <!-- Body Content (Markdown → HTML) -->
  <div class="pillar-body prose">
    {{content_html}}
  </div>

  <!-- Mid-Article Product Cards (injected at specified position) -->
  {{#if featured_products}}
  <section class="pillar-products">
    <h2>{{featured_products_heading}}</h2>
    <div class="product-card-grid product-card-grid--3col">
      {{#each featured_products}}{{> product-card}}{{/each}}
    </div>
    <a href="/products/launch-monitors/" class="btn btn--ghost">View All Products →</a>
  </section>
  {{/if}}

  <!-- FAQ -->
  {{> faq-block faq_items}}

  <!-- Related Articles -->
  <section class="related-articles">
    <h2>Related Guides</h2>
    <div class="article-card-grid article-card-grid--3col">
      {{#each related_posts}}{{> article-card}}{{/each}}
    </div>
  </section>
</main>

<script type="application/ld+json">{{article_schema_json}}</script>
{{#if faq_items}}<script type="application/ld+json">{{faq_schema_json}}</script>{{/if}}
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 8: Setup Guide (`setup-guide.html`)

```html
<main class="setup-guide-page">
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/setup/">Setup Guides</a> › <span>{{title}}</span>
  </nav>

  <header class="setup-guide-header">
    <h1>{{title}}</h1>
    <div class="setup-requirements">
      <span>⏱ {{time_estimate}}</span>
      <span>💰 {{cost_estimate}} CAD</span>
      <span>🔧 {{difficulty_label}}</span>
    </div>
    <span class="trust-verified">✓ Last Verified {{date_modified_formatted}}</span>
  </header>

  <!-- Requirements Overview -->
  <section class="setup-requirements-detail">
    <h2>What You'll Need</h2>
    <ul class="requirements-list">
      {{#each requirements}}<li>{{this}}</li>{{/each}}
    </ul>
  </section>

  <!-- Step-by-Step (HowTo schema) -->
  <section class="setup-steps" itemscope itemtype="https://schema.org/HowTo">
    <h2>Step-by-Step Guide</h2>
    <meta itemprop="name" content="{{title}}">
    <ol class="steps-list">
      {{#each steps}}
      <li class="step" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
        <div class="step__number">{{@index_plus_1}}</div>
        <div class="step__content">
          <h3 itemprop="name">{{name}}</h3>
          <p itemprop="text">{{description}}</p>
          {{#if tip}}<p class="step__tip">💡 {{tip}}</p>{{/if}}
        </div>
      </li>
      {{/each}}
    </ol>
  </section>

  <!-- Component Recommendations -->
  {{#if recommended_products}}
  <section class="setup-products">
    <h2>Recommended Products for This Setup</h2>
    <div class="product-card-grid product-card-grid--compact">
      {{#each recommended_products}}{{> product-card-mini}}{{/each}}
    </div>
  </section>
  {{/if}}

  <!-- Canada Notes -->
  <section class="setup-canada prose">
    <h2>Canadian Installation Notes</h2>
    {{canada_notes_html}}
  </section>

  {{> faq-block faq_items}}
</main>

<script type="application/ld+json">{{howto_schema_json}}</script>
{{#if faq_items}}<script type="application/ld+json">{{faq_schema_json}}</script>{{/if}}
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 9: Brand Page (`brand-single.html`)

```html
<main class="brand-page">
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/brands/">Brands</a> › <span>{{name}}</span>
  </nav>

  <header class="brand-header">
    <img src="{{logo_url}}" alt="{{name}} logo" width="200" height="80" fetchpriority="high">
    <h1>{{name}} — Canada Guide {{year}}</h1>
    <p class="brand-tagline">{{editorial_summary}}</p>
  </header>

  <!-- Canada Presence -->
  <section class="brand-canada">
    <h2>{{name}} in Canada</h2>
    <div class="prose">{{canada_presence_html}}</div>
    <div class="brand-dealers">
      <h3>Authorized Canadian Dealers</h3>
      {{#each dealers}}
      <div class="dealer-card">
        <span>{{name}}</span>
        <span class="dealer-provinces">{{provinces_formatted}}</span>
        <a href="{{url}}" class="btn btn--ghost btn--sm" rel="noopener" target="_blank">Visit →</a>
      </div>
      {{/each}}
    </div>
  </section>

  <!-- Products by This Brand -->
  <section class="brand-products">
    <h2>{{name}} Products We've Reviewed</h2>
    <div class="product-card-grid product-card-grid--3col">
      {{#each products}}{{> product-card}}{{/each}}
    </div>
  </section>

  <!-- Comparison Links -->
  <section class="brand-comparisons">
    <h2>How {{name}} Compares</h2>
    <div class="comparison-links">
      {{#each comparisons}}
      <a href="/vs/{{slug}}/" class="comparison-link-card">{{label}}</a>
      {{/each}}
    </div>
  </section>
</main>

<script type="application/ld+json">{{organization_schema_json}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## Template 10: Installer Province Page (`installer-province.html`)

```html
<main class="installer-page">
  <nav class="breadcrumb">
    <a href="/">Home</a> › <a href="/installers/">Installers</a> › <span>{{province}}</span>
  </nav>

  <header class="installer-header">
    <h1>Golf Simulator Installers in {{province}}</h1>
    <p class="lead">{{intro_paragraph}}</p>
    <span class="trust-verified">✓ Last Verified {{last_verified}}</span>
  </header>

  <!-- Installer List -->
  <section class="installer-list">
    {{#each installers}}
    <article class="installer-card {{#if verified}}installer-card--verified{{/if}}">
      {{#if verified}}<span class="badge badge--primary">Verified</span>{{/if}}
      {{#if featured}}<span class="badge badge--featured">Featured</span>{{/if}}
      <div class="installer-card__body">
        <h2 class="installer-card__name">{{name}}</h2>
        <p class="installer-card__location">{{city}}, {{province}}</p>
        <div class="installer-card__brands">
          <span class="installer-label">Brands:</span>
          {{#each brands}}<span class="tag tag--sm">{{this}}</span>{{/each}}
        </div>
        <p class="installer-card__services">{{services_summary}}</p>
      </div>
      <div class="installer-card__footer">
        {{#if website}}<a href="{{website}}" class="btn btn--secondary btn--sm" rel="noopener" target="_blank">Visit Website →</a>{{/if}}
        <a href="/contact/?installer={{slug}}" class="btn btn--primary btn--sm">Request Quote</a>
      </div>
    </article>
    {{/each}}

    <!-- Empty state -->
    {{#unless installers.length}}
    <div class="installer-empty">
      <p>We're building out our {{province}} installer directory. In the meantime,
         <a href="/contact/">submit a quote request</a> and we'll connect you manually.</p>
    </div>
    {{/unless}}
  </section>

  <!-- Home Sim Lead CTA -->
  <aside class="installer-cta">
    <h2>Not sure what setup to ask for?</h2>
    <p>Use our <a href="/build/">Simulator Room Builder</a> to spec out your space first,
       then bring those specs to any installer for an accurate quote.</p>
  </aside>
</main>

<script type="application/ld+json">{{localbusiness_schema_json}}</script>
<script type="application/ld+json">{{breadcrumb_schema_json}}</script>
```

---

## `src/data/authors.json` — Schema

```json
[
  {
    "slug": "editor-in-chief",
    "name": "PLACEHOLDER — Real name required before launch",
    "title": "Editor-in-Chief, Golf Sim Canada",
    "bio_short": "PLACEHOLDER — 1–2 sentence bio required before launch",
    "bio_full": "PLACEHOLDER — Full bio (200–300 words) required before launch",
    "photo": "/assets/images/team/editor-in-chief.jpg",
    "linkedin_url": "PLACEHOLDER — LinkedIn URL required before launch",
    "schema_same_as": ["PLACEHOLDER"],
    "status": "active"
  }
]
```

> **Note**: `12-guardrails.md` rule — never publish articles without real author data. All `PLACEHOLDER` fields must be filled by site owner before launch.

---

## `src/data/search-index.json` — Auto-Generated Schema

Generated by `build.js` during build. Not manually edited.

```json
[
  {
    "title": "Best Home Golf Simulators Canada 2025",
    "url": "/best-home-simulators/",
    "description": "Meta description text...",
    "type": "pillar",
    "primary_keyword": "best golf simulator canada"
  }
]
```

**Fields per entry**: `title`, `url`, `description`, `type` (pillar/product/blog/venue/glossary/brand), `primary_keyword`  
**Search UI**: Appears in nav search bar (desktop) + prominent on 404 page  
**Implementation**: `search.js` reads this file, filters on keyup, displays results in dropdown  
