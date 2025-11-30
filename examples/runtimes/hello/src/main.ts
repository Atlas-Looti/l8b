/**
 * Hello World Example - L8B Game Engine
 *
 * This example demonstrates:
 * - Basic runtime setup
 * - Loading LootiScript game code
 * - Logging from game to console
 * - Simple 2D rendering
 */

import { Runtime } from "@l8b/runtime";

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
const runtime = new Runtime({
	canvas,
	width: 1920,
	height: 1080,
	sources: {
		main: mainLootiScript,
	},
	listener: {
		log: (message) => {
			console.log("[GAME]", message);
		},
		reportError: (error) => {
			console.error("[GAME ERROR]", error);
		},
		postMessage: (msg) => {
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
