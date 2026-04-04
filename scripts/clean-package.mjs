#!/usr/bin/env bun

import { execSync } from "node:child_process";
import { lstatSync, rmSync } from "node:fs";
import path from "node:path";

const targets = process.argv.slice(2);

if (targets.length === 0) {
	console.error("Usage: bun scripts/clean-package.mjs <path> [more-paths]");
	process.exit(1);
}

function removeTarget(targetPath) {
	const resolved = path.resolve(process.cwd(), targetPath);

	try {
		lstatSync(resolved);
	} catch {
		return;
	}

	for (let attempt = 0; attempt < 3; attempt++) {
		try {
			rmSync(resolved, { recursive: true, force: true, maxRetries: 2, retryDelay: 80 });
			return;
		} catch (error) {
			if (attempt === 2) {
				try {
					execSync(`cmd /c rmdir /s /q "${resolved}"`, { stdio: "ignore" });
					return;
				} catch {
					throw error;
				}
			}
		}
	}
}

for (const target of targets) {
	removeTarget(target);
}

