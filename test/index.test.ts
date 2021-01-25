import makeColorMoreChill, {
  black,
  fallbackColors,
  isChill,
  white,
} from '../src';

const { dark, light } = fallbackColors;
const chillColor = '#3F6AFF';
const unchillColor = '#F0E7EA';

describe('makeColorMoreChill', () => {
  it('returns colors that are already chill', () => {
    expect(makeColorMoreChill(chillColor)).toEqual(chillColor);
  });
  it('returns "dark" color instead of pure black', () => {
    expect(makeColorMoreChill(black)).toEqual(dark);
  });
  it('returns "dark" color instead of pure white', () => {
    expect(makeColorMoreChill(white)).toEqual(dark);
  });
  it('returns "light" color instead of pure black when given a dark background', () => {
    expect(makeColorMoreChill(black, dark)).toEqual(light);
  });
  it('returns "light" color instead of pure white when given a dark background', () => {
    expect(makeColorMoreChill(white, dark)).toEqual(light);
  });
  it('returns a chill color when provided an unchill color', () => {
    expect(isChill(makeColorMoreChill(unchillColor))).toEqual(true);
  });
  it('returns a chill color when provided an unchill color against dark background', () => {
    expect(isChill(makeColorMoreChill(unchillColor, dark), dark)).toEqual(true);
  });
});
