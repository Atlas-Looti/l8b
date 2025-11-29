/**
 * Actions Service - Farcaster SDK actions wrapper
 */

import { sdk } from "@farcaster/miniapp-sdk";
import type {
	ActionsAPI,
	ShareOptions,
	SignInOptions,
	ComposeCastOptions,
	OpenUrlOptions,
	ViewProfileOptions,
	ViewCastOptions,
	SwapTokenOptions,
	SendTokenOptions,
	ViewTokenOptions,
	OpenMiniAppOptions,
} from "./types";

export class ActionsService {
	private initialized: boolean = false;

	constructor() {
		// Lazy initialization
	}

	/**
	 * Initialize actions service
	 * Checks if we're in a Mini App environment
	 */
	private async initialize(): Promise<void> {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		// Only initialize in browser environment
		if (typeof window === "undefined") {
			return;
		}

		try {
			// Use sdk.isInMiniApp() for accurate detection
			const isInMiniApp = await sdk.isInMiniApp();
			if (!isInMiniApp) {
				// Not in Mini App - methods will throw errors
				return;
			}
		} catch (err) {
			// Not in Mini App environment or SDK not available
			// Methods will throw errors when called
		}
	}

	/**
	 * Get interface for LootiScript exposure
	 */
	getInterface(): ActionsAPI {
		const service = this;

		// Ensure initialization
		if (!this.initialized) {
			// Initialize asynchronously but don't block
			this.initialize().catch(() => {
				// Silent fail if not in Mini App
			});
		}

		return {
			ready: async (disableNativeGestures?: boolean) => {
				await service.initialize();
				await sdk.actions.ready({ disableNativeGestures });
			},

			close: async () => {
				await service.initialize();
				await sdk.actions.close();
			},

			share: async (options: ShareOptions) => {
				await service.initialize();
				// Note: share is not directly in SDK, but can be implemented via composeCast
				// For now, we'll use composeCast as the implementation
				if (options.text || options.embeds) {
					await sdk.actions.composeCast({
						text: options.text,
						embeds: options.embeds as [string] | [string, string] | undefined,
					});
				}
			},

			signIn: async (options: SignInOptions) => {
				await service.initialize();
				return await sdk.actions.signIn({
					nonce: options.nonce,
					acceptAuthAddress: options.acceptAuthAddress ?? true,
				});
			},

			addMiniApp: async () => {
				await service.initialize();
				await sdk.actions.addMiniApp();
			},

			openMiniApp: async (options: OpenMiniAppOptions) => {
				await service.initialize();
				await sdk.actions.openMiniApp({ url: options.url });
			},

			openUrl: async (options: OpenUrlOptions) => {
				await service.initialize();
				await sdk.actions.openUrl(options.url);
			},

			viewProfile: async (options: ViewProfileOptions) => {
				await service.initialize();
				await sdk.actions.viewProfile({ fid: options.fid });
			},

			viewCast: async (options: ViewCastOptions) => {
				await service.initialize();
				await sdk.actions.viewCast({
					hash: options.hash,
					close: options.close,
				});
			},

			swapToken: async (options: SwapTokenOptions) => {
				await service.initialize();
				return await sdk.actions.swapToken({
					sellToken: options.sellToken,
					buyToken: options.buyToken,
					sellAmount: options.sellAmount,
				});
			},

			sendToken: async (options: SendTokenOptions) => {
				await service.initialize();
				return await sdk.actions.sendToken({
					token: options.token,
					amount: options.amount,
					recipientAddress: options.recipientAddress,
					recipientFid: options.recipientFid,
				});
			},

			viewToken: async (options: ViewTokenOptions) => {
				await service.initialize();
				await sdk.actions.viewToken({ token: options.token });
			},

			composeCast: async (options: ComposeCastOptions) => {
				await service.initialize();
				return await sdk.actions.composeCast({
					text: options.text,
					embeds: options.embeds as [string] | [string, string] | undefined,
					parent: options.parent,
					close: options.close,
					channelKey: options.channelKey,
				});
			},
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		this.initialized = false;
	}
}
