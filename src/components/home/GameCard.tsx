import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Heart, Flame, Sparkles } from 'lucide-react';
import { Game } from '../../types';
import { gamesService } from '../../services/gamesService';

interface GameCardProps {
  game: Game;
  onLikeToggle?: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onLikeToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    return gamesService.getLikedGameIds().includes(game.id);
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const likedNow = gamesService.toggleLikeGame(game.id);
    setIsLiked(likedNow);
    if (onLikeToggle) onLikeToggle(game.id);
  };

  const formatPlays = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <Link
      to={`/game/${game.slug}`}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/40 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        )}

        {/* Fallback pattern if image fails */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900/60 to-slate-900 text-center">
            <span className="text-3xl mb-1">🎮</span>
            <span className="text-xs font-bold text-slate-200 line-clamp-1">{game.title}</span>
          </div>
        ) : (
          <img
            src={game.thumbnail}
            alt={`${game.title} thumbnail`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Subtle New or Hot corner mark */}
        {game.isNew && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 backdrop-blur-md px-2 py-0.5 rounded-md shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>NEW</span>
          </div>
        )}
        {game.isPopular && !game.isNew && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-bold text-rose-300 bg-rose-950/80 border border-rose-500/30 backdrop-blur-md px-2 py-0.5 rounded-md shadow-sm">
            <Flame className="w-3 h-3 text-rose-400" />
            <span>HOT</span>
          </div>
        )}

        {/* Quick Like Action */}
        <button
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike game' : 'Like game'}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-rose-500 transition shadow-sm z-10"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
            }`}
          />
        </button>

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-white" />
          </div>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-purple-500 transition-colors">
            {game.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 leading-normal">
            {game.description}
          </p>
        </div>

        {/* Zero-Pill Typography Metadata with subtle bullet separators */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {game.category}
          </span>
          <div className="flex items-center gap-1.5 tabular-nums">
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{game.rating.toFixed(1)}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>{formatPlays(game.plays)} plays</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
