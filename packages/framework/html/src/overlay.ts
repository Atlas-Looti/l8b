/**
 * L8B Error Overlay - Vite-style Web Component
 * Based on vite/packages/vite/src/client/overlay.ts
 */

/**
 * CSS styles for the error overlay
 */
const overlayStyles = /*css*/ `
:host {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 99999;
	--monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
	--red: #ff5555;
	--yellow: #e2aa53;
	--purple: #cfa4ff;
	--cyan: #2dd9da;
	--dim: #c9c9c9;
	--window-background: #181818;
	--window-color: #d8d8d8;
}

.backdrop {
	position: fixed;
	z-index: 99999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	margin: 0;
	background: rgba(0, 0, 0, 0.66);
}

.window {
	font-family: var(--monospace);
	line-height: 1.5;
	max-width: 80vw;
	color: var(--window-color);
	box-sizing: border-box;
	margin: 30px auto;
	padding: 2.5vh 4vw;
	position: relative;
	background: var(--window-background);
	border-radius: 6px 6px 8px 8px;
	box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
	overflow: hidden;
	border-top: 8px solid var(--red);
	direction: ltr;
	text-align: left;
}

pre {
	font-family: var(--monospace);
	font-size: 16px;
	margin-top: 0;
	margin-bottom: 1em;
	overflow-x: scroll;
	scrollbar-width: none;
}

pre::-webkit-scrollbar {
	display: none;
}

.message {
	line-height: 1.3;
	font-weight: 600;
	white-space: pre-wrap;
}

.message-body {
	color: var(--red);
}

.plugin {
	color: var(--purple);
}

.file {
	color: var(--cyan);
	margin-bottom: 0;
	white-space: pre-wrap;
	word-break: break-all;
}

.frame {
	color: var(--yellow);
}

.stack {
	font-size: 13px;
	color: var(--dim);
}

.tip {
	font-size: 13px;
	color: #999;
	border-top: 1px dotted #999;
	padding-top: 13px;
	line-height: 1.8;
}

code {
	font-size: 13px;
	font-family: var(--monospace);
	color: var(--yellow);
}

kbd {
	line-height: 1.5;
	font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
	font-size: 0.75rem;
	font-weight: 700;
	background-color: rgb(38, 40, 44);
	color: rgb(166, 167, 171);
	padding: 0.15rem 0.3rem;
	border-radius: 0.25rem;
	border-width: 0.0625rem 0.0625rem 0.1875rem;
	border-style: solid;
	border-color: rgb(54, 57, 64);
}
`;

/**
 * Generate the error overlay script for browser
 */
export function generateOverlayScript(): string {
	return `
(function() {
	'use strict';
	
	var overlayStyles = ${JSON.stringify(overlayStyles)};
	
	// Helper to create elements
	function h(tag, attrs, children) {
		var el = document.createElement(tag);
		if (attrs) {
			for (var k in attrs) {
				if (attrs[k] !== undefined) el.setAttribute(k, attrs[k]);
			}
		}
		if (children) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (typeof child === 'string') {
					el.appendChild(document.createTextNode(child));
				} else {
					el.appendChild(child);
				}
			}
		}
		return el;
	}
	
	// Error Overlay Class
	function L8BErrorOverlay(err) {
		var self = this;
		this.root = this.attachShadow({ mode: 'open' });
		
		// Create structure
		var backdrop = h('div', { class: 'backdrop' });
		var win = h('div', { class: 'window' });
		
		// Message
		var message = h('pre', { class: 'message' }, [
			h('span', { class: 'message-body' }, [err.message || String(err)])
		]);
		win.appendChild(message);
		
		// File location
		if (err.file || err.loc) {
			var fileText = err.file || '';
			if (err.loc) {
				fileText = (err.loc.file || err.file || 'unknown') + ':' + err.loc.line;
				if (err.loc.column) fileText += ':' + err.loc.column;
			} else if (err.line) {
				fileText += ':' + err.line;
				if (err.column) fileText += ':' + err.column;
			}
			if (fileText) {
				win.appendChild(h('pre', { class: 'file' }, [fileText]));
			}
		}
		
		// Code frame
		if (err.frame) {
			win.appendChild(h('pre', { class: 'frame' }, [err.frame]));
		}
		
		// Stack trace
		if (err.stack) {
			win.appendChild(h('pre', { class: 'stack' }, [err.stack]));
		}
		
		// Tip
		var tip = h('div', { class: 'tip' });
		tip.innerHTML = 'Click outside, press <kbd>Esc</kbd> key, or fix the code to dismiss.';
		win.appendChild(tip);
		
		backdrop.appendChild(win);
		this.root.appendChild(backdrop);
		this.root.appendChild(h('style', {}, [overlayStyles]));
		
		// Click outside to close
		backdrop.addEventListener('click', function(e) {
			if (e.target === backdrop) self.close();
		});
		win.addEventListener('click', function(e) {
			e.stopPropagation();
		});
		
		// ESC to close
		this.closeOnEsc = function(e) {
			if (e.key === 'Escape' || e.code === 'Escape') {
				self.close();
			}
		};
		document.addEventListener('keydown', this.closeOnEsc);
	}
	
	L8BErrorOverlay.prototype = Object.create(HTMLElement.prototype);
	L8BErrorOverlay.prototype.constructor = L8BErrorOverlay;
	
	L8BErrorOverlay.prototype.close = function() {
		document.removeEventListener('keydown', this.closeOnEsc);
		if (this.parentNode) this.parentNode.removeChild(this);
	};
	
	// Register custom element
	var overlayId = 'l8b-error-overlay';
	if (typeof customElements !== 'undefined' && !customElements.get(overlayId)) {
		var Overlay = function() {
			return Reflect.construct(HTMLElement, [], Overlay);
		};
		Overlay.prototype = Object.create(HTMLElement.prototype);
		Overlay.prototype.constructor = Overlay;
		Overlay.prototype.connectedCallback = function() {};
		customElements.define(overlayId, Overlay);
	}
	
	// Global error display function
	window.__showL8BError__ = function(msg, src, line, col, error) {
		// Remove existing overlay
		var existing = document.querySelector(overlayId);
		if (existing) existing.close ? existing.close() : existing.parentNode.removeChild(existing);
		
		// Create overlay element
		var overlay = document.createElement(overlayId);
		
		// Initialize with error data
		var err = {
			message: msg || (error && error.message) || 'Unknown error',
			file: src,
			line: line,
			column: col,
			stack: error && error.stack ? error.stack : null,
			loc: src && line ? { file: src, line: line, column: col } : null
		};
		
		L8BErrorOverlay.call(overlay, err);
		document.body.appendChild(overlay);
		console.error('[L8B]', msg, error);
	};
	
	window.__hideL8BError__ = function() {
		var overlay = document.querySelector(overlayId);
		if (overlay) {
			if (overlay.close) overlay.close();
			else if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
		}
	};
	
	// Global error handlers
	window.onerror = function(msg, src, line, col, error) {
		window.__showL8BError__(msg, src, line, col, error);
		return false;
	};
	
	window.onunhandledrejection = function(event) {
		var reason = event.reason;
		window.__showL8BError__(
			reason instanceof Error ? reason.message : String(reason),
			null, null, null,
			reason instanceof Error ? reason : null
		);
	};
})();
`;
}
