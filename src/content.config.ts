import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Projects are Markdown so Yaz can add them later (Keystatic). Images reference ids in src/lib/media.ts.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    space: z.string(),
    summary: z.string(),
    scope: z.array(z.string()),
    duration: z.string().optional(),
    challenge: z.string(),
    strategy: z.string(),
    systems: z.array(z.string()),
    results: z.array(z.string()),
    before: z.string(),
    after: z.string(),
    detail: z.object({ zoom: z.number(), origin: z.string(), alt: z.string() }).optional(),
    /** object-position for listing thumbnails only, e.g. "50% 0%". */
    cover: z.string().optional(),
    /** Plan §7 photo-consent tier. */
    consent: z.enum(['none', 'anonymized_details', 'full_residence']),
    credit: z.string(),
    order: z.number(),
    published: z.coerce.date(),
    draft: z.boolean().default(false),
    service: z.string().optional(),
  }),
});

// Journal: Markdown articles (expertise content for SEO / AEO / GEO). `hero` is a media id.
const journal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    /** Shorter title for <title> when `title` would push it past ~60 characters. */
    seoTitle: z.string().optional(),
    description: z.string().max(160),
    /** Answer-first summary, 40–60 words; shown as "In short" and used in Article schema. */
    summary: z.string(),
    published: z.coerce.date(),
    reviewed: z.coerce.date(),
    hero: z.string(),
    service: z.string().optional(),
  }),
});

export const collections = { projects, journal };
