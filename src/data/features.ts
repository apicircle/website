import { SITE } from './site';

export type AccentKey = 'brand' | 'green' | 'blue' | 'amber' | 'red' | 'sky';

export interface Highlight {
  title: string;
  body: string;
}

export interface Feature {
  slug: string;
  /** Icon name resolved by Icon.astro */
  icon: string;
  accent: AccentKey;
  /**
   * The lowest plan that includes this capability. Rendered by PlanBadge, which
   * resolves the label from the generated PLANS, so the site cannot advertise a
   * tier the gate disagrees with.
   */
  plan: 'free' | 'basic' | 'pro' | 'team';
  eyebrow: string;
  title: string;
  /** One-line hook used on cards. */
  tagline: string;
  /** Short paragraph for the feature-page hero. */
  summary: string;
  /** Concise (≤160 char) SEO meta description for the feature page. */
  metaDescription: string;
  /** Quick bullets for the home-page card. */
  bullets: string[];
  /** Deep-dive points for the feature page. */
  highlights: Highlight[];
  /** Primary call-to-action on the feature page — relevant to THIS feature. */
  cta: { label: string; href: string };
  /** Screenshot key (resolves to /screenshots/{theme}/<screenshot>.png). */
  screenshot?: string;
  screenshotAlt?: string;
}

