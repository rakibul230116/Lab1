import React from 'react';
import { Shield } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="Privacy Policy – PlayHub Games"
        description="Read PlayHub's privacy policy regarding data collection, cookies, analytics, and advertising disclosure."
      />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Trust</span>
        </div>
        <h1 className="font-display text-3xl font-black text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-1">Last updated: March 2026</p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            1. Information We Collect
          </h2>
          <p>
            PlayHub does not require an account or registration to play games. We do not collect names, home addresses, or government identification. When you submit a high score or join our VIP waitlist, we only store the handle or email address you voluntarily provide.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            2. Local Browser Storage (localStorage)
          </h2>
          <p>
            We use your browser's local storage (localStorage) exclusively to store your gameplay preferences, such as light/dark theme preference, game high scores, and liked games. This data resides on your personal device and is not transmitted to external commercial servers.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            3. Advertisements & Third-Party Cookies
          </h2>
          <p>
            To keep PlayHub 100% free for everyone, we display advertising provided by third-party ad networks (such as Google AdSense, AdinPlay, or NitroPay). These vendors may use cookies and web beacons to serve advertisements based on your prior visits to this or other websites. You may opt out of personalized advertising by visiting Google Ads Settings or www.aboutads.info.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            4. Children's Online Privacy (COPPA)
          </h2>
          <p>
            PlayHub is a family-friendly portal. We do not knowingly collect personal identifiable information from children under the age of 13. All HTML5 games listed on our platform are screened for age-appropriate visual content.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
            5. Contacting Our Data Protection Officer
          </h2>
          <p>
            If you have questions about this privacy statement or wish to request removal of an entered email from our waitlist, please email us at <strong>privacy@playhubgames.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
