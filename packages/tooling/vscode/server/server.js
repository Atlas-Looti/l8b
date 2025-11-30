var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/server.ts
var import_node13 = require("vscode-languageserver/node");
var import_vscode_languageserver_textdocument2 = require("vscode-languageserver-textdocument");

// src/embedded/language-modes.ts
var import_vscode_languageserver_textdocument = require("vscode-languageserver-textdocument");
var DocumentRegions = class {
    static {
        __name(this, "DocumentRegions");
    }
    document;
    regions = [];
    constructor(document) {
        this.document = document;
        this.scanRegions();
    }
    /**
     * Scan document for embedded language regions
     * Currently supports:
     * - JSON in `json` blocks: ```json ... ```
     * - JSON in JSON.parse() calls
     * - Template string interpolation
     */
    scanRegions() {
        const text = this.document.getText();
        const lines = text.split("\n");
        let inJsonBlock = false;
        let jsonBlockStart = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const jsonBlockMatch = line.match(/^```(json|JSON)$/);
            const jsonBlockEnd = line.match(/^```$/);
            if (jsonBlockMatch && !inJsonBlock) {
                inJsonBlock = true;
                jsonBlockStart = i;
            } else if (jsonBlockEnd && inJsonBlock) {
                const startOffset = this.document.offsetAt({
                    line: jsonBlockStart,
                    character: 0,
                });
                const endOffset = this.document.offsetAt({
                    line: i,
                    character: 0,
                });
                this.regions.push({
                    languageId: "json",
                    start: startOffset,
                    end: endOffset,
                    startLine: jsonBlockStart,
                    startCharacter: 0,
                    endLine: i,
                    endCharacter: 0,
                });
                inJsonBlock = false;
            }
        }
        const jsonParseRegex = /JSON\.parse\s*\(\s*(["'`])((?:\\.|(?!\1).)*)\1\s*\)/gs;
        let match;
        while ((match = jsonParseRegex.exec(text)) !== null) {
            const startOffset = match.index + match[0].indexOf(match[2]);
            const endOffset = startOffset + match[2].length;
            const startPos = this.document.positionAt(startOffset);
            const endPos = this.document.positionAt(endOffset);
            this.regions.push({
                languageId: "json",
                start: startOffset,
                end: endOffset,
                startLine: startPos.line,
                startCharacter: startPos.character,
                endLine: endPos.line,
                endCharacter: endPos.character,
            });
        }
    }
    /**
     * Get the language mode at a given position
     */
    getLanguageAtPosition(position) {
        const offset = this.document.offsetAt(position);
        for (const region of this.regions) {
            if (offset >= region.start && offset <= region.end) {
                return region.languageId;
            }
        }
        return null;
    }
    /**
     * Get all regions for a specific language
     */
    getRegionsForLanguage(languageId) {
        return this.regions.filter((r) => r.languageId === languageId);
    }
    /**
     * Get embedded document content for a specific language
     * Replaces all non-matching regions with whitespace
     */
    getEmbeddedDocument(languageId) {
        const text = this.document.getText();
        const languageRegions = this.getRegionsForLanguage(languageId);
        if (languageRegions.length === 0) {
            return import_vscode_languageserver_textdocument.TextDocument.create(this.document.uri + "." + languageId, languageId, this.document.version, "");
        }
        let result = "";
        let lastOffset = 0;
        const sortedRegions = [...languageRegions].sort((a, b) => a.start - b.start);
        for (const region of sortedRegions) {
            if (region.start > lastOffset) {
                result += " ".repeat(region.start - lastOffset);
            }
            result += text.substring(region.start, region.end);
            lastOffset = region.end;
        }
        if (lastOffset < text.length) {
            result += " ".repeat(text.length - lastOffset);
        }
        return import_vscode_languageserver_textdocument.TextDocument.create(this.document.uri + "." + languageId, languageId, this.document.version, result);
    }
    /**
     * Check if position is inside any embedded region
     */
    isInEmbeddedRegion(position) {
        return this.getLanguageAtPosition(position) !== null;
    }
};

// src/embedded/mode-manager.ts
var LanguageModelCache = class LanguageModelCache2 {
    static {
        __name(LanguageModelCache2, "LanguageModelCache");
    }
    cache = /* @__PURE__ */ new Map();
    maxEntries;
    constructor(maxEntries = 10) {
        this.maxEntries = maxEntries;
    }
    get(document) {
        const key = document.uri;
        const entry = this.cache.get(key);
        if (entry && entry.version === document.version) {
            return entry.value;
        }
        const value = this.create(document);
        this.cache.set(key, {
            version: document.version,
            value,
        });
        if (this.cache.size > this.maxEntries) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey !== void 0) {
                this.cache.delete(firstKey);
            }
        }
        return value;
    }
    create(_document) {
        throw new Error("Must be implemented by subclass");
    }
};
var DocumentRegionsCache = class extends LanguageModelCache {
    static {
        __name(this, "DocumentRegionsCache");
    }
    constructor() {
        super(10);
    }
    create(document) {
        return new DocumentRegions(document);
    }
};
var LanguageModes = class {
    static {
        __name(this, "LanguageModes");
    }
    modes = /* @__PURE__ */ new Map();
    documentRegions;
    constructor(documentRegions) {
        this.documentRegions = documentRegions;
    }
    /**
     * Register a language mode
     */
    registerMode(mode) {
        this.modes.set(mode.getId(), mode);
    }
    /**
     * Get language mode at a given position
     */
    getModeAtPosition(document, position) {
        const regions = this.documentRegions.get(document);
        const languageId = regions.getLanguageAtPosition(position);
        if (languageId) {
            return this.modes.get(languageId) || null;
        }
        return null;
    }
    /**
     * Get all registered modes
     */
    getAllModes() {
        return Array.from(this.modes.values());
    }
    /**
     * Get mode by language ID
     */
    getMode(languageId) {
        return this.modes.get(languageId) || null;
    }
};

// src/embedded/json-mode.ts
var import_vscode_json_languageservice = require("vscode-json-languageservice");
function getJSONMode(jsonLanguageService2, documentRegionsCache2) {
    return {
        getId() {
            return "json";
        },
        async doComplete(document, position) {
            const documentRegions = documentRegionsCache2.get(document);
            const embedded = documentRegions.getEmbeddedDocument("json");
            const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
            const completions = await jsonLanguageService2.doComplete(embedded, position, jsonDocument);
            return completions;
        },
        async doHover(document, position) {
            const documentRegions = documentRegionsCache2.get(document);
            const embedded = documentRegions.getEmbeddedDocument("json");
            const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
            return await jsonLanguageService2.doHover(embedded, position, jsonDocument);
        },
        async doValidation(document) {
            const documentRegions = documentRegionsCache2.get(document);
            const embedded = documentRegions.getEmbeddedDocument("json");
            const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
            return await jsonLanguageService2.doValidation(embedded, jsonDocument, {
                schemaValidation: "error",
            });
        },
        findDocumentSymbols(document) {
            const documentRegions = documentRegionsCache2.get(document);
            const embedded = documentRegions.getEmbeddedDocument("json");
            const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
            return jsonLanguageService2.findDocumentSymbols2(embedded, jsonDocument);
        },
    };
}
__name(getJSONMode, "getJSONMode");
function createJSONLanguageService() {
    return (0, import_vscode_json_languageservice.getLanguageService)({
        schemaRequestService: /* @__PURE__ */ __name(async (_uri) => {
            return "";
        }, "schemaRequestService"),
        workspaceContext: {
            resolveRelativePath: /* @__PURE__ */ __name((relativePath, resource) => {
                const base = resource.substring(0, resource.lastIndexOf("/"));
                return base + "/" + relativePath;
            }, "resolveRelativePath"),
        },
    });
}
__name(createJSONLanguageService, "createJSONLanguageService");

