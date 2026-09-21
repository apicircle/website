/**
 * What Lens can do on each Git host.
 *
 * TRANSCRIBED, not generated. The truth lives in the Lens repo, in the
 * `ReviewCapabilities` descriptor each provider exports:
 *
 *   packages-lens/git-providers/src/review/github.ts     GITHUB_REVIEW_CAPABILITIES
 *   packages-lens/git-providers/src/review/gitlab.ts     GITLAB_REVIEW_CAPABILITIES
 *   packages-lens/git-providers/src/review/bitbucket.ts  BITBUCKET_REVIEW_CAPABILITIES
 *   packages-lens/git-providers/src/review/azure.ts      AZURE_REVIEW_CAPABILITIES
 *
 * The website is a separate repository and cannot import them, so these values
 * are copied by hand and must be re-checked against those four files whenever a
 * host gains or loses a capability.
 *
 * The differences are published rather than smoothed over. A matrix with a tick
 * in every cell tells a reader nothing and is usually a lie; the two rows where
 * a host genuinely falls short are the rows that make the rest believable.
 *
 * What must NOT be claimed here: that GitLab, Bitbucket or Azure DevOps have
 * been exercised against a live host. They are covered against an emulator of
 * each host's API. These cells describe what the integration implements.
 */

export interface HostCapability {
  /** Row label — a capability, phrased as a reader would ask for it. */
  label: string;
  /** Per-host cell. `true` / `false`, or a string when the truth needs words. */
  values: Record<HostId, boolean | string>;
}

export type HostId = 'github' | 'gitlab' | 'bitbucket' | 'azure';

export interface Host {
  id: HostId;
  name: string;
  /** The plan id (from `PLANS`) this host is included on. */
  plan: string;
}

/**
 * GitHub is on every plan, including the free one. Only the other three are the
 * paid `git-providers` capability — publishing "GitHub is paid" would be badly
 * wrong, and it is the easiest mistake to make when laying out a table.
 */
export const HOSTS: Host[] = [
  { id: 'github', name: 'GitHub', plan: 'free' },
  { id: 'gitlab', name: 'GitLab', plan: 'pro' },
  { id: 'bitbucket', name: 'Bitbucket Cloud', plan: 'pro' },
  { id: 'azure', name: 'Azure DevOps', plan: 'pro' },
];

export const HOST_CAPABILITIES: HostCapability[] = [
  {
    label: 'Reads open requests',
    values: {
      github: 'Pull requests',
      gitlab: 'Merge requests',
      bitbucket: 'Pull requests',
      azure: 'Pull requests',
    },
  },
  {
    label: 'Comments pinned to a diff line',
    values: { github: true, gitlab: true, bitbucket: true, azure: true },
  },
  {
    label: 'Posts a summary comment',
    values: { github: true, gitlab: true, bitbucket: true, azure: true },
  },
  {
    label: 'Verdicts Lens can submit',
    values: {
      github: 'Comment, approve, request changes',
      // GitLab's API has no request-changes equivalent. Lens leaves the comment
      // and says which verdict it could not express, rather than pretending.
      gitlab: 'Comment, approve — no request-changes verdict',
      bitbucket: 'Comment, approve, request changes',
      azure: 'Comment, approve, request changes',
    },
  },
  {
    label: 'Finds your open requests across every repo',
    values: {
      github: true,
      gitlab: true,
      // Neither host offers a viewer-scoped search, so you pick the repository
      // first. Everything after that point is identical.
      bitbucket: 'Pick the repository first',
      azure: 'Pick the repository first',
    },
  },
];
