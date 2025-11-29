# @l8b/evm

**LootiScript API Binding** - EVM blockchain operations using viem for smart contract interactions.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine. It provides high-level functions for reading from and writing to smart contracts on EVM-compatible chains (e.g., Base, Ethereum).

## API Reference

### Contract Operations

#### evm.read()

Read data from a smart contract (view/pure functions, no transaction).

```lua
local result = await evm.read(
  "0x...",           // Contract address
  abi,               // Contract ABI (array)
  "functionName",   // Function name to call
  {arg1, arg2}      // Function arguments (optional array)
)
// Returns: any (function return value)
// Throws error if read fails
```

**Example:**
```lua
// Read token balance
local balance = await evm.read(
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC contract on Base
  [
    {
      inputs: [{name: "account", type: "address"}],
      name: "balanceOf",
      outputs: [{name: "", type: "uint256"}],
      stateMutability: "view",
      type: "function"
    }
  ],
  "balanceOf",
  {"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"}
)
// Returns: bigint (balance in smallest unit)
```

#### evm.write()

Write to a smart contract (state-changing function, sends transaction).

```lua
local txHash = await evm.write(
  "0x...",           // Contract address
  abi,               // Contract ABI (array)
  "functionName",   // Function name to call
  {arg1, arg2}      // Function arguments (optional array)
)
// Returns: string (transaction hash)
// Throws error if transaction fails or user rejects
```

**Example:**
```lua
// Transfer tokens
local txHash = await evm.write(
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC contract
  [
    {
      inputs: [
        {name: "to", type: "address"},
        {name: "amount", type: "uint256"}
      ],
      name: "transfer",
      outputs: [{name: "", type: "bool"}],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  "transfer",
  {
    "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", // recipient
    "1000000" // amount (6 decimals for USDC)
  }
)
// Returns: "0x..." (transaction hash)
```

#### evm.call()

Simulate a contract call (estimate gas, check if it would succeed, no transaction).

```lua
local result = await evm.call(
  "0x...",           // Contract address
  abi,               // Contract ABI (array)
  "functionName",   // Function name to call
  {arg1, arg2}      // Function arguments (optional array)
)
// Returns: any (simulation result with gas estimate, return value, etc.)
// Throws error if call would fail
```

**Example:**
```lua
// Simulate a transfer to check if it would succeed
local simulation = await evm.call(
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  abi,
  "transfer",
  {recipient, amount}
)
// Returns: { result: bool, request: {...}, gas: bigint, ... }
```

### Utility Functions

#### evm.getBalance()

Get the ETH balance of an address.

```lua
local balance = await evm.getBalance("0x...")
// Returns: string (balance in wei as string)
// If address not provided, uses connected wallet address
```

**Example:**
```lua
// Get balance of connected wallet
local balance = await evm.getBalance()

// Get balance of specific address
local balance = await evm.getBalance("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")

// Convert to ETH
local ethBalance = evm.formatEther(balance)
print("Balance: " .. ethBalance .. " ETH")
```

#### evm.formatEther()

Convert wei (as string) to ETH (as string).

```lua
local eth = evm.formatEther("1000000000000000000")
// Returns: "1.0" (1 ETH)
```

**Example:**
```lua
local balanceWei = await evm.getBalance()
local balanceEth = evm.formatEther(balanceWei)
print("Balance: " .. balanceEth .. " ETH")
```

#### evm.parseEther()

Convert ETH (as string) to wei (as string).

```lua
local wei = evm.parseEther("1.5")
// Returns: "1500000000000000000" (wei as string)
```

**Example:**
```lua
local amountEth = "0.1"
local amountWei = evm.parseEther(amountEth)
// Use amountWei for transactions
```

## Example Usage

### Reading Contract Data

```lua
// ERC20 Token ABI (simplified)
local erc20Abi = {
  {
    inputs: [{name: "account", type: "address"}],
    name: "balanceOf",
    outputs: [{name: "", type: "uint256"}],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{name: "", type: "uint8"}],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{name: "", type: "string"}],
    stateMutability: "view",
    type: "function"
  }
}

async function getTokenInfo()
  local tokenAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" // USDC on Base
  local userAddress = await wallet.getAddress()
  
  if userAddress == null then
    print("No wallet connected")
    return
  end
  
  try
    // Get token balance
    local balance = await evm.read(tokenAddress, erc20Abi, "balanceOf", {userAddress})
    
    // Get token decimals
    local decimals = await evm.read(tokenAddress, erc20Abi, "decimals", {})
    
    // Get token symbol
    local symbol = await evm.read(tokenAddress, erc20Abi, "symbol", {})
    
    // Format balance (divide by 10^decimals)
    local formattedBalance = balance / (10 ^ decimals)
    
    print(symbol .. " Balance: " .. formattedBalance)
  catch (error)
    print("Error reading token info: " .. error)
  end
end
```

### Writing to Contracts

