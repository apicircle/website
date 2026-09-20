export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Feature pages surfaced in the "Features" dropdown / mega-menu. */
export const FEATURE_NAV: NavItem[] = [
  { label: 'Git-backed workspaces', href: '/features/git-workspaces' },
  { label: 'AI integration (MCP)', href: '/features/mcp-ai' },
  { label: 'Local mock servers', href: '/features/mock-servers' },
  { label: 'Authentication', href: '/features/authentication' },
  { label: 'CLI', href: '/features/cli' },
  { label: 'VS Code extension', href: '/features/vscode' },
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
      { label: 'VS Code extension', href: '/features/vscode' },
    ],
  },
  {
    title: 'Features',
    items: FEATURE_NAV,
  },
  {
    title: 'Resources',
    items: [
      { label: 'Documentation', href: '/docs' },
      {
        label: 'Connect your AI client',
        href: 'https://github.com/apicircle/studio/blob/main/docs/connect-your-ai-client.md',
        external: true,
      },
      {
        label: 'MCP tool catalog',
        href: 'https://github.com/apicircle/studio/blob/main/docs/mcp-tools-reference.md',
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
