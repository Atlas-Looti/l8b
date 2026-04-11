import { defineConfig } from "tsup";
import { treeShakableConfig } from "../../../tsup.config.base";

export default defineConfig([
	{
		...treeShakableConfig,
		dts: true,
	},
	// Browser-ready IIFE bundle
	{
		entry: ["src/index.ts"],
		format: ["iife"],
		outDir: "dist/browser",
		globalName: "LootiScript",
		platform: "browser",
		minify: false,
		sourcemap: true,
		bundle: true,
		noExternal: [],
		outExtension: () => ({ js: ".js" }),
		esbuildOptions(options) {
			options.define = {
				"process.env.NODE_ENV": '"development"',
			};
		},
	},
	// Minified browser bundle
	{
		entry: ["src/index.ts"],
		format: ["iife"],
		outDir: "dist/browser",
		globalName: "LootiScript",
		platform: "browser",
		minify: true,
		sourcemap: false,
		bundle: true,
		noExternal: [],
		outExtension: () => ({ js: ".min.js" }),
		esbuildOptions(options) {
			options.define = {
				"process.env.NODE_ENV": '"production"',
			};
		},
	},
]);
