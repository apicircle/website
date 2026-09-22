/**
 * Facts about the Studio UI that the feature pages list in full.
 *
 * TRANSCRIBED from the studio repository at 2.0.0, each block naming its
 * source. The website cannot import them, so re-check this file whenever the
 * UI moves.
 */

/**
 * From a local workspace to a pull request, in the Workspace panel's own labels
 * (studio `packages/ui-components/src/panels/workspace/WorkspacePanel.tsx`).
 */
export const GIT_FLOW: Array<{ label: string; body: string }> = [
  {
    label: 'Connect repo',
    body: 'Point the workspace at a GitHub repository with a personal access token. An empty repository gets a "Seed" button.',
  },
  {
    label: 'Create working branch',
    body: 'Studio names the branch for you, and you can edit the name. Start from this workspace, or import one already on the base branch.',
  },
  {
    label: 'Push to save',
    body: 'Commits `workspace.json` to the working branch. A strip shows what is unpushed, and a click previews it.',
  },
  {
    label: 'Create PR',
    body: 'Opens a pull request from inside the app. When it merges, a banner retires the branch and offers "View PR".',
  },
];
