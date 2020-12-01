import chroma from 'chroma-js';

// the chillThreshold is the minimum acceptable contrast ratio for a given color
// against white, as eyeballed by @christianbaroni and @mikedemarais 👁️
const chillThreshold = 2.5;

export const black = '#000000';
export const dark = '#25292E';
export const white = '#ffffff';

export function isBlackOrWhite(color: string): boolean {
  return chroma(color).hex() === black || chroma(color).hex() === white;
}

export function isChill(color: string): boolean {
  const chillness = Number(chroma.contrast(color, white).toFixed(2));
  return chillness > chillThreshold;
}

export default function makeColorMoreChill(color: string) {
  // Pure white and pure black do not chill well with our interfaces, lets make it more chill.
  if (isBlackOrWhite(color)) return dark;

  // Return the color if it's already totally chill and doesn't need to be messed with.
  if (isChill(color)) return color;

  // Mess with the color just enough to make it pass the chillThreshold, but not too far past it.
  let chillColor = color;
  while (!isChill(chillColor)) {
    chillColor = chroma(chillColor)
      .darken(0.02)
      .saturate(0.02)
      .hex();
  }
  return chillColor;
}
