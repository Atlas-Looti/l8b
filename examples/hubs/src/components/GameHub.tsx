import { useState } from "react";
import { games } from "../registry";
import type { GameCategory } from "../types";
import { GameCard } from "./GameCard";
import "./GameHub.css";

interface GameHubProps {
	onSelectGame: (id: string) => void;
}

const categories: { label: string; value: GameCategory | "all" }[] = [
	{ label: "ALL", value: "all" },
	{ label: "ARCADE", value: "arcade" },
	{ label: "PUZZLE", value: "puzzle" },
	{ label: "ADVENTURE", value: "adventure" },
	{ label: "DEMO", value: "demo" },
];

export function GameHub({ onSelectGame }: GameHubProps) {
	const [filter, setFilter] = useState<GameCategory | "all">("all");

	const filtered = filter === "all" ? games : games.filter((g) => g.category === filter);

	return (
		<div className="hub">
			<div className="hub-scanlines" />
			<header className="hub-header">
				<h1 className="hub-title">
					<span className="hub-title-l8b">L8B</span> ARCADE
				</h1>
				<p className="hub-subtitle">SELECT A GAME TO PLAY</p>
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
				<span>POWERED BY LOOTISCRIPT</span>
				<span className="hub-footer-dot" />
				<span>{games.length} GAMES</span>
			</footer>
		</div>
	);
}
