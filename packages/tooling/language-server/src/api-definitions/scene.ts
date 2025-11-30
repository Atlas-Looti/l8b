/**
 * Scene API definitions
 */

import type { GlobalApi } from "../types";

export const sceneApi: Partial<GlobalApi> = {
	scene: {
		type: "function",
		description: "Register a new scene",
		signature: "scene(name: string, definition: object)",
	},
	route: {
		type: "function",
		description: "Register a route to a scene",
		signature: "route(path: string, sceneName: string)",
	},
	router: {
		type: "object",
		description: "Router for navigation",
		properties: {
			push: {
				type: "method",
				description: "Navigate to a path (adds to history)",
				signature: "router.push(path: string)",
			},
			replace: {
				type: "method",
				description: "Replace current path (no history)",
				signature: "router.replace(path: string)",
			},
			back: {
				type: "method",
				description: "Go back in history",
				signature: "router.back()",
			},
			path: {
				type: "property",
				description: "Current path",
			},
			params: {
				type: "property",
				description: "Current route parameters",
			},
			sceneName: {
				type: "property",
				description: "Current scene name",
			},
			getPath: {
				type: "method",
				description: "Get current path",
				signature: "router.getPath()",
			},
			getParams: {
				type: "method",
				description: "Get current route parameters",
				signature: "router.getParams()",
			},
			getSceneName: {
				type: "method",
				description: "Get current scene name",
				signature: "router.getSceneName()",
			},
		},
	},
	scenes: {
		type: "object",
		description: "Scene manager",
		properties: {
			goto: {
				type: "method",
				description: "Directly switch to a scene",
				signature: "scenes.goto(name: string, params?: object)",
			},
			current: {
				type: "method",
				description: "Get current scene name",
				signature: "scenes.current()",
			},
		},
	},
};
