# GolfSimCanada.site — Design System

> **File**: `08-design-system.md`  
> **Derived from**: `01-brand-dna.md` (Brand DNA)  
> **Lead**: UI/UX  
> **Principle**: Typography-first, dark editorial, premium ecom. Everything large, intentional, breathing.

---

## 1. Design Philosophy

> "If the type is small, the brand feels small."

Golf Sim Canada is an authority. It should *feel* authoritative before anyone reads a word.
- **Type is large** — headlines dominate, body is readable at 20px minimum
- **Dark is default** — deep backgrounds, editorial white, gold accent
- **Space is generous** — content breathes, never cramped
- **Product is hero** — ecom cards feel premium, not catalog-ish
- **Canada is visible** — cold, premium, outdoorsy palette. Not warm tropical.

---

## 2. Color System

### Core Palette

```css
:root {
  /* Backgrounds — layered dark system */
  --color-bg-base:       #0A0F0D;   /* Deepest — page background */
  --color-bg-surface:    #111714;   /* Cards, panels */
  --color-bg-elevated:   #192118;   /* Hover state, dropdowns */
  --color-bg-overlay:    #1E2A22;   /* Modals, tooltips */

  /* Primary — Deep Forest Green */
  --color-primary:       #1B5E3A;   /* Main brand green */
  --color-primary-light: #2D8A57;   /* Hover / active */
  --color-primary-muted: #1B5E3A33; /* 20% opacity — badges, tags */

  /* Accent — Electric Gold */
  --color-accent:        #C9A84C;   /* Primary accent — CTAs, badges */
  --color-accent-bright: #E8C56A;   /* Hover state on accent */
  --color-accent-muted:  #C9A84C22; /* Subtle highlight */

  /* Text */
  --color-text-primary:  #F0EDE6;   /* Warm white — main body */
  --color-text-secondary:#A89F8C;   /* Muted — meta, labels, dates */
  --color-text-tertiary: #6B6358;   /* Disabled, placeholders */
  --color-text-inverse:  #0A0F0D;   /* On light/gold backgrounds */

  /* Semantic */
  --color-success:       #2D8A57;   /* Same as primary-light */
  --color-warning:       #C9A84C;   /* Same as accent */
  --color-error:         #C0392B;
  --color-info:          #2980B9;

  /* Borders */
  --color-border:        #2A3530;   /* Subtle — card borders */
  --color-border-strong: #3D4F45;   /* Dividers */
  --color-border-accent: #C9A84C44; /* Gold-tinted borders on focus */

  /* Canada Red — used sparingly for Canadian flag references */
  --color-canada-red:    #D52B1E;
}
```

### Usage Rules
| Element | Color |
|---|---|
| Page background | `--color-bg-base` |
| Product cards | `--color-bg-surface` |
| Nav bar | `--color-bg-surface` with `border-bottom: 1px solid --color-border` |
| Primary CTA button | `--color-accent` bg + `--color-text-inverse` text |
| Secondary button | `--color-primary` bg + `--color-text-primary` text |
| Ghost button | transparent + `--color-border` border |
| "Editor's Choice" badge | `--color-accent` bg |
| "Verified Dealer" badge | `--color-primary` bg |
| "Featured" badge | `--color-accent-muted` bg + `--color-accent` border |
| Body text | `--color-text-primary` |
| Meta text (dates, labels) | `--color-text-secondary` |
| Price in CAD | `--color-accent` |
| Headings | `#FFFFFF` (pure white for max contrast on dark) |

---

## 3. Typography System

> **Rule**: No body text below 18px. No UI label below 14px. Headings are LARGE.

### Font Stack

