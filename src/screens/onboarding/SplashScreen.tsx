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
    <View className="flex-1 bg-brand items-center justify-center">
      <Animated.View style={logoStyle} className="items-center">
        <Text className="text-7xl">🤖</Text>
        <Text className="font-display text-4xl text-white mt-4">KinderAI</Text>
        <Text className="font-body text-white/70 mt-2 text-base">Learn. Play. Explore.</Text>
      </Animated.View>
    </View>
  );
}
