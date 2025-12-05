/**
 * EVM API types for blockchain operations
 */

/**
 * Multicall request for batch reads
 */
export interface MulticallRequest {
	address: string;
	abi: any;
	functionName: string;
	args?: any[];
}

/**
 * Event filter options for watching contract events
 */
export interface EventFilterOptions {
	fromBlock?: number | "latest" | "earliest" | "pending";
	toBlock?: number | "latest" | "earliest" | "pending";
	args?: any;
}

/**
 * Transaction receipt result
 */
export interface TransactionReceipt {
	status: "success" | "reverted";
	transactionHash: string;
	blockNumber: string;
	gasUsed: string;
	effectiveGasPrice?: string;
	logs: any[];
	contractAddress?: string;
}

/**
 * EVM API interface exposed to LootiScript
 */
export interface EVMAPI {
	// Read operations (view functions, no transaction)
	read(contractAddress: string, abi: any, functionName: string, args?: any[]): Promise<any>;

	// Write operations (state-changing, sends transaction)
	write(contractAddress: string, abi: any, functionName: string, args?: any[]): Promise<string>;

	// Call operations (simulate/estimate, no transaction)
	call(contractAddress: string, abi: any, functionName: string, args?: any[]): Promise<any>;

	// Batch operations
	multicall(requests: MulticallRequest[]): Promise<any[]>;

	// Event operations
	watchEvent(
		contractAddress: string,
		abi: any,
		eventName: string,
		filterOptions?: EventFilterOptions,
		onEvent?: (event: any) => void,
	): Promise<() => void>; // Returns unsubscribe function

	getEventLogs(
		contractAddress: string,
		abi: any,
		eventName: string,
		filterOptions?: EventFilterOptions,
	): Promise<any[]>;

	// Transaction utilities
	getTransactionReceipt(txHash: string): Promise<TransactionReceipt>;
	estimateGas(contractAddress: string, abi: any, functionName: string, args?: any[]): Promise<string>;

	// Utility
	getBalance(address?: string): Promise<string>;
	formatEther(value: string): string;
	parseEther(value: string): string;
}
