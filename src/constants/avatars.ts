export interface AvatarDef {
  id: string;
  name: string;
  emoji: string;
  trait: string;
}

export const AVATARS: AvatarDef[] = [
  { id: 'volt',    name: 'Volt',    emoji: '🦊', trait: 'Curious & quick-thinking' },
  { id: 'circuit', name: 'Circuit', emoji: '🤖', trait: 'Logical & detail-oriented' },
  { id: 'blaze',   name: 'Blaze',   emoji: '🐉', trait: 'Bold & endlessly creative' },
  { id: 'sage',    name: 'Sage',    emoji: '🦉', trait: 'Wise & always thoughtful' },
];
