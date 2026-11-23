// Guard: the claims this site may not make, and the names it may not use again.
//
// Why this exists. Every rule below is a mistake that was actually shipped and
// found later, not a hypothetical:
//
//   * `/pricing` sold the MCP server at Pro and the CLI at Team while the
//     homepage, `/features/mcp-ai` and `/features/cli` gave both away free, and
//     `llms.txt` said "free across the web app, desktop app, CLI, and VS Code
//     extension". A Paddle reviewer compares claims against what is charged for,
//     and that is the contradiction they would find first.
//   * "94 tools" appeared six times. The real catalogue is a different number
//     and moves with what is installed, so the count was wrong in both
//     directions.
//   * `@apicircle/cli` and `@apicircle/mcp-server` were linked on npm for months
//     after this project stopped publishing them.
//   * `/git-backed-api-client` promised "as many workspaces as you need" while
//     the Free plan is capped at one.
//   * Releases, a marketplace and repo topics were sold on the homepage after
//     all three were hard-disabled.
//
// A grep is a cheap way to make each of those a build failure rather than
// something the next rewrite quietly reintroduces. It runs ahead of `astro
// check` in `pnpm check`.
//
// A line that must quote a banned string as history carries `claims: history`
// in a comment and is skipped — the same escape hatch the product repo's
// `check-terminology.mjs` uses.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Put this in a comment on a line that must quote a banned string as history. */
export const HISTORY_MARKER = 'claims: history';

/**
 * Each rule: what not to write, and what to do instead.
 *
 * `where` narrows a rule to paths it applies to, so a rule that is wrong in
 * prose but right in generated data does not have to be weakened for everyone.
 *
 * `unless` exempts a LINE that also matches it. Some words are false in one
 * context and true in another: HAR import and code generation do not exist in
 * the free workspace, but both are real MCP tools in Lens. A line that names
 * the MCP context is describing the true one.
 */
