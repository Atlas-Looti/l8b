# @l8b/stdlib

**Standard Library** - Built-in utility functions for LootiScript.

> **Note**: This package provides standard library functions automatically available in LootiScript.

## Overview

The standard library provides utility functions for common programming tasks:

- **Math** - Mathematical operations and game utilities
- **String** - String manipulation and parsing
- **List** - Array operations and functional programming
- **JSON** - JSON encoding and decoding

## Math

Mathematical functions and game-specific utilities.

### Basic Operations

```lua
// Absolute value
local abs = math.abs(-5)  // 5

// Square root
local sqrt = math.sqrt(16)  // 4

// Rounding
local floor = math.floor(3.7)  // 3
local ceil = math.ceil(3.2)  // 4
local round = math.round(3.5)  // 4

// Min/Max
local min = math.min(5, 10, 3)  // 3
local max = math.max(5, 10, 3)  // 10
```

### Power and Logarithms

```lua
// Power
local pow = math.pow(2, 8)  // 256

// Exponential
local exp = math.exp(1)  // 2.718...

// Logarithms
local log = math.log(10)     // Natural log
local log10 = math.log10(100)  // 2
```

### Trigonometry

All angles in radians.

```lua
// Basic trig functions
local sin = math.sin(math.PI / 2)  // 1
local cos = math.cos(0)  // 1
local tan = math.tan(math.PI / 4)  // 1

// Inverse trig
local asin = math.asin(1)  // PI/2
local acos = math.acos(0)  // PI/2
local atan = math.atan(1)  // PI/4
local atan2 = math.atan2(y, x)  // Angle from origin to (x,y)
```

### Random Numbers

```lua
// Random float 0.0 to 1.0
local rand = math.random()

// Random integer (inclusive)
local dice = math.randomInt(1, 6)  // 1-6

// Random float in range
local speed = math.randomFloat(2.0, 5.0)
```

### Game Utilities

```lua
// Clamp value to range
local health = math.clamp(health, 0, 100)

// Linear interpolation
local x = math.lerp(start, end, 0.5)  // Midpoint

// Distance between points
local dist = math.distance(x1, y1, x2, y2)
local dist3d = math.distance3D(x1, y1, z1, x2, y2, z2)

// Angle between points
local angle = math.angleBetween(x1, y1, x2, y2)
```

### Angle Conversion

```lua
// Degrees to radians
local rad = math.degToRad(180)  // PI

// Radians to degrees
local deg = math.radToDeg(math.PI)  // 180
```

### Other Utilities

```lua
// Sign of number (-1, 0, or 1)
local sign = math.sign(-5)  // -1

// Euclidean modulo (handles negatives correctly)
local mod = math.mod(-1, 5)  // 4

// Constants
local pi = math.PI   // 3.14159...
local e = math.E     // 2.71828...
```

---

## String

String manipulation and parsing functions.

### Splitting and Joining

```lua
// Split string
local words = String.split("hello world", " ")
// Returns: {"hello", "world"}

// Join array
local text = String.join({"hello", "world"}, " ")
// Returns: "hello world"
```

### Trimming

```lua
// Trim whitespace
local trimmed = String.trim("  hello  ")  // "hello"
local start = String.trimStart("  hello")  // "hello"
local end = String.trimEnd("hello  ")  // "hello"
```

### Replacement

```lua
// Replace first occurrence
local text = String.replace("hello world", "world", "there")
// Returns: "hello there"

// Replace all occurrences
local text = String.replaceAll("aaa", "a", "b")
// Returns: "bbb"
```

### Searching

```lua
// Check if starts with
if String.startsWith(text, "Hello") then
  // ...
end

// Check if ends with
if String.endsWith(filename, ".png") then
  // ...
end

// Check if contains
if String.contains(text, "error") then
  // ...
end
```

### Case Conversion

```lua
// To lowercase
local lower = String.toLowerCase("HELLO")  // "hello"

// To uppercase
local upper = String.toUpperCase("hello")  // "HELLO"
```

### Character Access

```lua
// Get character at index
local char = String.charAt("hello", 0)  // "h"

// Get character code
local code = String.charCodeAt("A", 0)  // 65

// Create string from codes
local str = String.fromCharCode(72, 105)  // "Hi"
```

### Substrings

```lua
// Extract substring
local sub = String.substring("hello", 0, 3)  // "hel"

// Slice (supports negative indices)
local slice = String.slice("hello", -2)  // "lo"
```

### Finding

```lua
// Find index of substring
local index = String.indexOf("hello world", "world")  // 6

// Find last index
local last = String.lastIndexOf("hello hello", "hello")  // 6
```

### Padding and Repetition

```lua
// Repeat string
local repeated = String.repeat("ha", 3)  // "hahaha"

// Pad start
local padded = String.padStart("5", 3, "0")  // "005"

// Pad end
local padded = String.padEnd("5", 3, "0")  // "500"
```

### Parsing

```lua
// Parse integer
local num = String.parseInt("42")  // 42
local hex = String.parseInt("FF", 16)  // 255

// Parse float
local num = String.parseFloat("3.14")  // 3.14
```

### Formatting

```lua
// Format string with placeholders
local msg = String.format("Player {0} scored {1} points", name, score)
// Returns: "Player Alice scored 100 points"
```

### Length

```lua
// Get string length
local len = String.length("hello")  // 5
```

---

## List

Array operations and functional programming helpers.

### Functional Programming

