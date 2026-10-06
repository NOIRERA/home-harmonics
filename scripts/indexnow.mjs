// Tell Bing (and the IndexNow network that feeds several AI products) about every page.
// Run after a production deploy: `npm run indexnow`. Reads URLs from the built sitemap.
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const KEY = '7f3c9a1e5b8d4062a9e1c4f7b2d85e30'; // must match public/<KEY>.txt
const HOST = 'www.home-harmonics.com';

const OUT = existsSync('.vercel/output/static') ? '.vercel/output/static' : 'dist';
const urls = readdirSync(OUT)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .flatMap((f) => [...readFileSync(`${OUT}/${f}`, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]));

const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${r.status} for ${urls.length} URLs`);
