# Maps

## Creating Maps

```lua
map = Map(20, 15, 16, 16)  // 20x15 tiles, 16x16 pixels per tile
```

## Map Methods

- `map.set(x, y, ref)`: Set tile at position (x, y) to sprite reference
- `map.get(x, y)`: Get tile at position (x, y)
- `map.clear()`: Clear all tiles
- `map.draw(context, x, y, w, h)`: Draw map to canvas context
- `map.update()`: Force update the map's internal canvas
- `map.loadFile(url, callback?)`: Load map from JSON file
- `map.load(data, sprites)`: Load map from JSON string
- `map.clone()`: Create a copy of the map
- `map.copyFrom(map)`: Copy data from another map

## Helper Functions

- `loadMap(url, sprites?, callback?)`: Load map from URL
- `updateMap(map, data, sprites?)`: Update existing map with new data
- `saveMap(map)`: Save map data to JSON string

For complete Map API documentation, see [@l8b/map README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/map/README.md).
