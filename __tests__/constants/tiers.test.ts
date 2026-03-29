import { TIER_CONFIGS } from '../../src/constants/tiers';

describe('TIER_CONFIGS', () => {
  it('has 4 tiers', () => expect(Object.keys(TIER_CONFIGS)).toHaveLength(4));
  it('tier 1 name is Sparks',      () => expect(TIER_CONFIGS[1].name).toBe('Sparks'));
  it('tier 2 name is Builders',    () => expect(TIER_CONFIGS[2].name).toBe('Builders'));
  it('tier 3 name is Makers',      () => expect(TIER_CONFIGS[3].name).toBe('Makers'));
  it('tier 4 name is Architects',  () => expect(TIER_CONFIGS[4].name).toBe('Architects'));
  it('tier 1 age range is [4,6]',  () => expect(TIER_CONFIGS[1].ageRange).toEqual([4, 6]));
  it('tier 4 age range is [13,15]',() => expect(TIER_CONFIGS[4].ageRange).toEqual([13, 15]));
  it('tier 1 requires audio',      () => expect(TIER_CONFIGS[1].requiresAudioNarration).toBe(true));
  it('tier 4 no audio',            () => expect(TIER_CONFIGS[4].requiresAudioNarration).toBe(false));
  it('tier 1 input is icons',      () => expect(TIER_CONFIGS[1].inputModel).toBe('icons'));
  it('tier 2 input is wordbank',   () => expect(TIER_CONFIGS[2].inputModel).toBe('wordbank'));
  it('tier 3 input is guided-typing', () => expect(TIER_CONFIGS[3].inputModel).toBe('guided-typing'));
  it('tier 4 input is typebox',    () => expect(TIER_CONFIGS[4].inputModel).toBe('typebox'));
  it('tier 1 streak is adventure-days', () => expect(TIER_CONFIGS[1].streakModel).toBe('adventure-days'));
  it('tier 4 streak is standard',  () => expect(TIER_CONFIGS[4].streakModel).toBe('standard'));
  it('tier 1 session is 7 min',    () => expect(TIER_CONFIGS[1].sessionTargetMinutes).toBe(7));
  it('tier 4 session is 20 min',   () => expect(TIER_CONFIGS[4].sessionTargetMinutes).toBe(20));
  it('tier 1 min tap is 60dp',     () => expect(TIER_CONFIGS[1].minTapTargetDp).toBe(60));
  it('tier 2 min tap is 48dp',     () => expect(TIER_CONFIGS[2].minTapTargetDp).toBe(48));
});
