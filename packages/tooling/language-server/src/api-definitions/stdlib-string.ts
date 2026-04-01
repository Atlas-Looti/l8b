/**
 * API definitions for the String standard library.
 */

import type { GlobalApi } from "../types";

export const stdlibStringApi: Partial<GlobalApi> = {
	String: {
		type: "module",
		description: "String manipulation utilities",
		properties: {
			split: { type: "method", signature: "String.split(str, separator?)", description: "Split string into array" },
			join: { type: "method", signature: "String.join(arr, separator?)", description: "Join array to string" },
			trim: { type: "method", signature: "String.trim(str)", description: "Remove whitespace from both ends" },
			trimStart: { type: "method", signature: "String.trimStart(str)", description: "Remove leading whitespace" },
			trimEnd: { type: "method", signature: "String.trimEnd(str)", description: "Remove trailing whitespace" },
			replace: { type: "method", signature: "String.replace(str, search, replacement)", description: "Replace first occurrence" },
			replaceAll: { type: "method", signature: "String.replaceAll(str, search, replacement)", description: "Replace all occurrences" },
			startsWith: { type: "method", signature: "String.startsWith(str, prefix)", description: "Check if string starts with prefix" },
			endsWith: { type: "method", signature: "String.endsWith(str, suffix)", description: "Check if string ends with suffix" },
			contains: { type: "method", signature: "String.contains(str, search)", description: "Check if string contains substring" },
			toLowerCase: { type: "method", signature: "String.toLowerCase(str)", description: "Convert to lowercase" },
			toUpperCase: { type: "method", signature: "String.toUpperCase(str)", description: "Convert to uppercase" },
			charAt: { type: "method", signature: "String.charAt(str, index)", description: "Get character at index" },
			charCodeAt: { type: "method", signature: "String.charCodeAt(str, index)", description: "Get char code at index" },
			fromCharCode: { type: "method", signature: "String.fromCharCode(...codes)", description: "Create string from char codes" },
			substring: { type: "method", signature: "String.substring(str, start, end?)", description: "Extract substring" },
			slice: { type: "method", signature: "String.slice(str, start, end?)", description: "Extract substring (supports negative indices)" },
			indexOf: { type: "method", signature: "String.indexOf(str, search, from?)", description: "Find first index of substring" },
			lastIndexOf: { type: "method", signature: "String.lastIndexOf(str, search, from?)", description: "Find last index of substring" },
			repeat: { type: "method", signature: "String.repeat(str, count)", description: "Repeat string n times" },
			padStart: { type: "method", signature: "String.padStart(str, length, pad?)", description: "Pad string at start" },
			padEnd: { type: "method", signature: "String.padEnd(str, length, pad?)", description: "Pad string at end" },
			length: { type: "method", signature: "String.length(str)", description: "Get string length" },
			parseInt: { type: "method", signature: "String.parseInt(str, radix?)", description: "Parse integer from string" },
			parseFloat: { type: "method", signature: "String.parseFloat(str)", description: "Parse float from string" },
			format: { type: "method", signature: "String.format(template, ...args)", description: "Format string with {0}, {1}, etc." },
		},
	},
};
