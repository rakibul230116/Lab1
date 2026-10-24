import { Game, Category, LeaderboardEntry, WaitlistEntry } from '../types';
import { SEED_GAMES, INITIAL_LEADERBOARD } from '../data/seedGames';
import { INITIAL_CATEGORIES } from '../data/categories';

/**
 * gamesService – Data persistence layer
 * 
 * NOTE FOR CLIENT / PRODUCTION:
 * Currently backed by browser localStorage with initial seed data.
 * To scale to a production multi-server infrastructure, swap the implementations
 * inside these functions to call your backend REST / GraphQL APIs (e.g. Firebase Firestore,
 * Supabase PostgreSQL, or WordPress Headless REST API).
 */

const STORAGE_KEYS = {
  GAMES: 'playhub_games_v1',
  CATEGORIES: 'playhub_categories_v1',
  LEADERBOARD: 'playhub_leaderboard_v1',
  WAITLIST: 'playhub_waitlist_v1',
  LIKED_GAMES: 'playhub_liked_games_v1',
};

class GamesService {
  // --- GAMES ---
  getGames(): Game[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GAMES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored games, falling back to seed:', e);
    }
    // Initialize with seed games
    this.saveGames(SEED_GAMES);
    return SEED_GAMES;
  }

  saveGames(games: Game[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    } catch (e) {
      console.error('Failed to save games to localStorage:', e);
    }
  }

  getGameBySlug(slug: string): Game | undefined {
    const games = this.getGames();
    return games.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
  }

  getGameById(id: string): Game | undefined {
    const games = this.getGames();
    return games.find((g) => g.id === id);
  }

  createGame(gameData: Omit<Game, 'id' | 'createdAt'>): Game {
    const games = this.getGames();
    const newGame: Game = {
      ...gameData,
      id: `game-${Date.now()}`,
      createdAt: new Date().toISOString(),
      plays: gameData.plays || 0,
      rating: gameData.rating || 5.0,
      ratingCount: gameData.ratingCount || 1,
    };
    const updated = [newGame, ...games];
    this.saveGames(updated);
    return newGame;
  }

  updateGame(id: string, updates: Partial<Game>): Game | undefined {
    const games = this.getGames();
    const index = games.findIndex((g) => g.id === id);
    if (index === -1) return undefined;

    games[index] = { ...games[index], ...updates };
    this.saveGames(games);
    return games[index];
  }

  deleteGame(id: string): boolean {
    const games = this.getGames();
    const filtered = games.filter((g) => g.id !== id);
    if (filtered.length !== games.length) {
      this.saveGames(filtered);
      return true;
    }
    return false;
  }

  reorderGames(ids: string[]): Game[] {
    const games = this.getGames();
    const map = new Map(games.map((g) => [g.id, g]));
    const reordered: Game[] = [];

    ids.forEach((id) => {
      const g = map.get(id);
      if (g) reordered.push(g);
    });

    // Add any remaining
    games.forEach((g) => {
      if (!ids.includes(g.id)) reordered.push(g);
    });

    this.saveGames(reordered);
    return reordered;
  }

  incrementPlays(id: string): void {
    const games = this.getGames();
    const game = games.find((g) => g.id === id);
    if (game) {
      game.plays = (game.plays || 0) + 1;
      this.saveGames(games);
    }
  }

  rateGame(id: string, userRating: number): { rating: number; ratingCount: number } | null {
    const games = this.getGames();
    const game = games.find((g) => g.id === id);
    if (!game) return null;

    const currentCount = game.ratingCount || 1;
    const currentRating = game.rating || 5.0;
    const newCount = currentCount + 1;
    const newRating = Number(((currentRating * currentCount + userRating) / newCount).toFixed(1));

    game.rating = newRating;
    game.ratingCount = newCount;
    this.saveGames(games);
    return { rating: newRating, ratingCount: newCount };
  }

  // --- CATEGORIES ---
  getCategories(): Category[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse categories:', e);
    }
    this.saveCategories(INITIAL_CATEGORIES);
    return INITIAL_CATEGORIES;
  }

  saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories:', e);
    }
  }

  addCategory(category: Category): Category {
    const categories = this.getCategories();
    const updated = [...categories, category];
    this.saveCategories(updated);
    return category;
  }

  deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filtered = categories.filter((c) => c.id !== id);
    if (filtered.length !== categories.length) {
      this.saveCategories(filtered);
      return true;
    }
    return false;
  }

  // --- LEADERBOARDS ---
  getLeaderboard(gameId?: string, limit: number = 10): LeaderboardEntry[] {
    let entries: LeaderboardEntry[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (stored) {
        entries = JSON.parse(stored);
      } else {
        entries = INITIAL_LEADERBOARD;
        localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(entries));
      }
    } catch (e) {
      entries = INITIAL_LEADERBOARD;
    }

    if (gameId) {
      entries = entries.filter((e) => e.gameId === gameId);
    }

    // Sort descending by score
    entries.sort((a, b) => b.score - a.score);

    return entries.slice(0, limit).map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }

  submitScore(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
    const current = this.getLeaderboard(undefined, 100);
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: `lb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      avatar: entry.avatar || ['🎮', '⚡', '🏆', '🔥', '🚀', '🌟'][Math.floor(Math.random() * 6)],
    };

    const updated = [newEntry, ...current];
    try {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save leaderboard entry:', e);
    }
    return newEntry;
  }

  // --- WAITLIST / PREMIUM ---
  getWaitlist(): WaitlistEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WAITLIST);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  }

  addToWaitlist(email: string, tier: 'monthly' | 'yearly'): boolean {
    const list = this.getWaitlist();
    if (list.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
      return false; // already joined
    }
    const newEntry: WaitlistEntry = {
      id: `waitlist-${Date.now()}`,
      email,
      tier,
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEYS.WAITLIST, JSON.stringify([...list, newEntry]));
      return true;
    } catch (e) {
      return false;
    }
  }

  // --- LIKED GAMES ---
  getLikedGameIds(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LIKED_GAMES);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  toggleLikeGame(id: string): boolean {
    const liked = this.getLikedGameIds();
    const idx = liked.indexOf(id);
    let isLikedNow = false;
    if (idx > -1) {
      liked.splice(idx, 1);
      isLikedNow = false;
    } else {
      liked.push(id);
      isLikedNow = true;
    }
    localStorage.setItem(STORAGE_KEYS.LIKED_GAMES, JSON.stringify(liked));
    return isLikedNow;
  }

  // --- RESET UTILITY ---
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(SEED_GAMES));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_LEADERBOARD));
  }
}

export const gamesService = new GamesService();
