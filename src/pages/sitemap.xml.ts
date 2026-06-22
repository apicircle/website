import type { APIRoute } from 'astro';
import { FEATURES } from '../data/features';
import { SITE } from '../data/site';

// Custom sitemap — matches GitHub Pages' directory output (trailing slashes).
const paths = [
  '/',
  '/features/',
  '/download/',
  '/docs/',
  ...FEATURES.map((f) => `/features/${f.slug}/`),
];

export const GET: APIRoute = () => {
  const urls = paths
    .map((p) => `  <url><loc>${new URL(p, SITE.url).href}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
