---
name: al8b
description: |
  al8b browser game engine. Triggers on: creating a runtime, integrating al8b into
  an existing React/Vue/Svelte/vanilla app, writing LootiScript games, connecting to
  a backend (HTTP/WebSocket), using game systems (physics/tween/fsm/camera/particles/
  events), drawing with the screen API, handling input (keyboard/mouse/touch/gamepad),
  playing audio, loading assets (sprites/sounds/maps), saving/loading game state,
  multiplayer, or hot reloading game code.

  Use when: user is building a game with al8b, dropping al8b into an existing web
  project, wiring al8b to a backend API, or working with any al8b API.
---

# al8b Engine Skill

## Mental Model

al8b has **three parts** a developer interacts with:

```
1. Runtime (JS/TS)       — you create this in your app
2. LootiScript game      — the game code (.ls files)
3. RuntimeBridge         — connects game ↔ your backend
```

```
Your Web App
    │
    ├─ createRuntime({ canvas, sources, bridge, listener })
    │        │
    │        ├─ renders into <canvas>
    │        ├─ compiles + runs LootiScript
    │        ├─ calls init() once, then update()+draw() every frame
    │        └─ routes host.request/emit calls through bridge
    │
    ├─ RuntimeBridge
    │        ├─ request  ← game calls host.request("name", payload, cb)
    │        ├─ emit     ← game calls host.emit("name", payload)
    │        └─ subscribe ← server pushes HostEvents into the game
    │
    └─ listener callbacks
             ├─ onReady()               — game started
             ├─ onHostEmit(name, data)  — game fired host.emit()
             ├─ onAssetProgress(0–100)  — loading bar
             └─ reportError(err)        — compile / runtime error
```

---

## Creating a Runtime — Quick Reference

Minimum to get a game running:

```ts
import { createRuntime } from "@al8b/runtime";

const runtime = createRuntime({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  width: 400,
  height: 300,
  sources: { "game.ls": gameSourceCode },   // your LootiScript
});

await runtime.start();   // loads assets → runs init() → starts game loop
```

With assets and a backend:

```ts
import { createRuntime } from "@al8b/runtime";
import { createHttpBridge } from "@al8b/http-bridge";

const runtime = createRuntime({
  // Canvas
  canvas: document.getElementById("game") as HTMLCanvasElement,
  width: 400,
  height: 300,

  // Game code
  sources: { "game.ls": gameSource },

  // Assets
  url: "/assets",
  resources: {
    images: [{ file: "player.png" }, { file: "tileset.png" }],
    sounds: [{ file: "jump.wav" }],
    music:  [{ file: "theme.mp3" }],
    maps:   [{ file: "level1.json" }],
  },

  // Backend
  bridge: createHttpBridge({ baseUrl: "https://api.mygame.com" }),

  // Session (user/player context)
  initialSession: {
    user: { id: userId, displayName: userName },
  },

  // Callbacks
  listener: {
    log:             (msg)  => console.log("[game]", msg),
    reportError:     (err)  => console.error(`[${err.type}]`, err.error),
    onReady:         ()     => hideLoadingScreen(),
    onAssetProgress: (pct)  => setLoadingBar(pct),
    onHostEmit:      (name, payload) => handleGameEvent(name, payload),
  },
});

await runtime.start();
```

`createRuntime` returns a `RuntimeController`:

```ts
runtime.start()             // boot (async)
runtime.stop()              // freeze loop
runtime.resume()            // unfreeze
runtime.reset(opts?)        // full restart
runtime.exportSnapshot()    // → serializable save state
runtime.importSnapshot(s)   // restore from save state
runtime.updateSource(f, s)  // hot-swap a .ls file
runtime.sendHostEvent(evt)  // push a HostEvent into the game
runtime.getSession()        // → current user/player/room
runtime.getCanvas()         // → HTMLCanvasElement
```

→ Full option list: [references/runtime.md](./references/runtime.md)

---

## Integrating into an Existing Project

### Decision Tree

