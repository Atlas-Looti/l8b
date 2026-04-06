import {
	createRuntime,
	type RuntimeController,
	type RuntimeOptions,
	type RuntimeResetOptions,
	type RuntimeSnapshot,
	type HostEvent,
} from "@al8b/runtime";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export interface UseRuntimeResult {
	/** True while runtime.start() is in progress */
	loading: boolean;
	/** Error string if startup failed */
	error: string | null;
	/** The live RuntimeController, null before startup completes */
	runtime: RuntimeController | null;
	/** Stop the runtime and release resources */
	stop: () => void;
	/** Reset the runtime (calls runtime.reset) */
	reset: (options?: RuntimeResetOptions) => Promise<void>;
	/** Export current snapshot */
	exportSnapshot: () => RuntimeSnapshot | null;
	/** Import a snapshot into the running runtime */
	importSnapshot: (snapshot: RuntimeSnapshot) => Promise<void>;
	/** Send a host event into the runtime's bridge subscription */
	sendHostEvent: (event: HostEvent) => void;
}

export function useRuntime(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	options: RuntimeOptions | null,
): UseRuntimeResult {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const runtimeRef = useRef<RuntimeController | null>(null);

	const stop = useCallback(() => {
		if (runtimeRef.current) {
			runtimeRef.current.stop();
			runtimeRef.current = null;
		}
	}, []);

	const reset = useCallback(async (resetOptions?: RuntimeResetOptions) => {
		if (!runtimeRef.current) return;
		await runtimeRef.current.reset(resetOptions);
	}, []);

	const exportSnapshot = useCallback(() => {
		return runtimeRef.current?.exportSnapshot() ?? null;
	}, []);

	const importSnapshot = useCallback(async (snapshot: RuntimeSnapshot) => {
		if (!runtimeRef.current) return;
		await runtimeRef.current.importSnapshot(snapshot);
	}, []);

	const sendHostEvent = useCallback((event: HostEvent) => {
		if (runtimeRef.current) {
			runtimeRef.current.sendHostEvent(event);
		}
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas || !options) {
			setLoading(true);
			return;
		}

		let cancelled = false;

		async function startRuntime() {
			try {
				setLoading(true);
				setError(null);

				const runtime = createRuntime({
					...options,
					canvas: canvas || undefined,
				});

				if (cancelled) {
					runtime.stop();
					return;
				}

				runtimeRef.current = runtime;
				await runtime.start();

				if (cancelled) {
					runtime.stop();
					runtimeRef.current = null;
					return;
				}

				setLoading(false);
			} catch (err) {
				if (!cancelled) {
					const msg = err instanceof Error ? err.message : String(err);
					setError(msg);
					setLoading(false);
				}
			}
		}

		startRuntime();

		return () => {
			cancelled = true;
			stop();
		};
	}, [canvasRef, options, stop]);

	return {
		loading,
		error,
		runtime: runtimeRef.current,
		stop,
		reset,
		exportSnapshot,
		importSnapshot,
		sendHostEvent,
	};
}
