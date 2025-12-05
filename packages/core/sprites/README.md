# @l8b/sprites

**LootiScript API Binding** - Sprite and Image classes for creating and manipulating graphics.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### Sprite Constructor

Create a new sprite with animation support.

```lua
// Create a 32x32 sprite
local mySprite = Sprite(32, 32)
```

**Parameters:**

- `width` (number) - Sprite width in pixels
- `height` (number) - Sprite height in pixels

### Sprite Properties

```lua
// Sprite dimensions
local w = mySprite.width
local h = mySprite.height

// Animation frames
local frameCount = #mySprite.frames

// Ready state
if mySprite.ready == 1 then
  // Sprite is ready
end

// Frames per second
local fps = mySprite.fps
```

### sprite.setFPS()

Set animation speed.

```lua
mySprite.setFPS(10)  // 10 frames per second
mySprite.setFPS(5)   // 5 frames per second
```

**Parameters:**

- `fps` (number) - Frames per second

**Returns:** FPS value

### sprite.setFrame()

Set the current animation frame.

```lua
mySprite.setFrame(0)  // First frame
mySprite.setFrame(2)  // Third frame
```

**Parameters:**

- `frame` (number) - Frame index (0-based)

### sprite.getFrame()

Get the current animation frame.

```lua
local currentFrame = mySprite.getFrame()
```

**Returns:** Current frame index

### sprite.getCurrentFrameCanvas()

Get the canvas of the current frame.

```lua
local canvas = mySprite.getCurrentFrameCanvas()
```

**Returns:** HTMLCanvasElement or null

## Image Class

> **Note**: The Image class has been moved to `@l8b/image` package but is still exported from this package for backward compatibility. See [@l8b/image README](../../image/README.md) for full Image API documentation.

The Image class is re-exported from `@l8b/image` for convenience:

```lua
// Image is available from @l8b/sprites (backward compatibility)
local img = Image(100, 100)

// Or import directly from @l8b/image
// import { Image } from "@l8b/image"
```

### Pixel Operations

#### img.setRGB()

Set pixel color (RGB).

```lua
// Set pixel at (0, 0) to red
img.setRGB(0, 0, 255, 0, 0)

// Using RGB object
img.setRGB(0, 0, {r = 255, g = 0, b = 0})
```

**Parameters:**

- `x` (number) - X position
- `y` (number) - Y position
- `r` (number or RGB object) - Red value 0-255
- `g` (number, optional) - Green value 0-255
- `b` (number, optional) - Blue value 0-255

#### img.setRGBA()

Set pixel color with alpha (RGBA).

```lua
// Set pixel at (0, 0) to semi-transparent red
img.setRGBA(0, 0, 255, 0, 0, 128)

// Using RGBA object
img.setRGBA(0, 0, {r = 255, g = 0, b = 0, a = 128})
```

**Parameters:**

- `x` (number) - X position
- `y` (number) - Y position
- `r` (number or RGBA object) - Red value 0-255
- `g` (number, optional) - Green value 0-255
- `b` (number, optional) - Blue value 0-255
- `a` (number, optional) - Alpha value 0-255

#### img.getRGB()

Get pixel color (RGB).

```lua
local rgb = img.getRGB(0, 0)
// Returns: {r = 255, g = 0, b = 0}

local r = rgb.r
local g = rgb.g
local b = rgb.b
```

**Parameters:**

- `x` (number) - X position
- `y` (number) - Y position

**Returns:** RGB object `{r, g, b}`

#### img.getRGBA()

Get pixel color with alpha (RGBA).

```lua
local rgba = img.getRGBA(0, 0)
// Returns: {r = 255, g = 0, b = 0, a = 255}
```

**Parameters:**

- `x` (number) - X position
- `y` (number) - Y position

**Returns:** RGBA object `{r, g, b, a}`

### Drawing on Images

Images support the same drawing API as screen:

```lua
// Clear image
img.clear("#FFFFFF")

// Set color
img.setColor("#FF0000")

// Draw shapes
img.fillRect(10, 10, 50, 50)
img.drawLine(0, 0, 100, 100)
img.fillRound(50, 50, 30, 30)

// Draw text
img.setFont("BitCell")
img.drawText("Hello", 10, 10, 16)

// Draw sprites
img.drawSprite("player", 50, 50)

// Draw maps
img.drawMap(myMap, 0, 0, 100, 100)
```

### Image State

```lua
// Set alpha
img.setAlpha(0.5)

// Set pixelation
img.setPixelated(1)

// Set blending
img.setBlending("additive")

// Set line width
img.setLineWidth(2)

// Set line dash
img.setLineDash({5, 5})
```

### Image Transformations

```lua
// Translation
img.setTranslation(50, 50)

// Scale
img.setScale(2, 2)

// Rotation
img.setRotation(45)

// Draw anchor
img.setDrawAnchor(0.5, 0.5)

// Draw rotation
img.setDrawRotation(90)

// Draw scale
img.setDrawScale(2, 2)
```

### Gradients

```lua
// Linear gradient
img.setLinearGradient(0, 0, 100, 0, "#FF0000", "#0000FF")
img.fillRect(0, 0, 100, 50)

// Radial gradient
img.setRadialGradient(50, 50, 50, "#FFFFFF", "#000000")
img.fillRound(50, 50, 50, 50)
```

### Font Operations

```lua
// Set font
img.setFont("Arial")

// Load font
img.loadFont("CustomFont")

// Check if font is ready
if img.isFontReady("CustomFont") then
  // Font is loaded
end

// Get text width
local width = img.textWidth("Hello", 16)
```

## Example Usage

### Creating and Using a Sprite

```lua
// Create sprite
local playerSprite = Sprite(32, 32)

// Set animation speed
playerSprite.setFPS(8)

// Use in game
function draw()
  screen.drawSprite(playerSprite, playerX, playerY)
end
```

### Creating an Off-Screen Buffer

```lua
// Create image buffer
local buffer = Image(320, 240)

// Draw to buffer
buffer.clear("#000000")
buffer.setColor("#FFFFFF")
buffer.fillRect(10, 10, 50, 50)
buffer.drawText("Buffered", 10, 70, 12)

// Draw buffer to screen
function draw()
  screen.clear("#000")
  screen.drawImage(buffer, 0, 0, screen.width, screen.height)
end
```

### Pixel Manipulation

```lua
// Create image
local img = Image(100, 100)

// Set pixels
for y = 0, 99 do
  for x = 0, 99 do
    local r = x * 2.55
    local g = y * 2.55
    local b = 128
    img.setRGB(x, y, r, g, b)
  end
end

// Read pixels
local rgb = img.getRGB(50, 50)
Console.log("Color at (50,50): " .. rgb.r .. "," .. rgb.g .. "," .. rgb.b)
```

### Dynamic Sprite Generation

```lua
// Create sprite
local dynamicSprite = Sprite(64, 64)

// Get first frame canvas
local canvas = dynamicSprite.frames[1].canvas
local img = Image(canvas)

// Draw on sprite
img.clear("#000000")
img.setColor("#FFFF00")
img.fillRound(32, 32, 20, 20)
img.setColor("#000000")
img.fillRound(20, 25, 5, 5)
img.fillRound(44, 25, 5, 5)

// Use sprite
function draw()
  screen.drawSprite(dynamicSprite, 100, 100)
end
```
