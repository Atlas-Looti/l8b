/**
 * Contract Import Command
 *
 * Entry point for the contract import command
 */

import { createUseCases } from "../infrastructure/adapters/factories";
import { isFailure } from "../core/types";

export interface ContractImportOptions {
	/** Contract address */
	address: string;
	/** Chain name (base, ethereum, optimism, arbitrum) */
	chain: string;
	/** Contract name for the generated wrapper */
	name: string;
	/** Project root path */
	projectPath?: string;
	/** API key for block explorer (optional) */
	apiKey?: string;
}

/**
 * Import contract and generate wrapper
 */
export async function contractImport(options: ContractImportOptions): Promise<void> {
	const useCases = createUseCases();
	const result = await useCases.importContractUseCase.execute({
		address: options.address,
		chain: options.chain,
		name: options.name,
		projectPath: options.projectPath || process.cwd(),
		apiKey: options.apiKey,
	});

	if (isFailure(result)) {
		throw result.error;
	}
}
