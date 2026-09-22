/**
 * The languages and frameworks the Code graph reads, and the ones it does not.
 *
 * TRANSCRIBED from `lens/packages-lens/rest-code-graph/src/support.ts`
 * (`LANGUAGE_COVERAGE`), which a test there keeps consistent with the adapters
 * that are actually wired. The website cannot import it, so re-check this file
 * against that one whenever an adapter lands.
 *
 * It is the only copy on this site. `/lens`, the FAQ and `/features/code-graph`
 * all read it; the list used to be typed twice, in two different orders.
 */
export interface FrameworkRow {
  language: string;
  frameworks: string[];
}

/** Every framework parsed at the `deep` tier today, in the engine's own order. */
export const DEEP_FRAMEWORKS: FrameworkRow[] = [
  {
    language: 'TypeScript and JavaScript',
    frameworks: ['Express', 'Hono', 'Fastify', 'Koa', 'NestJS', 'Ts.ED', 'Next.js'],
  },
  { language: 'Python', frameworks: ['FastAPI', 'Flask', 'Django with DRF', 'Django Ninja'] },
  { language: 'Go', frameworks: ['gin', 'chi', 'echo', 'fiber', 'gorilla/mux', 'net/http', 'Huma'] },
  { language: 'Java', frameworks: ['Spring MVC', 'Spring WebFlux', 'Micronaut', 'JAX-RS / Jakarta'] },
  { language: 'C#', frameworks: ['ASP.NET Core minimal APIs', 'ASP.NET Core MVC'] },
  { language: 'Rust', frameworks: ['axum', 'actix-web', 'Rocket', 'Salvo', 'poem'] },
];

/**
 * What the engine does NOT read well, stated in the same voice as what it does.
 * PHP reaches only the regex fallback (route lines, nothing behind them); Ruby,
 * Elixir and Kotlin are on the roadmap and not parsed at all today.
 */
export const FALLBACK_LANGUAGES = ['PHP'];
export const UNSUPPORTED_LANGUAGES = ['Ruby', 'Elixir', 'Kotlin'];

/** `Express, Hono and Fastify` — a list as a sentence. */
export function listSentence(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** The FAQ's one-sentence answer, built from the table rather than typed beside it. */
export function frameworksSentence(): string {
  return DEEP_FRAMEWORKS.map((row) => `${row.language} (${row.frameworks.join(', ')})`).join(', ');
}
