/**
 * Memory Pool - Reusable object and array pools for the VM
 *
 * Reduces GC pressure by recycling arrays and objects
 * during bytecode execution.
 */

const MAX_POOL_SIZE = 1000;

const arrayPool: any[][] = [];
const objectPool: any[] = [];

/**
 * Get an array from the pool or create new
 */
export function getPooledArray(): any[] {
	if (arrayPool.length > 0) {
		const arr = arrayPool.pop()!;
		arr.length = 0;
		return arr;
	}
	return [];
}

/**
 * Recycle array to pool
 */
export function recycleArray(arr: any[]): void {
	if (arrayPool.length < MAX_POOL_SIZE) {
		arrayPool.push(arr);
	}
}

/**
 * Get object from pool or create new
 */
export function getPooledObject(): any {
	if (objectPool.length > 0) {
		return objectPool.pop();
	}
	return {};
}

/**
 * Recycle object to pool (clears properties)
 */
export function recycleObject(obj: any): void {
	if (objectPool.length < MAX_POOL_SIZE) {
		for (const key in obj) {
			delete obj[key];
		}
		objectPool.push(obj);
	}
}
