/**
 * L8B Plugin System
 * Inspired by Vite's plugin architecture
 */

import type { ResolvedConfig } from "@l8b/framework-config";
import type { ProjectResources } from "@l8b/framework-shared";

/**
 * Build context available to plugins
 */
export interface BuildContext {
	config: ResolvedConfig;
	resources: ProjectResources;
	mode: "development" | "production";
	/** Compiled routines map */
	routines: Map<string, Uint8Array>;
	/** Output files */
	files: Map<string, string | Uint8Array>;
	/** Emitted errors */
	errors: string[];
	/** Emitted warnings */
	warnings: string[];
}

/**
 * Plugin hook return values
 */
export type HookResult = void | null | undefined | Promise<void | null | undefined>;

/**
 * Asset info for transform hook
 */
export interface AssetInfo {
	name: string;
	type: "source" | "sprite" | "map" | "sound" | "music" | "font" | "asset";
	content: string | Uint8Array;
	sourcePath?: string;
}

/**
 * Transformed asset
 */
export interface TransformedAsset extends AssetInfo {
	/** Skip further processing */
	skip?: boolean;
}

/**
 * L8B Plugin interface
 */
export interface L8BPlugin {
	/** Plugin name for debugging */
	name: string;

	/**
	 * Called once before build starts
	 * Use for setup, validation, etc.
	 */
	buildStart?: (ctx: BuildContext) => HookResult;

	/**
	 * Transform an asset before processing
	 * Can modify content or skip processing
	 */
	transform?: (
		asset: AssetInfo,
		ctx: BuildContext,
	) => TransformedAsset | null | undefined | Promise<TransformedAsset | null | undefined>;

	/**
	 * Called after compilation but before bundling
	 * Can modify compiled routines
	 */
	afterCompile?: (routines: Map<string, Uint8Array>, ctx: BuildContext) => HookResult;

	/**
	 * Generate additional files or modify bundle
	 */
	generateBundle?: (files: Map<string, string | Uint8Array>, ctx: BuildContext) => HookResult;

	/**
	 * Called after build completes
	 * Use for cleanup, reporting, etc.
	 */
	buildEnd?: (ctx: BuildContext) => HookResult;

	/**
	 * Called on build error
	 */
	buildError?: (error: Error, ctx: BuildContext) => HookResult;
}

/**
 * Plugin container manages plugin lifecycle
 */
export class PluginContainer {
	private plugins: L8BPlugin[] = [];

	constructor(plugins: L8BPlugin[] = []) {
		this.plugins = plugins;
	}

	/**
	 * Add a plugin
	 */
	add(plugin: L8BPlugin): void {
		this.plugins.push(plugin);
	}

	/**
	 * Run buildStart hook for all plugins
	 */
	async buildStart(ctx: BuildContext): Promise<void> {
		for (const plugin of this.plugins) {
			if (plugin.buildStart) {
				await plugin.buildStart(ctx);
			}
		}
	}

	/**
	 * Run transform hook for an asset
	 */
	async transform(asset: AssetInfo, ctx: BuildContext): Promise<TransformedAsset> {
		let result: TransformedAsset = { ...asset };

		for (const plugin of this.plugins) {
			if (plugin.transform) {
				const transformed = await plugin.transform(result, ctx);
				if (transformed) {
					result = transformed;
					if (transformed.skip) {
						break;
					}
				}
			}
		}

		return result;
	}

	/**
	 * Run afterCompile hook for all plugins
	 */
	async afterCompile(routines: Map<string, Uint8Array>, ctx: BuildContext): Promise<void> {
		for (const plugin of this.plugins) {
			if (plugin.afterCompile) {
				await plugin.afterCompile(routines, ctx);
			}
		}
	}

	/**
	 * Run generateBundle hook for all plugins
	 */
	async generateBundle(files: Map<string, string | Uint8Array>, ctx: BuildContext): Promise<void> {
		for (const plugin of this.plugins) {
			if (plugin.generateBundle) {
				await plugin.generateBundle(files, ctx);
			}
		}
	}

	/**
	 * Run buildEnd hook for all plugins
	 */
	async buildEnd(ctx: BuildContext): Promise<void> {
		for (const plugin of this.plugins) {
			if (plugin.buildEnd) {
				await plugin.buildEnd(ctx);
			}
		}
	}

	/**
	 * Run buildError hook for all plugins
	 */
	async buildError(error: Error, ctx: BuildContext): Promise<void> {
		for (const plugin of this.plugins) {
			if (plugin.buildError) {
				await plugin.buildError(error, ctx);
			}
		}
	}
}

/**
 * Create a plugin container
 */
export function createPluginContainer(plugins: L8BPlugin[] = []): PluginContainer {
	return new PluginContainer(plugins);
}
