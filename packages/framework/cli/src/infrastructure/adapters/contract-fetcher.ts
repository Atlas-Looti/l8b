/**
 * Block Explorer Fetcher Adapter
 *
 * Implementation of IContractFetcher for fetching ABIs from block explorers
 */

import type { IContractFetcher } from "../../core/ports";
import type { ContractABI } from "../../core/types";

/**
 * Chain configuration for block explorers
 */
const CHAIN_CONFIG: Record<
	string,
	{
		explorer: string;
		apiUrl: string;
	}
> = {
	base: {
		explorer: "Basescan",
		apiUrl: "https://api.basescan.org/api",
	},
	ethereum: {
		explorer: "Etherscan",
		apiUrl: "https://api.etherscan.io/api",
	},
	optimism: {
		explorer: "Optimistic Etherscan",
		apiUrl: "https://api-optimistic.etherscan.io/api",
	},
	arbitrum: {
		explorer: "Arbiscan",
		apiUrl: "https://api.arbiscan.io/api",
	},
};

export class BlockExplorerFetcher implements IContractFetcher {
	async fetchABI(address: string, chain: string, apiKey?: string): Promise<ContractABI> {
		const config = CHAIN_CONFIG[chain.toLowerCase()];
		if (!config) {
			throw new Error(`Unsupported chain: ${chain}. Supported chains: ${Object.keys(CHAIN_CONFIG).join(", ")}`);
		}

		// Try to get API key from environment if not provided
		const key = apiKey || process.env[`${chain.toUpperCase()}_API_KEY`] || "";

		const url = `${config.apiUrl}?module=contract&action=getabi&address=${address}&apikey=${key}`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.status === "0" && data.message === "NOTOK") {
				if (data.result === "Max rate limit reached") {
					throw new Error(
						`Rate limit reached. Please provide an API key: ${config.explorer} API key via --api-key or ${chain.toUpperCase()}_API_KEY environment variable`,
					);
				}
				throw new Error(`Failed to fetch ABI: ${data.result}`);
			}

			if (data.status === "1" && data.result) {
				return JSON.parse(data.result);
			}

			throw new Error("Invalid response from block explorer");
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error("Failed to fetch ABI from block explorer");
		}
	}
}
