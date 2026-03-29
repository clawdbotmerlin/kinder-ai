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
    <LinearGradient colors={['#14182E', '#F5A420']} className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
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
          className="bg-brand rounded-2xl py-4 px-12 shadow-lg"
          accessibilityRole="button"
          accessibilityLabel="Let's Go!"
        >
          <Text className="font-display text-xl text-white">Let's Go! 🚀</Text>
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
