import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Star,
  Flame,
  Sparkles,
  Lock,
  LogOut,
  RotateCcw,
  Check,
  Search,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Game, Category } from '../types';
import { gamesService } from '../services/gamesService';
import { SEO } from '../components/common/SEO';

/**
 * =========================================================================
 * SECURITY & AUTHENTICATION NOTE FOR PRODUCTION:
 * 
 * For development & client review, this panel uses a demo password.
 * IN PRODUCTION: Replace this client-side credential check with real,
 * server-side authentication (e.g. Firebase Auth, Supabase Auth, NextAuth,
 * or OAuth2 JWT validation with an express /api/admin session cookie).
 * =========================================================================
 */
const DEMO_ADMIN_PASSWORD = 'admin';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('playhub_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Games & Categories Data
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals & Forms
  const [showGameModal, setShowGameModal] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Arcade',
    description: '',
    thumbnail: '',
    embedUrl: '',
    instructions: '',
    isFeatured: false,
    isPopular: false,
    isNew: false,
    developer: '',
    tags: 'Arcade, Free, Action',
  });

  // Category Manager Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const refreshData = () => {
    setGames(gamesService.getGames());
    setCategories(gamesService.getCategories());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DEMO_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('playhub_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect admin password. (Hint: demo password is "admin")');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('playhub_admin_auth');
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (newTitle: string) => {
    const autoSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      // only auto-update slug if it was empty or matched previous auto-generated slug
      slug: editingGame ? prev.slug : autoSlug,
    }));
  };

  const handleOpenAddModal = () => {
    setEditingGame(null);
    setFormData({
      title: '',
      slug: '',
      category: categories[0]?.name || 'Arcade',
      description: '',
      thumbnail: '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
      embedUrl: 'internal://galaxy-runner',
      instructions: 'Use Arrow Keys / Touch to steer and play.',
      isFeatured: false,
      isPopular: false,
      isNew: true,
      developer: 'Indie Creator',
      tags: 'Arcade, Web, Fast',
    });
    setShowGameModal(true);
  };

  const handleOpenEditModal = (game: Game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      slug: game.slug,
      category: game.category,
      description: game.description,
      thumbnail: game.thumbnail,
      embedUrl: game.embedUrl,
      instructions: game.instructions || '',
      isFeatured: game.isFeatured,
      isPopular: game.isPopular,
      isNew: game.isNew,
      developer: game.developer || '',
      tags: game.tags ? game.tags.join(', ') : '',
    });
    setShowGameModal(true);
  };

  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingGame) {
      gamesService.updateGame(editingGame.id, {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        description: formData.description,
        thumbnail: formData.thumbnail,
        embedUrl: formData.embedUrl,
        instructions: formData.instructions,
        isFeatured: formData.isFeatured,
        isPopular: formData.isPopular,
        isNew: formData.isNew,
        developer: formData.developer,
        tags: tagArray,
      });
    } else {
      gamesService.createGame({
        title: formData.title,
        slug: formData.slug || `game-${Date.now()}`,
        category: formData.category,
        description: formData.description,
        thumbnail: formData.thumbnail || '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
        embedUrl: formData.embedUrl || 'internal://galaxy-runner',
        instructions: formData.instructions,
        isFeatured: formData.isFeatured,
        isPopular: formData.isPopular,
        isNew: formData.isNew,
        rating: 5.0,
        ratingCount: 1,
        plays: 0,
        developer: formData.developer,
        tags: tagArray,
      });
    }

    setShowGameModal(false);
    refreshData();
  };

  const handleDeleteGame = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"? This cannot be undone.`)) {
      gamesService.deleteGame(id);
      refreshData();
    }
  };

  const handleToggleBadge = (id: string, field: 'isFeatured' | 'isPopular' | 'isNew') => {
    const game = games.find((g) => g.id === id);
    if (!game) return;
    gamesService.updateGame(id, { [field]: !game[field] });
    refreshData();
  };

  const handleMoveGame = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= games.length) return;

    const newOrder = [...games];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    gamesService.reorderGames(newOrder.map((g) => g.id));
    refreshData();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const catSlug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    gamesService.addCategory({
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      slug: catSlug,
      icon: 'Gamepad2',
      description: `Collection of exciting ${newCategoryName.trim()} games on PlayHub.`,
      color: 'from-purple-500 to-indigo-600',
      accentBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    });
    setNewCategoryName('');
    refreshData();
  };

  const handleDeleteCategory = (catId: string, name: string) => {
    if (window.confirm(`Delete category "${name}"? Existing games in this category will keep their text.`)) {
      gamesService.deleteCategory(catId);
      refreshData();
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all games and categories back to factory seed defaults? Any custom added games will be erased.')) {
      gamesService.resetToDefaults();
      refreshData();
    }
  };

  // Filtered games
  const filteredGames = games.filter((g) => {
    const matchesQuery =
      !searchFilter.trim() ||
      g.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || g.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <SEO title="Admin Login – PlayHub" />
        <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-2xl text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-600/10 text-purple-500 flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white">
            PlayHub Studio Admin
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
            Enter administrator password to access the content management system.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (hint: admin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {authError && <p className="text-xs text-rose-500">{authError}</p>}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-[11px] text-slate-400 mt-6">
            Demo credentials: Password is <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-purple-400">admin</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO title="Admin Management Console – PlayHub" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white">
              PlayHub Content Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your game catalogue, feature slots, categories, and HTML5 embeds without code changes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Manage Categories</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 text-slate-600 dark:text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Reset to initial 18 seed games"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Game</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-400 transition"
            title="Log out of admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Counter Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Games</span>
          <div className="text-2xl font-black font-display text-slate-900 dark:text-white mt-1 tabular-nums">
            {games.length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Featured Slots</span>
          <div className="text-2xl font-black font-display text-purple-400 mt-1 tabular-nums">
            {games.filter((g) => g.isFeatured).length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Popular Active</span>
          <div className="text-2xl font-black font-display text-rose-400 mt-1 tabular-nums">
            {games.filter((g) => g.isPopular).length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">New Releases</span>
          <div className="text-2xl font-black font-display text-amber-400 mt-1 tabular-nums">
            {games.filter((g) => g.isNew).length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search games by title or slug..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Genre:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Genres</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Games Management Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3 text-center">Order</th>
                <th className="py-3 px-4">Game</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-center">Featured</th>
                <th className="py-3 px-3 text-center">Popular</th>
                <th className="py-3 px-3 text-center">New</th>
                <th className="py-3 px-3 text-right">Plays</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredGames.map((game, idx) => (
                <tr key={game.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  {/* Reorder Buttons */}
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleMoveGame(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded text-slate-400 hover:text-purple-400 disabled:opacity-20"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveGame(idx, 'down')}
                        disabled={idx === games.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-purple-400 disabled:opacity-20"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Title & Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={game.thumbnail}
                        alt=""
                        className="w-12 h-8 rounded-lg object-cover bg-slate-800 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{game.title}</span>
                          <a
                            href={`/game/${game.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-purple-400"
                            title="Preview game page"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          /game/{game.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {game.category}
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleToggleBadge(game.id, 'isFeatured')}
                      className={`p-1.5 rounded-lg transition ${
                        game.isFeatured
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Toggle Featured in Hero Carousel"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </td>

                  {/* Popular Toggle */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleToggleBadge(game.id, 'isPopular')}
                      className={`p-1.5 rounded-lg transition ${
                        game.isPopular
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Toggle Popular Section"
                    >
                      <Flame className="w-3.5 h-3.5" />
                    </button>
                  </td>

                  {/* New Toggle */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleToggleBadge(game.id, 'isNew')}
                      className={`p-1.5 rounded-lg transition ${
                        game.isNew
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Toggle New Badge"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </td>

                  {/* Plays */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                    {game.plays.toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(game)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-600 dark:text-slate-300 transition"
                        title="Edit Game"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game.id, game.title)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 transition"
                        title="Delete Game"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Game Modal Form */}
      {showGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
          <div className="w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {editingGame ? `Edit: ${editingGame.title}` : 'Add New Game'}
              </h3>
              <button
                onClick={() => setShowGameModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGame} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Game Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyber Rush 3D"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL Slug * (auto-generated)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. cyber-rush-3d"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category Genre *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Developer Studio
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nexus Studios"
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Engaging summary shown on game cards..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Thumbnail Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/src/assets/images/... or https://"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    HTML5 Embed URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="internal://galaxy-runner or https://..."
                    value={formData.embedUrl}
                    onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Use licensed embed or internal://&lt;slug&gt; for built-in canvas.
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  How to Play Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Instructions for controls and objectives..."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Arcade, Space, Fast, 2D"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Featured Hero Carousel
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Popular Games Section
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    New Release Badge
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowGameModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md transition"
                >
                  {editingGame ? 'Save Changes' : 'Create Game'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Manager Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Manage Categories
              </h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Existing Categories List */}
            <div className="space-y-2 mb-6 max-h-56 overflow-y-auto">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{c.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2 font-mono">({c.slug})</span>
                  </div>
                  {categories.length > 2 && (
                    <button
                      onClick={() => handleDeleteCategory(c.id, c.name)}
                      className="text-slate-400 hover:text-rose-500"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="flex gap-2 text-xs">
              <input
                type="text"
                required
                placeholder="New category name (e.g. Sports)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