export const RULES = [
  // ---- Retired terminology (mirrors the product repo's guard) -------------
  {
    pattern: /\bCode Graph\b/,
    use: '"Code graph", in sentence case',
  },
  { pattern: /\bIndex[ -]map\b/i, use: '"Code graph"' },
  { pattern: /\bPR Impact Review\b/i, use: '"PR Review"' },
  { pattern: /\bEndpoint Explorer\b/i, use: '"Code graph" (the view\'s current title)' },

  // ---- Packages this project no longer publishes -------------------------
  {
    pattern: /@apicircle\/(?:cli|mcp-server)\b/,
    use: '@apicircle-lens/cli — the MCP server ships inside it, as `apicircle-lens mcp`',
  },
  {
    pattern: /\bnpx @apicircle\b/,
    use: 'the `apicircle-lens` binary from @apicircle-lens/cli',
  },

  // ---- Claims the gate or the product denies -----------------------------
  {
    pattern: /\b2 months free\b/i,
    use: `"Save ${'${ANNUAL_DISCOUNT_PERCENT}'}%" — the discount is read from the catalogue, and 2 months overstates it`,
  },
  {
    pattern: /\b100% accurate\b/i,
    use: 'nothing. Cite a figure from `PARSER_SCORES` (src/data/parser-scores-view.ts) with what it counts, and link /lens/parser',
  },
  {
    pattern: /\b\d+[- ](?:MCP[- ])?tools?\b(?!\s*(?:for|that|a))|\b\d+ tools\b/,
    use: 'no count. The catalogue size moves with what is installed and entitled',
  },
  {
    pattern: /\bas many workspaces\b/i,
    use: 'the cap from `PLANS[].workspaces` — Free is limited to one',
  },
  {
    pattern: /\bfingerprinted releases\b|\bpublic marketplace\b|\brepo topics\b/i,
    use: 'nothing. Releases, the marketplace and repo topics are hard-disabled',
  },
  {
    pattern: /\b(?:project generation|serverless migration|greenfield)\b/i,
    use: 'nothing. The Build pillar is hidden in the initial release',
  },
  {
    // The Code graph's tagline said it followed each route "database writes included".
    // The engine tags a `dbOp` on each block, but no Lens surface reads it.
    pattern: /\bdatabase writes included\b|\b(?:marks|flags|badges) (?:each |every )?database writes?\b/i,
    use: 'nothing. The Code graph shows a call tree and never marks database writes',
  },
  {
    // Send to Studio Editor's "Contract test" was described as taking its JSON Schema from
    // the code, with the Spec as the fallback. deriveContractAssertions reads the Spec first.
    pattern: /\bJSON Schema\b[^.]*\btaken from (?:the|your) code\b|"Contract test"[^.]*\bthe code returns\b/i,
    use: 'the Spec first: "from your Spec, or from the code where the Spec declares no body" (lens packages-lens/ui-lens/src/codegraph/assertions.ts)',
  },

  // ---- Things that must not be typed by hand -----------------------------
  {
    // A money amount anywhere but the generated catalogue. The plan called this
    // the single most likely mistake on the site, because a comparison table
    // feels like page content rather than data.
    pattern: /\$\d+\.\d{2}\b/,
    where: (p) => p !== join('src', 'data', 'pricing.ts'),
    use: 'a value read from `PLANS` — `src/data/pricing.ts` is generated and checked against the gate',
  },
  {
    // A parser score typed into copy. The only benchmark this site ever cited was
    // two repositories of one framework (claims: history), and a typed figure
    // outlives the parser it described: the export regenerates `parser-scores.ts`
    // on every parser change, and a number written beside it would not move.
    pattern:
      /\b\d{1,3}(?:\.\d+)?\s?%[^.\n]{0,60}\b(?:recall|precision|F1|accura(?:te|cy)|endpoints? (?:found|discovered)|fields? typed)\b|\b(?:recall|precision|F1|accuracy)\b[^.\n]{0,30}\b\d{1,3}(?:\.\d+)?\s?%/i,
    use: '`share()` over `SCORES` from src/data/parser-scores-view.ts. The figures are generated by `pnpm export:parser-scores` in the Lens repo',
  },
  {
    // The Lens web app is not launched. It was removed from the header and the
    // legal pages by hand once already.
    pattern: /lens\.apicircle\.dev/,
    where: (p) => p !== join('src', 'data', 'site.ts'),
    use: 'nothing — the Lens web app is not launched, and only `SITE.lensUrl` may name it',
  },

  // ---- Commands that do not run as printed --------------------------------
  // The /features/cli sample shipped `review --spec`, a flag `review` does not
  // have, and `--pull-request` without the `--repo` it refuses to run without.
  {
    pattern: /\bapicircle-lens review\b.*\s--spec(?![\w-])/,
    use: '`--openapi <file>` — `review` has no `--spec` flag (apps/cli/src/review/command.ts)',
  },
  {
    pattern: /--pull-request[ =]+\d+(?!.*--repo\b)/,
    use: 'add `--repo <owner/name>` — `review --pull-request` exits without it',
  },
  {
    pattern: /\bscaffold\b.*\s--new\b/,
    use: 'nothing — `scaffold --new` starts a new project, which is the hidden Build pillar',
  },
  // Scaffold moved from the Code graph to the Code editor, and the Code graph lost its
  // Scaffold action, its "Scaffold all" and the dialog. The feature page kept pointing there.
  {
    pattern: /Code graph · Scaffold|Scaffold (?:action|dialog|button) (?:in|on) the Code graph/,
    use: 'the Code editor — Scaffold lives there now, behind the Code changes setting (lens docs/planning/code-editor-and-code-changes.md)',
  },
  {
    pattern: /\bapicircle (?:run|mock|mocks|import|export|workspaces|folder)\b/,
    use: 'the `apicircle-lens` binary from @apicircle-lens/cli — no `apicircle` binary is published',
  },
  {
    pattern: /\.req\.yaml\b/,
    use: '`apicircle://<workspace>/requests/<folder>/<name>.yaml` — VS Code names a request by its folder, not a suffix',
  },

  // ---- Studio facts the old copy got wrong --------------------------------
  // Each of these shipped. The free workspace has no HAR import and no code
  // generation on any surface: both exist only as Lens MCP tools. The auth
  // picker's 17 entries include "No Auth" and "Inherit (parent folder)".
  {
    pattern: /\b17\b(?=.{0,30}\b(?:auth|schemes?)\b)/i,
    use: '`SITE.stats.authSchemes` (15) — the picker\'s other two entries are "No Auth" and "Inherit"',
  },
  {
    pattern: /\bHAR\b/,
    unless: /\bmcp|import\.har/i,
    use: 'nothing, or say it is the Lens MCP tool `import.har` — the free workspace cannot import HAR',
  },
  {
    pattern: /\bcode[- ]generation\b|\bgenerate (?:client )?code\b|\bcodegen\b/i,
    unless: /\bmcp|generate\.code/i,
    use: 'nothing, or say it is the Lens MCP tool `generate.code` — the free workspace has no code generation',
  },
  {
    pattern: /\bauto-?create(?:d|s)? (?:a )?working branch/i,
    use: '"Create working branch" — Studio names the branch for you; you create it',
  },
  {
    pattern: /\brelease (?:ledger|history)\b/i,
    use: 'nothing. Releases are hard-disabled',
  },
  {
    pattern: /\bcross-workspace\b|\bLink Workspaces?\b|\blinked workspaces?\b/i,
    use: 'nothing. Workspace sharing and linked sources are hard-disabled',
  },
  {
    pattern: /\b(?:nine|9) (?:AI |MCP )?clients\b/i,
    use: '`SITE.mcpClients` — the MCP panel installs into seven clients and gives four more by hand',
  },
  {
    pattern: /\bSAML\b/,
    use: 'nothing. The catalogue sells single sign-on over OIDC',
  },
  {
    // The old footer, og.png and the web manifest all said the free workspace
    // was something "an AI can drive". The MCP server that does that is Pro.
    pattern: /\b(?:an|any) AI can drive\b/i,
    use: 'nothing — the MCP server is a paid (Pro) surface',
  },
  {
    // The footer's copyright line said "© API Circle · Source-available" and
    // /docs said "API Circle is source-available". API Circle includes Lens,
    // which is proprietary. Only Studio, the free workspace, publishes its source.
    pattern: /\bsource[- ]available\b/i,
    unless: /\b(?:Studio|workspace|repository)\b/i,
    use: 'say which half: "Studio is source-available" — Lens is proprietary',
  },
  {
    // /download told Mac users to choose Open Anyway and to clear the app's
    // quarantine flag in Terminal. Since Lens 2.1.8 the macOS app is signed with
    // a Developer ID and notarized by Apple, and opens without either step.
    pattern: /\bOpen Anyway\b|\bcom\.apple\.quarantine\b|\bxattr -d/i,
    use: 'nothing. The Lens macOS app is signed and notarized, so it needs no first-run steps',
  },
  {
    // /download offered a Windows .exe that was not code-signed, with the
    // SmartScreen step to get past it, and a signed one "in progress". From
    // 2.1.9 Windows gets the app from the Microsoft Store only, which signs it.
    pattern: /\bSmartScreen\b|\bRun anyway\b|\.exe installer\b/i,
    use: 'SITE.links.lensStore. Windows installs the app from the Microsoft Store, which signs it',
  },

  // ---- Found against the production build (lens desktop 2.1.9), 2026-11-21 ----
  // Each of these was live on the site while production said otherwise.
  {
    // /features said Lens was "one desktop app, on Windows for now" and offered
    // "Download Lens for Windows", while /download and the surfaces table offered
    // Windows, macOS and Linux, and macOS and Linux had shipped since 2.1.0.
    pattern: /\bon Windows for now\b|\bfor Windows and point it\b/i,
    use: 'Windows, macOS and Linux. The desktop app is published for all three (src/data/surfaces.ts)',
  },
  {
    // Lens 2.1.5 renamed the severity every screen shows: the engine's `breaking`
    // reads "Critical" (lens packages-lens/ui-lens/src/ui/status.ts, SEVERITY_LABEL).
    // The site kept "graded `breaking`", "a breaking change" and a Breaking chip.
    pattern: /\bgraded\s+`?breaking\b|\bone of them breaking\b|\ba breaking change on\b|label: 'Breaking'/i,
    unless: /--fail-on/,
    use: '"Critical", as the Review panel labels it. `breaking` is only the CLI value of `--fail-on`',
  },
  {
    // Lens 2.1.7 renamed "Add endpoint" to "Map endpoint", and its submit to
    // "Map to handler" (lens packages-lens/ui-lens/src/codegraph/AddEndpointGuide.tsx).
    pattern: /"Add endpoint"|"Declare endpoint"/,
    use: '"Map endpoint", which opens "Map an endpoint", and "Map to handler"',
  },
  {
    // Lens 2.1.7 renamed the MCP panel's "Install <client>" to "Add to <client>"
    // (lens packages-lens/ui-lens/src/mcp/McpPanel.tsx).
    pattern: /"Install" writes\b|\bInstall Claude Desktop\b/,
    use: '"Add to Claude Desktop" (or "Update …" / "Remove from …")',
  },
  {
    // Lens 2.1.7 asks for a host's address once, on the session, and Azure DevOps
    // REQUIRES its "Organisation URL" (studio packages/ui-components/src/store/hostBaseUrl.ts).
    pattern: /\bAzure DevOps through an API base URL\b|\bself-managed host adds its API base URL\b/i,
    use: 'GitLab\'s optional "API base URL" (self-managed only) and Azure DevOps\' required "Organisation URL"',
  },
  {
    // Eight pages said "Every paid plan starts with a 30-day trial". The trial is
    // a customer's FIRST paid subscription's, one per customer; anybody who has
    // subscribed before is charged from day one (lens entitlements catalog.ts).
    pattern: /\bEvery (?:paid )?plan starts with\b/i,
    use: '`TRIAL_LINE` from src/data/feature-types.ts: the first paid subscription, one per customer',
  },
  {
    // Studio ddb6955 renamed the environment controls (studio
    // packages/ui-components/src/panels/env/EnvironmentsSidebar.tsx, EnvironmentsPanel.tsx).
    pattern: /\bMove up in priority\b|"Layer position"/,
    use: '"Move up" / "Move down", and "Used when sending · N of M"',
  },
  {
    // Lens 2.1.4 gave Send to Studio Editor a "Base URL" picker; the site still
    // described the old rule (the Spec's server "when that is absolute").
    pattern: /\bserver when that is absolute\b/i,
    use: 'the "Base URL" picker: `{{baseUrl}}`, a server the specs declare, or "Custom…"',
  },
  {
    // The panel shortcuts follow the tabs on screen, 1 to 9 (studio helpContent.ts,
    // "Keyboard Shortcuts"; lens desktop 2.1.3).
    pattern: /Ctrl\/Cmd\s*\+\s*1 to 7\b/,
    use: 'Ctrl/Cmd+1 to 9, which pick the tabs on screen from the left',
  },
  {
    // "Open draft PR" opens on whichever Git host the workspace is connected to.
    pattern: /draft PR"? puts the change up for review on GitHub\b/i,
    use: 'the Git host the workspace is connected to',
  },
  {
    // The homepage and the FAQ said "there is no automatic posting", while the
    // CLI's `review --comment` posts and updates a comment from CI on its own.
    pattern: /\bno automatic posting\b/i,
    unless: /\bdesktop app\b|\bin the app\b/i,
    use: 'scope it to the desktop app: the command line posts when a pipeline passes --comment or --submit',
  },
  {
    // The /features table sold a "Studio desktop" that "Updates itself", linked to
    // /download, which offers the API Circle desktop app for the free workspace,
    // and that app does not update itself.
    pattern: /\bStudio desktop\b/,
    use: 'the API Circle desktop app. It runs the free workspace with no account, and does not update itself',
  },
  {
    // /security and the Privacy Policy called the free workspace "open-source";
    // its LICENSE says it is NOT an open-source licence. The legal pages are fixed
    // with their next version (a version bump agreed with the production API).
    pattern: /\bopen[- ]source (?:API Circle |the )?(?:Studio|API workspace|workspace)\b/i,
    where: (p) => p !== join('src', 'pages', 'privacy.md') && p !== join('src', 'pages', 'terms.md'),
    use: '"source-available": the studio repository\'s licence is not an open-source licence',
  },
  {
    // /pricing said "Everything in the API Circle interface is free", above a table
    // of the paid Lens panels in that interface.
    pattern: /\bEverything in the API Circle interface is free\b/i,
    use: 'the API workspace is free; Lens is what is paid for',
  },
  {
    // /pricing sent invoicing, SSO and air-gapped-licence requests to SITE.email
    // while /contact sent the same requests to the support address.
    pattern: /mailto:\$\{SITE\.email\}/,
    use: '`LEGAL.supportEmail`, the address /contact gives for the same requests',
  },
  {
    // Lens 2.1.6: the desktop app opens a pull request by its number or link and
    // lists none. Listing open requests is the MCP tool lens.pr_review.list_pull_requests.
    pattern: /\bReads open requests\b|\bFinds your open requests across every repo\b|\bIt reads their open requests\b/i,
    use: 'opens a request by its number or link; listing them is an MCP capability',
  },
  {
    // Electron 44, since lens desktop 2.1.7, needs macOS 13 (Ventura) or later.
    pattern: /\bmacOS \((?:Apple silicon|a dmg)/,
    use: 'macOS 13 or later (Apple silicon and Intel)',
  },
  {
    // The FAQ counted "four more panels"; the Code editor ships too, once the
    // account's Code changes setting is on.
    pattern: /\bfour more panels\b/i,
    use: 'the Code graph, Review, Assistant and MCP, plus the Code editor once Code changes is on',
  },
  {
    // The Spec alignment bar gained "with errors" in lens desktop 2.1.7
    // (lens packages-lens/ui-lens/src/codegraph/alignment.ts): five counts.
    pattern: /\bOne banner, four counts\b/i,
    use: 'five counts: "with drift", "not implemented", "undocumented", "stubbed" and "with errors"',
  },
  {
    // The illustrated finding said "Shared `requireBearer` removed, and it reaches 2
    // endpoints" at a warning. The Review panel reports a removed guard as `auth-removed`,
    // which is Critical (lens packages-lens/pr-review/src/review.ts, SEVERITY and
    // `preRequestDetail`), in its own words.
    pattern: /removed, and it reaches \d+ endpoints/i,
    use: 'the Review panel\'s own sentence: "Auth/access-control `requireBearer` removed in the pre-request chain", severity Critical (`auth-removed`)',
  },
  {
    // The product is API Circle (user decision, 2026-11-21): the desktop app was
    // renamed from "API Circle Lens" in 2.1.9. Lens names the paid features, never
    // the app, and the free part is "the free API workspace". The legal pages keep
    // the old names until their next version, and `scripts/` drives and draws the
    // shipped apps, which still carry them (the studio app's title, the VS Code
    // extension's display name).
    pattern: /\bAPI Circle Studio\b|\bAPI Circle Lens\b|\bLens desktop\b|\bDownload Lens\b/,
    where: (p) =>
      p !== join('src', 'pages', 'privacy.md') && p !== join('src', 'pages', 'terms.md') && !p.startsWith(`scripts${sep}`),
    use: '"API Circle" or "the API Circle desktop app"; "the free API workspace"; Lens only for the paid features',
  },
];

const SKIP_DIRS = new Set(['node_modules', 'dist', '.astro', '.git', '.screenshots-raw']);

/**
 * Files this guard does not read.
 *
 * `src/data/pricing.ts` is GENERATED from the entitlement catalogue, which is
 * checked against the gate itself. It is the authority these rules defer to,
 * so policing it is backwards -- and a `claims: history` marker could not be
 * added to it anyway, because the next export would wipe it.
 *
 * `src/data/parser-scores.ts` is the same arrangement for the parser: generated
 * by running it, the authority the parser-score rule defers to.
 */
const SKIP_FILES = new Set([join('src', 'data', 'pricing.ts'), join('src', 'data', 'parser-scores.ts')]);
// `webmanifest` because `public/site.webmanifest` described the product as
// something "any AI can drive" long after the MCP server became paid, and
// nothing read it.
const EXTENSIONS = /\.(astro|ts|tsx|js|mjs|md|txt|json|webmanifest)$/;

/** Every file this guard reads, relative to the repo root. */
export function filesToScan(root = ROOT) {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (SKIP_DIRS.has(entry)) continue;
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!EXTENSIONS.test(entry)) continue;
      const rel = relative(root, full);
      // This file necessarily spells every string it forbids.
      if (rel === join('scripts', 'check-claims.mjs')) continue;
      if (SKIP_FILES.has(rel)) continue;
      out.push(rel);
    }
  };
  for (const top of ['src', 'public', 'scripts']) {
    const dir = join(root, top);
    try {
      if (statSync(dir).isDirectory()) walk(dir);
    } catch {
      // A missing directory is not a failure: `public` is optional.
    }
  }
  return out;
}

/** Violations in one file's text. Pure, so it can be exercised without a disk. */
export function violationsIn(relPath, text) {
  const found = [];
  const lines = text.split('\n');
  for (const [i, line] of lines.entries()) {
    if (line.includes(HISTORY_MARKER)) continue;
    for (const rule of RULES) {
      if (rule.where && !rule.where(relPath)) continue;
      if (rule.unless && rule.unless.test(line)) continue;
      const match = rule.pattern.exec(line);
      if (match) found.push({ file: relPath, line: i + 1, text: match[0], use: rule.use });
    }
  }
  return found;
}

function main() {
  const violations = filesToScan().flatMap((rel) =>
    violationsIn(rel, readFileSync(join(ROOT, rel), 'utf8')),
  );

  if (violations.length === 0) {
    console.log(`claims guard: clean (${RULES.length} rules)`);
    return 0;
  }

  console.error(`\nclaims guard: ${violations.length} problem(s)\n`);
  for (const v of violations) {
    console.error(`  ${v.file.split(sep).join('/')}:${v.line}`);
    console.error(`    found: ${v.text}`);
    console.error(`    use:   ${v.use}\n`);
  }
  console.error(
    `A line that must quote one of these as history carries "${HISTORY_MARKER}" in a comment.\n`,
  );
  return 1;
}

if (process.argv[1] && process.argv[1].endsWith('check-claims.mjs')) {
  process.exit(main());
}
