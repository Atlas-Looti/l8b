/**
 * Shared Vite configuration for L8B runtime examples
 * Suppresses common warnings and optimizes bundle configuration
 */
export const sharedConfig = {
	build: {
		// Suppress eval warnings from lootiscript transpiler
		// The transpiler legitimately uses eval for runtime code generation
		rollupOptions: {
			onwarn(warning: any, warn: any) {
				// Suppress eval warnings from lootiscript package
				if (warning.code === "EVAL" && warning.message?.includes("lootiscript")) {
					return;
				}

				// Suppress pure annotation warnings from ox package
				if (warning.code === "INVALID_ANNOTATION" && warning.message?.includes("/*#__PURE__*/")) {
					return;
				}

				// Show all other warnings
				warn(warning);
			},
			output: {
				// Code-split vendor dependencies to reduce chunk size
				manualChunks(id: string) {
					// Split large dependencies into separate chunks
					if (id.includes("node_modules")) {
						if (id.includes("viem") || id.includes("ox")) {
							return "vendor-web3";
						}
						if (id.includes("@farcaster") || id.includes("@solana")) {
							return "vendor-blockchain";
						}
						if (id.includes("jose") || id.includes("uuid")) {
							return "vendor-utils";
						}
						// All other vendor code
						return "vendor";
					}

					// Split lootiscript into its own chunk
					if (id.includes("lootiscript")) {
						return "lootiscript-runtime";
					}
				},
			},
		},
		// Increase chunk size warning limit
		chunkSizeWarningLimit: 1000,
	},
};
