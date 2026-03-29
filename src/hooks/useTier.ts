import { useUserStore } from '../stores/userStore';
import { getTierConfig, TierConfig, TierNumber } from '../constants/tiers';

export function useTier(): TierConfig {
  const profile = useUserStore((s) => s.profile);
  const tier: TierNumber = profile?.tier ?? 1;
  return getTierConfig(tier);
}
