# Home Harmonics: website rebuild

Read in this order before building:
1. `docs/decisions-v1.2.md`: latest confirmed decisions. **Wins over everything else.**
2. `docs/home-harmonics-master-plan.md`: full brief (v1.1). Style/IA/SEO reference where v1.2 is silent.
3. `docs/reference/belarosa-refero.md`: style reference only. Missing from the repo; not required.

Rules that always apply:
- Claims ledger (`src/content/claims.json`, read via `claim()` in `src/lib/site.ts`) gates every claim. Never write a claim whose flag is false.
- Prices come from `dayRate` in `src/content/settings.json`; never hard-code a price.
- Photos: add to `PHOTO ASSETS/`, wire in `scripts/media.mjs`, run `npm run media`, register in `src/lib/media.ts` with a truth flag.
- `npm run build:prod` = build + launch gate (fails on `{{TBD` or placeholder images).
- Never fabricate reviews, press, clients, stats, prices, credentials. Use `{{TBD: ...}}`.
- Solo operator: say "Yaz", never "our team/crew".
- Banned: scroll-jacking/snapping, custom cursor, 3D, pills, card grids, shadows, bounce. Radius ≤ 2px. Glass only on the sticky header. Motion spec: decisions §10.
- All indexable text in server-rendered HTML. Production build fails on any `{{TBD` token or placeholder image.
- Real photos in `PHOTO ASSETS/` → masters in `media-masters/`, optimised copies in `public/media/`.
