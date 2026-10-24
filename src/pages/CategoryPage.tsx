import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpDown, Search, Gamepad2 } from 'lucide-react';
import { gamesService } from '../services/gamesService';
import { INITIAL_CATEGORIES } from '../data/categories';
import { GameCard } from '../components/home/GameCard';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';

type SortOption = 'popular' | 'newest' | 'az';

export const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const currentCategory = INITIAL_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === (name || '').toLowerCase()
  );

  const categoryName = currentCategory ? currentCategory.name : name || 'All';

  // Get all games in this category
  const allCategoryGames = useMemo(() => {
    const all = gamesService.getGames();
    return all.filter((g) => {
      if (!name) return true;
      const targetSlug = name.toLowerCase().replace(/\s+/g, '-');
      const gameCatSlug = g.category.toLowerCase().replace(/\s+/g, '-');
      return gameCatSlug === targetSlug || g.category.toLowerCase() === name.toLowerCase();
    });
  }, [name]);

  // Filter and sort
  const filteredAndSortedGames = useMemo(() => {
    let result = [...allCategoryGames];

    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => b.plays - a.plays);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [allCategoryGames, filterQuery, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedGames.length / itemsPerPage) || 1;
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedGames.slice(start, start + itemsPerPage);
  }, [filteredAndSortedGames, currentPage, itemsPerPage]);

  return (
    <div className="w-full">
      <SEO
        title={`Free ${categoryName} HTML5 Games`}
        description={
          currentCategory
            ? currentCategory.description
            : `Play top rated free online ${categoryName} games with no downloads on PlayHub.`
        }
      />

      {/* Top Banner AdSlot */}
      <div className="w-full flex justify-center px-4 pt-3">
        <AdSlot size="728x90" label={`Top ${categoryName} Sponsor (728×90)`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold">{categoryName}</span>
        </div>

        {/* Category Header Hero */}
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-indigo-950/40 border border-purple-500/20 p-6 sm:p-10 mb-8 overflow-hidden shadow-sm">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Genre Spotlight</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {categoryName} Games
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {currentCategory?.description ||
                `Browse our curated library of top-tier free online ${categoryName} games. Play directly in your browser with high scores and instant start.`}
            </p>
            <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
              <span className="tabular-nums font-bold text-purple-400">
                {allCategoryGames.length} Total Games Available
              </span>
            </div>
          </div>
        </div>

        {/* Controls Toolbar: Search & Sort Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Live Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${categoryName} titles...`}
              value={filterQuery}
              onChange={(e) => {
                setFilterQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 shadow-sm"
            />
          </div>

          {/* Segmented Sort Controls */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <div className="flex items-center gap-1 px-2 text-xs text-slate-400 font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sort:</span>
            </div>
            <button
              onClick={() => {
                setSortBy('popular');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                sortBy === 'popular'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Most Popular
            </button>
            <button
              onClick={() => {
                setSortBy('newest');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                sortBy === 'newest'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => {
                setSortBy('az');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                sortBy === 'az'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              A – Z
            </button>
          </div>
        </div>

        {/* Games Grid */}
        {filteredAndSortedGames.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-500 text-sm">
              No games found matching your search term "{filterQuery}".
            </p>
            <button
              onClick={() => setFilterQuery('')}
              className="mt-3 text-xs font-semibold text-purple-500 hover:underline"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500 transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs font-bold tabular-nums">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-xl transition ${
                    currentPage === i + 1
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500 transition shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