// src/api-definitions/core.ts
var coreApi = {
    print: {
        type: "function",
        description: "Prints text to the debug console",
        signature: "print(text: any)",
    },
    List: {
        type: "module",
        description: "Array manipulation and functional programming utilities",
        properties: {
            map: {
                type: "method",
                signature: "List.map(arr, fn)",
                description: "Map over array elements",
            },
            filter: {
                type: "method",
                signature: "List.filter(arr, fn)",
                description: "Filter array by predicate",
            },
            reduce: {
                type: "method",
                signature: "List.reduce(arr, fn, initial)",
                description: "Reduce array to single value",
            },
            find: {
                type: "method",
                signature: "List.find(arr, fn)",
                description: "Find first matching element",
            },
            findIndex: {
                type: "method",
                signature: "List.findIndex(arr, fn)",
                description: "Find index of first match",
            },
            some: {
                type: "method",
                signature: "List.some(arr, fn)",
                description: "Test if any element matches",
            },
            every: {
                type: "method",
                signature: "List.every(arr, fn)",
                description: "Test if all elements match",
            },
            reverse: {
                type: "method",
                signature: "List.reverse(arr)",
                description: "Reverse array (non-mutating)",
            },
            sort: {
                type: "method",
                signature: "List.sort(arr, fn?)",
                description: "Sort array (non-mutating)",
            },
            slice: {
                type: "method",
                signature: "List.slice(arr, start, end?)",
                description: "Extract array slice",
            },
            concat: {
                type: "method",
                signature: "List.concat(...arrays)",
                description: "Concatenate arrays",
            },
            flat: {
                type: "method",
                signature: "List.flat(arr, depth?)",
                description: "Flatten nested array",
            },
            flatMap: {
                type: "method",
                signature: "List.flatMap(arr, fn)",
                description: "Map and flatten array",
            },
            indexOf: {
                type: "method",
                signature: "List.indexOf(arr, item, from?)",
                description: "Find first index of item",
            },
            lastIndexOf: {
                type: "method",
                signature: "List.lastIndexOf(arr, item, from?)",
                description: "Find last index of item",
            },
            includes: {
                type: "method",
                signature: "List.includes(arr, item, from?)",
                description: "Check if array includes item",
            },
            length: {
                type: "method",
                signature: "List.length(arr)",
                description: "Get array length",
            },
            first: {
                type: "method",
                signature: "List.first(arr)",
                description: "Get first element",
            },
            last: {
                type: "method",
                signature: "List.last(arr)",
                description: "Get last element",
            },
            at: {
                type: "method",
                signature: "List.at(arr, index)",
                description: "Get element at index (supports negative)",
            },
            push: {
                type: "method",
                signature: "List.push(arr, ...items)",
                description: "Add items to end",
            },
            pop: {
                type: "method",
                signature: "List.pop(arr)",
                description: "Remove and return last item",
            },
            shift: {
                type: "method",
                signature: "List.shift(arr)",
                description: "Remove and return first item",
            },
            unshift: {
                type: "method",
                signature: "List.unshift(arr, ...items)",
                description: "Add items to start",
            },
            splice: {
                type: "method",
                signature: "List.splice(arr, start, deleteCount?, ...items)",
                description: "Remove/insert elements",
            },
            fill: {
                type: "method",
                signature: "List.fill(arr, value, start?, end?)",
                description: "Fill array with value",
            },
            join: {
                type: "method",
                signature: "List.join(arr, separator?)",
                description: "Join array to string",
            },
            unique: {
                type: "method",
                signature: "List.unique(arr)",
                description: "Remove duplicates",
            },
            shuffle: {
                type: "method",
                signature: "List.shuffle(arr)",
                description: "Randomly shuffle array",
            },
            chunk: {
                type: "method",
                signature: "List.chunk(arr, size)",
                description: "Split into chunks",
            },
            sum: {
                type: "method",
                signature: "List.sum(arr)",
                description: "Sum numeric array",
            },
            average: {
                type: "method",
                signature: "List.average(arr)",
                description: "Average of numeric array",
            },
            min: {
                type: "method",
                signature: "List.min(arr)",
                description: "Minimum value in array",
            },
            max: {
                type: "method",
                signature: "List.max(arr)",
                description: "Maximum value in array",
            },
        },
    },
    Math: {
        type: "module",
        description: "Mathematical and game-specific utilities",
        properties: {
            abs: {
                type: "method",
                signature: "Math.abs(x)",
                description: "Absolute value",
            },
            sqrt: {
                type: "method",
                signature: "Math.sqrt(x)",
                description: "Square root",
            },
            floor: {
                type: "method",
                signature: "Math.floor(x)",
                description: "Round down",
            },
            ceil: {
                type: "method",
                signature: "Math.ceil(x)",
                description: "Round up",
            },
            round: {
                type: "method",
                signature: "Math.round(x)",
                description: "Round to nearest",
            },
            min: {
                type: "method",
                signature: "Math.min(...args)",
                description: "Minimum value",
            },
            max: {
                type: "method",
                signature: "Math.max(...args)",
                description: "Maximum value",
            },
            pow: {
                type: "method",
                signature: "Math.pow(base, exp)",
                description: "Power function",
            },
            exp: {
                type: "method",
                signature: "Math.exp(x)",
                description: "e^x",
            },
            log: {
                type: "method",
                signature: "Math.log(x)",
                description: "Natural logarithm",
            },
            log10: {
                type: "method",
                signature: "Math.log10(x)",
                description: "Base-10 logarithm",
            },
            sin: {
                type: "method",
                signature: "Math.sin(x)",
                description: "Sine (radians)",
            },
            cos: {
                type: "method",
                signature: "Math.cos(x)",
                description: "Cosine (radians)",
            },
            tan: {
                type: "method",
                signature: "Math.tan(x)",
                description: "Tangent (radians)",
            },
            asin: {
                type: "method",
                signature: "Math.asin(x)",
                description: "Arcsine",
            },
            acos: {
                type: "method",
                signature: "Math.acos(x)",
                description: "Arccosine",
            },
            atan: {
                type: "method",
                signature: "Math.atan(x)",
                description: "Arctangent",
            },
            atan2: {
                type: "method",
                signature: "Math.atan2(y, x)",
                description: "Two-argument arctangent",
            },
            random: {
                type: "method",
                signature: "Math.random()",
                description: "Random number 0-1",
            },
            randomInt: {
                type: "method",
                signature: "Math.randomInt(min, max)",
                description: "Random integer",
            },
            randomFloat: {
                type: "method",
                signature: "Math.randomFloat(min, max)",
                description: "Random float",
            },
            PI: {
                type: "property",
                description: "Pi constant (3.14159...)",
            },
            E: {
                type: "property",
                description: "Euler's number (2.71828...)",
            },
            clamp: {
                type: "method",
                signature: "Math.clamp(value, min, max)",
                description: "Clamp value between min/max",
            },
            lerp: {
                type: "method",
                signature: "Math.lerp(a, b, t)",
                description: "Linear interpolation",
            },
            distance: {
                type: "method",
                signature: "Math.distance(x1, y1, x2, y2)",
                description: "2D distance",
            },
            distance3D: {
                type: "method",
                signature: "Math.distance3D(x1, y1, z1, x2, y2, z2)",
                description: "3D distance",
            },
            angleBetween: {
                type: "method",
                signature: "Math.angleBetween(x1, y1, x2, y2)",
                description: "Angle between points",
            },
            degToRad: {
                type: "method",
                signature: "Math.degToRad(degrees)",
                description: "Convert degrees to radians",
            },
            radToDeg: {
                type: "method",
                signature: "Math.radToDeg(radians)",
                description: "Convert radians to degrees",
            },
            sign: {
                type: "method",
                signature: "Math.sign(x)",
                description: "Sign of number (-1, 0, 1)",
            },
            mod: {
                type: "method",
                signature: "Math.mod(n, m)",
                description: "Euclidean modulo",
            },
        },
    },
    String: {
        type: "module",
        description: "String manipulation utilities",
        properties: {
            split: {
                type: "method",
                signature: "String.split(str, separator?)",
                description: "Split string into array",
            },
            join: {
                type: "method",
                signature: "String.join(arr, separator?)",
                description: "Join array to string",
            },
            trim: {
                type: "method",
                signature: "String.trim(str)",
                description: "Remove whitespace from both ends",
            },
            trimStart: {
                type: "method",
                signature: "String.trimStart(str)",
                description: "Remove leading whitespace",
            },
            trimEnd: {
                type: "method",
                signature: "String.trimEnd(str)",
                description: "Remove trailing whitespace",
            },
            replace: {
                type: "method",
                signature: "String.replace(str, search, replacement)",
                description: "Replace first occurrence",
            },
            replaceAll: {
                type: "method",
                signature: "String.replaceAll(str, search, replacement)",
                description: "Replace all occurrences",
            },
            startsWith: {
                type: "method",
                signature: "String.startsWith(str, prefix)",
                description: "Check if string starts with prefix",
            },
            endsWith: {
                type: "method",
                signature: "String.endsWith(str, suffix)",
                description: "Check if string ends with suffix",
            },
            contains: {
                type: "method",
                signature: "String.contains(str, search)",
                description: "Check if string contains substring",
            },
            toLowerCase: {
                type: "method",
                signature: "String.toLowerCase(str)",
                description: "Convert to lowercase",
            },
            toUpperCase: {
                type: "method",
                signature: "String.toUpperCase(str)",
                description: "Convert to uppercase",
            },
            charAt: {
                type: "method",
                signature: "String.charAt(str, index)",
                description: "Get character at index",
            },
            charCodeAt: {
                type: "method",
                signature: "String.charCodeAt(str, index)",
                description: "Get char code at index",
            },
            fromCharCode: {
                type: "method",
                signature: "String.fromCharCode(...codes)",
                description: "Create string from char codes",
            },
            substring: {
                type: "method",
                signature: "String.substring(str, start, end?)",
                description: "Extract substring",
            },
            slice: {
                type: "method",
                signature: "String.slice(str, start, end?)",
                description: "Extract substring (supports negative indices)",
            },
            indexOf: {
                type: "method",
                signature: "String.indexOf(str, search, from?)",
                description: "Find first index of substring",
            },
            lastIndexOf: {
                type: "method",
                signature: "String.lastIndexOf(str, search, from?)",
                description: "Find last index of substring",
            },
            repeat: {
                type: "method",
                signature: "String.repeat(str, count)",
                description: "Repeat string n times",
            },
            padStart: {
                type: "method",
                signature: "String.padStart(str, length, pad?)",
                description: "Pad string at start",
            },
            padEnd: {
                type: "method",
                signature: "String.padEnd(str, length, pad?)",
                description: "Pad string at end",
            },
            length: {
                type: "method",
                signature: "String.length(str)",
                description: "Get string length",
            },
            parseInt: {
                type: "method",
                signature: "String.parseInt(str, radix?)",
                description: "Parse integer from string",
            },
            parseFloat: {
                type: "method",
                signature: "String.parseFloat(str)",
                description: "Parse float from string",
            },
            format: {
                type: "method",
                signature: "String.format(template, ...args)",
                description: "Format string with {0}, {1}, etc.",
            },
        },
    },
    JSON: {
        type: "module",
        description: "JSON encoding and decoding",
        properties: {
            encode: {
                type: "method",
                signature: "JSON.encode(value)",
                description: "Encode value to JSON string",
            },
            decode: {
                type: "method",
                signature: "JSON.decode(json)",
                description: "Decode JSON string to value",
            },
            pretty: {
                type: "method",
                signature: "JSON.pretty(value, indent?)",
                description: "Pretty-print JSON with indentation",
            },
        },
    },
    Random: {
        type: "constructor",
        description: "Seeded random number generator for deterministic randomness",
        signature: "new Random(seed?: number)",
        properties: {
            next: {
                type: "method",
                signature: "random.next()",
                description: "Get next random number (0-1)",
            },
            nextInt: {
                type: "method",
                signature: "random.nextInt(max)",
                description: "Get random integer (0 to max-1)",
            },
            seed: {
                type: "method",
                signature: "random.seed(newSeed?)",
                description: "Set new seed value",
            },
            clone: {
                type: "method",
                signature: "random.clone(seed?)",
                description: "Clone random generator with optional new seed",
            },
        },
    },
    ObjectPool: {
        type: "constructor",
        description: "Object pooling utility for performance optimization",
        signature: "new ObjectPool(factory, maxSize?)",
        properties: {
            acquire: {
                type: "method",
                signature: "pool.acquire()",
                description: "Get object from pool or create new",
            },
            release: {
                type: "method",
                signature: "pool.release(obj)",
                description: "Return object to pool for reuse",
            },
            clear: {
                type: "method",
                signature: "pool.clear()",
                description: "Clear all objects from pool",
            },
            getSize: {
                type: "method",
                signature: "pool.getSize()",
                description: "Get current pool size",
            },
            getMaxSize: {
                type: "method",
                signature: "pool.getMaxSize()",
                description: "Get maximum pool size",
            },
        },
    },
    storage: {
        type: "module",
        description: "Persistent storage API (localStorage wrapper)",
        properties: {
            get: {
                type: "method",
                signature: "storage.get(key, defaultValue?)",
                description: "Get value from storage",
            },
            set: {
                type: "method",
                signature: "storage.set(key, value)",
                description: "Save value to storage",
            },
            remove: {
                type: "method",
                signature: "storage.remove(key)",
                description: "Remove value from storage",
            },
            clear: {
                type: "method",
                signature: "storage.clear()",
                description: "Clear all storage",
            },
            has: {
                type: "method",
                signature: "storage.has(key)",
                description: "Check if key exists in storage",
            },
            keys: {
                type: "method",
                signature: "storage.keys()",
                description: "Get all storage keys",
            },
        },
    },
};

