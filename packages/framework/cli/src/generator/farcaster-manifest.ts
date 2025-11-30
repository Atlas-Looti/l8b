/**
 * Farcaster Mini App Manifest Generator
 *
 * Generates /.well-known/farcaster.json manifest file
 * according to Farcaster Mini Apps specification.
 */

import type { FarcasterManifestConfig, LootiConfig } from "../config";

/**
 * Generate Farcaster Mini App manifest JSON
 *
 * @param config - LootiScript configuration
 * @returns Manifest JSON object or null if no manifest config
 */
export function generateFarcasterManifest(config: LootiConfig): FarcasterManifestConfig | null {
	const manifest = config.farcaster?.manifest;

	if (!manifest) {
		return null;
	}

	// Validate required fields
	if (!manifest.accountAssociation || !manifest.miniapp) {
		return null;
	}

	// Return manifest as-is (validation should happen at config level)
	return manifest;
}

/**
 * Generate manifest JSON string
 *
 * @param config - LootiScript configuration
 * @returns JSON string or null
 */
export function generateFarcasterManifestJSON(config: LootiConfig): string | null {
	const manifest = generateFarcasterManifest(config);

	if (!manifest) {
		return null;
	}

	return JSON.stringify(manifest, null, 2);
}
