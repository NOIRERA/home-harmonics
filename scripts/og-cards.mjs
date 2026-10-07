// Designed social cards (1200×630) for every indexable page → public/og/<slug>.jpg.
// Base.astro uses a card when it exists, otherwise the page's own image.
//
// Renders the built site in a headless browser so the cards use the real fonts:
//   npm run build && PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/og-cards.mjs && npm run build
// Playwright is not a project dependency; point PLAYWRIGHT at any install (or `npm i -D playwright`).
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT ?? 'playwright');
const ROOT = '.vercel/output/static';
const OUT = 'public/og';
const SKIP = ['/inquire/thanks/', '/404.html'];
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml' };

const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== '_astro') walk(p); }
    else if (f === 'index.html') pages.push('/' + dir.slice(ROOT.length + 1) + (dir === ROOT ? '' : '/'));
  }
})(ROOT);

const server = createServer((req, res) => {
  let p = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (p.endsWith('/')) p += 'index.html';
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
}).listen(4411);
const base = 'http://127.0.0.1:4411';
const mark = `data:image/png;base64,${readFileSync('src/assets/brand/mark-ink.png').toString('base64')}`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const card = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const path of pages.filter((p) => !SKIP.includes(p)).sort()) {
  await page.goto(base + path, { waitUntil: 'load' });
  const d = await page.evaluate(() => {
    const h1 = document.querySelector('main h1');
    const words = h1?.querySelector('.words');
    const title = words
      ? [...words.childNodes].map((n) => (n.nodeName === 'BR' ? '<br>' : n.querySelector?.('em') ? `<em>${n.textContent}</em>` : n.textContent)).join('').replace(/<\/em>\s*<em>/g, ' ')
      : document.title.split(' | ')[0];
    const img = document.querySelector('.hero-media img, .ph-img img') ?? document.querySelector('main .img img');
    return { eyebrow: h1?.querySelector('.eyebrow')?.textContent?.trim() ?? '', title, img: img?.getAttribute('src') ?? null };
  });
  const img = d.img ?? '/_astro/' + readdirSync(join(ROOT, '_astro')).find((f) => f.startsWith('drawer') && f.endsWith('.webp'));
  const eyebrow = path === '/' ? 'Home organization & move-in setup' : d.eyebrow.split('·')[0].trim();
  await card.setContent(`<!doctype html><html><head><style>
    @font-face { font-family: N; src: url(${base}/fonts/newsreader.woff2) format('woff2'); font-weight: 200 800; }
    @font-face { font-family: N; src: url(${base}/fonts/newsreader-italic.woff2) format('woff2'); font-weight: 200 800; font-style: italic; }
    @font-face { font-family: H; src: url(${base}/fonts/hanken-grotesk.woff2) format('woff2'); font-weight: 100 900; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; display: grid; grid-template-columns: 1fr 470px; background: #F3EFE8 url(${base}/grain.png); color: #1E1B18; }
    .t { display: grid; grid-template-rows: auto 1fr auto; padding: 64px 64px 56px 72px; }
    .brand { display: flex; align-items: center; gap: 14px; font: 400 15px/1 H; letter-spacing: .26em; text-transform: uppercase; }
    .brand img { width: 30px; height: 30px; object-fit: contain; }
    .mid { align-self: center; display: grid; gap: 26px; }
    .eb { font: 500 15px/1.4 H; letter-spacing: .16em; text-transform: uppercase; color: #5f564d; }
    h1 { font: 300 64px/1.04 N; letter-spacing: -.02em; text-wrap: balance; }
    h1.long { font-size: 52px; }
    em { font-style: italic; }
    .foot { display: flex; justify-content: space-between; font: 500 13px/1 H; letter-spacing: .16em; text-transform: uppercase; color: #5f564d; padding-top: 22px; border-top: 1px solid rgba(30,27,24,.22); }
    .im { background: #E4DDD0 url(${base}${img}) center / cover; }
  </style></head><body>
    <div class="t">
      <p class="brand"><img src="${mark}" alt="">Home Harmonics</p>
      <div class="mid"><p class="eb">${eyebrow}</p><h1 class="${d.title.replace(/<[^>]+>/g, '').length > 46 ? 'long' : ''}">${d.title}</h1></div>
      <p class="foot"><span>home-harmonics.com</span><span>Dallas–Fort Worth · Texas &amp; beyond</span></p>
    </div>
    <div class="im"></div>
  </body></html>`, { waitUntil: 'networkidle' });
  await card.evaluate(() => document.fonts.ready);
  const slug = path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
  await card.screenshot({ path: `${OUT}/${slug}.jpg`, type: 'jpeg', quality: 84 });
  console.log(`${OUT}/${slug}.jpg  ${eyebrow} — ${d.title.replace(/<[^>]+>/g, '')}`);
}

await browser.close();
server.close();
