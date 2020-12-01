import makeColorMoreChill, { black, dark, isChill, white } from '../src';

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
  it('returns a chill color when provided an unchill color', () => {
    expect(isChill(makeColorMoreChill(unchillColor))).toEqual(true);
  });
});
