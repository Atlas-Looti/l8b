/**
 * OG Image generation options
 */
export interface OGImageOptions {
	/** Route path (e.g., "/level/5") */
	routePath: string;
	/** Route parameters extracted from path */
	params: Record<string, string>;
	/** Image width (default: 1200 for 3:2 aspect ratio) */
	width?: number;
	/** Image height (default: 800 for 3:2 aspect ratio) */
	height?: number;
}

export interface LootiLoggingConfig {
	browser?: {
		/** Show runtime lifecycle logs in browser console */
		lifecycle?: boolean;
		/** Show canvas sizing logs in browser console */
		canvas?: boolean;
	};
	terminal?: {
		/** Mirror runtime lifecycle logs to terminal */
		lifecycle?: boolean;
		/** Mirror canvas sizing logs to terminal */
		canvas?: boolean;
		/** Mirror LootiScript print/log output to terminal */
		listener?: boolean;
		/** Mirror LootiScript errors to terminal */
		errors?: boolean;
	};
}

/**
 * Farcaster Mini App Embed configuration for a specific route/page
 * Each route can have its own embed configuration
 */
export interface FarcasterEmbedConfig {
	/** Image URL for the embed (3:2 aspect ratio, max 1024 chars) */
	imageUrl?: string;
	/** Dynamic image generation - if true, uses /og-image endpoint with route path */
	dynamicImage?: boolean;
	/** LootiScript function name to call for generating OG image (optional)
	 * Function signature: function generateOGImage(routePath, params, screen)
	 * - routePath: string - The route path (e.g., "/level/5")
	 * - params: table - Route parameters (e.g., { id = "5" })
	 * - screen: object - Screen API interface for drawing
	 */
	ogImageFunction?: string;
	/** Button title (max 32 characters) */
	buttonTitle: string;
	/** Action type - "launch_frame" or "view_token" */
	actionType?: "launch_frame" | "view_token";
	/** URL to open when button is clicked (defaults to current page URL) */
	actionUrl?: string;
	/** App name (defaults to config.name) */
	appName?: string;
	/** Splash image URL (200x200px, max 32 chars) */
	splashImageUrl?: string;
	/** Splash background color (hex color) */
	splashBackgroundColor?: string;
}

/**
 * Farcaster Mini App Manifest configuration
 * One manifest per domain at /.well-known/farcaster.json
 */
export interface FarcasterManifestConfig {
	/** Account association for domain verification */
	accountAssociation: {
		/** base64 encoded JFS header */
		header: string;
		/** base64 encoded payload */
		payload: string;
		/** base64 encoded signature */
		signature: string;
	};
	/** Mini App metadata */
	miniapp: {
		/** Version (must be "1") */
		version: "1";
		/** App name */
		name: string;
		/** Icon URL */
		iconUrl: string;
		/** Home URL */
		homeUrl: string;
		/** Default image URL for embeds */
		imageUrl?: string;
		/** Default button title */
		buttonTitle?: string;
		/** Splash image URL */
		splashImageUrl?: string;
		/** Splash background color */
		splashBackgroundColor?: string;
		/** Webhook URL for notifications */
		webhookUrl?: string;
		/** App description */
		description?: string;
		/** Subtitle */
		subtitle?: string;
		/** Screenshot URLs */
		screenshotUrls?: string[];
		/** Primary category */
		primaryCategory?: string;
		/** Tags */
		tags?: string[];
		/** Hero image URL */
		heroImageUrl?: string;
		/** Tagline */
		tagline?: string;
		/** OpenGraph title */
		ogTitle?: string;
		/** OpenGraph description */
		ogDescription?: string;
		/** OpenGraph image URL */
		ogImageUrl?: string;
	};
}

export interface LootiConfig {
	name: string;
	orientation: "portrait" | "landscape" | "any";
	aspect: string;
	canvas?: {
		id?: string;
		width?: number;
		height?: number;
	};
	width?: number;
	height?: number;
	url?: string;
	dev?: {
		port?: number;
		host?: string | boolean;
		watch?: boolean;
		hotReload?: boolean;
	};
	logging?: LootiLoggingConfig;
	/** Farcaster Mini App manifest configuration */
	farcaster?: {
		/** Manifest configuration (one per domain) */
		manifest?: FarcasterManifestConfig;
		/** Embed configurations per route (key is route path) */
		embeds?: Record<string, FarcasterEmbedConfig>;
	};
}
