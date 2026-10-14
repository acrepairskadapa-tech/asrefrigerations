import React from 'react';
import { Building2, ShieldCheck, Check, Clock, Phone, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface CommercialAMCProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const CommercialAMC: React.FC<CommercialAMCProps> = ({ lang, onOpenBooking }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="py-16 bg-[#0B0F19] text-white relative overflow-hidden" id="amc">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[140px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-900 px-3.5 py-1 rounded-full border border-slate-800">
            Year-Round Zero Breakdown Assurance
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight">
            {t.amcTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Tailored maintenance contracts for Kadapa households, hospitals, banks, retail showrooms, clinics, and school institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Home Comfort AMC Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-[30px] p-7 sm:p-8 flex flex-col justify-between text-left relative hover:border-slate-700 transition shadow-xl ios-tap">
            <div>
              <div className="inline-block text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-3.5 py-1 rounded-full border border-emerald-800/40 mb-4">
                Residential Homes & Villas
              </div>
              <h3 className="text-2xl font-black text-white">Home Comfort AC Plan</h3>
              <p className="text-xs text-slate-300 mt-1">Complete peaceful cooling for 1 full year.</p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">₹1,999</span>
                <span className="text-xs text-slate-400 font-semibold ml-2">/ AC Unit / Year</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                {[
                  '2 Scheduled Deep Jet/Foam Washes before Summer',
                  'Unlimited Free Breakdown Visits (0 Consultation fee)',
                  'Priority 2-Hour Doorstep Dispatch',
                  'Flat 20% Discount on Gas Refills & Genuine Spares',
                  'Free Electrical & Voltage Stabilization Check'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-800">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-sm text-center shadow-lg transition cursor-pointer ios-tap"
              >
                Enroll In Home Comfort AMC
              </button>
            </div>
          </div>

          {/* Commercial & Hospital AMC Card */}
          <div className="bg-slate-900/95 border-2 border-red-600 rounded-[30px] p-7 sm:p-8 flex flex-col justify-between text-left relative shadow-2xl ios-tap">
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Commercial Tier</span>
            </div>

            <div>
              <div className="inline-block text-xs font-extrabold uppercase tracking-wider text-red-400 bg-slate-950 px-3.5 py-1 rounded-full border border-slate-800 mb-4">
                Clinics, Showrooms & Offices
              </div>
              <h3 className="text-2xl font-black text-white">Commercial HVAC AMC</h3>
              <p className="text-xs text-slate-300 mt-1">Prevent customer discomfort & commercial downtime.</p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">
                  ₹4,999
                </span>
                <span className="text-xs text-slate-400 font-semibold ml-2">/ Year (Customizable for Multi-Units)</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                {[
                  'Quarterly Scheduled Preventive De-scaling',
                  'Emergency 60-Minute Rapid Response Guarantee',
                  'Dedicated Lead Technician Assigned to Your Venue',
                  'Official GST Tax Invoicing & Compliance Logs',
                  'Free Capacitor & Wiring Health Monitoring',
                  'Special Commercial Spare Parts Pricing'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="tel:+917815851330"
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm text-center shadow-lg shadow-red-600/25 transition ios-tap"
              >
                Call for Custom Site Inspection
              </a>
              <div className="text-[11px] text-center text-slate-400">
                Or WhatsApp inquiry to +91 78158 51330
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
