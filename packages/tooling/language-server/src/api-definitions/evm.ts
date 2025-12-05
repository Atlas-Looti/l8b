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
			multicall: {
				type: "method",
				signature: "evm.multicall(requests: Array<{address: string, abi: any, functionName: string, args?: any[]}>)",
				description: "Batch multiple contract reads in a single call (optimize performance)",
			},
			watchEvent: {
				type: "method",
				signature: "evm.watchEvent(contractAddress: string, abi: any, eventName: string, filterOptions?: object, onEvent?: function)",
				description: "Watch contract events in real-time. Returns unsubscribe function",
			},
			getEventLogs: {
				type: "method",
				signature: "evm.getEventLogs(contractAddress: string, abi: any, eventName: string, filterOptions?: object)",
				description: "Get historical event logs from a contract",
			},
			getTransactionReceipt: {
				type: "method",
				signature: "evm.getTransactionReceipt(txHash: string)",
				description: "Get transaction receipt with status, gas used, logs, etc.",
			},
			estimateGas: {
				type: "method",
				signature: "evm.estimateGas(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Estimate gas cost for a contract write operation",
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
