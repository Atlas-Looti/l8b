# @al8b/screen

**LootiScript API Binding** - 2D rendering system with primitives, sprites, text, and 3D triangle support.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### Properties

```lua
// Screen dimensions (logical coordinates)
local w = screen.width
local h = screen.height

// Canvas context (for advanced usage)
local ctx = screen.context
```

### Drawing State

#### screen.clear()

Clear the screen with a color.

```lua
// Clear to black
screen.clear("#000000")

// Clear to custom color
screen.clear("#FF0000")
screen.clear("red")
```

#### screen.setColor()

Set the current drawing color.

```lua
screen.setColor("#FFFFFF")
screen.setColor("red")
screen.setColor(999)  // Numeric color (RGB)
```

#### screen.setAlpha()

Set transparency level.

```lua
screen.setAlpha(1.0)   // Fully opaque
screen.setAlpha(0.5)   // 50% transparent
screen.setAlpha(0.0)   // Fully transparent
```

#### screen.setPixelated()

Set pixelation mode.

```lua
screen.setPixelated(1)  // Pixelated (nearest neighbor)
screen.setPixelated(0)  // Smooth (linear filtering)
```

#### screen.setBlending()

Set blend mode.

```lua
screen.setBlending("normal")
screen.setBlending("additive")
screen.setBlending("multiply")
screen.setBlending("screen")
```

### Transformations

#### screen.setTranslation()

Translate the coordinate system.

```lua
screen.setTranslation(100, 50)
// All subsequent draws are offset by (100, 50)

// Reset
screen.setTranslation(0, 0)
```

#### screen.setScale()

Scale the coordinate system.

```lua
screen.setScale(2, 2)    // 2x scale
screen.setScale(1, -1)   // Flip vertically

// Reset
screen.setScale(1, 1)
```

#### screen.setRotation()

Rotate the coordinate system.

```lua
screen.setRotation(45)   // Rotate 45 degrees
screen.setRotation(0)    // Reset
```

#### screen.setDrawAnchor()

Set anchor point for object transformations.

```lua
screen.setDrawAnchor(0.5, 0.5)  // Center anchor
screen.setDrawAnchor(0, 0)      // Top-left anchor
```

#### screen.setDrawRotation()

Set rotation for individual objects.

```lua
screen.setDrawRotation(45)
screen.drawSprite("player", 100, 100)
screen.setDrawRotation(0)  // Reset
```

#### screen.setDrawScale()

Set scale for individual objects.

```lua
screen.setDrawScale(2, 2)      // 2x scale
screen.setDrawScale(1, -1)     // Flip vertically
screen.setDrawScale(1, 1)      // Reset
```

### Rectangles

#### screen.fillRect()

Draw a filled rectangle.

```lua
screen.fillRect(10, 10, 50, 50)
screen.fillRect(10, 10, 50, 50, "#FF0000")
```

#### screen.drawRect()

Draw a rectangle outline.

```lua
screen.drawRect(10, 10, 50, 50)
screen.drawRect(10, 10, 50, 50, "#00FF00")
```

#### screen.fillRoundRect()

Draw a filled rounded rectangle.

```lua
screen.fillRoundRect(10, 10, 50, 50, 10)  // 10px radius
screen.fillRoundRect(10, 10, 50, 50, 10, "#FF0000")
```

#### screen.drawRoundRect()

Draw a rounded rectangle outline.

```lua
screen.drawRoundRect(10, 10, 50, 50, 10)
screen.drawRoundRect(10, 10, 50, 50, 10, "#00FF00")
```

#### screen.fillRound()

Draw a filled circle/ellipse.

```lua
screen.fillRound(100, 100, 30, 30)  // Circle
screen.fillRound(100, 100, 50, 30, "#FF0000")  // Ellipse
```

#### screen.drawRound()

Draw a circle/ellipse outline.

```lua
screen.drawRound(100, 100, 30, 30)
screen.drawRound(100, 100, 50, 30, "#00FF00")
```

### Lines and Shapes

#### screen.setLineWidth()

Set line width for strokes.

```lua
screen.setLineWidth(2)
screen.setLineWidth(5)
```

#### screen.setLineDash()

Set line dash pattern.

```lua
screen.setLineDash({5, 5})  // 5px dash, 5px gap
screen.setLineDash({10, 5, 2, 5})  // Complex pattern
screen.setLineDash(null)  // Solid line
```

#### screen.drawLine()

Draw a line.

```lua
screen.drawLine(0, 0, 100, 100)
screen.drawLine(0, 0, 100, 100, "#FFFFFF")
```

#### screen.drawPolyline()

Draw connected lines.

```lua
screen.drawPolyline(10, 10, 50, 50, 100, 10)
screen.drawPolyline(10, 10, 50, 50, 100, 10, "#FF0000")
```

#### screen.drawPolygon()

Draw a polygon outline.

```lua
screen.drawPolygon(10, 10, 50, 50, 100, 10)
screen.drawPolygon(10, 10, 50, 50, 100, 10, "#00FF00")
```

