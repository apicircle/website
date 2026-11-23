import type { PlanId, Product } from './feature-types';

/**
 * Where each part of API Circle runs, for the table on `/features`.
 *
 * Platforms are the easiest thing on this site to overstate. The API Circle
 * desktop app is ONE app: the free workspace with no account, and the Lens
 * panels a paid plan unlocks. It is published for Windows (x64), macOS 13 or
 * later (Apple silicon and Intel; Electron 44 since 2.1.7) and Linux (x64), and
 * it does not update itself (lens `apps/lens-desktop` has no updater); on
 * Windows the Microsoft Store keeps it current. Since 2.1.8 the macOS app is
 * signed and notarized. Windows gets it from the Microsoft Store only, which
 * signs its own package, so `where` must not offer a Windows installer.
 *
 * The studio repository also builds a standalone desktop app that updates
 * itself. This site does not offer it: `/download` offers the API Circle app for
 * the free workspace too, so a row describing the standalone build here would
 * describe something `/download` does not hand out.
 *
 * The web app cannot run a mock server, because a browser tab cannot listen on
 * a port (studio `helpContent.ts`, "Mock runtime").
 *
 * `product` is the half a row mainly serves; the desktop row serves both, and is
 * listed at the plan that first uses it, which is Free.
 */
export interface Surface {
  name: string;
  product: Product;
  /** The lowest plan that uses this surface for anything. */
  plan: PlanId;
  /** Where it runs, as a reader would check it. */
  where: string;
  note: string;
  href: string;
}

export const SURFACES: Surface[] = [
  {
    name: 'API Circle desktop app',
    product: 'lens',
    plan: 'free',
    where: 'Windows 10 or later (x64, from the Microsoft Store), macOS 13 or later (Apple silicon and Intel, notarized), Linux (x64)',
    note: 'The free workspace with no account: it runs mock servers and keeps secrets in the OS keychain. A paid plan adds the Code graph, Review, Assistant and MCP panels, and the Code editor once Code changes is on. It does not update itself; on Windows the Microsoft Store keeps it current.',
    href: '/download',
  },
  {
    name: 'MCP server',
    product: 'lens',
    plan: 'pro',
    where: 'apicircle-lens mcp, over stdio',
    note: 'Any MCP client. It signs in with a CLI key from your account.',
    href: '/features/mcp-ai',
  },
  {
    name: 'Command line',
    product: 'lens',
    plan: 'team',
    where: 'Node 20 or later, any CI runner',
    note: 'PR Review drift as a build step. It signs in with a CLI key, not a device seat.',
    href: '/features/cli',
  },
  {
    name: 'Web app',
    product: 'studio',
    plan: 'free',
    where: 'studio.apicircle.dev, any modern browser',
    note: 'Nothing to install. It edits mock definitions but cannot run a mock.',
    href: '/download',
  },
  {
    name: 'VS Code extension',
    product: 'studio',
    plan: 'free',
    where: 'VS Code 1.94 or later',
    note: 'The same workspace as YAML documents. Runs mock servers too.',
    href: '/features/vscode',
  },
];
