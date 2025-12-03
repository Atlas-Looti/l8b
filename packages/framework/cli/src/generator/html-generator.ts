/**
 * HTML generator for LootiScript projects
 *
 * Generates production and development HTML files with proper
 * script loading and runtime initialization.
 */

import type { Resources } from "@l8b/runtime";
import type { CompiledModule } from "../build";
import type { LootiConfig } from "../config";
import { INTERNAL_ENDPOINTS } from "../utils/constants";
import { BITCELL_FONT_BASE64 } from "../utils/bitcell-font";
import { generateFarcasterEmbedTag } from "./farcaster-embed";

/**
 * Generate variable name from module name (sanitized for JavaScript)
 */
function sanitizeVarName(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, "_");
}

/**
 * Generate CSS styles for the HTML page
 * Matches microstudio's approach with canvaswrapper for centering
 */
function generateStyles(canvasId: string): string {
	return `
      @font-face {
        font-family: "BitCell";
        src: url("data:font/truetype;charset=utf-8;base64,${BITCELL_FONT_BASE64}") format("truetype");
        font-display: swap;
      }
      :root {
        color-scheme: dark;
      }
      * {
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        overflow: hidden;
        font-family: Verdana;
      }
      .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      #canvaswrapper {
        text-align: center;
      }
      canvas {
        display: block;
        margin-left: auto;
        margin-right: auto;
        image-rendering: pixelated; /* Ensure crisp pixels */
      }
      #${canvasId} {
        image-rendering: pixelated; /* Ensure crisp pixels */
      }
    `;
}

/**
 * Generate the runtime initialization script
 */
