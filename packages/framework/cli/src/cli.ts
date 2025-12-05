/**
 * L8B CLI Implementation
 */
import { resolve } from "node:path";
import { VERSION, createLogger } from "@l8b/framework-shared";
import { cac } from "cac";
import { devCommand } from "./commands/dev";
import { buildCommand } from "./commands/build";
import { initCommand } from "./commands/init";
import { previewCommand } from "./commands/preview";

const logger = createLogger("cli");

/**
 * Run CLI
 */
export async function run(args: string[]): Promise<void> {
	const cli = cac("l8b");

	cli
		.command("[root]", "Start development server")
		.alias("dev")
		.alias("serve")
		.alias("start")
		.option("-p, --port <port>", "Dev server port", { default: 8080 })
		.option("-h, --host [host]", "Dev server host", { default: "localhost" })
		.option("-o, --open", "Open browser automatically")
		.action(async (root, options) => {
			const resolvedRoot = resolve(root || ".");
			await devCommand({
				root: resolvedRoot,
				port: options.port,
				host: options.host,
				open: options.open,
			});
		});

	cli
		.command("build [root]", "Build for production")
		.option("--minify", "Minify production build", { default: true })
		.option("--no-minify", "Disable minification")
		.option("--sourcemap", "Generate sourcemaps")
		.option("--pwa", "Generate PWA manifest")
		.option("--sw", "Generate service worker")
		.option("--base <url>", "Base URL for assets", { default: "" })
		.option("--minifier <minifier>", "Minifier to use: esbuild (fast) or terser (smaller)", {
			default: "esbuild",
		})
		.action(async (root, options) => {
			const resolvedRoot = resolve(root || ".");
			await buildCommand({
				root: resolvedRoot,
				minify: options.minify,
				sourcemap: options.sourcemap,
				pwa: options.pwa,
				serviceWorker: options.sw,
				base: options.base,
				minifier: options.minifier as "esbuild" | "terser",
			});
		});

	cli
		.command("preview [root]", "Preview production build")
		.option("-p, --port <port>", "Preview server port", { default: 4173 })
		.option("-h, --host [host]", "Preview server host", { default: "localhost" })
		.option("-o, --open", "Open browser automatically")
		.option("--outDir <dir>", "Output directory", { default: "dist" })
		.action(async (root, options) => {
			const resolvedRoot = resolve(root || ".");
			await previewCommand({
				root: resolvedRoot,
				port: options.port,
				host: options.host,
				open: options.open,
				outDir: options.outDir,
			});
		});

	cli
		.command("init [name]", "Create a new L8B project")
		.alias("create")
		.alias("new")
		.option("-t, --template <template>", "Project template", {
			default: "default",
		})
		.action(async (name, options) => {
			await initCommand({
				name: name || "l8b-game",
				template: options.template,
			});
		});

	cli.help();
	cli.version(VERSION);

	try {
		// Parse arguments excluding the first two (node binary and script path)
		// We need to pass the args sliced if we are calling this from a script that receives process.argv
		// But here run() receives already sliced args or full args?
		// Usually run() in this context is called with process.argv.slice(2)
		// cac expects process.argv by default if no args passed, or we can pass parsed args.
		// Let's assume args is process.argv.slice(2)
		cli.parse([process.argv[0], process.argv[1], ...args], { run: false });
		await cli.runMatchedCommand();
	} catch (error) {
		logger.error(`CLI error: ${(error as Error).message}`);
		process.exit(1);
	}
}
