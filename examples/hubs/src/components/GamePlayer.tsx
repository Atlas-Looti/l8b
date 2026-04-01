import { useCallback, useEffect, useRef } from "react";
import { useGameRuntime } from "../hooks/useGameRuntime";
import "./GamePlayer.css";

interface GamePlayerProps {
	gameId: string;
	onBack: () => void;
}

export function GamePlayer({ gameId, onBack }: GamePlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleBack = useCallback(() => {
		stop();
		onBack();
	}, [onBack]);

	const { loading, error, stop } = useGameRuntime(gameId, canvasRef, {
		onMessage: useCallback(
			(msg: unknown) => {
				// "quit" — go back to hub (string or object form)
				if (
					msg === "quit" ||
					(typeof msg === "object" && msg !== null && (msg as Record<string, unknown>).type === "quit")
				) {
					handleBack();
				}
			},
			[handleBack],
		),
	});

	// ESC key as a fallback to leave the game
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleBack();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [handleBack]);

	return (
		<div className="player">
			<div className="player-scanlines" />

			{loading && (
				<div className="player-loading">
					<div className="player-loading-text">LOADING</div>
					<div className="player-loading-dots">
						<span />
						<span />
						<span />
					</div>
				</div>
			)}

			{error && (
				<div className="player-error">
					<div className="player-error-title">ERROR</div>
					<div className="player-error-msg">{error}</div>
					<button className="player-error-btn" onClick={handleBack}>
						BACK TO HUB
					</button>
				</div>
			)}

			<div className="player-canvas-wrap">
				<canvas ref={canvasRef} className="player-canvas" />
			</div>
		</div>
	);
}
