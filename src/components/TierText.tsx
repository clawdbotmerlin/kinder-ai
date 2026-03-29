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

  if (tier.requiresAudioNarration) return null;

  return <Text className={className ?? 'font-body text-base text-gray-800'}>{children}</Text>;
}
