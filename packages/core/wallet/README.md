# @l8b/wallet

**LootiScript API Binding** - Ethereum wallet operations for Farcaster Mini Apps.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine. It provides access to the Ethereum wallet provider when running in a Farcaster Mini App environment.

## API Reference

### Connection

#### wallet.isConnected()

Check if the wallet is connected.

```lua
if wallet.isConnected() == 1 then
  // Wallet is connected
else
  // Wallet is not connected
end
```

#### wallet.connect()

Request wallet connection. This will prompt the user to connect their wallet.

```lua
await wallet.connect()
// Throws error if connection fails or user rejects
```

### Account Information

#### wallet.getAddress()

Get the current connected wallet address.

```lua
local address = await wallet.getAddress()
// Returns: string | null (Ethereum address in hex format, e.g., "0x...")
```

#### wallet.getChainId()

Get the current chain ID.

```lua
local chainId = await wallet.getChainId()
// Returns: number (e.g., 8453 for Base mainnet, 0 if not available)
```

### Transactions

#### wallet.sendTransaction()

Send a transaction to the blockchain.

```lua
local txHash = await wallet.sendTransaction({
  to: "0x...",           // Recipient address (required)
  value: "0x0",          // Amount in wei (hex string, optional)
  data: "0x...",         // Transaction data (hex string, optional)
  gas: "0x5208",         // Gas limit (hex string, optional)
  gasPrice: "0x3b9aca00" // Gas price (hex string, optional)
})
// Returns: string (transaction hash)
// Throws error if transaction fails or user rejects
```

**Transaction Request Object:**
- `to` (string, required): Recipient Ethereum address
- `value` (string, optional): Amount to send in wei (as hex string, e.g., "0x2386f26fc10000" for 0.01 ETH)
- `data` (string, optional): Transaction data (for contract calls)
- `gas` (string, optional): Gas limit (as hex string)
- `gasPrice` (string, optional): Gas price in wei (as hex string)

#### wallet.signMessage()

Sign a message with the connected wallet.

```lua
local signature = await wallet.signMessage("Hello, World!")
// Returns: string (signature in hex format)
// Throws error if signing fails or user rejects
```

### Event Handlers

> **Note**: Event handlers are primarily for internal use. In LootiScript, you typically check connection state and account information when needed rather than using event callbacks.

#### wallet.onAccountsChanged()

Listen for account changes (internal use).

```lua
// Note: This is primarily for internal use
wallet.onAccountsChanged(function(accounts)
  // accounts is an array of connected addresses
  print("Accounts changed: " .. accounts[1])
end)
```

#### wallet.onChainChanged()

Listen for chain changes (internal use).

```lua
// Note: This is primarily for internal use
wallet.onChainChanged(function(chainId)
  print("Chain changed to: " .. chainId)
end)
```

## Example Usage

### Basic Wallet Connection

```lua
function init()
  // Check if wallet is already connected
  if wallet.isConnected() == 0 then
    print("Wallet not connected")
  end
end

async function connectWallet()
  try
    await wallet.connect()
    local address = await wallet.getAddress()
    print("Connected: " .. address)
  catch (error)
    print("Connection failed: " .. error)
  end
end
```

### Sending a Transaction

```lua
async function sendPayment()
  // Ensure wallet is connected
  if wallet.isConnected() == 0 then
    await wallet.connect()
  end
  
  local address = await wallet.getAddress()
  if address == null then
    print("No wallet connected")
    return
  end
  
  try
    // Send 0.01 ETH (0x2386f26fc10000 wei)
    local txHash = await wallet.sendTransaction({
      to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      value: "0x2386f26fc10000"
    })
    
    print("Transaction sent: " .. txHash)
    // Wait for confirmation (you would check transaction status separately)
  catch (error)
    print("Transaction failed: " .. error)
  end
end
```

### Signing a Message

```lua
async function signData()
  if wallet.isConnected() == 0 then
    await wallet.connect()
  end
  
  try
    local message = "Sign this message to authenticate"
    local signature = await wallet.signMessage(message)
    print("Signature: " .. signature)
  catch (error)
    print("Signing failed: " .. error)
  end
end
```

### Contract Interaction

```lua
async function callContract()
  if wallet.isConnected() == 0 then
    await wallet.connect()
  end
  
  // For contract interactions, use evm.write() or evm.read()
  // wallet.sendTransaction() is for simple ETH transfers or raw contract calls
  
  try
    // Example: Call a contract function
    // You would construct the function call data separately
    local contractAddress = "0x..."
    local functionData = "0x..." // ABI-encoded function call
    
    local txHash = await wallet.sendTransaction({
      to: contractAddress,
      data: functionData,
      value: "0x0" // No ETH sent
    })
    
    print("Contract call transaction: " .. txHash)
  catch (error)
    print("Contract call failed: " .. error)
  end
end
```

### Checking Chain ID

```lua
async function checkNetwork()
  local chainId = await wallet.getChainId()
  
  if chainId == 8453 then
    print("Connected to Base mainnet")
  elseif chainId == 84532 then
    print("Connected to Base Sepolia testnet")
  else
    print("Connected to chain: " .. chainId)
  end
end
```

## Value Conversion

When sending transactions, you need to convert ETH amounts to wei (hex format):

```lua
// Helper function to convert ETH to wei hex string
function ethToWeiHex(ethAmount)
  // 1 ETH = 10^18 wei
  // For simplicity, you might use evm.parseEther() instead
  local wei = ethAmount * 1000000000000000000
  return "0x" .. string.format("%x", wei)
end

// Or use evm.parseEther() utility
local weiHex = evm.parseEther("0.01") // Returns wei as string
// Then convert to hex if needed for wallet.sendTransaction()
```

## Error Handling

All async methods can throw errors. Always use try-catch:

```lua
async function safeWalletOperation()
  try
    await wallet.connect()
    local address = await wallet.getAddress()
    
    if address == null then
      print("No address available")
      return
    end
    
    // Perform wallet operations
  catch (error)
    // Handle errors:
    // - "Wallet not available" - Not in Mini App environment
    // - "User rejected" - User cancelled the operation
    // - "Transaction failed" - Transaction was rejected or failed
    print("Error: " .. error)
  end
end
```

## Notes

- All async methods return Promises and should be awaited
- When not in a Farcaster Mini App environment, wallet operations will fail
- The wallet provider is automatically initialized when first accessed
- Transaction hashes are returned immediately; you need to check transaction status separately
- Gas estimation is typically handled automatically by the wallet provider
- For contract interactions, consider using `evm.read()`, `evm.write()`, and `evm.call()` for better type safety
