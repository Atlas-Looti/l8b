/**
 * Actions Service - Farcaster SDK actions wrapper
 */

import { sdk } from "@farcaster/miniapp-sdk";
import type {
	ActionsAPI,
	ComposeCastOptions,
	OpenMiniAppOptions,
	OpenUrlOptions,
	SendTokenOptions,
	ShareOptions,
	SignInOptions,
	SwapTokenOptions,
	ViewCastOptions,
	ViewProfileOptions,
	ViewTokenOptions,
} from "./types";

export class ActionsService {
	private initialized: boolean =
		false;

	constructor() {
		// Lazy initialization
	}

	/**
	 * Initialize actions service
	 * Checks if we're in a Mini App environment
	 */
	private async initialize(): Promise<void> {
		if (
			this
				.initialized
		) {
			return;
		}

		this.initialized = true;

		// Only initialize in browser environment
		if (
			typeof window ===
			"undefined"
		) {
			return;
		}

		try {
			// Use sdk.isInMiniApp() for accurate detection
			const isInMiniApp =
				await sdk.isInMiniApp();
			if (
				!isInMiniApp
			) {
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
		// Ensure initialization
		if (
			!this
				.initialized
		) {
			// Initialize asynchronously but don't block
			this.initialize().catch(
				() => {
					// Silent fail if not in Mini App
				},
			);
		}

		return {
			ready:
				async (
					disableNativeGestures?: boolean,
				) => {
					await this.initialize();
					await sdk.actions.ready(
						{
							disableNativeGestures,
						},
					);
				},

			close:
				async () => {
					await this.initialize();
					await sdk.actions.close();
				},

			share:
				async (
					options: ShareOptions,
				) => {
					await this.initialize();
					// Note: share is not directly in SDK, but can be implemented via composeCast
					// For now, we'll use composeCast as the implementation
					if (
						options.text ||
						options.embeds
					) {
						await sdk.actions.composeCast(
							{
								text:
									options.text,
								embeds:
									options.embeds as
										| [
												string,
										  ]
										| [
												string,
												string,
										  ]
										| undefined,
							},
						);
					}
				},

			signIn:
				async (
					options: SignInOptions,
				) => {
					await this.initialize();
					return await sdk.actions.signIn(
						{
							nonce:
								options.nonce,
							acceptAuthAddress:
								options.acceptAuthAddress ??
								true,
						},
					);
				},

			addMiniApp:
				async () => {
					await this.initialize();
					await sdk.actions.addMiniApp();
				},

			openMiniApp:
				async (
					options: OpenMiniAppOptions,
				) => {
					await this.initialize();
					await sdk.actions.openMiniApp(
						{
							url: options.url,
						},
					);
				},

			openUrl:
				async (
					options: OpenUrlOptions,
				) => {
					await this.initialize();
					await sdk.actions.openUrl(
						options.url,
					);
				},

			viewProfile:
				async (
					options: ViewProfileOptions,
				) => {
					await this.initialize();
					await sdk.actions.viewProfile(
						{
							fid: options.fid,
						},
					);
				},

			viewCast:
				async (
					options: ViewCastOptions,
				) => {
					await this.initialize();
					await sdk.actions.viewCast(
						{
							hash:
								options.hash,
							close:
								options.close,
						},
					);
				},

			swapToken:
				async (
					options: SwapTokenOptions,
				) => {
					await this.initialize();
					return await sdk.actions.swapToken(
						{
							sellToken:
								options.sellToken,
							buyToken:
								options.buyToken,
							sellAmount:
								options.sellAmount,
						},
					);
				},

			sendToken:
				async (
					options: SendTokenOptions,
				) => {
					await this.initialize();
					return await sdk.actions.sendToken(
						{
							token:
								options.token,
							amount:
								options.amount,
							recipientAddress:
								options.recipientAddress,
							recipientFid:
								options.recipientFid,
						},
					);
				},

			viewToken:
				async (
					options: ViewTokenOptions,
				) => {
					await this.initialize();
					await sdk.actions.viewToken(
						{
							token:
								options.token,
						},
					);
				},

			composeCast:
				async (
					options: ComposeCastOptions,
				) => {
					await this.initialize();
					return await sdk.actions.composeCast(
						{
							text:
								options.text,
							embeds:
								options.embeds as
									| [
											string,
									  ]
									| [
											string,
											string,
									  ]
									| undefined,
							parent:
								options.parent,
							close:
								options.close,
							channelKey:
								options.channelKey,
						},
					);
				},

			haptics:
				{
					impact:
						async (
							style,
						) => {
							await this.initialize();
							await sdk.haptics.impactOccurred(
								style,
							);
						},
					notification:
						async (
							type,
						) => {
							await this.initialize();
							await sdk.haptics.notificationOccurred(
								type,
							);
						},
					selection:
						async () => {
							await this.initialize();
							await sdk.haptics.selectionChanged();
						},
				},

			back: {
				enableWebNavigation:
					async () => {
						await this.initialize();
						await sdk.back.enableWebNavigation();
					},
				disableWebNavigation:
					async () => {
						await this.initialize();
						await sdk.back.disableWebNavigation();
					},
				show:
					async () => {
						await this.initialize();
						await sdk.back.show();
					},
				hide:
					async () => {
						await this.initialize();
						await sdk.back.hide();
					},
				onBack:
					(
						callback: () => void,
					) => {
						// We need to initialize to ensure SDK is ready, but we can't await here
						// so we fire and forget the initialization
						this.initialize().catch(
							() => {},
						);
						sdk.back.onback =
							callback;
					},
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
