/**
 * Tunnel utilities for Farcaster Mini Apps development
 *
 * Provides HTTPS tunneling via cloudflared for testing Mini Apps locally
 */

import { spawn, type ChildProcess } from "child_process";
import pc from "picocolors";
import { URL } from "url";

export interface TunnelResult {
	url: string;
	process: ChildProcess;
}

/**
 * Start a cloudflared tunnel to the local server
 *
 * @param localPort - Port of the local server
 * @returns Promise resolving to tunnel URL and process
 */
export async function startCloudflaredTunnel(
	localPort: number,
): Promise<TunnelResult> {
	return new Promise((resolve, reject) => {
		// Try to use cloudflared binary
		const cloudflared = spawn("cloudflared", [
			"tunnel",
			"--url",
			`http://localhost:${localPort}`,
		]);

		let tunnelUrl = "";
		let errorOutput = "";

		cloudflared.stdout.on("data", (data: Buffer) => {
			const output = data.toString();
			// cloudflared outputs the URL in format: https://xxxx-xxxx-xxxx.trycloudflare.com
			const urlMatch = output.match(
				/https:\/\/[a-z0-9-]+\.trycloudflare\.com/g,
			);
			if (urlMatch && urlMatch.length > 0) {
				tunnelUrl = urlMatch[0];
				if (tunnelUrl) {
					resolve({ url: tunnelUrl, process: cloudflared });
				}
			}
		});

		cloudflared.stderr.on("data", (data: Buffer) => {
			errorOutput += data.toString();
		});

		cloudflared.on("error", (error) => {
			reject(
				new Error(
					`Failed to start cloudflared tunnel: ${error.message}\n` +
						"Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/",
				),
			);
		});

		cloudflared.on("exit", (code) => {
			if (code !== 0 && !tunnelUrl) {
				reject(
					new Error(`cloudflared exited with code ${code}\n${errorOutput}`),
				);
			}
		});

		// Timeout after 10 seconds
		setTimeout(() => {
			if (!tunnelUrl) {
				cloudflared.kill();
				reject(
					new Error(
						"Timeout waiting for cloudflared tunnel URL. Make sure cloudflared is installed.",
					),
				);
			}
		}, 10000);
	});
}

/**
 * Update manifest URL to point to tunnel
 *
 * @param manifestJson - Original manifest JSON string
 * @param tunnelUrl - Tunnel URL
 * @returns Updated manifest JSON string
 */
export function updateManifestForTunnel(
	manifestJson: string,
	tunnelUrl: string,
): string {
	try {
		const manifest = JSON.parse(manifestJson);

		// Update homeUrl and other URLs in manifest to use tunnel
		if (manifest.miniapp) {
			if (manifest.miniapp.homeUrl) {
				const homeUrl = new URL(manifest.miniapp.homeUrl);
				manifest.miniapp.homeUrl = `${tunnelUrl}${homeUrl.pathname}`;
			}
		}

		return JSON.stringify(manifest, null, 2);
	} catch (error) {
		console.warn(
			pc.yellow("Warning: Could not update manifest for tunnel"),
			error,
		);
		return manifestJson;
	}
}

/**
 * Check if cloudflared is available
 */
export async function isCloudflaredAvailable(): Promise<boolean> {
	return new Promise((resolve) => {
		const check = spawn("cloudflared", ["--version"]);
		check.on("error", () => resolve(false));
		check.on("exit", (code) => resolve(code === 0));
		check.stdout.on("data", () => {});
		check.stderr.on("data", () => {});
		setTimeout(() => {
			check.kill();
			resolve(false);
		}, 2000);
	});
}
