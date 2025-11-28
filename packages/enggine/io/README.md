# @l8b/io

IO and Storage utilities for the L8B Engine.

## Features

- **StorageService**: localStorage wrapper with automatic serialization, batched writes, and caching

---

## For Game Developers (LootiScript)

### storage

Global object for persistent data storage in your game.

#### storage.get()

Get a value from storage.

```lua
// Get stored value
local playerName = storage.get("player_name")
local highScore = storage.get("high_score")

// Returns null if key doesn't exist
local data = storage.get("nonexistent")  // null
```

**Parameters:**
- `name` (string) - Storage key

**Returns:** Stored value or null

#### storage.set()

Store a value (automatically saved).

```lua
// Store simple values
storage.set("player_name", "Alice")
storage.set("high_score", 1000)
storage.set("level", 5)

// Store objects
storage.set("player_data", {
  name = "Alice",
  level = 5,
  gold = 250
})

// Store arrays
storage.set("inventory", {"sword", "shield", "potion"})
```

**Parameters:**
- `name` (string) - Storage key
- `value` (any) - Value to store (automatically serialized)

#### storage.clear()

Clear all stored data for your game.

```lua
// Clear all storage
storage.clear()
```

### Example Usage

```lua
// Save game state
function saveGame()
  storage.set("player_x", player.x)
  storage.set("player_y", player.y)
  storage.set("score", score)
  storage.set("level", currentLevel)
  
  Console.log("Game saved!")
end

// Load game state
function loadGame()
  local savedX = storage.get("player_x")
  local savedY = storage.get("player_y")
  
  if savedX != null then
    player.x = savedX
    player.y = savedY
    score = storage.get("score")
    currentLevel = storage.get("level")
    
    Console.log("Game loaded!")
  else
    Console.log("No save data found")
  end
end

// Reset progress
function resetProgress()
  storage.clear()
  Console.log("Progress reset!")
end
```

---

## For Engine Developers (TypeScript)

### Installation

```bash
npm install @l8b/io
```

### Usage

```typescript
import { StorageService } from '@l8b/io';

// Create a storage service with a namespace
const storage = new StorageService('/my-app');

// Store values (batched write)
storage.set('player-name', 'Alice');
storage.set('score', 1000);

// Get values
const name = storage.get('player-name'); // 'Alice'
const score = storage.get('score'); // 1000

// Flush pending writes immediately
storage.flush();

// Clear all storage for this namespace
storage.clear();
```

### API

#### `StorageService`

##### Constructor

```typescript
new StorageService(namespace?: string, preserve?: boolean)
```

- `namespace`: Storage namespace prefix (default: `/l8b`)
- `preserve`: If `false`, clears existing storage on creation (default: `false`)

##### Methods

- `get(name: string): any` - Get value from storage
- `set(name: string, value: any): void` - Set value in storage (batched)
- `flush(): void` - Flush pending writes to localStorage immediately
- `check(): void` - Check and flush if there are pending writes
- `clear(): void` - Clear all storage for this namespace
- `getInterface()` - Get a simplified interface for game code

---

## Storage Details

### Automatic Serialization

Values are automatically serialized to JSON:

```lua
// Objects are serialized
storage.set("config", {
  volume = 0.8,
  difficulty = "hard"
})

// Retrieved as object
local config = storage.get("config")
Console.log(config.volume)  // 0.8
```

### Namespacing

Each game has its own storage namespace to prevent conflicts:

```lua
// Your game's data is isolated
storage.set("score", 100)

// Won't conflict with other games using l8b
```

### Persistence

Data persists across browser sessions:

```lua
// Save before closing
storage.set("checkpoint", 5)

// Load after reopening browser
local checkpoint = storage.get("checkpoint")  // Still 5
```

---

## Future Extensions

This package is designed to accommodate future IO helpers such as:
- File loading utilities
- Logging services
- Network request helpers
