import { afterAll, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { listenOnAvailablePort } from "../src/port";

const serversToClose: Server[] = [];

afterAll(async () => {
	await Promise.all(
		serversToClose.map(
			(server) =>
				new Promise<void>((resolve) => {
					server.close(() => resolve());
				}),
		),
	);
});

describe("listenOnAvailablePort", () => {
	it("binds the requested port when it is available", async () => {
		const preferredPort = await reserveAndReleasePort();
		const server = createServer();
		serversToClose.push(server);

		const port = await listenOnAvailablePort(server, {
			startPort: preferredPort,
			maxPort: preferredPort,
			host: "127.0.0.1",
		});

		expect(port).toBe(preferredPort);
	});

	it("retries on EADDRINUSE with the same server instance", async () => {
		const occupied = createServer();
		serversToClose.push(occupied);
		await new Promise<void>((resolve) => occupied.listen(0, "127.0.0.1", () => resolve()));

		const occupiedAddress = occupied.address();
		if (!occupiedAddress || typeof occupiedAddress === "string") {
			throw new Error("Expected TCP address");
		}

		const server = createServer();
		serversToClose.push(server);

		const port = await listenOnAvailablePort(server, {
			startPort: occupiedAddress.port,
			maxPort: occupiedAddress.port + 3,
			host: "127.0.0.1",
		});

		expect(port).toBeGreaterThan(occupiedAddress.port);
	});

	it("fails once the allowed port range is exhausted", async () => {
		const occupied = createServer();
		serversToClose.push(occupied);
		await new Promise<void>((resolve) => occupied.listen(0, "127.0.0.1", () => resolve()));

		const occupiedAddress = occupied.address();
		if (!occupiedAddress || typeof occupiedAddress === "string") {
			throw new Error("Expected TCP address");
		}

		const server = createServer();
		serversToClose.push(server);

		await expect(
			listenOnAvailablePort(server, {
				startPort: occupiedAddress.port,
				maxPort: occupiedAddress.port,
				host: "127.0.0.1",
			}),
		).rejects.toThrow(`Could not find available port between ${occupiedAddress.port} and ${occupiedAddress.port}`);
	});
});

async function reserveAndReleasePort(): Promise<number> {
	const server = createServer();
	await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
	const address = server.address();
	if (!address || typeof address === "string") {
		throw new Error("Expected TCP address");
	}
	const port = address.port;
	await new Promise<void>((resolve) => server.close(() => resolve()));
	return port;
}
