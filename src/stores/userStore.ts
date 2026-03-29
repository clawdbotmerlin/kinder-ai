import { create } from 'zustand';
import { TierNumber } from '../constants/tiers';
import { ageToTier } from '../utils/tierUtils';

export interface UserProfile {
  age: number;
  tier: TierNumber;
  avatarId: string;
  explorerName: string;
  parentEmail?: string;
  xp: number;
  level: number;
  adventureDays: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  createdAt: string;
}

interface CreateProfileInput {
  age: number;
  avatarId: string;
  explorerName: string;
  parentEmail?: string;
}

interface UserState {
  profile: UserProfile | null;
  isOnboardingComplete: boolean;
  pendingAge: number | null;
  pendingAvatarId: string | null;
  pendingName: string | null;
  createProfile: (input: CreateProfileInput) => void;
  completeOnboarding: () => void;
  addXP: (amount: number) => void;
  setPendingAge: (age: number) => void;
  setPendingAvatarId: (id: string) => void;
  setPendingName: (name: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  profile: null,
  isOnboardingComplete: false,
  pendingAge: null,
  pendingAvatarId: null,
  pendingName: null,

  createProfile: (input) => {
    const now = new Date().toISOString();
    set({
      profile: {
        age: input.age,
        tier: ageToTier(input.age),
        avatarId: input.avatarId,
        explorerName: input.explorerName,
        parentEmail: input.parentEmail,
        xp: 0,
        level: 1,
        adventureDays: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        createdAt: now,
      },
    });
  },

  completeOnboarding: () => set({ isOnboardingComplete: true }),

  addXP: (amount) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, xp: state.profile.xp + amount }
        : null,
    })),

  setPendingAge: (age) => set({ pendingAge: age }),
  setPendingAvatarId: (id) => set({ pendingAvatarId: id }),
  setPendingName: (name) => set({ pendingName: name }),
}));
