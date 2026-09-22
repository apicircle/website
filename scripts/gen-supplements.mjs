// Generates the two product views that don't exist in the web app:
// a CLI terminal session and a VS Code extension view — both themes.
// Text uses naturally-flowing <tspan>s (xml:space=preserve) so monospace
// columns align without manual x-position math.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MONO = "Consolas, 'Cascadia Code', 'Segoe UI Symbol', 'Courier New', monospace";
const SANS = "'Segoe UI', 'Segoe UI Symbol', Arial, sans-serif";

const T = {
  dark: {
    term: { bg: '#0c1018', bar: '#161b25', dim: '#8a98b0', fg: '#dfe7f3', green: '#56d364', blue: '#79c0ff', amber: '#e3b341', purple: '#c8a6ff' },
    vs: { bg: '#1e1e1e', bar: '#323233', activity: '#2c2c2d', side: '#252526', sideFg: '#cccccc', dim: '#8b949e', fg: '#d4d4d4', accent: '#a78bfa', key: '#9cdcfe', str: '#ce9178', comment: '#6a9955', lens: '#4ec9b0', status: '#7c3aed' },
  },
  light: {
    term: { bg: '#ffffff', bar: '#eef1f5', dim: '#6b7480', fg: '#1f2937', green: '#1a7f37', blue: '#0969da', amber: '#9a6700', purple: '#8250df' },
    vs: { bg: '#ffffff', bar: '#dddddd', activity: '#e8e8e8', side: '#f3f3f3', sideFg: '#3b3b3b', dim: '#8b949e', fg: '#24292f', accent: '#7c3aed', key: '#0451a5', str: '#a31515', comment: '#008000', lens: '#267f99', status: '#7c3aed' },
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** One text row: flowing colored tspans, monospace columns align via padding. */
function row(segs, x, y, size, family) {
  const spans = segs.map((s) => `<tspan fill="${s.c}">${esc(s.t)}</tspan>`).join('');
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" xml:space="preserve">${spans}</text>`;
}

// ---------- CLI terminal ----------
//
// The text is REAL output, copied verbatim from `apicircle-lens review` run on
// the regression fixture (lens `regression/fixtures/lens-fixture-api`) after the
// two edits `capture_marketing.py` plants: `requireBearer` dropped from POST,
// and a 204 turned into a 200. It exited 1, because `--fail-on warning` tripped.
// Only the emoji variation selector after the warning sign is dropped, because
// the SVG renderer draws it as a box.
function terminal(c) {
  const W = 1440, H = 900;
  const X = 48;
  const dot = (cx, fill) => `<circle cx="${cx}" cy="28" r="7" fill="${fill}"/>`;
  const rows = [];
  let y = 104;
  const step = 34;
  const push = (segs, gap = 1) => { rows.push(row(segs, X, y, 21, MONO)); y += step * gap; };
  const warn = (endpoint, flags) =>
    push([{ t: '⚠ [WARN] ', c: c.amber }, { t: endpoint, c: c.fg }, { t: ` — ${flags}`, c: c.dim }]);
  const bullet = (text) => push([{ t: '    • ', c: c.dim }, { t: text, c: c.fg }]);

  push([
    { t: '$ ', c: c.green },
    { t: 'apicircle-lens review --base ../base-endpoints.json --openapi openapi.json --spec-base-path /api/v1 --fail-on warning', c: c.fg },
  ]);
  push([{ t: 'PR Review', c: c.purple }]);
  warn('DELETE /api/v1/widgets/:widgetId', 'new-side-effect, contract-drift');
  bullet('Data-write `deleteWidget` changed in the handler');
  bullet('Spec documents response 204, not returned in code.');
  bullet('Code returns response 200, not documented in the spec.');
  warn('PATCH /api/v1/widgets/:widgetId', 'shared-impact, auth-changed');
  bullet('Shared `requireBearer` removed (reaches 2 endpoints)');
  bullet('Auth/access-control `requireBearer` added in the pre-request chain');
  warn('POST /api/v1/widgets', 'shared-impact, auth-changed');
  bullet('Shared `requireBearer` removed (reaches 2 endpoints)');
  bullet('Auth/access-control `POST /api/v1/widgets route` changed in the pre-request chain', 2);
  push([{ t: '3 endpoint(s): 0 breaking, 0 added, 0 removed, 3 changed.', c: c.fg }], 2);
  push([{ t: 'Focus shift', c: c.purple }]);
  push([{ t: '  Verdict: ', c: c.dim }, { t: 'in-focus', c: c.green }]);
  push([{ t: '$ ', c: c.green }, { t: 'echo $?', c: c.fg }]);
  push([{ t: '1', c: c.amber }]);
  push([{ t: '$ ', c: c.green }, { t: '▋', c: c.fg }]);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${c.bg}"/>
    <rect width="${W}" height="56" fill="${c.bar}"/>
    ${dot(36, '#ff5f57')}${dot(64, '#febc2e')}${dot(92, '#28c840')}
    <text x="${W / 2}" y="35" text-anchor="middle" font-family="${MONO}" font-size="20" fill="${c.dim}">apicircle-lens — terminal</text>
    ${rows.join('\n')}
  </svg>`;
}

// ---------- VS Code ----------
//
// Drawn from the extension's own strings (studio `apps/vscode`): the seven
// views in `package.json`, the CodeLens labels in `src/lang/requestCodeLens.ts`,
// and a request as `apicircle-request.schema.json` requires it (`name`,
// `method`, `url`; `key`/`value`/`enabled` on a header row). A request opens as
// `requests/<folder>/<name>.yaml`, so "Get user" in Users is `Get-user.yaml`.
function vscode(c) {
  const W = 1440, H = 900;
  const actW = 60;
  const sideW = 300;
  const edX = actW + sideW;
  const tree = [
    { t: 'API CIRCLE', c: c.dim, dx: 16, size: 16, y: 96 },
    { t: 'WORKSPACE', c: c.dim, dx: 16, size: 15, y: 134 },
    { t: 'EDITOR', c: c.dim, dx: 16, size: 15, y: 172 },
    { t: '▾ Users', c: c.sideFg, dx: 22, size: 18, y: 206 },
    { t: 'GET   Get user', c: c.sideFg, dx: 46, size: 18, y: 238 },
    { t: 'POST  Create user', c: c.sideFg, dx: 46, size: 18, y: 270 },
    { t: 'ENVIRONMENT', c: c.dim, dx: 16, size: 15, y: 316 },
    { t: '● Dev   (active)', c: c.sideFg, dx: 22, size: 18, y: 348 },
    { t: '  Prod', c: c.sideFg, dx: 22, size: 18, y: 380 },
    { t: 'EXECUTION', c: c.dim, dx: 16, size: 15, y: 426 },
    { t: 'Smoke', c: c.sideFg, dx: 22, size: 18, y: 458 },
    { t: 'MOCK', c: c.dim, dx: 16, size: 15, y: 504 },
    { t: 'Users Mock', c: c.sideFg, dx: 22, size: 18, y: 536 },
    { t: 'HISTORY', c: c.dim, dx: 16, size: 15, y: 582 },
    { t: 'SNAPSHOTS', c: c.dim, dx: 16, size: 15, y: 620 },
  ];
  const treeSvg = tree
    .map((n) => `<text x="${actW + n.dx}" y="${n.y}" font-family="${SANS}" font-size="${n.size}" fill="${n.c}">${esc(n.t)}</text>`)
    .join('\n');

  const ex = edX + 70;
  let y = 154;
  const lh = 38;
  const yamlRows = [];
  const yl = (segs) => { yamlRows.push(row(segs, ex, y, 21, MONO)); y += lh; };
  yl([{ t: 'name: ', c: c.key }, { t: 'Get user', c: c.str }]);
  yl([{ t: 'method: ', c: c.key }, { t: 'GET', c: c.str }]);
  yl([{ t: 'url: ', c: c.key }, { t: 'https://api.example.com/users/{{id}}', c: c.str }]);
  yl([{ t: 'headers:', c: c.key }]);
  yl([{ t: '  - key: ', c: c.key }, { t: 'Accept', c: c.str }]);
  yl([{ t: '    value: ', c: c.key }, { t: 'application/json', c: c.str }]);
  yl([{ t: '    enabled: ', c: c.key }, { t: 'true', c: c.str }]);
  const inheritLens = `<text x="${ex}" y="${y - 4}" font-family="${SANS}" font-size="15" fill="${c.lens}">${esc('◆ Inherits from Users (bearer)')}</text>`;
  y += 26;
  yl([{ t: 'auth:', c: c.key }]);
  yl([{ t: '  type: ', c: c.key }, { t: 'inherit', c: c.str }]);

  // Nine YAML lines; the inherit CodeLens sits between line 7 and line 8.
  const lineNos = Array.from({ length: 9 }, (_, i) => `<text x="${edX + 44}" y="${154 + i * lh + (i >= 7 ? 26 : 0)}" font-family="${MONO}" font-size="15" fill="${c.dim}" text-anchor="end">${i + 1}</text>`).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${c.bg}"/>
    <rect width="${W}" height="40" fill="${c.bar}"/>
    <text x="${W / 2}" y="26" text-anchor="middle" font-family="${SANS}" font-size="16" fill="${c.dim}">Get-user.yaml — API Circle Studio</text>
    <rect x="0" y="40" width="${actW}" height="${H - 40}" fill="${c.activity}"/>
    <circle cx="${actW / 2}" cy="82" r="13" fill="${c.accent}"/>
    <rect x="${actW}" y="40" width="${sideW}" height="${H - 40}" fill="${c.side}"/>
    ${treeSvg}
    <rect x="${edX}" y="40" width="${W - edX}" height="44" fill="${c.bar}" opacity="0.45"/>
    <text x="${edX + 24}" y="68" font-family="${SANS}" font-size="16" fill="${c.fg}">Get-user.yaml</text>
    <text x="${ex}" y="120" font-family="${SANS}" font-size="16" fill="${c.lens}" xml:space="preserve">${esc('▶▶ SEND REQUEST  (Ctrl/Cmd+Enter)     ✚ Add section…     ⤵ New from template…')}</text>
    ${lineNos}
    ${yamlRows.join('\n')}
    ${inheritLens}
    <rect x="0" y="${H - 28}" width="${W}" height="28" fill="${c.status}"/>
    <text x="16" y="${H - 9}" font-family="${SANS}" font-size="15" fill="#ffffff">API Circle · Acme API</text>
    <text x="${W - 16}" y="${H - 9}" text-anchor="end" font-family="${SANS}" font-size="15" fill="#ffffff">YAML · Dev</text>
  </svg>`;
}

for (const theme of ['dark', 'light']) {
  const c = T[theme];
  const outDir = join(root, 'public', 'screenshots', theme);
  for (const [key, svg] of [['cli', terminal(c.term)], ['vscode', vscode(c.vs)]]) {
    await sharp(Buffer.from(svg), { density: 144 })
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(outDir, `${key}.webp`));
    console.log(`✓ ${theme}/${key}.webp`);
  }
}
console.log('supplements done.');
