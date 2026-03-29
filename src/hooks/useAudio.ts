import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export function useAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);

  async function playFile(source: number) {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(source);
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
