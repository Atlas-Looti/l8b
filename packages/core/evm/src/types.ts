/**
 * EVM API types for blockchain operations
 */

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

	// Utility
	getBalance(address?: string): Promise<string>;
	formatEther(value: string): string;
	parseEther(value: string): string;
}
