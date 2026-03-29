import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useUserStore } from '../../stores/userStore';
import { ageToTier } from '../../utils/tierUtils';

const BEATS = [
  { prompt: 'Tap to launch your Explorer!', emoji: '🚀', bg: '#14182E' },
  { prompt: 'Tap the portal!', emoji: '🌀', bg: '#F5A420' },
  { prompt: 'Wave hello to your companion!', emoji: '👋', bg: '#14182E' },
];

export function CinematicScreen() {
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
          onPress={completeOnboarding}
          className="absolute bottom-12"
          accessibilityRole="button"
          accessibilityLabel="Skip intro"
        >
          <Text className="font-body text-white/50 text-sm">Skip →</Text>
        </Pressable>
      )}

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
