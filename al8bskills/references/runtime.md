# Runtime API

## createRuntime

```ts
import { createRuntime } from "@al8b/runtime";

const runtime = createRuntime(options);
await runtime.start();
```

## RuntimeOptions

| Field | Type | Default | Description |
|---|---|---|---|
| `canvas` | `HTMLCanvasElement` | — | Canvas element to render the game into |
| `width` | `number` | `400` | Screen width in pixels |
| `height` | `number` | `400` | Screen height in pixels |
| `sources` | `Record<string, string>` | — | LootiScript source files — `{ "game.ls": sourceCode }` |
| `compiledRoutines` | `Record<string, CompiledModuleArtifact>` | — | Pre-compiled bytecode for production |
| `resources` | `Resources` | — | Asset manifest (sprites, sounds, maps) |
| `url` | `string` | — | Base URL for loading asset files |
| `bridge` | `RuntimeBridge` | — | Backend integration — see [bridge.md](./bridge.md) |
| `listener` | `RuntimeListener` | — | Callbacks for events/errors/progress — see [listener.md](./listener.md) |
| `initialSession` | `RuntimeSessionSnapshot \| null` | `null` | User/player/game/room context at startup |
| `env` | `Record<string, string>` | — | Key-value pairs accessible from LootiScript as env vars |
| `namespace` | `string` | `"/l8b"` | localStorage key prefix for this game |
| `preserveStorage` | `boolean` | `false` | Keep localStorage across `runtime.reset()` calls |
| `debug` | `RuntimeDebugOptions` | — | Enable debug logging (see below) |

### debug options

```ts
debug: {
  lifecycle: true,  // log every startup step to console
  input: true,      // log input state each frame
  screen: true,     // log canvas state changes
}
```

---

## RuntimeController Methods

Returned by `createRuntime()`.

```ts
// Lifecycle
await runtime.start()             // load assets → run init() → start game loop
runtime.stop()                    // freeze game loop, stop audio
runtime.resume()                  // resume a stopped runtime
await runtime.reset(options?)     // full restart

// State
runtime.exportSnapshot()          // → RuntimeSnapshot (plain JSON, serializable)
await runtime.importSnapshot(snap) // restore game to a previous state

// Development
runtime.updateSource(file, src)           // hot-swap a LootiScript file, preserve state
runtime.updateSource(file, src, true)     // hot-swap + re-run init()

// Host → Game communication
runtime.sendHostEvent({ type, payload }) // push an event into the running game

// Info
runtime.getSession()              // → RuntimeSessionSnapshot | null
runtime.getCanvas()               // → HTMLCanvasElement
runtime.stopped                   // boolean — is the runtime stopped?
```

### reset options

```ts
await runtime.reset({
  preserveStorage: true,    // keep localStorage data
  preserveSession: true,    // keep user/player session (default: true)
  preserveSnapshot: true,   // re-import current game state after restart
});
```

---

## Frame Timing

From LootiScript, `system.dt` gives you the smoothed delta time in milliseconds since the last frame. Use it for frame-rate-independent movement:

```lua
function update()
    -- Move at 150 px/s regardless of frame rate
    x = x + 150 * (system.dt / 1000)
end
```

The default update rate is 60 fps. Change it from LootiScript:

```lua
function init()
    system.update_rate = 30   -- slow to 30 fps
end
```
