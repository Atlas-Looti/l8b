/**
 * Environment Variables API definitions
 */

import type { GlobalApi } from "../types";

export const envApi: Partial<GlobalApi> = {
	env: {
		type: "object",
		description: "Environment variables API - read-only access to environment variables",
		properties: {
			get: {
				type: "method",
				signature: "env.get(key: string): string | undefined",
				description: "Get environment variable value by key. Returns undefined if not found.",
			},
			has: {
				type: "method",
				signature: "env.has(key: string): boolean",
				description: "Check if environment variable exists",
			},
			keys: {
				type: "method",
				signature: "env.keys(): string[]",
				description: "Get all environment variable keys",
			},
		},
	},
};
