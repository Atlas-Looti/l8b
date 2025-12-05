/**
 * Server middleware utilities
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { MIME_TYPES } from "@l8b/framework-shared";

/**
 * Middleware handler type
 */
export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

/**
 * Create static file serving middleware
 */
export function createStaticMiddleware(baseDir: string): Middleware {
	return (req, res, next) => {
		const url = req.url || "/";
		const path = url.split("?")[0];
		const filePath = join(baseDir, path);

		if (!existsSync(filePath)) {
			return next();
		}

		const stat = statSync(filePath);
		if (stat.isDirectory()) {
			return next();
		}

		serveFile(filePath, res);
	};
}

/**
 * Create source file middleware
 */
export function createSourceMiddleware(_srcDir: string, sources: Map<string, string>): Middleware {
	return (req, res, next) => {
		const url = req.url || "/";

		if (!url.startsWith("/loot/")) {
			return next();
		}

		const fileName = url.replace("/loot/", "").split("?")[0];
		const content = sources.get(fileName);

		if (content === undefined) {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Source not found");
			return;
		}

		res.writeHead(200, {
			"Content-Type": "text/plain",
			"Cache-Control": "no-cache",
		});
		res.end(content);
	};
}

/**
 * Serve a file with proper content type
 */
export function serveFile(filePath: string, res: ServerResponse): void {
	const ext = extname(filePath).toLowerCase();
	const contentType = MIME_TYPES[ext] || "application/octet-stream";

	try {
		const content = readFileSync(filePath);
		const stat = statSync(filePath);

		res.writeHead(200, {
			"Content-Type": contentType,
			"Content-Length": stat.size,
			"Last-Modified": stat.mtime.toUTCString(),
			"Cache-Control": "max-age=3600",
		});
		res.end(content);
	} catch {
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Internal Server Error");
	}
}

/**
 * CORS middleware
 */
export function createCorsMiddleware(
	options: { origin?: string; methods?: string[]; headers?: string[] } = {},
): Middleware {
	const {
		origin = "*",
		methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		headers = ["Content-Type", "Authorization"],
	} = options;

	return (req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", methods.join(", "));
		res.setHeader("Access-Control-Allow-Headers", headers.join(", "));

		if (req.method === "OPTIONS") {
			res.writeHead(204);
			res.end();
			return;
		}

		next();
	};
}

/**
 * Logging middleware
 */
export function createLoggingMiddleware(): Middleware {
	return (req, res, next) => {
		const start = Date.now();

		res.on("finish", () => {
			const duration = Date.now() - start;
			console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
		});

		next();
	};
}

/**
 * Compose multiple middlewares
 */
export function compose(...middlewares: Middleware[]): Middleware {
	return (req, res, finalNext) => {
		let index = -1;

		function dispatch(i: number): void {
			if (i <= index) {
				throw new Error("next() called multiple times");
			}

			index = i;

			const middleware = middlewares[i];
			if (!middleware) {
				return finalNext();
			}

			middleware(req, res, () => dispatch(i + 1));
		}

		dispatch(0);
	};
}