```css
:root {
  /* Editorial — headings, hero text, pull quotes */
  --font-editorial: 'Playfair Display', 'Georgia', serif;

  /* UI — body, nav, buttons, labels, product cards */
  --font-ui: 'Inter', 'DM Sans', system-ui, sans-serif;

  /* Data — specs tables, prices, code, measurements */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

```css
:root {
  /* Display — Hero headlines, landing page H1 */
  --text-display-2xl: clamp(56px, 8vw, 96px);   /* Homepage hero H1 */
  --text-display-xl:  clamp(48px, 6vw, 72px);   /* Section hero H1 */
  --text-display-lg:  clamp(40px, 5vw, 60px);   /* Pillar page H1 */

  /* Headings */
  --text-h1:  clamp(36px, 4.5vw, 52px);         /* Article H1 */
  --text-h2:  clamp(28px, 3.5vw, 42px);         /* Section headings */
  --text-h3:  clamp(22px, 2.5vw, 32px);         /* Sub-sections */
  --text-h4:  clamp(18px, 2vw, 24px);           /* Card titles, sidebar headings */

  /* Body — MINIMUM 18px rule */
  --text-body-xl: 22px;    /* Lead paragraph / intro text */
  --text-body-lg: 20px;    /* Standard body text */
  --text-body-md: 18px;    /* Secondary body, list items */

  /* UI Elements */
  --text-label:   16px;    /* Buttons, nav items, tags */
  --text-small:   14px;    /* Meta, dates, fine print — MINIMUM */
  --text-xs:      12px;    /* Legal footnotes ONLY — never body */
}
```

### Font Weight System
```css
:root {
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semibold: 600;
  --weight-bold:    700;
  --weight-black:   900;  /* Display headlines only */
}
```

### Typography Usage Map

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Homepage hero H1 | Playfair Display | `--text-display-2xl` | 900 | `#FFFFFF` |
| Pillar page H1 | Playfair Display | `--text-display-lg` | 700 | `#FFFFFF` |
| Article H1 | Playfair Display | `--text-h1` | 700 | `#FFFFFF` |
| H2 section | Playfair Display | `--text-h2` | 700 | `#FFFFFF` |
| H3 sub-section | Inter | `--text-h3` | 600 | `--color-text-primary` |
| H4 card/sidebar | Inter | `--text-h4` | 600 | `--color-text-primary` |
| Body text | Inter | `--text-body-lg` (20px) | 400 | `--color-text-primary` |
| Lead paragraph | Inter | `--text-body-xl` (22px) | 400 | `--color-text-primary` |
| Nav items | Inter | `--text-label` (16px) | 500 | `--color-text-primary` |
| Button text | Inter | `--text-label` (16px) | 600 | varies |
| Product price (CAD) | JetBrains Mono | `--text-h4` (24px) | 700 | `--color-accent` |
| Spec table data | JetBrains Mono | `--text-body-md` (18px) | 400 | `--color-text-primary` |
| Date / meta | Inter | `--text-small` (14px) | 400 | `--color-text-secondary` |
| Badge text | Inter | `--text-small` (14px) | 700 | varies |

### Line Height & Letter Spacing

```css
:root {
  --leading-tight:  1.15;  /* Display headlines */
  --leading-snug:   1.3;   /* H1–H2 */
  --leading-normal: 1.55;  /* H3–H4 */
  --leading-relaxed: 1.7;  /* Body text — generous for reading */
  --leading-loose:  1.85;  /* Long-form article body */

  --tracking-tight: -0.03em;  /* Display headlines */
  --tracking-normal: -0.01em; /* Headings */
  --tracking-wide:   0.04em;  /* Labels, badges, caps */
  --tracking-wider:  0.08em;  /* ALL CAPS tags */
}
```

---

## 4. Spacing System

**Base unit: 4px**. All spacing is multiples of 4.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;
  --space-40:  160px;
}
```

### Section Spacing (Vertical Rhythm)
```css
/* Desktop */
--section-gap:     var(--space-32);   /* Between major page sections: 128px */
--section-gap-lg:  var(--space-40);   /* Hero sections: 160px */
--content-gap:     var(--space-16);   /* Between content blocks: 64px */
--card-gap:        var(--space-6);    /* Between cards in grid: 24px */
```

---

## 5. Layout & Grid

```css
:root {
  --container-max:    1280px;   /* Max content width */
  --container-wide:   1440px;   /* Full-bleed sections */
  --container-narrow: 800px;    /* Article body text */
  --container-xs:     640px;    /* Forms, legal pages */

  --grid-columns: 12;
  --grid-gap:     var(--space-6);  /* 24px */
}
```

### Responsive Breakpoints — MOBILE FIRST (Non-Negotiable)
```css
/* ALL CSS written mobile-first: base styles = 375px
   Desktop styles added via min-width media queries ONLY */
