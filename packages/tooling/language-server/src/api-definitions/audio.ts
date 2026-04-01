/**
 * Audio API definitions
 * Matches actual implementation in core/audio/src/core/audio-core.ts
 */

import type { GlobalApi } from "../types";

export const audioApi: Partial<GlobalApi> = {
	audio: {
		type: "object",
		description: "Audio playback and sound interface",
		properties: {
			beep: {
				type: "method",
				description: "Play a beep sequence",
				signature: "audio.beep(sequence: string): void",
			},
			cancelBeeps: {
				type: "method",
				description: "Cancel all pending beeps",
				signature: "audio.cancelBeeps(): void",
			},
			playSound: {
				type: "method",
				description: "Play a sound file",
				signature:
					"audio.playSound(sound: string | Sound, volume?: number, pitch?: number, pan?: number, loopit?: boolean): number",
			},
			playMusic: {
				type: "method",
				description: "Play background music",
				signature: "audio.playMusic(music: string | Music, volume?: number, loopit?: boolean): number",
			},
			setVolume: {
				type: "method",
				description: "Set master volume (0-1). Applied as multiplier to all sound and music playback.",
				signature: "audio.setVolume(volume: number): void",
			},
			getVolume: {
				type: "method",
				description: "Get current master volume (0-1)",
				signature: "audio.getVolume(): number",
			},
			stopAll: {
				type: "method",
				description: "Stop all currently playing sounds and music",
				signature: "audio.stopAll(): void",
			},
		},
	},
};
