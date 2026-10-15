import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/servicesData';
import { Language, TRANSLATIONS } from '../data/translations';

interface GoogleReviewsProps {
  lang: Language;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeFilter, setActiveFilter] = useState<'all' | 'AC' | 'Fridge' | 'Washing Machine'>('all');

  const filteredReviews = activeFilter === 'all'
    ? GOOGLE_REVIEWS
    : GOOGLE_REVIEWS.filter((r) => r.service.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className="py-16 bg-white border-b border-slate-200 w-full max-w-full overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Scorecard */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Genuine Verified Google Reviews
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.reviewsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Read what your neighbours across Kadapa have to say about our punctuality and repair quality.
            </p>
          </div>

          {/* Google Official Rating Badge */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-xl text-blue-600 shadow-xs">
              G
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-slate-900">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                Based on <span className="font-bold text-slate-900">928+ Google Reviews</span> in Kadapa
              </div>
            </div>
            <a
              href="https://www.reviewsmart.online/r/as-refrigeration"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition"
            >
              <span>View GMB Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {(['all', 'AC', 'Fridge', 'Washing Machine'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ios-tap ${
                activeFilter === cat
                  ? 'bg-slate-900 text-white shadow-md font-black'
                  : 'bg-white/80 text-slate-700 border border-slate-200/80 hover:bg-white'
              }`}
            >
              <span>{cat === 'all' ? '🌟 All Verified Reviews (928+)' : cat === 'AC' ? '❄️ AC Services' : cat === 'Fridge' ? '🧊 Refrigerator' : '🧺 Washing Machine'}</span>
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-[28px] bg-slate-50 border border-slate-200/90 shadow-xs flex flex-col justify-between text-left hover:shadow-lg transition-all duration-300 ios-tap hover:border-slate-300 hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/60">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Google Review
                  </span>
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{rev.name}</div>
                  <div className="text-xs text-slate-500">{rev.location}</div>
                </div>
                <div className="text-[11px] font-bold text-slate-600 px-2.5 py-1 bg-white rounded-full border border-slate-200 shadow-2xs">
                  {rev.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to write review */}
        <div className="mt-10 p-6 sm:p-7 rounded-[28px] bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-black text-base text-white">Recently had your AC or Refrigerator serviced by AS Refrigerations?</h4>
            <p className="text-xs text-slate-300 mt-1 font-medium">Share your feedback on Google and get a flat 10% discount on your next filter wash!</p>
          </div>
          <a
            href="https://www.reviewsmart.online/r/as-refrigeration"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition text-center shadow-md ios-tap shrink-0"
          >
            Leave a Google Review (928+ Total)
          </a>
        </div>

      </div>
    </section>
  );
};
