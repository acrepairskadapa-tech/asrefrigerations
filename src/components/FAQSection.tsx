import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Doorstep Service',
    question: 'How fast can an AS Refrigerations technician reach my home in Kadapa?',
    answer: 'We guarantee doorstep arrival within 60 minutes across all 19 major residential and commercial sectors in Kadapa, including Mariapuram, Chinna Chowk, RIMS Road, RTC Bus Stand, Yerramukkapalli, Co-operative Colony, and Nagarajupalli.'
  },
  {
    category: 'Billing & Charges',
    question: 'How does the ₹350 diagnostic visiting charge work? Is it extra?',
    answer: 'The ₹350 visiting charge covers thorough on-site physical diagnosis using digital manifold gauges and testing tools. If you approve our repair quote and proceed with the service, the ₹350 is 100% waived/adjusted directly into your final bill! You only pay for the repair.'
  },
  {
    category: 'AC Cleaning',
    question: 'What is the difference between normal water wash and AS High-Pressure Foam Jet Wash?',
    answer: 'Local mechanics use a garden pipe that only washes surface filters. Our specialized service uses a 120-bar pressure washer with a waterproof indoor catchment bag and antibacterial foaming cleaner. This deep flushes stubborn fungal slime, black mould, and debris from the inner evaporator coils, blower fan, and condensate tray without bending delicate aluminium fins. It restores ice-cold airflow and cuts power consumption by up to 25%.'
  },
  {
    category: 'Gas Charging',
    question: 'Why should I avoid cheap roadside gas refilling for my AC or fridge?',
    answer: 'Roadside mechanics frequently use adulterated mixed refrigerants or fail to pull a full nitrogen vacuum before refilling. This introduces moisture that oxidizes compressor oil, causing catastrophic compressor burnout within weeks. AS Refrigerations uses 100% pure factory-sealed cylinders of R-32, R-410A, and R-134a, backed by a 30-day cooling warranty.'
  },
  {
    category: 'Warranty & Guarantee',
    question: 'What happens if my AC or refrigerator stops working again after repair?',
    answer: 'Every service is backed by our official 30-Day Workmanship & Fault Warranty. If the serviced issue recurs within 30 days, Master Shaik Sameer or our lead technician will re-inspect and fix it at zero additional labor cost. Simply call or WhatsApp Master Shaik Sameer directly with your phone number for immediate priority support.'
  },
  {
    category: 'Brand Compatibility',
    question: 'Which air conditioner and refrigerator brands do you repair?',
    answer: 'We service all major Indian and international brands: Voltas, Daikin, LG, Samsung, Blue Star, Lloyd, Panasonic, Godrej, Whirlpool, Carrier, Hitachi, O General, Haier, Bosch, and IFB.'
  },
  {
    category: 'Partner Program',
    question: 'How does the AS Partner Program work for local Kadapa technicians?',
    answer: 'Experienced local technicians join our network for a fixed monthly subscription (starting from ₹4,950/mo) and receive verified daily doorstep job leads with 0% per-job commission. Technicians keep 100% of customer collections, earning ₹45,000 to ₹75,000+ monthly take-home profit.'
  },
  {
    category: 'Offers & Discounts',
    question: 'How do I claim the ₹100 Instagram follower discount?',
    answer: 'Follow our official Instagram account (@asrefrigerations.kadapa) and enter the promo code INSTA100 in the booking modal, or simply show your followed profile to the technician upon arrival to get ₹100 deducted from your repair bill.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Doorstep Service', 'Billing & Charges', 'AC Cleaning', 'Gas Charging', 'Warranty & Guarantee'];

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200 text-left" id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Customer Clarifications & Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Everything you need to know about our Kadapa doorstep repair service, pricing transparency, and 30-day warranty.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-red-500/40 bg-red-50/20 shadow-md'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-slate-200 text-slate-600'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-3">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified AS Refrigerations Kadapa Company Policy</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Quick Help Prompt */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-extrabold text-base text-white">Have a question not listed here?</h4>
            <p className="text-xs text-slate-400">Speak directly with Master Shaik Sameer or chat with our team on WhatsApp.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+917815851330"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: +91 78158 51330</span>
            </a>

            <a
              href="https://wa.me/917815851330?text=Hi%20AS%20Refrigerations,%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
