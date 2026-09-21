/** Site-wide configuration and canonical product facts. */
export const SITE = {
  name: 'API Circle',
  /** The free app: the API workspace, named where we offer a download. */
  productName: 'API Circle Studio',
  /** The paid app: the same workspace with the Code graph, Review and Assistant panels. */
  lensName: 'API Circle Lens',
  shortName: 'API Circle',
  domain: 'apicircle.dev',
  url: 'https://apicircle.dev',
  appUrl: 'https://studio.apicircle.dev',
  /** The Lens web app. Not launched, so nothing links to it yet. */
  lensUrl: 'https://lens.apicircle.dev',
  tagline: 'Know when a pull request changes your API.',
  description:
    'Lens reads your repository and maps every endpoint to the code behind it, then shows what a pull request changes against your OpenAPI spec. The API workspace is free.',
  origin: 'Built in India. Open to the world.',
  email: 'apicircle365@gmail.com',
  links: {
    app: 'https://studio.apicircle.dev',
    github: 'https://github.com/apicircle/studio',
    issues: 'https://github.com/apicircle/studio/issues',
    releases: 'https://github.com/apicircle/studio/releases/latest',
    /** Lens desktop installers. Published as releases on the public org repo. */
    lensReleases: 'https://github.com/apicircle/.github/releases',
    vscode: 'https://marketplace.visualstudio.com/items?itemName=apicircle.apicircle-vscode',
    openVsx: 'https://open-vsx.org/extension/apicircle/apicircle-vscode',
    peerlist: 'https://peerlist.io/devaprakash0927/project/api-circle-studio',
    /** The Lens CLI. The MCP server ships inside it, as `apicircle-lens mcp`. */
    npmCli: 'https://www.npmjs.com/package/@apicircle-lens/cli',
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
  /**
   * Countable facts about the free workspace, used as proof points.
   *
   * Every number here must be checkable in the shipped app. A count of MCP tools
   * and a count of "surfaces" used to live here and were quietly wrong once the
   * MCP server and the CLI became paid, so they are gone rather than corrected.
   */
  stats: {
    authSchemes: 17,
    themes: 60,
    importFormats: 6,
  },
  /** Clients the Lens MCP server has been driven from. MCP is a paid surface (Pro). */
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

  /* ---- SEO / GEO (search engine + AI engine) signals ---- */

  /** Keyword-rich default <title> for the home page and untitled routes. */
  defaultTitle: 'API Circle — Catch API drift in every pull request',
  /** Other names people search the product by — feeds schema `alternateName`. */
  alternateNames: ['APICircle', 'API Circle Studio', 'API Circle Lens', 'apicircle.dev', 'apicircle'],
  /** Target search keywords — used for the keywords meta tag and schema. */
  keywords: [
    'API drift detection',
    'OpenAPI contract drift',
    'breaking API change',
    'pull request API review',
    'OpenAPI diff',
    'API client',
    'API testing tool',
    'API mock server',
    'REST API client',
    'OpenAPI client',
    'Git API client',
    'Postman alternative',
    'Insomnia alternative',
    'OAuth2 testing',
    'API Circle',
  ],
  /** Canonical profiles that describe the same entity — feeds schema `sameAs`. */
  sameAs: [
    'https://github.com/apicircle',
    'https://github.com/apicircle/studio',
    'https://www.npmjs.com/package/@apicircle-lens/cli',
    'https://marketplace.visualstudio.com/items?itemName=apicircle.apicircle-vscode',
    'https://open-vsx.org/extension/apicircle/apicircle-vscode',
    'https://peerlist.io/devaprakash0927/project/api-circle-studio',
  ],
  /** Default alt text for the social / OG card. */
  ogImageAlt:
    'API Circle — every API endpoint mapped to the code behind it, with drift flagged in pull requests',
  /** Optional social handle (without the @). Leave '' to omit Twitter attribution. */
  social: { twitter: '' },
  /**
   * Search-engine ownership-verification tokens. Paste these from Google Search
   * Console / Bing Webmaster Tools (or verify via DNS) and the matching <meta>
   * tags render automatically. See SEO.md for the full off-page checklist.
   */
  verification: { google: '', bing: '', yandex: '' },
  /**
   * Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX). Leave '' to
   * disable. Removed in favour of no analytics at all: it set cookies with no
   * consent banner, which EU/UK rules require. Putting an ID back means building
   * consent first, and saying so in the Privacy Policy.
   */
  analytics: { googleAnalyticsId: '' },
} as const;

export type SiteConfig = typeof SITE;
