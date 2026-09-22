import type { PlanId } from './feature-types';

/**
 * Facts about the Lens UI that the feature pages list in full.
 *
 * TRANSCRIBED from the Lens repository at 2.0.0, each block naming its source.
 * The website cannot import them, so re-check this file whenever the UI moves.
 */

/**
 * The frameworks drift-infill scaffolding writes for, named the way each
 * emitter's header comment names it (lens `packages-lens/scaffold/src/defaultRegistry.ts`
 * registers 14; the dialog shows the ids).
 */
export const SCAFFOLD_EMITTERS = [
  'Express',
  'Fastify',
  'Hono',
  'Koa',
  'NestJS',
  'Next.js (App Router)',
  'FastAPI',
  'Flask',
  'Django',
  'Django Ninja',
  'Spring',
  'ASP.NET Core',
  'Go (net/http)',
  'Rust (axum)',
];

/** The database libraries it can write against (lens `packages-lens/scaffold/src/db.ts`, `DB_ADAPTERS`). */
export const SCAFFOLD_DB_ADAPTERS = [
  'Prisma',
  'TypeORM',
  'Sequelize',
  'Mongoose',
  'MongoDB driver',
  'Redis',
  'SQLAlchemy',
  'psycopg',
  'Django ORM',
  'GORM',
  'database/sql',
  'Spring Data JPA',
  'Entity Framework',
  'SQLx',
  'Diesel',
];

/**
 * The Assistant's prompt library, verbatim (lens `packages-lens/ui-lens/src/assistant/suggestions.ts`).
 * `{endpoint}` is filled with the endpoint you pinned.
 */
export const PROMPT_LIBRARY: Array<{ name: string; prompts: string[] }> = [
  {
    name: 'Understand',
    prompts: [
      'Explain every endpoint',
      'Show the shape of this API',
      'Which endpoints need a human look?',
      'Explain `{endpoint}` end to end',
    ],
  },
  {
    name: 'Review & drift',
    prompts: [
      'What drifted from the spec?',
      'Review the newest pull request',
      'What breaks if I change `{endpoint}`?',
    ],
  },
  {
    name: 'Build & change',
    prompts: [
      'Scaffold what the spec promises',
      'Write the logic for `{endpoint}`',
      'Find endpoints the parser missed',
    ],
  },
  {
    name: 'Test & mock',
    prompts: [
      'Capture `{endpoint}` as a Studio request',
      'Mock this API from the Code graph',
      'Build a smoke-test run plan',
    ],
  },
];

/**
 * The Endpoint context graph (lens `apps/mcp-server/src/contextGraphTools.ts`).
 * Contracts and mocks are passed in by the MCP client, frontend callers are
 * scanned from the repository, and tests come from the Code graph.
 */
export const CONTEXT_GRAPH = {
  summary:
    'For one endpoint, the Endpoint context graph gathers what surrounds it. It is two MCP tools, `lens.context_graph.endpoint_context` and `lens.context_graph.build`, and the Assistant can use it too.',
  links: [
    'The OpenAPI contracts that describe the endpoint',
    'The workspace mocks that serve it',
    'The frontend code that calls it, found by scanning your repository',
    'The tests that exercise it, taken from the Code graph',
  ],
  limits:
    'There is no panel for it yet: it reaches you through an MCP client or the Assistant. Your client passes in the contracts and mocks, and callers are found in .ts, .tsx, .js, .jsx, .mjs, .cjs, .vue and .svelte files, with test files left out.',
};

/**
 * The tabs of account.apicircle.dev, in the app's own order
 * (lens `apps/account-web/src/AccountApp.tsx`, `SECTIONS`). The last four show
 * only to an owner or administrator; Team, Single sign-on and Seats only on the
 * Team plan, CLI keys on any plan that includes the MCP server or the CLI.
 */
export const ACCOUNT_TABS: Array<{ name: string; does: string; plan: PlanId }> = [
  { name: 'Overview', does: 'Your plan, and the code that activates a device.', plan: 'free' },
  { name: 'Devices', does: 'The devices your account has activated.', plan: 'free' },
  {
    name: 'Security',
    does: 'Two-step verification, "Sign out everywhere", "Download my data" and "Delete my account".',
    plan: 'free',
  },
  { name: 'Team', does: 'Invite members by email, and choose who administers the team.', plan: 'team' },
  { name: 'Single sign-on', does: 'Your identity provider, and the domains it signs in.', plan: 'team' },
  { name: 'Seats', does: 'How many seats you have, and how many are in use.', plan: 'team' },
  { name: 'CLI keys', does: 'The keys the MCP server and the command line sign in with.', plan: 'pro' },
];
