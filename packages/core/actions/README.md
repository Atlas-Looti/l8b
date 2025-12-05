# @l8b/actions

**LootiScript API Binding** - Farcaster SDK actions for Mini Apps.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine. It provides access to Farcaster SDK actions when running in a Farcaster Mini App environment.

## API Reference

### Core Actions

#### actions.ready()

Hide the splash screen and display your app content.

```lua
await actions.ready()
// Optional: disable native gestures
await actions.ready(true)
```

#### actions.close()

Close the Mini App.

```lua
await actions.close()
```

### Sharing

#### actions.share()

Share content via compose cast.

```lua
await actions.share({
  text = "Check this out!",
  embeds = {"https://example.com"}
})
```

### Authentication

#### actions.quickAuth.getToken() ⭐ Recommended

Get a Quick Auth token - the **recommended authentication method** for Farcaster Mini Apps. Quick Auth is simpler than Sign In with Farcaster as it doesn't require server-side nonce management.

```lua
// Get token (cached if available and not expired)
local result = await actions.quickAuth.getToken()
local token = result.token

// Force a new token
local result = await actions.quickAuth.getToken(true)
```

**Returns:** `{ token: string }` - JWT token that can be verified on your server

**Example:**

```lua
async function authenticate()
  local result = await actions.quickAuth.getToken()
  local token = result.token

  -- Send token to your server for verification
  local response = await http.post("https://api.example.com/auth", {
    token = token
  })

  if response.ok() == 1 then
    print("Authenticated!")
  end
end
```

#### actions.quickAuth.fetch()

Make an authenticated fetch request that automatically adds the Bearer token.

```lua
-- Automatically adds Authorization: Bearer <token> header
local response = await actions.quickAuth.fetch("https://api.example.com/user")
local user = response.json()
```

**Example:**

```lua
async function fetchUserData()
  local response = await actions.quickAuth.fetch("https://api.example.com/user")

  if response.ok() == 1 then
    local user = response.json()
    print("User: " .. user.name)
  end
end
```

#### actions.quickAuth.token

Synchronous access to the current token (if available).

```lua
-- Get token synchronously (if already fetched)
local token = actions.quickAuth.token
if token then
  print("Token available: " .. token)
end
```

**Note:** This property returns `undefined` if no token has been fetched yet. Use `getToken()` to ensure a token is available.

#### actions.signIn()

Request Sign In with Farcaster credential (legacy method). For new projects, use `quickAuth` instead.

```lua
local result = await actions.signIn({
  nonce = "secure-nonce-from-server",
  acceptAuthAddress = true  -- optional, defaults to true
})
// Returns: { signature: string, message: string }
```

**When to use:** Only if you need fine-grained control over the authentication flow or are integrating with existing SIWF infrastructure.

### Mini App Management

#### actions.addMiniApp()

Prompt the user to add the Mini App to their client.

```lua
await actions.addMiniApp()
```

#### actions.openMiniApp()

Open another Mini App.

```lua
await actions.openMiniApp({
  url = "https://example.com/miniapp"
})
```

### Navigation

#### actions.openUrl()

Open an external URL.

```lua
await actions.openUrl({
  url = "https://example.com"
})
```

#### actions.viewProfile()

View a Farcaster profile.

```lua
await actions.viewProfile({
  fid = 6841
})
```

#### actions.viewCast()

View a specific cast.

```lua
await actions.viewCast({
  hash = "0x1234...",
  close = false  -- optional, close app after viewing
})
```

### Token Operations

#### actions.swapToken()

Open swap form with pre-filled tokens.

```lua
local result = await actions.swapToken({
  sellToken = "eip155:8453/erc20:0x...",
  buyToken = "eip155:8453/native",
  sellAmount = "1000000"
})
```

#### actions.sendToken()

Open send form with pre-filled token and recipient.

```lua
local result = await actions.sendToken({
  token = "eip155:8453/erc20:0x...",
  amount = "1000000",
  recipientAddress = "0x...",  -- or recipientFid
  recipientFid = 6841
})
```

#### actions.viewToken()

View a token.

```lua
await actions.viewToken({
  token = "eip155:8453/erc20:0x..."
})
```

### Social

#### actions.composeCast()

Open cast composer with suggested content.

```lua
local result = await actions.composeCast({
  text = "Check this out!",
  embeds = {"https://example.com"},
  parent = {  -- optional
    type = "cast",
    hash = "0x1234..."
  },
  close = false,  -- optional
  channelKey = "farcaster"  -- optional
})
```

## Example Usage

```lua
// Initialize app
function init()
  // Hide splash screen when ready
  actions.ready()
end

// Share game result
function shareResult(score)
  actions.composeCast({
    text = "I scored " .. score .. " points!",
    embeds = {"https://mygame.com/result/" .. score}
  })
end

// Sign in user
async function authenticate()
  local nonce = await fetchNonceFromServer()
  local result = await actions.signIn({ nonce = nonce })
  await sendToServer(result.signature, result.message)
end
```

## Quick Auth vs Sign In with Farcaster

**Quick Auth** (`actions.quickAuth`) is the **recommended** authentication method because:

- ✅ **Simpler**: No server-side nonce management required
- ✅ **Faster**: Returns JWT token directly
- ✅ **Better DX**: Less code to write and maintain
- ✅ **Automatic**: Token caching and refresh handled automatically

**Sign In with Farcaster** (`actions.signIn`) should only be used if:

- You need fine-grained control over the authentication flow
- You're integrating with existing SIWF infrastructure
- You have specific requirements that Quick Auth doesn't meet

## Notes

- All actions require the app to be running in a Farcaster Mini App environment
- Actions will throw errors if called outside of a Mini App
- Use `player.isInMiniApp()` to check if actions are available before calling
- Quick Auth tokens are automatically cached and refreshed when expired
