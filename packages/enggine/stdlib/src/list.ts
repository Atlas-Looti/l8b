/**
 * List (Array) utilities for LootiScript
 *
 * Provides functional programming helpers and array manipulation.
 */

export const ListLib = {
	// Functional programming methods (map, filter, reduce, etc.)
	map: <T, R>(arr: T[], fn: (item: T, index: number) => R): R[] => arr.map(fn),

	filter: <T>(arr: T[], fn: (item: T, index: number) => boolean): T[] => arr.filter(fn),

	reduce: <T, R>(arr: T[], fn: (acc: R, item: T, index: number) => R, initial: R): R => arr.reduce(fn, initial),

	find: <T>(arr: T[], fn: (item: T, index: number) => boolean): T | null => arr.find(fn) ?? null,

	findIndex: <T>(arr: T[], fn: (item: T, index: number) => boolean): number => arr.findIndex(fn),

	some: <T>(arr: T[], fn: (item: T, index: number) => boolean): boolean => arr.some(fn),

	every: <T>(arr: T[], fn: (item: T, index: number) => boolean): boolean => arr.every(fn),

	// Array manipulation methods (non-mutating, returns new arrays)
	reverse: <T>(arr: T[]): T[] => arr.slice().reverse(),

	sort: <T>(arr: T[], fn?: (a: T, b: T) => number): T[] => arr.slice().sort(fn),

	slice: <T>(arr: T[], start: number, end?: number): T[] => arr.slice(start, end),

	concat: <T>(...arrays: T[][]): T[] => ([] as T[]).concat(...arrays),

	flat: <T>(arr: T[], depth: number = 1): unknown[] => arr.flat(depth),

	flatMap: <T>(arr: T[], fn: (item: T, index: number) => unknown): unknown[] => arr.flatMap(fn),

	// Search and lookup methods
	indexOf: <T>(arr: T[], item: T, fromIndex?: number): number => arr.indexOf(item, fromIndex),

	lastIndexOf: <T>(arr: T[], item: T, fromIndex?: number): number => arr.lastIndexOf(item, fromIndex),

	includes: <T>(arr: T[], item: T, fromIndex?: number): boolean => arr.includes(item, fromIndex),

	// Array length accessor
	length: <T>(arr: T[]): number => arr.length,

	// Element access methods (first, last, at)
	first: <T>(arr: T[]): T | null => arr[0] ?? null,

	last: <T>(arr: T[]): T | null => arr[arr.length - 1] ?? null,

	at: <T>(arr: T[], index: number): T | null => {
		// Support negative indices (Python-style)
		const normalized = index < 0 ? arr.length + index : index;
		return arr[normalized] ?? null;
	},

	// Array mutation methods (modifies original array and returns it)
	push: <T>(arr: T[], ...items: T[]): T[] => {
		arr.push(...items);
		return arr;
	},

	pop: <T>(arr: T[]): T | null => arr.pop() ?? null,

	shift: <T>(arr: T[]): T | null => arr.shift() ?? null,

	unshift: <T>(arr: T[], ...items: T[]): T[] => {
		arr.unshift(...items);
		return arr;
	},

	splice: <T>(arr: T[], start: number, deleteCount?: number, ...items: T[]): T[] =>
		arr.splice(start, deleteCount ?? arr.length - start, ...items),

	/** Fills arr in-place (matches native Array.prototype.fill behaviour). */
	fill: <T>(arr: T[], value: T, start?: number, end?: number): T[] => arr.fill(value, start, end),

	join: <T>(arr: T[], separator: string = ","): string => arr.join(separator),

	unique: <T>(arr: T[]): T[] => [...new Set(arr)],

	shuffle: <T>(arr: T[]): T[] => {
		const result = [...arr];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	},

	chunk: <T>(arr: T[], size: number): T[][] => {
		const result: T[][] = [];
		for (let i = 0; i < arr.length; i += size) {
			result.push(arr.slice(i, i + size));
		}
		return result;
	},

	sum: (arr: number[]): number => {
		let sum = 0;
		for (let i = 0; i < arr.length; i++) {
			sum += arr[i];
		}
		return sum;
	},

	average: (arr: number[]): number => {
		if (arr.length === 0) return 0;
		let sum = 0;
		for (let i = 0; i < arr.length; i++) {
			sum += arr[i];
		}
		return sum / arr.length;
	},

	min: (arr: number[]): number => {
		if (arr.length === 0) return 0;
		let min = arr[0];
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] < min) min = arr[i];
		}
		return min;
	},

	max: (arr: number[]): number => {
		if (arr.length === 0) return 0;
		let max = arr[0];
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] > max) max = arr[i];
		}
		return max;
	},
};