export const FEATURES: Feature[] = [
  {
    slug: 'git-workspaces',
    icon: 'git-branch',
    accent: 'brand',
    plan: 'free',
    eyebrow: 'Version control, natively',
    title: 'Git-backed workspaces',
    tagline: 'Your collections are plain JSON in your own repo — branch, diff, review, merge.',
    metaDescription:
      'Keep API collections as plain JSON in your own Git repo — branch, diff, open PRs, and merge with a visual three-way resolver. No cloud, no lock-in.',
    summary:
      'A workspace is two JSON documents: the shared collection tree, environments, and mock definitions that push to your GitHub repo, and the per-device history and sessions that never leave your machine. Teams collaborate on APIs exactly the way they collaborate on code.',
    bullets: [
      'Push to save, open a PR from inside the app',
      'Auto-created working branches off main',
      'Three-way merge with a visual conflict resolver',
    ],
    highlights: [
      {
        title: 'Own your data',
        body: 'The workspace is JSON you can read, diff, and back up. Nothing is uploaded to a third-party server — your repo is the source of truth.',
      },
      {
        title: 'Collaborate through pull requests',
        body: 'Auto-create a working branch from main, push to save, and open a PR without leaving the app. API collections get the same review workflow as the code that calls them.',
      },
      {
        title: 'Visual three-way merge',
        body: 'When remote and local diverge, a conflict resolver shows the folder tree, environment priority, and release ledger side by side so you keep exactly what you intend.',
      },
    ],
    cta: { label: 'Open the web app', href: SITE.appUrl },
    screenshot: 'git-workspace',
    screenshotAlt:
      'API Circle Workspace panel showing the GitHub connection, working branch, and release history',
  },
  {
    slug: 'mcp-ai',
    icon: 'sparkles',
    accent: 'sky',
    plan: 'pro',
    eyebrow: 'For AI clients',
    title: 'Put your AI client on the same Code graph',
    tagline: 'An MCP server that hands Claude, Cursor or Copilot the endpoints, requests and drift findings you already work from.',
    metaDescription:
      'The Lens MCP server gives Claude, Cursor, Copilot and other MCP clients your API workspace and your Code graph, over stdio. Included with Pro.',
    summary:
      'Start it with apicircle-lens mcp. Any client that speaks the Model Context Protocol can then read the workspace over stdio — requests, environments, mock servers, execution plans — along with the endpoints the Code graph found in your repository. It can review a pull request from chat and report the drift it finds.',
    bullets: [
      'Your requests, environments, mocks and plans',
      'The Code graph: every endpoint, and the code behind it',
      'Review a pull request and report its drift, from chat',
      'Config snippets for nine clients',
    ],
    highlights: [
      {
        title: 'It starts from the CLI',
        body: 'The server ships inside @apicircle-lens/cli and runs as apicircle-lens mcp. It authenticates with a key from your account, and a Pro key starts the MCP server and nothing else.',
      },
      {
        title: 'One snippet per client',
        body: 'The MCP panel writes a ready-to-paste configuration for Claude Desktop, Claude Code, Cursor, Copilot, ChatGPT, Continue, Cline, Zed and Windsurf.',
      },
      {
        title: 'An agent cannot invent state',
        body: 'Every write goes through the same path the interface uses, so an agent can only produce a workspace you could have produced by hand.',
      },
      {
        title: 'It reads the map you already built',
        body: 'The Code graph is committed to your repository, so the server reads it rather than deriving its own answer and disagreeing with the app.',
      },
    ],
    cta: { label: 'See what Pro includes', href: '/pricing' },
    screenshot: 'mcp-connection',
    screenshotAlt:
      'API Circle MCP panel showing the workspace mirror and a copy-paste AI client config snippet',
  },
  {
    slug: 'mock-servers',
    icon: 'server',
    accent: 'green',
    plan: 'free',
    eyebrow: 'Local mock servers',
    title: 'Mock any API in seconds',
    tagline: 'Point at an OpenAPI, Swagger, Postman, or Insomnia file and get a running mock on localhost.',
    metaDescription:
      'Turn an OpenAPI, Swagger, Postman, or Insomnia spec into a running localhost mock in seconds — with overrides, conditional rules, validation, and multipliers.',
    summary:
      'The Hono-based engine handles $ref dereferencing, per-endpoint overrides, conditional response rules, request validation, and response multipliers. Mock definitions live in the synced workspace so teammates share them; the runtime stays on your machine.',
    bullets: [
      'Import OpenAPI / Swagger / Postman / Insomnia',
      'Flip a 200 to a 503 to exercise error paths',
      'Conditional rules, validation & multipliers',
    ],
    highlights: [
      {
        title: 'Start one from anywhere',
        body: 'The same engine backs the mock manager in the app, the CLI and the MCP tool, so a mock behaves identically wherever you start it. In the app it is free.',
      },
      {
        title: 'Realistic behaviour',
        body: 'Per-endpoint overrides, conditional response rules, request-schema validation, and response multipliers let you simulate the failure modes your real API has.',
      },
      {
        title: 'Shared definitions, local runtime',
        body: 'Mock definitions sync in the workspace JSON so the whole team gets them; the running server binds to localhost on your machine only.',
      },
    ],
    cta: { label: 'Open the web app', href: SITE.appUrl },
    screenshot: 'mock-server',
    screenshotAlt: 'API Circle Mocks panel showing a running mock server on localhost',
  },
  {
    slug: 'authentication',
    icon: 'shield',
    accent: 'amber',
    plan: 'free',
    eyebrow: 'A complete request toolkit',
    title: '17 auth schemes, all functional',
    tagline: 'Bearer to AWS SigV4 to the full OAuth2 grant set — verified against the relevant RFCs.',
    metaDescription:
      'All 17 auth schemes, end-to-end functional — Bearer, OAuth2 (every grant), AWS SigV4, Digest, NTLM, Hawk, and JWT — verified against the RFCs.',
    summary:
      'Every authentication scheme is end-to-end functional, with signing primitives verified against RFC and NIST reference vectors. Folder-level auth cascades to descendant requests, and the rest of the toolkit — imports, code generation, environments, assertions, and execution plans — rounds out a full-featured client.',
    bullets: [
      'OAuth2 (all grants, PKCE, device flow, refresh)',
      'AWS SigV4, Digest, NTLM, Hawk, JWT',
      'Folder-level auth that descendants inherit',
    ],
    highlights: [
      {
        title: 'Every scheme, verified',
        body: 'Bearer, Basic, API key, custom header, the full OAuth2 grant set with auto-refresh, AWS SigV4, Digest, NTLM, Hawk, and JWT — signing primitives checked against RFC 1321/2617/7616/7636 and NIST vectors.',
      },
      {
        title: 'Folder-level inheritance',
        body: 'Set an auth block on a folder and any descendant request marked auth: inherit picks it up. In VS Code a CodeLens links each inheriting request straight to its source folder.',
      },
      {
        title: 'Import what you already have',
        body: 'Bring in cURL, OpenAPI/Swagger, Postman collections + environments, Insomnia exports, HAR files, and portable .apicircle.json envelopes — credentials redacted by default.',
      },
      {
        title: 'Generate client code',
        body: 'Turn any saved request into cURL, fetch, Node (axios), Python (requests), Go, or Rust. Add assertions and chain requests into multi-step execution plans.',
      },
    ],
    cta: { label: 'Open the web app', href: SITE.appUrl },
    screenshot: 'auth',
    screenshotAlt: 'API Circle request editor showing the authentication configuration',
  },
  {
    slug: 'cli',
    icon: 'terminal',
    accent: 'blue',
    plan: 'team',
    eyebrow: 'For CI',
    title: 'Fail the build when the API drifts',
    tagline: 'apicircle-lens review runs the same drift check your pipeline can gate on.',
    metaDescription:
      'Run PR Review drift in CI with @apicircle-lens/cli: positioned comments on the lines that drifted, and an exit code you can fail the build on.',
    summary:
      'A pipeline needs no desktop app and no seat. apicircle-lens review compares a branch against its base and against your OpenAPI spec, writes what it found as a pull-request comment, and picks an exit code you can gate on. It also runs collections, mocks and imports against the same workspace format every other surface uses.',
    bullets: [
      '--fail-on breaking, warning, info or diffracting',
      'Positioned comments on the lines that drifted',
      'codegraph index builds the map from a checkout',
      'Authenticates with a key, not a device seat',
    ],
    highlights: [
      {
        title: 'Choose what breaks the build',
        body: '--fail-on breaking stops a merge that removes an endpoint or drops an auth guard. --fail-on diffracting is stricter: it fails whenever the surface moves away from the spec at all.',
      },
      {
        title: 'Comments update instead of piling up',
        body: 'The summary comment carries a hidden marker, so the next run edits the comment it wrote last time. A busy pull request does not collect twenty of them.',
      },
      {
        title: 'Keys, not seats',
        body: 'CI runners are ephemeral and would churn through a seat pool, so the CLI authenticates with a key issued from your account instead.',
      },
      {
        title: 'It refuses to leak a public repo',
        body: 'Findings like "auth removed" map the soft spots of a live API. On a public repository the CLI will not post them unless you pass --allow-public-security-findings.',
      },
    ],
    cta: { label: 'See what Team includes', href: '/pricing' },
    screenshot: 'cli',
    screenshotAlt: 'The apicircle command-line interface running a collection',
  },
  {
    slug: 'vscode',
    icon: 'code',
    accent: 'sky',
    plan: 'free',
    eyebrow: 'In your editor',
    title: 'Edit the same workspace from VS Code',
    tagline: 'Requests open as YAML documents you can edit, validate and send without leaving the editor.',
    metaDescription:
      'Edit the same API workspace as YAML inside VS Code — seven sidebar views, Send CodeLenses, JSON-Schema validation, mock servers and a secret vault.',
    summary:
      'The extension drives the same workspace document as the desktop and web apps, byte for byte. Requests, environments and plans open as YAML under an apicircle: virtual file system, with Send CodeLenses, JSON-Schema validation, mock servers and a secret vault.',
    bullets: [
      'Seven sidebar views: Workspace, Editor, Environment, Execution, Mock, History, Snapshots',
      'YAML editing, with a Send CodeLens on every request',
      'Commits byte-for-byte identical to desktop and web',
    ],
    highlights: [
      {
        title: 'It opens real documents',
        body: 'Requests are .req.yaml files. You get completion for all 17 auth types, JSON-Schema validation, and pre-send diagnostics in the Problems panel.',
      },
      {
        title: 'One repository, three surfaces',
        body: 'Edits from VS Code, the desktop app and the web app go through the same mutation path, so they produce identical commits. Nobody has to reconcile anything afterwards.',
      },
      {
        title: 'It notices outside writes',
        body: 'The extension watches the workspace file, so a change made anywhere else appears without a refresh.',
      },
    ],
    cta: { label: 'Get the extension', href: SITE.links.vscode },
    screenshot: 'vscode',
    screenshotAlt: 'The API Circle extension running inside VS Code',
  },
];

export function getFeature(slug: string): Feature | undefined {
  return FEATURES.find((f) => f.slug === slug);
}
