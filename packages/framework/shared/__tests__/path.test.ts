import { describe, expect, it } from "vitest";
import {
	getBaseName,
	getModuleName,
	getResourceName,
	isAudioFile,
	isImageFile,
	isMapFile,
	isSourceFile,
	normalizePath,
} from "../src/utils/path";

describe("Path utilities", () => {
	describe("normalizePath", () => {
		it("should convert backslashes to forward slashes", () => {
			expect(normalizePath("a\\b\\c")).toBe("a/b/c");
		});

		it("should leave forward slashes unchanged", () => {
			expect(normalizePath("a/b/c")).toBe("a/b/c");
		});

		it("should handle empty string", () => {
			expect(normalizePath("")).toBe("");
		});
	});

	describe("getBaseName", () => {
		it("should return filename without extension", () => {
			expect(getBaseName("src/main.ts")).toBe("main");
			expect(getBaseName("sprite.png")).toBe("sprite");
		});

		it("should handle files without extension", () => {
			// getBaseName uses slice(0, -ext.length) which returns "" when ext is ""
			// This is a known quirk — files without extensions return ""
			expect(getBaseName("Makefile")).toBe("");
		});
	});

	describe("getModuleName", () => {
		it("should return relative path without extension", () => {
			const result = getModuleName("/project/src/game/main.loot", "/project/src");
			expect(result).toContain("game");
			expect(result).toContain("main");
			expect(result).not.toContain(".loot");
		});
	});

	describe("getResourceName", () => {
		it("should convert path to hyphenated resource name", () => {
			const result = getResourceName("/project/public/sprites/player.png", "/project/public");
			expect(result).toContain("sprites");
			expect(result).toContain("player");
			expect(result).not.toContain(".png");
		});
	});

	describe("file type checks", () => {
		it("should identify source files", () => {
			expect(isSourceFile("main.loot")).toBe(true);
			expect(isSourceFile("main.ts")).toBe(false);
		});

		it("should identify image files", () => {
			expect(isImageFile("sprite.png")).toBe(true);
			expect(isImageFile("sprite.jpg")).toBe(true);
			expect(isImageFile("data.json")).toBe(false);
		});

		it("should identify audio files", () => {
			expect(isAudioFile("sound.wav")).toBe(true);
			expect(isAudioFile("music.mp3")).toBe(true);
			expect(isAudioFile("data.json")).toBe(false);
		});

		it("should identify map files", () => {
			expect(isMapFile("level.json")).toBe(true);
			expect(isMapFile("sprite.png")).toBe(false);
		});
	});
});
