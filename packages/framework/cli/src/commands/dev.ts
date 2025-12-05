/**
 * Development server for LootiScript projects
 *
 * Entry point for the dev command
 */

import type { ViteDevServer } from "vite";
import { createUseCases } from "../infrastructure/adapters/factories";
import { isFailure } from "../core/types";

/**
 * Development server options
 */
export interface DevOptions {
	/** Port to run server on */
	port?: number;
	/** Host to bind to (false = localhost, true = 0.0.0.0, string = specific host) */
	host?: string | boolean;
	/** Enable tunneling for Farcaster Mini Apps testing */
	tunnel?: boolean;
}

/**
 * Start development server for LootiScript project
 *
 * @param projectPath - Absolute path to project root
 * @param options - Server configuration options
 * @returns Vite dev server instance
 * @throws {ServerError} If server fails to start
 */
export async function dev(projectPath: string = process.cwd(), options: DevOptions = {}): Promise<ViteDevServer> {
	const useCases = createUseCases();
	const result = await useCases.startDevServerUseCase.execute({
		projectPath,
		options,
	});

	if (isFailure(result)) {
		throw result.error;
	}

	return result.data.server;
}
