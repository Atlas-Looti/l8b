/**
 * Initialize a new LootiScript project
 *
 * Entry point for the init command - delegates to InitController
 */

import { createControllers } from "../infrastructure/adapters/factories";

export interface InitOptions {
	/** Project name (directory name) */
	name: string;
	/** Force overwrite existing directory */
	force?: boolean;
}

/**
 * Initialize new project
 *
 * @param options - Init options
 */
export async function init(options: InitOptions): Promise<void> {
	const controllers = createControllers();
	await controllers.initController.execute({
		name: options.name,
		force: options.force ?? false,
	});
}
