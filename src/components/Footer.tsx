import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  QrCode, 
  CheckCircle2, 
  MessageSquare,
  Award,
  Sparkles
} from 'lucide-react';
import { KADAPA_AREAS } from '../data/servicesData';
import { Language } from '../data/translations';
import { CityId, CITIES_DATA } from '../data/citiesData';

interface FooterProps {
  lang: Language;
  selectedCity?: CityId;
  onSelectCity?: (city: CityId) => void;
  onOpenBooking: () => void;
  onOpenQr?: () => void;
  onOpenPortals?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  selectedCity = 'kadapa',
  onSelectCity,
  onOpenBooking,
  onOpenQr,
  onOpenPortals
}) => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);
  const cityConfig = CITIES_DATA[selectedCity];

  const policies: Record<string, { title: string; content: string }> = {
    terms: {
      title: 'Terms & Conditions - AS Refrigerations Kadapa',
      content:
        '1. Service Guarantee: All repair services carried out by AS Refrigerations carry a 30-day workmanship and recurring fault warranty.\n' +
        '2. Diagnostic Fee: The standard diagnostic visiting charge of ₹350 in Kadapa town is 100% waived/adjusted into the final repair bill upon customer approval of the quote.\n' +
        '3. Genuine Spare Parts: All refrigerants (R-32, R-410A, R-134a) and replacement spares are sourced directly from verified manufacturers.\n' +
        '4. Payment Terms: Payment is due immediately upon customer test satisfaction via UPI (PhonePe/Google Pay/Paytm) or Cash.'
    },
    privacy: {
      title: 'Privacy Policy - AS Refrigerations Kadapa',
      content:
        'AS Refrigerations respects your privacy. We collect customer names, phone numbers, and doorstep service addresses solely for technician dispatch, service scheduling, and 30-day warranty support in Kadapa district. We never sell, rent, or share customer data with third-party telemarketers.'
    },
    refund: {
      title: 'Refund & 30-Day Service Guarantee Policy',
      content:
        '1. Free Cancellation: Customers may cancel service appointments at zero charge anytime before the technician departs for the location.\n' +
        '2. 30-Day Warranty Protection: If the serviced issue recurs within 30 days of repair, Shaik Sameer or a master technician will re-inspect and fix the defect at zero additional labor cost.\n' +
        '3. Spares Guarantee: New parts replaced carry respective manufacturer warranty seals.'
    },
    partner: {
      title: 'AS Partner Program Terms & Code of Ethics',
      content:
        '1. Code of Conduct: AS Partner technicians agree to maintain the highest standard of professionalism, arrive within 60 minutes in Kadapa, and adhere strictly to transparent company rate cards.\n' +
        '2. Genuine Spares: Partner technicians must use 100% genuine components and safe manifold testing protocols.\n' +
        '3. Zero Customer Poaching: All leads routed via AS Refrigerations must be closed through the official company service network.'
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 text-left pt-16 pb-28 sm:pb-16 text-xs relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Pre-Footer Callout / Emergency Dispatch Bar */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-extrabold text-[11px] tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span>Kadapa Rapid Doorstep Dispatch • 60-Minute Response</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Facing an AC, Refrigerator or Washing Machine Breakdown?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed">
                Shaik Sameer & our certified technicians are on standby across all 19 Kadapa localities. Diagnostic fee is ₹350 (100% waived in final repair bill).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-600/20 active:scale-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>Book Service Now</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">60 Min</span>
              </button>

              <a
                href="https://wa.me/917815851330?text=Hi%20AS%20Refrigerations%20Kadapa,%20I%20need%20urgent%20doorstep%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (+91 78158 51330)</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          
          {/* Brand Info (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-20 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-md flex items-center justify-center p-1 overflow-hidden shrink-0">
                <img
                  src="/as-logo.png"
                  alt="AS Refrigerations Kadapa Logo"
                  className="w-full h-full object-contain scale-110 drop-shadow-sm"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  AS <span className="text-red-500">REFRIGERATIONS</span>
                </span>
                <span className="block text-[11px] font-bold text-slate-400">
                  Kadapa's #1 Doorstep Home Appliance Service Center
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-normal">
              Founded in 2015 by Master HVAC Specialist <strong className="text-white">Shaik Sameer</strong> (formerly operating as <em className="text-slate-300 not-italic">Duniya Repairs</em>). Proudly delivering certified doorstep AC servicing, high-pressure foam jet wash, genuine refrigerant refills, and domestic appliance repairs across Kadapa district.
            </p>

            {/* Badges */}
            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified Doorstep Service Enterprise</span>
                </div>
                <div className="text-slate-400 pl-6">
                  Serving 50,000+ local Kadapa families with 100% genuine spares.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>928+ Google Reviews (4.9★)</span>
                </div>
                <a
                  href="https://www.reviewsmart.online/r/as-refrigeration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 font-extrabold inline-flex items-center gap-1"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Native Mobile App Badges Card */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-2">
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <span>📱</span>
                    <span>Native Smartphone Apps</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-red-600/20 text-red-400 border border-red-500/30">
                    Urban UI
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="/downloads/as-refrigerations-customer.apk"
                    download="as-refrigerations-customer.apk"
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition flex items-center gap-2 group text-left"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                      <path d="M4 3.5C4 2.8 4.6 2.3 5.3 2.6L16.2 9.2L12 13.4L4 3.5Z" fill="#00D2FF"/>
                      <path d="M16.2 9.2L20.5 11.8C21.2 12.2 21.2 13.2 20.5 13.6L16.2 16.2L12 12.7L16.2 9.2Z" fill="#FFCE00"/>
                      <path d="M4 21.9C4 22.6 4.6 23.1 5.3 22.8L16.2 16.2L12 12L4 21.9Z" fill="#FF3A44"/>
                      <path d="M12 12.7L4 3.5C3.8 3.8 3.7 4.2 3.7 4.7V20.7C3.7 21.2 3.8 21.6 4 21.9L12 12.7Z" fill="#00E676"/>
                    </svg>
                    <div>
                      <div className="text-[9px] text-emerald-400 font-bold leading-none">Customer App</div>
                      <div className="text-[11px] font-bold text-white group-hover:text-emerald-400 transition leading-tight">APK Download</div>
                    </div>
                  </a>

                  <a
                    href="/downloads/as-refrigerations-partner.apk"
                    download="as-refrigerations-partner.apk"
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition flex items-center gap-2 group text-left"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                      <path d="M4 3.5C4 2.8 4.6 2.3 5.3 2.6L16.2 9.2L12 13.4L4 3.5Z" fill="#00D2FF"/>
                      <path d="M16.2 9.2L20.5 11.8C21.2 12.2 21.2 13.2 20.5 13.6L16.2 16.2L12 12.7L16.2 9.2Z" fill="#FFCE00"/>
                      <path d="M4 21.9C4 22.6 4.6 23.1 5.3 22.8L16.2 16.2L12 12L4 21.9Z" fill="#FF3A44"/>
                      <path d="M12 12.7L4 3.5C3.8 3.8 3.7 4.2 3.7 4.7V20.7C3.7 21.2 3.8 21.6 4 21.9L12 12.7Z" fill="#00E676"/>
                    </svg>
                    <div>
                      <div className="text-[9px] text-amber-400 font-bold leading-none">Partner App</div>
                      <div className="text-[11px] font-bold text-white group-hover:text-amber-400 transition leading-tight">APK Download</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Tools (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-500 rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-2.5 font-medium text-slate-300">
              <li>
                <a href="#services" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>🛠️ All Services</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>💰 Price Calculator</span>
                </a>
              </li>
              <li>
                <a href="#amc" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>🛡️ AMC Yearly Plans</span>
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>👨‍🔧 Why Choose Sameer</span>
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>⭐ 928+ Google Reviews</span>
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>🩺 Symptom Diagnostics</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span>❓ Customer FAQs</span>
                </a>
              </li>
              <li>
                <a href="#reels" className="hover:text-pink-400 transition flex items-center gap-1.5 text-pink-400 font-bold">
                  <span>📸 Instagram Reels</span>
                  <span className="text-[9px] bg-pink-500/20 px-1 rounded text-pink-300">₹100 Off</span>
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-400 font-bold">
                  <span>🔧 Join Partner Program</span>
                </a>
              </li>
              {onOpenPortals && (
                <li>
                  <button
                    onClick={onOpenPortals}
                    className="hover:text-purple-400 transition flex items-center gap-1.5 text-purple-400 font-bold cursor-pointer text-left"
                  >
                    <span>💼 Portals Simulation Hub</span>
                  </button>
                </li>
              )}

              {onOpenQr && (
                <li>
                  <button
                    onClick={onOpenQr}
                    className="hover:text-red-400 transition flex items-center gap-1.5 text-slate-400 cursor-pointer text-left"
                  >
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>AC Service QR Sticker</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Popular Services with Rates (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-500 rounded-full" />
              Popular Services
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li className="flex items-center justify-between">
                <span className="text-slate-300">AC High-Pressure Jet Wash</span>
                <span className="text-red-400 font-bold">₹1,000</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">AC Antibacterial Foam Wash</span>
                <span className="text-red-400 font-bold">₹1,200</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">R-32 / R-410A Gas Refill</span>
                <span className="text-red-400 font-bold">₹3,200</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Refrigerator Gas & Compressor</span>
                <span className="text-red-400 font-bold">From ₹1,800</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Washing Machine PCB & Drum</span>
                <span className="text-red-400 font-bold">From ₹650</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Microwave & Geyser Heating</span>
                <span className="text-red-400 font-bold">From ₹450</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Commercial HVAC Hospital AMC</span>
                <span className="text-emerald-400 font-bold">₹4,999/yr</span>
              </li>
              <li className="pt-1">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Visiting fee ₹350 adjusted upon service approval</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Workshop Contact & Hours (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-500 rounded-full" />
              {cityConfig.name} Workshop & Helpline
            </h4>
            <div className="space-y-3 font-medium text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-white block font-bold mb-0.5">{cityConfig.workshopName}</strong>
                  {cityConfig.workshopAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a href={`tel:${cityConfig.phone}`} className="text-white font-extrabold hover:text-red-400 transition text-sm">
                    {cityConfig.phone}
                  </a>
                  <span className="block text-[10px] text-slate-400">
                    {selectedCity === 'kadapa' ? 'Shaik Sameer (Master HVAC Lead)' : 'Kammanahalli Branch Support'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${cityConfig.email}`} className="hover:text-white transition">
                  {cityConfig.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Operating Hours: 24/7 Doorstep Service</span>
              </div>

              {/* Social Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://www.reviewsmart.online/r/as-refrigeration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">⭐ 4.9★</span>
                    <span>Google Maps Profile (928+ Reviews)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://www.instagram.com/asrefrigerations.kadapa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-750 transition font-bold"
                >
                  <span className="flex items-center gap-2">
                    <span>📸 @asrefrigerations.kadapa</span>
                    <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">₹100 Off</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Hyper-Local Kadapa Service Coverage Tags */}
        <div className="py-6 border-t border-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Doorstep Service Coverage across Kadapa District (Dispatched within 60 Mins):</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              ● 19 Localities Active Daily
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {KADAPA_AREAS.map((area, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-[11px]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Technology Architecture & Engineering Partner Showcase */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <a
              href="https://www.momoittechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/logo shrink-0"
              title="MOMO IT TECHNOLOGIES Official Website"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-950 p-1 border border-cyan-500/30 group-hover/logo:border-cyan-400 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300 flex items-center justify-center overflow-hidden">
                <img
                  src="/momo-it-logo.png"
                  alt="MOMO IT TECHNOLOGIES"
                  className="w-full h-full object-contain rounded-xl group-hover/logo:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Official Technology Partner
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Engineering & Cloud
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white tracking-tight mt-0.5">
                MOMO IT TECHNOLOGIES
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Architect of AS Refrigerations Cloud Ecosystem, Native Android Apps & Doorstep Dispatch Engine.
              </p>
            </div>
          </div>

          <a
            href="https://www.momoittechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-cyan-600/20 active:scale-95 transition-all group shrink-0 cursor-pointer"
          >
            <span>Visit momoittechnologies.com</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} AS Refrigerations. All rights reserved.
          </div>

          {/* Legal policy links */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActivePolicyModal('refund')}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              30-Day Guarantee Policy
            </button>
            <button
              onClick={() => setActivePolicyModal('partner')}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Partner Program Policy
            </button>
          </div>

          {/* Technology Partner Attribution */}
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <span>Technology Partner:</span>
            <a
              href="https://www.momoittechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 group"
              title="Visit MOMO IT TECHNOLOGIES"
            >
              <img
                src="/momo-it-logo.png"
                alt="MOMO IT Logo"
                className="w-4 h-4 rounded-full object-contain shrink-0 border border-cyan-500/40"
              />
              <span className="underline decoration-cyan-500/40 hover:decoration-cyan-300">MOMO IT TECHNOLOGIES</span>
              <ExternalLink className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl relative border border-slate-700 animate-fadeIn">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-black text-xl cursor-pointer w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <h3 className="text-base font-black text-white">
                {policies[activePolicyModal]?.title}
              </h3>
            </div>

            <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto pr-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {policies[activePolicyModal]?.content}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="py-2.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
