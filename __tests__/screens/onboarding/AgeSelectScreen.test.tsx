import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AgeSelectScreen } from '../../../src/screens/onboarding/AgeSelectScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe('AgeSelectScreen', () => {
  it('renders age bubbles from 4 to 15', () => {
    const { getByTestId } = render(<AgeSelectScreen />);
    for (let age = 4; age <= 15; age++) {
      expect(getByTestId(`age-bubble-${age}`)).toBeTruthy();
    }
  });

  it('navigates to AvatarSelect on age tap', () => {
    const { getByTestId } = render(<AgeSelectScreen />);
    fireEvent.press(getByTestId('age-bubble-7'));
    expect(mockNavigate).toHaveBeenCalledWith('AvatarSelect');
  });

  it('stores selected age in user store', () => {
    const { getByTestId } = render(<AgeSelectScreen />);
    fireEvent.press(getByTestId('age-bubble-5'));
    const { useUserStore } = require('../../../src/stores/userStore');
    const state = useUserStore.getState();
    expect(state.pendingAge).toBe(5);
  });
});
