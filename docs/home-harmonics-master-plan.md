# HOME HARMONICS — MASTER PLAN & BUILD BRIEF

**Version:** 1.1 · October 2026 (confirmed inputs added in §0.6 and §19)
**Status:** Source of truth for the website rebuild. Supersedes the original brief and all earlier drafts.
**Owner:** Home Harmonics (founder: Yaz Scott)
**Current site:** https://www.home-harmonics.com (Wix, being replaced)
**Style reference (not to be copied):** BelArosa Chalet, https://www.belarosa-chalet.ch/en, plus the Refero capture in `docs/reference/belarosa-refero.md`

---

## 0. HOW TO USE THIS DOCUMENT (READ FIRST, CLAUDE CODE)

### 0.1 Precedence
1. This document wins over the BelArosa reference file wherever they conflict.
2. The BelArosa file is a **style reference for principles**, not a spec. Section 8.3 lists what to take and what to ignore. Do not copy its tokens, colors, radii, fonts, copy, layout, or assets.
3. If something here is unclear, choose the more restrained, more honest, more accessible option and leave a `{{TBD: …}}` note instead of inventing.

### 0.2 Non-negotiable rules
- **Never fabricate** press, reviews, awards, client names, credentials, partnerships, security claims, NDA usage, statistics, prices, or project details. Use `{{TBD: description}}` tokens.
- **Never present generated imagery as client work.** Every image carries a `truth` flag in the content model: `real_client_work`, `real_founder`, `real_process`, or `generated_atmosphere`. Generated images may not appear inside case studies, testimonials, "before/after," or any context implying a Home Harmonics result.
- **No fake ratings or review markup.** No star-rating widgets.
- **No doorway pages.** Do not create location pages that don't meet the test in §13.4.
- **Respect the claims ledger** (§7). Do not write a claim whose precondition isn't marked satisfied.
- **No scroll-jacking, no custom cursor, no 3D, no glassmorphism, no pills, no card grids, no drop shadows.**
- All indexable text must be present in the initial server-rendered HTML.

### 0.3 Placeholder policy
Build with placeholders. Use:
- Text: `{{TBD: what is needed}}`
- Images: a neutral limestone-colored block with a visible "placeholder" label in dev only, and `placeholder: true` in the content model.
- Prices: `{{TBD: starting price}}`

**Launch gate:** the production build must fail if any indexable page contains a `{{TBD` token or an image with `placeholder: true`. Staging may show them.

### 0.4 Suggested repo layout
```
/CLAUDE.md                              (short pointer to this document)
/docs/home-harmonics-master-plan.md     (this file)
/docs/reference/belarosa-refero.md      (style reference, read-only)
/docs/reference/original-brief.md       (optional context, superseded)
/media-masters/                         (full-res masters, NOT in /public)
/public/media/{hero,philosophy,services,move-in,process,details,founder,trade,work,social}/
```

### 0.5 Build order
1. Tokens, type, layout primitives, nav, footer, motion utilities.
2. Homepage with placeholders.
3. Service pages, `/where-we-work/`, `/investment/`, `/faq/`, `/trade/`, `/about/`, `/inquire/`.
4. Content model and CMS.
5. Forms, CRM and email integration, analytics.
6. SEO layer: metadata, schema, sitemap, robots, redirects.
7. Performance, accessibility, QA.
8. Swap in real content and media as it arrives.

### 0.6 Confirmed inputs (v1.1). These override any conflicting text elsewhere in this document.

**Founder and proof**
- Founder: Yaz Scott, **Certified Professional Organizer (CPO)**. Certification details and a verification link are needed: `{{TBD: CPO verification link}}`.
- Projects: 3–10 real projects exist. Permission to use the photos and videos is confirmed. The media is mostly phone-shot.
- At launch, use the best existing phone photography: crop to details, grade consistently, and extract stills from the portfolio videos. A professional interiors photographer is planned for **later** (Phase 2). Do not use generated imagery to fill the gap in case studies.

**Team and capacity**
- Yaz works **alone**. Do not write "team," "our crew," "vetted team," or "team of three." Use "Yaz" and "one accountable lead." Scope claims must describe what one person can finish.
- Availability while employed: **evenings and weekends**. Fit calls and walkthroughs are booked in evenings and weekends. Multi-day engagements are planned around weekends plus booked time off. Show lead time honestly: "Currently scheduling about `{{TBD: 4–6}}` weeks out."
- Response promise: **"We reply the same day."**
- Capacity reality: about 8 working days a month at roughly $600 a day is about $4,800 a month. Leaving the 9–5 requires higher-value projects, the product handling fee, trade referrals, price increases as demand exceeds the calendar, and eventually help.

**Insurance, contract, business setup**
- General liability insurance is in force and a written contract is in use. Out-of-state coverage is `{{TBD: confirm with insurer}}`, so do not claim it.
- No background-check or "vetted team" claims (solo operation).
- Google Business Profile is verified (5.0, 14 reviews; no hours or photos yet; description uses the old positioning). See §13.5a. A business-domain email exists. Replace the Gmail address everywhere on the new site.

**Pricing (public "begins at" minimums; never hourly)**
- Retire the $55/hr rate. Reason: attract higher-value clients and stop low-ball requests, dollar-store shopping requests, and stop-start projects.
- Single space: one full day, **about $600**.
- Whole-Home Organization: two days, **about $1,200**.
- Move-In Concierge: three days, **about $1,800**.
- Derived from $75/hr × 8 hours. Store these in one CMS setting so they can be raised in one edit.
- Actual prices are quoted by project after the walkthrough.
- **Travel:** accepted anywhere if the minimum is met. Minimum is **2 on-site days**. Travel and lodging billed at cost. `{{TBD: consider a higher day rate or flat travel fee, since travel days are unbillable}}`.
- **Products and supplies:** Yaz selects and buys; billed at **cost plus a handling fee** `{{TBD: percentage}}`. The product budget is approved in the design plan. The client does not direct purchases.
- **Deposit:** 50% to hold the dates `{{TBD: refundability terms}}`.
- **Consultation:** free 15-minute fit call, then a free 30–45 minute walkthrough (in person or virtual). No paid consultation for now. The minimums and deposit are stated on the form **before** the call is booked.
- **Stop-start protection:** engagements are scheduled in consecutive blocks. Pausing is allowed only as the contract specifies `{{TBD: contract language}}`.

**Other decisions**
- Second homes: no current clients have them. Not a headline offer; FAQ only.
- Fonts: launch with the free fallbacks (Newsreader, Hanken Grotesk). Revisit paid faces later.
- Travel claims: "Texas and beyond; engagements elsewhere by arrangement." Avoid "nationwide" as a headline until there is proof beyond Texas and Colorado Springs.

---

## 1. BUSINESS CONTEXT

**What it is today:** a Dallas-based professional home organizer with a Wix site, hourly pricing, and a broad services list (including garage sales, car organization, and senior downsizing).

**What it is becoming:** a private home organization and move-in setup company for affluent households. Dallas–Fort Worth is the home base. The business also travels to clients across Texas and beyond. The founder has already traveled for clients across Texas and to Colorado Springs.

**Objective:** generate enough sustainable revenue that the founder can leave her 9–5 and run Home Harmonics full-time.

**Constraint:** the founder currently works full-time elsewhere. Every operational promise on the site (response time, multi-day engagements, availability) must match real capacity.

**Illustration (replace with real numbers):** to replace a salary after costs and taxes, say $150K revenue. At a $5K average project that is about 30 projects a year. At 40% consultation-to-close and 65% inquiry-to-consultation, that needs about 10 qualified inquiries a month. At a $9K average (mostly Move-In), it is about 5–6. The target is a few right-fit inquiries each month, not traffic volume.

