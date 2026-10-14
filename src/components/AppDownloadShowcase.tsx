import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Bell,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';

interface AppDownloadShowcaseProps {
  onOpenSimulator: () => void;
}

export const AppDownloadShowcase: React.FC<AppDownloadShowcaseProps> = ({
  onOpenSimulator
}) => {
  const [iosAlertSubscribed, setIosAlertSubscribed] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  const handleIosNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) return;
    setIosAlertSubscribed(true);
    setTimeout(() => {
      setIosAlertSubscribed(false);
      setCustomerEmail('');
    }, 4000);
  };

  return (
    <section id="mobile-app" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-red-500" />
            <span>Mobile Native Platform • Urban Company Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Book, Track & Pay with the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              AS REFRIGERATION
            </span> Mobile App
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Rayalaseema and East Bangalore's fastest doorstep repair platform is coming natively to your smartphone. Experience real-time GPS tracking, 4-digit PIN security, and instant 0% commission dynamic UPI QR payments.
          </p>
        </div>

        {/* Main Content Grid: App Badges + Smartphone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Store Badges, Feature Highlights & Simulator CTA */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* 1. App Store Download Cards Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Google Play Store Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 hover:border-emerald-500/60 transition-all duration-300 shadow-xl relative overflow-hidden group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Google Play Tri-Color Icon SVG */}
                    <div className="w-10 h-10 rounded-xl bg-slate-800 p-2 border border-slate-700 flex items-center justify-center shrink-0 shadow-md">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M4 3.5C4 2.8 4.6 2.3 5.3 2.6L16.2 9.2L12 13.4L4 3.5Z" fill="#00D2FF"/>
                        <path d="M16.2 9.2L20.5 11.8C21.2 12.2 21.2 13.2 20.5 13.6L16.2 16.2L12 12.7L16.2 9.2Z" fill="#FFCE00"/>
                        <path d="M4 21.9C4 22.6 4.6 23.1 5.3 22.8L16.2 16.2L12 12L4 21.9Z" fill="#FF3A44"/>
                        <path d="M12 12.7L4 3.5C3.8 3.8 3.7 4.2 3.7 4.7V20.7C3.7 21.2 3.8 21.6 4 21.9L12 12.7Z" fill="#00E676"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Available on</span>
                      <h4 className="text-base font-black text-white leading-tight">Google Play Store</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Android APK
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Full production APK ready for Google Play Console via MSME Organization Account (<strong>UDYAM-AP-05-0026516</strong>).
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px]">
                  <div className="flex items-center gap-1.5 text-amber-400 font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 / 5.0 Rating</span>
                  </div>
                  <button
                    onClick={onOpenSimulator}
                    className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Try In Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Apple App Store Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 hover:border-sky-500/60 transition-all duration-300 shadow-xl relative overflow-hidden group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Apple Icon SVG */}
                    <div className="w-10 h-10 rounded-xl bg-slate-800 p-2 border border-slate-700 flex items-center justify-center shrink-0 shadow-md">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.76 1.05-1.81.93-2.84-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.74-.96 2.76 1.02.08 2.07-.53 2.7-1.29z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Apple Ecosystem</span>
                      <h4 className="text-base font-black text-white leading-tight">Apple App Store</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    iOS Soon
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Native iOS client for iPhone & iPad scheduled for Q1 2027 under Apple Developer Organization Program.
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400 font-semibold">Native iOS (Swift/Capacitor)</span>
                  <span className="text-sky-400 font-bold">Coming Soon</span>
                </div>
              </div>

            </div>

            {/* 2. Key App Features 4-Box Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Live Doorstep Arrival Tracker</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                    6-stage progress stepper from booking receipt to Sameer's doorstep arrival.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Zero-SMS 4-Digit PIN Security</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                    Mobile number + 4-digit PIN stored securely on device. Zero SMS OTP billing.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Doorstep Dynamic NPCI UPI QR</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                    Technician locks approved final bill; scan with PhonePe/GPay for 0% gateway fee.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Sameer-First Priority Dispatch</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                    Shaik Sameer claims Kadapa jobs as Priority 1; auto-routes overflow to partners.
                  </p>
                </div>
              </div>

            </div>

            {/* 3. Interactive In-Browser Simulator Trigger */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-black text-red-400 tracking-wider block">Live Interactive Preview</span>
                <h4 className="text-base font-black text-white mt-0.5">Test Both Apps Right in Your Browser</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Switch between Customer Urban Company UI and Partner Technician Lead Dispatcher.
                </p>
              </div>

              <button
                onClick={onOpenSimulator}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 active:scale-95 transition cursor-pointer flex items-center gap-2 shrink-0"
              >
                <Smartphone className="w-4 h-4" />
                <span>Launch Mobile App Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column (5 cols): Photorealistic Smartphone Device Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px]">
              
              {/* Device Frame (iPhone 16 Pro Style Titanium Bezel) */}
              <div className="rounded-[48px] bg-slate-800 p-3 shadow-2xl border-4 border-slate-700/80 shadow-red-600/10">
                <div className="rounded-[40px] bg-slate-950 overflow-hidden border border-slate-800 text-slate-800 relative">
                  
                  {/* Dynamic Island / Speaker */}
                  <div className="h-7 bg-slate-950 flex items-center justify-between px-6 text-white text-[10px] font-semibold">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full mx-auto" />
                    <div className="flex items-center gap-1 text-[9px]">
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* App Screen Header */}
                  <div className="bg-slate-900 p-3.5 text-white border-b border-slate-800">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-red-500" />
                        <span className="font-bold">Mariapuram, Kadapa</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black">
                        60-Min Arrival
                      </span>
                    </div>
                    <div className="font-black text-xs text-white mt-1">
                      AS REFRIGERATION • Doorstep
                    </div>
                  </div>

                  {/* App Screen Body Preview */}
                  <div className="p-3 bg-slate-50 space-y-2.5 text-xs text-left min-h-[360px]">
                    
                    {/* Live Tracking Card */}
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                          En Route to Doorstep
                        </span>
                        <span className="font-mono bg-white/20 px-1.5 py-0.2 rounded font-bold">#ASR-9481</span>
                      </div>
                      <div className="font-black text-xs">AC Deep Jet Pressure Wash</div>
                      <div className="text-[10px] text-white/90">
                        Technician: <strong>Shaik Sameer (Master HVAC Lead)</strong>
                      </div>
                    </div>

                    {/* Urban Category Pills */}
                    <div>
                      <span className="text-[10px] font-black text-slate-700 block mb-1">Instant Booking</span>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                          <span className="text-base block">❄️</span>
                          <span className="font-bold text-slate-800">AC Wash</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                          <span className="text-base block">🧊</span>
                          <span className="font-bold text-slate-800">Fridge</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                          <span className="text-base block">🧺</span>
                          <span className="font-bold text-slate-800">Washing</span>
                        </div>
                      </div>
                    </div>

                    {/* Doorstep Dynamic UPI Payment Preview */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-700">Doorstep Fixed Bill:</span>
                        <span className="font-mono font-black text-red-600">₹1,149.00</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-100">
                        <span>Pay via PhonePe / GPay QR</span>
                        <span className="text-emerald-600 font-bold">0% Gateway Fee</span>
                      </div>
                    </div>

                    {/* Interactive Simulator Tap Action */}
                    <button
                      onClick={onOpenSimulator}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-red-400" />
                      <span>Open Full Interactive App</span>
                    </button>

                  </div>

                  {/* App Screen Bottom Nav Bar */}
                  <div className="h-10 bg-white border-t border-slate-200 flex items-center justify-around text-[9px] font-bold text-slate-400">
                    <span className="text-red-600 font-black">Home</span>
                    <span>Bookings</span>
                    <span>Track</span>
                    <span>Profile</span>
                  </div>

                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-3 -right-3 bg-slate-900 border-2 border-emerald-500/80 text-white px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-[11px]">UDYAM-AP-05-0026516</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
