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
      {
        title: 'Releases & a marketplace',
        body: 'Publish fingerprinted versions of a workspace that linked consumers pin to, deprecate or withdraw them, and tag releases on GitHub — for private repos or a public marketplace.',
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
    eyebrow: 'AI-native, not AI-bolted-on',
    title: 'Drive your workspace with AI',
    tagline: 'A built-in MCP server exposes 94 tools so any AI client can read, author, and run requests.',
    metaDescription:
      'A built-in MCP server with 94 tools lets Claude, Cursor, Copilot, ChatGPT and other AI clients read, author, and run your API requests.',
    summary:
      'The bundled MCP server speaks the open Model Context Protocol over stdio, so Claude, ChatGPT, Cursor, Copilot, and any other MCP client can scan a codebase, propose a collection, generate runnable client code, or spin up a mock — all from the chat. Every AI write funnels through the same mutation API the UI uses.',
    bullets: [
      '94-tool catalog: requests, envs, mocks, plans, history',
      'Works with 9+ AI clients out of the box',
      'Copy-paste config snippet for every client',
    ],
    highlights: [
      {
        title: 'A first-class surface',
        body: 'MCP is not a plugin. The server is one of five ways to drive a workspace, sharing the same engine, parsers, and mutation chokepoint as the desktop, web, CLI, and VS Code surfaces.',
      },
      {
        title: 'One snippet, any client',
        body: 'The MCP panel generates a ready-to-paste config for Claude Desktop, Claude Code, Cursor, Copilot, ChatGPT, Continue, Cline, Zed, and Windsurf. Copy, drop it in, restart.',
      },
      {
        title: 'Reads external writes instantly',
        body: 'The desktop app watches the workspace file, so anything the MCP server or CLI writes shows up in the editor automatically — no manual refresh.',
      },
      {
        title: 'Safe by construction',
        body: 'An AI agent can never produce workspace state the UI could not have produced, because both go through the same applyMutation API in the core engine.',
      },
    ],
    cta: { label: 'Open the web app', href: SITE.appUrl },
    screenshot: 'mcp-connection',
    screenshotAlt:
      'API Circle MCP panel showing the workspace mirror and a copy-paste AI client config snippet',
  },
  {
    slug: 'mock-servers',
    icon: 'server',
    accent: 'green',
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
        title: 'One engine, three runtimes',
        body: 'The same factory powers the desktop mock manager, the apicircle CLI, and the MCP mock.start tool — start a mock from the app, your terminal, or an AI client.',
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
    eyebrow: 'Headless & CI',
    title: 'A CLI for pipelines and agents',
    tagline: 'Run collections, spin up mocks, and import specs from any terminal — no UI required.',
    metaDescription:
      'Run collections, spin up mocks, and import specs from any terminal — with JUnit reporting for CI and workspaces addressable by name or path.',
    summary:
      'The apicircle binary runs mocks, the MCP server, imports, exports, and full collection runs against the same workspace format as every other surface. Point it at a registered workspace by name, or at a git-cloned repo directory for CI.',
    bullets: [
      'mock · mcp · import · export · run · workspaces',
      'JUnit reporter for CI pipelines',
      'Address workspaces by name or by path',
    ],
    highlights: [
      {
        title: 'Mode B, headless',
        body: 'Clone a workspace repo and the directory is the workspace. Pass it with --workspace-path for CI, or --workspace-name to resolve against the desktop registry.',
      },
      {
        title: 'Run suites in CI',
        body: 'apicircle run "Smoke Tests" --reporter junit executes a collection and emits JUnit XML your pipeline can ingest — the same execution engine the app uses.',
      },
      {
        title: 'Spin up a mock with no workspace',
        body: 'npx @apicircle/cli mock ./openapi.yaml starts a mock server straight from a spec file — handy for local development and contract testing.',
      },
    ],
    cta: { label: 'Get the CLI on npm', href: SITE.links.npmCli },
    screenshot: 'cli',
    screenshotAlt: 'The apicircle command-line interface running a collection',
  },
  {
    slug: 'vscode',
    icon: 'code',
    accent: 'sky',
    eyebrow: 'In your editor',
    title: 'Edit the same workspace from VS Code',
    tagline: 'Nine sidebar views and YAML request editing — no webview, no separate sync.',
    metaDescription:
      'Edit the same workspace as YAML inside VS Code — nine sidebar views, Send CodeLenses, schema validation, mock servers, and a secret vault.',
    summary:
      'The VS Code extension drives the very same workspace document as the desktop and web apps, byte-for-byte. Requests, environments, and plans are editable YAML under an apicircle: virtual file system, with Send CodeLenses, schema validation, mock servers, a secret vault, and one-click MCP install for Copilot Chat.',
    bullets: [
      'Nine TreeViews + YAML editing with CodeLenses',
      'Byte-identical commits with desktop & web',
      'Mock servers, secret vault & MCP host built in',
    ],
    highlights: [
      {
        title: 'Native, not a webview',
        body: 'Requests open as .req.yaml documents with full editing, JSON-Schema validation, completion for all 17 auth types, and live pre-send diagnostics in the Problems panel.',
      },
      {
        title: 'Three-surface parity',
        body: 'The same applyMutation chokepoint means edits from VS Code, desktop, and web produce byte-for-byte identical commits. One repo, three surfaces.',
      },
      {
        title: 'Everything in the sidebar',
        body: 'Workspace, Editor, Environment, Execution, Mock, History, Snapshots, MCP, and Link Workspaces — plus auto-refresh when MCP or the CLI writes the file.',
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
