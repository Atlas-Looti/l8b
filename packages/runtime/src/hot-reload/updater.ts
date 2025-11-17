/**
 * Source code updater for hot reload
 */

import type { RuntimeListener } from "../types";
import type { L8BVM } from "../vm";

export class SourceUpdater {
	private updateMemory: Record<string, string> = {};
	private previousInit: string | null = null;

	constructor(
		private vm: L8BVM,
		private listener: RuntimeListener,
	) {}

	/**
	 * Update source code (hot reload)
	 */
	updateSource(file: string, src: string, reinit = false): boolean {
		if (src === this.updateMemory[file]) return false; // No change

		this.updateMemory[file] = src;

		try {
			// Compile and execute
			this.vm.run(src, 3000, file);

			// Notify listener
			if (this.listener.postMessage) {
				this.listener.postMessage({
					name: "compile_success",
					file: file,
				});
			}

			// Check for errors
			if (this.vm.error_info) {
				const err: any = Object.assign({}, this.vm.error_info);
				err.type = "init";
				err.file = file;
				this.reportError(err);
				return false;
			}

			// Re-run init() if changed
			if (reinit && (this.vm.runner as any).getFunctionSource) {
				const init = (this.vm.runner as any).getFunctionSource("init");
				if (init && init !== this.previousInit) {
					this.previousInit = init;
					this.vm.call("init");
					if (this.vm.error_info) {
						const err: any = Object.assign({}, this.vm.error_info);
						err.type = "init";
						this.reportError(err);
					}
				}
			}

			return true;
		} catch (err: any) {
			// Handle error object properly
			console.error("Parse/Runtime error:", err);

			const vmError = this.vm.error_info ? { ...this.vm.error_info } : null;

			const getMessage = (): string => {
				if (typeof err === "string") return err;
				if (err?.message) return err.message;
				if (typeof err?.error === "string") return err.error;
				if (typeof err?.error === "function") return "Parse error (function)";
				if (err?.error) {
					try {
						return JSON.stringify(err.error);
					} catch {
						return String(err.error);
					}
				}
				try {
					return JSON.stringify(err);
				} catch {
					return String(err);
				}
			};

			const errorPayload = vmError || {
				error: getMessage(),
				type: err?.type || "init",
				file: err?.file || file,
				line: err?.line,
				column: err?.column,
				stack: err?.stack,
			};

			// Ensure filename is set
			if (!errorPayload.file) {
				errorPayload.file = file;
			}

			this.reportError(errorPayload);
			return false;
		}
	}

	/**
	 * Report error to listener
	 */
	private reportError(error: any): void {
		if (this.listener.reportError) {
			this.listener.reportError(error);
		}
	}
}
