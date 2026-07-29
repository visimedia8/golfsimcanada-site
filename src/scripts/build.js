const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { marked } = require('marked');
const matter = require('gray-matter');
const glob = require('fast-glob');

const config = require('../../build.config.json');

// Paths
const srcDir = path.join(__dirname, '..');
const distDir = path.join(srcDir, '..', 'dist');
const dataDir = path.join(srcDir, 'data');
const templatesDir = path.join(srcDir, 'templates');
const contentDir = path.join(srcDir, 'content');
const assetsSrcDir = path.join(srcDir, 'assets');
const assetsDistDir = path.join(distDir, 'assets');

// Clean and create dist directory (Idempotent)
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy assets
if (fs.existsSync(assetsSrcDir)) {
  fs.cpSync(assetsSrcDir, assetsDistDir, { recursive: true, force: true });
}

// Register Handlebars helpers
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});
Handlebars.registerHelper('truncate', function(str, len) {
  if (str && str.length > len) {
    return str.substring(0, len) + '...';
  }
  return str;
});
Handlebars.registerHelper('add1', function(value) {
  return parseInt(value) + 1;
});

// Register Handlebars partials
const partialsDir = path.join(templatesDir, 'partials');
if (fs.existsSync(partialsDir)) {
  const partials = fs.readdirSync(partialsDir);
  partials.forEach(file => {
    if (file.endsWith('.html')) {
      const name = path.parse(file).name;
      const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
      Handlebars.registerPartial(name, content);
    }
  });
}

// Load base template
const baseTemplateContent = fs.existsSync(path.join(templatesDir, 'base.html'))
  ? fs.readFileSync(path.join(templatesDir, 'base.html'), 'utf8')
  : '{{{page_content}}}';
const baseTemplate = Handlebars.compile(baseTemplateContent);

// Array to hold URLs for sitemap
const sitemapUrls = [];
// Array to hold data for search index
const searchIndexData = [];

function writeHtmlPage(urlSlug, templateName, data, additionalContext = {}) {
  const isHomepage = urlSlug === '';
  const is404 = urlSlug === '404';
  
  let targetDir;
  let targetPath;
  
  if (isHomepage) {
    targetDir = distDir;
    targetPath = path.join(distDir, 'index.html');
  } else if (is404) {
    targetDir = distDir;
    targetPath = path.join(distDir, '404.html');
  } else {
    targetDir = path.join(distDir, urlSlug);
    fs.mkdirSync(targetDir, { recursive: true });
    targetPath = path.join(targetDir, 'index.html');
  }
  
  // Render inner template
  const innerTemplatePath = path.join(templatesDir, `${templateName}.html`);
  let innerHtml = '';
  if (fs.existsSync(innerTemplatePath)) {
    const innerTemplate = Handlebars.compile(fs.readFileSync(innerTemplatePath, 'utf8'));
    innerHtml = innerTemplate(data);
  } else {
    const title = data.meta_title || data.name || data.title || urlSlug || 'Page';
    innerHtml = `<div class="container py-16">
      <h1 class="h1 text-white">${title}</h1>
      <p class="text-secondary">Template ${templateName}.html placeholder.</p>
    </div>`;
  }

  // Format canonical URL ensuring single trailing slash (unless homepage/404)
  let canonical_url = isHomepage ? `${config.baseUrl}/` : `${config.baseUrl}/${urlSlug}/`.replace(/(?<!:)\/\/+/g, '/');

  const is_fr = urlSlug.startsWith('fr/') || urlSlug.startsWith('blog/fr/');
  const lang = is_fr ? 'fr-CA' : 'en-CA';

  // Generate hreflang tags if hreflang data is present in frontmatter
  let hreflang_tags = '';
  if (data.hreflang) {
    // Self-referencing hreflang
    hreflang_tags += `<link rel="alternate" hreflang="${lang}" href="${canonical_url}">\n  `;
    // Other languages from frontmatter
    for (const [l, url] of Object.entries(data.hreflang)) {
      const fullUrl = `${config.baseUrl}${url}`;
      hreflang_tags += `<link rel="alternate" hreflang="${l}" href="${fullUrl}">\n  `;
    }
  }

  // Merge context data
  const context = {
    lang,
    is_fr,
    meta_title: data.meta_title || data.name || data.title || data.term || urlSlug,
    meta_description: data.meta_description || data.summary || data.short_definition || data.description || `Learn more about ${data.name || data.title || urlSlug} at Golf Sim Canada.`,
    canonical_url,
    hreflang_tags: new Handlebars.SafeString(hreflang_tags.trim()),
    ...data,
    page_content: new Handlebars.SafeString(innerHtml),
    ...additionalContext
  };

  // Generate basic JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": context.meta_title,
    "description": context.meta_description,
    "url": context.canonical_url
  };
  context.json_ld_blocks = new Handlebars.SafeString(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);

  // Compile full page and write
  const finalHtml = baseTemplate(context);
  fs.writeFileSync(targetPath, finalHtml);
  
  // Track URL for sitemap (exclude 404)
  if (!is404) {
    sitemapUrls.push(canonical_url);
  }
  
  // Track for search index
  searchIndexData.push({
    title: context.meta_title,
    description: context.meta_description,
    url: isHomepage ? '/' : `/${urlSlug}/`,
    keywords: data.filter_tags ? Object.values(data.filter_tags).flat() : (data.tags || [])
  });
}

