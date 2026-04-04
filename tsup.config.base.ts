import type { Options } from "tsup";

const runtime = globalThis as {
	process?: { env?: Record<string, string | undefined> };
	Bun?: { env?: Record<string, string | undefined> };
};
const nodeEnv = runtime.Bun?.env?.NODE_ENV ?? runtime.process?.env?.NODE_ENV ?? "development";

export const treeShakableConfig: Options = {
	splitting: false,
	clean: true,
	target: "es2022",
	format: ["esm", "cjs"],
	bundle: true,
	skipNodeModulesBundle: true,
	watch: false,
	shims: true,
	entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}"],
	outDir: "dist",
	dts: true,
	minify: nodeEnv === "production",
	sourcemap: nodeEnv !== "production",
	// onSuccess: "tsc --emitDeclarationOnly --declaration --declarationMap --outDir dist && tsc-alias --outDir dist",
};
