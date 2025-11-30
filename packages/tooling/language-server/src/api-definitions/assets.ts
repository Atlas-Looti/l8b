/**
 * Assets API definitions
 */

import type { GlobalApi } from "../types";

export const assetsApi: Partial<GlobalApi> = {
	AssetManager: {
		type: "class",
		description: "Asset management system",
		signature: "new AssetManager(options)",
		properties: {
			load: {
				type: "method",
				description: "Load an asset",
				signature: "assetManager.load(src, type?)",
			},
			get: {
				type: "method",
				description: "Get a loaded asset",
				signature: "assetManager.get(src)",
			},
			unload: {
				type: "method",
				description: "Unload an asset",
				signature: "assetManager.unload(src)",
			},
		},
	},
};
