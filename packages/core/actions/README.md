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

#### actions.signIn()

Request Sign In with Farcaster credential.

```lua
local result = await actions.signIn({
  nonce = "secure-nonce-from-server",
  acceptAuthAddress = true  -- optional, defaults to true
})
// Returns: { signature: string, message: string }
```

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

## Notes

- All actions require the app to be running in a Farcaster Mini App environment
- Actions will throw errors if called outside of a Mini App
- Use `player.isInMiniApp()` to check if actions are available before calling


