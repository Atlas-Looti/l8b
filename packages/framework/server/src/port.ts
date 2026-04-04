import type { Server } from "node:http";

export interface ListenOptions {
	host?: string;
	startPort: number;
	maxPort: number;
	onPortBusy?: (port: number) => void;
}

/**
 * Bind an HTTP server to the first available port in the requested range.
 * Uses the real server instance directly to avoid TOCTOU races from probe servers.
 */
export async function listenOnAvailablePort(
	server: Server,
	{ host, startPort, maxPort, onPortBusy }: ListenOptions,
): Promise<number> {
	for (let port = startPort; port <= maxPort; port++) {
		const result = await tryListen(server, port, host);
		if (result.ok) {
			return port;
		}

		if (result.error?.code === "EADDRINUSE") {
			onPortBusy?.(port);
			continue;
		}

		throw result.error;
	}

	throw new Error(`Could not find available port between ${startPort} and ${maxPort}`);
}

async function tryListen(
	server: Server,
	port: number,
	host?: string,
): Promise<{ ok: true } | { ok: false; error: NodeJS.ErrnoException }> {
	return new Promise((resolve) => {
		const cleanup = () => {
			server.off("error", onError);
			server.off("listening", onListening);
		};

		const onError = (error: NodeJS.ErrnoException) => {
			cleanup();
			resolve({ ok: false, error });
		};

		const onListening = () => {
			cleanup();
			resolve({ ok: true });
		};

		server.once("error", onError);
		server.once("listening", onListening);

		try {
			server.listen(port, host);
		} catch (error) {
			onError(error as NodeJS.ErrnoException);
		}
	});
}
