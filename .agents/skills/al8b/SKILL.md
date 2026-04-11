---
name: al8b
description: |
  al8b game engine codebase context. Triggers on: any work inside this monorepo —
  adding packages, modifying runtime, writing LootiScript games, wiring bridges,
  implementing game systems, debugging the engine, or authoring new features.

  Use when: creating/editing anything under packages/, asking about architecture,
  LootiScript syntax/globals, RuntimeBridge, game systems (physics/tween/fsm/camera/
  particles/events), snapshots, hot reload, or how the engine loop works.
---

# al8b Engine — Codebase Skill

Browser-based 2D game engine with its own scripting language (LootiScript).
Games are written in LootiScript; the engine runs in the browser, communicates with a host app via RuntimeBridge.

---

## Monorepo Structure

```
packages/
├── core/          # Browser primitives — no engine deps
│   ├── audio/     @al8b/audio
│   ├── camera/    @al8b/camera
│   ├── events/    @al8b/events
│   ├── fsm/       @al8b/fsm
│   ├── image/     @al8b/image
│   ├── input/     @al8b/input
│   ├── map/       @al8b/map
│   ├── palette/   @al8b/palette
│   ├── particles/ @al8b/particles
│   ├── physics/   @al8b/physics
│   ├── screen/    @al8b/screen
│   ├── sprites/   @al8b/sprites
│   ├── time/      @al8b/time
│   └── tween/     @al8b/tween
└── enggine/       # Engine orchestration
    ├── http-bridge/       @al8b/http-bridge
    ├── io/                @al8b/io
    ├── lootiscript/       @al8b/lootiscript
    ├── runtime/           @al8b/runtime       ← main entry point
    ├── runtime-realtime/  @al8b/runtime-realtime
    ├── stdlib/            @al8b/stdlib
    └── vm/                @al8b/vm
```

**Rule:** `packages/core/` = browser primitives (no upstream engine deps). `packages/enggine/` = engine orchestration that depends on core packages.

---

## Creating a Runtime (Host App)

```ts
import { createRuntime } from "@al8b/runtime";

const runtime = createRuntime({
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  width: 400,
  height: 400,
  sources: { "main.ls": gameSourceCode },
  bridge: myBridge,
  listener: {
    log: (msg) => console.log(msg),
    reportError: (err) => console.error(err),
    onReady: () => console.log("game started"),
    onHostEmit: (name, payload) => handleGameEvent(name, payload),
    onAssetProgress: (pct) => updateLoadingBar(pct),
  },
});

await runtime.start();
```

### RuntimeOptions

| Field | Type | Purpose |
|---|---|---|
| `canvas` | `HTMLCanvasElement` | Canvas to render to |
| `width` / `height` | `number` | Screen dimensions |
| `sources` | `Record<string, string>` | LootiScript source files (dev) |
| `compiledRoutines` | `Record<string, CompiledModuleArtifact>` | Pre-compiled bytecode (prod) |
| `bridge` | `RuntimeBridge` | Platform integration bridge |
| `listener` | `RuntimeListener` | Host-side event callbacks |
| `initialSession` | `RuntimeSessionSnapshot` | User/player/game/room context |
| `env` | `Record<string, string>` | Env vars accessible from LootiScript |
| `namespace` | `string` | localStorage namespace |
| `url` | `string` | Base URL for asset loading |
| `resources` | `Resources` | Asset manifest |
| `debug` | `RuntimeDebugOptions` | Enable lifecycle/input/screen debug logs |

### RuntimeController API

