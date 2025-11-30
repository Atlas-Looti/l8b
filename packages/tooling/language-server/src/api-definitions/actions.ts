/**
 * Actions API definitions for Farcaster Mini Apps
 */

import type { GlobalApi } from "../types";

export const actionsApi: Partial<GlobalApi> = {
	actions: {
		type: "object",
		description: "Farcaster SDK actions for Mini Apps",
		properties: {
			ready: {
				type: "method",
				signature: "actions.ready(disableNativeGestures?: boolean)",
				description: "Hide the splash screen and display your app content",
			},
			close: {
				type: "method",
				signature: "actions.close()",
				description: "Close the Mini App",
			},
			share: {
				type: "method",
				signature: "actions.share({text?: string, embeds?: string[]})",
				description: "Share content via compose cast",
			},
			signIn: {
				type: "method",
				signature: "actions.signIn({nonce: string, acceptAuthAddress?: boolean})",
				description: "Request Sign In with Farcaster credential. Returns {signature: string, message: string}",
			},
			addMiniApp: {
				type: "method",
				signature: "actions.addMiniApp()",
				description: "Prompt the user to add the Mini App to their client",
			},
			openMiniApp: {
				type: "method",
				signature: "actions.openMiniApp({url: string})",
				description: "Open another Mini App",
			},
			openUrl: {
				type: "method",
				signature: "actions.openUrl({url: string})",
				description: "Open an external URL",
			},
			viewProfile: {
				type: "method",
				signature: "actions.viewProfile({fid: number})",
				description: "View a Farcaster profile",
			},
			viewCast: {
				type: "method",
				signature: "actions.viewCast({hash: string, close?: boolean})",
				description: "View a specific cast",
			},
			swapToken: {
				type: "method",
				signature: "actions.swapToken({sellToken?: string, buyToken?: string, sellAmount?: string})",
				description: "Open swap form with pre-filled tokens",
			},
			sendToken: {
				type: "method",
				signature: "actions.sendToken({token?: string, amount?: string, recipientAddress?: string, recipientFid?: number})",
				description: "Open send form with pre-filled token and recipient",
			},
			viewToken: {
				type: "method",
				signature: "actions.viewToken({token: string})",
				description: "View a token",
			},
			composeCast: {
				type: "method",
				signature: "actions.composeCast({text?: string, embeds?: string[], parent?: {type: string, hash: string}, close?: boolean, channelKey?: string})",
				description: "Open cast composer with suggested content",
			},
		},
	},
};
