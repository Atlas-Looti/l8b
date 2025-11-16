import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["tests/**/*.test.ts"],
		globals: true,
		environment: "jsdom", // For DOM APIs like Image, FontFace, fetch
		setupFiles: ["./tests/setup/setupTests.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["tests/**", "dist/**", "node_modules/**"],
		},
	},
});
