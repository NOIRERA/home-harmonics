# Home Harmonics: Launch Guide

Follow the parts in order. Each part says what to copy and where it goes.
Screens change over time; if a button has moved, look for the same words nearby.

**The six settings the site reads** (all go into Vercel, Part 2):

| Name | What it is | Where it comes from |
|---|---|---|
| `PUBLIC_GA4_ID` | Google Analytics ID, looks like `G-ABC123XYZ9` | Part 3 |
| `PUBLIC_TURNSTILE_SITE_KEY` | Spam check, public key | Part 4 |
| `TURNSTILE_SECRET_KEY` | Spam check, secret key | Part 4 |
| `RESEND_API_KEY` | Sends the form emails, starts with `re_` | Part 5 |
| `INQUIRY_TO` | Where inquiries arrive. Default `hello@home-harmonics.com` (no need to set) | — |
| `EMAIL_FROM` | Sender name. Default `Home Harmonics <hello@home-harmonics.com>` (no need to set) | — |

Never paste a **secret** key into chat, email or a document. Only into Vercel.

---

## Part 1 — GitHub ✅ done (6 Oct 2026)

The code is in a private repository: https://github.com/NOIRERA/home-harmonics (branch `main`).
Vercel deploys from it, and every push to `main` redeploys the site automatically.
The `PHOTO ASSETS` folder is included on purpose (the media script reads it).

---

## Part 2 — Deploy on Vercel (10 minutes)

1. vercel.com → **Add New… → Project** → pick the `home-harmonics` repository → **Import**.
2. Framework preset should read **Astro**. Leave Build Command as `npm run build`. Click **Deploy**.
3. When it finishes you get a preview address like `home-harmonics-xyz.vercel.app`. Open it and click around.
4. Environment variables: Project → **Settings → Environment Variables**. For each key in the table above: Name, Value, tick **Production** and **Preview**, **Save**.
5. After adding or changing any `PUBLIC_…` value: **Deployments** → the latest one → **⋯ → Redeploy**. (Public values are built into the pages.)

---

## Part 3 — Google Analytics 4, step by step

Use the Google account that owns the Google Business Profile, so everything lives in one place.

### 3.1 Create the account and property
1. Go to **analytics.google.com** and sign in.
2. Click **Start measuring** (or Admin ⚙ bottom-left → **Create → Account** if you have used Analytics before).
3. **Account name:** `Home Harmonics`. Leave the data-sharing boxes as they are. **Next**.
4. **Property name:** `home-harmonics.com`.
   **Reporting time zone:** United States — **Central Time**.
   **Currency:** US Dollar. **Next**.
5. **Business details:** Industry **Home & Garden**; Business size **Small**. **Next**.
6. **Business objectives:** choose **Generate leads**. **Create**. Accept the terms (country: United States).

### 3.2 Create the web data stream
7. Choose platform **Web**.
8. **Website URL:** `https://www.home-harmonics.com` · **Stream name:** `Website`.
9. **Enhanced measurement:** leave it **on**, then click the ⚙ gear beside it and switch **Form interactions** **off** (the site sends its own, cleaner form events). Keep Page views, Scrolls, Outbound clicks, File downloads. **Save**.
10. Click **Create stream**.
11. You'll see **Measurement ID** at the top right, like `G-ABC123XYZ9`. Copy it.
    Ignore the "installation instructions" panel; the site already has the code.

### 3.3 Connect it to the site
12. Vercel → Settings → Environment Variables → Name `PUBLIC_GA4_ID`, Value `G-ABC123XYZ9`, tick Production + Preview → Save → **Redeploy** (Part 2, step 5).

### 3.4 Check it works (5 minutes)
13. Open the live site on your phone (not a private window).
14. Analytics → **Reports → Realtime**. Within a minute you should see 1 user and your page.
15. Tap the phone number, scroll to the bottom of a page, click "Request a consultation". In Realtime → **Event count by Event name** you should see `phone_tap`, `scroll_75`, `cta_click`.

### 3.5 Mark the lead as a key event (the most important step)
16. Send one real test inquiry through the site (Part 7).
17. Wait until `generate_lead` appears: Admin → **Data display → Events** (can take up to 24 hours).
18. Click the ★ / toggle **Mark as key event** next to `generate_lead`. Optionally also `phone_tap`.
    Shortcut if you don't want to wait: Admin → **Key events → New key event** → type `generate_lead` → Save.

