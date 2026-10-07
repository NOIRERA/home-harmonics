import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Old Wix URLs (from its sitemap, 6 Oct 2026) → new pages. 301 permanent. /post/* is handled in src/pages/post/.
const where = '/where-we-work/';
const wix = {
  '/blank': '/privacy/',
  '/blank-1': '/',
  '/blank-2': '/terms/',
  '/blank-3': '/',
  '/blog': '/journal/',
  '/book-online': '/inquire/',
  '/closet-organization-dallas': '/services/closet-and-wardrobe-organization/',
  '/pantry-organization-dallas': '/services/pantry-and-kitchen-organization/',
  '/garage-organization-dallas': '/services/signature-spaces/',
  '/home-organization': '/services/whole-home-organization/',
  '/home-organization-dallas': '/services/whole-home-organization/',
  '/home-organization/decluttering-services-dallas': '/services/whole-home-organization/',
  '/unpacking-services-dallas': '/services/move-in-concierge/',
  '/portfolio': '/work/',
  '/testimonials': '/work/',
  '/trusted-vendors': '/trade/',
  '/service-areas': where,
  '/service-page/general-consulation': '/inquire/',
  '/service-page/home-organization': '/services/whole-home-organization/',
  '/service-page/office-organization': '/services/signature-spaces/',
  '/service-page/other-services': '/services/',
  ...Object.fromEntries(
    [
      'allen-tx', 'arlington', 'carrollton', 'colleyville', 'dallas-tx', 'frisco-tx', 'ftworth', 'grapevine',
      'irving', 'mansfield', 'plano-tx', 'southlake', 'thecolony', 'waxahachie',
    ].map((c) => [`/professional-organizer-${c}`, where]),
  ),
  '/copy-of-professional-organizer-grandprairie': where,
  '/copy-of-professional-organizer-prosper': where,
};

export default defineConfig({
  site: 'https://www.home-harmonics.com',
  trailingSlash: 'always',
  output: 'static',
  // ~25 KB of CSS inlined: no render-blocking stylesheet requests (audit P1-17).
  build: { inlineStylesheets: 'always' },
  adapter: vercel(),
  integrations: [
    sitemap({ filter: (page) => !page.includes('/inquire/thanks/') }),
  ],
  // scripts/fix-redirects.mjs (run by `npm run build`) moves these ahead of Vercel's trailing-slash rule.
  redirects: Object.fromEntries(Object.entries(wix).map(([from, to]) => [from, { status: 301, destination: to }])),
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  vite: { optimizeDeps: { include: ['gsap', 'gsap/ScrollTrigger', 'lenis'] } },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      INQUIRY_TO: envField.string({ context: 'server', access: 'secret', default: 'hello@home-harmonics.com' }),
      EMAIL_FROM: envField.string({ context: 'server', access: 'secret', default: 'Home Harmonics <hello@home-harmonics.com>' }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GA4_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
