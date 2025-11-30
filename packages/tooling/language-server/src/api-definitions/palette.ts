/**
 * Palette API definitions
 */

import type { GlobalApi } from "../types";

export const paletteApi: Partial<GlobalApi> = {
	Palette: {
		type: "class",
		description: "Color palette management",
		signature: "new Palette(colors)",
		properties: {
			get: {
				type: "method",
				description: "Get color by index",
				signature: "palette.get(index)",
			},
			set: {
				type: "method",
				description: "Set color at index",
				signature: "palette.set(index, color)",
			},
			size: {
				type: "property",
				description: "Number of colors in palette",
			},
		},
	},
};
