import React from 'react';
import { View, Text, Pressable } from 'react-native';
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
        <Text className="font-display text-xl text-brand">{age}</Text>
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
    <View className="flex-1 bg-dark items-center justify-center px-6">
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
