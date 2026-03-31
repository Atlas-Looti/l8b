/**
 * File Handler - Serves static files and generated content
 */
import { existsSync, readFileSync, createReadStream } from "node:fs";
import { extname, join, dirname } from "node:path";
import type { ServerResponse } from "node:http";
import { type DevServerOptions, type ProjectResources, MIME_TYPES, createLogger } from "@l8b/framework-shared";
import type { ResolvedConfig } from "@l8b/framework-config";
import { generateDevHTML, generateHMRClient } from "@l8b/framework-html";

const logger = createLogger("server");

/**
 * Cached pre-built runtime (loaded once from disk)
 */
let cachedRuntime: string | null = null;

/**
 * Load pre-built browser runtime
 */
function loadPrebuiltRuntime(): string {
	if (cachedRuntime) {
		return cachedRuntime;
	}

	const runtimePath = require.resolve("@l8b/runtime");
	const runtimeDir = dirname(runtimePath);
	const browserBundlePath = join(runtimeDir, "browser", "index.js");

	if (!existsSync(browserBundlePath)) {
		logger.warn("Pre-built browser runtime not found, falling back to main bundle");
		cachedRuntime = readFileSync(runtimePath, "utf-8");
		return cachedRuntime;
	}

	logger.info(`Loading pre-built runtime from ${browserBundlePath}`);
	cachedRuntime = readFileSync(browserBundlePath, "utf-8");

	const sizeKB = (cachedRuntime.length / 1024).toFixed(1);
	logger.success(`Runtime loaded (${sizeKB} KB)`);

	return cachedRuntime;
}

export interface FileHandlerContext {
	config: ResolvedConfig;
	options: DevServerOptions;
	resources: ProjectResources;
	sourceMap: Map<string, any>;
}

/**
 * Serve index HTML
 */
export function serveIndex(ctx: FileHandlerContext, res: ServerResponse): void {
	const html = generateDevHTML({
		config: ctx.config,
		resources: ctx.resources,
		mode: "development",
		port: ctx.options.port,
	});

	res.writeHead(200, {
		"Content-Type": "text/html",
		"Cache-Control": "no-cache",
	});
	res.end(html);
}

/**
 * Serve HMR client script
 */
export function serveHMRClient(ctx: FileHandlerContext, res: ServerResponse): void {
	const script = generateHMRClient(ctx.options.port);

	res.writeHead(200, {
		"Content-Type": "application/javascript",
		"Cache-Control": "no-cache",
	});
	res.end(script);
}

/**
 * Serve runtime script (uses pre-built bundle)
 */
export function serveRuntime(res: ServerResponse): void {
	try {
		const code = loadPrebuiltRuntime();

		res.writeHead(200, {
			"Content-Type": "application/javascript",
			"Cache-Control": "max-age=31536000",
		});
		res.end(code);
	} catch (err) {
		logger.error("Failed to serve runtime:", err);
		serve500(res, err as Error);
	}
}

/**
 * Serve source file
 */
export function serveSource(ctx: FileHandlerContext, path: string, res: ServerResponse): void {
	const fileName = path.replace("/loot/", "");

	let source = ctx.sourceMap.get(fileName);

	if (!source && fileName.endsWith(".loot")) {
		source = ctx.sourceMap.get(fileName.replace(".loot", ".ms"));
	}

	if (source && source.content) {
		res.writeHead(200, {
			"Content-Type": "text/plain",
			"Cache-Control": "no-cache",
		});
		res.end(source.content);
	} else {
		serve404(res);
	}
}

/**
 * Serve static file from directory
 */
export function serveStatic(path: string, res: ServerResponse, baseDir: string): void {
	const filePath = join(baseDir, path);

	if (existsSync(filePath)) {
		serveFile(filePath, res);
	} else {
		serve404(res);
	}
}

/**
 * Serve a file
 */
export function serveFile(filePath: string, res: ServerResponse): void {
	const ext = extname(filePath).toLowerCase();
	const contentType = MIME_TYPES[ext] || "application/octet-stream";

	try {
		const stream = createReadStream(filePath);

		stream.on("error", (err) => {
			logger.error(`Error serving file ${filePath}:`, err);
			if (!res.headersSent) {
				serve404(res);
			}
		});

		res.writeHead(200, {
			"Content-Type": contentType,
			"Cache-Control": "max-age=3600",
		});

		stream.pipe(res);
	} catch (_err) {
		serve404(res);
	}
}

/**
 * Serve 404 response
 */
export function serve404(res: ServerResponse): void {
	res.writeHead(404, { "Content-Type": "text/plain" });
	res.end("Not Found");
}

/**
 * Serve 500 response
 */
export function serve500(res: ServerResponse, error: Error): void {
	res.writeHead(500, { "Content-Type": "text/plain" });
	res.end(`Internal Server Error: ${error.message}`);
}
