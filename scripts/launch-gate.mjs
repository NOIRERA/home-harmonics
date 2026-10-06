// Launch gate (plan §0.3): production fails if any indexable page still has a {{TBD token
// or a placeholder image. Pages with <meta name="robots" content="noindex"> are skipped.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The Vercel adapter writes static pages to .vercel/output/static; plain builds use dist.
const OUT = existsSync('.vercel/output/static') ? '.vercel/output/static' : 'dist';

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});

const problems = [];
for (const file of walk(OUT)) {
  const html = readFileSync(file, 'utf8');
  if (/<meta name="robots" content="noindex"/.test(html)) continue;
  const tbd = html.match(/\{\{TBD:[^}]*\}\}/g) ?? [];
  const placeholders = (html.match(/data-placeholder="true"/g) ?? []).length;
  if (tbd.length || placeholders) problems.push({ file, tbd: [...new Set(tbd)], placeholders });
}

if (problems.length) {
  console.error('\nLaunch gate FAILED. Fix these before production:\n');
  for (const p of problems) {
    console.error(`  ${p.file}`);
    p.tbd.forEach((t) => console.error(`    - ${t}`));
    if (p.placeholders) console.error(`    - ${p.placeholders} placeholder image(s)`);
  }
  process.exit(1);
}
console.log('Launch gate passed: no TBD tokens or placeholder images on indexable pages.');
