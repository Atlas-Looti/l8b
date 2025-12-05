# EVM API

Interact with Ethereum smart contracts using viem.

## Methods

### `evm.read(contractAddress, abi, functionName, args?)`

Reads from a smart contract (view function, no transaction).

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

await(readContract())
```

### `evm.write(contractAddress, abi, functionName, args?)`

Writes to a smart contract (state-changing, sends transaction).

```lua
async function writeContract()
  local contractAddress = "0x..."
  local contractAbi = { ... }

  local hash = await evm.write(contractAddress, contractAbi, "setName", {"NewName"})
  print("Transaction hash: " .. hash)
end

await(writeContract())
```

### `evm.call(contractAddress, abi, functionName, args?)`

Simulates a contract call (no transaction, returns result).

```lua
async function simulateCall()
  local contractAddress = "0x..."
  local contractAbi = { ... }

  local result = await evm.call(contractAddress, contractAbi, "calculate", {100, 200})
  print("Result: " .. result)
end

await(simulateCall())
```

### `evm.getBalance(address?)`

Gets the balance of an address (or current wallet if no address provided).

```lua
async function checkBalance()
  local balanceWei = await evm.getBalance()
  local balanceEth = evm.formatEther(balanceWei)
  print("Balance: " .. balanceEth .. " ETH")
end

await(checkBalance())
```

### `evm.formatEther(value)`

Formats a value from wei to ether.

```lua
local balanceWei = "1000000000000000000" -- 1 ETH in wei
local balanceEth = evm.formatEther(balanceWei)
print(balanceEth) -- "1.0"
```

### `evm.parseEther(value)`

Parses a value from ether to wei.

```lua
local balanceEth = "1.5"
local balanceWei = evm.parseEther(balanceEth)
print(balanceWei) -- "1500000000000000000"
```

For complete EVM API documentation, see [@l8b/evm README](https://github.com/Atlas-Looti/l8b/blob/main/packages/core/evm/README.md).