--bp-xs:   375px;   /* Base — iPhone SE / smallest modern phone */
--bp-sm:   430px;   /* iPhone Pro Max / large phones */
--bp-md:   768px;   /* Tablets — portrait */
--bp-lg:   1024px;  /* Tablets landscape / small laptops */
--bp-xl:   1280px;  /* Desktops */
--bp-2xl:  1536px;  /* Large screens */
```

**Mobile-First Rule**: Write base CSS for 375px. Augment upward.
```css
/* ✅ CORRECT — mobile first */
.product-grid { grid-template-columns: 1fr; }                        /* 375px base */
@media (min-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }

/* ❌ WRONG — desktop first */
.product-grid { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 768px) { .product-grid { grid-template-columns: 1fr; } }
```

**Test breakpoints in order**: 375px → 430px → 768px → 1024px → 1280px

### Common Layouts
| Page | Grid Usage |
|---|---|
| Homepage | 12-col, hero full-width, products 1→2→3-col responsive |
| Product listing | 1-col (mobile) → 2-col (tablet) → 3-col (desktop) |
| Article | 1-col narrow (800px max), sidebar optional 3/9 split |
| Comparison | 1-col stacked (mobile) → 2-col side-by-side (desktop) |
| Directory/venue | 1-col (mobile) → 2-col cards + map 3/9 split (desktop) |
| Tools | 1-col wizard steps (mobile) → 2-col input + preview (desktop) |

---

## 6. Border Radius

```css
:root {
  --radius-sm:   4px;    /* Tags, badges, small buttons */
  --radius-md:   8px;    /* Buttons, form inputs */
  --radius-lg:   12px;   /* Cards */
  --radius-xl:   16px;   /* Feature cards, hero blocks */
  --radius-2xl:  24px;   /* Modal, large containers */
  --radius-full: 9999px; /* Pills, avatar, round buttons */
}
```

---

## 7. Shadow System

```css
:root {
  /* Subtle depth on dark backgrounds */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.4),  0 1px 2px rgba(0,0,0,0.3);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3);
  --shadow-lg:  0 8px 24px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4);
  --shadow-xl:  0 16px 48px rgba(0,0,0,0.7);

  /* Gold glow — for Editor's Choice, featured cards */
  --shadow-gold: 0 0 24px rgba(201,168,76,0.15), 0 4px 16px rgba(0,0,0,0.5);

  /* Green glow — for primary CTA hover */
  --shadow-green: 0 0 24px rgba(27,94,58,0.3), 0 4px 16px rgba(0,0,0,0.5);
}
```

---

## 8. Component Specs

### Primary CTA Button
```css
.btn-primary {
  background: var(--color-accent);       /* Gold */
  color: var(--color-text-inverse);      /* Near-black text */
  font: 600 var(--text-label) / 1 var(--font-ui);
  letter-spacing: var(--tracking-wide);
  padding: var(--space-4) var(--space-8); /* 16px 32px */
  border-radius: var(--radius-md);
  border: none;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  min-height: 44px;                      /* WCAG touch target */
  min-width: 44px;
}
.btn-primary:hover {
  background: var(--color-accent-bright);
  box-shadow: var(--shadow-gold);
  transform: translateY(-1px);
}
```
```

### Secondary Button
```css
.btn-secondary {
  background: var(--color-primary);
  color: var(--color-text-primary);
  /* Same sizing as primary */
}
.btn-secondary:hover {
  background: var(--color-primary-light);
  box-shadow: var(--shadow-green);
  transform: translateY(-1px);
}
```

### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-strong);
}
.btn-ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### Product Card (Ecom-style)
```css
.product-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);      /* 12px */
  padding: var(--space-6);              /* 24px */
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;
}
.product-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-gold);
  transform: translateY(-3px);
}
/* Badge */
.badge-editors-choice {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  font: 700 12px / 1 var(--font-ui);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
}
/* Price */
.product-price {
  font: 700 var(--text-h4) / 1 var(--font-mono);
  color: var(--color-accent);
}
```

### Venue/Installer Directory Card
```css
.venue-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-4);
}
.venue-card.featured {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-gold);
}
```

