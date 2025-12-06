/**
 * Runtime Plugin - Bundles the L8B runtime for production
 *
 * This plugin is responsible for:
 * 1. Bundling the @l8b/runtime package with proper optimization
 * 2. Creating the Player class (like microstudio's player.coffee)
 * 3. Embedding compiled routines
 */

import type { L8BPlugin } from "./index";
import { createLogger } from "@l8b/framework-shared";

const logger = createLogger("runtime-plugin");

/**
 * Cached production runtime bundle
 */
let cachedProdBundle: { code: string; minified: boolean } | null = null;

/**
 * Runtime plugin options
 */
export interface RuntimePluginOptions {
	/** Minify the runtime bundle */
	minify?: boolean;
	/** Include source maps */
	sourcemap?: boolean;
}

/** Build timeout in milliseconds (60 seconds) */
const BUILD_TIMEOUT_MS = 60_000;

/**
 * Build optimized runtime bundle for production with timeout protection
 */
async function buildProductionRuntime(minify: boolean, sourcemap: boolean): Promise<string> {
	// Check cache
	if (cachedProdBundle && cachedProdBundle.minified === minify) {
		logger.debug("Using cached production runtime bundle");
		return cachedProdBundle.code;
	}

	logger.info("Building production runtime bundle...");
	const startTime = Date.now();

	try {
		const esbuild = await import("esbuild");

		// Create build promise with timeout protection
		const buildPromise = esbuild.build({
			entryPoints: [require.resolve("@l8b/runtime")],
			bundle: true,
			platform: "browser",
			format: "iife",
			globalName: "L8BRuntime",
			write: false,
			minify,
			treeShaking: true,
			sourcemap: sourcemap ? "inline" : false,
			define: {
				"process.env.NODE_ENV": '"production"',
			},
			legalComments: "none",
			logLevel: "warning",
		});

		// Race against timeout
		const timeoutPromise = new Promise<never>((_, reject) => {
			setTimeout(() => {
				reject(new Error(`Build timed out after ${BUILD_TIMEOUT_MS / 1000}s`));
			}, BUILD_TIMEOUT_MS);
		});

		const result = await Promise.race([buildPromise, timeoutPromise]);

		const code = result.outputFiles[0].text;
		const elapsed = Date.now() - startTime;
		const sizeKB = (code.length / 1024).toFixed(1);

		logger.success(`Production runtime built in ${elapsed}ms (${sizeKB} KB${minify ? " minified" : ""})`);

		// Cache the result
		cachedProdBundle = { code, minified: minify };
		return code;
	} catch (err) {
		logger.error("Failed to build production runtime:", err);
		throw err;
	}
}

/**
 * Generate the Player class (inspired by microstudio's player.coffee)
 * 
 * TODO: [Code Quality] Refactor 371-line function into smaller methods
 * Consider moving to template file for better maintainability
 * See: framework_audit_report.md #13
 */
