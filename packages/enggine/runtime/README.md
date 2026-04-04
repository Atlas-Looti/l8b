# @al8b/runtime

Browser runtime that wires together the L8B engine subsystems. It owns asset loading, VM bootstrapping, the frame loop, script-facing globals, hot reload integration, and runtime lifecycle control.

## Public API

- Re-exports from `assets`, `core`, `hot-reload`, `input`, `loop`, `storage`, `system`, `types`, `utils`, and `vm`
- `RuntimeOrchestrator`

## Runtime Responsibilities

- Build the global script API (`screen`, `audio`, `input`, `player`, `scene`, `router`, `system`)
- Load assets and compiled routines or development sources
- Coordinate the game loop and debug time-machine hooks
- Route runtime errors and warnings back to the host listener

## Notes

- This package is the integration point for most `@al8b/*` engine packages.
- Changes here usually have product-wide impact because the orchestrator is the main boundary between tooling, host, and game code.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
