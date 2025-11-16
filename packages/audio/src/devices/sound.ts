/**
 * Sound - Sound effect playback
 * Handles loading and playing audio buffers
 */
export class Sound {
	public ready: number = 0;
	public buffer?: AudioBuffer;
	public name: string = "";
	public url: string;
	private audio: any;

	constructor(audio: any, url: string | AudioBuffer) {
		this.audio = audio;

		if (url instanceof AudioBuffer) {
			this.buffer = url;
			this.url = "";
			this.ready = 1;
		} else {
			this.url = url;
			this.loadSound(url);
		}
	}

	/**
	 * Load sound from URL
	 */
	private loadSound(url: string): void {
		const request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = "arraybuffer";

		request.onload = () => {
			this.audio.context.decodeAudioData(
				request.response,
				(buffer: AudioBuffer) => {
					this.buffer = buffer;
					this.ready = 1;
				},
				(err: any) => {
					console.error("Error decoding audio:", err);
				},
			);
		};

		request.onerror = () => {
			console.error("Error loading sound:", url);
		};

		request.send();
	}

	/**
	 * Play sound with volume, pitch, pan, and loop
	 */
	public play(
		volume: number = 1,
		pitch: number = 1,
		pan: number = 0,
		loopit: boolean = false,
	): any {
		if (!this.buffer) return { stop: () => {}, finished: true };

		const context = this.audio.context;

		// Create source
		const source = context.createBufferSource();
		source.playbackRate.value = pitch;
		source.buffer = this.buffer;
		if (loopit) source.loop = true;

		// Create gain node
		const gain = context.createGain();
		gain.gain.value = volume;

		// Create panner
		let panner: any;
		if (context.createStereoPanner) {
			panner = context.createStereoPanner();
			panner.setPan = (p: number) => {
				panner.pan.value = p;
			};
		} else {
			panner = context.createPanner();
			panner.panningModel = "equalpower";
			panner.setPan = (p: number) => {
				panner.setPosition(p, 0, 1 - Math.abs(p));
			};
		}
		panner.setPan(pan);

		// Connect nodes
		source.connect(gain);
		gain.connect(panner);
		panner.connect(context.destination);

		// Start playback
		source.start();

		// Track playing sounds for looping
		let playing: any = null;
		if (loopit) {
			playing = {
				stop: () => {
					source.stop();
				},
			};
			this.audio.addPlaying(playing);
		}

		// Return control interface
		const res = {
			stop: () => {
				source.stop();
				if (playing) this.audio.removePlaying(playing);
				return 1;
			},
			setVolume: (v: number) => {
				gain.gain.value = Math.max(0, Math.min(1, v));
			},
			setPitch: (p: number) => {
				source.playbackRate.value = Math.max(0.001, Math.min(1000, p));
			},
			setPan: (p: number) => {
				panner.setPan(Math.max(-1, Math.min(1, p)));
			},
			getDuration: () => {
				return source.buffer ? source.buffer.duration : 0;
			},
			finished: false,
		};

		source.onended = () => {
			res.finished = true;
		};

		return res;
	}

	/**
	 * Create MicroSound class for procedural sound generation
	 */
	public static createSoundClass(audiocore: any): any {
		return class MicroSound {
			public static classname = "Sound";
			public channels: number;
			public length: number;
			public sampleRate: number;
			private sound: Sound;
			private buffer: AudioBuffer;

			constructor(
				channels: number,
				length: number,
				sampleRate: number = 44100,
			) {
				// Validate parameters
				channels = channels === 1 ? 1 : 2;
				if (!(length > 1 && length < 44100 * 1000)) {
					length = 44100;
				}
				if (!(sampleRate >= 8000 && sampleRate <= 96000)) {
					sampleRate = 44100;
				}

				this.channels = channels;
				this.length = length;
				this.sampleRate = sampleRate;

				// Create audio buffer
				this.buffer = audiocore.context.createBuffer(
					channels,
					length,
					sampleRate,
				);
				this.sound = new Sound(audiocore, this.buffer);
			}

			/**
			 * Play the sound
			 */
			public play(
				volume?: number,
				pitch?: number,
				pan?: number,
				loopit?: boolean,
			): any {
				return this.sound.play(volume, pitch, pan, loopit);
			}

			/**
			 * Write sample value to buffer
			 */
			public write(channel: number, position: number, value: number): void {
				if (channel === 0) {
					const ch1 = this.buffer.getChannelData(0);
					ch1[position] = value;
				} else if (this.channels === 2) {
					const ch2 = this.buffer.getChannelData(1);
					ch2[position] = value;
				}
			}

			/**
			 * Read sample value from buffer
			 */
			public read(channel: number, position: number): number {
				if (channel === 0) {
					const ch1 = this.buffer.getChannelData(0);
					return ch1[position];
				} else if (this.channels === 2) {
					const ch2 = this.buffer.getChannelData(1);
					return ch2[position];
				}
				return 0;
			}
		};
	}
}
