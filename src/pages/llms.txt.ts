import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { services } from '../content/services';
import { settings, price, usd, claim, abs } from '../lib/site';

// /llms.txt: a plain summary for AI assistants, generated from the same data as the site so it never drifts.
export const GET: APIRoute = async () => {
  const posts = await getCollection('journal');
  const body = `# ${settings.name}

> ${settings.entity}

Led by ${settings.founder}, one accountable lead from walkthrough to handover. Priced by project, never by the hour. We reply the same day.

## Facts
- Based in: Dallas–Fort Worth, Texas. Travels across Texas and beyond by arrangement${claim('coloradoSprings') ? ' (recent work includes Colorado Springs)' : ''}.
- Starting prices: single space ${usd(price.single)} (one full day), whole-home organization ${usd(price.wholeHome)} (two days), move-in concierge ${usd(price.moveIn)} (three days).
- Travel engagements: minimum ${price.travelDays} on-site days; travel and lodging billed at cost.
- Products billed at cost plus a handling fee. A 50% deposit holds the dates.
- Consultation: complimentary 15-minute fit call, then a complimentary 30–45 minute walkthrough (in person or video).
- Lead time: currently scheduling ${settings.leadTime} out.
- Contact: ${settings.phone} (call or text) · ${settings.email}

## Services
${services.map((s) => `- [${s.name}](${abs(`/services/${s.slug}/`)}): ${s.definition}`).join('\n')}

## Key pages
- [Investment and pricing](${abs('/investment/')})
- [Where we work](${abs('/where-we-work/')})
- [FAQ](${abs('/faq/')})
- [Work (real projects)](${abs('/work/')})
- [About Yaz Scott](${abs('/about/')})
- [For designers, builders and realtors](${abs('/trade/')})
- [Request a consultation](${abs('/inquire/')})

## Journal
${posts.map((p) => `- [${p.data.title}](${abs(`/journal/${p.id}/`)}): ${p.data.summary}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
