# Wallet API

Interact with the user's Ethereum wallet in Farcaster Mini Apps.

## Methods

### `wallet.isConnected()`

Checks if the wallet is connected.

```lua
if wallet.isConnected() then
  print("Wallet is connected")
else
  print("Wallet is not connected")
end
```

### `wallet.connect()`

Connects to the user's wallet. Shows a connection prompt.

```lua
async function init()
  if not wallet.isConnected() then
    await wallet.connect()
    print("Wallet connected!")
  end
end

await(init())
```

### `wallet.getAddress()`

Gets the current wallet address.

```lua
async function getWallet()
  local address = await wallet.getAddress()
  if address then
    print("Address: " .. address)
  else
    print("No wallet connected")
  end
end

await(getWallet())
```

### `wallet.getChainId()`

Gets the current chain ID.

```lua
async function getChain()
  local chainId = await wallet.getChainId()
  print("Chain ID: " .. chainId)
end

await(getChain())
```

### `wallet.sendTransaction(tx)`

Sends a transaction. Shows a transaction confirmation prompt.

```lua
async function sendEth()
  local tx = {
    to = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    value = "100000000000000000", -- 0.1 ETH in wei
  }
  local hash = await wallet.sendTransaction(tx)
  print("Transaction sent: " .. hash)
end

await(sendEth())
```

### `wallet.signMessage(message)`

Signs a message with the connected wallet.

```lua
async function sign()
  local message = "Hello, Farcaster!"
  local signature = await wallet.signMessage(message)
  print("Signature: " .. signature)
end

await(sign())
```

### `wallet.sendBatch(txs)`

Send multiple transactions in a single batch (EIP-5792). This allows operations like "approve and swap" in one user confirmation.

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
  // Returns: array of transaction hashes
  print("Batch sent: " .. result[1] .. ", " .. result[2])
end

await(batchApproveAndSwap())
```

### `wallet.switchChain(chainId)`

Switch to a different Ethereum chain.

```lua
async function switchToBase()
  await wallet.switchChain(8453)  // Base mainnet
  print("Switched to Base")
end

await(switchToBase())
```

### `wallet.waitForTx(hash)`

Wait for a transaction to be confirmed.

```lua
async function sendAndWait()
  local hash = await wallet.sendTransaction({
    to = "0x...",
    value = "100000000000000000"
  })

  await wallet.waitForTx(hash)
  print("Transaction confirmed!")
end

await(sendAndWait())
```

### `wallet.onAccountsChanged(callback)`

Listen for account changes (e.g., user switches wallet).

```lua
wallet.onAccountsChanged(function(accounts)
  if #accounts > 0 then
    print("Account changed to: " .. accounts[1])
  else
    print("Wallet disconnected")
  end
end)
```

### `wallet.onChainChanged(callback)`

Listen for chain changes.

```lua
wallet.onChainChanged(function(chainId)
  print("Chain changed to: " .. chainId)
end)
```

For complete Wallet API documentation, see [@l8b/wallet README](https://github.com/Atlas-Looti/l8b/blob/main/packages/core/wallet/README.md).
