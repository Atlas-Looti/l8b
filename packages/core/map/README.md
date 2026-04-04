# @al8b/map

**LootiScript API Binding** - Tile-based map creation and rendering.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### Map Constructor

Create a new tile map.

```lua
// Create a 10x10 map with 16x16 pixel tiles
local myMap = Map(10, 10, 16, 16)

// With sprite dictionary
local myMap = Map(10, 10, 16, 16, sprites)
```

**Parameters:**
- `width` (number) - Map width in tiles
- `height` (number) - Map height in tiles
- `block_width` (number) - Tile width in pixels
- `block_height` (number) - Tile height in pixels
- `sprites` (table, optional) - Sprite dictionary

### map.set()

Set a tile at a specific position.

```lua
// Set tile at (0, 0) to use 'grass' sprite
myMap.set(0, 0, "grass")

// Set with sprite and frame
myMap.set(5, 5, "tree:0")

// Clear a tile
myMap.set(2, 2, null)
```

**Parameters:**
- `x` (number) - Tile X position
- `y` (number) - Tile Y position
- `ref` (string or null) - Sprite reference or null to clear

### map.get()

Get the tile at a specific position.

```lua
local tile = myMap.get(0, 0)
// Returns sprite reference string or 0 if empty
```

**Parameters:**
- `x` (number) - Tile X position
- `y` (number) - Tile Y position

**Returns:** Sprite reference (string) or 0

### map.clear()

Clear all tiles in the map.

```lua
myMap.clear()
```

### map.draw()

Draw the map to a canvas context.

```lua
// Draw map at (0, 0) with size 160x160
myMap.draw(screen.context, 0, 0, 160, 160)
```

**Parameters:**
- `context` (CanvasRenderingContext2D) - Canvas context
- `x` (number) - Draw X position
- `y` (number) - Draw Y position
- `w` (number) - Draw width
- `h` (number) - Draw height

### map.update()

Force update the map's internal canvas.

```lua
myMap.update()
```

### map.loadFile()

Load map data from a JSON file.

```lua
myMap.loadFile("assets/level1.json", function()
  // Map loaded
end)
```

**Parameters:**
- `url` (string) - File URL
- `callback` (function, optional) - Called when loaded

### map.load()

Load map data from a JSON string.

```lua
local jsonData = '{"width":10,"height":10,...}'
myMap.load(jsonData, sprites)
```

**Parameters:**
- `data` (string) - JSON string
- `sprites` (table) - Sprite dictionary

### map.clone()

Create a copy of the map.

```lua
local mapCopy = myMap.clone()
```

**Returns:** New Map object

### map.copyFrom()

Copy data from another map.

```lua
myMap.copyFrom(otherMap)
```

**Parameters:**
- `map` (Map) - Source map

**Returns:** Self (for chaining)

## Properties

```lua
// Map dimensions
local w = myMap.width
local h = myMap.height

// Tile dimensions
local tw = myMap.block_width
local th = myMap.block_height

// Ready state
if myMap.ready == 1 then
  // Map is ready
end

// Needs update flag
if myMap.needs_update == 1 then
  myMap.update()
end
```

## Helper Functions

### loadMap()

Load a map from a URL.

```lua
local myMap = loadMap("assets/level1.json", sprites, function()
  // Map loaded
end)
```

**Parameters:**
- `url` (string) - File URL
- `sprites` (table, optional) - Sprite dictionary
- `callback` (function, optional) - Called when loaded

**Returns:** Map object

### updateMap()

Update an existing map with new data.

```lua
updateMap(myMap, jsonData, sprites)
```

**Parameters:**
- `map` (Map) - Map to update
- `data` (string) - JSON string
- `sprites` (table, optional) - Sprite dictionary

**Returns:** Updated map

### saveMap()

Save map data to JSON string.

```lua
local jsonData = saveMap(myMap)
```

**Parameters:**
- `map` (Map) - Map to save

**Returns:** JSON string

## Sprite References

Tiles reference sprites by name with optional frame:

```lua
// Simple reference
myMap.set(0, 0, "grass")

// With frame number
myMap.set(1, 1, "tree:0")
myMap.set(2, 2, "tree:1")

// Animated tiles use sprite FPS
myMap.set(3, 3, "water")  // Will animate if 'water' has multiple frames
```

## Example Usage

```lua
// Create a 20x15 map with 16x16 tiles
local map = Map(20, 15, 16, 16)

// Fill with grass
for y = 0, 14 do
  for x = 0, 19 do
    map.set(x, y, "grass")
  end
end

// Add some trees
map.set(5, 5, "tree")
map.set(10, 8, "tree")

// Add water
for x = 0, 19 do
  map.set(x, 0, "water")
end

// Draw the map
function draw()
  screen.clear("#000")
  map.draw(screen.context, 0, 0, 320, 240)
end
```
