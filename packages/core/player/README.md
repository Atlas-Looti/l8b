# @l8b/player

**LootiScript API Binding** - Farcaster player context and information for Mini Apps.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine. It provides access to Farcaster player information when running in a Farcaster Mini App environment.

## API Reference

### Properties

```lua
// Player FID (Farcaster ID)
local fid = player.fid

// Player username
local username = player.username

// Player display name
local displayName = player.displayName

// Player profile picture URL
local pfpUrl = player.pfpUrl
```

### Methods

#### player.getFid()

Get the player's Farcaster ID.

```lua
local fid = player.getFid()
// Returns: number (FID, or 0 if not in Mini App)
```

#### player.getUsername()

Get the player's username.

```lua
local username = player.getUsername()
// Returns: string | undefined
```

#### player.getDisplayName()

Get the player's display name.

```lua
local displayName = player.getDisplayName()
// Returns: string | undefined
```

#### player.getPfpUrl()

Get the player's profile picture URL.

```lua
local pfpUrl = player.getPfpUrl()
// Returns: string | undefined
```

#### player.getContext()

Get the full player context object.

```lua
local context = player.getContext()
// Returns: PlayerContext object with:
//   - fid: number
//   - username?: string
//   - displayName?: string
//   - pfpUrl?: string
//   - location?: Location object
//   - client: Client object
```

The context includes location information about how the Mini App was opened:

- `cast_embed` - Opened from a cast embed
- `cast_share` - Opened from a cast share
- `notification` - Opened from a notification
- `launcher` - Opened from the launcher
- `channel` - Opened from a channel
- `open_miniapp` - Opened via open_miniapp action

#### player.isInMiniApp()

Check if the game is running in a Farcaster Mini App environment.

```lua
if player.isInMiniApp() == 1 then
  // Running in Mini App
else
  // Running in standalone mode
end
```

## Example Usage

```lua
function init()
  // Check if in Mini App
  if player.isInMiniApp() == 1 then
    print("Welcome, " .. (player.getDisplayName() or player.getUsername() or "Player"))
    print("FID: " .. player.getFid())
  else
    print("Running in standalone mode")
  end
end

function update()
  // Access player properties
  local fid = player.fid
  local username = player.username
  
  // Get full context for advanced usage
  local context = player.getContext()
  if context.location then
    if context.location.type == "cast_embed" then
      // Handle cast embed context
      local cast = context.location.cast
      if cast then
        print("Opened from cast: " .. cast.text)
      end
    end
  end
end

function draw()
  // Display player info
  screen.setFont("BitCell")
  screen.setColor("#FFFFFF")
  
  if player.isInMiniApp() == 1 then
    screen.drawText("Player: " .. (player.getDisplayName() or player.getUsername() or "Unknown"), 10, 10, 12)
    screen.drawText("FID: " .. player.getFid(), 10, 30, 12)
    
    // Display profile picture if available
    if player.pfpUrl then
      // Note: You would need to load the image first using Assets
      // local pfp = Assets.loadImage(player.pfpUrl)
      // screen.drawImage(pfp, 10, 50, 64, 64)
    end
  else
    screen.drawText("Standalone Mode", 10, 10, 12)
  end
end
```

## Context Structure

The `getContext()` method returns a `PlayerContext` object with the following structure:

```lua
{
  fid: number,                    // Farcaster ID
  username?: string,               // Username
  displayName?: string,            // Display name
  pfpUrl?: string,                 // Profile picture URL
  location?: {                     // How the Mini App was opened
    type: "cast_embed" | "cast_share" | "notification" | "launcher" | "channel" | "open_miniapp",
    cast?: {                       // If opened from a cast
      author: {
        fid: number,
        username?: string,
        displayName?: string,
        pfpUrl?: string
      },
      hash: string,
      text: string,
      timestamp?: number,
      parentHash?: string,
      parentFid?: number
    },
    notification?: {               // If opened from a notification
      notificationId: string,
      title: string,
      body: string
    },
    channel?: {                    // If opened from a channel
      key: string,
      name: string,
      imageUrl?: string
    },
    referrerDomain?: string        // If opened via open_miniapp
  },
  client: {
    platformType?: "web" | "mobile",
    clientFid: number,
    added: boolean
  }
}
```

## Notes

- When not running in a Farcaster Mini App environment, `fid` will be `0` and other properties will be `undefined`
- The `isInMiniApp()` method can be used to check if player context is available
- All methods are synchronous except for internal initialization, which happens automatically
- The context is cached after first access for performance
