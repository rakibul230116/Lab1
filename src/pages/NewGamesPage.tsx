import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowUpDown } from 'lucide-react';
import { gamesService } from '../services/gamesService';
import { GameCard } from '../components/home/GameCard';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';

export const NewGamesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allGames = useMemo(() => gamesService.getGames(), []);

  const newGames = useMemo(() => {
    let list = allGames.filter((g) => g.isNew);
    if (list.length === 0) list = allGames.slice(0, 8); // fallback
    if (selectedCategory !== 'all') {
      list = list.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    return list;
  }, [allGames, selectedCategory]);

  const categories = Array.from(new Set(allGames.map((g) => g.category)));

  return (
    <div className="w-full">
      <SEO
        title="New HTML5 Games – Latest Free Releases"
        description="Play the freshest online HTML5 games added this week on PlayHub. Free instant games with zero downloads!"
      />

      <div className="w-full flex justify-center px-4 pt-3">
        <AdSlot size="728x90" label="Sponsor (728×90)" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              New Game Releases
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              The latest games published to PlayHub, freshly tuned and verified for all browsers.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            All Genres
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {newGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};
