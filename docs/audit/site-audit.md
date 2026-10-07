# Home Harmonics — Site Audit (Phase 1)

**Date:** 7 Oct 2026 · **Rubric:** `docs/home-harmonics-master-plan.md` (v1.1) + `docs/decisions-v1.2.md` (owner-approved deviations) · **Build audited:** commit `096bfde`
**Status:** Phase 2 complete (8 Oct 2026). Every P0/P1 fixable in code is fixed; what remains needs assets or Vercel configuration. See "Phase 2 results" below; the original Phase 1 findings follow unchanged for reference.

## Phase 2 results

| Item | Status | Commit | Before → after (evidence) |
|---|---|---|---|
| **P0-1** Trade form unstyled, honeypot visible | ✅ Fixed | `201e453` | `screens/trade/1440-full.jpg` → `screens-after/trade/1440-full.jpg`; trade inputs under 44px: 7 → 0 |
| **P0-2** Resend / Turnstile keys | ⏳ **You**: Vercel env vars (launch guide Parts 4–5) | n/a | Configuration, not code |
| **P1-1** Hero headline on 3 lines | ✅ Fixed | `1c49088` | H1 orphans at 1024/1280/1440/1920: 4 → 0 (`after-shots-*.json`); `screens-after/home/1440-atf.jpg` |
| **P1-2** Header/hero misaligned ≥1920 | ✅ Fixed | `1c49088` | `screens-after/home/1920-atf.jpg`: headline starts at the logo's edge |
| **P1-3** Tablet = stretched mobile | ✅ Fixed | `1c49088` | Homepage height at 834: 20,092 → 13,895 px; services rows image-beside-text, Move-In stills 3-up, letter/trade/heroes two-column (`screens-after/home/834-full.jpg`) |
| **P1-4** Footer tap targets 37px | ✅ Fixed | `1c49088` | 45px tall, ≥ 44px wide |
| **P1-5** Phone wraps mid-number | ✅ Fixed | `1c49088` | `a[href^=tel]` nowrap site-wide |
| **P1-6** Services panel focus order | ✅ Fixed | `10d73ff` | Enter → 6 panel links → "Work"; Shift+Tab returns to the toggle |
| **P1-7** Mobile menu focus leak | ✅ Fixed | `10d73ff` | Skip link inert; no page content reachable while the menu is open |
| **P1-8** Hero too low-res for retina | 📷 Asset needed | n/a | Needs a ≥ 2800px desktop hero and a ≥ 1300px 4:5 mobile hero |
| **P1-9** Garage detail soft | ✅ Fixed | `e97c0c6` | Required resolution 2.15× → 1.13× (834), 2.11× → 1.12× (390) |
| **P1-10** Landscape images lose subject | ✅ Fixed | `e97c0c6` | Move-In stills 3:2 with focal points; the "Move day" box stays in frame; bedroom 1.92× → 1.02× at 1440@2x |
| **P1-11** Smoky seams into walnut | ✅ Fixed (approved) | `1c49088` | Clean walnut edges; soft seams kept between light tones |
| **P1-12** §3.5 words ("bins", "tidy-up") | ✅ Fixed | `b59d96f` | Source scan returns nothing |
| **P1-13** Titles > 60 characters | ✅ Fixed | `e5ccd0f` | 19 pages over → 0; descriptions > 160 → 0 (P2-6 done too) |
| **P1-14** Sticky consultation bar on /trade/ | ✅ Fixed | `77a1bf7` | No sticky bar in `/trade/` HTML |
| **P1-15** Visual promise vs real proof | 📷 Asset needed | n/a | Phase-2 photography (E-1) |
| **P1-16** AI-looking founder portraits | 📷 Asset needed | n/a | Real portrait |
| **P1-17** Render-blocking CSS | ✅ Fixed | `be99dd1` | Render-blocking cleared; mobile FCP −150 to −300 ms; perf / 78 → 83, /trade/ 85 → 88. Mobile LCP (3.8–4.4 s locally) **must be re-measured on the Vercel preview** before launch |

**Regression pass after all fixes** (`data/checks.json`; previous run kept as `data/checks-before.json`): axe shows only the known P2-8 landmark item; 0 broken links; one H1 per page and no heading skips; no review markup; reduced motion, skip link and sticky bar all behave.

