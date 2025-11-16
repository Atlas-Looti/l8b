/**
 * @l8b/map - Tile map management system
 *
 * Architecture:
 * - core/: TileMap runtime with load/update/save helpers
 * - drawing/: Canvas rendering utilities for animated tiles
 * - shared/: Sprite dictionary helpers + reference normalization
 * - data/: Raw map data types and loaders
 */

export {
	LoadMap as loadMap,
	SaveMap as saveMap,
	TileMap as Map,
	TileMap as default,
	UpdateMap as updateMap,
} from "./core/tile-map";
export type { MapData } from "./data/types";
