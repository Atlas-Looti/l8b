/**
 * AssetLoader - Handles loading of game assets
 *
 * Responsibilities:
 * - Load sprites, maps, sounds, music
 * - Track loading progress
 * - Show loading bar
 */

import { loadMap } from "@l8b/map";
import { loadSprite } from "@l8b/sprites";
import type { AssetCollections, Resources } from "../types";

export class AssetLoader {
	private url: string;
	private resources: Resources;
	private collections: AssetCollections;
	private loadingBarTime: number | null = null;

	constructor(url: string, resources: Resources) {
		this.url = url;
		this.resources = resources;
		this.collections = {
			sprites: {},
			maps: {},
			sounds: {},
			music: {},
			assets: {},
		};
	}

	/**
	 * Load all assets
	 */
	async loadAll(): Promise<AssetCollections> {
		await Promise.all([
			this.loadSprites(),
			this.loadMaps(),
			this.loadSounds(),
			this.loadMusic(),
			this.loadGenericAssets(),
		]);

		return this.collections;
	}

	/**
	 * Load sprites
	 */
	private async loadSprites(): Promise<void> {
		if (!this.resources.images) return;

		const promises = this.resources.images.map(
			(img) =>
				new Promise<void>((resolve) => {
					const name = img.file.split(".")[0].replace(/-/g, "/");
					const url = `${this.url}sprites/${img.file}?v=${img.version || 0}`;

					try {
						// Load sprite using @l8b/sprites
						const sprite = loadSprite(url, img.properties, () => {
							resolve();
						});
						this.collections.sprites[name] = sprite;
					} catch (err) {
						console.error(`Failed to load sprite ${name}:`, err);
						// Create placeholder on error
						this.collections.sprites[name] = {
							name,
							ready: false,
							frames: [],
							fps: (img.properties as any)?.frames || 5,
							width: 0,
							height: 0,
						} as any;
						resolve();
					}
				}),
		);

		await Promise.all(promises);
	}

	/**
	 * Load maps
	 */
	private async loadMaps(): Promise<void> {
		if (!this.resources.maps) return;

		const promises = this.resources.maps.map(
			(mapRes) =>
				new Promise<void>((resolve) => {
					const name = mapRes.file.split(".")[0].replace(/-/g, "/");
					const url = `${this.url}maps/${mapRes.file}?v=${mapRes.version || 0}`;

					try {
						// Load map using @l8b/map
						const mapData = loadMap(url, this.collections.sprites, () => {
							resolve();
						});
						this.collections.maps[name] = mapData;
					} catch (err) {
						console.error(`Failed to load map ${name}:`, err);
						// Create placeholder on error
						this.collections.maps[name] = {
							name,
							ready: false,
							width: 0,
							height: 0,
							block_width: 16,
							block_height: 16,
							data: [],
						} as any;
						resolve();
					}
				}),
		);

		await Promise.all(promises);
	}

	/**
	 * Load sounds
	 */
	private async loadSounds(): Promise<void> {
		if (!this.resources.sounds) return;

		const promises = this.resources.sounds.map(async (sound) => {
			const name = sound.file.split(".")[0];
			const url = `${this.url}sounds/${sound.file}?v=${sound.version || 0}`;

			try {
				// Load sound - create audio element
				const audio = new Audio();
				audio.src = url;
				await new Promise<void>((resolve, reject) => {
					audio.addEventListener("canplaythrough", () => resolve(), {
						once: true,
					});
					audio.addEventListener("error", reject, { once: true });
					audio.load();
				});

				this.collections.sounds[name] = {
					name,
					url,
					audio,
					ready: true,
				};
			} catch (err) {
				console.error(`Failed to load sound ${name}:`, err);
				this.collections.sounds[name] = {
					name,
					url,
					ready: false,
				};
			}
		});

		await Promise.all(promises);
	}

	/**
	 * Load music
	 */
	private async loadMusic(): Promise<void> {
		if (!this.resources.music) return;

		const promises = this.resources.music.map(async (mus) => {
			const name = mus.file.split(".")[0];
			const url = `${this.url}music/${mus.file}?v=${mus.version || 0}`;

			try {
				// Load music - create audio element
				const audio = new Audio();
				audio.src = url;
				audio.loop = true; // Music typically loops
				await new Promise<void>((resolve, reject) => {
					audio.addEventListener("canplaythrough", () => resolve(), {
						once: true,
					});
					audio.addEventListener("error", reject, { once: true });
					audio.load();
				});

				this.collections.music[name] = {
					name,
					url,
					audio,
					ready: true,
				};
			} catch (err) {
				console.error(`Failed to load music ${name}:`, err);
				this.collections.music[name] = {
					name,
					url,
					ready: false,
				};
			}
		});

		await Promise.all(promises);
	}

	/**
	 * Load generic assets
	 */
	private async loadGenericAssets(): Promise<void> {
		if (!this.resources.assets) return;

		for (const asset of this.resources.assets) {
			const name = asset.file.split(".")[0].replace(/-/g, "/");
			this.collections.assets[name] = {
				name,
				file: asset.file,
				version: asset.version,
			};
		}
	}

	/**
	 * Check if all assets are ready
	 */
	isReady(): boolean {
		return this.countReady() === this.countTotal();
	}

	/**
	 * Get loading progress (0-1)
	 */
	getProgress(): number {
		const total = this.countTotal();
		if (total === 0) return 1;
		return this.countReady() / total;
	}

	/**
	 * Count total assets
	 */
	private countTotal(): number {
		let count = 0;
		count += Object.keys(this.collections.sprites).length;
		count += Object.keys(this.collections.maps).length;
		count += Object.keys(this.collections.sounds).length;
		count += Object.keys(this.collections.music).length;
		return count;
	}

	/**
	 * Count ready assets
	 */
	private countReady(): number {
		let ready = 0;

		for (const sprite of Object.values(this.collections.sprites)) {
			if (sprite.ready) ready++;
		}
		for (const map of Object.values(this.collections.maps)) {
			if (map.ready) ready++;
		}
		for (const sound of Object.values(this.collections.sounds)) {
			if (sound.ready) ready++;
		}
		for (const mus of Object.values(this.collections.music)) {
			if (mus.ready) ready++;
		}

		return ready;
	}

	/**
	 * Show loading bar on screen
	 */
	showLoadingBar(screenInterface: any): void {
		// Throttle to 60fps
		if (this.loadingBarTime && Date.now() < this.loadingBarTime + 16) {
			return;
		}
		this.loadingBarTime = Date.now();

		const progress = this.getProgress();
		screenInterface.clear("#000");
		screenInterface.drawRect(0, 0, 100, 10, "#DDD");
		screenInterface.fillRect(-(1 - progress) * 48, 0, progress * 96, 6, "#DDD");
	}

	/**
	 * Get loaded collections
	 */
	getCollections(): AssetCollections {
		return this.collections;
	}
}