### Article / Blog Card
```css
.article-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.article-card__title {
  font: 700 var(--text-h3) / var(--leading-snug) var(--font-editorial);
  color: #FFFFFF;
}
```

### Nav Bar
```css
.nav {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  height: 72px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: rgba(17,23,20,0.92);
}
.nav__logo-text {
  font: 700 20px / 1 var(--font-editorial);
  color: #FFFFFF;
  letter-spacing: var(--tracking-tight);
}
.nav__link {
  font: 500 var(--text-label) / 1 var(--font-ui);
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}
.nav__link:hover { color: var(--color-text-primary); }
.nav__link.active { color: var(--color-accent); }
```

### Last Verified Trust Badge
```css
.trust-verified {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font: 500 var(--text-small) / 1 var(--font-ui);
  color: var(--color-text-secondary);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
}
/* Icon: checkmark circle — green */
```

---

## 9. Animation & Micro-interactions

```css
:root {
  /* Durations */
  --duration-fast:    150ms;  /* Hover color changes */
  --duration-normal:  250ms;  /* Most transitions */
  --duration-slow:    400ms;  /* Page-level, reveals */
  --duration-slower:  600ms;  /* Hero animations */

  /* Easings */
  --ease-standard:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-decelerate:  cubic-bezier(0, 0, 0.2, 1);  /* Elements entering */
  --ease-accelerate:  cubic-bezier(0.4, 0, 1, 1);  /* Elements leaving */
  --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce — badges, cards */
}
```

### Micro-interaction Rules
| Trigger | Animation |
|---|---|
| Card hover | `translateY(-3px)` + gold shadow — 250ms |
| Button hover | `translateY(-1px)` + glow shadow — 150ms |
| Nav link hover | color fade — 150ms |
| Badge appear | scale(0.8 → 1) + opacity — 200ms spring |
| Page section reveal | `translateY(20px) → 0` + opacity — 400ms on scroll |
| Price highlight | Subtle pulse on page load — 600ms |

---

## 10. Logo Brief

### Concept Direction
**Mark**: A minimalist golf ball trajectory arc — ascending trajectory line that resolves into a stylized maple leaf negative space or a subtle arc suggesting a Canadian horizon. Clean, geometric, forward-moving.

**NOT**: Stick figure golfer. Maple leaf slapped on a golf ball. Generic sports icon.

### Wordmark
- **"Golf Sim Canada"** — "Golf Sim" in Playfair Display Bold, "Canada" in Inter medium weight, smaller, tracked out
- OR: All in custom wordmark, no icon needed for secondary uses

### Sizes Required
- Full logo (mark + wordmark): horizontal
- Mark only (square): favicon, social avatar
- Wordmark only: light background alternate
- Full logo dark background version (primary)
- Full logo light background version (for print/email)

### Color Applications
| Version | Mark | Wordmark |
|---|---|---|
| Primary (dark bg) | `--color-accent` gold | `#FFFFFF` white |
| Monochrome dark | `#FFFFFF` | `#FFFFFF` |
| Monochrome light | `#0A0F0D` | `#0A0F0D` |
| Accent only | `--color-accent` | `--color-accent` |

### Feel Reference
- Mark complexity: Apple, Headspace — simple and memorable
- Weight: Bold enough to read at 16px favicon size
- Personality: Premium outdoor/tech, not playful

---

## 11. Icon System

- **Library**: Phosphor Icons (outline weight, consistent with Inter pairing)
- **Size standard**: 20px (UI), 24px (feature), 32px (hero callouts)
- **Color**: Always `currentColor` — inherits from parent
- **Key icons needed**: golf flag, launch monitor (radar/target), location pin, star rating, checkmark, calendar, CAD dollar, arrow right, menu, close

---

## 12. Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

---

## 13. Mobile Bottom Nav (Sticky) — Mobile Only

**Pattern**: Fixed bottom nav bar on mobile (≤768px). Hidden on desktop (regular top nav only).  
**Items**: 4 max. Sub-tray slides up on tap.  
**Legal pages**: NOT in sticky nav — remain in scrollable footer only.

