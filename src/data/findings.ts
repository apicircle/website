/**
 * Two illustrated PR Review drift findings.
 *
 * Both are things the product genuinely reports — they were taken from a review
 * run against a repository with these exact two edits (the same two edits
 * `lens/regression/capture_marketing.py` plants before it photographs the
 * Review panel), and the wording is the Review panel's own. Illustrating a
 * finding Lens cannot produce would be the worst kind of lie here, because it
 * is the one a buyer checks first.
 *
 * Shared by the homepage and `/features/pr-review-drift`, so the two pages
 * cannot describe the same review two different ways.
 */
export interface FindingLine {
  text: string;
  changed?: boolean;
}

export interface Finding {
  endpoint: string;
  severity: 'breaking' | 'warning' | 'info';
  tags: string[];
  base: FindingLine[];
  head: FindingLine[];
  finding: string;
  source: string;
}

export const FINDINGS: Finding[] = [
  {
    endpoint: 'POST /api/v1/widgets',
    severity: 'warning',
    tags: ['shared-impact', 'auth-changed'],
    base: [
      { text: "widgetsRouter.get('/', listWidgets);" },
      { text: "widgetsRouter.post('/', requireBearer, createWidget);", changed: true },
    ],
    head: [
      { text: "widgetsRouter.get('/', listWidgets);" },
      { text: "widgetsRouter.post('/', createWidget);", changed: true },
    ],
    finding: 'Shared `requireBearer` removed, and it reaches 2 endpoints.',
    source: 'src/middleware/auth.ts:8',
  },
  {
    endpoint: 'DELETE /api/v1/widgets/:widgetId',
    severity: 'warning',
    tags: ['new-side-effect', 'contract-drift'],
    base: [
      { text: "recordAudit('widget.deleted', widgetId);" },
      { text: 'res.status(204).end();', changed: true },
    ],
    head: [
      { text: "recordAudit('widget.deleted', widgetId);" },
      { text: 'res.status(200).json({ deleted: true });', changed: true },
    ],
    finding:
      'Spec documents response 204, not returned in code. Code returns response 200, not documented in the spec.',
    source: 'src/handlers/widgets.ts:78',
  },
];
