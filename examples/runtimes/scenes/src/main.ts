/**
 * Scene Routing Example - L8B Game Engine
 *
 * This example demonstrates:
 * - Scene-based game architecture
 * - Shallow routing (no page reload)
 * - Route definitions and navigation
 * - Dynamic route parameters
 * - Scene lifecycle hooks (init, onEnter, onLeave, update, draw)
 */

import { Runtime } from "@l8b/runtime";

import mainLootiScript from "./scripts/main.loot?raw";
import battleScene from "./scripts/scenes/battle.loot?raw";
import homeScene from "./scripts/scenes/home.loot?raw";
import playerScene from "./scripts/scenes/player.loot?raw";

const canvas = document.getElementById("game") as HTMLCanvasElement | null;
if (!canvas) throw new Error("Canvas element with id 'game' not found");

// Use flexible window size (any) - use window dimensions
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Create runtime with multiple source files
const runtime = new Runtime({
	canvas,
	width,
	height,
	sources: {
		main: mainLootiScript,
		"scenes/home": homeScene,
		"scenes/battle": battleScene,
		"scenes/player": playerScene,
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
	console.log(`Canvas internal size: ${canvas.width}x${canvas.height}, display size: ${canvas.clientWidth}x${canvas.clientHeight}`);
};

// Start the game
console.log("Starting L8B Runtime with Scene Routing...");
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
console.log("Try: runtime.sceneManager.router.push('/battle')");

// Handle window resize - update canvas size dynamically
const handleResize = () => {
	const newWidth = window.innerWidth;
	const newHeight = window.innerHeight;
	canvas.width = newWidth;
	canvas.height = newHeight;
	// Runtime will automatically use canvas dimensions
	logCanvasSize();
};

window.addEventListener("resize", handleResize);
