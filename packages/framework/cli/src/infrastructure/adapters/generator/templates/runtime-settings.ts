/**
 * Runtime Settings Generator
 *
 * Generates runtimeOptions/runtimeSettings configuration object
 */

import type { ModuleImports } from "./module-imports-generator";
import { generateErrorHandler } from "./error-handler";

export interface RuntimeSettingsOptions {
	baseUrl: string;
	isProduction: boolean;
	moduleImports: ModuleImports;
	mirrorListenerLogs: boolean;
	mirrorListenerErrors: boolean;
	env?: Record<string, string>;
}

export function generateRuntimeSettings(options: RuntimeSettingsOptions): string {
	const { baseUrl, isProduction, moduleImports, mirrorListenerLogs, mirrorListenerErrors, env } = options;

	// Use variables explicitly to avoid TypeScript warnings (they're used in template string)
	const mirrorLogsCode = mirrorListenerLogs
		? "sendTerminalLog({ level: 'info', scope: 'game', message: String(message) });"
		: "";

	return `
      const runtimeOptions = {
        canvas: canvas,
        width: canvas.width,
        height: canvas.height,
        url: '${baseUrl}',
        resources: resources,
        listener: {
          log: (message) => {
            console.log('[GAME]', message);
            ${mirrorLogsCode}
          },
          reportError: (error) => {
            ${generateErrorHandler(mirrorListenerErrors)}
          },
          postMessage: (msg) => {
            ${isProduction ? "// Compilation messages are handled during build" : "console.log('[GAME MESSAGE]', msg);"}
          },
        },
      };

      ${
							isProduction
								? `
      // Production: Use pre-compiled routines
      runtimeOptions.compiledRoutines = {
        ${moduleImports.compiledRoutinesMap}
      };
      `
								: `
      // Development: Use source files
      runtimeOptions.sources = {
        ${moduleImports.sourceMap}
      };
      `
						}

      ${
							env && Object.keys(env).length > 0
								? `// Environment variables
      runtimeOptions.env = ${JSON.stringify(env)};`
								: ""
						}
    `;
}
