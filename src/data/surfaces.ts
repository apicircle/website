import type { PlanId, Product } from './feature-types';

/**
 * Where each part of API Circle runs, for the table on `/features`.
 *
 * Platforms are the easiest thing on this site to overstate. The Lens desktop
 * build is Windows x64 only (lens `apps/lens-desktop/electron-builder.yml`
 * defines no mac or linux target) and does not update itself; Studio desktop
 * ships for all three and does (studio `apps/desktop/src/main/autoUpdater.ts`).
 * macOS and Linux Lens builds are in progress. `where` may say exactly that,
 * but must not name either as a place Lens runs until a published release
 * carries it.
 * The web app cannot run a mock server, because a browser tab cannot listen on
 * a port (studio `helpContent.ts`, "Mock runtime").
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
    name: 'Lens desktop',
    product: 'lens',
    plan: 'basic',
    where: 'Windows 10 or later, x64. macOS and Linux are in progress',
    note: 'The whole workspace plus the Code graph, Review, Assistant and MCP panels. It does not update itself yet.',
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
    name: 'Studio desktop',
    product: 'studio',
    plan: 'free',
    where: 'Windows, macOS and Linux',
    note: 'Runs mock servers and keeps secrets in the OS keychain. Updates itself.',
    href: '/download',
  },
  {
    name: 'Studio web',
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
