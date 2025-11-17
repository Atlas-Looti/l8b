/**
 * TileMap - Tile-based map implementation with sprite rendering support.
 */

import type { Sprite } from "@l8b/sprites";
import type { MapData, SpriteDictionary } from "../data/types";
import {
	drawTile,
	ensureCanvas,
	queueAnimatedTile,
	type RenderState,
	renderAnimatedTiles,
} from "../drawing/renderer";
import {
	normalizeRefForStorage,
	normalizeRefForUsage,
} from "../shared/references";
import { getDefaultSprites } from "../shared/sprites";

export class TileMap {
	public width: number;
	public height: number;
	public block_width: number;
	public block_height: number;
	public sprites: SpriteDictionary;
	public map: (string | null)[] = [];
	public ready = true;
	public needs_update = false;
	public name = "";
	private readonly renderState: RenderState = {
		canvas: null,
		buffer: null,
		animated: [],
	};

	constructor(
		width: number,
		height: number,
		block_width: number,
		block_height: number,
		sprites?: Record<string, Sprite>,
	) {
		this.width = width;
		this.height = height;
		this.block_width = block_width;
		this.block_height = block_height;
		this.sprites = sprites ?? getDefaultSprites();
		this.clear();
	}

	clear(): void {
		for (let j = 0; j < this.height; j++) {
			for (let i = 0; i < this.width; i++) {
				this.map[i + j * this.width] = null;
			}
		}
	}

	set(x: number, y: number, ref: string | null): void {
		if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
			let normalized = ref;
			if (typeof normalized === "string") {
				normalized = normalizeRefForStorage(normalized);
			}
			this.map[x + y * this.width] = normalized;
			this.needs_update = true;
		}
	}

	get(x: number, y: number): string | number | null {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return 0;
		}
		let cell = this.map[x + y * this.width];
		if (typeof cell === "string") {
			cell = normalizeRefForUsage(cell);
		}
		return cell || 0;
	}

	getCanvas(): HTMLCanvasElement {
		if (this.renderState.canvas == null || this.needs_update) {
			this.update();
		}
		return this.renderState.canvas!;
	}

	draw(
		context: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number,
	): void {
		if (this.renderState.animated.length > 0) {
			const buffer = renderAnimatedTiles(
				this.renderState,
				this.block_width,
				this.block_height,
			);
			context.drawImage(buffer, x, y, w, h);
		} else {
			context.drawImage(this.getCanvas(), x, y, w, h);
		}
	}

	update(): void {
		this.needs_update = false;
		const context = ensureCanvas(
			this.renderState,
			this.width,
			this.height,
			this.block_width,
			this.block_height,
		);

		for (let j = 0; j < this.height; j++) {
			for (let i = 0; i < this.width; i++) {
				const index = i + (this.height - 1 - j) * this.width;
				const entry = this.map[index];
				if (!entry || entry.length === 0) continue;

				const parts = entry.split(":");
				const sprite =
					this.sprites[parts[0]] ||
					this.sprites[normalizeRefForUsage(parts[0])];
				if (!sprite || !sprite.frames[0]) continue;

				if (sprite.frames.length > 1) {
					queueAnimatedTile(
						this.renderState,
						sprite,
						this.block_width,
						this.block_height,
						i,
						j,
						parts,
					);
				} else {
					drawTile(
						context,
						sprite,
						this.block_width,
						this.block_height,
						i,
						j,
						parts,
					);
				}
			}
		}
	}

	loadFile(url: string, loaded?: () => void): void {
		const req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
				this.load(req.responseText, this.sprites);
				this.update();
				loaded?.();
			}
		};
		req.open("GET", url);
		req.send();
	}

	load(data: string, sprites: Record<string, Sprite>): void {
		const parsed: MapData = JSON.parse(data);
		this.width = parsed.width;
		this.height = parsed.height;
		this.block_width = parsed.block_width;
		this.block_height = parsed.block_height;
		this.sprites = sprites ?? this.sprites;

		for (let j = 0; j < parsed.height; j++) {
			for (let i = 0; i < parsed.width; i++) {
				const value = parsed.data[i + j * parsed.width];
				if (value > 0) {
					this.map[i + j * parsed.width] = parsed.sprites[value] as string;
				} else {
					this.map[i + j * parsed.width] = null;
				}
			}
		}
		this.needs_update = true;
	}

	clone(): TileMap {
		const duplicate = new TileMap(
			this.width,
			this.height,
			this.block_width,
			this.block_height,
			this.sprites,
		);
		for (let j = 0; j < this.height; j++) {
			for (let i = 0; i < this.width; i++) {
				duplicate.map[i + j * this.width] = this.map[i + j * this.width];
			}
		}
		duplicate.needs_update = true;
		return duplicate;
	}

	copyFrom(map: TileMap): TileMap {
		this.width = map.width;
		this.height = map.height;
		this.block_width = map.block_width;
		this.block_height = map.block_height;
		for (let j = 0; j < this.height; j++) {
			for (let i = 0; i < this.width; i++) {
				this.map[i + j * this.width] = map.map[i + j * this.width];
			}
		}
		this.update();
		return this;
	}
}

export function LoadMap(
	url: string,
	sprites?: Record<string, Sprite>,
	loaded?: () => void,
): TileMap {
	const map = new TileMap(1, 1, 1, 1, sprites);
	map.ready = false;

	const req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState === XMLHttpRequest.DONE) {
			map.ready = true;
			if (req.status === 200) {
				UpdateMap(map, req.responseText, sprites);
			}
			map.needs_update = true;
			loaded?.();
		}
	};
	req.open("GET", url);
	req.send();
	return map;
}

export function UpdateMap(
	map: TileMap,
	data: string,
	sprites?: Record<string, Sprite>,
): TileMap {
	const parsed: MapData = JSON.parse(data);
	map.width = parsed.width;
	map.height = parsed.height;
	map.block_width = parsed.block_width;
	map.block_height = parsed.block_height;
	map.sprites = sprites ?? map.sprites;

	for (let j = 0; j < parsed.height; j++) {
		for (let i = 0; i < parsed.width; i++) {
			const value = parsed.data[i + j * parsed.width];
			if (value > 0) {
				map.map[i + j * parsed.width] = parsed.sprites[value] as string;
			} else {
				map.map[i + j * parsed.width] = null;
			}
		}
	}
	map.needs_update = true;
	return map;
}

export function SaveMap(map: TileMap): string {
	let index = 1;
	const list: Array<string | number> = [0];
	const table: Record<string, number> = {};

	for (let j = 0; j < map.height; j++) {
		for (let i = 0; i < map.width; i++) {
			const entry = map.map[i + j * map.width];
			if (entry && entry.length > 0 && table[entry] == null) {
				list.push(entry);
				table[entry] = index++;
			}
		}
	}

	const serialized: number[] = [];
	for (let j = 0; j < map.height; j++) {
		for (let i = 0; i < map.width; i++) {
			const entry = map.map[i + j * map.width];
			serialized[i + j * map.width] =
				entry && entry.length > 0 ? table[entry] : 0;
		}
	}

	const payload: MapData = {
		width: map.width,
		height: map.height,
		block_width: map.block_width,
		block_height: map.block_height,
		sprites: list,
		data: serialized,
	};

	return JSON.stringify(payload);
}

// Aliases for convenience
export const Map = TileMap;
export const loadMap = LoadMap;
export const updateMap = UpdateMap;
export const saveMap = SaveMap;
export default TileMap;
