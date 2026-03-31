import type { GameDefinition } from "../types";
import "./GameCard.css";

interface GameCardProps {
	game: GameDefinition;
	onSelect: (id: string) => void;
}

const categoryIcons: Record<string, string> = {
	arcade: ">>",
	puzzle: "##",
	adventure: "~~",
	demo: "<>",
};

export function GameCard({ game, onSelect }: GameCardProps) {
	return (
		<button
			className="game-card"
			style={{ "--card-color": game.color } as React.CSSProperties}
			onClick={() => onSelect(game.id)}
		>
			<div className="game-card-badge">{game.category}</div>
			<div className="game-card-icon">{categoryIcons[game.category] ?? ">>"}</div>
			<h3 className="game-card-title">{game.name}</h3>
			<p className="game-card-desc">{game.description}</p>
			<div className="game-card-meta">
				<span className="game-card-orientation">
					{game.orientation === "portrait" ? "[|]" : "[-]"}
				</span>
				<span className="game-card-play">PLAY</span>
			</div>
		</button>
	);
}
