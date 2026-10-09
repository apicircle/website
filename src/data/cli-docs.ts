import { SITE } from './site';
import type { TwoOrFour } from './feature-types';

/**
 * How `apicircle-lens` runs in a pipeline, and where its documentation lives.
 *
 * TRANSCRIBED, not generated. The steps are the "How it works" list of the CLI
 * documentation, which lives in the public org repository:
 *
 *   apicircle/.github  docs/lens-cli/README.md
 *
 * and the commands and options named here are the ones `apicircle-lens --help`
 * prints (Lens repo, `apps/cli`). The website cannot import either, so re-check
 * this file against them when a command or an option changes.
 *
 * What must NOT be claimed here: that a pipeline file for GitLab, Bitbucket or
 * Azure DevOps has been run against a live host. The documentation offers a
 * file for each; this page says only that.
 */

export interface CliStep {
  label: string;
  body: string;
}

export const CLI_PIPELINE: TwoOrFour<CliStep> = [
  {
    label: 'Index',
    body: '`apicircle-lens codegraph index` reads the repository and writes the Code graph under `.apicircle/`. You commit it on your default branch, once.',
  },
  {
    label: 'Compare',
    body: 'On a pull request, `review --base` takes that committed Code graph and indexes the checkout beside it, then lists every endpoint the change reaches.',
  },
  {
    label: 'Check the Spec',
    body: 'With `--openapi` it compares the code with your Spec too: routes, parameters, bodies, status codes and auth. Drift that was already on the base branch is left out.',
  },
  {
    label: 'Gate and post',
    body: '`--fail-on` sets the exit code. `--comment` puts the result on the pull request.',
  },
];

export interface CliDoc {
  label: string;
  href: string;
  body: string;
}

const base = SITE.cliDocsBase;

export const CLI_DOCS: TwoOrFour<CliDoc> = [
  {
    label: 'Walkthrough',
    href: `${base}/walkthrough.md`,
    body: 'One pull request on a sample API, with the output of every command.',
  },
  {
    label: 'Findings',
    href: `${base}/findings.md`,
    body: 'Everything a review can raise, grouped as Critical, Warning and Info.',
  },
  {
    label: 'CI recipes',
    href: `${base}/ci/README.md`,
    body: 'A pipeline file for GitHub Actions, GitLab CI/CD, Bitbucket Pipelines, Azure Pipelines and CircleCI.',
  },
  {
    label: 'Command reference',
    href: `${base}/commands.md`,
    body: 'What each command runs, writes and prints, and how it exits.',
  },
];
