import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { Game, LeaderboardEntry } from '../types';
import { gamesService } from '../services/gamesService';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { CategoryChips } from '../components/home/CategoryChips';
import { GameCard } from '../components/home/GameCard';
import { Sidebar } from '../components/home/Sidebar';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';

export const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [topPlayers, setTopPlayers] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const loadedGames = gamesService.getGames();
    setGames(loadedGames);
    setTopPlayers(gamesService.getLeaderboard(undefined, 10));
  }, []);

  const featuredGames = games.filter((g) => g.isFeatured);
  const popularGames = games.filter((g) => g.isPopular);
  const newGames = games.filter((g) => g.isNew);

  return (
    <div className="w-full">
      <SEO
        title="PlayHub – Free Online HTML5 Games"
        description="Play thousands of free online HTML5 games instantly on PlayHub. Puzzle, Action, Arcade, Racing, Brain Training and more with high scores and leaderboards!"
      />

      {/* Top 728x90 Leaderboard AdSlot */}
      <div className="w-full flex justify-center px-4 pt-4">
        <AdSlot size="728x90" label="Top Leaderboard Sponsor (728×90)" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* 1. Hero Carousel */}
        <HeroCarousel featuredGames={featuredGames} />

        {/* 2. Category Chips / Cards */}
        <CategoryChips games={games} />

        {/* 3. Main Content Split: Left Games Grid + Right Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Main Column */}
          <div className="flex-1 min-w-0 flex flex-col gap-10">
            {/* Popular Games Section */}
            <section aria-labelledby="popular-heading">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-rose-500/20" />
                  </div>
                  <div>
                    <h2 id="popular-heading" className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Popular Games
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Most played titles by the PlayHub community this week
                    </p>
                  </div>
                </div>
                <Link
                  to="/popular"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"
                >
                  <span>See all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Grid with in-grid native ad slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {popularGames.slice(0, 5).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
                {/* In-Grid Native AdSlot */}
                <AdSlot size="native" className="min-h-[240px]" />
                {popularGames.slice(5, 8).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>

            {/* New Games Section */}
            <section aria-labelledby="new-heading">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 id="new-heading" className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      New Releases
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Freshly launched HTML5 indie titles ready to play instantly
                    </p>
                  </div>
                </div>
                <Link
                  to="/new"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"
                >
                  <span>See all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {newGames.slice(0, 6).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>

            {/* Full High-Score Leaderboard Preview Section */}
            <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-white shadow-md">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Global High Score Hall of Fame
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Top 10 players across all titles. Submit your score to claim the podium!
                    </p>
                  </div>
                </div>
                <Link
                  to="/leaderboard"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition"
                >
                  View Full Standings
                </Link>
              </div>

              {/* Table of Top 10 */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">Player</th>
                      <th className="py-2.5 px-3">Game</th>
                      <th className="py-2.5 px-3 text-right">Score</th>
                      <th className="py-2.5 px-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {topPlayers.slice(0, 8).map((player, idx) => (
                      <tr key={player.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <td className="py-3 px-3">
                          <span
                            className={`font-bold tabular-nums ${
                              idx === 0
                                ? 'text-yellow-500'
                                : idx === 1
                                ? 'text-slate-400'
                                : idx === 2
                                ? 'text-amber-600'
                                : 'text-slate-500'
                            }`}
                          >
                            #{idx + 1}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{player.avatar || '🎮'}</span>
                            <span className="font-bold text-slate-900 dark:text-slate-200">
                              {player.playerName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                          {player.gameTitle}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                          {player.score.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right text-slate-400 tabular-nums">
                          {player.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Sidebar (Desktop only, collapses below on mobile) */}
          <Sidebar topPlayers={topPlayers} />
        </div>
      </div>
    </div>
  );
};
