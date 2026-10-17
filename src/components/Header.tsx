import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Menu, 
  X,
  MapPin,
  ChevronDown,
  Check,
  Smartphone,
  Star,
  ExternalLink,
  Wrench,
  Sparkles
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { CityId, CITIES_DATA } from '../data/citiesData';

interface HeaderProps {
  lang: Language;
  selectedCity: CityId;
  onSelectCity: (city: CityId) => void;
  onOpenBooking: () => void;
  onOpenQr: () => void;
  onOpenPortals: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  selectedCity,
  onSelectCity,
  onOpenBooking,
  onOpenQr,
  onOpenPortals
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const t = TRANSLATIONS[lang];
  const cityConfig = CITIES_DATA[selectedCity];

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/10 text-white shadow-xl transition-all">
      {/* 1. Slim Executive Top Announcement Bar */}
      <div className="bg-[#060911] text-slate-300 border-b border-white/5 text-[11px] font-medium py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Live Dispatch Announcement */}
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-semibold text-slate-200 tracking-wide truncate">
              {selectedCity === 'kadapa'
                ? '⚡ 100% Kadapa District Doorstep Service • Master Specialist Shaik Sameer'
                : '⚡ Bangalore Doorstep Service • Kammanahalli Branch Hub (Express 60-Min Dispatch)'}
            </span>
          </div>

          {/* Right Highlights & Direct Helpline */}
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-slate-400 text-xs">
            <a
              href="https://www.reviewsmart.online/r/as-refrigeration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
              title="928+ Verified Reviews"
            >
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-bold text-slate-200">4.9★</span>
              <span>(928+ Google Reviews)</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href="https://www.instagram.com/asrefrigerations.kadapa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 hover:text-red-400 transition"
            >
              <span>📸 Follow @asrefrigerations.kadapa</span>
            </a>

            <span className="hidden lg:inline text-white/20">|</span>

            <a
              href={`tel:${cityConfig.phone}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>24/7 Helpline: {cityConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Executive Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-6 w-full">
          
          {/* Left: Brand Identity & City Selector */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0">
              {/* Official Brand Logo */}
              <div className="h-9 sm:h-12 w-auto flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                <img
                  src="/as-logo.png"
                  alt="AS Refrigerations Official Logo"
                  className="h-9 sm:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(239,68,68,0.25)]"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left shrink-0">
                <div className="flex items-center">
                  <span className="text-base sm:text-2xl font-black tracking-tight text-white group-hover:text-red-400 transition flex items-center leading-none whitespace-nowrap">
                    AS <span className="text-red-500 ml-1">REFRIGERATIONS</span>
                  </span>
                </div>
                <span className="hidden sm:flex text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-wide mt-1 items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  {selectedCity === 'kadapa' 
                    ? "Kadapa's #1 Doorstep Service • Est. 2015" 
                    : "Bangalore Hub (Kammanahalli) • 60-Min Express"}
                </span>
              </div>
            </a>

            {/* City Hub Selector Dropdown */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition text-xs font-bold cursor-pointer group/btn"
                title="Switch active operating hub"
              >
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-extrabold text-white">{cityConfig.name}</span>
                <span className="text-[10px] text-slate-400">| 60-Min</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover/btn:text-white ${cityDropdownOpen ? 'rotate-180 text-red-400' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/80 p-2 z-50 text-left animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-black tracking-wider text-slate-400">Select Operating Hub</div>
                  
                  <button
                    onClick={() => {
                      onSelectCity('kadapa');
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                      selectedCity === 'kadapa' ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <span>Kadapa Flagship HQ</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-500 text-white font-bold">Fastest</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">Entire District • 100% Coverage</div>
                    </div>
                    {selectedCity === 'kadapa' && <Check className="w-4 h-4 text-red-400" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectCity('bangalore');
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition cursor-pointer mt-1 ${
                      selectedCity === 'bangalore' ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <span>Bangalore Branch Hub</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500 text-white font-bold">Express</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">Kammanahalli & Nearby Areas Only</div>
                    </div>
                    {selectedCity === 'bangalore' && <Check className="w-4 h-4 text-red-400" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center: Clean & Professional Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-300">
            <a 
              href="#services" 
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition"
            >
              Services
            </a>
            <a 
              href="#calculator" 
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition"
            >
              Pricing
            </a>
            <a
              href="#mobile-app"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Android App</span>
            </a>
            <a
              href="#partners"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition flex items-center gap-1.5"
            >
              <span>Join as Partner</span>
            </a>
          </nav>

          {/* Right: Hotline & Primary Booking CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Quick Hotline Pill for Desktop */}
            <a
              href={`tel:${cityConfig.phone}`}
              className="hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition group"
              title={`Call ${cityConfig.name} Hotline directly`}
            >
              <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{cityConfig.name} Hotline</div>
                <div className="font-extrabold text-xs text-white group-hover:text-red-400 transition">{cityConfig.phone}</div>
              </div>
            </a>

            {/* Primary High-Impact Booking CTA Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <span>{t.bookService}</span>
              <span className="hidden sm:inline-block bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">60 Min</span>
            </button>

            {/* Mobile Hamburger Drawer Toggle - Always perfectly in view */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer lg:hidden active:scale-90 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer (Sleek Glass Sheet) */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0F19]/98 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3 shadow-2xl text-left animate-fadeIn lg:hidden">
          {/* Mobile City Selector Card */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <div className="text-xs font-bold text-white">Active City: {cityConfig.name}</div>
            </div>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => onSelectCity('kadapa')}
                className={`px-2.5 py-1 rounded-md font-black transition ${
                  selectedCity === 'kadapa' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kadapa
              </button>
              <button
                onClick={() => onSelectCity('bangalore')}
                className={`px-2.5 py-1 rounded-md font-black transition ${
                  selectedCity === 'bangalore' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bangalore
              </button>
            </div>
          </div>

          {/* Quick Navigation Tile Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-red-400 transition"
            >
              🛠️ Services
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-red-400 transition"
            >
              💰 Price Estimator
            </a>
            <a
              href="#mobile-app"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold hover:bg-emerald-500/20 transition"
            >
              📱 Android App
            </a>
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-black hover:bg-amber-500/20 transition"
            >
              🔧 Join Partner
            </a>
            <a
              href="#reels"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-red-400 transition"
            >
              📸 Work Reels
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortals();
              }}
              className="p-3 rounded-xl bg-white/5 text-slate-200 border border-white/10 font-bold hover:bg-white/10 transition text-left cursor-pointer"
            >
              💼 Portals Hub
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQr();
              }}
              className="p-3 rounded-xl bg-white/5 text-slate-200 border border-white/10 font-bold hover:bg-white/10 transition text-left cursor-pointer"
            >
              🏷️ QR AC Sticker
            </button>
            <a
              href="#diagnostics"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-red-400 transition"
            >
              🩺 Symptom Checker
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-red-400 transition"
            >
              ❓ FAQs
            </a>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-center shadow-lg shadow-red-600/30 transition cursor-pointer text-xs"
            >
              {t.bookService} (60 Min Doorstep)
            </button>
            <a
              href={`https://wa.me/${cityConfig.phoneRaw}?text=${encodeURIComponent(`Hi AS Refrigerations ${cityConfig.name}, I need doorstep service.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 text-center text-xs shadow-md shadow-emerald-600/20 transition"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp ({cityConfig.phone})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