### HTML Structure
```html
<!-- Mobile sticky bottom nav — hidden on desktop via CSS -->
<nav class="mobile-bottom-nav" aria-label="Mobile navigation" role="navigation">
  <button class="mbn-item" data-tray="products" aria-expanded="false">
    <svg><!-- product icon --></svg>
    <span>Products</span>
  </button>
  <a class="mbn-item mbn-item--home" href="/">
    <svg><!-- home icon --></svg>
    <span>Home</span>
  </a>
  <button class="mbn-item" data-tray="find" aria-expanded="false">
    <svg><!-- location icon --></svg>
    <span>Find</span>
  </button>
  <a class="mbn-item mbn-item--cta" href="/build/">
    <svg><!-- tool icon --></svg>
    <span>Build</span>
  </a>
</nav>

<!-- Sub-trays — slide up on button tap -->
<div class="mbn-tray" id="tray-products" aria-hidden="true">
  <div class="mbn-tray__handle"></div>
  <nav class="mbn-tray__links">
    <a href="/products/launch-monitors/">Launch Monitors</a>
    <a href="/products/packages/">Packages</a>
    <a href="/products/mats/">Mats</a>
    <a href="/products/nets/">Nets</a>
    <a href="/software/">Software</a>
    <a href="/products/">All Products →</a>
  </nav>
</div>

<div class="mbn-tray" id="tray-find" aria-hidden="true">
  <div class="mbn-tray__handle"></div>
  <nav class="mbn-tray__links">
    <a href="/venues/">Indoor Venues</a>
    <a href="/installers/">Installers</a>
    <a href="/rentals/">Rental</a>
    <a href="/events/">Events</a>
  </nav>
</div>
<div class="mbn-tray-backdrop" aria-hidden="true"></div>
```

### CSS
```css
.mobile-bottom-nav {
  display: none; /* Hidden on desktop */
}

@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--color-bg-surface);
    border-top: 1px solid var(--color-border-strong);
    padding: var(--space-2) 0 calc(var(--space-2) + env(safe-area-inset-bottom));
    justify-content: space-around;
    align-items: center;
  }

  .mbn-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: var(--space-2) var(--space-4);
    min-width: 44px;
    min-height: 44px;
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font: 500 11px / 1 var(--font-ui);
    letter-spacing: var(--tracking-wide);
    cursor: pointer;
    transition: color 0.15s ease;
  }

  .mbn-item--cta {
    color: var(--color-accent);
    font-weight: 700;
  }

  .mbn-item.active, .mbn-item:hover {
    color: var(--color-text-primary);
  }

  /* Sub-tray — slides up from bottom */
  .mbn-tray {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: var(--color-bg-elevated);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    border-top: 1px solid var(--color-border-strong);
    padding: var(--space-4) var(--space-6) calc(80px + env(safe-area-inset-bottom));
    transform: translateY(100%);
    transition: transform 0.3s var(--ease-out);
    will-change: transform;
  }

  .mbn-tray.is-open {
    transform: translateY(0);
  }

  .mbn-tray__handle {
    width: 36px;
    height: 4px;
    background: var(--color-border-strong);
    border-radius: var(--radius-full);
    margin: 0 auto var(--space-4);
  }

  .mbn-tray__links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }

  .mbn-tray__links a {
    padding: var(--space-4);
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font: 500 var(--text-label) / 1 var(--font-ui);
    text-decoration: none;
    text-align: center;
    transition: border-color 0.2s, background 0.2s;
  }

  .mbn-tray__links a:hover {
    border-color: var(--color-accent);
    background: var(--color-bg-overlay);
  }

  .mbn-tray-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 998;
    background: rgba(0,0,0,0.5);
  }

  .mbn-tray-backdrop.is-visible {
    display: block;
  }

  /* Push page content up so sticky nav doesn't cover it */
  body {
    padding-bottom: calc(64px + env(safe-area-inset-bottom));
  }
}
```

