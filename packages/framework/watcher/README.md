# @al8b/framework-watcher

Debounced file watching for L8B source files and public assets.

## Public API

- `L8BWatcher`
- `createWatcher`
- Event and option types from `./events`

## Notes

- Wraps `chokidar` with resource-type awareness and debounced event flushing.
- Used by the development server to drive HMR and resource refresh.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
