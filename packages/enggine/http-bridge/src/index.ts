/**
 * @al8b/http-bridge
 *
 * A production-ready RuntimeBridge implementation that translates LootiScript
 * host.request() calls into HTTP/REST API calls. Zero-configuration for
 * simple cases, full configurability for advanced usage.
 *
 * @example
 * // Simple usage — endpoint auto-mapped from request name
 * const bridge = createHttpBridge({ baseUrl: "https://api.mygame.com" });
 *
 * @example
 * // With explicit endpoint mapping
 * const bridge = createHttpBridge({
 *   baseUrl: "https://api.mygame.com",
 *   endpoints: {
 *     "user.getProfile": "/users/{id}",
 *     "leaderboard.get": "/leaderboard?limit={limit}",
 *   },
 * });
 */

import type { RuntimeBridge } from "@al8b/runtime";
import type { HostEvent } from "@al8b/runtime";

export interface HttpBridgeConfig {
	/**
	 * Base URL for all API calls.
	 * Example: "https://api.mygame.com"
	 */
	baseUrl: string;

	/**
	 * Optional map of LootiScript request names → API endpoint paths.
	 * Paths support {param} substitution from payload values.
	 *
	 * Example:
	 *   endpoints: { "user.getProfile": "/users/{id}" }
	 *   + payload { id: 5 } → fetch("/users/5")
	 *
	 * If a request name is not mapped, falls back to `/{requestName}`.
	 */
	endpoints?: Record<string, string>;

	/**
	 * Default fetch options applied to every request.
	 * Useful for auth headers, custom agents, etc.
	 *
	 * Example:
	 *   defaults: { headers: { "Authorization": "Bearer ..." } }
	 */
	defaults?: RequestInit;

	/**
	 * Custom URL builder. When provided, overrides endpoint mapping.
	 * Receives the request name, payload, and baseUrl.
	 *
	 * Example:
	 *   urlBuilder: (name, payload, baseUrl) => `${baseUrl}/v1/${name}`
	 */
	urlBuilder?: (name: string, payload: unknown, baseUrl: string) => string;

	/**
	 * Custom response handler. When provided, called with the fetch Response
	 * and request name. Lets you handle non-JSON responses, status codes,
	 * or transform the response shape.
	 *
	 * Return value is passed directly to the LootiScript callback.
	 *
	 * Example:
	 *   responseHandler: async (res, name) => {
	 *     if (!res.ok) throw new Error(`HTTP ${res.status}`);
	 *     return res.json();
	 *   }
	 */
	responseHandler?: (response: Response, name: string) => Promise<unknown>;

	/**
	 * Optional logger for emit events.
	 * Defaults to console.log in development.
	 * Set to () => {} to silence.
	 */
	logEmit?: (name: string, payload: unknown) => void;
}

/**
 * Creates a RuntimeBridge that translates LootiScript host.request()
 * calls into HTTP/REST API calls.
 *
 * The bridge makes POST requests with JSON body to the configured baseUrl.
 * Request names map to endpoint paths, with {param} substitution from payload.
 *
 * @param config - HttpBridge configuration
 * @returns A RuntimeBridge ready to pass to createRuntime()
 *
 * @example
 * ```ts
 * const bridge = createHttpBridge({
 *   baseUrl: "https://api.mygame.com",
 *   endpoints: {
 *     "user.getProfile": "/users/{id}",
 *     "inventory.get": "/inventory/{user_id}",
 *   },
 *   defaults: { headers: { "X-Game-Id": "my-game" } },
 * });
 *
 * createRuntime({ bridge, sources: { main: "..." } });
 * ```
 *
 * LootiScript side:
 * ```lua
 * host.request("user.getProfile", { id: session.user().id }, function(response)
 *     if response.ok then
 *         print("Hello " + response.name);
 *     end
 * end);
 * ```
 */
export function createHttpBridge(config: HttpBridgeConfig): RuntimeBridge {
	const {
		baseUrl,
		endpoints = {},
		defaults = {},
		urlBuilder,
		responseHandler,
		logEmit = (name, payload) => console.log(`[http-bridge] ${name}`, payload),
	} = config;

	/**
	 * Build the full URL for a request.
	 * Uses endpoint mapping with {param} substitution, or falls back to /{name}.
	 * If urlBuilder returns an absolute URL (starts with http:// or https://),
	 * it is used as-is. Otherwise, baseUrl is prepended.
	 */
	const buildUrl = (name: string, payload: unknown): string => {
		if (urlBuilder) {
			const result = urlBuilder(name, payload, baseUrl);
			// If urlBuilder returns an absolute URL, use it directly
			if (result.startsWith("http://") || result.startsWith("https://")) {
				return result;
			}
			// Otherwise treat as a path and prepend baseUrl
			return `${baseUrl}${result}`;
		}

		let path = endpoints[name] ?? `/${name}`;

		// Substitute {param} tokens with payload values
		path = path.replace(/\{(\w+)\}/g, (_, key) => {
			const val = (payload as Record<string, unknown>)?.[key];
			return val != null ? String(val) : "";
		});

		return `${baseUrl}${path}`;
	};

	/**
	 * Maps HTTP status codes to LootiScript-friendly error shapes.
	 */
	const request: RuntimeBridge["request"] = async (name, payload) => {
		const url = buildUrl(name, payload ?? {});

		// Merge headers: defaults first, then user-provided headers (allow override)
		const mergedHeaders: Record<string, string> = {
			"Content-Type": "application/json",
			...(defaults.headers as Record<string, string> | undefined),
		};

		let res: Response;
		try {
			res = await fetch(url, {
				method: "POST",
				headers: mergedHeaders,
				body: payload != null ? JSON.stringify(payload) : undefined,
			});
		} catch (err) {
			// Network error (offline, DNS, etc.)
			return {
				ok: false,
				error: err instanceof Error ? err.message : String(err),
			};
		}

		if (responseHandler) {
			try {
				const result = await responseHandler(res, name);
				return result;
			} catch (err) {
				return {
					ok: false,
					error: err instanceof Error ? err.message : String(err),
				};
			}
		}

		if (!res.ok) {
			let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
			try {
				const errBody = await res.json();
				if (errBody?.error) {
					errorMessage = String(errBody.error);
				} else if (errBody?.message) {
					errorMessage = String(errBody.message);
				}
			} catch {
				// Use status text above
			}
			return { ok: false, error: errorMessage };
		}

		try {
			const data = await res.json();
			return { ok: true, ...data };
		} catch {
			// Response body isn't JSON — return raw text or status
			return { ok: true, value: await res.text().catch(() => res.statusText) };
		}
	};

	const emit: RuntimeBridge["emit"] = (name, payload) => {
		logEmit(name, payload);
	};

	const subscribe: RuntimeBridge["subscribe"] = (_handler: (event: HostEvent) => void) => {
		// No inbound events for a pure HTTP bridge — return no-op unsubscribe
		return () => {};
	};

	return {
		request,
		emit,
		subscribe,
	};
}
