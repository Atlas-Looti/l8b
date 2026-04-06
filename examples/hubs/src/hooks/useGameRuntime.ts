import { useRuntime, type UseRuntimeResult } from "./useRuntime";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { RuntimeBridge } from "@al8b/runtime";
import { getGame } from "../registry";

export interface GameRuntimeCallbacks {
	/** Called when the game sends a message via host.emit() */
	onMessage?: (message: unknown) => void;
}

export type GameRuntimeResult = UseRuntimeResult;

/**
 * React hook for managing game runtime in the hub application.
 *
 * This hook handles game-specific concerns like source fetching and registry lookup,
 * then delegates to useRuntime for runtime lifecycle management.
 *
 * @param gameId - The game identifier for registry lookup
 * @param canvasRef - React ref to the canvas element
 * @param callbacks - Optional callbacks (e.g., onMessage for game events)
 * @returns GameRuntimeResult with full runtime controls
 */
export function useGameRuntime(
	gameId: string,
	canvasRef: RefObject<HTMLCanvasElement | null>,
	callbacks: GameRuntimeCallbacks = {},
): GameRuntimeResult {
	const [resolvedOptions, setResolvedOptions] = useState<Parameters<typeof useRuntime>[1]>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const callbacksRef = useRef(callbacks);
	callbacksRef.current = callbacks;

	// Stable bridge so runtime doesn't recreate when callbacks change
	const bridgeRef = useRef<RuntimeBridge>({
		emit: (_name: string, payload: unknown) => {
			callbacksRef.current.onMessage?.(payload);
		},
	});

	// Fetch sources for the game
	useEffect(() => {
		const game = getGame(gameId);
		if (!game) {
			setFetchError(`Game "${gameId}" not found in registry`);
			setResolvedOptions(null);
			return;
		}

		let cancelled = false;

		async function fetchSources() {
			try {
				const baseUrl = `/games/${gameId}/`;

				// Fetch shared modules and game source files in parallel
				const [sharedEntries, gameEntries] = await Promise.all([
					// Shared modules (loaded first so game code can call them)
					Promise.all(
						["/shared/hud.loot"].map(async (path) => {
							const res = await fetch(path);
							if (!res.ok) throw new Error(`Failed to fetch shared module ${path}: ${res.status}`);
							const code = await res.text();
							const moduleName = path.split("/").pop()!.replace(/\.loot$/, "");
							return [moduleName, code] as const;
						}),
					),
					// Game source files
					Promise.all(
						game!.sources.map(async (filename) => {
							const url = `${baseUrl}src/${filename}`;
							const res = await fetch(url);
							if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
							const code = await res.text();
							const moduleName = filename.replace(/\.loot$/, "");
							return [moduleName, code] as const;
						}),
					),
				]);

				if (cancelled) return;

				const sources: Record<string, string> = {};
				// Shared modules first, then game modules
				for (const [name, code] of [...sharedEntries, ...gameEntries]) {
					sources[name] = code;
				}

				setFetchError(null);
				setResolvedOptions({
					canvas: canvasRef.current ?? undefined,
					width: game!.width,
					height: game!.height,
					url: baseUrl,
					sources,
					resources: game!.resources,
					bridge: bridgeRef.current,
					listener: {
						log: (message: string) => console.log(`[${gameId}]`, message),
						reportError: (err: unknown) => console.error(`[${gameId} ERROR]`, err),
					},
				});
			} catch (err) {
				if (!cancelled) {
					setFetchError(err instanceof Error ? err.message : String(err));
					setResolvedOptions(null);
				}
			}
		}

		fetchSources();

		return () => {
			cancelled = true;
		};
	}, [gameId, canvasRef]);

	const runtimeResult = useRuntime(canvasRef, resolvedOptions);

	return {
		...runtimeResult,
		loading: runtimeResult.loading || resolvedOptions === null,
		error: fetchError ?? runtimeResult.error,
	};
}
