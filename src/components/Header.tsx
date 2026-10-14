import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Menu, 
  X,
  MapPin,
  ChevronDown,
  Check
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
  onOpenMobileApps?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  selectedCity,
  onSelectCity,
  onOpenBooking,
  onOpenQr,
  onOpenPortals,
  onOpenMobileApps
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const cityConfig = CITIES_DATA[selectedCity];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs transition-all">
      {/* 1. Slim Executive Top Bar */}
      <div className="bg-slate-950 text-slate-300 border-b border-slate-800/90 text-[11px] font-medium py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Announcement */}
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
            <span className="font-semibold text-slate-200 tracking-wide truncate">
              {selectedCity === 'kadapa'
                ? 'Kadapa Express Dispatch • Shaik Sameer & Team'
                : 'Bangalore Doorstep Service • Kammanahalli Branch Hub (60-Min Arrival)'}
            </span>
          </div>

          {/* Right Highlights */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick City Switcher in Top Bar */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px]">
              <button
                onClick={() => onSelectCity('kadapa')}
                className={`px-2 py-0.5 rounded transition font-bold cursor-pointer ${
                  selectedCity === 'kadapa' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kadapa
              </button>
              <button
                onClick={() => onSelectCity('bangalore')}
                className={`px-2 py-0.5 rounded transition font-bold cursor-pointer ${
                  selectedCity === 'bangalore' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bangalore
              </button>
            </div>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/asrefrigerations.kadapa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 transition text-[11px] border border-slate-800"
            >
              <span>📸 @asrefrigerations.kadapa</span>
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

      {/* 2. Main Clean Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/as-logo.jpg"
                alt="AS Refrigeration Logo"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain rounded-xl border border-slate-200 shadow-xs group-hover:scale-105 transition"
              />
              <div className="flex flex-col text-left">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-red-600 transition flex items-center leading-none">
                  AS <span className="text-red-600 ml-1">REFRIGERATION</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">
                  {selectedCity === 'kadapa' ? "Kadapa's #1 Doorstep Service • Est. 2015" : "Kammanahalli, Bangalore Branch • Express Service"}
                </span>
              </div>
            </a>

            {/* City Selector Dropdown Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 text-slate-800 transition text-xs font-black cursor-pointer shadow-2xs"
                title="Change active service city"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-extrabold">{cityConfig.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-left animate-fadeIn">
                  <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-slate-400">Select Service City</div>
                  
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
                      <div className="font-extrabold">Kadapa Hub (HQ)</div>
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
                      <div className="font-extrabold">Bangalore Branch</div>
                      <div className="text-[10px] text-slate-500 font-normal">Kammanahalli • 25 Areas Covered</div>
                    </div>
                    {selectedCity === 'bangalore' && <Check className="w-4 h-4 text-red-600" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Simple, Clean Desktop Navigation Links (Only 5 Essential Links) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-slate-700">
            <a href="#services" className="hover:text-red-600 transition py-1">
              Services
            </a>
            <a href="#calculator" className="hover:text-red-600 transition py-1">
              Pricing
            </a>
            <a href="#reviews" className="hover:text-red-600 transition py-1">
              Reviews
            </a>
            <a href="#reels" className="hover:text-red-600 transition py-1 flex items-center gap-1.5 text-slate-700">
              <span>Reels</span>
              <span className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-slate-200">₹100 Off</span>
            </a>
            <button
              onClick={onOpenMobileApps}
              className="hover:text-red-600 transition py-1 flex items-center gap-1.5 text-slate-700 font-bold cursor-pointer"
            >
              <span>📱 Mobile Apps</span>
              <span className="bg-red-50 text-red-600 text-[10px] px-1.5 py-0.2 rounded-full font-bold border border-red-200">Urban UI</span>
            </button>
            <a
              href="#partners"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition font-black text-xs shadow-xs"
            >
              <span>🔧 Join Partner</span>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">Earn ₹60K</span>
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Phone Call Pill */}
            <a
              href="tel:+917815851330"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 text-slate-800 hover:border-red-600 hover:text-red-600 transition"
              title="Call Shaik Sameer directly"
            >
              <div className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight hidden xl:block">
                <div className="text-[9px] text-slate-400 uppercase font-black">24/7 Support</div>
                <div className="font-extrabold text-xs text-slate-900">+91 78158 51330</div>
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
              href="https://wa.me/917815851330?text=Hi%20AS%20Refrigeration%20Kadapa,%20I%20need%20doorstep%20service."
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
              className="hidden sm:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-red-600/20 transition cursor-pointer active:scale-95"
            >
              <span>{t.bookService}</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">60 Min</span>
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenMobileApps) onOpenMobileApps();
              }}
              className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 font-extrabold hover:bg-red-100 transition text-left cursor-pointer"
            >
              📱 Mobile Apps Preview
            </button>
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
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-red-600 transition col-span-2"
            >
              ❓ Customer FAQs
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-center shadow-lg shadow-red-600/20 ios-tap transition cursor-pointer text-xs"
            >
              {t.bookService} (60 Min Doorstep)
            </button>
            <a
              href="https://wa.me/917815851330?text=Hi%20AS%20Refrigeration%20Kadapa,%20I%20need%20doorstep%20service."
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
