/**
 * List (Array) utilities for LootiScript
 *
 * Provides functional programming helpers and array manipulation.
 */

export const ListLib = {
	// Functional programming methods (map, filter, reduce, etc.)
	map: (arr: any[], fn: (item: any, index: number) => any): any[] => arr.map(fn),

	filter: (arr: any[], fn: (item: any, index: number) => boolean): any[] => arr.filter(fn),

	reduce: (arr: any[], fn: (acc: any, item: any, index: number) => any, initial: any): any => arr.reduce(fn, initial),

	find: (arr: any[], fn: (item: any, index: number) => boolean): any => arr.find(fn) ?? null,

	findIndex: (arr: any[], fn: (item: any, index: number) => boolean): number => arr.findIndex(fn),

	some: (arr: any[], fn: (item: any, index: number) => boolean): boolean => arr.some(fn),

	every: (arr: any[], fn: (item: any, index: number) => boolean): boolean => arr.every(fn),

	// Array manipulation methods (non-mutating, returns new arrays)
	reverse: (arr: any[]): any[] => [...arr].reverse(),

	sort: (arr: any[], fn?: (a: any, b: any) => number): any[] => [...arr].sort(fn),

	slice: (arr: any[], start: number, end?: number): any[] => arr.slice(start, end),

	concat: (...arrays: any[][]): any[] => ([] as any[]).concat(...arrays),

	flat: (arr: any[], depth: number = 1): any[] => arr.flat(depth),

	flatMap: (arr: any[], fn: (item: any, index: number) => any): any[] => arr.flatMap(fn),

	// Search and lookup methods
	indexOf: (arr: any[], item: any, fromIndex?: number): number => arr.indexOf(item, fromIndex),

	lastIndexOf: (arr: any[], item: any, fromIndex?: number): number => arr.lastIndexOf(item, fromIndex),

	includes: (arr: any[], item: any, fromIndex?: number): boolean => arr.includes(item, fromIndex),

	// Array length accessor
	length: (arr: any[]): number => arr.length,

	// Element access methods (first, last, at)
	first: (arr: any[]): any => arr[0] ?? null,

	last: (arr: any[]): any => arr[arr.length - 1] ?? null,

	at: (arr: any[], index: number): any => {
		// Support negative indices (Python-style)
		const normalized = index < 0 ? arr.length + index : index;
		return arr[normalized] ?? null;
	},

	// Array mutation methods (modifies original array and returns it)
	push: (arr: any[], ...items: any[]): any[] => {
		arr.push(...items);
		return arr;
	},

	pop: (arr: any[]): any => arr.pop() ?? null,

	shift: (arr: any[]): any => arr.shift() ?? null,

	unshift: (arr: any[], ...items: any[]): any[] => {
		arr.unshift(...items);
		return arr;
	},

	splice: (arr: any[], start: number, deleteCount?: number, ...items: any[]): any[] => arr.splice(start, deleteCount ?? arr.length - start, ...items),

	// Utility methods for common array operations
	fill: (arr: any[], value: any, start?: number, end?: number): any[] => [...arr].fill(value, start, end),

	join: (arr: any[], separator: string = ","): string => arr.join(separator),

	unique: (arr: any[]): any[] => [...new Set(arr)],

	shuffle: (arr: any[]): any[] => {
		const result = [...arr];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	},

	chunk: (arr: any[], size: number): any[][] => {
		const result: any[][] = [];
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
