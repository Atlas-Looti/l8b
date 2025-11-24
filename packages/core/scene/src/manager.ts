/**
 * @l8b/scene - Scene Manager
 *
 * Manages multiple scenes, handles transitions, and coordinates lifecycle.
 */

import { Scene } from "./scene";
import type {
	SceneInterface,
	SceneManagerOptions,
	SceneTransitionOptions,
} from "./types";

/**
 * Scene Manager
 *
 * Manages scene lifecycle, transitions, and updates.
 * Supports scene stacking for overlay scenes.
 *
 * @example
 * ```typescript
 * const manager = new SceneManager();
 * const menuScene = new MenuScene("menu");
 * const gameScene = new GameScene("game");
 *
 * manager.addScene(menuScene);
 * manager.addScene(gameScene);
 * manager.setActiveScene("menu");
 *
 * // In game loop
 * manager.update();
 * manager.draw();
 * ```
 */
export class SceneManager {
	private scenes: Map<string, SceneInterface> = new Map();
	private activeSceneId: string | null = null;
	private sceneStack: string[] = [];
	private options: Required<SceneManagerOptions>;
	private transitionProgress: number = 0;
	private transitionDuration: number = 0;
	private transitionStartTime: number = 0;
	private isTransitioning: boolean = false;
	private transitionFrom: string | null = null;
	private transitionTarget: string | null = null;
	private transitionFn?: (progress: number) => number;

	/**
	 * Create a new scene manager
	 *
	 * @param options - Configuration options
	 */
	constructor(options: SceneManagerOptions = {}) {
		this.options = {
			autoUpdate: options.autoUpdate ?? true,
			autoDraw: options.autoDraw ?? true,
			defaultTransitionDuration: options.defaultTransitionDuration ?? 0,
		};
	}

	/**
	 * Add a scene to the manager
	 *
	 * @param scene - Scene to add
	 * @throws {Error} If scene with same ID already exists
	 */
	public addScene(scene: SceneInterface): void {
		if (this.scenes.has(scene.id)) {
			throw new Error(`Scene with ID "${scene.id}" already exists`);
		}
		this.scenes.set(scene.id, scene);
		if (scene instanceof Scene) {
			scene._setStatus("idle");
		}
	}

	/**
	 * Remove a scene from the manager
	 *
	 * @param sceneId - ID of the scene to remove
	 * @returns True if scene was removed, false if not found
	 */
	public removeScene(sceneId: string): boolean {
		const scene = this.scenes.get(sceneId);
		if (!scene) {
			return false;
		}

		// If it's the active scene, clear it
		if (this.activeSceneId === sceneId) {
			this.activeSceneId = null;
		}

		// Remove from stack
		const stackIndex = this.sceneStack.indexOf(sceneId);
		if (stackIndex >= 0) {
			this.sceneStack.splice(stackIndex, 1);
		}

		// Destroy and remove
		if (scene instanceof Scene) {
			scene._setStatus("destroyed");
		}
		scene.destroy?.();
		this.scenes.delete(sceneId);
		return true;
	}

	/**
	 * Get a scene by ID
	 *
	 * @param sceneId - ID of the scene
	 * @returns Scene or undefined if not found
	 */
	public getScene(sceneId: string): SceneInterface | undefined {
		return this.scenes.get(sceneId);
	}

	/**
	 * Check if a scene exists
	 *
	 * @param sceneId - ID of the scene
	 * @returns True if scene exists
	 */
	public hasScene(sceneId: string): boolean {
		return this.scenes.has(sceneId);
	}

	/**
	 * Get the currently active scene
	 *
	 * @returns Active scene or null if none
	 */
	public getActiveScene(): SceneInterface | null {
		if (!this.activeSceneId) {
			return null;
		}
		return this.scenes.get(this.activeSceneId) || null;
	}

	/**
	 * Get the active scene ID
	 *
	 * @returns Active scene ID or null
	 */
	public getActiveSceneId(): string | null {
		return this.activeSceneId;
	}