```ts
runtime.start()                          // load assets → init() → game loop
runtime.stop()                           // freeze game loop, stop audio
runtime.resume()                         // resume after stop
runtime.reset(options?)                  // full restart (preserveStorage, preserveSession, preserveSnapshot)
runtime.exportSnapshot()                 // → RuntimeSnapshot (serializable)
runtime.importSnapshot(snapshot)         // restore game state
runtime.updateSource(file, src, reinit?) // hot reload a LootiScript file
runtime.sendHostEvent(event)             // inject a HostEvent into the game
runtime.getSession()                     // → RuntimeSessionSnapshot | null
runtime.getCanvas()                      // → HTMLCanvasElement

// Read-only fields
runtime.screen     // Screen instance
runtime.audio      // AudioCore instance
runtime.input      // InputManager instance
runtime.events     // EventBus instance
runtime.tweens     // TweenManager instance
runtime.fsmManager // FSMManager instance
runtime.physics    // PhysicsWorld instance
runtime.cameraManager // CameraManager instance
runtime.particles  // ParticleManager instance
```

---

## RuntimeBridge Interface

The bridge connects the game to the host backend. All fields are optional.

```ts
interface RuntimeBridge {
  // Game calls host.request(name, payload, cb) → bridge.request fires
  request?<TResponse>(name: string, payload?: unknown): Promise<TResponse> | TResponse;

  // Game calls host.emit(name, payload) → bridge.emit fires
  emit?(name: string, payload?: unknown): void;

  // Runtime calls bridge.subscribe to receive HostEvents from backend
  subscribe?(handler: (event: HostEvent) => void): (() => void) | void;

  // Called to get current session (user, player, game, room)
  getSession?(): Promise<RuntimeSessionSnapshot | null> | RuntimeSessionSnapshot | null;

  // Called when game does memory.save(meta, cb)
  saveSnapshot?(snapshot: RuntimeSnapshot, meta?: RuntimeSnapshotMeta): Promise<void> | void;

  // Called when game does memory.load(meta, cb)
  loadSnapshot?(meta?: RuntimeSnapshotMeta): Promise<RuntimeSnapshot | null> | RuntimeSnapshot | null;
}
```

### Inbound HostEvent types (send via `runtime.sendHostEvent`)

| type | Effect |
|---|---|
| `"session.update"` | Merge payload into current session |
| `"runtime.reset"` | Reset the runtime |
| `"runtime.import_snapshot"` | Restore game state from payload |
| `"runtime.export_snapshot"` | Triggers emit of `"runtime.snapshot"` |
| `"runtime.stop"` / `"runtime.pause"` | Stop the game |
| `"runtime.resume"` | Resume the game |

---

## HTTP Bridge (`@al8b/http-bridge`)

### createHttpBridge

```ts
import { createHttpBridge } from "@al8b/http-bridge";

const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  endpoints: {
    "user.getProfile": "/users/{id}",       // {param} substitution from payload
    "leaderboard.get": "/leaderboard",
  },
  defaults: { headers: { Authorization: "Bearer " + token } },
  responseHandler: async (res, name) => {   // optional custom response
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
});
```

Default behavior: POST with JSON body. If no endpoint mapped, path = `/{requestName}`.
Response shape: `{ ok: true, ...data }` on success, `{ ok: false, error: string }` on failure.

### BridgeBuilder (fluent composition)

```ts
import { BridgeBuilder } from "@al8b/http-bridge";

const bridge = new BridgeBuilder()
  .http({ baseUrl: "https://api.mygame.com", endpoints: { ... } })
  .realtime(createWebSocketBridge({ url: "wss://realtime.mygame.com" }))
  .session(() => fetchSession())
  .snapshot({
    save: (snap, meta) => saveToCloud(snap, meta),
    load: (meta) => loadFromCloud(meta),
  })
  .on("score_updated", ({ score }) => updateScoreUI(score))    // named game event
  .onEmit((name, payload) => analytics.track(name, payload))   // catch-all
  .build();
```

---

## Realtime Bridge (`@al8b/runtime-realtime`)

```ts
import { createWebSocketBridge, createRealtimeBridge } from "@al8b/runtime-realtime";
import { composeBridge } from "@al8b/runtime";

const ws = createWebSocketBridge({
  url: "wss://realtime.mygame.com",
  reconnect: true,
  reconnectDelay: 1000,    // doubles on each failure
  maxReconnectDelay: 30000,
  onConnect: () => console.log("connected"),
});

await ws.connect();

const bridge = composeBridge(
  createRealtimeBridge(ws),               // subscribe + emit via WS
  createHttpBridge({ baseUrl: "..." }),   // request via HTTP
  { getSession: () => fetchSession() },   // session
);
```

