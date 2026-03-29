import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AvatarSelectScreen } from '../../../src/screens/onboarding/AvatarSelectScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

beforeEach(() => mockNavigate.mockClear());

describe('AvatarSelectScreen', () => {
  it('renders all 4 avatars', () => {
    const { getByTestId } = render(<AvatarSelectScreen />);
    ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4'].forEach((id) => {
      expect(getByTestId(`avatar-card-${id}`)).toBeTruthy();
    });
  });

  it('tapping avatar shows confirm button', () => {
    const { getByTestId, getByText } = render(<AvatarSelectScreen />);
    fireEvent.press(getByTestId('avatar-card-avatar-1'));
    expect(getByText('This is me!')).toBeTruthy();
  });

  it('confirming avatar stores avatarId and navigates', () => {
    const { getByTestId, getByText } = render(<AvatarSelectScreen />);
    fireEvent.press(getByTestId('avatar-card-avatar-2'));
    fireEvent.press(getByText('This is me!'));
    const { useUserStore } = require('../../../src/stores/userStore');
    expect(useUserStore.getState().pendingAvatarId).toBe('avatar-2');
    expect(mockNavigate).toHaveBeenCalledWith('Name');
  });
});
