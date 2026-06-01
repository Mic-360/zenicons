import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const requiredFiles = ['README.md', 'LICENSE', 'SECURITY.md', 'package.json'];
const allowedPrefixes = ['dist/'];
const suspiciousExtension = /\.(?:exe|dll|so|dylib|bat|cmd|ps1|sh|jar)$/i;

const packed = JSON.parse(
  execSync(`${npmCommand} pack --json --dry-run --ignore-scripts`, {
    cwd: ROOT,
    encoding: 'utf8',
  }),
);

const [packResult] = packed;

if (!packResult?.files) {
  throw new Error('npm pack --dry-run did not return a file list.');
}

const fileNames = packResult.files
  .map((file) => String(file.path).replace(/\\/g, '/'))
  .sort();

const missing = requiredFiles.filter((file) => !fileNames.includes(file));
const unexpected = fileNames.filter(
  (file) =>
    !requiredFiles.includes(file) &&
    !allowedPrefixes.some((prefix) => file.startsWith(prefix)),
);
const suspicious = fileNames.filter((file) => suspiciousExtension.test(file));

if (missing.length > 0) {
  throw new Error(
    `Missing required publish artifacts:\n${missing.map((file) => `- ${file}`).join('\n')}`,
  );
}

if (unexpected.length > 0) {
  throw new Error(
    `Unexpected files detected in npm package:\n${unexpected.map((file) => `- ${file}`).join('\n')}`,
  );
}

if (suspicious.length > 0) {
  throw new Error(
    `Executable or suspicious files detected in npm package:\n${suspicious.map((file) => `- ${file}`).join('\n')}`,
  );
}

console.log('Package dry run verified. Files that will be published:');
for (const file of fileNames) {
  console.log(`- ${file}`);
}