	/**
	 * Set the active scene (immediate, no transition)
	 *
	 * @param sceneId - ID of the scene to activate
	 * @throws {Error} If scene not found
	 */
	public setActiveScene(sceneId: string): void {
		if (!this.scenes.has(sceneId)) {
			throw new Error(`Scene with ID "${sceneId}" not found`);
		}

		const previousSceneId = this.activeSceneId;
		const previousScene = previousSceneId
			? this.scenes.get(previousSceneId)
			: null;

		// Pause previous scene
		if (previousScene) {
			if (previousScene instanceof Scene) {
				previousScene._setStatus("paused");
			}
			previousScene.onPause?.();
		}

		// Activate new scene
		this.activeSceneId = sceneId;
		const newScene = this.scenes.get(sceneId)!;
		if (newScene instanceof Scene) {
			newScene._setStatus("active");
		}

		// Initialize if not already initialized
		if (newScene.status === "idle" || newScene.status === "initializing") {
			if (newScene instanceof Scene) {
				newScene._setStatus("initializing");
			}
			const initResult = newScene.init?.();
			if (initResult instanceof Promise) {
				initResult.then(() => {
					if (newScene instanceof Scene) {
						newScene._setStatus("active");
					}
				});
			} else {
				if (newScene instanceof Scene) {
					newScene._setStatus("active");
				}
			}
		} else if (newScene.status === "paused") {
			newScene.onResume?.();
			if (newScene instanceof Scene) {
				newScene._setStatus("active");
			}
		}

		// Update stack
		if (previousSceneId) {
			const stackIndex = this.sceneStack.indexOf(previousSceneId);
			if (stackIndex >= 0) {
				this.sceneStack.splice(stackIndex, 1);
			}
		}
		const currentStackIndex = this.sceneStack.indexOf(sceneId);
		if (currentStackIndex >= 0) {
			this.sceneStack.splice(currentStackIndex, 1);
		}
		this.sceneStack.push(sceneId);
	}

	/**
	 * Transition to a new scene
	 *
	 * @param sceneId - ID of the scene to transition to
	 * @param options - Transition options
	 * @throws {Error} If scene not found
	 */
	public transitionTo(
		sceneId: string,
		options: SceneTransitionOptions = {},
	): void {
		if (!this.scenes.has(sceneId)) {
			throw new Error(`Scene with ID "${sceneId}" not found`);
		}

		const duration = options.duration ?? this.options.defaultTransitionDuration;
		const destroyPrevious = options.destroyPrevious ?? false;
		const pausePrevious = options.pausePrevious ?? true;

		// If no transition duration, switch immediately
		if (duration <= 0) {
			if (destroyPrevious && this.activeSceneId) {
				this.removeScene(this.activeSceneId);
			} else if (pausePrevious && this.activeSceneId) {
				const prevScene = this.scenes.get(this.activeSceneId);
				if (prevScene) {
					if (prevScene instanceof Scene) {
						prevScene._setStatus("paused");
					}
					prevScene.onPause?.();
				}
			}
			this.setActiveScene(sceneId);
			return;
		}

		// Start transition
		this.isTransitioning = true;
		this.transitionFrom = this.activeSceneId;
		this.transitionTarget = sceneId;
		this.transitionDuration = duration;
		this.transitionProgress = 0;
		this.transitionStartTime = performance.now();
		this.transitionFn = options.transition;

		// Initialize target scene if needed
		const targetScene = this.scenes.get(sceneId)!;
		if (targetScene.status === "idle") {
			if (targetScene instanceof Scene) {
				targetScene._setStatus("initializing");
			}
			const initResult = targetScene.init?.();
			if (initResult instanceof Promise) {
				initResult.then(() => {
					if (targetScene instanceof Scene) {
						targetScene._setStatus("active");
					}
				});
			} else {
				if (targetScene instanceof Scene) {
					targetScene._setStatus("active");
				}
			}
		}
	}

	/**
	 * Push a scene onto the stack (overlay)
	 *
	 * @param sceneId - ID of the scene to push
	 * @throws {Error} If scene not found
	 */
	public pushScene(sceneId: string): void {
		if (!this.scenes.has(sceneId)) {
			throw new Error(`Scene with ID "${sceneId}" not found`);
		}

		// Pause current active scene
		if (this.activeSceneId) {
			const currentScene = this.scenes.get(this.activeSceneId);
			if (currentScene) {
				if (currentScene instanceof Scene) {
					currentScene._setStatus("paused");
				}
				currentScene.onPause?.();
			}
		}

		// Activate new scene
		const newScene = this.scenes.get(sceneId)!;
		if (newScene instanceof Scene) {
			newScene._setStatus("active");
		}

		// Initialize if needed
		if (newScene.status === "idle" || newScene.status === "initializing") {
			if (newScene instanceof Scene) {
				newScene._setStatus("initializing");
			}
			const initResult = newScene.init?.();
			if (initResult instanceof Promise) {
				initResult.then(() => {
					if (newScene instanceof Scene) {
						newScene._setStatus("active");
					}
				});
			} else {
				if (newScene instanceof Scene) {
					newScene._setStatus("active");
				}
			}
		} else if (newScene.status === "paused") {
			newScene.onResume?.();
			if (newScene instanceof Scene) {
				newScene._setStatus("active");
			}
		}

		// Update stack
		this.sceneStack.push(sceneId);
		this.activeSceneId = sceneId;
	}

