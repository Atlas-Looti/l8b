# @al8b/player

Player control bridge for L8B. It exposes the runtime-to-host lifecycle hooks used by game code for pause/resume, performance settings, and outbound messages.

## Public API

- `PlayerService`
- Type: `PlayerDelegate`

## Notes

- Consumed by `@al8b/runtime` to build the script-facing `player.*` API.
- This package is intentionally small and host-integration focused.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
