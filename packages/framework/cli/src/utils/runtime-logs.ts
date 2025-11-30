import type { IncomingMessage, ServerResponse } from "http";
import pc from "picocolors";

import { INTERNAL_ENDPOINTS } from "./constants";

const MAX_BODY_SIZE = 50 * 1024; // 50kb

interface RuntimeLogPayload {
	level?: string;
	scope?: string;
	message?: unknown;
	details?: unknown;
}

/**
 * Handle runtime log POST requests coming from the browser runtime.
 *
 * Returns true when the request was handled (even if rejected).
 */
export function handleRuntimeLogRequest(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url || !req.url.startsWith(INTERNAL_ENDPOINTS.LOGGER)) {
		return false;
	}

	if (req.method !== "POST") {
		res.statusCode = 405;
		res.end("Method Not Allowed");
		return true;
	}

	let body = "";
	let aborted = false;
	req.setEncoding("utf8");

	req.on("data", (chunk) => {
		if (aborted) {
			return;
		}
		body += chunk;
		if (body.length > MAX_BODY_SIZE) {
			aborted = true;
			res.statusCode = 413;
			res.end("Payload Too Large");
			req.destroy();
		}
	});

	req.on("end", () => {
		if (aborted) {
			return;
		}

		try {
			const payload: RuntimeLogPayload = body.length ? JSON.parse(body) : {};
			emitRuntimeLog(payload);
			res.statusCode = 204;
			res.end();
		} catch (error) {
			console.error(pc.red("[L8B] Failed to parse runtime log payload"), error);
			res.statusCode = 400;
			res.end("Invalid JSON payload");
		}
	});

	req.on("error", (error) => {
		if (aborted) {
			return;
		}
		console.error(pc.red("[L8B] Failed to read runtime log payload"), error);
		if (!res.writableEnded) {
			res.statusCode = 400;
			res.end("Failed to read payload");
		}
	});

	return true;
}

function emitRuntimeLog(payload: RuntimeLogPayload): void {
	const level = typeof payload.level === "string" ? payload.level.toLowerCase() : "info";
	const scope = typeof payload.scope === "string" ? payload.scope.toUpperCase() : "GAME";
	const message = formatMessage(payload.message);

	const prefix = pc.cyan("[L8B]");
	const scopeLabel = pc.magenta(`[${scope}]`);
	const formatted = `${prefix} ${scopeLabel} ${message}`;

	switch (level) {
		case "error":
			console.error(pc.red(formatted));
			break;
		case "warn":
			console.warn(pc.yellow(formatted));
			break;
		default:
			console.log(pc.green(formatted));
			break;
	}

	if (payload.details) {
		const details = typeof payload.details === "string" ? payload.details : safeStringify(payload.details);
		if (details) {
			console.log(pc.gray(details));
		}
	}
}

function formatMessage(message: unknown): string {
	if (typeof message === "string") {
		return message;
	}
	if (message === undefined || message === null) {
		return "";
	}
	if (typeof message === "object") {
		return safeStringify(message);
	}
	return String(message);
}

function safeStringify(value: unknown): string {
	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return String(value);
	}
}