#### screen.fillPolygon()

Draw a filled polygon.

```lua
screen.fillPolygon(10, 10, 50, 50, 100, 10)
screen.fillPolygon(10, 10, 50, 50, 100, 10, "#FF0000")
```

#### screen.drawArc()

Draw an arc outline.

```lua
// x, y, radius, startAngle, endAngle, counterclockwise
screen.drawArc(100, 100, 50, 0, 180, false)
screen.drawArc(100, 100, 50, 0, 180, false, "#FFFFFF")
```

#### screen.fillArc()

Draw a filled arc.

```lua
screen.fillArc(100, 100, 50, 0, 180, false)
screen.fillArc(100, 100, 50, 0, 180, false, "#FF0000")
```

### Sprites and Images

#### screen.drawSprite()

Draw a sprite.

```lua
// Draw at position
screen.drawSprite("player", 100, 100)

// Draw with size
screen.drawSprite("player", 100, 100, 32, 32)
```

#### screen.drawImage()

Alias for drawSprite.

```lua
screen.drawImage("background", 0, 0, 320, 240)
```

#### screen.drawSpritePart()

Draw part of a sprite (spritesheet).

```lua
// sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH
screen.drawSpritePart("tiles", 0, 0, 16, 16, 100, 100, 32, 32)
```

#### screen.drawImagePart()

Alias for drawSpritePart.

```lua
screen.drawImagePart("atlas", 32, 0, 16, 16, 50, 50, 16, 16)
```

### Maps

#### screen.drawMap()

Draw a tile map.

```lua
// map, x, y, width, height
screen.drawMap(myMap, 0, 0, 320, 240)
```

### Text

#### screen.setFont()

Set the current font.

```lua
screen.setFont("BitCell")
screen.setFont("Arial")
```

#### screen.loadFont()

Load a font.

```lua
screen.loadFont("CustomFont")
```

#### screen.isFontReady()

Check if a font is loaded.

```lua
if screen.isFontReady("CustomFont") == 1 then
  // Font is ready
end
```

#### screen.drawText()

Draw text.

```lua
screen.drawText("Hello World", 10, 10, 16)
screen.drawText("Score: 100", 10, 30, 12, "#FFFF00")
```

#### screen.drawTextOutline()

Draw outlined text.

```lua
screen.drawTextOutline("Game Over", 100, 100, 24)
screen.drawTextOutline("Level Up!", 100, 100, 20, "#00FF00")
```

#### screen.textWidth()

Get text width.

```lua
local width = screen.textWidth("Hello", 16)
```

### Gradients

#### screen.setLinearGradient()

Set a linear gradient.

```lua
// x1, y1, x2, y2, color1, color2
screen.setLinearGradient(0, 0, 100, 0, "#FF0000", "#0000FF")
screen.fillRect(0, 0, 100, 50)
```

#### screen.setRadialGradient()

Set a radial gradient.

```lua
// x, y, radius, color1, color2
screen.setRadialGradient(50, 50, 50, "#FFFFFF", "#000000")
screen.fillRound(50, 50, 50, 50)
```

### 3D Triangles

#### screen.tri()

Draw a filled triangle.

```lua
// x1, y1, x2, y2, x3, y3
screen.tri(10, 10, 50, 10, 30, 50)
screen.tri(10, 10, 50, 10, 30, 50, "#FF0000")
```

#### screen.trib()

Draw a triangle outline.

```lua
screen.trib(10, 10, 50, 10, 30, 50)
screen.trib(10, 10, 50, 10, 30, 50, "#00FF00")
```

#### screen.ttri()

Draw a textured triangle (3D).

```lua
// x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture
screen.ttri(
  10, 10, 50, 10, 30, 50,  // Vertices
  0, 0, 1, 0, 0.5, 1,      // UV coordinates
  "wall_texture"            // Texture
)

// With depth (z-buffering)
screen.ttri(
  10, 10, 50, 10, 30, 50,
  0, 0, 1, 0, 0.5, 1,
  "texture",
  null,  // textureSource
  0, 0, 0,  // z1, z2, z3
  true  // useDepth
)
```

### Cursor

#### screen.setCursorVisible()

Show or hide the mouse cursor.

```lua
screen.setCursorVisible(false)  // Hide cursor
screen.setCursorVisible(true)   // Show cursor
```

## Example Usage

```lua
function draw()
  // Clear screen
  screen.clear("#000000")
  
  // Draw background
  screen.setColor("#333333")
  screen.fillRect(0, 0, screen.width, screen.height)
  
  // Draw player
  screen.drawSprite("player", playerX, playerY, 32, 32)
  
  // Draw UI
  screen.setFont("BitCell")
  screen.setColor("#FFFFFF")
  screen.drawText("Score: " .. score, 10, 10, 12)
  
  // Draw health bar
  screen.setColor("#FF0000")
  screen.fillRect(10, 30, health * 2, 10)
  screen.setColor("#FFFFFF")
  screen.drawRect(10, 30, 200, 10)
end
```
