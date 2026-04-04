# @al8b/screen

Main rendering surface for L8B. It owns the high-level screen abstraction, text and sprite drawing layers, and the triangle rasterization helpers used for lower-level rendering.

## Public API

- `Screen` (`default`)
- `ZBuffer`
- Types: `TextureSource`, `TexVert`, `Vec2`, `Vec3`
- Shared screen types from `./types`

## Notes

- Depends on `@al8b/image`, `@al8b/map`, and `@al8b/sprites`.
- This is the primary render surface exposed through the runtime's script API.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
