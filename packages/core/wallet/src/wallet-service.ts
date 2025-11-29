/**
 * Wallet Service - Farcaster wallet operations
 */

import { sdk } from "@farcaster/miniapp-sdk";
import type {
	TransactionRequest,
	WalletAPI,
	BatchCall,
	BatchTransactionResult,
} from "./types";

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

			sendBatch: async (
				calls: BatchCall[],
			): Promise<BatchTransactionResult> => {
				await service.initialize();
				if (!service.provider) {
					throw new Error("Wallet not available");
				}

				try {
					// Get current chain ID
					const chainIdHex = await service.provider.request({
						method: "eth_chainId",
					});

					// EIP-5792 wallet_sendCalls
					const result = await service.provider.request({
						method: "wallet_sendCalls",
						params: [
							{
								version: "1.0",
								chainId: chainIdHex,
								calls: calls.map((call) => ({
									to: call.to,
									value: call.value || "0x0",
									data: call.data || "0x",
								})),
							},
						],
					});

					// Result format: { id: string } or { hash: string, transactions: string[] }
					if (result.hash) {
						return {
							hash: result.hash,
							transactions: result.transactions || [result.hash],
						};
					}

					// If we get an ID, we need to wait for the batch to complete
					// For now, return the ID as the hash
					return {
						hash: result.id || result.hash || "",
						transactions: calls.map(() => result.id || result.hash || ""),
					};
				} catch (err: any) {
					// Fallback: if wallet_sendCalls is not supported, send transactions sequentially
					if (
						err?.code === -32601 ||
						err?.message?.includes("not supported") ||
						err?.message?.includes("Method not found")
					) {
						const hashes: string[] = [];
						for (const call of calls) {
							const hash = await service.provider.request({
								method: "eth_sendTransaction",
								params: [
									{
										to: call.to,
										value: call.value || "0x0",
										data: call.data || "0x",
									},
								],
							});
							hashes.push(hash);
						}
						return {
							hash: hashes[0] || "",
							transactions: hashes,
						};
					}
					throw new Error(err?.message || "Batch transaction failed");
				}
			},

			switchChain: async (chainId: number): Promise<void> => {
				await service.initialize();
				if (!service.provider) {
					throw new Error("Wallet not available");
				}

				try {
					await service.provider.request({
						method: "wallet_switchEthereumChain",
						params: [{ chainId: `0x${chainId.toString(16)}` }],
					});
				} catch (err: any) {
					// If chain is not added, we might need to add it first
					if (err?.code === 4902) {
						throw new Error(
							`Chain ${chainId} is not added to wallet. Please add it manually.`,
						);
					}
					throw new Error(err?.message || "Failed to switch chain");
				}
			},

			waitForTx: async (
				txHash: string,
				confirmations: number = 1,
				timeout: number = 300000, // 5 minutes default
			): Promise<{
				status: "confirmed" | "failed" | "timeout";
				blockNumber?: number;
				confirmations?: number;
			}> => {
				await service.initialize();
				if (!service.provider) {
					throw new Error("Wallet not available");
				}

				const startTime = Date.now();
				let lastBlockNumber = 0;
				let currentConfirmations = 0;

				return new Promise((resolve, reject) => {
					const checkTx = async () => {
						try {
							// Check if timeout exceeded
							if (Date.now() - startTime > timeout) {
								resolve({
									status: "timeout",
									blockNumber: lastBlockNumber,
									confirmations: currentConfirmations,
								});
								return;
							}

							// Get transaction receipt
							const receipt = await service.provider.request({
								method: "eth_getTransactionReceipt",
								params: [txHash],
							});

							if (receipt) {
								// Transaction is mined
								if (receipt.status === "0x0") {
									resolve({
										status: "failed",
										blockNumber: parseInt(receipt.blockNumber, 16),
										confirmations: 0,
									});
									return;
								}

								// Get current block number
								const currentBlock = await service.provider.request({
									method: "eth_blockNumber",
								});
								const currentBlockNumber = parseInt(currentBlock, 16);
								const txBlockNumber = parseInt(receipt.blockNumber, 16);
								currentConfirmations = currentBlockNumber - txBlockNumber + 1;

								if (currentConfirmations >= confirmations) {
									resolve({
										status: "confirmed",
										blockNumber: txBlockNumber,
										confirmations: currentConfirmations,
									});
									return;
								}

								lastBlockNumber = txBlockNumber;
							}

							// Poll again after 2 seconds
							setTimeout(checkTx, 2000);
						} catch (err: any) {
							reject(new Error(err?.message || "Failed to check transaction"));
						}
					};

					checkTx();
				});
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
