import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Wrench, 
  Stethoscope, 
  Phone, 
  MessageSquare, 
  Calendar, 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Language } from '../data/translations';
import { CityId, CITIES_DATA } from '../data/citiesData';

interface MobileStickyBarProps {
  lang: Language;
  selectedCity?: CityId;
  onSelectCity?: (city: CityId) => void;
  onOpenBooking: () => void;
  onOpenPortals?: () => void;
  onOpenQr?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  lang,
  selectedCity = 'kadapa',
  onSelectCity,
  onOpenBooking,
  onOpenPortals,
  onOpenQr
}) => {
  const cityConfig = CITIES_DATA[selectedCity];
  const [activeTab, setActiveTab] = useState<'home' | 'location' | 'support' | 'services' | 'booking'>('home');
  const [supportSheetOpen, setSupportSheetOpen] = useState(false);

  // Auto detect active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const locEl = document.getElementById('location') || document.getElementById('why-us');
      const servEl = document.getElementById('services');

      if (locEl && scrollPos >= locEl.offsetTop && scrollPos < locEl.offsetTop + locEl.offsetHeight) {
        setActiveTab('location');
      } else if (servEl && scrollPos >= servEl.offsetTop && scrollPos < servEl.offsetTop + servEl.offsetHeight) {
        setActiveTab('services');
      } else if (window.scrollY < 350) {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id?: string) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('home');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. NATIVE SOLID MOBILE APP BOTTOM NAVIGATION BAR */}
      <nav 
        role="navigation"
        aria-label="Mobile Application Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-2 md:hidden select-none"
      >
        <div className="max-w-md mx-auto flex items-center justify-between relative">
          
          {/* Tab 1: Home */}
          <button
            onClick={() => scrollToSection()}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
              activeTab === 'home' ? 'text-red-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Home className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'home' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {activeTab === 'home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
              )}
            </div>
            <span className={`text-[10px] mt-1 transition-all leading-none ${activeTab === 'home' ? 'font-black text-red-600' : 'font-semibold'}`}>
              Home
            </span>
          </button>

          {/* Tab 2: Location */}
          <button
            onClick={() => {
              setActiveTab('location');
              scrollToSection('location');
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
              activeTab === 'location' ? 'text-red-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <MapPin className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'location' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {activeTab === 'location' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
              )}
            </div>
            <span className={`text-[10px] mt-1 transition-all leading-none ${activeTab === 'location' ? 'font-black text-red-600' : 'font-semibold'}`}>
              Location
            </span>
          </button>

          {/* Tab 3: Support */}
          <button
            onClick={() => setSupportSheetOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-all duration-200 cursor-pointer"
          >
            <div className="relative">
              <Phone className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <span className="text-[10px] font-semibold mt-1 leading-none">
              Support
            </span>
          </button>

          {/* Tab 4: Services */}
          <button
            onClick={() => {
              setActiveTab('services');
              scrollToSection('services');
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
              activeTab === 'services' ? 'text-red-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Wrench className={`w-5 h-5 transition-transform duration-200 ${activeTab === 'services' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {activeTab === 'services' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
              )}
            </div>
            <span className={`text-[10px] mt-1 transition-all leading-none ${activeTab === 'services' ? 'font-black text-red-600' : 'font-semibold'}`}>
              Services
            </span>
          </button>

          {/* Tab 5: Booking (Primary CTA) */}
          <button
            onClick={onOpenBooking}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer group active:scale-95"
            aria-label="Express Doorstep Booking"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30 group-hover:bg-red-700 transition">
                <Calendar className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-slate-900 text-[8px] font-black text-amber-400 rounded-full border border-slate-700 leading-tight">
                60m
              </span>
            </div>
            <span className="text-[10px] mt-1 font-black text-red-600 group-hover:text-red-700 transition leading-none">
              Booking
            </span>
          </button>

        </div>
      </nav>

      {/* 2. SOLID BOTTOM SHEET: 24/7 DIRECT SUPPORT */}
      {supportSheetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end justify-center md:hidden animate-fadeIn">
          {/* Overlay click to close */}
          <div 
            className="absolute inset-0" 
            onClick={() => setSupportSheetOpen(false)}
          />

          {/* Bottom Sheet Card */}
          <div className="relative w-full bg-white rounded-t-[32px] p-5 pb-8 space-y-4 max-h-[85vh] overflow-y-auto z-10 animate-slideUp text-left shadow-[0_-12px_40px_rgba(0,0,0,0.25)] border-t border-slate-200">
            
            {/* Sheet Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-1 mb-2" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    24/7 Doorstep Support
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Shaik Sameer & Team • Kadapa District
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSupportSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center font-black text-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action List */}
            <div className="space-y-2.5">
              
              {/* Call Lead Button */}
              <a
                href="tel:+917815851330"
                className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between active:scale-98 transition shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Direct Hotline</div>
                    <div className="text-sm font-black text-white">+91 78158 51330</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/60">
                  Call Now
                </span>
              </a>

              {/* Download Android App Button */}
              <a
                href="/downloads/as-refrigerations-customer.apk"
                download="as-refrigerations-customer.apk"
                onClick={() => setSupportSheetOpen(false)}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white flex items-center justify-between active:scale-98 transition shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-base">
                    📱
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-emerald-200">Native Android App</div>
                    <div className="text-sm font-black text-white">Download APK (v1.0)</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-950 bg-white px-2.5 py-1 rounded-lg">
                  18 MB • ₹100 Off
                </span>
              </a>

              {/* WhatsApp Chat Button */}
              <a
                href="https://wa.me/917815851330?text=Hi%20AS%20Refrigeration%20Kadapa,%20I%20need%20doorstep%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-600 text-white flex items-center justify-between active:scale-98 transition shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-200">WhatsApp Chat</div>
                    <div className="text-sm font-black text-white">Instant Lead Booking</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-950 bg-emerald-200 px-2.5 py-1 rounded-lg">
                  Chat (Fast)
                </span>
              </a>

              {/* Workshop Location Card */}
              <a
                href={`https://maps.google.com/?q=${cityConfig.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-3 group transition"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 leading-snug">
                    <strong className="text-slate-900 font-bold block mb-0.5">{cityConfig.workshopName}</strong>
                    {cityConfig.workshopAddress}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600 shrink-0 mt-1" />
              </a>

              {/* Instagram Offer Card */}
              <a
                href="https://www.instagram.com/asrefrigerations.kadapa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 text-xs text-slate-800 font-extrabold">
                  <span>📸 @asrefrigerations.kadapa</span>
                  <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">₹100 OFF</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              {/* Verified Google Review Score */}
              <a
                href="https://www.reviewsmart.online/r/as-refrigeration"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 flex items-center justify-between text-xs text-slate-700 font-bold"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>928+ Google Reviews (4.9★)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

            </div>

            {/* Quick Dismiss Button */}
            <button
              onClick={() => setSupportSheetOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs active:bg-slate-200 transition cursor-pointer"
            >
              Close Sheet
            </button>

          </div>
        </div>
      )}
    </>
  );
};
