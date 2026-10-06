import settings from '../content/settings.json';
import claims from '../content/claims.json';
import testimonials from '../content/testimonials.json';

export { settings };

export type ClaimKey = keyof typeof claims;
/** Claims ledger gate: never render a claim whose flag is false. */
export const claim = (key: ClaimKey) => claims[key].satisfied === true;

export const usd = (n: number) => '$' + n.toLocaleString('en-US');

// Prices derive from one day rate so a raise is one edit.
const d = settings.minimumDays;
export const price = {
  single: settings.dayRate * d.single,
  wholeHome: settings.dayRate * d.wholeHome,
  moveIn: settings.dayRate * d.moveIn,
  travelDays: d.travel,
};

/** Approved quotes with real text only. Empty text = not shown. `excerpt` (if set) is what displays. */
export const voices = testimonials
  .filter((t) => t.approved && t.text)
  .map((t) => ({ ...t, display: t.excerpt ?? t.text! }));
export const testimonial = (id: string) => voices.find((v) => v.id === id);

export const abs = (path: string) => new URL(path, settings.url).href;

export const crumbSchema = (items: { label: string; href: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', href: '/' }, ...items].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.href) })),
});

export const serviceSchema = (s: { name: string; slug: string; definition: string; from?: number }) => ({
  '@type': 'Service',
  name: s.name,
  serviceType: s.name,
  description: s.definition,
  url: abs(`/services/${s.slug}/`),
  provider: { '@id': abs('/#business') },
  areaServed: orgSchema().areaServed,
  ...(s.from && {
    offers: { '@type': 'Offer', priceCurrency: 'USD', priceSpecification: { '@type': 'PriceSpecification', minPrice: s.from, priceCurrency: 'USD' } },
  }),
});

export function orgSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': abs('/#business'),
    name: settings.name,
    url: abs('/'),
    description: settings.entity,
    telephone: settings.phoneE164,
    email: settings.email,
    logo: abs('/icons/icon-512.png'),
    image: abs('/icons/icon-512.png'),
    address: { '@type': 'PostalAddress', addressLocality: 'Dallas', addressRegion: 'TX', addressCountry: 'US' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Dallas–Fort Worth' },
      { '@type': 'State', name: 'Texas' },
      ...(claim('coloradoSprings') ? [{ '@type': 'City', name: 'Colorado Springs, Colorado' }] : []),
    ],
    founder: { '@type': 'Person', '@id': abs('/about/#yaz'), name: settings.founder },
    sameAs: [settings.instagram, settings.googleProfile],
  };
}
