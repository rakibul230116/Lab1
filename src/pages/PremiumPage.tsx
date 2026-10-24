import React, { useState } from 'react';
import { Crown, Check, Zap, Sparkles, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { gamesService } from '../services/gamesService';
import { SEO } from '../components/common/SEO';

export const PremiumPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const success = gamesService.addToWaitlist(email.trim(), plan);
    if (success) {
      setSubmitted(true);
      setErrorMsg('');
      setEmail('');
    } else {
      setErrorMsg('This email is already registered on our VIP waitlist!');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="PlayHub VIP – Go 100% Ad-Free Gaming"
        description="Experience PlayHub with zero interruptions. Enjoy ad-free games, early access beta builds, and VIP high score badges."
      />

      {/* Header Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Crown className="w-3.5 h-3.5" />
          <span>PlayHub VIP Membership</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Pure Gaming. <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Zero Ads.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Upgrade to PlayHub VIP for seamless, distraction-free HTML5 browser gaming with premium perks and priority indie game access.
        </p>
      </div>

      {/* Pricing Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
        {/* Free Plan */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Community
            </div>
            <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white mt-1">
              PlayHub Free
            </h2>
            <div className="flex items-baseline gap-1 mt-4 mb-6">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono">$0</span>
              <span className="text-xs text-slate-400">/ forever</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Access all 1,000+ free HTML5 titles</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Global leaderboard score submissions</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <span className="w-4 h-4 rounded-full border border-slate-400/30 flex items-center justify-center text-[10px]">·</span>
                <span>Includes banner and in-game sponsor ads</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <span className="w-full block py-2.5 text-center text-xs font-bold text-slate-400 rounded-xl bg-slate-100 dark:bg-slate-800">
              Current Active Tier
            </span>
          </div>
        </div>

        {/* VIP Ad-Free Plan */}
        <div className="relative rounded-3xl bg-gradient-to-b from-purple-900/40 via-slate-900 to-indigo-950/60 border-2 border-purple-500/50 p-8 flex flex-col justify-between shadow-xl overflow-hidden">
          {/* Subtle Corner Badge */}
          <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded-full">
            Coming Soon
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended</span>
            </div>
            <h2 className="font-display text-2xl font-black text-white mt-1">
              VIP Ad-Free Pass
            </h2>

            {/* Plan Selector */}
            <div className="flex items-center gap-2 mt-4 mb-2 p-1 rounded-xl bg-slate-800/80 w-fit">
              <button
                type="button"
                onClick={() => setPlan('yearly')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  plan === 'yearly' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                Annual ($19.99/yr) <span className="text-[10px] text-amber-300">Save 44%</span>
              </button>
              <button
                type="button"
                onClick={() => setPlan('monthly')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  plan === 'monthly' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                Monthly ($2.99/mo)
              </button>
            </div>

            <div className="flex items-baseline gap-1 mt-2 mb-6">
              <span className="text-4xl font-extrabold text-white font-mono">
                {plan === 'yearly' ? '$19.99' : '$2.99'}
              </span>
              <span className="text-xs text-slate-400">
                {plan === 'yearly' ? '/ year' : '/ month'}
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>100% Ad-Free:</strong> Zero banners, video popups, or sponsor breaks</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Early Access:</strong> Play fresh games 7 days before public release</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Golden Crown:</strong> Exclusive VIP badge on all leaderboard tables</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Cloud Saves:</strong> Sync your high scores and favorites across devices</span>
              </li>
            </ul>
          </div>

          {/* Waitlist Form Box */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">You're on the VIP Waitlist!</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">
                    We'll email you the moment VIP memberships unlock with a launch discount.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoinWaitlist} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs shadow-md transition whitespace-nowrap"
                  >
                    Join Waitlist
                  </button>
                </div>
                {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}
                <p className="text-[11px] text-slate-400">
                  No credit card required. Free 30-day trial upon launch.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">
            Fast Loading
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Eliminating third-party ad tags delivers 60% faster game load times and lower latency.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">
            Support Indie Devs
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            70% of VIP subscription revenue is directly shared with HTML5 creators and indie game studios.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">
            Privacy First
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Zero ad trackers, cookies, or telemetry scripts monitoring your play sessions.
          </p>
        </div>
      </div>
    </div>
  );
};
