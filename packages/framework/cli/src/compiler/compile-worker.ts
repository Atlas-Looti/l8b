/**
 * Worker thread for parallel LootiScript compilation
 *
 * This file is executed in a worker thread to compile .loot files in parallel.
 */

import { parentPort, workerData } from "worker_threads";
import {
	compileSource,
	type CompileResult as BaseCompileResult,
	type CompileError,
	type CompileWarning,
} from "@l8b/compiler";
import fs from "fs-extra";
import path from "path";
import type { CompiledModule } from "./build-compiler";

/**
 * Worker data interface
 */
interface WorkerData {
	chunk: Array<[string, string]>; // [moduleName, filePath]
	projectPath: string;
}

/**
 * Compile result from worker
 */
interface WorkerResult {
	compiled: CompiledModule[];
	errors: CompileError[];
	warnings: CompileWarning[];
}

if (!parentPort || !workerData) {
	throw new Error("Worker must be run in a worker thread");
}

const { chunk, projectPath }: WorkerData = workerData;

/**
 * Compile a single file
 */
function compileFile(filePath: string, filename: string): BaseCompileResult {
	try {
		const source = fs.readFileSync(filePath, "utf-8");
		return compileSource(source, filename);
	} catch (error: any) {
		return {
			errors: [
				{
					file: filename,
					error: error.message || String(error),
				},
			],
			warnings: [],
			filename,
		};
	}
}

/**
 * Process chunk of files
 */
async function processChunk(): Promise<WorkerResult> {
	const compiled: CompiledModule[] = [];
	const errors: CompileError[] = [];
	const warnings: CompileWarning[] = [];

	for (const [moduleName, filePath] of chunk) {
		// Resolve full file path
		// filePath from loadSources() is like "/scripts/main.loot" (project-relative with leading /)
		let fullPath: string;
		if (path.isAbsolute(filePath)) {
			// If it's an absolute path starting with /, it's project-relative
			if (filePath.startsWith("/") && !fs.existsSync(filePath)) {
				// Project-relative path, remove leading / and join with projectPath
				fullPath = path.join(projectPath, filePath.slice(1));
			} else {
				// Real absolute path
				fullPath = filePath;
			}
		} else {
			// Relative path
			fullPath = path.join(projectPath, filePath);
		}

		// Normalize the path
		const normalizedPath = path.normalize(fullPath);

		// Get relative filename for error reporting
		const relativePath = path.relative(projectPath, normalizedPath);
		const filename = relativePath || path.basename(normalizedPath);

		// Verify file exists
		if (!fs.existsSync(normalizedPath)) {
			errors.push({
				file: filename,
				error: `File not found: ${normalizedPath}`,
			});
			continue;
		}

		// Compile file
		const result = compileFile(normalizedPath, filename);

		if (result.errors.length > 0) {
			errors.push(...result.errors);
		} else if (result.routine) {
			compiled.push({
				name: moduleName,
				routine: result.routine,
				filename,
			});

			if (result.warnings.length > 0) {
				warnings.push(...result.warnings);
			}
		}
	}

	return { compiled, errors, warnings };
}

// Process chunk and send result
processChunk()
	.then((result) => {
		parentPort!.postMessage(result);
	})
	.catch((error) => {
		parentPort!.postMessage({
			compiled: [],
			errors: [
				{
					file: "worker",
					error: error.message || String(error),
				},
			],
			warnings: [],
		});
	});
