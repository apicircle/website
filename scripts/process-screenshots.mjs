// Converts raw Playwright PNG captures (public/screenshots/_raw/{theme})
// into optimized webp at public/screenshots/{theme}, overwriting placeholders.
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MAX_WIDTH = 1920;

for (const theme of ['dark', 'light']) {
  const srcDir = join(root, 'public', 'screenshots', '_raw', theme);
  const outDir = join(root, 'public', 'screenshots', theme);
  await mkdir(outDir, { recursive: true });
  let files = [];
  try {
    files = (await readdir(srcDir)).filter((f) => f.endsWith('.png'));
  } catch {
    console.log(`(no raw dir for ${theme})`);
    continue;
  }
  for (const f of files) {
    const key = basename(f, '.png');
    await sharp(join(srcDir, f))
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(outDir, `${key}.webp`));
    console.log(`✓ ${theme}/${key}.webp`);
  }
}
console.log('processing complete.');
