import { SITE } from './site';
import { lensCtas, planName, type Feature } from './feature-types';

/**
 * Lens: the paid half, first on every list.
 *
 * Every fact below was checked against the Lens source at 2.0.0 and names its
 * noun: a UI label in quotes, a flag in backticks, a file name, a count. The
 * lowest plan for each comes from the entitlement catalogue (lens
 * `packages-lens/entitlements/src/catalog.ts`), and plan NAMES only ever come
 * from `planName()`, never typed.
 *
 * What these pages must not say is in CLAUDE.md: nothing from the hidden Build
 * pillar (the scaffold command's new-project flag included), no Lens download
 * for macOS or Linux (both are in progress; /download and the /features table
 * say so, and nothing else needs to), no
 * hosted Lens web app, no VS Code Lens extension, no tool counts, and no single
 * sign-on protocol beyond the catalogue's OIDC.
 */
export const LENS_FEATURES: Feature[] = [
  {
    slug: 'code-graph',
    product: 'lens',
    icon: 'compass',
    accent: 'brand',
    plan: 'basic',
    navLabel: 'Code graph',
    featured: true,
    eyebrow: 'Code graph',
    title: 'Map every endpoint to the code that serves it',
    tagline: 'Lens follows each route to its handler and into the functions it calls, database writes included.',
    summary:
      'Point Lens at a repository and it reads the source. Every endpoint it finds is traced from the route, through the middleware in front of it, into the handler and every function that handler calls, and the map is saved into the repository beside your code. Indexing runs on this machine and sends nothing.',
    metaDescription: `Lens maps each API endpoint in your repository to its handler and the functions it calls, locally, and commits the map beside your code. From the ${planName('basic')} plan.`,
    bullets: [
      'Route, guard, handler, then every function it calls',
      'TypeScript, Python, Go, Java, C# and Rust',
      'Committed beside your code, and reviewed like it',
      'Runs on your machine and sends nothing',
    ],
    highlights: [
      {
        title: 'From the route to every call',
        body: 'Each endpoint opens into a call tree: the route, the auth and validation middleware in front of the handler, the handler, and every function it reaches across files, the ones that write to your database included. The Shared tab lists code that more than one endpoint reaches.',
      },
      {
        title: 'Honest about what it cannot read',
        body: 'Where the extractor cannot read a shape with confidence, it leaves it unresolved instead of guessing, and you can verify it by hand. A call into your framework gets a one-line summary and an "Official docs ↗" link.',
      },
      {
        title: 'Versioned with your code',
        body: 'The map is written to `endpoints.json` and `index.json` under `.apicircle/`, so a pull request shows how the API changed. Lens also adds a `.gitignore` rule that keeps a local parser cache out of the repository. Press "Reindex" after a large change.',
      },
      {
        title: 'Three places to read from',
        body: 'A clone of the repository you connected, or a folder already on disk. A branch list switches the map to another branch, or back to your local working tree. The panel opens on three tabs: Endpoints, Shared and Refinements.',
      },
    ],
    ...lensCtas('basic'),
    screenshot: 'code-graph',
    screenshotAlt:
      'The Code graph for widgets-api with POST /api/v1/widgets expanded: its route, the requireBearer guard, the createWidget handler and the saveWidget, formatWidget and recordAudit calls behind it',
    frameLabel: 'Code graph · widgets-api',
    sample: {
      title: 'What lands in your repository',
      intro:
        'Two files you commit. A teammate, or a CI job, reads the same map without indexing the repository again.',
      blocks: [
        {
          lang: 'Your repository',
          code: [
            '.apicircle/workspace-<id>/codegraph/',
            '├── endpoints.json   # every endpoint: route, handler, what it calls',
            '└── index.json       # when it was built, and how many endpoints it found',
          ].join('\n'),
        },
      ],
    },
    extras: ['frameworks'],
  },
  {
    slug: 'pr-review-drift',
    product: 'lens',
    icon: 'git-pull-request',
    accent: 'blue',
    plan: 'basic',
    navLabel: 'PR Review drift',
    featured: true,
    eyebrow: 'PR Review drift',
    title: 'Review each pull request against the contract',
    tagline: 'Two comparisons: the branch against its base, and the branch against your Spec.',
    summary:
      'Lens makes two comparisons. It compares the head of a pull request with the base it came from, which shows what the change did, and then compares the same head with your OpenAPI Spec, which shows whether the API still matches its contract. Nothing reaches the pull request until you submit it.',
    metaDescription: `Lens checks each pull request against its base and your OpenAPI Spec, and flags removed auth, new side effects and contract drift by line. From the ${planName('basic')} plan.`,
    bullets: [
      'Head against base, and head against the Spec',
      'Every finding names a file and a line',
      'One verdict: "In focus" or "Diffracting"',
      'Nothing is posted until you press "Submit review"',
    ],
    highlights: [
      {
        title: 'A pull request, or your working tree',
        body: '"Pull request" reads the change from your Git host, in the host’s own word ("merge request" on GitLab), and "Check drift" runs it. "Working tree" reviews the edits on your disk with "Run impact review". Both open a "Files changed" view.',
      },
      {
        title: 'Findings with a name and a severity',
        body: 'Each finding carries flags such as `endpoint-removed`, `auth-removed`, `new-side-effect` and `shared-impact`, graded `breaking`, `warning` or `info`. Contract drift covers parameters, cookies, bodies, response headers, status codes, nullable, format and enum, and auth. Response-header and nullable drift are checked in one direction only.',
      },
      {
        title: 'One verdict per pull request',
        body: 'The verdict is about the list of endpoints. "Diffracting" means the pull request added a route the Spec does not document, or removed one it does, and says how many; otherwise it reads "In focus". Drift inside an endpoint shows up in the findings either way.',
      },
      {
        title: 'You decide what gets posted',
        body: 'Drafts stay on your machine. "Comment all findings" drafts a comment on the line behind each finding, and "Submit review" posts them once you confirm. On a public repository, comments describing auth changes or undocumented routes are left out unless you untick the box.',
      },
    ],
    ...lensCtas('basic'),
    screenshot: 'pr-review-drift',
    screenshotAlt:
      'The Review panel after a working-tree review of widgets-api: three endpoints with warnings, including a 204 the spec documents that the code no longer returns, each pointing at a file and line',
    frameLabel: 'Review · widgets-api',
    extras: ['drift-findings'],
  },
  {
    slug: 'spec-alignment',
    product: 'lens',
    icon: 'aperture',
    accent: 'amber',
    plan: 'basic',
    navLabel: 'Spec alignment',
    eyebrow: 'Spec alignment',
    title: 'See where the code and the Spec disagree',
    tagline: 'Pick a Spec, and every endpoint where the code and the contract disagree gets a pill.',
    summary:
      'Choose an OpenAPI Spec from the workspace and the Code graph lines the two up, endpoint by endpoint, then counts what the Spec declares that the code does not serve, the responses that drifted, the stubs, and the routes the Spec never documented. Where the parser could not read a shape, you verify it by hand. Nothing is guessed.',
    metaDescription: `Compare the Code graph with your OpenAPI Spec, see what is undocumented or not implemented, and verify schemas the parser misread. From the ${planName('basic')} plan.`,
    bullets: [
      'A banner counts what is missing and what drifted',
      '"Verify schema" corrects the parser, with an audit trail',
    ],
    highlights: [
      {
        title: 'One banner, four counts',
        body: 'The "Spec alignment" banner counts endpoints not implemented and responses that drifted, then adds stubbed and undocumented counts when there are any. With nothing missing and nothing drifted, it says so. If your app mounts its routes under a prefix such as `/api/v1`, you set that once.',
      },
      {
        title: 'A pill on each row that disagrees',
        body: '`undocumented`: implemented in code, absent from the selected Spec. `not implemented`: documented in the Spec, with no implementation found in the code. `stub`: scaffolded into the code and still unfilled.',
      },
      {
        title: 'Verify schema',
        body: '"Verify schema" asserts the shape of a position the extractor left unresolved: a path, query, header or cookie parameter, a request or response body, a response header, or security. A "Drift preview" shows what your version changes before you save, and an "Audit" records who verified what, and when.',
      },
      {
        title: 'Reviews use what you verified',
        body: 'A position you verified shows as human-verified in PR Review, and drift you settled as resolved · matches spec. The overrides are committed in `schema-overrides.json`, so the whole team reviews against the same contract.',
      },
    ],
    ...lensCtas('basic'),
    screenshot: 'spec-alignment',
    screenshotAlt:
      'The Code graph with DELETE /api/v1/widgets/:widgetId expanded and the Verify schema card open, its drift preview listing the 204 the spec documents and the 200 the code returns',
    frameLabel: 'Code graph · Verify schema',
    sample: {
      title: 'Gate CI on the contract you verified',
      plan: 'team',
      intro:
        '`--use-verified` fails the build on drift against your verified schema: a drift you resolved stops failing, and one your override revealed starts. It needs `--openapi`.',
      blocks: [
        {
          prompt: true,
          lang: 'In your pipeline',
          code: 'apicircle-lens review --pull-request 412 --repo acme/widgets-api --openapi openapi.json --use-verified --fail-on warning',
        },
      ],
    },
  },
  {
    slug: 'refinements',
    product: 'lens',
    icon: 'sliders-horizontal',
    accent: 'green',
    plan: 'basic',
    navLabel: 'Refinements',
    eyebrow: 'Refinements',
    title: 'Correct the Code graph where the parser missed',
    tagline: 'Add what the parser missed and block what is not an API. Both survive every reindex.',
    summary:
      'No parser reads every codebase perfectly. The Refinements tab is where you fix what Lens got wrong: declare an endpoint it did not find, tie a function to the endpoint that calls it, or block something that is not an endpoint at all. Each correction is a file in your repository, so the next reindex keeps it and your team reviews it.',
    metaDescription: `Add endpoints the parser missed, map functions and block false positives. Lens keeps each fix in files beside the Code graph. From the ${planName('basic')} plan.`,
    bullets: [
      '"Add endpoint" and "Map function" for what the parser missed',
      'Block a false positive, with a reason',
    ],
    highlights: [
      {
        title: 'Declare what it missed',
        body: '"Add endpoint" takes a method, a route path and a handler file, and "Declare endpoint" records it as yours, badged Manual. "Map function" ties a function the parser missed to an endpoint and traces its child calls in automatically.',
      },
      {
        title: 'Block what it should not see',
        body: 'Block an endpoint or a function and give a reason: Not an endpoint, Test / mock / fixture, Deprecated, Third-party noise, Duplicate, or Other, with an optional note. Blocked items keep an "Unblock" button, so nothing disappears for good.',
      },
      {
        title: 'Index with AI',
        plan: 'pro',
        body: 'An optional pass that asks your AI provider for endpoints the parser missed. Each suggestion is checked against the source and badged AI until you choose "Approve" or "Discard". Before anything is sent it asks, once per project folder and provider, and it uses the key saved in the Assistant’s settings.',
      },
      {
        title: 'Corrections are files',
        body: 'They sit beside the Code graph in `overrides.json`, `augmentation.json` and `suppressions.json`, and Lens re-applies them after every index. Commit them, and your team and your CI see the same corrected map.',
      },
    ],
    ...lensCtas('basic'),
    screenshot: 'refinements',
    screenshotAlt:
      'The Refinements tab of the Code graph listing one blocked function, allWidgets in src/shared/db.ts, with its reason and an Unblock button',
    frameLabel: 'Code graph · Refinements',
    sample: {
      title: 'Where corrections live',
      intro: 'Three files, committed with the rest of the Code graph.',
      blocks: [
        {
          lang: 'Your repository',
          code: [
            '.apicircle/workspace-<id>/codegraph/',
            '├── overrides.json      # what you declared, mapped or confirmed',
            '├── augmentation.json   # endpoints Index with AI found',
            '└── suppressions.json   # what you blocked, and why',
          ].join('\n'),
        },
      ],
    },
  },
  {
    slug: 'send-to-studio-editor',
    product: 'lens',
    icon: 'send',
    accent: 'sky',
    plan: 'basic',
    navLabel: 'Send to Studio Editor',
    eyebrow: 'Send to Studio Editor',
    title: 'Turn a Code graph endpoint into a runnable request',
    tagline: 'One endpoint or all of them, pre-filled from what the code accepts, with checks already on.',
    summary:
      'The Code graph already knows what each endpoint accepts. Send one to the Studio editor and it arrives as a request you can run, with its parameters, headers and body filled in from the code, and your Spec filling the gaps wherever the code is silent about a field.',
    metaDescription: `Turn any endpoint in the Code graph into a Studio request pre-filled from the code's contract, with response assertions switched on. From the ${planName('basic')} plan.`,
    bullets: ['Pre-filled from the code, with the Spec as fallback', 'Response assertions on by default'],
    highlights: [
      {
        title: 'One row, or the whole list',
        body: 'Every endpoint row has its own send button, and "Send to Studio Editor…" in the toolbar sends a selection. Put them in the collection root, or in a new folder you name without leaving the dialog.',
      },
      {
        title: 'Filled in from the code',
        body: 'Parameters, headers and the body come from the code contract, and the Spec fills what the code does not say. The base URL is the Spec’s server when that is absolute; otherwise the request uses `{{baseUrl}}`, so an environment decides.',
      },
      {
        title: 'It checks something on the first send',
        body: 'Response assertions are seeded from the contract and switched on, at the depth you pick: "Smoke test" or "Contract test". The first run of the request already tests the endpoint.',
      },
      {
        title: 'Sending twice merges',
        body: 'An endpoint that is "Already in your collection" offers "Merge into it". Merging keeps the request’s values and adds only what it is missing, so a second send updates the request instead of copying it.',
      },
    ],
    ...lensCtas('basic'),
    screenshot: 'send-to-editor',
    screenshotAlt:
      'The Send to Studio Editor dialog with all six endpoints selected, the collection root as destination, and the option to pre-fill each request from the contract checked',
    frameLabel: 'Code graph · Send to Studio Editor',
  },
  {
    slug: 'scaffolding',
    product: 'lens',
    icon: 'hammer',
    accent: 'red',
    plan: 'basic',
    navLabel: 'Drift-infill scaffolding',
    eyebrow: 'Drift-infill scaffolding',
    title: 'Write the endpoints your Spec declares',
    tagline: 'For each endpoint marked not implemented, Lens drafts code in your framework and your repository’s conventions.',
    summary:
      'Sometimes the Spec is ahead of the code. The Code graph marks each endpoint the Spec declares and no code serves as `not implemented`, and Scaffold drafts its handler in your framework, wired the way your repository already wires things, then shows you the result before a single file is written.',
    metaDescription: `When your OpenAPI Spec declares an endpoint the code lacks, Lens drafts a framework-native handler and a test stub for you to review. From the ${planName('basic')} plan.`,
    bullets: [
      'Framework-native handlers for spec-only endpoints',
      'A test stub, a typecheck and a lint before you apply',
    ],
    highlights: [
      {
        title: 'Written the way your code is',
        body: 'Lens picks the framework and the database library your repository already uses, and drafts the handler in that style. The full list of frameworks and database libraries is below.',
      },
      {
        title: 'You see it before it is written',
        body: "\"Also generate a test stub\" adds a test beside the handler, and \"Verify after applying (runs your repo's typecheck + lint)\" checks the result, with your tests too if you ask. Nothing touches your files until you press \"Apply to project\".",
      },
      {
        title: 'One endpoint, or all of them',
        body: 'Each not-implemented row has a Scaffold action, and "Scaffold all (N)" drafts every one. With a GitHub repository connected, it works on your working branch.',
      },
      {
        title: 'Stubs stay marked',
        body: '"Open draft PR" puts the change up for review on GitHub. A scaffolded endpoint keeps its `stub` pill, and counts in the banner’s stubbed total, until its handler does real work and you reindex.',
      },
    ],
    ...lensCtas('basic'),
    screenshot: 'scaffold',
    screenshotAlt:
      'The Scaffold dialog for the spec-only archive endpoint, previewing a new Express handler, src/handlers/archive.ts, above the Apply to project button',
    frameLabel: 'Code graph · Scaffold',
    sample: {
      title: 'The same thing from the command line',
      plan: 'team',
      intro: 'Without `--apply` the command previews the code and writes nothing.',
      blocks: [
        {
          prompt: true,
          lang: 'Scaffold from the command line',
          code: [
            'apicircle-lens scaffold --spec openapi.json --tests',
            'apicircle-lens scaffold --spec openapi.json --endpoint "GET /widgets/{widgetId}/history" --tests --apply',
          ].join('\n'),
        },
      ],
    },
    extras: ['scaffold-targets'],
  },
  {
    slug: 'assistant',
    product: 'lens',
    icon: 'sparkles',
    accent: 'brand',
    plan: 'pro',
    navLabel: 'AI Assistant',
    eyebrow: 'AI Assistant',
    title: 'Ask about your API, answered from the Code graph',
    tagline: 'A chat inside Lens desktop that reads your Code graph, using your own Anthropic, OpenAI or Google key.',
    summary:
      'Ask which endpoints write to the database, what a pull request broke, or how one endpoint handles auth, and the answer comes from the Code graph of the repository you have open rather than from a guess about code the model has never seen. You bring the key.',
    metaDescription: `Ask about your API in Lens desktop and get answers from the Code graph, using your own Anthropic, OpenAI or Google key. From the ${planName('pro')} plan.`,
    bullets: [
      'Your own Anthropic, OpenAI or Google key',
      'Answers grounded in the Code graph',
      'Edits only when "Allow edits" is on',
      'Inside Lens desktop',
    ],
    highlights: [
      {
        title: 'Bring your own key',
        body: 'Pick Anthropic (Claude), OpenAI or Google (Gemini) and paste a key from your own account. It is stored on this device, protected by the OS keychain, and used to talk to the models directly: you pay your provider.',
      },
      {
        title: 'It asks before it acts',
        body: '"Allow edits" is off by default and lets the Assistant change the workspace for one turn only. Anything that would leave your machine asks first, in its own confirmation. It can define a mock server; starting one stays with you.',
      },
      {
        title: 'Point it at an endpoint',
        body: 'Type @ in the composer to pin an endpoint to the question, or start from the prompt library below. Saved conversations stay on this device, one history per project.',
      },
      {
        title: 'Answers with a trust score',
        body: 'The "Code graph accuracy" skill grounds every answer in your committed Code graph and scores how far to trust it. The "General" skill is there for everything else.',
      },
    ],
    ...lensCtas('pro'),
    screenshot: 'assistant',
    screenshotAlt:
      'The Assistant in Lens desktop with its prompt library open, prompts grouped under Understand, Review & drift and Build & change, above the message composer',
    frameLabel: 'Assistant · widgets-api',
    extras: ['prompt-library'],
  },
  {
    slug: 'mcp-ai',
    product: 'lens',
    icon: 'server-cog',
    accent: 'sky',
    plan: 'pro',
    navLabel: 'MCP server',
    featured: true,
    eyebrow: 'MCP server',
    title: 'Put your AI client on the same Code graph',
    tagline: 'An MCP server that gives Claude, Cursor, Copilot and other clients the endpoints, requests and drift findings you work from.',
    summary:
      'Start it with `apicircle-lens mcp`. Any client that speaks the Model Context Protocol can then read your workspace over stdio (requests, environments, mocks and plans) together with the Code graph, PR Review and the Endpoint context graph, and the MCP panel in Lens desktop writes the client’s configuration for you.',
    metaDescription: `apicircle-lens mcp gives Claude, Cursor, Copilot and other MCP clients your Code graph, PR Review and the Endpoint context graph. From the ${planName('pro')} plan.`,
    bullets: [
      'Runs as `apicircle-lens mcp`, over stdio',
      `Installs into ${SITE.mcpClients.installable.length} clients with one click`,
      'Publishing stays off unless you allow it',
      'Carries the Endpoint context graph',
    ],
    highlights: [
      {
        title: `One click for ${SITE.mcpClients.installable.length} clients`,
        body: `"Install" writes the configuration in each client's own format into ${SITE.mcpClients.installable.join(', ')}. ${SITE.mcpClients.manual.join(', ')} and any other MCP client get a snippet to paste.`,
      },
      {
        title: 'Publishing is opt-in',
        body: 'The tools that reach beyond your machine (submitting a review, opening a pull request, connecting a Git host, running a plan) stay off unless the server starts with `--allow-egress` or `APICIRCLE_LENS_MCP_ALLOW_EGRESS` is set.',
      },
      {
        title: 'Tools the app does not have',
        body: `Some MCP tools exist only here: HAR import, code generation to ${SITE.mcpCodegenTargets.join(', ')} through \`generate.code\`, a collection extracted from a codebase, and source-backed edits that preview a patch before applying it.`,
      },
      {
        title: 'The Endpoint context graph',
        body: 'For one endpoint, it gathers the OpenAPI contract and workspace mocks your client passes in, the frontend code that calls it, and the tests that exercise it. More below.',
      },
    ],
    ...lensCtas('pro'),
    screenshot: 'mcp-connection',
    screenshotAlt:
      'The MCP panel set up for Claude Desktop: the server, the repository path and the generated configuration, with Copy MCP config and Install Claude Desktop buttons',
    frameLabel: 'MCP · widgets-api',
    sample: {
      title: 'The configuration it writes',
      intro:
        'The MCP panel fills in your repository path. The key comes from the CLI keys tab of your account, and publishing stays off until you change `APICIRCLE_LENS_MCP_ALLOW_EGRESS`.',
      blocks: [
        {
          filename: 'claude_desktop_config.json',
          lang: 'json',
          code: [
            '{',
            '  "mcpServers": {',
            '    "apicircle": {',
            '      "command": "apicircle-lens",',
            '      "args": ["mcp", "--repo", "/path/to/your/repo"],',
            '      "env": {',
            '        "APICIRCLE_LENS_REPO": "/path/to/your/repo",',
            '        "APICIRCLE_LENS_WORKSPACE_ID": "lens-desktop",',
            '        "APICIRCLE_LENS_CLI_KEY": "<paste your API Circle CLI key>",',
            '        "APICIRCLE_LENS_MCP_ALLOW_EGRESS": "0"',
            '      }',
            '    }',
            '  }',
            '}',
          ].join('\n'),
        },
      ],
    },
    extras: ['mcp-clients', 'endpoint-context-graph'],
  },
  {
    slug: 'git-hosts',
    product: 'lens',
    icon: 'git-merge',
    accent: 'green',
    plan: 'pro',
    navLabel: 'GitLab, Bitbucket, Azure DevOps',
    eyebrow: 'Git hosts',
    title: 'Review on GitLab, Bitbucket Cloud and Azure DevOps',
    tagline: 'PR Review drift on the three other hosts, through each one’s own review API. GitHub needs no add-on.',
    summary: `Lens speaks GitLab, Bitbucket Cloud and Azure DevOps through each host's own review API. It reads their open requests, pins comments to the diff line and submits the verdicts each host allows. GitHub works on every plan, including ${planName('free')}.`,
    metaDescription: `Lens reviews pull and merge requests on GitLab, Bitbucket Cloud and Azure DevOps through each host's own API. GitHub works on every plan. From the ${planName('pro')} plan.`,
    bullets: [
      'Comments pinned to the diff line on all four hosts',
      'Self-managed GitLab and Azure DevOps through an API base URL',
    ],
    highlights: [
      {
        title: 'Connect a host once',
        body: 'Each host takes its own kind of token, saved in the Secret Vault’s Sessions: a GitLab personal access token, a Bitbucket API token or access token, or an Azure DevOps personal access token. A self-managed host adds its API base URL.',
      },
      {
        title: 'Each host in its own words',
        body: 'Lens calls a GitLab change a merge request, because GitLab does. GitLab has no request-changes verdict, so there Lens posts the comment and says which verdict it could not express. The table on this page lists every difference.',
      },
    ],
    ...lensCtas('pro'),
    extras: ['host-matrix', 'plan-capabilities'],
  },
  {
    slug: 'cli',
    product: 'lens',
    icon: 'terminal',
    accent: 'blue',
    plan: 'team',
    navLabel: 'Command line for CI',
    featured: true,
    eyebrow: 'Command line',
    title: 'Fail the build when the API drifts',
    tagline: 'apicircle-lens review runs the same drift check in CI, with an exit code your pipeline can gate on.',
    summary:
      'A pipeline needs no desktop app and no seat. `apicircle-lens review` compares a pull request with its base and with your OpenAPI Spec, keeps one comment on the pull request up to date, and exits with a code you can fail the build on. The same binary indexes, scaffolds and runs execution plans.',
    metaDescription: `apicircle-lens review runs PR Review drift in CI, keeps one pull-request comment current, and fails the build on the drift you choose. From the ${planName('team')} plan.`,
    bullets: [
      '`--fail-on` breaking, warning, info or diffracting',
      'One pull-request comment, kept current',
      '`codegraph index`, `scaffold` and `run` in the same binary',
      'Signs in with a key, not a device seat',
    ],
    highlights: [
      {
        title: 'Choose what fails the build',
        body: '`--fail-on breaking` fails on an endpoint removed, a method changed or auth removed; `warning` and `info` lower the bar to changed auth, new side effects and contract drift. `--fail-on diffracting` fails when a route appears that the Spec does not document, or a documented one disappears. The command exits 0 when the gate passes, 1 when it trips, and 2 when a flag, the map or the Spec cannot be read.',
      },
      {
        title: 'One comment, kept current',
        body: '`--comment` posts a summary and edits that same comment on the next run, so a busy pull request does not collect twenty of them. `--submit` posts a positioned review instead, with `--event COMMENT`, `APPROVE` or `REQUEST_CHANGES`.',
      },
      {
        title: 'CI signs in with a key',
        body: 'Set `APICIRCLE_LENS_CLI_KEY` from your account’s CLI keys; the CLI checks it online on every run. The host token comes from `GITHUB_TOKEN`, `APICIRCLE_LENS_GIT_TOKEN` or `apicircle-lens git connect`, and `--host` with `--base-url` reaches the other hosts, self-managed ones included.',
      },
      {
        title: 'It refuses to leak a public repository',
        body: 'Findings like "auth removed" map the soft spots of a live API. On a public repository the CLI will not post them unless you pass `--allow-public-security-findings`; `--omit-security-findings` posts everything else.',
      },
    ],
    ...lensCtas('team'),
    screenshot: 'cli',
    screenshotAlt:
      'A terminal running apicircle-lens review on widgets-api: three warnings, including a 204 the spec documents and a 200 the code returns, then exit code 1',
    frameLabel: 'Terminal · apicircle-lens',
    sample: {
      title: 'Review a pull request in CI',
      intro:
        'The pull request must commit its Code graph under `.apicircle/`: pull-request mode reads the committed map at the head rather than indexing the checkout. The pipeline needs two secrets, `APICIRCLE_LENS_CLI_KEY` and a host token.',
      blocks: [
        {
          prompt: true,
          lang: 'In your pipeline (Node 20+)',
          code: [
            'npm install -g @apicircle-lens/cli',
            'apicircle-lens review --pull-request 412 --repo acme/widgets-api --openapi openapi.json --comment --fail-on breaking',
          ].join('\n'),
        },
      ],
    },
  },
  {
    slug: 'seats-and-sso',
    product: 'lens',
    icon: 'users',
    accent: 'amber',
    plan: 'team',
    navLabel: 'Seats and single sign-on',
    eyebrow: 'For teams',
    title: 'Seats, device activation and single sign-on',
    tagline: 'Buy seats for a team, activate each device with a code, and let your identity provider handle sign-in.',
    summary:
      'A team plan is billed per seat. Each person activates Lens on their own device, CI signs in with a key instead of taking a seat, and your identity provider can own sign-in for everyone on your domain. You manage all of it in one place.',
    metaDescription: `Seats, per-device activation and single sign-on for Lens, managed at account.apicircle.dev, plus CLI keys for CI. From the ${planName('team')} plan.`,
    bullets: [
      'Seats, with members invited by email',
      'Activate a device with a code',
      'Single sign-on through your identity provider',
      'CLI keys for CI and MCP',
    ],
    highlights: [
      {
        title: 'Seats and members',
        body: 'The Seats tab reads "N seats, M in use." Members are invited by email from the Team tab until the seats run out. You can reduce the count once your next renewal has been paid at the current one.',
      },
      {
        title: 'One device per seat',
        body: 'Sign in to Lens desktop with your account, or choose "or use a code" and enter the activation code your account generates. Each seat covers one device.',
      },
      {
        title: 'Single sign-on',
        body: 'The Single sign-on tab connects your identity provider and lists the domains it signs in. People on those domains then choose "Continue with SSO".',
      },
      {
        title: 'Keys for machines',
        plan: 'pro',
        body: 'The CLI keys tab issues the keys that the MCP server and the command line sign in with. CI runners are short-lived and would churn through seats, so they use a key instead.',
      },
    ],
    ...lensCtas('team'),
    secondaryCta: { label: 'Open your account', href: 'https://account.apicircle.dev' },
    extras: ['account-surfaces', 'plan-capabilities'],
  },
];