function generateRuntimeScript(
	config: LootiConfig,
	resources: Resources,
	isProduction: boolean,
	sourceImports: string,
	sourceMap: string,
	compiledRoutinesMap: string,
): string {
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
      
      ${sourceImports}

      const canvas = document.getElementById('${canvasId}');
      if (!canvas) throw new Error('Canvas element with id "${canvasId}" not found');

      // Orientation and aspect ratio from config (matching microstudio approach)
      const orientation = ${JSON.stringify(config.orientation)};
      const aspect = ${JSON.stringify(config.aspect)};

      // Helper to get device pixel ratio
      const getRatio = () => {
        const ctx = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = ctx?.webkitBackingStorePixelRatio ||
          ctx?.mozBackingStorePixelRatio ||
          ctx?.msBackingStorePixelRatio ||
          ctx?.oBackingStorePixelRatio ||
          ctx?.backingStorePixelRatio || 1;
        return devicePixelRatio / backingStoreRatio;
      };

      // Calculate canvas dimensions based on orientation and aspect ratio (matching microstudio logic)
      const calculateCanvasSize = () => {
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        
        // Handle free aspect - use full window
        if (aspect === 'free') {
          return { width: cw, height: ch };
        }

        // Convert aspect ratio string to number
        const aspectRatioMap = {
          '4x3': 4 / 3,
          '16x9': 16 / 9,
          '2x1': 2 / 1,
          '1x1': 1 / 1,
          '>4x3': 4 / 3,
          '>16x9': 16 / 9,
          '>2x1': 2 / 1,
          '>1x1': 1 / 1,
        };
        
        let ratio = aspectRatioMap[aspect] || 16 / 9;
        const isMinAspect = aspect.startsWith('>');
        
        // Handle minimum aspect ratio
        if (isMinAspect) {
          switch (orientation) {
            case 'portrait':
              ratio = Math.max(ratio, ch / cw);
              break;
            case 'landscape':
              ratio = Math.max(ratio, cw / ch);
              break;
            default:
              if (ch > cw) {
                ratio = Math.max(ratio, ch / cw);
              } else {
                ratio = Math.max(ratio, cw / ch);
              }
          }
        }

        let w, h, r;

        // Calculate dimensions based on orientation
        switch (orientation) {
          case 'portrait':
            r = Math.min(cw, ch / ratio) / cw;
            w = cw * r;
            h = cw * r * ratio;
            break;
          case 'landscape':
            r = Math.min(cw / ratio, ch) / ch;
            w = ch * r * ratio;
            h = ch * r;
            break;
          default: // 'any'
            if (cw > ch) {
              // Landscape screen
              r = Math.min(cw / ratio, ch) / ch;
              w = ch * r * ratio;
              h = ch * r;
            } else {
              // Portrait screen
              r = Math.min(cw, ch / ratio) / cw;
              w = cw * r;
              h = cw * r * ratio;
            }
        }

        return { width: Math.round(w), height: Math.round(h) };
      };

      // Helper to apply canvas sizing and centering
      const applyCanvasSize = (size) => {
        const ratio = getRatio();
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        
        // Set canvas internal size with devicePixelRatio
        canvas.width = size.width * ratio;
        canvas.height = size.height * ratio;
        
        // Set canvas display size
        canvas.style.width = size.width + 'px';
        canvas.style.height = size.height + 'px';
        
        // Center vertically with margin-top (matching microstudio)
        const marginTop = Math.round((ch - size.height) / 2);
        canvas.style.marginTop = marginTop + 'px';
        
        // Center horizontally - ensure margin-left and margin-right are auto
        canvas.style.marginLeft = 'auto';
        canvas.style.marginRight = 'auto';
      };

      // Initialize canvas size
      const initialSize = calculateCanvasSize();
      applyCanvasSize(initialSize);

      const resources = ${JSON.stringify(resourcesObj)};

      const shouldLogLifecycleBrowser = ${showBrowserLifecycleLogs};
      const shouldLogLifecycleTerminal = ${showTerminalLifecycleLogs};
      const shouldLogCanvasBrowser = ${showBrowserCanvasLogs};
      const shouldLogCanvasTerminal = ${showTerminalCanvasLogs};
      const mirrorListenerLogs = ${mirrorListenerLogs};
      const mirrorListenerErrors = ${mirrorListenerErrors};
      
      // Terminal logging helper
      const sendTerminalLog = ${
							terminalLoggingEnabled
								? `(entry) => {
        const payload = JSON.stringify({
          ...entry,
          timestamp: Date.now(),
        });

        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('${INTERNAL_ENDPOINTS.LOGGER}', blob);
        } else {
          fetch('${INTERNAL_ENDPOINTS.LOGGER}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      }`
								: "() => {}"
						};

      const logLifecycle = (message) => {
        if (!shouldLogLifecycleBrowser && !shouldLogLifecycleTerminal) return;
        if (shouldLogLifecycleBrowser) console.log(message);
        if (shouldLogLifecycleTerminal) {
          sendTerminalLog({ level: 'info', scope: 'runtime', message });
        }
      };

      const logCanvasSize = () => {
        if (!shouldLogCanvasBrowser && !shouldLogCanvasTerminal) return;
        const message = 'Canvas internal size: ' + canvas.width + 'x' + canvas.height + 
                       ', display size: ' + canvas.clientWidth + 'x' + canvas.clientHeight;
        if (shouldLogCanvasBrowser) console.log(message);
        if (shouldLogCanvasTerminal) {
          sendTerminalLog({ level: 'info', scope: 'runtime', message });
        }
      };

      // HTTP Logger for development (only in dev mode, not production)
      ${
							!isProduction
								? `
      if (typeof window !== 'undefined') {
        window.__l8b_http_logger = {
          logRequest: function(method, url, status, time, size, error) {
            const methodColor = method === 'GET' ? 'color: #4A9EFF' : 
                               method === 'POST' ? 'color: #4CAF50' :
                               method === 'PUT' ? 'color: #FFC107' :
                               method === 'DELETE' ? 'color: #F44336' : 'color: #9E9E9E';
            const statusColor = status >= 200 && status < 300 ? 'color: #4CAF50' :
                               status >= 400 ? 'color: #F44336' : 'color: #FFC107';
            let log = '%c[HTTP]%c ' + method.padEnd(6);
            if (status !== undefined) log += ' %c' + status;
            log += ' ' + url;
            if (time !== undefined) log += ' (' + time + 'ms)';
            if (size !== undefined) {
              const sizeStr = size < 1024 ? size + 'B' :
                             size < 1024 * 1024 ? (size / 1024).toFixed(1) + 'KB' :
                             (size / (1024 * 1024)).toFixed(1) + 'MB';
              log += ' ' + sizeStr;
            }
            if (error) log += ' - ' + error;
            console.log(log, 'color: #9E9E9E', methodColor, status !== undefined ? statusColor : '', '');
          }
        };
      }
      `
								: "// HTTP Logger disabled in production"
						}

      const runtimeOptions = {
        canvas: canvas,
        width: canvas.width,
        height: canvas.height,
        url: '${baseUrl}',
        resources: resources,
        listener: {
          log: (message) => {
            console.log('[GAME]', message);
            if (mirrorListenerLogs) {
              sendTerminalLog({ level: 'info', scope: 'game', message: String(message) });
            }
          },
          reportError: (error) => {
            // Helper to safely extract string from error field
            const getErrorString = (value) => {
              if (typeof value === 'string') return value;
              if (value === null || value === undefined) return '';
              if (typeof value === 'object') {
                // Check if it's a string-like object with numeric indices
                if (Array.isArray(value)) return value.join('');
                const keys = Object.keys(value);
                if (keys.length > 0) {
                  const numericKeys = keys.filter(k => /^\\d+$/.test(k));
                  if (numericKeys.length === keys.length) {
                    const sortedKeys = numericKeys.map(Number).sort((a, b) => a - b);
                    const isSequential = sortedKeys.every((val, idx) => val === idx);
                    if (isSequential) {
                      return sortedKeys.map(k => String(value[String(k)] || '')).join('');
                    }
                  }
                }
                // Try to get formatted or message property
                if (value.formatted && typeof value.formatted === 'string') return value.formatted;
                if (value.message && typeof value.message === 'string') return value.message;
                return String(value);
              }
              return String(value);
            };
            
            let errorMessage = '';
            if (error.code) errorMessage += '[' + error.code + '] ';
            
            // Safely extract error message
            const errorText = getErrorString(error?.error) || 
                             getErrorString(error?.message) || 
                             getErrorString(error?.formatted) || 
                             'Runtime error';
            errorMessage += errorText;
            
            if (error.file) {
              errorMessage += '\\n  at ' + error.file;
              if (error.line !== undefined) {
                errorMessage += ':' + error.line;
                if (error.column !== undefined) errorMessage += ':' + error.column;
              }
            }
            
            // Add context if available
            if (error.context) {
              const contextStr = getErrorString(error.context);
              if (contextStr) {
                errorMessage += '\\n\\n' + contextStr;
              }
            }
            
            // Add suggestions if available
            if (error.suggestions && Array.isArray(error.suggestions) && error.suggestions.length > 0) {
              errorMessage += '\\n\\nSuggestions:';
              for (let i = 0; i < error.suggestions.length; i++) {
                const suggestion = getErrorString(error.suggestions[i]);
                if (suggestion) {
                  errorMessage += '\\n  • ' + suggestion;
                }
              }
            }
            
            console.error('[GAME ERROR]', errorMessage);
            
            if (mirrorListenerErrors) {
              sendTerminalLog({
                level: 'error',
                scope: 'game',
                message: errorMessage,
                details: error,
              });
            }
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
        ${compiledRoutinesMap}
      };
      `
								: `
      // Development: Use source files
      runtimeOptions.sources = {
        ${sourceMap}
      };
      `
						}

      const runtime = new Runtime(runtimeOptions);

      // Handle window resize (matching microstudio approach)
      let resizeTimeout = null;
      const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newSize = calculateCanvasSize();
          applyCanvasSize(newSize);
          
          if (runtime.screen) {
            runtime.screen.resize(canvas.width, canvas.height);
          }
        }, 100);
      };

      // Start the game
      logLifecycle('Starting L8B Runtime...');
      try {
        await runtime.start();
        logLifecycle('Runtime started successfully!');
        logLifecycle('Game is running...');
        logCanvasSize();
      } catch (err) {
        console.error(err);
      }

      window.runtime = runtime;
      logLifecycle('Runtime available as window.runtime');
      window.addEventListener('resize', handleResize);
    `;
}

/**
 * Generate HTML file for LootiScript project
 *
 * @param config - LootiScript configuration
 * @param sources - Map of module names to source file paths (for development)
 * @param resources - Detected resources (images, maps, sounds, music)
 * @param compiledModules - Pre-compiled modules (for production)
 * @param routePath - Current route path for generating per-route embeds (default: "/")
 * @returns Complete HTML string
 */
export function generateHTML(
	config: LootiConfig,
	sources: Record<string, string>,
	resources: Resources,
	compiledModules?: CompiledModule[],
	routePath: string = "/",
): string {
	const canvasId = config.canvas?.id || "game";

	// Determine if we're using pre-compiled routines (production) or sources (development)
	const isProduction = compiledModules && compiledModules.length > 0;

	let sourceImports = "";
	let sourceMap = "";
	let compiledRoutinesMap = "";

	if (isProduction && compiledModules) {
		// Production: Use pre-compiled routines
		const compiledImports = compiledModules
			.map((module) => {
				const varName = sanitizeVarName(module.name);
				// Escape module.name for safe use in import path
				const safeModuleName = module.name.replace(/[^a-zA-Z0-9._-]/g, "_");
				return `import ${varName} from '/compiled/${safeModuleName}.js';`;
			})
			.join("\n      ");

		sourceImports = compiledImports;

		compiledRoutinesMap = compiledModules
			.map((module) => {
				const varName = sanitizeVarName(module.name);
				// Escape module.name for safe use in object key
				const safeModuleName = JSON.stringify(module.name);
				return `${safeModuleName}: new Routine(0).import(${varName}.routine)`;
			})
			.join(",\n          ");
	} else {
		// Development: Use source files
		const sourceEntries = Object.entries(sources);
		sourceImports = sourceEntries
			.map(([name, filePath]) => {
				const varName = sanitizeVarName(name);
				return `import ${varName} from '${filePath}?raw';`;
			})
			.join("\n      ");

		sourceMap = sourceEntries
			.map(([name]) => {
				const varName = sanitizeVarName(name);
				// Escape name for safe use in object key
				const safeName = JSON.stringify(name);
				return `${safeName}: ${varName}`;
			})
			.join(",\n          ");
	}

	// Escape config.name for HTML to prevent XSS
	const escapedName = config.name
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");

	const styles = generateStyles(canvasId);
	const script = generateRuntimeScript(
		config,
		resources,
		isProduction ?? false,
		sourceImports,
		sourceMap,
		compiledRoutinesMap,
	);

	// Generate Farcaster embed meta tag for this route
	const embedTag = generateFarcasterEmbedTag(config, routePath);

	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>${escapedName}</title>
${embedTag ? embedTag + "\n" : ""}    <style>${styles}</style>
  </head>
  <body class="noselect" oncontextmenu="return false;">
    <div id="canvaswrapper">
      <canvas id="${canvasId}"></canvas>
    </div>
    <script type="module">${script}</script>
  </body>
</html>`;
}
