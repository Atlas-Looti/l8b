/**
 * Audio API definitions
 */

import type { GlobalApi } from "../types";

export const audioApi: Partial<GlobalApi> = {
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
