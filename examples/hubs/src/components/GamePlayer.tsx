import { useRef } from "react";
import { getGame } from "../registry";
import { useGameRuntime } from "../hooks/useGameRuntime";
import "./GamePlayer.css";

interface GamePlayerProps {
	gameId: string;
	onBack: () => void;
}

export function GamePlayer({ gameId, onBack }: GamePlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { loading, error, stop } = useGameRuntime(gameId, canvasRef);
	const game = getGame(gameId);

	const handleBack = () => {
		stop();
		onBack();
	};

	return (
		<div className="player">
			<div className="player-scanlines" />

			<button className="player-back" onClick={handleBack}>
				{"<< BACK"}
			</button>

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

			<div
				className={`player-canvas-wrap ${game?.orientation === "portrait" ? "portrait" : "landscape"}`}
			>
				<canvas ref={canvasRef} className="player-canvas" />
			</div>

			{!loading && !error && (
				<div className="player-info">
					<span className="player-game-name">{game?.name}</span>
				</div>
			)}
		</div>
	);
}
