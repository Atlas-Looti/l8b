import { DEFAULT_PATH } from "./constants";
import type { RouteManager } from "./route-manager";
import type { SceneManager } from "./scene-manager";
import type { RouterState } from "./types";
import { isBrowser, normalizePath } from "./utils";

export class Router {
	private routeManager: RouteManager;
	private sceneManager: SceneManager;
	private state: RouterState = {
		path: DEFAULT_PATH,
		params: {},
		sceneName: null,
	};

	constructor(routeManager: RouteManager, sceneManager: SceneManager) {
		this.routeManager = routeManager;
		this.sceneManager = sceneManager;
		this.setupPopStateListener();
	}

	/**
	 * Setup browser history listener
	 */
	private setupPopStateListener(): void {
		if (isBrowser()) {
			window.addEventListener("popstate", () => {
				this.handlePathChange(window.location.pathname);
			});
		}
	}

	/**
	 * Navigate to a path (adds to browser history)
	 * @param path Path to navigate to (e.g., "/player/42")
	 */
	push(path: string): void {
		if (!this.validatePath(path)) {
			return;
		}

		const normalizedPath = normalizePath(path);
		if (normalizedPath === this.state.path) {
			return;
		}

		this.updateBrowserHistory(normalizedPath, "push");
		this.handlePathChange(normalizedPath);
	}

	/**
	 * Replace current path (doesn't add to browser history)
	 * @param path Path to navigate to (e.g., "/player/42")
	 */
	replace(path: string): void {
		if (!this.validatePath(path)) {
			return;
		}

		const normalizedPath = normalizePath(path);
		this.updateBrowserHistory(normalizedPath, "replace");
		this.handlePathChange(normalizedPath);
	}

	/**
	 * Go back in browser history
	 */
	back(): void {
		if (isBrowser()) {
			window.history.back();
		}
	}

	/**
	 * Get current state (returns a copy to prevent mutation)
	 */
	getState(): RouterState {
		return {
			...this.state,
		};
	}

	/**
	 * Validate path input
	 */
	private validatePath(path: unknown): path is string {
		if (!path || typeof path !== "string") {
			return false;
		}
		return true;
	}

	/**
	 * Update browser history
	 */
	private updateBrowserHistory(path: string, method: "push" | "replace"): void {
		if (!isBrowser()) {
			return;
		}

		if (method === "push") {
			window.history.pushState({}, "", path);
		} else {
			window.history.replaceState({}, "", path);
		}
	}

	/**
	 * Handle path change
	 * @param path Path to match against routes
	 */
	private handlePathChange(path: string): void {
		const normalizedPath = normalizePath(path);
		const match = this.routeManager.match(normalizedPath);

		if (match) {
			this.updateStateWithMatch(normalizedPath, match);
			return;
		}

		this.handleNoRouteMatch(normalizedPath);
	}

	/**
	 * Update state when route matches
	 */
	private updateStateWithMatch(
		path: string,
		match: {
			sceneName: string;
			params: Record<string, string>;
		},
	): void {
		this.state = {
			path,
			params: match.params,
			sceneName: match.sceneName,
		};
		this.sceneManager.setActiveScene(match.sceneName, match.params);
	}

	/**
	 * Handle case when no route matches
	 */
	private handleNoRouteMatch(path: string): void {
		if (!this.sceneManager.hasActiveScene()) {
			this.activateFirstAvailableScene(path);
		}
	}

	/**
	 * Activate first available scene as fallback
	 */
	private activateFirstAvailableScene(path: string): void {
		const availableScenes = this.sceneManager.registry.getNames();

		if (availableScenes.length === 0) {
			return;
		}

		const firstScene = availableScenes[0];
		this.state = {
			path,
			params: {},
			sceneName: firstScene,
		};
		this.sceneManager.setActiveScene(firstScene, {});
	}

	/**
	 * Initialize router with current window path
	 * Should be called after routes are registered but before game loop starts
	 */
	init(): void {
		const initialPath = isBrowser() ? window.location.pathname : DEFAULT_PATH;

		this.handlePathChange(initialPath);
		this.ensureActiveScene();
	}

	/**
	 * Ensure at least one scene is active after initialization
	 */
	private ensureActiveScene(): void {
		if (this.sceneManager.hasActiveScene()) {
			return;
		}

		const availableScenes = this.sceneManager.registry.getNames();

		if (availableScenes.length === 0) {
			return;
		}

		const firstScene = availableScenes[0];
		this.state = {
			path: this.state.path,
			params: {},
			sceneName: firstScene,
		};
		this.sceneManager.setActiveScene(firstScene, {});
	}

	/**
	 * Get public API interface for VM
	 * This is what gets exposed to lootiscript as `router`
	 * Note: VM may not support getters properly, so we use both functions and properties
	 */
	getInterface(): any {
		const routerInterface: any = {
			push: (path: string) => this.push(path),
			replace: (path: string) => this.replace(path),
			back: () => this.back(),
			// Provide function accessors for VM compatibility (getters may not work in VM)
			getPath: () => this.state.path,
			getParams: () => this.state.params,
			getSceneName: () => this.state.sceneName,
		};

		// Define dynamic properties that always return current state
		// Using Object.defineProperty for better VM compatibility than class getters
		Object.defineProperty(routerInterface, "path", {
			get: () => this.state.path,
			enumerable: true,
			configurable: true,
		});
		Object.defineProperty(routerInterface, "params", {
			get: () => this.state.params,
			enumerable: true,
			configurable: true,
		});
		Object.defineProperty(routerInterface, "sceneName", {
			get: () => this.state.sceneName,
			enumerable: true,
			configurable: true,
		});

		return routerInterface;
	}
}
