# Zenicons

Zenicons is a publish-ready React icon pack built from raw SVG sources and shipped as tree-shakeable components. It currently contains **3,201** icons, a shared `IconBase`, a searchable editorial demo, and a hardened publish pipeline aimed at keeping npm releases clean and predictable.

**Live catalogue:** <https://Mic-360.github.io/zenicons/>

## Why this package exists

- **Tree-shakeable React exports** — import only the icons you use.
- **ESM, CJS, and TypeScript types** — ready for modern apps and older tooling.
- **`currentColor` first** — icons inherit typography and theme color naturally.
- **Generated from `svgs/`** — fix the generator once, improve the whole catalogue.
- **Publish hygiene baked in** — release automation verifies the npm tarball before publish.

## Install

Zenicons is configured for npm publishing. Until the first public registry release is available, install from GitHub.

### npm (after the first public release)

```bash
npm install @bhaumic/zenicons
pnpm add @bhaumic/zenicons
yarn add @bhaumic/zenicons
```

### GitHub (available today)

```bash
npm install github:Mic-360/zenicons
pnpm add github:Mic-360/zenicons
yarn add github:Mic-360/zenicons
```

For reproducible installs from GitHub, pin a tag or commit SHA:

```bash
npm install github:Mic-360/zenicons#v0.1.0
```

## Usage

```tsx
import { IconAddressBookEmail, IconSigma } from '@bhaumic/zenicons';

export function Example() {
  return (
    <div style={{ color: 'tomato' }}>
      <IconAddressBookEmail />
      <IconAddressBookEmail
        size={32}
        color='royalblue'
        strokeWidth={2}
      />
      <IconSigma size={48} />
    </div>
  );
}
```

## Props

`IconProps` extends the usual `SVGProps<SVGSVGElement>` and adds a few icon-specific controls:

| Prop          | Type                 | Default        | Notes                                       |
| ------------- | -------------------- | -------------- | ------------------------------------------- |
| `size`        | `number \| string`   | `24`           | Sets both `width` and `height`.             |
| `color`       | `string`             | `currentColor` | Drives stroke or fill output.               |
| `strokeWidth` | `number \| string`   | `1.5`          | Applies to stroke-style icons.              |
| `title`       | `string`             | —              | Enables accessible labelling and `<title>`. |
| `variant`     | `"stroke" \| "fill"` | per icon       | Override the icon's generated default.      |

Icons are `aria-hidden` by default. If you provide `title` or `aria-label`, the component automatically becomes an exposed image.

## Packaging details

- `sideEffects` is set to `false` for tree shaking.
- The package exports ESM, CommonJS, and type declarations.
- `scripts/build-icons.mjs` normalizes common hardcoded dark fills and strokes to `currentColor` so icons theme correctly.
- `scripts/verify-package.mjs` checks the publish tarball and blocks unexpected files before release.

## Local development

```bash
git clone https://github.com/Mic-360/zenicons.git
cd zenicons
npm ci
npm --prefix demo ci
npm run check
```

Useful scripts:

- `npm run generate` — rebuild `src/icons.tsx` and `src/metadata.ts` from `svgs/`
- `npm run build` — generate icons and emit distributable files
- `npm run verify:package` — validate the npm tarball contents
- `npm run demo:build` — build the Vite catalogue app
- `npm run check` — full package + demo verification pass

## Publishing

The repository includes:

- `PUBLISH_GUIDE.md` — step-by-step npm release instructions
- `.github/workflows/ci.yml` — build and package verification on pushes and pull requests
- `.github/workflows/release.yml` — npm publish workflow with provenance
- `SECURITY.md` — reporting guidance and release safeguards

The recommended release path is **npm trusted publishing via GitHub Actions**, not long-lived tokens committed to machines or scripts.

## Open-source project files

- `LICENSE` — MIT license
- `CONTRIBUTING.md` — contributor workflow and generator notes
- `CODE_OF_CONDUCT.md` — collaboration expectations
- `SECURITY.md` — vulnerability reporting and package safety posture

## Author

Built by [Bhaumic Singh](https://bhaumicsingh.dev/) — GitHub: [Mic-360](https://github.com/Mic-360)

## License

Zenicons is released under the [MIT License](./LICENSE).
