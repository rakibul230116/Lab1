import React from 'react';
import { Link } from 'react-router-dom';
import { Puzzle, Swords, Gauge, Gamepad2, Compass, Brain } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/categories';
import { Game } from '../../types';

interface CategoryChipsProps {
  games: Game[];
}

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  Puzzle: <Puzzle className="w-5 h-5" />,
  Action: <Swords className="w-5 h-5" />,
  Racing: <Gauge className="w-5 h-5" />,
  Arcade: <Gamepad2 className="w-5 h-5" />,
  Adventure: <Compass className="w-5 h-5" />,
  'Brain Training': <Brain className="w-5 h-5" />,
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({ games }) => {
  return (
    <div className="w-full my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Browse by Category
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          6 Genres
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INITIAL_CATEGORIES.map((cat) => {
          const count = games.filter((g) => g.category.toLowerCase() === cat.name.toLowerCase()).length;
          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-200 transform hover:-translate-y-1 text-center"
            >
              {/* Icon Container with gradient fill */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-2.5 shadow-md shadow-purple-500/10 group-hover:scale-110 transition-transform`}
              >
                {CATEGORY_ICON_MAP[cat.name] || <Gamepad2 className="w-5 h-5" />}
              </div>

              <span className="font-display text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-400 transition-colors">
                {cat.name}
              </span>

              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums">
                {count} {count === 1 ? 'game' : 'games'}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