**Current-site issues to fix (found in audit):**
- Commodity H1 ("Professional Home Organizing Services in Dallas-Fort Worth") and hourly "Book Now."
- Services list includes off-brand items: garage/estate sales, car organization, craft rooms, paper/digital filing, senior downsizing.
- Trust leaks: footer address contains "PMB" (appears to be a private mailbox), Gmail business email, © 2024, default Wix empty state ("No Collections Here") live on the homepage, privacy/terms pages at `/blank` and `/blank-2`, typos ("General Consulation," "head about us," "Home Harmics").
- Six generic testimonials (first name + initial, no project, home type, or area).
- 16 near-duplicate city pages (including two `copy-of-` URLs) that reuse the homepage hero and don't mention the city in their content. Several cities (Waxahachie, Mansfield, Grand Prairie) contradict the target market.
- Generic "Latest Tips" posts.
- Real assets worth keeping: portfolio videos (primary bathroom, kids' bedroom and closet, kitchen pantry). Keep the sources and extract stills.

---

## 2. STRATEGIC DECISIONS (WHAT CHANGED FROM THE ORIGINAL BRIEF AND WHY)

### 2.1 Kept
Positioning shift to private home organization and move-in setup; "the product is not organization" (time, calm, control without management); quiet vocabulary; the truth rule; real-versus-generated separation; Move-In Concierge as flagship; "A Letter from Yaz"; a dedicated trade experience; slow weighted motion; performance as a luxury cue; project-based pricing; case studies; "Request a consultation" instead of "Book Now"; Google Search as the first paid channel; privacy as a stated practice.

### 2.2 Modified
| Original | Now | Why |
|---|---|---|
| Hero H1 "An effortlessly ordered home…" | H1 "Your home, already handled." with a descriptor eyebrow; the original line becomes the subhead | Needs a noun for search and first-time clarity; "already handled" is ownable |
| "The House Exhales" as visible hero | Internal pacing principle only; "Already handled" is visible | A house can't exhale; reads precious |
| "Request a Private Consultation" | "Request a consultation"; secondary "See our work" | "Private" is redundant |
| Whole-Home Harmonization | Whole-Home Organization | Searchable name |
| Private Home Maintenance, invitation-only | Seasonal Resets, offered to every project client | Recurring revenue is core; exclusivity is premature |
| Six-step method | Five steps, each with a deliverable | Proprietary and credible |
| 40/35/25 direct/implied/atmospheric | Generated library ~70% atmospheric/material, 20% implied, 10% direct (concept only); direct results are real photography | AI is weakest at small organized objects |
| Before/after interaction | Case-study pages only, with consent, framed as "starting point → result" | Messy "befores" can feel shaming |
| Private Portfolio access | One honest line on the Work page | Not enough projects to gate |
| Client Access | Footer link to the project tool's client portal | Don't build a portal as theater |
| Free consultation | Free 15-minute fit call, then a free 30–45 minute walkthrough, with minimums and deposit stated before the call is booked (paid consultation deferred) | Filters low-fit leads without a fee |
| Seven neighborhood pages | One `/where-we-work/` page; neighborhood or city pages only when the §13.4 test is met | Doorway-page risk |
| White-label trade execution | Co-branded; white-label only if a partner asks | Preserves referral and proof value |
| Hidden pricing | Publish "begins at" prices and the factors that move them | Qualifies leads; gives AI concrete numbers |
| Lead magnet at launch | Deferred (candidate: "The Move-In Timeline") | Not needed for the primary funnel |

### 2.3 Removed
Custom cursor; instant "Book Online" and hourly-rate buttons; garage sales/estate sales, car organization, craft rooms, paper/digital filing; the 16 duplicate city pages; the generic tips posts; generated images depicting organization results; invitation-only language; Private Portfolio access flow; "bespoke/curated/elevated/luxury" as self-description. Senior downsizing is deferred, not rejected.

### 2.4 Added
Claims ledger; operations gate; proof-production plan (founding projects, photo-consent tiers, capture SOP); delegate-buyer path (assistants, house managers); Google Business Profile as a service-area business; review-request step at day 14; migration and redirect plan; CRM and proposal tool; honest availability messaging; travel engagement model (§4).

---

## 3. POSITIONING, AUDIENCE, VOICE

### 3.1 Positioning
Home Harmonics sets up homes so they run quietly. It is private home organization and move-in setup, handled by one accountable lead, designed around how the household lives. The category is **home organization and move-in setup**. "Concierge-level" describes the quality of service and is not the category.

**Entity sentence (use consistently on the site, Google Business Profile, social, and listings):**
> Home Harmonics is a Dallas–Fort Worth-based home organization and move-in setup company that travels to clients across Texas and beyond.

**Brand promise:** Your home should function as beautifully as it looks. Time returned, with nothing to manage.

### 3.2 Audience
- **A. Transition households (priority):** new build or renovation handovers, relocations, closings. Deadline-driven.
- **B. Established households with complexity:** whole-home resets, new babies, kids' transitions.
- **C. Referral partners:** interior designers, architects, custom builders, luxury realtors, relocation professionals, household managers.
- **D. Delegates:** assistants and house managers who hire for A and B. They need forwardable summaries, clear price and scope, insurance statements, and scheduling clarity.

Do not mention home values on the site.

### 3.3 Emotional goals
Visitors should think: "They've thought of everything." "I would trust them in my home." "I don't have to manage this." Optimize around trust, discretion, competence, relief, aesthetics, and control without management.

### 3.4 Personality
Composed, attentive, unhurried, exacting but warm. A very good household manager with a designer's eye.

### 3.5 Voice rules
- Plain nouns, short sentences, specific numbers.
- No status adjectives. Never shame clients about disorder.
- Concrete over abstract: "a labeled linen closet," not "elevated storage."
- Candid where it builds trust.
- Prefer: thoughtful, considered, private, effortless, harmonious, intentional, discreet, complete, designed around your life.
- Avoid: declutter, tidy, bins, hacks, bespoke, curated, elevated, exclusive, premium, luxury (as self-description).

**Draft copy (direction only, requires founder approval):**
- Hero H1: "Your home, already handled." Subhead: "An effortlessly ordered home, designed around the way you live."
- Statement: "Your home should support your life — not quietly demand more from it."
- Move-In: "You don't move in. You arrive." / "Walk into a home that's ready to live in."
- Trade: "You create the home. We make it beautifully livable."
- Footer line: "Atmospheric imagery on this site is digitally created. Project photography is of real Home Harmonics work."

---

## 4. GEOGRAPHY AND TRAVEL MODEL

### 4.1 Positioning
Dallas–Fort Worth is the home base and the local SEO anchor. Travel is a defined offer, not a vague "we serve everywhere."

### 4.2 What may be claimed
| Claim | Status |
|---|---|
| Based in Dallas–Fort Worth | True |
| Across Texas | True (statewide work to date) |
| Colorado Springs | True; city-level mention only with client consent |
| Nationwide | Not yet. Use "Texas and beyond, by arrangement." |

### 4.3 Travel engagement structure
- Virtual design consultation first (the "Listen" step by video).
- Scoped on-site residency of several days.
- Remote follow-up and a 30-day check-in.
- Minimum engagement outside DFW: **2 on-site days** (confirmed).
- Pricing: "Travel engagements require a minimum of two on-site days. Travel and lodging are billed at cost." `{{TBD: dollar figure or higher day rate}}`
- Deposit: 50% to hold the dates (confirmed). `{{TBD: refundability once travel is booked}}`
- Published travel windows (for example, "Traveling to Austin in April") appear only if they can be fulfilled.

### 4.4 Where travel fits best
1. Move-In Concierge for relocations and new builds in other cities.
2. Second homes: not a headline offer (no current clients have them). Keep as a FAQ answer only.
3. Trade partners with out-of-market projects.
4. Texas hubs first (Austin, Houston, San Antonio) before treating the whole country as one market.

### 4.5 Operations to settle before promising travel (confirm with a lawyer and accountant)
Out-of-state liability insurance coverage; governing-law clause in the service agreement; any tax or registration requirement for out-of-state work; who works on site (founder only, traveling lead plus local hires, local subcontractors) and their vetting; supplies and procurement (shipped versus sourced locally); donation and haul-away in unfamiliar cities.

### 4.6 Site implications
- `/where-we-work/` replaces a generic service-area page, with three tiers: Home base (DFW), Texas, Beyond Texas.
- Hero eyebrow: "Home organization & move-in setup · Based in Dallas–Fort Worth." Supporting line: "Traveling to homes across Texas and beyond."
- Form captures home location and home type (§12.2); out-of-area inquiries receive a different auto-reply.
- Google Business Profile stays DFW-centered; do not add far-away service areas to it (verify current Google guidelines).
- Homepage title tag and keyword focus stay on Dallas.
- Analytics segment by home location; track travel revenue, travel cost per job, and margin.

---

## 5. SERVICES

1. **Move-In Concierge (flagship).** Pre-move planning, unpacking and setup of kitchen, pantry, closets, kids' spaces, linens, and baths, plus sourcing, labeling, and haul-away. Remote planning is possible for travel engagements.
2. **Whole-Home Organization.** Assessment, edit, system design, sourcing, install, and a care guide.
3. **Signature Spaces.** Hub page with dedicated pages for wardrobes/closets and for pantries/kitchens. Offices, playrooms, and laundry stay on the hub. Garage is not featured.
4. **Seasonal Resets.** Wardrobe transitions, pantry reset, holiday reset, post-travel reset. Sold to every project client at proposal time.
5. **Travel Engagements.** A delivery model for 1–3 (§4), not a separate service.

**Pricing display (confirmed):** never show an hourly rate. Each service page shows its minimum: single spaces begin at one day (about $600), Whole-Home at two days (about $1,200), Move-In at three days (about $1,800), travel engagements at two on-site days with travel and lodging at cost. Also state the factors that affect price (home size, scope, timeline, sourcing, travel), that products are billed at cost plus a handling fee, and that a 50% deposit holds the dates. `/investment/` consolidates this.

**Process for individual services:** fit call (15 min, free) → free walkthrough (30–45 min, in person or virtual) → proposal → 50% deposit → project in consecutive scheduled blocks → review request (day 14) → Seasonal Resets offer (day 30).

---

## 6. THE HARMONICS METHOD (FIVE STEPS)

| Step | What happens | Deliverable |
|---|---|---|
| 1. Listen | Walk the home, discuss routines, frequency of use, flow, accessibility, and who needs what | Household profile |
| 2. Edit | Decide what stays, goes, donates, or moves | Edit list, donation and removal |
| 3. Design | System plan, product and cabinetry-fit specs, sourcing list | Design plan for approval |
| 4. Install | Source, install, label, set up | Finished spaces |
| 5. Hand over | Walkthrough, care guide, 30-day check-in | Care guide, offer of Seasonal Resets |

Variables considered: household behavior, frequency of use, spatial flow, family routines, storage capacity, accessibility, aesthetics, maintenance. Visual treatment: a sticky numeral beside scrolling text and a real process detail image per step. Not six identical cards.

---

## 7. CLAIMS LEDGER (TRUTH AND CREDIBILITY)

A claim may appear on the site only when its precondition is true. Track status in `content/claims.json` with `satisfied: true|false`. Build must not render a claim whose flag is `false`.

| Claim | Precondition |
|---|---|
| "Insured" | Policy in force; certificate available |
| "Vetted team" / "background-checked" | Checks done for everyone entering a home |
| "Confidentiality arrangements available" | Lawyer-reviewed NDA template exists |
| "Private residences" / "estates" | Work done there, with consent to reference |
| "Custom sourcing and procurement" | Vendor accounts or approved sourcing process, with pricing and markup rules |
| "Trusted by designers and builders" | Named partners who agree to be named |
| Press, awards, credentials, professional membership | Real, verifiable, linkable |
| Photos or video "from client projects" | Written consent on file at the right tier |
| "5.0 on Google · 14 reviews" | The number matches the live profile on the day of publishing, and the reviews are genuine client reviews |
| Quoted client reviews or testimonials | Reviewer's written permission on file |
| "We reply the same day" and availability messaging | Confirmed same-day reply is achievable (evenings and weekends); lead time must be kept current |
| "Insured for work in other states" | Policy confirmed to cover it |
| Travel windows | Actually scheduled |

**Operations gate (before launch):** general liability insurance; background checks for anyone entering a home; written service agreement with a confidentiality clause and photo-consent tiers (none / anonymized details only / full residence); deposit policy; key and alarm-code handling protocol; vendor and sourcing rules; business email domain (not Gmail); real business address policy (service-area business, address hidden if a mailbox).

**Privacy messaging (allowed now):** "Client privacy is fundamental to our work." Add "Confidentiality agreements are available on request" only after the ledger item is true. State the photo policy: nothing is photographed or shared without written consent.

**Proof production plan:**
- **Launch (Phase 1):** curate the best existing phone photography and video stills, with consent confirmed. Crop to details and process, grade consistently, and present one or two projects well rather than many thinly.
- **Phone capture SOP for every new job:** tripod or steady surface, natural light with lamps on only if warm and consistent, no flash, standard (1x) lens, level verticals, and for each space a wide frame, two or three details, and a process shot.
- **Phase 2:** hire a professional interiors photographer for one project (confirmed as "later"). Consider a founding project sourced through a designer or builder `{{TBD: business decision}}`.
- Include a photo-consent tier in every service agreement.

---

## 8. VISUAL SYSTEM

### 8.1 Principles
Quiet luxury, residential, architectural, editorial, warm, tactile, timeless, private. Overlap of elite interior design, architectural publishing, boutique hospitality, and private residential service. Space is a luxury cue: restrained content density, deliberate image scale, slow pacing. Photography does the work; typography does the luxury.

### 8.2 Tokens (starting values; tune against real photography)

```css
:root {
  /* Color */
  --alabaster: #F3EFE8;   /* primary canvas */
  --limestone: #E4DDD0;   /* alternate bands */
  --taupe:     #8C7B6B;   /* decorative / large type only */
  --walnut:    #3B2A21;   /* dark bands, hover fills */
  --ink:       #1E1B18;   /* body text */
  --sage:      #7D8570;   /* single accent; ~3.4:1 on alabaster, so large type/decoration only */

  /* Shape */
  --radius: 0px;          /* max 2px anywhere; no pills */
  --rule: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
  /* No shadows. */

  /* Spacing (8px base) */
  --space-section-desktop: clamp(96px, 12vw, 160px);
  --space-section-mobile: 64px;

  /* Motion */
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  --t-ui: 300ms;
  --t-reveal: 900ms;
}
```
Rhythm: alabaster → limestone → one walnut band → alabaster. Not everything dark. Avoid generic beige, gold gradients, fake marble, neon, cold corporate white.

**Contrast:** all text pairs must pass WCAG AA (4.5:1 body, 3:1 large). Ink on alabaster passes. Taupe and sage must not be used for body text.

**Typography:**
- Display: high-contrast editorial serif. Candidates: Canela or GT Sectra (paid), Newsreader (free fallback). Light/regular weight, italics for emphasis.
- Body: precise neutral sans. Candidates: Suisse Int'l or Neue Montreal (paid), Hanken Grotesk (free fallback). Avoid Inter.
- Microtext: uppercase tracked sans (about 0.12–0.16em).
- Licensing and pricing for paid faces `{{TBD: verify before purchase}}`.
- Self-host WOFF2, subset, two families, `font-display: swap`, preload only the display face used above the fold.
- Fluid scale with `clamp()`. Large editorial headlines, deliberate line breaks, large numerals, restrained captions.

**Components:**
- **Buttons:** rectangular. Primary is solid walnut (or ink) with an alabaster label. Secondary is a text link with a thin underline and arrow. Hover: slow left-to-right fill.
- **Eyebrow + serif headline** pairing as the editorial structure.
- **Service index:** large rows, each a link; no cards.
- **Forms:** simple labels, thin rules, large touch targets.
- **Overlay menu:** desktop shows a detail image per item (hands, linen, hardware, walnut); mobile is text-only.

### 8.3 BelArosa translation (principles only)

**Take:**
| Principle | Home Harmonics version |
|---|---|
| One idea per screen (~60 words) | Each homepage section has one job |
| Eyebrow + serif headline | Lighter, higher-contrast serif than BelArosa |
| Detail-led menu imagery | Hands, linen, drawer hardware, walnut, not whole rooms |
| Candid voice and concrete specifics | Numbers only when true |
| One persistent conversion action | "Request a consultation," sticky on mobile |
| Flat, shadowless, hairline surfaces | Adopt |
| Alternating bands | One walnut band instead of teal throughout |
| Honest scarcity | "Currently scheduling for `{{TBD: month}}`" only if true |

**Ignore (conflicts with this plan):** pill-shaped outlined buttons; teal, gold, and alpine imagery; bold transitional serif (Giovanni); dark full-bleed everywhere; instant booking; destination photography; offers/jobs/gift vouchers/limousine navigation; BelArosa's exact layout, copy, logo, and assets. The Refero file's `--radius-full: 80px`, color tokens, and font tokens are **not** to be used.

Why: a hotel sells a place you go to be cared for. Home Harmonics sells that same feeling inside the home you already live in, with proof and consent challenges a hotel doesn't have.

### 8.4 Photography language
Architectural wide compositions, material macros, negative space, soft natural light, deep but preserved shadows, editorial cropping, subtle human presence, quiet gestures, high realism.

**Visual world:** sophisticated contemporary Dallas residence, warm modern architecture. Materials: alabaster plaster, limestone, honed stone, dark walnut, pale oak, linen, wool, suede, glass, brushed metal, architectural cabinetry. "Dallas cues": limestone, steel-framed glazing, live-oak shadow, pale plaster, pecan and walnut.

**Avoid:** generic white McMansion interiors, gaudy wealth, excessive marble, Instagram-mansion or Pinterest-organization aesthetics, bright influencer kitchens, plastic bins as the visual identity, AI-looking architecture.

Organization is shown through custom divisions, spacing, cabinetry, wardrobes, linen systems, glass vessels, integrated storage, quiet labeling, and negative space.

### 8.5 Motion
- Slow, weighted, fluid, deliberate. Reveals 600–1100ms; UI 250–400ms; one shared easing curve.
- **Allowed:** masked image reveals, gentle image settle (about 1.06 → 1.0 over ~1.6s), subtle text reveals, crossfade page transitions (View Transitions API with plain fallback), sticky imagery on desktop only, restrained hover fills.
- **Not allowed:** bounce, scroll-jacking, overscroll gimmicks, constant parallax, 3D for its own sake, custom cursor.
- Respect `prefers-reduced-motion` (reveals become instant), `Save-Data`, and provide a pause control for any autoplaying video over five seconds.

---

## 9. INFORMATION ARCHITECTURE

### 9.1 Navigation
**Primary:** Services · Work · About · For the Trade · [Request a consultation]
**Services menu:** Move-In Concierge · Whole-Home Organization · Signature Spaces · Seasonal Resets · Travel Engagements (links to `/where-we-work/`)
**Footer:** Investment · FAQ · Where we work · Journal (also moves into primary nav once it has 6 articles) · Privacy · Terms · Client Login (external link to the project tool) · Contact details · the generated-imagery note.

### 9.2 Production sitemap (about 17 pages + 4 launch articles)

| URL | Purpose |
|---|---|
| `/` | Homepage |
| `/services/` | Overview and comparison of the four services |
| `/services/move-in-concierge/` | Flagship |
| `/services/whole-home-organization/` | |
| `/services/signature-spaces/` | Hub |
| `/services/closet-and-wardrobe-organization/` | Spoke (high-intent) |
| `/services/pantry-and-kitchen-organization/` | Spoke (high-intent) |
| `/services/seasonal-resets/` | Recurring revenue |
| `/work/` | Index |
| `/work/[project]/` | One page per real, consented project |
| `/about/` | The Letter from Yaz, credentials |
| `/trade/` | Designers, architects, builders, realtors, relocation, household managers |
| `/investment/` | Pricing starting points and factors |
| `/faq/` | Answer-first FAQ |
| `/where-we-work/` | DFW home base, Texas, Beyond Texas, travel model |
| `/inquire/` | Form |
| `/journal/` + 4 articles | Expertise |
| `/privacy/`, `/terms/` | Real policies |

### 9.3 Do not index
Thank-you pages, form step 2, client portal, staging, search and tag archives, UTM variants (canonicalize), duplicates.

### 9.4 Redirects from the old Wix site (301), keep Wix live until DNS cutover
| Old | New |
|---|---|
| `/service-areas` and all 16 `/professional-organizer-*` city pages (including `copy-of-` URLs) | `/where-we-work/` |
| `/home-organization`, `/home-organization/decluttering-services-dallas` | `/services/whole-home-organization/` |
| `/closet-organization-dallas` | `/services/closet-and-wardrobe-organization/` |
| `/pantry-organization-dallas` | `/services/pantry-and-kitchen-organization/` |
| `/unpacking-services-dallas` | `/services/move-in-concierge/` |
| `/garage-organization-dallas` | `/services/signature-spaces/` |
| `/book-online` | `/inquire/` |
| `/portfolio`, `/testimonials` | `/work/` |
| `/trusted-vendors` | `/trade/` (review its content first) |
| `/faq` | `/faq/` |
| `/post/*` | `/journal/` |
| `/blank`, `/blank-2` | `/privacy/`, `/terms/` |

---

## 10. HOMEPAGE STORYBOARD

General rules: each section has one job and about 60 words. Draft copy is direction only. If real proof isn't available for a section, omit the section rather than fill it with generated imagery.

### 01 Hero
- **Purpose:** state what this is, who it's for, and the feeling, in five seconds.
- **Copy:** H1 "Your home, already handled." with an eyebrow span inside the H1: "Home organization & move-in setup · Based in Dallas–Fort Worth." Subhead: "An effortlessly ordered home, designed around the way you live." Supporting line: "Traveling to homes across Texas and beyond."
- **Layout:** asymmetric. Text in a calm lower-left column; image spans the right two-thirds and bleeds to the edge. Not a centered headline over a darkened image.
- **Assets:** G01/G02 (generated architecture still or light-only loop), replaced or complemented by real photography when available. Mobile uses G03/G04, art-directed.
- **Type:** large light serif, deliberate line break after "Your home,"; descriptor in tracked uppercase sans.
- **Background:** alabaster.
- **Motion:** image settles in; loop runs slow with no people or hands; pauses on reduced-motion or save-data.
- **CTA:** "Request a consultation" (solid), "See our work" (text link).
- **SEO:** H1 and subhead carry service and market terms.
- **Mobile:** art-directed 4:5 crop; short headline; full-width CTA; sticky bottom bar (CTA + tap-to-call) after the hero.
- **Transition:** slow crossfade into empty alabaster space.

### 02 Statement
- **Copy:** "Your home should support your life — not quietly demand more from it." About 50 words on behind the doors, inside the drawers, within the wardrobe.
- **Layout:** single offset column, wide empty field, a small detail image.
- **Asset:** G05 (walnut drawer/hardware macro).
- **Type:** large serif with one italic phrase.
- **Motion:** line-by-line text reveal.
- **CTA:** none.
- **Mobile:** text first, image below.

### 03 Selected Work (omit if no real project exists yet)
- **Purpose:** real proof before asking for anything.
- **Copy:** project name (for example "A primary wardrobe"), three lines: challenge, what was done, result. Area and home type only with consent.
- **Layout:** one large real photograph (~70% width) with a smaller detail image offset beneath.
- **Assets:** C01 / R06.
- **Type:** serif title, tracked metadata line (space, scope, duration).
- **Background:** limestone.
- **Motion:** masked reveal.
- **CTA:** "View the project."
- **SEO:** entity-rich first-party content; alt text describes what was actually done.
- **Mobile:** full-bleed stacked, tap to open.

### 04 Services
- **Layout:** large editorial index, three tall rows (Move-In Concierge, Whole-Home Organization, Signature Spaces), each with title, one line, and a detail image revealed beside it. Seasonal Resets appears as a text line below. No cards.
- **Assets:** real details (R06) or generated material plates (G06).
- **Type:** serif row titles, tracked "01 / 02 / 03" index.
- **Motion:** row image slides in on hover; underline draws left to right.
- **Interaction:** the whole row is a link.
- **SEO:** descriptive internal links to the hub and spokes.
- **Mobile:** stacked blocks with the image above.

### 05 Move-In Concierge
- **Copy:** "You don't move in. You arrive." / "Walk into a home that's ready to live in." A few concrete scope lines.
- **Layout:** full-bleed walnut band, sticky text column, three stills that scroll past on the right (empty residence → mid-setup → finished room).
- **Assets:** G08, then real move-in details. G09 (generated film) is P2.
- **Type:** serif headline, tracked step labels ("Before the move / Move day / The day after").
- **Motion:** sticky scroll on desktop only; crossfades.
- **CTA:** "Plan a move-in."
- **SEO:** "unpacking service Dallas," "move-in setup."
- **Mobile:** stacked stills, no sticky behavior.

### 06 The Harmonics Method
- **Layout:** sticky oversized numeral on the left, five steps stepping through on the right, each with a real process detail image.
- **Assets:** R05.
- **Motion:** numeral crossfades as steps change.
- **CTA:** none; a subtle link to `/investment/`.
- **Mobile:** vertical list, numerals inline.

### 07 A Letter from Yaz
- **Layout:** vertical portrait with a text column; a 60-word excerpt of the real letter.
- **Assets:** R01/R02 (real founder photography).
- **Background:** limestone.
- **CTA:** "Read the full letter" → `/about/`.
- **SEO:** founder entity, Person schema on `/about/`.
- **Mobile:** portrait first, then text.
- **Rule:** do not fabricate biography. Write from a real interview.

### 08 Voices
- **Layout:** one large quote at a time, attribution below (first name or initials, project type, area).
- **Type:** large serif italic.
- **Motion:** slow crossfade.
- **Interaction:** prev/next, keyboard accessible.
- **Rule:** only approved quotes with project context. No star widget. No review markup.

### 09 How We Begin
- **Copy:** three beats: a short fit call, an in-home or virtual design consultation, then a proposal. Starting price per service. One row: "Based in Dallas. Working where you are."
- **Layout:** three-column text row separated by thin rules. Not cards.
- **Background:** limestone.
- **CTA:** "See what engagements look like" → `/investment/`.

### 10 For the Trade
- **Copy:** "You create the home. We make it beautifully livable."
- **Layout:** slim split band, text left and detail image right.
- **Asset:** G10 (later, a real collaboration image).
- **CTA:** "For designers and builders" → `/trade/`.

### 11 Inquire
- **Copy:** "Tell us about your home." Reassurance: we reply the same day, discreet, no obligation. Minimums stated near the form.
- **Layout:** two columns; intro on the left, form step 1 inline on the right.
- **Background:** walnut band.
- **CTA:** "Request a consultation."
- **Mobile:** single column, large touch targets, tap-to-call.

### Footer
Quiet and typographic: name, phone, business email, "Dallas–Fort Worth home base · Travel engagements across Texas and beyond," footer links (§9.1), and the generated-imagery note.

---

## 11. SECONDARY PAGE SPECS

Each page uses the eyebrow + serif headline system, one idea per screen, and the same CTA behavior.

- **Service pages:** plain definition in the first 50 words, scope checklist, typical duration and team size (`{{TBD: real figures}}`), starting price, five-step method, real project examples, FAQ (answer-first), CTA.
- **`/investment/`:** starting prices per service, travel pricing, factors that affect price, what's included and excluded, how the free walkthrough works, how to forward this page to an assistant or house manager (a one-page summary download).
- **`/work/` and `/work/[project]/`:** case study format: residence type and area (consent only), challenge, scope, strategy, spaces, systems, measured results (hours, rooms, items donated), client quote, credited photography. One honest line on the index: "Many of our homes are never photographed. Fuller walk-throughs are shared during consultation."
- **`/about/`:** "A Letter from Yaz" from a real interview, portrait set, credentials and memberships (real ones only), approach to privacy.
- **`/trade/`:** "You create the home. We make it beautifully livable." Post-install organization, move-in completion, client handoff, wardrobe and pantry setup, project support, out-of-market projects ("Your project is in another city. We come to you."). Co-branded handoff, one-page PDF referral kit, trade inquiry form. Do not display partner names or logos unless real and approved.
- **`/where-we-work/`:** three tiers (Home base: DFW; Texas; Beyond Texas). Explains the travel model (§4.3), minimums, lead time, travel windows (if any), and how to start. FAQ: "Do professional organizers travel?", "Can I hire an organizer for my second home?", "Do you work outside Dallas?"
- **`/faq/`:** the ten questions in §13.6 with 40–60-word answers first, then details. Dates on "last reviewed."
- **`/inquire/`:** form (§12.2), phone number, response-time promise ("We reply the same day"), and a calendar link for the fit call.

---

## 12. CONVERSION ARCHITECTURE

### 12.1 Funnel
Visitor → inquiry → fit call → free walkthrough → proposal (about two business days) → 50% deposit → project → day-14 review request and referral ask → day-30 Seasonal Resets offer.

Use a project tool (HoneyBook, Dubsado, or HubSpot free tier) for proposals, contracts, deposits, and client communication. Do not build a custom portal.

### 12.2 Inquiry form (two steps)
**Step 1 (required; saved immediately):** name, email, phone, what you need (Move-in / Whole-home / A specific space / Ongoing / Not sure), timeline (including "my move or closing date"), home location (city and state), home type (Primary home / Second home / Moving into).

**Step 2 (optional; after step 1 is already captured):** residence type, approximate size, who referred you (designer or builder name), photo upload, goals note, and an optional "investment comfort" select with "I'd like guidance."

**Behavior:** spam protection (Cloudflare Turnstile), auto-reply with a calendar link for a 15-minute fit call, a noindexed confirmation page stating what happens next, hidden fields for UTM parameters and click IDs written to the CRM. Out-of-area inquiries (home outside DFW) get an auto-reply covering minimum engagement, lead time, travel pricing, and next travel window if one exists.

### 12.3 Trade inquiry
Fields: name, firm, role (designer, architect, builder, realtor, relocation, household manager, other), project location, project timeline, short note.

### 12.4 CTA usage rules
| Action | Use | Don't use |
|---|---|---|
| Request a consultation | Hero, service pages, Investment, footer, sticky mobile bar | As the main button on `/trade/` |
| See our work | Hero secondary; after proof sections | On `/inquire/` |
| Trade inquiry | `/trade/`, nav, footer, slim homepage band | Consumer service pages |
| Private Portfolio Access | Not at launch | Anywhere |
| Client Access | Footer text link | Primary nav |
| Newsletter | Footer and end of journal articles | Popups |

### 12.5 Traffic sources
| Source | Landing | Primary conversion |
|---|---|---|
| Google Search | Matching service page | Inquiry form |
| Google Business Profile | Home or service page | Call or form |
| Trade referral | `/trade/` | Trade inquiry |
| Instagram / social | `/work/` or case study | Inquiry form |
| Past clients / word of mouth | Home or `/inquire/` | Inquiry or reset booking |
| AI-assisted discovery | `/investment/`, `/faq/`, service pages | Inquiry form |

### 12.6 KPIs
Qualified inquiries, consultation show rate, proposals sent, close rate, average project value, booked and collected revenue, lead source, partner referrals, cost per qualified lead, repeat and Seasonal Resets revenue, share of revenue from travel engagements, travel cost per job, margin on travel versus local work. Not follower count or pageviews alone.

---

## 13. SEO, LOCAL, GEO, AEO

### 13.1 Metadata templates
- Home: `Home Organization & Move-In Setup in Dallas–Fort Worth | Home Harmonics`
- Service pages: `[Service] in Dallas–Fort Worth and Texas | Home Harmonics`
- Case studies: `[Project name] — [Space/scope] | Home Harmonics`
Each page has a unique title, meta description, canonical URL, Open Graph and Twitter metadata, and breadcrumbs where useful.

### 13.2 Page intent map
| Page | Primary / secondary intent | AI-answer opportunity | Unique content required |
|---|---|---|---|
| `/` | Brand, "professional organizer Dallas" / move-in setup | "Who offers move-in setup in Dallas?" | Descriptor, real proof, clear service definition |
| `/services/move-in-concierge/` | "unpacking service Dallas," "move-in setup" / new-home organization | "What is move-in concierge service? What's included in unpacking?" | Scope checklist, typical duration and team size, price, timeline |
| `/services/whole-home-organization/` | "whole home organization Dallas" / cost, duration | "How long does whole-home organization take?" | Method, scope, price range |
| `/services/signature-spaces/` | Hub for spaces | "What spaces can a professional organizer handle?" | Short intros with links |
| `/services/closet-and-wardrobe-organization/` | "closet organization Dallas" / custom closet systems | "How does a professional organize a custom closet?" | Real closet work, systems, price range |
| `/services/pantry-and-kitchen-organization/` | "pantry organization Dallas" | "How do you organize a pantry?" | Real pantry work, systems, price range |
| `/services/seasonal-resets/` | "ongoing home organization," "seasonal wardrobe changeover" | "Can organization be maintained after the project?" | What a reset includes, frequency, pricing |
| `/investment/` | "how much does a professional organizer cost Dallas" | "How much does whole-home organization cost?" | Real prices and factors |
| `/where-we-work/` | "professional organizer [area]," "organizer who travels" | "Do professional organizers travel?" | Real tiers, travel model, honest limits |
| `/trade/` | "organizer for interior designers," builder handover | "Can an organizer work with my interior designer?" | Referral process, co-branded handoff, PDF |
| `/about/` | Founder trust | "Who runs Home Harmonics?" | Real letter and credentials |
| `/work/[project]/` | Proof | "What does a professional organization project look like?" | Real, consented case study with measured results |

### 13.3 Keywords
Do not finalize keywords without research. Seed themes: professional organizer Dallas, move-in/unpacking service Dallas, whole-home organization, closet and pantry organization, organizer who travels. Validate with real search data before paid campaigns.

### 13.4 Location pages
No thin or doorway pages. Create a neighborhood or city page only when it has: at least one real project or a documented local reason to exist, original photos, specific FAQs, a real testimonial, and facts you can stand behind. A Colorado Springs page becomes a candidate once a consented project exists, framed as "Dallas-based, traveling to Colorado Springs." Note that University Park and Highland Park are separate municipalities, and Southlake, Westlake, and Colleyville sit in different counties.

### 13.5 Local SEO
Google Business Profile as a service-area business centered on DFW (hide the address if it's a mailbox; verify current guidelines). Consistent name, phone, description, and service areas on Google Business Profile, Apple Business Connect, Bing Places, Houzz, LinkedIn, and any professional association listing. Review-request step at day 14.

### 13.5a Google Business Profile (observed from screenshots, October 2026)

**Observed:** name "Home Harmonics"; category "Professional organizer"; 5.0 rating from 14 Google reviews; website and phone listed; no street address shown (consistent with a service-area setup); no hours; no photos yet (Yaz will add them); the description still uses the old positioning (decluttering, garage organization, "busy families and professionals"). No owner replies are visible. All 14 reviews carry the same relative date (about three months ago). Service areas and secondary categories were not visible: `{{TBD: confirm}}`.

**Owner actions (not part of the site build):**
- **Description:** replace with the new positioning. Draft (check the character limit): "Home Harmonics is a Dallas–Fort Worth-based home organization and move-in setup company led by Certified Professional Organizer Yaz Scott. We plan, source, and install organization systems for wardrobes, pantries, kitchens, and whole homes, and set up new homes for move-in. We travel to clients across Texas and beyond."
- **Hours:** set the hours Yaz can actually take calls and appointments (evenings and weekends) `{{TBD}}`.
- **Photos:** upload 10–20 real project photos, plus a logo and cover photo. Never stock or generated images on the profile.
- **Services list:** Move-In Concierge, Whole-Home Organization, Closet & Wardrobe Organization, Pantry & Kitchen Organization, Seasonal Resets. Remove garage organization and generic decluttering emphasis.
- **Categories:** keep "Professional organizer" as primary; add relevant secondary categories if Google offers them.
- **Links:** website → homepage; appointment link → `/inquire/`; both with UTM parameters.
- **Reviews:** reply to every review in the brand voice, briefly and specifically. Request a review at day 14 after each project, and invite the client to mention the space and what changed. Aim for a steady cadence, not batches.
- **Consistency:** name, phone, description, and service areas must match the site exactly.

**Use of reviews on the site**
- One quiet line such as "5.0 on Google · 14 reviews," linking to the profile. Keep it accurate (manual check or periodic update). No star widget and no review markup.
- Quote a review on the site only with the reviewer's written permission; otherwise link to Google.
- Candidate quotes, **pending written permission**, by theme: move and unpacking (Kennedy Osborne) → Move-In page; pantry transformation (Samara Cook) → pantry page, omitting the budget line; "zero judgment" and peace of mind (Rose S) → Statement or Voices; calm, clear plan and non-judgmental approach (Dereck Scott) → Method; attention to detail (several reviewers) → About.
- Themes present in the reviews: attention to detail, responsiveness, professionalism, a non-judgmental approach, systems that work. Themes not yet present: discretion and privacy, home type, travel, time returned. Future review requests can invite these without scripting the answer.

**Review integrity flag:** all 14 are dated in the same period; one reviewer shares the founder's surname and three share another surname. Relationships are unknown. If any came from relatives or friends who were not clients, Google's policies prohibit them and they can be removed, and prospects may notice. Do not quote or count such reviews in marketing claims. Do not offer incentives for reviews or selectively ask only happy clients.

**Reconcile the website testimonials:** none of the six names on the current testimonials page appears among the Google reviewers. That is plausible (different clients), but every testimonial used on the new site needs written approval and a project context.

### 13.6 AEO: questions to answer clearly (40–60-word answer first, then detail)
What does a professional home organizer do? What is move-in concierge service? How much does whole-home organization cost? What is included in unpacking and home setup? How long does whole-home organization take? Can an organizer work with my interior designer? Can a professional organizer prepare a custom home before move-in? What happens during a consultation? How does professional organization differ from housekeeping? Can household organization be maintained after the initial project? Do professional organizers travel? Can I hire an organizer for my second home?

### 13.7 GEO
All text in the initial HTML. Use Bing Webmaster Tools and IndexNow (Bing's index feeds several AI products). Allow search-oriented crawlers in `robots.txt`; decide on training crawlers separately. Skip `llms.txt` unless cheap, because there's no evidence it matters yet. Track referrals from AI-assisted sources and run ~20 test prompts a month ("who offers move-in setup in Dallas?").

### 13.8 Structured data (only what's true)
- `Organization`, `ProfessionalService` (a LocalBusiness subtype) with `areaServed` (DFW cities, Texas, Colorado Springs; add more only if you will take the work). Omit `streetAddress` if the address is hidden.
- `Service` for each service page, `BreadcrumbList`, `Article` with author for journal posts, `Person` for Yaz on `/about/`, `ImageObject` / `VideoObject` where genuine.
- Do not mark up reviews on your own site. Do not manufacture ratings. FAQ markup is optional; Google restricted FAQ rich results in 2023, so treat FAQ content as useful for people and AI, not a rich-result tactic.

### 13.9 Technical SEO
Semantic HTML, clean heading hierarchy, crawlable navigation, canonical URLs, XML sitemap, `robots.txt`, descriptive filenames and alt text, internal linking, 404 handling, the §9.4 redirect map, Google Search Console and Bing Webmaster Tools.

### 13.10 Content strategy
Four launch articles on topics only an expert can write: what a move-in concierge actually does; working with your interior designer; how long whole-home organization takes; organizing inside custom cabinetry. Then one strong post a month. Further themes: designing storage around household behavior, preparing a custom home for move-in, wardrobe systems, household flow, planning organization during renovation, children's systems, seasonal wardrobe transitions, travel engagements.

### 13.11 Paid search (later)
Start with DFW intent (move-in, unpacking, whole home, closet, pantry). Test Texas hubs and relocation queries next. Do not spend on broad national search. Import qualified-lead and closed-deal conversions back into Google Ads.

### 13.12 Email and social
- Consumer editorial email (The Home Harmonics Edit) and a trade edition: Phase 2, passive footer signup only, infrequent, no coupons.
- Instagram builds visual authority and trust (transformations, process, design logic, Move-In, founder perspective, real project details), not DIY followers.
- Partnerships to cultivate: interior designers, luxury realtors, architects, custom builders, household managers, luxury movers, relocation specialists, cabinetry and closet companies.

---

## 14. MEDIA AND ASSET MANIFEST

### 14.1 Generation rules (for generated assets)
No readable text or labels in frame, no visible hands in video, no clusters of small objects, no symmetrical mansion compositions, eye-level 35mm perspective, natural light, one consistent time of day, one reference image carried across generations. Reject anything with warped verticals, odd reflections, or mangled hardware. Generated images may only be used as `generated_atmosphere`.

**Dropped:** generated Master Wardrobe and Master Pantry as published assets. They may exist as internal mood references for the photographer, or as clearly captioned "design concept" images in the Method (P2).

### 14.2 Generated
| ID | Asset | Ratio | Organization | Priority |
|---|---|---|---|---|
| G01 | Hero still: wide interior, morning light | 16:9 | Implied | **P0** |
| G02 | Hero loop 6–8s, light across walnut/limestone, no people | 16:9 | Atmospheric | **P0** (else use the still) |
| G03 | Mobile hero still, art-directed | 4:5 | Implied | **P0** |
| G04 | Mobile hero loop | 9:16 | Atmospheric | P1 |
| G05 | Walnut drawer/hardware/suede detail | 4:5 | Implied | **P0** |
| G06 | Material plates ×3 (limestone, walnut, linen) | 4:5 or 1:1 | Atmospheric | P1 |
| G07 | Architectural wide #2 (kitchen/living threshold) | 3:2 | Atmospheric | P1 |
| G08 | Empty residence, single box, window light | 16:9 | Atmospheric | **P0** |
| G09 | Move-In film 15–20s | 16:9 | Implied | P2 (prefer real) |
| G10 | Trade hero: plans, materials, light | 3:2 | Atmospheric | P1 |

### 14.3 Real photography
| ID | Asset | Ratio | Priority |
|---|---|---|---|
| R01 | Founder environmental portrait (no arms-crossed pose) | 4:5 | **P0** |
| R02 | Founder seated/editorial | 3:2 | **P0** |
| R03 | Founder hands/working detail | 4:5 | **P0** |
| R04 | Founder square crop (OG/social) | 1:1 | P1 |
| R05 | Process details (5–8): measuring, labeling, folding; no client faces | Mixed | P1 |
| R06 | Real work detail library (10–15): drawers, linen, pantry | Mixed | **P0** |
| R07 | Team image (only if a team exists) | 3:2 | P2 |
| R08 | Collaboration with a designer or builder (only if true) | 3:2 | P2 |

### 14.4 Real client work
| ID | Asset | Priority |
|---|---|---|
| C01 | Signature project #1: best existing phone photography for launch; professional shoot later | **P0** (phone) / P1 (pro shoot) |
| C02 | Project #2 (move-in or whole-home), ideally including an out-of-area project to prove travel | P1 |
| C03 | Before/after pairs ×3, case-study pages only | P1 |
| C04 | Approved testimonials with project type and area | **P0** |
| C05 | Existing portfolio videos: audit now, extract stills | Now |

### 14.5 Video, posters, social
| ID | Asset | Spec | Priority |
|---|---|---|---|
| V01 | Hero loop | 6–8s, no audio, WebM + MP4, ≤ ~3MB at 1080p | **P0** |
| V02 | Mobile hero loop | 9:16, ≤ ~1.5MB | P1 |
| V03 | Behind-the-scenes vertical clip (real) | 30–45s | P2 |
| PF | Poster frame for every video | AVIF/WebP, first frame is the LCP | **P0** |
| OG1 | Default OG image | 1200×630 | **P0** |
| OG2 | Per-service OG | 1200×630 | P1 |
| FAV | Favicon and app icons | Standard | **P0** |
| LI | LinkedIn banner for trade | 1584×396 | P1 |

**P0 total: about 12 assets.**

### 14.6 Pipeline
Masters live in `/media-masters/`, outside `/public`. Generate AVIF and WebP at several widths with explicit dimensions, WebM and MP4 for video, poster frames, descriptive filenames, and descriptive alt text. Lazy-load below the fold. Preload only the hero poster.

---

## 15. RESPONSIVE, PERFORMANCE, ACCESSIBILITY

### 15.1 Responsive
Mobile is designed separately, not desktop stacked. Art-directed mobile hero crops. Thumb-reachable sticky bar (CTA + tap-to-call). Text-only mobile menu. Sticky-scroll interactions are desktop only. Forms have large touch targets.

### 15.2 Performance targets (mobile)
- LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.
- Hero poster ≤ ~150KB (AVIF). Video loads after LCP, only on capable connections and not under reduced-motion or save-data.
- Homepage JavaScript ≤ ~100KB gzipped.
- Two font families, WOFF2, subset, `font-display: swap`.
- Explicit image dimensions, responsive sizing, poster frames.

### 15.3 Accessibility (WCAG 2.2 AA)
Contrast, visible focus, skip link, labeled form fields, keyboard operation for all carousels and menus, alt text, 44px touch targets, no motion required to understand content, pause control for autoplaying video over five seconds, captions if a film includes speech.

---

## 16. ANALYTICS

GA4 via GTM. Events: `cta_click`, `phone_tap`, `form_start`, `form_step1_submit`, `form_step2_submit`, `trade_form_submit`, `project_view`, `pdf_download`, `scroll_75`. Capture UTM parameters and click IDs into hidden form fields and write them to the CRM. Segment by home location (DFW / Texas / outside Texas) and home type. Keep one static primary phone number for local SEO; use tracking numbers only on landing pages that need them.

---

## 17. TECH STACK AND CONTENT MODEL

**Recommended stack:** Astro with TypeScript; CSS custom properties for tokens; minimal client JavaScript; content in Keystatic or Sanity so Yaz can add projects and articles; hosting on Cloudflare Pages or Vercel; forms via a server endpoint with Turnstile, sending email and writing to the CRM or project tool.

**Content types:**
- **Project:** title, slug, residence type, area (neighborhood or city only with consent), scope, spaces, challenge, strategy, measured results, quote, photographer credit, images (each with `truth` flag and alt text), **consent tier**, travel flag (local / Texas / out of state), publish date.
- **Journal post:** title, slug, author, date, body, "last reviewed."
- **Service:** name, slug, summary, scope checklist, starting price, FAQ items.
- **FAQ item:** question, short answer (40–60 words), long answer, pages it appears on.
- **Testimonial:** initials or first name, project type, area, written-approval flag.
- **Location:** name, state, criteria checklist (real project, original photos, specific FAQs, testimonial), `publishable` boolean.
- **Trade page:** audience, copy blocks.
- **Claim:** key, text, `satisfied` boolean (§7).
- **Travel window:** city, state, dates, `confirmed` boolean.

---

## 18. QA CHECKLIST

- Test on a real iPhone, a mid-range Android, and desktop.
- Lighthouse, PageSpeed Insights, WebPageTest against the §15.2 targets.
- Reduced-motion and keyboard-only passes; screen-reader pass.
- Verify every redirect in §9.4.
- Rich Results Test for schema; confirm nothing marks up reviews.
- Fetch each page as a crawler and confirm all text is in the HTML.
- Submit a test lead end to end (form → CRM → auto-reply → calendar link), including an out-of-area test.
- Confirm no `{{TBD` token or `placeholder: true` image on any indexable page (launch gate).
- Confirm no generated image appears in any case study, testimonial, or before/after.
- Confirm no claim renders whose ledger flag is false.

---

## 19. INPUT STATUS

### 19.1 Confirmed (see §0.6 for details)
| Input | Status |
|---|---|
| Real projects and consent | 3–10 projects; permission confirmed; mostly phone media |
| Credential | Certified Professional Organizer (CPO) |
| Team | Yaz alone |
| Insurance and contract | Insurance in force; written contract in use |
| Google Business Profile and email | Verified profile; business-domain email exists |
| Availability | Evenings and weekends; same-day reply |
| Pricing structure | Minimums by service; no hourly rate; 50% deposit; products at cost plus handling fee |
| Travel | Anywhere if the 2-day minimum is met; travel and lodging at cost |
| Consultation | Free fit call and free walkthrough; paid consultation deferred |
| Second homes | Not in client base; FAQ only |
| Professional photographer | Later (Phase 2) |
| Fonts | Free fallbacks for launch |

### 19.2 Still open (build can proceed with `{{TBD}}` tokens)
| Input | Owner | Status |
|---|---|---|
| CPO certification details and verification link | Yaz | `{{TBD}}` |
| Founder's real story for "A Letter from Yaz" (needs an interview, not multiple choice) | Yaz + Claude | `{{TBD}}` |
| Handling-fee percentage on products | Yaz | `{{TBD}}` |
| Deposit refundability and stop-start/pause contract language | Yaz + lawyer | `{{TBD}}` |
| Out-of-state insurance coverage confirmation | Yaz + insurer | `{{TBD}}` |
| Travel pricing: higher day rate or flat travel fee | Yaz | `{{TBD}}` |
| Lead time to display ("about N weeks out") | Yaz | `{{TBD}}` |
| Colorado Springs and other travel projects: costs, duration, consent to name the city | Yaz | `{{TBD}}` |
| Content of `/faq`, `/trusted-vendors`, `/book-online` (not reviewed in the audit) | Yaz | `{{TBD}}` |
| Google Business Profile: new description, hours, photos, services list, owner replies (see §13.5a) | Yaz | `{{TBD}}` |
| Google Business Profile service areas and secondary categories (not visible in screenshots) | Yaz | `{{TBD}}` |
| Written permission from reviewers whose words may appear on the site | Yaz | `{{TBD}}` |
| Confirm all 14 Google reviews are from genuine clients (see review integrity flag in §13.5a) | Yaz | `{{TBD}}` |
| Which of the 3–10 projects to feature first, and best photos for each | Yaz | `{{TBD}}` |

---

## 20. PHASES

**Phase 0 — Prerequisites (before launch):** operations gate (§7), proof curation (best existing phone photography and video stills, consent confirmed) and the phone capture SOP, pricing, real founder portrait, business email, real privacy and terms pages, Google Business Profile setup.

**Phase 1 — Launch:** the §9.2 sitemap with P0 assets, the form and CRM flow, analytics, redirects, schema, Search Console and Bing Webmaster Tools.

**Phase 2:** professional photography of one project, P1 assets, additional case studies, first travel-window posts, journal cadence, newsletter signup, trade kit PDF, paid search on DFW intent.

**Phase 3:** neighborhood and city pages that meet §13.4, real hero film, Texas-hub and relocation campaigns, optional virtual design plan for out-of-state clients (test carefully), optional "Move-In Timeline" lead magnet.

---

## 21. FINAL QUALITY CONTROL

Before shipping, confirm:
- Does it feel genuinely expensive, or merely like it's trying to? It depends on real photography existing. With generated imagery alone it will look expensive and feel thin.
- Would a sophisticated homeowner trust it? Only if the claims ledger is honest, the founder is real on the page, and the proof is specific.
- Is every major claim defensible and does every section have a job?
- Is mobile equally premium, with its own art direction?
- Will it load fast, and can Google, AI systems, and local search understand the business and where it operates (home base plus travel)?
- Does the BelArosa influence read as translated principles rather than a copy?
- Does anything feel like AI slop, pretentious, or like a generic agency template? If so, fix it before launch.
