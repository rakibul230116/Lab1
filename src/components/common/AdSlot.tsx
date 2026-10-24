import React from 'react';

/**
 * =========================================================================
 * PLAYHUB AD INTEGRATION SPECIFICATION & AD PROVIDER INSERTION POINT
 * =========================================================================
 * 
 * To connect a live ad network in production (e.g., Google AdSense, NitroPay, 
 * AdinPlay, or Venatus):
 * 
 * 1. Add your ad network client SDK script in `index.html` head:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 * 
 * 2. In this component, toggle `USE_REAL_ADS = true` and replace the placeholder
 *    markup below with your ad unit snippet:
 * 
 *    <ins className="adsbygoogle"
 *         style={{ display: 'inline-block', width: widthPx, height: heightPx }}
 *         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *         data-ad-slot="1234567890"></ins>
 * 
 * 3. Call `(window.adsbygoogle = window.adsbygoogle || []).push({});` inside useEffect.
 * =========================================================================
 */

export type AdSlotSize = '728x90' | '300x250' | '320x50' | 'native' | 'responsive';

interface AdSlotProps {
  size: AdSlotSize;
  className?: string;
  label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ size, className = '', label }) => {
  // Flag to activate production ad units once ad network keys are configured
  const USE_REAL_ADS = false;

  if (USE_REAL_ADS) {
    return (
      <div className={`ad-wrapper overflow-hidden flex justify-center items-center ${className}`}>
        {/* Production AdSense / AdinPlay ad unit will render here */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-SAMPLE_CLIENT"
          data-ad-slot="SAMPLE_SLOT"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Polished placeholder presentation
  if (size === '728x90') {
    return (
      <div className={`w-full max-w-[728px] mx-auto my-4 ${className}`}>
        <div className="relative h-[90px] w-full rounded-xl border border-dashed border-purple-500/30 dark:border-purple-400/20 bg-gradient-to-r from-purple-950/20 via-slate-900/40 to-indigo-950/20 dark:bg-slate-900/60 p-2 flex items-center justify-between shadow-sm overflow-hidden group">
          <div className="absolute top-1 right-2 text-[9px] uppercase tracking-wider text-slate-500 font-semibold select-none">
            {label || 'Advertisement (728×90)'}
          </div>
          <div className="flex items-center gap-4 pl-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
              ⚡
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                PlayHub Cloud Gaming Pass
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Unlock 240Hz zero-latency cloud streaming on any device
              </div>
            </div>
          </div>
          <div className="pr-3">
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition cursor-pointer">
              Try Free
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (size === '300x250') {
    return (
      <div className={`w-[300px] mx-auto my-3 ${className}`}>
        <div className="relative h-[250px] w-full rounded-2xl border border-dashed border-purple-500/30 dark:border-purple-400/20 bg-gradient-to-b from-purple-950/30 via-slate-900/60 to-slate-950/90 dark:bg-slate-900/80 p-4 flex flex-col justify-between shadow-md overflow-hidden">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-slate-500 font-semibold select-none">
            <span>Sponsored</span>
            <span>300×250</span>
          </div>
          <div className="my-auto text-center">
            <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
              🎮
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">
              Vortex Pro Mechanical Pad
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 px-2 leading-relaxed">
              Ultra-low 0.1ms magnetic switches crafted for competitive esports champions.
            </p>
          </div>
          <button className="w-full py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-95 transition shadow-sm">
            Learn More
          </button>
        </div>
      </div>
    );
  }

  if (size === 'native') {
    return (
      <div className={`rounded-2xl border border-dashed border-indigo-500/30 dark:border-indigo-400/20 bg-slate-100/80 dark:bg-slate-900/70 p-4 flex flex-col justify-between h-full min-h-[260px] shadow-sm ${className}`}>
        <div className="flex justify-between items-center text-[10px] uppercase font-semibold text-slate-400">
          <span>Featured Partner</span>
          <span>Ad</span>
        </div>
        <div className="my-3 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl">
            🏆
          </div>
          <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Tournament League 2026
          </h5>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compete in weekly HTML5 speedrun cups & win hardware prizes.
          </p>
        </div>
        <span className="text-center text-xs font-medium py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition cursor-pointer">
          Join Tournament
        </span>
      </div>
    );
  }

  // Generic responsive slot (e.g. on game page top or side)
  return (
    <div className={`w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 p-3 text-center text-xs text-slate-400 select-none ${className}`}>
      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
        {label || 'Advertisement Space'}
      </span>
      <span className="text-[11px] text-slate-400 dark:text-slate-500">
        Google AdSense / AdinPlay ad unit placeholder
      </span>
    </div>
  );
};
