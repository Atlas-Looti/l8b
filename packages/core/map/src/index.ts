/**
 * @l8b/map - Tile map management system
 *
 * Architecture:
 * - core/: TileMap runtime with load/update/save helpers
 * - drawing/: Canvas rendering utilities for animated tiles
 * - shared/: Reference normalization utilities
 * - data/: Raw map data types and loaders
 *
 * Export notes:
 * - `TileMap` is the canonical class name.
 * - `Map` is an alias kept for backward compatibility with LootiScript game code
 *   that uses `new Map(...)`. Prefer `TileMap` in TypeScript host code to avoid
 *   shadowing the built-in `Map` type.
 */

export {
	LoadMap as loadMap,
	SaveMap as saveMap,
	TileMap,
	TileMap as Map,
	TileMap as default,
	UpdateMap as updateMap,
} from "./core/tile-map";
export type { MapData } from "./data/types";
