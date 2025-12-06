/**
 * HMR Client script generator
 * HMR Client script generator
 */

/**
 * Generate HMR client script
 */
export function generateHMRClient(port: number): string {
	// port is passed but we use window.__L8B_HMR_PORT__ from HTML template
	void port;

	return `
// L8B HMR Client
(function() {
	'use strict';
	
	const L8BClient = {
		socket: null,
		reconnectDelay: 1000,
		maxReconnectDelay: 10000,
		connected: false,
		
		init: function() {
			this.connect();
			this.setupErrorOverlay();
		},
		
		connect: function() {
			const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
			const hmrPort = window.__L8B_HMR_PORT__ || location.port;
			const wsUrl = protocol + '//' + location.hostname + ':' + hmrPort + '/__l8b_hmr__';
			
			try {
				this.socket = new WebSocket(wsUrl);
				
				this.socket.onopen = () => {
					console.log('[L8B] Connected to dev server');
					this.connected = true;
					this.reconnectDelay = 1000;
					this.hideError();
				};
				
				this.socket.onmessage = (event) => {
					try {
						const msg = JSON.parse(event.data);
						this.handleMessage(msg);
					} catch (err) {
						console.error('[L8B] Failed to parse message:', err);
					}
				};
				
				this.socket.onclose = () => {
					console.log('[L8B] Disconnected from dev server');
					this.connected = false;
					this.scheduleReconnect();
				};
				
				this.socket.onerror = (err) => {
					console.error('[L8B] WebSocket error:', err);
				};
			} catch (err) {
				console.error('[L8B] Failed to connect:', err);
				this.scheduleReconnect();
			}
		},
		
		scheduleReconnect: function() {
			setTimeout(() => {
				this.connect();
			}, this.reconnectDelay);
			
			this.reconnectDelay = Math.min(
				this.reconnectDelay * 1.5,
				this.maxReconnectDelay
			);
		},
		
		handleMessage: function(msg) {
			console.log('[L8B] Message:', msg.type);
			
			switch (msg.type) {
				case 'connected':
					console.log('[L8B] Server acknowledged connection');
					break;
					
				case 'source_updated':
					this.handleSourceUpdate(msg);
					break;
					
				case 'sprite_updated':
					this.handleSpriteUpdate(msg);
					break;
					
				case 'map_updated':
					this.handleMapUpdate(msg);
					break;
					
				case 'config_updated':
					this.handleConfigUpdate(msg);
					break;
					
				case 'full_reload':
					console.log('[L8B] Full reload requested');
					location.reload();
					break;
					
				case 'error':
					this.showError(msg.error);
					break;
					
				default:
					console.log('[L8B] Unknown message type:', msg.type);
			}
		},
		
		handleSourceUpdate: function(msg) {
			console.log('[L8B] Source updated:', msg.name);
			
			if (window.player && window.player.runtime) {
				const runtime = window.player.runtime;
				
				if (runtime.vm) {
					runtime.vm.clearWarnings();
				}
				
				runtime.updateSource(msg.name, msg.data, true);
				this.hideError();
			}
		},
		
		handleSpriteUpdate: function(msg) {
			console.log('[L8B] Sprite updated:', msg.name);
			
			if (window.player && window.player.runtime) {
				window.player.runtime.updateSprite(
					msg.name,
					msg.version,
					msg.data,
					msg.properties
				);
			}
		},
		
		handleMapUpdate: function(msg) {
			console.log('[L8B] Map updated:', msg.name);
			
			if (window.player && window.player.runtime) {
				window.player.runtime.updateMap(
					msg.name,
					msg.version,
					msg.data
				);
			}
		},
		
		handleConfigUpdate: function(msg) {
			console.log('[L8B] Config updated, reloading...');
			location.reload();
		},
		
		setupErrorOverlay: function() {
			// Error overlay already in HTML template
		},
		
		showError: function(error) {
			const overlay = document.getElementById('error-overlay');
			const content = document.getElementById('error-content');
			const fileInfo = document.getElementById('error-file');
			
			if (overlay && content) {
				// Parse error message if it contains file info
				let message = error;
				let file = '';
				
				// Simple heuristic to extract file info if present in "file:line: message" format
				const match = error.match(/^([^:]+):(\d+):\s*(.+)$/);
				if (match) {
					file = match[1] + ':' + match[2];
					message = match[3];
				}
				
				content.textContent = message;
				
				if (fileInfo) {
					fileInfo.textContent = file ? 'File: ' + file : '';
					fileInfo.style.display = file ? 'block' : 'none';
				}
				
				overlay.classList.add('visible');
			}
			
			console.error('[L8B] Error:', error);
		},
		
		hideError: function() {
			const overlay = document.getElementById('error-overlay');
			if (overlay) {
				overlay.classList.remove('visible');
			}
		},
		
		send: function(data) {
			if (this.socket && this.socket.readyState === WebSocket.OPEN) {
				this.socket.send(JSON.stringify(data));
			}
		}
	};
	
	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => L8BClient.init());
	} else {
		L8BClient.init();
	}
	
	// Expose globally for debugging
	window.L8BClient = L8BClient;
})();
`;
}

/**
 * Generate runtime loader script
 */
export function generateRuntimeLoader(): string {
	return `
// L8B Runtime Loader
(function() {
	'use strict';
	
	// Hide loading indicator
	function hideLoading() {
		const loading = document.getElementById('loading');
		if (loading) {
			loading.style.display = 'none';
		}
	}
	
	// Initialize the game
	function initGame() {
		hideLoading();
		
		// Check if runtime is available
		if (typeof Runtime === 'undefined') {
			console.error('[L8B] Runtime not loaded');
			return;
		}
		
		// Create player instance
		const listener = {
			log: function(text) {
				console.log('[Game]', text);
			},
			reportError: function(err) {
				console.error('[Game Error]', err);
				if (window.L8BClient) {
					window.L8BClient.showError(
						err.message || err.error || JSON.stringify(err)
					);
				}
			},
			postMessage: function(data) {
				// Handle messages from runtime
				if (data.name === 'started') {
					console.log('[L8B] Game started');
				}
			},
			codePaused: function() {
				console.log('[L8B] Code paused');
			},
			exit: function() {
				console.log('[L8B] Game exited');
			}
		};
		
		window.player = new Player(listener);
	}
	
	// Wait for runtime to load
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initGame);
	} else {
		// Small delay to ensure all scripts are loaded
		setTimeout(initGame, 100);
	}
})();
`;
}
