import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Plus, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeaderboardEntry, Game } from '../types';
import { gamesService } from '../services/gamesService';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';

export const LeaderboardPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  // Score Submit Dialog
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scoreVal, setScoreVal] = useState('');
  const [submitGameId, setSubmitGameId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const loadedGames = gamesService.getGames();
    setGames(loadedGames);
    if (loadedGames.length > 0) setSubmitGameId(loadedGames[0].id);
    loadScores('all');
  }, []);

  const loadScores = (gameId: string) => {
    const data = gamesService.getLeaderboard(gameId === 'all' ? undefined : gameId, 50);
    setEntries(data);
  };

  const handleGameFilterChange = (id: string) => {
    setSelectedGameId(id);
    loadScores(id);
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    const g = games.find((item) => item.id === submitGameId);
    if (!g || !playerName.trim() || !scoreVal.trim()) return;

    const num = parseInt(scoreVal.replace(/\D/g, ''), 10);
    if (isNaN(num) || num <= 0) return;

    gamesService.submitScore({
      gameId: g.id,
      gameTitle: g.title,
      playerName: playerName.trim(),
      score: num,
    });

    setIsSuccess(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      setScoreVal('');
      loadScores(selectedGameId);
    }, 1800);
  };

  return (
    <div className="w-full">
      <SEO
        title="Global Leaderboard & High Scores"
        description="Check the official PlayHub high scores and champions across all browser games. Submit your score now!"
      />

      <div className="w-full flex justify-center px-4 pt-3">
        <AdSlot size="728x90" label="Leaderboard Sponsor (728×90)" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-white shadow-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                PlayHub Hall of Fame
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Official global high-score records verified across all HTML5 titles.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Record</span>
          </button>
        </div>

        {/* Filter bar by Game */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => handleGameFilterChange('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedGameId === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            All Games
          </button>
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => handleGameFilterChange(g.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedGameId === g.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Top 3 Podium Cards */}
        {entries.length >= 3 && selectedGameId === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col items-center text-center shadow-sm order-2 md:order-1">
              <span className="text-3xl mb-1">🥈</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2nd Place
              </span>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-1">
                {entries[1].playerName}
              </h3>
              <p className="text-xs text-slate-500">{entries[1].gameTitle}</p>
              <div className="mt-3 font-mono text-xl font-bold text-slate-400">
                {entries[1].score.toLocaleString()}
              </div>
            </div>

            {/* 1st Place Champion */}
            <div className="rounded-2xl bg-gradient-to-b from-yellow-500/10 via-amber-500/5 to-transparent dark:bg-slate-900 border-2 border-yellow-500/50 p-6 flex flex-col items-center text-center shadow-xl order-1 md:order-2 transform md:-translate-y-2">
              <span className="text-4xl mb-1">🥇</span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-yellow-500">
                Global Grand Champion
              </span>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-1">
                {entries[0].playerName}
              </h3>
              <p className="text-xs text-purple-400 font-semibold">{entries[0].gameTitle}</p>
              <div className="mt-3 font-mono text-2xl font-black text-yellow-500 dark:text-yellow-400">
                {entries[0].score.toLocaleString()}
              </div>
            </div>

            {/* 3rd Place */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col items-center text-center shadow-sm order-3">
              <span className="text-3xl mb-1">🥉</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                3rd Place
              </span>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-1">
                {entries[2].playerName}
              </h3>
              <p className="text-xs text-slate-500">{entries[2].gameTitle}</p>
              <div className="mt-3 font-mono text-xl font-bold text-amber-600">
                {entries[2].score.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Detailed High Scores Table */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Game</th>
                  <th className="py-3 px-4 text-right">High Score</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {entries.map((entry, idx) => (
                  <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold tabular-nums">
                      {idx === 0 ? (
                        <span className="inline-flex items-center gap-1 text-yellow-500">
                          <Medal className="w-4 h-4" /> #1
                        </span>
                      ) : idx === 1 ? (
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Medal className="w-4 h-4" /> #2
                        </span>
                      ) : idx === 2 ? (
                        <span className="inline-flex items-center gap-1 text-amber-600">
                          <Medal className="w-4 h-4" /> #3
                        </span>
                      ) : (
                        <span className="text-slate-500">#{idx + 1}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{entry.avatar || '🎮'}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {entry.playerName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {entry.gameTitle}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-purple-600 dark:text-purple-400 text-sm tabular-nums">
                      {entry.score.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400 tabular-nums">
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Score Submit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Submit Your High Score
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {isSuccess ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white">Recorded!</h4>
                <p className="text-xs text-slate-400 mt-1">High score added to the Hall of Fame.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitScore} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Select Game
                  </label>
                  <select
                    value={submitGameId}
                    onChange={(e) => setSubmitGameId(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  >
                    {games.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Player Handle
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={20}
                    placeholder="e.g. PixelMaster"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Score
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={9999999}
                    placeholder="e.g. 84500"
                    value={scoreVal}
                    onChange={(e) => setScoreVal(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md"
                  >
                    Post Score
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
