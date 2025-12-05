/**
 * Module Imports Generator
 *
 * Generates import statements and module maps for production and development
 */

import type { CompiledModule } from "../../../../core/types";

/**
 * Sanitize variable name from module name
 */
function sanitizeVarName(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, "_");
}

export interface ModuleImports {
	sourceImports: string;
	sourceMap: string;
	compiledRoutinesMap: string;
}

/**
 * Generate module imports for production (using compiled routines)
 */
export function generateProductionImports(compiledModules: CompiledModule[]): ModuleImports {
	const compiledImports = compiledModules
		.map((module) => {
			const varName = sanitizeVarName(module.name);
			const safeModuleName = module.name.replace(/[^a-zA-Z0-9._-]/g, "_");
			return `import ${varName} from '/compiled/${safeModuleName}.js';`;
		})
		.join("\n      ");

	const compiledRoutinesMap = compiledModules
		.map((module) => {
			const varName = sanitizeVarName(module.name);
			const safeModuleName = JSON.stringify(module.name);
			return `${safeModuleName}: new Routine(0).import(${varName}.routine)`;
		})
		.join(",\n          ");

	return {
		sourceImports: compiledImports,
		sourceMap: "",
		compiledRoutinesMap,
	};
}

/**
 * Generate module imports for development (using source files)
 */
export function generateDevelopmentImports(sources: Record<string, string>): ModuleImports {
	const sourceEntries = Object.entries(sources);
	const sourceImports = sourceEntries
		.map(([name, filePath]) => {
			const varName = sanitizeVarName(name);
			return `import ${varName} from '${filePath}?raw';`;
		})
		.join("\n      ");

	const sourceMap = sourceEntries
		.map(([name]) => {
			const varName = sanitizeVarName(name);
			const safeName = JSON.stringify(name);
			return `${safeName}: ${varName}`;
		})
		.join(",\n          ");

	return {
		sourceImports,
		sourceMap,
		compiledRoutinesMap: "",
	};
}
