/**
 * Lightweight worker entry for future parallel compilation tasks.
 *
 * The CLI currently compiles files on the main thread, but we keep this
 * worker ready so we can offload expensive work without changing the
 * publishing pipeline (tsup already emits this file).
 */

import { parentPort } from "node:worker_threads";
import { type CompileResult, compileSource } from "@l8b/compiler";

type CompileWorkerMessage =
	| {
			id: number | string;
			source: string;
			filename?: string;
	  }
	| {
			id: number | string;
			error: string;
	  };

if (parentPort) {
	parentPort.on("message", (message: CompileWorkerMessage) => {
		if (!("source" in message)) {
			return;
		}

		let result: CompileResult;

		try {
			result = compileSource(message.source, message.filename);
		} catch (error: any) {
			parentPort!.postMessage({
				id: message.id,
				error: error?.message || String(error),
			});
			return;
		}

		parentPort!.postMessage({
			id: message.id,
			result,
		});
	});
}
