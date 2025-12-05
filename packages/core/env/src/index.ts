/**
 * @l8b/env - Environment Variables API
 *
 * Provides read-only access to environment variables from LootiScript code.
 * Environment variables are loaded from .env files during build/dev and
 * exposed to game code via the global `env` object.
 */

export { EnvService } from "./env-service";
export type { EnvAPI } from "./types";


