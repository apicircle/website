/**
 * Copy for `/enterprise`: where API Circle sits in an enterprise API workflow.
 *
 * Every capability named here is one the shipped product has, worded the way the
 * Lens feature pages word it (`features-lens.ts`). Severities are the Review's
 * own grades (lens `packages-lens/pr-review/src/review.ts`, with per-detail
 * grades from `packages-lens/contract/src/drift.ts`): a response type change is
 * Warning, a status-code change is Info, a route the Spec does not document is
 * `openapi-drift` (Warning), and removing a guard from a route's middleware
 * chain or removing a route is Critical. "In focus" and "Diffracting" are the
 * pull request's verdict, never a finding's grade.
 *
 * A changed handler is graded by its name (`effectKind` in lens
 * `packages-lens/pr-review/src/classify.ts`): one named for a data write
 * (`create`, `save`, `update`, `delete`, ...) adds `new-side-effect`, a Warning,
 * to whatever else changed. So the Info row is a read handler (`GET`), never a
 * `POST` one, whose natural name (`create_application`) would make it Warning.
 *
 * CLI behaviour (exit codes, the public-repository refusal, `--use-verified`)
 * is the released `@apicircle-lens/cli`'s: lens `apps/cli/src/review/`. The CLI
 * is Team (`apps/cli/src/cliGate.ts`), so anything here that runs it carries a
 * Team badge. A refused post on a public repository returns before the
 * `--fail-on` gate runs, so the job exits 2 there, not 1.
 *
 * The bank is illustrative. Its services, stacks and pull requests are made up to
 * show one gate per service; no customer, incident or result is implied, and the
 * page says so beside the board.
 */
import type { PlanId } from './feature-types';

export interface GlanceItem {
  label: string;
  body: string;
}

export const GLANCE: GlanceItem[] = [
  {
    label: 'Where it sits',
    body: "At each service's pull request, between its OpenAPI Spec and its code. It also runs on the developer's machine before push, and in CI as a merge gate.",
  },
  {
    label: 'What it does',
    body: 'Builds a Code graph that maps every endpoint to the code that serves it, then compares each change with its base and with the Spec.',
  },
  {
    label: 'What changes',
    body: 'API drift is found before merge, at the endpoint and the code behind it, instead of in staging or by a consumer in production.',
  },
];

export interface Reason {
  title: string;
  body: string;
}

export const REASONS: Reason[] = [
  {
    title: 'Both inputs are already there',
    body: 'A pull request carries the changed code and its base, and the Spec sits in the repository or the workspace. API Circle needs nothing else: no deployed service, no test data, no production traffic.',
  },
  {
    title: 'The fix is still cheap',
    body: 'The author is still working on the change and nothing has merged. Past the merge, drift reaches staging, then the portal, the generated SDKs and every team that calls the API.',
  },
  {
    title: 'Enterprises already enforce quality there',
    body: 'Approvals and required checks already live on the pull request. API Circle adds one review and one check to that gate. It adds no new stage, meeting or hand-off.',
  },
  {
    title: 'Reviewers need the API view of a diff',
    body: 'A diff shows changed lines. It does not show that dropping one argument took the auth guard off `POST /transfers`. API Circle names the endpoint, the change and the line.',
  },
  {
    title: 'The source is the complete record',
    body: 'Reading the source covers every endpoint the parser can trace, including the ones no test exercises and the ones not deployed yet.',
  },
];

/** A finding's grade, or `in-focus` for a pull request with no finding at all. */
export type Severity = 'critical' | 'warning' | 'info' | 'in-focus';
export type Verdict = 'blocked' | 'commented' | 'passed';

export interface ServiceGate {
  service: string;
  stack: string;
  /** What the service is for, in a few words. */
  role: string;
  /** The pull request's title, as its author wrote it. */
  pr: string;
  /** `METHOD /path`, or a plain phrase when no endpoint changed. */
  endpoint: string;
  /** What the change did. Backticks mark code. */
  change: string;
  /** The same change in a few words, for the architecture figure's narrow columns. */
  brief: string;
  /** What kind of contract drift, where the flag alone does not say. */
  note?: string;
  severity: Severity;
  /** The finding's flag or pill, as the Review panel prints it. */
  flag?: string;
  finding: string;
  verdict: Verdict;
  /** The service's own `--fail-on` threshold. */
  policy?: string;
}

