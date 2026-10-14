import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  User, 
  Sparkles,
  ArrowRight,
  MessageSquare,
  Wrench,
  Zap,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';
import { Language } from '../data/translations';
import { CityId, CITIES_DATA } from '../data/citiesData';
import { bookingStore } from '../services/bookingStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  selectedCity?: CityId;
  onSelectCity?: (city: CityId) => void;
  preSelectedService?: ServiceItem | null;
  preSelectedQuantity?: number;
  preSelectedPrice?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  selectedCity = 'kadapa',
  onSelectCity,
  preSelectedService,
  preSelectedQuantity = 1,
  preSelectedPrice
}) => {
  const [modalCity, setModalCity] = useState<CityId>(selectedCity);
  const cityConfig = CITIES_DATA[modalCity];

  // Booking mode: Express 60-min priority dispatch (default) vs scheduled
  const [isExpressMode, setIsExpressMode] = useState<boolean>(true);

  const [selectedService, setSelectedService] = useState<ServiceItem>(
    preSelectedService || SERVICES_DATA[1] // Default to AC Jet Wash
  );
  const [quantity, setQuantity] = useState<number>(preSelectedQuantity);
  const [slot, setSlot] = useState<string>('Immediate Urgent Visit (Within 60 Mins)');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [area, setArea] = useState<string>(cityConfig.localities[0]);
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const [gpsStatusText, setGpsStatusText] = useState<string | null>(null);

  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');

  useEffect(() => {
    if (selectedCity) {
      setModalCity(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    setArea(CITIES_DATA[modalCity].localities[0]);
  }, [modalCity]);

  // Auto-restore customer contact from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('as_last_booking_contact');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && !customerName) setCustomerName(parsed.name);
        if (parsed.phone && !customerPhone) setCustomerPhone(parsed.phone);
        if (parsed.street && !streetAddress) setStreetAddress(parsed.street);
        if (parsed.area && CITIES_DATA[modalCity].localities.includes(parsed.area)) {
          setArea(parsed.area);
        }
      }
    } catch {}
  }, [modalCity]);

  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
    }
    if (preSelectedQuantity) {
      setQuantity(preSelectedQuantity);
    }
  }, [preSelectedService, preSelectedQuantity]);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'INSTA100') {
      setDiscount(100);
      setCouponMessage('🎉 ₹100 Instagram Follower Discount Applied!');
    } else {
      setDiscount(0);
      setCouponMessage('❌ Invalid Code. Follow @asrefrigerations.kadapa & use INSTA100');
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('GPS is not supported by your browser.');
      return;
    }
    setLocating(true);
    setGpsStatusText('Capturing high-accuracy device GPS...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setGpsCoords({ lat, lng });
        setGpsStatusText(`GPS Captured (${lat.toFixed(4)}, ${lng.toFixed(4)}). Finding street...`);

        try {
          // Free Nominatim reverse geocoding (zero cost)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const streetParts = [addr.house_number, addr.road, addr.suburb || addr.neighbourhood].filter(Boolean);
            if (streetParts.length > 0) {
              setStreetAddress(streetParts.join(', '));
            }

            // Auto-match locality in Kadapa / Bangalore
            const rawLoc = addr.suburb || addr.neighbourhood || addr.city_district || addr.locality || '';
            if (rawLoc) {
              const matched = cityConfig.localities.find(
                (loc) => loc.toLowerCase().includes(rawLoc.toLowerCase()) || rawLoc.toLowerCase().includes(loc.toLowerCase())
              );
              if (matched) {
                setArea(matched);
              }
            }
          }
        } catch {
          // Keep raw coordinates if offline or network blocks reverse geocoder
        }

        setLocating(false);
        setGpsStatusText(`✓ GPS Verified (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}) • Shaik Sameer gets 1-tap route`);
      },
      () => {
        setLocating(false);
        setGpsStatusText('Could not detect location. Please type your street/landmark.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  if (!isOpen) return null;

  const rawTotal = preSelectedPrice || selectedService.price * quantity;
  const calculatedTotal = Math.max(350, rawTotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) {
      alert('Please enter your WhatsApp phone number.');
      return;
    }

    const effectiveDate = isExpressMode ? 'Today' : (date || 'Today');
    const effectiveSlot = isExpressMode ? 'Immediate Urgent Visit (Within 60 Mins)' : slot;
    const mapsLink = gpsCoords ? `https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}` : undefined;

    // Save contact locally for 1-tap future auto-fills
    try {
      localStorage.setItem('as_last_booking_contact', JSON.stringify({
        name: customerName.trim(),
        phone: customerPhone.trim(),
        street: streetAddress.trim(),
        area
      }));
    } catch {}

    // Save to centralized Booking Store with Sameer-First Priority Dispatch
    const savedBooking = bookingStore.createBooking({
      customerName: customerName.trim() || 'Customer',
      customerMobile: customerPhone.trim(),
      serviceTitle: selectedService.name,
      applianceType: selectedService.category.toUpperCase(),
      city: modalCity,
      locality: area || cityConfig.localities[0],
      fullAddress: streetAddress ? `${streetAddress}, ${area}, ${cityConfig.name}` : `${area}, ${cityConfig.name}`,
      latitude: gpsCoords?.lat,
      longitude: gpsCoords?.lng,
      date: effectiveDate,
      timeSlot: effectiveSlot,
      estimatedPrice: calculatedTotal
    });

    const generatedId = savedBooking.id;
    setBookingId(generatedId);
    setBookingSuccess(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Send formatted WhatsApp notification directly to Shaik Sameer / Branch
    const msg = `*🚨 NEW DOORSTEP BOOKING - AS REFRIGERATIONS*\n` +
      `Booking ID: ${generatedId}\n` +
      `Mode: ${isExpressMode ? "⚡ 60-MIN EXPRESS ARRIVAL" : "📅 Scheduled Visit"}\n` +
      `City / Branch: ${cityConfig.name} (${cityConfig.workshopName})\n` +
      `Customer: ${customerName || 'Customer'}\n` +
      `Phone: ${customerPhone}\n` +
      `Service: ${selectedService.name} (Qty: ${quantity})\n` +
      `Estimated Amount: Rs. ${calculatedTotal} (Pay After Service via UPI)\n` +
      `Date & Slot: ${effectiveDate} [${effectiveSlot}]\n` +
      `Locality: ${area}\n` +
      `Full Address: ${streetAddress || cityConfig.name}\n` +
      (mapsLink ? `Google Maps GPS: ${mapsLink}\n` : '') +
      `Notes: ${notes || 'None'}\n\n` +
      `Please dispatch technician.`;

    const waUrl = `https://wa.me/${cityConfig.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const handleResetAndClose = () => {
    setBookingSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="ios-sheet sm:bg-white rounded-t-[34px] sm:rounded-[32px] max-w-xl w-full p-5 sm:p-8 text-left shadow-2xl relative border-t sm:border border-slate-200/90 mt-auto sm:my-8 max-h-[92vh] overflow-y-auto">
        {/* Mobile Sheet Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-1 mb-3 sm:hidden" />
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-800 font-black text-xl cursor-pointer w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ios-tap"
        >
          ✕
        </button>

        {!bookingSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Book Doorstep Service • {cityConfig.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {cityConfig.workshopName} • {cityConfig.expressDispatchTime}
                </p>
              </div>
            </div>

            {/* City Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mb-3">
              <button
                type="button"
                onClick={() => {
                  setModalCity('kadapa');
                  if (onSelectCity) onSelectCity('kadapa');
                }}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalCity === 'kadapa' ? 'bg-red-600 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Kadapa (HQ)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalCity('bangalore');
                  if (onSelectCity) onSelectCity('bangalore');
                }}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalCity === 'bangalore' ? 'bg-red-600 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Bangalore (Branch)</span>
              </button>
            </div>

            {/* Fast-Track Mode Toggle: Express 60-Min vs Custom Schedule */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-4 text-xs font-black">
              <button
                type="button"
                onClick={() => setIsExpressMode(true)}
                className={`py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isExpressMode ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>⚡ Express 60-Min</span>
                <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-black">Fastest</span>
              </button>
              <button
                type="button"
                onClick={() => setIsExpressMode(false)}
                className={`py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isExpressMode ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>📅 Schedule Later</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service & Estimated Price Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-red-50/30 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Service</div>
                    <div className="text-sm font-black text-slate-900">{selectedService.name}</div>
                    <div className="text-xs text-slate-500">{selectedService.duration} • 30-Day Workmanship Guarantee</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">Estimated Price</div>
                    <div className="text-xl font-black text-red-600 mt-0.5">₹{calculatedTotal}</div>
                  </div>
                </div>

                {isExpressMode && (
                  <div className="text-[11px] text-red-700 bg-red-100/60 p-2 rounded-xl flex items-center gap-1.5 font-bold">
                    <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                    <span>Express Priority: Shaik Sameer & Team arriving today within 60 mins.</span>
                  </div>
                )}
              </div>

              {/* Date & Slot (Only displayed if customer selects "Schedule Later") */}
              {!isExpressMode && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Preferred Time Slot
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-semibold"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="Evening (3:00 PM - 7:00 PM)">Evening (3:00 PM - 7:00 PM)</option>
                      <option value="Immediate Urgent Visit (Within 60 Mins)">Urgent (Within 60 Mins)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Customer Contact - Placed Prominently */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-black text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shaik Mehraj"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* 1-Tap Mobile GPS Auto-Fetch Card */}
              <div 
                onClick={!locating ? handleDetectLocation : undefined}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  gpsCoords 
                    ? 'bg-emerald-50 border-emerald-300' 
                    : 'bg-blue-50/90 hover:bg-blue-100/80 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    gpsCoords ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${gpsCoords ? 'text-emerald-900' : 'text-blue-900'}`}>
                      {gpsCoords ? '✓ Exact Doorstep Location Attached' : '📍 Auto-Fetch Exact Address via Mobile GPS'}
                    </h5>
                    <p className={`text-[11px] ${gpsCoords ? 'text-emerald-700' : 'text-blue-700'}`}>
                      {gpsStatusText || "Tap to auto-detect house, street & closest locality for Sameer's 1-tap route"}
                    </p>
                  </div>
                </div>
                {!gpsCoords && !locating && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-600 text-white shrink-0">
                    AUTO-FILL
                  </span>
                )}
              </div>

              {/* Locality in Selected City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  1. Locality in {cityConfig.name}
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-semibold"
                >
                  {cityConfig.localities.map((ar) => (
                    <option key={ar} value={ar}>
                      {ar}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  House / Landmark / Street Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Mariapuram Church, Pulivendula Road"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>
                    {isExpressMode ? "Confirm 60-Min Doorstep Dispatch" : "Confirm Doorstep Service Booking"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  🔒 Zero advance payment. Pay technician on completion via UPI QR.
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Booking Success Card */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs font-black uppercase text-emerald-600 tracking-wider">Booking Confirmed!</div>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">Technician Dispatched</h3>
              <p className="text-xs text-slate-500 mt-1">
                Booking ID: <strong className="text-slate-900">{bookingId}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Total:</span>
                <span className="font-bold text-red-600">₹{calculatedTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dispatched To:</span>
                <span className="font-bold text-slate-900">{area}, {cityConfig.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Master Lead:</span>
                <span className="font-bold text-emerald-600">Shaik Sameer & Team</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={`https://wa.me/${cityConfig.phoneRaw}?text=Hi%20Shaik%20Sameer,%20I%20have%20booked%20service%20${bookingId}%20for%20${area}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Sameer on WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
