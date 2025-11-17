/**
 * L8BVM - Virtual Machine wrapper for lootiscript
 */

import { Compiler, Processor, Program, Runner } from "@l8b/lootiscript";
import { StorageService } from "../storage";
import type { ErrorInfo, GlobalAPI, MetaFunctions, VMContext } from "../types";
import { createVMContext } from "./context";
import { setupArrayExtensions } from "./extensions";

// Expose Processor, Program, and Compiler to globalThis for Runner
if (typeof globalThis !== "undefined") {
	(globalThis as any).Processor = Processor;
	(globalThis as any).Program = Program;
	(globalThis as any).Compiler = Compiler;
}

export class L8BVM {
	public context: VMContext;
	public runner: Runner;
	public storage_service: StorageService;
	public error_info: ErrorInfo | null = null;

	constructor(
		meta: Partial<MetaFunctions> = {},
		global: Partial<GlobalAPI> = {},
		namespace = "/l8b",
		preserve_ls = false,
	) {
		// Setup context
		this.context = createVMContext(meta, global);

		// Create storage service
		this.storage_service = new StorageService(namespace, preserve_ls);

		// Add storage to global
		this.context.global.storage = this.storage_service.getInterface();

		// Create runner with l8bvm reference
		this.runner = new Runner(this as any);

		// Initialize runner (creates main_thread)
		this.runner.init();

		// Setup array extensions
		setupArrayExtensions();
	}

	/**
	 * Run source code
	 */
	run(source: string, timeout = 3000, filename = ""): any {
		this.error_info = null;
		this.context.timeout = Date.now() + timeout;
		this.context.stack_size = 0;

		try {
			const result = this.runner.run(source, filename);
			this.storage_service.check();

			if (result !== null && result !== undefined) {
				return this.runner.toString(result);
			}
			return null;
		} catch (err: any) {
			const errorMessage =
				(typeof err === "object" &&
				err !== null &&
				"error" in err &&
				typeof err.error === "string"
					? err.error
					: err.message) || String(err);

			this.error_info = {
				error: errorMessage,
				type: err.type || "runtime",
				line: err.line,
				column: err.column,
				file: err.file || filename,
				stack: err.stack,
			};
			throw err;
		}
	}

	/**
	 * Call a function
	 */
	call(name: string, args: any[] = [], timeout = 3000): any {
		this.error_info = null;
		this.context.timeout = Date.now() + timeout;
		this.context.stack_size = 0;

		try {
			const result = this.runner.call(name, ...args);
			this.storage_service.check();
			return result;
		} catch (err: any) {
			const errorMessage =
				(typeof err === "object" &&
				err !== null &&
				"error" in err &&
				typeof err.error === "string"
					? err.error
					: err.message) || String(err);

			this.error_info = {
				error: errorMessage,
				type: err.type || "call",
				line: err.line,
				column: err.column,
				file: err.file || name,
				stack: err.stack,
			};
			throw err;
		}
	}

	/**
	 * Clear warnings
	 */
	clearWarnings(): void {
		this.context.warnings = {
			using_undefined_variable: {},
			assigning_field_to_undefined: {},
			invoking_non_function: {},
			assigning_api_variable: {},
			assignment_as_condition: {},
		};
	}

	/**
	 * Get warnings
	 */
	getWarnings(): Record<string, any> {
		return this.context.warnings || {};
	}

	/**
	 * Convert value to string (for printing)
	 */
	toString(value: any): string {
		return this.runner.toString(value);
	}
}
