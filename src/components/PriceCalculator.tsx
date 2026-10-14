import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';

interface PriceCalculatorProps {
  lang: Language;
  onBookEstimatedService: (service: ServiceItem, quantity: number, total: number) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  lang,
  onBookEstimatedService
}) => {
  const t = TRANSLATIONS[lang];

  const [category, setCategory] = useState<ServiceItem['category']>('ac');
  const availableServices = SERVICES_DATA.filter((s) => s.category === category);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(availableServices[0]?.id || 'ac-jet-wash');
  const [quantity, setQuantity] = useState<number>(1);
  const [includeFoamAddon, setIncludeFoamAddon] = useState<boolean>(false);
  const [includeNitrogenTest, setIncludeNitrogenTest] = useState<boolean>(false);

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || availableServices[0] || SERVICES_DATA[0];

  const basePrice = activeService.price * quantity;
  const addonFoamPrice = includeFoamAddon ? 300 * quantity : 0;
  const addonNitrogenPrice = includeNitrogenTest ? 450 * quantity : 0;
  const grandTotal = basePrice + addonFoamPrice + addonNitrogenPrice;

  return (
    <section className="py-16 bg-slate-50/80 border-b border-slate-200" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-700 bg-red-50 px-3.5 py-1 rounded-full border border-red-200/80">
            <Calculator className="w-3.5 h-3.5" />
            100% Price Transparency
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            {t.calculatorTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.calculatorSub}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Input Parameters (Col 7) */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 text-left bg-white">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                  1. Appliance Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
                  {[
                    { id: 'ac', label: 'AC' },
                    { id: 'fridge', label: 'Fridge' },
                    { id: 'washing_machine', label: 'Washing M/C' },
                    { id: 'electrical', label: 'Electrical' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        const newCat = tab.id as ServiceItem['category'];
                        setCategory(newCat);
                        const first = SERVICES_DATA.find((s) => s.category === newCat);
                        if (first) setSelectedServiceId(first.id);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-black transition cursor-pointer text-center ios-tap ${
                        category === tab.id
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                  2. Service Package or Repair Type
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {availableServices.map((svc) => (
                    <label
                      key={svc.id}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ios-tap ${
                        selectedServiceId === svc.id
                          ? 'bg-red-50/70 border-red-500 ring-1 ring-red-500/20 shadow-xs'
                          : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="calc-service"
                          checked={selectedServiceId === svc.id}
                          onChange={() => setSelectedServiceId(svc.id)}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {svc.name}
                          </div>
                          <div className="text-xs text-slate-500">{svc.duration} • Genuine Parts</div>
                        </div>
                      </div>
                      <div className="text-sm font-black text-red-600">
                        ₹{svc.price}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                  3. Units / Appliances Count
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`w-11 h-11 rounded-2xl font-black text-sm border transition cursor-pointer ios-tap ${
                        quantity === q
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-white/80 text-slate-700 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 font-semibold ml-2">
                    {quantity > 1 ? `${quantity} Units (${quantity * 10}% bulk discount eligible)` : '1 Unit'}
                  </span>
                </div>
              </div>

              {/* Addons */}
              {category === 'ac' && (
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                    4. Optional Quality Add-ons
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white/70 cursor-pointer hover:bg-white transition ios-tap">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeFoamAddon}
                          onChange={(e) => setIncludeFoamAddon(e.target.checked)}
                          className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          Antibacterial Foam Sanitize Booster
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">+₹300/unit</span>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white/70 cursor-pointer hover:bg-white transition ios-tap">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeNitrogenTest}
                          onChange={(e) => setIncludeNitrogenTest(e.target.checked)}
                          className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          Digital Nitrogen Pressure Leak Lock Test
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">+₹450/unit</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Price Output Breakdown Card (Col 5) */}
            <div className="md:col-span-5 bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between text-left border-l border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    Transparent Estimate
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>

                <h3 className="text-lg font-black text-white">
                  {activeService.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Estimated duration: {activeService.duration}
                </p>

                {/* Breakdown table */}
                <div className="mt-6 space-y-3 border-t border-slate-800 pt-4 text-xs font-medium">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Service ({quantity}x ₹{activeService.price})</span>
                    <span className="font-bold text-white">₹{basePrice}</span>
                  </div>

                  {includeFoamAddon && (
                    <div className="flex justify-between text-slate-300">
                      <span>Antibacterial Foam Add-on ({quantity}x)</span>
                      <span className="font-bold text-white">₹{addonFoamPrice}</span>
                    </div>
                  )}

                  {includeNitrogenTest && (
                    <div className="flex justify-between text-slate-300">
                      <span>Nitrogen Leak Test ({quantity}x)</span>
                      <span className="font-bold text-white">₹{addonNitrogenPrice}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Visiting / Inspection Charge</span>
                    <span className="line-through text-slate-500">₹350</span>
                    <span className="font-bold text-emerald-400">FREE (Adjusted)</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>30-Day Service Guarantee</span>
                    <span className="font-bold text-emerald-400">INCLUDED</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                    Total Estimated Cost
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pay only after repair is completed satisfactorily.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onBookEstimatedService(activeService, quantity, grandTotal)}
                  className="w-full py-4 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base shadow-xl shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer ios-tap transition active:scale-98"
                >
                  <span>Book at this Estimate (₹{grandTotal})</span>
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
