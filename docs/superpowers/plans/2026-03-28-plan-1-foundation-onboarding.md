# KinderAI Plan 1: Foundation + Design System + Onboarding

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap the React Native (Expo) project with a complete design system, tier detection, and all 7 onboarding screens — ending with a user profile stored locally and navigation to a world map stub.

**Architecture:** Expo managed workflow with React Navigation v6 for routing. Zustand for global state (user profile, tier, app settings). MMKV for fast local persistence. Each screen is a self-contained component; shared UI primitives live in `src/components/`. Tier-specific behaviour is driven by a single `useTier()` hook that reads from the user store.

**Tech Stack:** Expo SDK 51, React Native, TypeScript, React Navigation v6, Zustand, MMKV, React Native Reanimated 3, Expo AV (audio), NativeWind (Tailwind for RN), Jest + React Native Testing Library

---

## File Structure

```
kinder-ai/
├── app.json                          # Expo config
├── package.json
├── tsconfig.json
├── babel.config.js
├── tailwind.config.js                # NativeWind config
├── src/
│   ├── constants/
│   │   ├── tiers.ts                  # Tier definitions, age ranges, names
│   │   ├── theme.ts                  # Design tokens (colours, spacing, typography)
│   │   └── avatars.ts                # Avatar definitions (id, name, audioFile, image)
│   ├── stores/
│   │   └── userStore.ts              # Zustand store: profile, tier, settings
│   ├── hooks/
│   │   ├── useTier.ts                # Returns current tier config
│   │   └── useAudio.ts               # Audio playback helper
│   ├── components/
│   │   ├── TierText.tsx              # Text that auto-reads aloud on Tier 1
│   │   ├── TierButton.tsx            # Button: icon+audio (Tier 1) or text (Tier 2-4)
│   │   ├── CompanionSpeak.tsx        # Companion character with speech bubble + audio
│   │   └── ProgressDots.tsx          # Onboarding step indicator
│   ├── screens/
│   │   └── onboarding/
│   │       ├── SplashScreen.tsx      # Screen 1
│   │       ├── WelcomeScreen.tsx     # Screen 2
│   │       ├── AgeSelectScreen.tsx   # Screen 3
│   │       ├── AvatarSelectScreen.tsx # Screen 4
│   │       ├── NameScreen.tsx        # Screen 5
│   │       ├── ParentGateScreen.tsx  # Screen 6
│   │       └── CinematicScreen.tsx   # Screen 7
│   ├── navigation/
│   │   ├── RootNavigator.tsx         # Stack: Onboarding | Main
│   │   └── OnboardingNavigator.tsx   # Stack of 7 onboarding screens
│   └── utils/
│       └── tierUtils.ts              # ageToTier(), getTierName(), getTierConfig()
├── assets/
│   ├── audio/
│   │   └── avatars/                  # avatar-1.mp3 … avatar-4.mp3 (intro lines)
│   └── images/
│       └── avatars/                  # avatar-1.png … avatar-4.png
└── __tests__/
    ├── constants/
    │   └── tiers.test.ts
    ├── utils/
    │   └── tierUtils.test.ts
    ├── stores/
    │   └── userStore.test.ts
    └── screens/
        └── onboarding/
            ├── AgeSelectScreen.test.tsx
            ├── AvatarSelectScreen.test.tsx
            ├── NameScreen.test.tsx
            └── ParentGateScreen.test.tsx
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `app.json`, `tsconfig.json`, `babel.config.js`, `tailwind.config.js`

- [ ] **Step 1: Initialise Expo project**

```bash
cd /Users/master/Documents/ClaudeCode/Frontier/kinder-ai
npx create-expo-app@latest . --template blank-typescript
```

Expected: Expo project scaffolded with TypeScript template.

- [ ] **Step 2: Install core dependencies**

```bash
npx expo install expo-av expo-haptics expo-linear-gradient
npx expo install react-native-mmkv
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
npm install zustand
npm install nativewind tailwindcss
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

- [ ] **Step 3: Configure NativeWind**

Create `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C3AED',
          blue: '#3B82F6',
          green: '#10B981',
          yellow: '#F59E0B',
          pink: '#EC4899',
        },
        tier1: { bg: '#FFF7ED', accent: '#F97316' },
        tier2: { bg: '#EFF6FF', accent: '#3B82F6' },
        tier3: { bg: '#F0FDF4', accent: '#10B981' },
        tier4: { bg: '#F5F3FF', accent: '#7C3AED' },
      },
      fontFamily: {
        display: ['Nunito-Bold'],
        body: ['Nunito-Regular'],
      },
    },
  },
  plugins: [],
}
```

Update `babel.config.js`:
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

- [ ] **Step 4: Configure Jest**

Add to `package.json`:
```json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterFramework": ["@testing-library/jest-native/extend-expect"],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind)"
  ]
}
```

- [ ] **Step 5: Create directory structure**

```bash
mkdir -p src/{constants,stores,hooks,components,screens/onboarding,navigation,utils}
mkdir -p assets/{audio/avatars,images/avatars}
mkdir -p __tests__/{constants,utils,stores,screens/onboarding}
```

- [ ] **Step 6: Verify app boots**

```bash
npx expo start
```

Expected: Metro bundler starts, app loads on emulator/device with default Expo screen.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: bootstrap Expo TypeScript project with navigation, Zustand, NativeWind"
```

---

## Task 2: Tier Constants + Utilities

**Files:**
- Create: `src/constants/tiers.ts`
- Create: `src/utils/tierUtils.ts`
- Test: `__tests__/constants/tiers.test.ts`
- Test: `__tests__/utils/tierUtils.test.ts`

- [ ] **Step 1: Write failing tests for tier utilities**

Create `__tests__/utils/tierUtils.test.ts`:
```typescript
import { ageToTier, getTierConfig } from '../../src/utils/tierUtils';

