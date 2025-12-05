/**
 * Dependency Injection Setup
 *
 * Configures DI container with all services and use cases
 */

import { DIContainer } from "../../core/di/container";
import { DI_KEYS } from "../../core/di/definitions";
import { BuildService } from "../../core/services/build.service";
import {
	BuildProjectUseCase,
	BundleRuntimeUseCase,
	CompileSourcesUseCase,
	DetectResourcesUseCase,
	GenerateHTMLUseCase,
	ImportContractUseCase,
	InitProjectUseCase,
	LoadConfigUseCase,
	LoadSourcesUseCase,
	StartDevServerUseCase,
} from "../../core/use-cases";
import { LogLevel } from "../../core/ports";
import { EsbuildBundler } from "../adapters/bundler";
import { LootiScriptCompiler } from "../adapters/compiler";
import { ConfigLoader } from "../adapters/config-loader";
import { BlockExplorerFetcher } from "../adapters/contract-fetcher";
import { NodeFileSystem } from "../adapters/file-system";
import { HTMLGenerator } from "../adapters/generator/html-generator.adapter";
import { ResourceDetector } from "../adapters/resource-detector";
import { SourceLoader } from "../adapters/source-loader";
import { ConsoleLogger } from "../adapters/logger";
import { ViteDevServer } from "../adapters/vite-dev-server";

/**
 * Setup and configure DI container
 */
export function setupContainer(container: DIContainer): void {
	// Infrastructure services
	container.register(DI_KEYS.FILE_SYSTEM, () => new NodeFileSystem());
	container.register(DI_KEYS.LOGGER, () => new ConsoleLogger(LogLevel.INFO));

	// Loaders
	container.register(DI_KEYS.CONFIG_LOADER, () => {
		return new ConfigLoader(container.resolve(DI_KEYS.FILE_SYSTEM));
	});
	container.register(DI_KEYS.SOURCE_LOADER, () => {
		return new SourceLoader(container.resolve(DI_KEYS.FILE_SYSTEM), container.resolve(DI_KEYS.LOGGER));
	});
	container.register(DI_KEYS.RESOURCE_DETECTOR, () => {
		return new ResourceDetector(container.resolve(DI_KEYS.FILE_SYSTEM), container.resolve(DI_KEYS.LOGGER));
	});

	// Compilers & Bundlers
	container.register(DI_KEYS.COMPILER, () => {
		return new LootiScriptCompiler(container.resolve(DI_KEYS.FILE_SYSTEM), container.resolve(DI_KEYS.LOGGER));
	});
	container.register(DI_KEYS.BUNDLER, () => {
		return new EsbuildBundler(container.resolve(DI_KEYS.FILE_SYSTEM));
	});

	// Generators
	container.register(DI_KEYS.HTML_GENERATOR, () => new HTMLGenerator());
	container.register(DI_KEYS.CONTRACT_FETCHER, () => new BlockExplorerFetcher());

	// Use Cases
	container.register(DI_KEYS.LOAD_CONFIG_USE_CASE, () => {
		return new LoadConfigUseCase(container.resolve(DI_KEYS.CONFIG_LOADER));
	});
	container.register(DI_KEYS.LOAD_SOURCES_USE_CASE, () => {
		return new LoadSourcesUseCase(container.resolve(DI_KEYS.SOURCE_LOADER));
	});
	container.register(DI_KEYS.DETECT_RESOURCES_USE_CASE, () => {
		return new DetectResourcesUseCase(container.resolve(DI_KEYS.RESOURCE_DETECTOR));
	});
	container.register(DI_KEYS.COMPILE_SOURCES_USE_CASE, () => {
		return new CompileSourcesUseCase(container.resolve(DI_KEYS.COMPILER));
	});
	container.register(DI_KEYS.BUNDLE_RUNTIME_USE_CASE, () => {
		return new BundleRuntimeUseCase(container.resolve(DI_KEYS.BUNDLER));
	});
	container.register(DI_KEYS.GENERATE_HTML_USE_CASE, () => {
		return new GenerateHTMLUseCase(container.resolve(DI_KEYS.HTML_GENERATOR));
	});
	container.register(DI_KEYS.IMPORT_CONTRACT_USE_CASE, () => {
		return new ImportContractUseCase(
			container.resolve(DI_KEYS.CONTRACT_FETCHER),
			container.resolve(DI_KEYS.FILE_SYSTEM),
			container.resolve(DI_KEYS.LOGGER),
		);
	});
	container.register(DI_KEYS.INIT_PROJECT_USE_CASE, () => {
		return new InitProjectUseCase(container.resolve(DI_KEYS.FILE_SYSTEM), container.resolve(DI_KEYS.LOGGER));
	});

	// Services
	container.register("buildService", () => {
		return new BuildService(
			container.resolve(DI_KEYS.FILE_SYSTEM),
			container.resolve(DI_KEYS.LOGGER),
			container.resolve(DI_KEYS.LOAD_CONFIG_USE_CASE),
			container.resolve(DI_KEYS.LOAD_SOURCES_USE_CASE),
			container.resolve(DI_KEYS.DETECT_RESOURCES_USE_CASE),
			container.resolve(DI_KEYS.COMPILE_SOURCES_USE_CASE),
			container.resolve(DI_KEYS.BUNDLE_RUNTIME_USE_CASE),
			container.resolve(DI_KEYS.GENERATE_HTML_USE_CASE),
		);
	});

	// Use cases that depend on services
	container.register(DI_KEYS.BUILD_PROJECT_USE_CASE, () => {
		return new BuildProjectUseCase(container.resolve("buildService"));
	});
	container.register(DI_KEYS.START_DEV_SERVER_USE_CASE, () => {
		return new StartDevServerUseCase(
			new ViteDevServer(
				container.resolve(DI_KEYS.LOAD_CONFIG_USE_CASE),
				container.resolve(DI_KEYS.LOAD_SOURCES_USE_CASE),
				container.resolve(DI_KEYS.DETECT_RESOURCES_USE_CASE),
				container.resolve(DI_KEYS.GENERATE_HTML_USE_CASE),
			),
		);
	});
}

/**
 * Create a configured DI container
 */
export function createContainer(): DIContainer {
	const container = new DIContainer();
	setupContainer(container);
	return container;
}

