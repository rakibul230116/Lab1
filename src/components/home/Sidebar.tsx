import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Crown, Check, Mail, CheckCircle2 } from 'lucide-react';
import { LeaderboardEntry } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { gamesService } from '../../services/gamesService';

interface SidebarProps {
  topPlayers: LeaderboardEntry[];
  onScoreSubmitted?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ topPlayers }) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim() || !waitlistEmail.includes('@')) {
      setWaitlistError('Please enter a valid email address.');
      return;
    }
    const success = gamesService.addToWaitlist(waitlistEmail.trim(), 'monthly');
    if (success) {
      setJoinedWaitlist(true);
      setWaitlistError('');
      setWaitlistEmail('');
    } else {
      setWaitlistError('You are already on the VIP waitlist!');
    }
  };

  return (
    <aside className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
      {/* 1. AdSlot 300x250 */}
      <div className="w-full flex justify-center">
        <AdSlot size="300x250" />
      </div>

      {/* 2. Mini Leaderboard: Top Players */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Top Players
            </h3>
          </div>
          <Link
            to="/leaderboard"
            className="text-xs font-semibold text-purple-500 hover:text-purple-400 transition"
          >
            View All
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {topPlayers.slice(0, 5).map((entry, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            return (
              <div key={entry.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-5 text-center font-bold tabular-nums shrink-0 ${
                      isFirst
                        ? 'text-yellow-400'
                        : isSecond
                        ? 'text-slate-300'
                        : isThird
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-base shrink-0">{entry.avatar || '🎮'}</span>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {entry.playerName}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {entry.gameTitle}
                    </div>
                  </div>
                </div>

                <div className="font-mono font-bold text-slate-700 dark:text-purple-300 tabular-nums shrink-0">
                  {entry.score.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Go Ad-Free / Premium Promo Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-purple-900/60 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-5 shadow-lg overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              VIP Membership
            </span>
            <h4 className="font-display font-bold text-sm text-white">
              Go 100% Ad-Free
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Level up your gaming experience with zero interruptions and exclusive perks.
        </p>

        <ul className="space-y-2 mb-4 text-xs text-slate-200">
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </div>
            <span>Completely ad-free gameplay</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </div>
            <span>Early access to new weekly releases</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </div>
            <span>Exclusive VIP badges on leaderboards</span>
          </li>
        </ul>

        {joinedWaitlist ? (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>You're on the VIP waitlist! We'll notify you first.</span>
          </div>
        ) : (
          <form onSubmit={handleWaitlistSubmit} className="space-y-2">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="email"
                placeholder="Enter your email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-purple-400"
              />
            </div>
            {waitlistError && (
              <p className="text-[11px] text-rose-400">{waitlistError}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md transition"
            >
              Join VIP Waitlist
            </button>
          </form>
        )}
      </div>
    </aside>
  );
};