### composeBridge precedence

| Field | Rule |
|---|---|
| `request` | **Rightmost** bridge wins |
| `emit` | **Fanout** — fires on ALL bridges |
| `subscribe` | **Merge** — all incoming events combined |
| `getSession` | **Leftmost** bridge wins |
| `saveSnapshot` / `loadSnapshot` | **Leftmost** wins |

WebSocket message envelope: `{ channel: string, payload: unknown }` (JSON).

---

## RuntimeListener callbacks

```ts
listener: {
  log: (msg: string) => void,                         // print() from LootiScript
  reportError: (err: ErrorInfo) => void,              // compile/init/update/draw errors
  codePaused: () => void,                             // game called system.pause()
  onReady: () => void,                                // init() completed, game loop running
  onHostEmit: (name: string, payload: unknown) => void, // host.emit() from LootiScript (filtered: not runtime.* internals)
  onAssetProgress: (progress: number) => void,        // 0–100 during asset loading
}
```

---

## LootiScript Language (`.ls` files)

Pipeline: source → Tokenizer → Parser → Compiler → Bytecode (Routine) → Processor/Runner

### Game lifecycle hooks

```lua
function init()
    -- Called once when runtime starts, after assets loaded
end

function update()
    -- Called every frame (default 60 fps)
    -- Delta time: system.dt (ms since last frame, smoothed EMA)
end

function draw()
    -- Called every frame for rendering
    -- particles.draw() runs after this automatically
end
```

### Built-in globals (available in all LootiScript)

```lua
-- Rendering
screen.clear(r, g, b)
screen.drawSprite(sprite, x, y)
screen.drawText(text, x, y, size, r, g, b)
screen.drawRect(x, y, w, h, r, g, b)

-- Input
keyboard.down("space")     -- held
keyboard.pressed("space")  -- just pressed this frame
keyboard.released("space") -- just released this frame
mouse.x, mouse.y
mouse.down("left")
touch.count, touch.x(0), touch.y(0)
gamepad.down(0, "a")

-- Audio
audio.play(sound)
audio.stop(sound)
music.play(track)

-- Assets (from resources manifest)
sprites["player"]
maps["level1"]
sounds["jump"]
music["theme"]

-- Session
local u = session.user()     -- { id, displayName, roles, metadata }
local p = session.player()   -- { id, name, slot, metadata }
local g = session.game()     -- { id, slug, version }
local r = session.room()     -- { id, role, metadata }

-- System
system.fps          -- current FPS
system.update_rate  -- target update rate (set to change speed)
system.dt           -- smoothed delta time in ms

-- Host communication
host.emit("score_updated", { score = 100 })
host.request("leaderboard.get", { limit = 10 }, function(res)
    if res.ok then
        -- use res data
    end
end)

-- Snapshot / Persistence
memory.save(meta, callback)
memory.load(meta, callback)
memory.export()          -- returns RuntimeSnapshot table
memory.import(snapshot)
memory.reset(options)
```

---

## Game Systems

All 6 systems are updated automatically each frame by the runtime, in this order:
`tweens → fsmManager → cameraManager → particles → physics` (before `update()`).
`events.flushDeferred()` runs after `update()`.
`particles.draw()` runs after `draw()`.

All systems are **reset on runtime teardown** (stop/reset). Snapshots do NOT include system state.

### Events (`events.*`)

```lua
local h = events.on("player_died", function(p)
    -- p is the payload
end)
events.once("level_complete", function(p) end)
events.emit("enemy_hit", { damage = 5 })     -- immediate, synchronous
events.defer("explosion", { x = px, y = py }) -- queued, fires after update()
events.off(h)                                 -- unsubscribe by id
events.clear("player_died")                   -- remove all listeners for event
```

`defer` prevents re-entrant infinite loops — safe to call from inside an event handler.

### Tween (`tween.*`)

