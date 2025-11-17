import type { Sprite } from "@l8b/sprites";
import { getDefaultSprites } from "../shared/sprites";
import type { MapData } from "./types";

export const loadMapData = (
	data: string,
	sprites: Record<string, Sprite> = getDefaultSprites(),
): MapData & { spritesDict: Record<string, Sprite> } => {
	const parsed: MapData = JSON.parse(data);
	return {
		...parsed,
		spritesDict: sprites,
	};
};

export type MapCells = Array<string | null>;

export const populateMapFromData = (cells: MapCells, data: MapData): void => {
	for (let j = 0; j < data.height; j++) {
		for (let i = 0; i < data.width; i++) {
			const value = data.data[i + j * data.width];
			if (value > 0) {
				cells[i + j * data.width] = data.sprites[value] as string;
			} else {
				cells[i + j * data.width] = null;
			}
		}
	}
};
