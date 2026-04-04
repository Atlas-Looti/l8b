# @al8b/framework-html

HTML shell generation for the L8B framework. This package owns the template fragments for the player page, dev client, overlay UI, and development badges.

## Public API

- Re-exports from `templates`, `client`, `overlay`, `player`, and `dev-badge`

## Notes

- Used by framework server and bundler to keep generated HTML consistent across dev and production.
- Treat this package as the presentation layer of the framework, not the game runtime.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
