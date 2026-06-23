# SEO & AI-engine optimization

How **apicircle.dev** is optimized for search engines (Google, Bing) and AI
answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini), and
the **off-page steps only you can do** to actually get ranked and cited.

> **Read this first.** Code gets the site *eligible* to rank. It cannot make a
> brand-new domain *appear* in Google — that needs indexing + authority, which
> are off-page. The checklist below is the part that moves the needle on
> "I searched `apicircle` and saw nothing."

---

## What's already done in this repo

On-page and technical SEO/GEO is wired up and verified in the build:

- **Entity & structured data** — every page emits a single schema.org `@graph`
  (`Organization`, `WebSite`, `SoftwareApplication`, `WebPage`), plus
  `BreadcrumbList` on inner pages and a 10-question `FAQPage` on the home page.
  Built from [`src/data/seo.ts`](src/data/seo.ts). This is how Google and AI
  engines learn that "API Circle" / "APICircle" / "apicircle.dev" are one entity.
- **Keyword-targeted titles, descriptions & `keywords`** — tuned for *API
  client, API testing, API mock server, API devtools, Postman/Insomnia
  alternative, MCP / AI API client*. Central list in [`src/data/site.ts`](src/data/site.ts).
- **Crawler directives** — `<meta name="robots" content="index, follow,
  max-image-preview:large, …">` site-wide; the 404 stays `noindex`.
- **AI-crawler-friendly `robots.txt`** — explicitly **allows** GPTBot,
  OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, CCBot and
  more, so the site can be used and cited by AI engines. [`public/robots.txt`](public/robots.txt)
- **`llms.txt`** — a structured Markdown overview for LLMs (per llmstxt.org),
  with key facts and a quotable FAQ. [`public/llms.txt`](public/llms.txt)
- **FAQ content** — visible accordion on the home page whose copy *exactly*
  matches the `FAQPage` schema (a Google rich-result requirement). Answers are
  written as self-contained facts, which is what AI engines quote.
  [`src/data/faqs.ts`](src/data/faqs.ts)
- **Sitemap** with `lastmod` / `changefreq` / `priority`, Open Graph + Twitter
  cards with alt text, canonical URLs, and a PWA `site.webmanifest`.
- **Verification hooks** — paste tokens into `SITE.verification` and the
  `<meta>` tags render automatically (see below).

### Keep it accurate when editing

- Don't claim an **OSI "open source"** license — the product is
  **source-available**. The copy uses that term deliberately.
- Don't add `aggregateRating`/review stars unless they're real. Fake ratings get
  manual actions from Google.
- Edit facts in `src/data/site.ts` and `src/data/faqs.ts`; the schema, FAQ, and
  `llms.txt` should agree. (`llms.txt` is hand-maintained — update it alongside.)

---

## Off-page checklist — do these to actually rank (in priority order)

### 1. Verify the site in Search Console & Bing (do this today)
1. **Google Search Console** → https://search.google.com/search-console — add
   `apicircle.dev`. Prefer **DNS (domain) verification** so it covers
   `studio.apicircle.dev` too. (Or paste the token into
   `SITE.verification.google` and redeploy.)
2. **Submit the sitemap**: in Search Console → *Sitemaps* → add
   `https://apicircle.dev/sitemap.xml`.
3. **Request indexing**: *URL Inspection* → enter `https://apicircle.dev/` →
   *Request indexing*. Repeat for `/features`, `/download`, `/docs`.
4. **Bing Webmaster Tools** → https://www.bing.com/webmasters — add the site
   (you can import from Google), submit the sitemap. *Bing also feeds ChatGPT
   search*, so this doubles as AI-engine distribution.

### 2. Make the brand unambiguous (helps "apicircle" resolve to you)
- Ensure the **GitHub org** (`github.com/apicircle`) and the **studio repo**
  have a clear description + `apicircle.dev` as the homepage link, and topics
  like `api-client`, `api-testing`, `mcp`, `postman-alternative`.
- Keep the name spelled consistently as **"API Circle"** (with "APICircle" as a
  known alias) everywhere off-site — npm, VS Code Marketplace, Open VSX, social.
- Consider a **Google Knowledge Panel** later via consistent `sameAs` profiles
  (already in our schema) + a Wikidata entry once there's third-party coverage.

### 3. Build authority & citations (the slow but decisive part)
Search rank and AI recommendations both track **who links to / mentions you**:
- Submit to developer directories: Product Hunt, AlternativeTo (as a *Postman
  alternative*), Slant, SaaSHub, awesome-mcp / awesome-api-tools lists on GitHub.
- Publish the packages prominently: npm (`@apicircle/cli`,
  `@apicircle/mcp-server`), VS Code Marketplace, Open VSX — all link back.
- Write a launch post / dev.to / Hashnode article and a short README badge
  linking to `apicircle.dev`. Answer relevant questions on Stack Overflow /
  Reddit r/webdev with genuine help + a link where appropriate.
- Get listed in **MCP ecosystem** catalogs — AI engines lean on these when asked
  "best API tools with MCP".

### 4. AI-engine specifics (GEO)
- The clearer and more *factual/quotable* the copy, the more AI engines cite it —
  the FAQ + `llms.txt` are built for this. Keep stats concrete (94 MCP tools, 17
  auth schemes, 5 surfaces).
- AI answers are downstream of the open web: the citations in step 3 are also
  what gets you into ChatGPT/Perplexity/Gemini answers. There is no "submit to
  ChatGPT" button — coverage + Bing indexing is the path.

### 5. Measure
- Search Console: *Performance* (impressions/clicks for `apicircle`, `api
  client`, `postman alternative`, …) and *Pages* (indexed count).
- Validate structured data: https://search.google.com/test/rich-results and
  https://validator.schema.org — paste `https://apicircle.dev/`.
- Re-check `apicircle` brand search after indexing (usually days to a few weeks
  for a new domain).

---

## Analytics (Google Analytics 4)

Analytics is wired up and **off by default**. To turn it on:

1. Create a **GA4 property**: https://analytics.google.com → *Admin* → *Create*
   → *Property*. Add a **Web** data stream for `https://apicircle.dev`.
2. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`) from the data stream.
3. Paste it into `SITE.analytics.googleAnalyticsId` in
   [`src/data/site.ts`](src/data/site.ts) and redeploy.

How it behaves:

- The gtag.js snippet renders on every page **only in production builds** — never
  during `astro dev`, so your local browsing doesn't pollute the stats. Component:
  [`src/components/Analytics.astro`](src/components/Analytics.astro).
- A GA4 Measurement ID is **public** (it ships in the page HTML), so committing it
  is fine and expected. (If you'd rather not commit it, it's also harmless to.)
- **Test locally** with a production bundle: `pnpm build && pnpm preview`, then
  watch *Realtime* in GA4 (or DebugView). It won't show in `pnpm dev`.
- **Consent:** this is a plain GA4 install (GA4 anonymizes IPs by default). If you
  serve EU visitors and want a cookie-consent banner / Consent Mode, that's a
  separate follow-up — ask and it can be added.

## Quick reference

| Want to change… | Edit |
| --- | --- |
| Keywords, title, alt text, `sameAs`, verification, GA4 ID | `src/data/site.ts` |
| FAQ questions/answers (also update `llms.txt`) | `src/data/faqs.ts` |
| Structured-data shape | `src/data/seo.ts` |
| Per-page meta / breadcrumbs | the page in `src/pages/` (props on `<BaseLayout>`) |
| AI-crawler rules | `public/robots.txt` |
| LLM overview | `public/llms.txt` |
