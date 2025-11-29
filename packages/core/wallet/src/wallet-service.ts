/**
 * Wallet Service - Farcaster wallet operations
 */

import { sdk } from "@farcaster/miniapp-sdk";
import type { TransactionRequest, WalletAPI } from "./types";

export class WalletService {
	private provider: any = null;
	private initialized: boolean = false;

	constructor() {
		// Lazy initialization
	}

	/**
	 * Initialize wallet provider from Farcaster SDK
	 */
	private async initialize(): Promise<void> {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		// Only initialize in browser environment
		if (typeof window === "undefined") {
			this.provider = null;
			return;
		}

		try {
			// Use sdk.isInMiniApp() for accurate detection
			const isInMiniApp = await sdk.isInMiniApp();
			if (!isInMiniApp) {
				this.provider = null;
				return;
			}

			this.provider = sdk.wallet.getEthereumProvider();
		} catch (err) {
			// Not in Mini App environment or SDK not available
			this.provider = null;
		}
	}

	/**
	 * Get current address
	 */
	private async getCurrentAddress(): Promise<string | null> {
		if (!this.provider) return null;
		try {
			const accounts = await this.provider.request({ method: "eth_accounts" });
			return accounts[0] || null;
		} catch {
			return null;
		}
	}

	/**
	 * Get interface for LootiScript exposure
	 */
	getInterface(): WalletAPI {
		const service = this;

		// Ensure initialization
		if (!this.initialized) {
			// Initialize asynchronously but don't block
			this.initialize().catch(() => {
				// Silent fail if not in Mini App
			});
		}

		return {
			isConnected: () => {
				return !!service.provider;
			},

			connect: async () => {
				await service.initialize();
				if (!service.provider) {
					throw new Error("Wallet not available");
				}
				await service.provider.request({ method: "eth_requestAccounts" });
			},

			getAddress: async () => {
				await service.initialize();
				return service.getCurrentAddress();
			},

			getChainId: async () => {
				await service.initialize();
				if (!service.provider) return 0;
				try {
					const chainId = await service.provider.request({
						method: "eth_chainId",
					});
					return parseInt(chainId, 16);
				} catch {
					return 0;
				}
			},

			sendTransaction: async (tx: TransactionRequest) => {
				await service.initialize();
				if (!service.provider) {
					throw new Error("Wallet not available");
				}

				const txParams: any = {
					to: tx.to,
				};

				if (tx.value) txParams.value = tx.value;
				if (tx.data) txParams.data = tx.data;
				if (tx.gas) txParams.gas = tx.gas;
				if (tx.gasPrice) txParams.gasPrice = tx.gasPrice;

				try {
					const hash = await service.provider.request({
						method: "eth_sendTransaction",
						params: [txParams],
					});
					return hash;
				} catch (err: any) {
					throw new Error(err?.message || "Transaction failed");
				}
			},

			signMessage: async (message: string) => {
				await service.initialize();
				if (!service.provider) {
					throw new Error("Wallet not available");
				}

				const address = await service.getCurrentAddress();
				if (!address) {
					throw new Error("No account connected");
				}

				try {
					return await service.provider.request({
						method: "personal_sign",
						params: [message, address],
					});
				} catch (err: any) {
					throw new Error(err?.message || "Message signing failed");
				}
			},

			onAccountsChanged: (callback: (accounts: string[]) => void) => {
				service.initialize().then(() => {
					if (service.provider && service.provider.on) {
						service.provider.on("accountsChanged", callback);
					}
				});
			},

			onChainChanged: (callback: (chainId: number) => void) => {
				service.initialize().then(() => {
					if (service.provider && service.provider.on) {
						service.provider.on("chainChanged", (chainId: string) => {
							callback(parseInt(chainId, 16));
						});
					}
				});
			},
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		this.provider = null;
		this.initialized = false;
	}
}
