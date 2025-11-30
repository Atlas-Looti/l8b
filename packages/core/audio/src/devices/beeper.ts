/**
 * Beeper - Procedural sound generation from text sequences
 * Converts music notation strings into beep sequences
 * Example: "square tempo 120 C4 D4 E4 F4"
 */
export class Beeper {
	private audio: any;
	private notes: Record<string | number, number> = {};
	private plainNotes: Record<string, number> = {};
	private currentOctave = 5;
	private currentDuration = 0.5;
	private currentVolume = 0.5;
	private currentSpan = 1;
	private currentWaveform = "square";

	constructor(audio: any) {
		this.audio = audio;
		this.initializeNotes();
	}

	/**
	 * Initialize note mappings
	 */
	private initializeNotes(): void {
		const noteNames = [
			["C", "DO"],
			["C#", "DO#", "Db", "REb"],
			["D", "RE"],
			["D#", "RE#", "Eb", "MIb"],
			["E", "MI"],
			["F", "FA"],
			["F#", "FA#", "Gb", "SOLb"],
			["G", "SOL"],
			["G#", "SOL#", "Ab", "LAb"],
			["A", "LA"],
			["A#", "LA#", "Bb", "SIb"],
			["B", "SI"],
		];

		for (let i = 0; i <= 127; i++) {
			this.notes[i] = i;
			const oct = Math.floor(i / 12) - 1;

			for (const n of noteNames[i % 12]) {
				this.notes[n + oct] = i;
			}

			if (oct === -1) {
				for (const n of noteNames[i % 12]) {
					this.plainNotes[n] = i;
				}
			}
		}
	}

	/**
	 * Parse and play beep sequence
	 */
	public beep(input: string): void {
		let status: string = "normal";
		const sequence: any[] = [];
		const loops: any[] = [];
		let note: number | undefined;

		const parsed = input.split(" ");

		for (const t of parsed) {
			if (t === "") continue;

			switch (status) {
				case "normal":
					if (this.notes[t] !== undefined) {
						// Full note with octave (e.g., "C4")
						note = this.notes[t];
						this.currentOctave = Math.floor(note / 12);
						sequence.push({
							frequency: 440 * (2 ** (1 / 12)) ** (note - 69),
							volume: this.currentVolume,
							span: this.currentSpan,
							duration: this.currentDuration,
							waveform: this.currentWaveform,
						});
					} else if (this.plainNotes[t] !== undefined) {
						// Note without octave (e.g., "C")
						note = this.plainNotes[t] + this.currentOctave * 12;
						sequence.push({
							frequency: 440 * (2 ** (1 / 12)) ** (note - 69),
							volume: this.currentVolume,
							span: this.currentSpan,
							duration: this.currentDuration,
							waveform: this.currentWaveform,
						});
					} else if (["square", "sine", "saw", "noise"].includes(t)) {
						// Waveform
						this.currentWaveform = t;
					} else if (["tempo", "duration", "volume", "span", "loop", "to"].includes(t)) {
						// Commands
						status = t;
					} else if (t === "-") {
						// Rest/silence
						sequence.push({
							frequency: 440,
							volume: 0,
							span: this.currentSpan,
							duration: this.currentDuration,
							waveform: this.currentWaveform,
						});
					} else if (t === "end") {
						// End loop
						if (loops.length > 0 && sequence.length > 0) {
							sequence.push({
								frequency: 440,
								volume: 0,
								span: this.currentSpan,
								duration: 0,
								waveform: this.currentWaveform,
							});

							const lop = loops.splice(loops.length - 1, 1)[0];
							sequence[sequence.length - 1].loopto = lop.start;
							sequence[sequence.length - 1].repeats = lop.repeats;
						}
					}
					break;

				case "tempo": {
					status = "normal";
					const tempo = Number.parseFloat(t);
					if (!Number.isNaN(tempo) && tempo > 0) {
						this.currentDuration = 60 / tempo;
					}
					break;
				}

				case "duration": {
					status = "normal";
					const duration = Number.parseFloat(t);
					if (!Number.isNaN(duration) && duration > 0) {
						this.currentDuration = duration / 1000;
					}
					break;
				}

				case "volume": {
					status = "normal";
					const volume = Number.parseFloat(t);
					if (!Number.isNaN(volume)) {
						this.currentVolume = volume / 100;
					}
					break;
				}

				case "span": {
					status = "normal";
					const span = Number.parseFloat(t);
					if (!Number.isNaN(span)) {
						this.currentSpan = span / 100;
					}
					break;
				}

				case "loop": {
					status = "normal";
					loops.push({
						start: sequence.length,
					});
					const repeats = Number.parseFloat(t);
					if (!Number.isNaN(repeats)) {
						loops[loops.length - 1].repeats = repeats;
					}
					break;
				}

				case "to":
					status = "normal";
					if (note !== undefined) {
						let n: number | undefined;

						if (this.notes[t] !== undefined) {
							n = this.notes[t];
						} else if (this.plainNotes[t] !== undefined) {
							n = this.plainNotes[t] + this.currentOctave * 12;
						}

						if (n !== undefined && n !== note) {
							// Generate slide from note to n
							const step = n > note ? 1 : -1;
							for (let i = note + step; step > 0 ? i <= n : i >= n; i += step) {
								sequence.push({
									frequency: 440 * (2 ** (1 / 12)) ** (i - 69),
									volume: this.currentVolume,
									span: this.currentSpan,
									duration: this.currentDuration,
									waveform: this.currentWaveform,
								});
							}
							note = n;
						}
					}
					break;
			}
		}

		// Close any remaining loops
		if (loops.length > 0 && sequence.length > 0) {
			const lop = loops.splice(loops.length - 1, 1)[0];
			sequence.push({
				frequency: 440,
				volume: 0,
				span: this.currentSpan,
				duration: 0,
				waveform: this.currentWaveform,
			});

			sequence[sequence.length - 1].loopto = lop.start;
			sequence[sequence.length - 1].repeats = lop.repeats;
		}

		this.audio.addBeeps(sequence);
	}
}