	/**
	 * Pop a scene from the stack
	 *
	 * @param destroy - Whether to destroy the popped scene
	 * @returns The popped scene ID or null
	 */
	public popScene(destroy: boolean = false): string | null {
		if (this.sceneStack.length === 0) {
			return null;
		}

		const poppedId = this.sceneStack.pop()!;
		const poppedScene = this.scenes.get(poppedId);

		if (poppedScene) {
			if (destroy) {
				this.removeScene(poppedId);
			} else {
				if (poppedScene instanceof Scene) {
					poppedScene._setStatus("paused");
				}
				poppedScene.onPause?.();
			}
		}

		// Activate previous scene in stack
		if (this.sceneStack.length > 0) {
			const previousId = this.sceneStack[this.sceneStack.length - 1];
			const previousScene = this.scenes.get(previousId);
			if (previousScene) {
				this.activeSceneId = previousId;
				previousScene.onResume?.();
				if (previousScene instanceof Scene) {
					previousScene._setStatus("active");
				}
			}
		} else {
			this.activeSceneId = null;
		}

		return poppedId;
	}

	/**
	 * Get the scene stack
	 *
	 * @returns Array of scene IDs in stack order (bottom to top)
	 */
	public getSceneStack(): readonly string[] {
		return [...this.sceneStack];
	}

	/**
	 * Update all active scenes
	 *
	 * Should be called every frame in the game loop.
	 * Also handles scene transitions.
	 */
	public update(): void {
		// Update transition
		if (this.isTransitioning) {
			const now = performance.now();
			const elapsed = now - this.transitionStartTime;
			this.transitionProgress = Math.min(
				elapsed / this.transitionDuration,
				1.0,
			);

			// Apply transition function if provided
			if (this.transitionFn) {
				this.transitionFn(this.transitionProgress);
			}

			// Complete transition
			if (this.transitionProgress >= 1.0) {
				this.isTransitioning = false;
				if (this.transitionFrom && this.transitionTarget) {
					// The actual scene switch happens here
					this.setActiveScene(this.transitionTarget);
				}
				this.transitionFrom = null;
				this.transitionTarget = null;
				this.transitionProgress = 0;
			}
		}

		// Update active scene
		if (this.options.autoUpdate && this.activeSceneId && !this.isTransitioning) {
			const activeScene = this.scenes.get(this.activeSceneId);
			if (activeScene && activeScene.status === "active") {
				activeScene.update?.();
			}
		}
	}

	/**
	 * Draw all active scenes
	 *
	 * Should be called every frame in the game loop.
	 */
	public draw(): void {
		if (!this.options.autoDraw) {
			return;
		}

		// Draw previous scene during transition
		if (this.isTransitioning && this.transitionFrom) {
			const fromScene = this.scenes.get(this.transitionFrom);
			if (fromScene) {
				fromScene.draw?.();
			}
		}

		// Draw active scene
		if (this.activeSceneId) {
			const activeScene = this.scenes.get(this.activeSceneId);
			if (activeScene && activeScene.status === "active") {
				activeScene.draw?.();
			}
		}
	}

	/**
	 * Get transition progress (0.0 to 1.0)
	 *
	 * @returns Transition progress or 0 if not transitioning
	 */
	public getTransitionProgress(): number {
		return this.isTransitioning ? this.transitionProgress : 0;
	}

	/**
	 * Check if currently transitioning
	 *
	 * @returns True if transition is in progress
	 */
	public isTransitioningBetweenScenes(): boolean {
		return this.isTransitioning;
	}

	/**
	 * Clear all scenes
	 */
	public clear(): void {
		// Destroy all scenes
		for (const scene of this.scenes.values()) {
			if (scene instanceof Scene) {
				scene._setStatus("destroyed");
			}
			scene.destroy?.();
		}

		this.scenes.clear();
		this.activeSceneId = null;
		this.sceneStack = [];
		this.isTransitioning = false;
		this.transitionFrom = null;
		this.transitionTarget = null;
		this.transitionProgress = 0;
	}

	/**
	 * Get all scene IDs
	 *
	 * @returns Array of all scene IDs
	 */
	public getAllSceneIds(): string[] {
		return Array.from(this.scenes.keys());
	}

	/**
	 * Get scene count
	 *
	 * @returns Number of scenes
	 */
	public getSceneCount(): number {
		return this.scenes.size;
	}
}