/** One illustrative retail bank: six services, six pull requests, six gates. */
export const BANK_GATES: ServiceGate[] = [
  {
    service: 'Payments API',
    stack: 'Node.js · Express',
    role: 'moves money',
    pr: 'Tidy up transfer routes',
    endpoint: 'POST /transfers',
    change: 'drops `requireBearer`',
    brief: 'drops `requireBearer`',
    severity: 'critical',
    flag: 'auth-removed',
    finding: 'Auth guard removed from the route',
    verdict: 'blocked',
    policy: '--fail-on breaking',
  },
  {
    service: 'Open Banking API',
    stack: 'TypeScript · NestJS',
    role: 'serves partners',
    pr: 'Upgrade the logging library',
    endpoint: 'no endpoint changed',
    change: 'contract untouched',
    brief: 'logging upgrade',
    severity: 'in-focus',
    finding: 'No drift against the Spec',
    verdict: 'passed',
  },
  {
    service: 'Accounts API',
    stack: 'Java · Spring Boot',
    role: 'balances, statements',
    pr: 'Send balances as text',
    endpoint: 'GET /balances/{id}',
    change: '`amount`: number → string',
    brief: '`amount` now a string',
    note: 'type',
    severity: 'warning',
    flag: 'contract-drift',
    finding: 'Spec says number, code returns string',
    verdict: 'blocked',
    policy: '--fail-on warning',
  },
  {
    service: 'Onboarding API',
    stack: 'Python · FastAPI',
    role: 'KYC, new customers',
    pr: 'Answer 202 while a check runs',
    endpoint: 'GET /checks/{id}',
    change: 'also returns 202 while the KYC check runs',
    brief: '202 while it runs',
    note: 'status',
    severity: 'info',
    flag: 'contract-drift',
    finding: 'Code returns 202, the Spec documents only 200',
    verdict: 'commented',
    policy: '--fail-on breaking',
  },
  {
    service: 'Cards API',
    stack: 'Go · gin',
    role: 'cards, limits',
    pr: 'Add a support shortcut',
    endpoint: 'POST /cards/unblock',
    change: 'a new route, not in the Spec',
    brief: 'new, not in the Spec',
    note: 'new route',
    severity: 'warning',
    flag: 'openapi-drift',
    finding: 'Not in the Spec, so the pull request is Diffracting',
    verdict: 'blocked',
    policy: '--fail-on diffracting',
  },
  {
    service: 'Loans API',
    stack: 'C# · ASP.NET Core',
    role: 'lending',
    pr: 'Retire the old schedule',
    endpoint: 'GET /schedules/{id}',
    change: 'deleted, still in the Spec',
    brief: 'deleted, still in Spec',
    severity: 'critical',
    flag: 'endpoint-removed',
    finding: 'Removed, but the Spec still has it',
    verdict: 'blocked',
    policy: '--fail-on breaking',
  },
];

/** What sits behind the bank's services, in the architecture figure. */
export const BANK_BACKENDS = ['event streaming', 'core banking', 'card schemes', 'payment rails', 'credit bureaus'];

/** What the Spec feeds at runtime, in the architecture figure. */
export const SPEC_FEEDS = ['gateway policies', 'developer portal', 'partner SDKs'];

export interface ArchKeyItem {
  /** A touchpoint number, or `x` for "not in the request path". */
  mark: number | 'x';
  title: string;
  body: string;
  primary?: boolean;
}

/** The key under the architecture figure. Numbers match TOUCHPOINTS and the workflow figure. */
export const ARCH_KEY: ArchKeyItem[] = [
  {
    mark: 1,
    title: "On the developer's machine",
    body: 'The Code graph maps every endpoint to its code. Review before you push; AI assistants read the same map over MCP.',
  },
  {
    mark: 2,
    title: "On every service's pull request",
    body: 'Head against base, head against the Spec. Each finding in the code names a file and a line.',
    primary: true,
  },
  {
    mark: 3,
    title: 'In CI, as a required check',
    body: '`apicircle-lens review --fail-on` fails the job and blocks the merge when a change meets the bar. Each team sets its own bar.',
  },
  {
    mark: 4,
    title: 'For the API platform team',
    body: 'Spec alignment per service: undocumented, not implemented, drifted. With `--use-verified`, the CI gate checks the schemas the team verified.',
  },
  {
    mark: 'x',
    title: 'Not in the request path',
    body: "No proxy, no sidecar, no agent and no production traffic: nothing to deploy beside your services, and nothing added to a request's latency. The gateway, the portal and partner SDKs keep trusting the Spec, because each change was checked against it.",
  },
];

