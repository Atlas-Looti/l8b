/**
 * Environment Loader Adapter
 *
 * Loads environment variables from .env files
 */

import path from "path";
import type { IFileSystem, ILogger } from "../../core/ports";

/**
 * Parse .env file content into key-value pairs
 */
function parseEnvFile(content: string): Record<string, string> {
	const env: Record<string, string> = {};
	const lines = content.split(/\r?\n/);

	for (const line of lines) {
		// Skip empty lines and comments
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) {
			continue;
		}

		// Parse KEY=VALUE format
		const match = trimmed.match(/^([^=:#]+)=(.*)$/);
		if (match) {
			const key = match[1].trim();
			let value = match[2].trim();

			// Remove quotes if present
			if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
				value = value.slice(1, -1);
			}

			env[key] = value;
		}
	}

	return env;
}

/**
 * Load environment variables from .env files
 *
 * Loads files in this order (later files override earlier ones):
 * 1. .env (base)
 * 2. .env.local (local overrides, gitignored)
 * 3. .env.{mode} (mode-specific, e.g., .env.development, .env.production)
 * 4. .env.{mode}.local (mode-specific local overrides)
 *
 * @param projectPath - Absolute path to project root
 * @param fileSystem - File system implementation
 * @param mode - Environment mode (development, production, etc.)
 * @returns Object containing all environment variables
 */
export async function loadEnvFiles(
	projectPath: string,
	fileSystem: IFileSystem,
	mode: string = "development",
	logger?: ILogger,
): Promise<Record<string, string>> {
	const env: Record<string, string> = {};

	// Files to load in order (later override earlier)
	const envFiles = [".env", ".env.local", `.env.${mode}`, `.env.${mode}.local`];

	for (const fileName of envFiles) {
		const filePath = path.join(projectPath, fileName);
		if (await fileSystem.pathExists(filePath)) {
			try {
				const content = await fileSystem.readFile(filePath, "utf-8");
				const parsed = parseEnvFile(content);
				Object.assign(env, parsed);
			} catch (error) {
				// Log warning if logger is available, otherwise silently skip
				if (logger) {
					logger.warn(`Could not read ${fileName}`);
				}
			}
		}
	}

	// Also load from process.env (for CI/CD and runtime injection)
	// Only add if not already in env (file-based env takes precedence)
	for (const [key, value] of Object.entries(process.env)) {
		if (value !== undefined && !(key in env)) {
			env[key] = value;
		}
	}

	return env;
}