### Legal Pages in Footer (NOT in sticky nav)
```html
<!-- Scrollable footer — desktop and mobile -->
<footer class="site-footer">
  <!-- ... footer content ... -->
  <div class="footer-legal">
    <nav aria-label="Legal links">
      <a href="/legal/privacy/">Privacy</a>
      <a href="/legal/terms/">Terms</a>
      <a href="/legal/disclaimer/">Disclaimer</a>
      <a href="/legal/cookies/">Cookies</a>
      <a href="/legal/accessibility/">Accessibility</a>
      <a href="/legal/editorial/">Editorial Policy</a>
    </nav>
    <p class="footer-copyright">© 2025 GolfSimCanada.site. All rights reserved.</p>
  </div>
</footer>
```

**Rule**: Legal links are visible in footer (every page), accessible via scroll.  
They NEVER appear in: sticky nav, bottom nav tray, main hamburger nav.  
Reason: Legal is compliance, not navigation. Don't waste nav real estate.

---

## 14. Filter Panel Component

Used on: `/products/`, `/products/[category]/`, `/venues/`, `/installers/`, `/rentals/`

```css
/* Filter panel — desktop: sidebar; mobile: collapsible top bar */
.filter-panel {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.filter-group {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-4);
}

.filter-group:last-child {
  border-bottom: none;
}

.filter-group__label {
  font: 600 var(--text-label) / 1 var(--font-ui);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-3);
}

/* Checkbox filter item */
.filter-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  cursor: pointer;
  font: 400 var(--text-body-md) / 1.4 var(--font-ui);
  color: var(--color-text-secondary);
  transition: color 0.15s;
}

.filter-item:hover { color: var(--color-text-primary); }

/* Price range slider */
.filter-range {
  width: 100%;
  accent-color: var(--color-accent);
}

/* Active filter chips */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  background: var(--color-primary-muted);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  font: 500 13px / 1 var(--font-ui);
  color: var(--color-text-primary);
}
```

**Product filter fields**:
- Brand (checkboxes: Garmin, Rapsodo, Foresight, SkyTrak, Bushnell, Uneekor, etc.)
- Budget (range slider: $500 – $30,000+ CAD)
- Best For (Beginner / Intermediate / Serious / Commercial)
- Space Type (Portable / Garage / Basement / Dedicated Room)
- Detection Tech (Camera / Radar / Dual)
- Software (GSPro / E6 / FSX / Awesome Golf)

**Directory filter fields**:
- Province (dropdown)
- City (text search)
- Price per hour (slider)
- Open Now / 24-7 (toggle)
- Simulator Brand (checkboxes)
- Amenities (Bar / Food / Private Bay / Lessons / Tournaments)
- Booking Type (Walk-in / Online / Membership)

---

## 15. Interactive Tool Card Component

Used on: `/tools/`, homepage tools section

```css
.tool-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

.tool-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-gold);
  transform: translateY(-4px);
}

.tool-card__icon {
  width: 48px;
  height: 48px;
  background: var(--color-accent-muted);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  color: var(--color-accent);
}

.tool-card__title {
  font: 700 var(--text-h4) / var(--leading-snug) var(--font-editorial);
  color: #FFFFFF;
  margin-bottom: var(--space-3);
}

.tool-card__description {
  font: 400 var(--text-body-md) / var(--leading-relaxed) var(--font-ui);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.tool-card__cta {
  /* Uses .btn-secondary */
  width: 100%;
}
```

### 5 Tools — Full Spec

| Tool | URL | Input | Output | Data Source |
|---|---|---|---|---|
| **Room Size Checker** | `/tools/room-checker/` | Width (ft), Height (ft), Length (ft) | ✅ Yes / ⚠️ Tight / ❌ No + recommended products | Hardcoded min requirements table |
| **Budget Calculator** | `/tools/budget-calculator/` | Budget slider ($500–$30,000 CAD) + priority (accuracy/price) | 3 recommended setups with links | `products.json` filtered by price_range |
| **Product Comparator** | `/tools/compare/` | Select up to 3 products (dropdown or search) | Side-by-side spec table + verdict | `products.json` + `comparisons.json` |
| **Installer Quote** | `/tools/installer-quote/` | Province + room type + completion level | CAD cost range + CTA to local installers | Hardcoded pricing tiers table |
| **Software Matchmaker** | `/tools/software-match/` | 3 questions: budget / sim brand / play style | Top 2 software recommendations + links | `products.json` (category: software) |

**All tools**: 100% client-side JS. No backend. No API. Data from JSON files already built into page at build time.
