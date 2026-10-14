import React from 'react';
import {
  Smartphone,
  Download,
  Star,
  ShieldCheck,
  MapPin,
  QrCode,
  Lock,
  Sparkles,
  Bell,
  Layers,
  Clock,
  ArrowRight
} from 'lucide-react';

// No simulator prop — this component is self-contained.
export const AppDownloadShowcase: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="w-5 h-5" />,
      color: 'red',
      title: 'Live Doorstep Tracker',
      desc: '6-stage real-time stepper: Booking Confirmed → Technician En Route → Doorstep Arrived → Work In Progress → Bill Generated → Paid.'
    },
    {
      icon: <Lock className="w-5 h-5" />,
      color: 'emerald',
      title: 'Zero-SMS PIN Auth',
      desc: 'Native mobile-number + 4-digit PIN login stored securely on device. No OTP costs, no SMS billing.'
    },
    {
      icon: <QrCode className="w-5 h-5" />,
      color: 'amber',
      title: 'Doorstep NPCI UPI QR',
      desc: 'Sameer locks the final price on-site. Customer scans a dynamic NPCI QR via PhonePe / GPay — 0% gateway fee.'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      color: 'purple',
      title: 'Sameer-First Dispatch',
      desc: 'Jobs auto-assigned to Shaik Sameer as Priority 1. Overflow routed to verified partner technicians.'
    },
    {
      icon: <Bell className="w-5 h-5" />,
      color: 'sky',
      title: 'Push Notifications',
      desc: 'Native Android push alerts for booking updates, technician ETA, and service completion receipt.'
    },
    {
      icon: <Layers className="w-5 h-5" />,
      color: 'rose',
      title: 'Dual App Architecture',
      desc: 'Two separate dedicated apps: Customer Booking App & Technician Partner Dispatcher App — each purpose-built.'
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    red:     { bg: 'bg-red-500/10',     border: 'border-red-500/20',     text: 'text-red-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400' },
    purple:  { bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  text: 'text-purple-400' },
    sky:     { bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     text: 'text-sky-400' },
    rose:    { bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    text: 'text-rose-400' },
  };

  return (
    <section id="mobile-app" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-red-500" />
            <span>Native Android Platform • Google Play Store</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">AS REFRIGERATION</span><br className="hidden sm:inline" />
            Native Android App
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            A fully dedicated native Android application — not a website in a wrapper. Built with Kotlin &amp; Jetpack Compose for a genuine smartphone experience, purpose-built for booking, live tracking, and doorstep UPI payments.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">

          {/* Android APK Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 hover:border-emerald-500/70 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-800 p-2 border border-slate-700 flex items-center justify-center shrink-0 shadow-md">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                    <path d="M4 3.5C4 2.8 4.6 2.3 5.3 2.6L16.2 9.2L12 13.4L4 3.5Z" fill="#00D2FF"/>
                    <path d="M16.2 9.2L20.5 11.8C21.2 12.2 21.2 13.2 20.5 13.6L16.2 16.2L12 12.7L16.2 9.2Z" fill="#FFCE00"/>
                    <path d="M4 21.9C4 22.6 4.6 23.1 5.3 22.8L16.2 16.2L12 12L4 21.9Z" fill="#FF3A44"/>
                    <path d="M12 12.7L4 3.5C3.8 3.8 3.7 4.2 3.7 4.7V20.7C3.7 21.2 3.8 21.6 4 21.9L12 12.7Z" fill="#00E676"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Native Android</span>
                  <h4 className="text-base font-black text-white leading-tight">Google Play Store</h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                v1.0
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Kotlin + Jetpack Compose 100% native Android app. Fast, fluid doorstep service dispatch. Direct APK download for instant testing.
            </p>

            <div className="flex items-center gap-1.5 text-amber-400 font-black text-[11px] mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9 / 5.0 · Production Build · 41 MB</span>
            </div>

            <a
              href="/downloads/AS_Refrigeration_v1.0.apk"
              download="AS_Refrigeration_v1.0.apk"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download APK (Android)</span>
            </a>
          </div>

          {/* iOS Coming Soon Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-slate-700/60 hover:border-sky-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-800 p-2 border border-slate-700 flex items-center justify-center shrink-0 shadow-md">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.76 1.05-1.81.93-2.84-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.74-.96 2.76 1.02.08 2.07-.53 2.7-1.29z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Apple Ecosystem</span>
                  <h4 className="text-base font-black text-white leading-tight">Apple App Store</h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-500/20 text-sky-400 border border-sky-500/30 shrink-0">
                Q1 2027
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Native Swift / SwiftUI iOS client for iPhone &amp; iPad. Scheduled under Apple Developer Organization Program after Android v1 launch is stable.
            </p>

            <div className="flex items-center gap-2 text-sky-400 font-semibold text-[11px] mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Development begins Q4 2026</span>
            </div>

            <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 text-slate-400 font-black text-sm border border-slate-700 cursor-not-allowed select-none">
              <span>🍏 iOS App — Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4 hover:border-slate-700 transition-colors duration-200">
                <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.border} border ${c.text} flex items-center justify-center shrink-0 mt-0.5`}>
                  {f.icon}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1">{f.title}</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MSME Trust Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Registered Business · <strong className="text-slate-300">AS REFRIGERATION</strong></span>
          </div>
          <span className="hidden sm:block text-slate-700">•</span>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Smartphone className="w-4 h-4 text-red-400 shrink-0" />
            <span>Native Kotlin &amp; Jetpack Compose · <strong className="text-slate-300">Android 6.0+</strong></span>
          </div>
          <span className="hidden sm:block text-slate-700">•</span>
          <a
            href="#mobile-app"
            className="text-sm text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition"
          >
            <span>Play Store listing coming soon</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
