/**
 * Hashing utilities for L8B framework
 */
import { createHash } from "node:crypto";

/**
 * Generate a simple hash from content
 */
export function hashContent(content: string | Buffer): string {
	return createHash("md5").update(content).digest("hex").slice(0, 8);
}

/**
 * Generate version number from file content
 * Returns timestamp-like number for versioning
 */
export function generateVersion(content: string | Buffer): number {
	const hash = hashContent(content);
	// Convert first 8 chars of hash to number
	return Number.parseInt(hash, 16) % 100000000;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
	return Math.random().toString(36).slice(2, 11);
}

/**
 * Create a cache key from multiple parts
 */
export function createCacheKey(...parts: string[]): string {
	return hashContent(parts.join(":"));
}
