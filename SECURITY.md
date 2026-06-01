# Security policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| `0.x`   | Yes       |

## Release safeguards

Zenicons is configured to keep the publish surface intentionally small.

- npm releases are limited to `dist/`, `README.md`, `LICENSE`, and `SECURITY.md`.
- `scripts/verify-package.mjs` runs `npm pack --dry-run` and fails if unexpected files or executable payloads are present.
- The publish workflow uses npm provenance so registry artifacts can be traced back to GitHub Actions.
- Lockfiles are committed for both the package and the demo to reduce supply-chain drift.

## Reporting a vulnerability

Please use one of these channels:

1. Open a private GitHub security advisory if the issue affects published consumers.
2. If private reporting is not available, use the contact form at <https://bhaumicsingh.dev/> and include `zenicons security` in the message.
3. Avoid posting exploit details in public issues until a fix is available.

## Scope

Please report vulnerabilities related to:

- malicious or unexpected files inside the published npm tarball,
- compromised release automation,
- code execution paths in build or generation scripts,
- dependency issues that create a practical consumer risk.

Regular rendering bugs, icon naming mistakes, or visual regressions should go through normal issues instead.