function generatePlayerClass(): string {
	return `
/**
 * L8B Player - Main game controller
 * Based on microstudio's Player class
 */
class Player {
	constructor(listener) {
		this.listener = listener || {};
		this.sources = {};
		this.sourceCount = 0;
		this.resources = window.resources || {};
		this.requestId = 1;
		this.pendingRequests = {};
		this.runtime = null;
		
		// Load sources and start
		if (this.resources.sources && this.resources.sources.length > 0) {
			this.loadSources();
		} else {
			this.start();
		}
	}
	
	/**
	 * Load source files from embedded data or server
	 */
	loadSources() {
		const sources = this.resources.sources;
		
		// Check for embedded sources first (production build)
		if (window.__L8B_SOURCES__) {
			this.sources = window.__L8B_SOURCES__;
			this.start();
			return;
		}
		
		// Load from server (development mode)
		let loaded = 0;
		for (const source of sources) {
			const url = window.location.origin + window.location.pathname + 'loot/' + source.file + '?v=' + source.version;
			
			fetch(url)
				.then(res => res.text())
				.then(code => {
					const name = source.file.split('.')[0];
					this.sources[name] = code;
					loaded++;
					
					if (loaded >= sources.length && !this.runtime) {
						this.start();
					}
				})
				.catch(err => {
					console.error('[L8B] Failed to load source:', source.file, err);
					loaded++;
					
					if (loaded >= sources.length && !this.runtime) {
						this.start();
					}
				});
		}
	}
	
	/**
	 * Start the game runtime
	 */
	start() {
		// Hide loading indicator
		const loading = document.getElementById('loading');
		if (loading) {
			loading.style.display = 'none';
		}
		
		// Create canvas wrapper
		const wrapper = document.getElementById('canvaswrapper');
		if (!wrapper) {
			console.error('[L8B] Canvas wrapper not found');
			return;
		}
		
		// Determine base URL
		const baseUrl = window.exported_project ? '' : window.location.origin + window.location.pathname;
		
		// Create runtime configuration
		const runtimeConfig = {
			canvas: null, // Will be created by runtime
			width: window.innerWidth,
			height: window.innerHeight,
			url: baseUrl,
			sources: this.sources,
			resources: this.resources,
			compiledRoutines: window.__L8B_COMPILED_ROUTINES__ || {},
			listener: {
				log: (text) => this.log(text),
				reportError: (err) => this.reportError(err),
				postMessage: (msg) => this.postMessage(msg),
				codePaused: () => this.codePaused(),
				exit: () => this.exit()
			},
			namespace: '/l8b',
			preserveStorage: false,
			env: window.__L8B_ENV__ || {}
		};
		
		// Create runtime
		try {
			this.runtime = new Runtime(runtimeConfig);
			wrapper.appendChild(this.runtime.screen.canvas);
			
			// Handle window resize
			window.addEventListener('resize', () => this.resize());
			this.resize();
			
			// Setup touch handlers for fullscreen
			this.setupTouchHandlers();
			
			// Start game loop
			this.runtime.start();
			
			// Listen for messages from parent (if in iframe)
			window.addEventListener('message', (msg) => this.messageReceived(msg));
			
			// Notify ready
			this.postMessage({ name: 'focus' });
			
		} catch (err) {
			console.error('[L8B] Failed to create runtime:', err);
			this.reportError({ error: err.message, type: 'init' });
		}
	}
	
	/**
	 * Handle window resize
	 */
	resize() {
		if (this.runtime && this.runtime.screen) {
			this.runtime.screen.resize();
			
			// Redraw if paused
			if (this.runtime.vm && this.runtime.stopped) {
				this.runtime.drawCall();
			}
		}
	}
	
	/**
	 * Setup touch handlers for mobile fullscreen
	 */
	setupTouchHandlers() {
		if (!this.runtime || !this.runtime.screen) return;
		
		const canvas = this.runtime.screen.canvas;
		
		canvas.addEventListener('touchend', (event) => {
			if (this.runtime && this.runtime.vm && 
				this.runtime.vm.context.global.system.disable_autofullscreen) {
				return;
			}
			this.setFullScreen();
		});
	}
	
	/**
	 * Request fullscreen mode
	 */
	setFullScreen() {
		const elem = document.documentElement;
		
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullScreen) {
			elem.webkitRequestFullScreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		}
		
		// Lock orientation if supported
		if (window.screen && window.screen.orientation && window.orientation) {
			window.screen.orientation.lock(window.orientation).catch(() => {});
		}
	}
	
	/**
	 * Report error to listener
	 */
	reportError(err) {
		this.postMessage({
			name: 'error',
			data: err
		});
	}
	
	/**
	 * Log message
	 */
	log(text) {
		this.postMessage({
			name: 'log',
			data: text
		});
	}
	
	/**
	 * Code paused notification
	 */
	codePaused() {
		this.postMessage({ name: 'code_paused' });
	}
	
	/**
	 * Exit notification
	 */
	exit() {
		this.postMessage({ name: 'exit' });
	}
	
	/**
	 * Handle incoming messages
	 */
	messageReceived(msg) {
		try {
			const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
			
			switch (data.name) {
				case 'command':
					this.runtime.runCommand(data.line, (res) => {
						if (!data.line.trim().startsWith('print')) {
							this.postMessage({
								name: 'output',
								data: res,
								id: data.id
							});
						}
					});
					break;
					
				case 'pause':
					this.runtime.stop();
					break;
					
				case 'step_forward':
					this.runtime.stepForward();
					break;
					
				case 'resume':
					this.runtime.resume();
					break;
					
				case 'code_updated':
					if (this.runtime.vm) {
						this.runtime.vm.clearWarnings();
					}
					this.runtime.updateSource(
						data.file.split('.')[0],
						data.code,
						true
					);
					break;
					
				case 'sprite_updated':
					this.runtime.updateSprite(
						data.file,
						0,
						data.data,
						data.properties
					);
					break;
					
				case 'map_updated':
					this.runtime.updateMap(data.file, 0, data.data);
					break;
					
				case 'take_picture':
					this.runtime.screen.takePicture((pic) => {
						this.postMessage({
							name: 'picture_taken',
							data: pic
						});
					});
					if (this.runtime.stopped) {
						this.runtime.drawCall();
					}
					break;
					
				case 'time_machine':
					if (this.runtime.time_machine) {
						this.runtime.time_machine.messageReceived(data);
					}
					break;
					
				case 'watch':
					this.runtime.watch(data.list);
					break;
					
				case 'stop_watching':
					this.runtime.stopWatching();
					break;
					
				default:
					if (data.request_id && this.pendingRequests[data.request_id]) {
						this.pendingRequests[data.request_id](data);
						delete this.pendingRequests[data.request_id];
					}
			}
		} catch (err) {
			console.error('[L8B] Message handling error:', err);
		}
	}
	
	/**
	 * Call a function in the VM
	 */
	call(name, args) {
		if (this.runtime && this.runtime.vm) {
			return this.runtime.vm.call(name, args);
		}
	}
	
	/**
	 * Set a global variable in the VM
	 */
	setGlobal(name, value) {
		if (this.runtime && this.runtime.vm) {
			this.runtime.vm.context.global[name] = value;
		}
	}
	
	/**
	 * Execute a command
	 */
	exec(command, callback) {
		if (this.runtime) {
			this.runtime.runCommand(command, callback);
		}
	}
	
	/**
	 * Post message to parent window or listener
	 */
	postMessage(data) {
		if (window !== window.parent) {
			window.parent.postMessage(JSON.stringify(data), '*');
		}
		
		if (this.listener) {
			try {
				if (typeof this.listener === 'function') {
					this.listener(data);
				} else if (this.listener[data.name]) {
					this.listener[data.name](data.data);
				}
			} catch (err) {
				console.error('[L8B] Listener error:', err);
			}
		}
	}
	
	/**
	 * Post request with callback
	 */
	postRequest(data, callback) {
		data.request_id = this.requestId;
		this.pendingRequests[this.requestId++] = callback;
		this.postMessage(data);
	}
}

// Expose Player globally
window.Player = Player;
`;
}

