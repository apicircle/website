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
  'Spec alignment: pick a workspace Spec and the Code graph marks every endpoint that is undocumented, not implemented or a stub. "Verify schema" corrects what the parser misread, and keeps an append-only audit of who changed what.',
  'Refinements: add an endpoint the parser missed, map a function to an endpoint, or block a false positive with a reason. Each correction is committed beside the Code graph and survives a reindex.',
  'Send to Studio Editor: turn an endpoint from the Code graph into a real request in the free workspace, pre-filled from the code contract, with response assertions on by default.',
  'Drift-infill scaffolding: for an endpoint the Spec declares and the code lacks, Lens drafts framework-native code, and optionally a test stub, for you to review before it is applied.',
  `AI Assistant (${planName.get('pro')}): answers questions about your API from the Code graph, inside Lens desktop, using your own Anthropic, OpenAI or Google key.`,
  'Git hosts: GitHub works on every plan, including Free. GitLab, Bitbucket Cloud and Azure DevOps are reached through the native review API of each host, and are a paid capability.',
  'Git-native: collections, environments, and mock definitions are plain JSON pushed to your own GitHub repository — branch, diff, open pull requests, and resolve conflicts with a visual three-way merge.',
  'Mock servers: turn an OpenAPI, Swagger, Postman, or Insomnia spec into a localhost mock with response rules, request validation, delays and multipliers. Studio desktop and VS Code run it; the web app edits mock definitions but cannot run one.',
  `Authentication: ${SITE.stats.authSchemes} schemes — Bearer, Basic, API key, custom header, six OAuth 2.0 grants (with PKCE, device code and auto-refresh), AWS Signature v4, Digest, NTLM, Hawk and JWT Bearer — and folder-level inheritance.`,
  `Imports into the free workspace: ${SITE.importFormats.join(', ')}.`,
  `MCP server (${planName.get('pro')}): started with \`apicircle-lens mcp\`, it gives an AI client your Code graph, PR Review and the Endpoint context graph, plus MCP-only tools: HAR import, and code generation to ${SITE.mcpCodegenTargets.join(', ')}.`,
  `MCP clients: the MCP panel installs the server into ${SITE.mcpClients.installable.join(', ')}; ${SITE.mcpClients.manual.join(', ')} and any other MCP client take a pasted snippet.`,
  `Command-line interface (${planName.get('team')}): the \`apicircle-lens\` binary from ${SITE.links.npmCli.replace('https://www.npmjs.com/package/', '')}. Runs execution plans and reviews headlessly, and fails a build on the drift you choose.`,
  'Your code stays on your machine. Indexing runs locally and uploads nothing. The one exception is "Index with AI", which asks first and uses a key you supply.',
  'Source: the free workspace is developed in the open and source-available on GitHub.',
];

const planLines = PLANS.map(
  (p) => `- **${p.name}** — ${price(p)}. ${p.blurb}\n${p.capabilities.map((c) => `  - ${c}`).join('\n')}`,
);

const pages: Array<[string, string, string]> = [
  ['/', 'Home', 'what Lens does, what the workspace costs, and how the two fit together.'],
  ['/lens/', SITE.lensName, 'what Lens is, what each plan adds, and how you receive it.'],
  ['/pricing/', 'Pricing', 'the four plans, what each adds, and the currency note.'],
  ['/features/', 'Features', 'every capability, Lens first, with the plan that carries it.'],
  ...FEATURES.map(
    (f): [string, string, string] => [
      `/features/${f.slug}/`,
      `${f.title} (${f.product === 'lens' ? 'Lens' : 'Studio'}, ${planName.get(f.plan) ?? f.plan})`,
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
