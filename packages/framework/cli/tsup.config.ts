import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		bin: "src/bin.ts",
	},
	format: ["esm", "cjs"],
	dts: true,
	clean: true,
	shims: true,
	skipNodeModulesBundle: true,
	banner: {
		js: "#!/usr/bin/env node",
	},
});
