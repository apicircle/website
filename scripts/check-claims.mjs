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
    use: 'nothing. The public benchmark is two FastAPI repositories and covers discovery only',
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
    // The Lens web app is not launched. It was removed from the header and the
    // legal pages by hand once already.
    pattern: /lens\.apicircle\.dev/,
    where: (p) => p !== join('src', 'data', 'site.ts'),
    use: 'nothing — the Lens web app is not launched, and only `SITE.lensUrl` may name it',
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
 */
const SKIP_FILES = new Set([join('src', 'data', 'pricing.ts')]);
const EXTENSIONS = /\.(astro|ts|tsx|js|mjs|md|txt|json)$/;

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
