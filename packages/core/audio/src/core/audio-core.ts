/**
 * AudioCore - Web Audio API wrapper
 * Manages audio context, beeper, and sound/music playback
 */

import {
	APIErrorCode,
	createDiagnostic,
	formatForBrowser,
} from "@l8b/diagnostics";
import { Beeper } from "../devices/beeper";
import { AUDIO_WORKLET_CODE } from "./audio-worklet";

export class AudioCore {
	public context!: AudioContext;
	private buffer: string[] =
		[];
	private playing: any[] =
		[];
	private wakeupList: any[] =
		[];
	private workletNode?: AudioWorkletNode;
	private beeper?: any;
	private runtime: any;

	constructor(
		runtime: any,
	) {
		this.runtime =
			runtime;
		this.getContext();
	}

	/**
	 * Check if audio context is running
	 */
	public isStarted(): boolean {
		return (
			this
				.context
				.state ===
			"running"
		);
	}

	/**
	 * Add item to wakeup list (for mobile audio activation)
	 */
	public addToWakeUpList(
		item: any,
	): void {
		this.wakeupList.push(
			item,
		);
	}

	/**
	 * Get interface for game code
	 */
	public getInterface() {
		return {
			beep: (
				sequence: string,
			) =>
				this.beep(
					sequence,
				),
			cancelBeeps:
				() =>
					this.cancelBeeps(),
			playSound:
				(
					sound: any,
					volume?: number,
					pitch?: number,
					pan?: number,
					loopit?: boolean,
				) =>
					this.playSound(
						sound,
						volume,
						pitch,
						pan,
						loopit,
					),
			playMusic:
				(
					music: any,
					volume?: number,
					loopit?: boolean,
				) =>
					this.playMusic(
						music,
						volume,
						loopit,
					),
		};
	}

	/**
	 * Play sound effect
	 */
	public playSound(
		sound: any,
		volume: number = 1,
		pitch: number = 1,
		pan: number = 0,
		loopit: boolean = false,
	): number {
		if (
			typeof sound ===
			"string"
		) {
			const soundName =
				sound.replace(
					/\//g,
					"-",
				);
			const s =
				this
					.runtime
					.sounds[
					soundName
				];
			if (
				!s
			) {
				const diagnostic =
					createDiagnostic(
						APIErrorCode.E7013,
						{
							data:
								{
									soundName,
								},
						},
					);
				const formatted =
					formatForBrowser(
						diagnostic,
					);

				if (
					this
						.runtime
						?.listener
						?.reportError
				) {
					this.runtime.listener.reportError(
						formatted,
					);
				}
				return 0;
			}
			return s.play(
				volume,
				pitch,
				pan,
				loopit,
			);
		}
		return 0;
	}

	/**
	 * Play music
	 */
	public playMusic(
		music: any,
		volume: number = 1,
		loopit: boolean = false,
	): number {
		if (
			typeof music ===
			"string"
		) {
			const musicName =
				music.replace(
					/\//g,
					"-",
				);
			const m =
				this
					.runtime
					.music[
					musicName
				];
			if (
				!m
			) {
				const diagnostic =
					createDiagnostic(
						APIErrorCode.E7014,
						{
							data:
								{
									musicName,
								},
						},
					);
				const formatted =
					formatForBrowser(
						diagnostic,
					);

				if (
					this
						.runtime
						?.listener
						?.reportError
				) {
					this.runtime.listener.reportError(
						formatted,
					);
				}
				return 0;
			}
			return m.play(
				volume,
				loopit,
			);
		}
		return 0;
	}

	/**
	 * Get or create audio context (lazy initialization - created on first use)
	 * Note: Browser may suspend context until user interaction, which is handled automatically
	 */
	public getContext(): AudioContext {
		if (
			!this
				.context
		) {
			const AudioContextClass =
				(
					window as any
				)
					.AudioContext ||
				(
					window as any
				)
					.webkitAudioContext;
			// Create context - browser may suspend until user interaction
			this.context =
				new AudioContextClass();

			// If context is suspended, set up activation listeners
			if (
				this
					.context
					.state !==
				"running"
			) {
				const activate =
					() => {
						if (
							this
								.context &&
							this
								.context
								.state !==
								"running"
						) {
							this.context.resume();
							if (
								this
									.beeper
							) {
								this.start();
							}
							for (const item of this
								.wakeupList) {
								item.wakeUp();
							}
							// Clean up listeners
							document.body.removeEventListener(
								"touchend",
								activate,
							);
							document.body.removeEventListener(
								"mouseup",
								activate,
							);
							document.body.removeEventListener(
								"click",
								activate,
							);
							document.body.removeEventListener(
								"keydown",
								activate,
							);
						}
					};

				// Add multiple event listeners for better compatibility
				document.body.addEventListener(
					"touchend",
					activate,
					{
						once: true,
					},
				);
				document.body.addEventListener(
					"mouseup",
					activate,
					{
						once: true,
					},
				);
				document.body.addEventListener(
					"click",
					activate,
					{
						once: true,
					},
				);
				document.body.addEventListener(
					"keydown",
					activate,
					{
						once: true,
					},
				);
			} else if (
				this
					.beeper
			) {
				this.start();
			}
		}

		return this
			.context;
	}

