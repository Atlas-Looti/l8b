/**
 * Preview command - Serve production build
 */
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { createLogger } from "@l8b/framework-shared";
import { loadConfig } from "@l8b/framework-config";
import sirv from "sirv";
import http from "node:http";

const logger = createLogger("preview");

export interface PreviewOptions {
	root: string;
	port: number;
	host: string;
	open: boolean;
	outDir?: string;
}

export async function previewCommand(options: PreviewOptions): Promise<void> {
	const { root, port, host, open, outDir } = options;

	// Load config to get the correct output directory (same as build command)
	const config = loadConfig(root);
	const distDir = outDir ? resolve(root, outDir) : config.outPath;

	// Check if build directory exists
	if (!existsSync(distDir)) {
		logger.error(`Build directory not found: ${distDir}`);
		logger.info(`Please run 'l8b build' first to create a production build.`);
		process.exit(1);
	}

	// Check if game.js exists
	const gameJsPath = resolve(distDir, "game.js");
	if (!existsSync(gameJsPath)) {
		logger.warn(`game.js not found in ${distDir}`);
		logger.warn(`The build may be incomplete or outdated.`);
		logger.warn(`Please run 'l8b build' to rebuild.`);
	}

	logger.info(`Starting preview server for ${distDir}...`);

	const assets = sirv(distDir, {
		dev: true,
		single: true,
		dotfiles: true,
	});

	const server = http.createServer((req, res) => {
		assets(req, res);
	});

	server.listen(port, host, () => {
		const url = `http://${host}:${port}`;
		logger.info(`Preview server running at ${url}`);

		if (open) {
			logger.info(`Open ${url} in your browser`);
		}
	});

	// Handle shutdown
	const shutdown = () => {
		logger.info("Shutting down preview server...");
		server.close();
		process.exit(0);
	};

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}
