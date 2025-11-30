/**
 * HTTP Service - External API requests
 *
 * Provides fetch-like functionality for making HTTP requests to external APIs
 */

import type {
	HttpAPI,
	HttpRequestOptions,
	HttpResponse,
} from "./types";

// Development logger (only available in browser/dev mode)
let httpLogger: any =
	null;
if (
	typeof window !==
	"undefined"
) {
	try {
		// Try to access logger from dev tools (if available)
		httpLogger =
			(
				window as any
			)
				.__l8b_http_logger;
	} catch {
		// Ignore if not available
	}
}

export class HttpService {
	constructor() {
		// Service initialization
	}

	/**
	 * Create HttpResponse object from fetch Response
	 */
	private createResponse(
		response: Response,
		responseText: string,
		requestUrl?: string,
	): HttpResponse {
		const headers: Record<
			string,
			string
		> = {};
		response.headers.forEach(
			(
				value,
				key,
			) => {
				headers[
					key
				] =
					value;
			},
		);

		return {
			status:
				response.status,
			headers,
			text:
				() =>
					responseText,
			json:
				() => {
					try {
						return JSON.parse(
							responseText,
						);
					} catch {
						throw new Error(
							"Response is not valid JSON",
						);
					}
				},
			jsonOrThrow:
				() => {
					if (
						!response.ok
					) {
						throw new Error(
							`HTTP ${response.status}: ${responseText.substring(0, 200)}`,
						);
					}
					try {
						return JSON.parse(
							responseText,
						);
					} catch {
						throw new Error(
							"Response is not valid JSON",
						);
					}
				},
			jsonOrNull:
				() => {
					if (
						!response.ok
					) {
						return null;
					}
					try {
						return JSON.parse(
							responseText,
						);
					} catch {
						return null;
					}
				},
			data:
				() =>
					responseText,
			ok: () =>
				response.ok,
			ensureOk:
				() => {
					if (
						!response.ok
					) {
						throw new Error(
							`HTTP ${response.status}: Request failed\n` +
								(requestUrl
									? `  URL: ${requestUrl}\n`
									: "") +
								`  Response: ${responseText.substring(0, 200)}`,
						);
					}
					return this.createResponse(
						response,
						responseText,
						requestUrl,
					);
				},
		};
	}

	/**
	 * Make HTTP request with timeout support
	 */
	private async fetchWithTimeout(
		url: string,
		options: RequestInit,
		timeout: number = 30000,
	): Promise<Response> {
		const controller =
			new AbortController();
		const timeoutId =
			setTimeout(
				() =>
					controller.abort(),
				timeout,
			);

		try {
			const response =
				await fetch(
					url,
					{
						...options,
						signal:
							controller.signal,
					},
				);
			clearTimeout(
				timeoutId,
			);
			return response;
		} catch (error) {
			clearTimeout(
				timeoutId,
			);
			if (
				error instanceof
					Error &&
				error.name ===
					"AbortError"
			) {
				throw new Error(
					`Request timeout after ${timeout}ms`,
				);
			}
			throw error;
		}
	}

