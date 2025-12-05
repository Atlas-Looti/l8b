/**
 * Dependency Injection Keys
 *
 * Centralized keys for all registered services
 * Prevents typos and provides autocomplete
 */

export const DI_KEYS = {
	// Infrastructure
	FILE_SYSTEM: 'fileSystem',
	LOGGER: 'logger',
	
	// Loaders
	CONFIG_LOADER: 'configLoader',
	SOURCE_LOADER: 'sourceLoader',
	RESOURCE_DETECTOR: 'resourceDetector',
	
	// Compilers & Bundlers
	COMPILER: 'compiler',
	BUNDLER: 'bundler',
	
	// Generators
	HTML_GENERATOR: 'htmlGenerator',
	CONTRACT_FETCHER: 'contractFetcher',
	
	// Servers
	DEV_SERVER: 'devServer',
	
	// Use Cases
	LOAD_CONFIG_USE_CASE: 'loadConfigUseCase',
	LOAD_SOURCES_USE_CASE: 'loadSourcesUseCase',
	DETECT_RESOURCES_USE_CASE: 'detectResourcesUseCase',
	COMPILE_SOURCES_USE_CASE: 'compileSourcesUseCase',
	BUNDLE_RUNTIME_USE_CASE: 'bundleRuntimeUseCase',
	GENERATE_HTML_USE_CASE: 'generateHTMLUseCase',
	IMPORT_CONTRACT_USE_CASE: 'importContractUseCase',
	INIT_PROJECT_USE_CASE: 'initProjectUseCase',
	BUILD_PROJECT_USE_CASE: 'buildProjectUseCase',
	START_DEV_SERVER_USE_CASE: 'startDevServerUseCase',
} as const;

export type DIKey = typeof DI_KEYS[keyof typeof DI_KEYS];

