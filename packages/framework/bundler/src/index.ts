/**
 * L8B Bundler Package
 * Production build system for L8B games
 */

// Main bundler
export {
	L8BBundler,
	createBundler,
	build,
	type BundleResult,
	type L8BBuildOptions,
	// Re-export plugin type for convenience
	type L8BPlugin,
} from "./bundler";

// Plugin system
export {
	type L8BPlugin as Plugin,
	type BuildContext,
	type AssetInfo,
	type TransformedAsset,
	type HookResult,
	PluginContainer,
	createPluginContainer,
} from "./plugins/index";

// Built-in plugins
export { runtimePlugin, type RuntimePluginOptions } from "./plugins/runtime";
export { assetsPlugin, type AssetsPluginOptions, hashFile, getMimeType } from "./plugins/assets";
export { htmlPlugin, type HTMLPluginOptions } from "./plugins/html";
export { minifyPlugin, type MinifyPluginOptions, simpleMinify } from "./plugins/minify";
