# Farcaster Mini Apps

L8B is designed as a game framework for Farcaster Mini Apps, with full support for non-Mini App environments as well.

## Overview

Farcaster Mini Apps are web applications that render inside Farcaster clients. L8B provides built-in support for:

- **Player Context** - Access to Farcaster user information (FID, username, display name)
- **Wallet Integration** - Seamless Ethereum wallet operations
- **EVM Operations** - Smart contract interactions using viem
- **Embeds** - Social sharing with rich cards in feeds
- **Manifest** - App registration and discovery

## Automatic Detection

All L8B games automatically detect if they're running in a Farcaster Mini App using `sdk.isInMiniApp()`. This detection is handled automatically by the framework - no configuration needed.

When running outside a Mini App environment, all APIs gracefully fall back to safe defaults:

- **Player API**: Returns default values (fid: 0, empty context)
- **Wallet API**: Returns `null` provider, methods throw appropriate errors
- **EVM API**: Returns `null` clients, methods return safe defaults

## Player API

Access Farcaster player information:

```lua
-- Check if in Mini App
if player.isInMiniApp() then
  local fid = player.getFid()
  local username = player.getUsername()
  local displayName = player.getDisplayName()

  print("Welcome, " .. displayName .. " (FID: " .. fid .. ")")
end

-- Access player context
local context = player.getContext()
if context.location and context.location.type == "cast_embed" then
  -- App was opened from a cast
  local cast = context.location.cast
  print("Opened from cast: " .. cast.text)
end
```

See [Player API Reference](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/player/README.md) for complete documentation.

## Wallet API

Interact with the user's Ethereum wallet:

```lua
async function init()
  -- Check if wallet is connected
  if not wallet.isConnected() then
    await wallet.connect()
  end

  -- Get wallet address
  local address = await wallet.getAddress()
  print("Connected: " .. address)

  -- Get chain ID
  local chainId = await wallet.getChainId()
  print("Chain ID: " .. chainId)
end

await(init())

-- Send transaction
async function sendEth()
  local tx = {
    to = "0x...",
    value = "100000000000000000", -- 0.1 ETH in wei
  }
  local hash = await wallet.sendTransaction(tx)
  print("Transaction sent: " .. hash)
end

-- Sign message
async function sign()
  local signature = await wallet.signMessage("Hello, Farcaster!")
  print("Signature: " .. signature)
end
```