	/**
	 * Start audio processor
	 */
	public async start(): Promise<void> {
		if (
			this
				.workletNode
		)
			return;

		try {
			const blob =
				new Blob(
					[
						AUDIO_WORKLET_CODE,
					],
					{
						type:
							"application/javascript",
					},
				);
			const url =
				URL.createObjectURL(
					blob,
				);

			await this.context.audioWorklet.addModule(
				url,
			);

			this.workletNode =
				new AudioWorkletNode(
					this
						.context,
					"l8b-audio-processor",
				);
			this.workletNode.connect(
				this
					.context
					.destination,
			);

			this.flushBuffer();
		} catch (e) {
			const diagnostic =
				createDiagnostic(
					APIErrorCode.E7012,
					{
						data:
							{
								error:
									String(
										e,
									),
							},
					},
				);
			const formatted =
				formatForBrowser(
					diagnostic,
				);

			if (
				this
					.runtime
					?.listener
					?.reportError
			) {
				this.runtime.listener.reportError(
					formatted,
				);
			}
		}
	}

	/**
	 * Flush buffered messages
	 */
	private flushBuffer(): void {
		if (
			!this
				.workletNode
		)
			return;

		while (
			this
				.buffer
				.length >
			0
		) {
			this.workletNode.port.postMessage(
				this.buffer.splice(
					0,
					1,
				)[0],
			);
		}
	}

	/**
	 * Get or create beeper
	 */
	public getBeeper(): any {
		if (
			!this
				.beeper
		) {
			// Create Beeper instance
			this.beeper =
				new Beeper(
					this,
				);

			if (
				this
					.context
					.state ===
				"running"
			) {
				this.start();
			}
		}
		return this
			.beeper;
	}

	/**
	 * Play beep sequence
	 */
	public beep(
		sequence: string,
	): void {
		this.getBeeper().beep(
			sequence,
		);
	}

	/**
	 * Add beeps to audio processor
	 */
	public addBeeps(
		beeps: any[],
	): void {
		for (const b of beeps) {
			b.duration *=
				this.context.sampleRate;
			b.increment =
				b.frequency /
				this
					.context
					.sampleRate;
		}

		if (
			this
				.workletNode
		) {
			this.workletNode.port.postMessage(
				JSON.stringify(
					{
						name:
							"beep",
						sequence:
							beeps,
					},
				),
			);
		} else {
			this.buffer.push(
				JSON.stringify(
					{
						name:
							"beep",
						sequence:
							beeps,
					},
				),
			);
		}
	}

	/**
	 * Cancel all beeps
	 */
	public cancelBeeps(): void {
		if (
			this
				.workletNode
		) {
			this.workletNode.port.postMessage(
				JSON.stringify(
					{
						name:
							"cancel_beeps",
					},
				),
			);
		} else {
			this.buffer.push(
				JSON.stringify(
					{
						name:
							"cancel_beeps",
					},
				),
			);
		}

		this.stopAll();
	}

	/**
	 * Add playing sound/music to list
	 */
	public addPlaying(
		item: any,
	): void {
		this.playing.push(
			item,
		);
	}

	/**
	 * Remove playing sound/music from list
	 */
	public removePlaying(
		item: any,
	): void {
		const index =
			this.playing.indexOf(
				item,
			);
		if (
			index >=
			0
		) {
			this.playing.splice(
				index,
				1,
			);
		}
	}

	/**
	 * Stop all playing sounds/music
	 */
	public stopAll(): void {
		for (const p of this
			.playing) {
			try {
				p.stop();
			} catch (err) {
				const diagnostic =
					createDiagnostic(
						APIErrorCode.E7016,
						{
							data:
								{
									error:
										String(
											err,
										),
								},
						},
					);
				const formatted =
					formatForBrowser(
						diagnostic,
					);

				if (
					this
						.runtime
						?.listener
						?.reportError
				) {
					this.runtime.listener.reportError(
						formatted,
					);
				}
			}
		}
		this.playing =
			[];
	}
}
