/**
 * Environment Variables API Types
 *
 * Type definitions for environment variables API exposed to LootiScript
 */

/**
 * Environment Variables API interface
 *
 * Provides read-only access to environment variables from LootiScript code.
 * All environment variables are strings and must be accessed via get() method.
 */
export interface EnvAPI {
	/**
	 * Get environment variable value by key
	 *
	 * @param key - Environment variable key (case-sensitive)
	 * @returns Environment variable value as string, or undefined if not found
	 *
	 * @example
	 * local apiKey = env.get("API_KEY")
	 * local apiUrl = env.get("API_URL") or "https://default.com"
	 */
	get(key: string): string | undefined;

	/**
	 * Check if environment variable exists
	 *
	 * @param key - Environment variable key (case-sensitive)
	 * @returns true if variable exists, false otherwise
	 *
	 * @example
	 * if env.has("DEBUG") then
	 *   print("Debug mode enabled")
	 * end
	 */
	has(key: string): boolean;

	/**
	 * Get all environment variable keys
	 *
	 * @returns Array of all available environment variable keys
	 *
	 * @example
	 * local keys = env.keys()
	 * for i = 1, #keys do
	 *   print(keys[i])
	 * end
	 */
	keys(): string[];
}


