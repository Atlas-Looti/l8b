/**
 * Time API definitions
 */

import type { GlobalApi } from "../types";

export const timeApi: Partial<GlobalApi> = {
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
