import type { APIRoute } from 'astro';
import { FEATURES } from '../data/features';
import { SITE } from '../data/site';

// Custom sitemap — matches GitHub Pages' directory output (trailing slashes)
// and carries lastmod / changefreq / priority hints for crawlers.
interface Entry {
  path: string;
  changefreq: string;
  priority: string;
}

const entries: Entry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/features/', changefreq: 'weekly', priority: '0.9' },
  { path: '/download/', changefreq: 'weekly', priority: '0.8' },
  { path: '/docs/', changefreq: 'monthly', priority: '0.7' },
  ...FEATURES.map((f) => ({
    path: `/features/${f.slug}/`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${new URL(e.path, SITE.url).href}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority}</priority>\n` +
        `  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
