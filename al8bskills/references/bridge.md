# RuntimeBridge

The bridge connects the game engine to the host app's backend. Pass it to `createRuntime({ bridge })`. All fields are optional — only implement what you need.

## Interface

```ts
interface RuntimeBridge {
  // Game called host.request(name, payload, cb) — make an API call
  request?<TResponse = unknown>(
    name: string,
    payload?: unknown
  ): Promise<TResponse> | TResponse;

  // Game called host.emit(name, payload) — fire a game event
  emit?(name: string, payload?: unknown): void;

  // Runtime calls subscribe to receive HostEvents pushed from server
  subscribe?(handler: (event: HostEvent) => void): (() => void) | void;

  // Return current session context (user, player, game, room)
  getSession?(): Promise<RuntimeSessionSnapshot | null> | RuntimeSessionSnapshot | null;

  // Game called memory.save(meta, cb)
  saveSnapshot?(snapshot: RuntimeSnapshot, meta?: RuntimeSnapshotMeta): Promise<void> | void;

  // Game called memory.load(meta, cb)
  loadSnapshot?(meta?: RuntimeSnapshotMeta): Promise<RuntimeSnapshot | null> | RuntimeSnapshot | null;
}
```

## Minimal Custom Bridge

```ts
const bridge: RuntimeBridge = {
  request: async (name, payload) => {
    const res = await fetch(`/api/${name}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
  emit: (name, payload) => {
    console.log("[game emit]", name, payload);
  },
};
```

## HostEvent

```ts
interface HostEvent {
  type: string;
  payload?: unknown;
  requestId?: string;
  source?: "host" | "backend" | "realtime";
}
```

### Built-in HostEvent types (inject via `runtime.sendHostEvent`)

| `type` | Effect |
|---|---|
| `"session.update"` | Merge `payload` into current session snapshot |
| `"runtime.reset"` | Reset the runtime (payload = `RuntimeResetOptions`) |
| `"runtime.import_snapshot"` | Restore game state from `payload` (RuntimeSnapshot) |
| `"runtime.export_snapshot"` | Triggers emit of `"runtime.snapshot"` with current state |
| `"runtime.stop"` / `"runtime.pause"` | Stop the game |
| `"runtime.resume"` | Resume after stop |

## Session

The session gives LootiScript access to user/player/game/room context.

```ts
// Provide at startup
createRuntime({ initialSession: { user: { id: "u1", displayName: "Alice" } } });

// Update at runtime — sends HostEvent "session.update"
runtime.sendHostEvent({
  type: "session.update",
  payload: {
    user: { id: "u1", displayName: "Alice", roles: ["admin"] },
    player: { id: "p1", name: "Alice", slot: "1" },
    game: { id: "g1", slug: "my-game", version: "1.0" },
    room: { id: "r1", role: "host" },
  },
});
```

```ts
interface RuntimeSessionSnapshot {
  user?: { id: string; displayName?: string; roles?: string[]; metadata?: Record<string, unknown> } | null;
  player?: { id: string; name?: string; slot?: string; metadata?: Record<string, unknown> } | null;
  game?: { id: string; slug?: string; version?: string } | null;
  room?: { id: string; role?: string; metadata?: Record<string, unknown> } | null;
}
```

## Snapshots

Wire save/load to keep game progress in cloud or localStorage:

```ts
const bridge: RuntimeBridge = {
  saveSnapshot: async (snapshot, meta) => {
    await db.save(userId, meta?.slot ?? "auto", JSON.stringify(snapshot));
  },
  loadSnapshot: async (meta) => {
    const raw = await db.load(userId, meta?.slot ?? "auto");
    return raw ? JSON.parse(raw) : null;
  },
};
```

```ts
interface RuntimeSnapshotMeta {
  slot?: string;
  label?: string;
  metadata?: Record<string, unknown>;
}
```
