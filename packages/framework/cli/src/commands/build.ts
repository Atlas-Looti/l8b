/**
 * Build process for LootiScript projects
 *
 * Entry point for the build command
 */

import { createUseCases } from "../infrastructure/adapters/factories";
import { isFailure } from "../core/types";

/**
 * Build project for production
 *
 * @param projectPath - Absolute path to project root
 * @throws {CompilationError} If LootiScript compilation fails
 */
export async function build(projectPath: string = process.cwd()): Promise<void> {
	const useCases = createUseCases();
	const result = await useCases.buildProjectUseCase.execute({
		projectPath,
	});

	if (isFailure(result)) {
		throw result.error;
	}
}
