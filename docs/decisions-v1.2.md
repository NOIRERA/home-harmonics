# HOME HARMONICS — DECISIONS v1.2 (6 Oct 2026)

**Precedence:** this file overrides `home-harmonics-master-plan.md` (v1.1) wherever they conflict. The master plan stays the reference for everything not mentioned here.
**Owner override:** the "no generated imagery" rules (plan §0.2, §2.3, §14.1) are relaxed by the owner. Generated imagery is allowed as atmosphere. Real project photos still carry the proof.

---

## 1. Stack and infrastructure
| Item | Decision |
|---|---|
| Framework | Astro + TypeScript, minimal client JS |
| Hosting | **Vercel** (owner already uses it). Cloudflare used only for DNS, Turnstile, Email Routing |
| CMS | Content as typed Markdown/JSON in the repo. Add Keystatic (GitHub mode) in build step 4 so Yaz can add projects/articles |
| Domain | `home-harmonics.com` (canonical). Registered at **Wix**. Cutover plan below |
| Form delivery | Vercel serverless endpoint → **Resend** → hello@home-harmonics.com. Cloudflare Turnstile in invisible mode |
| CRM / proposals | **None at launch.** Email only. HoneyBook is the planned integration (owner's choice, Yaz still deciding). Form payload stays structured so HoneyBook can be wired in later |
| Fit-call scheduling | **No self-booking.** Reply the same day proposing times |
| Analytics | GA4 via direct `gtag`, loaded after first paint (no GTM, protects the JS budget). **Yaz has no GA4 property yet:** build reads `PUBLIC_GA4_ID` and does nothing while it is unset. To create: analytics.google.com → Admin → Create property → Web data stream → copy the Measurement ID (`G-XXXXXXXXXX`) |

### DNS cutover (checklist for launch day)
1. Keep Wix live until the new site is ready on a Vercel preview URL.
2. Move DNS to Cloudflare (change nameservers at Wix; confirm Wix allows this for the domain). Records to Vercel set to "DNS only".
3. Enable Cloudflare Email Routing: `hello@home-harmonics.com` → Thehomeharmonics@gmail.com.
4. Verify the domain in Resend (SPF/DKIM TXT records) so auto-replies come from hello@.
5. Test redirects from the §9.4 map, then switch.
**Gap to settle:** replies sent from Gmail will show the Gmail address unless "Send mail as" is set up (Resend SMTP) or Google Workspace is purchased (~$7/month). Workspace is the cleaner luxury option.

## 2. Contact details (site-wide)
- Email shown: **hello@home-harmonics.com** (forwards to Gmail). Never show the Gmail address.
- Phone: **(817) 883-1887**, shown as "Call or text" in the footer and on `/inquire/` only. **No sticky tap-to-call bar** (Yaz works 9–5).
- Address: none shown. Do not use the "5473 Blair Rd Ste 100 PMB 558338" mailbox anywhere. Schema omits `streetAddress`.
- Social: Instagram in footer at launch: https://www.instagram.com/homeharmonics/ (@homeharmonics). Pinterest and LinkedIn added after launch.
- Google Business Profile (verified, resolves to "Home Harmonics · 5.0 · Professional organizer"): https://www.google.com/maps?cid=8972241469728059377 . Use this clean CID link for the "5.0 on Google · 14 reviews" line, footer, and `sameAs` schema. Do **not** use the long google.com/search URL (it carries session tokens). Optional later: the `g.page/r/…` review-request link from "Ask for reviews."
- Reply promise: "We reply the same day."
- Lead time: "Currently scheduling about 4–6 weeks out." (single CMS setting)

## 3. Pricing and terms (display copy)
- Per service, shown as a minimum: **Single space from $600 · Whole-Home from $1,200 · Move-In from $1,800.** Never hourly. All values in one settings file.
- On `/investment/`, order high to low (Move-In first) so $600 is not the anchor.
- Travel: "Two on-site days minimum. Travel and lodging billed at cost."
- Products: "Billed at cost plus a handling fee." No percentage on the site.
- Deposit: "A 50% deposit holds your dates. Details are in your agreement." No refund promise on the site.
- Consultation wording: use **"complimentary"** instead of "free" (fit call, walkthrough).
- Seasonal Resets: short page, "offered to every project client," priced in the proposal, no number.

## 4. Claims ledger: starting state
| Claim | `satisfied` |
|---|---|
| Insured (general liability in force) | true |
| Insured for work in other states | **false** |
| Written service agreement | true |
| 5.0 on Google · 14 reviews (link to Google profile) | true (owner confirmed all reviews are genuine) |
| Quote: Kennedy O. (move/unpacking) | true |
| Quote: Samara C. (pantry; omit budget line) | true |
| Quote: Rose S. (zero judgment) | true |
| Quote: Dereck S. | **false, excluded by owner** |
| Certified Professional Organizer (CPO) | **false.** Owner chose to skip the verification link, so the credential does not appear anywhere on the site (also drop it from schema and the Letter) |
| Confidentiality arrangements available | false |
| Vetted / background-checked team, "our team", "our crew" | **never** (solo operation) |
| Colorado Springs named on site (city level only: "Texas and Colorado Springs; elsewhere by arrangement") | **true**, client consent confirmed by owner (keep a written record). No Colorado Springs landing page until the plan §13.4 test is met |
| "Two years in the industry" | true (as of Oct 2026; stored in settings with an as-of date). Don't headline it; use in the Letter and About only |
| Out-of-state insurance | **false, confirmed: no out-of-state coverage yet.** "Beyond Texas" copy must say "by arrangement" and never imply coverage. Yaz should confirm coverage with her insurer before promoting out-of-state work |
| Press, awards, partner names/logos | false |
| Travel windows | false |

Recommend keeping a written record of quote approvals even though the owner approved them in chat.

## 5. Photography
**Style:** warm walnut/limestone generated atmosphere + real project pairs. Apply one consistent grade to the real photos (neutralise yellow phone cast, slightly lower saturation, lift shadows, no content edits). Real pairs are shown only at ≤ 70% width (941×1672 and 1448×1086 sources).

### Real projects (case studies, in this order)
| Project | Files | Notes |
|---|---|---|
| 1. Garage (lead project, homepage Selected Work) | `GARAGE BEFORE/AFTER (REAL).png` | 1448×1086 landscape |
| 2. Pantry | `PANTRY BEFORE/AFTER (REAL).png` | 941×1672; feeds pantry spoke page |
| 3. Guest Bathroom | `GUEST BATHROOM BEFORE/AFTER (REAL).png` | 941×1672 |
- Presentation: **static side-by-side, "Starting point → Result,"** no slider. Description = space and scope only, no city or home type.
- **Not used (scrapped):** Kids Closet pair (bright play mat, toys, reads as clutter) and Storage Unit pair (black/yellow totes read as warehouse). Keep the files; revisit only if the grade tames them.
- **Cohesion rule (owner, 6 Oct):** any real image that throws off the quiet-luxury look is skipped, no asking. Test: apply the grade, place each pair beside the generated atmosphere images on the homepage mock, and drop what clashes. Risk order: Pantry (brand packaging, wire baskets) > Guest Bathroom (laminate counter, beige floor) > Garage. If the Pantry pair fails, the pantry page uses a generated image and no real pair. Garage leads either way.
- Note: the folder holds **5 pairs, not 10 jobs.**

### Generated atmosphere (allowed, not inside case studies)
| Slot | File |
|---|---|
| Hero (desktop right two-thirds; art-directed 4:5 mobile crop) | `HERO SECTION.png` |
| Statement detail | `DRAWER.png` |
| Services rows (Move-In / Whole-Home / Signature Spaces) | `BEDROOM.png`, `HARMONICS.png`, `CLOSET.png` |
| Move-In band stills | `BEDROOM.png`, `CLOSET 3.png`, `KITCHEN.png` (portrait) |
| Trade band | `CLOSET 2.png` |
| Menu detail images | crops of `DRAWER.png`, `KITCHEN .png` |
- Source sizes are 1536×1024 to 1672×941, so full-bleed on 4K screens will be soft. Regenerate at 2K+ later.
- Footer line (kept): "Atmospheric imagery on this site is digitally created. Project photography is of real Home Harmonics work."

### Founder
- `OWNER YAZ(REAL).png` and `OWNER 2 YAZ (REAL) .png` used as-is (square 1254×1254; crop for 4:5). **They appear AI-rendered** (garbled shirt logo, generator size). Owner chose to use them and swap after a real shoot. **First asset to replace.**

### Logo and favicon (in `PHOTO ASSETS/`)
| File | What it actually is |
|---|---|
| `LOGO BLACK.png` (2000×2000, RGBA) | **Black background**, white mark + "HOME HARMONICS" + tagline "PROFESSIONAL ORGANIZER" (baked in, not transparent) |
| `LOGO WHITE.png` (2000×2000, RGBA) | **White background**, black mark + wordmark + tagline "PROFESSIONAL ORGANIZING" |
| `LOGO BLACK FAVICON.png` (1254², RGB) | White "IHI" mark on black |
| `LOGO WHITE FAVICON.png` (1254², RGB) | Black mark on light grey (#F1F1F1) |
- Filenames name the **background**, not the mark colour.
- **Build tasks:** (1) key out the backgrounds to make transparent logos in ink (#1E1B18) and alabaster (#F3EFE8) for the header, walnut band and footer; (2) crop the lockup **without the tagline** (the two files disagree: "Organizer" vs "Organizing", and the plan's category is "home organization & move-in setup"); (3) render favicon PNGs (32, 180, 192, 512) + an SVG/ICO and check the thin inner strokes survive at 16–32px, thickening them if not.
- Wordmark in the header is the mark + "HOME HARMONICS" only.

### No video at launch
Existing portfolio videos are blurry; skip autoplay hero video. Hero is a still with a slow settle.

## 6. Form (changed from plan §12.2)
Single short form, saved immediately:
- Name, email, phone, what you need (Move-in / Whole-home / A specific space / Not sure), timeline (incl. "my move or closing date"), home location (city, state), optional "How did you hear about us / referred by," optional note.
- Out-of-area (outside DFW) gets the travel auto-reply.
- Stated near the form before submitting: minimums and the 50% deposit.
- **Removed:** "Ongoing" option (resets are for project clients), "Second home" home-type option, "investment comfort" select (price-shopper cue), photo upload (storage + friction; photos are exchanged by email), calendar link, tracking-number logic.
- Hidden UTM/click-ID fields kept. Confirmation page noindexed.

## 7. Scrapped or changed (no ask, for luxury/conversion)
- Gmail on the site → hello@ alias.
- Sticky tap-to-call bar → sticky "Request a consultation" only.
- "Client Login" footer link (no portal exists until HoneyBook).
- Newsletter signup at launch.
- One-page PDF downloads (investment summary, trade kit) at launch; offered by email on request instead.
- "free" → "complimentary"; "private" kept only where earned.
- Optional "investment comfort" select (see §6).
- Kids Closet and Storage Unit before/afters; blurry videos.
- Any Wix leftovers: PMB address, © 2024, "No Collections Here," typos, 16 city pages, generic tips posts.
- Pretty-but-empty homepage sections: **Voices** shows only the three approved quotes (static, not a carousel). Section is omitted if none are approved.

## 8. Content Claude writes (owner/Yaz approves in review)
- **Journal: at least 4 launch articles** (Yaz signed off on drafting): what a move-in concierge does; working with your interior designer; how long whole-home organization takes; organizing inside custom cabinetry. Author: Yaz. Dated, with "last reviewed." No invented statistics, prices, or client stories. Process and reasoning only.
- **Letter from Yaz** (first person, warm). Known facts: always the person friends and family called to fix their spaces; wants clients to feel *calm that lasts*; DFW-based; has worked across Texas. Two years in the industry. Number of homes completed is not stated.
- **Privacy Policy and Terms**: standard drafts matched to the site's real data use (form, GA4, Turnstile, Resend). Recommend a lawyer review before launch.
- **GEO/AEO/SEO extras added:** "At a glance" block on each service page (what / where / starting price / lead time / who), answer-first FAQ (12 questions, 40–60-word answers, dated), `llms.txt` (cheap), IndexNow, Bing Webmaster, Organization + ProfessionalService + Service + Person + Article + BreadcrumbList schema, FAQPage schema (optional, harmless), no review markup.

## 10. Motion system (added 6 Oct 2026; overrides plan §0.2 and §8.5 where they conflict)
**Goal:** feels like a $15–20k custom build. Slow, weighted, never flashy. Content is visible without JS.

### What changed from the plan's bans
| Item | Plan | Now |
|---|---|---|
| Inertial scroll (Lenis) | not in plan | **Allowed**, desktop fine-pointer only. It smooths native scroll position; no snapping, no hijacked wheel |
| Parallax | "no constant parallax" | **Allowed in 4 places only**: hero image, Statement detail, Selected Work, Move-In stills |
| Custom cursor / trailing dot | banned | **Still banned.** Native pointer everywhere |
| Glassmorphism | banned | **Sticky header only** |
| Gradient background shifts | hard bands | **Soft morph** alabaster → limestone → walnut → alabaster |
| 3D, scroll-jacking, bounce, pills, shadows | banned | **Still banned** |

### Engine and loading
- GSAP core + ScrollTrigger + Lenis (~48KB gzip), dynamically imported after `load`/idle. Total homepage JS stays ≤ 100KB gzip.
- No Framer Motion (React only). Reveals toggle CSS classes from ScrollTrigger so the shared CSS easing is used; GSAP only drives scrubbed (scroll-linked) effects.
- `html.js` class gates initial hidden states. No JS, reduced-motion or Save-Data = final state shown instantly. All indexable text stays in server-rendered HTML.
- Lenis synced to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`, GSAP ticker). `data-lenis-prevent` on overlay menu and form fields. In-page anchors use `lenis.scrollTo` with header-height offset.

### Tokens
- One curve: `--ease: cubic-bezier(0.22, 0.61, 0.36, 1)`. Reveal 900ms, mask reveal 1100ms, image settle 1.06 → 1.0 over 1.6s, UI 300ms, page 500ms, stagger 80–120ms.

### Scroll effects
- **Reveals:** fade-up (24px), line-by-line headline/Statement reveal (SplitText, headline and Statement only), clip-path image reveal (`inset(0 0 100% 0)` → `inset(0)`) with inner scale settle.
- **Blur-to-sharp:** below-the-fold images only, using a tiny blurred placeholder that crossfades out when the full image decodes (no animated `filter`). The hero is **never** hidden: the poster is sharp at first paint (LCP).
- **Parallax:** ±5% translateY, scrub 0.6, wrapper `overflow: hidden`, image scaled 1.1 to avoid gaps. Desktop (≥1024px, hover-capable) only; static on phones.
- **Pinned/sticky:** CSS `position: sticky` + ScrollTrigger callbacks (no pin-spacers). Method: sticky numeral that crossfades per step. Move-In: sticky text column, three stills crossfade (empty → mid-setup → finished). Services index: row image slides in on hover.
- **Colour morph:** each section declares `data-bg="alabaster|limestone|walnut"`. The morph (tweening `--bg`/`--fg`) runs only inside ≥20vh of empty padding between sections, so text never sits on a mid-tone and AA contrast always holds. Sage appears only as hairline/numeral tint per section, never as text.
- *As built (6 Oct):* the morph is a CSS gradient seam (`.band.seam`, `--from` → `--bg`) painted inside the empty top padding of each band. Same visual as a scroll tween, zero JS, contrast-safe by construction. The header follows the band under it via IntersectionObserver.
- **Grain:** static noise tile at ~3% on bands and hero only. Not on case-study photos. No animation.

### Transitions and hover
- **Page:** cross-document View Transitions (`@view-transition { navigation: auto }`). Old page fades out and drifts up 8px (250ms); new fades in from 12px (500ms). Header has a persistent `view-transition-name`. Plain navigation as fallback. Off under reduced-motion.
- **Buttons:** rectangular, slow left-to-right fill (300–400ms). **Magnetic effect on the primary "Request a consultation" only**: ≤8px pull within an 80px radius, 500ms spring back, desktop fine-pointer only.
- **Links:** underline draws left to right. **Images:** scale 1.0 → 1.03 over 1.2s inside a clipped container, no shadows.
- **Header:** transparent over the hero; after ~60% of the hero it becomes `backdrop-filter: blur(14px) saturate(1.1)` over `color-mix(alabaster 82%)`, solid alabaster 96% where blur is unsupported. Same treatment on mobile.

### Performance
- Animate only `transform`, `opacity`, `clip-path`. `will-change` applied during animation and removed on complete. `content-visibility: auto` on below-fold sections. IntersectionObserver for lazy images.
- Disable Lenis and parallax when `navigator.connection.saveData`, `deviceMemory ≤ 4`, touch-only, or reduced-motion.
- Targets: 60fps on a mid-range Android, LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. ScrollTrigger refreshes after fonts load and on resize.

### Accessibility
- `prefers-reduced-motion`: no Lenis, parallax, magnetic, view transitions or morph (instant background change at section edges), instant reveals.
- Visible focus: 2px outline, 3px offset (ink on light, alabaster on walnut). Overlay menu traps focus, closes on Esc. Skip link. Sticky/pinned elements never trap keyboard focus. `scroll-margin-top` equals header height.

### Mobile
- No Lenis, parallax or magnetic. Simplified reveals (fade-up only, 700ms). Colour morph and frosted header kept (cheap).

## 11. Build log: step 3 (6 Oct 2026)
- Owner approved the homepage Statement paragraph and the Letter excerpt (6 Oct). Edits later are fine.
- Garage project: 2 days. Yaz designed it; her build partner built and installed the cabinetry, racks and wall system (they did not exist before); she then organized inside and around them.
- Reviews in use (owner-approved): Rose S. (full), Kennedy O. (excerpt), Samara C. (excerpt, budget line removed with an ellipsis). Dereck S. excluded.
- **Pantry case study hidden** (`draft: true`): failed the cohesion test. Guest bath kept; listing thumbnail cropped to curtain and shelves, case-study photos uncropped.
- Pages built: services overview + 6 service pages, work index + case studies, about (full letter), trade (with trade inquiry form), investment (print-to-PDF), FAQ (20 answers, FAQPage schema), where we work, inquire, privacy, terms, 404.
- Confirmed by owner (6 Oct): (1) built storage is quoted separately, fully transparent; Yaz handles it all and shows the client an image of the finished space before it is built (now a feature on /investment/ and in the FAQ); (2) keep the two-year deletion promise in the privacy policy; (3) full About letter approved; (4) guest bath cabinet swap was Yaz's work.
- **Owner has full authority** (Yaz delegated everything). Don't route approvals to Yaz. Standard: looks and performs like a $15–20k build, with technical, SEO, AEO, GEO and marketing done to a top-developer bar.

## 12. Build log: steps 4–7 (6 Oct 2026)
- **Journal:** 4 articles (move-in concierge, working with designers, how long whole-home takes, organizing custom cabinetry), each with an answer-first "In short" box, Article schema with Yaz as author, and published + last-reviewed dates. Linked in the footer and the mobile menu; moves to the primary nav at 6 articles.
- **Built storage** positioned as a feature: designed by Yaz, built by a partner, image of the finished space before it is built. On /investment/ and in a new FAQ.
- **Forms live:** `/api/inquire/` and `/api/trade/` (Vercel functions). Validation, honeypot, Turnstile (invisible, lazy-loaded), Resend email to Yaz with reply-to = the client, plus a client auto-reply (travel version outside DFW). Thank-you page `/inquire/thanks/` (noindex). Works without JS (303 redirect). Tested: valid, missing field, honeypot, no-JS, trade.
- **Analytics:** GA4 loads after first paint once `PUBLIC_GA4_ID` is set. Events listed in docs/launch-guide.md §3.7; `generate_lead` is the conversion.
- **SEO:** sitemap-index.xml, robots.txt (AI crawlers welcome), `/llms.txt` generated from site data, IndexNow (`npm run indexnow`). All 37 old Wix URLs plus `/post/*` 301 to new pages; `scripts/fix-redirects.mjs` makes them single-hop on Vercel and adds security + cache headers.
- **QA:** Lighthouse 100 / 100 / 100 / 100 (accessibility, best practices, SEO, agentic) on the home, inquire, service and journal pages. Mobile LCP 546 ms at 4× CPU and Slow 4G; CLS 0.
- **Known:** `npm audit` flags path-to-regexp inside the Vercel adapter's build-time router (not runtime, not user input). Fonts are cached a year; rename the file if a font changes.
- **Deferred:** Keystatic CMS (needs the GitHub repo first). No CSP header (inline JSON-LD, GA and theme scripts); add a nonce-based CSP later if required.

## 9. Still `{{TBD}}`
GA4 measurement ID (Yaz must create it) · Turnstile and Resend keys · optional `g.page/r/…` review-request link · Yaz's real portrait (replaces the AI-rendered ones) · out-of-state insurance confirmation (before promoting beyond Texas) · lawyer review of terms · Workspace decision for sending as hello@ · Pinterest/LinkedIn URLs (after launch) · any further Letter detail Yaz wants to add.

Resolved 6 Oct: Instagram, Google profile link, CPO (skipped, hidden), years in industry (2), logo/favicon (received, build tasks in §5), Colorado Springs consent (given).