/** Who the bank's production API serves: where a merged change lands. */
export const BANK_CONSUMERS = ['Mobile banking app', 'Internet banking', 'Open Banking partners', 'Branch & contact centre'];

export type When = 'never' | 'late' | 'early';

export interface Comparison {
  check: string;
  compares: string;
  when: string;
  tone: When;
  needs: string;
}

export const COMPARISONS: Comparison[] = [
  {
    check: 'Spec linting and design review',
    compares: 'The Spec against a style guide',
    when: 'Not at all: it never reads the code',
    tone: 'never',
    needs: 'The Spec',
  },
  {
    check: 'Peer code review',
    compares: 'Changed lines, by eye',
    when: 'Only if the reviewer knows the Spec by heart',
    tone: 'never',
    needs: "A reviewer's attention",
  },
  {
    check: 'SAST and dependency scans',
    compares: 'Code against vulnerability patterns',
    when: 'Not at all: a contract change is not a vulnerability pattern',
    tone: 'never',
    needs: 'The source',
  },
  {
    check: 'Contract and API tests',
    compares: 'A running service against tests or the Spec',
    when: 'Usually after merge, and only where a test exists',
    tone: 'late',
    needs: 'A deployed service and maintained tests',
  },
  {
    check: 'Runtime discovery and monitoring',
    compares: 'Live traffic',
    when: 'In production, after consumers call it',
    tone: 'late',
    needs: 'Production traffic',
  },
  {
    check: 'API Circle',
    compares: "Each endpoint's code with its base, and with the Spec",
    when: 'At the pull request, before merge',
    tone: 'early',
    needs: 'The repository and the Spec',
  },
];

export interface Touchpoint {
  n: number;
  title: string;
  who: string;
  plan: Exclude<PlanId, 'free'>;
  primary?: boolean;
  points: string[];
  /** Optional capabilities inside the card that sit on a later plan. */
  extras?: { label: string; plan: Exclude<PlanId, 'free'> }[];
}

export const TOUCHPOINTS: Touchpoint[] = [
  {
    n: 1,
    title: "On the developer's machine",
    who: 'Developers and their AI coding tools',
    plan: 'basic',
    points: [
      'Indexing builds the Code graph locally: every endpoint is traced from its route, through the auth and validation middleware, to the handler and every function it calls.',
      'The map is saved under `.apicircle/` and committed with the change, so the reviewer and CI read the same map the developer saw.',
      'Working tree review checks the branch, or only the uncommitted edits, against the base before anything is pushed.',
      'The MCP server gives Claude, Cursor, Copilot and other MCP clients the same Code graph and drift findings, so AI-written changes are held to the same contract.',
    ],
    extras: [{ label: 'MCP server', plan: 'pro' }],
  },
  {
    n: 2,
    title: 'At the pull request',
    who: 'Reviewers and the change author',
    plan: 'basic',
    primary: true,
    points: [
      'Two comparisons: head against base shows what the change did; head against the Spec shows whether the API still matches its contract.',
      'Findings carry flags such as `auth-removed`, `endpoint-removed`, `openapi-drift`, `new-side-effect` and `shared-impact`, filed as Critical, Warning or Info. Each finding in the code names a file and a line.',
      'Contract drift covers parameters, cookies, bodies, response headers, status codes, nullable, format, enum and auth.',
      'One verdict per pull request: "In focus", or "Diffracting" when a route appears that the Spec does not document, or a documented one disappears.',
      'Comments are pinned to the diff line. In the app, nothing is posted until you press "Submit review".',
    ],
    extras: [{ label: 'GitLab, Bitbucket Cloud, Azure DevOps', plan: 'pro' }],
  },
  {
    n: 3,
    title: 'In the CI pipeline',
    who: 'Platform and DevOps teams',
    plan: 'team',
    points: [
      '`apicircle-lens review` runs both comparisons in CI, with no desktop app and no seat. CI signs in with a CLI key.',
      '`--fail-on` picks what fails the build: `breaking`, `warning`, `info` or `diffracting`. Exit 0 passes. 1 means the gate tripped, the plan does not allow the review, the comment could not be posted, or an option name was not recognised. 2 means the review could not run, for example because a flag had a bad value, or the Code graph or the Spec could not be read. With `--require-fresh-index`, 3 means the committed Code graph is out of date.',
      '`--comment` keeps one summary comment current on the pull request, so a busy pull request does not collect a new one on every run.',
      'On a public repository, the CLI refuses to post a review that holds security findings, such as removed auth or a route missing from the Spec, and exits 2. `--omit-security-findings` posts the rest; `--allow-public-security-findings` posts them all.',
    ],
  },
  {
    n: 4,
    title: 'For Spec owners and API governance',
    who: 'Architects and API owners',
    plan: 'basic',
    points: [
      'The Spec alignment bar counts the endpoints with drift, not implemented and undocumented, so the Spec and the code can be brought back together.',
      'Where the parser cannot read a shape, it leaves it unresolved instead of guessing. A person can verify the schema, with a drift preview and an audit of who verified what, and when.',
      'Verified schemas are committed in `schema-overrides.json`, and CI with `--use-verified` gates on that same verified contract.',
    ],
    extras: [{ label: 'CI gate on verified schemas', plan: 'team' }],
  },
];