### 3.6 Housekeeping (5 minutes, do once)
19. **Keep data longer:** Admin → **Data collection and modification → Data retention** → Event data retention **14 months** → Save.
20. **Don't count yourselves:** search "what is my IP" on Google from home and copy the address. Admin → **Data streams → Website → Configure tag settings → Show more → Define internal traffic → Create**. Rule name `Home`, traffic_type `internal`, **IP address equals** your address → Create. Then Admin → **Data filters → Internal Traffic** → **Filter state: Active** → Save.
21. **Readable reports:** Admin → **Custom definitions → Create custom dimension** (event scope) for each parameter: `form`, `cta_text`, `page`, `project`.
22. After Part 8: Admin → **Product links → Search Console links → Link**.

### 3.7 What the site records
| Event | When |
|---|---|
| `cta_click` | Any "Request a consultation" or trade-inquiry link (`cta_text`, `page`) |
| `phone_tap` | Tap on the phone number |
| `email_click` | Tap on the email address |
| `form_start` | First interaction with a form (`form`) |
| `form_step1_submit` / `trade_form_submit` | Form sent successfully |
| `generate_lead` | Thank-you page after a real submission (**the conversion**) (`form`) |
| `scroll_75` | Reader reaches 75% of a page |
| `project_view` | A case study is opened (`project`) |

---

## Part 4 — Cloudflare Turnstile (spam protection, 10 minutes)

Invisible to real visitors; stops bots before they reach Yaz's inbox.

1. Sign in at **dash.cloudflare.com** (your existing account).
2. Left menu → **Turnstile** → **Add widget**.
3. **Widget name:** `Home Harmonics forms`.
4. **Hostnames** (add each): `home-harmonics.com`, `www.home-harmonics.com`, and your Vercel preview domain (e.g. `home-harmonics-xyz.vercel.app`).
5. **Widget mode:** **Invisible**. Pre-clearance: **No**. **Create**.
6. You'll see two keys:
   - **Site Key** → Vercel `PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** → Vercel `TURNSTILE_SECRET_KEY`
7. Save both in Vercel → **Redeploy**.
8. Test: send an inquiry on the live site. It should go through normally with nothing visible. (Once the secret is set, the server refuses any form without a valid Turnstile token.)

---

## Part 5 — Resend (form email delivery, 15 minutes + DNS)

Resend sends two emails per inquiry: the details to Yaz (reply goes straight to the client) and a polished confirmation to the client. Homes outside DFW get the travel version automatically.

1. **resend.com** → Sign up (free plan is plenty).
2. **Domains → Add Domain** → `home-harmonics.com` → Region **US East**.
3. Resend shows 3–4 DNS records (an **MX** and **TXT** on `send`, a **TXT** on `resend._domainkey`, and optionally a DMARC TXT). Keep this tab open; you add them in Cloudflare in Part 6, step 6.
4. After the records are added, click **Verify DNS Records**. Wait for **Verified** (minutes to an hour).
5. **API Keys → Create API Key** → Name `website` → Permission **Sending access** → Domain `home-harmonics.com` → Create. Copy the key (starts with `re_`, shown once).
6. Vercel → `RESEND_API_KEY` = that key → Save → **Redeploy**.
7. Until this is set, the live forms show a polite error and the phone number, so no inquiry is ever lost silently.

### Reply as hello@home-harmonics.com from Gmail (recommended)
So Yaz's replies come from the business address, not the Gmail address:
1. Resend → **API Keys → Create** → Name `gmail-smtp`, Sending access → copy it.
2. Gmail (Thehomeharmonics@gmail.com) → ⚙ **See all settings → Accounts and Import → Send mail as → Add another email address**.
3. Name `Yaz Scott · Home Harmonics`, Email `hello@home-harmonics.com`, untick "Treat as an alias" → Next.
4. SMTP server `smtp.resend.com`, Port `465`, Username `resend`, Password = the `gmail-smtp` key, **Secured connection using SSL** → Add Account.
5. Gmail emails a confirmation code to hello@ (arrives in the same inbox via Cloudflare routing, Part 6). Enter it.
6. Back in Accounts and Import: **Make default** for hello@, and choose **Reply from the same address the message was sent to**.

(Alternative: Google Workspace, ~$7/month, gives a full hello@ mailbox. Not required.)

---

## Part 6 — Domain switch (Wix → Cloudflare DNS → Vercel), go-live day

The old Wix site goes offline the moment the nameservers change, so do this only once the Vercel preview looks right.

1. **Vercel** → Project → **Settings → Domains** → add `www.home-harmonics.com` and `home-harmonics.com`. Set `home-harmonics.com` to **redirect to** `www.home-harmonics.com`. Vercel shows the DNS records it wants (usually an **A** record for the apex and a **CNAME** for www). Keep this tab open.
2. **Cloudflare** → **Add a domain** → `home-harmonics.com` → Free plan. Cloudflare scans the old records; delete any that point to Wix.
3. Cloudflare gives you **two nameservers** (like `ana.ns.cloudflare.com`).
4. **Wix** → Domains → `home-harmonics.com` → **Advanced → Change name servers** (or "Point to name servers") → paste Cloudflare's two → Save. (If Wix won't allow it for a Wix-registered domain, transfer the domain to Cloudflare Registrar instead; it's at-cost and keeps everything in one place.)
5. **Cloudflare → DNS → Records**: add Vercel's records from step 1. **Proxy status: DNS only (grey cloud)** for both.
6. Add Resend's records from Part 5 step 3 (also **DNS only**). Then Resend → Verify.
7. **Cloudflare → Email → Email Routing → Get started** → add `hello@home-harmonics.com` → destination `Thehomeharmonics@gmail.com` → verify from the Gmail inbox. Cloudflare adds its own MX/SPF records automatically.
8. Wait for Vercel's Domains page to show both domains as **Valid** with a certificate (minutes to a few hours).

---

## Part 7 — Launch checks (30 minutes)

- [ ] Open `https://home-harmonics.com` → lands on `https://www.home-harmonics.com/`.
- [ ] Old links redirect: try `/book-online`, `/professional-organizer-plano-tx`, `/closet-organization-dallas`, `/faq`.
- [ ] Send a test inquiry with a **Dallas** location → Yaz receives it; the client copy arrives; "Reply" goes to the client.
- [ ] Send one with **Austin, TX** → client copy includes the travel paragraph.
- [ ] Send a trade inquiry → both emails arrive.
- [ ] GA4 Realtime shows `generate_lead` (Part 3.4).
- [ ] Phone link opens the dialer on a phone; the sticky "Request a consultation" bar appears after the first screen.
- [ ] **Mobile speed:** run `https://pagespeed.web.dev/` on `/` and `/services/move-in-concierge/` (Mobile tab). Target LCP ≤ 2.5 s. If it is over, tell Claude: the next lever is the hero image.
- [ ] **Social preview:** paste `https://www.home-harmonics.com/` into a text message or https://www.opengraph.xyz/ → the designed card (headline, image, mark) appears.
- [ ] **Print:** on `/investment/`, "Print or save as PDF" gives a clean brief with the contact footer.

