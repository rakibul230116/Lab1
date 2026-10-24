export interface GameControl {
  key: string;
  action: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  rating: number;
  ratingCount: number;
  plays: number;
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  createdAt: string;
  instructions: string;
  controls?: GameControl[];
  tags: string[];
  developer?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  accentBg: string;
}

export interface LeaderboardEntry {
  id: string;
  gameId: string;
  gameTitle: string;
  playerName: string;
  score: number;
  date: string;
  rank?: number;
  avatar?: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  tier: 'monthly' | 'yearly';
  createdAt: string;
}

export type ThemeMode = 'dark' | 'light';
