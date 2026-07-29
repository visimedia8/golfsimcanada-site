# GolfSimCanada.site — Internal Linking Strategy

> **File**: `06b-internal-linking.md`  
> **Lead**: SEO + PM  
> **Principle**: Every link must be intentional, non-duplicate, flow naturally from the content, and serve the reader's journey OR pass equity to a money page.

---

## 1. Core Philosophy — Flow First

Links should feel like a natural part of the sentence — not an interruption, not a forced CTA. The reader should barely notice it's a link until they want to go deeper.

**The test**: Read the sentence out loud. Does the linked phrase make sense as part of the thought, or does it feel bolted on? If it feels bolted on, rewrite the sentence.

✅ **Good** — link lives inside a naturally occurring phrase:  
> *"The GCQuad measures [spin axis and spin rate](/glossary/spin-rate/) with photometric accuracy, which is why it's the go-to for serious Canadian home setups."*

❌ **Bad** — link feels like an afterthought or redirect:  
> *"Spin rate is important. For more on this, [click here](/glossary/spin-rate/)."*

❌ **Bad** — forced "read more" pattern:  
> *"To learn more about the best simulators, [read our full guide here](/best-golf-simulators-canada/)."*

---

## 2. Core Rules (Non-Negotiable)

| Rule | Detail |
|---|---|
| **No duplicate links** | One URL can appear ONCE per page. If you've linked to `/golf-simulator-cost-canada/` once in a post, do NOT link it again further down — even with different anchor text. |
| **Max links per article** | 5–8 internal links per 1,000 words. Spoke articles: 4–6 total. Pillar pages: 8–15 (linking down to all spokes). |
| **No links in first paragraph** | First paragraph is AEO / featured snippet bait. Links break snippet extraction. |
| **No forced CTAs as body links** | "For more information, click here" — never. The link must live inside meaningful body text. |
| **No orphan pages** | Every page must receive at least 2 internal links from other pages. Check before publish. |
| **Pillar gets keyword-containing anchor** | When a spoke links to its pillar, the anchor must contain the pillar's primary or closely related keyword phrase. |
| **Don't cross-link pillars unnecessarily** | Two pillar pages only link to each other when genuinely contextually relevant — never just to pass equity. |

---

## 2. Link Architecture Hierarchy

```
HOMEPAGE (highest authority)
    ↓ links to all Pillar Pages
    
PILLAR PAGES (cluster hubs)
    ↓ links DOWN to all their Spokes
    ↑ receives links UP from all Spokes (exact-match anchor)
    
SPOKE ARTICLES
    ↑ links UP to Pillar (1x, exact-match)
    → links ACROSS to 1–2 related Spokes (same cluster)
    → links to relevant Product Pages (money page conversion)
    → links to relevant Glossary Terms (wiki)
    
PRODUCT PAGES (money pages)
    ↑ receives links from Spokes, Pillars, Comparisons
    → links to Compare pages, Setup guides, Brand pages
    → links to /find/installers/ (lead gen)
    
GLOSSARY TERMS (wiki)
    ↑ receives links from any article mentioning the term (1x per article)
    → links to most relevant money page or pillar
    
LOCAL DIRECTORY PAGES
    ↑ receives links from /indoor-golf-canada/ pillar
    → links UP to province hub
    → links to /find/installers/[province]/ (lead gen)
```

---

## 3. Anchor Text Rules

**Phrase match over exact match.** The anchor doesn't need to hit the exact keyword string — it needs to be a naturally occurring phrase that contains the concept. Google understands context. The reader shouldn't feel the link was shoehorned in.

| Type | % of Links | Example |
|---|---|---|
| **Phrase match** | 50% | "Canada's best home golf setups", "accurate indoor launch data" (not forced exact KW) |
| **Partial / LSI** | 30% | "top-rated simulators", "indoor golf setups", "home sim installation" |
| **Branded natural** | 15% | "our GCQuad review", "Golf Sim Canada's cost breakdown" |
| **Descriptive contextual** | 5% | "the full installation breakdown" — when the phrase itself IS the content |

**Never**: "here", "this link", "click here", "read more" standalone.  
**Never**: Wrap an entire sentence in a link.  
**Never**: Link a single generic word like "this" or "guide".

---

## 4. Blog Post → Money Page Links (Critical Path)

Every blog/informational post must contain **at minimum 1 link to a money page** — woven into the body content, not forced at the end as a CTA block.

