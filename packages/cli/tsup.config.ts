import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

type PackageJson = {
	dependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
};

const pkg: PackageJson = JSON.parse(
	readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
);

const externalDeps = Array.from(
	new Set([
		...Object.keys(pkg.dependencies ?? {}),
		...Object.keys(pkg.peerDependencies ?? {}),
	]),
);

export default defineConfig({
	entry: ["src/index.ts", "src/cli.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	shims: true,
	treeshake: true,
	sourcemap: true,
	target: "node18",
	platform: "node",
	minify: process.env.NODE_ENV === "production",
	external: externalDeps,
	onSuccess: async () => {
		const distAssetsDir = join(process.cwd(), "dist", "assets", "fonts");
		mkdirSync(distAssetsDir, { recursive: true });
		copyFileSync(
			join(process.cwd(), "src", "assets", "fonts", "BitCell.ttf"),
			join(distAssetsDir, "BitCell.ttf"),
		);
	},
});