**Still open (P2, not in Phase 2 scope):** P2-1 orphans in body text (text-wrap), P2-2/3/4 copy variety and voice, P2-5 HTML comments, P2-7 per-page OG images, P2-8 sticky-bar landmark, P2-9 table tap targets, P2-10 hover-image preload, P2-11 landscape hero, P2-12 `pdf_download`, P2-13 case-study hero image, P2-14 measured results (needs facts), P2-15 service hero size at 2560, P2-16 mobile length, P2-17/P2-22 hero fade timing (the homepage contrast flag is the supporting line measured mid-fade, about 6:1 at rest), P2-18 schema detail, P2-19 trade-band placement, P2-21 grain.png weight. P2-20 done (`.gitignore`).

## How this was tested
| Step | Tool | Result file |
|---|---|---|
| Production build | `npm run build:prod` | `data/build.log`: **clean, 0 warnings, 0 errors**, launch gate passed |
| Screens: 26 pages × 11 viewports (360, 390, 430, 768, 834, 1024, 1280, 1440, 1920, 2560, 844×390), above-the-fold + full page | Playwright 1.x + system Chrome | `screens/<page>/<viewport>-{atf,full}.jpg` (572 files) + `screens/_checks/` |
| Layout, image, tap-target, orphan and design-token measurements on every page at every viewport | Playwright DOM measurement | `data/shots-<viewport>.json`, `data/summary.json` |
| Accessibility | axe-core (WCAG 2.0/2.1/2.2 A+AA + best practice) at 1440 and 390 | `data/checks.json → axe` |
| No-JS text parity (every visible line present in the initial HTML) | fetch + rendered `innerText` diff | `data/checks.json → nojs` |
| SEO / schema static checks, internal links | raw HTML parse | `data/checks.json → seo, links` |
| Reduced motion, keyboard-only, mobile menu, sticky bar, intro sequence, hover | Playwright | `data/checks.json`, `screens/_checks/` |
| Forms end to end (in-area, out-of-area, home form, trade, empty, no-JS), GA4 events, UTM → hidden fields | Playwright on dev server (`PUBLIC_GA4_ID=G-AUDIT00000`, network to Google blocked) + server email log | `data/forms.json` |
| Lighthouse mobile + desktop, every page | Lighthouse (production build served locally) | `data/lighthouse.json` |
| Copy scans (em-dashes, contrast framing, §3.5 words, filler, team/hourly/price/TBD/credentials, repetition) | text extraction from built HTML | `data/copy.json`, `data/page-text.json` |

Caveats: Lighthouse performance ran on a local Python static server (no HTTP/2, no Brotli, no CDN), so it understates production speed. API routes can't run in the static preview, so forms were tested on the dev server.

---

