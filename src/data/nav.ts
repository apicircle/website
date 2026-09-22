import { FEATURES } from './features';
import type { PlanId, Product } from './feature-types';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeatureNavItem extends NavItem {
  plan: PlanId;
}

export interface FeatureGroup {
  product: Product;
  title: string;
  /** Where the group heading goes: its section on /features. */
  href: string;
  items: FeatureNavItem[];
}

/**
 * The Features menu, DERIVED from `FEATURES`.
 *
 * It used to be a hand-kept list of six rows, which meant a new feature page
 * existed on /features and nowhere in the header until someone remembered this
 * file. Two groups now, in the order the site sells them: Lens, then Studio.
 */
export const FEATURE_GROUPS: FeatureGroup[] = (['lens', 'studio'] as const).map((product) => ({
  product,
  title: product === 'lens' ? 'Lens' : 'Studio',
  href: `/features#${product}`,
  items: FEATURES.filter((f) => f.product === product).map((f) => ({
    label: f.navLabel,
    href: `/features/${f.slug}`,
    plan: f.plan,
  })),
}));

/** A short list for the footer: the features marked `featured`, then the index. */
export const FEATURED_NAV: NavItem[] = [
  ...FEATURES.filter((f) => f.featured).map((f) => ({ label: f.navLabel, href: `/features/${f.slug}` })),
  { label: 'All features', href: '/features' },
];

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Features', href: '/features' },
  // The paid product, which the pricing page sells: it needs a page of its own.
  { label: 'Lens', href: '/lens' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '/download' },
  { label: 'Docs', href: '/docs' },
  { label: 'Sign in', href: 'https://account.apicircle.dev', external: true },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'Features', href: '/features' },
      { label: 'API Circle Lens', href: '/lens' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Git-backed API client', href: '/git-backed-api-client' },
      { label: 'Download', href: '/download' },
      { label: 'Open the web app', href: 'https://studio.apicircle.dev', external: true },
    ],
  },
  {
    title: 'Features',
    items: FEATURED_NAV,
  },
  {
    title: 'Resources',
    items: [
      { label: 'Documentation', href: '/docs' },
      // This column used to link the studio repo's MCP docs, which now only
      // point at Lens: the MCP server moved there and became part of Pro. The
      // Features column already links the MCP page, so these are guides instead.
      {
        label: 'Installing the desktop app',
        href: 'https://github.com/apicircle/studio/blob/main/docs/installing.md',
        external: true,
      },
      {
        label: 'Mock server guide',
        href: 'https://github.com/apicircle/studio/blob/main/docs/mock-server.md',
        external: true,
      },
      { label: 'GitHub', href: 'https://github.com/apicircle/studio', external: true },
    ],
  },
  {
    // The three legal pages are here, in the site-wide footer, because Paddle's
    // domain review requires Terms, Privacy and Refund policies to be reachable
    // from the site's navigation - and because every buyer agrees to them.
    title: 'Company',
    items: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Refund Policy', href: '/refunds' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security', href: '/security' },
      {
        label: 'License',
        href: 'https://github.com/apicircle/studio/blob/main/LICENSE',
        external: true,
      },
      {
        label: 'Report an issue',
        href: 'https://github.com/apicircle/studio/issues',
        external: true,
      },
    ],
  },
];
