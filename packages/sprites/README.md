# @l8b/sprites

Sprite and image management system for game development.

## Installation

```bash
bun add @l8b/sprites
```

## Features

- **Image Class**: Canvas-based image manipulation with full drawing API
- **Sprite Class**: Animated sprite management with frame control
- **Modular Architecture**: Clean separation of concerns

## Usage

### Basic Image

```typescript
import { Image } from "@l8b/sprites";

const img = new Image(100, 100);
img.fillRect(0, 0, 50, 50, "red");
img.drawText("Hello", 0, 0, 16, "white");
```

### Sprite Animation

```typescript
import { Sprite, loadSprite } from "@l8b/sprites";

const sprite = loadSprite("/sprite.png", {
  frames: 4,
  fps: 10,
});

sprite.setFPS(15);
const frame = sprite.getFrame();
```

### Drawing Operations

```typescript
const img = new Image(200, 200);

// Shapes
img.fillRect(0, 0, 50, 50, "blue");
img.drawRound(0, 0, 60, 60, "green");
img.drawPolygon(0, 0, 50, 50, 100, 0, "red");

// Transform
img.setTranslation(100, 100);
img.setRotation(45);
img.setScale(1.5, 1.5);

// Gradients
img.setLinearGradient(0, 0, 100, 100, "red", "blue");
img.fillRect(0, 0, 100, 100);
```

## API Reference

### Image Class

#### Constructor

```typescript
new Image(width: number, height: number, centered?: boolean)
new Image(htmlImage: HTMLImageElement)
new Image(canvas: HTMLCanvasElement)
```

#### Drawing

- `fillRect(x, y, w, h, color?)`
- `drawRect(x, y, w, h, color?)`
- `fillRound(x, y, w, h, color?)`
- `drawRound(x, y, w, h, color?)`
- `fillRoundRect(x, y, w, h, round, color?)`
- `drawRoundRect(x, y, w, h, round, color?)`
- `drawLine(x1, y1, x2, y2, color?)`

#### Shapes

- `drawPolygon(...points, color?)`
- `fillPolygon(...points, color?)`
- `drawPolyline(...points, color?)`
- `drawArc(x, y, radius, angle1, angle2, ccw, color?)`
- `fillArc(x, y, radius, angle1, angle2, ccw, color?)`
- `drawQuadCurve(...points, color?)`
- `drawBezierCurve(...points, color?)`

#### Text

- `drawText(text, x, y, size, color?)`
- `drawTextOutline(text, x, y, size, color?)`
- `textWidth(text, size)`
- `setFont(font)`
- `loadFont(font)`
- `isFontReady(font?)`

#### Transform

- `setTranslation(x, y)`
- `setScale(x, y)`
- `setRotation(angle)`
- `setDrawAnchor(x, y)`
- `setDrawRotation(angle)`
- `setDrawScale(x, y?)`

#### Color

- `setColor(color)`
- `setAlpha(alpha)`
- `setLinearGradient(x1, y1, x2, y2, c1, c2)`
- `setRadialGradient(x, y, radius, c1, c2)`
- `setBlending(mode)`

#### Pixel

- `setRGB(x, y, r, g, b)`
- `setRGBA(x, y, r, g, b, a)`
- `getRGB(x, y, result?)`
- `getRGBA(x, y, result?)`

#### Rendering

- `drawSprite(sprite, x, y, w?, h?)`
- `drawImage(sprite, x, y, w?, h?)`
- `drawSpritePart(sprite, sx, sy, sw, sh, x, y, w?, h?)`
- `drawImagePart(sprite, sx, sy, sw, sh, x, y, w?, h?)`
- `drawMap(map, x, y, w, h)`

#### Other

- `clear(color?)`
- `setLineWidth(width)`
- `setLineDash(dash)`
- `setPixelated(pixelated)`

### Sprite Class

#### Constructor

```typescript
new Sprite(width: number, height: number)
```

#### Properties

- `width: number`
- `height: number`
- `frames: SpriteFrame[]`
- `fps: number`
- `ready: number`
- `name: string`

#### Methods

- `setFPS(fps: number): number`
- `setFrame(frame: number): void`
- `getFrame(): number`
- `getCurrentFrameCanvas(): HTMLCanvasElement | null`

### Functions

#### loadSprite

```typescript
loadSprite(
  url: string,
  properties?: { frames?: number; fps?: number },
  loaded?: () => void
): Sprite
```

#### updateSprite

```typescript
updateSprite(
  sprite: Sprite,
  img: HTMLImageElement,
  properties?: { frames?: number; fps?: number }
): void
```

## Blending Modes

Available modes: `normal`, `additive`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`

## License

MIT