```lua
-- Convenience: tween object property
local id = tween.to(enemy, 500, "x", 200, "easeOutQuad", function()
    -- onComplete
end)

-- Full config
local id = tween.create({
    from = 0, to = 1, duration = 300,
    easing = "easeInOutCubic",
    onUpdate = function(v) alpha = v end,
    onComplete = function() end,
    loop = false,
    pingpong = false,
    delay = 100,
})

tween.pause(id)
tween.resume(id)
tween.stop(id)
tween.stopAll()
```

Available easings: `linear`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`, `easeInQuart`, `easeOutQuart`, `easeInOutQuart`, `easeInSine`, `easeOutSine`, `easeInOutSine`, `easeInExpo`, `easeOutExpo`, `easeInBack`, `easeOutBack`, `easeInBounce`, `easeOutBounce`, `easeInElastic`, `easeOutElastic`, `easeInOutElastic`

### FSM (`fsm.*`)

```lua
local m = fsm.create()

fsm.addState(m, "idle", {
    onEnter = function() end,
    onUpdate = function(dt) end,
    onExit = function() end,
})
fsm.addState(m, "run", {
    onUpdate = function(dt)
        fsm.transition(m, "idle")  -- safe: deferred if mid-update
    end,
})

fsm.transition(m, "idle")
local s = fsm.getState(m)         -- "idle"
local prev = fsm.getPrevious(m)   -- previous state name
local t = fsm.getTimeInState(m)   -- ms in current state
fsm.destroy(m)
```

Transitions called from inside `onUpdate` are deferred and applied after the callback returns.

### Physics (`physics.*`)

```lua
physics.setGravity(980)   -- px/s², default 980

local b = physics.addBody({
    x = 100, y = 50,
    vx = 0, vy = 0,
    mass = 1,           -- 0 = static body
    friction = 0.1,     -- velocity damping 0-1
    restitution = 0.3,  -- bounciness 0-1
    gravityScale = 1,
    shape = { type = "aabb", x = 0, y = 0, w = 16, h = 24 },
    -- or circle: { type = "circle", x = 0, y = 0, r = 8 }
    isTrigger = false,  -- detect only, no resolution
    tag = "player",
})

physics.onCollide(b, function(hit)
    -- hit: { otherId, otherTag, nx, ny, depth }
    if hit.otherTag == "spike" then die() end
end)

local body = physics.getBody(b)   -- { x, y, vx, vy, tag }
physics.setPosition(b, x, y)
physics.setVelocity(b, vx, vy)
physics.applyForce(b, fx, fy)
physics.applyImpulse(b, ix, iy)   -- jump: applyImpulse(b, 0, -400)
physics.removeBody(b)

local ids = physics.query(x, y, w, h)  -- spatial AABB query
```

Shape offsets are from body origin (x, y). Delta is capped at 50ms to prevent explosion on tab resume.

### Camera (`camera.*`)

```lua
local cam = camera.create()
camera.setActive(cam)

camera.follow(cam, player, 0.1)           -- lerp=0.1
camera.follow(cam, player, 0.1, 0, -30)  -- offset y=-30 (look-ahead)
camera.unfollow(cam)
camera.setDeadZone(cam, 20, 10)           -- dead zone px (w, h)
camera.shake(cam, 8, 300)                 -- intensity, durationMs
camera.setBounds(cam, 0, 0, 2000, 1500)  -- world bounds
camera.clearBounds(cam)
camera.setZoom(cam, 2.0)

local sx, sy = camera.worldToScreen(cam, wx, wy)
local wx, wy = camera.screenToWorld(cam, mouse.x, mouse.y)

local x = camera.getX(cam)
local y = camera.getY(cam)
local z = camera.getZoom(cam)

-- Wrap world-space draw calls:
function draw()
    camera.begin(cam)
        screen.drawSprite(player_sprite, player.x, player.y)
    camera.end(cam)
