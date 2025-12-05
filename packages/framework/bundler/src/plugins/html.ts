/**
 * HTML Plugin - Generates production HTML
 *
 * Features:
 * - HTML minification
 * - Asset injection with hashed paths
 * - PWA manifest generation
 * - Service worker generation
 */

import type { L8BPlugin } from "./index";
import type { ProjectResources } from "@l8b/framework-shared";
import { createLogger } from "@l8b/framework-shared";

const logger = createLogger("html-plugin");

/**
 * HTML plugin options
 */
export interface HTMLPluginOptions {
	/** Minify HTML */
	minify?: boolean;
	/** Include PWA manifest */
	pwa?: boolean;
	/** Include service worker */
	serviceWorker?: boolean;
	/** Base URL for assets */
	base?: string;
}

/**
 * Create HTML plugin
 */
export function htmlPlugin(options: HTMLPluginOptions = {}): L8BPlugin {
	const { minify = true, pwa = false, serviceWorker = false, base = "" } = options;

	return {
		name: "l8b:html",

		async generateBundle(files, ctx) {
			const { config, resources } = ctx;

			logger.info("Generating HTML...");

			// Generate main HTML
			const html = generateProductionHTML({
				title: config.title,
				orientation: config.orientation,
				aspect: config.aspect,
				resources,
				base,
				minify,
				pwa,
			});

			files.set("index.html", html);

			// Generate PWA manifest if enabled
			if (pwa) {
				const manifest = generatePWAManifest({
					name: config.title,
					shortName: config.title.slice(0, 12),
					orientation: config.orientation,
				});
				files.set("manifest.json", JSON.stringify(manifest, null, "\t"));
			}

			// Generate service worker if enabled
			if (serviceWorker) {
				const sw = generateServiceWorker(resources, base);
				files.set("sw.js", sw);
			}

			logger.info("HTML generated successfully");
		},
	};
}

/**
 * Generate production HTML
 */
function generateProductionHTML(options: {
	title: string;
	orientation: string;
	aspect: string;
	resources: ProjectResources;
	base: string;
	minify: boolean;
	pwa: boolean;
}): string {
	const { title, orientation, aspect, resources, base, minify, pwa } = options;

	// Format resources for embedding
	const resourcesJson = JSON.stringify({
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
	});

	const pwaLinks = pwa
		? `
	<link rel="manifest" href="${base}manifest.json">
	<meta name="theme-color" content="#000000">
	<link rel="apple-touch-icon" href="${base}icon-192.png">`
		: "";

	let html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<title>${title}</title>${pwaLinks}
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		html, body {
			width: 100%;
			height: 100%;
			overflow: hidden;
			background: #000;
			touch-action: none;
			-webkit-tap-highlight-color: transparent;
		}
		#canvaswrapper {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: 0;
			left: 0;
		}
		canvas {
			display: block;
			image-rendering: pixelated;
			image-rendering: crisp-edges;
		}
		#loading {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: #666;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			font-size: 14px;
			text-align: center;
		}
		#loading .spinner {
			width: 24px;
			height: 24px;
			border: 2px solid #333;
			border-top-color: #666;
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
			margin: 0 auto 12px;
		}
		@keyframes spin {
			to { transform: rotate(360deg); }
		}
	</style>
</head>
<body>
	<div id="canvaswrapper">
		<div id="loading">
			<div class="spinner"></div>
			Loading...
		</div>
	</div>
	
	<script>
		// L8B Configuration
		window.exported_project = true;
		window.orientation = "${orientation}";
		window.aspect = "${aspect}";
		window.graphics = "M2D";
		window.ms_libs = [];
		window.resources = ${resourcesJson};
	</script>
	
	<script src="${base}game.js"></script>
</body>
</html>`;

	// Minify if enabled
	if (minify) {
		html = minifyHTML(html);
	}

	return html;
}

/**
 * Simple HTML minification
 */
function minifyHTML(html: string): string {
	return (
		html
			// Remove HTML comments (except IE conditionals)
			.replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
			// Remove whitespace between tags
			.replace(/>\s+</g, "><")
			// Remove leading/trailing whitespace
			.trim()
	);
}

/**
 * Generate PWA manifest
 */
function generatePWAManifest(options: {
	name: string;
	shortName: string;
	orientation: string;
}): Record<string, unknown> {
	const { name, shortName, orientation } = options;

	return {
		name,
		short_name: shortName,
		description: `${name} - Built with L8B Game Engine`,
		start_url: ".",
		display: "fullscreen",
		orientation: orientation === "any" ? "natural" : orientation,
		background_color: "#000000",
		theme_color: "#000000",
		icons: [
			{
				src: "icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}

/**
 * Generate service worker
 */
function generateServiceWorker(resources: ProjectResources, base: string): string {
	// Collect all files to cache
	const filesToCache = [
		`${base}/`,
		`${base}/index.html`,
		`${base}/game.js`,
		...resources.images.map((s) => `${base}/sprites/${s.file}`),
		...resources.maps.map((m) => `${base}/maps/${m.file}`),
		...resources.sounds.map((s) => `${base}/sounds/${s.file}`),
		...resources.music.map((m) => `${base}/music/${m.file}`),
	];

	const cacheVersion = `l8b-v${Date.now()}`;

	return `// L8B Service Worker
// Generated at ${new Date().toISOString()}

const CACHE_NAME = '${cacheVersion}';
const urlsToCache = ${JSON.stringify(filesToCache, null, "  ")};

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone and cache the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});
`;
}