export interface Step {
  title: string;
  body: string;
  /** The plan the step's paid capability needs, shown with `PlanBadge`. */
  plan?: { label: string; plan: Exclude<PlanId, 'free'> };
}

export const ROLLOUT: Step[] = [
  {
    title: 'Map one service',
    body: 'Index it in the API Circle desktop app, choose its OpenAPI Spec, read the Spec alignment bar, verify any schema the parser could not read, and commit `.apicircle/` with the code.',
  },
  {
    title: 'Report before you block',
    body: 'Add `apicircle-lens review` with `--comment` and no `--fail-on`. It keeps one comment current on each pull request and, on a private repository, does not fail the build on a finding, so the team sees real findings first. On a public repository, add `--omit-security-findings`: without it, a security finding stops the post and fails the job.',
    plan: { label: 'Command line', plan: 'team' },
  },
  {
    title: 'Make it a required check',
    body: 'Add `--fail-on breaking` and mark the job required. Lower the bar to `warning` once the team trusts the findings, and add `--use-verified` so the gate follows the schemas your team verified.',
    plan: { label: 'Command line', plan: 'team' },
  },
];

export interface Constraint {
  icon: string;
  title: string;
  body: string;
  /** The plan the card's paid capability needs, shown with `PlanBadge`. */
  plan?: { label: string; plan: Exclude<PlanId, 'free'> };
}

export const CONSTRAINTS: Constraint[] = [
  {
    icon: 'monitor',
    title: 'Code stays where it is',
    body: "Indexing and analysis run on the developer's machine or your CI runner. Our servers receive no repository content, file paths or analysis results, only what an account and a licence need.",
  },
  {
    icon: 'shield-check',
    title: 'No telemetry',
    body: 'The API Circle desktop app and the command line collect no analytics or telemetry.',
  },
  {
    icon: 'key',
    title: 'Your keys, your providers',
    body: 'Git host tokens stay on the device. The in-app Assistant uses your own Anthropic, OpenAI or Google Gemini key, directly from the machine.',
    plan: { label: 'Assistant', plan: 'pro' },
  },
  {
    icon: 'aperture',
    title: 'Unread code is not drift',
    body: 'Where the parser cannot read a shape, it leaves it unresolved instead of reporting drift, and a person can verify it by hand.',
  },
  {
    icon: 'lock',
    title: 'AI tools stay local by default',
    body: 'MCP tools that publish or send data out, such as submitting a review, opening a pull request or running a plan, stay off unless the server starts with `--allow-egress` or `APICIRCLE_LENS_MCP_ALLOW_EGRESS=1`.',
    plan: { label: 'MCP server', plan: 'pro' },
  },
  {
    icon: 'users',
    title: 'Seats and sign-in',
    body: 'Seats with per-device activation, single sign-on through your identity provider over OIDC, and CI keys that do not take a seat.',
    plan: { label: 'Seats, SSO and CI keys', plan: 'team' },
  },
];
