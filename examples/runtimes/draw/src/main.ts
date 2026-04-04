/**

 */

import { RuntimeOrchestrator } from "@al8b/runtime";
import mainLootiScript from "./scripts/main.loot?raw";

// Debug: log the game code
console.log("Game code to parse:");
console.log(mainLootiScript);
console.log("---");

const canvas = document.getElementById("game") as HTMLCanvasElement | null;
if (!canvas) throw new Error("Canvas element with id 'game' not found");
canvas.width = 1920;
canvas.height = 1080;

// Create runtime
const runtime = new RuntimeOrchestrator({
	canvas,
	width: 1920,
	height: 1080,

	sources: {
		main: mainLootiScript,
	},
	listener: {
		log: (message: string) => {
			console.log("[GAME]", message);
		},
		reportError: (error: unknown) => {
			console.error("[GAME ERROR]", error);
		},
		postMessage: (msg: unknown) => {
			console.log("[GAME MESSAGE]", msg);
		},
	},
});

const logCanvasSize = () => {
	console.log(
		`Canvas internal size: ${canvas.width}x${canvas.height}, display size: ${canvas.clientWidth}x${canvas.clientHeight}`,
	);
};

// Start the game
console.log("Starting L8B Runtime...");
try {
	await runtime.start();
	console.log("Runtime started successfully!");
	console.log("Game is running...");
	logCanvasSize();
} catch (err) {
	console.error(err);
}

// Make runtime accessible from console for debugging
(window as any).runtime = runtime;
console.log("Runtime available as window.runtime");

window.addEventListener("resize", logCanvasSize);
