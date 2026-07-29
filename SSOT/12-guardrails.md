# GolfSimCanada.site — Strict Guardrails & Don'ts

> **File**: `12-guardrails.md`  
> **Authority**: Overrides all other files in cases of conflict.  
> **Lead**: PM + Dev + SEO + Biz  
> **Purpose**: Non-negotiable rules. If something in another SSOT file contradicts a rule here, this file wins. No exceptions without explicit documented decision.

---

## How to Use This File

Before building any feature, writing any content, or making any structural decision — check this file.  
If what you're about to do appears in a **DON'T** list below → stop. Revisit the plan.

---

## SECTION 1 — PM / PROJECT GUARDRAILS

### ❌ DON'T: Build Outside the SSOT
- Never build a page, feature, or section not documented in the SSOT files.
- If a new idea comes up mid-build → update the relevant SSOT file first → then build.
- "We'll figure it out later" is not acceptable on any structural decision.

### ❌ DON'T: Skip the Pre-Launch Checklist
- `07-content-launch-checklist.md` is not optional.
- All legal pages MUST be live before any lead gen form goes live.
- All schema must be validated before launch.
- Site does not go live until every item in the checklist is checked.

### ❌ DON'T: Change URLs After Go-Live Without a Redirect Plan
- Any URL change post-launch = mandatory 301 redirect entry in `_redirects`.
- No redirect = broken internal links + GSC errors + lost equity.
- URL changes require updating: `_redirects`, `sitemap.xml`, all internal links pointing to old URL.

### ❌ DON'T: Work on Multiple Structural Changes Simultaneously
- One architectural change at a time.
- Complete → verify → commit → then start next.
- Parallel structural changes = conflicts, orphaned pages, merge errors.

### ❌ DON'T: Treat SSOT Files as Suggestions
- SSOT = Single Source of Truth. It is the contract.
- If reality diverges from SSOT → update SSOT immediately.
- Outdated SSOT is worse than no SSOT.

---

## SECTION 2 — DEV GUARDRAILS

### ❌ DON'T: Edit `/dist/` Manually
- `/dist/` is build output only. It is regenerated fresh on every `npm run build`.
- Any manual edit to `/dist/` will be overwritten on next build. Wasted work.
- All changes go into `/src/`. Always.

### ❌ DON'T: Commit `/dist/` or `node_modules/` to Git
- Both are in `.gitignore`. If they appear in a commit — stop, reset, fix `.gitignore`.
- Cloudflare Pages builds from source, not from committed `/dist/`.

### ❌ DON'T: Hardcode Content in Templates
- All text content, prices, dates, product names, venue info = come from JSON data files.
- No hardcoded "The GCQuad costs $16,000" inside an HTML template.
- Exception: structural UI copy ("Find a Dealer", "Last Verified") = fine in templates.

### ❌ DON'T: Use JavaScript Frameworks (React, Vue, Angular, Next.js, Astro)
- Stack is vanilla HTML/CSS/JS → static output → Cloudflare Pages.
- No build-time JS framework overhead. No hydration. No virtual DOM.
- If a feature needs more than vanilla JS can handle → reconsider the feature.

### ❌ DON'T: Use `!important` in CSS
- `!important` = specificity failure in disguise. Fix the cascade instead.
- One exception: utility override classes (e.g., `.visually-hidden`) — must be documented.

### ❌ DON'T: Use Inline Styles in HTML
- All styling via CSS classes. Zero `style=""` attributes on elements.
- Exception: dynamically set CSS custom property values from JS (e.g., `style="--progress: 72%"`) — acceptable.

### ❌ DON'T: Add Third-Party Scripts Without Performance Review
- Every external JS file = potential CLS, LCP delay, INP regression.
- Before adding any third-party script: measure LCP before and after.
- Forbidden without explicit documented reason: Google Tag Manager, any ad network pixel, chat widgets, survey popups.
- Cloudflare Web Analytics is already the analytics solution — no Google Analytics unless specifically required.

