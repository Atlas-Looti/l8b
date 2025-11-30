# Screen

In L8B, the screen is represented by the predefined `screen` object. To display shapes or images on the screen, simply call functions (methods) on this object.

## Coordinate System

To make your work easier, L8B automatically scales screen coordinates regardless of the actual display resolution.

- **Origin (0,0)**: Located at the **center of the screen**.
- **Scale**: The smallest display dimension (width in portrait mode, height in landscape mode) is always normalized to **200**.
- **Range**: Since 0 is at the center, the smallest dimension ranges from **-100 to +100**.

The largest dimension will adjust to the screen aspect ratio. For example, on a 16:9 screen:

- Landscape: Y from -100 to +100, X from -178 to +178.
- Portrait: X from -100 to +100, Y from -178 to +178.

## Properties

| Property         | Description                                    |
| ---------------- | ---------------------------------------------- |
| `screen.width`   | Current screen width in L8B coordinate units.  |
| `screen.height`  | Current screen height in L8B coordinate units. |
| `screen.context` | Canvas rendering context (for advanced usage). |

## Drawing State

### `screen.clear(color?)`

Clears the screen (fills it with the given color, or black if no color is provided).

```lua
screen.clear("#000")  // Fill screen with black
screen.clear("#FF0000")  // Fill screen with red
```

### `screen.setColor(color)`

Sets the color for subsequent drawing operations.

Color can be defined as:

- **RGB**: `"rgb(255,0,0)"` (bright red), `"rgb(255,255,255)"` (white). Values 0-255.
- **Hex**: `"#FFF"` or `"#FFFFFF"` (white), `"#F00"` (red).
- **Named**: `"red"`, `"blue"`, `"white"`, etc. (HTML5 standard colors).

### `screen.setAlpha(opacity)`

Sets the opacity level for subsequent drawing operations.

