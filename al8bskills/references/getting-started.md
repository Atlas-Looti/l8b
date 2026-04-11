# Getting Started with al8b

## Install

```bash
npm install @al8b/runtime
# or
bun add @al8b/runtime
```

Add HTTP or realtime integration as needed:

```bash
npm install @al8b/http-bridge         # REST API calls from game
npm install @al8b/runtime-realtime    # WebSocket / multiplayer
```

---

## Minimal Game

**1. HTML**

```html
<canvas id="game" width="400" height="300"></canvas>
<script type="module" src="./main.ts"></script>
```

**2. LootiScript game** (`game.ls`)

```lua
local x = 200
local y = 150
local speed = 150   -- px per second

function init()
    print("Game ready!")
end

function update()
    local dt = system.dt / 1000   -- convert ms to seconds
    if keyboard.down("arrowleft")  then x = x - speed * dt end
    if keyboard.down("arrowright") then x = x + speed * dt end
    if keyboard.down("arrowup")    then y = y - speed * dt end
    if keyboard.down("arrowdown")  then y = y + speed * dt end
end

function draw()
    screen.clear("#1a1a2e")
    screen.fillRect(x - 8, y - 8, 16, 16, "#4488ff")
end
```

**3. Host app** (`main.ts`)

```ts
import { createRuntime } from "@al8b/runtime";
import gameSource from "./game.ls?raw";   // Vite raw import

const runtime = createRuntime({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  width: 400,
  height: 300,
  sources: { "game.ls": gameSource },
  listener: {
    log: (msg) => console.log("[game]", msg),
    reportError: ({ type, error }) => console.error(`[${type}]`, error),
    onReady: () => console.log("Game started"),
  },
});

await runtime.start();
```

---

## With Assets

**1. Declare assets in resources manifest**

```ts
createRuntime({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  url: "/assets",                 // base path for all files
  resources: {
    images: [
      { file: "player.png" },
      { file: "tileset.png" },
    ],
    sounds: [
      { file: "jump.wav" },
      { file: "coin.ogg" },
    ],
    music: [
      { file: "theme.mp3" },
    ],
    maps: [
      { file: "level1.json" },
    ],
  },
  sources: { "game.ls": gameSource },
  listener: {
    onAssetProgress: (pct) => setLoadingBar(pct),
    onReady: () => hideLoadingScreen(),
  },
});
```

**2. Use in LootiScript** (key = filename without extension)

```lua
function init()
    -- Assets are guaranteed loaded before init() is called
end

function draw()
    screen.drawSprite(sprites["player"], player.x, player.y, 32, 32)
    screen.drawMap(maps["level1"], 0, 0, 400, 300)
end

function update()
    if keyboard.pressed("space") then
        audio.play(sounds["jump"])
    end
end
```

→ Full reference: [assets.md](./assets.md)

---

## With a Backend

```ts
import { createRuntime } from "@al8b/runtime";
import { createHttpBridge } from "@al8b/http-bridge";

const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  endpoints: {
    "scores.save": "/scores",
    "scores.top": "/scores/top",
    "user.getProfile": "/users/{id}",
  },
  defaults: {
    headers: { Authorization: `Bearer ${userToken}` },
  },
});

const runtime = createRuntime({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  sources: { "game.ls": gameSource },
  bridge,
  initialSession: {
    user: { id: userId, displayName: userName },
    game: { id: "my-game", version: "1.0" },
  },
  listener: {
    onReady: () => hideLoadingScreen(),
    onHostEmit: (name, payload) => {
      if (name === "score_updated") updateScoreUI(payload);
      if (name === "level_complete") trackAnalytics(name, payload);
    },
  },
});

await runtime.start();
```

**In LootiScript:**

```lua
function on_level_complete()
    host.emit("level_complete", { level = current_level, time = elapsed_ms })
    host.request("scores.save", { score = score, level = current_level }, function(res)
        if res.ok then show_saved_badge() end
    end)
end
```

→ Full reference: [http-bridge.md](./http-bridge.md) | [bridge.md](./bridge.md)

---

