/**
 * Input validation utilities for CLI
 *
 * Provides centralized validation functions for common CLI inputs
 * like ports, paths, and other user-provided values.
 */

import fs from "fs-extra";
import path from "path";
import { ConfigError } from "./errors";
import { EXIT_CODES } from "./exit-codes";

/**
 * Validate port number
 *
 * @param port - Port number to validate
 * @returns Valid port number
 * @throws {ConfigError} If port is invalid
 */
export function validatePort(port: number): number {
	if (!Number.isInteger(port)) {
		throw new ConfigError(`Invalid port: ${port}. Must be an integer`, { port }, EXIT_CODES.INVALID_USAGE);
	}

	if (port < 1 || port > 65535) {
		throw new ConfigError(`Invalid port: ${port}. Must be between 1 and 65535`, { port }, EXIT_CODES.INVALID_USAGE);
	}

	return port;
}

/**
 * Validate project path exists
 *
 * @param projectPath - Path to validate
 * @returns Absolute path if valid
 * @throws {ConfigError} If path doesn't exist
 */
export async function validateProjectPath(projectPath: string): Promise<string> {
	const absolutePath = path.resolve(projectPath);

	if (!(await fs.pathExists(absolutePath))) {
		throw new ConfigError(
			`Project path does not exist: ${projectPath}`,
			{ path: projectPath, absolutePath },
			EXIT_CODES.INVALID_USAGE,
		);
	}

	if (!(await fs.stat(absolutePath)).isDirectory()) {
		throw new ConfigError(
			`Project path is not a directory: ${projectPath}`,
			{ path: projectPath, absolutePath },
			EXIT_CODES.INVALID_USAGE,
		);
	}

	return absolutePath;
}

/**
 * Validate project path exists (synchronous version)
 *
 * @param projectPath - Path to validate
 * @returns Absolute path if valid
 * @throws {ConfigError} If path doesn't exist
 */
export function validateProjectPathSync(projectPath: string): string {
	const absolutePath = path.resolve(projectPath);

	if (!fs.existsSync(absolutePath)) {
		throw new ConfigError(
			`Project path does not exist: ${projectPath}`,
			{ path: projectPath, absolutePath },
			EXIT_CODES.INVALID_USAGE,
		);
	}

	if (!fs.statSync(absolutePath).isDirectory()) {
		throw new ConfigError(
			`Project path is not a directory: ${projectPath}`,
			{ path: projectPath, absolutePath },
			EXIT_CODES.INVALID_USAGE,
		);
	}

	return absolutePath;
}

/**
 * Validate contract address format
 *
 * @param address - Contract address to validate
 * @returns Valid address
 * @throws {ConfigError} If address is invalid
 */
export function validateContractAddress(address: string): string {
	if (!address) {
		throw new ConfigError("Contract address is required", undefined, EXIT_CODES.INVALID_USAGE);
	}

	// Basic Ethereum address validation (0x followed by 40 hex characters)
	const addressRegex = /^0x[a-fA-F0-9]{40}$/;
	if (!addressRegex.test(address)) {
		throw new ConfigError(`Invalid contract address format: ${address}`, { address }, EXIT_CODES.INVALID_USAGE);
	}

	return address;
}

/**
 * Validate chain name
 *
 * @param chain - Chain name to validate
 * @returns Valid chain name
 * @throws {ConfigError} If chain is invalid
 */
export function validateChain(chain: string): string {
	const validChains = ["base", "ethereum", "optimism", "arbitrum"];

	if (!validChains.includes(chain.toLowerCase())) {
		throw new ConfigError(
			`Invalid chain: ${chain}. Must be one of: ${validChains.join(", ")}`,
			{ chain, validChains },
			EXIT_CODES.INVALID_USAGE,
		);
	}

	return chain.toLowerCase();
}

/**
 * Validate project name (for init command)
 *
 * @param name - Project name to validate
 * @returns Valid project name
 * @throws {ConfigError} If name is invalid
 */
export function validateProjectName(name: string): string {
	if (!name || name.trim().length === 0) {
		throw new ConfigError("Project name is required", undefined, EXIT_CODES.INVALID_USAGE);
	}

	// Check for invalid characters in directory name
	const invalidChars = /[<>:"|?*\x00-\x1f]/;
	if (invalidChars.test(name)) {
		throw new ConfigError(
			`Invalid project name: ${name}. Contains invalid characters for directory name`,
			{ name },
			EXIT_CODES.INVALID_USAGE,
		);
	}

	// Check for reserved names (Windows)
	const reservedNames = [
		"CON",
		"PRN",
		"AUX",
		"NUL",
		"COM1",
		"COM2",
		"COM3",
		"COM4",
		"COM5",
		"COM6",
		"COM7",
		"COM8",
		"COM9",
		"LPT1",
		"LPT2",
		"LPT3",
		"LPT4",
		"LPT5",
		"LPT6",
		"LPT7",
		"LPT8",
		"LPT9",
	];

	if (reservedNames.includes(name.toUpperCase())) {
		throw new ConfigError(`Invalid project name: ${name}. Reserved name`, { name }, EXIT_CODES.INVALID_USAGE);
	}

	return name.trim();
}
