import { TierNumber, TierConfig, TIER_CONFIGS } from '../constants/tiers';

export function ageToTier(age: number): TierNumber {
  if (age >= 4 && age <= 6)  return 1;
  if (age >= 7 && age <= 9)  return 2;
  if (age >= 10 && age <= 12) return 3;
  return 4;
}

export function getTierConfig(tier: TierNumber): TierConfig {
  return TIER_CONFIGS[tier];
}
