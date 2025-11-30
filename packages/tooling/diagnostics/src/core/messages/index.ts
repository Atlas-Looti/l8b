/**
 * Message templates index - combines all message categories
 */

import type { MessageTemplate } from "../types";
import { apiMessages } from "./api";
import { cliMessages } from "./cli-messages";
import { compilationMessages } from "./compilation-messages";
import { runtimeMessages } from "./runtime-messages";
import { sceneMessages } from "./scene-messages";
import { syntaxMessages } from "./syntax-messages";
import { warningMessages } from "./warning-messages";

/**
 * All diagnostic message templates combined
 */
export const MESSAGES: Record<string, MessageTemplate> = {
	...syntaxMessages,
	...runtimeMessages,
	...compilationMessages,
	...sceneMessages,
	...cliMessages,
	...apiMessages,
	...warningMessages,
};

/**
 * Get a message template for a diagnostic code
 */
export function getMessageTemplate(code: string): MessageTemplate | undefined {
	return MESSAGES[code];
}

/**
 * Format a message from a template with arguments
 */
export function formatMessage(code: string, args: Record<string, any> = {}): string {
	const template = getMessageTemplate(code);
	if (!template) {
		return args.error || args.message || `Unknown error: ${code}`;
	}

	if (typeof template.message === "string") {
		return template.message;
	}

	return template.message(args);
}

/**
 * Get suggestions for a diagnostic code
 */
export function getSuggestions(code: string, args: Record<string, any> = {}): string[] {
	const template = getMessageTemplate(code);
	if (!template || !template.suggestions) {
		return [];
	}

	if (typeof template.suggestions === "function") {
		return template.suggestions(args);
	}

	return template.suggestions;
}
