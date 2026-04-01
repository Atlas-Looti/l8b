/**
 * API definitions for the List (array) standard library.
 */

import type { GlobalApi } from "../types";

export const stdlibListApi: Partial<GlobalApi> = {
	List: {
		type: "module",
		description: "Array manipulation and functional programming utilities",
		properties: {
			map: { type: "method", signature: "List.map(arr, fn)", description: "Map over array elements" },
			filter: { type: "method", signature: "List.filter(arr, fn)", description: "Filter array by predicate" },
			reduce: { type: "method", signature: "List.reduce(arr, fn, initial)", description: "Reduce array to single value" },
			find: { type: "method", signature: "List.find(arr, fn)", description: "Find first matching element" },
			findIndex: { type: "method", signature: "List.findIndex(arr, fn)", description: "Find index of first match" },
			some: { type: "method", signature: "List.some(arr, fn)", description: "Test if any element matches" },
			every: { type: "method", signature: "List.every(arr, fn)", description: "Test if all elements match" },
			reverse: { type: "method", signature: "List.reverse(arr)", description: "Reverse array (non-mutating)" },
			sort: { type: "method", signature: "List.sort(arr, fn?)", description: "Sort array (non-mutating)" },
			slice: { type: "method", signature: "List.slice(arr, start, end?)", description: "Extract array slice" },
			concat: { type: "method", signature: "List.concat(...arrays)", description: "Concatenate arrays" },
			flat: { type: "method", signature: "List.flat(arr, depth?)", description: "Flatten nested array" },
			flatMap: { type: "method", signature: "List.flatMap(arr, fn)", description: "Map and flatten array" },
			indexOf: { type: "method", signature: "List.indexOf(arr, item, from?)", description: "Find first index of item" },
			lastIndexOf: { type: "method", signature: "List.lastIndexOf(arr, item, from?)", description: "Find last index of item" },
			includes: { type: "method", signature: "List.includes(arr, item, from?)", description: "Check if array includes item" },
			length: { type: "method", signature: "List.length(arr)", description: "Get array length" },
			first: { type: "method", signature: "List.first(arr)", description: "Get first element" },
			last: { type: "method", signature: "List.last(arr)", description: "Get last element" },
			at: { type: "method", signature: "List.at(arr, index)", description: "Get element at index (supports negative)" },
			push: { type: "method", signature: "List.push(arr, ...items)", description: "Add items to end" },
			pop: { type: "method", signature: "List.pop(arr)", description: "Remove and return last item" },
			shift: { type: "method", signature: "List.shift(arr)", description: "Remove and return first item" },
			unshift: { type: "method", signature: "List.unshift(arr, ...items)", description: "Add items to start" },
			splice: { type: "method", signature: "List.splice(arr, start, deleteCount?, ...items)", description: "Remove/insert elements" },
			fill: { type: "method", signature: "List.fill(arr, value, start?, end?)", description: "Fill array with value (in-place)" },
			join: { type: "method", signature: "List.join(arr, separator?)", description: "Join array to string" },
			unique: { type: "method", signature: "List.unique(arr)", description: "Remove duplicates" },
			shuffle: { type: "method", signature: "List.shuffle(arr)", description: "Randomly shuffle array" },
			chunk: { type: "method", signature: "List.chunk(arr, size)", description: "Split into chunks" },
			sum: { type: "method", signature: "List.sum(arr)", description: "Sum numeric array" },
			average: { type: "method", signature: "List.average(arr)", description: "Average of numeric array" },
			min: { type: "method", signature: "List.min(arr)", description: "Minimum value in array" },
			max: { type: "method", signature: "List.max(arr)", description: "Maximum value in array" },
		},
	},
};
