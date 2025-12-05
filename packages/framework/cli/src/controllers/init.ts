/**
 * Init Controller
 *
 * CLI controller for initializing new projects
 */

import pc from "picocolors";
import type { InitProjectInput } from "../core/use-cases";
import { InitProjectUseCase } from "../core/use-cases";
import { isFailure } from "../core/types";

export class InitController {
	constructor(private initProjectUseCase: InitProjectUseCase) {}

	async execute(input: InitProjectInput): Promise<void> {
		const result = await this.initProjectUseCase.execute(input);

		if (isFailure(result)) {
			console.error(pc.red(`\n✗ ${result.error.message}\n`));
			throw result.error;
		}

		console.log(pc.green("  ✓ Project created successfully!\n"));
		console.log(pc.gray("  Next steps:"));
		console.log(pc.cyan(`    cd ${input.name}`));
		console.log(pc.cyan("    npm install"));
		console.log(pc.cyan("    npx l8b dev\n"));
	}
}
