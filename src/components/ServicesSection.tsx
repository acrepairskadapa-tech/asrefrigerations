import React, { useState } from 'react';
import { 
  Wind, 
  Refrigerator, 
  Waves, 
  Zap, 
  Building2, 
  Check, 
  Clock, 
  ArrowRight, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Language } from '../data/translations';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';
import { CityId, CITIES_DATA } from '../data/citiesData';

interface ServicesSectionProps {
  lang: Language;
  selectedCity?: CityId;
  activeCategory: ServiceItem['category'] | 'all';
  onSelectCategory: (cat: ServiceItem['category'] | 'all') => void;
  onBookService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  selectedCity = 'kadapa',
  activeCategory,
  onSelectCategory,
  onBookService
}) => {
  const cityConfig = CITIES_DATA[selectedCity];
  const [filter, setFilter] = useState<ServiceItem['category'] | 'all'>(activeCategory);

  const handleFilterChange = (cat: ServiceItem['category'] | 'all') => {
    setFilter(cat);
    onSelectCategory(cat);
  };

  const filteredServices = filter === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter((s) => s.category === filter);

  return (
    <section className="py-16 bg-white w-full max-w-full overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-red-700 bg-red-50 px-3.5 py-1 rounded-full border border-red-200/80">
              Complete Service Catalogue
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Doorstep Services & Transparent Pricing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Fixed rates across all areas in Kadapa. Genuine spare parts & 30-day warranty included.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'ac', label: '❄️ AC' },
              { id: 'fridge', label: '🧊 Refrigerator' },
              { id: 'washing_machine', label: '🧺 Washing Machine' },
              { id: 'electrical', label: '⚡ Electrical' },
              { id: 'amc', label: '🏢 AMC' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id as ServiceItem['category'] | 'all')}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer ios-tap ${
                  filter === tab.id
                    ? 'bg-red-600 text-white shadow-md font-black'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Spotlight: The AS High-Pressure Jet Wash Difference */}
        <div className="mb-12 bg-slate-950 text-white rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden">
              <img
                src="/ac-jet-wash-illustration.jpg"
                alt="High Pressure Jet Pump AC Cleaning with Waterproof Bag"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                Master Servicing Standard
              </div>
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 text-left space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-red-400">
                Why Kadapa Chooses AS Jet Wash
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                The High-Pressure Foam Jet Difference (2x Cooler Airflow)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Ordinary local mechanics only wipe the outer grill with a cloth. We mount a waterproof jacket bag, spray active antibacterial foam, and blast cooling fins with high-pressure water jets to flush out 100% of accumulated dust and bacteria.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="text-emerald-400 font-bold">✓ 0 Wall Water Stains</div>
                  <div className="text-[10px] text-slate-400">Full protective bag cover</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="text-amber-400 font-bold">✓ 25% Power Savings</div>
                  <div className="text-[10px] text-slate-400">Unchoked condenser fins</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative bg-white rounded-[28px] border transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:shadow-xl ${
                service.popular
                  ? 'border-slate-300 ring-1 ring-slate-300 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {service.popular && (
                <div className="bg-red-600 text-white text-[11px] font-black uppercase tracking-wider py-1 px-4 text-center flex items-center justify-center gap-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular in Kadapa</span>
                </div>
              )}

              <div className="p-6 text-left flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                    {service.category === 'ac' ? 'Air Conditioner' : service.category === 'fridge' ? 'Refrigerator' : service.category === 'washing_machine' ? 'Washing Machine' : service.category === 'electrical' ? 'Electrical' : 'Annual AMC'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Features checklist */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Price and Action */}
              <div className="p-6 pt-0 bg-transparent">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Rate</div>
                    <div className="text-2xl font-black text-slate-900 flex items-baseline">
                      <span className="text-red-600">₹{service.price}</span>
                      {service.category === 'amc' && <span className="text-xs text-slate-500 font-semibold ml-1">/year</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/${cityConfig.phoneRaw}?text=${encodeURIComponent(`Hi AS Refrigeration ${cityConfig.name}, I am interested in ${service.name} (₹${service.price}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition ios-tap"
                      title="Quick Inquiry on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => onBookService(service)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs shadow-md transition cursor-pointer ios-tap"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
