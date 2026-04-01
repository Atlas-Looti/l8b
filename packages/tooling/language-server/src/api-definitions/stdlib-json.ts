/**
 * API definitions for the JSON standard library.
 */

import type { GlobalApi } from "../types";

export const stdlibJsonApi: Partial<GlobalApi> = {
	JSON: {
		type: "module",
		description: "JSON encoding and decoding",
		properties: {
			encode: { type: "method", signature: "JSON.encode(value)", description: "Encode value to JSON string" },
			decode: { type: "method", signature: "JSON.decode(json)", description: "Decode JSON string to value" },
			pretty: { type: "method", signature: "JSON.pretty(value, indent?)", description: "Pretty-print JSON with indentation" },
		},
	},
};
