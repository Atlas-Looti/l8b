/**
 * Core utility API definitions (print, List, Math, String, JSON)
 */

import type { GlobalApi } from "../types";

export const coreApi: Partial<GlobalApi> = {
	print: {
		type: "function",
		description: "Prints text to the debug console",
		signature: "print(text: any)",
	},
	List: {
		type: "module",
		description: "Array manipulation and functional programming utilities",
		properties: {
			map: {
				type: "method",
				signature: "List.map(arr, fn)",
				description: "Map over array elements",
			},
			filter: {
				type: "method",
				signature: "List.filter(arr, fn)",
				description: "Filter array by predicate",
			},
			reduce: {
				type: "method",
				signature: "List.reduce(arr, fn, initial)",
				description: "Reduce array to single value",
			},
			find: {
				type: "method",
				signature: "List.find(arr, fn)",
				description: "Find first matching element",
			},
			findIndex: {
				type: "method",
				signature: "List.findIndex(arr, fn)",
				description: "Find index of first match",
			},
			some: {
				type: "method",
				signature: "List.some(arr, fn)",
				description: "Test if any element matches",
			},
			every: {
				type: "method",
				signature: "List.every(arr, fn)",
				description: "Test if all elements match",
			},
			reverse: {
				type: "method",
				signature: "List.reverse(arr)",
				description: "Reverse array (non-mutating)",
			},
			sort: {
				type: "method",
				signature: "List.sort(arr, fn?)",
				description: "Sort array (non-mutating)",
			},
			slice: {
				type: "method",
				signature: "List.slice(arr, start, end?)",
				description: "Extract array slice",
			},
			concat: {
				type: "method",
				signature: "List.concat(...arrays)",
				description: "Concatenate arrays",
			},
			flat: {
				type: "method",
				signature: "List.flat(arr, depth?)",
				description: "Flatten nested array",
			},
			flatMap: {
				type: "method",
				signature: "List.flatMap(arr, fn)",
				description: "Map and flatten array",
			},
			indexOf: {
				type: "method",
				signature: "List.indexOf(arr, item, from?)",
				description: "Find first index of item",
			},
			lastIndexOf: {
				type: "method",
				signature: "List.lastIndexOf(arr, item, from?)",
				description: "Find last index of item",
			},
			includes: {
				type: "method",
				signature: "List.includes(arr, item, from?)",
				description: "Check if array includes item",
			},
			length: {
				type: "method",
				signature: "List.length(arr)",
				description: "Get array length",
			},
			first: {
				type: "method",
				signature: "List.first(arr)",
				description: "Get first element",
			},
			last: {
				type: "method",
				signature: "List.last(arr)",
				description: "Get last element",
			},
			at: {
				type: "method",
				signature: "List.at(arr, index)",
				description: "Get element at index (supports negative)",
			},
			push: {
				type: "method",
				signature: "List.push(arr, ...items)",
				description: "Add items to end",
			},
			pop: {
				type: "method",
				signature: "List.pop(arr)",
				description: "Remove and return last item",
			},
			shift: {
				type: "method",
				signature: "List.shift(arr)",
				description: "Remove and return first item",
			},
			unshift: {
				type: "method",
				signature: "List.unshift(arr, ...items)",
				description: "Add items to start",
			},
			splice: {
				type: "method",
				signature: "List.splice(arr, start, deleteCount?, ...items)",
				description: "Remove/insert elements",
			},
			fill: {
				type: "method",
				signature: "List.fill(arr, value, start?, end?)",
				description: "Fill array with value",
			},
			join: {
				type: "method",
				signature: "List.join(arr, separator?)",
				description: "Join array to string",
			},
			unique: {
				type: "method",
				signature: "List.unique(arr)",
				description: "Remove duplicates",
			},
			shuffle: {
				type: "method",
				signature: "List.shuffle(arr)",
				description: "Randomly shuffle array",
			},
			chunk: {
				type: "method",
				signature: "List.chunk(arr, size)",
				description: "Split into chunks",
			},
			sum: {
				type: "method",
				signature: "List.sum(arr)",
				description: "Sum numeric array",
			},
			average: {
				type: "method",
				signature: "List.average(arr)",
				description: "Average of numeric array",
			},
			min: {
				type: "method",
				signature: "List.min(arr)",
				description: "Minimum value in array",
			},
			max: {
				type: "method",
				signature: "List.max(arr)",
				description: "Maximum value in array",
			},
		},
	},
	Math: {
		type: "module",
		description: "Mathematical and game-specific utilities",
		properties: {
			abs: {
				type: "method",
				signature: "Math.abs(x)",
				description: "Absolute value",
			},
			sqrt: {
				type: "method",
				signature: "Math.sqrt(x)",
				description: "Square root",
			},
			floor: {
				type: "method",
				signature: "Math.floor(x)",
				description: "Round down",
			},
			ceil: {
				type: "method",
				signature: "Math.ceil(x)",
				description: "Round up",
			},
			round: {
				type: "method",
				signature: "Math.round(x)",
				description: "Round to nearest",
			},
			min: {
				type: "method",
				signature: "Math.min(...args)",
				description: "Minimum value",
			},
			max: {
				type: "method",
				signature: "Math.max(...args)",
				description: "Maximum value",
			},
			pow: {
				type: "method",
				signature: "Math.pow(base, exp)",
				description: "Power function",
			},
			exp: { type: "method", signature: "Math.exp(x)", description: "e^x" },
			log: {
				type: "method",
				signature: "Math.log(x)",
				description: "Natural logarithm",
			},
			log10: {
				type: "method",
				signature: "Math.log10(x)",
				description: "Base-10 logarithm",
			},
			sin: {
				type: "method",
				signature: "Math.sin(x)",
				description: "Sine (radians)",
			},
			cos: {
				type: "method",
				signature: "Math.cos(x)",
				description: "Cosine (radians)",
			},
			tan: {
				type: "method",
				signature: "Math.tan(x)",
				description: "Tangent (radians)",
			},
			asin: {
				type: "method",
				signature: "Math.asin(x)",
				description: "Arcsine",
			},
			acos: {
				type: "method",
				signature: "Math.acos(x)",
				description: "Arccosine",
			},
			atan: {
				type: "method",
				signature: "Math.atan(x)",
				description: "Arctangent",
			},
			atan2: {
				type: "method",
				signature: "Math.atan2(y, x)",
				description: "Two-argument arctangent",
			},
			random: {
				type: "method",
				signature: "Math.random()",
				description: "Random number 0-1",
			},
			randomInt: {
				type: "method",
				signature: "Math.randomInt(min, max)",
				description: "Random integer",
			},
			randomFloat: {
				type: "method",
				signature: "Math.randomFloat(min, max)",
				description: "Random float",
			},
			PI: { type: "property", description: "Pi constant (3.14159...)" },
			E: { type: "property", description: "Euler's number (2.71828...)" },
			clamp: {
				type: "method",
				signature: "Math.clamp(value, min, max)",
				description: "Clamp value between min/max",
			},
			lerp: {
				type: "method",
				signature: "Math.lerp(a, b, t)",
				description: "Linear interpolation",
			},
			distance: {
				type: "method",
				signature: "Math.distance(x1, y1, x2, y2)",
				description: "2D distance",
			},
			distance3D: {
				type: "method",
				signature: "Math.distance3D(x1, y1, z1, x2, y2, z2)",
				description: "3D distance",
			},
			angleBetween: {
				type: "method",
				signature: "Math.angleBetween(x1, y1, x2, y2)",
				description: "Angle between points",
			},
			degToRad: {
				type: "method",
				signature: "Math.degToRad(degrees)",
				description: "Convert degrees to radians",
			},
			radToDeg: {
				type: "method",
				signature: "Math.radToDeg(radians)",
				description: "Convert radians to degrees",
			},
			sign: {
				type: "method",
				signature: "Math.sign(x)",
				description: "Sign of number (-1, 0, 1)",
			},
			mod: {
				type: "method",
				signature: "Math.mod(n, m)",
				description: "Euclidean modulo",
			},
		},
	},
	String: {
		type: "module",
		description: "String manipulation utilities",
		properties: {
			split: {
				type: "method",
				signature: "String.split(str, separator?)",
				description: "Split string into array",
			},
			join: {
				type: "method",
				signature: "String.join(arr, separator?)",
				description: "Join array to string",
			},
			trim: {
				type: "method",
				signature: "String.trim(str)",
				description: "Remove whitespace from both ends",
			},
			trimStart: {
				type: "method",
				signature: "String.trimStart(str)",
				description: "Remove leading whitespace",
			},
			trimEnd: {
				type: "method",
				signature: "String.trimEnd(str)",
				description: "Remove trailing whitespace",
			},
			replace: {
				type: "method",
				signature: "String.replace(str, search, replacement)",
				description: "Replace first occurrence",
			},
			replaceAll: {
				type: "method",
				signature: "String.replaceAll(str, search, replacement)",
				description: "Replace all occurrences",
			},
			startsWith: {
				type: "method",
				signature: "String.startsWith(str, prefix)",
				description: "Check if string starts with prefix",
			},
			endsWith: {
				type: "method",
				signature: "String.endsWith(str, suffix)",
				description: "Check if string ends with suffix",
			},
			contains: {
				type: "method",
				signature: "String.contains(str, search)",
				description: "Check if string contains substring",
			},
			toLowerCase: {
				type: "method",
				signature: "String.toLowerCase(str)",
				description: "Convert to lowercase",
			},
			toUpperCase: {
				type: "method",
				signature: "String.toUpperCase(str)",
				description: "Convert to uppercase",
			},
			charAt: {
				type: "method",
				signature: "String.charAt(str, index)",
				description: "Get character at index",
			},
			charCodeAt: {
				type: "method",
				signature: "String.charCodeAt(str, index)",
				description: "Get char code at index",
			},
			fromCharCode: {
				type: "method",
				signature: "String.fromCharCode(...codes)",
				description: "Create string from char codes",
			},
			substring: {
				type: "method",
				signature: "String.substring(str, start, end?)",
				description: "Extract substring",
			},
			slice: {
				type: "method",
				signature: "String.slice(str, start, end?)",
				description: "Extract substring (supports negative indices)",
			},
			indexOf: {
				type: "method",
				signature: "String.indexOf(str, search, from?)",
				description: "Find first index of substring",
			},
			lastIndexOf: {
				type: "method",
				signature: "String.lastIndexOf(str, search, from?)",
				description: "Find last index of substring",
			},
			repeat: {
				type: "method",
				signature: "String.repeat(str, count)",
				description: "Repeat string n times",
			},
			padStart: {
				type: "method",
				signature: "String.padStart(str, length, pad?)",
				description: "Pad string at start",
			},
			padEnd: {
				type: "method",
				signature: "String.padEnd(str, length, pad?)",
				description: "Pad string at end",
			},
			length: {
				type: "method",
				signature: "String.length(str)",
				description: "Get string length",
			},
			parseInt: {
				type: "method",
				signature: "String.parseInt(str, radix?)",
				description: "Parse integer from string",
			},
			parseFloat: {
				type: "method",
				signature: "String.parseFloat(str)",
				description: "Parse float from string",
			},
			format: {
				type: "method",
				signature: "String.format(template, ...args)",
				description: "Format string with {0}, {1}, etc.",
			},
		},
	},
	JSON: {
		type: "module",
		description: "JSON encoding and decoding",
		properties: {
			encode: {
				type: "method",
				signature: "JSON.encode(value)",
				description: "Encode value to JSON string",
			},
			decode: {
				type: "method",
				signature: "JSON.decode(json)",
				description: "Decode JSON string to value",
			},
			pretty: {
				type: "method",
				signature: "JSON.pretty(value, indent?)",
				description: "Pretty-print JSON with indentation",
			},
		},
	},
	Random: {
		type: "constructor",
		description: "Seeded random number generator for deterministic randomness",
		signature: "new Random(seed?: number)",
		properties: {
			next: {
				type: "method",
				signature: "random.next()",
				description: "Get next random number (0-1)",
			},
			nextInt: {
				type: "method",
				signature: "random.nextInt(max)",
				description: "Get random integer (0 to max-1)",
			},
			seed: {
				type: "method",
				signature: "random.seed(newSeed?)",
				description: "Set new seed value",
			},
			clone: {
				type: "method",
				signature: "random.clone(seed?)",
				description: "Clone random generator with optional new seed",
			},
		},
	},
	ObjectPool: {
		type: "constructor",
		description: "Object pooling utility for performance optimization",
		signature: "new ObjectPool(factory, maxSize?)",
		properties: {
			acquire: {
				type: "method",
				signature: "pool.acquire()",
				description: "Get object from pool or create new",
			},
			release: {
				type: "method",
				signature: "pool.release(obj)",
				description: "Return object to pool for reuse",
			},
			clear: {
				type: "method",
				signature: "pool.clear()",
				description: "Clear all objects from pool",
			},
			getSize: {
				type: "method",
				signature: "pool.getSize()",
				description: "Get current pool size",
			},
			getMaxSize: {
				type: "method",
				signature: "pool.getMaxSize()",
				description: "Get maximum pool size",
			},
		},
	},
	storage: {
		type: "module",
		description: "Persistent storage API (localStorage wrapper)",
		properties: {
			get: {
				type: "method",
				signature: "storage.get(key, defaultValue?)",
				description: "Get value from storage",
			},
			set: {
				type: "method",
				signature: "storage.set(key, value)",
				description: "Save value to storage",
			},
			remove: {
				type: "method",
				signature: "storage.remove(key)",
				description: "Remove value from storage",
			},
			clear: {
				type: "method",
				signature: "storage.clear()",
				description: "Clear all storage",
			},
			has: {
				type: "method",
				signature: "storage.has(key)",
				description: "Check if key exists in storage",
			},
			keys: {
				type: "method",
				signature: "storage.keys()",
				description: "Get all storage keys",
			},
		},
	},
};
