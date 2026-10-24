import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Star,
  Maximize2,
  RotateCcw,
  Heart,
  Share2,
  Trophy,
  ArrowLeft,
  Check,
  Copy,
  Twitter,
  Flame,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';
import { Game, LeaderboardEntry } from '../types';
import { gamesService } from '../services/gamesService';
import { getInternalGameHtml } from '../data/playableGames';
import { AdSlot } from '../components/common/AdSlot';
import { GameCard } from '../components/home/GameCard';
import { SEO } from '../components/common/SEO';

export const GameDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  // Score Submission Modal
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [recentScores, setRecentScores] = useState<LeaderboardEntry[]>([]);

  // Share Modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const gameContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!slug) return;
    setIframeLoading(true);
    setScoreSubmitted(false);

    const loadedGame = gamesService.getGameBySlug(slug);
    if (loadedGame) {
      setGame(loadedGame);
      gamesService.incrementPlays(loadedGame.id);
      setIsLiked(gamesService.getLikedGameIds().includes(loadedGame.id));

      // Fetch related games in same category
      const allGames = gamesService.getGames();
      const related = allGames
        .filter((g) => g.category === loadedGame.category && g.id !== loadedGame.id)
        .slice(0, 4);
      setRelatedGames(related);

      // Fetch leaderboard for this game
      setRecentScores(gamesService.getLeaderboard(loadedGame.id, 5));
    } else {
      setGame(null);
    }
  }, [slug]);

  // Fullscreen toggle
  const handleFullscreen = () => {
    if (!gameContainerRef.current) return;
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen?.().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Reload Game
  const handleReload = () => {
    if (!iframeRef.current) return;
    setIframeLoading(true);
    const iframe = iframeRef.current;
    if (game?.embedUrl.startsWith('internal://')) {
      iframe.srcdoc = getInternalGameHtml(game.slug, game.title);
    } else if (game?.embedUrl) {
      iframe.src = game.embedUrl;
    }
    setTimeout(() => setIframeLoading(false), 500);
  };

  // Like Game
  const handleLike = () => {
    if (!game) return;
    const likedNow = gamesService.toggleLikeGame(game.id);
    setIsLiked(likedNow);
  };

  // Rate Game
  const handleRate = (ratingVal: number) => {
    if (!game) return;
    setUserRating(ratingVal);
    const res = gamesService.rateGame(game.id, ratingVal);
    if (res) {
      setGame({ ...game, rating: res.rating, ratingCount: res.ratingCount });
    }
  };

  // Submit Score
  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!game || !playerName.trim() || !scoreInput.trim()) return;

    const numScore = parseInt(scoreInput.replace(/\D/g, ''), 10);
    if (isNaN(numScore) || numScore <= 0) return;

    gamesService.submitScore({
      gameId: game.id,
      gameTitle: game.title,
      playerName: playerName.trim(),
      score: numScore,
    });

    setScoreSubmitted(true);
    setRecentScores(gamesService.getLeaderboard(game.id, 5));

    // Fire joyful celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    setTimeout(() => {
      setShowScoreModal(false);
      setScoreSubmitted(false);
      setScoreInput('');
    }, 2000);
  };

  // Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Game Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested game may have been unlisted or moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to PlayHub Games</span>
        </Link>
      </div>
    );
  }

  // Determine iframe source: internal HTML5 canvas game or external embed
  const isInternal = game.embedUrl.startsWith('internal://');
  const internalHtml = isInternal ? getInternalGameHtml(game.slug, game.title) : undefined;

  return (
    <div className="w-full">
      {/* Dynamic SEO Meta */}
      <SEO
        title={`Play ${game.title} Online for Free`}
        description={game.description}
        image={game.thumbnail}
        url={window.location.href}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'VideoGame',
          name: game.title,
          description: game.description,
          genre: game.category,
          gamePlatform: 'Web Browser',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: game.rating,
            ratingCount: game.ratingCount,
          },
        }}
      />

      {/* Top Banner AdSlot */}
      <div className="w-full flex justify-center px-4 pt-3">
        <AdSlot size="728x90" label="Top Game Sponsor (728×90)" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link to={`/category/${game.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-purple-400 transition">
            {game.category}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold">{game.title}</span>
        </div>

        {/* Layout: Main Game Theater + Side Ads / High Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Game Screen (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* 16:9 Playable Game Iframe Frame */}
            <div
              ref={gameContainerRef}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col"
            >
              {/* Loading State Spinner */}
              {iframeLoading && (
                <div className="absolute inset-0 bg-slate-950 z-20 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center animate-pulse mb-3">
                    <Gamepad2 className="w-6 h-6 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white">
                    Booting {game.title}...
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Initializing HTML5 web runtime</p>
                </div>
              )}

              {/* Sandboxed HTML5 Game Iframe */}
              <iframe
                ref={iframeRef}
                title={game.title}
                src={!isInternal ? game.embedUrl : undefined}
                srcDoc={internalHtml}
                onLoad={() => setIframeLoading(false)}
                className="w-full h-full border-0 bg-slate-950"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                allow="fullscreen; autoplay; gamepad"
                loading="eager"
              />

              {/* Game Screen Bottom HUD Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-3 sm:p-4 flex items-center justify-between pointer-events-auto z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white hidden sm:inline">
                    {game.title}
                  </span>
                  <span className="text-[11px] text-purple-400 hidden sm:inline">
                    · Free to Play
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReload}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 backdrop-blur-md transition"
                    title="Reload Game"
                    aria-label="Restart game engine"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition"
                    title="Fullscreen Mode"
                    aria-label="Enter fullscreen mode"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Game Meta & Action Bar */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white">
                    {game.title}
                  </h1>
                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">
                      {game.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500 tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{game.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({game.ratingCount} reviews)</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{game.plays.toLocaleString()} plays</span>
                  </div>
                </div>

                {/* Primary Interaction Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleLike}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
                      isLiked
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-500 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => setShowScoreModal(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Submit Score</span>
                  </button>
                </div>
              </div>

              {/* Star Rating Prompt */}
              <div className="flex items-center justify-between pt-3 text-xs">
                <span className="text-slate-500">Rate this game:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      className="p-1 text-slate-300 hover:text-amber-400 transition"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (userRating !== null && star <= userRating) || (userRating === null && star <= Math.round(game.rating))
                            ? 'fill-amber-400 text-amber-400'
                            : ''
                        }`}
                      />
                    </button>
                  ))}
                  {userRating && (
                    <span className="text-emerald-500 font-semibold ml-2">Thanks!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description & How to Play Section */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                About {game.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {game.description}
              </p>

              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                How to Play & Controls
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {game.instructions}
              </p>

              {game.controls && game.controls.length > 0 && (
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-500">
                      <tr>
                        <th className="py-2 px-3">Input Key / Gesture</th>
                        <th className="py-2 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {game.controls.map((ctrl, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="py-2 px-3 font-mono text-purple-600 dark:text-purple-400 font-bold">
                            {ctrl.key}
                          </td>
                          <td className="py-2 px-3 text-slate-700 dark:text-slate-300">
                            {ctrl.action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Developer note */}
              {game.developer && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                  Developed by <span className="font-semibold text-slate-300">{game.developer}</span>.
                </div>
              )}
            </div>

            {/* Related Games Grid */}
            {relatedGames.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4 text-purple-400" />
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Related {game.category} Games
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedGames.map((rel) => (
                    <GameCard key={rel.id} game={rel} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Game Page Sidebar (Ad + High Scores) */}
          <div className="flex flex-col gap-6">
            {/* 300x250 AdSlot beside game */}
            <div className="w-full flex justify-center">
              <AdSlot size="300x250" label="Sponsored Partner (300×250)" />
            </div>

            {/* Game Specific Top Scores */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {game.title} Records
                  </h3>
                </div>
                <button
                  onClick={() => setShowScoreModal(true)}
                  className="text-xs font-semibold text-purple-500 hover:text-purple-400"
                >
                  + Add
                </button>
              </div>

              {recentScores.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  <p>No high scores recorded yet.</p>
                  <button
                    onClick={() => setShowScoreModal(true)}
                    className="mt-2 text-purple-500 font-semibold"
                  >
                    Be the first champion!
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {recentScores.map((score, i) => (
                    <div key={score.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold text-slate-400 w-4 tabular-nums">#{i + 1}</span>
                        <span className="text-sm">{score.avatar || '🎮'}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                          {score.playerName}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                        {score.score.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Tips Box */}
            <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                Pro Tip
              </div>
              <p>
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono">F</kbd> or click Fullscreen for an immersive zero-distraction gaming session.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Score Modal */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Submit High Score
                </h3>
              </div>
              <button
                onClick={() => setShowScoreModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {scoreSubmitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Score Recorded!
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  You've claimed your spot on the {game.title} leaderboard!
                </p>
              </div>
            ) : (
              <form onSubmit={handleScoreSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Player Handle
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={20}
                    placeholder="e.g. CyberViper99"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Game Score Achieved
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={9999999}
                    placeholder="e.g. 45200"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowScoreModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition"
                  >
                    Confirm & Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Share {game.title}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-600 hover:text-white transition"
              >
                <span className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  <span>Copy Game URL</span>
                </span>
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : null}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out ${game.title} on PlayHub! Play free HTML5 games right in your browser:`
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-sky-500 hover:text-white transition"
              >
                <Twitter className="w-4 h-4" />
                <span>Share to X / Twitter</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
