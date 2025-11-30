# Palette

Palette allows you to manage color palettes for your game. Useful for visual effects like palette swapping or color cycling.

## Creating Palette

```lua
// Create empty palette
palette = Palette({})

// Create with colors
palette = Palette({
  name: "Game Palette",
  colors: ["#000000", "#FF0000", "#00FF00", "#0000FF"]
})
```

## Using Palette

### `palette.get(index)`

Gets color by index. Returns hex string like `"#FF0000"`.

### `palette.getRGB(index)`

Gets color as RGB object `{r, g, b}` with values 0-255.

### `palette.set(index, color)`

Sets color at index. Color must be in hex format like `"#FF0000"`.

### `palette.add(color)`

Adds a new color to the palette and returns the new index.

### `palette.remove(index)`

Removes color at index.

### `palette.setPalette(colors)`

Replaces the entire palette with a new array of colors.

## Palette Effects

### `palette.lighten(index, amount?)`

Lightens a color. `amount` between 0-1 (default: 0.2).

### `palette.darken(index, amount?)`

Darkens a color. `amount` between 0-1 (default: 0.2).

### `palette.mix(index1, index2, ratio?)`

Mixes two colors. `ratio` between 0-1 (default: 0.5).

### `palette.gradient(startIndex, endIndex, steps)`

Creates a gradient array between two colors.

### `palette.findClosest(hexColor)`

Finds the index of the color closest to the given hex color.

## Utility

- `palette.size`: Number of colors in palette
- `palette.paletteName`: Palette name
- `palette.getAll()`: Get all colors as array
- `Palette.rgbToHex(r, g, b)`: Static method to convert RGB to hex string

For complete Palette API documentation, see [@l8b/palette README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/palette/README.md).
