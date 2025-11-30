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
import type { EVMAPI } from "./types";

export class EVMService {
	private provider: any = null;
	private publicClient: PublicClient | null = null;
	private walletClient: WalletClient | null = null;
	private initialized: boolean = false;
	private defaultChain = base;

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
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		this.provider = null;
		this.publicClient = null;
		this.walletClient = null;
		this.initialized = false;
	}
}
