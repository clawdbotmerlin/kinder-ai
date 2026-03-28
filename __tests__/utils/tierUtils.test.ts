import { ageToTier, getTierConfig } from '../../src/utils/tierUtils';

describe('ageToTier', () => {
  it('maps age 4 to tier 1',  () => expect(ageToTier(4)).toBe(1));
  it('maps age 6 to tier 1',  () => expect(ageToTier(6)).toBe(1));
  it('maps age 7 to tier 2',  () => expect(ageToTier(7)).toBe(2));
  it('maps age 9 to tier 2',  () => expect(ageToTier(9)).toBe(2));
  it('maps age 10 to tier 3', () => expect(ageToTier(10)).toBe(3));
  it('maps age 12 to tier 3', () => expect(ageToTier(12)).toBe(3));
  it('maps age 13 to tier 4', () => expect(ageToTier(13)).toBe(4));
  it('maps age 15 to tier 4', () => expect(ageToTier(15)).toBe(4));
});

describe('getTierConfig', () => {
  it('tier 1 name is Sparks',     () => expect(getTierConfig(1).name).toBe('Sparks'));
  it('tier 2 name is Builders',   () => expect(getTierConfig(2).name).toBe('Builders'));
  it('tier 3 name is Makers',     () => expect(getTierConfig(3).name).toBe('Makers'));
  it('tier 4 name is Architects', () => expect(getTierConfig(4).name).toBe('Architects'));
  it('tier 1 requires audio',     () => expect(getTierConfig(1).requiresAudioNarration).toBe(true));
  it('tier 4 no audio',           () => expect(getTierConfig(4).requiresAudioNarration).toBe(false));
  it('tier 1 session is 7',       () => expect(getTierConfig(1).sessionTargetMinutes).toBe(7));
  it('tier 4 session is 20',      () => expect(getTierConfig(4).sessionTargetMinutes).toBe(20));
});
