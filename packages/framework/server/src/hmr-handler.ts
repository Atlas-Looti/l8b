/**
 * HMR Handler - Processes file change events for Hot Module Replacement
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ProjectResources } from "@l8b/framework-shared";
import { createLogger } from "@l8b/framework-shared";
import type { ResolvedConfig } from "@l8b/framework-config";
import { compileSource } from "@l8b/compiler";
import type { HMRServer } from "./hmr";

const logger = createLogger("server");

export interface HMRHandlerContext {
	config: ResolvedConfig;
	resources: ProjectResources;
	hmr: HMRServer | null;
}

/**
 * Handle file change event
 */
export function handleFileChange(
	ctx: HMRHandlerContext,
	event: { type: string; path: string; resourceType: string | null },
): void {
	logger.info(`File ${event.type}: ${event.path}`);

	switch (event.resourceType) {
		case "source":
			handleSourceChange(ctx, event.path);
			break;

		case "sprite":
			handleSpriteChange(ctx, event.path);
			break;

		case "map":
			handleMapChange(ctx, event.path);
			break;

		default:
			ctx.hmr?.send({
				type: "full_reload",
			});
	}
}

/**
 * Handle source file change
 */
function handleSourceChange(ctx: HMRHandlerContext, filePath: string): void {
	const source = ctx.resources.sources.find((s) => filePath.endsWith(s.file));

	if (!source || !source.content) {
		logger.warn(`Source not found: ${filePath}`);
		return;
	}

	const result = compileSource(source.content, {
		filePath: source.file,
		moduleName: source.name,
		srcDir: ctx.config.srcPath,
	});

	if (!result.success) {
		const errorMsg =
			result.errors?.map((e) => `${e.file}:${e.line}: ${e.message}`).join("\n") || "Unknown compilation error";

		logger.error(`Compilation failed: ${errorMsg}`);

		ctx.hmr?.send({
			type: "error",
			error: errorMsg,
		});
		return;
	}

	ctx.hmr?.send({
		type: "source_updated",
		name: source.name,
		file: source.file,
		version: source.version,
		data: source.content,
	});

	logger.success(`Source updated: ${source.name}`);
}

/**
 * Handle sprite file change
 */
function handleSpriteChange(ctx: HMRHandlerContext, filePath: string): void {
	const sprite = ctx.resources.images.find((s) => filePath.endsWith(s.file));

	if (!sprite) {
		logger.warn(`Sprite not found: ${filePath}`);
		return;
	}

	const fullPath = join(ctx.config.publicPath, "sprites", sprite.file);
	if (!existsSync(fullPath)) {
		return;
	}

	const data = readFileSync(fullPath).toString("base64");

	ctx.hmr?.send({
		type: "sprite_updated",
		name: sprite.name,
		file: sprite.file,
		version: sprite.version,
		data,
		properties: sprite.properties,
	});

	logger.success(`Sprite updated: ${sprite.name}`);
}

/**
 * Handle map file change
 */
function handleMapChange(ctx: HMRHandlerContext, filePath: string): void {
	const map = ctx.resources.maps.find((m) => filePath.endsWith(m.file));

	if (!map) {
		logger.warn(`Map not found: ${filePath}`);
		return;
	}

	ctx.hmr?.send({
		type: "map_updated",
		name: map.name,
		file: map.file,
		version: map.version,
		data: map.data,
	});

	logger.success(`Map updated: ${map.name}`);
}
