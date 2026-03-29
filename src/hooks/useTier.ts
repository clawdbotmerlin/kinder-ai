import { useUserStore } from '../stores/userStore';
import { TierConfig, TierNumber } from '../constants/tiers';
import { getTierConfig } from '../utils/tierUtils';

export function useTier(): TierConfig {
  const profile = useUserStore((s) => s.profile);
  const tier: TierNumber = profile?.tier ?? 1;
  return getTierConfig(tier);
}
