# @al8b/framework-config

Project configuration and resource discovery helpers for the L8B framework.

## Public API

- `loadConfig`
- `createDefaultConfig`
- `validateConfig`
- `writeConfig`
- Re-exports from `./discovery`

## Notes

- `loadConfig` currently resolves framework paths with fixed conventions: `src`, `public`, `dist`, and `.l8b`.
- Used by both the dev server and production bundler.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
