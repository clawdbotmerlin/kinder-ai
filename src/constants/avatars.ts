export interface AvatarDef {
  id: string;
  name: string;
  emoji: string;
  introLine: string;
}

export const AVATARS: AvatarDef[] = [
  { id: 'avatar-1', name: 'Zara', emoji: '🤖', introLine: "Hi, I'm Zara! I love adventures!" },
  { id: 'avatar-2', name: 'Bolt', emoji: '⚡', introLine: "I'm Bolt! Let's explore!" },
  { id: 'avatar-3', name: 'Nova', emoji: '🌟', introLine: "Nova here! Ready to learn?" },
  { id: 'avatar-4', name: 'Chip', emoji: '🔬', introLine: "Hey! I'm Chip. Science is cool!" },
];
