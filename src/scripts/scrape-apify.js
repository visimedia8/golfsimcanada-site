require('dotenv').config();
const { ApifyClient } = require('apify-client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

const DIST_DIR = path.join(__dirname, '../../dist');
const BASE_IMG_DIR = path.join(__dirname, '../../dist/assets/images');
const SRC_IMG_DIR = path.join(__dirname, '../assets/images');

function ensureDirSync(dirpath) {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
}

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Status Code ${response.statusCode}`));
      }
      
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlink(destPath, () => reject(err)); });
    });
    
    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function runApifyScraper() {
    console.log('Scanning HTML files for images...');
    const htmlFiles = getAllHtmlFiles(DIST_DIR);
    const imagePaths = new Set();
    
    const imgRegex = /src="(\/assets\/images\/[^"]+\.(jpg|jpeg|png|webp))"/gi;
    const metaRegex = /content="(\/assets\/images\/[^"]+\.(jpg|jpeg|png|webp))"/gi;
  
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      while ((match = imgRegex.exec(content)) !== null) imagePaths.add(match[1]);
      while ((match = metaRegex.exec(content)) !== null) imagePaths.add(match[1]);
    }
  
    console.log(`Found ${imagePaths.size} unique image references.`);

    for (const imgPath of Array.from(imagePaths)) {
        if (imgPath.includes('logo.png') || imgPath.includes('favicon')) continue;
        
        // We want to force overwrite the product images which were previously just placeholder golf pictures
        // Let's explicitly look for our 3 main missing product images or any other product images.
        if (!imgPath.includes('products')) continue;
    
        const destPathDist = path.join(__dirname, '../../dist', imgPath);
        const destPathSrc = path.join(__dirname, '../../src', imgPath);
        
        ensureDirSync(path.dirname(destPathDist));
        ensureDirSync(path.dirname(destPathSrc));
        
        const basename = path.basename(imgPath, path.extname(imgPath));
        const query = basename.replace(/-/g, ' ') + ' golf simulator';
        
        console.log(`\nUsing Apify to search Google Images for: ${query}`);
        
        try {
            // Run the official Google Search Scraper Actor configured for Images
            const run = await client.actor("apify/google-search-scraper").call({
                searchType: "IMAGE",
                queries: query,
                resultsPerPage: 5,
                maxPagesPerQuery: 1,
            });
            
            // Fetch results
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            
            if (items && items.length > 0 && items[0].organicResults && items[0].organicResults.length > 0) {
                const images = items[0].organicResults;
                let downloaded = false;
                for (let i = 0; i < Math.min(5, images.length); i++) {
                    const imgUrl = images[i].originalImage || images[i].url || images[i].thumbnail;
                    if (!imgUrl) continue;
                    
                    console.log(`  Trying URL ${i+1}: ${imgUrl.substring(0, 80)}...`);
                    try {
                        await downloadImage(imgUrl, destPathSrc);
                        fs.copyFileSync(destPathSrc, destPathDist);
                        console.log(`  [SUCCESS] Downloaded accurate image for ${path.basename(imgPath)}`);
                        downloaded = true;
                        break;
                    } catch (err) {
                        console.log(`  [WARN] Failed: ${err.message}`);
                    }
                }
                if (!downloaded) console.log(`  [ERROR] Could not download any images for ${imgPath}`);
            } else {
                console.log(`  [ERROR] No image results found via Apify.`);
                console.log(JSON.stringify(items[0], null, 2).substring(0, 500));
            }
        } catch (err) {
            console.error(`  [ERROR] Apify API error: ${err.message}`);
        }
    }
    
    console.log('\nDone replacing generic images with accurate ones via Apify!');
}

runApifyScraper();
