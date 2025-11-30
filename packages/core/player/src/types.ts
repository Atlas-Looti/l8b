/**
 * Player API types for Farcaster Mini Apps integration
 */

export interface PlayerContext {
	fid: number;
	username?: string;
	displayName?: string;
	pfpUrl?: string;
	location?: {
		type: "cast_embed" | "cast_share" | "notification" | "launcher" | "channel" | "open_miniapp";
		cast?: {
			author: {
				fid: number;
				username?: string;
				displayName?: string;
				pfpUrl?: string;
			};
			hash: string;
			text: string;
			timestamp?: number;
			parentHash?: string;
			parentFid?: number;
		};
		notification?: {
			notificationId: string;
			title: string;
			body: string;
		};
		channel?: {
			key: string;
			name: string;
			imageUrl?: string;
		};
		referrerDomain?: string;
	};
	client: {
		platformType?: "web" | "mobile";
		clientFid: number;
		added: boolean;
	};
	features?: {
		haptics: boolean;
		cameraAndMicrophoneAccess?: boolean;
	};
}

/**
 * Player API interface exposed to LootiScript
 */
export interface PlayerAPI {
	// Properties
	fid: number;
	username?: string;
	displayName?: string;
	pfpUrl?: string;

	// Methods
	getFid(): number;
	getUsername(): string | undefined;
	getDisplayName(): string | undefined;
	getPfpUrl(): string | undefined;
	getContext(): PlayerContext;
	isInMiniApp(): boolean;
}
