/**
 * Player API definitions
 */

import type { GlobalApi } from "../types";

export const playerApi: Partial<GlobalApi> = {
	player: {
		type: "object",
		description: "Farcaster player context and user information",
		properties: {
			fid: {
				type: "property",
				description: "Player Farcaster ID (FID)",
			},
			username: {
				type: "property",
				description: "Player username",
			},
			displayName: {
				type: "property",
				description: "Player display name",
			},
			pfpUrl: {
				type: "property",
				description: "Player profile picture URL",
			},
			getFid: {
				type: "method",
				signature: "player.getFid()",
				description: "Get player Farcaster ID",
			},
			getUsername: {
				type: "method",
				signature: "player.getUsername()",
				description: "Get player username",
			},
			getDisplayName: {
				type: "method",
				signature: "player.getDisplayName()",
				description: "Get player display name",
			},
			getPfpUrl: {
				type: "method",
				signature: "player.getPfpUrl()",
				description: "Get player profile picture URL",
			},
			getContext: {
				type: "method",
				signature: "player.getContext()",
				description: "Get full player context object",
			},
			isInMiniApp: {
				type: "method",
				signature: "player.isInMiniApp()",
				description: "Check if running in Farcaster Mini App",
			},
		},
	},
};
