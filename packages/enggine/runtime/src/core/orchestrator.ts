import type { RuntimeOptions } from "../types";
import { RuntimeControllerImpl } from "./controller";

/**
 * Backward-compatible runtime class.
 *
 * New code should prefer `createRuntime()` and the `RuntimeController` interface.
 */
export class RuntimeOrchestrator extends RuntimeControllerImpl {
	constructor(options: RuntimeOptions = {}) {
		super(options);
	}
}
