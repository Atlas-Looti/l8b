/**
 * HTTP API definitions
 */

import type { GlobalApi } from "../types";

export const httpApi: Partial<GlobalApi> = {
	http: {
		type: "object",
		description: "HTTP client for external API requests",
		properties: {
			request: {
				type: "method",
				signature: "http.request(url: string, options?: {method?: string, headers?: object, body?: any, timeout?: number})",
				description: "Make a custom HTTP request with full control",
			},
			get: {
				type: "method",
				signature: "http.get(url: string, options?: {headers?: object, timeout?: number})",
				description: "Make a GET request",
			},
			post: {
				type: "method",
				signature: "http.post(url: string, body?: any, options?: {headers?: object, timeout?: number})",
				description: "Make a POST request",
			},
			put: {
				type: "method",
				signature: "http.put(url: string, body?: any, options?: {headers?: object, timeout?: number})",
				description: "Make a PUT request",
			},
			delete: {
				type: "method",
				signature: "http.delete(url: string, options?: {headers?: object, timeout?: number})",
				description: "Make a DELETE request",
			},
		},
	},
};
