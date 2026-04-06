import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGameRuntime } from "../hooks/useGameRuntime";
import { getGame } from "../registry";
import "./GamePlayer.css";

export function GamePlayer() {
	const { gameId } = useParams<{ gameId: string }>();
	const navigate = useNavigate();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stopRef = useRef<() => void>(() => {});

	const handleBack = useCallback(() => {
		stopRef.current();
		navigate("/");
	}, [navigate]);

	if (!gameId) {
		return <div className="player-error">Game ID not found</div>;
	}

	const game = getGame(gameId);
	if (!game) {
		return <div className="player-error">Game not found in registry</div>;
	}

	const { loading, error, stop } = useGameRuntime(gameId, canvasRef, {
		onMessage: useCallback(
			(msg: unknown) => {
				// "quit" — go back to hub (string or object form)
				if (
					msg === "quit" ||
					(typeof msg === "object" && msg !== null && (msg as Record<string, unknown>).type === "quit")
				) {
					// Defer so we don't stop the runtime from within its own game-loop callback
					setTimeout(() => handleBack(), 0);
				}
			},
			[handleBack],
		),
	});

	stopRef.current = stop;

	// Set canvas dimensions when it mounts
	useEffect(() => {
		if (canvasRef.current && game) {
			canvasRef.current.width = game.width;
			canvasRef.current.height = game.height;
		}
	}, [game]);

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
			{loading && (
				<div className="player-loading">
					<div className="player-loading-text">Loading</div>
					<div className="player-loading-dots">
						<span />
						<span />
						<span />
					</div>
				</div>
			)}

			{error && (
				<div className="player-error">
					<div className="player-error-title">Error</div>
					<div className="player-error-msg">{error}</div>
					<button className="player-error-btn" onClick={handleBack}>
						Back to Hub
					</button>
				</div>
			)}

			<div className="player-canvas-wrap">
				<canvas ref={canvasRef} className="player-canvas" />
			</div>
		</div>
	);
}