- `0`: Fully transparent (invisible).
- `1`: Fully opaque (covers what's underneath).

```lua
screen.setAlpha(0.5)  // Next elements will be semi-transparent
// ... draw something ...
screen.setAlpha(1)    // Reset to default
```

### `screen.setBlending(mode)`

Sets how subsequent drawing operations will be composited with existing graphics.

- `"normal"`: Overwrites graphics underneath (default).
- `"additive"`: Adds color values (light/glowing effect).
- `"multiply"`: Multiplies colors.
- `"screen"`: Screen blend mode.

See [Screen API](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/screen/README.md) for all available blending modes.

## Drawing Primitives

### `screen.fillRect(x, y, width, height, color?)`

Draws a **filled** rectangle.

- `x, y`: Center coordinates of the rectangle.
- `width, height`: Width and height.
- `color`: (Optional) Fill color. If omitted, uses the last set color.

### `screen.drawRect(x, y, width, height, color?)`

Draws a rectangle **outline**. Same parameters as `fillRect`.

### `screen.fillRoundRect(x, y, width, height, roundness, color?)`

Draws a filled rounded rectangle.

- `roundness`: Corner radius in pixels.

### `screen.drawRoundRect(x, y, width, height, roundness, color?)`

Draws a rounded rectangle outline.

### `screen.fillRound(x, y, width, height, color?)`

Draws a filled round shape (circle or ellipse depending on dimensions).

- `x, y`: Center coordinates.
- `width, height`: Horizontal and vertical diameter.

### `screen.drawRound(x, y, width, height, color?)`

Draws a round shape outline.

### `screen.drawLine(x1, y1, x2, y2, color?)`

Draws a straight line connecting points `(x1, y1)` and `(x2, y2)`.

### `screen.setLineWidth(width)`

Sets the line width for subsequent `draw...` (outline) operations. Default is 1.

### `screen.setLineDash(dash)`

Sets the line dash pattern.

```lua
screen.setLineDash([5, 5])  // 5px dash, 5px gap
screen.setLineDash([10, 5, 2, 5])  // Complex pattern
screen.setLineDash(null)  // Solid line
```

## Advanced Shapes

### `screen.fillPolygon(x1, y1, x2, y2, ..., color?)`

Fills a polygon defined by a list of coordinate points.
Can also accept an array as the first argument: `screen.fillPolygon([x1, y1, x2, y2, ...], color)`.

### `screen.drawPolygon(x1, y1, x2, y2, ..., color?)`

Draws a polygon outline.

### `screen.drawPolyline(x1, y1, x2, y2, ..., color?)`

Similar to polygon but the line doesn't automatically close back to the starting point.

### `screen.drawArc(x, y, radius, startAngle, endAngle, counterClockwise, color?)`

Draws a circle arc.

- `radius`: Circle radius.
- `startAngle, endAngle`: Angles in **degrees**.
- `counterClockwise`: Boolean, draw counter-clockwise if true.

### `screen.fillArc(x, y, radius, startAngle, endAngle, counterClockwise, color?)`

Fills a circle arc.

## Sprites & Maps

### `screen.drawSprite(name, x, y, width, height?)`

Draws a sprite that you've created.

- `name`: Sprite name (string), e.g., `"player"`.
- `x, y`: Center coordinates of the sprite.
- `width`: Display width.
- `height`: (Optional) Display height. If omitted, calculated proportionally.

**Animated Sprites:**
If the sprite has animation, L8B automatically plays the appropriate frame.

- `sprites["name"].setFrame(0)`: Reset animation to first frame.
- `screen.drawSprite("name.0", ...)`: Draw specific frame (frame 0).

### `screen.drawImage(image, x, y, width, height?)`

Alias for `drawSprite`. Can accept Image object or sprite name.

### `screen.drawSpritePart(name, sx, sy, sw, sh, x, y, width?, height?)`

Draws part of a sprite (spritesheet).

- `sx, sy`: Source position in sprite.
- `sw, sh`: Source size.
- `x, y`: Destination position.
- `width, height`: Destination size.

### `screen.drawImagePart(image, sx, sy, sw, sh, x, y, width?, height?)`

Alias for `drawSpritePart`.

### `screen.drawMap(map, x, y, width, height)`

Draws a map created in the Maps tab.

- `map`: Map object or map name (string).
- `x, y`: Center coordinates of the map display.
- `width, height`: Map display size on screen.

## Text

### `screen.drawText(text, x, y, size, color?)`

Displays text on the screen.

- `text`: String to display.
- `x, y`: Center coordinates of the text.
- `size`: Text height in pixels.

### `screen.drawTextOutline(text, x, y, size, color?)`

Draws outlined text.

### `screen.setFont(fontName)`

Sets the font for subsequent `drawText` calls.
Example built-in fonts: `"BitCell"`, `"DigitalDisco"`, `"PressStart2P"`, etc.

### `screen.loadFont(fontName)`

Initiates font loading. Fonts must be loaded before they can be used properly. Use `screen.isFontReady(fontName)` to check status.

### `screen.isFontReady(fontName?)`

Checks if a font is ready to use. Returns `1` if ready, `0` if not.

### `screen.textWidth(text, size)`

Returns the width of the given text when drawn at the given size.

## Screen Transformations

These functions change the coordinate system for subsequent drawing operations. **Important:** Always reset transformation values after drawing the desired section.

### `screen.setTranslation(tx, ty)`

Shifts the coordinate origin.

```lua
screen.setTranslation(50, 50)
// Drawing at (0,0) will now appear at (50,50)
screen.setTranslation(0, 0)  // Reset
```

### `screen.setRotation(angle)`

Rotates the entire coordinate system by `angle` degrees.

```lua
screen.setRotation(45)
// Graphics rotated 45 degrees
screen.setRotation(0)  // Reset
```

### `screen.setScale(x, y)`

Scales the coordinate system.

```lua
screen.setScale(2, 2)  // 2x zoom
screen.setScale(1, 1)  // Reset
```

## Object Transformations (Draw Parameters)

Unlike screen transformations, these functions only affect **how objects are drawn**, not the coordinate system.

### `screen.setDrawRotation(angle)`

Rotates objects (sprite/text/rect) around their own axis.

```lua
screen.setDrawRotation(90)
screen.drawSprite("player", 0, 0, 32)  // Player rotated 90 degrees
screen.setDrawRotation(0)  // Reset
```

### `screen.setDrawAnchor(anchorX, anchorY)`

Changes the anchor (pivot) point of graphics. Default is center (0, 0).

- `x`: -1 (left), 0 (center), 1 (right)
- `y`: -1 (bottom), 0 (center), 1 (top)

```lua
screen.setDrawAnchor(-1, 1)  // Anchor at top-left corner
screen.drawText("Score", -100, 100, 20)  // Text left-aligned at corner
screen.setDrawAnchor(0, 0)  // Reset
```

### `screen.setDrawScale(x, y?)`

Sets the drawing scale for elements.

```lua
screen.setDrawScale(2, 2)  // 2x scale
screen.setDrawScale(1, -1)  // Flip vertically
screen.setDrawScale(1, 1)  // Reset
```

## 3D Triangles

### `screen.tri(x1, y1, x2, y2, x3, y3, color?)`

Draws a filled triangle.

### `screen.trib(x1, y1, x2, y2, x3, y3, color?)`

Draws a triangle outline.

### `screen.ttri(x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture, textureSource?, z1?, z2?, z3?, useDepth?)`

Draws a textured triangle with UV coordinates for 3D rendering.

## Cursor

### `screen.setCursorVisible(visible)`

Show or hide the mouse cursor.

```lua
screen.setCursorVisible(false)  // Hide cursor
screen.setCursorVisible(true)   // Show cursor
```

For complete Screen API documentation, see [@l8b/screen README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/screen/README.md).