---

## Part 8 — Search engines and AI search (20 minutes)

1. **Google Search Console** → search.google.com/search-console → **Add property → Domain** → `home-harmonics.com` → copy the TXT record → Cloudflare DNS → Add record → Type TXT, Name `@`, Content = the value → Save → back in Search Console → **Verify**.
2. Search Console → **Sitemaps** → submit `https://www.home-harmonics.com/sitemap-index.xml`.
3. **Bing Webmaster Tools** → bing.com/webmasters → **Import from Google Search Console** (one click; Bing feeds ChatGPT search and Copilot).
4. Tell Bing and IndexNow about every page, from the project folder:

```bash
npm run indexnow
```

5. Analytics: Part 3.6 step 22 (link Search Console).

---

## Part 9 — Google Business Profile (owner actions, 20 minutes)

From the master plan §13.5a. On business.google.com:
- **Website:** `https://www.home-harmonics.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- **Appointment link:** `https://www.home-harmonics.com/inquire/?utm_source=google&utm_medium=organic&utm_campaign=gbp-appointment`
- **Description** (replace the old one): "Home Harmonics is a Dallas–Fort Worth-based home organization and move-in setup company led by Yaz Scott. We plan, source, and install organization systems for wardrobes, pantries, kitchens, and whole homes, and set up new homes for move-in. We travel to clients across Texas and beyond."
- **Services:** Move-In Concierge · Whole-Home Organization · Closet & Wardrobe Organization · Pantry & Kitchen Organization · Seasonal Resets. Remove garage-organization and "decluttering" emphasis.
- **Photos:** 10–20 real project photos (the garage pair, the guest bath, Yaz). Never the generated images.
- **Reviews:** reply to each of the 14, briefly and specifically. Ask every new client at day 14.

---

## After adding a page, article or project

New journal posts and projects work on their own: they get a social preview from their own image. For the designed card (headline + image), run once on a computer with the project, then commit:

```bash
npm run build && PLAYWRIGHT=$(npm root -g)/playwright/index.mjs npm run og && npm run build
```

(Needs Playwright installed once with `npm i -g playwright && npx playwright install chromium`; it is deliberately not a site dependency.) Then run `npm run indexnow` after the deploy.

## Later (optional)
- **Keystatic editor** so Yaz can add journal posts and projects in a browser. Ask Claude to set it up once the GitHub repo exists.
- **Real portrait of Yaz** to replace the AI-rendered ones (first priority for trust).
- **Out-of-state insurance** confirmation, then travel windows can be published.