end
```

### Particles (`particles.*`)

```lua
-- Continuous emitter
local fire = particles.create({
    x = player.x, y = player.y,
    emitRate = 60,         -- particles/sec
    lifeMin = 300, lifeMax = 800,
    speedMin = 30, speedMax = 80,
    angleMin = -0.8, angleMax = 0.8,
    sizeStart = 6, sizeEnd = 0,
    alphaStart = 1, alphaEnd = 0,
    gravity = -50,
    color = "#ff6600",
    loop = true,
})

particles.move(fire, player.x, player.y)  -- track emitter to position each frame
particles.pause(fire)
particles.resume(fire)
particles.stop(fire)

-- One-shot burst (fire-and-forget)
particles.burst(enemy.x, enemy.y, 30, {
    lifeMin = 200, lifeMax = 600,
    speedMin = 80, speedMax = 200,
    angleMin = 0, angleMax = 6.28,
    sizeStart = 4, sizeEnd = 1,
    alphaStart = 1, alphaEnd = 0,
    gravity = 100,
    color = "#ffcc00",
})
```

`particles.draw()` is called automatically by the runtime after `draw()` — don't call it manually.

---

## Snapshots & State Persistence

```ts
// Host side
const snap = runtime.exportSnapshot();    // { version: 1, global, session, system }
await runtime.importSnapshot(snap);

// Store in localStorage / cloud
localStorage.setItem("save", JSON.stringify(snap));
```

```lua
-- LootiScript side
memory.save({ slot = "auto" }, function(res)
    if res.ok then print("saved") end
end)
memory.load({ slot = "auto" }, function(res)
    if res.ok then print("loaded") end
end)
memory.reset()      -- clear all game state and restart
```

Game system state (events, tween, fsm, physics, camera, particles) is **excluded** from snapshots. Only LootiScript global variables are serialized.

---

## Hot Reload

```ts
runtime.updateSource("main.ls", newSourceCode);         // swap source, keep state
runtime.updateSource("main.ls", newSourceCode, true);   // swap + re-run init()
```

Hot reload does NOT reset game systems — only the VM state is updated.

---

## Adding a New Package

```bash
bun run new <name> packages/core    # browser primitive
bun run new <name> packages/enggine # engine component
```

After scaffolding, check:
1. `tsconfig.json` — `extends: "../../../tsconfig.base.json"` (3 levels for core/enggine packages)
2. `tsup.config.ts` — `from "../../../tsup.config.base"` (same depth)
3. `package.json` `clean` script — `bun --bun ../../../scripts/clean-package.mjs dist`
4. Add `"@al8b/<name>": "workspace:*"` to consumers (e.g. `packages/enggine/runtime/package.json`)

---

## Architecture Pattern for New Engine Systems

When adding a new game system that integrates into the runtime loop:

1. **New package** in `packages/core/<name>/` with class + `getInterface(): Record<string, unknown>`
2. **Interface** in `packages/enggine/runtime/src/core/service-interfaces.ts` — add `I<Name>` + factory method
3. **Factory** in `packages/enggine/runtime/src/core/default-factory.ts`
4. **Field** in `RuntimeControllerImpl` constructor + `public readonly <name>: <Class>`
5. **Wire** in `handleUpdate` (call `this.<name>.update(dtMs)`) and/or `handleDraw`
6. **Reset** in `teardownRuntimeState` — `this.<name>.reset()`
7. **Expose** in `api-factory.ts` — add to `RuntimeApiFactoryContext`, wire in `createRuntimeGlobalApi`, add to return type
8. **Exclude** from `serializeGlobalSnapshot` — add `globalRecord.<apiKey>` to the exclusion identity check

Delta time source: `const dtMs = this.gameLoop ? this.gameLoop.getState().dt : FRAME_TIME_MS`

---

## CI / Build Commands

```bash
bun run build          # build all packages
bun run check-types    # TypeScript check
bun run test           # Vitest unit tests
bun run lint:check     # Biome lint
bun run format:check   # Biome format
bun run ci             # all of the above in sequence

bun run clean          # clean dist folders
bun run new <n> <dir>  # scaffold a new package
```

Monorepo: **Bun workspaces** + **Turborepo**. Build order via `dependsOn: ["^build"]`.