// src/api-definitions/screen.ts
var screenApi = {
    screen: {
        type: "object",
        description: "Screen drawing and display interface",
        properties: {
            width: {
                type: "property",
                description: "Screen width in pixels",
            },
            height: {
                type: "property",
                description: "Screen height in pixels",
            },
            drawSprite: {
                type: "method",
                description: "Draw a sprite at the specified position",
                signature: "screen.drawSprite(sprite: string, x: number, y: number, width?: number, height?: number)",
            },
            fillRect: {
                type: "method",
                description: "Fill a rectangle with the current color",
                signature: "screen.fillRect(x: number, y: number, width: number, height: number, color: string)",
            },
            drawRect: {
                type: "method",
                description: "Draw a rectangle outline",
                signature: "screen.drawRect(x: number, y: number, width: number, height: number, color: string)",
            },
            drawText: {
                type: "method",
                description: "Draw text at the specified position",
                signature: "screen.drawText(text: string, x: number, y: number, color?: string, size?: number)",
            },
            clearScreen: {
                type: "method",
                description: "Clear the screen with a color",
                signature: "screen.clearScreen(color?: string)",
            },
            drawCircle: {
                type: "method",
                description: "Draw a circle",
                signature: "screen.drawCircle(x: number, y: number, radius: number, color: string)",
            },
            fillCircle: {
                type: "method",
                description: "Fill a circle",
                signature: "screen.fillCircle(x: number, y: number, radius: number, color: string)",
            },
            drawLine: {
                type: "method",
                signature: "screen.drawLine(x1, y1, x2, y2, color?)",
                description: "Draw line between two points",
            },
            clear: {
                type: "method",
                signature: "screen.clear(color?)",
                description: "Clear screen (alias for clearScreen)",
            },
            setColor: {
                type: "method",
                signature: "screen.setColor(color)",
                description: "Set drawing color",
            },
            setAlpha: {
                type: "method",
                signature: "screen.setAlpha(alpha)",
                description: "Set opacity (0-1)",
            },
            setPixelated: {
                type: "method",
                signature: "screen.setPixelated(pixelated)",
                description: "Enable/disable pixelated rendering",
            },
            setBlending: {
                type: "method",
                signature: "screen.setBlending(mode)",
                description: "Set blending mode",
            },
            setLinearGradient: {
                type: "method",
                signature: "screen.setLinearGradient(x1, y1, x2, y2, c1, c2)",
                description: "Set linear gradient",
            },
            setRadialGradient: {
                type: "method",
                signature: "screen.setRadialGradient(x, y, radius, c1, c2)",
                description: "Set radial gradient",
            },
            setFont: {
                type: "method",
                signature: "screen.setFont(font)",
                description: "Set font family",
            },
            loadFont: {
                type: "method",
                signature: "screen.loadFont(font)",
                description: "Load font",
            },
            isFontReady: {
                type: "method",
                signature: "screen.isFontReady(font?)",
                description: "Check if font is loaded",
            },
            setTranslation: {
                type: "method",
                signature: "screen.setTranslation(tx, ty)",
                description: "Set translation offset",
            },
            setScale: {
                type: "method",
                signature: "screen.setScale(x, y)",
                description: "Set scale",
            },
            setRotation: {
                type: "method",
                signature: "screen.setRotation(rotation)",
                description: "Set rotation",
            },
            setDrawAnchor: {
                type: "method",
                signature: "screen.setDrawAnchor(ax, ay)",
                description: "Set sprite drawing anchor",
            },
            setDrawRotation: {
                type: "method",
                signature: "screen.setDrawRotation(rotation)",
                description: "Set sprite rotation",
            },
            setDrawScale: {
                type: "method",
                signature: "screen.setDrawScale(x, y?)",
                description: "Set sprite scale",
            },
            fillRoundRect: {
                type: "method",
                signature: "screen.fillRoundRect(x, y, w, h, r?, color?)",
                description: "Fill rounded rectangle",
            },
            fillRound: {
                type: "method",
                signature: "screen.fillRound(x, y, w, h, color?)",
                description: "Fill round (ellipse in rect)",
            },
            drawRoundRect: {
                type: "method",
                signature: "screen.drawRoundRect(x, y, w, h, r?, color?)",
                description: "Draw rounded rectangle outline",
            },
            drawRound: {
                type: "method",
                signature: "screen.drawRound(x, y, w, h, color?)",
                description: "Draw round outline",
            },
            drawImage: {
                type: "method",
                signature: "screen.drawImage(sprite, x, y, w?, h?)",
                description: "Draw image (alias for drawSprite)",
            },
            drawSpritePart: {
                type: "method",
                signature: "screen.drawSpritePart(sprite, sx, sy, sw, sh, x, y, w?, h?)",
                description: "Draw part of sprite",
            },
            drawImagePart: {
                type: "method",
                signature: "screen.drawImagePart(sprite, sx, sy, sw, sh, x, y, w?, h?)",
                description: "Draw part of image",
            },
            drawMap: {
                type: "method",
                signature: "screen.drawMap(map, x, y, w, h)",
                description: "Draw tile map",
            },
            drawTextOutline: {
                type: "method",
                signature: "screen.drawTextOutline(text, x, y, size, color?)",
                description: "Draw text with outline",
            },
            textWidth: {
                type: "method",
                signature: "screen.textWidth(text, size)",
                description: "Measure text width",
            },
            setLineWidth: {
                type: "method",
                signature: "screen.setLineWidth(width)",
                description: "Set line width",
            },
            setLineDash: {
                type: "method",
                signature: "screen.setLineDash(dash)",
                description: "Set line dash pattern",
            },
            drawPolygon: {
                type: "method",
                signature: "screen.drawPolygon(...points)",
                description: "Draw polygon outline",
            },
            drawPolyline: {
                type: "method",
                signature: "screen.drawPolyline(...points)",
                description: "Draw polyline",
            },
            fillPolygon: {
                type: "method",
                signature: "screen.fillPolygon(...points)",
                description: "Fill polygon",
            },
            drawQuadCurve: {
                type: "method",
                signature: "screen.drawQuadCurve(...args)",
                description: "Draw quadratic curve",
            },
            drawBezierCurve: {
                type: "method",
                signature: "screen.drawBezierCurve(...args)",
                description: "Draw bezier curve",
            },
            drawArc: {
                type: "method",
                signature: "screen.drawArc(x, y, radius, angle1, angle2, ccw, color?)",
                description: "Draw arc",
            },
            fillArc: {
                type: "method",
                signature: "screen.fillArc(x, y, radius, angle1, angle2, ccw, color?)",
                description: "Fill arc",
            },
            setCursorVisible: {
                type: "method",
                signature: "screen.setCursorVisible(visible)",
                description: "Show/hide cursor",
            },
            tri: {
                type: "method",
                signature: "screen.tri(x1, y1, x2, y2, x3, y3, color?)",
                description: "Draw triangle outline",
            },
            trib: {
                type: "method",
                signature: "screen.trib(x1, y1, x2, y2, x3, y3, color?)",
                description: "Fill triangle",
            },
            ttri: {
                type: "method",
                signature: "screen.ttri(x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture, ...)",
                description: "Textured triangle (3D)",
            },
        },
    },
};

// src/api-definitions/audio.ts
var audioApi = {
    audio: {
        type: "object",
        description: "Audio playback and sound interface",
        properties: {
            beep: {
                type: "method",
                description: "Play a beep sound",
                signature: "audio.beep(frequency?: number, duration?: number)",
            },
            playSound: {
                type: "method",
                description: "Play a sound file",
                signature: "audio.playSound(soundName: string, volume?: number, loop?: boolean)",
            },
            stopSound: {
                type: "method",
                description: "Stop a playing sound",
                signature: "audio.stopSound(soundName: string)",
            },
            setVolume: {
                type: "method",
                description: "Set the master volume",
                signature: "audio.setVolume(volume: number)",
            },
            playMusic: {
                type: "method",
                description: "Play background music",
                signature: "audio.playMusic(musicName: string, volume?: number, loop?: boolean)",
            },
            stopMusic: {
                type: "method",
                description: "Stop background music",
                signature: "audio.stopMusic()",
            },
        },
    },
};

// src/api-definitions/input.ts
var inputApi = {
    input: {
        type: "object",
        description: "User input interface (keyboard, mouse, touch, gamepad)",
        properties: {
            keyboard: {
                type: "property",
                description: "Keyboard input state object",
            },
            mouse: {
                type: "property",
                description: "Mouse input state object with x, y, and button properties",
            },
            touch: {
                type: "property",
                description: "Touch input state for mobile devices",
            },
            gamepad: {
                type: "property",
                description: "Gamepad input state",
            },
        },
    },
};

