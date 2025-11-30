/**
 * Map API definitions
 */

import type { GlobalApi } from "../types";

export const mapApi: Partial<GlobalApi> = {
    Map: {
        type: "class",
        description: "Tile map class",
        signature: "new Map(data)",
        properties: {
            width: {
                type: "property",
                description: "Map width in tiles",
            },
            height: {
                type: "property",
                description: "Map height in tiles",
            },
            tileWidth: {
                type: "property",
                description: "Tile width in pixels",
            },
            tileHeight: {
                type: "property",
                description: "Tile height in pixels",
            },
            getTile: {
                type: "method",
                description: "Get tile at coordinates",
                signature: "map.getTile(layer, x, y)",
            },
            setTile: {
                type: "method",
                description: "Set tile at coordinates",
                signature: "map.setTile(layer, x, y, tile)",
            },
        },
    },
    loadMap: {
        type: "function",
        description: "Load a map from source",
        signature: "loadMap(src)",
    },
    saveMap: {
        type: "function",
        description: "Save map data",
        signature: "saveMap(map)",
    },
    updateMap: {
        type: "function",
        description: "Update map definition",
        signature: "updateMap(name, definition)",
    },
};
