/**
 * AssetLoader - Handles loading of game assets
 *
 * Responsibilities:
 * - Load sprites, maps, sounds, music
 * - Track loading progress
 * - Show loading bar
 */

import { AudioCore, Sound, Music } from "@al8b/audio";
import { ASSET_LOAD_TIMEOUT_MS, DEFAULT_BLOCK_SIZE, LOADING_BAR_THROTTLE_MS } from "../constants";
import { LoadMap } from "@al8b/map";
import { LoadSprite } from "@al8b/sprites";
import type { AssetCollections, ResourceFile, Resources } from "../types";
import type { RuntimeListener } from "../types";

/**
 * Race a promise against a timeout.
 * Rejects with a descriptive error if `ms` elapses before the promise settles.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
	return Promise.race([
		promise,
		new Promise<T>((_, reject) =>
			setTimeout(() => reject(new Error(`Asset load timed out after ${ms}ms`)), ms),
		),
	]);
}

export class AssetLoader {
	private url: string;
	private resources: Resources;
	private collections: AssetCollections;
	private loadingBarTime: number | null = null;
	private audioCore: AudioCore;
	private listener?: RuntimeListener;

	constructor(url: string, resources: Resources, audioCore: AudioCore, listener?: RuntimeListener) {
		this.url = url;
		this.resources = resources;
		this.audioCore = audioCore;
		this.listener = listener;
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
	 * Load a set of callback-based assets (sprites or maps) with timeout and placeholder fallback.
	 */
	private async loadCallbackAssets<TRes extends ResourceFile>(
		resources: TRes[] | undefined,
		urlPrefix: string,
		collectionKey: "sprites" | "maps",
		load: (url: string, res: TRes, onReady: () => void) => any,
		createPlaceholder: (name: string, res: TRes) => any,
	): Promise<void> {
		if (!resources) return;

		const promises = resources.map(
			(res) =>
				new Promise<void>((resolve) => {
					const name = res.file.split(".")[0].replace(/-/g, "/");
					const url = `${this.url}${urlPrefix}/${res.file}?v=${res.version || 0}`;

					try {
						const inner = new Promise<void>((onReady) => {
							this.collections[collectionKey][name] = load(url, res, onReady);
						});

						withTimeout(inner, ASSET_LOAD_TIMEOUT_MS).then(resolve).catch((err) => {
							this.listener?.log?.(`[AssetLoader] Failed to load ${collectionKey.slice(0, -1)} "${name}": ${String(err)}`);
							this.collections[collectionKey][name] = createPlaceholder(name, res);
							resolve();
						});
					} catch (err) {
						this.listener?.log?.(`[AssetLoader] Failed to load ${collectionKey.slice(0, -1)} "${name}": ${String(err)}`);
						this.collections[collectionKey][name] = createPlaceholder(name, res);
						resolve();
					}
				}),
		);

		await Promise.all(promises);
	}

	/**
	 * Load sprites
	 */
	private async loadSprites(): Promise<void> {
		await this.loadCallbackAssets(
			this.resources.images,
			"sprites",
			"sprites",
			(url, img, onReady) => LoadSprite(url, img.properties, onReady),
			(name, img) => ({
				name,
				ready: false,
				frames: [],
				fps: (img.properties as any)?.fps || 5,
				width: 0,
				height: 0,
			}),
		);
	}

	/**
	 * Load maps
	 */
	private async loadMaps(): Promise<void> {
		await this.loadCallbackAssets(
			this.resources.maps,
			"maps",
			"maps",
			(url, _mapRes, onReady) => LoadMap(url, this.collections.sprites, onReady),
			(name) => ({
				name,
				ready: false,
				width: 0,
				height: 0,
				block_width: DEFAULT_BLOCK_SIZE,
				block_height: DEFAULT_BLOCK_SIZE,
				data: [],
			}),
		);
	}

	/**
	 * Load sounds
	 */
	private async loadSounds(): Promise<void> {
		if (!this.resources.sounds) return;

		const promises = this.resources.sounds.map((sound) => {
			return new Promise<void>((resolve) => {
				const name = sound.file.split(".")[0];
				const url = `${this.url}sounds/${sound.file}?v=${sound.version || 0}`;

				try {
					// Sound class handles loading via XMLHttpRequest and AudioBuffer internally.
					// Resolve immediately — readiness is polled via isReady()/getProgress() in the game loop.
					const soundInstance = new Sound(this.audioCore, url);
					this.collections.sounds[name] = soundInstance;
					resolve();
				} catch (err) {
					this.listener?.log?.(`[AssetLoader] Failed to load sound "${name}": ${String(err)}`);
					this.collections.sounds[name] = new Sound(this.audioCore, url);
					resolve();
				}
			});
		});

		await Promise.all(promises);
	}

	/**
	 * Load music
	 */
	private async loadMusic(): Promise<void> {
		if (!this.resources.music) return;

		const promises = this.resources.music.map((mus) => {
			return new Promise<void>((resolve) => {
				const name = mus.file.split(".")[0];
				const url = `${this.url}music/${mus.file}?v=${mus.version || 0}`;

				try {
					// Music class handles HTML5 Audio internally (streaming — ready immediately).
					const musicInstance = new Music(this.audioCore, url);
					this.collections.music[name] = musicInstance;
					resolve();
				} catch (err) {
					this.listener?.log?.(`[AssetLoader] Failed to load music "${name}": ${String(err)}`);
					this.collections.music[name] = new Music(this.audioCore, url);
					resolve();
				}
			});
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
		// Throttle redraws
		if (this.loadingBarTime && Date.now() < this.loadingBarTime + LOADING_BAR_THROTTLE_MS) {
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
