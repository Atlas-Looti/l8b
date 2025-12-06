/**
 * HTML templates for L8B
 * HTML templates for L8B
 */
import type { L8BConfig, ProjectResources } from "@l8b/framework-shared";
import { generateDevBadge } from "./dev-badge";
import { generateOverlayScript } from "./overlay";
import { generatePlayerScript } from "./player";

/**
 * Template options
 */
export interface TemplateOptions {
	config: L8BConfig;
	resources: ProjectResources;
	mode: "development" | "production";
	port?: number;
	baseUrl?: string;
}

/**
 * Development template options
 */
export interface DevTemplateOptions extends TemplateOptions {
	/** Enable debug mode */
	debug?: boolean;
}

/**
 * Base CSS
 */
const baseStyles = `
html, body {
	margin: 0;
	padding: 0;
	background-color: #000;
	overflow: hidden;
	font-family: Verdana;
}
body {
	touch-action: none;
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
`;

/**
 * Generate development HTML page
 */
export function generateDevHTML(options: DevTemplateOptions): string {
	const { config, resources, port = 8080, debug = false } = options;

	const resourcesJson = JSON.stringify(formatResources(resources));

	return `<!DOCTYPE html>
<html>
<head>
	<title>${config.title || "L8B Game"}</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui=1">
	<meta charset="UTF-8">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<style>${baseStyles}</style>
</head>
<body class="noselect" oncontextmenu="return false;">
	<div id="canvaswrapper"></div>
	
	<script>
		// Resources and configuration
		window.resources = ${resourcesJson};
		window.orientation = '${config.orientation || "any"}';
		window.aspect = '${config.aspect || "free"}';
		window.graphics = 'M2D';
		window.ms_libs = [];
		window.ms_in_editor = ${debug};
		window.ms_use_server = false;
		window.__L8B_HMR_PORT__ = ${port};
	</script>
	
	<!-- Error Overlay -->
	<script>
${generateOverlayScript()}
	</script>
	
	<!-- HMR Client -->
	<script src="/__l8b_client__.js"></script>
	
	<!-- Runtime -->
	<script src="/__l8b_runtime__.js"></script>
	
	<!-- Player -->
	<script>
${generatePlayerScript()}
	</script>
	
	<!-- L8B Dev Badge -->
	${generateDevBadge({ port, debug })}
</body>
</html>`;
}

/**
 * Generate production HTML page
 */
export function generateProdHTML(options: TemplateOptions): string {
	const { config, resources, baseUrl = "" } = options;
	const resourcesJson = JSON.stringify(formatResources(resources));

	return `<!DOCTYPE html>
<html>
<head>
	<title>${config.title || "L8B Game"}</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui=1">
	<meta charset="UTF-8">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="manifest" href="manifest.json">
	<style>${baseStyles}</style>
</head>
<body class="noselect" oncontextmenu="return false;">
	<div id="canvaswrapper"></div>
	
	<script>
		window.resources = ${resourcesJson};
		window.orientation = '${config.orientation || "any"}';
		window.aspect = '${config.aspect || "free"}';
		window.graphics = 'M2D';
		window.ms_libs = [];
		window.exported_project = true;
		window.skip_service_worker = true;
		window.ms_use_server = false;
	</script>
	
	<script src="${baseUrl}game.js"></script>
</body>
</html>`;
}

/**
 * Format resources for embedding in HTML
 */
function formatResources(resources: ProjectResources): object {
	return {
		sources: resources.sources.map((s) => ({
			file: s.file,
			version: s.version,
		})),
		images: resources.images.map((s) => ({
			file: s.file,
			version: s.version,
			properties: s.properties,
		})),
		maps: resources.maps.map((m) => ({
			file: m.file,
			version: m.version,
		})),
		sounds: resources.sounds.map((s) => ({
			file: s.file,
			version: s.version,
		})),
		music: resources.music.map((m) => ({
			file: m.file,
			version: m.version,
		})),
		assets: resources.assets.map((a) => ({
			file: a.file,
			version: a.version,
		})),
	};
}

/**
 * Generate service worker for offline support
 */
export function generateServiceWorker(resources: ProjectResources, version: string): string {
	const files = [
		"/",
		"/index.html",
		"/game.js",
		...resources.images.map((s) => `/sprites/${s.file}`),
		...resources.maps.map((m) => `/maps/${m.file}`),
		...resources.sounds.map((s) => `/sounds/${s.file}`),
		...resources.music.map((m) => `/music/${m.file}`),
	];

	return `
// L8B Service Worker v${version}
const CACHE_NAME = 'l8b-cache-v${version}';
const urlsToCache = ${JSON.stringify(files, null, 2)};

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => cache.addAll(urlsToCache))
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => response || fetch(event.request))
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((names) => Promise.all(
			names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
		))
	);
});
`;
}
