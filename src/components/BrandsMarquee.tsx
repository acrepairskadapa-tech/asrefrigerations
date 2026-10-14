import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  DaikinLogo,
  VoltasLogo,
  LgLogo,
  SamsungLogo,
  BlueStarLogo,
  WhirlpoolLogo,
  BoschLogo,
  CarrierLogo,
  HitachiLogo,
  IfbLogo,
  HaierLogo,
  GodrejLogo,
  PanasonicLogo,
  LloydLogo,
  MitsubishiLogo,
  OGeneralLogo,
  SiemensLogo,
  LiebherrLogo,
} from './BrandLogos';

interface BrandCardItem {
  id: string;
  name: string;
  category: 'ac' | 'fridge' | 'washer' | 'multi';
  tagline: string;
  badge: string;
  renderLogo: () => React.ReactNode;
}

const ROW_ONE_BRANDS: BrandCardItem[] = [
  {
    id: 'daikin',
    name: 'DAIKIN',
    category: 'ac',
    tagline: 'Split, Cassette & Inverter ACs',
    badge: 'Japan Inverter OEM',
    renderLogo: () => <DaikinLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'voltas',
    name: 'VOLTAS',
    category: 'ac',
    tagline: 'All-Weather Split & Window ACs',
    badge: 'Tata Enterprise',
    renderLogo: () => <VoltasLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'lg',
    name: 'LG',
    category: 'multi',
    tagline: 'Dual Inverter ACs & Smart Fridges',
    badge: 'Dual Inverter PCB',
    renderLogo: () => <LgLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'samsung',
    name: 'SAMSUNG',
    category: 'multi',
    tagline: 'WindFree ACs & SpaceMax Fridges',
    badge: 'Digital Inverter OEM',
    renderLogo: () => <SamsungLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'bluestar',
    name: 'BLUE STAR',
    category: 'ac',
    tagline: 'Precision Inverter & Deep Freezers',
    badge: 'Tropical High-Ambient',
    renderLogo: () => <BlueStarLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'hitachi',
    name: 'HITACHI',
    category: 'ac',
    tagline: 'Kashikoi Tropical Inverters',
    badge: 'Expandable Inverter',
    renderLogo: () => <HitachiLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'carrier',
    name: 'CARRIER',
    category: 'ac',
    tagline: 'High-Ambient Split & Duct ACs',
    badge: 'Heavy-Duty Compressors',
    renderLogo: () => <CarrierLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'lloyd',
    name: 'LLOYD',
    category: 'ac',
    tagline: 'Havells Heavy Duty Split ACs',
    badge: 'Rapid 60s Cool',
    renderLogo: () => <LloydLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'ogeneral',
    name: 'O GENERAL',
    category: 'ac',
    tagline: 'Hyper Tropical Heavy ACs',
    badge: 'Extreme Climate Tech',
    renderLogo: () => <OGeneralLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'mitsubishi',
    name: 'MITSUBISHI ELECTRIC',
    category: 'ac',
    tagline: 'Quiet Tropical Heavy Inverter',
    badge: 'Precision Air Tech',
    renderLogo: () => <MitsubishiLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'panasonic',
    name: 'PANASONIC',
    category: 'multi',
    tagline: 'nanoe™X AI Inverter ACs',
    badge: 'Miraie AI Connected',
    renderLogo: () => <PanasonicLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'godrej',
    name: 'GODREJ',
    category: 'multi',
    tagline: '5-Star Green Inverter ACs',
    badge: 'Anti-Rust Coating',
    renderLogo: () => <GodrejLogo className="h-7 sm:h-8 w-auto object-contain" />,
  },
];

