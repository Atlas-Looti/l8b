/**
 * Source code updater for hot reload
 * Matches runtime behavior for source updates
 */

import type { L8BVM } from "@al8b/vm";
import type { RuntimeListener } from "../types";

export class SourceUpdater {
	private updateMemory: Record<string, string> = {};
	private previousInit: string | null = null;

	constructor(
		private vm: L8BVM,
		private listener: RuntimeListener,
		private audio?: { cancelBeeps(): void },
		private screen?: { clear(): void },
		private reportWarnings?: () => void,
		private emitBridgeEvent?: (name: string, payload?: unknown) => void,
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
			if (this.emitBridgeEvent) {
				this.emitBridgeEvent("compile_success", { file });
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
				this.listener.reportError?.(err);
				return false;
			}

			// Re-run init() function if it was modified during hot reload
			// This allows reinitialization without full page refresh
			if (this.vm.runner?.getFunctionSource) {
				const init = this.vm.runner.getFunctionSource("init");
				if (init && init !== this.previousInit && reinit) {
					this.previousInit = init;
					this.vm.call("init");
					if (this.vm.error_info) {
						const err: any = Object.assign({}, this.vm.error_info);
						err.type = "init";
						this.listener.reportError?.(err);
					}
				}
			}

			return true;
		} catch (err: any) {
			// Handle exceptions during compilation or execution
			err.file = file;
			this.listener.reportError?.(err);
			return false;
		}
	}
}
