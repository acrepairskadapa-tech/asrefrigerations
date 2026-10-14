import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Award, 
  MapPin, 
  Phone, 
  CheckCircle2,
  Sparkles,
  Users
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { CityId, CITIES_DATA } from '../data/citiesData';

interface WhyChooseUsProps {
  lang: Language;
  selectedCity?: CityId;
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  lang,
  selectedCity = 'kadapa',
  onOpenBooking
}) => {
  const t = TRANSLATIONS[lang];
  const cityConfig = CITIES_DATA[selectedCity];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-14" id="why-us">
      <div id="location" className="scroll-mt-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            {selectedCity === 'kadapa' ? 'Flagship Hub • 10+ Years Legacy' : 'Bangalore Branch • Kammanahalli'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            {t.whyUsTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {selectedCity === 'kadapa' 
              ? "Founded by Master Technician Shaik Sameer in 2014, we've serviced over 50,000+ homes, offices, and commercial establishments in Kadapa."
              : "Bringing Shaik Sameer's 10-year proven HVAC engineering and trusted doorstep repairs to Kammanahalli, Kalyan Nagar and North-East Bangalore."}
          </p>
        </div>

        {/* 2-Column Story & Workshop Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          
          {/* Left Column: Visual Collage with Real Images */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                  <img
                    src="/shop-front.jpg"
                    alt={`${cityConfig.workshopName} - AS Refrigerations`}
                    className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="p-3 bg-white text-left">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold text-slate-500 uppercase">{cityConfig.name} Hub</div>
                      <a
                        href={`https://maps.google.com/?q=${cityConfig.googleMapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-extrabold text-red-600 hover:text-red-700 flex items-center gap-0.5"
                      >
                        <MapPin className="w-3 h-3" /> Map
                      </a>
                    </div>
                    <div className="text-xs font-black text-slate-900">{cityConfig.workshopName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{cityConfig.workshopAddress}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-red-600 text-white shadow-lg text-left">
                  <Award className="w-8 h-8 text-amber-300 mb-2" />
                  <div className="text-2xl font-black">928+</div>
                  <div className="text-xs text-red-100 font-medium">Verified Google Reviews with 4.9 Star Rating</div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-lg text-left">
                  <Users className="w-8 h-8 text-red-400 mb-2" />
                  <div className="text-2xl font-black">50,000+</div>
                  <div className="text-xs text-slate-400 font-medium">Doorstep Service Visits Completed Successfully</div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                  <img
                    src="/sameer.jpg"
                    alt="Master Technician Shaik Sameer"
                    className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="p-3 bg-white text-left">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Founder & Master HVAC Lead</div>
                    <div className="text-xs font-black text-slate-900">Shaik Sameer (10+ Yrs Exp.)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-full shadow-xl border border-slate-200 flex items-center gap-2 whitespace-nowrap">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-black text-slate-900">
                100% Certified Doorstep Service Guarantee
              </span>
            </div>
          </div>

          {/* Right Column: 4 Key Service Pillars */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3.5">
              <div className="p-5 rounded-[24px] bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md flex items-start gap-4 ios-tap">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{t.why1Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{t.why1Desc}</p>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md flex items-start gap-4 ios-tap">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{t.why2Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{t.why2Desc}</p>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md flex items-start gap-4 ios-tap">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{t.why3Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{t.why3Desc}</p>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md flex items-start gap-4 ios-tap">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{t.why4Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{t.why4Desc}</p>
                </div>
              </div>
            </div>

            {/* Direct Booking Call to Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-600/20 ios-tap transition cursor-pointer"
              >
                Book Doorstep Visit in Kadapa
              </button>

              <a
                href="tel:+917815851330"
                className="px-5 py-3.5 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-extrabold text-sm ios-tap transition"
              >
                Speak Directly with Sameer Bhai
              </a>
            </div>

          </div>

        </div>

        {/* Realistic Appliance Diagnostic Showcase Banner */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-6 sm:p-10 text-left space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Doorstep Technology & Tools
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Precision Digital Diagnostics for Refrigerators & Washing Machines
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We don't do guesswork or unnecessary part replacements. Our technicians carry digital manifold gauges, nitrogen pressure detectors, and motor load testers to diagnose exact issues right in your kitchen.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">⚡ Digital Pressure Gauges</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Exact gram-level gas refill</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">🛡️ 100% Genuine Spares</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Factory relays, valves & seals</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden">
              <img
                src="/appliance-repair-illustration.jpg"
                alt="Refrigerator and Washing Machine Precision Diagnostic by Certified Technician"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/20">
                At-Home Kitchen Diagnostics
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