```lua
// Map - transform each element
local doubled = List.map({1, 2, 3}, function(x)
  return x * 2
end)
// Returns: {2, 4, 6}

// Filter - keep elements matching condition
local evens = List.filter({1, 2, 3, 4}, function(x)
  return x % 2 == 0
end)
// Returns: {2, 4}

// Reduce - combine elements
local sum = List.reduce({1, 2, 3, 4}, function(acc, x)
  return acc + x
end, 0)
// Returns: 10

// Find - get first matching element
local found = List.find({1, 2, 3}, function(x)
  return x > 1
end)
// Returns: 2

// Find index
local index = List.findIndex({1, 2, 3}, function(x)
  return x > 1
end)
// Returns: 1

// Some - check if any element matches
local hasEven = List.some({1, 3, 5}, function(x)
  return x % 2 == 0
end)
// Returns: false

// Every - check if all elements match
local allPositive = List.every({1, 2, 3}, function(x)
  return x > 0
end)
// Returns: true
```

### Array Manipulation

```lua
// Reverse (returns new array)
local reversed = List.reverse({1, 2, 3})  // {3, 2, 1}

// Sort (returns new array)
local sorted = List.sort({3, 1, 2})  // {1, 2, 3}

// Custom sort
local sorted = List.sort(items, function(a, b)
  return a.score - b.score
end)

// Slice
local slice = List.slice({1, 2, 3, 4, 5}, 1, 3)  // {2, 3}

// Concat
local combined = List.concat({1, 2}, {3, 4})  // {1, 2, 3, 4}

// Flat - flatten nested arrays
local flat = List.flat({{1, 2}, {3, 4}})  // {1, 2, 3, 4}

// FlatMap
local result = List.flatMap({1, 2}, function(x)
  return {x, x * 2}
end)
// Returns: {1, 2, 2, 4}
```

### Searching

```lua
// Index of element
local index = List.indexOf({1, 2, 3}, 2)  // 1

// Last index of
local last = List.lastIndexOf({1, 2, 1}, 1)  // 2

// Check if includes
local has = List.includes({1, 2, 3}, 2)  // true
```

### Element Access

```lua
// Get first element
local first = List.first({1, 2, 3})  // 1

// Get last element
local last = List.last({1, 2, 3})  // 3

// Get at index (supports negative)
local item = List.at({1, 2, 3}, -1)  // 3 (last element)
```

### Mutation Methods

These modify the original array:

```lua
// Push elements
List.push(arr, 4, 5)

// Pop last element
local last = List.pop(arr)

// Shift first element
local first = List.shift(arr)

// Unshift - add to start
List.unshift(arr, 0)

// Splice - remove/insert elements
List.splice(arr, 1, 2, "a", "b")  // Remove 2 at index 1, insert "a", "b"
```

### Utilities

```lua
// Fill array with value
local filled = List.fill({1, 2, 3}, 0)  // {0, 0, 0}

// Join to string
local str = List.join({1, 2, 3}, ", ")  // "1, 2, 3"

// Get unique elements
local unique = List.unique({1, 2, 2, 3})  // {1, 2, 3}

// Shuffle array
local shuffled = List.shuffle({1, 2, 3, 4, 5})

// Chunk into groups
local chunks = List.chunk({1, 2, 3, 4, 5}, 2)
// Returns: {{1, 2}, {3, 4}, {5}}
```

### Number Array Utilities

```lua
// Sum of numbers
local sum = List.sum({1, 2, 3, 4})  // 10

// Average
local avg = List.average({1, 2, 3, 4})  // 2.5

// Minimum
local min = List.min({3, 1, 4, 2})  // 1

// Maximum
local max = List.max({3, 1, 4, 2})  // 4
```

### Length

```lua
// Get array length
local len = List.length({1, 2, 3})  // 3
```

---

## JSON

JSON encoding and decoding.

### Encoding

```lua
// Encode to JSON string
local json = JSON.encode({
  name = "Alice",
  score = 100,
  items = {"sword", "shield"}
})
// Returns: '{"name":"Alice","score":100,"items":["sword","shield"]}'
```

### Decoding

```lua
// Decode JSON string
local data = JSON.decode('{"name":"Alice","score":100}')
// Returns: {name = "Alice", score = 100}

// Returns null on error
local invalid = JSON.decode("not json")  // null
```

### Pretty Printing

```lua
// Pretty-print with indentation
local pretty = JSON.pretty({
  name = "Alice",
  score = 100
}, 2)
// Returns:
// {
//   "name": "Alice",
//   "score": 100
// }
```

---

## Example Usage

### Save/Load Game Data

```lua
// Save game state
function saveGame()
  local gameData = {
    player = {
      x = player.x,
      y = player.y,
      health = player.health
    },
    score = score,
    level = currentLevel
  }
  
  local json = JSON.encode(gameData)
  storage.set("save_data", json)
end

// Load game state
function loadGame()
  local json = storage.get("save_data")
  if json != null then
    local gameData = JSON.decode(json)
    player.x = gameData.player.x
    player.y = gameData.player.y
    player.health = gameData.player.health
    score = gameData.score
    currentLevel = gameData.level
  end
end
```

### Process High Scores

```lua
local scores = {95, 87, 92, 88, 100}

// Get top 3 scores
local sorted = List.sort(scores, function(a, b)
  return b - a  // Descending
end)
local top3 = List.slice(sorted, 0, 3)

// Calculate average
local avg = List.average(scores)

// Find highest
local highest = List.max(scores)

Console.log("Top 3: " .. List.join(top3, ", "))
Console.log("Average: " .. avg)
Console.log("Highest: " .. highest)
```

---

## For Engine Developers

This package exports TypeScript interfaces for integrating the standard library:

```typescript
import { MathLib, StringLib, ListLib, JSONLib } from '@l8b/stdlib';

// Use in VM global context
const globals = {
  math: MathLib,
  String: StringLib,
  List: ListLib,
  JSON: JSONLib,
};
```
