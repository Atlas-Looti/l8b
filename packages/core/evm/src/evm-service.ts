/**
 * EVM Service - Blockchain operations using viem
 */

import { sdk } from "@farcaster/miniapp-sdk";
import {
	createPublicClient,
	createWalletClient,
	custom,
	type PublicClient,
	formatEther as viemFormatEther,
	parseEther as viemParseEther,
	type WalletClient,
} from "viem";
import { base } from "viem/chains";
import type { EVMAPI, EventFilterOptions, MulticallRequest, TransactionReceipt } from "./types";

export class EVMService {
	private provider: any = null;
	private publicClient: PublicClient | null = null;
	private walletClient: WalletClient | null = null;
	private initialized: boolean = false;
	private defaultChain = base;
	private eventWatchers: Map<string, () => void> = new Map();

	constructor() {
		// Lazy initialization
	}

	/**
	 * Initialize EVM clients from Farcaster SDK
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

			if (this.provider) {
				// Public client for reads - use custom transport to use provider's RPC
				this.publicClient = createPublicClient({
					chain: this.defaultChain,
					transport: custom(this.provider),
				}) as PublicClient;

				// Wallet client for writes
				this.walletClient = createWalletClient({
					chain: this.defaultChain,
					transport: custom(this.provider),
				}) as WalletClient;
			}
		} catch (err) {
			// Not in Mini App environment or dependencies not available
			this.provider = null;
		}
	}

	/**
	 * Get current address from provider
	 */
	private async getCurrentAddress(): Promise<string | null> {
		if (!this.provider) return null;
		try {
			const accounts = await this.provider.request({
				method: "eth_accounts",
			});
			return accounts[0] || null;
		} catch {
			return null;
		}
	}

