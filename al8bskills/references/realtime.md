# Realtime Bridge (`@al8b/runtime-realtime`)

## createWebSocketBridge

Creates a WebSocket-backed transport with auto-reconnect and send queue.

```ts
import { createWebSocketBridge } from "@al8b/runtime-realtime";

const ws = createWebSocketBridge({
  url: "wss://realtime.mygame.com",
  reconnect: true,
  reconnectDelay: 1000,        // ms, doubles on each failure
  maxReconnectDelay: 30000,
  maxReconnectAttempts: Infinity,
  onConnect: () => console.log("connected"),
  onDisconnect: (e) => console.log("disconnected", e.code),
  onError: (e) => console.error("ws error", e),
});

await ws.connect();
```

### WebSocketBridgeOptions

| Field | Default | Description |
|---|---|---|
| `url` | — | WebSocket URL (required) |
| `reconnect` | `true` | Auto-reconnect on close/error |
| `reconnectDelay` | `1000` | Initial reconnect delay ms |
| `maxReconnectDelay` | `30000` | Max reconnect delay ms (exponential backoff) |
| `maxReconnectAttempts` | `Infinity` | Give up after N attempts |
| `onConnect` | — | Called on each successful connection |
| `onDisconnect` | — | Called on disconnect with `CloseEvent` |
| `onError` | — | Called on connection error |

### Wire Transport → RealtimeBridge → RuntimeBridge

```ts
const ws = createWebSocketBridge({ url: "wss://..." });
await ws.connect();

// Wrap as RuntimeBridge
const realtimeBridge = createRealtimeBridge(ws);
```

### Message envelope

All WebSocket messages are JSON-framed as `{ channel: string, payload: unknown }`.

Inbound channels handled by `createRealtimeBridge`:
- `"host.event"` → delivered as `HostEvent` to subscribers
- `"player.message"` → delivered as `{ type: "player.message", payload, source: "realtime" }`

Outbound from `bridge.emit(name, payload)` → sends `{ channel: "runtime.emit", payload: { name, payload } }`

---

## createRealtimeBridge

Wraps a `RealtimeBridge` transport into a `RuntimeBridge`. Handles `subscribe` and `emit` only — does **not** implement `request`, `getSession`, or snapshot handlers.

```ts
import { createRealtimeBridge } from "@al8b/runtime-realtime";

const rtBridge = createRealtimeBridge(ws);
// rtBridge.subscribe — receives HostEvents from server
// rtBridge.emit — forwards game events to server
```

---

## composeBridge

Merges multiple `RuntimeBridge` objects into one with explicit precedence rules.

```ts
import { composeBridge } from "@al8b/runtime";
import { createRealtimeBridge } from "@al8b/runtime-realtime";
import { createHttpBridge } from "@al8b/http-bridge";

const bridge = composeBridge(
  createRealtimeBridge(ws),                              // subscribe + emit
  createHttpBridge({ baseUrl: "https://api.com" }),      // request
  {
    getSession: () => fetchSession(),
    saveSnapshot: (snap, meta) => saveToCloud(snap, meta),
    loadSnapshot: (meta) => loadFromCloud(meta),
  },
);
```

### Precedence rules

| Field | Rule | Reason |
|---|---|---|
| `request` | **Rightmost** wins | Last declared bridge handles requests |
| `emit` | **Fanout** — all bridges receive it | Every bridge gets every emit |
| `subscribe` | **Merge** — all incoming events combined | All event sources are unified |
| `getSession` | **Leftmost** wins | First declared session source wins |
| `saveSnapshot` | **Leftmost** wins | |
| `loadSnapshot` | **Leftmost** wins | |

---

## Composing Bridges (Full Example)

```ts
import { createRuntime, composeBridge } from "@al8b/runtime";
import { createWebSocketBridge, createRealtimeBridge } from "@al8b/runtime-realtime";
import { createHttpBridge } from "@al8b/http-bridge";

// 1. Connect WebSocket
const ws = createWebSocketBridge({ url: "wss://realtime.mygame.com" });
await ws.connect();

// 2. Compose all capabilities
const bridge = composeBridge(
  createRealtimeBridge(ws),
  createHttpBridge({
    baseUrl: "https://api.mygame.com",
    endpoints: { "scores.save": "/scores" },
    defaults: { headers: { Authorization: `Bearer ${token}` } },
  }),
  {
    getSession: async () => {
      const res = await fetch("/api/me");
      return res.json();
    },
  },
);

// 3. Create runtime
const runtime = createRuntime({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  sources: { "main.ls": gameSource },
  bridge,
  listener: {
    onHostEmit: (name, payload) => {
      if (name === "score_updated") updateUI(payload);
    },
  },
});

await runtime.start();
```
