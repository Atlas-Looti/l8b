/**
 * API definitions index - combines all API categories
 */

import type { GlobalApi } from "../types";
import { actionsApi } from "./actions";
import { assetsApi } from "./assets";
import { audioApi } from "./audio";
import { coreApi } from "./core";
import { evmApi } from "./evm";
import { httpApi } from "./http";
import { inputApi } from "./input";
import { mapApi } from "./map";
import { paletteApi } from "./palette";
import { playerApi } from "./player";
import { sceneApi } from "./scene";
import { screenApi } from "./screen";
import { spritesApi } from "./sprites";
import { systemApi } from "./system";
import { timeApi } from "./time";
import { walletApi } from "./wallet";

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
	...playerApi,
	...walletApi,
	...evmApi,
	...actionsApi,
	...httpApi,
} as GlobalApi;

/**
 * Regex to match API access patterns:
 * - Single level: "screen.drawSprite", "Math.abs"
 * - Nested: "sprites.player.x", "map.level1.width"
 */
export const API_ACCESS_REGEX = /\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\.([A-Za-z_][A-Za-z0-9_]*)\b/g;
