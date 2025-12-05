/**
 * Esbuild Bundler Adapter
 *
 * Implementation of IBundler using esbuild
 */

import { build } from "esbuild";
import path from "path";
import type { IBundler, IFileSystem } from "../../core/ports";
import { BUILD } from "../../utils/constants";
import { BuildError } from "../../utils/errors";
import { DEFAULT_FILES, findWorkspaceRoot, getCliPackageRoot } from "../../utils/paths";

export class EsbuildBundler implements IBundler {
	constructor(
		private fileSystem: IFileSystem,
	) {}

	async bundleRuntime(distDir: string, projectPath: string): Promise<void> {
		const outputFile = path.join(distDir, DEFAULT_FILES.RUNTIME_BUNDLE);

		// Try to use pre-built runtime bundle from CLI package
		try {
			const cliPackageRoot = getCliPackageRoot();
			const preBuiltRuntime = path.join(cliPackageRoot, "dist", "assets", "runtime.js");

			if (await this.fileSystem.pathExists(preBuiltRuntime)) {
				// Copy pre-built bundle to project dist
				await this.fileSystem.copy(preBuiltRuntime, outputFile);
				return;
			}
		} catch (error) {
			// If we can't find pre-built bundle, fall through to dynamic bundling
		}

		// Fallback to dynamic bundling (existing logic)
		try {
			// Find workspace root
			const workspaceRoot = await findWorkspaceRoot(projectPath, BUILD.MAX_WORKSPACE_DEPTH);

			let runtimeEntryPath: string | null = null;
			let lootiscriptEntryPath: string | null = null;

			// Try workspace first (monorepo)
			if (workspaceRoot) {
				const runtimeCandidates = [
					path.join(workspaceRoot, "packages", "runtime", "dist", "index.js"),
					path.join(workspaceRoot, "packages", "enggine", "runtime", "dist", "index.js"),
				];
				const lootiscriptCandidates = [path.join(workspaceRoot, "packages", "lootiscript", "dist", "index.js")];

				for (const candidate of runtimeCandidates) {
					if (await this.fileSystem.pathExists(candidate)) {
						runtimeEntryPath = candidate;
						break;
					}
				}

				for (const candidate of lootiscriptCandidates) {
					if (await this.fileSystem.pathExists(candidate)) {
						lootiscriptEntryPath = candidate;
						break;
					}
				}
			}

			// Fallback to node_modules
			if (!runtimeEntryPath || !lootiscriptEntryPath) {
				const nodeModulesPath = path.join(projectPath, "node_modules");
				if (await this.fileSystem.pathExists(nodeModulesPath)) {
					const runtimePkg = path.join(nodeModulesPath, "@l8b", "runtime", "dist", "index.js");
					const lootiscriptPkg = path.join(nodeModulesPath, "@l8b", "lootiscript", "dist", "index.js");

					if (!runtimeEntryPath && (await this.fileSystem.pathExists(runtimePkg))) {
						runtimeEntryPath = runtimePkg;
					}
					if (!lootiscriptEntryPath && (await this.fileSystem.pathExists(lootiscriptPkg))) {
						lootiscriptEntryPath = lootiscriptPkg;
					}
				}
			}

			if (!runtimeEntryPath || !lootiscriptEntryPath) {
				const triedPaths: string[] = [];
				if (workspaceRoot) {
					triedPaths.push(
						path.join(workspaceRoot, "packages", "runtime", "dist", "index.js"),
						path.join(workspaceRoot, "packages", "enggine", "runtime", "dist", "index.js"),
						path.join(workspaceRoot, "packages", "lootiscript", "dist", "index.js"),
					);
				}
				triedPaths.push(
					path.join(projectPath, "node_modules", "@l8b", "runtime", "dist", "index.js"),
					path.join(projectPath, "node_modules", "@l8b", "lootiscript", "dist", "index.js"),
				);

				throw new BuildError("Could not find @l8b/runtime or @l8b/lootiscript", {
					triedPaths,
					workspaceRoot,
					projectPath,
				});
			}

			// Create a temporary entry file that imports both and re-exports
			const tempEntryPath = path.join(distDir, ".temp-entry.js");
			const tempEntryContent = `
// Temporary entry file for bundling
export { Runtime } from '${runtimeEntryPath.replace(/\\/g, "/")}';
export { Routine } from '${lootiscriptEntryPath.replace(/\\/g, "/")}';
`;

			await this.fileSystem.writeFile(tempEntryPath, tempEntryContent);

			try {
				// Bundle using esbuild with improved tree-shaking
				await build({
					entryPoints: [tempEntryPath],
					bundle: true,
					format: "esm",
					outfile: outputFile,
					platform: "browser",
					target: "es2022",
					splitting: false,
					// Bundle all dependencies including @l8b/* packages
					external: [],
					// Enhanced tree shaking
					treeShaking: true,
					// Bundle all packages (don't externalize them)
					packages: "bundle",
					// Minify for production
					minify: true,
					// Source maps for debugging (optional)
					sourcemap: false,
					// Resolve extensions
					resolveExtensions: [".js", ".ts", ".json", ".mjs"],
					// Preserve names for exports
					keepNames: true,
					// Additional optimizations
					legalComments: "none", // Remove license comments
					// Define sideEffects: false for better tree-shaking
					conditions: [],
					// Provide buffer polyfill for browser compatibility
					define: {
						global: "globalThis",
					},
				});
			} finally {
				// Clean up temp file
				if (await this.fileSystem.pathExists(tempEntryPath)) {
					await this.fileSystem.remove(tempEntryPath);
				}
			}
		} catch (error) {
			if (error instanceof BuildError) {
				throw error;
			}
			throw new BuildError("Failed to bundle runtime", {
				error: error instanceof Error ? error.message : String(error),
				distDir,
				projectPath,
			});
		}
	}
}