```
Already have a project?
│
├─ Vanilla JS / TS
│   └── Add a <canvas>, call createRuntime() → references/getting-started.md
│
├─ React
│   └── useEffect + useRef, call start() in effect, stop() on cleanup
│       → references/getting-started.md#react
│
├─ Vue 3
│   └── onMounted / onUnmounted lifecycle hooks
│       → references/getting-started.md#vue-3
│
├─ Svelte
│   └── onMount, return cleanup function
│       → references/getting-started.md#svelte
│
├─ I already fetch my user/session
│   └── Pass it as initialSession, or push updates with sendHostEvent
│       → references/bridge.md#session
│
├─ I already have a REST API
│   └── Use createHttpBridge({ baseUrl, endpoints, defaults })
│       → references/http-bridge.md
│
├─ I already have a WebSocket server
│   └── Use createWebSocketBridge + createRealtimeBridge
│       → references/realtime.md
│
├─ I need game events to update my existing UI (score, lives, etc.)
│   └── listener.onHostEmit — game calls host.emit() → your callback fires
│       → references/listener.md#onhostemit
│
└─ I want to save game state to my existing storage (DB, localStorage)
    └── bridge.saveSnapshot / bridge.loadSnapshot
        → references/bridge.md#snapshots
```

### Minimal React Integration

```tsx
import { useEffect, useRef } from "react";
import { createRuntime } from "@al8b/runtime";
import gameSource from "./game.ls?raw";

export function GameCanvas({ onScore }: { onScore: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const runtime = createRuntime({
      canvas: canvasRef.current!,
      width: 400, height: 300,
      sources: { "game.ls": gameSource },
      listener: {
        onHostEmit: (name, payload: any) => {
          if (name === "score_updated") onScore(payload.score);
        },
      },
    });
    runtime.start();
    return () => runtime.stop();
  }, []);

  return <canvas ref={canvasRef} width={400} height={300} />;
}
```