See [Wallet API Reference](https://github.com/Atlas-Looti/l8b2/blob/mainhttps://github.com/Atlas-Looti/l8b2/blob/main/packages/core/wallet/README.md) for complete documentation.

### New Wallet Methods

#### `wallet.sendBatch(calls)`

Send multiple transactions in a single batch (EIP-5792):

```lua
async function batchApproveAndSwap()
  local result = await wallet.sendBatch({
    {
      to = "0x...",      // Token contract
      data = "0x..."     // ABI-encoded approve call
    },
    {
      to = "0x...",      // DEX contract
      data = "0x..."     // ABI-encoded swap call
    }
  })
  // Returns: {hash: string, transactions: string[]}
  print("Batch hash: " .. result.hash)
end
```

#### `wallet.switchChain(chainId)`

Switch to a different Ethereum chain:

```lua
await wallet.switchChain(8453)  // Base mainnet
```

#### `wallet.waitForTx(hash, confirmations?, timeout?)`

Wait for transaction confirmation:

```lua
local hash = await wallet.sendTransaction({to = "0x...", value = "0x0"})
local result = await wallet.waitForTx(hash, 1, 60000)  // 1 confirmation, 60s timeout
if result.status == "confirmed" then
  print("Transaction confirmed in block " .. result.blockNumber)
end
```

## Actions API

Access Farcaster SDK actions for Mini Apps:

```lua
// Initialize app
function init()
  await actions.ready()  // Hide splash screen
end

// Share game result
async function shareResult(score)
  await actions.composeCast({
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

// Open another Mini App
await actions.openMiniApp({
  url = "https://example.com/miniapp"
})

// View profile
await actions.viewProfile({
  fid = 6841
})

// Token operations
await actions.swapToken({
  sellToken = "eip155:8453/erc20:0x...",
  buyToken = "eip155:8453/native",
  sellAmount = "1000000"
})
```

See [Actions API Reference](https://github.com/Atlas-Looti/l8b2/blob/mainhttps://github.com/Atlas-Looti/l8b2/blob/main/packages/core/actions/README.md) for complete documentation.

## HTTP API

Make HTTP requests to external APIs:

```lua
// GET request
async function fetchData()
  local response = await http.get("https://api.example.com/data")
  if response.ok() == 1 then
    local data = response.json()
    print("Data: " .. data.name)
  end
end

// POST request
async function saveScore(score)
  local response = await http.post("https://api.example.com/scores", {
    score = score,
    timestamp = system.time
  }, {
    headers = {
      ["Authorization"] = "Bearer " .. authToken
    }
  })

  if response.ok() == 1 then
    return response.json()
  end
end

// Using helpers
local data = await http.get("https://api.example.com/data").jsonOrNull()
if data then
  print("Success: " .. data.name)
end
```

See [HTTP API Reference](https://github.com/Atlas-Looti/l8b2/blob/mainhttps://github.com/Atlas-Looti/l8b2/blob/main/packages/core/http/README.md) for complete documentation.

## EVM API

Interact with smart contracts:

```lua
async function readContract()
  local contractAddress = "0x..."
  local contractAbi = {
    {
      "inputs": {},
      "name": "name",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    }
  }

  local name = await evm.read(contractAddress, contractAbi, "name")
  print("Contract Name: " .. name)
end

async function writeContract()
  local contractAddress = "0x..."
  local contractAbi = { ... }

  local hash = await evm.write(contractAddress, contractAbi, "setName", {"NewName"})
  print("Transaction hash: " .. hash)
end

-- Get balance
async function checkBalance()
  local balanceWei = await evm.getBalance()
  local balanceEth = evm.formatEther(balanceWei)
  print("Balance: " .. balanceEth .. " ETH")
end
```

See [EVM API Reference](https://github.com/Atlas-Looti/l8b2/blob/mainhttps://github.com/Atlas-Looti/l8b2/blob/main/packages/core/evm/README.md) for complete documentation.

### Smart Contract Bindings

L8B provides a CLI command to automatically generate typed LootiScript wrappers from smart contract ABIs:

```bash
l8b contract import 0x1234... --chain base --name MyToken
```

This will:

- Fetch the ABI from Basescan/Etherscan
- Generate a typed LootiScript wrapper at `src/contracts/MyToken.loot`
- Create read/write functions for all contract methods

**Usage:**

```lua
local MyToken = require("contracts/mytoken")

// Read from contract (no transaction)
local name = await MyToken.name()
local balance = await MyToken.balanceOf("0x...")

// Write to contract (sends transaction)
local hash = await MyToken.transfer("0x...", "1000000")
```

See [CLI Documentation](https://github.com/Atlas-Looti/l8b2/blob/main/packages/framework/cli/README.md) for complete contract import documentation.

## Publishing Your Mini App

### Manifest Configuration

Create a manifest at `/.well-known/farcaster.json` by configuring it in `l8b.config.json`:

```json
{
  "name": "My Game",
  "farcaster": {
    "manifest": {
      "accountAssociation": {
        "header": "...",
        "payload": "...",
        "signature": "..."
      },
      "miniapp": {
        "version": "1",
        "name": "My Game",
        "iconUrl": "https://example.com/icon.png",
        "homeUrl": "https://example.com",
        "imageUrl": "https://example.com/og-image.png",
        "buttonTitle": "Play",
        "splashImageUrl": "https://example.com/splash.png",
        "splashBackgroundColor": "#000000",
        "webhookUrl": "https://example.com/api/webhook",
        "description": "An awesome game built with L8B"
      }
    }
  }
}
```

The manifest is automatically generated during build and served at `/.well-known/farcaster.json`.

### Account Association

To verify domain ownership, you need to sign the manifest using the [Farcaster Mini App Manifest Tool](https://farcaster.xyz/~/developers/mini-apps/manifest).

1. Visit the manifest tool
2. Enter your domain
3. Sign the manifest
4. Copy the `accountAssociation` object
5. Add it to your `l8b.config.json`

## Social Sharing with Embeds

### Per-Route Embeds

Each route can have its own embed configuration for social sharing:

```json
{
  "farcaster": {
    "embeds": {
      "/": {
        "imageUrl": "https://example.com/home.png",
        "buttonTitle": "Play Game"
      },
      "/level/:id": {
        "dynamicImage": true,
        "ogImageFunction": "generateLevelOGImage",
        "buttonTitle": "Level"
      }
    }
  }
}
```

### Static Embeds

Use a static image URL:

```json
{
  "embeds": {
    "/": {
      "imageUrl": "https://example.com/og-image.png",
      "buttonTitle": "Start Playing"
    }
  }
}
```

### Dynamic OG Images

For dynamic routes (e.g., `/level/:id`), generate images on-demand using the Screen API:

1. **Enable dynamic images** in embed config:

   ```json
   {
     "dynamicImage": true,
     "ogImageFunction": "generateLevelOGImage"
   }
   ```

2. **Create OG image function** in LootiScript:

   ```lua
   function generateLevelOGImage(routePath, params, screen)
     -- Clear background
     screen.clear("#1a1a1a")

     -- Set color and font
     screen.setColor("#ffffff")
     screen.setFont("BitCell")

     -- Draw level info
     local levelId = params.id
     screen.drawText("Level " .. levelId, 600, 400, 48)

     -- Draw game name
     screen.setColor("#888888")
     screen.drawText("My Game", 600, 500, 24)

     -- Draw sprites or other graphics
     -- screen.drawSprite("level_badge", 100, 100)
   end
   ```

3. **Access the image** at `/og-image/:route` (e.g., `/og-image/level/5`)

The framework automatically:

- Extracts route parameters from the URL
- Calls your OG image function with the route path and parameters
- Falls back to default rendering if no function is provided
- Generates images with 3:2 aspect ratio (1200x800) as per Farcaster spec

## Embed Configuration

Each embed configuration supports:

- `imageUrl` - Static image URL (3:2 aspect ratio, max 1024 chars)
- `dynamicImage` - Enable dynamic image generation
- `ogImageFunction` - LootiScript function name for generating images
- `buttonTitle` - Button text (max 32 characters)
- `actionType` - `"launch_frame"` or `"view_token"` (default: `"launch_frame"`)
- `actionUrl` - URL to open (defaults to current page URL)
- `appName` - App name (defaults to config.name)
- `splashImageUrl` - Splash image URL (200x200px)
- `splashBackgroundColor` - Splash background color (hex)

## Example: Complete Setup

```json
{
  "name": "My Game",
  "farcaster": {
    "manifest": {
      "accountAssociation": { ... },
      "miniapp": {
        "version": "1",
        "name": "My Game",
        "iconUrl": "https://example.com/icon.png",
        "homeUrl": "https://example.com",
        "imageUrl": "https://example.com/default-og.png",
        "buttonTitle": "Play",
        "splashImageUrl": "https://example.com/splash.png",
        "splashBackgroundColor": "#000000"
      }
    },
    "embeds": {
      "/": {
        "imageUrl": "https://example.com/home.png",
        "buttonTitle": "Start"
      },
      "/game": {
        "imageUrl": "https://example.com/game.png",
        "buttonTitle": "Play"
      },
      "/level/:id": {
        "dynamicImage": true,
        "ogImageFunction": "generateLevelOGImage",
        "buttonTitle": "Level"
      }
    }
  }
}
```

## Development vs Production

### Development

- Manifest is served at `/.well-known/farcaster.json` automatically
- OG images are generated on-demand at `/og-image/:route`
- All embeds are automatically added to HTML pages

### Production

- Manifest is generated during `l8b build` and saved to `.l8b/.well-known/farcaster.json`
- OG images are generated on-demand (same as development)
- Embeds are included in production HTML

## Best Practices

1. **Always check `player.isInMiniApp()`** before using Mini App-specific features
2. **Use dynamic images** for routes with parameters to show personalized content
3. **Cache OG images** - Set appropriate cache headers for dynamic images
4. **Test embeds** - Use the [Farcaster Preview Tool](https://farcaster.xyz/~/developers/mini-apps/preview) to test your embeds
5. **Handle errors gracefully** - All APIs have fallbacks for non-Mini App environments

## Resources

- [Farcaster Mini Apps Documentation](https://miniapps.farcaster.xyz)
- [Farcaster Mini App Manifest Tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
- [Player API Reference](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/player/README.md)
- [Wallet API Reference](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/wallet/README.md)
- [EVM API Reference](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/evm/README.md)
- [Actions API Reference](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/actions/README.md)
- [HTTP API Reference](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/http/README.md)
