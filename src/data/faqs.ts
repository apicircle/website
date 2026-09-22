/**
 * Frequently-asked questions — the single source of truth for the home-page FAQ
 * section, the FAQPage structured data, and llms.txt.
 *
 * Answers are written as self-contained, factual statements: that format wins
 * Google "People also ask" / featured snippets AND is what AI answer engines
 * (ChatGPT, Claude, Perplexity, Google AI Overviews) quote directly.
 *
 * Every answer must be checkable against the shipped product. Two rules learned
 * the hard way: never describe a paid surface as free (the MCP server is Pro and
 * the CLI is Team), and never quote a capability the gate denies. When in doubt,
 * the source of truth is the plan catalogue in the lens repo, which the pricing
 * page is generated from.
 */
import { frameworksSentence } from './frameworks';
import { SITE } from './site';

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'What is API Circle?',
    a: 'API Circle is one app with two halves. The API workspace is free and needs no account: write requests, manage environments, run collections, and start local mock servers, with your collections stored as plain JSON in your own Git repository. API Circle Lens is the paid half. It reads your repository, maps every API endpoint to the code that implements it, and tells you when a pull request moves your API away from its OpenAPI spec.',
  },
  {
    q: 'What is free?',
    a: 'The whole API workspace, with no account at all: the request editor, environments, run history, local mock servers, execution plans, OpenAPI and collection import, and GitHub-backed sync. One workspace is included. Paid plans add the code analysis — the Code graph, PR Review drift, and the headless surfaces that run it for you.',
  },
  {
    q: 'What is a Code graph?',
    a: 'A Code graph is a map of your API built from your source code rather than from a spec. For each endpoint it records the route, the handler, the request and response shapes the code actually uses, and the functions the handler calls. It is saved into your repository as a small sidecar, so it is versioned and reviewable like any other file, and a teammate or a CI job can read it without re-analysing the repository.',
  },
  {
    q: 'How does PR Review drift work?',
    a: 'Lens makes two comparisons. It compares the Code graph of the branch against the Code graph of the base it came from, which shows what the pull request changed. Then it compares the branch against your OpenAPI spec, which shows whether the API still matches its contract. The findings are things like an endpoint removed, an auth guard dropped, a response shape changed, a new database write inside a shared helper, or an endpoint the spec never documented.',
  },
  {
    q: 'Will it comment on my pull requests automatically?',
    a: 'No. Nothing is sent to your Git host until you press Submit, and there is no automatic posting. Drafts stay on your machine, and before anything is posted you see exactly what will appear on the pull request. On a public repository, findings that map security weaknesses are held back unless you explicitly opt in.',
  },
  {
    q: 'Which languages and frameworks can it read?',
    a: `${frameworksSentence()}. PHP is recognised only at a basic level, and Ruby, Elixir and Kotlin are not supported yet. Where an endpoint cannot be read with confidence, Lens reports it as unknown rather than guessing.`,
  },
  {
    q: 'Do I need to be on GitHub?',
    a: 'No. GitHub works on every plan, including free. GitLab, Bitbucket Cloud and Azure DevOps are included from Pro, and Lens posts positioned review comments on all four. Each host differs a little: GitLab has no request-changes verdict, so Lens leaves a comment instead and says so.',
  },
  {
    q: 'What happens to my code?',
    a: 'It stays on your machine. Analysis runs locally and sends nothing to us. The one exception is "Index with AI", an optional pass that sends the files it reads to the AI provider you chose, using your own API key — and it asks you first, per project and per provider. Our servers never receive repository contents, file paths or analysis results.',
  },
  {
    q: 'Do I need an account?',
    a: 'Not for the API workspace. It creates your first workspace on launch and never asks who you are. An account is needed only for a paid plan, which unlocks the Code graph, PR Review and the headless surfaces on the machines you activate.',
  },
  {
    q: 'What is the difference between API Circle Studio and API Circle Lens?',
    a: 'Studio is the free API workspace. Lens is the same app with four more panels: the Code graph, PR Review, the AI Assistant, and the MCP server setup. You do not install something different — you sign in, and the panels your plan includes appear.',
  },
  {
    q: 'How is API Circle different from Postman and Insomnia?',
    a: 'Two differences. Your collections are plain JSON in your own Git repository, so you branch, diff and review them the way you review code, and there is no mandatory cloud account. And on a paid plan, API Circle reads the source code behind your API, which lets it tell you when a pull request changes the API in a way your spec does not describe. Neither Postman nor Insomnia reads your implementation.',
  },
  {
    q: 'How do I mock an API with API Circle?',
    a: 'Point API Circle at an OpenAPI, Swagger, Postman or Insomnia file and it builds an HTTP mock you start on localhost. You can add conditional response rules, request validation, delays and response multipliers. The desktop app and the VS Code extension run mock servers for free; the web app can create and edit mock definitions, but a browser tab cannot run a server. Mock definitions sync with the workspace so a teammate gets them; the running server stays on your machine.',
  },
  {
    q: 'What authentication schemes does API Circle support?',
    a: `${SITE.stats.authSchemes} schemes: Bearer, Basic, API key, custom header, six OAuth 2.0 grants (client credentials, authorization code, authorization code with PKCE, password, implicit and device code, with token refresh), AWS Signature v4, Digest, NTLM, Hawk, and JWT Bearer. Signing primitives are verified against the relevant RFC and NIST reference vectors. A folder can carry auth that every request set to "Inherit (parent folder)" picks up.`,
  },
  {
    q: 'Can I run it in CI?',
    a: 'Yes, on the Team plan. The command-line interface runs the same drift check against a cloned repository, posts the findings as a pull-request comment, and exits with a code you can fail the build on. You choose the threshold: breaking changes only, any warning, or a pull request that adds a route the spec does not document or removes one it does. CI authenticates with a key from your account rather than consuming a device seat.',
  },
  {
    q: 'Is API Circle open source?',
    a: 'The API workspace is source-available and built in the open on GitHub. You can read the code, file issues, and keep your workspaces in your own repository, so nothing is locked in a vendor cloud. The Lens analysis panels are proprietary.',
  },
];
