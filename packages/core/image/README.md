# @al8b/image

Canvas image utilities shared across rendering packages. It exposes the `Image` abstraction plus focused modules for drawing, color operations, text, transforms, sprite rendering, and map rendering.

## Public API

- `Image`
- `BLENDING_MODES`
- `ColorOps`
- `DrawingOps`
- `ShapeOps`
- `TextOps`
- `SpriteRenderingOps`
- `MapRenderingOps`
- `TransformOps`
- Font helpers: `loadFont`, `isFontReady`, `clearFontCache`
- Types: `ImageContextState`, `RGBColor`, `RGBAColor`, `SpriteSource`, `MapSource`

## Notes

- Used by `@al8b/screen`, `@al8b/sprites`, and runtime asset rendering.
- Browser-oriented package built around canvas APIs.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
