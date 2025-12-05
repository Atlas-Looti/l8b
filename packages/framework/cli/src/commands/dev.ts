/**
 * Dev command - Start development server
 */
import { createLogger } from "@l8b/framework-shared";
import { createDevServer } from "@l8b/framework-server";

const logger = createLogger("dev");

/**
 * Dev command options
 */
export interface DevOptions {
	root: string;
	port: number;
	host: string;
	open: boolean;
}

/**
 * Run dev command
 */
export async function devCommand(options: DevOptions): Promise<void> {
	logger.info("Starting development server...");

	try {
		const server = await createDevServer({
			root: options.root,
			port: options.port,
			host: options.host,
			open: options.open,
		});

		// Handle shutdown signals
		const shutdown = async () => {
			console.log("\n");
			logger.info("Shutting down...");
			await server.stop();
			process.exit(0);
		};

		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);

		// Keep process alive
		await new Promise(() => {});
	} catch (err) {
		logger.error("Failed to start dev server:", err);
		process.exit(1);
	}
}
