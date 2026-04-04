/**
 * Dev command - Start development server with interactive CLI
 */
import { createLogger } from "@al8b/framework-shared";
import { createDevServer } from "@al8b/framework-server";

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

		// Bind interactive CLI shortcuts (r=restart, o=open, c=clear, q=quit, h=help)
		server.bindCLIShortcuts({ print: true });

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
