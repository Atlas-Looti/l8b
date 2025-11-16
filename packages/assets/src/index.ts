/**
 * @l8b/assets - Asset management system
 *
 * Architecture:
 * - core/: AssetManager orchestrator
 * - types/: Loader result + runtime interfaces
 */

export type { Runtime } from "./core/asset-manager";
export {
	AssetManager,
	AssetManager as default,
} from "./core/asset-manager";
export type {
	AssetManagerOptions,
	ImageLoaderResult,
	JSONLoaderResult,
	LoaderResult,
	Runtime as AssetManagerRuntime,
	TextLoaderResult,
} from "./types";