// src/api-definitions/system.ts
var systemApi = {
    system: {
        type: "object",
        description: "Runtime system utilities and information",
        properties: {
            time: {
                type: "property",
                description: "Current system time in milliseconds",
            },
            fps: {
                type: "property",
                description: "Current frames per second",
            },
            deltaTime: {
                type: "property",
                description: "Time elapsed since last frame (seconds)",
            },
            cpu_load: {
                type: "property",
                description: "CPU load percentage",
            },
            update_rate: {
                type: "property",
                description: "Target update rate",
            },
            language: {
                type: "property",
                description: "Browser language",
            },
            loading: {
                type: "property",
                description: "Asset loading progress (0-1)",
            },
            inputs: {
                type: "property",
                description: "Input device availability",
            },
            pause: {
                type: "method",
                signature: "system.pause()",
                description: "Pause game execution",
            },
            exit: {
                type: "method",
                signature: "system.exit()",
                description: "Exit game",
            },
            prompt: {
                type: "method",
                signature: "system.prompt(text, callback)",
                description: "Prompt user for input",
            },
            say: {
                type: "method",
                signature: "system.say(text)",
                description: "Show alert message",
            },
        },
    },
};

// src/api-definitions/scene.ts
var sceneApi = {
    scene: {
        type: "function",
        description: "Register a new scene",
        signature: "scene(name: string, definition: object)",
    },
    route: {
        type: "function",
        description: "Register a route to a scene",
        signature: "route(path: string, sceneName: string)",
    },
    router: {
        type: "object",
        description: "Router for navigation",
        properties: {
            push: {
                type: "method",
                description: "Navigate to a path (adds to history)",
                signature: "router.push(path: string)",
            },
            replace: {
                type: "method",
                description: "Replace current path (no history)",
                signature: "router.replace(path: string)",
            },
            back: {
                type: "method",
                description: "Go back in history",
                signature: "router.back()",
            },
            path: {
                type: "property",
                description: "Current path",
            },
            params: {
                type: "property",
                description: "Current route parameters",
            },
            sceneName: {
                type: "property",
                description: "Current scene name",
            },
            getPath: {
                type: "method",
                description: "Get current path",
                signature: "router.getPath()",
            },
            getParams: {
                type: "method",
                description: "Get current route parameters",
                signature: "router.getParams()",
            },
            getSceneName: {
                type: "method",
                description: "Get current scene name",
                signature: "router.getSceneName()",
            },
        },
    },
    scenes: {
        type: "object",
        description: "Scene manager",
        properties: {
            goto: {
                type: "method",
                description: "Directly switch to a scene",
                signature: "scenes.goto(name: string, params?: object)",
            },
            current: {
                type: "method",
                description: "Get current scene name",
                signature: "scenes.current()",
            },
        },
    },
};

