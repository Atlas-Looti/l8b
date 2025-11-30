/**
 * Dynamic asset constructors
 *
 * Provides constructors for creating assets at runtime
 */

import { Sound } from "@l8b/audio";
import { Map as TileMap } from "@l8b/map";
import { Image, Sprite } from "@l8b/sprites";

/**
 * Create Sound constructor wrapper
 */
export function createSoundClass(_audio: any): typeof Sound {
	return Sound;
}

/**
 * Export constructors for game code
 */
export { Image, Sprite, TileMap as Map, Sound };
