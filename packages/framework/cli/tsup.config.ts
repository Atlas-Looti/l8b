import { defineConfig } from "tsup";
import { treeShakableConfig } from "../../../tsup.config.base";

export default defineConfig({
	...treeShakableConfig,
	entry: {
		index: "src/index.ts",
		cli: "src/cli.ts",
	},
	format: ["esm"],
	shims: true,
	outExtension({ format }) {
		return {
			js: `.mjs`,
		};
	},
});