const ROW_TWO_BRANDS: BrandCardItem[] = [
  {
    id: 'whirlpool',
    name: 'WHIRLPOOL',
    category: 'multi',
    tagline: 'IntelliFresh Fridges & 6th Sense Washers',
    badge: 'Microblock Tech',
    renderLogo: () => <WhirlpoolLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'bosch',
    name: 'BOSCH',
    category: 'washer',
    tagline: 'Front Load Washers & Multi-Door Fridges',
    badge: 'German Engineering',
    renderLogo: () => <BoschLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'ifb',
    name: 'IFB',
    category: 'washer',
    tagline: 'Aqua Energie Washers & Dryers',
    badge: 'CradleWash Drum',
    renderLogo: () => <IfbLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'haier',
    name: 'HAIER',
    category: 'multi',
    tagline: 'Bottom Mount Fridges & Triple Inv. ACs',
    badge: 'Twin Inverter Tech',
    renderLogo: () => <HaierLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'siemens',
    name: 'SIEMENS',
    category: 'washer',
    tagline: 'iQ500 & iSensoric Front Loaders',
    badge: 'Precision German Care',
    renderLogo: () => <SiemensLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'liebherr',
    name: 'LIEBHERR',
    category: 'fridge',
    tagline: 'Precision DuoCooling German Fridges',
    badge: 'BioFresh German OEM',
    renderLogo: () => <LiebherrLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'samsung-washer',
    name: 'SAMSUNG ECOBUBBLE',
    category: 'washer',
    tagline: 'EcoBubble AI Direct Washers',
    badge: 'Hygiene Steam Wash',
    renderLogo: () => <SamsungLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'lg-dd',
    name: 'LG DIRECT DRIVE',
    category: 'washer',
    tagline: 'AI DD Front Load Washers & Dryers',
    badge: '6 Motion DirectDrive',
    renderLogo: () => <LgLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'godrej-fridge',
    name: 'GODREJ EDGE',
    category: 'fridge',
    tagline: 'Eon Inverter & Direct Cool Refrigerators',
    badge: 'Farm Fresh Tech',
    renderLogo: () => <GodrejLogo className="h-7 sm:h-8 w-auto object-contain" />,
  },
  {
    id: 'panasonic-fridge',
    name: 'PANASONIC PRIME',
    category: 'fridge',
    tagline: 'Prime Fresh Inverter Refrigerators',
    badge: 'Econavi Sensors',
    renderLogo: () => <PanasonicLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'voltas-commercial',
    name: 'VOLTAS BEKO',
    category: 'multi',
    tagline: 'ProSmart Inverter Washers & Fridges',
    badge: 'Dual Action Care',
    renderLogo: () => <VoltasLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
  {
    id: 'carrier-midea',
    name: 'CARRIER COMMERCIAL',
    category: 'ac',
    tagline: 'Ductable & Commercial Central ACs',
    badge: 'Commercial Chillers',
    renderLogo: () => <CarrierLogo className="h-6 sm:h-7 w-auto object-contain" />,
  },
];

interface BrandsMarqueeProps {
  onOpenBooking: () => void;
}

export const BrandsMarquee: React.FC<BrandsMarqueeProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ac' | 'fridge' | 'washer'>('all');

  const filterBrand = (brand: BrandCardItem) => {
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
          <span>OFFICIAL MULTI-BRAND SERVICE NETWORK</span>
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
            className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Brands (24+)
          </button>
          <button
            onClick={() => setActiveFilter('ac')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'ac'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            ❄️ Air Conditioners
          </button>
          <button
            onClick={() => setActiveFilter('fridge')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              activeFilter === 'fridge'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            🧊 Refrigerators
          </button>
          <button
            onClick={() => setActiveFilter('washer')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
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

        {/* Row 1: Flowing Left (ACs & Climate Control) */}
        <div className="flex animate-marquee-left gap-4 py-2 hover:[animation-play-state:paused]">
          {[...ROW_ONE_BRANDS, ...ROW_ONE_BRANDS].map((brand, idx) => {
            const isMatch = filterBrand(brand);
            return (
              <div
                key={`r1-${idx}`}
                className={`flex items-center gap-4 px-5 py-3 rounded-2xl border transition-all duration-300 shadow-xs group shrink-0 ${
                  isMatch
                    ? 'bg-white border-slate-200/90 hover:border-red-400 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-slate-50/60 border-slate-200/40 opacity-35 grayscale'
                }`}
              >
                {/* Official Brand Logo Box */}
                <div className="h-9 flex items-center justify-center shrink-0 min-w-[100px] max-w-[140px] px-1">
                  {brand.renderLogo()}
                </div>

                {/* Subtle Divider */}
                <div className="h-8 w-px bg-slate-200/80 shrink-0" />

                {/* Technical Specifications */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-red-50 group-hover:text-red-700 group-hover:border-red-200 transition">
                      {brand.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5 whitespace-nowrap">
                    {brand.tagline}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Flowing Right (Refrigerators & Washers) */}
        <div className="flex animate-marquee-right gap-4 py-2 mt-2 hover:[animation-play-state:paused]">
          {[...ROW_TWO_BRANDS, ...ROW_TWO_BRANDS].map((brand, idx) => {
            const isMatch = filterBrand(brand);
            return (
              <div
                key={`r2-${idx}`}
                className={`flex items-center gap-4 px-5 py-3 rounded-2xl border transition-all duration-300 shadow-xs group shrink-0 ${
                  isMatch
                    ? 'bg-white border-slate-200/90 hover:border-red-400 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-slate-50/60 border-slate-200/40 opacity-35 grayscale'
                }`}
              >
                {/* Official Brand Logo Box */}
                <div className="h-9 flex items-center justify-center shrink-0 min-w-[100px] max-w-[140px] px-1">
                  {brand.renderLogo()}
                </div>

                {/* Subtle Divider */}
                <div className="h-8 w-px bg-slate-200/80 shrink-0" />

                {/* Technical Specifications */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-red-50 group-hover:text-red-700 group-hover:border-red-200 transition">
                      {brand.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5 whitespace-nowrap">
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
