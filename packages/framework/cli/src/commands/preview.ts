/**
 * Preview server for LootiScript projects
 *
 * Simple static file server for production builds.
 */

import fs from "fs-extra";
import http from "http";
import path from "path";
import pc from "picocolors";
import { createUseCases } from "../infrastructure/adapters/factories";
import { DEFAULT_SERVER, INTERNAL_ENDPOINTS } from "../utils/constants";
import { BuildError, ServerError } from "../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES } from "../utils/paths";
import { handleRuntimeLogRequest } from "../utils/runtime-logs";

/**
 * Preview server options
 */
export interface PreviewOptions {
	/** Port to run server on */
	port?: number;
	/** Host to bind to (false = localhost, true = 0.0.0.0, string = specific host) */
	host?: string | boolean;
}

/**
 * Get MIME type for file extension
 */
function getMimeType(filePath: string): string {
	const ext = path.extname(filePath).toLowerCase();
	const mimeTypes: Record<string, string> = {
		".html": "text/html",
		".js": "application/javascript",
		".mjs": "application/javascript",
		".json": "application/json",
		".css": "text/css",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".webp": "image/webp",
		".wav": "audio/wav",
		".mp3": "audio/mpeg",
		".ogg": "audio/ogg",
		".ttf": "font/ttf",
		".woff": "font/woff",
		".woff2": "font/woff2",
	};
	return mimeTypes[ext] || "application/octet-stream";
}

/**
 * Find an available port starting from the given port
 */
function findAvailablePort(startPort: number, host: string): Promise<number> {
	return new Promise((resolve, reject) => {
		const server = http.createServer();

		server.listen(startPort, host, () => {
			const address = server.address();
			const port = typeof address === "object" && address ? address.port : startPort;
			server.close(() => resolve(port));
		});

		server.on("error", (error: NodeJS.ErrnoException) => {
			if (error.code === "EADDRINUSE") {
				// Try next port
				findAvailablePort(startPort + 1, host)
					.then(resolve)
					.catch(reject);
			} else {
				reject(error);
			}
		});
	});
}

/**
 * Preview production build for built project
 *
 * @param projectPath - Absolute path to project root
 * @param options - Server configuration options
 * @returns HTTP server instance
 * @throws {BuildError} If build output is missing
 * @throws {ServerError} If server fails to start
 */
export async function preview(projectPath: string = process.cwd(), options: PreviewOptions = {}): Promise<http.Server> {
	// Load config to get port/host settings
	const useCases = createUseCases();
	const configResult = await useCases.loadConfigUseCase.execute(projectPath);

	if (!configResult.success) {
		throw configResult.error;
	}
	const config = configResult.data;

	const distDir = path.join(projectPath, DEFAULT_DIRS.BUILD_OUTPUT);

	// Check if build exists
	if (!(await fs.pathExists(distDir))) {
		throw new BuildError("No build found. Please run `l8b build` first.", {
			projectPath,
			distDir,
		});
	}

	const indexHtml = path.join(distDir, DEFAULT_FILES.INDEX_HTML);
	if (!(await fs.pathExists(indexHtml))) {
		throw new BuildError("No index.html found in build output. Please run `l8b build` first.", {
			projectPath,
			distDir,
			indexHtml,
		});
	}

	// Get port and host from config or options
	const requestedPort = options.port || config.dev?.port || DEFAULT_SERVER.PORT;
	const host = options.host !== undefined ? options.host : (config.dev?.host ?? DEFAULT_SERVER.HOST);
	const normalizedHost = typeof host === "boolean" ? (host ? "0.0.0.0" : "localhost") : host;

	console.log(pc.cyan("\n  🚀 Starting preview server...\n"));
	console.log(pc.gray(`  Project: ${projectPath}\n`));

	// Find available port (try requested port first, then increment if needed)
	const port = await findAvailablePort(requestedPort, normalizedHost);
	if (port !== requestedPort) {
		console.log(pc.yellow(`  Port ${requestedPort} is in use, trying port ${port}...\n`));
	}

	// Create simple HTTP server
	const server = http.createServer(async (req, res) => {
		// Handle runtime logs
		if (req.url && req.url.startsWith(INTERNAL_ENDPOINTS.LOGGER)) {
			if (handleRuntimeLogRequest(req, res)) {
				return;
			}
		}

		// Parse URL
		const url = req.url || "/";
		let filePath = url.split("?")[0]; // Remove query string

		// Default to index.html for root
		if (filePath === "/") {
			filePath = "/index.html";
		}

		// Remove leading slash for path.join (leading slash makes path.join ignore the first argument)
		const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

		// Resolve file path
		const fullPath = path.join(distDir, relativePath);

		try {
			// Check if file exists and is within distDir (security)
			const resolvedPath = path.resolve(fullPath);
			const resolvedDist = path.resolve(distDir);

			if (!resolvedPath.startsWith(resolvedDist)) {
				res.statusCode = 403;
				res.end("Forbidden");
				return;
			}

			const stats = await fs.stat(resolvedPath);

			if (stats.isDirectory()) {
				// Redirect to index.html in directory
				const indexPath = path.join(resolvedPath, "index.html");
				if (await fs.pathExists(indexPath)) {
					filePath = path.join(filePath, "index.html");
					const finalPath = path.join(distDir, filePath);
					const data = await fs.readFile(finalPath);
					res.setHeader("Content-Type", getMimeType(finalPath));
					res.end(data);
					return;
				}
				res.statusCode = 404;
				res.end("Not Found");
				return;
			}

			// Serve file
			const data = await fs.readFile(resolvedPath);
			res.setHeader("Content-Type", getMimeType(resolvedPath));
			res.setHeader("Cache-Control", "public, max-age=3600");
			res.end(data);
		} catch (error) {
			const err = error as NodeJS.ErrnoException;
			if (err.code === "ENOENT") {
				// Try to serve 404.html if it exists
				const notFoundPath = path.join(distDir, "404.html");
				try {
					if (await fs.pathExists(notFoundPath)) {
						const notFoundHtml = await fs.readFile(notFoundPath);
						res.statusCode = 404;
						res.setHeader("Content-Type", "text/html");
						res.end(notFoundHtml);
						return;
					}
				} catch {
					// Fall through to default 404
				}
				res.statusCode = 404;
				res.end(`Not Found: ${filePath}`);
			} else {
				console.error("Error serving file:", err);
				res.statusCode = 500;
				res.end("Internal Server Error");
			}
		}
	});

	// Start server (port is already verified as available)
	return new Promise((resolve, reject) => {
		server.listen(port, normalizedHost, () => {
			const protocol = "http";
			const hostname = normalizedHost === "0.0.0.0" ? "localhost" : normalizedHost;
			const url = `${protocol}://${hostname}:${port}/`;

			console.log(pc.green("\n🚀 Preview server running!\n"));
			console.log(pc.cyan(`  ➜  Local:   ${url}\n`));

			// Cleanup on shutdown
			const cleanup = () => {
				console.log("\n\nShutting down server...");
				server.close(() => {
					process.exit(0);
				});
			};

			process.on("SIGTERM", cleanup);
			process.on("SIGINT", cleanup);

			resolve(server);
		});

		server.on("error", (error: NodeJS.ErrnoException) => {
			// This should rarely happen since we already checked the port
			reject(
				new ServerError("Failed to start preview server", {
					error: error.message,
					projectPath,
					distDir,
					port,
					host: normalizedHost,
				}),
			);
		});
	});
}
