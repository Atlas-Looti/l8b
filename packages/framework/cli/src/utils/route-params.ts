/**
 * Route parameter extraction utilities
 *
 * Extracts parameters from route paths and URLs
 * for dynamic OG image generation
 */

/**
 * Extract route parameters from a path pattern and actual path
 *
 * @param pattern - Route pattern (e.g., "/level/:id")
 * @param path - Actual path (e.g., "/level/5")
 * @returns Object with parameter values or null if pattern doesn't match
 *
 * @example
 * extractParams("/level/:id", "/level/5") // { id: "5" }
 * extractParams("/player/:playerId/inventory", "/player/123/inventory") // { playerId: "123" }
 */
export function extractRouteParams(pattern: string, path: string): Record<string, string> | null {
    // Remove leading slash from pattern
    const cleanPattern = pattern.startsWith("/") ? pattern.slice(1) : pattern;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    const patternSegments = cleanPattern.split("/");
    const pathSegments = cleanPath.split("/").filter(Boolean);

    if (patternSegments.length !== pathSegments.length) {
        return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < patternSegments.length; i++) {
        const patternSeg = patternSegments[i];
        const pathSeg = pathSegments[i];

        if (patternSeg.startsWith(":")) {
            // This is a parameter
            const paramName = patternSeg.slice(1);
            params[paramName] = pathSeg;
        } else if (patternSeg !== pathSeg) {
            // Static segment doesn't match
            return null;
        }
    }

    return params;
}

/**
 * Find matching route pattern from a set of patterns
 *
 * @param patterns - Array of route patterns
 * @param path - Actual path to match
 * @returns Matching pattern and extracted parameters, or null
 *
 * @example
 * findMatchingRoute(["/", "/level/:id", "/player/:id/inventory"], "/level/5")
 * // { pattern: "/level/:id", params: { id: "5" } }
 */
export function findMatchingRoute(patterns: string[], path: string): { pattern: string; params: Record<string, string> } | null {
    for (const pattern of patterns) {
        const params = extractRouteParams(pattern, path);
        if (params !== null) {
            return { pattern, params };
        }
    }
    return null;
}
