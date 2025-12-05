/**
 * Environment Service
 *
 * Service for managing and exposing environment variables to LootiScript code.
 * Provides read-only access to environment variables for security.
 */

import type { EnvAPI } from "./types";

/**
 * Environment Service
 *
 * Manages environment variables and provides read-only access via EnvAPI interface.
 */
export class EnvService {
	private envVars: Record<string, string>;

	/**
	 * Create new EnvService instance
	 *
	 * @param envVars - Object containing environment variables (key-value pairs)
	 */
	constructor(envVars: Record<string, string> = {}) {
		// Create a copy to prevent external mutations
		this.envVars = { ...envVars };
	}

	/**
	 * Get interface for LootiScript exposure
	 *
	 * Returns a read-only interface that can be safely exposed to game code.
	 *
	 * @returns EnvAPI interface instance
	 */
	getInterface(): EnvAPI {
		return {
			get: (key: string): string | undefined => {
				return this.envVars[key];
			},

			has: (key: string): boolean => {
				return key in this.envVars;
			},

			keys: (): string[] => {
				return Object.keys(this.envVars);
			},
		};
	}

	/**
	 * Update environment variables (for hot reload or runtime updates)
	 *
	 * @param envVars - New environment variables to merge
	 */
	update(envVars: Record<string, string>): void {
		this.envVars = { ...this.envVars, ...envVars };
	}

	/**
	 * Get all environment variables (for debugging/internal use)
	 *
	 * @returns Copy of all environment variables
	 */
	getAll(): Record<string, string> {
		return { ...this.envVars };
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		this.envVars = {};
	}
}
