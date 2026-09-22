# CLAUDE.md — apicircle.dev

Guidance for anyone writing copy or components in this repo. Read it before
changing a page.

## What this site sells

One sentence carries the product: **Lens builds a Code graph of your API from
its source** — every endpoint mapped to the code that implements it — and, using
the Code graph and the **Spec** (your OpenAPI contract), identifies **PR Review
drift**: where a pull request moves the API away from its contract.

The **API workspace is free** and needs no account. **Lens** is the paid half.
A page that blurs those two is the most damaging mistake available here: two
clicks away, `/pricing` says what is actually charged for, and a reviewer
comparing the two finds the contradiction first.

## Never type a plan fact

`src/data/pricing.ts` is **generated** —
`pnpm export:pricing -- --write ../website/src/data/pricing.ts` in the Lens
repo — from the entitlement catalogue, which is checked against the gate itself.

Never hand-write a price, plan name, capability label, workspace cap, trial
length or the currency note. Read them from `PLANS`, `TRIAL_DAYS` and
`PRICE_CURRENCY_NOTE`, or render `<PlanBadge plan="pro" />`, which prints the
plan's own name from its id. In a data string, use `planName('pro')` from
`src/data/feature-types.ts`: "See what Team includes" was typed by hand once.

A hard-coded `$18.99` in a comparison table is the single most likely mistake on
this site, because a table feels like page content rather than data.

## Terminology

- **Code graph**, always sentence case. Never "Code Graph", "Index map",
  "PR Impact Review" or "Endpoint Explorer" — all retired.
- **Spec** is the OpenAPI contract. **PR Review drift** is what a pull request
  changes against the Code graph and the Spec.
- `@apicircle-lens/rest-code-graph` only in code formatting, never in prose.
- **Endpoint context graph** is a different feature. Always write it in full.

## Must not claim

- Project generation, greenfield or serverless migration. The Build pillar is
  hidden in the initial release.
- Workspace sharing, a marketplace, releases, or repo topics. All hard-disabled.
- "100% accurate." The public benchmark is two FastAPI repositories and covers
  discovery only. If you cite it, cite its scope in the same sentence.
- That GitLab, Bitbucket or Azure DevOps have been exercised against a live
  host. They are covered against an emulator. Safe phrasing: *"Lens speaks
  GitLab, Bitbucket Cloud and Azure DevOps through each host's own review API."*
- HAR import or code generation as part of the free workspace. Both exist only
  as Lens MCP tools (`import.har`, `generate.code`), which are Pro.
- "17 auth schemes". The picker has 17 entries, but two are "No Auth" and
  "Inherit (parent folder)". Use `SITE.stats.authSchemes`.
- That the web app runs mock servers. A browser tab cannot listen on a port: it
  edits definitions, and Studio desktop or VS Code runs them.
- `.req.yaml` files, a "release ledger", "auto-created" working branches, or
  cross-workspace environments. None of them is true of Studio 2.0.
- That the Code graph panel shows trace folders or marks database writes. The
  desktop shows a call tree, and neither appears in its UI.
- SAML. The catalogue sells single sign-on over OIDC.
- A macOS or Linux Lens build, a hosted Lens web app, or the VS Code Lens
  extension. Lens desktop is Windows x64 only; the other two are not released.

**GitHub works on every plan, including free.** Only the other three hosts are
the paid `git-providers` capability. "GitHub is paid" would be badly wrong to
publish, and a table is where that error gets made.

The framework list is transcribed from
`lens/packages-lens/rest-code-graph/src/support.ts`. PHP is fallback-only; Ruby,
Elixir and Kotlin are unsupported.

## Voice

The old copy had no "powerful/seamless/leverage" filler — someone kept that out
deliberately. What gave it away as generated was **structure**: 29 rule-of-three
triads, "X, not Y" headings, every card body 20–33 words, nine identically
shaped sections in a row, 106 em-dashes.

`/lens`, `/security` and `/contact` already read like a person wrote them. **The
homepage moves toward their voice. They never move toward the homepage's.**

### Structural — these matter most

- **Vary the unit.** In any five sections, at least one has no eyebrow, one is a
  single paragraph with no grid, and one is a table or a visual. Never three
  consecutive full `<Section eyebrow title subtitle>` blocks.
- **Vary sentence length on purpose.** Each section wants one sentence under
  eight words and one over thirty.
- **Count to two, or to four.** Never pad a list to three. Where three is the
  truth, break the parallelism: different lengths, different grammatical shapes.
