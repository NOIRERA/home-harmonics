import type { APIRoute } from 'astro';

// Old Wix blog posts (/post/*) → the Journal, permanently.
export const prerender = false;
export const GET: APIRoute = ({ redirect }) => redirect('/journal/', 301);
