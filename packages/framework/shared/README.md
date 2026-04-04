# @al8b/framework-shared

Shared types, constants, and low-level helpers used across framework packages.

## Public API

- Re-exports from `types`, `constants`, `utils/path`, `utils/hash`, `utils/logger`, and `utils/async`

## Notes

- This package should stay dependency-light and framework-generic.
- Prefer moving cross-package helpers here instead of duplicating logic in CLI, server, or bundler code.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
