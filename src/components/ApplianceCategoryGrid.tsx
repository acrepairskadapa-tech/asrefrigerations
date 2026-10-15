import React from 'react';
import { Wind, Refrigerator, Waves, Zap, Building2, ChevronRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { ServiceItem } from '../data/servicesData';

interface ApplianceCategoryGridProps {
  lang: Language;
  selectedCategory: ServiceItem['category'];
  onSelectCategory: (cat: ServiceItem['category']) => void;
}

export const ApplianceCategoryGrid: React.FC<ApplianceCategoryGridProps> = ({
  lang,
  selectedCategory,
  onSelectCategory
}) => {
  const t = TRANSLATIONS[lang];

  const categories = [
    {
      id: 'ac' as ServiceItem['category'],
      name: t.categoryAc,
      icon: Wind,
      badge: 'Peak Season Demand',
      startPrice: '₹550',
      popular: true,
      desc: 'Jet wash, foam clean, R32/R410A/R22 gas refill, copper piping & mounting.'
    },
    {
      id: 'fridge' as ServiceItem['category'],
      name: t.categoryFridge,
      icon: Refrigerator,
      badge: 'Master Specialists',
      startPrice: '₹350',
      desc: 'Single door, double door frost-free, inverter compressors & deep freezers.'
    },
    {
      id: 'washing_machine' as ServiceItem['category'],
      name: t.categoryWm,
      icon: Waves,
      badge: 'Doorstep Fix',
      startPrice: '₹350',
      desc: 'Top load, front load, semi-automatic motor, drum alignment & PCB board repair.'
    },
    {
      id: 'electrical' as ServiceItem['category'],
      name: t.categoryElectrical,
      icon: Zap,
      badge: 'Certified Mechanics',
      startPrice: '₹300',
      desc: 'Geysers, microwave ovens, ceiling fans, inverter wiring & switchboard fixes.'
    },
    {
      id: 'amc' as ServiceItem['category'],
      name: t.categoryAmc,
      icon: Building2,
      badge: 'Commercial & Homes',
      startPrice: '₹1,999/yr',
      desc: 'Annual maintenance packages for Kadapa residences, showrooms & hospital clinics.'
    }
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/80 w-full max-w-full overflow-hidden" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-red-700 bg-red-50 px-3.5 py-1 rounded-full border border-red-200/80">
            Comprehensive Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            {t.categoriesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.categoriesSub}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative text-left p-3.5 sm:p-5 rounded-2xl sm:rounded-[26px] border transition-all duration-200 flex flex-col justify-between cursor-pointer ios-tap ${
                  isSelected
                    ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/15'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                          : 'bg-slate-100 text-slate-700 border border-slate-200/60 group-hover:bg-red-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium">From </span>
                    <span className="font-black text-red-600 text-sm">{cat.startPrice}</span>
                  </div>

                  <div className="flex items-center text-xs font-bold text-slate-700 group-hover:text-red-600 transition">
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
