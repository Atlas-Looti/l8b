/**
 * Sprites API definitions
 */

import type { GlobalApi } from "../types";

export const spritesApi: Partial<GlobalApi> = {
    Sprite: {
        type: "class",
        description: "Animated sprite class",
        signature: "new Sprite(options)",
        properties: {
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
