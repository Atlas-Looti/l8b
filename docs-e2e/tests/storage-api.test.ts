/**
 * Verify: docs-site/api/storage.mdx matches StorageService.getInterface()
 * Source of truth: packages/enggine/io/src/storage/index.ts
 *
 * CRITICAL: docs say ONLY set, get, delete. NOT has/keys/clear/remove.
 */
import { describe, expect, it } from "vitest";
import { StorageService } from "@al8b/io";

describe("Storage API — docs vs source", () => {
	const storage = new StorageService("/test", true);
	const api = storage.getInterface();

	// Documented methods
	it("has set()", () => expect(typeof api.set).toBe("function"));
	it("has get()", () => expect(typeof api.get).toBe("function"));
	it("has delete()", () => expect(typeof api.delete).toBe("function"));

	// Methods that were REMOVED from docs (must NOT be in interface)
	it("does NOT expose has()", () => expect(api).not.toHaveProperty("has"));
	it("does NOT expose keys()", () => expect(api).not.toHaveProperty("keys"));
	it("does NOT expose clear()", () => expect(api).not.toHaveProperty("clear"));
	it("does NOT expose remove()", () => expect(api).not.toHaveProperty("remove"));

	// Functional tests
	it("set/get roundtrip works", () => {
		api.set("test_key", 42);
		expect(api.get("test_key")).toBe(42);
	});

	it("get returns null for missing key", () => {
		expect(api.get("nonexistent_key_xyz")).toBeNull();
	});

	it("delete removes a key", () => {
		api.set("to_delete", "value");
		api.delete("to_delete");
		expect(api.get("to_delete")).toBeNull();
	});
});
