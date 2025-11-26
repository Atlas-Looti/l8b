/**
 * API definitions index - combines all API categories
 */

import type { GlobalApi } from "../types";
import { coreApi } from "./core";
import { screenApi } from "./screen";
import { audioApi } from "./audio";
import { inputApi } from "./input";
import { systemApi } from "./system";
import { sceneApi } from "./scene";
import { spritesApi } from "./sprites";
import { mapApi } from "./map";
import { timeApi } from "./time";
import { assetsApi } from "./assets";
import { paletteApi } from "./palette";

/**
 * Global API list for suggestions and hover info
 */
export const GLOBAL_API: GlobalApi = {
	...coreApi,
	...screenApi,
	...audioApi,
	...inputApi,
	...systemApi,
	...sceneApi,
	...spritesApi,
	...mapApi,
	...timeApi,
	...assetsApi,
	...paletteApi,
} as GlobalApi;

/**
 * Regex to match API access patterns:
 * - Single level: "screen.drawSprite", "Math.abs"
 * - Nested: "sprites.player.x", "map.level1.width"
 */
export const API_ACCESS_REGEX =
	/\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\.([A-Za-z_][A-Za-z0-9_]*)\b/g;
