/**
 * Wallet API types for Farcaster Mini Apps integration
 */

export interface TransactionRequest {
	to: string;
	value?: string;
	data?: string;
	gas?: string;
	gasPrice?: string;
}

export interface BatchCall {
	to: string;
	value?: string;
	data?: string;
}

export interface BatchTransactionResult {
	hash: string;
	transactions: string[];
}

/**
 * Wallet API interface exposed to LootiScript
 */
export interface WalletAPI {
	// Connection
	isConnected(): boolean;
	connect(): Promise<void>;

	// Account
	getAddress(): Promise<string | null>;
	getChainId(): Promise<number>;

	// Transactions
	sendTransaction(tx: TransactionRequest): Promise<string>;
	signMessage(message: string): Promise<string>;

	// Batch transactions (EIP-5792)
	sendBatch(calls: BatchCall[]): Promise<BatchTransactionResult>;

	// Chain management
	switchChain(chainId: number): Promise<void>;

	// Transaction waiting
	waitForTx(
		txHash: string,
		confirmations?: number,
		timeout?: number,
	): Promise<{
		status: "confirmed" | "failed" | "timeout";
		blockNumber?: number;
		confirmations?: number;
	}>;

	// Events (callbacks not directly exposed to LootiScript, but available for internal use)
	onAccountsChanged(callback: (accounts: string[]) => void): void;
	onChainChanged(callback: (chainId: number) => void): void;
}
