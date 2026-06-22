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
  { label: 'Download', href: '/download' },
  { label: 'Docs', href: '/docs' },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'Features', href: '/features' },
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
    title: 'Company',
    items: [
      {
        label: 'License',
        href: 'https://github.com/apicircle/studio/blob/main/LICENSE',
        external: true,
      },
      {
        label: 'Privacy',
        href: 'https://github.com/apicircle/studio/blob/main/PRIVACY.md',
        external: true,
      },
      {
        label: 'Security',
        href: 'https://github.com/apicircle/studio/blob/main/SECURITY.md',
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
