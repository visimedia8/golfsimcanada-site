const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');
const cheerio = require('cheerio');

const distDir = path.join(__dirname, '..', '..', 'dist');

async function validate() {
  console.log('🔍 Starting SEO and Link Validation...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: /dist/ directory does not exist. Run build first.');
    process.exit(1);
  }

  const htmlFiles = await glob('**/*.html', { cwd: distDir });
  let errors = 0;
  let warnings = 0;

  const validPaths = new Set();
  const internalLinksToCheck = [];

  // 1. First pass: Register all valid paths and check page-level SEO
  htmlFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content);
    
    // Convert physical path to URL path
    let urlPath = '/' + file.replace(/\\/g, '/');
    if (urlPath.endsWith('index.html')) {
      urlPath = urlPath.replace('index.html', '');
    }
    validPaths.add(urlPath);
    validPaths.add(urlPath.replace(/\/$/, '')); // Support non-trailing slash for matching

    // A. Check Title
    const title = $('title').text().trim();
    if (!title || title.includes('{{meta_title}}')) {
      console.error(`❌ [Missing/Template Title] ${file}`);
      errors++;
    }

    // B. Check Meta Description
    const desc = $('meta[name="description"]').attr('content');
    if (!desc || !desc.trim() || desc.includes('{{meta_description}}')) {
      console.error(`❌ [Missing/Template Meta Description] ${file}`);
      errors++;
    }

    // C. Check Canonical
    const canonical = $('link[rel="canonical"]').attr('href');
    if (!canonical || canonical.includes('{{canonical_url}}')) {
      console.error(`❌ [Missing/Template Canonical] ${file}`);
      errors++;
    }

    // D. Check JSON-LD Schema
    const schemas = $('script[type="application/ld+json"]');
    if (schemas.length === 0) {
      console.error(`❌ [Missing JSON-LD Schema] ${file}`);
      errors++;
    } else {
      schemas.each((i, el) => {
        const schemaContent = $(el).html();
        if (schemaContent.includes('{{json_ld_blocks}}')) {
          console.error(`❌ [Unrendered JSON-LD Placeholder] ${file}`);
          errors++;
        } else {
          try {
            JSON.parse(schemaContent);
          } catch (e) {
            console.error(`❌ [Invalid JSON-LD Syntax] ${file}: ${e.message}`);
            errors++;
          }
        }
      });
    }

    // Extract all internal links for Second Pass
    $('a[href^="/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('//')) {
        // Strip hash or query params
        const cleanHref = href.split('#')[0].split('?')[0];
        if (cleanHref) {
          internalLinksToCheck.push({ source: file, target: cleanHref });
        }
      }
    });
  });

  // 2. Second pass: Validate internal links
  internalLinksToCheck.forEach(({ source, target }) => {
    // Treat assets differently
    if (target.startsWith('/assets/')) {
      const assetPath = path.join(distDir, target.substring(1));
      if (!fs.existsSync(assetPath)) {
        console.error(`❌ [Broken Asset Link] in ${source} -> ${target}`);
        errors++;
      }
    } else {
      // It's a page link
      if (!validPaths.has(target)) {
        // Some static links might be hardcoded for pages we haven't built yet (like legal, contact, etc.)
        // We'll treat missing pages as errors to fulfill the strict spec, but allow 404.html to exist or not
        console.error(`❌ [Broken Internal Link] in ${source} -> ${target}`);
        errors++;
      }
    }
  });

  console.log('----------------------------------------------------');
  console.log(`📊 Validation Report:`);
  console.log(`- Total HTML Pages: ${htmlFiles.length}`);
  console.log(`- Errors: ${errors}`);
  console.log(`- Warnings: ${warnings}`);
  
  if (errors > 0) {
    console.error(`❌ Validation Failed. Please fix the above errors.`);
    process.exit(1);
  } else {
    console.log(`✅ Validation Passed! Site is ready for Cloudflare deployment.`);
  }
}

validate().catch(err => {
  console.error('Validation script crashed:', err);
  process.exit(1);
});
