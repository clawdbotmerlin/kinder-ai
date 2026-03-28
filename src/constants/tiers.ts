export type TierNumber = 1 | 2 | 3 | 4;

export interface TierConfig {
  number: TierNumber;
  name: string;
  ageRange: [number, number];
  requiresAudioNarration: boolean;
  inputModel: 'icons' | 'wordbank' | 'guided-typing' | 'typebox';
  sessionTargetMinutes: number;
  minTapTargetDp: number;
  streakModel: 'adventure-days' | 'forgiving' | 'standard';
  xpModel: 'power-meter' | 'xp-bar';
  failureAttempts: 2 | 3;
}

export const TIER_CONFIGS: Record<TierNumber, TierConfig> = {
  1: {
    number: 1,
    name: 'Sparks',
    ageRange: [4, 6],
    requiresAudioNarration: true,
    inputModel: 'icons',
    sessionTargetMinutes: 7,
    minTapTargetDp: 60,
    streakModel: 'adventure-days',
    xpModel: 'power-meter',
    failureAttempts: 2,
  },
  2: {
    number: 2,
    name: 'Builders',
    ageRange: [7, 9],
    requiresAudioNarration: false,
    inputModel: 'wordbank',
    sessionTargetMinutes: 12,
    minTapTargetDp: 48,
    streakModel: 'forgiving',
    xpModel: 'xp-bar',
    failureAttempts: 2,
  },
  3: {
    number: 3,
    name: 'Makers',
    ageRange: [10, 12],
    requiresAudioNarration: false,
    inputModel: 'guided-typing',
    sessionTargetMinutes: 15,
    minTapTargetDp: 48,
    streakModel: 'forgiving',
    xpModel: 'xp-bar',
    failureAttempts: 2,
  },
  4: {
    number: 4,
    name: 'Architects',
    ageRange: [13, 15],
    requiresAudioNarration: false,
    inputModel: 'typebox',
    sessionTargetMinutes: 20,
    minTapTargetDp: 48,
    streakModel: 'standard',
    xpModel: 'xp-bar',
    failureAttempts: 3,
  },
};