/**
 * Generate initialization code
 */
function generateInitCode(): string {
	return `
// L8B Runtime Initialization
(function() {
	'use strict';
	
	// Wait for DOM ready
	function init() {
		// Create player instance
		const listener = {
			log: function(text) {
				console.log('[Game]', text);
			},
			error: function(err) {
				console.error('[Game Error]', err);
			}
		};
		
		window.player = new Player(listener);
	}
	
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
`;
}

/**
 * Clear the runtime cache (useful for watch mode)
 */
export function clearRuntimeCache(): void {
	cachedProdBundle = null;
}

/**
 * Create runtime plugin
 */
export function runtimePlugin(options: RuntimePluginOptions = {}): L8BPlugin {
	const { minify = false, sourcemap = false } = options;

	return {
		name: "l8b:runtime",

		// Clear cache at build start to prevent stale data in watch mode
		buildStart() {
			if (process.env.NODE_ENV !== "production") {
				clearRuntimeCache();
			}
		},

		async generateBundle(files, ctx) {
			logger.info("Generating runtime bundle...");

			try {
				// Generate Player class
				const playerClass = generatePlayerClass();
				const initCode = generateInitCode();

				// Build optimized runtime (uses caching)
				const runtimeCode = await buildProductionRuntime(minify, sourcemap);

				// Embed sources (like microstudio) - runtime compiles on the fly
				const sourcesCode = generateSourcesCode(ctx.resources.sources);

				// Combine all parts
				const bundle = [
					"// L8B Runtime Bundle",
					"// Generated at " + new Date().toISOString(),
					"",
					sourcesCode,
					"",
					runtimeCode,
					"",
					"// Extract Runtime from bundle",
					"if (window.L8BRuntime && window.L8BRuntime.RuntimeOrchestrator) {",
					"  window.Runtime = window.L8BRuntime.RuntimeOrchestrator;",
					"} else if (window.L8BRuntime && window.L8BRuntime.Runtime) {",
					"  window.Runtime = window.L8BRuntime.Runtime;",
					"}",
					"",
					playerClass,
					"",
					initCode,
				].join("\n");

				files.set("game.js", bundle);

				const sizeKB = (bundle.length / 1024).toFixed(1);
				logger.success(`Runtime bundle generated (${sizeKB} KB)`);
			} catch (err) {
				logger.error("Failed to generate runtime bundle:", err);
				ctx.errors.push(`Runtime bundle error: ${err}`);
			}
		},
	};
}

/**
 * Generate code to embed sources (like microstudio)
 * Sources are embedded and compiled at runtime
 */
function generateSourcesCode(sources: Array<{ name: string; content?: string }>): string {
	const embedded: Record<string, string> = {};

	for (const source of sources) {
		if (source.content) {
			embedded[source.name] = source.content;
		}
	}

	return `window.__L8B_SOURCES__ = ${JSON.stringify(embedded)};`;
}
