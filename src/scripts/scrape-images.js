const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

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

async function scrapeMissingImages() {
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
  
  // Base URLs for random real golf images
  const randomSources = [
    'https://loremflickr.com/800/600/golf',
    'https://loremflickr.com/800/600/golf,indoor',
    'https://loremflickr.com/800/600/golf,simulator'
  ];

  for (const imgPath of Array.from(imagePaths)) {
    if (imgPath.includes('logo.png') || imgPath.includes('favicon')) continue;

    const destPathDist = path.join(__dirname, '../../dist', imgPath);
    const destPathSrc = path.join(__dirname, '../../src', imgPath);
    
    ensureDirSync(path.dirname(destPathDist));
    ensureDirSync(path.dirname(destPathSrc));
    
    if (!fs.existsSync(destPathSrc)) {
      console.log(`\nFetching real random golf image for: ${imgPath}`);
      
      const sourceUrl = randomSources[Math.floor(Math.random() * randomSources.length)];
      
      try {
        await downloadImage(sourceUrl, destPathSrc);
        fs.copyFileSync(destPathSrc, destPathDist);
        console.log(`  ✅ Successfully saved ${path.basename(imgPath)}`);
      } catch (err) {
        console.error(`  ❌ Failed to download: ${err.message}`);
      }
      
      await new Promise(r => setTimeout(r, 500)); // Rate limit
    }
  }
  console.log('\nDone scraping images!');
}

scrapeMissingImages();
