import { describe, expect, it, vi } from "vitest";
import { Logger, createLogger } from "../src/utils/logger";

describe("Logger", () => {
	describe("level filtering", () => {
		it("should not log below configured level", () => {
			const spy = vi.spyOn(console, "log").mockImplementation(() => {});
			const logger = new Logger("test", "warn");
			logger.debug("should not appear");
			logger.info("should not appear");
			expect(spy).not.toHaveBeenCalled();
			spy.mockRestore();
		});

		it("should log at configured level", () => {
			const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
			const logger = new Logger("test", "warn");
			logger.warn("should appear");
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should log above configured level", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => {});
			const logger = new Logger("test", "warn");
			logger.error("should appear");
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should log nothing at silent level", () => {
			const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
			const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
			const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
			const logger = new Logger("test", "silent");
			logger.debug("x");
			logger.info("x");
			logger.warn("x");
			logger.error("x");
			expect(logSpy).not.toHaveBeenCalled();
			expect(warnSpy).not.toHaveBeenCalled();
			expect(errorSpy).not.toHaveBeenCalled();
			logSpy.mockRestore();
			warnSpy.mockRestore();
			errorSpy.mockRestore();
		});
	});

	describe("setLevel", () => {
		it("should change log level dynamically", () => {
			const spy = vi.spyOn(console, "log").mockImplementation(() => {});
			const logger = new Logger("test", "error");
			logger.info("should not appear");
			expect(spy).not.toHaveBeenCalled();
			logger.setLevel("debug");
			logger.info("should appear");
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});
	});

	describe("createLogger", () => {
		it("should create a namespaced logger", () => {
			const logger = createLogger("bundler");
			expect(logger).toBeInstanceOf(Logger);
		});

		it("should accept a level parameter", () => {
			const spy = vi.spyOn(console, "log").mockImplementation(() => {});
			const logger = createLogger("test", "error");
			logger.info("should not appear");
			expect(spy).not.toHaveBeenCalled();
			spy.mockRestore();
		});
	});
});
