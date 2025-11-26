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

import pc from "picocolors";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import yargs, { type Argv } from "yargs";
import { hideBin } from "yargs/helpers";

import { dev, build, start } from "./commands";
import { DEFAULT_SERVER } from "./utils/constants";
import {
	ConfigError,
	BuildError,
	CompilationError,
	ServerError,
} from "./utils/errors";

type MaybeArray<T> = T | T[];
type HostOption = string | boolean | undefined;

interface BaseArgs {
	root?: string;
}

interface ServerArgs extends BaseArgs {
	port?: number;
	host?: HostOption;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
	readFileSync(path.join(__dirname, "../package.json"), "utf-8"),
);
const version = packageJson.version;

function resolveProjectPathArg(root?: string): string {
	return root ? path.resolve(root) : process.cwd();
}

function normalizePort(port?: number): number | undefined {
	if (typeof port === "number" && !Number.isNaN(port)) {
		return port;
	}
	return undefined;
}

function coerceHost(
	value: MaybeArray<string | boolean | number> | undefined,
): HostOption {
	if (Array.isArray(value)) {
		return coerceHost(value[value.length - 1]);
	}
	if (value === undefined || value === null) {
		return undefined;
	}
	if (typeof value === "boolean") {
		return value;
	}
	if (typeof value === "number") {
		return value.toString();
	}
	const trimmed = value.trim();
	if (trimmed === "") {
		return undefined;
	}
	if (trimmed.toLowerCase() === "true") {
		return true;
	}
	if (trimmed.toLowerCase() === "false") {
		return false;
	}
	return trimmed;
}

function logProjectBanner(projectPath: string): void {
	console.log(pc.cyan(`\n  🎮 L8B CLI v${version}\n`));
	console.log(pc.gray(`  Project: ${projectPath}\n`));
}

function handleCliError(error: unknown, fallbackMessage: string): never {
	if (
		error instanceof ServerError ||
		error instanceof ConfigError ||
		error instanceof BuildError ||
		error instanceof CompilationError
	) {
		console.error(error.format());
	} else {
		console.error(pc.red(`\n✗ ${fallbackMessage}\n`));
		console.error(error);
	}
	process.exit(1);
}

void yargs(hideBin(process.argv))
	.scriptName("l8b")
	.command<ServerArgs>(
		"dev [root]",
		"Start development server with hot module replacement",
		(yargsBuilder: Argv<ServerArgs>) =>
			yargsBuilder
				.positional("root", {
					type: "string",
					describe: "Path to project root",
				})
				.option("port", {
					type: "number",
					describe: "Port to use",
				})
				.option("host", {
					type: "string",
					describe:
						"Expose to network (use 0.0.0.0 to expose, or specify hostname)",
					coerce: coerceHost,
				}),
		async (args: ServerArgs) => {
			try {
				const projectPath = resolveProjectPathArg(args.root);
				logProjectBanner(projectPath);

				await dev(projectPath, {
					port: normalizePort(args.port) ?? DEFAULT_SERVER.PORT,
					host: args.host ?? DEFAULT_SERVER.HOST,
				});
			} catch (error) {
				handleCliError(error, "Error starting server:");
			}
		},
	)
	.command<BaseArgs>(
		"build [root]",
		"Build project for production",
		(yargsBuilder: Argv<BaseArgs>) =>
			yargsBuilder.positional("root", {
				type: "string",
				describe: "Path to project root",
			}),
		async (args: BaseArgs) => {
			try {
				const projectPath = resolveProjectPathArg(args.root);
				await build(projectPath);
			} catch (error) {
				if (error instanceof CompilationError || error instanceof BuildError) {
					console.error(error.format());
				} else if (error instanceof ConfigError) {
					console.error(error.format());
				} else {
					console.error(pc.red("\n✗ Build failed:\n"));
					console.error(error);
				}
				process.exit(1);
			}
		},
	)
	.command<ServerArgs>(
		"start [root]",
		"Start production server for built project",
		(yargsBuilder: Argv<ServerArgs>) =>
			yargsBuilder
				.positional("root", {
					type: "string",
					describe: "Path to project root",
				})
				.option("port", {
					type: "number",
					describe: "Port to use",
				})
				.option("host", {
					type: "string",
					describe:
						"Expose to network (use 0.0.0.0 to expose, or specify hostname)",
					coerce: coerceHost,
				}),
		async (args: ServerArgs) => {
			try {
				const projectPath = resolveProjectPathArg(args.root);
				logProjectBanner(projectPath);

				await start(projectPath, {
					port: normalizePort(args.port) ?? DEFAULT_SERVER.PORT,
					host: args.host ?? DEFAULT_SERVER.HOST,
				});
			} catch (error) {
				handleCliError(error, "Error starting server:");
			}
		},
	)
	.demandCommand()
	.strict()
	.help()
	.version(version)
	.parseAsync();
