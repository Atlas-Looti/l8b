/**
 * Farcaster Mini App Embed Generator
 *
 * Generates fc:miniapp meta tags for individual pages/routes
 * according to Farcaster Mini Apps specification.
 */

import type { FarcasterEmbedConfig, LootiConfig } from "../config";

/**
 * Escape HTML attribute value to prevent XSS
 */
function escapeHtmlAttr(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/**
 * Generate Farcaster Mini App embed meta tag (fc:miniapp)
 * According to Farcaster Mini Apps specification
 *
 * @param config - LootiScript configuration
 * @param routePath - Current route path (e.g., "/game", "/level/5")
 * @param embedConfig - Embed configuration for this route (optional, falls back to manifest defaults)
 * @returns HTML meta tag string or empty string if no config
 */
export function generateFarcasterEmbedTag(config: LootiConfig, routePath: string = "/", embedConfig?: FarcasterEmbedConfig): string {
	const farcaster = config.farcaster;

	// If no farcaster config at all, return empty
	if (!farcaster) {
		return "";
	}

	// Try to get embed config for this route, or use default from manifest
	const routeEmbed = farcaster.embeds?.[routePath];
	const embed = routeEmbed || embedConfig;

	// If no embed config and no manifest defaults, return empty
	if (!embed && !farcaster.manifest?.miniapp) {
		return "";
	}

	const baseUrl = config.url || "/";
	const appName = embed?.appName || farcaster.manifest?.miniapp.name || config.name;

	// Determine action URL - use embed's actionUrl, or construct from routePath, or use baseUrl
	let actionUrl: string;
	if (embed?.actionUrl) {
		actionUrl = embed.actionUrl;
	} else if (routePath !== "/") {
		// Construct full URL from route path
		const url = new URL(routePath, baseUrl.startsWith("http") ? baseUrl : `https://example.com${baseUrl}`);
		actionUrl = url.pathname + url.search;
	} else {
		actionUrl = baseUrl;
	}

	// Determine image URL - support dynamic images
	let imageUrl: string;
	if (embed?.dynamicImage) {
		// Use dynamic OG image endpoint
		imageUrl = `${baseUrl.replace(/\/$/, "")}/og-image${routePath}`;
	} else if (embed?.imageUrl) {
		imageUrl = embed.imageUrl;
	} else {
		imageUrl = farcaster.manifest?.miniapp.imageUrl || "";
	}

	// Build embed object according to Farcaster spec
	const embedObject = {
		version: "1" as const,
		imageUrl: imageUrl,
		button: {
			title: embed?.buttonTitle || farcaster.manifest?.miniapp.buttonTitle || appName,
			action: {
				type: embed?.actionType || "launch_frame",
				name: appName,
				url: actionUrl,
				...(embed?.splashImageUrl || farcaster.manifest?.miniapp.splashImageUrl
					? {
							splashImageUrl: embed?.splashImageUrl || farcaster.manifest?.miniapp.splashImageUrl,
						}
					: {}),
				...(embed?.splashBackgroundColor || farcaster.manifest?.miniapp.splashBackgroundColor
					? {
							splashBackgroundColor: embed?.splashBackgroundColor || farcaster.manifest?.miniapp.splashBackgroundColor,
						}
					: {}),
			},
		},
	};

	// Validate required fields
	if (!embedObject.imageUrl) {
		// No image URL - can't generate embed
		return "";
	}

	// Stringify and escape for HTML attribute
	const embedJson = JSON.stringify(embedObject);
	const escapedEmbed = escapeHtmlAttr(embedJson);

	return `    <meta name="fc:miniapp" content="${escapedEmbed}" />\n    <!-- For backward compatibility of legacy Mini Apps -->\n    <meta name="fc:frame" content="${escapedEmbed}" />`;
}