- **Lead with the smallest true sentence, then expand.** The old copy led with
  the grandest claim and retreated into detail.

### Sentence level

- One em-dash per screen. A paragraph with two gets rewritten, not repunctuated.
- No "X, not Y" in a heading. State what the thing is.
- **Every claim names a checkable noun** — a framework, a number, a file path, a
  verbatim UI label. A sentence with none is decoration: cut it, or make it
  specific.
- Write the caveat in the same voice as the claim. Plainly stated limits are
  unfakeable credibility, which is why `HostMatrix` puts GitLab's missing
  verdict in a cell rather than a footnote.
- Second person for actions, third for the product. *You press Submit. Lens
  reads the repository.*
- Contractions in body copy, not in headings.

## Screenshots

`public/screenshots/{dark,light}/<name>.webp`, captured by
`lens/regression/capture_marketing.py`, which drives the real app over CDP.
Studio screens come from the same Lens desktop app in Studio mode.
`<Screenshot>` renders **both** variants and CSS-toggles them, so a name missing
from one theme would break only in the other — and dark is the default, so a
missing dark file is invisible to whoever added it. `Screenshot.astro` now
**throws** at build time unless both files exist.

Raw captures land in `.screenshots-raw/`, outside `public/`: Astro copies
`public/` verbatim into `dist/`, so raws kept there were published alongside the
webp made from them.

## Components worth knowing

- `Icon.astro` **throws** on an unknown name. `/pricing` shipped an empty `<svg>`
  for months before that guard existed.
- `PlanBadge` / `PlanTable` read `PLANS`. `HostMatrix` reads `src/data/hosts.ts`,
  transcribed from each provider's `ReviewCapabilities` descriptor.
- `DriftDiff` is HTML, not an image, so it themes itself and stays indexable.
  It renders whatever props you pass: only illustrate findings the product
  genuinely produces.
- `CTA` takes `primary` / `secondary`. It renders on eight pages; a page about
  the paid product should not end by pitching the free one.
- `FeatureExtras` renders a feature's `extras` (frameworks table, drift findings,
  host matrix, account tabs …) from data modules that name their source.
- `Rich` renders `` `code` `` spans inside data strings, as text: nothing in a
  data string is parsed as HTML.

## Feature pages

One entry per page, in `src/data/features-lens.ts` (first) and
`src/data/features-studio.ts`. `features.ts` assembles them and **throws** on a
duplicate slug, a removed published route, a Lens entry after a Studio one, a
Lens page on Free or a Studio page on a paid plan, and a meta description over
160 characters or with a backtick or an em-dash in it.

- `bullets` and `highlights` are typed as two or four, never three.
- A highlight or sample that needs a different plan from its page carries
  `plan`, which renders a badge.
- Lens pages pass `lens` to `BaseLayout`, so their structured data is the paid
  product's, and end on the Lens call to action.
- Every UI label in quotes is verbatim from the product source. Check it there,
  not in a doc: the docs had drifted in a dozen places.

## Don't delete routes

GitHub Pages has no redirect layer. The Postman/Insomnia SEO pages are this
site's only search traffic. If a route must die, use the `account.astro`
pattern: a `noindex` page with a meta refresh.

## Commands

```bash
pnpm dev           # local dev server
pnpm build         # static build to dist/
pnpm check         # claims guard, then astro check
pnpm check:claims  # the guard on its own
```

`pnpm build` passing does **not** mean the types are sound: it does not
typecheck. Two dead `SITE.stats` references rendered `undefined` into a live
page through a green build. Run `pnpm check`.

## The claims guard

`scripts/check-claims.mjs` runs first in `pnpm check` and fails the build on the
mistakes this site has actually shipped: retired terminology, the two npm
packages no longer published, claims the gate denies, and a money amount typed
anywhere but the generated catalogue. Every rule names what to use instead.

It is a grep, so it is blunt on purpose. A line that must quote a banned string
as history — an explanatory comment about the mistake, usually — carries
`claims: history` in a comment and is skipped. A rule's `unless` exempts a line
that also names the true context: "HAR" and "code generation" are false for the
free workspace and true on the line that says they are MCP tools. `src/data/pricing.ts` is exempt
entirely: it is generated, it is the authority the rules defer to, and a marker
added to it would be wiped by the next export.

Adding a rule is cheaper than re-finding the same mistake. When you fix a false
claim, add the rule in the same change.
