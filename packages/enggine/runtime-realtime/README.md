# @al8b/runtime-realtime

Realtime transport adapter for [@al8b/runtime](../runtime/README.md). Enables multiplayer and synchronization features through a pluggable realtime bridge.

## Installation

```bash
npm install @al8b/runtime-realtime @al8b/runtime
```

## Usage

Implement a `RealtimeBridge` for your chosen transport (WebSocket, WebRTC, etc.), then adapt it to the runtime:

```ts
import { createRealtimeBridge, type RealtimeBridge } from "@al8b/runtime-realtime";
import { createRuntime } from "@al8b/runtime";

// Your realtime transport implementation
const myWebSocketBridge: RealtimeBridge = {
  async connect() {
    // Connect to websocket server
  },
  async disconnect() {
    // Clean up websocket
  },
  send(channel, payload) {
    // Send message on channel
  },
  subscribe(channel, handler) {
    // Listen for messages on channel
    return () => {
      // Unsubscribe
    };
  },
};

// Adapt it to the runtime
const bridge = {
  ...createRealtimeBridge(myWebSocketBridge),
  // Optionally add other bridge capabilities
  getSession: () => getSessionFromServer(),
  saveSnapshot: (snap) => cloudSave(snap),
};

// Create runtime with realtime bridge
const runtime = createRuntime({
  sources: { /* ... */ },
  resources: { /* ... */ },
  bridge,
});

await runtime.start();
```

## API

### `createRealtimeBridge(realtime: RealtimeBridge): RuntimeBridge`

Adapts a `RealtimeBridge` to a `RuntimeBridge`.

**Event Channels:**

The adapter subscribes to these channels:
- `"host.event"` - Incoming host events (mapped to HostEvent)
- `"player.message"` - Direct player-to-host messages

Game emissions are sent on:
- `"runtime.emit"` - Game-side events (name + payload)

**Composition:**

The returned `RuntimeBridge` only implements `emit` and `subscribe`. To add other capabilities:

```ts
const bridge = {
  ...createRealtimeBridge(realtime),
  request: async (name, payload) => { /* ... */ },
  getSession: () => { /* ... */ },
  saveSnapshot: async (snap) => { /* ... */ },
  loadSnapshot: async (meta) => { /* ... */ },
};
```

### `RealtimeBridge`

Interface for a realtime transport:

```ts
export interface RealtimeBridge {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(channel: string, payload: unknown): void;
  subscribe(channel: string, handler: (payload: unknown) => void): () => void;
}
```

## Example: WebSocket Transport

```ts
import { createRealtimeBridge } from "@al8b/runtime-realtime";
import type { RealtimeBridge } from "@al8b/runtime-realtime";

class WebSocketRealtimeBridge implements RealtimeBridge {
  private ws: WebSocket | null = null;
  private subscriptions = new Map<string, Set<(payload: unknown) => void>>();

  async connect() {
    return new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket("wss://realtime.example.com");
      this.ws.onopen = () => resolve();
      this.ws.onerror = () => reject(new Error("WebSocket connection failed"));
      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const handlers = this.subscriptions.get(message.channel);
        handlers?.forEach((h) => h(message.payload));
      };
    });
  }

  async disconnect() {
    this.ws?.close();
  }

  send(channel: string, payload: unknown) {
    this.ws?.send(JSON.stringify({ channel, payload }));
  }

  subscribe(channel: string, handler: (payload: unknown) => void) {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
    }
    this.subscriptions.get(channel)!.add(handler);
    return () => {
      this.subscriptions.get(channel)?.delete(handler);
    };
  }
}

const bridge = createRealtimeBridge(new WebSocketRealtimeBridge());
```

## Multiplayer Patterns

Once integrated, games can emit realtime events:

```loot
// In LootiScript
host.emit("player.move", { x: 100, y: 50 })
host.emit("player.action", { action: "jump" })
```

The realtime bridge forwards these to the backend, which can synchronize across players.

## Notes

- The adapter is transport-agnostic; implement `RealtimeBridge` for your chosen protocol
- Channel names are conventions between your game and backend; adjust as needed
- Reliability, ordering, and backpressure handling are transport responsibilities
- Games should not assume synchronous delivery; use async request/response patterns for critical data

## Scripts

```bash
bun run build  # Build the package
bun run test   # Run tests
bun run clean  # Clean build artifacts
```
