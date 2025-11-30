# Images

## Creating Images

```lua
image = Image(100, 100)  // Create a 100x100 image
// Or from existing image/canvas
image = Image(imageElement)
image = Image(canvasElement)
```

## Image Properties

- `image.width`, `image.height`: Image dimensions
- `image.canvas`: Canvas element
- `image.context`: Rendering context

## Pixel Operations

- `image.setRGB(x, y, r, g, b)`: Set pixel color (RGB)
- `image.setRGBA(x, y, r, g, b, a)`: Set pixel color with alpha
- `image.getRGB(x, y)`: Get pixel color as RGB object
- `image.getRGBA(x, y)`: Get pixel color as RGBA object

## Drawing on Images

Images support the same drawing API as screen:

- `image.clear(color)`, `image.setColor(color)`, `image.setAlpha(alpha)`
- `image.fillRect()`, `image.drawRect()`, `image.drawLine()`, etc.
- `image.drawSprite()`, `image.drawText()`, `image.drawMap()`

For complete Image API documentation, see [@l8b/sprites README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/sprites/README.md).