describe('ageToTier', () => {
  it('maps age 4 to tier 1', () => expect(ageToTier(4)).toBe(1));
  it('maps age 6 to tier 1', () => expect(ageToTier(6)).toBe(1));
  it('maps age 7 to tier 2', () => expect(ageToTier(7)).toBe(2));
  it('maps age 9 to tier 2', () => expect(ageToTier(9)).toBe(2));
  it('maps age 10 to tier 3', () => expect(ageToTier(10)).toBe(3));
  it('maps age 12 to tier 3', () => expect(ageToTier(12)).toBe(3));
  it('maps age 13 to tier 4', () => expect(ageToTier(13)).toBe(4));
  it('maps age 15 to tier 4', () => expect(ageToTier(15)).toBe(4));
});

describe('getTierConfig', () => {
  it('tier 1 has name Sparks', () => expect(getTierConfig(1).name).toBe('Sparks'));
  it('tier 2 has name Builders', () => expect(getTierConfig(2).name).toBe('Builders'));
  it('tier 3 has name Makers', () => expect(getTierConfig(3).name).toBe('Makers'));
  it('tier 4 has name Architects', () => expect(getTierConfig(4).name).toBe('Architects'));
  it('tier 1 requires audio narration', () => expect(getTierConfig(1).requiresAudioNarration).toBe(true));
  it('tier 4 does not require audio narration', () => expect(getTierConfig(4).requiresAudioNarration).toBe(false));
  it('tier 1 session target is 7', () => expect(getTierConfig(1).sessionTargetMinutes).toBe(7));
  it('tier 4 session target is 20', () => expect(getTierConfig(4).sessionTargetMinutes).toBe(20));
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npx jest __tests__/utils/tierUtils.test.ts --no-coverage
```

Expected: FAIL — "Cannot find module '../../src/utils/tierUtils'"

- [ ] **Step 3: Create tier constants**

Create `src/constants/tiers.ts`:
```typescript
export type TierNumber = 1 | 2 | 3 | 4;

export interface TierConfig {
  number: TierNumber;
  name: string;
  ageRange: [number, number];
  requiresAudioNarration: boolean;   // Tier 1: all UI audio-narrated
  inputModel: 'icons' | 'wordbank' | 'guided-typing' | 'typebox';
  sessionTargetMinutes: number;
  minTapTargetDp: number;            // Tier 1: 60dp, others: 48dp
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
```

- [ ] **Step 4: Create tier utilities**

Create `src/utils/tierUtils.ts`:
```typescript
import { TierNumber, TierConfig, TIER_CONFIGS } from '../constants/tiers';

export function ageToTier(age: number): TierNumber {
  if (age >= 4 && age <= 6) return 1;
  if (age >= 7 && age <= 9) return 2;
  if (age >= 10 && age <= 12) return 3;
  return 4;
}

export function getTierConfig(tier: TierNumber): TierConfig {
  return TIER_CONFIGS[tier];
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npx jest __tests__/utils/tierUtils.test.ts --no-coverage
```

Expected: PASS — 12 tests passing.

- [ ] **Step 6: Commit**

```bash
git add src/constants/tiers.ts src/utils/tierUtils.ts __tests__/utils/tierUtils.test.ts
git commit -m "feat: add tier constants and age-to-tier utility"
```

---

## Task 3: User Store (Zustand + MMKV)

**Files:**
- Create: `src/stores/userStore.ts`
- Test: `__tests__/stores/userStore.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/stores/userStore.test.ts`:
```typescript
import { act, renderHook } from '@testing-library/react-hooks';
import { useUserStore } from '../../src/stores/userStore';

beforeEach(() => {
  useUserStore.setState({
    profile: null,
    isOnboardingComplete: false,
  });
});

describe('useUserStore', () => {
  it('starts with no profile', () => {
    const { result } = renderHook(() => useUserStore());
    expect(result.current.profile).toBeNull();
  });

  it('creates profile with correct tier from age', () => {
    const { result } = renderHook(() => useUserStore());
    act(() => result.current.createProfile({ age: 8, avatarId: 'avatar-1', explorerName: 'Zara' }));
    expect(result.current.profile?.tier).toBe(2);
    expect(result.current.profile?.explorerName).toBe('Zara');
    expect(result.current.profile?.avatarId).toBe('avatar-1');
  });

  it('sets onboarding complete', () => {
    const { result } = renderHook(() => useUserStore());
    act(() => result.current.completeOnboarding());
    expect(result.current.isOnboardingComplete).toBe(true);
  });

  it('stores parentEmail when provided', () => {
    const { result } = renderHook(() => useUserStore());
    act(() => result.current.createProfile({ age: 5, avatarId: 'avatar-2', explorerName: 'Bolt', parentEmail: 'parent@example.com' }));
    expect(result.current.profile?.parentEmail).toBe('parent@example.com');
  });

  it('parentEmail is undefined when skipped', () => {
    const { result } = renderHook(() => useUserStore());
    act(() => result.current.createProfile({ age: 5, avatarId: 'avatar-2', explorerName: 'Bolt' }));
    expect(result.current.profile?.parentEmail).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npx jest __tests__/stores/userStore.test.ts --no-coverage
```

Expected: FAIL — "Cannot find module '../../src/stores/userStore'"

- [ ] **Step 3: Implement user store**

Create `src/stores/userStore.ts`:
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { TierNumber } from '../constants/tiers';
import { ageToTier } from '../utils/tierUtils';

const storage = new MMKV({ id: 'kinder-ai-user' });

const mmkvStorage = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
};

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

interface UserState {
  profile: UserProfile | null;
  isOnboardingComplete: boolean;
  createProfile: (input: {
    age: number;
    avatarId: string;
    explorerName: string;
    parentEmail?: string;
  }) => void;
  completeOnboarding: () => void;
  updateXP: (amount: number) => void;
  recordSessionDay: (date: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      isOnboardingComplete: false,

      createProfile: ({ age, avatarId, explorerName, parentEmail }) => {
        set({
          profile: {
            age,
            tier: ageToTier(age),
            avatarId,
            explorerName,
            parentEmail,
            xp: 0,
            level: 1,
            adventureDays: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: null,
            createdAt: new Date().toISOString(),
          },
        });
      },

      completeOnboarding: () => set({ isOnboardingComplete: true }),

      updateXP: (amount) => {
        const profile = get().profile;
        if (!profile) return;
        set({ profile: { ...profile, xp: profile.xp + amount } });
      },

      recordSessionDay: (date) => {
        const profile = get().profile;
        if (!profile) return;
        if (profile.lastActiveDate === date) return;
        const newAdventureDays = profile.adventureDays + 1;
        set({
          profile: {
            ...profile,
            adventureDays: newAdventureDays,
            lastActiveDate: date,
          },
        });
      },
    }),
    {
      name: 'user-profile',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx jest __tests__/stores/userStore.test.ts --no-coverage
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/stores/userStore.ts __tests__/stores/userStore.test.ts
git commit -m "feat: add Zustand user store with MMKV persistence and tier assignment"
```

---

## Task 4: Core UI Components

**Files:**
- Create: `src/components/TierButton.tsx`
- Create: `src/components/TierText.tsx`
- Create: `src/components/CompanionSpeak.tsx`
- Create: `src/hooks/useTier.ts`
- Create: `src/hooks/useAudio.ts`

- [ ] **Step 1: Create useTier hook**

Create `src/hooks/useTier.ts`:
```typescript
import { useUserStore } from '../stores/userStore';
import { getTierConfig, TierConfig, TierNumber } from '../constants/tiers';

export function useTier(): TierConfig {
  const profile = useUserStore((s) => s.profile);
  const tier: TierNumber = profile?.tier ?? 1;
  return getTierConfig(tier);
}
```

- [ ] **Step 2: Create useAudio hook**

Create `src/hooks/useAudio.ts`:
```typescript
import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export function useAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);

  async function playFile(require: number) {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(require);
    soundRef.current = sound;
    await sound.playAsync();
  }

  async function stop() {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
  }

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return { playFile, stop };
}
```

- [ ] **Step 3: Create TierButton component**

Tier 1: large icon + optional label read aloud on press. Tier 2–4: standard text button.

Create `src/components/TierButton.tsx`:
```typescript
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTier } from '../hooks/useTier';

interface TierButtonProps {
  label: string;
  icon?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  audioFile?: number; // require() result for Tier 1 audio
  testID?: string;
}

export function TierButton({ label, icon, onPress, variant = 'primary', testID }: TierButtonProps) {
  const tier = useTier();
  const isPrimary = variant === 'primary';

  const baseStyle = `rounded-2xl flex-row items-center justify-center gap-2 ${
    tier.number === 1 ? 'py-5 px-8 min-h-[60px] min-w-[60px]' : 'py-3 px-6'
  } ${isPrimary ? 'bg-brand-purple' : 'bg-white border-2 border-brand-purple'}`;

  const textStyle = `font-display text-base ${isPrimary ? 'text-white' : 'text-brand-purple'}`;

  return (
    <Pressable
      className={baseStyle}
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {icon && <View>{icon}</View>}
      {tier.number > 1 && <Text className={textStyle}>{label}</Text>}
    </Pressable>
  );
}
```

- [ ] **Step 4: Create TierText component**

Tier 1: renders nothing visible but plays audio. Tier 2–4: renders text.

Create `src/components/TierText.tsx`:
```typescript
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useTier } from '../hooks/useTier';
import { useAudio } from '../hooks/useAudio';

interface TierTextProps {
  children: string;
  audioFile?: number;
  className?: string;
}

export function TierText({ children, audioFile, className }: TierTextProps) {
  const tier = useTier();
  const { playFile } = useAudio();

  useEffect(() => {
    if (tier.requiresAudioNarration && audioFile) {
      playFile(audioFile);
    }
  }, []);

  if (tier.requiresAudioNarration) return null; // audio-only for Tier 1

  return <Text className={className ?? 'font-body text-base text-gray-800'}>{children}</Text>;
}
```

- [ ] **Step 5: Create CompanionSpeak component**

Create `src/components/CompanionSpeak.tsx`:
```typescript
import React from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CompanionSpeakProps {
  message: string;
  avatarSource: number;
  autoShow?: boolean;
}

export function CompanionSpeak({ message, avatarSource, autoShow = true }: CompanionSpeakProps) {
  const scale = useSharedValue(autoShow ? 0 : 1);

  React.useEffect(() => {
    if (autoShow) {
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
    }
  }, []);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animStyle} className="flex-row items-end gap-3 p-4">
      <Image source={avatarSource} className="w-16 h-16 rounded-full" />
      <View className="flex-1 bg-white rounded-2xl rounded-bl-none p-3 shadow-sm">
        <Text className="font-body text-sm text-gray-800">{message}</Text>
      </View>
    </Animated.View>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ src/hooks/
git commit -m "feat: add TierButton, TierText, CompanionSpeak components and useTier/useAudio hooks"
```

---

## Task 5: Navigation Setup

**Files:**
- Create: `src/navigation/RootNavigator.tsx`
- Create: `src/navigation/OnboardingNavigator.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: Create placeholder screens**

Create one placeholder for world map (final destination after onboarding):

```bash
mkdir -p src/screens/main
```

Create `src/screens/main/WorldMapStub.tsx`:
```typescript
import React from 'react';
import { View, Text } from 'react-native';

export function WorldMapStub() {
  return (
    <View className="flex-1 items-center justify-center bg-green-50">
      <Text className="font-display text-2xl text-green-700">🗺️ World Map</Text>
      <Text className="font-body text-gray-500 mt-2">Coming in Plan 2</Text>
    </View>
  );
}
```

- [ ] **Step 2: Create OnboardingNavigator**

Create `src/navigation/OnboardingNavigator.tsx`:
```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { AgeSelectScreen } from '../screens/onboarding/AgeSelectScreen';
import { AvatarSelectScreen } from '../screens/onboarding/AvatarSelectScreen';
import { NameScreen } from '../screens/onboarding/NameScreen';
import { ParentGateScreen } from '../screens/onboarding/ParentGateScreen';
import { CinematicScreen } from '../screens/onboarding/CinematicScreen';

export type OnboardingStackParams = {
  Splash: undefined;
  Welcome: undefined;
  AgeSelect: undefined;
  AvatarSelect: undefined;
  Name: undefined;
  ParentGate: undefined;
  Cinematic: undefined;
};

const Stack = createStackNavigator<OnboardingStackParams>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AgeSelect" component={AgeSelectScreen} />
      <Stack.Screen name="AvatarSelect" component={AvatarSelectScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="ParentGate" component={ParentGateScreen} />
      <Stack.Screen name="Cinematic" component={CinematicScreen} />
    </Stack.Navigator>
  );
}
```

- [ ] **Step 3: Create RootNavigator**

Create `src/navigation/RootNavigator.tsx`:
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserStore } from '../stores/userStore';
import { OnboardingNavigator } from './OnboardingNavigator';
import { WorldMapStub } from '../screens/main/WorldMapStub';

export type RootStackParams = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export function RootNavigator() {
  const isOnboardingComplete = useUserStore((s) => s.isOnboardingComplete);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboardingComplete ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <Stack.Screen name="Main" component={WorldMapStub} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- [ ] **Step 4: Update App.tsx**

```typescript
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
```

- [ ] **Step 5: Verify navigation renders**

```bash
npx expo start
```

Expected: App boots and shows the Splash screen (which will be a blank View until Task 6).

- [ ] **Step 6: Commit**

```bash
git add src/navigation/ src/screens/main/ App.tsx
git commit -m "feat: add root and onboarding navigator with world map stub"
```

---

## Task 6: Screen 1 — Splash

**Files:**
- Create: `src/screens/onboarding/SplashScreen.tsx`

- [ ] **Step 1: Implement SplashScreen**

Create `src/screens/onboarding/SplashScreen.tsx`:
```typescript
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';

type Nav = StackNavigationProp<OnboardingStackParams, 'Splash'>;

export function SplashScreen() {
  const navigation = useNavigation<Nav>();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10 });
    opacity.value = withDelay(200, withSpring(1));
    const timer = setTimeout(() => navigation.replace('Welcome'), 2800);
    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 bg-brand-purple items-center justify-center">
      <Animated.View style={logoStyle} className="items-center">
        <Text className="text-7xl">🤖</Text>
        <Text className="font-display text-4xl text-white mt-4">KinderAI</Text>
        <Text className="font-body text-white/70 mt-2 text-base">Learn. Play. Explore.</Text>
      </Animated.View>
    </View>
  );
}
```

- [ ] **Step 2: Verify splash animates and auto-navigates**

```bash
npx expo start
```

Expected: Purple splash screen with KinderAI logo appears, fades in, auto-navigates to Welcome after ~2.8 seconds.

- [ ] **Step 3: Commit**

```bash
git add src/screens/onboarding/SplashScreen.tsx
git commit -m "feat: add animated splash screen with auto-navigate"
```

---

## Task 7: Screen 2 — Welcome

**Files:**
- Create: `src/screens/onboarding/WelcomeScreen.tsx`

- [ ] **Step 1: Implement WelcomeScreen**

Create `src/screens/onboarding/WelcomeScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';

type Nav = StackNavigationProp<OnboardingStackParams, 'Welcome'>;

export function WelcomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <LinearGradient colors={['#7C3AED', '#3B82F6']} className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
        {/* Animated world map placeholder */}
        <View className="w-64 h-48 bg-white/20 rounded-3xl mb-8 items-center justify-center">
          <Text className="text-6xl">🗺️</Text>
        </View>

        <Text className="font-display text-3xl text-white text-center mb-3">
          Let's go on an AI adventure!
        </Text>
        <Text className="font-body text-white/80 text-center text-base mb-12">
          Discover the amazing world of AI — made just for you.
        </Text>

        <Pressable
          onPress={() => navigation.navigate('AgeSelect')}
          className="bg-yellow-400 rounded-2xl py-4 px-12 shadow-lg"
          accessibilityRole="button"
          accessibilityLabel="Let's Go!"
        >
          <Text className="font-display text-xl text-gray-900">Let's Go! 🚀</Text>
        </Pressable>

        <Pressable
          onPress={() => {/* parent flow - Plan 6 */}}
          className="mt-6"
          accessibilityRole="link"
          accessibilityLabel="I'm a parent"
        >
          <Text className="font-body text-white/60 text-sm">I'm a parent →</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
```

- [ ] **Step 2: Verify welcome screen renders correctly**

```bash
npx expo start
```

Expected: Gradient purple-to-blue screen, world map placeholder, "Let's Go!" yellow button, ghost "I'm a parent" link. Tapping "Let's Go!" navigates to AgeSelect (blank screen for now).

- [ ] **Step 3: Commit**

```bash
git add src/screens/onboarding/WelcomeScreen.tsx
git commit -m "feat: add welcome screen with gradient and navigation"
```

---

## Task 8: Screen 3 — Age Selection

**Files:**
- Create: `src/screens/onboarding/AgeSelectScreen.tsx`
- Create: `src/constants/avatars.ts` (needed in next screen, define ages here)
- Test: `__tests__/screens/onboarding/AgeSelectScreen.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/screens/onboarding/AgeSelectScreen.test.tsx`:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AgeSelectScreen } from '../../../src/screens/onboarding/AgeSelectScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('AgeSelectScreen', () => {
  it('renders age bubbles from 4 to 15', () => {
    const { getByTestId } = render(<AgeSelectScreen />);
    for (let age = 4; age <= 15; age++) {
      expect(getByTestId(`age-bubble-${age}`)).toBeTruthy();
    }
  });

  it('navigates to AvatarSelect on age tap', () => {
    const navigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate });
    const { getByTestId } = render(<AgeSelectScreen />);
    fireEvent.press(getByTestId('age-bubble-7'));
    expect(navigate).toHaveBeenCalledWith('AvatarSelect');
  });

  it('stores selected age in user store', () => {
    const { getByTestId } = render(<AgeSelectScreen />);
    fireEvent.press(getByTestId('age-bubble-5'));
    const { useUserStore } = require('../../../src/stores/userStore');
    const state = useUserStore.getState();
    expect(state.pendingAge).toBe(5);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npx jest __tests__/screens/onboarding/AgeSelectScreen.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Add pendingAge to user store**

Modify `src/stores/userStore.ts` — add to state interface and store:
```typescript
// Add to UserState interface:
pendingAge: number | null;
setPendingAge: (age: number) => void;

// Add to store implementation:
pendingAge: null,
setPendingAge: (age) => set({ pendingAge: age }),
```

- [ ] **Step 4: Implement AgeSelectScreen**

Create `src/screens/onboarding/AgeSelectScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';
import { useUserStore } from '../../stores/userStore';
import { ageToTier } from '../../utils/tierUtils';

type Nav = StackNavigationProp<OnboardingStackParams, 'AgeSelect'>;

const TIER_1_FACES = ['🐱', '🐶', '🐰', '🦊'];

function AgeBubble({ age, onPress }: { age: number; onPress: () => void }) {
  const tier = ageToTier(age);
  const isTier1 = tier === 1;
  const face = isTier1 ? TIER_1_FACES[(age - 4) % TIER_1_FACES.length] : null;

  return (
    <Pressable
      testID={`age-bubble-${age}`}
      onPress={onPress}
      className="w-16 h-16 rounded-full bg-white shadow-md items-center justify-center m-2"
      accessibilityRole="button"
      accessibilityLabel={`Age ${age}`}
    >
      {face ? (
        <Text className="text-2xl">{face}</Text>
      ) : (
        <Text className="font-display text-xl text-brand-purple">{age}</Text>
      )}
    </Pressable>
  );
}

export function AgeSelectScreen() {
  const navigation = useNavigation<Nav>();
  const setPendingAge = useUserStore((s) => s.setPendingAge);

  const handleAgeSelect = (age: number) => {
    setPendingAge(age);
    navigation.navigate('AvatarSelect');
  };

  return (
    <View className="flex-1 bg-brand-blue items-center justify-center px-6">
      <Text className="font-display text-2xl text-white mb-2">How old are you?</Text>
      <Text className="font-body text-white/70 mb-8 text-center">Tap your age!</Text>
      <View className="flex-row flex-wrap justify-center max-w-xs">
        {Array.from({ length: 12 }, (_, i) => i + 4).map((age) => (
          <AgeBubble key={age} age={age} onPress={() => handleAgeSelect(age)} />
        ))}
      </View>
    </View>
  );
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npx jest __tests__/screens/onboarding/AgeSelectScreen.test.tsx --no-coverage
```

Expected: PASS — 3 tests passing.

- [ ] **Step 6: Commit**

```bash
git add src/screens/onboarding/AgeSelectScreen.tsx src/stores/userStore.ts __tests__/screens/onboarding/AgeSelectScreen.test.tsx
git commit -m "feat: add age selection screen with tier-aware bubbles"
```

---

## Task 9: Avatar Constants + Screen 4 — Avatar Selection

**Files:**
- Create: `src/constants/avatars.ts`
- Create: `src/screens/onboarding/AvatarSelectScreen.tsx`
- Test: `__tests__/screens/onboarding/AvatarSelectScreen.test.tsx`

- [ ] **Step 1: Define avatar constants**

Create `src/constants/avatars.ts`:
```typescript
export interface AvatarDef {
  id: string;
  name: string;
  emoji: string; // placeholder until real assets added
  introLine: string;
}

export const AVATARS: AvatarDef[] = [
  { id: 'avatar-1', name: 'Zara', emoji: '🤖', introLine: "Hi, I'm Zara! I love adventures!" },
  { id: 'avatar-2', name: 'Bolt', emoji: '⚡', introLine: "I'm Bolt! Let's explore!" },
  { id: 'avatar-3', name: 'Nova', emoji: '🌟', introLine: "Nova here! Ready to learn?" },
  { id: 'avatar-4', name: 'Chip', emoji: '🔬', introLine: "Hey! I'm Chip. Science is cool!" },
];
```

- [ ] **Step 2: Write failing tests**

Create `__tests__/screens/onboarding/AvatarSelectScreen.test.tsx`:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AvatarSelectScreen } from '../../../src/screens/onboarding/AvatarSelectScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('AvatarSelectScreen', () => {
  it('renders all 4 avatars', () => {
    const { getByTestId } = render(<AvatarSelectScreen />);
    ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4'].forEach((id) => {
      expect(getByTestId(`avatar-card-${id}`)).toBeTruthy();
    });
  });

  it('tapping avatar shows confirm button', () => {
    const { getByTestId, getByText } = render(<AvatarSelectScreen />);
    fireEvent.press(getByTestId('avatar-card-avatar-1'));
    expect(getByText('This is me!')).toBeTruthy();
  });

  it('confirming avatar stores avatarId and navigates', () => {
    const navigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate });
    const { getByTestId, getByText } = render(<AvatarSelectScreen />);
    fireEvent.press(getByTestId('avatar-card-avatar-2'));
    fireEvent.press(getByText('This is me!'));
    const { useUserStore } = require('../../../src/stores/userStore');
    expect(useUserStore.getState().pendingAvatarId).toBe('avatar-2');
    expect(navigate).toHaveBeenCalledWith('Name');
  });
});
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
npx jest __tests__/screens/onboarding/AvatarSelectScreen.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 4: Add pendingAvatarId to user store**

Modify `src/stores/userStore.ts`:
```typescript
// Add to UserState interface:
pendingAvatarId: string | null;
setPendingAvatarId: (id: string) => void;

// Add to store implementation:
pendingAvatarId: null,
setPendingAvatarId: (id) => set({ pendingAvatarId: id }),
```

- [ ] **Step 5: Implement AvatarSelectScreen**

Create `src/screens/onboarding/AvatarSelectScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';
import { useUserStore } from '../../stores/userStore';
import { AVATARS, AvatarDef } from '../../constants/avatars';

type Nav = StackNavigationProp<OnboardingStackParams, 'AvatarSelect'>;

function AvatarCard({ avatar, selected, onPress }: { avatar: AvatarDef; selected: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = () => {
    scale.value = withSpring(1.1, {}, () => { scale.value = withSpring(1); });
    onPress();
  };

  return (
    <Animated.View style={animStyle}>
      <Pressable
        testID={`avatar-card-${avatar.id}`}
        onPress={handlePress}
        className={`w-36 h-40 rounded-3xl m-2 items-center justify-center ${
          selected ? 'bg-yellow-300 border-4 border-yellow-500' : 'bg-white shadow-md'
        }`}
        accessibilityRole="button"
        accessibilityLabel={`Choose ${avatar.name}`}
      >
        <Text className="text-5xl mb-2">{avatar.emoji}</Text>
        <Text className="font-display text-base text-gray-800">{avatar.name}</Text>
      </Pressable>
    </Animated.View>
  );
}

export function AvatarSelectScreen() {
  const navigation = useNavigation<Nav>();
  const setPendingAvatarId = useUserStore((s) => s.setPendingAvatarId);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedId) return;
    setPendingAvatarId(selectedId);
    navigation.navigate('Name');
  };

  // Show 3 at a time per spec — using FlatList with numColumns=3 and 4 items
  return (
    <View className="flex-1 bg-brand-yellow items-center justify-center px-4">
      <Text className="font-display text-2xl text-gray-900 mb-1">Pick your Explorer!</Text>
      <Text className="font-body text-gray-600 mb-6">Who will you be?</Text>

      <FlatList
        data={AVATARS}
        numColumns={2}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <AvatarCard
            avatar={item}
            selected={selectedId === item.id}
            onPress={() => setSelectedId(item.id)}
          />
        )}
        scrollEnabled={false}
      />

      {selectedId && (
        <Pressable
          onPress={handleConfirm}
          className="mt-6 bg-brand-purple rounded-2xl py-4 px-12"
          accessibilityRole="button"
        >
          <Text className="font-display text-lg text-white">This is me! ✨</Text>
        </Pressable>
      )}
    </View>
  );
}
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
npx jest __tests__/screens/onboarding/AvatarSelectScreen.test.tsx --no-coverage
```

Expected: PASS — 3 tests passing.

- [ ] **Step 7: Commit**

```bash
git add src/constants/avatars.ts src/screens/onboarding/AvatarSelectScreen.tsx src/stores/userStore.ts __tests__/screens/onboarding/AvatarSelectScreen.test.tsx
git commit -m "feat: add avatar constants and avatar selection screen"
```

---

## Task 10: Screen 5 — Name Your Explorer

**Files:**
- Create: `src/screens/onboarding/NameScreen.tsx`
- Test: `__tests__/screens/onboarding/NameScreen.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/screens/onboarding/NameScreen.test.tsx`:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NameScreen } from '../../../src/screens/onboarding/NameScreen';

jest.mock('../../../src/stores/userStore', () => ({
  useUserStore: jest.fn((selector) => selector({
    pendingAge: 5,
    pendingAvatarId: 'avatar-1',
    setPendingName: jest.fn(),
  })),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('NameScreen — Tier 1 (age 5)', () => {
  it('renders illustrated name cards for Tier 1', () => {
    const { getByTestId } = render(<NameScreen />);
    expect(getByTestId('name-card-0')).toBeTruthy();
    expect(getByTestId('name-card-1')).toBeTruthy();
  });

  it('tapping a name card selects it and enables continue', () => {
    const { getByTestId } = render(<NameScreen />);
    fireEvent.press(getByTestId('name-card-0'));
    expect(getByTestId('continue-button')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npx jest __tests__/screens/onboarding/NameScreen.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Implement NameScreen**

Create `src/screens/onboarding/NameScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';
import { useUserStore } from '../../stores/userStore';
import { ageToTier } from '../../utils/tierUtils';

type Nav = StackNavigationProp<OnboardingStackParams, 'Name'>;

const TIER1_NAMES = [
  { name: 'Sparky', symbol: '⚡' },
  { name: 'Zara', symbol: '🌟' },
  { name: 'Bolt', symbol: '🔥' },
  { name: 'Nova', symbol: '🌈' },
  { name: 'Chip', symbol: '🤖' },
  { name: 'Luna', symbol: '🌙' },
];

const SUGGESTED_NAMES = ['Sparky', 'Zara', 'Bolt', 'Nova', 'Chip', 'Luna'];

export function NameScreen() {
  const navigation = useNavigation<Nav>();
  const { pendingAge, setPendingName } = useUserStore((s) => ({
    pendingAge: s.pendingAge,
    setPendingName: s.setPendingName,
  }));
  const tier = ageToTier(pendingAge ?? 10);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [typedName, setTypedName] = useState('');

  const handleContinue = () => {
    const name = tier === 1 ? selectedName : typedName;
    if (!name) return;
    setPendingName(name);
    navigation.navigate('ParentGate');
  };

  if (tier === 1) {
    return (
      <View className="flex-1 bg-orange-100 items-center justify-center px-4">
        <Text className="font-display text-2xl text-gray-900 mb-8">What's your name?</Text>
        <View className="flex-row flex-wrap justify-center">
          {TIER1_NAMES.map((item, i) => (
            <Pressable
              key={item.name}
              testID={`name-card-${i}`}
              onPress={() => setSelectedName(item.name)}
              className={`w-24 h-24 rounded-2xl m-2 items-center justify-center ${
                selectedName === item.name ? 'bg-orange-400' : 'bg-white shadow-sm'
              }`}
              accessibilityRole="button"
              accessibilityLabel={item.name}
            >
              <Text className="text-3xl">{item.symbol}</Text>
              <Text className="font-body text-xs mt-1 text-gray-700">{item.name}</Text>
            </Pressable>
          ))}
        </View>
        {selectedName && (
          <Pressable
            testID="continue-button"
            onPress={handleContinue}
            className="mt-8 bg-brand-purple rounded-2xl py-4 px-12"
          >
            <Text className="font-display text-lg text-white">That's me! 🎉</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-50 items-center justify-center px-8">
      <Text className="font-display text-2xl text-gray-900 mb-2">What should we call your Explorer?</Text>
      <Text className="font-body text-gray-500 mb-6">Choose a name or type your own</Text>
      <View className="flex-row flex-wrap justify-center mb-4">
        {SUGGESTED_NAMES.map((name) => (
          <Pressable
            key={name}
            onPress={() => { setTypedName(name); setSelectedName(name); }}
            className={`m-1 px-4 py-2 rounded-full ${
              typedName === name ? 'bg-brand-purple' : 'bg-white border border-gray-200'
            }`}
          >
            <Text className={`font-body ${typedName === name ? 'text-white' : 'text-gray-700'}`}>{name}</Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-body text-base text-gray-800"
        placeholder="Or type your own name..."
        value={typedName}
        onChangeText={setTypedName}
        maxLength={20}
      />
      {typedName.length > 0 && (
        <Pressable
          testID="continue-button"
          onPress={handleContinue}
          className="mt-8 bg-brand-purple rounded-2xl py-4 px-12"
        >
          <Text className="font-display text-lg text-white">That's me! ✨</Text>
        </Pressable>
      )}
    </View>
  );
}
```

- [ ] **Step 4: Add setPendingName to user store**

Modify `src/stores/userStore.ts`:
```typescript
// Add to UserState interface:
pendingName: string | null;
setPendingName: (name: string) => void;

// Add to store implementation:
pendingName: null,
setPendingName: (name) => set({ pendingName: name }),
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npx jest __tests__/screens/onboarding/NameScreen.test.tsx --no-coverage
```

Expected: PASS — 3 tests passing.

- [ ] **Step 6: Commit**

```bash
git add src/screens/onboarding/NameScreen.tsx src/stores/userStore.ts __tests__/screens/onboarding/NameScreen.test.tsx
git commit -m "feat: add name screen with Tier 1 illustrated cards and Tier 2-4 text input"
```

---

## Task 11: Screen 6 — Parent Gate + Parental Consent

**Files:**
- Create: `src/screens/onboarding/ParentGateScreen.tsx`
- Test: `__tests__/screens/onboarding/ParentGateScreen.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/screens/onboarding/ParentGateScreen.test.tsx`:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ParentGateScreen } from '../../../src/screens/onboarding/ParentGateScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('ParentGateScreen — Tier 1 (age 5)', () => {
  beforeEach(() => {
    jest.spyOn(require('../../../src/stores/userStore'), 'useUserStore')
      .mockImplementation((sel) => sel({ pendingAge: 5, createProfile: jest.fn(), pendingAvatarId: 'avatar-1', pendingName: 'Zara' }));
  });

  it('shows grown-up pattern interrupt for Tier 1', () => {
    const { getByText } = render(<ParentGateScreen />);
    expect(getByText(/Time for a grown-up/i)).toBeTruthy();
  });

  it('child does not see email field for Tier 1', () => {
    const { queryByTestId } = render(<ParentGateScreen />);
    expect(queryByTestId('email-input')).toBeNull();
  });
});

describe('ParentGateScreen — Tier 3 (age 11)', () => {
  beforeEach(() => {
    jest.spyOn(require('../../../src/stores/userStore'), 'useUserStore')
      .mockImplementation((sel) => sel({ pendingAge: 11, createProfile: jest.fn(), pendingAvatarId: 'avatar-1', pendingName: 'Alex' }));
  });

  it('shows email input for Tier 3', () => {
    const { getByTestId } = render(<ParentGateScreen />);
    expect(getByTestId('email-input')).toBeTruthy();
  });

  it('skip navigates to Cinematic', () => {
    const { getByText } = render(<ParentGateScreen />);
    fireEvent.press(getByText(/Skip for now/i));
    expect(mockNavigate).toHaveBeenCalledWith('Cinematic');
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npx jest __tests__/screens/onboarding/ParentGateScreen.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Implement ParentGateScreen**

Create `src/screens/onboarding/ParentGateScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';
import { useUserStore } from '../../stores/userStore';
import { ageToTier } from '../../utils/tierUtils';

type Nav = StackNavigationProp<OnboardingStackParams, 'ParentGate'>;

export function ParentGateScreen() {
  const navigation = useNavigation<Nav>();
  const { pendingAge, pendingAvatarId, pendingName, createProfile } = useUserStore((s) => ({
    pendingAge: s.pendingAge,
    pendingAvatarId: s.pendingAvatarId,
    pendingName: s.pendingName,
    createProfile: s.createProfile,
  }));
  const tier = ageToTier(pendingAge ?? 10);
  const [email, setEmail] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const isYoung = tier <= 2; // hard interrupt for Tier 1 & 2

  const proceedWithEmail = (parentEmail?: string) => {
    createProfile({
      age: pendingAge!,
      avatarId: pendingAvatarId!,
      explorerName: pendingName!,
      parentEmail,
    });
    navigation.navigate('Cinematic');
  };

  if (isYoung) {
    return (
      <View className="flex-1 bg-red-50 items-center justify-center px-8">
        <Text className="text-6xl mb-4">🛑</Text>
        <Text className="font-display text-2xl text-gray-900 text-center mb-3">
          Time for a grown-up!
        </Text>
        <Text className="font-body text-gray-600 text-center mb-8">
          Ask a parent or guardian to enter their email to save your adventure progress.
        </Text>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TextInput
            testID="email-input-parent"
            className="w-72 bg-white border border-gray-200 rounded-xl px-4 py-3 font-body text-base mb-3"
            placeholder="Parent's email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text className="font-body text-xs text-gray-400 text-center mb-4">
            COPPA-compliant. We only use this to save progress. Never shared.
          </Text>
          <Pressable
            onPress={() => proceedWithEmail(email)}
            disabled={!email.includes('@')}
            className={`rounded-2xl py-4 px-8 items-center ${email.includes('@') ? 'bg-brand-purple' : 'bg-gray-200'}`}
          >
            <Text className="font-display text-base text-white">Save our adventure! 🗺️</Text>
          </Pressable>
          <Pressable
            onPress={() => proceedWithEmail(undefined)}
            className="mt-3 items-center"
          >
            <Text className="font-body text-sm text-gray-400">
              Skip — progress saves on this device only
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-purple-50 items-center justify-center px-8">
      <Text className="text-5xl mb-4">📧</Text>
      <Text className="font-display text-xl text-gray-900 text-center mb-2">
        Ask a grown-up to enter their email
      </Text>
      <Text className="font-body text-gray-500 text-center mb-6">
        This saves your progress so you can pick up where you left off.
      </Text>
      <TextInput
        testID="email-input"
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-body text-base mb-3"
        placeholder="Parent or guardian email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text className="font-body text-xs text-gray-400 text-center mb-6">
        COPPA-compliant. Progress data only. Never shared.
      </Text>
      <Pressable
        onPress={() => proceedWithEmail(email)}
        disabled={!email.includes('@')}
        className={`w-full rounded-2xl py-4 items-center ${email.includes('@') ? 'bg-brand-purple' : 'bg-gray-200'}`}
      >
        <Text className="font-display text-base text-white">Save my progress 🔒</Text>
      </Pressable>
      <Pressable onPress={() => proceedWithEmail(undefined)} className="mt-4">
        <Text className="font-body text-sm text-gray-400">Skip for now</Text>
      </Pressable>
    </View>
  );
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx jest __tests__/screens/onboarding/ParentGateScreen.test.tsx --no-coverage
```

Expected: PASS — 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/screens/onboarding/ParentGateScreen.tsx __tests__/screens/onboarding/ParentGateScreen.test.tsx
git commit -m "feat: add parent gate with Tier 1/2 pattern interrupt and COPPA email consent"
```

---

## Task 12: Screen 7 — World Intro Cinematic

**Files:**
- Create: `src/screens/onboarding/CinematicScreen.tsx`

- [ ] **Step 1: Implement CinematicScreen**

Create `src/screens/onboarding/CinematicScreen.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';
import { useUserStore } from '../../stores/userStore';
import { ageToTier } from '../../utils/tierUtils';

type Nav = StackNavigationProp<OnboardingStackParams, 'Cinematic'>;

const BEATS = [
  { prompt: 'Tap to launch your Explorer!', emoji: '🚀', bg: '#7C3AED' },
  { prompt: 'Tap the portal!', emoji: '🌀', bg: '#3B82F6' },
  { prompt: 'Wave hello to your companion!', emoji: '👋', bg: '#10B981' },
];

export function CinematicScreen() {
  const navigation = useNavigation<Nav>();
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const pendingAge = useUserStore((s) => s.pendingAge);
  const tier = ageToTier(pendingAge ?? 10);
  const [beat, setBeat] = useState(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withDelay(100, withSpring(1));
  }, [beat]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleTap = () => {
    if (beat < 2) {
      scale.value = 0;
      opacity.value = 0;
      setBeat((b) => b + 1);
    } else {
      completeOnboarding();
      // RootNavigator will detect isOnboardingComplete and show WorldMapStub
    }
  };

  const canSkip = tier >= 3 && beat >= 1;
  const current = BEATS[beat];

  return (
    <Pressable
      onPress={handleTap}
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: current.bg }}
      accessibilityRole="button"
      accessibilityLabel={current.prompt}
    >
      <Animated.View style={animStyle} className="items-center px-8">
        <Text className="text-8xl mb-6">{current.emoji}</Text>
        <Text className="font-display text-2xl text-white text-center">{current.prompt}</Text>
        <Text className="font-body text-white/60 mt-4 text-sm">Tap anywhere</Text>
      </Animated.View>

      {canSkip && (
        <Pressable
          onPress={() => completeOnboarding()}
          className="absolute bottom-12"
          accessibilityRole="button"
          accessibilityLabel="Skip intro"
        >
          <Text className="font-body text-white/50 text-sm">Skip →</Text>
        </Pressable>
      )}

      {/* Step dots */}
      <View className="absolute bottom-6 flex-row gap-2">
        {BEATS.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full ${i <= beat ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </View>
    </Pressable>
  );
}
```

- [ ] **Step 2: Verify full onboarding flow end-to-end**

```bash
npx expo start
```

Walk through: Splash → Welcome → Age → Avatar → Name → Parent Gate → Cinematic → World Map Stub.
Expected: Completing all 7 screens lands on the WorldMapStub screen.

- [ ] **Step 3: Commit**

```bash
git add src/screens/onboarding/CinematicScreen.tsx
git commit -m "feat: add interactive 3-beat cinematic onboarding screen with skip for Tier 3-4"
```

---

## Task 13: Full Test Suite + Final Verification

- [ ] **Step 1: Run all tests**

```bash
npx jest --no-coverage
```

Expected: All tests pass. Zero failures.

- [ ] **Step 2: Verify onboarding persists across reload**

```bash
npx expo start
```

Complete full onboarding. Close and reopen the app.
Expected: App opens directly to WorldMapStub — onboarding not shown again (MMKV persistence working).

- [ ] **Step 3: Clear storage and verify onboarding re-runs**

In development console:
```bash
# On Android emulator: clear app data via Settings > Apps > KinderAI > Clear Data
# Or add a temporary "Reset" button in WorldMapStub that calls:
# useUserStore.getState().completeOnboarding() set to false via store reset
```

Expected: After clear, onboarding runs from Splash again.

- [ ] **Step 4: Final commit and push**

```bash
git add .
git commit -m "feat: complete Plan 1 — foundation, design system, and 7-screen onboarding"
git push origin main
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Screen 1 (Splash): Task 6
- [x] Screen 2 (Welcome): Task 7
- [x] Screen 3 (Age Selection): Task 8
- [x] Screen 4 (Avatar Selection): Task 9
- [x] Screen 5 (Name): Task 10
- [x] Screen 6 (Parent Gate + COPPA): Task 11
- [x] Screen 7 (Cinematic): Task 12
- [x] Tier system (4 tiers, age mapping): Tasks 2–3
- [x] MMKV persistence: Task 3
- [x] Tier 1 pattern interrupt on Parent Gate: Task 11
- [x] Tier 1 illustrated name cards: Task 10
- [x] Skip = local-only save: Task 11
- [x] Cinematic skippable for Tier 3–4: Task 12
- [x] Navigation to World Map after onboarding: Task 5 + Task 12

**Pending for later plans:**
- Parent email verification (COPPA legal requirement — Plan 6)
- Notification permission screen (fires after first mission — Plan 3)
- World map (Plan 2)
