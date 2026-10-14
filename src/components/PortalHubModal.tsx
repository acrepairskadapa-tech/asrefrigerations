import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Bell, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Sparkles, 
  Lock, 
  Smartphone, 
  Navigation, 
  ExternalLink,
  RefreshCw,
  LogOut,
  ChevronRight,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { CityId, CITIES_DATA } from '../data/citiesData';
import { BookingLead, BookingStatus } from '../types/database';
import { bookingStore, CustomerUser, TECHNICIANS_REGISTRY } from '../services/bookingStore';
import { DynamicUpiPaymentModal } from './DynamicUpiPaymentModal';

interface PortalHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity?: CityId;
}

export const PortalHubModal: React.FC<PortalHubModalProps> = ({
  isOpen,
  onClose,
  selectedCity = 'kadapa'
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin' | 'partner' | 'architecture'>('customer');
  
  // State for Customer Auth
  const [customerSession, setCustomerSession] = useState<CustomerUser | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileInput, setMobileInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // State for Bookings & Dispatch
  const [bookingsList, setBookingsList] = useState<BookingLead[]>([]);
  const [adminCityFilter, setAdminCityFilter] = useState<'all' | CityId>('all');
  const [activePartnerTechId, setActivePartnerTechId] = useState<string>('tech-imran-02');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Doorstep Pricing & Dynamic UPI States
  const [selectedUpiBookingId, setSelectedUpiBookingId] = useState<string | null>(null);
  const [quotingBookingId, setQuotingBookingId] = useState<string | null>(null);
  const [quotedPriceInput, setQuotedPriceInput] = useState<string>('');
  const [quotedItemsInput, setQuotedItemsInput] = useState<string>('');

  const refreshData = () => {
    setCustomerSession(bookingStore.getCustomerSession());
    setBookingsList(bookingStore.getBookings());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Customer Auth Handlers
  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = bookingStore.loginCustomer(mobileInput, pinInput);
    if (res.success && res.user) {
      setCustomerSession(res.user);
      refreshData();
      showNotification(`Welcome back, ${res.user.name}!`);
    } else {
      setAuthError(res.error || 'Login failed. Please check mobile and PIN.');
    }
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (pinInput.trim().length < 4) {
      setAuthError('PIN must be at least 4 digits.');
      return;
    }
    const user = bookingStore.registerCustomer(mobileInput, nameInput, pinInput, selectedCity);
    setCustomerSession(user);
    refreshData();
    showNotification(`Account created! PIN set for ${user.mobile}.`);
  };

  const handleCustomerLogout = () => {
    bookingStore.logoutCustomer();
    setCustomerSession(null);
    setMobileInput('');
    setPinInput('');
    showNotification('Logged out successfully.');
  };

  const handleQuickCustomerLogin = (mobile: string, pin: string) => {
    setMobileInput(mobile);
    setPinInput(pin);
    const res = bookingStore.loginCustomer(mobile, pin);
    if (res.success && res.user) {
      setCustomerSession(res.user);
      refreshData();
      showNotification(`Logged in as ${res.user.name}`);
    }
  };

  // Admin Dispatch Handlers
  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    bookingStore.updateBookingStatus(bookingId, newStatus, 'Shaik Sameer (Admin)');
    refreshData();
    showNotification(`Booking #${bookingId} updated to: ${newStatus.replace(/_/g, ' ').toUpperCase()}`);
  };

  const handleClaimSameer = (bookingId: string) => {
    bookingStore.reassignTechnician(bookingId, 'tech-sameer-01', 'Claimed by Shaik Sameer (Priority 1)');
    refreshData();
    showNotification(`Booking #${bookingId} claimed by Shaik Sameer!`);
  };

  const handleDelegatePartner = (bookingId: string, techId: string) => {
    bookingStore.reassignTechnician(bookingId, techId, 'Delegated by Shaik Sameer');
    refreshData();
    const tech = TECHNICIANS_REGISTRY.find(t => t.id === techId);
    showNotification(`Booking #${bookingId} delegated to ${tech?.name}`);
  };

  const handleSaveFinalQuote = (bookingId: string) => {
    const price = parseFloat(quotedPriceInput);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid final quote amount.');
      return;
    }
    const items = quotedItemsInput.trim() 
      ? quotedItemsInput.split(',').map(s => {
          const parts = s.trim().split(':');
          return { item: parts[0]?.trim() || 'Spare / Service', price: parseFloat(parts[1]) || price };
        })
      : [{ item: 'Service & Genuine Replacement Spares', price }];

    bookingStore.setBookingFinalQuote(bookingId, price, items, 'Final Doorstep Quote Confirmed by Shaik Sameer');
    setQuotingBookingId(null);
    setQuotedPriceInput('');
    setQuotedItemsInput('');
    refreshData();
    showNotification(`Final quote of ₹${price} sent to customer!`);
  };

  const handleApproveQuote = (bookingId: string) => {
    bookingStore.approveBookingQuote(bookingId);
    refreshData();
    showNotification(`Quote approved! You can now scan the dynamic UPI QR.`);
  };

  if (!isOpen) return null;

  // Filtered bookings
  const filteredAdminBookings = bookingsList.filter(b => {
    if (adminCityFilter === 'all') return true;
    return b.city === adminCityFilter;
  });

  const customerBookings = customerSession 
    ? bookingsList.filter(b => b.customerMobile === customerSession.mobile)
    : [];

  const partnerBookings = bookingsList.filter(b => b.assignedTechnicianId === activePartnerTechId);

  // Status mapping helpers
  const statusMeta: Record<BookingStatus, { label: string; color: string; step: number }> = {
    booking_received: { label: 'Booking Received', color: 'bg-red-50 text-red-700 border-red-200', step: 1 },
    under_review: { label: 'Under Review', color: 'bg-amber-50 text-amber-700 border-amber-200', step: 2 },
    technician_assigned: { label: 'Technician Assigned', color: 'bg-blue-50 text-blue-700 border-blue-200', step: 3 },
    technician_on_the_way: { label: 'Technician on the Way', color: 'bg-purple-50 text-purple-700 border-purple-200', step: 4 },
    service_in_progress: { label: 'Service in Progress', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', step: 5 },
    completed: { label: 'Service Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', step: 6 },
    cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-700 border-slate-300', step: 0 }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-t-[32px] sm:rounded-3xl max-w-5xl w-full p-4 sm:p-7 text-left shadow-2xl relative border border-slate-200 mt-auto sm:my-6 max-h-[94vh] overflow-y-auto">
        
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-1 mb-3 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-800 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Notification Toast */}
        {notificationMsg && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xl text-xs font-bold border border-slate-700 animate-bounce flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{notificationMsg}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Backend Operations & Portal Hub
              </h3>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
                Sameer-First Engine
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Live PIN authentication, multi-city dispatch routing, and real-time service tracking.
            </p>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-6 text-xs font-black">
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-2.5 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'customer'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👤</span>
            <span>Customer Portal</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👑</span>
            <span>Sameer (Admin Dispatch)</span>
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`py-2.5 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'partner'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🛠️</span>
            <span>Technician Partner App</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-2.5 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📐</span>
            <span>System Rules</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: CUSTOMER PORTAL VIEW & PIN AUTH                          */}
        {/* ============================================================== */}
        {activeTab === 'customer' && (
          <div className="space-y-5">
            {!customerSession ? (
              /* LOGIN / REGISTER WITH PIN */
              <div className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-xs space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-slate-900 text-lg">
                    {authMode === 'login' ? 'Customer PIN Login' : 'Set Up Your PIN'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Use your registered mobile number. No SMS OTP wait required.
                  </p>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={authMode === 'login' ? handleCustomerLogin : handleCustomerRegister} className="space-y-3">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 bg-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (10 Digits)</label>
                    <input
                      type="tel"
                      placeholder="98480 11223"
                      value={mobileInput}
                      onChange={(e) => setMobileInput(e.target.value)}
                      maxLength={10}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">4-Digit Security PIN</label>
                    <input
                      type="password"
                      placeholder="••••"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      maxLength={6}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 bg-white tracking-widest text-center font-mono font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition"
                  >
                    {authMode === 'login' ? 'Sign In to My Bookings' : 'Save PIN & Sign In'}
                  </button>
                </form>

                {/* Switch between Login and Register */}
                <div className="text-center pt-2 border-t border-slate-200">
                  {authMode === 'login' ? (
                    <button
                      type="button"
                      onClick={() => { setAuthMode('register'); setAuthError(null); }}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      First time here? Register with your mobile number →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setAuthMode('login'); setAuthError(null); }}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      Already have a PIN? Sign in →
                    </button>
                  )}
                </div>

                {/* Quick 1-Click Demo Logins */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider mb-2">
                    Quick Test Accounts
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => handleQuickCustomerLogin('9848011223', '1234')}
                      className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-left transition"
                    >
                      <div className="font-bold text-slate-900 truncate">Ramesh Kumar</div>
                      <div className="text-[10px] text-slate-500">Kadapa • PIN: 1234</div>
                    </button>
                    <button
                      onClick={() => handleQuickCustomerLogin('9880522331', '1234')}
                      className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-left transition"
                    >
                      <div className="font-bold text-slate-900 truncate">Ananya Sharma</div>
                      <div className="text-[10px] text-slate-500">Bangalore • PIN: 1234</div>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* LOGGED IN CUSTOMER DASHBOARD */
              <div className="space-y-4">
                {/* Profile Card */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-sm">
                      {customerSession.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{customerSession.name}</h4>
                      <p className="text-xs text-slate-400">
                        +91 {customerSession.mobile} • Branch: <span className="capitalize text-red-400 font-bold">{customerSession.city}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Session Saved on Device
                    </span>
                    <button
                      onClick={handleCustomerLogout}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Active Bookings List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-slate-900 text-sm">Your Bookings & Doorstep Tracking</h5>
                    <span className="text-xs text-slate-500">{customerBookings.length} Bookings Found</span>
                  </div>

                  {customerBookings.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-2">No active bookings under this phone number yet.</p>
                      <p className="text-xs font-bold text-red-600">Book any AC or fridge service on the website to see real-time tracking here.</p>
                    </div>
                  ) : (
                    customerBookings.map((b) => {
                      const meta = statusMeta[b.status];
                      return (
                        <div key={b.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
                          
                          {/* Booking Top Info */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-sm">#{b.id}</span>
                                <span className="text-xs text-slate-500">• {b.applianceType}</span>
                              </div>
                              <h6 className="font-bold text-slate-800 text-sm mt-0.5">{b.serviceTitle}</h6>
                              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                <span>{b.locality}, {b.city.toUpperCase()} • Slot: {b.timeSlot}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${meta.color}`}>
                                {meta.label}
                              </span>
                              <div className="text-sm font-black text-slate-900 mt-1">₹{b.estimatedPrice}</div>
                            </div>
                          </div>

                          {/* 6-Stage Progress Stepper */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                              <span>Service Lifecycle</span>
                              <span className="text-red-600">Stage {meta.step} of 6</span>
                            </div>
                            <div className="grid grid-cols-6 gap-1 text-center text-[10px] font-bold">
                              {['Received', 'Review', 'Assigned', 'On the Way', 'In Progress', 'Done'].map((st, i) => {
                                const isCurrent = meta.step === i + 1;
                                const isPast = meta.step > i + 1;
                                return (
                                  <div
                                    key={st}
                                    className={`py-1.5 rounded-lg border transition ${
                                      isCurrent
                                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                                        : isPast
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                        : 'bg-slate-50 text-slate-400 border-slate-200'
                                    }`}
                                  >
                                    {isPast ? '✓ ' : ''}{st}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Assigned Technician Card */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                                b.isAssignedToSameer ? 'bg-red-600 shadow-sm' : 'bg-slate-800'
                              }`}>
                                {b.isAssignedToSameer ? 'SS' : 'PT'}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-slate-900">{b.assignedTechnicianName}</span>
                                  {b.isAssignedToSameer ? (
                                    <span className="px-2 py-0.2 rounded bg-red-100 text-red-700 font-extrabold text-[10px]">
                                      Master Lead Direct
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.2 rounded bg-blue-100 text-blue-700 font-extrabold text-[10px]">
                                      Certified Partner
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-500 text-[11px] mt-0.5">
                                  {b.isAssignedToSameer 
                                    ? '10+ Years HVAC Master • 100% Genuine Diagnosis' 
                                    : 'Vetted Field Specialist • Monitored by Shaik Sameer'}
                                </div>
                              </div>
                            </div>

                            <a
                              href={`tel:${b.assignedTechnicianPhone}`}
                              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Call {(b.assignedTechnicianName || 'Technician').split(' ')[0]}</span>
                            </a>
                          </div>

                          {/* Doorstep Quote Approval Banner (If Technician Set Final Quote) */}
                          {b.finalPrice && b.quoteStatus === 'pending' && (
                            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex flex-wrap items-center justify-between gap-2.5">
                              <div>
                                <span className="font-bold text-amber-950 text-xs block">
                                  ⚠️ Doorstep Diagnostic Quote Ready for Approval
                                </span>
                                <span className="text-[11px] text-amber-800">
                                  Technician verified fault. Fixed Final Bill: <strong className="text-slate-900 font-black">₹{b.finalPrice}</strong>
                                </span>
                              </div>
                              <button
                                onClick={() => handleApproveQuote(b.id)}
                                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                              >
                                ✓ Approve & Start Repair
                              </button>
                            </div>
                          )}

                          {/* Dynamic UPI Payment Button & Receipt Trigger */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div>
                              <span className="text-slate-400 text-[10px] block">Payment & Invoicing:</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`font-black ${b.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-slate-900'}`}>
                                  {b.paymentStatus === 'PAID' ? '✓ Verified Paid via UPI' : `Payable Total: ₹${b.finalPrice || b.estimatedPrice}`}
                                </span>
                                {b.finalPrice && (
                                  <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                                    Fixed by Tech
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedUpiBookingId(b.id)}
                              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 transition cursor-pointer"
                            >
                              <QrCode className="w-3.5 h-3.5 text-white" />
                              <span>{b.paymentStatus === 'PAID' ? 'View UPI Receipt' : `Pay via Dynamic UPI QR`}</span>
                            </button>
                          </div>

                          {/* Dispatcher Notes */}
                          {b.notes && (
                            <p className="text-[11px] text-slate-500 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                              ℹ️ <strong>Status Note:</strong> {b.notes}
                            </p>
                          )}

                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SHAIK SAMEER MASTER DISPATCH & ADMIN CONSOLE             */}
        {/* ============================================================== */}
        {activeTab === 'admin' && (
          <div className="space-y-4">
            {/* Header & City Filter */}
            <div className="p-4 rounded-2xl bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                  Master HVAC Lead Console
                </span>
                <h4 className="font-black text-base text-white">Shaik Sameer Dispatch Dashboard</h4>
                <p className="text-xs text-slate-400">
                  Priority 1: Sameer claims Kadapa leads • Priority 2: Delegate overflow to partner pool
                </p>
              </div>

              {/* City Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setAdminCityFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    adminCityFilter === 'all' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({bookingsList.length})
                </button>
                <button
                  onClick={() => setAdminCityFilter('kadapa')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    adminCityFilter === 'kadapa' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Kadapa ({bookingsList.filter(b => b.city === 'kadapa').length})
                </button>
                <button
                  onClick={() => setAdminCityFilter('bangalore')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    adminCityFilter === 'bangalore' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bangalore ({bookingsList.filter(b => b.city === 'bangalore').length})
                </button>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Sameer Priority 1 Jobs</div>
                <div className="text-xl font-black text-red-600 mt-1">
                  {bookingsList.filter(b => b.isAssignedToSameer).length} Active
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Partner Delegated</div>
                <div className="text-xl font-black text-blue-600 mt-1">
                  {bookingsList.filter(b => !b.isAssignedToSameer).length} Jobs
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Available Technicians</div>
                <div className="text-xl font-black text-emerald-600 mt-1">
                  {TECHNICIANS_REGISTRY.length} Verified
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Today's Total Value</div>
                <div className="text-xl font-black text-slate-900 mt-1">
                  ₹{bookingsList.reduce((acc, b) => acc + b.estimatedPrice, 0)}
                </div>
              </div>
            </div>

            {/* Dispatch Feed */}
            <div className="space-y-3">
              <h5 className="font-black text-slate-900 text-sm">Active Leads Queue</h5>
              
              {filteredAdminBookings.map((b) => {
                const meta = statusMeta[b.status];
                return (
                  <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 text-xs">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">#{b.id}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                          {b.city}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] ${meta.color}`}>
                          {meta.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">₹{b.estimatedPrice}</span>
                        <a
                          href={b.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-1 text-[11px]"
                        >
                          <MapPin className="w-3 h-3 text-red-600" />
                          <span>Maps Pin</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block">Customer:</span>
                        <strong className="text-slate-900">{b.customerName}</strong> ({b.customerMobile})
                      </div>
                      <div>
                        <span className="text-slate-400 block">Service & Slot:</span>
                        <strong className="text-slate-900">{b.serviceTitle}</strong> • {b.timeSlot}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block">Address:</span>
                        <span className="text-slate-800 font-medium">{b.fullAddress}</span>
                      </div>
                    </div>

                    {/* Dispatcher Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      
                      {/* Priority Assignment Controls */}
                      <div className="flex items-center gap-2">
                        {b.city === 'kadapa' && (
                          <>
                            {!b.isAssignedToSameer ? (
                              <button
                                onClick={() => handleClaimSameer(b.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition flex items-center gap-1 shadow-xs"
                              >
                                <span>👑</span>
                                <span>Claim (Sameer Priority 1)</span>
                              </button>
                            ) : (
                              <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-black border border-red-200">
                                ✓ Assigned to Sameer
                              </span>
                            )}

                            {/* Delegate dropdown */}
                            <select
                              onChange={(e) => {
                                if (e.target.value) handleDelegatePartner(b.id, e.target.value);
                              }}
                              defaultValue=""
                              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-700"
                            >
                              <option value="" disabled>Delegate to Partner...</option>
                              {TECHNICIANS_REGISTRY.filter(t => t.city === 'kadapa' && t.id !== 'tech-sameer-01').map(t => (
                                <option key={t.id} value={t.id}>{t.name} (Priority 2)</option>
                              ))}
                            </select>
                          </>
                        )}

                        {b.city === 'bangalore' && (
                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200">
                            Bangalore Branch ({b.assignedTechnicianName})
                          </span>
                        )}
                      </div>

                      {/* Advance Lifecycle Stage */}
                      <div className="flex items-center gap-2">
                        <label className="text-slate-400 font-semibold text-[11px]">Update Status:</label>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800"
                        >
                          <option value="booking_received">1. Booking Received</option>
                          <option value="under_review">2. Under Review</option>
                          <option value="technician_assigned">3. Technician Assigned</option>
                          <option value="technician_on_the_way">4. Technician on the Way</option>
                          <option value="service_in_progress">5. Service in Progress</option>
                          <option value="completed">6. Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Doorstep Pricing & Dynamic UPI QR Section */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mt-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Pricing & Spares</div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 font-semibold text-xs">
                                Est: ₹{b.estimatedPrice}
                              </span>
                              <span className="text-slate-400">→</span>
                              <span className={`font-black text-xs ${b.finalPrice ? 'text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded text-[11px]' : 'text-slate-500 italic'}`}>
                                {b.finalPrice ? `Fixed Final: ₹${b.finalPrice}` : 'Doorstep Quote Pending'}
                              </span>
                              {b.quoteStatus && (
                                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                                  b.quoteStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                                  b.quoteStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {b.quoteStatus.toUpperCase()}
                                </span>
                              )}
                              {b.paymentStatus === 'PAID' && (
                                <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                                  ✓ PAID
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (quotingBookingId === b.id) {
                                  setQuotingBookingId(null);
                                } else {
                                  setQuotingBookingId(b.id);
                                  setQuotedPriceInput(b.finalPrice ? String(b.finalPrice) : String(b.estimatedPrice));
                                  setQuotedItemsInput(b.quoteItemization ? b.quoteItemization.map(i => `${i.item}: ${i.price}`).join(', ') : '');
                                }
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 font-bold text-slate-700 text-xs transition cursor-pointer"
                            >
                              {quotingBookingId === b.id ? '✕ Cancel Quote' : (b.finalPrice ? '✏️ Edit Final Quote' : '⚡ Fix Final Quote')}
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedUpiBookingId(b.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>Show UPI QR (₹{b.finalPrice || b.estimatedPrice})</span>
                            </button>
                          </div>
                        </div>

                        {/* Inline Quote Editing Form */}
                        {quotingBookingId === b.id && (
                          <div className="p-3 bg-white rounded-xl border border-amber-300 space-y-2.5 mt-2 animate-fadeIn">
                            <div className="text-[11px] font-black text-amber-900 flex items-center gap-1">
                              <span>🔧 Set Final Doorstep Bill (Shaik Sameer / On-Site Technician)</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Final Total (₹):</label>
                                <input
                                  type="number"
                                  placeholder="e.g. 1149"
                                  value={quotedPriceInput}
                                  onChange={(e) => setQuotedPriceInput(e.target.value)}
                                  className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-black text-slate-900 focus:outline-none focus:border-red-500"
                                />
                              </div>
                              <div className="sm:col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Spares & Service Itemization:</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Capacitor 50mfd: 450, Gas Top-up: 699"
                                  value={quotedItemsInput}
                                  onChange={(e) => setQuotedItemsInput(e.target.value)}
                                  className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setQuotingBookingId(null)}
                                className="px-3 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveFinalQuote(b.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                              >
                                Save & Fix Price
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: PARTNER TECHNICIAN APP VIEW                              */}
        {/* ============================================================== */}
        {activeTab === 'partner' && (
          <div className="space-y-4 text-xs">
            {/* Technician Profile Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Technician Mobile App View
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h4 className="font-black text-base text-white">
                    {TECHNICIANS_REGISTRY.find(t => t.id === activePartnerTechId)?.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Certified Partner
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Fixed Rate Card • 100% Direct Payout • 0% Commission Deduction
                </p>
              </div>

              {/* Technician Switcher for Testing */}
              <div className="flex items-center gap-1.5">
                <label className="text-slate-400 text-xs">Switch Tech:</label>
                <select
                  value={activePartnerTechId}
                  onChange={(e) => setActivePartnerTechId(e.target.value)}
                  className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                >
                  {TECHNICIANS_REGISTRY.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.city.toUpperCase()})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assigned Jobs List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-black text-slate-900 text-sm">Your Dispatched Jobs</h5>
                <span className="text-xs text-slate-500">{partnerBookings.length} Assigned</span>
              </div>

              {partnerBookings.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-500 mb-2">No jobs currently delegated to this technician.</p>
                  <p className="font-bold text-slate-700">Shaik Sameer is handling Kadapa leads directly or awaiting overflow.</p>
                </div>
              ) : (
                partnerBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm">#{b.id}</span>
                        <h6 className="font-bold text-slate-800 mt-0.5">{b.serviceTitle}</h6>
                        <p className="text-slate-500 text-xs">{b.locality}, {b.city.toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {b.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                        <div className="text-sm font-black text-emerald-600 mt-1">₹{b.estimatedPrice} Net</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleStatusChange(b.id, 'technician_on_the_way')}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Start Journey</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'service_in_progress')}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>At Customer Doorstep</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedUpiBookingId(b.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black transition flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Show UPI QR (₹{b.finalPrice || b.estimatedPrice})</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'completed')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Finished</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SYSTEM RULES & BUSINESS ARCHITECTURE                     */}
        {/* ============================================================== */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <h4 className="font-black text-amber-950 text-sm flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                AS REFRIGERATION System Architecture & Operating Rules
              </h4>
              <p className="text-amber-900 leading-relaxed">
                Summary of the verified decisions codified across the website, database models, and upcoming mobile applications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                  <h5 className="font-black text-slate-900 text-sm">Sameer-First Priority Dispatch</h5>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Shaik Sameer is the primary master technician for Kadapa. All incoming Kadapa bookings are allocated to him as <strong>Priority 1</strong> by default. When Sameer is on another job or chooses to delegate, the job is routed to vetted <strong>Priority 2 partner mechanics</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                  <h5 className="font-black text-slate-900 text-sm">Zero-SMS PIN Authentication</h5>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Eliminates SMS gateway recurring charges and deliverability failures. Customer mobile number serves as the unique ID, and a 4-digit PIN is chosen during first onboarding. Sessions are cached persistently on device storage.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                  <h5 className="font-black text-slate-900 text-sm">Multi-City Branch Boundaries</h5>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Kadapa:</strong> Mariapuram / Lohiya Nagar Flagship HQ (19 wards).<br/>
                  <strong>Bangalore:</strong> Kammanahalli Branch (#2 Sree Residency, 25 localities).<br/>
                  Pre-indexed localities prevent expensive Google Maps API reverse-geocoding calls.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">4</span>
                  <h5 className="font-black text-slate-900 text-sm">Warranty Generator Removed</h5>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Per customer direction, digital warranty card generation has been completely eliminated. Replaced with straightforward digital payment receipts and verbal 30-day workmanship guarantee.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Enterprise Verified: <strong>AS REFRIGERATION</strong></span>
              </div>
              <span className="text-slate-400">Option 2 Commercial Roadmap</span>
            </div>

          </div>
        )}
      </div>

      {/* Dynamic NPCI Zero-Commission UPI QR Payment Modal */}
      <DynamicUpiPaymentModal
        isOpen={!!selectedUpiBookingId}
        onClose={() => {
          setSelectedUpiBookingId(null);
          refreshData();
        }}
        bookingId={selectedUpiBookingId}
        onPaymentSuccess={() => {
          refreshData();
          showNotification('Payment verified via UPI!');
        }}
      />
    </div>
  );
};
