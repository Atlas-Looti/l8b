/**
 * Source code updater for hot reload
 * Matches runtime behavior for source updates
 */

import type { L8BVM } from "@l8b/vm";
import type { RuntimeListener } from "../types";

export class SourceUpdater {
	private updateMemory: Record<string, string> = {};
	private previousInit: string | null = null;
	private reportErrors: boolean = true;

	constructor(
		private vm: L8BVM,
		private listener: RuntimeListener,
		private audio?: { cancelBeeps(): void },
		private screen?: { clear(): void },
		private reportWarnings?: () => void,
	) {}

	/**
	 * Update source code (hot reload)
	 */
	updateSource(file: string, src: string, reinit = false): boolean {
		// Return false if VM is not available
		if (!this.vm) return false;

		// Return false if source code hasn't changed
		if (src === this.updateMemory[file]) return false;

		this.updateMemory[file] = src;

		// Cancel beeps and clear screen before hot reload
		if (this.audio) {
			this.audio.cancelBeeps();
		}
		if (this.screen) {
			this.screen.clear();
		}

		try {
			// Compile and execute updated source code
			// Timeout of 3000ms prevents infinite loops during hot reload
			this.vm.run(src, 3000, file);

			// Notify parent process of successful compilation
			if (this.listener.postMessage) {
				this.listener.postMessage({
					name: "compile_success",
					file: file,
				});
			}

			// Report warnings after compilation
			if (this.reportWarnings) {
				this.reportWarnings();
			}

			// Check for compilation or runtime errors from VM
			if (this.vm.error_info) {
				const err: any = Object.assign({}, this.vm.error_info);
				err.type = "init";
				err.file = file;
				this.reportError(err);
				return false;
			}

			// Re-run init() function if it was modified during hot reload
			// This allows reinitialization without full page refresh
			if ((this.vm.runner as any)?.getFunctionSource) {
				const init = (this.vm.runner as any).getFunctionSource("init");
				if (init && init !== this.previousInit && reinit) {
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
			// Handle exceptions during compilation or execution
			// Only report errors if report_errors flag is true
			if (this.reportErrors) {
				console.error(err);
				err.file = file;
				this.reportError(err);
				return false;
			}
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