// src/api-definitions/sprites.ts
var spritesApi = {
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

// src/api-definitions/map.ts
var mapApi = {
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

// src/api-definitions/time.ts
var timeApi = {
    TimeMachine: {
        type: "class",
        description: "Time travel debugging system",
        signature: "new TimeMachine(options)",
        properties: {
            record: {
                type: "method",
                description: "Start recording state",
                signature: "timeMachine.record()",
            },
            play: {
                type: "method",
                description: "Play back recorded state",
                signature: "timeMachine.play()",
            },
            stop: {
                type: "method",
                description: "Stop recording/playback",
                signature: "timeMachine.stop()",
            },
            rewind: {
                type: "method",
                description: "Rewind state",
                signature: "timeMachine.rewind(steps)",
            },
        },
    },
    StatePlayer: {
        type: "class",
        description: "State playback controller",
        signature: "new StatePlayer(timeMachine)",
    },
    StateRecorder: {
        type: "class",
        description: "State recorder",
        signature: "new StateRecorder(timeMachine)",
    },
};

// src/api-definitions/assets.ts
var assetsApi = {
    AssetManager: {
        type: "class",
        description: "Asset management system",
        signature: "new AssetManager(options)",
        properties: {
            load: {
                type: "method",
                description: "Load an asset",
                signature: "assetManager.load(src, type?)",
            },
            get: {
                type: "method",
                description: "Get a loaded asset",
                signature: "assetManager.get(src)",
            },
            unload: {
                type: "method",
                description: "Unload an asset",
                signature: "assetManager.unload(src)",
            },
        },
    },
};

// src/api-definitions/palette.ts
var paletteApi = {
    Palette: {
        type: "class",
        description: "Color palette management",
        signature: "new Palette(colors)",
        properties: {
            get: {
                type: "method",
                description: "Get color by index",
                signature: "palette.get(index)",
            },
            set: {
                type: "method",
                description: "Set color at index",
                signature: "palette.set(index, color)",
            },
            size: {
                type: "property",
                description: "Number of colors in palette",
            },
        },
    },
};

// src/api-definitions/player.ts
var playerApi = {
    player: {
        type: "object",
        description: "Farcaster player context and user information",
        properties: {
            fid: {
                type: "property",
                description: "Player Farcaster ID (FID)",
            },
            username: {
                type: "property",
                description: "Player username",
            },
            displayName: {
                type: "property",
                description: "Player display name",
            },
            pfpUrl: {
                type: "property",
                description: "Player profile picture URL",
            },
            getFid: {
                type: "method",
                signature: "player.getFid()",
                description: "Get player Farcaster ID",
            },
            getUsername: {
                type: "method",
                signature: "player.getUsername()",
                description: "Get player username",
            },
            getDisplayName: {
                type: "method",
                signature: "player.getDisplayName()",
                description: "Get player display name",
            },
            getPfpUrl: {
                type: "method",
                signature: "player.getPfpUrl()",
                description: "Get player profile picture URL",
            },
            getContext: {
                type: "method",
                signature: "player.getContext()",
                description: "Get full player context object",
            },
            isInMiniApp: {
                type: "method",
                signature: "player.isInMiniApp()",
                description: "Check if running in Farcaster Mini App",
            },
        },
    },
};

// src/api-definitions/wallet.ts
var walletApi = {
    wallet: {
        type: "object",
        description: "Wallet operations for Farcaster Mini Apps",
        properties: {
            isConnected: {
                type: "method",
                signature: "wallet.isConnected()",
                description: "Check if wallet is connected",
            },
            connect: {
                type: "method",
                signature: "wallet.connect()",
                description: "Connect to wallet",
            },
            getAddress: {
                type: "method",
                signature: "wallet.getAddress()",
                description: "Get connected wallet address",
            },
            getChainId: {
                type: "method",
                signature: "wallet.getChainId()",
                description: "Get current chain ID",
            },
            sendTransaction: {
                type: "method",
                signature: "wallet.sendTransaction({to: string, value?: string, data?: string})",
                description: "Send a transaction",
            },
            signMessage: {
                type: "method",
                signature: "wallet.signMessage(message: string)",
                description: "Sign a message",
            },
        },
    },
};

// src/api-definitions/evm.ts
var evmApi = {
    evm: {
        type: "object",
        description: "EVM blockchain operations using viem",
        properties: {
            read: {
                type: "method",
                signature: "evm.read(contractAddress: string, abi: any, functionName: string, args?: any[])",
                description: "Read from smart contract (view function, no transaction)",
            },
            write: {
                type: "method",
                signature: "evm.write(contractAddress: string, abi: any, functionName: string, args?: any[])",
                description: "Write to smart contract (state-changing, sends transaction)",
            },
            call: {
                type: "method",
                signature: "evm.call(contractAddress: string, abi: any, functionName: string, args?: any[])",
                description: "Call/simulate contract function (no transaction)",
            },
            getBalance: {
                type: "method",
                signature: "evm.getBalance(address?: string)",
                description: "Get ETH balance for an address",
            },
            formatEther: {
                type: "method",
                signature: "evm.formatEther(value: string)",
                description: "Format wei to ether (wei / 10^18)",
            },
            parseEther: {
                type: "method",
                signature: "evm.parseEther(value: string)",
                description: "Parse ether to wei (ether * 10^18)",
            },
        },
    },
};

// src/api-definitions/actions.ts
var actionsApi = {
    actions: {
        type: "object",
        description: "Farcaster SDK actions for Mini Apps",
        properties: {
            ready: {
                type: "method",
                signature: "actions.ready(disableNativeGestures?: boolean)",
                description: "Hide the splash screen and display your app content",
            },
            close: {
                type: "method",
                signature: "actions.close()",
                description: "Close the Mini App",
            },
            share: {
                type: "method",
                signature: "actions.share({text?: string, embeds?: string[]})",
                description: "Share content via compose cast",
            },
            signIn: {
                type: "method",
                signature: "actions.signIn({nonce: string, acceptAuthAddress?: boolean})",
                description: "Request Sign In with Farcaster credential. Returns {signature: string, message: string}",
            },
            addMiniApp: {
                type: "method",
                signature: "actions.addMiniApp()",
                description: "Prompt the user to add the Mini App to their client",
            },
            openMiniApp: {
                type: "method",
                signature: "actions.openMiniApp({url: string})",
                description: "Open another Mini App",
            },
            openUrl: {
                type: "method",
                signature: "actions.openUrl({url: string})",
                description: "Open an external URL",
            },
            viewProfile: {
                type: "method",
                signature: "actions.viewProfile({fid: number})",
                description: "View a Farcaster profile",
            },
            viewCast: {
                type: "method",
                signature: "actions.viewCast({hash: string, close?: boolean})",
                description: "View a specific cast",
            },
            swapToken: {
                type: "method",
                signature: "actions.swapToken({sellToken?: string, buyToken?: string, sellAmount?: string})",
                description: "Open swap form with pre-filled tokens",
            },
            sendToken: {
                type: "method",
                signature: "actions.sendToken({token?: string, amount?: string, recipientAddress?: string, recipientFid?: number})",
                description: "Open send form with pre-filled token and recipient",
            },
            viewToken: {
                type: "method",
                signature: "actions.viewToken({token: string})",
                description: "View a token",
            },
            composeCast: {
                type: "method",
                signature:
                    "actions.composeCast({text?: string, embeds?: string[], parent?: {type: string, hash: string}, close?: boolean, channelKey?: string})",
                description: "Open cast composer with suggested content",
            },
        },
    },
};

// src/api-definitions/http.ts
var httpApi = {
    http: {
        type: "object",
        description: "HTTP client for external API requests",
        properties: {
            request: {
                type: "method",
                signature: "http.request(url: string, options?: {method?: string, headers?: object, body?: any, timeout?: number})",
                description: "Make a custom HTTP request with full control",
            },
            get: {
                type: "method",
                signature: "http.get(url: string, options?: {headers?: object, timeout?: number})",
                description: "Make a GET request",
            },
            post: {
                type: "method",
                signature: "http.post(url: string, body?: any, options?: {headers?: object, timeout?: number})",
                description: "Make a POST request",
            },
            put: {
                type: "method",
                signature: "http.put(url: string, body?: any, options?: {headers?: object, timeout?: number})",
                description: "Make a PUT request",
            },
            delete: {
                type: "method",
                signature: "http.delete(url: string, options?: {headers?: object, timeout?: number})",
                description: "Make a DELETE request",
            },
        },
    },
};

// src/api-definitions/index.ts
var GLOBAL_API = {
    ...coreApi,
    ...screenApi,
    ...audioApi,
    ...inputApi,
    ...systemApi,
    ...sceneApi,
    ...spritesApi,
    ...mapApi,
    ...timeApi,
    ...assetsApi,
    ...paletteApi,
    ...playerApi,
    ...walletApi,
    ...evmApi,
    ...actionsApi,
    ...httpApi,
};
var API_ACCESS_REGEX = /\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\.([A-Za-z_][A-Za-z0-9_]*)\b/g;

// src/document-state.ts
var import_parser = require("@l8b/lootiscript/dist/v1/parser");
var import_node = require("vscode-languageserver/node");
var documentStates = /* @__PURE__ */ new Map();
function getDocumentStates() {
    return documentStates;
}
__name(getDocumentStates, "getDocumentStates");
function updateDocumentState(textDocument, connection2) {
    const text = textDocument.getText();
    const state = {
        textDocument,
        ast: null,
        scope: null,
        symbols: [],
    };
    try {
        const parser = new import_parser.Parser(text, textDocument.uri);
        parser.parse();
        const ast = convertParserAst(parser);
        const scope = buildScope(ast);
        const symbols = collectSymbols(ast, textDocument.uri);
        state.ast = ast;
        state.scope = scope;
        state.symbols = symbols;
    } catch (err) {
        connection2.console.error(`AST build failed: ${err}`);
    }
    documentStates.set(textDocument.uri, state);
}
__name(updateDocumentState, "updateDocumentState");
function deleteDocumentState(uri) {
    documentStates.delete(uri);
}
__name(deleteDocumentState, "deleteDocumentState");
function convertParserAst(parser) {
    const root = {
        type: "root",
        line: 1,
        column: 0,
        children: [],
        scope: {
            symbols: /* @__PURE__ */ new Map(),
        },
    };
    const statements = parser.program?.statements || [];
    for (const stmt of statements) {
        root.children?.push(convertNode(stmt));
    }
    return root;
}
__name(convertParserAst, "convertParserAst");
function convertNode(node) {
    const base = {
        type: node.constructor?.name || "Unknown",
        line: node?.token?.line || 1,
        column: node?.token?.column || 0,
        endLine: node?.token?.line || 1,
        endColumn: node?.token?.column || 0,
        children: [],
    };
    if (node.identifier) {
        base.name = node.identifier;
    }
    if (node.sequence) {
        for (const child of node.sequence) {
            base.children?.push(convertNode(child));
        }
    }
    if (node.body) {
        for (const child of node.body) {
            base.children?.push(convertNode(child));
        }
    }
    if (node.expression) {
        base.children?.push(convertNode(node.expression));
    }
    if (node.statements) {
        for (const child of node.statements) {
            base.children?.push(convertNode(child));
        }
    }
    if (node.function_body) {
        for (const child of node.function_body) {
            base.children?.push(convertNode(child));
        }
    }
    return base;
}
__name(convertNode, "convertNode");
function buildScope(ast, parent) {
    if (!ast) return null;
    const scope = {
        parent,
        symbols: /* @__PURE__ */ new Map(),
    };
    if (ast.children) {
        for (const child of ast.children) {
            buildScope(child, scope);
        }
    }
    ast.scope = scope;
    return scope;
}
__name(buildScope, "buildScope");
function collectSymbols(ast, uri) {
    if (!ast) return [];
    const symbols = [];
    function visit(node) {
        if (node.type === "Function" && node.name) {
            const symbol = {
                name: node.name,
                type: "function",
                documentUri: uri,
                range: buildRange(node),
            };
            symbols.push(symbol);
            node.scope?.symbols.set(node.name, symbol);
        } else if (node.type === "Assignment" && node.name) {
            const symbol = {
                name: node.name,
                type: "variable",
                documentUri: uri,
                range: buildRange(node),
            };
            symbols.push(symbol);
            node.scope?.symbols.set(node.name, symbol);
        }
        if (node.children) {
            for (const child of node.children) {
                visit(child);
            }
        }
    }
    __name(visit, "visit");
    visit(ast);
    return symbols;
}
__name(collectSymbols, "collectSymbols");
function buildRange(node) {
    return import_node.Range.create(
        import_node.Position.create(Math.max(node.line - 1, 0), Math.max(node.column, 0)),
        import_node.Position.create(Math.max((node.endLine || node.line) - 1, 0), Math.max(node.endColumn || node.column + (node.name?.length || 1), 0)),
    );
}
__name(buildRange, "buildRange");
function getWordAtPosition(document, position) {
    const line = document.getText({
        start: import_node.Position.create(position.line, 0),
        end: import_node.Position.create(position.line + 1, 0),
    });
    const wordRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    let match;
    while ((match = wordRegex.exec(line)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (position.character >= start && position.character <= end) {
            return match[0];
        }
    }
    return null;
}
__name(getWordAtPosition, "getWordAtPosition");

// src/validation.ts
var import_node3 = require("vscode-languageserver/node");
var import_parser2 = require("@l8b/lootiscript/dist/v1/parser");
var import_diagnostics = require("@l8b/diagnostics");

// src/utils.ts
var import_node2 = require("vscode-languageserver/node");
function getWordAtPosition2(document, position) {
    const line = document.getText({
        start: import_node2.Position.create(position.line, 0),
        end: import_node2.Position.create(position.line, Number.MAX_SAFE_INTEGER),
    });
    const regex = /[A-Za-z_][A-Za-z0-9_]*/g;
    let match;
    while ((match = regex.exec(line))) {
        const start = match.index;
        const end = start + match[0].length;
        if (position.character >= start && position.character <= end) {
            return match[0];
        }
    }
    return null;
}
__name(getWordAtPosition2, "getWordAtPosition");
function detectCompletionContext(document, position) {
    const line = document.getText({
        start: import_node2.Position.create(position.line, 0),
        end: import_node2.Position.create(position.line, position.character),
    });
    const propertyMatch = line.match(/([A-Za-z_][A-Za-z0-9_]*)\.\s*$/);
    if (propertyMatch) {
        return {
            type: "property",
            object: propertyMatch[1],
        };
    }
    const openParenCount = (line.match(/\(/g) || []).length;
    const closeParenCount = (line.match(/\)/g) || []).length;
    if (openParenCount > closeParenCount) {
        return {
            type: "function_call",
            inFunctionCall: true,
        };
    }
    return {
        type: "default",
    };
}
__name(detectCompletionContext, "detectCompletionContext");
function getClosestPropertySuggestion(target, candidates) {
    if (candidates.length === 0) {
        return null;
    }
    let bestMatch = null;
    for (const candidate of candidates) {
        const score = levenshteinDistance(target, candidate);
        if (!bestMatch || score < bestMatch.score) {
            bestMatch = {
                value: candidate,
                score,
            };
        }
    }
    if (!bestMatch) {
        return null;
    }
    const threshold = Math.max(1, Math.floor(target.length * 0.4));
    return bestMatch.score <= threshold ? bestMatch.value : null;
}
__name(getClosestPropertySuggestion, "getClosestPropertySuggestion");
function levenshteinDistance(a, b) {
    const rows = a.length + 1;
    const cols = b.length + 1;
    const dp = Array.from(
        {
            length: rows,
        },
        () => Array(cols).fill(0),
    );
    for (let i = 0; i < rows; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j < cols; j++) {
        dp[0][j] = j;
    }
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }
    return dp[a.length][b.length];
}
__name(levenshteinDistance, "levenshteinDistance");

// src/settings.ts
var defaultSettings = {
    diagnostics: {
        enable: true,
    },
    completion: {
        enable: true,
    },
    signatureHelp: {
        enable: true,
    },
    format: {
        enable: true,
        indentSize: 1,
    },
};
var globalSettings = defaultSettings;
var documentSettings = /* @__PURE__ */ new Map();
function setGlobalSettings(settings) {
    globalSettings = settings;
}
__name(setGlobalSettings, "setGlobalSettings");
function clearDocumentSettings() {
    documentSettings.clear();
}
__name(clearDocumentSettings, "clearDocumentSettings");
async function getDocumentSettings(connection2, hasConfigurationCapability2, resource) {
    if (!hasConfigurationCapability2) {
        return globalSettings;
    }
    const cached = documentSettings.get(resource);
    if (cached) {
        return cached;
    }
    const configuration = await connection2.workspace.getConfiguration({
        scopeUri: resource,
        section: "lootiscript",
    });
    const sanitized = sanitizeSettings(configuration);
    documentSettings.set(resource, sanitized);
    return sanitized;
}
__name(getDocumentSettings, "getDocumentSettings");
function sanitizeSettings(settings) {
    const merged = settings || {};
    const rawIndent = merged.format?.indentSize ?? defaultSettings.format.indentSize;
    const normalizedIndent = Math.min(Math.max(rawIndent, 1), 4);
    return {
        diagnostics: {
            enable: merged.diagnostics?.enable ?? defaultSettings.diagnostics.enable,
        },
        completion: {
            enable: merged.completion?.enable ?? defaultSettings.completion.enable,
        },
        signatureHelp: {
            enable: merged.signatureHelp?.enable ?? defaultSettings.signatureHelp.enable,
        },
        format: {
            enable: merged.format?.enable ?? defaultSettings.format.enable,
            indentSize: normalizedIndent,
        },
    };
}
__name(sanitizeSettings, "sanitizeSettings");

// src/validation.ts
async function validateTextDocument(textDocument, connection2, hasConfigurationCapability2, languageModes2, documentRegionsCache2) {
    const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, textDocument.uri);
    if (!settings.diagnostics.enable) {
        connection2.sendDiagnostics({
            uri: textDocument.uri,
            diagnostics: [],
        });
        return;
    }
    const text = textDocument.getText();
    const diagnostics = [];
    const documentRegions = documentRegionsCache2.get(textDocument);
    const allModes = languageModes2.getAllModes();
    for (const mode of allModes) {
        if (mode.doValidation) {
            const embeddedDoc = documentRegions.getEmbeddedDocument(mode.getId());
            const hasEmbeddedContent = embeddedDoc.getText().trim().length > 0;
            if (hasEmbeddedContent) {
                const embeddedDiagnostics = await mode.doValidation(textDocument);
                diagnostics.push(...embeddedDiagnostics);
            }
        }
    }
    try {
        const parser = new import_parser2.Parser(text, textDocument.uri);
        parser.parse();
        if (parser.error_info) {
            const err = parser.error_info;
            const diagnosticData = (0, import_diagnostics.createDiagnostic)(err.code || "E1004", {
                file: textDocument.uri,
                line: err.line,
                column: err.column,
                length: err.length,
                context: err.context,
                suggestions: err.suggestions,
                related: err.related
                    ? {
                          file: textDocument.uri,
                          line: err.related.line,
                          column: err.related.column,
                          message: err.related.message || "Related location",
                      }
                    : void 0,
                data: {
                    error: err.error,
                },
            });
            const lspDiagnostic = (0, import_diagnostics.formatForLSP)(diagnosticData);
            diagnostics.push(lspDiagnostic);
        }
    } catch (e) {
        const diagnostic = {
            severity: import_node3.DiagnosticSeverity.Error,
            range: {
                start: {
                    line: 0,
                    character: 0,
                },
                end: {
                    line: 0,
                    character: 10,
                },
            },
            message: e.message || "Unknown parser error",
            source: "lootiscript",
        };
        diagnostics.push(diagnostic);
    }
    validateApiUsage(textDocument, diagnostics);
    connection2.sendDiagnostics({
        uri: textDocument.uri,
        diagnostics,
    });
}
__name(validateTextDocument, "validateTextDocument");
function validateApiUsage(textDocument, diagnostics) {
    const text = textDocument.getText();
    API_ACCESS_REGEX.lastIndex = 0;
    const seenPositions = /* @__PURE__ */ new Set();
    let match;
    while ((match = API_ACCESS_REGEX.exec(text))) {
        const matchIndex = match.index;
        if (seenPositions.has(matchIndex)) {
            continue;
        }
        seenPositions.add(matchIndex);
        const fullPath = match[1];
        const propertyName = match[2];
        const rootObjectName = fullPath.split(".")[0];
        const isNested = fullPath.includes(".");
        const knownRuntimeObjects = /* @__PURE__ */ new Set(["sprites", "map", "sounds", "music", "assets"]);
        if (isNested) {
            const api2 = GLOBAL_API[rootObjectName];
            if (!api2 && !knownRuntimeObjects.has(rootObjectName)) {
                continue;
            }
            if (knownRuntimeObjects.has(rootObjectName)) {
                const propertyStart2 = matchIndex + fullPath.length + 1;
                const startPos2 = textDocument.positionAt(propertyStart2);
                const diagnosticData2 = (0, import_diagnostics.createDiagnostic)("E7100", {
                    file: textDocument.uri,
                    line: startPos2.line + 1,
                    column: startPos2.character + 1,
                    length: propertyName.length,
                    data: {
                        propertyName,
                        objectName: fullPath,
                        suggestion: void 0,
                    },
                });
                const lspDiagnostic2 = (0, import_diagnostics.formatForLSP)(diagnosticData2);
                diagnostics.push(lspDiagnostic2);
            }
            continue;
        }
        const api = GLOBAL_API[fullPath];
        if (!api || !api.properties) {
            continue;
        }
        if (api.properties[propertyName]) {
            continue;
        }
        const prevChar = matchIndex > 0 ? text[matchIndex - 1] : "";
        if (prevChar === '"' || prevChar === "'" || prevChar === "`") {
            continue;
        }
        const propertyStart = matchIndex + fullPath.length + 1;
        const suggestion = getClosestPropertySuggestion(propertyName, Object.keys(api.properties));
        const startPos = textDocument.positionAt(propertyStart);
        const diagnosticData = (0, import_diagnostics.createDiagnostic)("E7100", {
            file: textDocument.uri,
            line: startPos.line + 1,
            column: startPos.character + 1,
            length: propertyName.length,
            data: {
                propertyName,
                objectName: fullPath,
                suggestion,
            },
        });
        const lspDiagnostic = (0, import_diagnostics.formatForLSP)(diagnosticData);
        diagnostics.push(lspDiagnostic);
    }
}
__name(validateApiUsage, "validateApiUsage");

// src/handlers/completion.ts
var import_node4 = require("vscode-languageserver/node");
function setupCompletionHandlers(connection2, documents2, languageModes2, hasConfigurationCapability2) {
    connection2.onCompletion(async (params) => {
        const uri = params.textDocument.uri;
        const document = documents2.get(uri);
        if (!document) {
            return null;
        }
        const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, uri);
        if (!settings.completion.enable) {
            return null;
        }
        const position = params.position;
        const mode = languageModes2.getModeAtPosition(document, position);
        if (mode && mode.doComplete) {
            const result = await mode.doComplete(document, position);
            if (result) {
                return result;
            }
        }
        const context = detectCompletionContext(document, position);
        if (context.type === "property" && context.object) {
            return getPropertyCompletions(context.object);
        }
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(uri);
        const items = [];
        items.push(...getSnippetCompletions());
        state?.symbols.forEach((symbol) => {
            items.push({
                label: symbol.name,
                kind: symbol.type === "function" ? import_node4.CompletionItemKind.Function : import_node4.CompletionItemKind.Variable,
                detail: symbol.type,
                data: symbol.name,
                sortText: `0_${symbol.name}`,
            });
        });
        for (const [name, info] of Object.entries(GLOBAL_API)) {
            items.push({
                label: name,
                kind: info.type === "function" ? import_node4.CompletionItemKind.Function : import_node4.CompletionItemKind.Class,
                detail: info.description,
                documentation: info.signature,
                data: name,
                sortText: `1_${name}`,
            });
        }
        ["function", "return", "local", "global", "if", "then", "else", "end", "while", "for"].forEach((keyword) => {
            items.push({
                label: keyword,
                kind: import_node4.CompletionItemKind.Keyword,
                data: keyword,
                sortText: `2_${keyword}`,
            });
        });
        return items;
    });
    connection2.onCompletionResolve((item) => {
        const info = GLOBAL_API[item.data];
        if (info) {
            item.detail = info.signature || info.type;
            item.documentation = info.description;
        }
        return item;
    });
}
__name(setupCompletionHandlers, "setupCompletionHandlers");
function getPropertyCompletions(objectName) {
    const api = GLOBAL_API[objectName];
    const items = [];
    if (api && api.properties) {
        for (const [propName, propInfo] of Object.entries(api.properties)) {
            items.push({
                label: propName,
                kind: propInfo.type === "method" ? import_node4.CompletionItemKind.Method : import_node4.CompletionItemKind.Property,
                detail: propInfo.description,
                documentation: propInfo.signature,
                insertText: propInfo.type === "method" ? `${propName}($0)` : propName,
                insertTextFormat: propInfo.type === "method" ? import_node4.InsertTextFormat.Snippet : import_node4.InsertTextFormat.PlainText,
            });
        }
    }
    return items;
}
__name(getPropertyCompletions, "getPropertyCompletions");
function getSnippetCompletions() {
    return [
        {
            label: "func",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "Function definition",
            insertText: "${1:name} = function(${2:args})\n	${3:// body}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "Creates a new function",
        },
        {
            label: "update",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "Update loop function",
            insertText: "update = function()\n	${1:// update logic}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "Game update loop function",
        },
        {
            label: "draw",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "Draw loop function",
            insertText: "draw = function()\n	${1:// draw logic}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "Game draw loop function",
        },
        {
            label: "if",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "If statement",
            insertText: "if ${1:condition} then\n	${2:// code}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "If conditional statement",
        },
        {
            label: "ifelse",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "If-else statement",
            insertText: "if ${1:condition} then\n	${2:// true}\nelse\n	${3:// false}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "If-else conditional statement",
        },
        {
            label: "for",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "For loop",
            insertText: "for ${1:i} in ${2:list} do\n	${3:// code}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "For loop iteration",
        },
        {
            label: "while",
            kind: import_node4.CompletionItemKind.Snippet,
            detail: "While loop",
            insertText: "while ${1:condition} do\n	${2:// code}\nend",
            insertTextFormat: import_node4.InsertTextFormat.Snippet,
            documentation: "While loop",
        },
    ];
}
__name(getSnippetCompletions, "getSnippetCompletions");

