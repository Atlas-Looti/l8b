/**
 * Type definitions for Scene Management System
 */

// ============================================================================
// Route Types
// ============================================================================

/**
 * Route definition for matching paths to scenes
 */
export interface RouteDefinition {
	/** Path pattern (e.g., "/player/:id") */
	path: string;
	/** Name of the scene to map to */
	sceneName: string;
	/** Compiled regex for matching */
	regex: RegExp;
	/** Parameter keys extracted from path */
	keys: string[];
}

// ============================================================================
// Scene Types
// ============================================================================

/**
 * Scene definition with lifecycle methods
 */
export interface SceneDefinition {
	/** Initialize scene (called once when scene is first registered) */
	init?: () => void;
	/** Called when scene becomes active */
	onEnter?: (params?: Record<string, string>) => void;
	/** Called when scene is deactivated */
	onLeave?: () => void;
	/** Update loop (called every frame) */
	update?: () => void;
	/** Draw loop (called every frame) */
	draw?: () => void;
	/** Internal flag to track initialization */
	_initialized?: boolean;
}

/**
 * Scene status enumeration
 */
export type SceneStatus = "idle" | "active" | "transitioning";

/**
 * Scene data container
 */
export interface SceneData {
	/** Scene name */
	name: string;
	/** Scene definition */
	definition: SceneDefinition;
	/** Route parameters */
	params?: Record<string, string>;
}

// ============================================================================
// Router Types
// ============================================================================

/**
 * Router state
 */
export interface RouterState {
	/** Current path */
	path: string;
	/** Route parameters */
	params: Record<string, string>;
	/** Current scene name */
	sceneName: string | null;
}

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Scene manager options
 */
export interface SceneManagerOptions {
	/** Initial scene name */
	initialScene?: string;
	/** Enable debug logging */
	debug?: boolean;
}

/**
 * Scene transition options
 */
export interface SceneTransitionOptions {
	/** Transition duration in milliseconds */
	duration?: number;
	/** Transition type */
	type?: "fade" | "slide" | "none";
}

/**
 * Scene configuration
 */
export interface SceneConfig {
	/** Default scene name */
	defaultScene?: string;
	/** Enable history management */
	enableHistory?: boolean;
	/** Scene transition options */
	transition?: SceneTransitionOptions;
}

// ============================================================================
// Event Types
// ============================================================================

/**
 * Scene events
 */
export interface SceneEvents {
	/** Event emitted when scene is activated */
	onActivate?: (name: string, params?: Record<string, string>) => void;
	/** Event emitted when scene is deactivated */
	onDeactivate?: (name: string) => void;
}

// ============================================================================
// VM Interface Types
// ============================================================================

/**
 * Scene interface for VM (Virtual Machine)
 * This is what gets exposed to lootiscript as `scene`
 */
export interface SceneInterface {
	register: (name: string, def: SceneDefinition) => void;
	route: (path: string, sceneName: string) => void;
	goto: (name: string, params?: Record<string, string>) => void;
	current: () => string | null;
}
