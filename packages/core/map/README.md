# @al8b/map

Tile map data structure and renderer integration for L8B. It handles serialized map payloads, sprite references, cached canvas output, and animated tile rendering.

## Public API

- `TileMap`
- `LoadMap`
- `UpdateMap`
- `SaveMap`
- Type: `MapData`

## Notes

- Depends on `@al8b/sprites` for sprite-backed tile rendering.
- `TileMap` is browser-oriented and can fetch map assets via `XMLHttpRequest`.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