### ❌ DON'T: Set Cookies Before Consent
- PIPEDA + Quebec Law 25 = illegal to set non-essential cookies before explicit consent.
- Analytics cookies, advertising cookies = only after user accepts in consent banner.
- Essential cookies (session, consent preference) = exempt.
- Cookie consent state stored in `localStorage`, not a cookie.

### ❌ DON'T: Use `<table>` for Layout
- Tables are for tabular data only (spec sheets, comparison tables, pricing tiers).
- Layout = CSS Grid / Flexbox.

### ❌ DON'T: Skip `width` + `height` on Images
- Every `<img>` must have explicit `width` and `height` attributes.
- Missing = CLS (Cumulative Layout Shift) violations = Core Web Vitals failure.

### ❌ DON'T: Use Images Without WebP Format
- All images served as `.webp` with fallback `<picture>` element for older browsers.
- No raw `.jpg` or `.png` served directly as primary format.
- Hero images: additionally compress to < 150KB.

### ❌ DON'T: Mix `http://` and `https://`
- All internal links, canonical tags, OG URLs = `https://golfsimcanada.site/...`
- Cloudflare handles SSL — no excuse for mixed content warnings.

### ❌ DON'T: Deploy Without Running Build Validation
Before every Cloudflare deployment:
- [ ] `npm run build` completes with zero errors
- [ ] No broken internal links (run link checker)
- [ ] Sitemap generated and includes new pages
- [ ] No duplicate `<title>` tags across pages
- [ ] No missing `<meta name="description">` tags

---

## SECTION 3 — SEO GUARDRAILS

### ❌ DON'T: Create Two Pages Targeting the Same Primary Keyword
- Keyword cannibalization = two pages competing with each other = neither ranks.
- Before creating any new page, check `04-topical-map.md` and `05-keyword-matrix.md`.
- If keyword already has a target URL → add content to that page, not a new URL.

### ❌ DON'T: Use the Same `<title>` or `<meta description>` on Two Pages
- Every page = unique title + unique meta description. No exceptions.
- Duplicate metas = GSC warning + diluted click signals.

### ❌ DON'T: Publish a Page Without These Tags
Every single published page must have:
- `<title>` — unique, under 60 chars
- `<meta name="description">` — unique, 140–160 chars
- `<link rel="canonical">` — pointing to itself (or correct canonical)
- `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`
- At least one JSON-LD schema block
- `<link rel="alternate" hreflang="...">` on all bilingual pages

### ❌ DON'T: Create Orphan Pages
- Every page must receive at least 2 internal links from other published pages.
- Before publishing a new page → identify and update 2 existing pages to link to it.
- Orphan pages = Google doesn't discover or prioritize them.

### ❌ DON'T: Link to the Same URL Twice Within One Page
- Documented in `06b-internal-linking.md` — repeated here because it's critical.
- One URL = one internal link per page, maximum.

### ❌ DON'T: Use Generic or Fabricated Anchor Text
- "Click here", "here", "this page", "read more" = forbidden as standalone anchors.
- Anchor must describe the destination page's content using a natural phrase.

### ❌ DON'T: Create Thin Content (Under 600 Words for Any Published Page)
- 600 words = absolute floor. Typical targets in `04-topical-map.md`.
- Glossary terms: 400–600 words minimum (structured, not padded).
- If a page can't reach 600 words with genuine content → it shouldn't be a standalone page. Merge it.

### ❌ DON'T: Publish Paginated Pages Without `rel="prev"` / `rel="next"`
- `/blog/page/2/` without `rel="next"` on page 1 and `rel="prev"` on page 2 = duplicate content signal.
- Build script must inject these automatically.

### ❌ DON'T: Index Legal, Utility, or Pagination Pages Indiscriminately
- `/legal/*` pages: `<meta name="robots" content="noindex, follow">` — they exist for compliance, not ranking.
- `/blog/page/2/` and beyond: `noindex` or properly handled with `rel` tags — decide one approach and be consistent.
- `/sitemap/` (HTML): `noindex` — Google uses sitemap.xml, not the HTML version.