```lua
async function transferTokens()
  // Ensure wallet is connected
  if wallet.isConnected() == 0 then
    await wallet.connect()
  end
  
  local tokenAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" // USDC
  local recipient = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  local amount = "1000000" // 1 USDC (6 decimals)
  
  local transferAbi = {
    {
      inputs: [
        {name: "to", type: "address"},
        {name: "amount", type: "uint256"}
      ],
      name: "transfer",
      outputs: [{name: "", type: "bool"}],
      stateMutability: "nonpayable",
      type: "function"
    }
  }
  
  try
    // First, simulate to check if it would succeed
    local simulation = await evm.call(
      tokenAddress,
      transferAbi,
      "transfer",
      {recipient, amount}
    )
    
    print("Gas estimate: " .. simulation.gas)
    
    // If simulation succeeds, send the transaction
    local txHash = await evm.write(
      tokenAddress,
      transferAbi,
      "transfer",
      {recipient, amount}
    )
    
    print("Transaction sent: " .. txHash)
    // Wait for confirmation...
  catch (error)
    print("Transfer failed: " .. error)
  end
end
```

### Checking ETH Balance

```lua
async function checkBalance()
  local address = await wallet.getAddress()
  
  if address == null then
    print("No wallet connected")
    return
  end
  
  try
    local balanceWei = await evm.getBalance(address)
    local balanceEth = evm.formatEther(balanceWei)
    
    print("Balance: " .. balanceEth .. " ETH")
    print("Balance (wei): " .. balanceWei)
  catch (error)
    print("Error getting balance: " .. error)
  end
end
```

### Sending ETH

```lua
async function sendETH()
  if wallet.isConnected() == 0 then
    await wallet.connect()
  end
  
  local recipient = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  local amountEth = "0.01"
  local amountWei = evm.parseEther(amountEth)
  
  try
    // Convert wei string to hex for wallet.sendTransaction
    // Note: wallet.sendTransaction expects hex strings
    local amountHex = "0x" .. string.format("%x", tonumber(amountWei))
    
    local txHash = await wallet.sendTransaction({
      to: recipient,
      value: amountHex
    })
    
    print("ETH sent: " .. txHash)
  catch (error)
    print("Send failed: " .. error)
  end
end
```

### Complex Contract Interaction

```lua
async function interactWithNFT()
  local nftAddress = "0x..."
  
  // ERC721 ABI (simplified)
  local erc721Abi = {
    {
      inputs: [{name: "tokenId", type: "uint256"}],
      name: "ownerOf",
      outputs: [{name: "", type: "address"}],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {name: "to", type: "address"},
        {name: "tokenId", type: "uint256"}
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  }
  
  try
    // Check NFT owner
    local tokenId = "1"
    local owner = await evm.read(nftAddress, erc721Abi, "ownerOf", {tokenId})
    print("Owner of token " .. tokenId .. ": " .. owner)
    
    // Transfer NFT (if you own it)
    local myAddress = await wallet.getAddress()
    if owner == myAddress then
      local recipient = "0x..."
      local txHash = await evm.write(
        nftAddress,
        erc721Abi,
        "transferFrom",
        {myAddress, recipient, tokenId}
      )
      print("NFT transferred: " .. txHash)
    end
  catch (error)
    print("NFT operation failed: " .. error)
  end
end
```

## ABI Format

The ABI (Application Binary Interface) is an array of function/event definitions. Each function definition includes:

```lua
{
  inputs: [
    {name: "param1", type: "uint256"},
    {name: "param2", type: "address"}
  ],
  name: "functionName",
  outputs: [{name: "", type: "bool"}],
  stateMutability: "view" | "pure" | "nonpayable" | "payable",
  type: "function"
}
```

**Common Types:**
- `address` - Ethereum address
- `uint256` - Unsigned integer (256 bits)
- `uint8` - Unsigned integer (8 bits)
- `bool` - Boolean
- `string` - String
- `bytes` - Byte array
- `bytes32` - Fixed-size byte array

## Error Handling

All async methods can throw errors:

```lua
async function safeContractCall()
  try
    local result = await evm.read(contractAddress, abi, "functionName", args)
    // Use result
  catch (error)
    // Common errors:
    // - "EVM read not available" - Not in Mini App or provider not available
    // - "Read contract failed" - Contract call failed
    // - "EVM write not available" - Wallet not connected
    // - "No account connected" - No wallet account available
    // - "Write contract failed" - Transaction failed or rejected
    print("Error: " .. error)
  end
end
```

## Notes

- All async methods return Promises and should be awaited
- `evm.read()` and `evm.call()` don't send transactions (no gas cost, read-only)
- `evm.write()` sends a transaction (requires gas, user confirmation)
- The default chain is Base (chain ID 8453)
- ABI can be obtained from contract verification on block explorers or contract source code
- For ERC20/ERC721 tokens, use standard ABIs available online
- Large numbers (uint256) are returned as BigInt or string - handle accordingly
- Always simulate transactions with `evm.call()` before sending with `evm.write()`
- Gas estimation is handled automatically by the wallet provider
