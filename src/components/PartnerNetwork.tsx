import React, { useState } from 'react';
import { 
  Users, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Wrench, 
  MessageSquare,
  TrendingUp,
  Calculator,
  Award,
  Sparkles,
  Zap,
  DollarSign
} from 'lucide-react';
import { PARTNER_TIERS } from '../data/servicesData';
import { Language, TRANSLATIONS } from '../data/translations';

interface PartnerNetworkProps {
  lang: Language;
}

export const PartnerNetwork: React.FC<PartnerNetworkProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  // Income Calculator States
  const [selectedSkill, setSelectedSkill] = useState<'ac' | 'fridge' | 'wm'>('ac');
  const [dailyJobs, setDailyJobs] = useState<number>(3);

  // Application Modal States
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('AC Specialist Technician');
  const [techName, setTechName] = useState('');
  const [techPhone, setTechPhone] = useState('');
  const [techExperience, setTechExperience] = useState('3-5 Years');
  const [techArea, setTechArea] = useState('Kadapa Central (Mariapuram / RTC)');

  // Dynamic calculations for ROI
  const skillDetails = {
    ac: {
      title: 'AC Specialist',
      monthlyFee: 8285,
      avgTicket: 1200,
      monthlyLeads: '60-90 Leads',
      daysPerMonth: 25
    },
    fridge: {
      title: 'Refrigerator Specialist',
      monthlyFee: 6350,
      avgTicket: 950,
      monthlyLeads: '45-65 Leads',
      daysPerMonth: 25
    },
    wm: {
      title: 'Washing Machine Specialist',
      monthlyFee: 4950,
      avgTicket: 850,
      monthlyLeads: '35-50 Leads',
      daysPerMonth: 25
    }
  };

  const activeSkill = skillDetails[selectedSkill];
  const monthlyCompletedJobs = dailyJobs * activeSkill.daysPerMonth;
  const estimatedGrossIncome = monthlyCompletedJobs * activeSkill.avgTicket;
  const netTakeHomeProfit = estimatedGrossIncome - activeSkill.monthlyFee;

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!techPhone.trim()) {
      alert('Please enter your phone number.');
      return;
    }
    const msg = `*NEW TECHNICIAN PARTNER APPLICATION - AS REFRIGERATIONS KADAPA*\n\n` +
      `Name: ${techName}\n` +
      `WhatsApp Phone: ${techPhone}\n` +
      `Trade / Role: ${selectedTier}\n` +
      `Experience: ${techExperience}\n` +
      `Preferred Territory in Kadapa: ${techArea}\n\n` +
      `I want to join Master Shaik Sameer's partner network and start receiving verified daily leads.`;

    window.open(`https://wa.me/917815851330?text=${encodeURIComponent(msg)}`, '_blank');
    setPartnerModalOpen(false);
  };

  return (
    <section className="py-20 bg-[#0B0F19] text-white relative overflow-hidden" id="partners">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Kadapa Technician Partner Recruitment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Earn <span className="text-red-500">₹45,000 to ₹75,000+</span> / Month With Zero Commission!
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Are you a skilled AC, fridge, or washing machine mechanic in Kadapa? Join Master Shaik Sameer’s verified partner network. <strong>Keep 100% of customer collections</strong> with zero per-job cuts.
          </p>
        </div>

        {/* Featured Hero Banner with Realistic Illustration */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-16 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left: Realistic Illustration */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto h-full min-h-[340px] overflow-hidden">
              <img
                src="/partner-recruitment-hero.jpg"
                alt="AS Refrigerations Kadapa Certified Partner Technician with Smartphone Leads"
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-left">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Real Daily Leads in Kadapa</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5 font-medium">
                  Direct WhatsApp dispatch to your phone • Verified customers only
                </div>
              </div>
            </div>

            {/* Right: Key Partner Value Pillars */}
            <div className="lg:col-span-6 p-6 sm:p-10 text-left space-y-6">
              <div>
                <span className="text-xs font-black text-red-400 uppercase tracking-wider">
                  Why 50+ Technicians Choose AS Refrigerations
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Transform From a Daily Wager to a Respected Business Partner
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>0% Job Commission</span>
                  </div>
                  <p className="text-[11px] text-slate-400">You keep 100% of customer payments directly in your pocket or UPI.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>60-90 Local Leads</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Pre-booked customer jobs delivered to your phone in your chosen Kadapa locality.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 font-extrabold text-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Wholesale Spare Parts</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Get genuine R32/R410A gas, copper pipes & spares at shop dealer prices.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-red-400 font-extrabold text-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Master Sameer Support</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Stuck on an inverter error code? Shaik Sameer provides immediate technical guidance.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedTier('AC Specialist Technician');
                    setPartnerModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-600/25 active:scale-95 transition cursor-pointer"
                >
                  Join AS Partner Network (Apply in 60s)
                </button>

                <a
                  href="tel:+917815851330"
                  className="px-5 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-xs sm:text-sm transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Shaik Sameer Directly</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Technician Earnings & ROI Calculator */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-16 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-800/40">
                <Calculator className="w-3.5 h-3.5" />
                Transparent Earnings Simulator
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                Calculate Your Monthly Take-Home Profit in Kadapa
              </h3>
            </div>
            <div className="text-xs text-slate-400">
              *Based on real average ticket values in Kadapa town
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Inputs (Col 7) */}
            <div className="md:col-span-7 space-y-6">
              {/* Select Skill */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  1. Select Your Core Specialty Trade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ac', label: '❄️ AC Specialist' },
                    { id: 'fridge', label: '🧊 Refrigerator' },
                    { id: 'wm', label: '🧺 Washing M/C' }
                  ].map((trade) => (
                    <button
                      key={trade.id}
                      type="button"
                      onClick={() => setSelectedSkill(trade.id as any)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-black border transition cursor-pointer text-center ${
                        selectedSkill === trade.id
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {trade.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jobs Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    2. Service Calls You Can Complete Daily
                  </label>
                  <span className="text-sm font-black text-amber-300 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                    {dailyJobs} Jobs / Day
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={dailyJobs}
                  onChange={(e) => setDailyJobs(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-bold mt-1">
                  <span>1 Job (Part-time)</span>
                  <span>3 Jobs (Normal)</span>
                  <span>6 Jobs (Hard Worker)</span>
                </div>
              </div>

              {/* Lead Guarantee callout */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Lead Pipeline: {activeSkill.monthlyLeads}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Fixed platform fee of just ₹{Math.round(activeSkill.monthlyFee / 30)}/day. No commissions taken from customer bills!
                </div>
              </div>
            </div>

            {/* Income Card (Col 5) */}
            <div className="md:col-span-5 bg-slate-950 border border-emerald-500/40 rounded-3xl p-6 text-left relative overflow-hidden shadow-2xl">
              <div className="text-xs uppercase font-black text-emerald-400 tracking-wider mb-1">
                Estimated Net Monthly Profit
              </div>
              <div className="text-4xl font-black text-white tracking-tight">
                ₹{netTakeHomeProfit.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Clean profit directly into your bank / UPI
              </div>

              <div className="mt-5 space-y-2 pt-4 border-t border-slate-800 text-xs font-semibold">
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Jobs Completed:</span>
                  <span className="font-bold text-white">{monthlyCompletedJobs} Jobs</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Gross Customer Billing:</span>
                  <span className="font-bold text-white">₹{estimatedGrossIncome.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Fixed AS Platform Fee:</span>
                  <span className="font-bold text-red-400">-₹{activeSkill.monthlyFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Hidden Cuts / Commission:</span>
                  <span className="font-bold text-emerald-400">₹0 (ZERO)</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier(activeSkill.title);
                    setPartnerModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition cursor-pointer text-center"
                >
                  Join As {activeSkill.title} Now
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Transparent Subscription Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PARTNER_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-[28px] p-7 border transition-all duration-200 flex flex-col justify-between text-left relative ios-tap ${
                tier.popular
                  ? 'bg-slate-900/95 text-white border-2 border-red-600 shadow-2xl'
                  : 'bg-slate-900/80 text-white border-slate-800 hover:border-slate-700 hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="text-xs font-black uppercase tracking-wider text-red-400 mb-2">
                  {tier.leadsExpected}
                </div>
                <h3 className="text-xl font-black text-white">
                  {tier.role}
                </h3>

                <div className="my-5">
                  <span className="text-3xl font-black text-white">₹{tier.monthlyFee.toLocaleString('en-IN')}</span>
                  <span className="text-xs font-semibold text-slate-400 ml-1.5">
                    / Month Subscription
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier.role);
                    setPartnerModalOpen(true);
                  }}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition ios-tap ${
                    tier.popular
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
                      : 'bg-slate-850 hover:bg-red-600 text-white border border-slate-700'
                  }`}
                >
                  <span>Apply As {tier.role.split(' ')[0]} Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Partner Application Modal (iOS Native Bottom Sheet on Mobile) */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="ios-sheet sm:bg-white rounded-t-[32px] sm:rounded-[32px] max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl relative border-t sm:border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* iOS Bottom Sheet Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

            <button
              onClick={() => setPartnerModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-black text-xl cursor-pointer w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Join AS Refrigerations Partner Network
                </h3>
                <p className="text-xs text-slate-500">
                  Earn ₹45,000 to ₹75,000/mo. Start receiving verified customer leads daily.
                </p>
              </div>
            </div>

            <form onSubmit={handlePartnerSubmit} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Applying Trade / Plan</label>
                <input
                  type="text"
                  readOnly
                  value={selectedTier}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shaik Imran"
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={techPhone}
                  onChange={(e) => setTechPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Years Experience</label>
                  <select
                    value={techExperience}
                    onChange={(e) => setTechExperience(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years Master">10+ Years Master</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Locality</label>
                  <input
                    type="text"
                    placeholder="e.g. Mariapuram / 1 Town / RIMS"
                    value={techArea}
                    onChange={(e) => setTechArea(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                🔒 <strong>Zero Commission Guarantee:</strong> All customer earnings belong 100% to you. Master Shaik Sameer will review your profile and activate your account within 24 hours.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 mt-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Application to Shaik Sameer</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
