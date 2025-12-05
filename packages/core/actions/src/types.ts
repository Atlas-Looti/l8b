/**
 * Actions API types for Farcaster Mini Apps integration
 */

export interface ShareOptions {
	text?: string;
	embeds?: string[];
}

export interface SignInOptions {
	nonce: string;
	acceptAuthAddress?: boolean;
}

export interface ComposeCastOptions {
	text?: string;
	embeds?: string[];
	parent?: {
		type: "cast";
		hash: string;
	};
	close?: boolean;
	channelKey?: string;
}

export interface OpenUrlOptions {
	url: string;
}

export interface ViewProfileOptions {
	fid: number;
}

export interface ViewCastOptions {
	hash: string;
	close?: boolean;
}

export interface SwapTokenOptions {
	sellToken?: string;
	buyToken?: string;
	sellAmount?: string;
}

export interface SendTokenOptions {
	token?: string;
	amount?: string;
	recipientAddress?: string;
	recipientFid?: number;
}

export interface ViewTokenOptions {
	token: string;
}

export interface OpenMiniAppOptions {
	url: string;
}

export type HapticStyle = "light" | "medium" | "heavy" | "rigid" | "soft";
export type HapticNotificationType = "success" | "warning" | "error";

export interface HapticsAPI {
	impact(style: HapticStyle): Promise<void>;
	notification(type: HapticNotificationType): Promise<void>;
	selection(): Promise<void>;
}

export interface BackAPI {
	enableWebNavigation(): Promise<void>;
	disableWebNavigation(): Promise<void>;
	show(): Promise<void>;
	hide(): Promise<void>;
	onBack(callback: () => void): void;
}

export interface GetTokenOptions {
	force?: boolean;
	quickAuthServerOrigin?: string;
}

export interface FetchOptions extends RequestInit {
	quickAuthServerOrigin?: string;
}

export interface QuickAuthAPI {
	/**
	 * Get Quick Auth token (cached if available and not expired)
	 * @param options - Options object with force and quickAuthServerOrigin
	 * @returns Token object with token string
	 */
	getToken(options?: GetTokenOptions): Promise<{ token: string }>;
	/**
	 * Make an authenticated fetch request (automatically adds Bearer token)
	 * @param url - Request URL
	 * @param options - Fetch options
	 * @returns Fetch Response
	 */
	fetch(url: string, options?: FetchOptions): Promise<Response>;
	/**
	 * Synchronous access to current token (if available)
	 */
	token?: string;
}

/**
 * Actions API interface exposed to LootiScript
 */
export interface ActionsAPI {
	// Core actions
	ready(disableNativeGestures?: boolean): Promise<void>;
	close(): Promise<void>;

	// Sharing
	share(options: ShareOptions): Promise<void>;

	// Authentication
	signIn(options: SignInOptions): Promise<{
		signature: string;
		message: string;
	}>;

	// Mini App management
	addMiniApp(): Promise<void>;
	openMiniApp(options: OpenMiniAppOptions): Promise<void>;

	// Navigation
	openUrl(options: OpenUrlOptions): Promise<void>;
	viewProfile(options: ViewProfileOptions): Promise<void>;
	viewCast(options: ViewCastOptions): Promise<void>;

	// Token operations
	swapToken(options: SwapTokenOptions): Promise<any>;
	sendToken(options: SendTokenOptions): Promise<any>;
	viewToken(options: ViewTokenOptions): Promise<void>;

	// Social
	composeCast(options: ComposeCastOptions): Promise<any>;

	// Hardware & System
	haptics: HapticsAPI;
	back: BackAPI;

	// Quick Auth (recommended authentication method)
	quickAuth: QuickAuthAPI;
}
