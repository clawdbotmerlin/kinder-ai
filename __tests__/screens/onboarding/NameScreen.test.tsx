import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NameScreen } from '../../../src/screens/onboarding/NameScreen';

jest.mock('../../../src/stores/userStore', () => ({
  useUserStore: jest.fn((selector) => selector({
    pendingAge: 5,
    pendingAvatarId: 'avatar-1',
    setPendingName: jest.fn(),
  })),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('NameScreen — Tier 1 (age 5)', () => {
  it('renders illustrated name cards for Tier 1', () => {
    const { getByTestId } = render(<NameScreen />);
    expect(getByTestId('name-card-0')).toBeTruthy();
    expect(getByTestId('name-card-1')).toBeTruthy();
  });

  it('tapping a name card selects it and enables continue', () => {
    const { getByTestId } = render(<NameScreen />);
    fireEvent.press(getByTestId('name-card-0'));
    expect(getByTestId('continue-button')).toBeTruthy();
  });
});
