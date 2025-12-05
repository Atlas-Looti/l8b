/**
 * Preview command - Serve production build
 */
import { resolve } from "node:path";
import { createLogger } from "@l8b/framework-shared";
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
	const { root, port, host, open, outDir = "dist" } = options;
	const distDir = resolve(root, outDir);

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
			// In a real implementation we would use 'open' package
			// import openBrowser from 'open';
			// openBrowser(url);
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
