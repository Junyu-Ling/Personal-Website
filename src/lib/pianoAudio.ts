const PARTIALS: Array<[number, number]> = [
  [1, 1],
  [2, 0.42],
  [3, 0.2],
  [4, 0.12],
  [5, 0.08],
  [6, 0.05],
  [7, 0.03],
  [8, 0.018],
];

function midiToFreq(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12);
}

class PianoSynth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  async ensure() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.42;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  async play(midi: number, velocity = 0.86) {
    const ctx = await this.ensure();
    const freq = midiToFreq(midi);
    const now = ctx.currentTime;
    const duration = 1.9 + Math.max(0, (72 - midi) * 0.035);
    const level = (0.1 + velocity * 0.26) * (midi > 96 ? 0.72 : 1);

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, now);
    out.gain.exponentialRampToValueAtTime(level, now + 0.01);
    out.gain.exponentialRampToValueAtTime(level * 0.38, now + 0.16);
    out.gain.exponentialRampToValueAtTime(level * 0.12, now + 0.7);
    out.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    out.connect(this.master!);

    for (const [harmonic, amp] of PARTIALS) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const decay = ctx.createGain();
      const inharmonic = freq * harmonic * Math.sqrt(1 + 0.00011 * harmonic * harmonic);
      osc.type = harmonic === 1 ? "triangle" : "sine";
      osc.frequency.value = inharmonic;
      gain.gain.value = amp;
      decay.gain.setValueAtTime(1, now);
      decay.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration / Math.sqrt(harmonic)
      );
      osc.connect(gain).connect(decay).connect(out);
      osc.start(now);
      osc.stop(now + duration + 0.04);
    }

    const noiseLen = Math.floor(ctx.sampleRate * 0.03);
    const buffer = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = Math.min(3800, freq * 3.2);
    filter.Q.value = 1.1;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    noise.connect(filter).connect(noiseGain).connect(out);
    noise.start(now);
  }
}

export const pianoSynth = new PianoSynth();