### ❌ DON'T: Use Manufacturer Copy as Product Descriptions
- Copied manufacturer text = duplicate content with the manufacturer's own site.
- All product descriptions must be original editorial writing.
- Spec tables may use manufacturer data — but the review text, pros/cons, and Canada notes must be original.

### ❌ DON'T: Stuff Keywords
- Keyword appears naturally in: H1, first paragraph, one H2, and organically in body.
- No forced repetition. No "golf simulator Canada" 14 times in 800 words.
- Google's NLP reads context and entities — natural language wins.

### ❌ DON'T: Use "Canada" in URL Slugs
- Domain is `golfsimcanada.site`. "Canada" is already implied.
- `/cost/` not `/golf-simulator-cost-canada/`
- Exception: if a page specifically compares Canadian vs US options and both versions exist.

### ❌ DON'T: Launch Without GSC Verified and Sitemap Submitted
- Google Search Console property verified on day 1.
- `sitemap.xml` submitted to GSC before first piece of content is published.

---

## SECTION 4 — CONTENT & BRAND GUARDRAILS

### ❌ DON'T: Publish USD Prices Without CAD Conversion
- This site is for Canadian buyers. Every price = CAD.
- If only USD pricing is available → state "Approx. $X CAD (based on USD price + import estimate)" with disclaimer.
- No raw USD-only pricing anywhere.

### ❌ DON'T: Publish Pricing Without a "Last Verified" Date
- Prices change. We are not a retailer. Every price = "Last Verified: [Month Year]".
- Publishing stale unverified prices = trust damage + potential legal liability.

### ❌ DON'T: Make Claims Without a Source or First-Hand Basis
- "The GCQuad is the most accurate launch monitor" → cite source or add "in our testing."
- "Canadian golfers spend an average of $X on home simulators" → cite survey or mark as estimate.
- No fabricated statistics. No hallucinated brand facts.

### ❌ DON'T: Publish Without Author Attribution
- Every article, guide, and product review = has an author byline.
- Anonymous content = EEAT failure.
- "Golf Sim Canada Editorial Team" is acceptable for secondary content — but editor-in-chief must approve all pillar content.

### ❌ DON'T: Copy Competitor Content
- No lifting paragraphs, structures, or spec descriptions from Foresight, SkyTrak, homegolfsimulator.ca, or any competitor.
- Original research + original voice = our competitive moat.

### ❌ DON'T: Use AI-Generated Content Without Human Review and Editing
- AI-generated drafts must be edited by a human for:
  - Factual accuracy (especially specs and Canadian-specific details)
  - Brand voice alignment (`01-brand-dna.md`)
  - Internal link placement
  - Removal of generic filler phrases
- Publish-without-review = hallucination risk + brand damage.

### ❌ DON'T: Use Generic Stock Golf Photography
- No clip-art golfers. No generic green fairway photos.
- Product images: clean studio or real-use context.
- Blog/guide images: real Canadian contexts (garage, basement, winter shed).
- If no real image available → generate via AI with Canadian context prompt.

### ❌ DON'T: Violate Brand Voice Rules from `01-brand-dna.md`
Specifically forbidden in any published content:
- "Click here to buy" (sounds affiliate)
- "Best [X] ever" without evidence
- "As an Amazon Associate..." as prominent text (disclosure yes, but not as headline)
- Exclamation points in editorial content (acceptable in CTAs only)
- "Cheap" to describe products (use "budget-friendly" or "entry-level")
- US-centric references ("Black Friday deals", "Lower 48", "US shipping")

---

## SECTION 5 — BUSINESS & LEGAL GUARDRAILS

### ❌ DON'T: Collect Leads Before Legal Pages Are Live
- Privacy Policy, Terms of Use, Disclaimer must all be published before ANY lead form goes live.
- Form with CASL consent checkbox must be in place.
- Collecting personal data without PIPEDA-compliant privacy policy = legal exposure.