// src/handlers/hover.ts
function setupHoverHandler(connection2, documents2, languageModes2) {
    connection2.onHover(async (params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) return null;
        try {
            const mode = languageModes2.getModeAtPosition(document, params.position);
            if (mode && mode.doHover) {
                const result = await mode.doHover(document, params.position);
                if (result) {
                    return result;
                }
            }
        } catch (error) {
            connection2.console?.error(`Hover error in embedded mode: ${error?.message || error}`);
        }
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return null;
        const word = getWordAtPosition2(state.textDocument, params.position);
        if (!word) return null;
        const symbol = findSymbolByName(state, word);
        if (symbol) {
            return {
                contents: {
                    kind: "markdown",
                    value: `**${symbol.name}** (${symbol.type})`,
                },
            };
        }
        const globalInfo = GLOBAL_API[word];
        if (globalInfo) {
            return {
                contents: {
                    kind: "markdown",
                    value: `**${word}** - ${globalInfo.description}

${globalInfo.signature || ""}`,
                },
            };
        }
        return null;
    });
}
__name(setupHoverHandler, "setupHoverHandler");
function findSymbolByName(state, name) {
    return state.symbols.find((sym) => sym.name === name);
}
__name(findSymbolByName, "findSymbolByName");

// src/handlers/signature-help.ts
var import_node5 = require("vscode-languageserver/node");
function setupSignatureHelpHandler(connection2, documents2, hasConfigurationCapability2) {
    connection2.onSignatureHelp(async (params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) return null;
        const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, params.textDocument.uri);
        if (!settings.signatureHelp.enable) {
            return null;
        }
        const line = document.getText({
            start: import_node5.Position.create(params.position.line, 0),
            end: import_node5.Position.create(params.position.line, params.position.character),
        });
        const functionMatch = line.match(/([A-Za-z_][A-Za-z0-9_.]*)\s*\([^)]*$/);
        if (!functionMatch) return null;
        const functionName = functionMatch[1];
        const parts = functionName.split(".");
        let signature;
        let description;
        if (parts.length === 2) {
            const [objectName, methodName] = parts;
            const api = GLOBAL_API[objectName];
            if (api && api.properties && api.properties[methodName]) {
                signature = api.properties[methodName].signature;
                description = api.properties[methodName].description;
            }
        } else {
            const api = GLOBAL_API[functionName];
            if (api) {
                signature = api.signature;
                description = api.description;
            }
        }
        if (!signature) return null;
        const paramMatch = signature.match(/\(([^)]*)\)/);
        const paramsStr = paramMatch ? paramMatch[1] : "";
        const parameters = paramsStr
            .split(",")
            .filter((p) => p.trim())
            .map((param) => ({
                label: param.trim(),
            }));
        const commaCount = (line.match(/,/g) || []).length;
        const activeParameter = Math.min(commaCount, parameters.length - 1);
        return {
            signatures: [import_node5.SignatureInformation.create(signature, description, ...parameters)],
            activeSignature: 0,
            activeParameter: activeParameter >= 0 ? activeParameter : 0,
        };
    });
}
__name(setupSignatureHelpHandler, "setupSignatureHelpHandler");

