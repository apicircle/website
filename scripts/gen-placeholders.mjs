// Generates lightweight wireframe placeholders for every screenshot slot,
// in both themes, so the site renders cleanly before real captures land.
// Real screenshots overwrite these same paths (public/screenshots/{theme}/<key>.webp).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const KEYS = [
  'request-editor',
  'git-workspace',
  'git-merge',
  'mcp-connection',
  'mcp-clients',
  'mock-server',
  'auth',
  'cli',
  'vscode',
  'execution-plan',
  'history',
  'themes',
];

const THEMES = {
  dark: { bg: '#0b0e14', panel: '#10151f', surface: '#171e2c', edge: '#262e3f', barCol: '#28324a', brand: '#8b5cf6', node: '#3fb950' },
  light: { bg: '#ffffff', panel: '#fafafc', surface: '#f4f5f8', edge: '#e2e6ed', barCol: '#dce1ea', brand: '#7c3aed', node: '#16824c' },
};

const W = 1280;
const H = 800;

function rect(x, y, w, h, r, fill, opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${opacity}"/>`;
}

function wireframe(c) {
  const parts = [];
  parts.push(rect(0, 0, W, H, 0, c.bg));
  // top bar
  parts.push(rect(0, 0, W, 48, 0, c.panel));
  parts.push(`<line x1="0" y1="48" x2="${W}" y2="48" stroke="${c.edge}" stroke-width="1"/>`);
  parts.push(`<circle cx="34" cy="24" r="11" fill="${c.brand}"/>`);
  parts.push(rect(56, 19, 120, 10, 5, c.barCol));
  // sidebar
  parts.push(rect(0, 48, 240, H - 48, 0, c.panel));
  parts.push(`<line x1="240" y1="48" x2="240" y2="${H}" stroke="${c.edge}" stroke-width="1"/>`);
  const navWidths = [150, 110, 130, 90, 140, 100, 120];
  navWidths.forEach((w, i) => parts.push(rect(28, 92 + i * 40, w, 10, 5, c.barCol)));
  // main: request bar
  parts.push(rect(280, 88, W - 320, 64, 12, c.surface));
  parts.push(rect(296, 110, 64, 20, 10, c.brand, 0.85));
  parts.push(rect(380, 113, 520, 12, 6, c.barCol));
  // main: response/body panel
  parts.push(rect(280, 176, W - 320, H - 230, 14, c.surface));
  const rowWidths = [480, 620, 540, 600, 460, 580, 500];
  rowWidths.forEach((w, i) => parts.push(rect(308, 210 + i * 40, w, 12, 6, c.barCol)));
  parts.push(`<circle cx="${W - 70}" cy="${H - 70}" r="8" fill="${c.node}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
}

for (const [theme, c] of Object.entries(THEMES)) {
  const dir = join(root, 'public', 'screenshots', theme);
  await mkdir(dir, { recursive: true });
  for (const key of KEYS) {
    await sharp(Buffer.from(wireframe(c))).webp({ quality: 82 }).toFile(join(dir, `${key}.webp`));
  }
  console.log(`generated ${KEYS.length} placeholders for ${theme}`);
}