## What already passes (no action)
- **Build:** clean; 26 pages; 37 Wix redirects + `/post/*` resolve in one 301 hop (verified in `.vercel/output/config.json`).
- **Truth rules:** no generated image appears in a case study, before/after or testimonial (`summary.json → genInCaseStudy: []`); every photo carries a truth flag (the only unflagged image is the footer logo, which is not a photograph).
- **Claims (§7, §0.6):** prices on every page are exactly $600 / $1,200 / $1,800; travel minimum is 2 on-site days; no hourly rate (only "not by the hour"); no "team/crew/staff"; no CPO or other credential; no `{{TBD}}`; "Insured" appears only where the ledger allows; out-of-state coverage is never claimed; Colorado Springs appears at city level only (consent on file).
- **Layout:** zero horizontal overflow at all 11 viewports; no stretched images; no element radius > 2px; no box-shadows; no custom cursor.
- **Accessibility:** axe finds **one** moderate issue site-wide (P2-8). No contrast failures. Skip link is first in tab order and lands on `<main>`; focus rings are visible on links, buttons and inputs; reduced motion removes the intro, Lenis, parallax and all hidden reveal states (`checks.json → reduced`).
- **No-JS:** every visible line of text on every page is present in the initial HTML (0 missing after whitespace normalization).
- **SEO:** unique titles and descriptions; exactly one H1 per page; no heading-level skips; canonicals on all pages; `noindex` on `/inquire/thanks/` and the 404; sitemap lists 24 indexable URLs; robots.txt allows search and AI crawlers; `/llms.txt` is generated from site data; all internal links return 200.
- **Structured data:** valid JSON-LD on every page. ProfessionalService (with founder Person, areaServed, sameAs), Service + Offer/PriceSpecification on service pages, FAQPage on /faq/, Article with author on journal posts, Person on /about/, BreadcrumbList. **No Review or AggregateRating markup.**
- **AEO:** every §13.6 question is answered; all service definitions are 48–51 words; FAQ answers 39–56 words; journal "In short" summaries 47–55 words.
- **Forms:** Austin lead → travel auto-reply; Highland Park lead → standard auto-reply; trade lead → trade auto-reply; empty submit is blocked; no-JS submit lands on the thank-you page; thank-you page is `noindex`. UTM + gclid captured on a service-page landing persist to the inquiry form's hidden fields.
- **Analytics (§16):** 8 of 9 events fire: `cta_click`, `phone_tap`, `form_start`, `form_step1_submit`, `trade_form_submit`, `generate_lead`, `scroll_75`, `project_view`. (`pdf_download` → P2-12.)
- **Conversion:** "Request a consultation" is the primary CTA everywhere it should be; minimums and the 50% deposit are stated beside every form before submit; "We reply the same day" appears on forms, footer and CTA bands; phone is tap-to-call; sticky mobile bar shows after the hero and hides over the form and footer (`checks.json → sticky`).

### Approved deviations from the plan (not findings)
Glass header, desktop-only Lenis, parallax in 4 places, gradient seams between bands, first-visit intro, generated atmosphere imagery outside case studies, no sticky tap-to-call, single-step form, no PDFs / Client Login / newsletter at launch, CPO hidden. The "gradients" the scanner reports are underline and button-fill techniques (`linear-gradient(currentColor…)`), not decorative gradients.

---

## P0 — blocks launch

### P0-1 Trade inquiry form is unstyled, and the spam honeypot is visible
- **Page:** `/trade/` · **Breakpoints:** all
- **Evidence:** `screens/trade/1440-full.jpg` (bottom band): browser-default inputs with labels beside them, a visible "Company" field, and the phone number broken across lines. At phone widths the inputs measure 153×21 px (`data/summary.json → tapsList`, `inq-form`).
- **Why it matters:** this is the trade conversion path (§12.3). It looks broken, and the exposed honeypot invites designers to fill a field that silently discards their inquiry as spam.
- **Fix:** the form styles (`.inq-form`, `.field`, `.hp`, `.form-foot`) live inside `InquiryForm.astro`, so they ship only on pages that render that component. Move them into `global.css` (or a shared `forms.css` imported by both). No design change.

### P0-2 Production form delivery depends on keys that aren't set yet
- **Page:** `/inquire/`, homepage form, `/trade/` · **Breakpoints:** n/a
- **Evidence:** `data/forms.json` + dev log: "RESEND_API_KEY not set. Email not sent…". In production the endpoint returns a polite error by design (so a lead is never silently lost).
- **Why it matters:** with no key, no inquiry reaches Yaz.
- **Fix:** configuration only: set `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` and `PUBLIC_TURNSTILE_SITE_KEY` in Vercel before the domain switch (`docs/launch-guide.md` Parts 4–5), then run the Part 7 launch checks.

---

## P1 — should fix before launch

### Layout and responsive

**P1-1 Hero headline breaks onto three lines at common laptop widths**
- **Page:** `/` · **Breakpoints:** 1024, 1280, 1440, 1920 (two lines only at 390–834 and 2560)
- **Evidence:** `screens/home/1024-atf.jpg`, `1280-atf.jpg`, `1440-atf.jpg`, `1920-atf.jpg`: "Your home, / already / handled." leaves "already" alone on its own line.
- **Why it matters:** the plan's one deliberate line break (§10-01 "deliberate line break after 'Your home,'") becomes three ragged lines in the most-seen viewport. It's the first impression.
- **Fix:** keep "already handled." on one line: either cap the hero size so it fits the copy column (≈ `clamp(2.9rem, 1rem + 3.6vw, 5.4rem)`), or give the copy column 6/13 instead of 5/13. Verify at 1024–1920.

