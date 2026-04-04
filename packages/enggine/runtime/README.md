# @al8b/runtime

Browser runtime facade for AL8B games. It owns asset loading, VM bootstrap, the frame loop, script-facing globals, hot reload integration, and runtime lifecycle control.

## Public API

- `createRuntime`
- `RuntimeController`
- Re-exports from `assets`, `core`, `hot-reload`, `input`, `loop`, `storage`, `system`, `types`, `utils`, and `vm`

## Runtime Responsibilities

- Build the global script API (`screen`, `audio`, `input`, `player`, `scene`, `router`, `system`)
- Load assets and compiled routine artifacts or development sources
- Coordinate the game loop and debug time-machine hooks
- Route runtime errors and warnings back to the host listener

## Notes

- This package is the integration point for most `@al8b/*` engine packages.
- `createRuntime()` is the only supported top-level runtime constructor.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
