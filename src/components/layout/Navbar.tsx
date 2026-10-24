import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  Trophy,
  Crown,
  ShieldAlert,
  Puzzle,
  Swords,
  Gauge,
  Compass,
  Brain
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { INITIAL_CATEGORIES } from '../../data/categories';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Puzzle: <Puzzle className="w-4 h-4 text-purple-400" />,
  Action: <Swords className="w-4 h-4 text-red-400" />,
  Racing: <Gauge className="w-4 h-4 text-orange-400" />,
  Arcade: <Gamepad2 className="w-4 h-4 text-cyan-400" />,
  Adventure: <Compass className="w-4 h-4 text-emerald-400" />,
  'Brain Training': <Brain className="w-4 h-4 text-indigo-400" />,
};

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/85 dark:bg-slate-950/85 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-2xl font-black tracking-tight text-white whitespace-nowrap shrink-0 group"
          aria-label="PlayHub Homepage"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            PlayHub
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`whitespace-nowrap transition-colors hover:text-purple-400 ${
              isActive('/') ? 'text-purple-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Home
          </Link>

          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCategoriesOpen((prev) => !prev)}
              className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-purple-400 text-slate-300 py-1"
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180 text-purple-400' : ''
                }`}
              />
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 px-3 py-1">
                  Game Genres
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {INITIAL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-800/80">
                        {CATEGORY_ICONS[cat.name] || <Gamepad2 className="w-4 h-4 text-purple-400" />}
                      </div>
                      <div>
                        <div className="font-semibold">{cat.name}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                          {cat.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/new"
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-purple-400 ${
              isActive('/new') ? 'text-purple-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>New Games</span>
          </Link>

          <Link
            to="/popular"
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-purple-400 ${
              isActive('/popular') ? 'text-purple-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Popular</span>
          </Link>

          <Link
            to="/leaderboard"
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-purple-400 ${
              isActive('/leaderboard') ? 'text-purple-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>Leaderboard</span>
          </Link>

          <Link
            to="/premium"
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-purple-400 ${
              isActive('/premium') ? 'text-purple-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-purple-400" />
            <span>Go Ad-Free</span>
          </Link>
        </nav>

        {/* Zone 3: Search, Controls & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Search bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 1,000+ games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-60 pl-9 pr-3 py-1.5 text-xs rounded-full bg-slate-800/80 text-white placeholder-slate-400 border border-slate-700/60 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </form>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-400" />
            )}
          </button>

          {/* Admin link */}
          <Link
            to="/admin"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition"
            title="Admin Dashboard"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Admin</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-purple-500"
            />
          </form>

          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-purple-400"
            >
              Home
            </Link>
            <Link
              to="/new"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-purple-400"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>New Games</span>
            </Link>
            <Link
              to="/popular"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-purple-400"
            >
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Popular Games</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-purple-400"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/premium"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-purple-400"
            >
              <Crown className="w-4 h-4 text-purple-400" />
              <span>Go Ad-Free (VIP)</span>
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-purple-400"
            >
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>Admin Management</span>
            </Link>

            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {INITIAL_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    {CATEGORY_ICONS[cat.name] || <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />}
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
