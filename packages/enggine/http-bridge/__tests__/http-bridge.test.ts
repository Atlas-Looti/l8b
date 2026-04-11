import { describe, expect, it, vi, beforeEach } from "vitest";
import { createHttpBridge } from "../src/index";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("createHttpBridge", () => {
	beforeEach(() => {
		mockFetch.mockReset();
		mockFetch.mockResolvedValue({
			ok: true,
			status: 200,
			statusText: "OK",
			json: () => Promise.resolve({ name: "Alice", score: 100 }),
			text: () => Promise.resolve("ok"),
		});
	});

	it("makes POST request to baseUrl + endpoint path", async () => {
		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });

		const result = await bridge.request!("user.getProfile", { id: 5 });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.example.com/user.getProfile",
			expect.objectContaining({ method: "POST" }),
		);
		// Result from mock json()
		expect(result).toEqual({ ok: true, name: "Alice", score: 100 });
	});

	it("substitutes {param} in endpoint path from payload", async () => {
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			endpoints: {
				"user.getProfile": "/users/{id}",
				"leaderboard.get": "/leaderboard?limit={limit}",
			},
		});

		await bridge.request!("user.getProfile", { id: 42 });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.example.com/users/42",
			expect.any(Object),
		);
	});

	it("falls back to /{requestName} when no endpoint mapping", async () => {
		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });

		await bridge.request!("foo.bar", { x: 1 });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.example.com/foo.bar",
			expect.any(Object),
		);
	});

	it("returns { ok: false, error } on HTTP 4xx/5xx", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 404,
			statusText: "Not Found",
			json: () => Promise.resolve({ error: "User not found" }),
			text: () => Promise.resolve('{"error":"User not found"}'),
		});

		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });
		const result = await bridge.request!("user.getProfile", { id: 999 });

		expect(result).toEqual({ ok: false, error: "User not found" });
	});

	it("returns { ok: false, error } on network error", async () => {
		mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));

		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });
		const result = await bridge.request!("user.getProfile", {});

		expect(result).toEqual({ ok: false, error: "Failed to fetch" });
	});

	it("uses custom urlBuilder when provided", async () => {
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			urlBuilder: (name, payload, baseUrl) =>
				`${baseUrl}/v2/${name}?q=${encodeURIComponent(JSON.stringify(payload))}`,
		});

		await bridge.request!("user.getProfile", { id: 5 });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.example.com/v2/user.getProfile?q=%7B%22id%22%3A5%7D",
			expect.any(Object),
		);
	});

	it("uses custom responseHandler when provided", async () => {
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			responseHandler: async (res) => {
				const data = await res.json();
				return { success: true, ...data };
			},
		});

		const result = await bridge.request!("user.getProfile", {});

		expect(result).toEqual({ success: true, name: "Alice", score: 100 });
	});

	it("responseHandler can throw to return error shape", async () => {
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			responseHandler: async (res) => {
				if (!res.ok) throw new Error(`Server error: ${res.status}`);
				return res.json();
			},
		});

		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: "Internal Server Error",
			json: () => Promise.resolve({}),
			text: () => Promise.resolve(""),
		});

		const result = await bridge.request!("user.getProfile", {});

		expect(result).toEqual({ ok: false, error: "Server error: 500" });
	});

	it("applies default headers from config.defaults", async () => {
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			defaults: {
				headers: {
					Authorization: "Bearer token123",
					"X-Game-Id": "my-game",
				},
			},
		});

		await bridge.request!("user.getProfile", {});

		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: "Bearer token123",
					"X-Game-Id": "my-game",
					"Content-Type": "application/json",
				}),
			}),
		);
	});

	it("emit logs to console.log by default", async () => {
		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });

		bridge.emit!("score.update", { score: 50 });

		expect(consoleSpy).toHaveBeenCalledWith(
			"[http-bridge] score.update",
			{ score: 50 },
		);
		consoleSpy.mockRestore();
	});

	it("emit uses custom logEmit when provided", async () => {
		const logFn = vi.fn();
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			logEmit: logFn,
		});

		bridge.emit!("score.update", { score: 50 });

		expect(logFn).toHaveBeenCalledWith("score.update", { score: 50 });
	});

	it("subscribe returns a no-op unsubscribe function", () => {
		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });
		const unsubscribe = bridge.subscribe!(vi.fn());
		expect(typeof unsubscribe).toBe("function");
		unsubscribe(); // should not throw
	});

	it("uses POST with JSON body by default", async () => {
		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });

		await bridge.request!("inventory.get", { user_id: "abc", items: ["sword", "shield"] });

		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: "POST",
				headers: expect.objectContaining({ "Content-Type": "application/json" }),
				body: JSON.stringify({ user_id: "abc", items: ["sword", "shield"] }),
			}),
		);
	});

	it("gracefully handles missing param in path substitution", async () => {
		const bridge = createHttpBridge({
			baseUrl: "https://api.example.com",
			endpoints: { "user.getProfile": "/users/{id}/posts/{postId}" },
		});

		await bridge.request!("user.getProfile", { id: 1 }); // postId missing

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.example.com/users/1/posts/",
			expect.any(Object),
		);
	});

	it("handles non-JSON ok response gracefully", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 204,
			statusText: "No Content",
			json: () => Promise.reject(new Error("No content")),
			text: () => Promise.resolve(""),
		});

		const bridge = createHttpBridge({ baseUrl: "https://api.example.com" });
		const result = await bridge.request!("game.save", {});

		expect(result).toEqual({ ok: true, value: "" });
	});
});
