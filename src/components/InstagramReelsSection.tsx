import React, { useState } from 'react';
import { ExternalLink, Play, Pause, Volume2, VolumeX, Sparkles, Heart, MessageCircle, Share2, ShieldCheck, Tag } from 'lucide-react';
import { INSTAGRAM_PROFILE } from '../data/servicesData';
import { Language } from '../data/translations';

interface InstagramReelsSectionProps {
  lang: Language;
  onApplyCoupon?: (code: string) => void;
}

export const InstagramReelsSection: React.FC<InstagramReelsSectionProps> = ({
  lang,
  onApplyCoupon
}) => {
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(INSTAGRAM_PROFILE.couponCode);
    setCopiedCoupon(true);
    if (onApplyCoupon) onApplyCoupon(INSTAGRAM_PROFILE.couponCode);
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  return (
    <section className="py-16 bg-[#0B0F19] text-white relative overflow-hidden" id="reels">
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Official Instagram Hub • @asrefrigerations.kadapa</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Watch Satisfying AC Repairs & Behind-the-Scenes
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            See real work videos from our Mariapuram workshop and doorstep service visits across Kadapa.
          </p>
        </div>

        {/* Viral Instagram Follow Incentive Box */}
        <div className="max-w-4xl mx-auto mb-12 bg-slate-900/90 border border-slate-800 rounded-[28px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider">
                🎁 Instant ₹100 Discount
              </span>
              <span className="text-xs text-slate-300 font-bold">Limited Summer Offer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Follow us on Instagram & Claim Flat ₹100 OFF!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              1. Tap Follow on <span className="font-bold text-white underline">@asrefrigerations.kadapa</span><br />
              2. Use coupon code <span className="font-mono font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-lg border border-slate-700">INSTA100</span> during booking or show your follow screen to technician.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleCopyCode}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer transition ios-tap"
            >
              <Tag className="w-4 h-4 text-amber-300" />
              <span>{copiedCoupon ? '✅ Code Copied!' : 'Copy Code: INSTA100'}</span>
            </button>

            <a
              href={INSTAGRAM_PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer ios-tap whitespace-nowrap"
            >
              <span>Follow on Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Video Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Reel 1: Workshop Video */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-slate-700 transition duration-300">
            <div className="relative aspect-[4/3] sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                src="/shop-video.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Inside Our Workshop</span>
              </div>
            </div>

            <div className="p-5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-red-400">@asrefrigerations.kadapa</span>
                <span className="text-[11px] text-slate-400">Mariapuram, Kadapa</span>
              </div>
              <h4 className="font-extrabold text-sm text-white">
                Inside AS Refrigeration's Main Workshop in Mariapuram
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Equipped with nitrogen pressure testing, digital vacuum gauges, and genuine spare parts inventory.
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={INSTAGRAM_PROFILE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-300 hover:text-white flex items-center gap-1 transition"
                >
                  <span>Watch more on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Reel 2: Founder Sameer Bhai */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-slate-700 transition">
            <div className="relative aspect-[4/3] sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                src="/sameer-video.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Master Shaik Sameer</span>
              </div>
            </div>

            <div className="p-5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-red-400">@asrefrigerations.kadapa</span>
                <span className="text-[11px] text-slate-400">10+ Years Experience</span>
              </div>
              <h4 className="font-extrabold text-sm text-white">
                Shaik Sameer & Kadapa Service Team in Action
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Catch our daily doorstep servicing tips, energy-saving AC settings, and genuine gas refill walkthroughs.
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={INSTAGRAM_PROFILE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-300 hover:text-white flex items-center gap-1 transition"
                >
                  <span>Follow & Watch Reels</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
