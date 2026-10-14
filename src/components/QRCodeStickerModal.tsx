import React, { useState, useEffect } from 'react';
import { QrCode, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeStickerModal: React.FC<QRCodeStickerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [unitCode, setUnitCode] = useState('ASR-KDP-2026-99');
  const [applianceModel, setApplianceModel] = useState('Daikin 1.5 Ton Inverter AC');
  const [serviceDate, setServiceDate] = useState('11-Oct-2026');
  const [nextDue, setNextDue] = useState('11-Apr-2027');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    const url = `https://asrefrigerations.co.in/?unit=${unitCode}&service=${encodeURIComponent(applianceModel)}`;
    QRCode.toDataURL(url, { width: 180, margin: 1 })
      .then(setQrDataUrl)
      .catch(console.error);
  }, [isOpen, unitCode, applianceModel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="ios-sheet sm:bg-white rounded-t-[34px] sm:rounded-[32px] max-w-md w-full p-5 sm:p-6 text-left shadow-2xl relative border-t sm:border border-slate-200 mt-auto sm:my-8 max-h-[90vh] overflow-y-auto">
        {/* Mobile Sheet Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-1 mb-3 sm:hidden" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-800 font-black text-xl cursor-pointer w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ios-tap"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Smart Appliance QR Sticker
            </h3>
            <p className="text-xs text-slate-500">
              Stick on customer's AC or Fridge for 1-scan repeat booking & warranty check.
            </p>
          </div>
        </div>

        {/* Sticker Preview Container */}
        <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl border-2 border-red-500 shadow-xl my-4 text-center relative overflow-hidden" id="printable-sticker">
          <div className="text-[10px] uppercase font-black tracking-widest text-red-400 mb-1">
            Official Service Protected Unit
          </div>
          <div className="text-base font-black tracking-tight text-white">
            AS REFRIGERATIONS KADAPA
          </div>
          <div className="text-[10px] text-slate-400">
            Helpline: +91 78158 51330 • Mariapuram, Kadapa
          </div>

          <div className="my-3 bg-white p-2 rounded-xl inline-block shadow-sm">
            {qrDataUrl && <img src={qrDataUrl} alt="Service QR Code" className="w-32 h-32 mx-auto" />}
          </div>

          <div className="text-xs font-black text-amber-300">
            {unitCode}
          </div>
          <div className="text-[11px] text-slate-300 font-medium mt-0.5">
            {applianceModel}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800 text-[10px] text-left">
            <div>
              <span className="text-slate-500 block">Last Serviced:</span>
              <span className="font-bold text-white">{serviceDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Next Due:</span>
              <span className="font-bold text-emerald-400">{nextDue}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Sticker</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
