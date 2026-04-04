# @al8b/io

Storage and IO helpers for the L8B runtime. Today this package centers on persistent storage through a single service abstraction.

## Public API

- `StorageService`

## Notes

- Used by `@al8b/vm` and `@al8b/runtime`.
- Keep persistence concerns here rather than coupling them to VM or runtime orchestration.

## Scripts

```bash
bun run build
bun run test
bun run typecheck
bun run clean
```