	/**
	 * Make HTTP request (internal method)
	 */
	private async makeRequest(
		url: string,
		options: HttpRequestOptions = {},
	): Promise<HttpResponse> {
		const method =
			options.method ||
			"GET";
		const headers: Record<
			string,
			string
		> = {
			"Content-Type":
				"application/json",
			...options.headers,
		};

		let body:
			| string
			| undefined;
		if (
			options.body !==
			undefined
		) {
			if (
				typeof options.body ===
				"string"
			) {
				body =
					options.body;
			} else {
				body =
					JSON.stringify(
						options.body,
					);
			}
		}

		const fetchOptions: RequestInit =
			{
				method,
				headers,
				body,
			};

		const startTime =
			Date.now();
		let responseSize = 0;

		try {
			const requestTimeout =
				options.timeout ||
				30000;
			const response =
				await this.fetchWithTimeout(
					url,
					fetchOptions,
					requestTimeout,
				);
			const responseText =
				await response.text();
			responseSize =
				new Blob(
					[
						responseText,
					],
				)
					.size;

			// Log successful request in dev mode
			if (
				httpLogger
			) {
				const time =
					Date.now() -
					startTime;
				httpLogger.logRequest(
					method,
					url,
					response.status,
					time,
					responseSize,
				);
			}

			return this.createResponse(
				response,
				responseText,
				url,
			);
		} catch (error) {
			// Log failed request in dev mode
			if (
				httpLogger
			) {
				const time =
					Date.now() -
					startTime;
				httpLogger.logRequest(
					method,
					url,
					undefined,
					time,
					undefined,
					error instanceof
						Error
						? error.message
						: String(
								error,
							),
				);
			}

			// Enhanced error messages for better DX
			if (
				error instanceof
				Error
			) {
				let enhancedMessage = `HTTP request failed: ${error.message}`;

				// CORS errors
				if (
					error.message.includes(
						"CORS",
					) ||
					error.message.includes(
						"cross-origin",
					) ||
					error.message.includes(
						"Access-Control",
					)
				) {
					enhancedMessage =
						`[E7xxx] CORS error: API server needs to allow requests from your domain.\n` +
						`  URL: ${url}\n` +
						`  Method: ${method}\n` +
						`  Suggestion: Check CORS headers on API server or use a proxy`;
				}

				// Timeout errors
				if (
					error.message.includes(
						"timeout",
					) ||
					error.message.includes(
						"AbortError",
					)
				) {
					const requestTimeout =
						options.timeout ||
						30000;
					enhancedMessage =
						`[E7xxx] Request timeout: Server took too long to respond.\n` +
						`  URL: ${url}\n` +
						`  Timeout: ${requestTimeout}ms\n` +
						`  Suggestion: Increase timeout or check server status`;
				}

				// Network errors
				if (
					error.message.includes(
						"Failed to fetch",
					) ||
					error.message.includes(
						"NetworkError",
					) ||
					error.message.includes(
						"network",
					)
				) {
					enhancedMessage =
						`[E7xxx] Network error: Unable to reach server.\n` +
						`  URL: ${url}\n` +
						`  Suggestion: Check internet connection and server availability`;
				}

				throw new Error(
					enhancedMessage,
				);
			}
			throw new Error(
				"HTTP request failed",
			);
		}
	}

	/**
	 * Get interface for LootiScript exposure
	 */
	getInterface(): HttpAPI {
		return {
			request:
				async (
					url: string,
					options: HttpRequestOptions = {},
				): Promise<HttpResponse> => {
					return this.makeRequest(
						url,
						options,
					);
				},

			get: async (
				url: string,
				options: Omit<
					HttpRequestOptions,
					| "method"
					| "body"
				> = {},
			): Promise<HttpResponse> => {
				return this.makeRequest(
					url,
					{
						...options,
						method:
							"GET",
					},
				);
			},

			post:
				async (
					url: string,
					body?: any,
					options: Omit<
						HttpRequestOptions,
						| "method"
						| "body"
					> = {},
				): Promise<HttpResponse> => {
					return this.makeRequest(
						url,
						{
							...options,
							method:
								"POST",
							body,
						},
					);
				},

			put: async (
				url: string,
				body?: any,
				options: Omit<
					HttpRequestOptions,
					| "method"
					| "body"
				> = {},
			): Promise<HttpResponse> => {
				return this.makeRequest(
					url,
					{
						...options,
						method:
							"PUT",
						body,
					},
				);
			},

			delete:
				async (
					url: string,
					options: Omit<
						HttpRequestOptions,
						| "method"
						| "body"
					> = {},
				): Promise<HttpResponse> => {
					return this.makeRequest(
						url,
						{
							...options,
							method:
								"DELETE",
						},
					);
				},
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		// No cleanup needed for HTTP service
	}
}
