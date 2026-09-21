import type { APIRoute } from 'astro';
import { FAQS } from '../data/faqs';
import { FEATURES } from '../data/features';
import { PLANS, PRICE_CURRENCY_NOTE, TRIAL_DAYS } from '../data/pricing';
import { SITE } from '../data/site';

// llms.txt — the overview AI answer engines read. Generated, not hand-written.
//
// This lived at public/llms.txt for months, and it drifted badly: it still
// advertised a free CLI and a free MCP server long after both became paid, and
// it linked two npm packages this project no longer publishes. A second copy of
// the product facts is a second place for them to go wrong, and this copy was
// the one nobody opened. So the facts now come from the same modules the pages
// render from — FAQS, FEATURES, PLANS, SITE. Change a fact there, and the file
// an AI engine quotes changes with it.
//
// Format: https://llmstxt.org — an H1, a blockquote summary, then link sections.

/** `1 workspace` / `3 workspaces` / `unlimited workspaces`. */
function workspaces(count: string): string {
  if (/^\d+$/.test(count)) return `${count} workspace${count === '1' ? '' : 's'}`;
  return `${count.toLowerCase()} workspaces`;
}

/** `$18.99/month`, `$36.99/month per seat` — or free, where nothing is charged. (claims: history) */
function price(plan: (typeof PLANS)[number]): string {
  if (!plan.monthly) return 'no charge';
  return `${plan.monthly}/month${plan.perSeat ? ' per seat' : ''}`;
}

const planName = new Map(PLANS.map((p) => [p.id, p.name]));
const abs = (path: string): string => new URL(path, SITE.url).href;

const keyFacts: string[] = [
  'Category: API client, API testing tool, local mock server, and pull-request API review.',
  `Free, and no account: the whole API workspace — request editor, environments, run history, local mock servers, execution plans, imports, and GitHub-backed sync. ${workspaces(PLANS[0].workspaces)} is included.`,
  `Paid: API Circle Lens, which reads your repository. Every plan starts with a ${TRIAL_DAYS}-day trial.`,
  'Code graph: Lens reads the source, not the spec, and maps every endpoint to the handler and the functions it calls. It is written into your repository as a codegraph/ sidecar, so it is versioned and reviewable like any other file. Where an operation cannot be read with confidence it reports unknown rather than guessing.',
  'PR Review drift: two comparisons and one verdict — the head of a pull request against its base, and against your OpenAPI spec. Findings are concrete: auth middleware dropped from an endpoint, a 204 that became a 200, a new write inside a shared helper. Nothing is posted to your host until you press Submit.',
  'Send to Studio Editor: turn an endpoint from the Code graph into a real request in the free workspace, pre-filled from the code contract, with response assertions on by default.',
  'Git hosts: GitHub works on every plan, including Free. GitLab, Bitbucket Cloud and Azure DevOps are reached through the native review API of each host, and are a paid capability.',
  'Git-native: collections, environments, and mock definitions are plain JSON pushed to your own repository — branch, diff, open pull requests, and resolve conflicts with a visual three-way merge.',
  'Mock servers: turn an OpenAPI, Swagger, Postman, or Insomnia spec into a running localhost mock, with overrides, conditional rules, request validation, and response multipliers.',
  `Authentication: ${SITE.stats.authSchemes} schemes, all functional — Bearer, Basic, API key, custom header, the full OAuth2 grant set (PKCE, device flow, auto-refresh), AWS SigV4, Digest, NTLM, Hawk, and JWT.`,
  `Imports: ${SITE.importFormats.join(', ')}.`,
  `Code generation: ${SITE.codegenTargets.join(', ')}.`,
  `MCP server (${planName.get('pro')}): started with \`apicircle-lens mcp\`, it hands an AI client the endpoints, requests and drift findings you already work from. Driven from ${SITE.mcpClients.join(', ')}.`,
  `Command-line interface (${planName.get('team')}): the \`apicircle-lens\` binary from ${SITE.links.npmCli.replace('https://www.npmjs.com/package/', '')}. Runs collections and reviews headlessly and fails a build on the drift you choose.`,
  'Your code stays on your machine. Indexing runs locally and uploads nothing. The one exception is "Index with AI", which asks first and uses a key you supply.',
  'Source: the free workspace is developed in the open and source-available on GitHub.',
];

const planLines = PLANS.map(
  (p) => `- **${p.name}** — ${price(p)}. ${p.blurb}\n${p.capabilities.map((c) => `  - ${c}`).join('\n')}`,
);

const pages: Array<[string, string, string]> = [
  ['/', 'Home', 'what Lens does, what the workspace costs, and how the two fit together.'],
  ['/lens/', SITE.lensName, 'the Code graph, PR Review drift, and Send to Studio Editor in detail.'],
  ['/pricing/', 'Pricing', 'the four plans, what each adds, and the currency note.'],
  ['/features/', 'Features', 'every capability, with the plan that carries it.'],
  ...FEATURES.map(
    (f): [string, string, string] => [
      `/features/${f.slug}/`,
      `${f.title} (${planName.get(f.plan) ?? f.plan})`,
      f.tagline,
    ],
  ),
  ['/git-backed-api-client/', 'Git-backed API client', 'collections as JSON in a repository you own.'],
  ['/download/', 'Download', 'Lens installers and the free workspace.'],
  ['/security/', 'Security', 'what leaves your machine, and what does not.'],
  ['/docs/', 'Documentation', 'guides and reference.'],
];

const resources: Array<[string, string, string]> = [
  [SITE.links.github, 'GitHub', 'source-available repository and issues.'],
  [SITE.links.lensReleases, 'Lens releases', 'desktop installers.'],
  [SITE.links.npmCli, 'CLI on npm', 'the Lens CLI, with the MCP server inside it.'],
  [SITE.links.vscode, 'VS Code Marketplace', 'the extension.'],
  [SITE.links.openVsx, 'Open VSX', 'the same extension, for editors that do not use the Marketplace.'],
];

export const GET: APIRoute = () => {
  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline} ${SITE.description}`,
    '',
    `API Circle is one app with two halves: a free API workspace for writing, running and mocking requests, and ${SITE.lensName} — the paid half, which reads the code behind your API.`,
    '',
    `Official site: ${SITE.url}. The free workspace in a browser: ${SITE.appUrl}. ${SITE.origin}`,
    '',
    '## Key facts',
    '',
    ...keyFacts.map((f) => `- ${f}`),
    '',
    '## Plans',
    '',
    ...planLines,
    '',
    PRICE_CURRENCY_NOTE,
    '',
    '## Pages',
    '',
    ...pages.map(([path, name, blurb]) => `- [${name}](${abs(path)}): ${blurb}`),
    '',
    '## Resources',
    '',
    ...resources.map(([href, name, blurb]) => `- [${name}](${href}): ${blurb}`),
    '',
    '## FAQ',
    '',
    ...FAQS.flatMap((f) => [`### ${f.q}`, f.a, '']),
  ].join('\n');

  return new Response(body.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
