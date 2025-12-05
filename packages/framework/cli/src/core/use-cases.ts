/**
 * Use Cases
 *
 * All application use cases
 */

import path from "path";
import type { CompiledModule, LootiConfig, Resources, Result } from "./types";
import { success, failure } from "./types";
import { BuildError, ConfigError, ServerError } from "../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES } from "../utils/paths";
import type {
	IBundler,
	ICompiler,
	IConfigLoader,
	IHTMLGenerator,
	IResourceDetector,
	ISourceLoader,
	IFileSystem,
	ILogger,
	IContractFetcher,
	IDevServer,
	DevServerOptions,
	CompileResult,
} from "./ports";
import type { BuildService } from "./services/build.service";
import type { ViteDevServer } from "./types";

export class LoadConfigUseCase {
	constructor(private configLoader: IConfigLoader) {}

	async execute(projectPath: string): Promise<Result<LootiConfig, ConfigError>> {
		if (!projectPath || typeof projectPath !== "string") {
			return failure(new ConfigError("Invalid project path", { projectPath }));
		}
		try {
			const config = await this.configLoader.loadConfig(projectPath);
			if (!config.name || typeof config.name !== "string") {
				return failure(new ConfigError("Configuration must have a valid 'name' field"));
			}
			return success(config);
		} catch (error) {
			if (error instanceof ConfigError) return failure(error);
			return failure(new ConfigError("Failed to load configuration", { originalError: error }));
		}
	}

	getCanvasSize(config: LootiConfig): Result<{ width: number; height: number }, ConfigError> {
		if (!config) return failure(new ConfigError("Configuration is required"));
		try {
			return success(this.configLoader.getCanvasSize(config));
		} catch (error) {
			return failure(new ConfigError("Failed to get canvas size", { originalError: error }));
		}
	}
}

export class LoadSourcesUseCase {
	constructor(private sourceLoader: ISourceLoader) {}

	async execute(projectPath: string): Promise<Result<Record<string, string>, ConfigError>> {
		if (!projectPath || typeof projectPath !== "string") {
			return failure(new ConfigError("Invalid project path", { projectPath }));
		}
		try {
			return success(await this.sourceLoader.loadSources(projectPath));
		} catch (error) {
			if (error instanceof ConfigError) return failure(error);
			return failure(new ConfigError("Failed to load sources", { originalError: error }));
		}
	}

	async readSourceContent(filePath: string): Promise<Result<string, ConfigError>> {
		if (!filePath || typeof filePath !== "string") {
			return failure(new ConfigError("Invalid file path", { filePath }));
		}
		try {
			return success(await this.sourceLoader.readSourceContent(filePath));
		} catch (error) {
			if (error instanceof ConfigError) return failure(error);
			return failure(new ConfigError("Failed to read source content", { originalError: error }));
		}
	}
}

export class DetectResourcesUseCase {
	constructor(private resourceDetector: IResourceDetector) {}

	async execute(projectPath: string): Promise<Result<Resources, ConfigError>> {
		if (!projectPath || typeof projectPath !== "string") {
			return failure(new ConfigError("Invalid project path", { projectPath }));
		}
		try {
			return success(await this.resourceDetector.detectResources(projectPath));
		} catch (error) {
			if (error instanceof ConfigError) return failure(error);
			return failure(new ConfigError("Failed to detect resources", { originalError: error }));
		}
	}
}

export class CompileSourcesUseCase {
	constructor(private compiler: ICompiler) {}

	async execute(sources: Record<string, string>, projectPath: string): Promise<Result<CompileResult, BuildError>> {
		if (!sources || typeof sources !== "object") {
			return failure(new BuildError("Invalid sources", { sources }));
		}
		if (!projectPath || typeof projectPath !== "string") {
			return failure(new BuildError("Invalid project path", { projectPath }));
		}
		try {
			return success(await this.compiler.compileSources(sources, projectPath));
		} catch (error) {
			if (error instanceof BuildError) return failure(error);
			return failure(new BuildError("Failed to compile sources", { originalError: error }));
		}
	}