**P1-2 Header and hero don't line up on large screens**
- **Page:** all hero pages; most visible on `/` · **Breakpoints:** 1920, 2560
- **Evidence:** `screens/home/1920-atf.jpg`, `2560-atf.jpg`. The header content sits in the 1440px centered container while the hero text hugs the left gutter, so the logo and headline start at different x positions.
- **Why it matters:** misaligned edges are the first thing that reads as "template" on a big monitor.
- **Fix:** pad hero copy to the container edge: `padding-left: max(var(--gutter), calc((100vw - var(--max)) / 2 + var(--gutter)))`.

**P1-3 Tablet layouts are stretched mobile**
- **Page:** `/`, service pages, `/work/` · **Breakpoints:** 768, 834 (and 1023 and below)
- **Evidence:** `screens/home/768-full.jpg`, `834-full.jpg`: hero, service rows, Move-In stills and Method all collapse to one full-width column. Service images render at ~750px wide, and each Move-In still is ~940px tall. The homepage is 20,092px tall at 834.
- **Why it matters:** §15.1 "Mobile is designed separately, not desktop stacked". Tablets get neither layout and read as unconsidered. iPad visitors skew toward the target audience.
- **Fix:** add a 768–1023 layer: hero text and image side by side (≈ 1:1), service rows as two columns (image 40% / text), Move-In stills 2-up with the text above, statement image beside text.

**P1-4 Footer links are under the 44px touch target**
- **Page:** every page (footer) · **Breakpoints:** 360, 390, 430, 844×390
- **Evidence:** `data/summary.json → tapsList`: Explore/Contact/Practice links measure 37px tall.
- **Why it matters:** §15.3 asks for 44px targets; the footer is where people look for the phone, email and Instagram.
- **Fix:** `.ft-list a { padding: 10px 0 }` (or `min-height: 44px; display: inline-flex; align-items: center`).

**P1-5 Phone number wraps mid-number**
- **Page:** `/trade/` (also possible in other narrow columns) · **Breakpoints:** 1024+ in the trade band, phones in footers
- **Evidence:** `screens/trade/1440-full.jpg`: "(817) 883-" / "1887".
- **Fix:** `a[href^="tel:"] { white-space: nowrap }` site-wide.

### Accessibility

**P1-6 Services panel isn't reachable by keyboard in a sensible order**
- **Page:** all (desktop header) · **Breakpoints:** ≥1024
- **Evidence:** `data/checks.json → keyboard.panelFirstFocus`: after Enter opens the panel, the next Tab goes to "Work", not the first service. The panel's links come after the whole nav in the page order.
- **Why it matters:** WCAG 2.4.3 Focus Order; keyboard users can't reach the service list from the control that opened it.
- **Fix:** on open, move focus to the first panel link (and return it to the toggle on Esc, which already works), or place the panel immediately after the toggle in the DOM.

**P1-7 Mobile menu doesn't fully trap focus**
- **Page:** all · **Breakpoints:** ≤1023
- **Evidence:** `checks.json → keyboard.mobileFocusStaysInMenu: false`: tabbing while the menu is open reaches the skip link, which isn't made inert.
- **Fix:** add the skip link to the set of elements made `inert` while the menu is open.

### Images

**P1-8 Hero images are too small for retina screens**
- **Page:** `/` · **Breakpoints:** 1280–1920 desktop (DPR 2), 390–430 phones (DPR 3)
- **Evidence (required ÷ available pixels):** desktop hero **1.96×** at 1440@2x (master 1672px, needs ~3270px); mobile hero **1.72×** at 430@3x (master 753px, needs ~1290px).
- **Why it matters:** the hero is the LCP image and the first impression; softness reads as cheap on a MacBook or iPhone.
- **Fix:** asset needed. Regenerate the hero (desktop ≥ 2800px wide, 16:9) and a dedicated 4:5 mobile hero (≥ 1300px wide), then re-run `npm run media`. Weight stays within budget via AVIF. Until then: leave as is (no upscaling, which adds no detail).

