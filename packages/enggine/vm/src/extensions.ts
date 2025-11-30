/**
 * Array extensions
 */

/**
 * Setup array extensions
 */
export function setupArrayExtensions(): void {
	// Insert element at beginning of array (returns the inserted element)
	if (!Array.prototype.insert) {
		Array.prototype.insert = function (element: any) {
			this.splice(0, 0, element);
			return element;
		};
	}

	// Insert element at specific index (returns the inserted element)
	if (!Array.prototype.insertAt) {
		Array.prototype.insertAt = function (element: any, index: number) {
			if (index >= 0 && index < this.length) {
				this.splice(index, 0, element);
			} else {
				this.push(element);
			}
			return element;
		};
	}

	// Remove element at index (returns removed element or 0 if out of bounds)
	if (!Array.prototype.remove) {
		Array.prototype.remove = function (index: number) {
			if (index >= 0 && index < this.length) {
				return this.splice(index, 1)[0];
			}
			return 0;
		};
	}

	// Remove element at index - alias for remove() (returns removed element or 0)
	if (!Array.prototype.removeAt) {
		Array.prototype.removeAt = function (index: number) {
			if (index >= 0 && index < this.length) {
				return this.splice(index, 1)[0];
			}
			return 0;
		};
	}

	// Remove first occurrence of element (returns removed element or 0 if not found)
	if (!Array.prototype.removeElement) {
		Array.prototype.removeElement = function (element: any) {
			const index = this.indexOf(element);
			if (index >= 0) {
				return this.splice(index, 1)[0];
			}
			return 0;
		};
	}

	// Check if array contains element (returns 1 if found, 0 if not found)
	if (!Array.prototype.contains) {
		Array.prototype.contains = function (element: any) {
			return this.indexOf(element) >= 0 ? 1 : 0;
		};
	}

	// Sort array with optional comparator function
	if (!Array.prototype.sortList) {
		Array.prototype.sortList = function (fn?: (a: any, b: any) => number) {
			if (fn) {
				return this.sort(fn);
			}
			return this.sort();
		};
	}
}

// TypeScript type declarations for Array prototype extensions
declare global {
	interface Array<T> {
		insert(element: T): T;
		insertAt(element: T, index: number): T;
		remove(index: number): T | 0;
		removeAt(index: number): T | 0;
		removeElement(element: T): T | 0;
		contains(element: T): 0 | 1;
		sortList(fn?: (a: T, b: T) => number): T[];
	}
}
