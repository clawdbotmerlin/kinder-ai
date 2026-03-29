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
  const isYoung = tier <= 2;

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
            className={`rounded-2xl py-4 px-8 items-center ${email.includes('@') ? 'bg-brand' : 'bg-gray-200'}`}
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
        className={`w-full rounded-2xl py-4 items-center ${email.includes('@') ? 'bg-brand' : 'bg-gray-200'}`}
      >
        <Text className="font-display text-base text-white">Save my progress 🔒</Text>
      </Pressable>
      <Pressable onPress={() => proceedWithEmail(undefined)} className="mt-4">
        <Text className="font-body text-sm text-gray-400">Skip for now</Text>
      </Pressable>
    </View>
  );
}
