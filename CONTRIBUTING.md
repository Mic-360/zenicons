# Contributing to Zenicons

Thanks for helping improve the pack.

## What lives where

- `svgs/` — source artwork
- `scripts/build-icons.mjs` — SVG to React generator
- `src/` — package runtime and generated exports
- `demo/` — searchable Vite showcase for the icon catalogue

## Local setup

1. Install Node.js 18 or newer.
2. Run `npm ci` in the repository root.
3. Run `npm --prefix demo ci` if you plan to work on the demo.

## Typical workflow

1. Add or update SVG files in `svgs/`.
2. Run `npm run generate` to rebuild the generated icon exports.
3. Run `npm run build` to emit distributable files.
4. Run `npm run verify:package` to confirm the npm tarball only contains approved publish artifacts.
5. Run `npm run demo:build` if your change affects the catalogue experience.

If you want the full preflight, run `npm run check`.

## Style notes

- Keep package changes focused and avoid unrelated formatting churn.
- Preserve tree-shakeable exports and the `IconBase` API unless a change is clearly versioned.
- Prefer generator fixes over manual edits to `src/icons.tsx`.
- If a source SVG ships a hardcoded dark stroke or fill, normalize it in the generator so the icon respects `currentColor`.

## Pull requests

A good pull request includes:

- a concise summary of what changed,
- screenshots or a short note if the demo UI changed,
- confirmation that `npm run check` passed locally.
