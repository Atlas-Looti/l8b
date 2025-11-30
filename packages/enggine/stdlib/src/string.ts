/**
 * String utilities for LootiScript
 *
 * Provides string manipulation and parsing functions.
 */

export const StringLib = {
	// String splitting and array joining methods
	split: (str: string, separator: string = ""): string[] => str.split(separator),

	join: (arr: string[], separator: string = ""): string => arr.join(separator),

	// Whitespace trimming methods
	trim: (str: string): string => str.trim(),
	trimStart: (str: string): string => str.trimStart(),
	trimEnd: (str: string): string => str.trimEnd(),

	// String replacement methods
	replace: (str: string, search: string, replacement: string): string => str.replace(search, replacement),

	replaceAll: (str: string, search: string, replacement: string): string => str.split(search).join(replacement),

	// String content checking methods
	startsWith: (str: string, prefix: string): boolean => str.startsWith(prefix),

	endsWith: (str: string, suffix: string): boolean => str.endsWith(suffix),

	contains: (str: string, search: string): boolean => str.includes(search),

	// Case transformation methods
	toLowerCase: (str: string): string => str.toLowerCase(),
	toUpperCase: (str: string): string => str.toUpperCase(),

	// Character access and code point methods
	charAt: (str: string, index: number): string => str.charAt(index),
	charCodeAt: (str: string, index: number): number => str.charCodeAt(index),
	fromCharCode: (...codes: number[]): string => String.fromCharCode(...codes),

	// Substring extraction methods
	substring: (str: string, start: number, end?: number): string => str.substring(start, end),

	slice: (str: string, start: number, end?: number): string => str.slice(start, end),

	// String search methods
	indexOf: (str: string, search: string, fromIndex?: number): number => str.indexOf(search, fromIndex),

	lastIndexOf: (str: string, search: string, fromIndex?: number): number => str.lastIndexOf(search, fromIndex),

	// String padding and repetition methods
	repeat: (str: string, count: number): string => str.repeat(count),

	padStart: (str: string, length: number, pad: string = " "): string => str.padStart(length, pad),

	padEnd: (str: string, length: number, pad: string = " "): string => str.padEnd(length, pad),

	// String length accessor
	length: (str: string): number => str.length,

	// String to number parsing methods
	parseInt: (str: string, radix?: number): number => {
		const result = Number.parseInt(str, radix);
		return isNaN(result) ? 0 : result;
	},

	parseFloat: (str: string): number => {
		const result = Number.parseFloat(str);
		return isNaN(result) ? 0 : result;
	},

	// String formatting and templating methods
	format: (template: string, ...args: any[]): string => {
		return template.replace(/{(\d+)}/g, (match, index) => {
			const argIndex = Number.parseInt(index);
			return typeof args[argIndex] !== "undefined" ? String(args[argIndex]) : match;
		});
	},
};
