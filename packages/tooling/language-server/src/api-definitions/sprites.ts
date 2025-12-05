/**
 * Sprites API definitions
 */

import type { GlobalApi } from "../types";

export const spritesApi: Partial<GlobalApi> = {
	sprites: {
		type: "object",
		description: "Collection of loaded sprites, indexed by sprite name",
		properties: {
			// Dynamic sprite properties - these are available on any sprite instance
			// The actual sprite names are discovered at runtime
		},
	},
	Sprite: {
		type: "class",
		description: "Animated sprite class",
		signature: "new Sprite(width, height)",
		properties: {
			width: {
				type: "property",
				description: "Sprite width in pixels",
			},
			height: {
				type: "property",
				description: "Sprite height in pixels",
			},
			ready: {
				type: "property",
				description: "Whether the sprite is ready (1) or not (0)",
			},
			frames: {
				type: "property",
				description: "Array of sprite frames",
			},
			fps: {
				type: "property",
				description: "Frames per second for animation",
			},
			animation_start: {
				type: "property",
				description: "Animation start timestamp",
			},
			setFPS: {
				type: "method",
				description: "Set animation frames per second",
				signature: "sprite.setFPS(fps: number)",
			},
			setFrame: {
				type: "method",
				description: "Set current animation frame",
				signature: "sprite.setFrame(frame: number)",
			},
			getFrame: {
				type: "method",
				description: "Get current animation frame index",
				signature: "sprite.getFrame(): number",
			},
			getCurrentFrameCanvas: {
				type: "method",
				description: "Get canvas of current frame",
				signature: "sprite.getCurrentFrameCanvas(): canvas",
			},
			play: {
				type: "method",
				description: "Play animation",
				signature: "sprite.play(animation?)",
			},
			stop: {
				type: "method",
				description: "Stop animation",
				signature: "sprite.stop()",
			},
			update: {
				type: "method",
				description: "Update sprite state",
				signature: "sprite.update(dt)",
			},
			draw: {
				type: "method",
				description: "Draw sprite",
				signature: "sprite.draw(x, y, w?, h?)",
			},
		},
	},
	Image: {
		type: "class",
		description: "Image resource wrapper",
		signature: "new Image(source)",
	},
	loadSprite: {
		type: "function",
		description: "Load a sprite from source",
		signature: "loadSprite(src, options?)",
	},
	updateSprite: {
		type: "function",
		description: "Update a sprite definition",
		signature: "updateSprite(name, definition)",
	},
	loadFont: {
		type: "function",
		description: "Load a font",
		signature: "loadFont(name, src, options?)",
	},
	isFontReady: {
		type: "function",
		description: "Check if a font is loaded",
		signature: "isFontReady(name)",
	},
	clearFontCache: {
		type: "function",
		description: "Clear font cache",
		signature: "clearFontCache()",
	},
};
