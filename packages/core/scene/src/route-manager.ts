import { PARAM_PATTERN, PARAM_REPLACEMENT } from "./constants";
import type { RouteDefinition } from "./types";
import { isValidString } from "./utils";

export class RouteManager {
    private routes: RouteDefinition[] = [];

    /**
     * Register a route
     * @param path Path pattern (e.g. "/player/:id")
     * @param sceneName Name of the scene to map to
     */
    register(path: string, sceneName: string): void {
        if (!this.validateRouteInputs(path, sceneName)) {
            return;
        }

        const { regex, keys } = this.parsePath(path);
        this.routes.push({
            path,
            sceneName,
            regex,
            keys,
        });
    }

    /**
     * Validate route registration inputs
     */
    private validateRouteInputs(path: unknown, sceneName: unknown): path is string {
        if (!isValidString(path)) {
            return false;
        }

        if (!isValidString(sceneName)) {
            return false;
        }

        return true;
    }

    /**
     * Match a path to a route
     * @param path Path to match against registered routes
     * @returns Route match with scene name and params, or null if no match
     */
    match(path: string): { sceneName: string; params: Record<string, string> } | null {
        if (!isValidString(path)) {
            return null;
        }

        for (const route of this.routes) {
            const match = this.tryMatchRoute(route, path);
            if (match) {
                return match;
            }
        }

        return null;
    }

    /**
     * Try to match a single route against a path
     */
    private tryMatchRoute(route: RouteDefinition, path: string): { sceneName: string; params: Record<string, string> } | null {
        const regexMatch = route.regex.exec(path);
        if (!regexMatch) {
            return null;
        }

        const params = this.extractParams(route.keys, regexMatch);
        return {
            sceneName: route.sceneName,
            params,
        };
    }

    /**
     * Extract route parameters from regex match
     */
    private extractParams(keys: string[], match: RegExpExecArray): Record<string, string> {
        const params: Record<string, string> = {};
        keys.forEach((key, index) => {
            params[key] = match[index + 1];
        });
        return params;
    }

    /**
     * Parse path pattern to regex
     * Converts route patterns like "/player/:id" to regex
     */
    private parsePath(path: string): { regex: RegExp; keys: string[] } {
        const keys: string[] = [];
        const pattern = path
            .replace(PARAM_PATTERN, (_, key) => {
                keys.push(key);
                return PARAM_REPLACEMENT;
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
