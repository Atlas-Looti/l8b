/**
 * L8B Player Script
 * Handles source loading, runtime initialization, and resize
 */

/**
 * Generate Player script for browser
 * Includes resize logic for orientation and aspect ratio
 */
export function generatePlayerScript(): string {
	return `
(function() {
	'use strict';
	
	// L8B Player
	function Player(listener) {
		this.listener = listener || function() {};
		this.sources = {};
		this.sourceCount = 0;
		this.resources = window.resources || {};
		this.runtime = null;
		
		// Load sources
		if (this.resources.sources && this.resources.sources.length > 0) {
			for (var i = 0; i < this.resources.sources.length; i++) {
				this.loadSource(this.resources.sources[i]);
			}
		} else {
			this.start();
		}
	}
	
	Player.prototype.loadSource = function(source) {
		var self = this;
		var url = '/loot/' + source.file + '?v=' + source.version;
		
		fetch(url)
			.then(function(response) {
				if (!response.ok) throw new Error('Network response was not ok');
				return response.text();
			})
			.then(function(code) {
				var name = source.file.split('.')[0];
				self.sources[name] = code;
				self.sourceCount++;
				if (self.sourceCount >= self.resources.sources.length && !self.runtime) {
					self.start();
				}
			})
			.catch(function(error) {
				console.error('[L8B] Failed to load source:', source.file, error);
			});
	};
	
	Player.prototype.start = function() {
		var self = this;
		var createRuntime = L8BRuntime.createRuntime;
		
		// Create runtime
		this.runtime = createRuntime({
			sources: this.sources,
			resources: this.resources,
			url: ''
		});
		
		// Append canvas to wrapper
		var wrapper = document.getElementById('canvaswrapper');
		wrapper.appendChild(this.runtime.screen.canvas);
		
		// Handle resize
		window.addEventListener('resize', function() {
			self.resize();
		});
		this.resize();
		
		// Start runtime
		this.runtime.start();
		
		// Notify listener
		this.listener({ name: 'started' });
		console.log('[L8B] Runtime started');
	};
	
	// Resize with orientation and aspect ratio support
	Player.prototype.resize = function() {
		if (!this.runtime || !this.runtime.screen) return;
		
		var cw = window.innerWidth;
		var ch = window.innerHeight;
		var w, h;
		
		// Get config from global scope (defined in HTML template)
		var configAspect = window.aspect || 'free';
		var configOrientation = window.orientation || 'any';
		
		// Normalize aspect (support both 16x9 and 16:9 formats)
		var normalizedAspect = configAspect.replace(/:/g, 'x');
		
		// Get aspect ratio
		var aspectRatios = {
			'4x3': 4/3,
			'16x9': 16/9,
			'2x1': 2/1,
			'1x1': 1/1,
			'>4x3': 4/3,
			'>16x9': 16/9,
			'>2x1': 2/1,
			'>1x1': 1/1
		};
		
		var ratio = aspectRatios[normalizedAspect];
		var min = normalizedAspect && normalizedAspect.startsWith('>');
		
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
			
			var r;
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
		var canvas = this.runtime.screen.canvas;
		canvas.style.marginTop = Math.round((ch - h) / 2) + 'px';
		canvas.style.width = Math.round(w) + 'px';
		canvas.style.height = Math.round(h) + 'px';
		
		// Calculate actual canvas resolution with device pixel ratio
		var dpr = window.devicePixelRatio || 1;
		var canvasW = Math.round(w * dpr);
		var canvasH = Math.round(h * dpr);
		
		// Resize internal canvas
		this.runtime.screen.resize(canvasW, canvasH);
	};
	
	Player.prototype.call = function(name, args) {
		if (this.runtime && this.runtime.vm) {
			return this.runtime.vm.call(name, args);
		}
	};
	
	Player.prototype.setGlobal = function(name, value) {
		if (this.runtime && this.runtime.vm) {
			this.runtime.vm.context.global[name] = value;
		}
	};
	
	Player.prototype.exec = function(command, callback) {
		if (this.runtime) {
			this.runtime.runCommand(command, callback);
		}
	};
	
	// Initialize on load
	window.addEventListener('load', function() {
		window.player = new Player(function(event) {
			if (event.name === 'started') {
				// Game started
			} else if (event.name === 'log') {
				console.log(event.data);
			} else if (event.name === 'error') {
				if (window.__showL8BError__) {
					window.__showL8BError__(event.data);
				}
			}
		});
		document.body.focus();
	});
	
	window.Player = Player;
})();
`;
}
