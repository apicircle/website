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
function terminal(c) {
  const W = 1440, H = 900;
  const X = 56;
  const dot = (cx, fill) => `<circle cx="${cx}" cy="28" r="7" fill="${fill}"/>`;
  const rows = [];
  let y = 112;
  const step = 40;
  const push = (segs, gap = 1) => { rows.push(row(segs, X, y, 25, MONO)); y += step * gap; };
  const pad = (s, n) => s.padEnd(n);

  push([{ t: '$ ', c: c.green }, { t: 'apicircle run "Smoke Tests" --reporter junit', c: c.fg }], 1.4);
  push([{ t: 'API Circle', c: c.dim }, { t: ' · plan ', c: c.dim }, { t: '"Smoke Tests"', c: c.fg }, { t: ' · env ', c: c.dim }, { t: 'Dev', c: c.purple }], 1.4);
  push([{ t: '✓ ', c: c.green }, { t: pad('Get user', 16), c: c.fg }, { t: pad('GET', 6), c: c.green }, { t: pad('/users/42', 14), c: c.dim }, { t: pad('200', 5), c: c.green }, { t: pad('142ms', 9), c: c.dim }, { t: '3 assertions', c: c.dim }]);
  push([{ t: '✓ ', c: c.green }, { t: pad('Create user', 16), c: c.fg }, { t: pad('POST', 6), c: c.blue }, { t: pad('/users', 14), c: c.dim }, { t: pad('201', 5), c: c.green }, { t: pad('88ms', 9), c: c.dim }, { t: '2 assertions', c: c.dim }], 1.5);
  push([{ t: 'PASS', c: c.green }, { t: '  2 passed   0 failed   230 ms total', c: c.dim }]);
  push([{ t: '✓ ', c: c.green }, { t: 'JUnit report → ./reports/junit.xml', c: c.dim }], 1.6);
  push([{ t: '$ ', c: c.green }, { t: 'apicircle mock ./openapi.yaml', c: c.fg }]);
  push([{ t: '› ', c: c.purple }, { t: 'Mock listening on ', c: c.dim }, { t: 'http://localhost:4500', c: c.blue }, { t: '  ·  12 routes', c: c.dim }], 1.5);
  push([{ t: '$ ', c: c.green }, { t: '▋', c: c.fg }]);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${c.bg}"/>
    <rect width="${W}" height="56" fill="${c.bar}"/>
    ${dot(36, '#ff5f57')}${dot(64, '#febc2e')}${dot(92, '#28c840')}
    <text x="${W / 2}" y="35" text-anchor="middle" font-family="${MONO}" font-size="20" fill="${c.dim}">apicircle — terminal</text>
    ${rows.join('\n')}
  </svg>`;
}

// ---------- VS Code ----------
function vscode(c) {
  const W = 1440, H = 900;
  const actW = 60;
  const sideW = 300;
  const edX = actW + sideW;
  const tree = [
    { t: 'API CIRCLE STUDIO', c: c.dim, dx: 16, size: 16, y: 96 },
    { t: 'EDITOR', c: c.dim, dx: 16, size: 15, y: 134 },
    { t: '▾ Users', c: c.sideFg, dx: 22, size: 18, y: 168 },
    { t: 'GET   Get user', c: c.sideFg, dx: 46, size: 18, y: 200 },
    { t: 'POST  Create user', c: c.sideFg, dx: 46, size: 18, y: 232 },
    { t: 'ENVIRONMENT', c: c.dim, dx: 16, size: 15, y: 278 },
    { t: '● Dev   (active)', c: c.sideFg, dx: 22, size: 18, y: 310 },
    { t: '  Prod', c: c.sideFg, dx: 22, size: 18, y: 342 },
    { t: 'MOCK SERVERS', c: c.dim, dx: 16, size: 15, y: 388 },
    { t: 'Users Mock', c: c.sideFg, dx: 22, size: 18, y: 420 },
    { t: 'MCP · HISTORY · SNAPSHOTS', c: c.dim, dx: 16, size: 15, y: 466 },
  ];
  const treeSvg = tree
    .map((n) => `<text x="${actW + n.dx}" y="${n.y}" font-family="${SANS}" font-size="${n.size}" fill="${n.c}">${esc(n.t)}</text>`)
    .join('\n');

  const ex = edX + 70;
  let y = 154;
  const lh = 38;
  const yamlRows = [];
  const yl = (segs) => { yamlRows.push(row(segs, ex, y, 21, MONO)); y += lh; };
  yl([{ t: '# Get user', c: c.comment }]);
  yl([{ t: 'method: ', c: c.key }, { t: 'GET', c: c.str }]);
  yl([{ t: 'url: ', c: c.key }, { t: 'https://api.example.com/users/{{id}}', c: c.str }]);
  yl([{ t: 'headers:', c: c.key }]);
  yl([{ t: '  - key: ', c: c.key }, { t: 'Accept', c: c.str }]);
  yl([{ t: '    value: ', c: c.key }, { t: 'application/json', c: c.str }]);
  const inheritLens = `<text x="${ex}" y="${y - 4}" font-family="${SANS}" font-size="15" fill="${c.lens}">◆ Inherits from Users (bearer)</text>`;
  y += 26;
  yl([{ t: 'auth:', c: c.key }]);
  yl([{ t: '  type: ', c: c.key }, { t: 'inherit', c: c.str }]);

  const lineNos = Array.from({ length: 9 }, (_, i) => `<text x="${edX + 44}" y="${154 + i * lh}" font-family="${MONO}" font-size="15" fill="${c.dim}" text-anchor="end">${i + 1}</text>`).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${c.bg}"/>
    <rect width="${W}" height="40" fill="${c.bar}"/>
    <text x="${W / 2}" y="26" text-anchor="middle" font-family="${SANS}" font-size="16" fill="${c.dim}">Get user.req.yaml — API Circle Studio</text>
    <rect x="0" y="40" width="${actW}" height="${H - 40}" fill="${c.activity}"/>
    <circle cx="${actW / 2}" cy="82" r="13" fill="${c.accent}"/>
    <rect x="${actW}" y="40" width="${sideW}" height="${H - 40}" fill="${c.side}"/>
    ${treeSvg}
    <rect x="${edX}" y="40" width="${W - edX}" height="44" fill="${c.bar}" opacity="0.45"/>
    <text x="${edX + 24}" y="68" font-family="${SANS}" font-size="16" fill="${c.fg}">Get user.req.yaml</text>
    <text x="${ex}" y="120" font-family="${SANS}" font-size="16" fill="${c.lens}">▶ Send    ✚ Add section…    ⤵ New from template…</text>
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
