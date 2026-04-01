/**
 * @l8b/map - Tile map management system
 *
 * Architecture:
 * - core/: TileMap runtime with load/update/save helpers
 * - drawing/: Canvas rendering utilities for animated tiles
 * - shared/: Reference normalization utilities
 * - data/: Raw map data types and loaders
 */

export { LoadMap, SaveMap, TileMap, UpdateMap } from "./core/tile-map";
export type { MapData } from "./data/types";
