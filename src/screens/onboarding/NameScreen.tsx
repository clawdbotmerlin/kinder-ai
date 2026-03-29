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
                selectedName === item.name ? 'bg-brand' : 'bg-white shadow-sm'
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
            className="mt-8 bg-brand rounded-2xl py-4 px-12"
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
              typedName === name ? 'bg-brand' : 'bg-white border border-gray-200'
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
          className="mt-8 bg-brand rounded-2xl py-4 px-12"
        >
          <Text className="font-display text-lg text-white">That's me! ✨</Text>
        </Pressable>
      )}
    </View>
  );
}
