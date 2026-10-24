import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Gamepad2 } from 'lucide-react';
import { gamesService } from '../services/gamesService';
import { INITIAL_CATEGORIES } from '../data/categories';
import { GameCard } from '../components/home/GameCard';
import { SEO } from '../components/common/SEO';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'popular' | 'rating'>('relevance');

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const allGames = useMemo(() => gamesService.getGames(), []);

  const searchResults = useMemo(() => {
    let list = [...allGames];

    // Filter by query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sort
    if (sortBy === 'popular') {
      list.sort((a, b) => b.plays - a.plays);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [allGames, query, selectedCategory, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={query ? `Search: "${query}" Games` : 'Search Free HTML5 Games'}
        description={`Search our entire library of free HTML5 arcade, action, and puzzle games on PlayHub.`}
      />

      {/* Search Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
          Find Games
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Search across 1,000+ free titles by game name, genre, or tag.
        </p>

        {/* Big Search Input */}
        <div className="relative mt-4 max-w-2xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Type a game title, e.g. 'Ninja', 'Racer', 'Space'..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 shadow-md transition"
          />
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            All Genres
          </button>
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="relevance">Relevance</option>
            <option value="popular">Most Played</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-400 mb-6">
        Found <strong className="text-purple-400 font-bold">{searchResults.length}</strong> {searchResults.length === 1 ? 'game' : 'games'}
        {query && <span> for "{query}"</span>}
      </div>

      {/* Results Grid */}
      {searchResults.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
            🔍
          </div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            No games found
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search terms or exploring popular genres below.
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setSearchParams({});
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
            >
              Reset Search
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchResults.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};
