import React from 'react';
import { FileText } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="Terms of Service – PlayHub Games"
        description="Review PlayHub's Terms of Service regarding game copyright, fair play rules, user high scores, and disclaimer of warranties."
      />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Rules of the Platform</span>
        </div>
        <h1 className="font-display text-3xl font-black text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 mt-1">Last updated: March 2026</p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or playing games on PlayHub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            2. Intellectual Property & Game Licenses
          </h2>
          <p>
            All game titles, trademarks, and embedded HTML5 assets remain the intellectual property of their respective creators and licensors. PlayHub embeds and hosts games pursuant to authorized licenses, distribution agreements, or open developer submissions. If you believe your copyrighted work appears on PlayHub without authorization, please contact us at <strong>dmca@playhubgames.com</strong> for expedited review and removal.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            3. Fair Play & Leaderboard Integrity
          </h2>
          <p>
            PlayHub strives to maintain fun, legitimate global competition. You agree not to submit fraudulent high scores, reverse engineer scoring payloads, or deploy automated bots to tamper with the rankings. We reserve the right to remove suspicious records at our discretion.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            4. Disclaimer & Limitation of Liability
          </h2>
          <p>
            PlayHub and all included games are provided on an "as is" and "as available" basis without warranties of any kind. We make no warranty that our service will be uninterrupted, bug-free, or compatible with obsolete browsers.
          </p>
        </section>
      </div>
    </div>
  );
};
