/**
 * Runtime Script Generator
 *
 * Generates the runtime initialization script
 */

import type { LootiConfig, Resources as ResourcesEntity } from "../../../../core/types";
import { generateCanvasHelpers } from "./canvas-helpers";
import { generateHTTPLogger } from "./http-logger";
import { generateLoggingHelpers } from "./logging-helpers";
import type { ModuleImports } from "./module-imports-generator";
import { generateResizeHandler } from "./resize-handler";
import { generateRuntimeSettings } from "./runtime-settings";

export interface RuntimeScriptOptions {
	config: LootiConfig;
	resources: ResourcesEntity;
	isProduction: boolean;
	moduleImports: ModuleImports;
	env?: Record<string, string>;
}

export function generateRuntimeScript(options: RuntimeScriptOptions): string {
	const { config, resources, isProduction, moduleImports, env } = options;
	const canvasId = config.canvas?.id || "game";
	const baseUrl = config.url || "/";

	// Logging configuration
	const logging = config.logging || {};
	const browserLogging = logging.browser || {};
	const terminalLogging = logging.terminal || {};
	const showBrowserLifecycleLogs = browserLogging.lifecycle ?? false;
	const showBrowserCanvasLogs = browserLogging.canvas ?? false;
	const showTerminalLifecycleLogs = terminalLogging.lifecycle ?? false;
	const showTerminalCanvasLogs = terminalLogging.canvas ?? false;
	const mirrorListenerLogs = terminalLogging.listener ?? false;
	const mirrorListenerErrors = terminalLogging.errors ?? false;
	const terminalLoggingEnabled = [
		showTerminalLifecycleLogs,
		showTerminalCanvasLogs,
		mirrorListenerLogs,
		mirrorListenerErrors,
	].some(Boolean);

	// Prepare resources object
	const resourcesObj = {
		images: resources.images ?? [],
		maps: resources.maps ?? [],
		sounds: resources.sounds ?? [],
		music: resources.music ?? [],
		assets: resources.assets ?? [],
	};

	return `
      // Farcaster Mini App SDK is automatically available in all L8B games
      // It's bundled with the runtime through @l8b/player, @l8b/wallet, and @l8b/evm
      // Services use sdk.isInMiniApp() for accurate detection and gracefully handle non-Mini App environments
      
      ${
							isProduction
								? `// Production: Use bundled runtime
import { Runtime, Routine } from '/runtime.js';`
								: `// Development: Use Vite-resolved modules
import { Runtime } from '@l8b/runtime';`
						}
      
      ${moduleImports.sourceImports}

      const canvas = document.getElementById('${canvasId}');
      if (!canvas) throw new Error('Canvas element with id "${canvasId}" not found');

      // Orientation and aspect ratio from config
      const orientation = ${JSON.stringify(config.orientation)};
      const aspect = ${JSON.stringify(config.aspect)};

      ${generateCanvasHelpers()}

      // Initialize canvas size
      const initialSize = calculateCanvasSize();
      applyCanvasSize(initialSize);

	const resources = ${JSON.stringify(resourcesObj)};

      ${generateLoggingHelpers({
							terminalLoggingEnabled,
							showBrowserLifecycleLogs,
							showTerminalLifecycleLogs,
							showBrowserCanvasLogs,
							showTerminalCanvasLogs,
						})}

      ${generateHTTPLogger(isProduction)}

      ${generateRuntimeSettings({
							baseUrl,
							isProduction,
							moduleImports,
							mirrorListenerLogs,
							mirrorListenerErrors,
							env: env || undefined,
						})}

      const runtime = new Runtime(runtimeOptions);

      ${generateResizeHandler()}

      // Start the game
      ${showBrowserLifecycleLogs || showTerminalLifecycleLogs ? "logLifecycle('Starting L8B Runtime...');" : ""}
      try {
        await runtime.start();
        ${showBrowserLifecycleLogs || showTerminalLifecycleLogs ? "logLifecycle('Runtime started successfully!');" : ""}
        ${showBrowserCanvasLogs || showTerminalCanvasLogs ? "logCanvasSize();" : ""}
      } catch (err) {
        console.error(err);
      }

      window.runtime = runtime;
      ${showBrowserLifecycleLogs || showTerminalLifecycleLogs ? "logLifecycle('Runtime available as window.runtime');" : ""}
      window.addEventListener('resize', handleResize);
      
      // Focus body for keyboard input
      document.body.focus();
    `;
}