→ Vue and Svelte examples: [references/getting-started.md#framework-integration](./references/getting-started.md#framework-integration)

---

## LootiScript Game Structure

Every game must define three functions:

```lua
function init()
    -- Called once, after all assets are loaded
    -- Set up game state, spawn initial entities
end

function update()
    -- Called every frame (default 60 fps)
    -- system.dt = smoothed ms since last frame
    -- Move with: x = x + speed * (system.dt / 1000)
end

function draw()
    -- Called every frame
    -- All screen.* draw calls go here
    -- camera.begin(cam) / camera.end(cam) for world-space drawing
end
```

The game talks back to the host app via:

```lua
host.emit("score_updated", { score = 1000 })    -- fires listener.onHostEmit
host.request("save_score", { score = 1000 }, function(res)
    if res.ok then show_saved() end             -- fires bridge.request
end)
```

→ All built-in globals: [references/lootiscript-globals.md](./references/lootiscript-globals.md)

---

## Quick Decision Trees

### "How do I configure the runtime?"

```
Runtime config?
├── All RuntimeOptions fields → references/runtime.md#runtimeoptions
├── Start / stop / reset / snapshot → references/runtime.md#runtimecontroller-methods
├── Frame rate and delta time → references/runtime.md#frame-timing
└── Debug logging → references/runtime.md#debug-options
```

### "How do I connect to my backend?"

```
Backend?
├── Simple REST / HTTP → references/http-bridge.md#createhttpbridge
├── HTTP + WebSocket + session + save/load in one → references/http-bridge.md#bridgebuilder
├── WebSocket real-time → references/realtime.md#createwebsocketbridge
├── Compose HTTP + WebSocket → references/realtime.md#composing-bridges
├── Listen for game events → references/listener.md#onhostemit
├── User / player / room context → references/bridge.md#session
└── Custom bridge (DIY) → references/bridge.md
```

### "How do I write game code in LootiScript?"

```
LootiScript?
├── Lifecycle (init/update/draw) → references/lootiscript-globals.md#lifecycle
├── Drawing → references/screen.md
├── Keyboard / mouse / touch / gamepad → references/input.md
├── Audio → references/audio.md
├── Sprites, maps, assets → references/assets.md
├── Talk to host app → references/lootiscript-globals.md#host-communication
├── Read session (user/player) → references/lootiscript-globals.md#session
└── Math / String / List / JSON → references/lootiscript-globals.md#math
```

### "How do I draw things?"

```
Drawing?
├── Colors, alpha, blend modes → references/screen.md#state-setters
├── Rectangles, circles, lines → references/screen.md#rectangles
├── Text and fonts → references/screen.md#text
├── Sprites (with rotation/scale) → references/screen.md#sprites
├── Tilemaps → references/screen.md#tilemaps
└── Arcs, polygons, gradients, bezier → references/screen.md
```

### "How do I handle input?"

```
Input?
├── Keyboard — all key names → references/input.md#keyboard
├── Mouse → references/input.md#mouse
├── Touch → references/input.md#touch
└── Gamepad (buttons + analog sticks) → references/input.md#gamepad
```

### "How do I play audio?"

```
Audio?
├── Sound effects (volume / pitch / pan) → references/audio.md#sound-effects
├── Background music (fade / seek) → references/audio.md#music
├── Chiptune beeper notation → references/audio.md#beeper-chiptune-notation
└── Procedural synthesis → references/audio.md#procedural-audio-microsound
```

### "How do I use a game system?"

```
Game systems (all auto-run each frame — no setup needed)?
├── Event bus → references/game-systems/events.md
├── Tweens + easing → references/game-systems/tween.md
├── State machines → references/game-systems/fsm.md
├── Physics + collision → references/game-systems/physics.md
├── Camera (follow/shake/zoom) → references/game-systems/camera.md
└── Particles → references/game-systems/particles.md
```

### "How do I save and load game state?"

```
Persistence?
├── From LootiScript (memory.save/load) → references/snapshots.md#lootiscript-api
├── From host app (exportSnapshot) → references/snapshots.md#host-api
├── Wire to localStorage or cloud → references/snapshots.md#wiring-saveload
└── What data is included → references/snapshots.md#what-is-saved
```

### "How do I update game code live?"

```
Hot reload?
└── runtime.updateSource(file, src) → references/hot-reload.md
```

---

## Reference Index

| File | Topic |
|---|---|
| [references/getting-started.md](./references/getting-started.md) | Install, minimal example, assets, framework integrations, env vars, production |
| [references/runtime.md](./references/runtime.md) | `createRuntime`, all `RuntimeOptions`, `RuntimeController` API |
| [references/bridge.md](./references/bridge.md) | `RuntimeBridge` interface, `HostEvent` types, session, snapshot wiring |
| [references/http-bridge.md](./references/http-bridge.md) | `createHttpBridge`, `BridgeBuilder` fluent API |
| [references/realtime.md](./references/realtime.md) | `createWebSocketBridge`, `createRealtimeBridge`, `composeBridge` |
| [references/listener.md](./references/listener.md) | `RuntimeListener` — `onReady`, `onHostEmit`, `onAssetProgress`, `reportError` |
| [references/lootiscript-globals.md](./references/lootiscript-globals.md) | All LootiScript built-in globals — overview with links |
| [references/screen.md](./references/screen.md) | Complete drawing API — 40+ methods |
| [references/input.md](./references/input.md) | Keyboard, mouse, touch, gamepad — all key names and patterns |
| [references/audio.md](./references/audio.md) | Sounds, music, beeper notation, procedural synthesis |
| [references/assets.md](./references/assets.md) | Resources manifest — sprites, maps, sounds, cache busting |
| [references/game-systems/events.md](./references/game-systems/events.md) | `events.*` — on/once/off/emit/defer |
| [references/game-systems/tween.md](./references/game-systems/tween.md) | `tween.*` — tweening, all 22 easings |
| [references/game-systems/fsm.md](./references/game-systems/fsm.md) | `fsm.*` — state machines with deferred transitions |
| [references/game-systems/physics.md](./references/game-systems/physics.md) | `physics.*` — AABB/circle physics, collision callbacks |
| [references/game-systems/camera.md](./references/game-systems/camera.md) | `camera.*` — follow, shake, zoom, bounds, world↔screen |
| [references/game-systems/particles.md](./references/game-systems/particles.md) | `particles.*` — emitters, burst, full config reference |
| [references/snapshots.md](./references/snapshots.md) | Save/load game state — localStorage, cloud, LootiScript API |
| [references/hot-reload.md](./references/hot-reload.md) | Hot reload LootiScript without page refresh |
