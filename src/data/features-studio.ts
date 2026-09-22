import { SITE } from './site';
import { planName, type Feature } from './feature-types';

/**
 * Studio: the free API workspace, after Lens on every list.
 *
 * Every fact below was checked against the studio source at 2.0.0 and names
 * its noun: a UI label in quotes, a count, a file name. The free workspace has
 * no HAR import and no code generation (both are Lens MCP tools), no workspace
 * sharing, releases or marketplace, and its web app cannot run a mock server.
 * CLAUDE.md and `scripts/check-claims.mjs` keep those out.
 */
const webApp = { label: 'Open the web app', href: SITE.appUrl };
const allDownloads = { label: 'All download options', href: '/download', icon: 'download' };

export const STUDIO_FEATURES: Feature[] = [
  {
    slug: 'git-workspaces',
    product: 'studio',
    icon: 'git-branch',
    accent: 'brand',
    plan: 'free',
    navLabel: 'Git-backed workspaces',
    featured: true,
    eyebrow: 'Git-backed workspaces',
    title: 'Keep API collections in your own GitHub repository',
    tagline: 'Your collections are plain JSON in your own repository: branch, diff, open a pull request, and merge.',
    summary: `A workspace is a JSON document your repository can hold. Studio pushes it to a working branch on GitHub, opens the pull request for you, and walks you through a three-way merge when two people changed the same thing. The free app connects to GitHub; GitLab, Bitbucket Cloud and Azure DevOps come with Lens on the ${planName('pro')} plan.`,
    metaDescription:
      'Keep API collections as JSON in your own GitHub repository: push to a working branch, open a pull request from the app, and merge with a three-way resolver.',
    bullets: [
      '"Push to save" commits `workspace.json` to a working branch',
      '"Create PR" without leaving the app',
      'A three-way merge: "Mine (local)" or "Theirs (remote)"',
      'Auth credentials are blanked before every push',
    ],
    highlights: [
      {
        title: 'A working branch, named for you',
        body: '"Create working branch" starts one from an existing branch. Studio names it and you can edit the name, and "Start from" either uses this workspace or imports one that already lives on the base branch. An empty repository gets a "Seed" button.',
      },
      {
        title: 'Push, preview, pull request',
        body: '"Push to save" commits `workspace.json`, and a strip counts what is still unpushed: click it for the "Unpushed changes preview". "Create PR" opens the pull request from inside the app, and "Discard branch" throws a working branch away.',
      },
      {
        title: 'A merge you can read',
        body: 'When your copy and the remote both changed, "Resolve conflicts" lists each difference with "Mine (local)" and "Theirs (remote)" side by side, and "Apply merge" writes what you chose. After a force-push, Studio stops merging on its own and says "Remote history was rewritten".',
      },
      {
        title: 'Credentials stay out of the repository',
        body: 'Before a push, Studio blanks every auth credential (passwords, client secrets, tokens and keys) and refuses the push if one is still set. Values typed into raw headers or a custom-header auth are pushed as they are, so keep those in the Secret Vault.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    extras: ['git-flow'],
  },
  {
    slug: 'request-editor',
    product: 'studio',
    icon: 'pencil-line',
    accent: 'blue',
    plan: 'free',
    navLabel: 'Request editor',
    eyebrow: 'Request editor',
    title: 'Write, send and read HTTP requests',
    tagline: 'Seven methods, eight body types, and a response viewer that tells you what the body costs.',
    summary:
      'Most of the work happens here. Choose a method, write the URL with `{{variables}}`, pick one of eight body types and press Send, and the response comes back with its status, time and size, with any assertion you attached already graded. It speaks HTTP only: no WebSocket, SSE, gRPC or scripts.',
    metaDescription:
      'Write and send HTTP requests with seven methods, eight body types including GraphQL, live JSON Schema checks, and a response viewer that sizes the body.',
    bullets: [
      'Seven methods, eight body types',
      'Paste a curl command into the URL bar',
      'Live JSON Schema checks on the body',
      'TOON, YAML and CSV previews of a response',
    ],
    highlights: [
      {
        title: 'Every part of a request',
        body: 'GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS. The body is none, JSON with "Prettify", text, XML, urlencoded, form-data with files, GraphQL with "Variables (JSON)", or binary. The Params tab splits Query, Path and Cookie, and "Effective URL" shows the URL that will actually go out.',
      },
      {
        title: 'Help while you type',
        body: 'Typing `{{` offers the variables in scope, header names come with descriptions, and a body can be checked live against a JSON Schema from your assets. Paste a curl command into the URL bar and "Looks like a cURL command" offers "Import as new request".',
      },
      {
        title: 'Checked before it goes',
        body: '"Validate before sending" is on by default. It warns about unresolved variables and unbound path parameters, and blocks Send while an auth field is blank. Ctrl/Cmd+Enter sends, "Cancel" stops a request in flight, and a request times out after 30 seconds.',
      },
      {
        title: 'A response viewer that sizes the body',
        body: 'Status, time in milliseconds and size, with Body, Headers and Assertions tabs. A JSON body previews as TOON, YAML or CSV with how much smaller each is than minified JSON. A failure is named (Aborted, Network error, Timeout or TLS error) and has a "Retry" button.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'request-editor',
    screenshotAlt:
      'The Studio request editor with GET {{baseUrl}}/api/v1/widgets sent to a local mock: 200 OK, two of two assertions passing, and a TOON size hint beside the body',
    frameLabel: 'Editor',
    sample: {
      title: 'Paste this into the URL bar',
      intro: 'Studio spots a curl command and offers to import it as a new request, method, headers and body included.',
      blocks: [
        {
          lang: 'URL bar',
          code: `curl -X POST https://api.example.com/widgets -H "Content-Type: application/json" -d '{"name":"gear"}'`,
        },
      ],
    },
  },
  {
    slug: 'authentication',
    product: 'studio',
    icon: 'shield',
    accent: 'amber',
    plan: 'free',
    navLabel: 'Authentication',
    eyebrow: 'Authentication',
    title: `${SITE.stats.authSchemes} auth schemes, set once per folder`,
    tagline: 'Bearer to AWS Signature v4 to six OAuth 2.0 grants, and folders that pass their auth down.',
    summary: `Pick a scheme per request, or set one on a folder and let every request beneath it inherit. The picker groups ${SITE.stats.authSchemes} schemes under Basic, OAuth 2.0 and Advanced, and its two other entries are "No Auth" and "Inherit (parent folder)". Signing is checked against published reference vectors.`,
    metaDescription: `${SITE.stats.authSchemes} auth schemes including six OAuth 2.0 grants, AWS Signature v4, Digest, NTLM, Hawk and JWT, with folder-level inheritance.`,
    bullets: [
      'Six OAuth 2.0 grants, with token refresh',
      'AWS Signature v4, Digest, NTLM, Hawk, JWT Bearer',
      'Folder auth that requests inherit',
      'Signing checked against RFC and NIST vectors',
    ],
    highlights: [
      {
        title: 'The whole list',
        body: 'Bearer Token, Basic Auth, API Key and Custom Header. OAuth 2.0 Client Credentials, Authorization Code, Authorization Code (PKCE), Password (ROPC), Implicit and Device Code, each with Get token, Refresh and Clear. AWS Signature v4, Digest, NTLM, Hawk and JWT Bearer.',
      },
      {
        title: 'Set it once on a folder',
        body: 'A folder can carry auth, and every request set to "Inherit (parent folder)" picks it up. A request left on "No Auth" under a folder that has auth gets a warning that it bypasses the folder. In VS Code, a CodeLens reads "◆ Inherits from" and names the folder.',
      },
      {
        title: 'Signed the way the specifications say',
        body: 'Digest, PKCE, AWS Signature v4, Hawk and NTLM are checked against published RFC and NIST reference vectors, the Hawk project’s own vectors, and Microsoft’s NTLM specification.',
      },
      {
        title: 'JWT, with one limit',
        body: 'JWT Bearer signs HS256, HS384 and HS512 inside the app. For an RS or ES algorithm, paste a token you signed elsewhere.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'auth',
    screenshotAlt:
      'The Auth tab of a Studio request set to API Key: the key X-Api-Key, the value {{apiKey}} from the environment, sent as a header',
    frameLabel: 'Editor · Auth',
    sample: {
      title: 'The same thing in VS Code',
      intro: 'In VS Code a request is a YAML document. Set its auth to `inherit` and it resolves from the nearest folder that has auth.',
      blocks: [
        {
          filename: 'requests/Payments/Create-charge.yaml',
          lang: 'yaml',
          code: [
            'name: Create charge',
            'method: POST',
            'url: https://api.example.com/charges',
            'auth:',
            '  type: inherit        # resolves from the Payments folder',
            'body:',
            '  type: json',
            '  content: |',
            '    { "amount": 4200, "currency": "usd" }',
          ].join('\n'),
        },
      ],
    },
  },
  {
    slug: 'environments-and-secrets',
    product: 'studio',
    icon: 'layers',
    accent: 'green',
    plan: 'free',
    navLabel: 'Environments and secrets',
    eyebrow: 'Environments and secrets',
    title: 'Layered environments and an encrypted vault',
    tagline: 'Stack environments in priority order, pull values out of responses, and keep secrets encrypted.',
    summary:
      'Tick several environments and they stack, with the sidebar order deciding which value wins. A value one request extracts from its response feeds the next. Anything secret lives in the Secret Vault, encrypted before it is stored.',
    metaDescription:
      'Layer environments in priority order, extract values from responses into variables, and keep secrets in an AES-GCM encrypted vault, in the free API workspace.',
    bullets: [
      'Environments that stack in priority order',
      'Extract a value from one response into the next request',
    ],
    highlights: [
      {
        title: 'Which value wins',
        body: 'A placeholder resolves from the request’s context variables first, then the environments in priority order, then the Secret Vault, and the first match wins. "Move up in priority" reorders a layer, each one shows its "Layer position", and the Variables inspector shows where a value came from.',
      },
      {
        title: 'Chain requests with extractors',
        body: 'An extractor pulls a value out of a response by "Body (JSON path)", "Response header", "Cookie" or "Status code", and "Pick a JSON path" builds the path from the last response. The next request uses it as a variable.',
      },
      {
        title: 'Encrypted, with no recovery',
        body: 'On the web, your passphrase is stretched with PBKDF2-SHA-256 over 1,200,000 iterations into an AES-256-GCM key, and "No recovery: lose the passphrase, lose the secrets." On the desktop, the operating system’s keychain wraps the key. Ctrl/Cmd+K opens the vault.',
      },
      {
        title: 'Encrypt any value',
        body: '"Encrypt" binds an environment value to a Secret Vault key, and "Unbind" turns it back into plain text. Environments export as JSON, and import from Postman or API Circle.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'environments',
    screenshotAlt:
      'The Environments panel with Local mock at layer position 1 of 2, above Staging, showing its baseUrl, apiToken and apiKey variables',
    frameLabel: 'Environments',
  },
  {
    slug: 'execution-plans',
    product: 'studio',
    icon: 'circle-play',
    accent: 'sky',
    plan: 'free',
    navLabel: 'Execution plans',
    eyebrow: 'Execution plans',
    title: 'Chain requests and check every response',
    tagline: 'Run requests in order, pass values between them, and grade every response with assertions.',
    summary:
      'A plan is a list of requests that run in order, with variables and extracted values flowing from one step to the next. Run it plainly or with its assertions, stop at the first failure if you want, and retry a single step without running the rest again.',
    metaDescription:
      'Chain saved requests into execution plans, pass values between steps, and check each response with five kinds of assertion, in the free API workspace.',
    bullets: [
      '"Run" or "Run with assertions"',
      'Retry one step on its own',
      'Five kinds of assertion',
      'Plan variables and their own environment order',
    ],
    highlights: [
      {
        title: 'Five kinds of assertion',
        body: 'Status, Duration (ms), Header, JSON path and JSON schema. The first four take =, ≠, contains, matches, <, >, exists or is type; a JSON schema check takes "matches schema". Each one shows Pass or Fail beside the response.',
      },
      {
        title: 'A plan with its own settings',
        body: '"Add step" picks requests from any folder, and steps can be reordered or switched off. "Plan variables" and a "Plan-level env priority" apply only while the plan runs.',
      },
      {
        title: 'Run it, then read it',
        body: '"Stop on assertion failure" ends a run at the first failed check. The summary reads like "3/3 requests succeeded · 15/15 assertions passed · 22 ms", and a failed step can be retried on its own.',
      },
      {
        title: 'In the app, or in CI',
        plan: 'team',
        body: `Plans run in the app on every plan, ${planName('free')} included. Running one headlessly in CI is the command line. There is no run-a-whole-folder action and no data-driven run yet.`,
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'execution-plan',
    screenshotAlt:
      'The Smoke plan after Run with assertions: GET health, GET widgets and POST widgets, with 3/3 requests succeeded and 15/15 assertions passed',
    frameLabel: 'Execution',
    sample: {
      title: 'Run a plan in CI',
      plan: 'team',
      intro: 'The command line runs the same plan headlessly and writes a JUnit report your CI understands.',
      blocks: [{ prompt: true, lang: 'In your pipeline', code: 'apicircle-lens run "Smoke" --reporter junit --bail' }],
    },
  },
  {
    slug: 'mock-servers',
    product: 'studio',
    icon: 'server',
    accent: 'green',
    plan: 'free',
    navLabel: 'Mock servers',
    featured: true,
    eyebrow: 'Mock servers',
    title: 'Serve your OpenAPI contract on localhost',
    tagline: 'Turn an OpenAPI, Postman or Insomnia source into a running localhost mock, with rules, delays and validation.',
    summary:
      'Give Studio a spec and it builds a mock with an endpoint for every operation, then runs it on 127.0.0.1. Studio desktop and the VS Code extension run mock servers; the web app creates and edits the definitions but cannot run one, because a browser tab cannot listen on a port.',
    metaDescription:
      'Turn an OpenAPI, Postman or Insomnia source into a localhost mock with response rules, request validation and delays. Runs in Studio desktop and VS Code.',
    bullets: [
      'From a spec, a spec asset, or empty',
      'Response rules, delays and multipliers',
      'Nine kinds of request validation',
      'Runs in Studio desktop and VS Code',
    ],
    highlights: [
      {
        title: 'Three ways to start',
        body: '"Create mock server" starts "Empty (add endpoints later)", from "Paste spec" (OpenAPI, Postman or Insomnia), or "From spec asset". "Serve OpenAPI contract" makes a read-only mock that follows the spec, with "Refresh from spec" to pick up changes and "Convert to editable mock" when you want to diverge.',
      },
      {
        title: 'Responses that depend on the request',
        body: 'A response rule matches a query value, path param, header, cookie or body JSON path. Each rule takes one condition, and the first rule that matches wins. "Delay (ms)" slows a response down, and a multiplier repeats an array item as many times as the request asks.',
      },
      {
        title: 'Requests it rejects',
        body: 'Nine validation rules check required and matching headers and query values, a required cookie, a required body and the Content-Type. Each has its own failure response and its own on/off switch.',
      },
      {
        title: 'Local by design',
        body: 'A running mock binds to 127.0.0.1 on a port from 1024 to 65535, and CORS stays off until you list the origins that may call it. Definitions sync with the workspace, so a teammate gets them. In VS Code, F6 starts a mock and Shift+F6 stops it.',
      },
    ],
    cta: { label: 'Download for desktop', href: '/download', icon: 'download' },
    secondaryCta: { label: 'Get the VS Code extension', href: SITE.links.vscode },
    closingCta: {
      title: 'Run your first mock',
      subtitle: 'Studio desktop and the VS Code extension run mock servers, free and with no account.',
      primary: { label: 'Download for desktop', href: '/download', icon: 'download' },
      secondary: { label: 'Get the VS Code extension', href: SITE.links.vscode },
    },
    screenshot: 'mock-server',
    screenshotAlt:
      'The Widgets API mock built from the spec asset: eight endpoints under /api/v1, port 4010, CORS disabled, running',
    frameLabel: 'Mocks',
  },
  {
    slug: 'import-export',
    product: 'studio',
    icon: 'import',
    accent: 'blue',
    plan: 'free',
    navLabel: 'Import and export',
    eyebrow: 'Import and export',
    title: 'Bring in Postman, Insomnia, OpenAPI and curl',
    tagline: 'Six formats in, detected for you, and folders and environments out as JSON.',
    summary:
      'Moving from another tool starts in the Import dialog. It reads six formats and works out which one you gave it; exporting goes the other way as JSON, with credentials left out unless you tick them in.',
    metaDescription:
      'Import OpenAPI, Swagger, Postman collections and environments, Insomnia exports and curl commands into the free API workspace, and export folders as JSON.',
    bullets: ['Six formats in, detected for you', 'Folders and environments out as JSON'],
    highlights: [
      {
        title: 'Six formats in',
        body: `The Import dialog reads ${SITE.importFormats.join(', ')}, or works it out with "Auto-detect". OpenAPI becomes a folder with a request per operation, and a Postman environment becomes a new environment. A spec in your assets imports with "Import to collection".`,
      },
      {
        title: 'Out as JSON, credentials left behind',
        body: '"Export as JSON" on a folder or an environment writes a file you can hand to anyone. Credentials are redacted by default, and you tick a row only when one should travel. There is no export to Postman or OpenAPI.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'import',
    screenshotAlt:
      'The Import dialog on Auto-detect with a pasted curl command recognised as cURL: a POST with one header and a JSON body',
    frameLabel: 'Editor · Import',
  },
  {
    slug: 'history-and-snapshots',
    product: 'studio',
    icon: 'history',
    accent: 'amber',
    plan: 'free',
    navLabel: 'History and snapshots',
    eyebrow: 'History and snapshots',
    title: 'Run history you can filter, and snapshots you can restore',
    tagline: 'Every run kept with its response, and a copy of the workspace before anything risky.',
    summary:
      'Every request and plan you run is kept on this device, with its headers, body and assertion results. Snapshots guard the other direction: before a push, a merge or an import changes the workspace, Studio saves a copy you can restore.',
    metaDescription:
      'Filter and replay past API requests and plan runs, and restore a snapshot of the workspace taken before every push, merge and import. Free, and local.',
    bullets: ['Filter runs by status, method and date', 'A snapshot before every push, merge and import'],
    highlights: [
      {
        title: 'History you can search',
        body: 'Requests, Plans and Snapshots each have a tab. Filter by "2xx / 3xx", "4xx", "5xx" or "Network error", by method and by date, then replay a run, open its request in the editor, or download the response body. Studio keeps the last 500 request runs and 200 plan runs.',
      },
      {
        title: 'Snapshots before anything risky',
        body: 'Studio takes one "Before push", "Before merge" and "Before workspace import", and "Take snapshot now" takes one by hand. Restoring asks you to type RESTORE first. Snapshots are capped at 10, 50 or 200 MB, or Unlimited.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'history',
    screenshotAlt: 'The History panel listing six passing request runs and one plan run, all from today',
    frameLabel: 'History',
  },
  {
    slug: 'global-assets',
    product: 'studio',
    icon: 'boxes',
    accent: 'brand',
    plan: 'free',
    navLabel: 'Global assets',
    eyebrow: 'Global assets',
    title: 'One home for your Spec and schemas',
    tagline: 'JSON Schemas, GraphQL schemas and files, tracked in Git, with OpenAPI specs recognised on sight.',
    summary:
      'The Assets dock holds what many requests share: JSON Schemas for body checks, GraphQL schemas for completion, and files. Drop in an OpenAPI or Swagger file and Studio recognises it as a Spec, the same Spec Lens checks your code against.',
    metaDescription:
      'Keep JSON Schemas, GraphQL schemas and files beside your API collections, tracked in Git, with OpenAPI specs recognised and ready to mock or import.',
    bullets: [
      'JSON Schemas, GraphQL and files in one dock',
      'An OpenAPI file becomes a Spec you can mock or import',
    ],
    highlights: [
      {
        title: 'Three libraries',
        body: '"JSON Schemas", "GraphQL" and "Files", each with a count. A JSON Schema drives live body validation in the editor, and a GraphQL schema, stored as SDL or introspection JSON, drives field completion.',
      },
      {
        title: 'Where each file lives',
        body: 'A pill says whether a file is "Uploaded locally", "On working branch", "Merged to base", "On main", missing or "Diverged", and "Used in N" says what depends on it. A file over 100 MB is refused, because GitHub refuses it too.',
      },
      {
        title: 'A Spec, recognised on sight',
        body: 'An OpenAPI or Swagger file shows a badge such as "OpenAPI 3 · 12 ops". "Import to collection" turns it into requests, and the Mocks panel can serve it as a mock.',
      },
      {
        title: 'Where Lens finds your Spec',
        plan: 'basic',
        body: 'The Spec that Lens compares your code against is a spec asset in this workspace. Pick it once, and Spec alignment and PR Review drift both use it.',
      },
    ],
    cta: webApp,
    secondaryCta: allDownloads,
    screenshot: 'global-assets',
    screenshotAlt:
      'The Assets dock beside the editor: widgets.openapi.json, uploaded locally and badged OpenAPI 3 · 8 ops, with Import to collection and the mock that uses it',
    frameLabel: 'Editor · Assets',
  },
  {
    slug: 'vscode',
    product: 'studio',
    icon: 'code',
    accent: 'sky',
    plan: 'free',
    navLabel: 'VS Code extension',
    featured: true,
    eyebrow: 'VS Code extension',
    title: 'Edit the same workspace from VS Code',
    tagline: 'Requests open as YAML documents you can edit, validate and send without leaving the editor.',
    summary:
      'The extension works on the same workspace as the desktop and web apps. Requests, environments and plans open as YAML under an `apicircle:` address, with a Send CodeLens on every request, JSON Schema validation, mock servers, and a Secret Vault that locks itself.',
    metaDescription:
      'Edit the same API workspace as YAML inside VS Code, with seven sidebar views, a Send CodeLens, assertions in the Testing tab, plan notebooks and mock servers.',
    bullets: [
      'Seven views, from Workspace to Snapshots',
      'A Send CodeLens on every request',
      'Assertions in the Testing tab',
      'Plans open as notebooks',
    ],
    highlights: [
      {
        title: 'Requests are documents',
        body: 'A request named "Create charge" in the Payments folder opens as `requests/Payments/Create-charge.yaml`. "▶▶ SEND REQUEST" sits above it, beside "✚ Add section…" and "⤵ New from template…", and problems appear in the Problems panel before you send.',
      },
      {
        title: 'Seven views, six templates',
        body: 'The sidebar has Workspace, Editor, Environment, Execution, Mock, History and Snapshots. A new request can start from Simple GET, JSON POST, Bearer-protected GET, Paginated GET, GraphQL query or REST CRUD scaffold.',
      },
      {
        title: 'Tests and notebooks',
        body: 'Every request with assertions appears in the Testing tab under "API Circle Assertions". A plan saved as `*.apicircle-plan.json` opens as the API Circle Plan Notebook.',
      },
      {
        title: 'Mocks and secrets',
        body: '"New Mock…" builds a mock from a file, a URL or a paste. F6 starts it, Shift+F6 stops it, and the status bar shows the ports. The Secret Vault locks after 30 idle minutes and clears a copied secret from the clipboard after 30 seconds.',
      },
    ],
    cta: { label: 'Get the extension', href: SITE.links.vscode },
    secondaryCta: allDownloads,
    closingCta: {
      title: 'Edit your API workspace in VS Code',
      subtitle: 'Install the extension from the Marketplace or Open VSX. It is free, and it opens the same workspace the apps do.',
      primary: { label: 'Get the extension', href: SITE.links.vscode },
      secondary: { label: 'Download for desktop', href: '/download', icon: 'download' },
    },
    screenshot: 'vscode',
    screenshotAlt: 'The API Circle extension in VS Code, with a request open as YAML and the Send CodeLens above it',
    frameLabel: 'VS Code',
    sample: {
      title: 'Install it',
      intro: 'From the Marketplace or Open VSX, then open any request as YAML.',
      blocks: [{ code: 'code --install-extension apicircle.apicircle-vscode', prompt: true, lang: 'Install the extension' }],
    },
  },
];
