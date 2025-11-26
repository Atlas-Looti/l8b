/**
 * Custom error classes for Scene Management System
 */

export class SceneError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>,
	) {
		super(message);
		this.name = "SceneError";
		Error.captureStackTrace?.(this, this.constructor);
	}
}

export class SceneNotFoundError extends SceneError {
	constructor(sceneName: string, availableScenes: string[] = []) {
		super(`Scene not found: ${sceneName}`, {
			sceneName,
			availableScenes,
		});
		this.name = "SceneNotFoundError";
	}
}

export class InvalidPathError extends SceneError {
	constructor(path: unknown) {
		super(`Invalid path: ${path}`, { path });
		this.name = "InvalidPathError";
	}
}

export class InvalidSceneDefinitionError extends SceneError {
	constructor(sceneName: string) {
		super(`Invalid scene definition for '${sceneName}'`, { sceneName });
		this.name = "InvalidSceneDefinitionError";
	}
}