**P1-9 Garage detail crop is visibly soft**
- **Page:** `/`, `/work/garage/` · **Breakpoints:** 390, 834, 1440
- **Evidence:** a 1.9× CSS zoom into a 1448px photo needs **2.15×** its pixels at 834@2x and 2.11× at 390@3x.
- **Fix:** reduce the zoom to ~1.35 and show the detail smaller, or use a separate real close-up photo when one exists.

**P1-10 Landscape images in tall frames lose their subject**
- **Page:** `/` (services rows, Move-In stills), service pages · **Breakpoints:** 360–834
- **Evidence:** `screens/home/390-full.jpg`, `834-full.jpg`: 16:9 sources cropped into 4:5 frames at center. The "Move day" still crops out the moving box that carries the story; bedroom and living images lose their focal furniture. Bedroom still needs 2.0× its master at 834.
- **Fix:** set a focal point per image (`object-position`, e.g. bedroom ≈ 78% 70% to keep the box) and use 3:2 frames for landscape sources below 1024.

### Design

**P1-11 Gradient seams into walnut read as smoke or shadow**
- **Page:** every page (CTA band), `/` (Move-In band, inquiry band), `/trade/` · **Breakpoints:** all
- **Evidence:** `screens/trade/1440-full.jpg`, `screens/about/1440-full.jpg`: a ~160px alabaster→walnut blend renders as a muddy grey-brown band above every walnut section.
- **Why it matters:** §8.2 calls for flat, hairline surfaces with no shadows. Between the light tones the seam is lovely; into walnut it looks like a drop shadow.
- **Fix (needs your call, since it touches an approved design decision):** keep the soft seam between alabaster and limestone; give walnut a clean edge (or a ≤24px seam).

### Copy

**P1-12 Words §3.5 says to avoid**
- **Evidence:** `data/copy.json`: "bins" on `/` (×2) and `/work/garage/` (×2); "tidy-up" in `/journal/what-a-move-in-concierge-does/`.
- **Fix:** "Boxes, bags and bikes had taken over the floor"; "every bike, tool and stored box given a place"; "It is also not a one-day reset."

### SEO

**P1-13 Titles are too long and will be truncated**
- **Evidence:** `checks.json → seo`: 19 of 26 titles exceed ~60 characters (Signature Spaces 104, Seasonal Resets 95, Investment 82, service pages 71–82).
- **Why it matters:** Google cuts at ~580px. The plan's own template (§13.1) produces long titles, so the brand name and city are what get cut.
- **Fix:** shorten the template to "[Service] in Dallas–Fort Worth | Home Harmonics" and trim the Signature Spaces, Seasonal Resets, Investment and journal titles to ≤ 60.

### Conversion

