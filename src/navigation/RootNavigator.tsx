import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserStore } from '../stores/userStore';
import { OnboardingNavigator } from './OnboardingNavigator';
import { WorldMapStub } from '../screens/main/WorldMapStub';

export type RootStackParams = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export function RootNavigator() {
  const isOnboardingComplete = useUserStore((s) => s.isOnboardingComplete);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboardingComplete ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <Stack.Screen name="Main" component={WorldMapStub} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
