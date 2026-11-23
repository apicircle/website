# API Circle — Website

The marketing and documentation website for **API Circle**, deployed to
GitHub Pages at **[apicircle.dev](https://apicircle.dev)**. (The desktop app is
on [/download](https://apicircle.dev/download); the free API workspace also runs
in the browser at [studio.apicircle.dev](https://studio.apicircle.dev).)

Read [`CLAUDE.md`](CLAUDE.md) before changing copy: it lists what the site must
not claim, and `scripts/check-claims.mjs` fails the check on it.

Built with **[Astro](https://astro.build)** + **Tailwind CSS** — it ships
near-zero JavaScript, so it scores at the top of the Lighthouse range and loads
instantly. Light and dark themes are first-class, mirroring the product's own
theme tokens (brand violet `#8b5cf6` plus the six connection-node accents from
the logo).

## Develop

Requires Node ≥ 20 and pnpm 10 (`packageManager` pins 10.33.2, which CI uses).

```bash
pnpm install
pnpm dev        # → http://localhost:4321
pnpm build      # static output to ./dist
pnpm preview    # serve the production build locally
pnpm check      # claims guard (scripts/check-claims.mjs), then astro check
pnpm check:claims   # the claims guard on its own
```

`pnpm build` does not type-check, and the deploy workflow runs only `pnpm build`:
neither the claims guard nor `astro check` gates a deploy. Run `pnpm check`
before you push to `main`.

## Project structure

```
website/
├── public/
│   ├── CNAME                     # custom domain (apicircle.dev)
│   ├── .nojekyll · site.webmanifest
│   ├── favicon.svg · logo.svg    # brand mark
│   ├── og.png                    # social card (generated)
│   ├── robots.txt
│   └── screenshots/{dark,light}/ # product screenshots, one set per theme
├── src/
│   ├── components/               # Astro components (Header, Hero, Spotlight, …)
│   ├── data/                     # site.ts · nav.ts · features*.ts · pricing.ts and parser-scores.ts (both generated) …
│   ├── layouts/                  # BaseLayout.astro (<head>/SEO, theme boot, header + footer) · LegalLayout.astro
│   ├── pages/                    # index, lens, lens/parser, enterprise, features/, pricing, download, docs,
│   │                             # security, contact, account (noindex redirect), git-backed-api-client,
│   │                             # privacy/terms/refunds (.md), 404, sitemap.xml.ts, llms.txt.ts
│   └── styles/global.css         # theme tokens (:root = light, html.dark = dark)
├── scripts/                      # check-claims.mjs (claims guard) · image generation / capture (see below)
├── CLAUDE.md · SEO.md            # copy rules · off-page SEO
├── astro.config.mjs · tailwind.config.mjs · tsconfig.json
└── .github/workflows/deploy.yml  # GitHub Pages deploy
```

Features are data. `src/data/features-lens.ts` (the paid Lens features, listed
first) and `src/data/features-studio.ts` (the free API workspace) hold one entry per
feature page; `src/data/features.ts` assembles them and fails the build on a
duplicate slug, a removed route, a Lens entry after a Studio one, a plan that
does not match the product, or a meta description over 160 characters or with a
backtick or an em-dash in it. The
`/features` index, every `/features/<slug>` page, the header menu, the footer's
Features column, the sitemap and `llms.txt` all read that one list. Plan names
come from `planName()` and `PlanBadge`, never typed.

## Theming

The site defaults to the visitor's OS preference and remembers the manual
toggle in `localStorage` (`apicircle-site-theme`). Tokens are RGB triplets in
`src/styles/global.css` consumed through Tailwind's
`rgb(var(--token) / <alpha-value>)` syntax, so every color flips between
`:root` (light) and `html.dark` (dark) automatically. A tiny inline script in
`BaseLayout.astro` sets the class before first paint to avoid a flash.

## Screenshots

Product screenshots are captured from the real API Circle desktop app (the
`@apicircle-lens/lens-desktop` package) in **both themes** (One Dark Pro for the
dark site, GitHub Light for the light site), so the product always matches the
page around it. Screens of the free workspace are taken from the same app in its
workspace mode. They are served from
`public/screenshots/{dark,light}/<key>.webp`; `Screenshot.astro` shows the
variant matching the active theme, and fails the build if either is missing.

To re-capture:

1. In the Lens repo, rebuild the desktop app:
   `pnpm --filter @apicircle-lens/lens-desktop build`.
2. From `lens/regression`, run `python capture_marketing.py` (or
   `--only <name>`). It stages a demo repository, drives the app over CDP and
   writes PNGs to `.screenshots-raw/{dark,light}/` in this repo.
3. Here, run `node scripts/process-screenshots.mjs` to turn them into webp.

Other scripts (each is standalone; run from this folder):

| Script | What it does |
| --- | --- |
| `node scripts/process-screenshots.mjs` | Converts the raw PNGs to webp in `public/screenshots/{dark,light}/`. |
| `node scripts/gen-supplements.mjs` | Draws the CLI-terminal and VS Code views for both themes. |
| `node scripts/gen-og.mjs` | Regenerates `public/og.png` (the 1200×630 social card). |
| `node scripts/capture-screenshots.mjs` | Legacy: the old Studio-web capture. It writes to `public/screenshots/_raw/`, which the processor never reads. |
| `node scripts/gen-placeholders.mjs` | Do not run: it overwrites real screenshots with wireframes. |

## Generated data

`src/data/pricing.ts` and `src/data/parser-scores.ts` are generated in the Lens
repository (`pnpm export:pricing -- --write ../website/src/data/pricing.ts` and
`pnpm export:parser-scores -- --write ../website/src/data/parser-scores.ts`).
Never edit them by hand; commit them when they arrive. `/lens/parser` reads the
scores through `src/data/parser-scores-view.ts`.

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

Content and brand assets © API Circle. The free API workspace's source is in the
[studio repository](https://github.com/apicircle/studio) under its
source-available licence; the Lens features are proprietary.