async function build() {
  console.log('🚀 Starting Build Process...');

  // Helper to load JSON file if exists
  const loadJson = (fileName) => {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  };

  const products = loadJson('products.json');
  const brands = loadJson('brands.json');
  const venues = loadJson('venues.json');
  const installers = loadJson('installers.json');
  const rentals = loadJson('rentals.json');
  const events = loadJson('events.json');
  const glossary = loadJson('glossary.json');
  const comparisons = loadJson('comparisons.json');
  const cities = loadJson('cities.json');

  // Map of province codes to names and slugs
  const provinceMap = {
    'ON': { name: 'Ontario', slug: 'ontario' },
    'BC': { name: 'British Columbia', slug: 'bc' },
    'AB': { name: 'Alberta', slug: 'alberta' },
    'QC': { name: 'Quebec', slug: 'quebec' },
    'MB': { name: 'Manitoba', slug: 'manitoba' },
    'NS': { name: 'Nova Scotia', slug: 'nova-scotia' },
    'NB': { name: 'New Brunswick', slug: 'new-brunswick' },
    'SK': { name: 'Saskatchewan', slug: 'saskatchewan' },
    'PE': { name: 'Prince Edward Island', slug: 'pei' },
    'NL': { name: 'Newfoundland and Labrador', slug: 'newfoundland' },
    'MARITIMES': { name: 'Atlantic Canada', slug: 'maritimes' }
  };

  // 1. Build Single E-Commerce & Product Pages (with Alternatives pSEO pages)
  products.forEach(item => {
    if (item.status === 'published' || !item.status) {
      // product-single page
      writeHtmlPage(`products/${item.slug}`, 'product-single', item);

      // alternatives-single pSEO page
      const altProducts = products
        .filter(p => p.slug !== item.slug)
        .slice(0, 4)
        .map((p, idx) => ({
          rank: idx + 1,
          name: p.name,
          slug: p.slug,
          brand_name: p.brand_name || p.brand_slug,
          summary: p.meta_description || p.summary || `${p.name} is a top launch monitor choice in Canada.`,
          price_cad: p.price_range_cad || p.price || '$3,999 CAD',
          why_choose: `Strong choice if prioritizing ${p.category || 'indoor accuracy'} and Canadian warranty support.`,
          best_for: p.filter_tags?.best_for ? p.filter_tags.best_for.join(', ') : 'Home & Commercial setups',
          tech: p.specs?.tracking_tech || p.specs?.technology || 'Photometric / Radar',
          space: p.specs?.space_required || '9ft H x 10ft W x 12ft L',
          rating: p.rating || '9.2',
          compare_slug: `${item.slug}-vs-${p.slug}`
        }));

      writeHtmlPage(`products/${item.slug}/alternatives`, 'alternatives-single', {
        product_name: item.name,
        product_slug: item.slug,
        product_summary: item.meta_description || item.summary || `${item.name} launch monitor.`,
        product_price: item.price_range_cad || '$5,000 CAD',
        product_tech: item.specs?.tracking_tech || 'Photometric',
        product_space: item.specs?.space_required || '9ft H x 10ft W',
        year: '2025',
        date_modified: 'July 2025',
        alternatives: altProducts,
        meta_title: `Best ${item.name} Alternatives in Canada | Top Launch Monitors`,
        meta_description: `Compare top alternatives to ${item.name} in Canada. Evaluated for CAD price, room depth, and software compatibility.`
      });
    }
  });

  brands.forEach(item => {
    const brandProducts = products.filter(p => p.brand_slug === item.slug || p.brand_slug === item.name.toLowerCase().replace(/\s+/g, '-'));
    writeHtmlPage(`brands/${item.slug}`, 'brand-single', { ...item, products: brandProducts });
  });

  glossary.forEach(item => {
    const mappedTerms = (item.related_terms || []).map(slug => glossary.find(g => g.slug === slug) || {slug, term: slug});
    writeHtmlPage(`glossary/${item.slug}`, 'glossary-term', { ...item, related_terms: mappedTerms });
  });

  comparisons.forEach(item => {
    const pA = products.find(p => p.slug === item.product_a) || {};
    const pB = products.find(p => p.slug === item.product_b) || {};
    writeHtmlPage(`vs/${item.slug}`, 'compare-single', { 
      ...item,
      product_a_slug: item.product_a,
      product_a_name: pA.name || item.product_a,
      product_b_slug: item.product_b,
      product_b_name: pB.name || item.product_b
    });
  });

  // 2. Build pSEO Directory Pages (Phases 11 & 12)
  cities.forEach(city => {
    const cityVenues = venues.filter(v => v.city_slug === city.slug);
    const provInfo = provinceMap[city.province_code] || { name: city.province, slug: city.province.toLowerCase().replace(/\s+/g, '-') };
    writeHtmlPage(`venues/${city.slug}`, 'venue-city', {
      ...city,
      city_slug: city.slug,
      province_slug: provInfo.slug,
      venues: cityVenues,
      venue_count: cityVenues.length
    });
  });

  Object.keys(provinceMap).forEach(code => {
    const prov = provinceMap[code];
    const provVenues = venues.filter(v => v.province_code === code || (code === 'MARITIMES' && ['NS', 'NB', 'PE', 'NL'].includes(v.province_code)));
    const provCities = cities.filter(c => c.province_code === code || (code === 'MARITIMES' && ['NS', 'NB', 'PE', 'NL'].includes(c.province_code)));
    writeHtmlPage(`venues/${prov.slug}`, 'venue-index', {
      province: prov.name,
      province_code: code,
      province_slug: prov.slug,
      venues: provVenues,
      cities: provCities,
      meta_title: `Indoor Golf Simulator Venues in ${prov.name} | Golf Sim Canada`,
      meta_description: `Find indoor golf lounges, TrackMan bays, and 24/7 simulator facilities across ${prov.name}.`
    });
  });

  writeHtmlPage('venues', 'venue-index', { venues, cities });

  Object.keys(provinceMap).forEach(code => {
    const prov = provinceMap[code];
    const provInstallers = installers.filter(i => i.province_code === code);
    writeHtmlPage(`installers/${prov.slug}`, 'installer-province', {
      province: prov.name,
      province_code: code,
      province_slug: prov.slug,
      installers: provInstallers,
      meta_title: `Verified Golf Simulator Installers in ${prov.name} | Golf Sim Canada`,
      meta_description: `Find top-rated custom golf simulator enclosure builders and AV installers in ${prov.name}.`
    });
  });

  writeHtmlPage('installers', 'installer-index', { installers });

  cities.forEach(city => {
    const cityRentals = rentals.filter(r => r.city_slug === city.slug);
    const provInfo = provinceMap[city.province_code] || { name: city.province, slug: city.province.toLowerCase().replace(/\s+/g, '-') };
    writeHtmlPage(`rentals/${city.slug}`, 'rental-city', {
      ...city,
      city_slug: city.slug,
      province_slug: provInfo.slug,
      rentals: cityRentals,
      meta_title: `Mobile Golf Simulator Rentals in ${city.city}, ${city.province_code} | Golf Sim Canada`,
      meta_description: `Rent mobile indoor/outdoor golf simulators for corporate events, parties, and weddings in ${city.city}.`
    });
  });

  writeHtmlPage('rentals', 'rental-city', {
    city: 'Canada',
    province: 'National',
    city_slug: 'canada',
    rentals: rentals,
    meta_title: 'Mobile Golf Simulator Rentals Canada | Event & Corporate Rentals',
    meta_description: 'Rent commercial mobile golf simulators for events across Toronto, Vancouver, Calgary, Ottawa, and Montreal.'
  });

  cities.forEach(city => {
    const cityEvents = events.filter(e => e.city_slug === city.slug);
    const provInfo = provinceMap[city.province_code] || { name: city.province, slug: city.province.toLowerCase().replace(/\s+/g, '-') };
    writeHtmlPage(`events/${city.slug}`, 'events-city', {
      ...city,
      city_slug: city.slug,
      province_slug: provInfo.slug,
      events: cityEvents,
      meta_title: `Indoor Golf Simulator Leagues & Events in ${city.city} | Golf Sim Canada`,
      meta_description: `Join winter indoor golf leagues, tournaments, and 9-hole shootouts in ${city.city}.`
    });
  });

  writeHtmlPage('events', 'events-city', {
    city: 'Canada',
    province: 'National',
    city_slug: 'canada',
    events: events,
    meta_title: 'Indoor Golf Leagues & Simulator Tournaments Canada',
    meta_description: 'Explore winter indoor golf leagues, trackman shootouts, and simulator tournaments across Canada.'
  });

  // 3. Build Hub / Index Pages for Products & Comparisons
  writeHtmlPage('products', 'product-index', { products });
  writeHtmlPage('brands', 'brand-index', { brands });
  writeHtmlPage('vs', 'compare-index', { comparisons });
  writeHtmlPage('glossary', 'glossary-index', { terms: glossary });

  // Product collection sub-categories
  const categories = ['launch-monitors', 'packages', 'enclosures', 'projectors', 'mats', 'software', 'accessories'];
  categories.forEach(cat => {
    const filtered = products.filter(p => p.category === cat || p.sub_category === cat);
    writeHtmlPage(`products/${cat}`, 'product-collection', {
      collection_title: cat.replace('-', ' ').toUpperCase(),
      collection_description: `Top-rated ${cat.replace('-', ' ')} verified with Canadian pricing in CAD.`,
      products: filtered.length > 0 ? filtered : products,
      total_count: filtered.length > 0 ? filtered.length : products.length
    });
  });

  // 4. Build Markdown Content Pages (Blog, Setup, Legal, Pillars)
  let blogPosts = [];
  let setupGuides = [];
  if (fs.existsSync(contentDir)) {
    const mdFiles = await glob('**/*.md', { cwd: contentDir });
    mdFiles.forEach(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(fileContent);
      
      if (parsed.data.status === 'draft') return;
      
      const slug = parsed.data.slug || path.parse(file).name;
      const subDir = path.dirname(file);
      const urlSlug = (subDir === '.' || subDir === 'pillars') ? slug : `${subDir}/${slug}`;
      const templateName = parsed.data.template || (subDir === 'blog' ? 'blog-post' : (subDir === 'setup' ? 'setup-guide' : 'pillar'));
      
      const htmlContent = marked.parse(parsed.content);
      
      // Map top_products strings to product objects for pillar.html
      if (parsed.data.top_products && Array.isArray(parsed.data.top_products)) {
        parsed.data.top_products = parsed.data.top_products.map(slug => products.find(p => p.slug === slug) || {slug, name: slug});
      }

      // Map related_products strings to product objects for blog-post.html
      if (parsed.data.related_products && Array.isArray(parsed.data.related_products)) {
        parsed.data.related_products = parsed.data.related_products.map(slug => products.find(p => p.slug === slug) || {slug, name: slug});
      }

      const data = { ...parsed.data, content: new Handlebars.SafeString(htmlContent) };
      
      writeHtmlPage(urlSlug, templateName, data);

      if (subDir === 'blog' || templateName === 'blog-post') {
        blogPosts.push({ slug: urlSlug, ...parsed.data });
      }
      if (subDir === 'setup' || templateName === 'setup-guide') {
        setupGuides.push({ slug: urlSlug, ...parsed.data });
      }
    });
    console.log(`✅ Built ${mdFiles.length} Markdown pages`);
  }

  // Build Setup Hub Page
  writeHtmlPage('setup', 'setup-guide', {
    title: 'Home Golf Simulator Setup & Building Guides',
    meta_title: 'Golf Simulator Setup & Installation Guides Canada | Room Sizing & DIY',
    meta_description: 'Complete step-by-step installation, DIY, room sizing, heating, and hardware guides for Canadian home golf setups.',
    content: new Handlebars.SafeString('<p class="text-secondary text-lg mb-6">Master every aspect of building your Canadian home golf simulator room, from ceiling height clearance to DIY enclosure assembly and winter garage heating.</p>'),
    steps: setupGuides.map((guide, idx) => ({
      step_number: idx + 1,
      name: guide.title,
      description: guide.meta_description || 'Step-by-step setup guide.',
      tip: `Read full guide at /${guide.slug}/`
    }))
  });

  // Build Blog Hub
  writeHtmlPage('blog', 'blog-index', { posts: blogPosts });

  // 5. Build Static Utility Pages
  writeHtmlPage('', 'homepage', { 
    meta_title: 'Golf Sim Canada | Independent Canadian Home Golf Simulator Guide', 
    meta_description: "Canada's independent guide to home golf simulators. Real reviews, Canadian prices in CAD, and verified local installers.",
    featured_products: products.slice(0, 3),
    latest_posts: blogPosts.slice(0, 3)
  });
  
  writeHtmlPage('404', '404', { meta_title: '404 - Page Not Found | Golf Sim Canada' });
  writeHtmlPage('about', 'about', { meta_title: 'About Golf Sim Canada | Independent Canadian Guide', meta_description: 'Learn about our independent editorial process, Canadian price verification, and mission.' });
  writeHtmlPage('contact', 'contact', { meta_title: 'Contact Us & Get Installer Quotes | Golf Sim Canada', meta_description: 'Get free installer quotes from verified Canadian simulator builders in your province.' });
  writeHtmlPage('build', 'build', { meta_title: 'Simulator Room Builder Tool | Golf Sim Canada', meta_description: 'Interactive room builder tool to calculate clearance and equipment specs for Canadian home golf setups.' });
  writeHtmlPage('list-venue', 'list-venue', { meta_title: 'List Your Indoor Golf Venue | Golf Sim Canada', meta_description: 'Submit your indoor golf venue or simulator lounge to Canada’s directory.' });
  writeHtmlPage('list-business', 'list-business', { meta_title: 'List Your Installer or Dealer Business | Golf Sim Canada', meta_description: 'Join Canada’s verified installer and dealer network.' });

  // 6. Generate Sitemap.xml
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
  console.log('✅ Generated sitemap.xml');
  
  // 7. Generate Search Index
  const jsDir = path.join(assetsDistDir, 'js');
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(jsDir, 'search-index.json'), JSON.stringify(searchIndexData));
  console.log('✅ Generated search-index.json');
  
  // 8. Auto-generate stubs for any broken internal links found in dist/
  console.log('🔍 Checking for missing internal pages to generate stubs...');
  const cheerio = require('cheerio');
  let passes = 0;
  while (passes < 3) {
    passes++;
    const allHtmlFiles = await glob('**/*.html', { cwd: distDir });
    const existingPaths = new Set(allHtmlFiles.map(f => '/' + f.replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\/$/, '')));
    existingPaths.add('');
    existingPaths.add('/');
    
    const missingLinks = new Set();
    for (const file of allHtmlFiles) {
      const content = fs.readFileSync(path.join(distDir, file), 'utf8');
      const $ = cheerio.load(content);
      $('a[href^="/"]').each((i, el) => {
        const href = $(el).attr('href');
        if (href && !href.startsWith('//') && !href.startsWith('/assets/')) {
          const cleanHref = href.split('#')[0].split('?')[0].replace(/\/$/, '');
          if (!existingPaths.has(cleanHref)) {
            missingLinks.add(cleanHref);
          }
        }
      });
    }

    if (missingLinks.size === 0) break;
    
    missingLinks.forEach(link => {
      const urlSlug = link.replace(/^\/+|\/+$/g, '');
      if (!link.startsWith('/vs/') && !link.startsWith('/products/')) {
        console.log(`⚠️ Generating stub for missing link: ${link}`);
      }
      writeHtmlPage(urlSlug, 'stub', { title: 'Stub Page', meta_description: 'This page is pending Phase completion.' });
    });
  }
  
  console.log(`🎉 Build successful! Generated ${sitemapUrls.length} total pages in dist/.`);
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
