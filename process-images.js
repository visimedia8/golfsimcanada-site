const sharp = require('sharp');
const path = require('path');

async function processImages() {
  const faviconSrc = 'D:\\golfsimcanada.site\\SSOT\\assets\\icon (1).jpg';
  const logoSrc = 'D:\\golfsimcanada.site\\SSOT\\assets\\transparent small.png';
  
  const destDir = 'D:\\golfsimcanada.site\\src\\assets\\images\\logo';
  
  try {
    // 1. Process Favicon (32x32)
    await sharp(faviconSrc)
      .resize(32, 32)
      .toFile(path.join(destDir, 'favicon.png'));
      
    // Apple Touch Icon (180x180)
    await sharp(faviconSrc)
      .resize(180, 180)
      .toFile(path.join(destDir, 'apple-touch-icon.png'));

    // 2. Process Logo with trim (potong fit)
    await sharp(logoSrc)
      .trim()
      .toFile(path.join(destDir, 'logo.png'));
      
    console.log('Images processed successfully.');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
