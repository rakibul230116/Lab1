import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react';
import { Game } from '../../types';

interface HeroCarouselProps {
  featuredGames: Game[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ featuredGames }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback to top games if no featured ones
  const items = featuredGames.length > 0 ? featuredGames.slice(0, 4) : [];

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, isPaused]);

  if (items.length === 0) return null;

  const currentGame = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const formatPlays = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
    return count.toString();
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container */}
      <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full min-h-[360px] max-h-[520px] bg-slate-950 overflow-hidden">
        {items.map((game, idx) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-10000"
            />
            {/* Deep rich gradient scrim for maximum text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        ))}

        {/* Content Zone */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end sm:justify-center p-6 sm:p-10 lg:p-14 max-w-2xl">
          {/* Subtle Category Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
            <span className="flex items-center gap-1 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Featured Premiere
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{currentGame.category}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight line-clamp-2">
            {currentGame.title}
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 mt-2 sm:mt-3 mb-6 max-w-xl leading-relaxed">
            {currentGame.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/game/${currentGame.slug}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play Now</span>
            </Link>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{currentGame.rating.toFixed(1)}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="tabular-nums">{formatPlays(currentGame.plays)} players</span>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        {items.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous featured game"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-slate-700/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next featured game"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-slate-700/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Indicator Dots */}
        {items.length > 1 && (
          <div className="absolute bottom-4 right-6 z-30 flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'w-2 bg-slate-600/80 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
