/**
 * Audio API error message templates (E7011-E7020)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const audioMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7011]: {
		code: APIErrorCode.E7011,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Audio context creation failed",
		description: "The browser could not create an AudioContext",
		suggestions: ["Check if the browser supports Web Audio API", "Try user interaction to activate audio", "Check browser console for more details"],
	},
	[APIErrorCode.E7012]: {
		code: APIErrorCode.E7012,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Audio worklet failed to start",
		description: "The audio worklet processor could not be initialized",
		suggestions: ["Check if AudioWorklet is supported", "Verify the worklet code is valid", "Check browser console for errors"],
	},
	[APIErrorCode.E7013]: {
		code: APIErrorCode.E7013,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Sound not found: '${args.soundName}'`,
		description: "The requested sound does not exist in the sound collection",
		suggestions: ["Check if the sound name is spelled correctly", "Verify the sound was loaded before use", "Check the sound file path"],
	},
	[APIErrorCode.E7014]: {
		code: APIErrorCode.E7014,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Music not found: '${args.musicName}'`,
		description: "The requested music does not exist in the music collection",
		suggestions: ["Check if the music name is spelled correctly", "Verify the music was loaded before use", "Check the music file path"],
	},
	[APIErrorCode.E7015]: {
		code: APIErrorCode.E7015,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Audio context is suspended",
		description: "The audio context requires user interaction to resume",
		suggestions: ["Wait for user interaction (click, touch, keypress)", "The context will resume automatically", "Check if audio autoplay is blocked"],
	},
	[APIErrorCode.E7016]: {
		code: APIErrorCode.E7016,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid audio parameters: ${args.error || "unknown"}`,
		description: "Audio playback parameters are invalid",
		suggestions: ["Check volume is between 0 and 1", "Check pitch is a positive number", "Check pan is between -1 and 1"],
	},
};
