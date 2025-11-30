/**
 * Music - Music streaming and playback using HTML5 Audio
 * L8B Music class for LootiScript
 */
export class Music {
	public ready: number = 1;
	public name: string = "";
	public url: string;
	public tag: HTMLAudioElement;
	public playing: boolean = false;
	private audio: any;

	constructor(audio: any, url: string) {
		this.audio = audio;
		this.url = url;
		this.tag = new Audio(this.url);
		this.ready = 1;
	}

	/**
	 * Play music with volume and loop (HTML5 Audio implementation)
	 */
	public play(volume: number = 1, loopit: boolean = false): any {
		this.playing = true;
		this.tag.loop = !!loopit;
		this.tag.volume = Math.max(0, Math.min(1, volume));

		if (this.audio.isStarted()) {
			this.tag.play();
		} else {
			this.audio.addToWakeUpList(this);
		}

		this.audio.addPlaying(this);

		return {
			play: () => {
				return this.tag.play();
			},
			stop: () => {
				this.playing = false;
				this.tag.pause();
				this.audio.removePlaying(this);
			},
			setVolume: (v: number) => {
				this.tag.volume = Math.max(0, Math.min(1, v));
			},
			getPosition: () => {
				return this.tag.currentTime;
			},
			getDuration: () => {
				return this.tag.duration;
			},
			setPosition: (pos: number) => {
				this.tag.pause();
				this.tag.currentTime = Math.max(0, Math.min(this.tag.duration, pos));
				if (this.playing) {
					this.tag.play();
				}
			},
		};
	}

	/**
	 * Wake up audio (for autoplay policy)
	 */
	public wakeUp(): void {
		if (this.playing) {
			this.tag.play();
		}
	}

	/**
	 * Stop music
	 */
	public stop(): void {
		this.playing = false;
		this.tag.pause();
	}
}
