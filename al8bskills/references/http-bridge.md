# HTTP Bridge (`@al8b/http-bridge`)

## createHttpBridge

Creates a `RuntimeBridge` that handles `host.request()` calls as HTTP POST requests.

```ts
import { createHttpBridge } from "@al8b/http-bridge";

const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
});

createRuntime({ bridge, sources: { "main.ls": src } });
```

### HttpBridgeConfig

| Field | Type | Description |
|---|---|---|
| `baseUrl` | `string` | Base URL for all requests (required) |
| `endpoints` | `Record<string, string>` | Map request names → URL paths with `{param}` substitution |
| `defaults` | `RequestInit` | Default fetch options (headers, credentials, etc.) |
| `urlBuilder` | `(name, payload, baseUrl) => string` | Custom URL builder — overrides endpoint mapping |
| `responseHandler` | `(response: Response, name: string) => Promise<unknown>` | Custom response handler |
| `logEmit` | `(name, payload) => void` | Logger for `host.emit()` (default: `console.log`) |

### Endpoint mapping with `{param}` substitution

```ts
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  endpoints: {
    "user.getProfile": "/users/{id}",        // payload { id: 5 } → POST /users/5
    "leaderboard.get": "/leaderboard",
    "item.buy": "/shop/items/{item_id}/buy",
  },
  defaults: {
    headers: {
      Authorization: "Bearer " + token,
      "X-Game-Version": "1.0",
    },
  },
});
```

If a request name is not in `endpoints`, the path defaults to `/{requestName}`.

### Default response shape

On success: `{ ok: true, ...responseData }`
On HTTP error: `{ ok: false, error: "HTTP 404: Not Found" }` (reads `error` or `message` from JSON body)
On network error: `{ ok: false, error: "Failed to fetch" }`

### Custom response handler

```ts
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  responseHandler: async (res, name) => {
    if (res.status === 401) return { ok: false, error: "Unauthorized" };
    if (!res.ok) throw new Error(`${name} failed: ${res.status}`);
    const data = await res.json();
    return { ok: true, ...data };
  },
});
```

### LootiScript side

```lua
host.request("user.getProfile", object id = session.user().id end, function(res)
    if res.ok then
        print("Hello " + res.displayName)
    else
        print("Error: " + res.error)
    end
end)
```

---

## BridgeBuilder

Fluent builder for composing a complete RuntimeBridge. Avoids the common mistake of accidentally overwriting `emit`/`subscribe` when spreading multiple bridges together.

```ts
import { BridgeBuilder } from "@al8b/http-bridge";
import { createWebSocketBridge } from "@al8b/runtime-realtime";

const bridge = new BridgeBuilder()
  .http({
    baseUrl: "https://api.mygame.com",
    endpoints: {
      "user.profile": "/users/{id}",
      "scores.save": "/scores",
    },
    defaults: { headers: { Authorization: "Bearer " + token } },
  })
  .realtime(createWebSocketBridge({ url: "wss://realtime.mygame.com" }))
  .session(() => fetchSession())                        // async or sync
  .snapshot({
    save: (snap, meta) => saveToCloud(snap, meta),
    load: (meta) => loadFromCloud(meta),
  })
  .on("score_updated", (payload) => updateScoreUI(payload))   // named game event listener
  .on("player_died", (payload) => analytics.track("death"))   // multiple listeners OK
  .onEmit((name, payload) => console.log("[game]", name))     // catch-all emit listener
  .build();
```

### BridgeBuilder methods

| Method | Description |
|---|---|
| `.http(config)` | Configure HTTP bridge for `host.request()` |
| `.realtime(bridge)` | Attach a realtime transport (WebSocket, etc.) for `subscribe` + `emit` |
| `.session(provider)` | Static session object or `() => SessionSnapshot \| null` |
| `.snapshot({ save?, load? })` | Wire save/load handlers |
| `.on(name, handler)` | Listen for a specific event emitted by the game |
| `.onEmit(handler)` | Catch-all for any game `host.emit()` call |
| `.build()` | Returns the composed `RuntimeBridge` |

`realtime` accepts any object with `connect`, `disconnect`, `send`, `subscribe` — no direct dependency on `@al8b/runtime-realtime`.
