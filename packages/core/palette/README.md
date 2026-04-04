# @al8b/palette

Palette and color conversion utilities for L8B. This package centralizes indexed palette management and the types shared by rendering layers.

## Public API

- `Palette`
- Type: `PaletteOptions`
- Types: `ColorHex`, `ColorRGB`, `PaletteData`

## Notes

- Used by runtime and script-facing rendering APIs.
- Keep palette-level color logic here instead of duplicating conversions in screen or image code.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