	async saveCompiled(compiled: CompiledModule[], outputDir: string): Promise<Result<void, BuildError>> {
		if (!Array.isArray(compiled)) {
			return failure(new BuildError("Invalid compiled modules", { compiled }));
		}
		if (!outputDir || typeof outputDir !== "string") {
			return failure(new BuildError("Invalid output directory", { outputDir }));
		}
		try {
			await this.compiler.saveCompiled(compiled, outputDir);
			return success(undefined);
		} catch (error) {
			if (error instanceof BuildError) return failure(error);
			return failure(new BuildError("Failed to save compiled modules", { originalError: error }));
		}
	}
}

export class BundleRuntimeUseCase {
	constructor(private bundler: IBundler) {}

	async execute(distDir: string, projectPath: string): Promise<Result<void, BuildError>> {
		if (!distDir || typeof distDir !== "string") {
			return failure(new BuildError("Invalid dist directory", { distDir }));
		}
		if (!projectPath || typeof projectPath !== "string") {
			return failure(new BuildError("Invalid project path", { projectPath }));
		}
		try {
			await this.bundler.bundleRuntime(distDir, projectPath);
			return success(undefined);
		} catch (error) {
			if (error instanceof BuildError) return failure(error);
			return failure(new BuildError("Failed to bundle runtime", { originalError: error }));
		}
	}
}

export class GenerateHTMLUseCase {
	constructor(private htmlGenerator: IHTMLGenerator) {}

	execute(
		config: LootiConfig,
		sources: Record<string, string>,
		resources: Resources,
		compiledModules?: CompiledModule[],
		routePath?: string,
		env?: Record<string, string>,
	): string {
		return this.htmlGenerator.generateHTML(config, sources, resources, compiledModules, routePath, env);
	}

	generate404HTML(config: LootiConfig, isProduction?: boolean): string {
		return this.htmlGenerator.generate404HTML(config, isProduction);
	}
}

export interface InitProjectInput {
	name: string;
	force?: boolean;
}

export interface InitProjectOutput {
	projectPath: string;
	projectName: string;
}

export class InitProjectUseCase {
	constructor(
		private fileSystem: IFileSystem,
		private logger: ILogger,
	) {}

	async execute(input: InitProjectInput): Promise<Result<InitProjectOutput, Error>> {
		try {
			const cwd = process.cwd();
			const projectPath = path.resolve(cwd, input.name);
			const projectName = path.basename(projectPath);

			if (await this.fileSystem.pathExists(projectPath)) {
				if (input.force) {
					await this.fileSystem.remove(projectPath);
				} else {
					const files = await this.fileSystem.readdir(projectPath);
					if (files.length > 0) {
						return failure(new Error(`Directory ${input.name} is not empty. Use --force to overwrite existing files.`));
					}
				}
			}

			this.logger.info(`\n  ✨ Initializing LootiScript project in ${input.name}...\n`);

			await this.fileSystem.ensureDir(projectPath);
			await this.fileSystem.ensureDir(path.join(projectPath, DEFAULT_DIRS.SCRIPTS));
			await this.fileSystem.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC));
			await this.fileSystem.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, "sprites"));
			await this.fileSystem.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, "sounds"));
			await this.fileSystem.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, "maps"));
			await this.fileSystem.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, DEFAULT_DIRS.FONTS));

			const config = { name: projectName, orientation: "any", aspect: "free" };
			await this.fileSystem.writeJson(path.join(projectPath, DEFAULT_FILES.CONFIG), config, { spaces: 2 });

			const exampleScript = `t = 0

init = function()
  // Initialize game
end

update = function()
  t = t + 1
end

draw = function()
  // Clear screen with dark blue background
  screen.clear("#0c0c1c")
  
  // Draw animated text
  x = 0
  y = 0
  text = "Hello, L8B!"
  size = 8
  color = "#ffffff"
  screen.drawText(text, x, y, size, color)
  
  // Draw a simple animated circle
  cx = 0
  cy = 20
  radius = 5 + sin(t / 10) * 2
  screen.drawCircle(cx, cy, radius, "#00ff88")
end
`;

			await this.fileSystem.writeFile(path.join(projectPath, DEFAULT_DIRS.SCRIPTS, "main.loot"), exampleScript);

			const gitignore = `node_modules
.l8b
dist
.DS_Store
`;
			await this.fileSystem.writeFile(path.join(projectPath, ".gitignore"), gitignore);

			const packageJson = {
				name: projectName,
				version: "0.0.0",
				private: true,
				type: "module",
				scripts: { dev: "l8b dev", build: "l8b build", start: "l8b start" },
				dependencies: {},
				devDependencies: { "@l8b/cli": "latest" },
			};
			await this.fileSystem.writeJson(path.join(projectPath, DEFAULT_FILES.PACKAGE_JSON), packageJson, { spaces: 2 });

			return success({ projectPath, projectName });
		} catch (error) {
			return failure(error instanceof Error ? error : new Error(String(error)));
		}
	}
}

