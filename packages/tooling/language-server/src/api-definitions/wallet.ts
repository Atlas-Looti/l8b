/**
 * Wallet API definitions
 */

import type { GlobalApi } from "../types";

export const walletApi: Partial<GlobalApi> = {
	wallet: {
		type: "object",
		description: "Wallet operations for Farcaster Mini Apps",
		properties: {
			isConnected: {
				type: "method",
				signature: "wallet.isConnected()",
				description: "Check if wallet is connected",
			},
			connect: {
				type: "method",
				signature: "wallet.connect()",
				description: "Connect to wallet",
			},
			getAddress: {
				type: "method",
				signature: "wallet.getAddress()",
				description: "Get connected wallet address",
			},
			getChainId: {
				type: "method",
				signature: "wallet.getChainId()",
				description: "Get current chain ID",
			},
			sendTransaction: {
				type: "method",
				signature:
					"wallet.sendTransaction({to: string, value?: string, data?: string})",
				description: "Send a transaction",
			},
			signMessage: {
				type: "method",
				signature: "wallet.signMessage(message: string)",
				description: "Sign a message",
			},
		},
	},
};
