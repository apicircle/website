# API Circle — Website

The marketing & documentation website for **API Circle Studio**, deployed to
GitHub Pages at **[apicircle.dev](https://apicircle.dev)**. (The app itself
lives at [studio.apicircle.dev](https://studio.apicircle.dev).)

Built with **[Astro](https://astro.build)** + **Tailwind CSS** — it ships
near-zero JavaScript, so it scores at the top of the Lighthouse range and loads
instantly. Light and dark themes are first-class, mirroring the product's own
theme tokens (brand violet `#8b5cf6` plus the six connection-node accents from
the logo).

## Develop

Requires Node ≥ 20 and pnpm ≥ 9.

```bash
pnpm install
pnpm dev        # → http://localhost:4321
pnpm build      # static output to ./dist
pnpm preview    # serve the production build locally
pnpm check      # astro type-check
```

## Project structure

```
website/
├── public/
│   ├── CNAME                     # custom domain (apicircle.dev)
│   ├── favicon.svg · logo.svg    # brand mark
│   ├── og.png                    # social card (generated)
│   ├── robots.txt
│   └── screenshots/{dark,light}/ # product screenshots, one set per theme
├── src/
│   ├── components/               # Astro components (Header, Hero, Spotlight, …)
│   ├── data/                     # site.ts · nav.ts · features.ts (content)
│   ├── layouts/BaseLayout.astro  # <head>/SEO, theme boot script, header + footer
│   ├── pages/                    # index, features/, download, docs, 404, sitemap.xml.ts
│   └── styles/global.css         # theme tokens (:root = light, html.dark = dark)
├── scripts/                      # image generation / capture (see below)
├── astro.config.mjs · tailwind.config.mjs · tsconfig.json
└── .github/workflows/deploy.yml  # GitHub Pages deploy
```

Content is data-driven: edit `src/data/features.ts` and the home page, the
features index, and the six per-feature pages all update together.

## Theming

The site defaults to the visitor's OS preference and remembers the manual
toggle in `localStorage` (`apicircle-site-theme`). Tokens are RGB triplets in
`src/styles/global.css` consumed through Tailwind's
`rgb(var(--token) / <alpha-value>)` syntax, so every color flips between
`:root` (light) and `html.dark` (dark) automatically. A tiny inline script in
`BaseLayout.astro` sets the class before first paint to avoid a flash.

## Screenshots

Product screenshots are captured fresh from the running Studio web app in
**both themes** — One Dark Pro for the dark site, GitHub Light for the light
site — so the product always matches the page around it. They are served from
`public/screenshots/{dark,light}/<key>.webp`; `Screenshot.astro` shows the
variant matching the active theme.

Regeneration scripts (each is standalone; run from this folder):

| Script | What it does |
| --- | --- |
| `node scripts/capture-screenshots.mjs` | Drives the **running** Studio dev server (`http://localhost:5174`) with Playwright, seeds a realistic workspace into IndexedDB, and captures each panel in both themes to `public/screenshots/_raw/`. Resolves Playwright from the studio `e2e/web` workspace — Studio itself is never modified. |
| `node scripts/process-screenshots.mjs` | Crops/optimizes the raw PNGs to webp in `public/screenshots/{dark,light}/`. |
| `node scripts/gen-supplements.mjs` | Generates the CLI-terminal and VS Code views (which don't exist in the web app) for both themes. |
| `node scripts/gen-og.mjs` | Regenerates `public/og.png` (the 1200×630 social card). |
| `node scripts/gen-placeholders.mjs` | Wireframe placeholders for any missing screenshot slot. |

To re-capture: start the Studio web app (`pnpm dev:web` in the studio repo →
port 5174), then run `capture-screenshots.mjs` followed by
`process-screenshots.mjs`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes `./dist` to GitHub
Pages on every push to `main`.

1. Push this folder to a GitHub repository.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. The `public/CNAME` file points the site at `apicircle.dev`. Configure that
   custom domain in **Settings → Pages** and add the matching DNS records.

**Deploying to a project page instead** (e.g. `<user>.github.io/website`)?
Delete `public/CNAME`, then in `astro.config.mjs` set `site` to your Pages URL
and `base: '/website/'`. Astro rewrites internal links accordingly.

## SEO & AI-engine optimization

On-page SEO and generative-engine optimization (structured data, FAQ, `llms.txt`,
AI-crawler `robots.txt`, sitemap) are wired into the build. The **off-page steps**
that actually get the site indexed and cited — Search Console verification,
sitemap submission, and link/citation building — are documented in
[`SEO.md`](SEO.md). Start there if `apicircle` isn't showing up in search yet.

## License

Content and brand assets © API Circle Studio. See the
[studio repository](https://github.com/apicircle/studio) for the product's
source-available license.