export interface ImportContractInput {
	address: string;
	chain: string;
	name: string;
	projectPath: string;
	apiKey?: string;
}

export interface ImportContractOutput {
	filePath: string;
	contractName: string;
}

export class ImportContractUseCase {
	constructor(
		private contractFetcher: IContractFetcher,
		private fileSystem: IFileSystem,
		private logger: ILogger,
	) {}

	async execute(input: ImportContractInput): Promise<Result<ImportContractOutput, Error>> {
		try {
			const { generateLootiScriptWrapper } = await import("../../infrastructure/adapters/generator/contract-wrapper-generator.adapter");
			const contractsDir = path.join(input.projectPath, DEFAULT_DIRS.SCRIPTS, "contracts");

			await this.fileSystem.ensureDir(contractsDir);
			this.logger.info(`\n  📦 Importing contract ${input.name} from ${input.chain}...\n`);
			this.logger.info(`  Fetching ABI from block explorer...`);

			const abi = await this.contractFetcher.fetchABI(input.address, input.chain, input.apiKey);
			this.logger.success(`  ✓ ABI fetched (${abi.length} items)\n`);
			this.logger.info(`  Generating LootiScript wrapper...`);

			const wrapper = generateLootiScriptWrapper(abi, input.address, input.name);
			const fileName = `${input.name.toLowerCase()}.loot`;
			const filePath = path.join(contractsDir, fileName);
			await this.fileSystem.writeFile(filePath, wrapper);

			this.logger.success(`  ✓ Wrapper generated: ${fileName}\n`);
			this.logger.info("  Usage:");
			this.logger.info(`    local ${input.name} = require("contracts/${input.name.toLowerCase()}")\n`);

			return success({ filePath, contractName: input.name });
		} catch (error) {
			return failure(error instanceof Error ? error : new Error(String(error)));
		}
	}
}

export interface StartDevServerInput {
	projectPath: string;
	options?: DevServerOptions;
}

export interface StartDevServerOutput {
	server: ViteDevServer;
}

export class StartDevServerUseCase {
	constructor(private devServer: IDevServer) {}

	async execute(input: StartDevServerInput): Promise<Result<StartDevServerOutput, ServerError>> {
		if (!input.projectPath || typeof input.projectPath !== "string") {
			return failure(new ServerError("Invalid project path", { projectPath: input.projectPath }));
		}
		try {
			const server = await this.devServer.start(input.projectPath, input.options);
			return success({ server });
		} catch (error) {
			if (error instanceof ServerError) return failure(error);
			return failure(new ServerError("Failed to start dev server", { originalError: error }));
		}
	}
}

export interface BuildProjectInput {
	projectPath: string;
}

export interface BuildProjectOutput {
	distDir: string;
}

export class BuildProjectUseCase {
	constructor(private buildService: BuildService) {}

	async execute(input: BuildProjectInput): Promise<Result<BuildProjectOutput, Error>> {
		return await this.buildService.build({ projectPath: input.projectPath });
	}
}