| Money Page | Gets Links From | Natural Hook |
|---|---|---|
| `/best-golf-simulators-canada/` | Buying-intent articles, seasonal posts | "...which is why [these Canadian home setups](/best-golf-simulators-canada/) dominate the market" |
| `/golf-simulator-cost-canada/` | Any mention of price/budget | "...with [prices ranging from $1,500 to $50,000+ CAD](/golf-simulator-cost-canada/) depending on..." |
| `/products/launch-monitors/` | Technique + component articles | "...a [quality launch monitor](/products/launch-monitors/) will track exactly that" |
| `/products/[specific product]/` | Comparison, best-for articles | "...the [GCQuad](/products/launch-monitors/foresight-gcquad/) handles this better than anything in its class" |
| `/find/installers/` | Setup/installation articles | "...or if you'd rather have a [certified Canadian installer](/find/installers/) handle the build" |
| `/find/venues/[city]/` | Seasonal, indoor golf articles | "...find a [drop-in sim venue in Calgary](/find/venues/alberta/calgary/) to test before you buy" |
| `/compare/[a-vs-b]/` | Brand mentions | "...which is the core of the [GC3 vs GCQuad debate](/compare/foresight-gc3-vs-gcquad/)" |
| `/golf-simulator-packages-canada/` | Buying guides | "...most buyers are better off with a [complete package](/golf-simulator-packages-canada/)" |

### Rule: Closing Link — Natural, Not Promotional
The final money page link should come from a closing thought that summarizes the article's implication — not a "ready to buy?" CTA box:

✅ *"For most Canadian golfers, the decision comes down to ceiling height and budget — both of which we break down across [every major home simulator available in Canada](/best-golf-simulators-canada/)."*  
❌ *"Ready to buy? Click here to see the best golf simulators!"*

---

## 5. Cluster-Specific Internal Link Map

### Cluster A — Buying
```
/best-golf-simulators-canada/ (PILLAR)
  ← receives from: Homepage, all product pages, all Cluster A spokes
  → links to: /golf-simulator-cost-canada/, /golf-simulator-packages-canada/,
              top 5 product pages, /find/installers/

/golf-simulator-cost-canada/ (SPOKE)
  ← receives from: Pillar A, technique articles mentioning price
  → links UP to: /best-golf-simulators-canada/ [exact-match: "best golf simulators in Canada"]
  → links to: /golf-simulator-packages-canada/, /find/installers/, /compare/golf-simulator-costco-canada/

/golf-simulator-packages-canada/ (SPOKE)
  ← receives from: Pillar A, cost guide, homepage
  → links UP to: /best-golf-simulators-canada/
  → links to: /products/full-packages/, /find/installers/

/setup/golf-simulator-garage-canada/ (SPOKE)
  → links UP to: /best-golf-simulators-canada/
  → links to: /setup/golf-simulator-room-requirements/, /products/launch-monitors/
```

### Cluster B+C — Setup & Components
```
/setup/golf-simulator-installation-canada/ (PILLAR)
  ← receives from: Homepage, all setup spokes
  → links to: all component pages, /setup/golf-simulator-room-requirements/,
              /find/installers/ [MONEY LINK]

/setup/components/launch-monitors/ (SPOKE)
  → links UP to: /setup/golf-simulator-installation-canada/
  → links to: /products/launch-monitors/ [MONEY LINK], relevant glossary terms

/setup/diy-golf-simulator-canada/ (SPOKE)
  → links UP to: /setup/golf-simulator-installation-canada/
  → links to: /setup/components/ hub, /setup/golf-simulator-garage-canada/
  → links to: /find/installers/ [MONEY — "or get a pro to do it"]
```

### Cluster D — Local Directory
```
/indoor-golf-canada/ (PILLAR)
  → links to: all province hubs (/find/venues/ontario/, etc.)

/find/venues/ontario/toronto/ (CITY PAGE)
  → links UP to: /find/venues/ontario/ → /indoor-golf-canada/
  → links to: /find/installers/ontario/ [MONEY — "want your own sim?"]
  → links to: /best-golf-simulators-canada/ [MONEY]
```

### Cluster G — Technique (Informational → Money)
```
/blog/technique/smash-factor-golf/ (SPOKE)
  → links to: /products/launch-monitors/ [MONEY — "track smash factor with a launch monitor"]
  → links to: /best-golf-simulators-canada/ [MONEY]
  → links to: /glossary/smash-factor/ [WIKI]

/blog/technique/launch-angle-7-iron/ (SPOKE)
  → links to: /products/launch-monitors/ [MONEY]
  → links to: /glossary/launch-angle/ [WIKI]
```

---

## 6. Glossary / Wiki — Internal Link Rules

The glossary (`/glossary/`) is a **link distribution layer**:
- Every article that mentions a glossary term links to it **once** (first occurrence only)
- Every glossary term links to **one primary money page or pillar** — no more
- Glossary terms cross-link to related terms (max 3 per term page)

### Rule: First Mention Only
> ✅ "The **[launch monitor](/glossary/launch-monitor/)** measures ball speed, spin rate..."  
> ❌ Linking "launch monitor" again 3 paragraphs later in the same article.

---

## 7. New Page Pre-Publish Checklist

Before any page goes live:

- [ ] Links UP to parent (pillar or hub) — with exact/partial match anchor
- [ ] Links to at least 1 money page
- [ ] Links to 1–2 glossary terms (first mention only)
- [ ] Zero duplicate links (same URL appears max 1x)
- [ ] No orphan — at least 2 other pages link TO this page (update those pages)
- [ ] No generic anchors ("click here", "read more")
- [ ] First paragraph has NO links
- [ ] Final paragraph has contextual CTA with money page link
- [ ] Max 6 internal links per 1,000 words
