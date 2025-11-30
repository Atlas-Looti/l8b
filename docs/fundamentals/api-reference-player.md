# Player API

Access Farcaster player information and context.

## Properties

| Property             | Type      | Description                                      |
| -------------------- | --------- | ------------------------------------------------ |
| `player.fid`         | `number`  | Farcaster ID (0 if not in Mini App)              |
| `player.username`    | `string?` | Username (undefined if not available)            |
| `player.displayName` | `string?` | Display name (undefined if not available)        |
| `player.pfpUrl`      | `string?` | Profile picture URL (undefined if not available) |

## Methods

### `player.getFid()`

Returns the Farcaster ID of the current user.

```lua
local fid = player.getFid()
print("FID: " .. fid)
```

### `player.getUsername()`

Returns the username of the current user.

```lua
local username = player.getUsername()
if username then
  print("Username: " .. username)
end
```

### `player.getDisplayName()`

Returns the display name of the current user.

```lua
local displayName = player.getDisplayName()
if displayName then
  print("Welcome, " .. displayName)
end
```

### `player.getPfpUrl()`

Returns the profile picture URL of the current user.

```lua
local pfpUrl = player.getPfpUrl()
if pfpUrl then
  print("PFP: " .. pfpUrl)
end
```

### `player.getContext()`

Returns the complete player context including location information.

```lua
local context = player.getContext()
print("FID: " .. context.fid)

if context.location then
  if context.location.type == "cast_embed" then
    local cast = context.location.cast
    print("Opened from cast: " .. cast.text)
  end
end
```

### `player.isInMiniApp()`

Checks if the game is running in a Farcaster Mini App.

```lua
if player.isInMiniApp() then
  print("Running in Farcaster Mini App")
  local fid = player.getFid()
  print("FID: " .. fid)
else
  print("Running outside Mini App")
end
```

For complete Player API documentation, see [@l8b/player README](https://github.com/Atlas-Looti/l8b2/blob/mainhttps://github.com/Atlas-Looti/l8b2/blob/main/packages/core/player/README.md).
