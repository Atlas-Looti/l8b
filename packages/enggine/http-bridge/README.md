# @al8b/http-bridge

A production-ready `RuntimeBridge` that connects LootiScript games to your REST API via `host.request()`.

## Why

When building multiplayer or server-authoritative games, your LootiScript game needs to fetch player data, leaderboards, inventory, and more from your backend. Previously you had to implement the entire `RuntimeBridge` interface yourself. `@al8b/http-bridge` handles this for you — zero configuration for simple cases, full customization when you need it.

## Installation

```bash
npm install @al8b/http-bridge
```

## Quick Start

```typescript
import { createHttpBridge } from "@al8b/http-bridge";
import { createRuntime } from "@al8b/runtime";

const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
});

createRuntime({
  bridge,
  sources: { main: "..." },
});
```

Now your LootiScript game can call your backend:

```lua
-- game.loot
function showProfile()
    host.request("user.getProfile", { id: session.user().id }, function(response)
        if response.ok then
            print("Welcome " + response.name);
        else
            print("Error: " + response.error);
        end
    end);
end

function update()
    -- Submit score to leaderboard (fire and forget)
    host.emit("game.score", { score: game_state.current_score });
end
```

## Endpoint Mapping

By default, `host.request("user.getProfile", ...)` calls `POST https://api.mygame.com/user.getProfile`. Use `endpoints` to map to cleaner URLs with parameter substitution:

```typescript
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  endpoints: {
    "user.getProfile":  "/users/{id}",
    "inventory.get":    "/inventory/{user_id}?slot={slot}",
    "leaderboard.get":  "/leaderboard?limit={limit}",
  },
});
```

- `{param}` tokens are replaced with values from the payload
- Unmapped requests fall back to `/{requestName}` (e.g. `"foo.bar"` → `/foo.bar`)

## Custom URL Builder

For full control over URL construction:

```typescript
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  urlBuilder: (name, payload, baseUrl) => {
    // Return an absolute URL to skip baseUrl prepending
    return `https://api.mygame.com/v2/${name}`;
    // Or return a path:
    return `/v2/${name}`;
  },
});
```

## Custom Response Handler

Transform every response before it reaches LootiScript:

```typescript
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  responseHandler: async (res, name) => {
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? `HTTP ${res.status}`);
    }
    return res.json(); // returned as { ok: true, ...data }
  },
});
```

If `responseHandler` throws, the LootiScript callback receives `{ ok: false, error: "..." }`.

## Custom Headers (Auth, etc.)

```typescript
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  defaults: {
    headers: {
      "Authorization": "Bearer " + getAuthToken(),
      "X-Game-Id":    "my-game",
    },
  },
});
```

## Logging `host.emit`

`host.emit()` calls are logged via `console.log` by default:

```
[http-bridge] game.score { score: 1250 }
```

Silence them:

```typescript
const bridge = createHttpBridge({
  baseUrl: "https://api.mygame.com",
  logEmit: () => {},  // silence
});
```

## Composition with Realtime Bridge

Combine with `@al8b/runtime-realtime` for multiplayer + backend access:

```typescript
import { createHttpBridge } from "@al8b/http-bridge";
import { createRealtimeBridge } from "@al8b/runtime-realtime";

const bridge = {
  ...createRealtimeBridge(myWebSocket),
  ...createHttpBridge({ baseUrl: "https://api.mygame.com" }),
  // realtime: emit/subscribe for real-time events
  // http: request for REST API calls
};

createRuntime({ bridge, sources: { main: "..." } });
```

## Error Handling

All responses follow the same shape:

```typescript
// Success
{ ok: true, ...data }

// HTTP error (4xx/5xx) or network error
{ ok: false, error: "User not found" }
```

Always check `response.ok` before using the data:

```lua
host.request("user.getProfile", { id: 1 }, function(response)
    if response.ok then
        -- safe to use response.name, response.email, etc.
    else
        print("API Error: " + response.error);
    end
end);
```

## API Reference

### `createHttpBridge(config)`

**config.baseUrl** `string`\
Base URL for all API calls. Example: `"https://api.mygame.com"`.

**config.endpoints** `Record<string, string>`\
Optional map of request name → endpoint path. Supports `{param}` substitution from payload.

**config.defaults** `RequestInit`\
Default fetch options applied to every request (headers, credentials, etc.).

**config.urlBuilder** `(name, payload, baseUrl) => string`\
Custom URL builder. Return a full URL (with protocol) to bypass baseUrl, or a path to prepend baseUrl.

**config.responseHandler** `(response, name) => Promise<unknown>`\
Transform every response. Throw to return an error shape to LootiScript.

**config.logEmit** `(name, payload) => void`\
Logger for `host.emit()` calls. Defaults to `console.log`. Pass `() => {}` to silence.
