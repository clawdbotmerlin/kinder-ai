import { useUserStore } from '../../src/stores/userStore';

beforeEach(() => {
  useUserStore.setState({
    profile: null,
    isOnboardingComplete: false,
  });
});

describe('useUserStore', () => {
  it('starts with no profile', () => {
    expect(useUserStore.getState().profile).toBeNull();
  });

  it('creates profile with correct tier from age 8', () => {
    useUserStore.getState().createProfile({ age: 8, avatarId: 'volt', explorerName: 'Zara' });
    const profile = useUserStore.getState().profile;
    expect(profile?.tier).toBe(2);
    expect(profile?.explorerName).toBe('Zara');
    expect(profile?.avatarId).toBe('volt');
  });

  it('creates profile with correct tier from age 5 (tier 1)', () => {
    useUserStore.getState().createProfile({ age: 5, avatarId: 'blaze', explorerName: 'Sam' });
    expect(useUserStore.getState().profile?.tier).toBe(1);
  });

  it('sets initial XP and level to 0 and 1', () => {
    useUserStore.getState().createProfile({ age: 10, avatarId: 'sage', explorerName: 'Leo' });
    const profile = useUserStore.getState().profile;
    expect(profile?.xp).toBe(0);
    expect(profile?.level).toBe(1);
  });

  it('sets initial streak values to 0', () => {
    useUserStore.getState().createProfile({ age: 10, avatarId: 'sage', explorerName: 'Leo' });
    const profile = useUserStore.getState().profile;
    expect(profile?.currentStreak).toBe(0);
    expect(profile?.adventureDays).toBe(0);
  });

  it('stores parentEmail when provided', () => {
    useUserStore.getState().createProfile({ age: 5, avatarId: 'volt', explorerName: 'Bolt', parentEmail: 'parent@example.com' });
    expect(useUserStore.getState().profile?.parentEmail).toBe('parent@example.com');
  });

  it('parentEmail is undefined when not provided', () => {
    useUserStore.getState().createProfile({ age: 5, avatarId: 'volt', explorerName: 'Bolt' });
    expect(useUserStore.getState().profile?.parentEmail).toBeUndefined();
  });

  it('completeOnboarding sets flag to true', () => {
    useUserStore.getState().completeOnboarding();
    expect(useUserStore.getState().isOnboardingComplete).toBe(true);
  });

  it('addXP increases profile xp', () => {
    useUserStore.getState().createProfile({ age: 8, avatarId: 'volt', explorerName: 'Zara' });
    useUserStore.getState().addXP(150);
    expect(useUserStore.getState().profile?.xp).toBe(150);
  });
});
