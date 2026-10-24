import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Heart, Twitter, Send, CheckCircle2 } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 font-display text-2xl font-black text-white group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PlayHub
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your premier web gaming portal. Discover thousands of free HTML5 arcade, puzzle, action, and racing games playable instantly on desktop, tablet, or mobile with zero installation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-purple-600 hover:text-white flex items-center justify-center text-slate-300 transition"
                aria-label="PlayHub Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-purple-600 hover:text-white flex items-center justify-center text-slate-300 transition"
                aria-label="PlayHub Discord Community"
              >
                <Gamepad2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Categories */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200 mb-4 font-display">
              Game Genres
            </h3>
            <ul className="space-y-2 text-sm">
              {INITIAL_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-purple-400 transition-colors inline-block"
                  >
                    {cat.name} Games
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform Navigation */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200 mb-4 font-display">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/new" className="hover:text-purple-400 transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/popular" className="hover:text-purple-400 transition-colors">
                  Popular Games
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-purple-400 transition-colors">
                  High Scores
                </Link>
              </li>
              <li>
                <Link to="/premium" className="hover:text-purple-400 transition-colors">
                  VIP Ad-Free
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-400 transition-colors">
                  About PlayHub
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Legal */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200 mb-4 font-display">
              Stay in the Loop
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive weekly drop alerts for featured indie titles and exclusive tournaments.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col space-y-1.5 text-xs">
              <Link to="/privacy" className="hover:text-purple-400 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-purple-400 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PlayHub. All rights reserved. Free browser games for everyone.</p>
          <div className="flex items-center gap-1">
            <span>Built with passion for web gaming</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 inline fill-pink-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
