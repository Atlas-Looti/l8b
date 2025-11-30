import { RouteManager } from "./route-manager";
import { Router } from "./router";
import { SceneRegistry } from "./scene-registry";
import type { SceneDefinition } from "./types";
import { isValidObject, isValidString, safeExecute } from "./utils";

export class SceneManager {
	public readonly registry: SceneRegistry;
	public readonly routeManager: RouteManager;
	public readonly router: Router;

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
		if (!this.validateSceneRegistration(name, definition)) {
			return;
		}
		this.registry.register(name, definition);
	}

	/**
	 * Validate scene registration inputs
	 */
	private validateSceneRegistration(name: unknown, definition: unknown): definition is SceneDefinition {
		if (!isValidString(name)) {
			return false;
		}

		if (!isValidObject(definition)) {
			return false;
		}

		return true;
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
			this.handleSceneNotFound(name);
			return;
		}

		if (this.isSameScene(name, newScene)) {
			this.handleSameSceneActivation(newScene, name, params);
			return;
		}

		this.transitionToScene(name, newScene, params);
	}

	/**
	 * Handle scene not found error
	 */
	private handleSceneNotFound(_name: string): void {
		// Scene not found - silently fail (validation should prevent this)
	}

	/**
	 * Check if scene is already active
	 */
	private isSameScene(name: string, scene: SceneDefinition): boolean {
		return this.activeSceneName === name && this.activeScene === scene;
	}

	/**
	 * Handle activation of already active scene
	 */
	private handleSameSceneActivation(scene: SceneDefinition, _name: string, params: Record<string, string>): void {
		if (scene.onEnter) {
			safeExecute(
				() => scene.onEnter?.(params),
				() => {
					// Error handled silently - scene lifecycle errors should be handled by caller
				},
			);
		}
	}

	/**
	 * Transition from current scene to new scene
	 */
	private transitionToScene(name: string, newScene: SceneDefinition, params: Record<string, string>): void {
		this.leaveCurrentScene();
		this.activateNewScene(name, newScene, params);
	}

	/**
	 * Leave current scene
	 */
	private leaveCurrentScene(): void {
		if (!this.activeScene?.onLeave) {
			return;
		}

		safeExecute(
			() => this.activeScene?.onLeave?.(),
			() => {
				// Error handled silently - scene lifecycle errors should be handled by caller
			},
		);
	}

	/**
	 * Activate new scene
	 */
	private activateNewScene(name: string, scene: SceneDefinition, params: Record<string, string>): void {
		this.activeSceneName = name;
		this.activeScene = scene;

		this.initializeSceneIfNeeded(name, scene);
		this.enterScene(name, scene, params);
	}

	/**
	 * Initialize scene if not already initialized
	 */
	private initializeSceneIfNeeded(_name: string, scene: SceneDefinition): void {
		if (!scene.init || scene._initialized) {
			return;
		}

		safeExecute(
			() => {
				scene.init?.();
				scene._initialized = true;
			},
			() => {
				// Error handled silently - scene lifecycle errors should be handled by caller
			},
		);
	}

	/**
	 * Enter scene (call onEnter lifecycle method)
	 */
	private enterScene(_name: string, scene: SceneDefinition, params: Record<string, string>): void {
		if (!scene.onEnter) {
			return;
		}

		safeExecute(
			() => scene.onEnter?.(params),
			() => {
				// Error handled silently - scene lifecycle errors should be handled by caller
			},
		);
	}

	/**
	 * Update active scene (called every frame)
	 */
	update(): void {
		if (!this.activeScene?.update) {
			return;
		}

		safeExecute(
			() => this.activeScene?.update?.(),
			() => {
				// Error handled silently - scene lifecycle errors should be handled by caller
			},
		);
	}

	/**
	 * Draw active scene (called every frame)
	 */
	draw(): void {
		if (!this.activeScene) {
			return;
		}

		if (!this.activeScene.draw) {
			return;
		}

		safeExecute(
			() => this.activeScene?.draw?.(),
			() => {
				// Error handled silently - scene lifecycle errors should be handled by caller
			},
		);
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
			route: (path: string, sceneName: string) => this.registerRoute(path, sceneName),
			goto: (name: string, params: any) => this.setActiveScene(name, params),
			current: () => this.activeSceneName,
		};
	}
}
