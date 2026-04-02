import { useState } from "react";
import { games } from "../registry";
import type { GameCategory } from "../types";
import { GameCard } from "./GameCard";
import "./GameHub.css";

interface GameHubProps {
	onSelectGame: (id: string) => void;
}

const categories: { label: string; value: GameCategory | "all" }[] = [
	{ label: "All", value: "all" },
	{ label: "Arcade", value: "arcade" },
	{ label: "Puzzle", value: "puzzle" },
	{ label: "Adventure", value: "adventure" },
	{ label: "Demo", value: "demo" },
];

export function GameHub({ onSelectGame }: GameHubProps) {
	const [filter, setFilter] = useState<GameCategory | "all">("all");

	const filtered = filter === "all" ? games : games.filter((g) => g.category === filter);

	return (
		<div className="hub">
			<header className="hub-header">
				<h1 className="hub-title">
					<span className="hub-title-l8b">L8B</span> Games
				</h1>
				<p className="hub-subtitle">Select a game to play</p>
			</header>

			<nav className="hub-filters">
				{categories.map((cat) => (
					<button
						key={cat.value}
						className={`hub-filter ${filter === cat.value ? "active" : ""}`}
						onClick={() => setFilter(cat.value)}
					>
						{cat.label}
					</button>
				))}
			</nav>

			<div className="hub-grid">
				{filtered.map((game) => (
					<GameCard key={game.id} game={game} onSelect={onSelectGame} />
				))}
			</div>

			<footer className="hub-footer">
				<span>Powered by LootiScript</span>
				<span className="hub-footer-dot" />
				<span>{games.length} games</span>
			</footer>
		</div>
	);
}