	/**
	 * Get interface for LootiScript exposure
	 */
	getInterface(): EVMAPI {
		// Ensure initialization
		if (!this.initialized) {
			// Initialize asynchronously but don't block
			this.initialize().catch(() => {
				// Silent fail if not in Mini App
			});
		}

		return {
			read: async (contractAddress: string, abi: any, functionName: string, args?: any[]) => {
				await this.initialize();
				if (!this.publicClient) {
					throw new Error("EVM read not available");
				}

				try {
					return await this.publicClient.readContract({
						address: contractAddress as `0x${string}`,
						abi,
						functionName,
						args: args || [],
					});
				} catch (err: any) {
					throw new Error(err?.message || "Read contract failed");
				}
			},

			write: async (contractAddress: string, abi: any, functionName: string, args?: any[]) => {
				await this.initialize();
				if (!this.walletClient) {
					throw new Error("EVM write not available");
				}

				try {
					const [account] = await this.walletClient.getAddresses();
					if (!account) {
						throw new Error("No account connected");
					}

					const hash = await this.walletClient.writeContract({
						address: contractAddress as `0x${string}`,
						abi,
						functionName,
						args: args || [],
						account,
						chain: this.defaultChain,
					});

					return hash;
				} catch (err: any) {
					throw new Error(err?.message || "Write contract failed");
				}
			},

			call: async (contractAddress: string, abi: any, functionName: string, args?: any[]) => {
				await this.initialize();
				if (!this.publicClient) {
					throw new Error("EVM call not available");
				}

				try {
					// Simulate contract call
					const result = await this.publicClient.simulateContract({
						address: contractAddress as `0x${string}`,
						abi,
						functionName,
						args: args || [],
					});

					return result;
				} catch (err: any) {
					throw new Error(err?.message || "Call contract failed");
				}
			},

			getBalance: async (address?: string) => {
				await this.initialize();
				if (!this.publicClient) {
					return "0";
				}

				try {
					const addr = address || (await this.getCurrentAddress());
					if (!addr) {
						return "0";
					}

					const balance = await this.publicClient.getBalance({
						address: addr as `0x${string}`,
					});

					return balance.toString();
				} catch {
					return "0";
				}
			},

			formatEther: (value: string) => {
				try {
					return viemFormatEther(BigInt(value));
				} catch {
					return "0";
				}
			},

			parseEther: (value: string) => {
				try {
					return viemParseEther(value).toString();
				} catch {
					return "0";
				}
			},

			multicall: async (requests: MulticallRequest[]) => {
				await this.initialize();
				if (!this.publicClient) {
					throw new Error("EVM multicall not available");
				}

				try {
					const contracts = requests.map((req) => ({
						address: req.address as `0x${string}`,
						abi: req.abi,
						functionName: req.functionName,
						args: req.args || [],
					}));

					const results = await this.publicClient.multicall({
						contracts,
					});

					return results;
				} catch (err: any) {
					throw new Error(err?.message || "Multicall failed");
				}
			},

			watchEvent: async (
				contractAddress: string,
				abi: any,
				eventName: string,
				filterOptions?: EventFilterOptions,
				onEvent?: (event: any) => void,
			) => {
				await this.initialize();
				if (!this.publicClient) {
					throw new Error("EVM watch event not available");
				}

				try {
					const watcherKey = `${contractAddress}-${eventName}`;

					// Unsubscribe existing watcher if any
					const existingUnsubscribe = this.eventWatchers.get(watcherKey);
					if (existingUnsubscribe) {
						existingUnsubscribe();
					}

					const unwatch = this.publicClient.watchContractEvent({
						address: contractAddress as `0x${string}`,
						abi,
						eventName,
						args: filterOptions?.args,
						fromBlock: filterOptions?.fromBlock as any,
						onLogs: (logs) => {
							logs.forEach((log) => {
								if (onEvent) {
									onEvent(log);
								}
							});
						},
					});

					this.eventWatchers.set(watcherKey, unwatch);

					return unwatch;
				} catch (err: any) {
					throw new Error(err?.message || "Watch event failed");
				}
			},

			getEventLogs: async (contractAddress: string, abi: any, eventName: string, filterOptions?: EventFilterOptions) => {
				await this.initialize();
				if (!this.publicClient) {
					throw new Error("EVM get event logs not available");
				}

				try {
					const logs = await this.publicClient.getContractEvents({
						address: contractAddress as `0x${string}`,
						abi,
						eventName,
						args: filterOptions?.args,
						fromBlock: filterOptions?.fromBlock as any,
						toBlock: filterOptions?.toBlock as any,
					});

					return logs;
				} catch (err: any) {
					throw new Error(err?.message || "Get event logs failed");
				}
			},

			getTransactionReceipt: async (txHash: string): Promise<TransactionReceipt> => {
				await this.initialize();
				if (!this.publicClient) {
					throw new Error("EVM get transaction receipt not available");
				}

				try {
					const receipt = await this.publicClient.waitForTransactionReceipt({
						hash: txHash as `0x${string}`,
					});

					return {
						status: receipt.status === "success" ? "success" : "reverted",
						transactionHash: receipt.transactionHash,
						blockNumber: receipt.blockNumber.toString(),
						gasUsed: receipt.gasUsed.toString(),
						effectiveGasPrice: receipt.effectiveGasPrice?.toString(),
						logs: receipt.logs,
						contractAddress: receipt.contractAddress || undefined,
					};
				} catch (err: any) {
					throw new Error(err?.message || "Get transaction receipt failed");
				}
			},

			estimateGas: async (contractAddress: string, abi: any, functionName: string, args?: any[]): Promise<string> => {
				await this.initialize();
				if (!this.publicClient || !this.walletClient) {
					throw new Error("EVM estimate gas not available");
				}

				try {
					const [account] = await this.walletClient.getAddresses();
					if (!account) {
						throw new Error("No account connected");
					}

					const gasEstimate = await this.publicClient.estimateContractGas({
						address: contractAddress as `0x${string}`,
						abi,
						functionName,
						args: args || [],
						account,
					});

					return gasEstimate.toString();
				} catch (err: any) {
					throw new Error(err?.message || "Estimate gas failed");
				}
			},
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		// Unsubscribe all event watchers
		for (const unsubscribe of this.eventWatchers.values()) {
			unsubscribe();
		}
		this.eventWatchers.clear();

		this.provider = null;
		this.publicClient = null;
		this.walletClient = null;
		this.initialized = false;
	}
}
