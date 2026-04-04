# @al8b/palette

**LootiScript API Binding** - Color palette management and manipulation.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### Palette Constructor

Create a new color palette.

```lua
// Create empty palette
local pal = Palette({})

// Create with colors
local pal = Palette({
  name = "My Palette",
  colors = {"#FF0000", "#00FF00", "#0000FF"}
})
```

**Parameters:**
- `options` (table) - Palette options
  - `name` (string, optional) - Palette name
  - `colors` (array, optional) - Array of hex color strings

### palette.get()

Get a color by index.

```lua
local red = pal.get(0)  // Returns "#FF0000"
local green = pal.get(1)  // Returns "#00FF00"

// Wraps around if index exceeds palette size
local color = pal.get(10)  // Returns color at index 10 % size
```

**Parameters:**
- `index` (number) - Color index

**Returns:** Hex color string (e.g., "#FF0000")

### palette.getRGB()

Get a color as RGB object.

```lua
local rgb = pal.getRGB(0)
// Returns: {r = 255, g = 0, b = 0}

local r = rgb.r
local g = rgb.g
local b = rgb.b
```

**Parameters:**
- `index` (number) - Color index

**Returns:** RGB object `{r, g, b}`

### palette.set()

Set a color at a specific index.

```lua
// Set color at index 0
pal.set(0, "#FFFFFF")

// Expands palette if index is beyond current size
pal.set(10, "#000000")  // Fills gaps with #000000
```

**Parameters:**
- `index` (number) - Color index
- `color` (string) - Hex color string

### palette.add()

Add a color to the end of the palette.

```lua
local index = pal.add("#FFFF00")  // Returns new index
```

**Parameters:**
- `color` (string) - Hex color string

**Returns:** Index of added color

### palette.remove()

Remove a color at an index.

```lua
pal.remove(2)  // Removes color at index 2
```

**Parameters:**
- `index` (number) - Color index to remove

### palette.getAll()

Get all colors in the palette.

```lua
local colors = pal.getAll()
// Returns: {"#FF0000", "#00FF00", "#0000FF"}

for i = 1, #colors do
  Console.log(colors[i])
end
```

**Returns:** Array of hex color strings

### palette.setPalette()

Replace the entire palette.

```lua
pal.setPalette({"#FF0000", "#00FF00", "#0000FF", "#FFFF00"})
```

**Parameters:**
- `colors` (array) - Array of hex color strings

### palette.reset()

Reset palette to original colors.

```lua
pal.reset()

// Or reset to specific palette data
pal.reset({
  name = "New Palette",
  colors = {"#000000", "#FFFFFF"}
})
```

**Parameters:**
- `paletteData` (table, optional) - Palette data to reset to

## Color Operations

### palette.lighten()

Create a lightened version of a color.

```lua
// Lighten color at index 0 by 20%
local lighter = pal.lighten(0, 0.2)

// Default amount is 0.2 (20%)
local lighter = pal.lighten(0)
```

**Parameters:**
- `index` (number) - Color index
- `amount` (number, optional) - Lighten amount 0.0-1.0, default: 0.2

**Returns:** Hex color string

### palette.darken()

Create a darkened version of a color.

```lua
// Darken color at index 0 by 20%
local darker = pal.darken(0, 0.2)

// Default amount is 0.2 (20%)
local darker = pal.darken(0)
```

**Parameters:**
- `index` (number) - Color index
- `amount` (number, optional) - Darken amount 0.0-1.0, default: 0.2

**Returns:** Hex color string

### palette.mix()

Mix two colors.

```lua
// Mix colors at index 0 and 1 (50/50)
local mixed = pal.mix(0, 1, 0.5)

// More of color 1 (70% color1, 30% color0)
local mixed = pal.mix(0, 1, 0.7)
```

**Parameters:**
- `index1` (number) - First color index
- `index2` (number) - Second color index
- `ratio` (number, optional) - Mix ratio 0.0-1.0, default: 0.5

**Returns:** Hex color string

### palette.gradient()

Create a gradient between two colors.

```lua
// Create 5-step gradient from color 0 to color 1
local colors = pal.gradient(0, 1, 5)
// Returns: {"#FF0000", "#BF3F00", "#7F7F00", "#3FBF00", "#00FF00"}

for i = 1, #colors do
  Console.log(colors[i])
end
```

**Parameters:**
- `startIndex` (number) - Start color index
- `endIndex` (number) - End color index
- `steps` (number) - Number of gradient steps

**Returns:** Array of hex color strings

### palette.findClosest()

Find the closest color in the palette to a target color.

```lua
// Find closest color to red
local index = pal.findClosest("#FF0010")
```

**Parameters:**
- `targetHex` (string) - Target hex color

**Returns:** Index of closest color

## Static Methods

### Palette.rgbToHex()

Convert RGB values to hex color.

```lua
local hex = Palette.rgbToHex(255, 128, 0)
// Returns: "#FF8000"
```

**Parameters:**
- `r` (number) - Red value 0-255
- `g` (number) - Green value 0-255
- `b` (number) - Blue value 0-255

**Returns:** Hex color string

## Properties

```lua
// Palette size
local count = pal.size

// Palette name
local name = pal.paletteName
```

## Example Usage

```lua
// Create a palette
local pal = Palette({
  name = "Game Palette",
  colors = {
    "#000000",  // Black
    "#FFFFFF",  // White
    "#FF0000",  // Red
    "#00FF00",  // Green
    "#0000FF"   // Blue
  }
})

// Use colors
screen.setColor(pal.get(2))  // Red
screen.fillRect(10, 10, 50, 50)

// Create gradient
local gradient = pal.gradient(0, 1, 10)
for i = 1, #gradient do
  screen.setColor(gradient[i])
  screen.fillRect(i * 10, 100, 10, 50)
end

// Mix colors
local purple = pal.mix(2, 4, 0.5)  // Mix red and blue
screen.setColor(purple)
screen.fillRect(100, 100, 50, 50)
```
