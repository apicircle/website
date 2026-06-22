// Generates the 1200x630 Open Graph social card at public/og.png.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const logo = `
  <g transform="translate(70,200) scale(2.3)">
    <circle cx="50" cy="50" r="38" stroke="#94a3b8" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="2 3"/>
    <g stroke-width="2" stroke-linecap="round">
      <line x1="50" y1="29" x2="50" y2="20" stroke="#a78bfa"/>
      <line x1="68.19" y1="39.5" x2="76" y2="35" stroke="#22c55e"/>
      <line x1="68.19" y1="60.5" x2="76" y2="65" stroke="#3b82f6"/>
      <line x1="50" y1="71" x2="50" y2="80" stroke="#f59e0b"/>
      <line x1="31.81" y1="60.5" x2="24" y2="65" stroke="#ef4444"/>
      <line x1="31.81" y1="39.5" x2="24" y2="35" stroke="#60a5fa"/>
    </g>
    <g stroke-width="3" fill="none">
      <circle cx="50" cy="12" r="6" stroke="#a78bfa"/>
      <circle cx="82.91" cy="31" r="6" stroke="#22c55e"/>
      <circle cx="82.91" cy="69" r="6" stroke="#3b82f6"/>
      <circle cx="50" cy="88" r="6" stroke="#f59e0b"/>
      <circle cx="17.09" cy="69" r="6" stroke="#ef4444"/>
      <circle cx="17.09" cy="31" r="6" stroke="#60a5fa"/>
    </g>
    <circle cx="50" cy="50" r="18" fill="#8b5cf6"/>
    <path d="M44 41 L56 50 L44 59" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="61" cy="50" r="2.4" fill="#22c55e"/>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="100%" stop-color="#0a0d14"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>
  ${logo}
  <text x="430" y="250" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="64" font-weight="800" fill="#edf4ff">API <tspan fill="#a78bfa">Circle</tspan></text>
  <text x="432" y="320" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="31" font-weight="600" fill="#a5b6cf">An API workspace you can git diff —</text>
  <text x="432" y="362" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="31" font-weight="600" fill="#a5b6cf">and an AI can drive.</text>
  <text x="432" y="446" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="#7c88a1">Git-backed · MCP-native · Desktop · Web · CLI · VS Code</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, 'public', 'og.png'));
console.log('wrote public/og.png');
