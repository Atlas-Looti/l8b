/**
 * L8B Dev Badge - Next.js Turbopack style indicator
 */

/**
 * Dev badge CSS styles
 */
const devBadgeStyles = `
#l8b-dev-indicator {
	position: fixed;
	bottom: 10px;
	left: 10px;
	z-index: 99998;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	font-size: 13px;
	pointer-events: auto;
}
#l8b-dev-indicator button {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 10px;
	background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 6px;
	color: #ededed;
	cursor: pointer;
	font-size: 13px;
	font-weight: 500;
	box-shadow: 0 2px 8px rgba(0,0,0,0.3);
	transition: all 0.15s ease;
}
#l8b-dev-indicator button:hover {
	background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
	border-color: rgba(255,255,255,0.2);
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
#l8b-dev-indicator .icon {
	font-size: 14px;
}
#l8b-dev-indicator .text {
	background: linear-gradient(90deg, #00d4ff, #7b61ff);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	font-weight: 600;
}
#l8b-dev-indicator .separator {
	width: 1px;
	height: 14px;
	background: rgba(255,255,255,0.2);
}
#l8b-dev-indicator .status {
	display: flex;
	align-items: center;
	gap: 4px;
	color: #888;
	font-size: 11px;
}
#l8b-dev-indicator .status-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #22c55e;
	animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

/* Dev panel popup */
#l8b-dev-panel {
	position: fixed;
	bottom: 50px;
	left: 10px;
	width: 280px;
	background: #0a0a0a;
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 8px;
	box-shadow: 0 4px 24px rgba(0,0,0,0.5);
	font-family: system-ui, -apple-system, sans-serif;
	color: #ededed;
	z-index: 99997;
	display: none;
	overflow: hidden;
}
#l8b-dev-panel.visible {
	display: block;
}
#l8b-dev-panel .panel-header {
	padding: 12px 14px;
	border-bottom: 1px solid rgba(255,255,255,0.1);
	display: flex;
	align-items: center;
	justify-content: space-between;
}
#l8b-dev-panel .panel-title {
	font-weight: 600;
	font-size: 13px;
	display: flex;
	align-items: center;
	gap: 6px;
}
#l8b-dev-panel .panel-close {
	background: none;
	border: none;
	color: #666;
	cursor: pointer;
	font-size: 16px;
	padding: 0;
	line-height: 1;
}
#l8b-dev-panel .panel-close:hover {
	color: #fff;
}
#l8b-dev-panel .panel-content {
	padding: 12px 14px;
}
#l8b-dev-panel .info-row {
	display: flex;
	justify-content: space-between;
	padding: 6px 0;
	font-size: 12px;
	border-bottom: 1px solid rgba(255,255,255,0.05);
}
#l8b-dev-panel .info-row:last-child {
	border-bottom: none;
}
#l8b-dev-panel .info-label {
	color: #888;
}
#l8b-dev-panel .info-value {
	color: #ededed;
	font-family: ui-monospace, monospace;
}
#l8b-dev-panel .info-value.success {
	color: #22c55e;
}
`;

export interface DevBadgeOptions {
	port: number;
	debug?: boolean;
}

/**
 * Generate the dev badge HTML
 */
export function generateDevBadge(options: DevBadgeOptions): string {
	const { port, debug = false } = options;
	const statusText = debug ? "debug" : "dev";

	return `
<style>${devBadgeStyles}</style>
<div id="l8b-dev-indicator">
	<button onclick="document.getElementById('l8b-dev-panel').classList.toggle('visible')">
		<span class="icon">⚡</span>
		<span class="text">L8B</span>
		<span class="separator"></span>
		<span class="status">
			<span class="status-dot"></span>
			<span>${statusText}</span>
		</span>
	</button>
</div>
<div id="l8b-dev-panel">
	<div class="panel-header">
		<div class="panel-title">⚡ L8B Dev Server</div>
		<button class="panel-close" onclick="this.closest('#l8b-dev-panel').classList.remove('visible')">&times;</button>
	</div>
	<div class="panel-content">
		<div class="info-row">
			<span class="info-label">Status</span>
			<span class="info-value success">● Running</span>
		</div>
		${
			debug
				? `<div class="info-row">
			<span class="info-label">Mode</span>
			<span class="info-value">Debug</span>
		</div>`
				: ""
		}
		<div class="info-row">
			<span class="info-label">Port</span>
			<span class="info-value">${port}</span>
		</div>
		<div class="info-row">
			<span class="info-label">HMR</span>
			<span class="info-value success">Connected</span>
		</div>
		<div class="info-row">
			<span class="info-label">Orientation</span>
			<span class="info-value" id="l8b-info-orientation">-</span>
		</div>
		<div class="info-row">
			<span class="info-label">Aspect</span>
			<span class="info-value" id="l8b-info-aspect">-</span>
		</div>
	</div>
</div>
<script>
	document.getElementById('l8b-info-orientation').textContent = orientation || 'any';
	document.getElementById('l8b-info-aspect').textContent = aspect || 'free';
</script>
`;
}
