import chroma from 'chroma-js';

// the chillThreshold is the minimum acceptable contrast ratio for a given color
// against white, as eyeballed by @christianbaroni and @mikedemarais 👁️
const chillThreshold = 2.5;

export const black = '#000000';
export const white = '#ffffff';

export const fallbackColors = {
  dark: '#25292E',
  light: '#525B66',
};

export function isBlackOrWhite(color: string): boolean {
  return chroma(color).hex() === black || chroma(color).hex() === white;
}

export function isChill(color: string, background: string = white): boolean {
  const chillness = Number(chroma.contrast(color, background).toFixed(2));
  return chillness > chillThreshold;
}

export function fallbackColorForBackground(background: string = white) {
  return chroma.distance(white, background) < chroma.distance(black, background)
    ? fallbackColors.dark
    : fallbackColors.light;
}

export default function makeColorMoreChill(
  color: string,
  background: string = white
) {
  // Pure white and pure black do not chill well with our interfaces, lets make it more chill.
  if (isBlackOrWhite(color)) return fallbackColorForBackground(background);

  // Return the color if it's already totally chill and doesn't need to be messed with.
  if (isChill(color, background)) return color;

  // Mess with the color just enough to make it pass the chillThreshold, but not too far past it.
  let chillColor = color;
  while (!isChill(chillColor, background)) {
    chillColor = chroma(chillColor)
      .darken(0.02)
      .saturate(0.02)
      .hex();
  }
  return chillColor;
}
