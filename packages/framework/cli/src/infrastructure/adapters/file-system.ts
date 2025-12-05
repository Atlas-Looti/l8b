/**
 * Node File System Adapter
 *
 * Implementation of IFileSystem using fs-extra
 */

import fs from "fs-extra";
import type { IFileSystem } from "../../core/ports";

export class NodeFileSystem implements IFileSystem {
	async pathExists(path: string): Promise<boolean> {
		return await fs.pathExists(path);
	}

	async readFile(filePath: string, encoding: string = "utf-8"): Promise<string> {
		return await fs.readFile(filePath, { encoding: encoding as BufferEncoding });
	}

	async writeFile(filePath: string, content: string, encoding: string = "utf-8"): Promise<void> {
		await fs.writeFile(filePath, content, { encoding: encoding as BufferEncoding });
	}

	async readJson<T = unknown>(filePath: string): Promise<T> {
		return await fs.readJson(filePath);
	}

	async writeJson(filePath: string, object: unknown, options?: { spaces?: number }): Promise<void> {
		await fs.writeJson(filePath, object, options);
	}

	async ensureDir(dirPath: string): Promise<void> {
		await fs.ensureDir(dirPath);
	}

	async copy(
		src: string,
		dest: string,
		options?: { overwrite?: boolean; filter?: (src: string) => boolean },
	): Promise<void> {
		await fs.copy(src, dest, options);
	}

	async remove(path: string): Promise<void> {
		await fs.remove(path);
	}

	async readdir(dirPath: string, options?: { withFileTypes?: boolean }): Promise<string[] | import("fs").Dirent[]> {
		if (options?.withFileTypes) {
			return await fs.readdir(dirPath, { withFileTypes: true });
		}
		return await fs.readdir(dirPath);
	}

	async stat(path: string): Promise<import("fs").Stats> {
		return await fs.stat(path);
	}

	existsSync(path: string): boolean {
		return fs.existsSync(path);
	}

	statSync(path: string): import("fs").Stats {
		return fs.statSync(path);
	}
}
