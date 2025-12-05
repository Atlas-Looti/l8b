/**
 * Core Types
 *
 * All type definitions, entities, and shared types
 */

import type { Resources } from "@l8b/runtime";

export type { Resources };

export type CompiledRoutine = unknown;

export interface SerializedRoutine {
	data: unknown;
	metadata?: Record<string, unknown>;
}

export interface CompiledModule {
	name: string;
	routine: CompiledRoutine;
	filename: string;
}

export interface OGImageOptions {
	routePath: string;
	params: Record<string, string>;
	width?: number;
	height?: number;
}

export interface LootiLoggingConfig {
	browser?: {
		lifecycle?: boolean;
		canvas?: boolean;
	};
	terminal?: {
		lifecycle?: boolean;
		canvas?: boolean;
		listener?: boolean;
		errors?: boolean;
	};
}

export interface FarcasterEmbedConfig {
	imageUrl?: string;
	dynamicImage?: boolean;
	ogImageFunction?: string;
	buttonTitle: string;
	actionType?: "launch_frame" | "view_token";
	actionUrl?: string;
	appName?: string;
	splashImageUrl?: string;
	splashBackgroundColor?: string;
}

export interface FarcasterManifestConfig {
	accountAssociation: {
		header: string;
		payload: string;
		signature: string;
	};
	miniapp: {
		version: "1";
		name: string;
		iconUrl: string;
		homeUrl: string;
		imageUrl?: string;
		buttonTitle?: string;
		splashImageUrl?: string;
		splashBackgroundColor?: string;
		webhookUrl?: string;
		description?: string;
		subtitle?: string;
		screenshotUrls?: string[];
		primaryCategory?: string;
		tags?: string[];
		heroImageUrl?: string;
		tagline?: string;
		ogTitle?: string;
		ogDescription?: string;
		ogImageUrl?: string;
		castShareUrl?: string;
	};
}

export interface LootiConfig {
	name: string;
	orientation: "portrait" | "landscape" | "any";
	aspect: string;
	canvas?: {
		id?: string;
		width?: number;
		height?: number;
	};
	width?: number;
	height?: number;
	url?: string;
	dev?: {
		port?: number;
		host?: string | boolean;
		watch?: boolean;
		hotReload?: boolean;
	};
	logging?: LootiLoggingConfig;
	farcaster?: {
		manifest?: FarcasterManifestConfig;
		embeds?: Record<string, FarcasterEmbedConfig>;
	};
	}

export type Result<T, E = Error> =
	| { success: true; data: T }
	| { success: false; error: E };

export function success<T>(data: T): Result<T, never> {
	return { success: true, data };
}

export function failure<E>(error: E): Result<never, E> {
	return { success: false, error };
}

export function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
	return result.success === true;
}

export function isFailure<T, E>(result: Result<T, E>): result is { success: false; error: E } {
	return result.success === false;
}

export function mapResult<T, U, E>(result: Result<T, E>, fn: (data: T) => U): Result<U, E> {
	if (isSuccess(result)) {
		return success(fn(result.data));
	}
	return result;
}

export function flatMapResult<T, U, E>(result: Result<T, E>, fn: (data: T) => Result<U, E>): Result<U, E> {
	if (isSuccess(result)) {
		return fn(result.data);
	}
	return result;
}

export function unwrap<T, E>(result: Result<T, E>): T {
	if (isSuccess(result)) {
		return result.data;
	}
	throw result.error;
}

export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
	if (isSuccess(result)) {
		return result.data;
	}
	return defaultValue;
}

export interface ServerInstance {
	listen(port: number, host: string, callback?: () => void): ServerInstance;
	close(callback?: () => void): void;
	address(): { port: number; address: string; family: string } | string | null;
	on(event: "error", handler: (error: Error) => void): ServerInstance;
	on(event: "listening", handler: () => void): ServerInstance;
	on(event: "close", handler: () => void): ServerInstance;
	on(event: string, handler: (...args: unknown[]) => void): ServerInstance;
}

export function isServerInstance(value: unknown): value is ServerInstance {
	return (
		typeof value === "object" &&
		value !== null &&
		"listen" in value &&
		"close" in value &&
		"address" in value &&
		typeof (value as ServerInstance).listen === "function" &&
		typeof (value as ServerInstance).close === "function"
	);
}

export type ViteDevServer = import("vite").ViteDevServer;

export interface ABIInput {
	name?: string;
	type: string;
	indexed?: boolean;
	internalType?: string;
	components?: ABIInput[];
}

export interface ABIOutput {
	name?: string;
	type: string;
	internalType?: string;
	components?: ABIOutput[];
}

export interface ABIItem {
	type: "function" | "event" | "constructor" | "fallback" | "receive";
	name?: string;
	inputs?: ABIInput[];
	outputs?: ABIOutput[];
	stateMutability?: "pure" | "view" | "nonpayable" | "payable";
	anonymous?: boolean;
}

export type ContractABI = ABIItem[];

export type Diagnostic = unknown;

