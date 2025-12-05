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
 * - preview: Preview production build
 * - init: Initialize new project
 *
 * @module framework/cli
 */

import { readFileSync } from "fs";
import path from "path";
import pc from "picocolors";
import { fileURLToPath } from "url";
import yargs, { type Argv } from "yargs";
import { hideBin } from "yargs/helpers";

import { build, contractImport, dev, init, preview } from "./commands";
import { DEFAULT_SERVER } from "./utils/constants";
import { BuildError, CompilationError, ConfigError, ServerError } from "./utils/errors";
import type { ExitCode } from "./utils/exit-codes";
import { EXIT_CODES } from "./utils/exit-codes";
import { logger } from "./utils/logger";
import { validateChain, validateContractAddress, validatePort, validateProjectName } from "./utils/validation";

type MaybeArray<T> = T | T[];
type HostOption = string | boolean | undefined;

interface BaseArgs {
	root?: string;
}

interface ServerArgs extends BaseArgs {
	port?: number;
	host?: HostOption;
	tunnel?: boolean;
}

interface InitArgs {
	name: string;
	force?: boolean;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync(path.join(__dirname, "../package.json"), "utf-8"));
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

function coerceHost(value: MaybeArray<string | boolean | number> | undefined): HostOption {
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
	let exitCode: ExitCode = EXIT_CODES.ERROR;

	if (
		error instanceof ServerError ||
		error instanceof ConfigError ||
		error instanceof BuildError ||
		error instanceof CompilationError
	) {
		console.error(error.format());
		exitCode = error.exitCode;
	} else {
		console.error(pc.red(`\n✗ ${fallbackMessage}\n`));
		console.error(error);
	}

	process.exit(exitCode);
}

