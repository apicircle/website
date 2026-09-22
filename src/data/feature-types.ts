import { PLANS, TRIAL_DAYS } from './pricing';

/**
 * The shape of a feature page, and the helpers every feature entry uses.
 *
 * The entries themselves live in `features-lens.ts` (the paid product, first)
 * and `features-studio.ts` (the free workspace); `features.ts` assembles them
 * and checks the result at build time.
 */

/** Which half of the product a feature belongs to. Lens is paid, Studio is free. */
export type Product = 'lens' | 'studio';

/** A plan id from the generated catalogue. `PlanBadge` renders its name. */
export type PlanId = 'free' | 'basic' | 'pro' | 'team';

export type AccentKey = 'brand' | 'green' | 'blue' | 'amber' | 'red' | 'sky';

/**
 * Two items, or four. Never three.
 *
 * CLAUDE.md: "Count to two, or to four. Never pad a list to three." A type
 * makes `astro check` enforce it, so a third bullet written to fill a card
 * fails the build rather than a review.
 */
export type TwoOrFour<T> = [T, T] | [T, T, T, T];

export interface Highlight {
  title: string;
  body: string;
  /**
   * Set when this one fact needs a different plan from the rest of the page,
   * e.g. the Team-only CLI flag on a Basic page. Rendered as a badge.
   */
  plan?: PlanId;
}

export interface SampleBlock {
  code: string;
  filename?: string;
  lang?: string;
  prompt?: boolean;
}

export interface FeatureSample {
  /** The heading above the sample. */
  title: string;
  intro: string;
  /** Badge the sample when it needs a plan the page itself does not. */
  plan?: PlanId;
  blocks: SampleBlock[];
}

/** One button. `external` opens a new tab and shows the arrow. */
export interface CtaLink {
  label: string;
  href: string;
  icon?: string;
}

export interface ClosingCta {
  title: string;
  subtitle: string;
  primary: CtaLink & { external?: boolean };
  secondary: (CtaLink & { external?: boolean }) | null;
}

/** Page sections beyond the highlights, rendered by `FeatureExtras.astro`. */
export type FeatureExtra =
  | 'frameworks'
  | 'drift-findings'
  | 'scaffold-targets'
  | 'prompt-library'
  | 'mcp-clients'
  | 'endpoint-context-graph'
  | 'host-matrix'
  | 'account-surfaces'
  | 'plan-capabilities'
  | 'git-flow';

export interface Feature {
  slug: string;
  product: Product;
  /** Icon name resolved by Icon.astro, which throws on an unknown name. */
  icon: string;
  accent: AccentKey;
  /**
   * The lowest plan that includes this capability. Rendered by PlanBadge, which
   * resolves the label from the generated PLANS, so the site cannot advertise a
   * tier the gate disagrees with.
   */
  plan: PlanId;
  /** Short label for the header menu. */
  navLabel: string;
  /** Listed in the footer's Features column. */
  featured?: boolean;
  eyebrow: string;
  title: string;
  /** One-line hook used on cards. */
  tagline: string;
  /** Short paragraph for the feature-page hero. */
  summary: string;
  /** Concise (≤160 char) SEO meta description. Checked at build time. */
  metaDescription: string;
  /** Card bullets. */
  bullets: TwoOrFour<string>;
  /** Deep-dive points for the feature page. */
  highlights: TwoOrFour<Highlight>;
  /** Hero call to action — relevant to THIS feature. */
  cta: CtaLink;
  secondaryCta?: CtaLink;
  /** Overrides the product's default closing call to action. */
  closingCta?: ClosingCta;
  /** Screenshot key: /screenshots/{dark,light}/<screenshot>.webp. */
  screenshot?: string;
  screenshotAlt?: string;
  /** The title-bar label on the screenshot frame. */
  frameLabel?: string;
  sample?: FeatureSample;
  extras?: FeatureExtra[];
}

/**
 * A plan's display name, read from the generated catalogue.
 *
 * Every plan name in copy goes through here. `features.ts` used to type
 * "Included with Pro." and "See what Team includes" by hand, which is exactly
 * how a page ends up promising a tier the gate has moved.
 */
export function planName(id: PlanId): string {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) {
    throw new Error(`planName("${id}") is not a plan id. Known ids: ${PLANS.map((p) => p.id).join(', ')}`);
  }
  return plan.name;
}

/** The hero buttons of a Lens page: download for Basic, the plan for Pro and Team. */
export function lensCtas(plan: Exclude<PlanId, 'free'>): Pick<Feature, 'cta' | 'secondaryCta'> {
  if (plan === 'basic') {
    return {
      cta: { label: 'Download Lens', href: '/download', icon: 'download' },
      secondaryCta: { label: 'See plans and pricing', href: '/pricing' },
    };
  }
  return {
    cta: { label: `See what ${planName(plan)} includes`, href: '/pricing' },
    secondaryCta: { label: 'Download Lens', href: '/download', icon: 'download' },
  };
}

/** How every Lens feature page ends: on the paid product, not the free one. */
export const LENS_CLOSING_CTA: ClosingCta = {
  title: 'Point Lens at a repository',
  subtitle: `Install it on Windows, index a repository and review a pull request. Every paid plan starts with a ${TRIAL_DAYS}-day trial.`,
  primary: { label: 'Download Lens', href: '/download', icon: 'download' },
  secondary: { label: 'See plans and pricing', href: '/pricing' },
};