## With Multiplayer (WebSocket)

```ts
import { createRuntime, composeBridge } from "@al8b/runtime";
import { createWebSocketBridge, createRealtimeBridge } from "@al8b/runtime-realtime";
import { createHttpBridge } from "@al8b/http-bridge";

const ws = createWebSocketBridge({ url: "wss://realtime.mygame.com" });
await ws.connect();

const bridge = composeBridge(
  createRealtimeBridge(ws),
  createHttpBridge({ baseUrl: "https://api.mygame.com" }),
  { getSession: async () => await fetchSession() },
);

const runtime = createRuntime({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  sources: { "game.ls": gameSource },
  bridge,
});

await runtime.start();
```

→ Full reference: [realtime.md](./realtime.md)

---

## How It All Fits Together

```
Your Web App
  │
  ├─ createRuntime(options)
  │     ├─ canvas         ← renders here
  │     ├─ sources        ← LootiScript game code
  │     ├─ resources      ← sprites, sounds, maps
  │     ├─ bridge         ← your backend connection
  │     ├─ initialSession ← user/player context
  │     └─ listener       ← callbacks: onReady, onHostEmit, reportError...
  │
  ├─ RuntimeBridge
  │     ├─ request     ← game calls host.request() → your API
  │     ├─ emit        ← game calls host.emit()    → your UI/analytics
  │     └─ subscribe   ← server pushes HostEvents → game reacts
  │
  └─ LootiScript Game
        ├─ init()    — setup, called once after assets load
        ├─ update()  — logic, called every frame (default 60 fps)
        └─ draw()    — rendering, called every frame
```

---

## Framework Integration

### React

```tsx
import { useEffect, useRef } from "react";
import { createRuntime } from "@al8b/runtime";
import gameSource from "./game.ls?raw";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let runtime: ReturnType<typeof createRuntime> | null = null;

    (async () => {
      runtime = createRuntime({
        canvas,
        width: 400, height: 300,
        sources: { "game.ls": gameSource },
      });
      await runtime.start();
    })();

    return () => runtime?.stop();
  }, []);

  return <canvas ref={canvasRef} width={400} height={300} />;
}
```

### Vue 3

```vue
<template>
  <canvas ref="canvasRef" :width="400" :height="300" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createRuntime } from "@al8b/runtime";
import gameSource from "./game.ls?raw";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let runtime: ReturnType<typeof createRuntime> | null = null;

onMounted(async () => {
  runtime = createRuntime({
    canvas: canvasRef.value!,
    width: 400, height: 300,
    sources: { "game.ls": gameSource },
  });
  await runtime.start();
});

onUnmounted(() => runtime?.stop());
</script>
```

### Svelte

```svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { createRuntime } from "@al8b/runtime";
  import gameSource from "./game.ls?raw";

  let canvas: HTMLCanvasElement;

  onMount(async () => {
    const runtime = createRuntime({
      canvas,
      width: 400, height: 300,
      sources: { "game.ls": gameSource },
    });
    await runtime.start();
    return () => runtime.stop();
  });
</script>

<canvas bind:this={canvas} width={400} height={300} />
```

---

## Environment Variables

Pass key-value config from host to LootiScript:

```ts
createRuntime({
  env: {
    DEBUG: "true",
    API_URL: "https://api.mygame.com",
    MAX_ENEMIES: "20",
  },
  sources: { "game.ls": gameSource },
});
```

```lua
-- In LootiScript (all values are strings)
if env.DEBUG == "true" then
    show_debug_overlay()
end
local max = string.parseInt(env.MAX_ENEMIES)
```

---

## Production Build

For production, pre-compile LootiScript to bytecode and ship that instead of source:

```ts
// Build time: compile .ls files to .l8b.json artifacts
// (use the @al8b/lootiscript compiler via your build tool)

// Runtime: load pre-compiled
import compiledGame from "./game.l8b.json";

createRuntime({
  canvas: ...,
  compiledRoutines: { "game.ls": compiledGame },
  bridge,
});
```

Pre-compiled games start faster (no compile step) and keep your source code private.
