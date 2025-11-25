import type { RouteManager } from "./route-manager";
import type { SceneManager } from "./scene-manager";
import type { RouterState } from "./types";

export class Router {
    private routeManager: RouteManager;
    private sceneManager: SceneManager;
    private state: RouterState = {
        path: "/",
        params: {},
        sceneName: null,
    };

    constructor(routeManager: RouteManager, sceneManager: SceneManager) {
        this.routeManager = routeManager;
        this.sceneManager = sceneManager;

        // Listen for browser back/forward
        if (typeof window !== "undefined") {
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
        if (!path || typeof path !== "string") {
            console.error(`[Router] Invalid path: ${path}`);
            return;
        }
        const normalizedPath = this.normalizePath(path);
        if (normalizedPath === this.state.path) {
            // Already at this path, no need to navigate
            return;
        }
        if (typeof window !== "undefined") {
            window.history.pushState({}, "", normalizedPath);
        }
        this.handlePathChange(normalizedPath);
    }

    /**
     * Replace current path (doesn't add to browser history)
     * @param path Path to navigate to (e.g., "/player/42")
     */
    replace(path: string): void {
        if (!path || typeof path !== "string") {
            console.error(`[Router] Invalid path: ${path}`);
            return;
        }
        const normalizedPath = this.normalizePath(path);
        if (typeof window !== "undefined") {
            window.history.replaceState({}, "", normalizedPath);
        }
        this.handlePathChange(normalizedPath);
    }

    /**
     * Go back
     */
    back(): void {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    }

    /**
     * Get current state
     */
    getState(): RouterState {
        return { ...this.state };
    }

    /**
     * Normalize path (remove query string, hash, ensure leading slash)
     */
    private normalizePath(path: string): string {
        // Remove query string and hash
        const cleanPath = path.split("?")[0].split("#")[0];
        // Ensure leading slash
        return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    }

    /**
     * Handle path change
     * @param path Path to match against routes
     */
    private handlePathChange(path: string): void {
        const normalizedPath = this.normalizePath(path);
        const match = this.routeManager.match(normalizedPath);

        if (match) {
            this.state = {
                path: normalizedPath,
                params: match.params,
                sceneName: match.sceneName,
            };
            this.sceneManager.setActiveScene(match.sceneName, match.params);
        } else {
            console.warn(`[Router] No route matched for path: ${normalizedPath}`);
            // If no route matches and no scene is active, try to activate first available scene
            if (!this.sceneManager.hasActiveScene()) {
                const availableScenes = this.sceneManager.registry.getNames();
                if (availableScenes.length > 0) {
                    console.warn(`[Router] Activating first available scene: ${availableScenes[0]}`);
                    this.state = {
                        path: normalizedPath,
                        params: {},
                        sceneName: availableScenes[0],
                    };
                    this.sceneManager.setActiveScene(availableScenes[0], {});
                } else {
                    console.warn(`[Router] No scenes registered. Game may show blank screen.`);
                }
            }
            // Keep current state if scene is already active
        }
    }

    /**
     * Initialize router with current window path
     * Should be called after routes are registered but before game loop starts
     */
    init(): void {
        if (typeof window !== "undefined") {
            const initialPath = window.location.pathname;
            this.handlePathChange(initialPath);
        } else {
            // Non-browser environment, default to root
            this.handlePathChange("/");
        }
        
        // Ensure at least one scene is active after initialization
        // This prevents blank screen if no route matches
        if (!this.sceneManager.hasActiveScene()) {
            const availableScenes = this.sceneManager.registry.getNames();
            if (availableScenes.length > 0) {
                console.warn(`[Router] No route matched initial path, activating first scene: ${availableScenes[0]}`);
                this.state = {
                    path: this.state.path,
                    params: {},
                    sceneName: availableScenes[0],
                };
                this.sceneManager.setActiveScene(availableScenes[0], {});
            } else {
                console.warn(`[Router] No scenes registered. Make sure to call scene() before router.init().`);
            }
        }
    }

    /**
     * Get public API interface for VM
     * This is what gets exposed to lootiscript as `router`
     * Note: VM may not support getters properly, so we use both functions and properties
     */
    getInterface(): any {
        const self = this;
        const routerInterface: any = {
            push: (path: string) => this.push(path),
            replace: (path: string) => this.replace(path),
            back: () => this.back(),
            // Functions for reliable access (VM compatible)
            getPath: () => self.state.path,
            getParams: () => self.state.params,
            getSceneName: () => self.state.sceneName,
        };
        
        // Define properties that always return current state
        // This works better in VM than getters
        Object.defineProperty(routerInterface, 'path', {
            get: () => self.state.path,
            enumerable: true,
            configurable: true,
        });
        Object.defineProperty(routerInterface, 'params', {
            get: () => self.state.params,
            enumerable: true,
            configurable: true,
        });
        Object.defineProperty(routerInterface, 'sceneName', {
            get: () => self.state.sceneName,
            enumerable: true,
            configurable: true,
        });
        
        return routerInterface;
    }
}
