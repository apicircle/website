/**
 * Frequently-asked questions — the single source of truth for the home-page FAQ
 * section, the FAQPage structured data, and llms.txt.
 *
 * Answers are written as self-contained, factual statements: that format wins
 * Google "People also ask" / featured snippets AND is what AI answer engines
 * (ChatGPT, Claude, Perplexity, Google AI Overviews) quote directly. Keep every
 * answer accurate — do not claim ratings, awards, or an OSI license we lack.
 */
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'What is API Circle?',
    a: 'API Circle is a free, source-available API client for testing, mocking, and automating REST APIs. Your collections live as plain JSON in your own Git repository, and a built-in MCP server lets any AI client — Claude, Cursor, GitHub Copilot, ChatGPT and others — read, author, and run requests. It runs as a desktop app, a zero-install web app, a CLI, and a VS Code extension.',
  },
  {
    q: 'Is API Circle free?',
    a: 'Yes. API Circle is free across every surface — the web app, desktop app, CLI, and VS Code extension. There is no account to create and no cloud subscription; the web app creates your first workspace automatically in local storage.',
  },
  {
    q: 'Is API Circle open source?',
    a: 'API Circle is source-available and built in the open on GitHub. You can read the code, file issues, and self-host your workspaces, which are plain JSON stored in your own Git repository — so there is no vendor lock-in and nothing is uploaded to a third-party server.',
  },
  {
    q: 'How is API Circle different from Postman and Insomnia?',
    a: 'API Circle is a full-featured API client in the spirit of Postman and Insomnia, with two ideas the others lack at the core. First, your workspace is a Git repo: branch, diff, review, and merge your collections like code, with no mandatory cloud account. Second, your workspace is an AI tool catalog: a built-in MCP server exposes 94 tools so any AI assistant can drive it. Collections are plain JSON you own, not data locked in a vendor cloud.',
  },
  {
    q: 'Can AI assistants like Claude, Cursor, or ChatGPT use API Circle?',
    a: 'Yes. API Circle ships a built-in MCP (Model Context Protocol) server with 94 tools. Any MCP-compatible AI client — including Claude Desktop, Claude Code, ChatGPT, GitHub Copilot, Cursor, Continue, Cline, Zed, and Windsurf — can scan a codebase, propose a collection, run requests, and spin up mock servers from chat. The app generates a copy-paste config for each client.',
  },
  {
    q: 'How do I mock an API with API Circle?',
    a: 'Point API Circle at an OpenAPI, Swagger, Postman, or Insomnia file and it starts a running HTTP mock on localhost in seconds. You can override individual responses, add conditional rules and request validation, and apply response multipliers. Mocks can be started from the app, from the CLI with "npx @apicircle/cli mock ./openapi.yaml", or from an AI client.',
  },
  {
    q: 'Does API Circle work offline and without an account?',
    a: 'Yes. API Circle needs no account and no cloud connection. Workspaces are stored locally and can optionally sync to your own Git repository. Mock servers and request execution run entirely on your machine.',
  },
  {
    q: 'What authentication schemes does API Circle support?',
    a: 'All 17 schemes are end-to-end functional: Bearer, Basic, API key, custom header, the full OAuth2 grant set (with PKCE, device flow, and auto-refresh), AWS SigV4, Digest, NTLM, Hawk, and JWT. Signing primitives are verified against the relevant RFC and NIST reference vectors, and folder-level auth cascades to descendant requests.',
  },
  {
    q: 'Can I run API Circle in CI or from the command line?',
    a: 'Yes. The apicircle CLI runs collections, mock servers, and spec imports from any terminal — no UI required. It emits JUnit XML for CI pipelines and can address a workspace by name or by a git-cloned directory path, which makes it well suited to automated API testing.',
  },
  {
    q: 'What platforms and formats does API Circle support?',
    a: 'API Circle runs on Windows, macOS, Linux, and the web, plus a CLI and a VS Code extension. It imports cURL, OpenAPI/Swagger, Postman, Insomnia, HAR, and .apicircle.json, and generates client code as cURL, fetch, Node (axios), Python (requests), Go, or Rust.',
  },
];
