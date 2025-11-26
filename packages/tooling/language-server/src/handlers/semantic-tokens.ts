import {
	SemanticTokensBuilder,
	SemanticTokensParams,
	SemanticTokens,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments, Connection } from "vscode-languageserver/node";

// Token types (must match client configuration)
export const TOKEN_TYPES = [
	"namespace", // 0 - API objects (screen, audio, etc)
	"class", // 1 - Constructors (Random, ObjectPool, etc)
	"function", // 2 - Functions
	"variable", // 3 - Variables
	"parameter", // 4 - Function parameters
	"property", // 5 - Object properties
	"keyword", // 6 - Reserved keywords
	"number", // 7 - Numbers
	"string", // 8 - Strings
	"comment", // 9 - Comments
];

// Token modifiers
export const TOKEN_MODIFIERS = [
	"declaration", // 0
	"readonly", // 1
	"static", // 2
	"deprecated", // 3
	"modification", // 4
	"documentation", // 5
	"defaultLibrary", // 6 - Built-in/standard library
];

// API objects for semantic highlighting
const API_OBJECTS = [
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
	"router",
];

const CONSTRUCTORS = [
	"Random",
	"ObjectPool",
	"Image",
	"Sprite",
	"Map",
	"Sound",
	"List",
	"Math",
	"String",
	"JSON",
];

export function setupSemanticTokensHandler(
	connection: Connection,
	documents: TextDocuments<TextDocument>,
) {
	connection.languages.semanticTokens.on(
		(params: SemanticTokensParams): SemanticTokens => {
			const document = documents.get(params.textDocument.uri);
			if (!document) {
				return { data: [] };
			}

			const builder = new SemanticTokensBuilder();
			const text = document.getText();
			const lines = text.split("\n");

			lines.forEach((line, lineIndex) => {
				// Highlight API objects
				API_OBJECTS.forEach((api) => {
					const regex = new RegExp(`\\b${api}\\b`, "g");
					let match;
					while ((match = regex.exec(line)) !== null) {
						builder.push(
							lineIndex,
							match.index,
							api.length,
							0, // namespace
							1 << 6, // defaultLibrary modifier
						);
					}
				});

				// Highlight constructors
				CONSTRUCTORS.forEach((constructor) => {
					const regex = new RegExp(`\\b${constructor}\\b`, "g");
					let match;
					while ((match = regex.exec(line)) !== null) {
						builder.push(
							lineIndex,
							match.index,
							constructor.length,
							1, // class
							1 << 6, // defaultLibrary modifier
						);
					}
				});

				// Highlight function calls (word followed by ()
				const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
				let match;
				while ((match = functionRegex.exec(line)) !== null) {
					const funcName = match[1];
					if (
						!API_OBJECTS.includes(funcName) &&
						!CONSTRUCTORS.includes(funcName)
					) {
						builder.push(
							lineIndex,
							match.index,
							funcName.length,
							2, // function
							0,
						);
					}
				}

				// Highlight numbers
				const numberRegex = /\b\d+(\.\d+)?\b/g;
				while ((match = numberRegex.exec(line)) !== null) {
					builder.push(lineIndex, match.index, match[0].length, 7, 0); // number
				}

				// Highlight strings
				const stringRegex = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g;
				while ((match = stringRegex.exec(line)) !== null) {
					builder.push(lineIndex, match.index, match[0].length, 8, 0); // string
				}

				// Highlight comments
				if (line.trim().startsWith("//")) {
					builder.push(lineIndex, line.indexOf("//"), line.length, 9, 0); // comment
				}
			});

			return builder.build();
		},
	);
}
