/**
 * AudioCore - Web Audio API wrapper
 * Manages audio context, beeper, and sound/music playback
 */
import { Beeper } from "../devices/beeper";
import { AUDIO_WORKLET_TODO } from "../shared/warnings";

export class AudioCore {
	public context!: AudioContext;
	private buffer: string[] = [];
	private playing: any[] = [];
	private wakeupList: any[] = [];
	// TODO: ScriptProcessorNode is deprecated, migrate to AudioWorklet
	private scriptProcessor?: ScriptProcessorNode;
	private node?: any;
	private beeper?: any;
	private bufferizer?: any;
	private runtime: any;

	constructor(runtime: any) {
		this.runtime = runtime;
		this.getContext();
	}

	/**
	 * Check if audio context is running
	 */
	public isStarted(): boolean {
		return this.context.state === "running";
	}

	/**
	 * Add item to wakeup list (for mobile audio activation)
	 */
	public addToWakeUpList(item: any): void {
		this.wakeupList.push(item);
	}

	/**
	 * Get interface for game code
	 */
	public getInterface() {
		return {
			beep: (sequence: string) => this.beep(sequence),
			cancelBeeps: () => this.cancelBeeps(),
			playSound: (
				sound: any,
				volume?: number,
				pitch?: number,
				pan?: number,
				loopit?: boolean,
			) => this.playSound(sound, volume, pitch, pan, loopit),
			playMusic: (music: any, volume?: number, loopit?: boolean) =>
				this.playMusic(music, volume, loopit),
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
		if (typeof sound === "string") {
			const s = this.runtime.sounds[sound.replace(/\//g, "-")];
			if (s) {
				return s.play(volume, pitch, pan, loopit);
			}
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
		if (typeof music === "string") {
			const m = this.runtime.music[music.replace(/\//g, "-")];
			if (m) {
				return m.play(volume, loopit);
			}
		}
		return 0;
	}

	/**
	 * Get or create audio context (lazy initialization - created on first use)
	 * Note: Browser may suspend context until user interaction, which is handled automatically
	 */
	public getContext(): AudioContext {
		if (!this.context) {
			const AudioContextClass =
				(window as any).AudioContext || (window as any).webkitAudioContext;
			// Create context - browser may suspend until user interaction
			this.context = new AudioContextClass();

			// If context is suspended, set up activation listeners
			if (this.context.state !== "running") {
				const activate = () => {
					if (this.context && this.context.state !== "running") {
						this.context.resume();
						if (this.beeper) {
							this.start();
						}
						for (const item of this.wakeupList) {
							item.wakeUp();
						}
						// Clean up listeners
						document.body.removeEventListener("touchend", activate);
						document.body.removeEventListener("mouseup", activate);
						document.body.removeEventListener("click", activate);
						document.body.removeEventListener("keydown", activate);
					}
				};

				// Add multiple event listeners for better compatibility
				document.body.addEventListener("touchend", activate, { once: true });
				document.body.addEventListener("mouseup", activate, { once: true });
				document.body.addEventListener("click", activate, { once: true });
				document.body.addEventListener("keydown", activate, { once: true });
			} else if (this.beeper) {
				this.start();
			}
		}

		return this.context;
	}

	/**
	 * Start audio processor
	 * TODO: ScriptProcessorNode is deprecated, should migrate to AudioWorklet
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet
	 */
	public start(): void {
		console.warn(AUDIO_WORKLET_TODO);
		// TODO: Use ScriptProcessorNode (deprecated, should migrate to AudioWorklet)
		this.scriptProcessor = this.context.createScriptProcessor(4096, 2, 2);
		this.scriptProcessor.onaudioprocess = (event) => this.onAudioProcess(event);
		this.scriptProcessor.connect(this.context.destination);

		this.node = this.createProcessorNode();
		this.flushBuffer();
		this.bufferizer = new AudioBufferizer(this.node);
	}

	/**
	 * Create audio processor node
	 */
	private createProcessorNode(): any {
		const node = {
			port: {
				onmessage: null as any,
				postMessage: (data: string) => {
					if (node.port.onmessage) {
						node.port.onmessage({ data });
					}
				},
			},
			beeps: [] as any[],
			last: 0,
			process: (_inputs: any, outputs: any, _parameters: any) => {
				return this.processAudio(outputs);
			},
		};

		// Setup message handler for beep commands
		node.port.onmessage = (event: any) => {
			const data = JSON.parse(event.data);
			
			if (data.name === "cancel_beeps") {
				node.beeps = [];
			} else if (data.name === "beep") {
				const seq = data.sequence;
				
				// Link sequence notes together
				for (let i = 0; i < seq.length; i++) {
					const note = seq[i];
					if (i > 0) {
						seq[i - 1].next = note;
					}
					
					// Resolve loopto index to actual note reference
					if (note.loopto != null) {
						note.loopto = seq[note.loopto];
					}
					
					// Initialize phase and time
					note.phase = 0;
					note.time = 0;
				}
				
				// Add first note to beeps queue
				if (seq.length > 0) {
					node.beeps.push(seq[0]);
				}
			}
		};

		return node;
	}

	/**
	 * Process audio samples
	 */
	private processAudio(outputs: any): boolean {
		const output = outputs[0];

		for (let i = 0; i < output.length; i++) {
			const channel = output[i];

			if (i > 0) {
				// Copy first channel to other channels
				for (let j = 0; j < channel.length; j++) {
					channel[j] = output[0][j];
				}
			} else {
				// Generate audio for first channel
				for (let j = 0; j < channel.length; j++) {
					let sig = 0;

					for (let k = this.node.beeps.length - 1; k >= 0; k--) {
						const b = this.node.beeps[k];
						let volume = b.volume;

						if (b.time / b.duration > b.span) {
							volume = 0;
						}

						// Generate waveform
						switch (b.waveform) {
							case "square":
								sig += b.phase > 0.5 ? volume : -volume;
								break;
							case "saw":
								sig += (b.phase * 2 - 1) * volume;
								break;
							case "noise":
								sig += (Math.random() * 2 - 1) * volume;
								break;
							default: // sine
								sig += Math.sin(b.phase * Math.PI * 2) * volume;
						}

						b.phase = (b.phase + b.increment) % 1;
						b.time += 1;

						if (b.time >= b.duration) {
							b.time = 0;

							if (b.loopto != null) {
								if (b.repeats != null && b.repeats > 0) {
									if (b.loopcount == null) {
										b.loopcount = 0;
									}
									b.loopcount++;

									if (b.loopcount >= b.repeats) {
										b.loopcount = 0;
										if (b.next != null) {
											b.next.phase = b.phase;
											this.node.beeps[k] = b.next;
										} else {
											this.node.beeps.splice(k, 1);
										}
									} else {
										b.loopto.phase = b.phase;
										this.node.beeps[k] = b.loopto;
									}
								} else {
									b.loopto.phase = b.phase;
									this.node.beeps[k] = b.loopto;
								}
							} else if (b.next != null) {
								b.next.phase = b.phase;
								this.node.beeps[k] = b.next;
							} else {
								this.node.beeps.splice(k, 1);
							}
						}
					}

					this.node.last = this.node.last * 0.9 + sig * 0.1;
					channel[j] = this.node.last;
				}
			}
		}

		return true;
	}

	/**
	 * Flush buffered messages
	 */
	private flushBuffer(): void {
		while (this.buffer.length > 0) {
			this.node.port.postMessage(this.buffer.splice(0, 1)[0]);
		}
	}

	/**
	 * Handle audio process event
	 */
	private onAudioProcess(event: AudioProcessingEvent): void {
		const left = event.outputBuffer.getChannelData(0);
		const right = event.outputBuffer.getChannelData(1);
		const outputs = [[left, right]];
		this.bufferizer.flush(outputs);
	}

	/**
	 * Get or create beeper
	 */
	public getBeeper(): any {
		if (!this.beeper) {
			// Create Beeper instance
			this.beeper = new Beeper(this);

			if (this.context.state === "running") {
				this.start();
			}
		}
		return this.beeper;
	}

	/**
	 * Play beep sequence
	 */
	public beep(sequence: string): void {
		this.getBeeper().beep(sequence);
	}

	/**
	 * Add beeps to audio processor
	 */
	public addBeeps(beeps: any[]): void {
		for (const b of beeps) {
			b.duration *= this.context.sampleRate;
			b.increment = b.frequency / this.context.sampleRate;
		}

		if (this.node) {
			this.node.port.postMessage(
				JSON.stringify({
					name: "beep",
					sequence: beeps,
				}),
			);
		} else {
			this.buffer.push(
				JSON.stringify({
					name: "beep",
					sequence: beeps,
				}),
			);
		}
	}

	/**
	 * Cancel all beeps
	 */
	public cancelBeeps(): void {
		if (this.node) {
			this.node.port.postMessage(
				JSON.stringify({
					name: "cancel_beeps",
				}),
			);
		} else {
			this.buffer.push(
				JSON.stringify({
					name: "cancel_beeps",
				}),
			);
		}

		this.stopAll();
	}

	/**
	 * Add playing sound/music to list
	 */
	public addPlaying(item: any): void {
		this.playing.push(item);
	}

	/**
	 * Remove playing sound/music from list
	 */
	public removePlaying(item: any): void {
		const index = this.playing.indexOf(item);
		if (index >= 0) {
			this.playing.splice(index, 1);
		}
	}

	/**
	 * Stop all playing sounds/music
	 */
	public stopAll(): void {
		for (const p of this.playing) {
			try {
				p.stop();
			} catch (err) {
				console.error(err);
			}
		}
		this.playing = [];
	}
}

/**
 * AudioBufferizer - Buffers audio processing
 */
class AudioBufferizer {
	private bufferSize = 4096;
	private chunkSize = 512;
	private chunks: any[] = [];
	private nbChunks: number;
	private current = 0;
	private node: any;

	constructor(node: any) {
		this.node = node;
		this.nbChunks = this.bufferSize / this.chunkSize;

		for (let i = 0; i < this.nbChunks; i++) {
			const left = new Array(this.chunkSize).fill(0);
			const right = new Array(this.chunkSize).fill(0);
			this.chunks.push([left, right]);
		}
	}

	public flush(outputs: any): void {
		for (let i = 0; i < outputs[0][0].length; i++) {
			if (this.current >= this.chunkSize) {
				if (this.node.beeps.length > 0) {
					this.node.process(null, this.chunks, null);
				}
				this.current = 0;
			}
			for (let c = 0; c < outputs[0].length; c++) {
				outputs[0][c][i] = this.chunks[0][c][this.current];
			}
			this.current++;
		}
	}
}