// src/handlers/symbols.ts
var import_node6 = require("vscode-languageserver/node");
function setupSymbolHandlers(connection2) {
    connection2.onDefinition((params) => {
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return [];
        const word = getWordAtPosition2(state.textDocument, params.position);
        if (!word) return [];
        const symbol = findSymbolByName2(state, word);
        if (!symbol) return [];
        return import_node6.Location.create(symbol.documentUri, symbol.range);
    });
    connection2.onDocumentSymbol((params) => {
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return [];
        return state.symbols.map((symbol) => ({
            name: symbol.name,
            kind: symbol.type === "function" ? import_node6.SymbolKind.Function : import_node6.SymbolKind.Variable,
            location: import_node6.Location.create(symbol.documentUri, symbol.range),
        }));
    });
    connection2.onWorkspaceSymbol(() => {
        const documentStates2 = getDocumentStates();
        const infos = [];
        for (const state of documentStates2.values()) {
            state.symbols.forEach((symbol) => {
                infos.push({
                    name: symbol.name,
                    kind: symbol.type === "function" ? import_node6.SymbolKind.Function : import_node6.SymbolKind.Variable,
                    location: import_node6.Location.create(symbol.documentUri, symbol.range),
                });
            });
        }
        return infos;
    });
    connection2.onReferences((params) => {
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return [];
        const word = getWordAtPosition2(state.textDocument, params.position);
        if (!word) return [];
        const references = [];
        for (const [uri, docState] of documentStates2) {
            const text = docState.textDocument.getText();
            const regex = new RegExp(`\\b${word}\\b`, "g");
            let match;
            while ((match = regex.exec(text))) {
                const start = docState.textDocument.positionAt(match.index);
                const end = docState.textDocument.positionAt(match.index + word.length);
                references.push(
                    import_node6.Location.create(uri, {
                        start,
                        end,
                    }),
                );
            }
        }
        return references;
    });
    connection2.onRenameRequest((params) => {
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return null;
        const word = getWordAtPosition2(state.textDocument, params.position);
        if (!word) return null;
        const edits = [];
        const text = state.textDocument.getText();
        const regex = new RegExp(`\\b${word}\\b`, "g");
        let match;
        while ((match = regex.exec(text))) {
            const start = state.textDocument.positionAt(match.index);
            const end = state.textDocument.positionAt(match.index + word.length);
            edits.push({
                range: {
                    start,
                    end,
                },
                newText: params.newName,
            });
        }
        return {
            changes: {
                [params.textDocument.uri]: edits,
            },
        };
    });
}
__name(setupSymbolHandlers, "setupSymbolHandlers");
function findSymbolByName2(state, name) {
    return state.symbols.find((sym) => sym.name === name);
}
__name(findSymbolByName2, "findSymbolByName");

// src/handlers/formatting.ts
var import_node7 = require("vscode-languageserver/node");
function setupFormattingHandler(connection2, documents2, hasConfigurationCapability2) {
    connection2.onDocumentFormatting(async (params) => {
        const doc = documents2.get(params.textDocument.uri);
        if (!doc) return [];
        const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, params.textDocument.uri);
        if (!settings.format.enable) {
            return [];
        }
        const text = doc.getText();
        const lines = text.split(/\r?\n/);
        const indentWidth = Math.max(settings.format.indentSize, 1);
        const indentUnit = params.options.insertSpaces ? " ".repeat(indentWidth) : "	".repeat(indentWidth);
        let indent = 0;
        const formatted = lines.map((line) => {
            const trimmed = line.trim();
            if (/^(end|else|elseif)/.test(trimmed)) {
                indent = Math.max(indent - 1, 0);
            }
            const formattedLine = `${indentUnit.repeat(indent)}${trimmed}`;
            if (/(then|do|function|repeat)\b.*$/.test(trimmed) && !trimmed.includes("end")) {
                indent++;
            }
            return formattedLine;
        });
        const fullRange = import_node7.Range.create(import_node7.Position.create(0, 0), doc.positionAt(text.length));
        return [import_node7.TextEdit.replace(fullRange, formatted.join("\n"))];
    });
}
__name(setupFormattingHandler, "setupFormattingHandler");

// src/handlers/code-actions.ts
var import_node8 = require("vscode-languageserver/node");
function setupCodeActionsHandler(connection2, documents2) {
    connection2.onCodeAction((params) => {
        const actions = [];
        for (const diagnostic of params.context.diagnostics) {
            const message = diagnostic.message.toLowerCase();
            const errorCode = diagnostic.code;
            if (errorCode === "E1001" || errorCode === "E1003") {
                const document = documents2.get(params.textDocument.uri);
                if (document) {
                    const errorLine = diagnostic.range.end.line;
                    let insertLine = errorLine + 1;
                    while (insertLine < document.lineCount) {
                        const nextLine = document.getText({
                            start: {
                                line: insertLine,
                                character: 0,
                            },
                            end: {
                                line: insertLine,
                                character: Number.MAX_SAFE_INTEGER,
                            },
                        });
                        if (nextLine.trim() && !nextLine.trim().startsWith("end")) {
                            break;
                        }
                        insertLine++;
                    }
                    actions.push({
                        title: "Add missing 'end' to close block",
                        kind: import_node8.CodeActionKind.QuickFix,
                        edit: {
                            changes: {
                                [params.textDocument.uri]: [import_node8.TextEdit.insert(import_node8.Position.create(insertLine, 0), "end\n")],
                            },
                        },
                        diagnostics: [diagnostic],
                    });
                }
            }
            if (errorCode === "E1002" || message.includes("too many 'end'")) {
                actions.push({
                    title: "Remove extra 'end' statement",
                    kind: import_node8.CodeActionKind.QuickFix,
                    edit: {
                        changes: {
                            [params.textDocument.uri]: [import_node8.TextEdit.replace(diagnostic.range, "")],
                        },
                    },
                    diagnostics: [diagnostic],
                });
            }
            if ((message.includes("unterminated") || message.includes("missing 'end'")) && !errorCode) {
                actions.push({
                    title: "Insert 'end'",
                    kind: import_node8.CodeActionKind.QuickFix,
                    edit: {
                        changes: {
                            [params.textDocument.uri]: [import_node8.TextEdit.insert(import_node8.Position.create(diagnostic.range.end.line + 1, 0), "end\n")],
                        },
                    },
                    diagnostics: [diagnostic],
                });
            }
            if (message.includes("undefined") || message.includes("not defined")) {
                const document = documents2.get(params.textDocument.uri);
                if (document) {
                    const word = getWordAtPosition2(document, diagnostic.range.start);
                    if (word) {
                        actions.push({
                            title: `Declare variable '${word}'`,
                            kind: import_node8.CodeActionKind.QuickFix,
                            edit: {
                                changes: {
                                    [params.textDocument.uri]: [
                                        import_node8.TextEdit.insert(
                                            import_node8.Position.create(diagnostic.range.start.line, 0),
                                            `local ${word} = nil
`,
                                        ),
                                    ],
                                },
                            },
                            diagnostics: [diagnostic],
                        });
                    }
                }
            }
        }
        if (params.range && (params.range.start.line !== params.range.end.line || params.range.start.character !== params.range.end.character)) {
            const document = documents2.get(params.textDocument.uri);
            if (document) {
                const selectedText = document.getText(params.range);
                if (selectedText.trim()) {
                    actions.push({
                        title: "Extract to function",
                        kind: import_node8.CodeActionKind.RefactorExtract,
                        edit: {
                            changes: {
                                [params.textDocument.uri]: [
                                    // Replace selection with function call
                                    import_node8.TextEdit.replace(params.range, "extracted_function()"),
                                    // Insert function definition at end
                                    import_node8.TextEdit.insert(
                                        import_node8.Position.create(document.lineCount, 0),
                                        `

extracted_function = function()
	${selectedText.replace(/\n/g, "\n	")}
end
`,
                                    ),
                                ],
                            },
                        },
                    });
                }
            }
        }
        return actions;
    });
}
__name(setupCodeActionsHandler, "setupCodeActionsHandler");

