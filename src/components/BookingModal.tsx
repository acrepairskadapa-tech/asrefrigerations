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
  Wrench
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

  const [selectedService, setSelectedService] = useState<ServiceItem>(
    preSelectedService || SERVICES_DATA[1] // Default to AC Jet Wash
  );
  const [quantity, setQuantity] = useState<number>(preSelectedQuantity);
  const [slot, setSlot] = useState<string>('Morning (9:00 AM - 12:00 PM)');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [area, setArea] = useState<string>(cityConfig.localities[0]);
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

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

  if (!isOpen) return null;

  const rawTotal = preSelectedPrice || selectedService.price * quantity;
  const calculatedTotal = Math.max(350, rawTotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) {
      alert('Please enter your WhatsApp phone number.');
      return;
    }

    const cityPrefix = modalCity === 'kadapa' ? 'KDP' : 'BLR';
    
    // Save to centralized Booking Store with Sameer-First Priority Dispatch
    const savedBooking = bookingStore.createBooking({
      customerName: customerName.trim() || 'Customer',
      customerMobile: customerPhone,
      serviceTitle: selectedService.name,
      applianceType: selectedService.category.toUpperCase(),
      city: modalCity,
      locality: area || cityConfig.localities[0],
      fullAddress: streetAddress ? `${streetAddress}, ${area}, ${cityConfig.name}` : `${area}, ${cityConfig.name}`,
      date: date || 'Today',
      timeSlot: slot,
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

    // Send formatted WhatsApp notification
    const msg = `*NEW DOORSTEP BOOKING - AS REFRIGERATION*\n` +
      `Booking ID: ${generatedId}\n` +
      `City / Branch: ${cityConfig.name} (${cityConfig.workshopName})\n` +
      `Customer: ${customerName || 'Customer'}\n` +
      `Phone: ${customerPhone}\n` +
      `Service: ${selectedService.name} (Qty: ${quantity})\n` +
      `Estimated Amount: Rs. ${calculatedTotal}\n` +
      `Date & Slot: ${date} [${slot}]\n` +
      `Locality: ${area}\n` +
      `Full Address: ${streetAddress || cityConfig.name}\n` +
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

            {/* City Switcher Tabs in Modal */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mb-4">
              <button
                type="button"
                onClick={() => {
                  setModalCity('kadapa');
                  if (onSelectCity) onSelectCity('kadapa');
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalCity === 'kadapa' ? 'bg-red-600 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Kadapa (Flagship)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalCity('bangalore');
                  if (onSelectCity) onSelectCity('bangalore');
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalCity === 'bangalore' ? 'bg-red-600 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Bangalore (Branch)</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service & Estimated Price Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-red-50/30 border border-slate-200 space-y-2">
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
                <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-1.5 leading-snug">
                  <span className="text-red-600 font-bold">ℹ️</span>
                  <span>
                    <strong>Doorstep Inspection Model:</strong> The technician inspects the appliance on-site, explains required spares/work, and confirms the final fixed price with you before repair. Zero advance payment required! Pay on completion via Dynamic UPI QR.
                  </span>
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              {/* Locality in Selected City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Your Area / Locality in {cityConfig.name}
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
                  Street / Landmark / House No.
                </label>
                <input
                  type="text"
                  placeholder="e.g. Beside 2nd Mariapuram Church, Pulivendula Rd"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-bold"
                  />
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Any specific issue details or symptoms? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AC compressor trips after 10 mins, or gas smell observed"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Instagram Follower Coupon Code */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-800 flex items-center gap-1">
                    <span>📸 Instagram Follower Coupon</span>
                  </span>
                  <a
                    href="https://www.instagram.com/asrefrigerations.kadapa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-red-600 hover:underline"
                  >
                    Follow @asrefrigerations.kadapa →
                  </a>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code: INSTA100"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 uppercase font-mono font-bold focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition active:scale-95"
                  >
                    Apply (-₹100)
                  </button>
                </div>

                {couponMessage && (
                  <div className={`text-[11px] font-bold ${discount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {couponMessage}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Doorstep Booking (Pay After Work)</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero advance deposit. Technician calls 15 mins prior to arrival.</span>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Booking Confirmed!
            </h3>

            <div className="inline-block bg-slate-100 px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-800">
              Booking ID: <span className="text-red-600 font-black">{bookingId}</span>
            </div>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{customerName}</span>. Your doorstep service request has been logged and sent directly to Master Shaik Sameer and our local dispatch team in {area}.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-sm mx-auto">
              <div><span className="text-slate-400">Service:</span> <span className="font-bold text-slate-900">{selectedService.name}</span></div>
              <div><span className="text-slate-400">Slot:</span> <span className="font-bold text-slate-900">{date} • {slot}</span></div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-semibold">Estimated Base Price:</span>
                <span className="font-black text-red-600 text-sm">₹{calculatedTotal}</span>
              </div>
              <div className="text-[11px] text-slate-600 bg-amber-50 p-2 rounded-xl border border-amber-200 leading-tight">
                💡 Sameer / Technician will inspect on-site, fix the exact final price with your approval, and generate a dynamic UPI QR code on your doorstep.
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
              <a
                href="tel:+917815851330"
                className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Helpline (+91 78158 51330)</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
