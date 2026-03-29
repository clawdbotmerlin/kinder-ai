import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTier } from '../hooks/useTier';

interface TierButtonProps {
  label: string;
  icon?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  audioFile?: number;
  testID?: string;
}

export function TierButton({ label, icon, onPress, variant = 'primary', testID }: TierButtonProps) {
  const tier = useTier();
  const isPrimary = variant === 'primary';

  const baseStyle = `rounded-2xl flex-row items-center justify-center gap-2 ${
    tier.number === 1 ? 'py-5 px-8 min-h-[60px] min-w-[60px]' : 'py-3 px-6'
  } ${isPrimary ? 'bg-brand' : 'bg-white border-2 border-brand'}`;

  const textStyle = `font-body text-base ${isPrimary ? 'text-white' : 'text-brand'}`;

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
