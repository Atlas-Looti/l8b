/**
 * HTTP API types for external API requests
 */

export interface HttpRequestOptions {
	/** HTTP method (GET, POST, PUT, DELETE, etc.) */
	method?: string;
	/** Request headers */
	headers?: Record<string, string>;
	/** Request body (will be JSON stringified if object) */
	body?: any;
	/** Timeout in milliseconds */
	timeout?: number;
}

export interface HttpResponse {
	/** HTTP status code */
	status: number;
	/** Response headers */
	headers: Record<string, string>;
	/** Response body as text */
	text(): string;
	/** Response body as JSON (parsed) */
	json(): any;
	/** Response body as JSON (throws if not ok or invalid JSON) */
	jsonOrThrow(): any;
	/** Response body as JSON (returns null if not ok or invalid JSON) */
	jsonOrNull(): any | null;
	/** Response body as text (alias for text()) */
	data(): string;
	/** Check if response is OK (status 200-299) */
	ok(): boolean;
	/** Ensure response is OK, throws if not */
	ensureOk(): HttpResponse;
}

/**
 * HTTP API interface exposed to LootiScript
 */
export interface HttpAPI {
	/**
	 * Make an HTTP request
	 * @param url - Request URL
	 * @param options - Request options (method, headers, body, timeout)
	 * @returns Promise resolving to HttpResponse
	 */
	request(url: string, options?: HttpRequestOptions): Promise<HttpResponse>;

	/**
	 * Make a GET request
	 * @param url - Request URL
	 * @param options - Request options (headers, timeout)
	 * @returns Promise resolving to HttpResponse
	 */
	get(url: string, options?: Omit<HttpRequestOptions, "method" | "body">): Promise<HttpResponse>;

	/**
	 * Make a POST request
	 * @param url - Request URL
	 * @param body - Request body
	 * @param options - Request options (headers, timeout)
	 * @returns Promise resolving to HttpResponse
	 */
	post(url: string, body?: any, options?: Omit<HttpRequestOptions, "method" | "body">): Promise<HttpResponse>;

	/**
	 * Make a PUT request
	 * @param url - Request URL
	 * @param body - Request body
	 * @param options - Request options (headers, timeout)
	 * @returns Promise resolving to HttpResponse
	 */
	put(url: string, body?: any, options?: Omit<HttpRequestOptions, "method" | "body">): Promise<HttpResponse>;

	/**
	 * Make a DELETE request
	 * @param url - Request URL
	 * @param options - Request options (headers, timeout)
	 * @returns Promise resolving to HttpResponse
	 */
	delete(url: string, options?: Omit<HttpRequestOptions, "method" | "body">): Promise<HttpResponse>;
}
