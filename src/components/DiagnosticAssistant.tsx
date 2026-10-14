import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ServiceItem, SERVICES_DATA } from '../data/servicesData';

interface DiagnosticAssistantProps {
  onBookIssue: (service: ServiceItem, issueTitle: string) => void;
}

interface Symptom {
  id: string;
  category: 'ac' | 'fridge' | 'wm';
  symptom: string;
  likelyCause: string;
  severity: 'low' | 'medium' | 'high';
  estimatedCost: string;
  recommendedServiceId: string;
  tip: string;
}

const SYMPTOMS: Symptom[] = [
  // AC Symptoms
  {
    id: 'ac-1',
    category: 'ac',
    symptom: 'AC running but blowing room-temperature air (No Cooling)',
    likelyCause: 'Low refrigerant (R-32/R-410A) due to coil leak, or compressor dual-run capacitor failure.',
    severity: 'high',
    estimatedCost: '₹650 – ₹3,200',
    recommendedServiceId: 'ac-gas-r32',
    tip: 'Do not run AC continuously in this state to protect the compressor from burnout.'
  },
  {
    id: 'ac-2',
    category: 'ac',
    symptom: 'Water dripping / leaking continuously inside bedroom',
    likelyCause: 'Condensate drain pipe choked with algae/dust, or cracked drain tray.',
    severity: 'medium',
    estimatedCost: '₹1,000 (Covered in Jet Wash)',
    recommendedServiceId: 'ac-jet-wash',
    tip: 'A 120-bar pressure jet wash flushes the blocked drain pipe completely.'
  },
  {
    id: 'ac-3',
    category: 'ac',
    symptom: 'Foul musty smell or slow airflow from indoor blower',
    likelyCause: 'Bacterial biofilm, black mould, and dust clogging the evaporator cooling coils.',
    severity: 'medium',
    estimatedCost: '₹1,200 (Foam Jet Wash)',
    recommendedServiceId: 'ac-foam-wash',
    tip: 'Our antibacterial foam kills 99% of germs and restores pure, ice-cool airflow.'
  },
  {
    id: 'ac-4',
    category: 'ac',
    symptom: 'Outdoor unit making loud buzzing or rattling sound',
    likelyCause: 'Loose fan blade, failing fan motor bearing, or compressor mounting pads degraded.',
    severity: 'high',
    estimatedCost: '₹450 – ₹850',
    recommendedServiceId: 'ac-jet-wash',
    tip: 'Our master technician checks compressor vibration mounts during routine visit.'
  },

  // Refrigerator Symptoms
  {
    id: 'fridge-1',
    category: 'fridge',
    symptom: 'Freezer compartment making ice, but lower fridge is warm',
    likelyCause: 'Defrost heating element, bi-metal thermostat, or air damper baffle jammed.',
    severity: 'medium',
    estimatedCost: '₹750 – ₹1,250',
    recommendedServiceId: 'fridge-frost-repair',
    tip: 'Very common in Kadapa double-door fridges. Easily repaired doorstep in 40 mins.'
  },
  {
    id: 'fridge-2',
    category: 'fridge',
    symptom: 'Clicking sound from back every few minutes, compressor stops',
    likelyCause: 'Starting relay (PTC) or overload protector (OLP) failed.',
    severity: 'high',
    estimatedCost: '₹650 – ₹950',
    recommendedServiceId: 'fridge-frost-repair',
    tip: 'Turning it off promptly prevents compressor motor coil damage.'
  },
  {
    id: 'fridge-3',
    category: 'fridge',
    symptom: 'No cooling in both freezer and fridge compartments',
    likelyCause: 'Refrigerant gas leak (R134a/R600a) in copper condenser tubing or compressor failure.',
    severity: 'high',
    estimatedCost: '₹1,800 – ₹2,400',
    recommendedServiceId: 'fridge-gas-refill',
    tip: 'Requires nitrogen leak testing and fresh vacuum gas refill.'
  },

  // Washing Machine Symptoms
  {
    id: 'wm-1',
    category: 'wm',
    symptom: 'Drum not rotating / motor hums but clothes stay wet',
    likelyCause: 'Worn motor drive belt, capacitor weak, or spin motor safety brake engaged.',
    severity: 'high',
    estimatedCost: '₹650 – ₹1,200',
    recommendedServiceId: 'wm-spin-repair',
    tip: 'Sameer carries universal replacement drive belts and capacitors on his service bike.'
  },
  {
    id: 'wm-2',
    category: 'wm',
    symptom: 'Water not draining out (OE / E20 error code)',
    likelyCause: 'Coins, hairpin, or lint clogging the drain pump filter, or drain motor burnt.',
    severity: 'medium',
    estimatedCost: '₹450 – ₹850',
    recommendedServiceId: 'wm-spin-repair',
    tip: 'Clean the bottom coin trap filter first. If still stuck, we replace the drain motor.'
  }
];

