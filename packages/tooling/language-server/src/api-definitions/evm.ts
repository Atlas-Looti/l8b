/**
 * EVM API definitions
 */

import type { GlobalApi } from "../types";

export const evmApi: Partial<GlobalApi> = {
	evm: {
		type: "object",
		description: "EVM blockchain operations using viem",
		properties: {
			read: {
				type: "method",
				signature: "evm.read(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Read from smart contract (view function, no transaction)",
			},
			write: {
				type: "method",
				signature: "evm.write(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Write to smart contract (state-changing, sends transaction)",
			},
			call: {
				type: "method",
				signature: "evm.call(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Call/simulate contract function (no transaction)",
			},
			getBalance: {
				type: "method",
				signature: "evm.getBalance(address?: string)",
				description: "Get ETH balance for an address",
			},
			formatEther: {
				type: "method",
				signature: "evm.formatEther(value: string)",
				description: "Format wei to ether (wei / 10^18)",
			},
			parseEther: {
				type: "method",
				signature: "evm.parseEther(value: string)",
				description: "Parse ether to wei (ether * 10^18)",
			},
		},
	},
};
