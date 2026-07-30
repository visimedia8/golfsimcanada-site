const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
let errors = 0;
let warnings = 0;
let totalPages = 0;

const allHtmlFiles = [];

// Recursively find all HTML files
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      allHtmlFiles.push(filePath);
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

walkDir(distDir);
totalPages = allHtmlFiles.length;

console.log(`🔍 Validating ${totalPages} pages in dist/...`);

// Build a Set of all valid paths
const validPaths = new Set();
allHtmlFiles.forEach(file => {
  // convert D:\golfsimcanada.site\dist\venues\index.html to /venues/
  let url = file.replace(distDir, '').replace(/\\/g, '/');
  if (url.endsWith('index.html')) {
    url = url.replace('index.html', '');
  }
  if (!url.startsWith('/')) url = '/' + url;
  validPaths.add(url);
  // Also add version with trailing slash or without just in case
  if (url.endsWith('/')) validPaths.add(url.slice(0, -1));
  else validPaths.add(url + '/');
});

// Always valid exceptions (assets, external, etc.)
validPaths.add('/');
validPaths.add('');

allHtmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = file.replace(distDir, '');

  // 1. Check for SEO tags
  if (!/<title>.*<\/title>/i.test(content)) {
    console.error(`❌ Missing <title> in ${relativePath}`);
    errors++;
  }
  
  if (!/<meta\s+name=["']description["']/i.test(content)) {
    console.error(`❌ Missing <meta name="description"> in ${relativePath}`);
    errors++;
  }

  if (!/<link\s+rel=["']canonical["']/i.test(content)) {
    console.error(`❌ Missing <link rel="canonical"> in ${relativePath}`);
    errors++;
  }

  // 2. Check JSON-LD schema
  const jsonLdMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  if (!jsonLdMatches || jsonLdMatches.length === 0) {
    console.warn(`⚠️ No JSON-LD schema found in ${relativePath}`);
    warnings++;
  } else {
    jsonLdMatches.forEach(match => {
      try {
        const jsonStr = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '').trim();
        JSON.parse(jsonStr);
      } catch (e) {
        console.error(`❌ Invalid JSON-LD in ${relativePath}: ${e.message}`);
        errors++;
      }
    });
  }

  // 3. Check internal links
  const linkRegex = /href=["'](\/[^"']*)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    let link = match[1];
    // Ignore anchors and static assets
    if (link.startsWith('/assets/') || link.match(/\.(css|js|png|jpg|jpeg|svg|json|xml|webmanifest)$/i)) {
      continue;
    }
    
    // Strip query string and hash
    const queryIndex = link.indexOf('?');
    if (queryIndex !== -1) {
      link = link.substring(0, queryIndex);
    }
    const hashIndex = link.indexOf('#');
    if (hashIndex !== -1) {
      link = link.substring(0, hashIndex);
    }
    
    // Normalize link
    if (link.endsWith('/') && link.length > 1) {
      link = link.slice(0, -1);
    }
    if (!validPaths.has(link) && !validPaths.has(link + '/')) {
      console.error(`❌ Broken internal link: ${link} found in ${relativePath}`);
      errors++;
    }
  }
});

console.log('\n====================================');
console.log('✅ Validation Complete');
console.log(`Pages Checked: ${totalPages}`);
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);
console.log('====================================\n');

if (errors > 0) {
  process.exit(1);
} else {
  console.log('🚀 Ready for Cloudflare Pages deployment!');
}
