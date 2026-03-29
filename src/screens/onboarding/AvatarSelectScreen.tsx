import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParams } from '../../navigation/OnboardingNavigator';
import { useUserStore } from '../../stores/userStore';
import { AVATARS, AvatarDef } from '../../constants/avatars';

type Nav = StackNavigationProp<OnboardingStackParams, 'AvatarSelect'>;

function AvatarCard({ avatar, selected, onPress }: { avatar: AvatarDef; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      testID={`avatar-card-${avatar.id}`}
      onPress={onPress}
      className={`w-36 h-40 rounded-3xl m-2 items-center justify-center ${
        selected ? 'bg-brand border-4 border-white' : 'bg-white shadow-md'
      }`}
      accessibilityRole="button"
      accessibilityLabel={`Choose ${avatar.name}`}
    >
      <Text className="text-5xl mb-2">{avatar.emoji}</Text>
      <Text className="font-display text-base text-gray-800">{avatar.name}</Text>
    </Pressable>
  );
}

export function AvatarSelectScreen() {
  const navigation = useNavigation<Nav>();
  const setPendingAvatarId = useUserStore((s) => s.setPendingAvatarId);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedId) return;
    setPendingAvatarId(selectedId);
    navigation.navigate('Name');
  };

  return (
    <View className="flex-1 bg-warm items-center justify-center px-4">
      <Text className="font-display text-2xl text-dark mb-1">Pick your Explorer!</Text>
      <Text className="font-body text-gray-600 mb-6">Who will you be?</Text>

      <FlatList
        data={AVATARS}
        numColumns={2}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <AvatarCard
            avatar={item}
            selected={selectedId === item.id}
            onPress={() => setSelectedId(item.id)}
          />
        )}
        scrollEnabled={false}
      />

      {selectedId && (
        <Pressable
          onPress={handleConfirm}
          className="mt-6 bg-brand rounded-2xl py-4 px-12"
          accessibilityRole="button"
        >
          <Text className="font-display text-lg text-white">This is me!</Text>
        </Pressable>
      )}
    </View>
  );
}
