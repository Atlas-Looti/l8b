export interface GameResource {
	file: string;
	version?: number;
}

export interface GameResources {
	images?: GameResource[];
	maps?: GameResource[];
	sounds?: GameResource[];
	music?: GameResource[];
}

export type GameCategory = "arcade" | "puzzle" | "adventure" | "demo";

export interface GameDefinition {
	id: string;
	name: string;
	description: string;
	category: GameCategory;
	orientation: "portrait" | "any";
	width: number;
	height: number;
	sources: string[];
	resources?: GameResources;
	color: string;
}
