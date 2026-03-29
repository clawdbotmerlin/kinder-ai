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
