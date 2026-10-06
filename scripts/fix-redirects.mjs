// The Vercel adapter emits its trailing-slash rule (308) before our 301s, so /old-page would bounce to
// /old-page/ and 404. Move every 301 ahead of it and let it match with or without the slash: one clean hop.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const FILE = '.vercel/output/config.json';
if (existsSync(FILE)) {
  const config = JSON.parse(readFileSync(FILE, 'utf8'));
  const moved = config.routes
    .filter((r) => r.status === 301 && r.src?.endsWith('$'))
    .map((r) => ({ ...r, src: r.src.replace(/\/?\$$/, '/?$') }));
  const rest = config.routes.filter((r) => !(r.status === 301 && r.src?.endsWith('$')));
  const at = rest.findIndex((r) => r.status === 308);
  rest.splice(at === -1 ? 0 : at, 0, ...moved);

  // Headers on every response: security basics + long cache for fingerprint-free static assets.
  const headers = [
    {
      src: '^/(.*)$',
      continue: true,
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    },
    { src: '^/(fonts|icons)/(.*)$', continue: true, headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    { src: '^/(grain\\.png|favicon\\.ico)$', continue: true, headers: { 'Cache-Control': 'public, max-age=2592000' } },
  ];
  config.routes = [...headers, ...rest];
  writeFileSync(FILE, JSON.stringify(config, null, 2));
  console.log(`fix-redirects: ${moved.length} redirects moved ahead of the trailing-slash rule`);
}
