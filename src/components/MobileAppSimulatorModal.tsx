import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Wrench, 
  User, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Star, 
  Navigation, 
  Layers, 
  ArrowRight, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Bell, 
  ChevronRight,
  Lock,
  LogOut,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { CityId, CITIES_DATA } from '../data/citiesData';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';
import { BookingLead, BookingStatus } from '../types/database';
import { bookingStore, CustomerUser, TECHNICIANS_REGISTRY } from '../services/bookingStore';

interface MobileAppSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity?: CityId;
  onSelectCity?: (city: CityId) => void;
  onOpenWebBooking?: () => void;
}

export const MobileAppSimulatorModal: React.FC<MobileAppSimulatorModalProps> = ({
  isOpen,
  onClose,
  selectedCity = 'kadapa',
  onSelectCity,
  onOpenWebBooking
}) => {
  // App switcher: 'customer' or 'partner'
  const [activeApp, setActiveApp] = useState<'customer' | 'partner'>('customer');

  // Customer App States
  const [customerTab, setCustomerTab] = useState<'home' | 'bookings' | 'profile'>('home');
  const [appCity, setAppCity] = useState<CityId>(selectedCity);
  const [customerSession, setCustomerSession] = useState<CustomerUser | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [mobileInput, setMobileInput] = useState('9848011223');
  const [customerSearch, setCustomerSearch] = useState('');
  const [allBookings, setAllBookings] = useState<BookingLead[]>([]);

  // Partner App States
  const [partnerTab, setPartnerTab] = useState<'leads' | 'active' | 'earnings'>('leads');
  const [partnerTechId, setPartnerTechId] = useState<string>('tech-sameer-01');
  const [isOnline, setIsOnline] = useState(true);
  const [simulatedAcceptedId, setSimulatedAcceptedId] = useState<string | null>(null);

  // Sync data on open
  useEffect(() => {
    if (isOpen) {
      setCustomerSession(bookingStore.getCustomerSession());
      setAllBookings(bookingStore.getBookings());
      setAppCity(selectedCity);
    }
  }, [isOpen, selectedCity]);

  const refreshAll = () => {
    setCustomerSession(bookingStore.getCustomerSession());
    setAllBookings(bookingStore.getBookings());
  };

  if (!isOpen) return null;

  const currentCityConfig = CITIES_DATA[appCity];
  const activeTech = TECHNICIANS_REGISTRY.find(t => t.id === partnerTechId) || TECHNICIANS_REGISTRY[0];

  // Customer Bookings
  const myBookings = customerSession 
    ? allBookings.filter(b => b.customerMobile === customerSession.mobile)
    : allBookings.filter(b => b.city === appCity).slice(0, 2);

  const activeCustomerBooking = myBookings.find(b => b.status !== 'completed' && b.status !== 'cancelled') || myBookings[0];

  // Partner Leads for current technician
  const partnerLeads = allBookings.filter(b => {
    if (partnerTechId === 'tech-sameer-01') {
      // Sameer sees all Kadapa leads (Priority 1)
      return b.city === 'kadapa';
    }
    return b.assignedTechnicianId === partnerTechId;
  });

  // Filtered Services for Customer Search
  const filteredServices = SERVICES_DATA.filter(s => 
    s.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(customerSearch.toLowerCase())
  ).slice(0, 4);

  // Status mapping
  const statusLabels: Record<BookingStatus, { label: string; color: string; step: number }> = {
    booking_received: { label: 'Booking Received', color: 'bg-red-500 text-white', step: 1 },
    under_review: { label: 'Under Review', color: 'bg-amber-500 text-white', step: 2 },
    technician_assigned: { label: 'Technician Assigned', color: 'bg-blue-600 text-white', step: 3 },
    technician_on_the_way: { label: 'On The Way (ETA 18m)', color: 'bg-purple-600 text-white', step: 4 },
    service_in_progress: { label: 'Service In Progress', color: 'bg-indigo-600 text-white', step: 5 },
    completed: { label: 'Service Completed', color: 'bg-emerald-600 text-white', step: 6 },
    cancelled: { label: 'Cancelled', color: 'bg-slate-400 text-white', step: 0 }
  };

  const handleSimulatedLogin = (mob: string, pin: string) => {
    const res = bookingStore.loginCustomer(mob, pin);
    if (res.success && res.user) {
      setCustomerSession(res.user);
      refreshAll();
    }
  };

  const handleSimulatedLogout = () => {
    bookingStore.logoutCustomer();
    setCustomerSession(null);
    refreshAll();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 text-white relative my-auto max-h-[96vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white font-black text-xl w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Modal Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Urban Company-Inspired Mobile Applications
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Android & iOS Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive simulator of the two dedicated mobile applications requested for AS REFRIGERATION.
              </p>
            </div>
          </div>

          {/* App Switcher Tabs */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveApp('customer')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeApp === 'customer'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>👤</span>
              <span>1. Customer App</span>
            </button>
            <button
              onClick={() => setActiveApp('partner')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeApp === 'partner'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🛠️</span>
              <span>2. Partner & Tech App</span>
            </button>
          </div>
        </div>

        {/* Simulator Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT: Context & Technical Features (4 Cols) */}
          <div className="lg:col-span-5 space-y-3.5 text-xs text-slate-300 order-2 lg:order-1">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>{activeApp === 'customer' ? '📱 Customer App Architecture' : '🛠️ Partner App Architecture'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {activeApp === 'customer'
                  ? 'Designed for rapid 30-second bookings, pre-indexed locality lookup (no map reverse-geocoding billing), persistent 4-digit PIN authentication (zero SMS cost), and live doorstep arrival tracking.'
                  : 'Empowers Shaik Sameer (Priority 1 Lead Master) and vetted partner technicians with on-duty toggles, GPS navigation links, one-click stage progression, and 100% rate-card earnings with no commissions.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Key Specifications</span>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero SMS Gateway:</strong> Secure PIN auth retained permanently.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Sameer-First Engine:</strong> Priority 1 claim for Kadapa town.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Dual City Boundaries:</strong> Kadapa HQ & Bangalore Branch.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Play Console Ready:</strong> UDYAM Organization Account.</span>
                </li>
              </ul>
            </div>

            {/* Quick Interactive Actions */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Switch App Mode:</span>
                <span className="text-xs font-bold text-white capitalize">{activeApp} Application View</span>
              </div>
              <button
                onClick={() => setActiveApp(activeApp === 'customer' ? 'partner' : 'customer')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
              >
                Switch View →
              </button>
            </div>
          </div>

          {/* RIGHT: Photorealistic Mobile Phone Bezel (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            
            {/* Phone Exterior Frame */}
            <div className="w-[340px] sm:w-[370px] h-[640px] bg-slate-950 rounded-[46px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col overflow-hidden ring-1 ring-white/10">
              
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Status Bar */}
              <div className="h-6 w-full flex items-center justify-between px-6 text-[10px] text-slate-300 font-bold z-30 pt-1 shrink-0">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-[9px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* PHONE SCREEN CONTENT AREA */}
              <div className="flex-1 bg-white text-slate-900 rounded-[34px] overflow-hidden flex flex-col relative mt-1">

                {/* ============================================================== */}
                {/* 1. CUSTOMER APP SCREEN                                         */}
                {/* ============================================================== */}
                {activeApp === 'customer' && (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    
                    {/* Customer App Top Header */}
                    <div className="bg-slate-900 text-white px-4 pt-3 pb-3 shrink-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          <button
                            onClick={() => {
                              const nextCity = appCity === 'kadapa' ? 'bangalore' : 'kadapa';
                              setAppCity(nextCity);
                              if (onSelectCity) onSelectCity(nextCity);
                            }}
                            className="text-xs font-black tracking-tight text-white flex items-center gap-1 hover:text-red-400 transition"
                          >
                            <span>{currentCityConfig.displayName}</span>
                            <span className="text-[10px] text-slate-400">▼</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {customerSession ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-400 border border-red-500/40">
                              {customerSession.name.split(' ')[0]}
                            </span>
                          ) : (
                            <button
                              onClick={() => setCustomerTab('profile')}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300"
                            >
                              Sign In
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search AC Jet wash, Fridge gas refilling..."
                          value={customerSearch}
                          onChange={(e) => setCustomerSearch(e.target.value)}
                          className="w-full bg-slate-800 text-white pl-8 pr-3 py-1.5 rounded-xl text-[11px] focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Scrollable Customer Screen Body */}
                    <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
                      
                      {customerTab === 'home' && (
                        <>
                          {/* Live Sticky Tracking Card (If booking active) */}
                          {activeCustomerBooking && (
                            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md space-y-2">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-extrabold flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                                  Live Booking Status
                                </span>
                                <span className="bg-white/20 px-2 py-0.5 rounded-full font-mono font-bold text-[10px]">
                                  #{activeCustomerBooking.id}
                                </span>
                              </div>

                              <div className="bg-white text-slate-900 p-2.5 rounded-xl text-[11px] space-y-1.5">
                                <div className="font-bold text-xs truncate">{activeCustomerBooking.serviceTitle}</div>
                                <div className="flex items-center justify-between text-slate-500 text-[10px]">
                                  <span>Status:</span>
                                  <span className="font-bold text-red-600 uppercase">
                                    {activeCustomerBooking.status.replace(/_/g, ' ')}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                                  <span className="text-slate-600 font-medium truncate">
                                    Tech: <strong>{activeCustomerBooking.assignedTechnicianName}</strong>
                                  </span>
                                  <a
                                    href={`tel:${activeCustomerBooking.assignedTechnicianPhone}`}
                                    className="px-2 py-1 rounded bg-slate-900 text-white font-bold text-[10px] flex items-center gap-1"
                                  >
                                    <Phone className="w-2.5 h-2.5" />
                                    <span>Call</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Quick Category Icons (Urban Company Style) */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-black text-slate-900 text-xs">Appliance Services</span>
                              <span className="text-[10px] text-red-600 font-bold">60-Min Arrival</span>
                            </div>

                            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                              <button
                                onClick={onOpenWebBooking}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 flex flex-col items-center gap-1 transition"
                              >
                                <span className="text-base">❄️</span>
                                <span className="font-bold text-slate-800 leading-tight">AC Service</span>
                              </button>
                              <button
                                onClick={onOpenWebBooking}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 flex flex-col items-center gap-1 transition"
                              >
                                <span className="text-base">🧊</span>
                                <span className="font-bold text-slate-800 leading-tight">Fridge</span>
                              </button>
                              <button
                                onClick={onOpenWebBooking}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 flex flex-col items-center gap-1 transition"
                              >
                                <span className="text-base">🧺</span>
                                <span className="font-bold text-slate-800 leading-tight">Washing</span>
                              </button>
                              <button
                                onClick={onOpenWebBooking}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 flex flex-col items-center gap-1 transition"
                              >
                                <span className="text-base">🏢</span>
                                <span className="font-bold text-slate-800 leading-tight">AMC</span>
                              </button>
                            </div>
                          </div>

                          {/* Service Cards Feed */}
                          <div className="space-y-2">
                            <span className="font-black text-slate-900 text-xs block">Popular in {currentCityConfig.name}</span>
                            {filteredServices.map(s => (
                              <div key={s.id} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2 shadow-xs">
                                <div>
                                  <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">⏱️ 45-60 Mins • Genuine Spares</div>
                                  <div className="font-black text-red-600 text-xs mt-0.5">₹{s.price}</div>
                                </div>
                                <button
                                  onClick={onOpenWebBooking}
                                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-xs shrink-0"
                                >
                                  Book
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Trust Assurance Badge */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-[10px] text-slate-600">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Verified under <strong>UDYAM-AP-05-0026516</strong> • Master Lead Shaik Sameer</span>
                          </div>
                        </>
                      )}

                      {customerTab === 'bookings' && (
                        <div className="space-y-3">
                          <span className="font-black text-slate-900 text-xs block">Service History & Tracking</span>
                          {myBookings.map(b => (
                            <div key={b.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-bold text-slate-900">#{b.id}</span>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-700 border border-red-200">
                                  {b.status.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <div className="font-bold text-slate-800 text-xs">{b.serviceTitle}</div>
                              <div className="text-[10px] text-slate-500">📍 {b.locality}, {b.city.toUpperCase()}</div>
                              <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
                                <span className="text-slate-500">Assigned: <strong>{b.assignedTechnicianName}</strong></span>
                                <span className="font-bold text-red-600">₹{b.estimatedPrice}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {customerTab === 'profile' && (
                        <div className="space-y-3">
                          {customerSession ? (
                            <div className="space-y-3 text-center py-2">
                              <div className="w-12 h-12 rounded-full bg-red-600 text-white font-black text-base flex items-center justify-center mx-auto">
                                {customerSession.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm">{customerSession.name}</h4>
                                <p className="text-[11px] text-slate-500">+91 {customerSession.mobile}</p>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold capitalize">
                                  City: {customerSession.city}
                                </span>
                              </div>

                              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] text-left">
                                ✓ <strong>Zero-SMS Session Active:</strong> Logged in via 4-digit PIN. Session permanently cached on device storage.
                              </div>

                              <button
                                onClick={handleSimulatedLogout}
                                className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                              >
                                Sign Out
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2 py-2">
                              <h4 className="font-bold text-slate-900 text-xs text-center">PIN Login</h4>
                              <p className="text-[10px] text-slate-500 text-center">Mobile number + 4-digit PIN</p>
                              
                              <input
                                type="tel"
                                placeholder="10-Digit Mobile"
                                value={mobileInput}
                                onChange={(e) => setMobileInput(e.target.value)}
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                              />
                              <input
                                type="password"
                                placeholder="4-Digit PIN (1234)"
                                value={pinInput}
                                onChange={(e) => setPinInput(e.target.value)}
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-mono text-center tracking-widest"
                              />
                              <button
                                onClick={() => handleSimulatedLogin(mobileInput, pinInput || '1234')}
                                className="w-full py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
                              >
                                Login
                              </button>

                              <div className="pt-2 text-center text-[10px]">
                                <button
                                  onClick={() => handleSimulatedLogin('9848011223', '1234')}
                                  className="text-red-600 underline font-bold"
                                >
                                  Quick Login: Ramesh (Kadapa)
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                    {/* Customer Bottom Navigation Bar */}
                    <div className="h-12 bg-white border-t border-slate-200 flex items-center justify-around text-[10px] font-bold text-slate-400 shrink-0">
                      <button
                        onClick={() => setCustomerTab('home')}
                        className={`flex flex-col items-center ${customerTab === 'home' ? 'text-red-600' : 'hover:text-slate-600'}`}
                      >
                        <span className="text-sm">🏠</span>
                        <span>Explore</span>
                      </button>
                      <button
                        onClick={() => setCustomerTab('bookings')}
                        className={`flex flex-col items-center ${customerTab === 'bookings' ? 'text-red-600' : 'hover:text-slate-600'}`}
                      >
                        <span className="text-sm">📋</span>
                        <span>Bookings</span>
                      </button>
                      <button
                        onClick={() => setCustomerTab('profile')}
                        className={`flex flex-col items-center ${customerTab === 'profile' ? 'text-red-600' : 'hover:text-slate-600'}`}
                      >
                        <span className="text-sm">👤</span>
                        <span>Account</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* ============================================================== */}
                {/* 2. PARTNER & TECHNICIAN APP SCREEN                             */}
                {/* ============================================================== */}
                {activeApp === 'partner' && (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    
                    {/* Partner App Top Header */}
                    <div className="bg-slate-950 text-white px-4 pt-3 pb-3 shrink-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                            Partner Technician App
                          </div>
                          <div className="font-extrabold text-xs text-white flex items-center gap-1.5 mt-0.5">
                            <span>{activeTech.name}</span>
                            {activeTech.isMasterLead && (
                              <span className="bg-red-600 text-[9px] px-1.5 py-0.2 rounded font-black">
                                Master
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Online / Offline Toggle */}
                        <button
                          onClick={() => setIsOnline(!isOnline)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition ${
                            isOnline
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
                          <span>{isOnline ? 'Online' : 'Offline'}</span>
                        </button>
                      </div>

                      {/* Tech Role Switcher */}
                      <div className="flex items-center justify-between bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px]">
                        <span className="text-slate-400">Switch Tech:</span>
                        <select
                          value={partnerTechId}
                          onChange={(e) => setPartnerTechId(e.target.value)}
                          className="bg-transparent text-white font-bold text-[10px] focus:outline-none"
                        >
                          <option value="tech-sameer-01">Shaik Sameer (Master Priority 1)</option>
                          <option value="tech-imran-02">Shaik Imran (Partner Priority 2)</option>
                          <option value="tech-bangalore-prasad-04">M. Prasad (Bangalore Lead)</option>
                        </select>
                      </div>
                    </div>

                    {/* Partner Screen Body */}
                    <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
                      
                      {/* Metric Row */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">Today's Jobs</span>
                          <span className="text-sm font-black text-slate-900">{partnerLeads.length} Assigned</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">Est. Payout</span>
                          <span className="text-sm font-black text-emerald-600">
                            ₹{partnerLeads.reduce((a, b) => a + b.estimatedPrice, 0)}
                          </span>
                        </div>
                      </div>

                      {/* Priority Dispatch Feed */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                          <span>Incoming Leads Feed</span>
                          <span className="text-[10px] text-red-600">{partnerLeads.length} Leads</span>
                        </div>

                        {partnerLeads.length === 0 ? (
                          <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-xl">
                            No active leads assigned.
                          </div>
                        ) : (
                          partnerLeads.map(b => (
                            <div key={b.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2 text-xs">
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-extrabold text-slate-900">#{b.id}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  {b.status.replace(/_/g, ' ')}
                                </span>
                              </div>

                              <div>
                                <div className="font-bold text-slate-800 text-xs">{b.serviceTitle}</div>
                                <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-red-600" />
                                  <span>{b.locality}, {b.city.toUpperCase()}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 mt-0.5">
                                  Customer: <strong>{b.customerName}</strong> ({b.customerMobile})
                                </div>
                              </div>

                              {/* Action Buttons for Technician */}
                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 text-[10px]">
                                <a
                                  href={b.googleMapsUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2 py-1 rounded bg-slate-100 text-slate-800 font-bold flex items-center gap-1"
                                >
                                  <Navigation className="w-3 h-3 text-blue-600" />
                                  <span>Route</span>
                                </a>

                                {partnerTechId === 'tech-sameer-01' ? (
                                  <div className="flex items-center gap-1">
                                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-bold">
                                      Sameer Priority 1
                                    </span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setSimulatedAcceptedId(b.id)}
                                    className={`px-3 py-1 rounded font-bold transition ${
                                      simulatedAcceptedId === b.id
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-900 text-white hover:bg-emerald-600'
                                    }`}
                                  >
                                    {simulatedAcceptedId === b.id ? '✓ Accepted' : 'Accept Job'}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                    </div>

                    {/* Partner Bottom Navigation Bar */}
                    <div className="h-12 bg-white border-t border-slate-200 flex items-center justify-around text-[10px] font-bold text-slate-400 shrink-0">
                      <button
                        onClick={() => setPartnerTab('leads')}
                        className={`flex flex-col items-center ${partnerTab === 'leads' ? 'text-emerald-600' : 'hover:text-slate-600'}`}
                      >
                        <span className="text-sm">⚡</span>
                        <span>Leads</span>
                      </button>
                      <button
                        onClick={() => setPartnerTab('active')}
                        className={`flex flex-col items-center ${partnerTab === 'active' ? 'text-emerald-600' : 'hover:text-slate-600'}`}
                      >
                        <span className="text-sm">🧭</span>
                        <span>Active Job</span>
                      </button>
                      <button
                        onClick={() => setPartnerTab('earnings')}
                        className={`flex flex-col items-center ${partnerTab === 'earnings' ? 'text-emerald-600' : 'hover:text-slate-600'}`}
                      >
                        <span className="text-sm">💰</span>
                        <span>Earnings</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="h-4 w-full flex items-center justify-center shrink-0">
                <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Google Play Store Package: <strong>com.asrefrigerations.customer</strong> & <strong>com.asrefrigerations.partner</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition"
          >
            Close Simulator
          </button>
        </div>

      </div>
    </div>
  );
};
