import type { RouteDefinition } from "./types";

export class RouteManager {
	private routes: RouteDefinition[] = [];

	/**
	 * Register a route
	 * @param path Path pattern (e.g. "/player/:id")
	 * @param sceneName Name of the scene to map to
	 */
	register(path: string, sceneName: string): void {
		const { regex, keys } = this.parsePath(path);
		this.routes.push({
			path,
			sceneName,
			regex,
			keys,
		});
	}

	/**
	 * Match a path to a route
	 */
	match(
		path: string,
	): { sceneName: string; params: Record<string, string> } | null {
		for (const route of this.routes) {
			const match = route.regex.exec(path);
			if (match) {
				const params: Record<string, string> = {};
				route.keys.forEach((key, index) => {
					params[key] = match[index + 1];
				});
				return { sceneName: route.sceneName, params };
			}
		}
		return null;
	}

	/**
	 * Parse path pattern to regex
	 */
	private parsePath(path: string): { regex: RegExp; keys: string[] } {
		const keys: string[] = [];
		const pattern = path
			.replace(/:(\w+)/g, (_, key) => {
				keys.push(key);
				return "([^/]+)";
			})
			.replace(/\//g, "\\/");

		return {
			regex: new RegExp(`^${pattern}$`),
			keys,
		};
	}

	/**
	 * Clear all routes
	 */
	clear(): void {
		this.routes = [];
	}
}
