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