### ❌ DON'T: List Unverified Dealers or Venues
- Every listing in `/venues/` and `/installers/` must be verified to exist before publishing.
- Minimum verification: business exists, address correct, contact reachable.
- "We'll verify later" = not acceptable. Fake/defunct listings = trust damage + potential legal liability.

### ❌ DON'T: Label Paid Listings as Editorial
- If a venue or installer paid for a "Featured" or "Verified" badge → it must be visually labeled as such.
- "Featured" badge = paid placement. This must be disclosed.
- No hiding sponsored content as organic editorial recommendation.

### ❌ DON'T: Enable Display Ads Before Traffic Threshold
- Display ads (Mediavine / AdThrive) only after 50,000 sessions/month.
- Running ads on low-traffic pages = terrible UX for minimal revenue.
- Premature ad injection also hurts Core Web Vitals (CLS from ad slots).

### ❌ DON'T: Claim Brand Affiliation We Don't Have
- "Official Golf Sim Canada partner of Foresight Sports" — only if contractually true.
- "Authorized dealer" — only for verified authorized dealers, never us (we are editorial).
- We are an independent editorial and directory site. This must be clear.

### ❌ DON'T: Contact Quebec Users With Commercial Email Without Express Consent
- CASL = express consent required before sending commercial emails.
- Lead form submission ≠ consent to marketing emails.
- Two separate checkboxes: (1) consent to be contacted by installers, (2) consent to our newsletter.
- Both unchecked by default. Both optional. Both separately described.

### ❌ DON'T: Exit Without a Proper Asset Documentation Package
- When preparing for exit/sale, the buyer needs:
  - All SSOT files (complete)
  - Source code + build scripts
  - Data files (JSON) — full venue, installer, product databases
  - Email list with consent records
  - GSC + Analytics access
  - Domain transfer instructions
  - All affiliate/lead gen partner contacts and agreements
- Undocumented assets = devalued exit.

---

## SECTION 6 — ANTI-HALLUCINATION RULES (AI-Specific)

> These apply when using any AI (including this agent) to generate, plan, or build content.

### ❌ DON'T: Accept Any AI Output That Contains:
- Brand specs without a cited source (e.g., "The GCQuad has 97.3% accuracy" — where is this from?)
- Price claims in CAD without verification against a real dealer page
- Named "Canadian installers" without verifying they exist
- Venue listings without confirming the venue is real and currently operating
- Legal advice framed as fact ("In Canada, you must..." — always add "consult a lawyer")
- Claims about competitor rankings or traffic without citing a tool/date

### ❌ DON'T: Let AI Generate Final Schema JSON Without Validation
- Every JSON-LD block → paste into Google Rich Results Test before deploying.
- AI-generated schema often has structural errors that look correct but fail validation.

### ❌ DON'T: Use AI to Generate the /legal/ Pages Directly
- Privacy Policy, Terms, CASL consent language = must be reviewed by a lawyer or vetted legal template source.
- AI-drafted legal pages may be non-compliant with Quebec Law 25 or PIPEDA specifics.
- Use a Canadian legal template service or lawyer review.

---

## Quick Reference Cheat Sheet

| Category | Never Do |
|---|---|
| **Dev** | Edit `/dist/` manually, use JS frameworks, set cookies pre-consent, skip image dimensions |
| **SEO** | Duplicate meta titles, keyword cannibalization, orphan pages, thin content < 600 words |
| **Content** | USD prices, unverified specs, anonymous articles, copied manufacturer text, AI without human review |
| **Brand** | "Click here to buy", "cheap", US-centric references, affiliate-looking CTAs |
| **Legal/Biz** | Lead forms before legal pages, unlabeled paid listings, unverified venue listings, pre-consent commercial email |
| **PM** | Build outside SSOT, skip pre-launch checklist, change URLs without redirect plan |
| **AI Use** | Accept unverified specs, deploy unvalidated schema, use AI for final legal copy |
