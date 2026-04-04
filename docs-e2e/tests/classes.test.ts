/**
 * Verify: docs-site/api/classes.mdx matches Random and ObjectPool
 * Source of truth: packages/lootiscript (Random), packages/enggine/runtime (ObjectPool)
 */
import { describe, expect, it } from "vitest";
import { Random } from "@al8b/lootiscript";

describe("Random class — docs vs source", () => {
	it("can be constructed with seed", () => {
		const rng = new Random(42);
		expect(rng).toBeDefined();
	});

	it("has next()", () => {
		const rng = new Random(42);
		const val = rng.next();
		expect(typeof val).toBe("number");
		expect(val).toBeGreaterThanOrEqual(0);
		expect(val).toBeLessThanOrEqual(1);
	});

	it("has nextInt()", () => {
		const rng = new Random(42);
		const val = rng.nextInt(10);
		expect(typeof val).toBe("number");
		expect(val).toBeGreaterThanOrEqual(0);
		expect(val).toBeLessThan(10);
	});

	it("has seed()", () => {
		const rng = new Random(42);
		expect(typeof rng.seed).toBe("function");
	});

	it("has clone()", () => {
		const rng = new Random(42);
		expect(typeof rng.clone).toBe("function");
	});

	it("same seed produces same sequence (deterministic)", () => {
		const rng1 = new Random(123);
		const rng2 = new Random(123);
		expect(rng1.next()).toBe(rng2.next());
		expect(rng1.next()).toBe(rng2.next());
		expect(rng1.next()).toBe(rng2.next());
	});
});
