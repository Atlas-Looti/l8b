import { Runtime } from "@l8b/runtime";

// Import all lootiscript files
import mainLootiScript from "./l8b/ls/main.loot?raw";
import animalsLootiScript from "./l8b/ls/animals.loot?raw";
import audioLootiScript from "./l8b/ls/audio.loot?raw";
import crabsLootiScript from "./l8b/ls/crabs.loot?raw";
import drawLootiScript from "./l8b/ls/draw.loot?raw";
import fishLootiScript from "./l8b/ls/fish.loot?raw";
import gamepadLootiScript from "./l8b/ls/gamepad.loot?raw";
import gestureLootiScript from "./l8b/ls/gesture.loot?raw";
import keyboardLootiScript from "./l8b/ls/keyboard.loot?raw";
import levelsLootiScript from "./l8b/ls/levels.loot?raw";
import messageLootiScript from "./l8b/ls/message.loot?raw";
import musicLootiScript from "./l8b/ls/music.loot?raw";
import physicsLootiScript from "./l8b/ls/physics.loot?raw";

// Generate resources from files
const sprites = [
	"arrowup.png", "crab.png", "doigt.png", "door0.png", "door1.png",
	"fish1.png", "fish2.png", "fish.png", "fishscore.png", "huit.png",
	"icon.png", "mast.png", "octopus1.png", "octopus2.png",
	"piranha1.png", "piranha2.png", "piranhaback0.png", "piranhaback1.png",
	"piranhafront0.png", "piranhafront1.png", "poster.png",
	"rock0.png", "rock1.png", "rock2.png", "sailor.png",
	"sandbottom0.png", "sandbottom1.png", "sandbottomright0.png", "sandbottomright1.png",
	"sandfull.png", "sandleft0.png", "sandleft1.png", "sandleftbottom0.png", "sandleftbottom1.png",
	"sandright0.png", "sandright1.png", "sandtop0.png", "sandtop1.png",
	"sandtopleft0.png", "sandtopleft1.png", "sandtopright0.png", "sandtopright1.png",
	"sea.png", "shark1.png", "shark2.png", "ship2.png", "ship.png", "shiptop.png",
	"wall0.png", "wall1.png", "wallsand.png", "walltile.png",
	"wave0.png", "wave1.png", "wave2.png", "wave3.png", "wave4.png",
].map(file => ({ file, version: 1 }));

const maps = [
	"map1.json", "map2.json", "map3.json", "map4.json",
	"map5.json", "map6.json", "map7.json", "map8.json",
].map(file => ({ file, version: 1 }));

const canvas = document.getElementById("game") as HTMLCanvasElement | null;
if (!canvas) throw new Error("Canvas element with id 'game' not found");

// Get window size for responsive canvas
const getWindowSize = () => ({
	width: window.innerWidth,
	height: window.innerHeight,
});

// Initial size - use window size (any size)
const initialSize = getWindowSize();
const devicePixelRatio = window.devicePixelRatio || 1;
const ctx = canvas.getContext("2d");
const backingStoreRatio = (ctx as any)?.webkitBackingStorePixelRatio ||
	(ctx as any)?.mozBackingStorePixelRatio ||
	(ctx as any)?.msBackingStorePixelRatio ||
	(ctx as any)?.oBackingStorePixelRatio ||
	(ctx as any)?.backingStorePixelRatio || 1;
const ratio = devicePixelRatio / backingStoreRatio;

// Set canvas internal size with devicePixelRatio
canvas.width = initialSize.width * ratio;
canvas.height = initialSize.height * ratio;

// Set canvas display size
canvas.style.width = `${Math.round(initialSize.width)}px`;
canvas.style.height = `${Math.round(initialSize.height)}px`;

// Create runtime with responsive size
// Use canvas internal size (with devicePixelRatio) for runtime
const runtime = new Runtime({
	url: "/l8b/",
	canvas,
	width: canvas.width,
	height: canvas.height,
	sources: {
		main: mainLootiScript,
		animals: animalsLootiScript,
		audio: audioLootiScript,
		crabs: crabsLootiScript,
		draw: drawLootiScript,
		fish: fishLootiScript,
		gamepad: gamepadLootiScript,
		gesture: gestureLootiScript,
		keyboard: keyboardLootiScript,
		levels: levelsLootiScript,
		message: messageLootiScript,
		music: musicLootiScript,
		physics: physicsLootiScript,
	},
	resources: {
		images: sprites,
		maps: maps,
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

// Handle window resize - make canvas responsive (with debounce)
let resizeTimeout: number | null = null;
const handleResize = () => {
	// Debounce resize to avoid too many calls
	if (resizeTimeout) {
		clearTimeout(resizeTimeout);
	}
	
	resizeTimeout = window.setTimeout(() => {
		const newSize = getWindowSize();
		
		// Apply devicePixelRatio for high-DPI displays
		const devicePixelRatio = window.devicePixelRatio || 1;
		const backingStoreRatio = (canvas.getContext("2d") as any)?.webkitBackingStorePixelRatio ||
			(canvas.getContext("2d") as any)?.mozBackingStorePixelRatio ||
			(canvas.getContext("2d") as any)?.msBackingStorePixelRatio ||
			(canvas.getContext("2d") as any)?.oBackingStorePixelRatio ||
			(canvas.getContext("2d") as any)?.backingStorePixelRatio || 1;
		
		const ratio = devicePixelRatio / backingStoreRatio;
		
		// Set canvas internal size with devicePixelRatio
		canvas.width = newSize.width * ratio;
		canvas.height = newSize.height * ratio;
		
		// Set canvas display size 
		canvas.style.width = `${Math.round(newSize.width)}px`;
		canvas.style.height = `${Math.round(newSize.height)}px`;
		
		// Resize the screen in runtime (this will update screen.width and screen.height)
		if (runtime.screen) {
			runtime.screen.resize(canvas.width, canvas.height);
		}
		
		logCanvasSize();
	}, 100); // Debounce 100ms
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

// Add resize listener for responsive canvas
window.addEventListener("resize", handleResize);
