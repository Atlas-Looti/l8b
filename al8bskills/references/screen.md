# Screen & Drawing API

All drawing is done from LootiScript inside the `draw()` function. The `screen` global is available everywhere.

## Coordinate System

```
(0,0) ──────────────────► x  (screen.width)
  │
  │      all draw calls use pixel coordinates
  │      origin = top-left corner of canvas
  │      x increases → right
  │      y increases ↓ down
  │
  ▼ y  (screen.height)
```

- Units are **pixels**
- `x=0, y=0` is the **top-left** corner
- `x=screen.width, y=screen.height` is the **bottom-right** corner
- Things drawn **later** in `draw()` appear **on top** (painter's model)
- When using a camera, wrap world-space draws in `camera.begin(cam)` / `camera.end(cam)` — anything outside that block stays in screen space (HUD, UI)

## Canvas Info

```lua
screen.width    // canvas width in pixels (read-only)
screen.height   // canvas height in pixels (read-only)
```

## Clear

```lua
screen.clear()                 // clear to black
screen.clear("#1a1a2e")        // clear with hex color
screen.clear(20, 30, 40)       // clear with RGB  (not standard — use setColor first)
```

## State Setters

These affect all subsequent draw calls until changed.

```lua
screen.setColor("#ff6600")        // hex color string
screen.setColor(0xff6600)         // hex as number
screen.setAlpha(0.5)              // opacity 0.0–1.0 (default 1)
screen.setLineWidth(2)            // stroke width in pixels (default 1)
screen.setLineDash({ 6, 3 })      // dashed lines: [dash, gap, dash, gap, ...]
screen.setLineDash(nil)           // solid lines

// Font
screen.setFont("monospace")       // CSS font family name
screen.loadFont("pixel.ttf")      // load a custom font from assets
screen.isFontReady("pixel.ttf")   // 1 if ready, 0 if loading

// Blend modes
screen.setBlending("source-over") // normal (default)
screen.setBlending("multiply")
screen.setBlending("screen")
screen.setBlending("overlay")
screen.setBlending("lighter")     // additive
screen.setBlending("destination-out") // erase mode

// Gradients (replace current color until next setColor)
screen.setLinearGradient(x1, y1, x2, y2, "#color1", "#color2")
screen.setRadialGradient(cx, cy, radius, "#color1", "#color2")

// Pixel-art mode: disable anti-aliasing (call once in init)
screen.setPixelated(1)   // 1 = crisp pixels (pixel-art), 0 = smooth (default)
```

## Transform

Per-draw-call transform (applied before each draw, then reset):

```lua
screen.setDrawAnchor(0.5, 0.5)   // pivot point 0–1 (default 0, 0 = top-left)
screen.setDrawRotation(angle)     // radians, applied at anchor
screen.setDrawScale(sx, sy)       // scale, applied at anchor
screen.setDrawScale(s)            // uniform scale
```

Global canvas transform (cumulative — must be reset manually):

```lua
screen.setTranslation(tx, ty)    // offset all drawing
screen.setScale(sx, sy)          // scale canvas
screen.setRotation(angle)        // rotate canvas (radians)
```

## Rectangles

```lua
screen.fillRect(x, y, w, h)             // filled rectangle (uses current color)
screen.fillRect(x, y, w, h, "#color")   // with explicit color
screen.drawRect(x, y, w, h)             // outline rectangle
screen.drawRect(x, y, w, h, "#color")

screen.fillRoundRect(x, y, w, h, r)     // filled rounded rectangle (r = corner radius)
screen.fillRoundRect(x, y, w, h, r, "#color")
screen.drawRoundRect(x, y, w, h, r)     // outline rounded rectangle
```

## Circles & Ellipses

```lua
screen.fillRound(x, y, w, h)            // filled ellipse (w=h for circle)
screen.fillRound(x, y, w, h, "#color")
screen.drawRound(x, y, w, h)            // outline ellipse
```

## Lines

```lua
screen.drawLine(x1, y1, x2, y2)
screen.drawLine(x1, y1, x2, y2, "#color")
```

## Arcs

```lua
screen.drawArc(cx, cy, r, a1, a2, ccw)          // arc outline
screen.drawArc(cx, cy, r, a1, a2, ccw, "#color")
screen.fillArc(cx, cy, r, a1, a2, ccw)          // filled arc / pie slice
// a1, a2 are radians; ccw = true for counter-clockwise
```

## Triangles

```lua
screen.tri(x1,y1, x2,y2, x3,y3)                // triangle outline
screen.tri(x1,y1, x2,y2, x3,y3, "#color")
screen.trib(x1,y1, x2,y2, x3,y3)               // filled triangle
screen.trib(x1,y1, x2,y2, x3,y3, "#color")
```

## Polygons & Curves

```lua
// Polygon (pass x,y pairs as flat args OR a table of {x,y} tables)
screen.fillPolygon(x1,y1, x2,y2, x3,y3, ...)
screen.drawPolygon(x1,y1, x2,y2, x3,y3, ...)
screen.drawPolyline(x1,y1, x2,y2, x3,y3, ...)  // open path (no closing line)

// Curves
screen.drawQuadCurve(x1,y1, cx,cy, x2,y2)      // quadratic bezier
screen.drawBezierCurve(x1,y1, cx1,cy1, cx2,cy2, x2,y2) // cubic bezier
```

## Text

```lua
screen.drawText(text, x, y, size)
screen.drawText(text, x, y, size, "#color")
screen.drawTextOutline(text, x, y, size)        // text with outline stroke
screen.drawTextOutline(text, x, y, size, "#color")

local w = screen.textWidth(text, size)          // measure text width in pixels
```

## Sprites

```lua
screen.drawSprite(sprites["player"], x, y)          // draw at original size
screen.drawSprite(sprites["player"], x, y, w, h)    // draw at explicit size
screen.drawSprite("player", x, y)                   // can use string key directly

// Draw a sub-region of a sprite (sprite atlas / spritesheet)
// sx,sy = source x,y in sprite; sw,sh = source w,h; x,y,w,h = destination
screen.drawSpritePart(sprite, sx, sy, sw, sh, x, y)
screen.drawSpritePart(sprite, sx, sy, sw, sh, x, y, w, h)
```

Rotation + scale on sprites:

```lua
screen.setDrawAnchor(0.5, 0.5)          // rotate around center
screen.setDrawRotation(math.PI / 4)    // 45 degrees
screen.setDrawScale(2, 2)              // 2x size
screen.drawSprite(sprites["player"], x, y, 32, 32)
screen.setDrawRotation(0)              // reset
screen.setDrawScale(1)
screen.setDrawAnchor(0, 0)
```

## Tilemaps

```lua
screen.drawMap(maps["level1"], x, y, w, h)   // draw tilemap at position/size
screen.drawMap("level1", x, y, w, h)         // string key also works
```

## Textured Triangle (3D / GPU-style)

```lua
// Draw a texture-mapped triangle (for 3D effects, mode7, etc.)
screen.ttri(
    x1,y1, x2,y2, x3,y3,       // screen vertices
    u1,v1, u2,v2, u3,v3,       // texture UV coords (0–1)
    sprites["texture"]          // texture source
)
```

## Cursor

```lua
screen.setCursorVisible(false)   // hide the mouse cursor over canvas
screen.setCursorVisible(true)
```

## Common Patterns

### Draw a health bar

```lua
draw_health_bar = function(x, y, w, hp, max_hp)
    // background
    screen.fillRect(x, y, w, 8, "#333333")
    // fill
    local pct = hp / max_hp
    screen.fillRect(x, y, w * pct, 8, pct > 0.3 and "#44cc44" or "#cc4444")
    // border
    screen.drawRect(x, y, w, 8, "#ffffff")
end
```

### Draw a sprite centered with rotation

```lua
draw_centered = function(sprite, x, y, w, h, angle)
    screen.setDrawAnchor(0.5, 0.5)
    screen.setDrawRotation(angle)
    screen.drawSprite(sprite, x, y, w, h)
    screen.setDrawRotation(0)
    screen.setDrawScale(1)
    screen.setDrawAnchor(0, 0)
end
```

### Fade overlay

```lua
draw_fade = function(alpha, color)
    screen.setAlpha(alpha)
    screen.fillRect(0, 0, screen.width, screen.height, color or "#000000")
    screen.setAlpha(1)
end
```

### Draw debug bounding box

```lua
draw_aabb = function(x, y, w, h)
    screen.setColor("#00ff00")
    screen.setAlpha(0.5)
    screen.drawRect(x, y, w, h)
    screen.setAlpha(1)
end
```