// src/handlers/definition.ts
var import_node9 = require("vscode-languageserver/node");
function setupDefinitionHandler(connection2, documents2) {
    connection2.onDefinition((params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) return null;
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return null;
        const word = getWordAtPosition(document, params.position);
        if (!word) return null;
        for (const symbol of state.symbols) {
            if (symbol.name === word) {
                return import_node9.Location.create(params.textDocument.uri, symbol.range);
            }
        }
        return null;
    });
}
__name(setupDefinitionHandler, "setupDefinitionHandler");

// src/handlers/references.ts
var import_node10 = require("vscode-languageserver/node");
function setupReferencesHandler(connection2, documents2) {
    connection2.onReferences((params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) return null;
        const documentStates2 = getDocumentStates();
        const state = documentStates2.get(params.textDocument.uri);
        if (!state) return null;
        const word = getWordAtPosition(document, params.position);
        if (!word) return null;
        const locations = [];
        const text = document.getText();
        const lines = text.split("\n");
        const wordRegex = new RegExp(`\\b${word}\\b`, "g");
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = wordRegex.exec(line)) !== null) {
                locations.push(
                    import_node10.Location.create(
                        params.textDocument.uri,
                        import_node10.Range.create(
                            import_node10.Position.create(lineIndex, match.index),
                            import_node10.Position.create(lineIndex, match.index + word.length),
                        ),
                    ),
                );
            }
        });
        return locations.length > 0 ? locations : null;
    });
}
__name(setupReferencesHandler, "setupReferencesHandler");

// src/handlers/rename.ts
var import_node11 = require("vscode-languageserver/node");
var RESERVED_KEYWORDS = [
    "function",
    "end",
    "if",
    "then",
    "else",
    "elsif",
    "for",
    "to",
    "by",
    "in",
    "while",
    "do",
    "return",
    "break",
    "continue",
    "local",
    "var",
    "let",
    "and",
    "or",
    "not",
    "true",
    "false",
    "null",
    "object",
    "class",
    "extends",
    "new",
    "delete",
    "after",
    "every",
    "sleep",
];
var API_RESERVED = [
    "screen",
    "audio",
    "keyboard",
    "mouse",
    "touch",
    "gamepad",
    "sprites",
    "maps",
    "sounds",
    "music",
    "assets",
    "system",
    "storage",
    "scene",
    "route",
    "router",
    "print",
    "List",
    "Math",
    "String",
    "JSON",
    "Random",
    "ObjectPool",
    "Image",
    "Sprite",
    "Map",
    "Sound",
];
function setupRenameHandler(connection2, documents2) {
    connection2.onPrepareRename((params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) return null;
        const word = getWordAtPosition(document, params.position);
        if (!word) return null;
        if (RESERVED_KEYWORDS.includes(word) || API_RESERVED.includes(word)) {
            return null;
        }
        const line = document.getText({
            start: import_node11.Position.create(params.position.line, 0),
            end: import_node11.Position.create(params.position.line + 1, 0),
        });
        const wordIndex = line.indexOf(word);
        if (wordIndex === -1) return null;
        return {
            range: import_node11.Range.create(
                import_node11.Position.create(params.position.line, wordIndex),
                import_node11.Position.create(params.position.line, wordIndex + word.length),
            ),
            placeholder: word,
        };
    });
    connection2.onRenameRequest((params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) return null;
        const word = getWordAtPosition(document, params.position);
        if (!word) return null;
        const newName = params.newName;
        if (RESERVED_KEYWORDS.includes(newName) || API_RESERVED.includes(newName)) {
            return null;
        }
        const edits = [];
        const text = document.getText();
        const lines = text.split("\n");
        const wordRegex = new RegExp(`\\b${word}\\b`, "g");
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = wordRegex.exec(line)) !== null) {
                edits.push(
                    import_node11.TextEdit.replace(
                        import_node11.Range.create(
                            import_node11.Position.create(lineIndex, match.index),
                            import_node11.Position.create(lineIndex, match.index + word.length),
                        ),
                        newName,
                    ),
                );
            }
        });
        return {
            changes: {
                [params.textDocument.uri]: edits,
            },
        };
    });
}
__name(setupRenameHandler, "setupRenameHandler");

// src/handlers/semantic-tokens.ts
var import_node12 = require("vscode-languageserver/node");
var TOKEN_TYPES = ["namespace", "class", "function", "variable", "parameter", "property", "keyword", "number", "string", "comment"];
var TOKEN_MODIFIERS = ["declaration", "readonly", "static", "deprecated", "modification", "documentation", "defaultLibrary"];
var API_OBJECTS = ["screen", "audio", "keyboard", "mouse", "touch", "gamepad", "sprites", "maps", "sounds", "music", "assets", "system", "storage", "router"];
var CONSTRUCTORS = ["Random", "ObjectPool", "Image", "Sprite", "Map", "Sound", "List", "Math", "String", "JSON"];
function setupSemanticTokensHandler(connection2, documents2) {
    connection2.languages.semanticTokens.on((params) => {
        const document = documents2.get(params.textDocument.uri);
        if (!document) {
            return {
                data: [],
            };
        }
        const builder = new import_node12.SemanticTokensBuilder();
        const text = document.getText();
        const lines = text.split("\n");
        lines.forEach((line, lineIndex) => {
            API_OBJECTS.forEach((api) => {
                const regex = new RegExp(`\\b${api}\\b`, "g");
                let match2;
                while ((match2 = regex.exec(line)) !== null) {
                    builder.push(lineIndex, match2.index, api.length, 0, 1 << 6);
                }
            });
            CONSTRUCTORS.forEach((constructor) => {
                const regex = new RegExp(`\\b${constructor}\\b`, "g");
                let match2;
                while ((match2 = regex.exec(line)) !== null) {
                    builder.push(lineIndex, match2.index, constructor.length, 1, 1 << 6);
                }
            });
            const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
            let match;
            while ((match = functionRegex.exec(line)) !== null) {
                const funcName = match[1];
                if (!API_OBJECTS.includes(funcName) && !CONSTRUCTORS.includes(funcName)) {
                    builder.push(lineIndex, match.index, funcName.length, 2, 0);
                }
            }
            const numberRegex = /\b\d+(\.\d+)?\b/g;
            while ((match = numberRegex.exec(line)) !== null) {
                builder.push(lineIndex, match.index, match[0].length, 7, 0);
            }
            const stringRegex = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g;
            while ((match = stringRegex.exec(line)) !== null) {
                builder.push(lineIndex, match.index, match[0].length, 8, 0);
            }
            if (line.trim().startsWith("//")) {
                builder.push(lineIndex, line.indexOf("//"), line.length, 9, 0);
            }
        });
        return builder.build();
    });
}
__name(setupSemanticTokensHandler, "setupSemanticTokensHandler");

// src/server.ts
var connection = (0, import_node13.createConnection)(import_node13.ProposedFeatures.all);
var documents = new import_node13.TextDocuments(import_vscode_languageserver_textdocument2.TextDocument);
var documentRegionsCache = new DocumentRegionsCache();
var languageModes = new LanguageModes(documentRegionsCache);
var jsonLanguageService = createJSONLanguageService();
languageModes.registerMode(getJSONMode(jsonLanguageService, documentRegionsCache));
var GLOBAL_API_REQUEST = "lootiscript/globalApi";
connection.onRequest(GLOBAL_API_REQUEST, () => GLOBAL_API);
var hasConfigurationCapability = false;
var hasWorkspaceFolderCapability = false;
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    const result = {
        capabilities: {
            textDocumentSync: import_node13.TextDocumentSyncKind.Incremental,
            // Declare all LSP features this server implements
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ["."],
            },
            signatureHelpProvider: {
                triggerCharacters: ["(", ","],
            },
            hoverProvider: true,
            definitionProvider: true,
            documentSymbolProvider: true,
            workspaceSymbolProvider: true,
            referencesProvider: true,
            documentFormattingProvider: true,
            renameProvider: {
                prepareProvider: true,
            },
            codeActionProvider: {
                codeActionKinds: [import_node13.CodeActionKind.QuickFix, import_node13.CodeActionKind.Refactor],
            },
            semanticTokensProvider: {
                legend: {
                    tokenTypes: TOKEN_TYPES,
                    tokenModifiers: TOKEN_MODIFIERS,
                },
                full: true,
            },
        },
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true,
            },
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        connection.client.register(import_node13.DidChangeConfigurationNotification.type, void 0);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders((_event) => {
            connection.console.log("Workspace folder change event received.");
        });
    }
});
connection.onDidChangeConfiguration(async (change) => {
    if (hasConfigurationCapability) {
        clearDocumentSettings();
    } else {
        setGlobalSettings(sanitizeSettings(change.settings?.lootiscript));
    }
    for (const doc of documents.all()) {
        await validateTextDocument(doc, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
    }
});
documents.onDidChangeContent((change) => {
    updateDocumentState(change.document, connection);
    validateTextDocument(change.document, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
});
documents.onDidOpen((change) => {
    updateDocumentState(change.document, connection);
    validateTextDocument(change.document, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
});
documents.onDidClose((change) => {
    deleteDocumentState(change.document.uri);
    connection.sendDiagnostics({
        uri: change.document.uri,
        diagnostics: [],
    });
});
connection.onDidChangeWatchedFiles((_change) => {
    connection.console.log("We received an file change event");
});
setupCompletionHandlers(connection, documents, languageModes, hasConfigurationCapability);
setupHoverHandler(connection, documents, languageModes);
setupSignatureHelpHandler(connection, documents, hasConfigurationCapability);
setupSymbolHandlers(connection);
setupFormattingHandler(connection, documents, hasConfigurationCapability);
setupCodeActionsHandler(connection, documents);
setupDefinitionHandler(connection, documents);
setupReferencesHandler(connection, documents);
setupRenameHandler(connection, documents);
setupSemanticTokensHandler(connection, documents);
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map
