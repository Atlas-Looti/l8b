import { defineConfig } from "tsup";

import { treeShakableConfig } from "../../../tsup.config.base";

export default defineConfig({
	...treeShakableConfig,
	entry: ["src/server.ts"],
	format: ["cjs"],
	dts: false,
	splitting: false,
	sourcemap: true,
	clean: true,
});