void yargs(hideBin(process.argv))
	.scriptName("l8b")
	.usage("$0 <command> [options]")
	.command(
		"init <name>",
		"Initialize a new LootiScript project",
		(yargsBuilder: Argv) =>
			yargsBuilder
				.positional("name", {
					type: "string",
					describe: "Project name (directory)",
					demandOption: true,
				})
				.option("force", {
					type: "boolean",
					alias: "f",
					describe: "Overwrite existing directory",
					default: false,
				})
				.example("$0 init my-game", "Create a new project named 'my-game'")
				.example("$0 init my-game --force", "Overwrite existing directory if it exists") as Argv<InitArgs>,
		async (args: InitArgs) => {
			try {
				const validatedName = validateProjectName(args.name);
				await init({
					name: validatedName,
					force: args.force ?? false,
				});
			} catch (error) {
				handleCliError(error, "Error initializing project:");
			}
		},
	)
	.command<ServerArgs>(
		"dev [root]",
		"Start development server with hot module replacement",
		(yargsBuilder: Argv<ServerArgs>) =>
			yargsBuilder
				.positional("root", {
					type: "string",
					describe: "Path to project root (default: current directory)",
				})
				.option("port", {
					type: "number",
					describe: "Port to use",
					default: DEFAULT_SERVER.PORT,
				})
				.option("host", {
					type: "string",
					describe: "Expose to network (use 0.0.0.0 to expose, or specify hostname)",
					coerce: coerceHost,
					default: DEFAULT_SERVER.HOST,
				})
				.option("tunnel", {
					type: "boolean",
					describe: "Enable tunneling for Farcaster Mini Apps testing (uses cloudflared)",
					default: false,
				})
				.example("$0 dev", "Start dev server in current directory")
				.example("$0 dev ./my-game", "Start dev server in specific directory")
				.example("$0 dev --port 8080", "Start on custom port")
				.example("$0 dev --host 0.0.0.0", "Expose to network")
				.example("$0 dev --tunnel", "Enable tunnel for Mini Apps"),
		async (args: ServerArgs) => {
			try {
				const projectPath = resolveProjectPathArg(args.root);
				logProjectBanner(projectPath);

				const port = args.port ? validatePort(args.port) : (normalizePort(args.port) ?? DEFAULT_SERVER.PORT);

				await dev(projectPath, {
					port,
					host: args.host ?? DEFAULT_SERVER.HOST,
					tunnel: args.tunnel ?? false,
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
			yargsBuilder
				.positional("root", {
					type: "string",
					describe: "Path to project root (default: current directory)",
				})
				.example("$0 build", "Build current directory")
				.example("$0 build ./my-game", "Build specific directory"),
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
		"preview [root]",
		"Preview production build",
		(yargsBuilder: Argv<ServerArgs>) =>
			yargsBuilder
				.positional("root", {
					type: "string",
					describe: "Path to project root (default: current directory)",
				})
				.option("port", {
					type: "number",
					describe: "Port to use",
					default: DEFAULT_SERVER.PORT,
				})
				.option("host", {
					type: "string",
					describe: "Expose to network (use 0.0.0.0 to expose, or specify hostname)",
					coerce: coerceHost,
					default: DEFAULT_SERVER.HOST,
				})
				.example("$0 preview", "Preview production build")
				.example("$0 preview --port 8080", "Preview on custom port")
				.example("$0 preview --host 0.0.0.0", "Expose to network"),
		async (args: ServerArgs) => {
			try {
				const projectPath = resolveProjectPathArg(args.root);
				logProjectBanner(projectPath);

				const port = args.port ? validatePort(args.port) : (normalizePort(args.port) ?? DEFAULT_SERVER.PORT);

				await preview(projectPath, {
					port,
					host: args.host ?? DEFAULT_SERVER.HOST,
				});
			} catch (error) {
				handleCliError(error, "Error starting preview server:");
			}
		},
	)
	.command(
		"contract import <address>",
		"Import smart contract ABI and generate LootiScript wrapper",
		(yargsBuilder: Argv) =>
			yargsBuilder
				.positional("address", {
					type: "string",
					describe: "Contract address",
					demandOption: true,
				})
				.option("chain", {
					type: "string",
					describe: "Blockchain (base, ethereum, optimism, arbitrum)",
					demandOption: true,
					choices: ["base", "ethereum", "optimism", "arbitrum"],
				})
				.option("name", {
					type: "string",
					describe: "Contract name for the generated wrapper",
					demandOption: true,
				})
				.option("api-key", {
					type: "string",
					describe: "Block explorer API key (or set BASE_API_KEY, ETHEREUM_API_KEY, etc.)",
				})
				.option("root", {
					type: "string",
					describe: "Path to project root (default: current directory)",
				})
				.example("$0 contract import 0x123... --chain base --name MyContract", "Import contract from Base network")
				.example(
					"$0 contract import 0x123... --chain ethereum --name MyContract --api-key YOUR_KEY",
					"Import with custom API key",
				),
		async (args) => {
			try {
				const projectPath = args.root ? path.resolve(args.root) : process.cwd();
				const validatedAddress = validateContractAddress(args.address);
				const validatedChain = validateChain(args.chain);

				await contractImport({
					address: validatedAddress,
					chain: validatedChain,
					name: args.name,
					projectPath,
					apiKey: args["api-key"],
				});
			} catch (error) {
				handleCliError(error, "Error importing contract:");
			}
		},
	)
	.demandCommand(1, "You need at least one command before moving on")
	.strict()
	.help("help", "Show help")
	.alias("help", "h")
	.version("version", "Show version number", version)
	.alias("version", "v")
	.epilog("For more information, visit https://github.com/l8b/l8b")
	.recommendCommands()
	.parseAsync()
	.catch((error) => {
		handleCliError(error, "Unexpected error:");
	});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
	logger.error("Unhandled promise rejection:", error);
	handleCliError(error, "Unhandled error:");
});

// Handle graceful shutdown (Ctrl+C)
process.on("SIGINT", () => {
	logger.info("\n\nShutting down gracefully...");
	process.exit(EXIT_CODES.USER_INTERRUPT);
});

// Handle SIGTERM (for process managers)
process.on("SIGTERM", () => {
	logger.info("\n\nShutting down gracefully...");
	process.exit(EXIT_CODES.USER_INTERRUPT);
});
