import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Menu, 
  X,
  MapPin,
  ChevronDown,
  Check,
  Sparkles,
  Smartphone
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
  const t = TRANSLATIONS[lang];
  const cityConfig = CITIES_DATA[selectedCity];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      {/* 1. Slim Executive Top Bar */}
      <div className="bg-slate-950 text-slate-300 border-b border-slate-800/90 text-[11px] font-medium py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Announcement */}
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
            <span className="font-semibold text-slate-200 tracking-wide truncate">
              {selectedCity === 'kadapa'
                ? '⚡ 60-Min Doorstep AC & Appliance Repairs in Kadapa • Master Technician Shaik Sameer'
                : '⚡ Bangalore Doorstep Service • Kammanahalli Branch Hub (Express 60-Min Dispatch)'}
            </span>
          </div>

          {/* Right Highlights */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick City Switcher in Top Bar */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px]">
              <button
                onClick={() => onSelectCity('kadapa')}
                className={`px-2 py-0.5 rounded transition font-black cursor-pointer ${
                  selectedCity === 'kadapa' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kadapa HQ
              </button>
              <button
                onClick={() => onSelectCity('bangalore')}
                className={`px-2 py-0.5 rounded transition font-black cursor-pointer ${
                  selectedCity === 'bangalore' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bangalore Hub
              </button>
            </div>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/asrefrigerations.kadapa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 transition text-[11px] border border-slate-800"
            >
              <span>📸 Reels</span>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">₹100 OFF</span>
            </a>

            {/* Google Rating */}
            <a
              href="https://www.reviewsmart.online/r/as-refrigeration"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>928+ Reviews (4.9★)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main High-Impact Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              {/* Zoomed-in, proportioned brand logo badge */}
              <div className="h-11 w-18 sm:h-13 sm:w-22 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-md group-hover:border-red-500/50 group-hover:shadow-red-500/10 group-hover:scale-105 transition-all flex items-center justify-center p-1 overflow-hidden shrink-0">
                <img
                  src="/as-logo.png"
                  alt="AS Refrigerations Official Logo"
                  className="w-full h-full object-contain scale-110 drop-shadow-sm transition-transform duration-200 group-hover:scale-115"
                />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 group-hover:text-red-600 transition flex items-center leading-none">
                    AS <span className="text-red-600 ml-1.5">REFRIGERATIONS</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Verified
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {selectedCity === 'kadapa' ? "Kadapa's #1 Doorstep Service • Est. 2015" : "Kammanahalli, Bangalore Hub • 60-Min Express"}
                </span>
              </div>
            </a>

            {/* City Selector Dropdown Pill */}
            <div className="relative hidden md:block ml-1">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 text-slate-800 transition text-xs font-black cursor-pointer shadow-2xs group/btn"
                title="Change active service city"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-extrabold text-slate-900">{cityConfig.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">| 60-Min</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover/btn:text-slate-700 ${cityDropdownOpen ? 'rotate-180 text-red-600' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 text-left animate-fadeIn">
                  <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-slate-400">Select Operating Hub</div>
                  
                  <button
                    onClick={() => {
                      onSelectCity('kadapa');
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                      selectedCity === 'kadapa' ? 'text-red-600 bg-red-50/60 font-black' : 'text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>Kadapa Hub (HQ)</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-100 text-red-700 font-bold">Fastest</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">Mariapuram • 19 Wards Covered</div>
                    </div>
                    {selectedCity === 'kadapa' && <Check className="w-4 h-4 text-red-600" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectCity('bangalore');
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                      selectedCity === 'bangalore' ? 'text-red-600 bg-red-50/60 font-black' : 'text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>Bangalore Branch</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-700 font-bold">Express</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">Kammanahalli • 25 Areas Covered</div>
                    </div>
                    {selectedCity === 'bangalore' && <Check className="w-4 h-4 text-red-600" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Clean, Modern Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-bold text-slate-700">
            <a href="#services" className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-slate-50 transition">
              Services
            </a>
            <a href="#calculator" className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-slate-50 transition">
              Pricing
            </a>
            <a href="#reviews" className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-slate-50 transition flex items-center gap-1">
              <span>Reviews</span>
              <span className="text-[11px] text-amber-500 font-black">4.9★</span>
            </a>
            <a href="#reels" className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-slate-50 transition flex items-center gap-1.5">
              <span>Reels</span>
              <span className="bg-red-50 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-red-200">₹100 Off</span>
            </a>
            <a
              href="#mobile-app"
              className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Android App</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-emerald-200">APK</span>
            </a>
            <a
              href="#partners"
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition font-black text-xs shadow-xs"
            >
              <span>🔧 Partner</span>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">Earn ₹60K</span>
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Phone Call Pill */}
            <a
              href="tel:+917815851330"
              className="hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-800 hover:border-red-300 transition group shadow-2xs"
              title="Call Shaik Sameer directly"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Direct Hotline</div>
                <div className="font-extrabold text-xs text-slate-900 group-hover:text-red-600 transition">+91 78158 51330</div>
              </div>
            </a>

            {/* Mobile 1-Tap Quick Actions */}
            <a
              href="tel:+917815851330"
              className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center sm:hidden active:scale-90 transition border border-red-200 shrink-0"
              title="Call Shaik Sameer"
              aria-label="Call 24/7 Hotline"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/917815851330?text=Hi%20AS%20Refrigerations%20Kadapa,%20I%20need%20doorstep%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center sm:hidden active:scale-90 transition border border-emerald-200 shrink-0"
              title="WhatsApp Chat"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Primary Booking CTA (Desktop & Tablet) */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-red-600/25 transition cursor-pointer active:scale-95 group"
            >
              <span>{t.bookService}</span>
              <span className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">60 Min</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition cursor-pointer lg:hidden active:scale-90"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile / Extended Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white rounded-b-2xl px-4 pt-4 pb-6 space-y-3 shadow-2xl text-left animate-fadeIn">
          {/* Mobile City Selector Card */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <div className="text-xs font-bold text-slate-900">Current City: {cityConfig.name}</div>
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => onSelectCity('kadapa')}
                className={`px-2.5 py-1 rounded-md font-black transition ${
                  selectedCity === 'kadapa' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Kadapa
              </button>
              <button
                onClick={() => onSelectCity('bangalore')}
                className={`px-2.5 py-1 rounded-md font-black transition ${
                  selectedCity === 'bangalore' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Bangalore
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition"
            >
              🛠️ Services
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition"
            >
              💰 Price Estimator
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition"
            >
              ⭐ 928+ Reviews
            </a>
            <a
              href="#reels"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition"
            >
              📸 Reels (₹100 Off)
            </a>
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-900 text-white border border-slate-800 font-black hover:bg-slate-800 transition"
            >
              🔧 Join Partner (₹60K)
            </a>
            <a
              href="#mobile-app"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold hover:bg-emerald-100 transition text-left"
            >
              📱 Android App (APK)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortals();
              }}
              className="p-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-extrabold hover:bg-slate-200 transition text-left cursor-pointer"
            >
              💼 Portals Hub
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQr();
              }}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition text-left cursor-pointer"
            >
              🏷️ QR AC Sticker
            </button>
            <a
              href="#diagnostics"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition"
            >
              🩺 Symptom Checker
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition"
            >
              ❓ FAQs
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-center shadow-lg shadow-red-600/20 ios-tap transition cursor-pointer text-xs"
            >
              {t.bookService} (60 Min Doorstep)
            </button>
            <a
              href="https://wa.me/917815851330?text=Hi%20AS%20Refrigerations%20Kadapa,%20I%20need%20doorstep%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 text-center text-xs shadow-md shadow-emerald-600/20 ios-tap"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+91 78158 51330)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
