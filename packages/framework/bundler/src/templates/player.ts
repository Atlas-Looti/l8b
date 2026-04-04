/**
 * L8B Player - Main game controller
 */
export const PLAYER_TEMPLATE = `
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

		// Check for external sources bundle (production build with lazy loading)
		if (window.__L8B_EXTERNAL_SOURCES__) {
			fetch('sources.json')
				.then(res => res.json())
				.then(data => {
					this.sources = data;
					this.start();
				})
				.catch(err => {
					console.error('[L8B] Failed to load sources.json:', err);
					this.reportError({ error: 'Failed to load game sources', type: 'init' });
				});
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
		
		try {
			if (typeof window.createRuntime === 'undefined') {
				throw new Error('createRuntime is not defined. Make sure @al8b/runtime is properly bundled.');
			}
			this.runtime = window.createRuntime(runtimeConfig);
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
	 * Handle window resize with aspect ratio and orientation support
	 */
	resize() {
		if (!this.runtime || !this.runtime.screen) return;
		
		const cw = window.innerWidth;
		const ch = window.innerHeight;
		let w, h;
		
		// Get config from global scope (defined in HTML template)
		const configAspect = window.aspect || 'free';
		const configOrientation = window.orientation || 'any';
		
		// Normalize aspect (support both 16x9 and 16:9 formats)
		const normalizedAspect = configAspect.replace(/:/g, 'x');
		
		// Aspect ratio mappings
		const aspectRatios = {
			'4x3': 4/3,
			'16x9': 16/9,
			'2x1': 2/1,
			'1x1': 1/1,
			'>4x3': 4/3,
			'>16x9': 16/9,
			'>2x1': 2/1,
			'>1x1': 1/1
		};
		
		let ratio = aspectRatios[normalizedAspect];
		const min = normalizedAspect && normalizedAspect.startsWith('>');
		
		if (ratio != null) {
			// Calculate with aspect ratio constraint
			if (min) {
				switch (configOrientation) {
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
			
			let r;
			switch (configOrientation) {
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
				default:
					if (cw > ch) {
						r = Math.min(cw / ratio, ch) / ch;
						w = ch * r * ratio;
						h = ch * r;
					} else {
						r = Math.min(cw, ch / ratio) / cw;
						w = cw * r;
						h = cw * r * ratio;
					}
			}
		} else {
			// Free aspect - use full window
			w = cw;
			h = ch;
		}
		
		// Apply styles to canvas
		const canvas = this.runtime.screen.canvas;
		canvas.style.marginTop = Math.round((ch - h) / 2) + 'px';
		canvas.style.width = Math.round(w) + 'px';
		canvas.style.height = Math.round(h) + 'px';
		
		// Calculate actual canvas resolution with device pixel ratio
		const dpr = window.devicePixelRatio || 1;
		const canvasW = Math.round(w * dpr);
		const canvasH = Math.round(h * dpr);
		
		// Resize internal canvas
		this.runtime.screen.resize(canvasW, canvasH);
		
		// Redraw if paused
		if (this.runtime.vm && this.runtime.stopped) {
			this.runtime.drawCall();
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
