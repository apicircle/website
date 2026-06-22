import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// API Circle marketing site.
//
// Deployment: GitHub Pages with a custom domain (public/CNAME -> apicircle.dev).
// The app itself lives at studio.apicircle.dev; this marketing site is the apex.
//
// If you deploy to a project page instead (e.g. <user>.github.io/website),
// remove public/CNAME and set `base: '/website/'` below.
export default defineConfig({
  site: 'https://apicircle.dev',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [tailwind({ applyBaseStyles: false })],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
