# @al8b/runtime

Browser runtime facade for AL8B games. It owns asset loading, VM bootstrap, the frame loop, script-facing globals, bridge-based host integration, hot reload integration, and runtime lifecycle control.

## Public API

- `createRuntime`
- `RuntimeController`
- `RuntimeBridge`
- `RuntimeSnapshot`
- `RuntimeSessionSnapshot`
- Re-exports from `assets`, `core`, `hot-reload`, `input`, `loop`, `storage`, `system`, `types`, `utils`, and `vm`

## Runtime Responsibilities

- Build the global script API (`screen`, `audio`, `input`, `player`, `scene`, `router`, `system`)
- Expose host-facing built-ins (`host`, `session`, `memory`)
- Load assets and compiled routine artifacts or development sources
- Coordinate the game loop and debug time-machine hooks
- Route runtime errors, warnings, and bridge events back to the host shell

## Host Bridge

Use `bridge` to connect the runtime to your app shell, backend, or realtime layer.

```ts
import { createRuntime, type RuntimeBridge } from "@al8b/runtime";

const bridge: RuntimeBridge = {
  emit(name, payload) {
    console.log("game event", name, payload);
  },
  request(name, payload) {
    return fetch(`/api/runtime/${name}`, {
      method: "POST",
      body: JSON.stringify(payload)
    }).then((response) => response.json());
  },
  getSession() {
    return {
      user: { id: "user-1" },
      game: { id: "hello" }
    };
  }
};

const runtime = createRuntime({
  canvas,
  sources,
  resources,
  bridge
});
```

LootiScript can use:

- `host.emit(name, payload)`
- `host.request(name, payload, callback)`
- `session.user()`, `session.player()`, `session.game()`, `session.room()`
- `memory.export()`, `memory.import(snapshot)`, `memory.reset()`, `memory.save(meta, callback)`, `memory.load(meta, callback)`

## Runtime Lifecycle

`RuntimeController` now exposes lifecycle and state transfer primitives needed by host apps:

- `start()`
- `stop()`
- `resume()`
- `reset(options?)`
- `exportSnapshot()`
- `importSnapshot(snapshot)`
- `sendHostEvent(event)`
- `getSession()`

## Notes

- This package is the integration point for most `@al8b/*` engine packages.
- `createRuntime()` is the only supported top-level runtime constructor.
- Backend access, auth, multiplayer transport, and hub UX stay in the host app or bridge layer, not in runtime core.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
