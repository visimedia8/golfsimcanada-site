import os
import urllib.request
import re
import time
from duckduckgo_search import DDGS

DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dist'))
SRC_IMG_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../assets/images'))
DIST_IMG_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dist/assets/images'))

def get_all_html_files(directory):
    html_files = []
    if not os.path.exists(directory):
        return html_files
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

print("Scanning HTML files for images...")
html_files = get_all_html_files(DIST_DIR)
image_paths = set()

img_regex = re.compile(r'src="(/assets/images/[^"]+\.(?:jpg|jpeg|png|webp))"', re.IGNORECASE)
meta_regex = re.compile(r'content="(/assets/images/[^"]+\.(?:jpg|jpeg|png|webp))"', re.IGNORECASE)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        for match in img_regex.findall(content):
            image_paths.add(match)
        for match in meta_regex.findall(content):
            image_paths.add(match)

print(f"Found {len(image_paths)} unique image references.")

ddgs = DDGS()

for img_path in image_paths:
    if 'logo.png' in img_path or 'favicon' in img_path:
        continue
    
    # We only want to specifically overwrite product images or things that need exact matches
    # Since earlier we used loremflickr, we will overwrite ALL of them to ensure accuracy
    
    basename = os.path.basename(img_path)
    name_without_ext = os.path.splitext(basename)[0]
    
    query = name_without_ext.replace('-', ' ')
    if 'products' in img_path:
        query += " golf simulator"
    elif 'venues' in img_path:
        query += " indoor golf"
    else:
        query += " golf simulator"
        
    print(f"\nSearching precise image for: {img_path}")
    print(f"Query: '{query}'")
    
    dest_path_src = os.path.join(SRC_IMG_DIR, os.path.relpath(img_path, '/assets/images'))
    dest_path_dist = os.path.join(DIST_IMG_DIR, os.path.relpath(img_path, '/assets/images'))
    
    os.makedirs(os.path.dirname(dest_path_src), exist_ok=True)
    os.makedirs(os.path.dirname(dest_path_dist), exist_ok=True)
    
    try:
        results = ddgs.images(
            keywords=query,
            region="wt-wt",
            safesearch="moderate",
            size="Medium",
            max_results=5,
        )
        if results:
            downloaded = False
            for res in results:
                img_url = res['image']
                print(f"  Trying URL: {img_url[:50]}...")
                try:
                    req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=5) as response, open(dest_path_src, 'wb') as out_file:
                        out_file.write(response.read())
                    
                    with open(dest_path_src, 'rb') as src_file, open(dest_path_dist, 'wb') as dst_file:
                        dst_file.write(src_file.read())
                        
                    print(f"  [SUCCESS] Downloaded accurate image for {basename}")
                    downloaded = True
                    break
                except Exception as e:
                    print(f"  [WARN] URL failed: {e}")
            if not downloaded:
                print(f"  [ERROR] All 5 URLs failed for {basename}")
        else:
            print("  [ERROR] No images found via DDG API.")
    except Exception as e:
         print(f"  [ERROR] DDG Search failed: {e}")
    
    time.sleep(2)

print("\nDone replacing generic images with accurate ones!")
