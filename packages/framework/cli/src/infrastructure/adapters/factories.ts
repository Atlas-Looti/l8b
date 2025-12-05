/**
 * Dependency Injection Factories
 *
 * Factory functions to create and wire up dependencies
 * Uses DI container for dependency management
 */

import { InitController } from "../../controllers/init";
import { DI_KEYS } from "../../core/di/definitions";
import { createContainer } from "../di/setup";
import type {
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

/**
 * Create all use cases using DI container
 */
export function createUseCases() {
	const container = createContainer();

	return {
		loadConfigUseCase: container.resolve<LoadConfigUseCase>(DI_KEYS.LOAD_CONFIG_USE_CASE),
		loadSourcesUseCase: container.resolve<LoadSourcesUseCase>(DI_KEYS.LOAD_SOURCES_USE_CASE),
		detectResourcesUseCase: container.resolve<DetectResourcesUseCase>(DI_KEYS.DETECT_RESOURCES_USE_CASE),
		compileSourcesUseCase: container.resolve<CompileSourcesUseCase>(DI_KEYS.COMPILE_SOURCES_USE_CASE),
		bundleRuntimeUseCase: container.resolve<BundleRuntimeUseCase>(DI_KEYS.BUNDLE_RUNTIME_USE_CASE),
		generateHTMLUseCase: container.resolve<GenerateHTMLUseCase>(DI_KEYS.GENERATE_HTML_USE_CASE),
		importContractUseCase: container.resolve<ImportContractUseCase>(DI_KEYS.IMPORT_CONTRACT_USE_CASE),
		initProjectUseCase: container.resolve<InitProjectUseCase>(DI_KEYS.INIT_PROJECT_USE_CASE),
		buildProjectUseCase: container.resolve<BuildProjectUseCase>(DI_KEYS.BUILD_PROJECT_USE_CASE),
		startDevServerUseCase: container.resolve<StartDevServerUseCase>(DI_KEYS.START_DEV_SERVER_USE_CASE),
	};
}

/**
 * Create all controllers
 */
export function createControllers() {
	const useCases = createUseCases();

	return {
		initController: new InitController(useCases.initProjectUseCase),
	};
}
