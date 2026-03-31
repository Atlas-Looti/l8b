import { useState } from "react";
import { GameHub } from "./components/GameHub";
import { GamePlayer } from "./components/GamePlayer";
import "./App.css";

function App() {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);

	if (selectedGame) {
		return <GamePlayer gameId={selectedGame} onBack={() => setSelectedGame(null)} />;
	}

	return <GameHub onSelectGame={setSelectedGame} />;
}

export default App;
