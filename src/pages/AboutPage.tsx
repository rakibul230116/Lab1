import React from 'react';
import { Gamepad2, Sparkles, Users, Globe, Code, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="About PlayHub – The Future of Browser Gaming"
        description="Learn about PlayHub's mission to make high-performance HTML5 browser games accessible to millions worldwide."
      />

      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Our Vision</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          About PlayHub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
          We believe gaming should be instantaneous, free, and accessible on every screen with zero downloads.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3">
            Instant Play, Anywhere
          </h2>
          <p className="mb-3">
            PlayHub was founded in 2026 with a simple mission: bring high-fidelity HTML5 and WebGL gaming directly into web browsers without requiring multi-gigabyte downloads, third-party launchers, or app store barriers.
          </p>
          <p>
            Whether you are on a high-end desktop gaming rig, a lightweight Chromebook, an iPad, or an Android phone, PlayHub's responsive canvas runtime adapts dynamically to provide 60 FPS performance, touch controls, and seamless gameplay.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Globe className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1">
              Global Access
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zero geo-restrictions. Anyone with a web browser can jump straight into the action in under 2 seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Users className="w-8 h-8 text-pink-500 mb-3" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1">
              Community Driven
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Compete on global high score boards, share speedrun replays, and earn podium trophies across all titles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Code className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1">
              Creator First
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We collaborate with indie HTML5 game creators and game jams to showcase original titles to millions of daily players.
            </p>
          </div>
        </div>

        {/* Developer Submission */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Are you an HTML5 Game Developer?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg">
              Submit your web game to PlayHub to reach our global community, get featured on the homepage carousel, and earn revenue share.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition whitespace-nowrap"
          >
            Submit Your Game
          </Link>
        </div>
      </div>
    </div>
  );
};
