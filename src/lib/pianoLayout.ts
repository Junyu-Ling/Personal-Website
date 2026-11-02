export type PianoKeyDef = {
  midi: number;
  name: string;
  black: boolean;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
};

export const MIDI_MIN = 21;
export const MIDI_MAX = 108;

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

const WHITE_W = 0.0224;
const WHITE_D = 0.15;
const WHITE_H = 0.016;
const BLACK_W = 0.0125;
const BLACK_D = 0.096;
const BLACK_H = 0.011;
const GAP = 0.0007;

export function midiToName(midi: number) {
  const pc = ((midi % 12) + 12) % 12;
  const oct = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pc]}${oct}`;
}

export function isBlackMidi(midi: number) {
  return [1, 3, 6, 8, 10].includes(((midi % 12) + 12) % 12);
}

export function buildPianoKeys(): PianoKeyDef[] {
  const whites: number[] = [];
  for (let midi = MIDI_MIN; midi <= MIDI_MAX; midi += 1) {
    if (!isBlackMidi(midi)) whites.push(midi);
  }

  const totalW = whites.length * WHITE_W + (whites.length - 1) * GAP;
  const startX = -totalW / 2 + WHITE_W / 2;
  const whiteX = new Map<number, number>();
  whites.forEach((midi, index) => {
    whiteX.set(midi, startX + index * (WHITE_W + GAP));
  });

  const keys: PianoKeyDef[] = [];
  for (let midi = MIDI_MIN; midi <= MIDI_MAX; midi += 1) {
    const black = isBlackMidi(midi);
    if (!black) {
      keys.push({
        midi,
        name: midiToName(midi),
        black: false,
        x: whiteX.get(midi) ?? 0,
        y: WHITE_H / 2,
        z: WHITE_D / 2,
        w: WHITE_W,
        h: WHITE_H,
        d: WHITE_D,
      });
      continue;
    }

    const left = whiteX.get(midi - 1) ?? 0;
    const right = whiteX.get(midi + 1) ?? left;
    keys.push({
      midi,
      name: midiToName(midi),
      black: true,
      x: (left + right) / 2,
      y: WHITE_H + BLACK_H / 2 - 0.001,
      z: BLACK_D / 2 + 0.006,
      w: BLACK_W,
      h: BLACK_H + 0.009,
      d: BLACK_D,
    });
  }

  return keys;
}

export const KEYBOARD_WIDTH =
  52 * WHITE_W + 51 * GAP;

export const COMPUTER_KEY_MAP: Record<string, number> = {
  a: 60,
  w: 61,
  s: 62,
  e: 63,
  d: 64,
  f: 65,
  t: 66,
  g: 67,
  y: 68,
  h: 69,
  u: 70,
  j: 71,
  k: 72,
};