**P1-14 "Request a consultation" sticky bar shows on /trade/**
- **Page:** `/trade/` · **Breakpoints:** ≤767
- **Evidence:** §12.4 says don't use "Request a consultation" as the main button on `/trade/`; on phones the sticky bar is the main button.
- **Fix:** hide the sticky bar on `/trade/` (the trade form is on the page), or relabel it "Start a trade inquiry" there.

### Content and storytelling (assets needed)

**P1-15 The visual promise outruns the proof**
- **Evidence:** the hero, services and Move-In sections show generated dressing rooms with lit walnut millwork. The real proof is a garage and a guest bath with builder-grade finishes (`screens/work/1440-full.jpg`).
- **Why it matters:** §21: "With generated imagery alone it will look expensive and feel thin." A careful visitor can spot the gap between promise and work. The footer disclosure is honest but doesn't close it.
- **Fix:** no code fix. Phase-2 photography of one project (§7) remains the single biggest upgrade. Meanwhile, P1-10 focal points and E-3/E-4 below help.

**P1-16 Founder portraits look AI-rendered** (known; owner-approved for now)
- **Evidence:** `screens/about/1440-full.jpg`; garbled shirt logo; generator-size source (1254²).
- **Why it matters:** §3.3 "I would trust them in my home". The client meets Yaz in person.
- **Fix:** a real portrait (R01–R03), then `npm run media`.

---

## P2 — polish

| # | Finding | Page / breakpoint | Evidence | Fix |
|---|---|---|---|---|
| P2-1 | 124 orphaned last words in headings and paragraphs (e.g. "Method." alone on 6 service pages; letter ends "leave." alone; About h3s) | many / most widths | `summary.json → orphansList` | `text-wrap: balance` on h1–h3 and `.lead`; `text-wrap: pretty` on paragraphs (2 lines of CSS) |
| P2-2 | Repeated templated headings: "Everything in scope, *handled.*" on all 6 service pages; "Answers, *first.*" on 7 pages and the FAQ H1; "Three ways to begin" + "How we begin / Three conversations" on the homepage | service pages, `/`, `/faq/` | `page-text.json` | one specific headline per service; rename the homepage services heading |
| P2-3 | Copy tics: "rather than" ×9; "who uses each space, how often" ×6; dense "X, Y and Z" triplets (15 on `/`, 15 on Signature Spaces) | journal, FAQ, `/` | `copy.json` | rewrite roughly a third of the triplets; vary the repeated phrase |
| P2-4 | Voice drifts between brand "we", "Yaz" and first-person "I" in process copy | `/`, service pages, `/about/` | `copy.json → we / yaz / firstPerson` | rule: "Yaz" for who does the work, "we" only for the reply promise and invitations, "I" only in the Letter |
| P2-5 | Developer HTML comments ship to every page ("…frosted header's backdrop-filter would otherwise trap…", section comments on `/`) | all | view-source; `copy.json → repeatedSentences` | switch to `{/* */}` comments |
| P2-6 | Meta descriptions over 160 characters | `/trade/` 186, `/faq/` 171, `/where-we-work/` 162, two journal posts 161 | `checks.json → seo` | trim to ≤ 155 |
| P2-7 | One OG image (hero crop) for every page, including journal posts and case studies | all | `checks.json → seo.ogImage` | per-page OG from each page's lead image |
| P2-8 | Sticky mobile CTA sits outside any landmark (axe "region", moderate) | 24 pages / 390 | `checks.json → axe.390` | wrap in `<aside aria-label="Quick contact">` |
| P2-9 | Comparison-table row links are 21px tap targets | `/services/`, `/investment/` / phones | `summary.json → tapsList` | make the row title a block link with padding |
| P2-10 | Desktop service-row hover images are lazy and not loaded before the first hover (blank box on first reveal) | `/` / ≥1024 | `summary.json → notLoaded` | `loading="eager"` for those three images (small, below the fold anyway) |
| P2-11 | Phone landscape: the hero shows only text, with the CTA and image below the fold | `/` / 844×390 | `screens/home/land844-atf.jpg` | landscape rule: smaller H1, image beside text |
| P2-12 | `pdf_download` (§16) not tracked: PDFs were cut, but the "Print or save as PDF" button exists | `/investment/` | `forms.json → missingEvents` | fire `pdf_download` on that button |
| P2-13 | Case-study pages open text-only above the fold | `/work/*` / all | `screens/work__garage/1440-atf.jpg` | add the "after" image to the page hero |
| P2-14 | Case studies lack §11 "measured results" (hours, rooms, items donated) and a client quote | `/work/*` | page text | add when known; otherwise leave out (never invent) |
| P2-15 | Service-page hero image is small with large empty space at ≥1920 | service pages / 1920–2560 | `screens/services__move-in-concierge/2560-atf.jpg` | let the image grow (max-height 82vh) or use a wider aspect |
| P2-16 | Mobile homepage is long: 16,461px at 390 (~19.5 screens), driven by 3 full-width service images, 3 tall Move-In stills and Method padding | `/` / 360–430 | `data/shots-390.json → docHeight` | 3:2 images on mobile; halve the Method step padding below 768 |
| P2-17 | Hero text becomes visible only through its entry animation; on slow devices (and after the intro) the H1 can lag | `/` / all | 768 capture under CPU load showed an empty hero (not reproduced on re-run) | start the word reveal sooner or make the first line visible immediately |
| P2-18 | Schema detail: `areaServed` is one "Dallas–Fort Worth" area (plan: DFW cities); Service has no `image`; no `priceRange` | all | `checks.json → seo.ldTypes` | list core cities (Dallas, Fort Worth, Plano, Frisco…), add `image` and `priceRange: "$$$"` |
| P2-19 | The trade band sits between "How we begin" and the inquiry form, interrupting the homeowner's path to the form (plan order, but costly) | `/` | storytelling read | consider moving the trade band above Voices |
| P2-20 | `docs/audit/screens/` is 185 MB | repo | `du -sh` | add `docs/audit/screens/` to `.gitignore` (keep locally) |

---

## Storytelling read (homepage and key pages)

**Homepage arc:** what it is (hero) → why it matters (statement) → proof (garage) → offer (services) → flagship (Move-In) → how (Method) → who (Letter) → voices → how to start → trade → inquire. The arc matches §10 and each section has one job.
- **Strong:** the hero line, the Statement, the Letter excerpt and Rose's quote carry real voice. Pricing transparency is unusually clear and qualifies buyers.
- **Flat:** "Three ways to begin" and "How we begin / Three conversations" make the same "begin" move twice (P2-2). The Method section is long on mobile and generic in places ("Every item placed where you would reach for it").
- **Repeats:** the Method appears in full on the homepage and on every service page; FAQ answers repeat across pages. That's fine for AEO, but service pages feel templated (P2-2).
- **Unsupported leap:** the visual promise (P1-15). The words never overclaim; the imagery does the promising.
- **Service pages:** clear definition-first structure; strong "At a glance" box. They read as one template with nouns swapped; one specific detail per service (a typical sequence, a common mistake, a real example) would make each feel authored.
- **About:** the Letter is the most human page on the site. Weakened only by the portraits (P1-16).
- **Where we work:** specific and honest (three tiers, travel model, minimums, Colorado Springs with consent, no doorway pages).
- **Investment:** the strongest conversion page: prices, factors, inclusions, exclusions, the built-storage note, and a forwardable print view.

## Cohesion inconsistencies
1. **Above-the-fold treatment varies:** image heroes on services, about, trade and where-we-work; text-only on work, case studies, journal, investment, FAQ, inquire (P2-13).
2. **Trade CTA labels vary:** "Start a trade inquiry" (hero), "Send trade inquiry" (button), "Send a trade inquiry" (link on /inquire/), "For designers and builders" (homepage).
3. **Secondary link labels vary:** "See our work" (hero) vs "See the work" (thank-you page).
4. **Section edges vary:** soft seams between some bands, hard edges between others with the same tone pair.
5. **Images:** case studies use uncropped real photos, while service and project listings crop to 4:5. The rule exists but is applied inconsistently below 1024 (P1-10).

---

## Performance

Lighthouse, 26 pages × 2 form factors (`data/lighthouse.json`). Local static server without Brotli, HTTP/2 or CDN: absolute load times are pessimistic, but the relative findings hold.

| | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | Weight |
|---|---|---|---|---|---|---|---|---|
| **Desktop** | 99–100 | 97–100 | 100 | 100 (69 on noindex pages, expected) | 0.71–0.93 s | ≤ 0.012 | ≤ 18 ms | 580–756 KB |
| **Mobile** (Slow 4G, 4× CPU) | 78–97 | 97–100 | 100 | 100 (69 on noindex pages, expected) | **2.3–4.4 s** | ≤ 0.018 | 0 ms | 452–640 KB |

Plan targets (§15.2): LCP ≤ 2.5 s ❌ on mobile in this setup · CLS ≤ 0.1 ✅ · INP ≤ 200 ms ✅ (TBT 0) · homepage JS ≤ 100 KB ✅ (≈3.4 KB first load + 49 KB deferred desktop layer) · hero poster ≤ 150 KB ✅ (23–77 KB AVIF) · two font families, WOFF2, swap, display face preloaded ✅ · no video ✅.

**P1-17 Two render-blocking stylesheets on every page (~300 ms each on mobile)**
- **Evidence:** Lighthouse render-blocking insight on `/`: `index.*.css` (6.9 KB) and `Words.*.css` (16.8 KB), ~300 ms each. Mobile FCP ≈ 2.0 s.
- **Fix:** inline the CSS (`build.inlineStylesheets: 'always'` in `astro.config.mjs`; total CSS ≈ 25 KB), then re-measure mobile LCP on the Vercel preview with PageSpeed Insights before launch.

**P2-21 `grain.png` is 24 KB for a 3% texture** (Lighthouse estimates 20 KB savings). Re-encode as a smaller tile or 8-bit PNG.

**P2-22 Intermittent homepage contrast flag** in one Lighthouse run (both form factors), not reproduced on re-run or in axe. Most likely text measured mid-fade during the intro or hero reveal. No action beyond re-checking after P2-17.

---

## Summary
The build is technically strong: a clean build, zero overflow, near-zero axe issues, all text in HTML, honest claims, complete schema, working redirects, forms and analytics. Launch is blocked by one real bug (the unstyled trade form with a visible honeypot) and by the Resend and Turnstile keys. The fixes that most improve the "$15–20k" impression are typographic and responsive craft (headline wrap, large-screen alignment, tablet layouts, orphans, seams into walnut), plus two asset upgrades the code can't solve: a higher-resolution hero and real photography of Yaz and one project.

## Top 10 fixes (in order)
1. **P0-1** Trade form styles and hidden honeypot
2. **P0-2** Set the Resend and Turnstile keys in Vercel before the DNS switch
3. **P1-1** Hero headline on two lines at 1024–1920
4. **P1-3** Tablet layouts (768–1023)
5. **P1-6 / P1-7** Keyboard focus in the Services panel and mobile menu
6. **P1-11** Clean edge into walnut bands (your call)
7. **P1-13** Titles ≤ 60 characters
8. **P1-17** Inline CSS, then confirm mobile LCP ≤ 2.5 s on the Vercel preview
9. **P1-2 / P1-10 / P1-9** Large-screen alignment, image focal points, garage detail crop
10. **P1-4 / P1-5 / P1-12 / P1-14** Footer tap targets, phone nowrap, §3.5 words, sticky bar on /trade/

## Elevation ideas (toward a $15–20k agency feel)
| # | Idea | Why it fits the plan | Effort | Impact |
|---|---|---|---|---|
| E-1 | **Commission one real interiors shoot** (one project + founder portraits) and swap it in for the hero, Selected Work and About | §7 Phase 2; §21 "depends on real photography existing"; closes P1-15 and P1-16 | L | Very high |
| E-2 | **Show a page of a real care guide** (anonymized): the deliverable from the Method's last step | §6 deliverables; proof of thinking no competitor shows; feeds "They've thought of everything" (§3.3) | M | High |
| E-3 | **Real process details (R05)** under each Method step: measuring, labeling, folding (hands only, no client faces) | §6 "a real process detail image per step"; §14.3 R05 | M (phone-shot per the capture SOP) | High |
| E-4 | **Deeper case studies:** measured results, the "image of the finished space" Yaz shows before a build (garage), and a consented client quote | §11 case-study format; the before-build image is a unique selling point | S–M | High |
| E-5 | **Typographic finishing pass:** balanced headings, hanging punctuation, tabular figures in the price tables, old-style figures in body, consistent small-caps eyebrows | §8.2 "typography does the luxury"; pure craft, no new motion | S | Medium–high |
| E-6 | **Designed social cards** per page (title, image, mark) for when the site is shared in texts and Slack | §13.1 OG per page; delegates forward links (§3.2 D) | S–M | Medium |
| E-7 | **Assistant / house-manager brief:** a polished one-page print layout of /investment/ with scope, prices, deposit, insurance and the contact path | §3.2 audience D; §11 investment "forwardable summary" | S | Medium |
| E-8 | **Two more expert articles** (preparing a custom home for move-in; seasonal wardrobe transitions) to reach six, moving the Journal into the primary nav | §9.1 rule (nav at 6 articles); §13.10 topics; AEO depth | M | Medium |
| E-9 | **"Standards" section on /about/**: how keys and alarm codes are handled, the photo-consent tiers, insurance, the written agreement, one accountable lead | §7 operations gate as visible trust; delegates need it | S | Medium–high |
| E-10 | **Form craft:** inline, plain-language validation messages, a calm success state before redirect, and a "what happens next" line in the button area | §12 conversion; reduces abandonment at the most expensive moment | S | Medium |

*Stopping here for approval before Phase 2.*
