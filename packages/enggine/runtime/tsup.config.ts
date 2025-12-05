import { defineConfig } from "tsup";
import { treeShakableConfig } from "../../../tsup.config.base";

export default defineConfig([
	// Standard ESM/CJS builds for Node.js/bundlers
	{
		...treeShakableConfig,
	},
	// Browser-ready IIFE bundle (pre-built, no bundler needed)
	{
		entry: ["src/index.ts"],
		format: ["iife"],
		outDir: "dist/browser",
		globalName: "L8BRuntime",
		platform: "browser",
		minify: false, // Dev version
		sourcemap: true,
		outExtension: () => ({ js: ".js" }),
		esbuildOptions(options) {
			options.define = {
				"process.env.NODE_ENV": '"development"',
			};
		},
	},
	// Minified browser bundle for production
	{
		entry: ["src/index.ts"],
		format: ["iife"],
		outDir: "dist/browser",
		globalName: "L8BRuntime",
		platform: "browser",
		minify: true,
		sourcemap: false,
		outExtension: () => ({ js: ".min.js" }),
		esbuildOptions(options) {
			options.define = {
				"process.env.NODE_ENV": '"production"',
			};
		},
	},
]);