export const DiagnosticAssistant: React.FC<DiagnosticAssistantProps> = ({ onBookIssue }) => {
  const [selectedCategory, setSelectedCategory] = useState<'ac' | 'fridge' | 'wm'>('ac');
  const [activeSymptomId, setActiveSymptomId] = useState<string>('ac-1');

  const categorySymptoms = SYMPTOMS.filter((s) => s.category === selectedCategory);
  const activeSymptom = SYMPTOMS.find((s) => s.id === activeSymptomId) || categorySymptoms[0];

  const handleBookSelected = () => {
    const matchedService = SERVICES_DATA.find((s) => s.id === activeSymptom.recommendedServiceId) || SERVICES_DATA[0];
    onBookIssue(matchedService, activeSymptom.symptom);
  };

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200/80" id="diagnostics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider border border-red-200/80">
            <Stethoscope className="w-3.5 h-3.5 text-red-600" />
            <span>Smart Appliance Diagnostic Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Not Sure What’s Wrong With Your Appliance?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Select your symptom below to get an instant engineering diagnosis, estimated repair cost, and the exact solution in Kadapa.
          </p>
        </div>

        {/* Category Tabs: Segmented Control */}
        <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-200 shadow-xs mb-8 overflow-x-auto max-w-full">
          <button
            onClick={() => {
              setSelectedCategory('ac');
              setActiveSymptomId('ac-1');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 shrink-0 ios-tap ${
              selectedCategory === 'ac'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>❄️ Air Conditioners (AC)</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('fridge');
              setActiveSymptomId('fridge-1');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 shrink-0 ios-tap ${
              selectedCategory === 'fridge'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🧊 Refrigerators (Fridge)</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('wm');
              setActiveSymptomId('wm-1');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 shrink-0 ios-tap ${
              selectedCategory === 'wm'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🧺 Washing Machines</span>
          </button>
        </div>

        {/* 2-Column Diagnostic Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Symptom List */}
          <div className="lg:col-span-5 space-y-3">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
              Common Symptoms Reported in Kadapa:
            </label>
            {categorySymptoms.map((symp) => {
              const isSelected = symp.id === activeSymptom.id;
              return (
                <button
                  key={symp.id}
                  onClick={() => setActiveSymptomId(symp.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ios-tap ${
                    isSelected
                      ? 'ios-glass border-red-500 shadow-md ring-2 ring-red-500/20'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      {symp.symptom}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="font-bold text-red-600">Est. {symp.estimatedCost}</span>
                      <span>•</span>
                      <span className="capitalize">{symp.severity} Urgency</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 mt-1 transition ${isSelected ? 'text-red-600 translate-x-1' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Diagnosis & Instant Booking Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[30px] border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Technical Diagnosis</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                      Root Cause Analysis
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 30-Day Guarantee
                  </span>
                </div>
              </div>

              {/* Symptom Title */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500">Reported Issue:</div>
                <div className="text-base sm:text-lg font-extrabold text-slate-900 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                  "{activeSymptom.symptom}"
                </div>
              </div>

              {/* Cause Explanation */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>What Causes This Problem?</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/80 p-4 rounded-2xl border border-amber-200 font-medium">
                  {activeSymptom.likelyCause}
                </p>
              </div>

              {/* Technician Pro Tip */}
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs text-slate-700 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="font-bold text-slate-900">Shaik Sameer's Pro Tip:</strong> {activeSymptom.tip}
                </div>
              </div>

              {/* Cost & Booking CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Estimated Doorstep Fix</div>
                  <div className="text-xl sm:text-2xl font-black text-red-600">
                    {activeSymptom.estimatedCost}
                  </div>
                  <div className="text-[10px] text-slate-500">₹350 visiting charge waived if repaired</div>
                </div>

                <button
                  onClick={handleBookSelected}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/20 ios-tap transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book This Solution Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
