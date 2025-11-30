/**
 * JSON utilities for LootiScript
 *
 * Provides JSON encoding and decoding.
 */

export const JSONLib = {
	/**
	 * Encode a value to JSON string
	 */
	encode: (value: any): string => {
		try {
			return JSON.stringify(value);
		} catch (error) {
			return "";
		}
	},

	/**
	 * Decode a JSON string to value
	 */
	decode: (json: string): any => {
		try {
			return JSON.parse(json);
		} catch (error) {
			return null;
		}
	},

	/**
	 * Pretty-print JSON with indentation
	 */
	pretty: (value: any, indent: number = 2): string => {
		try {
			return JSON.stringify(value, null, indent);
		} catch (error) {
			return "";
		}
	},
};
