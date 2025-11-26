import { TextDocument } from "vscode-languageserver-textdocument";
import { Position } from "vscode-languageserver/node";
import { CompletionContext } from "./types";

export function getWordAtPosition(
	document: TextDocument,
	position: Position,
): string | null {
	const line = document.getText({
		start: Position.create(position.line, 0),
		end: Position.create(position.line, Number.MAX_SAFE_INTEGER),
	});
	const regex = /[A-Za-z_][A-Za-z0-9_]*/g;
	let match: RegExpExecArray | null;
	while ((match = regex.exec(line))) {
		const start = match.index;
		const end = start + match[0].length;
		if (position.character >= start && position.character <= end) {
			return match[0];
		}
	}
	return null;
}

export function detectCompletionContext(
	document: TextDocument,
	position: Position,
): CompletionContext {
	const line = document.getText({
		start: Position.create(position.line, 0),
		end: Position.create(position.line, position.character),
	});

	// Check for property access (e.g., "screen.")
	const propertyMatch = line.match(/([A-Za-z_][A-Za-z0-9_]*)\.\s*$/);
	if (propertyMatch) {
		return {
			type: "property",
			object: propertyMatch[1],
		};
	}

	// Check if we're in a function call
	const openParenCount = (line.match(/\(/g) || []).length;
	const closeParenCount = (line.match(/\)/g) || []).length;
	if (openParenCount > closeParenCount) {
		return {
			type: "function_call",
			inFunctionCall: true,
		};
	}

	return { type: "default" };
}

export function getClosestPropertySuggestion(
	target: string,
	candidates: string[],
): string | null {
	if (candidates.length === 0) {
		return null;
	}

	let bestMatch: { value: string; score: number } | null = null;
	for (const candidate of candidates) {
		const score = levenshteinDistance(target, candidate);
		if (!bestMatch || score < bestMatch.score) {
			bestMatch = { value: candidate, score };
		}
	}

	if (!bestMatch) {
		return null;
	}

	const threshold = Math.max(1, Math.floor(target.length * 0.4));
	return bestMatch.score <= threshold ? bestMatch.value : null;
}

export function levenshteinDistance(a: string, b: string): number {
	const rows = a.length + 1;
	const cols = b.length + 1;
	const dp: number[][] = Array.from({ length: rows }, () =>
		Array(cols).fill(0),
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
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1,
				dp[i][j - 1] + 1,
				dp[i - 1][j - 1] + cost,
			);
		}
	}

	return dp[a.length][b.length];
}
