/** Site-wide configuration and canonical product facts. */
export const SITE = {
  name: 'API Circle',
  /** Full product name — used where we name the downloadable app (Download page). */
  productName: 'API Circle Studio',
  shortName: 'API Circle',
  domain: 'apicircle.dev',
  url: 'https://apicircle.dev',
  appUrl: 'https://studio.apicircle.dev',
  tagline: 'An API workspace you can `git diff` — and an AI can drive.',
  description:
    'API Circle is an open API client where your collections live in a Git repo and a built-in MCP server lets any AI client read, author, and run requests. Desktop, web, CLI, and VS Code — no cloud account, no lock-in.',
  origin: 'Built in India. Open to the world.',
  email: 'apicircle365@gmail.com',
  links: {
    app: 'https://studio.apicircle.dev',
    github: 'https://github.com/apicircle/studio',
    issues: 'https://github.com/apicircle/studio/issues',
    releases: 'https://github.com/apicircle/studio/releases/latest',
    vscode: 'https://marketplace.visualstudio.com/items?itemName=apicircle.apicircle-vscode',
    openVsx: 'https://open-vsx.org/extension/apicircle/apicircle-vscode',
    npmCli: 'https://www.npmjs.com/package/@apicircle/cli',
    npmMcp: 'https://www.npmjs.com/package/@apicircle/mcp-server',
    mcpSpec: 'https://modelcontextprotocol.io',
    license:
      'https://github.com/apicircle/studio/blob/main/LICENSE',
    privacy:
      'https://github.com/apicircle/studio/blob/main/PRIVACY.md',
    security:
      'https://github.com/apicircle/studio/blob/main/SECURITY.md',
  },
  /** Documentation source-of-truth lives in the studio repo's docs/ folder. */
  docsBase: 'https://github.com/apicircle/studio/blob/main/docs',
  /** Heuristic facts used as proof points across the site. */
  stats: {
    mcpTools: 94,
    authSchemes: 17,
    themes: 60,
    fonts: 50,
    surfaces: 5,
    importFormats: 6,
    codegenTargets: 6,
  },
  mcpClients: [
    'Claude Desktop',
    'Claude Code',
    'ChatGPT',
    'GitHub Copilot',
    'Cursor',
    'Continue',
    'Cline',
    'Zed',
    'Windsurf',
  ],
  importFormats: ['cURL', 'OpenAPI / Swagger', 'Postman', 'Insomnia', 'HAR', '.apicircle.json'],
  codegenTargets: ['cURL', 'fetch', 'Node (axios)', 'Python (requests)', 'Go', 'Rust'],
} as const;

export type SiteConfig = typeof SITE;
