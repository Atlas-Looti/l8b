#!/usr/bin/env node
/**
 * L8B CLI entry point
 *
 * Command-line interface for LootiScript game development.
 * Provides commands for development, building, and serving production builds.
 *
 * Commands:
 * - dev: Start development server with HMR
 * - build: Compile project for production
 * - start: Serve production build
 *
 * @module framework/cli
 */

import cac from "cac";
import pc from "picocolors";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

import { dev, build, start } from "./commands";
import { DEFAULT_SERVER } from "./utils/constants";
import {
	ConfigError,
	BuildError,
	CompilationError,
	ServerError,
} from "./utils/errors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
	readFileSync(path.join(__dirname, "../package.json"), "utf-8"),
);
const version = packageJson.version;

const cli = cac("l8b");

cli
	.command("dev [root]", "Start development server with hot module replacement")
	.option("--port <port>", "Port to use", {
		default: DEFAULT_SERVER.PORT,
	})
	.option(
		"--host [host]",
		"Expose to network (use 0.0.0.0 to expose, or specify hostname)",
		{
			default: DEFAULT_SERVER.HOST,
		},
	)
	/**
	 * Dev Command Handler
	 *
	 * Starts the development server with:
	 * - Hot Module Replacement (HMR)
	 * - Asset watching
	 * - Error overlay
	 */
	.action(async (root, options) => {
		try {
			const projectPath = root ? path.resolve(root) : process.cwd();

			console.log(pc.cyan(`\n  🎮 L8B CLI v${version}\n`));
			console.log(pc.gray(`  Project: ${projectPath}\n`));

			// Parse port as number
			const port =
				typeof options.port === "string"
					? parseInt(options.port, 10)
					: options.port;

			await dev(projectPath, {
				port: port || DEFAULT_SERVER.PORT,
				host: options.host,
			});
		} catch (error) {
			if (error instanceof ServerError || error instanceof ConfigError) {
				console.error(error.format());
			} else {
				console.error(pc.red("\n✗ Error starting server:\n"));
				console.error(error);
			}
			process.exit(1);
		}
	});

cli
	.command("build [root]", "Build project for production")
	/**
	 * Build Command Handler
	 *
	 * Compiles the project for production:
	 * - Bundles assets
	 * - Compiles LootiScript to bytecode
	 * - Optimizes resources
	 */
	.action(async (root) => {
		try {
			const projectPath = root ? path.resolve(root) : process.cwd();

			await build(projectPath);
		} catch (error) {
			if (error instanceof BuildError || error instanceof CompilationError) {
				console.error(error.format());
			} else if (error instanceof ConfigError) {
				console.error(error.format());
			} else {
				console.error(pc.red("\n✗ Build failed:\n"));
				console.error(error);
			}
			process.exit(1);
		}
	});

cli
	.command("start [root]", "Start production server for built project")
	.option("--port <port>", "Port to use", {
		default: DEFAULT_SERVER.PORT,
	})
	.option(
		"--host [host]",
		"Expose to network (use 0.0.0.0 to expose, or specify hostname)",
		{
			default: DEFAULT_SERVER.HOST,
		},
	)
	/**
	 * Start Command Handler
	 *
	 * Serves the built production artifacts.
	 * Simulates the production environment locally.
	 */
	.action(async (root, options) => {
		try {
			const projectPath = root ? path.resolve(root) : process.cwd();

			// Parse port as number
			const port =
				typeof options.port === "string"
					? parseInt(options.port, 10)
					: options.port;

			await start(projectPath, {
				port: port || DEFAULT_SERVER.PORT,
				host: options.host,
			});
		} catch (error) {
			if (error instanceof BuildError || error instanceof ServerError) {
				console.error(error.format());
			} else if (error instanceof ConfigError) {
				console.error(error.format());
			} else {
				console.error(pc.red("\n✗ Error starting server:\n"));
				console.error(error);
			}
			process.exit(1);
		}
	});

cli.help();
cli.version(version);

cli.parse();
