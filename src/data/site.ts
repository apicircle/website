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
    /**
     * The current Lens desktop release, on the public org repo.
     *
     * `/releases/latest`, not the release list and not a direct `.exe` link. It
     * follows each new published version without an edit here (drafts and
     * pre-releases are skipped), and it lands on the release page, where the
     * SmartScreen steps and the SHA-256 sit next to the installer — which
     * matters while the installer is unsigned. It assumes this repo publishes
     * only Lens desktop releases; if that changes, pin the tag instead.
     */
    lensReleases: 'https://github.com/apicircle/.github/releases/latest',
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
    /**
     * The auth picker lists more entries than this, because two of them are
     * "No Auth" and "Inherit (parent folder)", which are not schemes
     * (studio `packages/ui-components/src/panels/editor/AuthEditor.tsx`).
     */
    authSchemes: 15,
    themes: 60,
    fonts: 50,
    importFormats: 6,
  },
  /**
   * The MCP panel's client list (lens `packages-lens/ui-lens/src/mcp/service.ts`,
   * `MCP_CLIENT_OPTIONS`). `installable` clients get their config written by the
   * "Install" button; the others get a snippet to paste, as does a generic MCP
   * client. MCP is a paid surface (Pro).
   */
  mcpClients: {
    installable: ['Claude Desktop', 'Claude Code', 'Codex', 'Cursor', 'Continue', 'Zed', 'Windsurf'],
    manual: ['Cline', 'GitHub Copilot', 'ChatGPT'],
  },
  /**
   * What the free workspace imports: the Import dialog's formats, verbatim
   * (studio `ImportModal.tsx`, `FORMAT_LABELS`, besides "Auto-detect").
   */
  importFormats: [
    'OpenAPI / Swagger',
    'Postman v2.1 collection',
    'Postman environment',
    'Insomnia v4 export',
    'cURL command',
    'API Circle exchange',
  ],
  /**
   * The MCP server's import and code-generation tools, which are Lens MCP tools
   * (Pro) and not free-workspace features. The workspace itself has neither.
   * Source: lens `packages-lens/mcp-core/src/tools/imports.ts` and `codegen.ts`.
   */
  mcpImportFormats: ['cURL', 'OpenAPI', 'Postman', 'Insomnia', 'HAR'],
  mcpCodegenTargets: ['cURL', 'fetch', 'Node (axios)', 'Python (requests)', 'Go', 'Rust'],

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
    'API Circle: know when a pull request changes your API. Code graph, PR Review drift and a free API workspace.',
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
