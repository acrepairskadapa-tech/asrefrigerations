import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Wrench } from 'lucide-react';

interface BrandItem {
  name: string;
  category: 'ac' | 'fridge' | 'washer' | 'multi';
  tagline: string;
  accentColor: string;
  badge: string;
}

const ROW_ONE_BRANDS: BrandItem[] = [
  { name: 'DAIKIN', category: 'ac', tagline: 'Inverter & VRV Specialist', accentColor: '#0097E6', badge: 'Japan Inverter Tech' },
  { name: 'VOLTAS', category: 'ac', tagline: 'Split & Window ACs', accentColor: '#002B49', badge: 'Tata Enterprise' },
  { name: 'LG', category: 'multi', tagline: 'Dual Inverter & SmartCool', accentColor: '#A50034', badge: 'DirectDrive & Dual Inv.' },
  { name: 'SAMSUNG', category: 'multi', tagline: 'WindFree AC & SpaceMax', accentColor: '#1428A0', badge: 'Digital Inverter PCB' },
  { name: 'BLUE STAR', category: 'ac', tagline: 'Precision Inverter Cooling', accentColor: '#0054A6', badge: 'Tropical High-Ambient' },
  { name: 'HITACHI', category: 'ac', tagline: 'Tropical Kashikoi Inverters', accentColor: '#E60012', badge: 'Expandable Inverter' },
  { name: 'CARRIER', category: 'ac', tagline: 'Pioneer Cooling Solutions', accentColor: '#003366', badge: 'Heavy-Duty Compressors' },
  { name: 'LLOYD', category: 'ac', tagline: 'Havells Heavy Duty ACs', accentColor: '#D32F2F', badge: 'Rapid Cooling 60s' },
  { name: 'O GENERAL', category: 'ac', tagline: 'Extreme Climate Split ACs', accentColor: '#C41230', badge: 'Hyper Inverter OEM' },
  { name: 'MITSUBISHI', category: 'ac', tagline: 'Heavy Industries Inverter', accentColor: '#ED1B24', badge: 'Quiet Operation Tech' },
  { name: 'PANASONIC', category: 'multi', tagline: 'nanoe™X Smart Cooling', accentColor: '#004098', badge: 'Miraie AI Connected' },
  { name: 'GODREJ', category: 'multi', tagline: '5-Star Green Inverter ACs', accentColor: '#1E7E34', badge: 'Anti-Rust Coating' },
];

const ROW_TWO_BRANDS: BrandItem[] = [
  { name: 'WHIRLPOOL', category: 'multi', tagline: 'IntelliFresh & 6th Sense', accentColor: '#F58220', badge: 'Microblock Protection' },
  { name: 'BOSCH', category: 'washer', tagline: 'Front Load & Series 6', accentColor: '#EA1B23', badge: 'German Engineering' },
  { name: 'IFB', category: 'washer', tagline: 'Aqua Energie Washers', accentColor: '#003366', badge: 'CradleWash Drum' },
  { name: 'HAIER', category: 'multi', tagline: 'Bottom Mount & Inverter', accentColor: '#005AAA', badge: 'Twin Inverter Tech' },
  { name: 'VOLTAS BEKO', category: 'multi', tagline: 'ProSmart Inverter Washers', accentColor: '#003366', badge: 'Dual Action Hygiene' },
  { name: 'SIEMENS', category: 'washer', tagline: 'iQ500 & iSensoric Tech', accentColor: '#00646E', badge: 'Precision German Care' },
  { name: 'LIEBHERR', category: 'fridge', tagline: 'Precision DuoCooling', accentColor: '#003865', badge: 'BioFresh German OEM' },
  { name: 'KELVINATOR', category: 'fridge', tagline: 'Direct Cool & Double Door', accentColor: '#C8102E', badge: 'Tough Tropical Cool' },
  { name: 'TOSHIBA', category: 'multi', tagline: 'GreatWaves Inverter Washers', accentColor: '#E60012', badge: 'Ultra Fine Bubble' },
  { name: 'ONIDA', category: 'multi', tagline: 'HydroFall Washers & ACs', accentColor: '#E31B23', badge: 'Rapid Jet Cool' },
  { name: 'CROMPTON', category: 'multi', tagline: 'Smart Inverter Solutions', accentColor: '#0070BA', badge: 'High-Durability Spares' },
  { name: 'ELECTROLUX', category: 'multi', tagline: 'UltraMix Care Washers', accentColor: '#011E41', badge: 'Fabric Care Eco' },
];

