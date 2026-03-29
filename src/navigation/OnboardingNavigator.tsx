import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { AgeSelectScreen } from '../screens/onboarding/AgeSelectScreen';
import { AvatarSelectScreen } from '../screens/onboarding/AvatarSelectScreen';
import { NameScreen } from '../screens/onboarding/NameScreen';
import { ParentGateScreen } from '../screens/onboarding/ParentGateScreen';
import { CinematicScreen } from '../screens/onboarding/CinematicScreen';

export type OnboardingStackParams = {
  Splash: undefined;
  Welcome: undefined;
  AgeSelect: undefined;
  AvatarSelect: undefined;
  Name: undefined;
  ParentGate: undefined;
  Cinematic: undefined;
};

const Stack = createStackNavigator<OnboardingStackParams>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AgeSelect" component={AgeSelectScreen} />
      <Stack.Screen name="AvatarSelect" component={AvatarSelectScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="ParentGate" component={ParentGateScreen} />
      <Stack.Screen name="Cinematic" component={CinematicScreen} />
    </Stack.Navigator>
  );
}
