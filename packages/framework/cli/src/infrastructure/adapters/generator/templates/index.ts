/**
 * Template Generators
 *
 * Centralized exports for all HTML template generators
 */

export { generateHTMLTemplate, type HTMLTemplateOptions } from "./html-template";
export { generateStyles } from "./styles-generator";
export {
	generateDevelopmentImports,
	generateProductionImports,
	type ModuleImports,
} from "./module-imports-generator";
export { generateRuntimeScript, type RuntimeScriptOptions } from "./runtime-script-generator";
export { generateCanvasHelpers } from "./canvas-helpers";
export { generateLoggingHelpers, type LoggingHelpersOptions } from "./logging-helpers";
export { generateErrorHandler } from "./error-handler";
export { generateRuntimeSettings, type RuntimeSettingsOptions } from "./runtime-settings";
export { generateResizeHandler } from "./resize-handler";
export { generateHTTPLogger } from "./http-logger";
