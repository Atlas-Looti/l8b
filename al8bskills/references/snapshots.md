# Snapshots & Persistence

## What is Saved

A snapshot serializes all **LootiScript global variables** — any value stored at the top level of a `.ls` file persists in a snapshot.

**Not included in snapshots:**
- Game system state: `events`, `tween`, `fsm`, `physics`, `camera`, `particles` — these reset on restart
- Audio playback state
- Canvas/screen state

## Host API

```ts
// Export current state to a plain JSON-serializable object
const snapshot = runtime.exportSnapshot();
// { version: 1, global: {...}, session: {...}, system: { updateRate: 60 } }

// Store anywhere
localStorage.setItem("save", JSON.stringify(snapshot));
await cloudStorage.save(userId, snapshot);

// Restore
const snapshot = JSON.parse(localStorage.getItem("save")!);
await runtime.importSnapshot(snapshot);
```

## LootiScript API

```lua
-- Save (delegates to bridge.saveSnapshot)
memory.save({ slot = "auto" }, function(res)
    if res.ok then
        print("Game saved!")
    else
        print("Save failed: " + res.error)
    end
end)

-- Load (delegates to bridge.loadSnapshot + restores state)
memory.load({ slot = "slot1" }, function(res)
    if res.ok then
        print("Game loaded!")
    end
end)

-- Export/import as LootiScript tables (in-memory, no bridge needed)
local snap = memory.export()
memory.import(snap)

-- Full restart, wipes all global state
memory.reset()
memory.reset({ preserveStorage = true })   -- keep localStorage
```

## Wiring Save/Load to the Bridge

```ts
// Simple localStorage
const bridge: RuntimeBridge = {
  saveSnapshot: (snapshot, meta) => {
    const key = `save:${meta?.slot ?? "auto"}`;
    localStorage.setItem(key, JSON.stringify(snapshot));
  },
  loadSnapshot: (meta) => {
    const key = `save:${meta?.slot ?? "auto"}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },
};

// Cloud backend
const bridge: RuntimeBridge = {
  saveSnapshot: async (snapshot, meta) => {
    await fetch("/api/saves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: meta?.slot ?? "auto", snapshot }),
    });
  },
  loadSnapshot: async (meta) => {
    const res = await fetch(`/api/saves/${meta?.slot ?? "auto"}`);
    if (!res.ok) return null;
    const { snapshot } = await res.json();
    return snapshot;
  },
};
```

Or with BridgeBuilder:

```ts
const bridge = new BridgeBuilder()
  .http({ baseUrl: "https://api.mygame.com" })
  .snapshot({
    save: async (snap, meta) => saveToCloud(snap, meta),
    load: async (meta) => loadFromCloud(meta),
  })
  .build();
```

## RuntimeSnapshotMeta

```ts
interface RuntimeSnapshotMeta {
  slot?: string;    // save slot identifier ("auto", "slot1", etc.)
  label?: string;   // human-readable label
  metadata?: Record<string, unknown>;  // arbitrary extra data
}
```

## Runtime Reset Options

```lua
memory.reset({
    preserveStorage = true,   -- keep localStorage (default: false)
})
```

```ts
await runtime.reset({
  preserveStorage: true,
  preserveSession: true,     // keep user/player session (default: true)
  preserveSnapshot: true,    // re-import current snapshot after restart
});
```