interface BrandsMarqueeProps {
  onOpenBooking: () => void;
}

export const BrandsMarquee: React.FC<BrandsMarqueeProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ac' | 'fridge' | 'washer'>('all');

  const filterBrand = (brand: BrandItem) => {
    if (activeFilter === 'all') return true;
    if (brand.category === 'multi') return true;
    return brand.category === activeFilter;
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-y border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black tracking-wide shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SUPPORTED APPLIANCE BRANDS</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Certified Doorstep Service for <span className="text-red-600">25+ Major Brands</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
          From inverter PCB board repairs to genuine compressor gas charging, Sameer and his certified technicians service all Indian &amp; international makes with 100% genuine spares.
        </p>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Brands (24+)
          </button>
          <button
            onClick={() => setActiveFilter('ac')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'ac'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            ❄️ Air Conditioners
          </button>
          <button
            onClick={() => setActiveFilter('fridge')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'fridge'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            🧊 Refrigerators
          </button>
          <button
            onClick={() => setActiveFilter('washer')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'washer'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            🧺 Washing Machines
          </button>
        </div>
      </div>

      {/* Marquee Track with Left & Right Gradient Shadows */}
      <div className="relative w-full overflow-hidden marquee-container">
        {/* Left Edge Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        
        {/* Right Edge Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Row 1: Flowing Left */}
        <div className="flex animate-marquee-left gap-4 py-2 hover:[animation-play-state:paused]">
          {[...ROW_ONE_BRANDS, ...ROW_ONE_BRANDS].map((brand, idx) => {
            const isMatch = filterBrand(brand);
            return (
              <div
                key={`r1-${idx}`}
                className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl border transition-all duration-300 shadow-xs group shrink-0 ${
                  isMatch
                    ? 'bg-white border-slate-200/90 hover:border-red-400 hover:shadow-md hover:-translate-y-0.5'
                    : 'bg-slate-50/60 border-slate-200/40 opacity-40 grayscale'
                }`}
              >
                {/* Brand Visual Icon Block */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xs shrink-0 shadow-2xs"
                  style={{ backgroundColor: brand.accentColor }}
                >
                  {brand.name.slice(0, 2)}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm tracking-tight group-hover:text-red-600 transition">
                      {brand.name}
                    </span>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {brand.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    {brand.tagline}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Flowing Right */}
        <div className="flex animate-marquee-right gap-4 py-2 mt-2 hover:[animation-play-state:paused]">
          {[...ROW_TWO_BRANDS, ...ROW_TWO_BRANDS].map((brand, idx) => {
            const isMatch = filterBrand(brand);
            return (
              <div
                key={`r2-${idx}`}
                className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl border transition-all duration-300 shadow-xs group shrink-0 ${
                  isMatch
                    ? 'bg-white border-slate-200/90 hover:border-red-400 hover:shadow-md hover:-translate-y-0.5'
                    : 'bg-slate-50/60 border-slate-200/40 opacity-40 grayscale'
                }`}
              >
                {/* Brand Visual Icon Block */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xs shrink-0 shadow-2xs"
                  style={{ backgroundColor: brand.accentColor }}
                >
                  {brand.name.slice(0, 2)}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm tracking-tight group-hover:text-red-600 transition">
                      {brand.name}
                    </span>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {brand.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    {brand.tagline}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Guarantee Ribbon below Marquee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold shadow-lg">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine OEM Spares</span>
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Inverter PCB Board Diagnostics</span>
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-Day Workmanship Guarantee</span>
            </span>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition cursor-pointer active:scale-95 shadow-md shadow-red-600/30 whitespace-nowrap"
          >
            <span>Service My Appliance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
