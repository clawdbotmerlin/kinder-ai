import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ParentGateScreen } from '../../../src/screens/onboarding/ParentGateScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

beforeEach(() => mockNavigate.mockClear());

describe('ParentGateScreen — Tier 1 (age 5)', () => {
  beforeEach(() => {
    jest.spyOn(require('../../../src/stores/userStore'), 'useUserStore')
      .mockImplementation((sel: any) => sel({ pendingAge: 5, createProfile: jest.fn(), pendingAvatarId: 'avatar-1', pendingName: 'Zara' }));
  });

  it('shows grown-up pattern interrupt for Tier 1', () => {
    const { getByText } = render(<ParentGateScreen />);
    expect(getByText(/Time for a grown-up/i)).toBeTruthy();
  });

  it('child does not see email-input testID for Tier 1 (uses email-input-parent)', () => {
    const { queryByTestId } = render(<ParentGateScreen />);
    expect(queryByTestId('email-input')).toBeNull();
  });
});

describe('ParentGateScreen — Tier 3 (age 11)', () => {
  beforeEach(() => {
    jest.spyOn(require('../../../src/stores/userStore'), 'useUserStore')
      .mockImplementation((sel: any) => sel({ pendingAge: 11, createProfile: jest.fn(), pendingAvatarId: 'avatar-1', pendingName: 'Alex' }));
  });

  it('shows email input for Tier 3', () => {
    const { getByTestId } = render(<ParentGateScreen />);
    expect(getByTestId('email-input')).toBeTruthy();
  });

  it('skip navigates to Cinematic', () => {
    const { getByText } = render(<ParentGateScreen />);
    fireEvent.press(getByText(/Skip for now/i));
    expect(mockNavigate).toHaveBeenCalledWith('Cinematic');
  });
});
