import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

for (const target of ['dist', 'src/icons.tsx', 'src/metadata.ts']) {
  const absoluteTarget = join(ROOT, target);
  rmSync(absoluteTarget, { recursive: true, force: true });
  console.log(`removed ${absoluteTarget}`);
}
