import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  CreditCard, 
  ExternalLink, 
  Star, 
  AlertCircle, 
  Sparkles, 
  X, 
  Copy, 
  Check,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { bookingStore } from '../services/bookingStore';

interface DynamicUpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
  onPaymentSuccess?: () => void;
}

export const DynamicUpiPaymentModal: React.FC<DynamicUpiPaymentModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  onPaymentSuccess
}) => {
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState<string>('');

  const details = bookingId ? bookingStore.getUpiPaymentDetails(bookingId) : null;

  useEffect(() => {
    if (isOpen && details) {
      if (details.paymentStatus === 'PAID') {
        setPaymentSuccess(true);
      } else {
        setPaymentSuccess(false);
      }
    }
  }, [isOpen, bookingId]);

  if (!isOpen || !bookingId || !details) return null;

  const handleCopyVpa = () => {
    try {
      navigator.clipboard.writeText(details.vpa);
      setCopiedVpa(true);
      setTimeout(() => setCopiedVpa(false), 2500);
    } catch {}
  };

  const handleConfirmPayment = () => {
    const generatedRef = `UPI-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setTransactionRef(generatedRef);
    bookingStore.markBookingPaid(bookingId, 'UPI', generatedRef);
    setPaymentSuccess(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (onPaymentSuccess) onPaymentSuccess();
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-t-[32px] sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 text-left shadow-2xl relative border border-slate-200 mt-auto sm:my-6 max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-800 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"
        >
          ✕
        </button>

        {!paymentSuccess ? (
          /* ============================================================== */
          /* 1. DYNAMIC UPI QR SCAN & PAY SCREEN                            */
          /* ============================================================== */
          <div className="space-y-4">
            
            {/* Header */}
            <div className="text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Business UPI • 0% Transaction Fee
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Doorstep UPI Payment
              </h3>
              <p className="text-xs text-slate-500">
                Booking ID: <strong className="font-mono text-slate-800">#{details.bookingId}</strong> • Payee: <strong>AS REFRIGERATIONS</strong>
              </p>
            </div>

            {/* Price Card: Estimate vs Final Fixed Price */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>Initial Starting Estimate:</span>
                <span className="line-through">₹{details.estimatedPrice}</span>
              </div>

              {/* Itemized Spares Breakdown */}
              <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-800 text-[11px] block">
                  Final Itemized Bill Approved on Doorstep:
                </span>
                {details.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-700">
                    <span className="truncate">• {it.item}</span>
                    <span className="font-mono font-bold text-slate-900 shrink-0">₹{it.price}</span>
                  </div>
                ))}
              </div>

              {/* Diagnostic fee waiver guarantee */}
              <div className="text-[10px] text-emerald-700 font-semibold bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/60 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Standard ₹350 visiting inspection charge is 100% adjusted into this final total.</span>
              </div>

              {/* Final Payable Total */}
              <div className="pt-2 border-t border-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-black text-sm text-slate-900">Final Payable Amount:</span>
                  <span className="text-[10px] text-slate-400 block">Locked amount (Exact bill)</span>
                </div>
                <div className="text-2xl font-black text-red-600 tracking-tight font-mono">
                  ₹{details.amount}
                </div>
              </div>
            </div>

            {/* Dynamic UPI QR Code Box */}
            <div className="p-4 rounded-2xl bg-white border-2 border-dashed border-red-300 text-center space-y-3 shadow-xs">
              <div className="relative inline-block p-2 bg-white rounded-2xl border border-slate-200 shadow-md">
                <img
                  src={details.qrUrl}
                  alt="Dynamic UPI QR Code"
                  className="w-48 h-48 sm:w-52 sm:h-52 mx-auto rounded-xl object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-xl bg-white/95 p-1 shadow-md border border-slate-200 flex items-center justify-center">
                    <span className="font-black text-xs text-red-600">AS</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-800">
                  Scan with PhonePe, Google Pay, Paytm, or BHIM
                </div>
                <p className="text-[11px] text-slate-500">
                  The exact bill of <strong>₹{details.amount}</strong> will prefill automatically.
                </p>
              </div>

              {/* Payee VPA with Copy Button */}
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="text-slate-400">UPI ID:</span>
                <code className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  {details.vpa}
                </code>
                <button
                  onClick={handleCopyVpa}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                  title="Copy UPI ID"
                >
                  {copiedVpa ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* 1-Tap Mobile UPI Intent App Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                Or Tap to Pay Directly on This Mobile
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={details.upiUri}
                  className="py-2.5 px-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-extrabold text-xs text-center transition shadow-xs flex flex-col items-center gap-0.5"
                >
                  <span>🟣 PhonePe</span>
                  <span className="text-[9px] font-normal text-purple-600">1-Tap App</span>
                </a>
                <a
                  href={details.upiUri}
                  className="py-2.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-extrabold text-xs text-center transition shadow-xs flex flex-col items-center gap-0.5"
                >
                  <span>🔵 Google Pay</span>
                  <span className="text-[9px] font-normal text-blue-600">Instant</span>
                </a>
                <a
                  href={details.upiUri}
                  className="py-2.5 px-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-900 font-extrabold text-xs text-center transition shadow-xs flex flex-col items-center gap-0.5"
                >
                  <span>🔷 Paytm</span>
                  <span className="text-[9px] font-normal text-cyan-600">Direct</span>
                </a>
              </div>
            </div>

            {/* Technician / Customer Confirmation Simulation Button */}
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={handleConfirmPayment}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Payment Done • Verify & Generate Receipt</span>
              </button>
              <p className="text-[10px] text-center text-slate-400">
                Payment verifies instantly against Shaik Sameer's registered bank account.
              </p>
            </div>

          </div>
        ) : (
          /* ============================================================== */
          /* 2. DIGITAL PAYMENT RECEIPT & 5-STAR REVIEW FUNNEL              */
          /* ============================================================== */
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Payment Received & Job Closed
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Thank You, Payment Verified!
              </h3>
              <p className="text-xs text-slate-500">
                Transaction Ref: <code className="font-mono text-slate-800">{transactionRef || 'UPI-84918201'}</code>
              </p>
            </div>

            {/* Digital Receipt Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900">AS REFRIGERATIONS</span>
                <span className="font-mono text-emerald-700 font-bold">PAID ₹{details.amount}</span>
              </div>
              <div className="space-y-1 text-slate-600 text-[11px]">
                <div>• Booking Ref: <strong>#{details.bookingId}</strong></div>
                <div>• Master Lead: <strong>Shaik Sameer (+91 80749 45415)</strong></div>
                <div>• Guarantee: <strong>30-Day Workmanship Assurance</strong></div>
                <div>• Payment Mode: <strong>Direct Dynamic UPI (0% Fee)</strong></div>
              </div>
            </div>

            {/* Google Review Prompt */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white space-y-2 max-w-sm mx-auto shadow-md">
              <div className="flex items-center justify-center gap-1 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
              </div>
              <h4 className="font-black text-sm">Loved Shaik Sameer's Doorstep Service?</h4>
              <p className="text-[11px] text-white/90">
                Please take 15 seconds to leave a 5-star Google review for AS REFRIGERATIONS.
              </p>
              <a
                href="https://www.reviewsmart.online/r/as-refrigeration"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs shadow-md transition"
              >
                <span>Leave 5-Star Review on Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-600" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
