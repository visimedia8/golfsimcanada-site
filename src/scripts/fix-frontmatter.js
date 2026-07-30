const fs = require('fs');
const path = require('path');

const contentDirs = [
    { dir: 'src/content/products', type: 'products' },
    { dir: 'src/content/blog', type: 'blog' },
    { dir: 'src/content/compare', type: 'compare' }
];

for (const { dir, type } of contentDirs) {
    const fullPath = path.join(__dirname, '../../', dir);
    if (!fs.existsSync(fullPath)) continue;

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
        const filePath = path.join(fullPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const slugMatch = content.match(/^slug:\s*"([^"]+)"/m);
        const slug = slugMatch ? slugMatch[1] : path.basename(file, '.md');
        
        const expectedImagePath = `/assets/images/${type}/${slug}.jpg`;
        
        if (content.match(/^og_image:/m)) {
            // Replace existing og_image
            content = content.replace(/^og_image:\s*".*"/m, `og_image: "${expectedImagePath}"`);
        } else {
            // Insert og_image right after slug
            content = content.replace(/(^slug:\s*"[^"]+"\r?\n)/m, `$1og_image: "${expectedImagePath}"\n`);
        }
        
        fs.writeFileSync(filePath, content);
    }
}

console.log('Frontmatter fixed!');
