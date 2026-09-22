import { LENS_FEATURES } from './features-lens';
import { STUDIO_FEATURES } from './features-studio';
import type { Feature } from './feature-types';

export type { Feature, Highlight } from './feature-types';

/**
 * Every feature page, Lens first.
 *
 * Order is the story the site tells: the paid product that reads your code,
 * then the free workspace underneath it. `[slug].astro`, `/features`, the
 * header menu, the sitemap and `llms.txt` all read this one list.
 */
export const FEATURES: Feature[] = [...LENS_FEATURES, ...STUDIO_FEATURES];

// ---- Build-time checks ------------------------------------------------------
//
// Astro evaluates this module during `astro check` and `astro build`, so each
// of these turns a mistake into a failed build rather than a page.

/**
 * Routes that already exist on the live site. GitHub Pages has no redirect
 * layer, so renaming one of these slugs would 404 every link and search result
 * pointing at it. CLAUDE.md: "Don't delete routes".
 */
const PUBLISHED_SLUGS = ['git-workspaces', 'mcp-ai', 'mock-servers', 'authentication', 'cli', 'vscode'];

function check(features: Feature[]): void {
  const problems: string[] = [];
  const seen = new Set<string>();
  let studioSeen = false;

  for (const f of features) {
    if (seen.has(f.slug)) problems.push(`duplicate slug "${f.slug}"`);
    seen.add(f.slug);

    if (f.product === 'studio') studioSeen = true;
    else if (studioSeen) problems.push(`"${f.slug}" is a Lens feature listed after a Studio one; Lens comes first`);

    // Lens is the paid half and Studio the free half. A Lens page on `free`,
    // or a Studio page on a paid plan, is the blur CLAUDE.md calls the most
    // damaging mistake this site can make.
    if (f.product === 'lens' && f.plan === 'free') problems.push(`Lens feature "${f.slug}" is on the free plan`);
    if (f.product === 'studio' && f.plan !== 'free') problems.push(`Studio feature "${f.slug}" is on a paid plan`);

    if (f.metaDescription.length > 160) {
      problems.push(`"${f.slug}" metaDescription is ${f.metaDescription.length} characters (max 160)`);
    }
    if (/[`—]/.test(f.metaDescription)) {
      problems.push(`"${f.slug}" metaDescription contains a backtick or an em-dash`);
    }
  }

  for (const slug of PUBLISHED_SLUGS) {
    if (!seen.has(slug)) problems.push(`published route /features/${slug} would disappear`);
  }

  if (problems.length > 0) {
    throw new Error(`src/data/features.ts:\n  ${problems.join('\n  ')}`);
  }
}

check(FEATURES);

export function getFeature(slug: string): Feature | undefined {
  return FEATURES.find((f) => f.slug === slug);
}
