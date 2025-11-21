export const AUDIO_WORKLET_CODE = `
class L8bAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.beeps = [];
        this.last = 0;
        this.port.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.name === "cancel_beeps") {
                this.beeps = [];
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
                    this.beeps.push(seq[0]);
                }
            }
        };
    }

    process(inputs, outputs, parameters) {
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
                    
                    for (let k = this.beeps.length - 1; k >= 0; k--) {
                        const b = this.beeps[k];
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
                                            this.beeps[k] = b.next;
                                        } else {
                                            this.beeps.splice(k, 1);
                                        }
                                    } else {
                                        b.loopto.phase = b.phase;
                                        this.beeps[k] = b.loopto;
                                    }
                                } else {
                                    b.loopto.phase = b.phase;
                                    this.beeps[k] = b.loopto;
                                }
                            } else if (b.next != null) {
                                b.next.phase = b.phase;
                                this.beeps[k] = b.next;
                            } else {
                                this.beeps.splice(k, 1);
                            }
                        }
                    }
                    
                    this.last = this.last * 0.9 + sig * 0.1;
                    channel[j] = this.last;
                }
            }
        }
        
        return true;
    }
}

registerProcessor("l8b-audio-processor", L8bAudioProcessor);
`;
