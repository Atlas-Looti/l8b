import { RuntimeOrchestrator } from "@l8b/runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { getGame } from "../registry";

export interface GameRuntimeCallbacks {
	/** Called when the game sends a message via system.postMessage() */
	onMessage?: (message: unknown) => void;
}

export function useGameRuntime(
	gameId: string,
	canvasRef: React.RefObject<HTMLCanvasElement | null>,
	callbacks: GameRuntimeCallbacks = {},
) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const runtimeRef = useRef<InstanceType<typeof RuntimeOrchestrator> | null>(null);
	const callbacksRef = useRef(callbacks);
	callbacksRef.current = callbacks;

	const stop = useCallback(() => {
		if (runtimeRef.current) {
			runtimeRef.current.stop();
			runtimeRef.current = null;
		}
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const game = getGame(gameId);
		if (!game) {
			setError(`Game "${gameId}" not found in registry`);
			setLoading(false);
			return;
		}

		let cancelled = false;

		async function startGame() {
			try {
				setLoading(true);
				setError(null);

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

				canvas!.width = game!.width;
				canvas!.height = game!.height;

				const runtime = new RuntimeOrchestrator({
					canvas: canvas!,
					width: game!.width,
					height: game!.height,
					url: baseUrl,
					sources,
					resources: game!.resources,
					listener: {
						log: (message: string) => console.log(`[${gameId}]`, message),
						reportError: (err: unknown) => console.error(`[${gameId} ERROR]`, err),
						postMessage: (msg: unknown) => {
							callbacksRef.current.onMessage?.(msg);
						},
					},
				});

				if (cancelled) return;

				runtimeRef.current = runtime;
				await runtime.start();

				if (cancelled) {
					runtime.stop();
					return;
				}

				setLoading(false);
			} catch (err) {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : String(err));
					setLoading(false);
				}
			}
		}

		startGame();

		return () => {
			cancelled = true;
			stop();
		};
	}, [gameId, canvasRef, stop]);

	return { loading, error, stop };
}
