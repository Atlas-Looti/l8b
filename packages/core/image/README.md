# @l8b/image

**LootiScript API Binding** - Image class for canvas-based graphics manipulation.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### Image Constructor

Create an off-screen image for drawing.

```lua
// Create a 100x100 image
local img = Image(100, 100)

// Create from existing image element
local img = Image(imageElement)

// Create from existing canvas
local img = Image(canvasElement)
```

**Parameters:**
- `width` (number) - Image width in pixels
- `height` (number, optional) - Image height (defaults to width for square)
- OR `imageElement` (HTMLImageElement) - Existing image
- OR `canvasElement` (HTMLCanvasElement) - Existing canvas

### Image Properties

```lua
// Image dimensions
local w = img.width
local h = img.height

// Canvas access
local canvas = img.canvas
local context = img.context
```

### Drawing Operations

#### Basic Shapes

```lua
// Fill rectangle
img.fillRect(x, y, width, height, color)

// Draw rectangle outline
img.drawRect(x, y, width, height, color)

// Fill rounded rectangle
img.fillRoundRect(x, y, width, height, round, color)

// Draw rounded rectangle outline
img.drawRoundRect(x, y, width, height, round, color)

// Fill circle/ellipse
img.fillRound(x, y, width, height, color)

// Draw circle/ellipse outline
img.drawRound(x, y, width, height, color)

// Draw line
img.drawLine(x1, y1, x2, y2, color)
```

#### Advanced Shapes

```lua
// Draw polyline
img.drawPolyline(x1, y1, x2, y2, ..., color)

// Draw polygon outline
img.drawPolygon(x1, y1, x2, y2, ..., color)

// Fill polygon
img.fillPolygon(x1, y1, x2, y2, ..., color)

// Draw quadratic curve
img.drawQuadCurve(x1, y1, cx, cy, x2, y2, ..., color)

// Draw bezier curve
img.drawBezierCurve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, ..., color)

// Draw arc
img.drawArc(x, y, radius, angle1, angle2, ccw, color)

// Fill arc
img.fillArc(x, y, radius, angle1, angle2, ccw, color)
```

#### Text Operations

```lua
// Set font
img.setFont("Arial")

// Draw text
img.drawText("Hello", x, y, size, color)

// Draw text outline
img.drawTextOutline("Hello", x, y, size, color)

// Get text width
local width = img.textWidth("Hello", size)
```

#### Sprite and Image Rendering

```lua
// Draw sprite/image
img.drawSprite(sprite, x, y, width, height)
img.drawImage(sprite, x, y, width, height)  // Alias for drawSprite

// Draw part of sprite/image
img.drawSpritePart(sprite, sx, sy, sw, sh, x, y, width, height)
img.drawImagePart(sprite, sx, sy, sw, sh, x, y, width, height)  // Alias
```

#### Map Rendering

```lua
// Draw map
img.drawMap(map, x, y, width, height)
```

### Pixel Operations

```lua
// Set pixel RGB
img.setRGB(x, y, r, g, b)
img.setRGB(x, y, {R: r, G: g, B: b})

// Set pixel RGBA
img.setRGBA(x, y, r, g, b, a)
img.setRGBA(x, y, {R: r, G: g, B: b, A: a})

// Get pixel RGB
local color = img.getRGB(x, y)
// Returns: {R: number, G: number, B: number}

// Get pixel RGBA
local color = img.getRGBA(x, y)
// Returns: {R: number, G: number, B: number, A: number}
```

### Color and Style Operations

```lua
// Set color
img.setColor("#FF0000")

// Set alpha
img.setAlpha(0.5)

// Set pixelated rendering
img.setPixelated(1)  // 1 = pixelated, 0 = smooth

// Set blending mode
img.setBlending("normal")  // or "additive", "multiply", etc.

// Set line width
img.setLineWidth(2)

// Set line dash pattern
img.setLineDash([5, 5])

// Set linear gradient
img.setLinearGradient(x1, y1, x2, y2, color1, color2)

// Set radial gradient
img.setRadialGradient(x, y, radius, color1, color2)
```

### Transform Operations

```lua
// Set translation
img.setTranslation(tx, ty)

// Set scale
img.setScale(sx, sy)

// Set rotation
img.setRotation(angle)  // angle in degrees

// Set draw anchor
img.setDrawAnchor(anchorX, anchorY)

// Set draw rotation
img.setDrawRotation(angle)

// Set draw scale
img.setDrawScale(scaleX, scaleY)
```

### Canvas Operations

```lua
// Clear canvas
img.clear()  // Clear with black
img.clear("#FF0000")  // Clear with color

// Initialize context (called automatically when needed)
img.initContext()
```

### Font Operations

```lua
// Load font
img.loadFont("MyFont")

// Check if font is ready
if img.isFontReady("MyFont") then
  // Font is ready
end
```

## Blending Modes

Available blending modes:
- `normal` (default)
- `additive`
- `multiply`
- `screen`
- `overlay`
- `darken`
- `lighten`
- And more...

## Usage Examples

```lua
// Create image and draw on it
local img = Image(200, 200)
img.clear("#FFFFFF")
img.setColor("#FF0000")
img.fillRect(10, 10, 50, 50)
img.drawText("Hello", 100, 100, 20, "#000000")

// Use with screen
screen.drawImage(img, 0, 0)
```

## Type Exports

This package exports the following TypeScript types:

- `Image` - The Image class
- `ImageContextState` - Internal state type
- `RGBColor` - RGB color object
- `RGBAColor` - RGBA color object
- `SpriteSource` - Sprite source type for drawing
- `MapSource` - Map source type for drawing
- `BLENDING_MODES` - Blending modes constant
