import { SceneRegistry } from "./scene-registry";
import { RouteManager } from "./route-manager";
import { Router } from "./router";
import type { SceneDefinition } from "./types";

export class SceneManager {
	public registry: SceneRegistry;
	public routeManager: RouteManager;
	public router: Router;

	private activeSceneName: string | null = null;
	private activeScene: SceneDefinition | null = null;
	constructor() {
		this.registry = new SceneRegistry();
		this.routeManager = new RouteManager();
		// Router needs reference to this manager, so we create it last
		this.router = new Router(this.routeManager, this);
	}

	/**
	 * Register a scene
	 * @param name Unique name for the scene
	 * @param definition Scene definition object with lifecycle methods
	 */
	registerScene(name: string, definition: SceneDefinition): void {
		if (!name || typeof name !== "string") {
			console.error(`[SceneManager] Invalid scene name: ${name}`);
			return;
		}
		if (!definition || typeof definition !== "object") {
			console.error(`[SceneManager] Invalid scene definition for '${name}'`);
			return;
		}
		this.registry.register(name, definition);
	}

	/**
	 * Register a route
	 */
	registerRoute(path: string, sceneName: string): void {
		this.routeManager.register(path, sceneName);
	}

	/**
	 * Set active scene
	 * @param name Name of the scene to activate
	 * @param params Route parameters to pass to onEnter
	 */
	setActiveScene(name: string, params: Record<string, string> = {}): void {
		const newScene = this.registry.get(name);

		if (!newScene) {
			console.error(`[SceneManager] Scene not found: ${name}`);
			console.error(
				`[SceneManager] Available scenes: ${this.registry.getNames().join(", ")}`,
			);
			return;
		}

		// Don't switch if it's already the active scene (unless params changed)
		if (this.activeSceneName === name && this.activeScene === newScene) {
			// Still call onEnter with new params in case params changed
			if (newScene.onEnter) {
				try {
					newScene.onEnter(params);
				} catch (e) {
					console.error(`[SceneManager] Error in scene '${name}' onEnter:`, e);
				}
			}
			return;
		}

		// Leave current scene
		if (this.activeScene?.onLeave) {
			try {
				this.activeScene.onLeave();
			} catch (e) {
				console.error(
					`[SceneManager] Error in scene '${this.activeSceneName}' onLeave:`,
					e,
				);
			}
		}

		// Switch scene
		this.activeSceneName = name;
		this.activeScene = newScene;

		// Initialize if needed (and not already initialized)
		// init() is called once per scene registration
		// For per-activation initialization, use onEnter()
		if (this.activeScene.init && !this.activeScene._initialized) {
			try {
				this.activeScene.init();
				this.activeScene._initialized = true;
			} catch (e) {
				console.error(`[SceneManager] Error in scene '${name}' init:`, e);
			}
		}

		// Enter new scene (called every time scene becomes active)
		if (this.activeScene.onEnter) {
			try {
				this.activeScene.onEnter(params);
			} catch (e) {
				console.error(`[SceneManager] Error in scene '${name}' onEnter:`, e);
			}
		}
	}

	/**
	 * Update active scene
	 */
	update(): void {
		if (this.activeScene?.update) {
			try {
				this.activeScene.update();
			} catch (e) {
				console.error(
					`[SceneManager] Error in scene '${this.activeSceneName}' update:`,
					e,
				);
			}
		}
	}

	/**
	 * Draw active scene
	 */
	draw(): void {
		if (this.activeScene?.draw) {
			try {
				this.activeScene.draw();
			} catch (e) {
				console.error(
					`[SceneManager] Error in scene '${this.activeSceneName}' draw:`,
					e,
				);
			}
		} else if (this.activeScene) {
			// Scene exists but has no draw function - this will cause blank screen
			console.warn(
				`[SceneManager] Scene '${this.activeSceneName}' has no draw() function`,
			);
		}
	}

	/**
	 * Check if there is an active scene
	 */
	hasActiveScene(): boolean {
		return this.activeScene !== null;
	}

	/**
	 * Get current active scene name
	 * @returns Name of currently active scene, or null if none
	 */
	getCurrentSceneName(): string | null {
		return this.activeSceneName;
	}

	/**
	 * Get current active scene definition
	 * @returns Currently active scene definition, or null if none
	 */
	getCurrentScene(): SceneDefinition | null {
		return this.activeScene;
	}

	/**
	 * Get public API interface for VM
	 */
	getInterface(): any {
		return {
			register: (name: string, def: any) => this.registerScene(name, def),
			route: (path: string, sceneName: string) =>
				this.registerRoute(path, sceneName),
			goto: (name: string, params: any) => this.setActiveScene(name, params),
			current: () => this.activeSceneName,
		};
	}
}
