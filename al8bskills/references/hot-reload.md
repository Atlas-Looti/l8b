# Hot Reload

Update LootiScript source code in a running game without losing state.

## API

```ts
// Swap source file — game state is preserved, no restart
runtime.updateSource("main.ls", newSourceCode);

// Swap source + re-run init() — resets game-side state but keeps system state
runtime.updateSource("main.ls", newSourceCode, true);
```

## Behavior

| `reinit` | Effect |
|---|---|
| `false` (default) | Source is swapped, new code is active on next frame. Existing global variables retain their values. |
| `true` | Source is swapped, `init()` is re-called. LootiScript globals are reset by `init`. |

**Game systems are never reset by hot reload** (`events`, `tween`, `fsm`, `physics`, `camera`, `particles`). Only the VM and LootiScript state are touched.

## Dev Server Integration

Wire `updateSource` to your dev server's file watcher:

```ts
// Vite plugin example
import { createRuntime } from "@al8b/runtime";

const runtime = createRuntime({
  canvas: ...,
  sources: { "main.ls": initialSource },
});

await runtime.start();

// In browser, listen for hot updates from Vite HMR
if (import.meta.hot) {
  import.meta.hot.on("al8b:source-update", ({ file, source }) => {
    runtime.updateSource(file, source);
  });
}
```

## Limitations

- **Game systems are not reset** — physics bodies, tweens, FSM states, particles, and event listeners created before the hot reload persist. If `init()` creates them, use `reinit: true` and guard against double-creation.
- **`reinit: true` re-runs `init()`** — if your `init()` spawns physics bodies or entities without clearing them first, you'll end up with duplicates. Add a cleanup step at the top of `init()` or check whether the body already exists.
- **Assets cannot be hot-reloaded** — sprite, sound, music, and map files require a full page refresh to pick up changes. Only `.ls` source files can be swapped at runtime.

## Multiple Source Files

Games can have multiple `.ls` files. Each file is loaded independently. Hot reload each by its original key:

```ts
createRuntime({
  sources: {
    "main.ls": mainSource,
    "player.ls": playerSource,
    "enemy.ls": enemySource,
  },
});

// Update just the player module
runtime.updateSource("player.ls", newPlayerSource);
```
