# Actions API

The `actions` object provides access to Farcaster SDK actions when running in a Farcaster Mini App environment.

> **Note**: All actions require the app to be running in a Farcaster Mini App. Use `player.isInMiniApp()` to check availability.

## Core Actions

### `actions.ready(options?)`

Hide the splash screen and display your app content.

```lua
await actions.ready()
// Optional: disable native gestures
await actions.ready({ disableNativeGestures = true })
```

### `actions.close()`

Close the Mini App.

```lua
await actions.close()
```

## Sharing

### `actions.share(options)`

Share content via compose cast.

```lua
await actions.share({
  text = "Check this out!",
  embeds = {"https://example.com"}
})
```

**Options:**
- `text` (string, optional): Text content
- `embeds` (array, optional): Array of embed URLs

## Authentication

### `actions.signIn(options)`

Request Sign In with Farcaster credential.

```lua
local result = await actions.signIn({
  nonce = "secure-nonce-from-server",
  acceptAuthAddress = true  -- optional, defaults to true
})
// Returns: { signature: string, message: string }
```

**Options:**
- `nonce` (string, required): Nonce from your server
- `acceptAuthAddress` (boolean, optional): Accept auth address, defaults to true

**Returns:**
- `signature` (string): Signature in hex format
- `message` (string): Message that was signed

## Mini App Management

### `actions.addMiniApp()`

Prompt the user to add the Mini App to their client.

```lua
await actions.addMiniApp()
```

### `actions.openMiniApp(options)`

Open another Mini App.

```lua
await actions.openMiniApp({
  url = "https://example.com/miniapp"
})
```

**Options:**
- `url` (string, required): URL of the Mini App to open

## Navigation

### `actions.openUrl(options)`

Open an external URL.

```lua
await actions.openUrl({
  url = "https://example.com"
})
```

**Options:**
- `url` (string, required): URL to open

### `actions.viewProfile(options)`

View a Farcaster profile.

```lua
await actions.viewProfile({
  fid = 6841
})
```

**Options:**
- `fid` (number, required): Farcaster ID

### `actions.viewCast(options)`

View a specific cast.

```lua
await actions.viewCast({
  hash = "0x1234...",
  close = false  -- optional, close app after viewing
})
```

**Options:**
- `hash` (string, required): Cast hash
- `close` (boolean, optional): Close app after viewing, defaults to false

## Token Operations

### `actions.swapToken(options)`

Open swap form with pre-filled tokens.

```lua
local result = await actions.swapToken({
  sellToken = "eip155:8453/erc20:0x...",
  buyToken = "eip155:8453/native",
  sellAmount = "1000000"
})
```

**Options:**
- `sellToken` (string, required): Token to sell (CAIP-2 format)
- `buyToken` (string, required): Token to buy (CAIP-2 format)
- `sellAmount` (string, optional): Amount to sell

### `actions.sendToken(options)`

Open send form with pre-filled token and recipient.

```lua
local result = await actions.sendToken({
  token = "eip155:8453/erc20:0x...",
  amount = "1000000",
  recipientAddress = "0x...",  -- or recipientFid
  recipientFid = 6841
})
```

**Options:**
- `token` (string, required): Token to send (CAIP-2 format)
- `amount` (string, optional): Amount to send
- `recipientAddress` (string, optional): Recipient Ethereum address
- `recipientFid` (number, optional): Recipient Farcaster ID

### `actions.viewToken(options)`

View a token.

```lua
await actions.viewToken({
  token = "eip155:8453/erc20:0x..."
})
```

**Options:**
- `token` (string, required): Token to view (CAIP-2 format)

## Social

### `actions.composeCast(options)`

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

**Options:**
- `text` (string, optional): Cast text
- `embeds` (array, optional): Array of embed URLs
- `parent` (object, optional): Parent cast or channel
  - `type` (string): "cast" or "channel"
  - `hash` (string): Cast hash (if type is "cast")
- `close` (boolean, optional): Close app after composing, defaults to false
- `channelKey` (string, optional): Channel key

## Examples

### Initialize App

```lua
function init()
  // Hide splash screen when ready
  await actions.ready()
end
```

### Share Game Result

```lua
function shareResult(score)
  await actions.composeCast({
    text = "I scored " .. score .. " points!",
    embeds = {"https://mygame.com/result/" .. score}
  })
end
```

### Sign In User

```lua
async function authenticate()
  local nonce = await fetchNonceFromServer()
  local result = await actions.signIn({ nonce = nonce })
  await sendToServer(result.signature, result.message)
end
```

### Check Availability

```lua
if player.isInMiniApp() == 1 then
  await actions.ready()
else
  print("Not running in Mini App")
end
```



