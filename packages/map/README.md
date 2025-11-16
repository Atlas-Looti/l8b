# @l8b/map

Tile map management system for l8b Game Enggine.

## Features

- Create and manage tile-based maps
- Support for animated tiles
- Load and save map data
- Efficient canvas-based rendering
- Sprite integration

## Installation

```bash
npm install @l8b/map
```

## Usage

### Creating a Map

```typescript
import { Map } from '@l8b/map';

const map = new Map(
  20,    // width in tiles
  15,    // height in tiles
  16,    // tile width in pixels
  16,    // tile height in pixels
  sprites // optional sprite dictionary
);
```

### Setting Tiles

```typescript
// Set a tile at position (x, y)
map.set(5, 10, 'grass');

// Get a tile at position (x, y)
const tile = map.get(5, 10);

// Clear all tiles
map.clear();
```

### Drawing the Map

```typescript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Draw the map
map.draw(ctx, 0, 0, canvas.width, canvas.height);
```

### Loading and Saving

```typescript
// Load a map from URL
import { loadMap } from '@l8b/map';

const map = loadMap('/maps/level1.json', sprites, () => {
  console.log('Map loaded');
});

// Save a map to JSON
import { saveMap } from '@l8b/map';

const json = saveMap(map);
```

### Cloning Maps

```typescript
// Create a copy of a map
const copy = map.clone();

// Copy data from another map
map.copyFrom(otherMap);
```

## Map Data Format

Maps are stored in JSON format:

```json
{
  "width": 20,
  "height": 15,
  "block_width": 16,
  "block_height": 16,
  "sprites": ["", "grass", "water", "stone"],
  "data": [0, 1, 1, 2, 3, ...]
}
```

## API Reference

### TileMap Class

#### Constructor

```typescript
new TileMap(
  width: number,
  height: number,
  block_width: number,
  block_height: number,
  sprites?: Record<string, Sprite>
)
```

#### Properties

- `width: number` - Map width in tiles
- `height: number` - Map height in tiles
- `block_width: number` - Tile width in pixels
- `block_height: number` - Tile height in pixels
- `sprites: Record<string, Sprite>` - Sprite dictionary
- `ready: boolean` - Whether the map is ready to use
- `needs_update: boolean` - Whether the map needs re-rendering

#### Methods

- `set(x: number, y: number, ref: string | null): void` - Set a tile
- `get(x: number, y: number): string | number | null` - Get a tile
- `clear(): void` - Clear all tiles
- `draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void` - Draw the map
- `update(): void` - Update the map rendering
- `clone(): TileMap` - Create a copy of the map
- `copyFrom(map: TileMap): TileMap` - Copy data from another map
- `load(data: string, sprites: Record<string, Sprite>): void` - Load map from JSON string
- `loadFile(url: string, loaded?: () => void): void` - Load map from URL

### Functions

- `loadMap(url: string, sprites?: Record<string, Sprite>, loaded?: () => void): TileMap` - Load a map from URL
- `saveMap(map: TileMap): string` - Save a map to JSON string
- `updateMap(map: TileMap, data: string, sprites?: Record<string, Sprite>): TileMap` - Update map with new data

## License

MIT

