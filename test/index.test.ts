import makeColorMoreChill, {
  black,
  fallbackColors,
  isChill,
  white,
} from '../src';

const chillColor = '#3F6AFF';
const unchillColor = '#F0E7EA';

describe('makeColorMoreChill', () => {
  it('returns colors that are already chill', () => {
    expect(makeColorMoreChill(chillColor)).toEqual(chillColor);
  });
  it('returns "fallbackColors.light" color instead of pure black', () => {
    expect(makeColorMoreChill(black)).toEqual(fallbackColors.light);
  });
  it('returns "fallbackColors.light" color instead of pure white', () => {
    expect(makeColorMoreChill(white)).toEqual(fallbackColors.light);
  });
  it('returns "fallbackColors.dark" color instead of pure black when given a dark background', () => {
    expect(makeColorMoreChill(black, fallbackColors.light)).toEqual(
      fallbackColors.dark
    );
  });
  it('returns "fallbackColors.dark" color instead of pure white when given a dark background', () => {
    expect(makeColorMoreChill(white, fallbackColors.light)).toEqual(
      fallbackColors.dark
    );
  });
  it('returns a chill color when provided an unchill color', () => {
    expect(isChill(makeColorMoreChill(unchillColor))).toEqual(true);
  });
  it('returns a chill color when provided an unchill color against dark background', () => {
    expect(
      isChill(
        makeColorMoreChill(unchillColor, fallbackColors.light),
        fallbackColors.light
      )
    ).toEqual(true);
  });
});
