import React, { useState } from 'react';
import { Language } from './data/translations';
import { CityId } from './data/citiesData';
import { ServiceItem, SERVICES_DATA } from './data/servicesData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ApplianceCategoryGrid } from './components/ApplianceCategoryGrid';
import { PriceCalculator } from './components/PriceCalculator';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GoogleReviews } from './components/GoogleReviews';
import { AppDownloadShowcase } from './components/AppDownloadShowcase';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { CommercialAMC } from './components/CommercialAMC';
import { PartnerNetwork } from './components/PartnerNetwork';
import { QRCodeStickerModal } from './components/QRCodeStickerModal';
import { PortalHubModal } from './components/PortalHubModal';
import { MobileAppSimulatorModal } from './components/MobileAppSimulatorModal';
import { BookingModal } from './components/BookingModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { DiagnosticAssistant } from './components/DiagnosticAssistant';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedCity, setSelectedCity] = useState<CityId>(() => {
    try {
      const saved = localStorage.getItem('as_city');
      return saved === 'bangalore' ? 'bangalore' : 'kadapa';
    } catch {
      return 'kadapa';
    }
  });

  const handleSelectCity = (c: CityId) => {
    setSelectedCity(c);
    try {
      localStorage.setItem('as_city', c);
    } catch {
      // ignore storage error
    }
  };

  // Modal open states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [portalsModalOpen, setPortalsModalOpen] = useState(false);
  const [mobileAppsModalOpen, setMobileAppsModalOpen] = useState(false);

  // Filter & Service selection states
  const [selectedCategory, setSelectedCategory] = useState<ServiceItem['category']>('ac');
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | null>(null);
  const [preSelectedQuantity, setPreSelectedQuantity] = useState<number>(1);
  const [preSelectedPrice, setPreSelectedPrice] = useState<number | undefined>(undefined);

  // Handler for Hero Express Booking Form
  const handleExpressBook = (data: {
    appliance: string;
    issue: string;
    city?: CityId;
    area: string;
    phone: string;
    name: string;
  }) => {
    if (data.city && data.city !== selectedCity) {
      handleSelectCity(data.city);
    }
    const catMap: Record<string, ServiceItem['category']> = {
      AC: 'ac',
      Refrigerator: 'fridge',
      'Washing Machine': 'washing_machine',
      Electrical: 'electrical'
    };
    const cat = catMap[data.appliance] || 'ac';
    const matched = SERVICES_DATA.find((s) => s.category === cat) || SERVICES_DATA[0];

    setPreSelectedService(matched);
    setPreSelectedQuantity(1);
    setPreSelectedPrice(matched.price);
    setBookingModalOpen(true);
  };

  // Handler for Price Calculator Book button
  const handleBookEstimatedService = (
    service: ServiceItem,
    quantity: number,
    total: number
  ) => {
    setPreSelectedService(service);
    setPreSelectedQuantity(quantity);
    setPreSelectedPrice(total);
    setBookingModalOpen(true);
  };

  // Handler for Service Card Book button
  const handleBookService = (service: ServiceItem) => {
    setPreSelectedService(service);
    setPreSelectedQuantity(1);
    setPreSelectedPrice(service.price);
    setBookingModalOpen(true);
  };

  // Handler for Diagnostic Assistant Book button
  const handleBookDiagnosticIssue = (service: ServiceItem, issueTitle: string) => {
    setPreSelectedService(service);
    setPreSelectedQuantity(1);
    setPreSelectedPrice(service.price);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-red-500 selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Header
        lang={lang}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenBooking={() => {
          setPreSelectedService(null);
          setPreSelectedPrice(undefined);
          setBookingModalOpen(true);
        }}
        onOpenQr={() => setQrModalOpen(true)}
        onOpenPortals={() => setPortalsModalOpen(true)}
        onOpenMobileApps={() => setMobileAppsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-0">
        {/* 2. Hero with Express 30-Sec Booking Card */}
        <Hero
          lang={lang}
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
          onExpressBook={handleExpressBook}
          onOpenBooking={() => setBookingModalOpen(true)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 3. Interactive Category Grid */}
        <ApplianceCategoryGrid
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Smart Appliance Diagnostic Assistant (Symptom Checker) */}
        <DiagnosticAssistant onBookIssue={handleBookDiagnosticIssue} />

        {/* 5. Interactive Transparent Price Estimator */}
        <PriceCalculator
          lang={lang}
          onBookEstimatedService={handleBookEstimatedService}
        />

        {/* 6. Services Catalogue Section */}
        <ServicesSection
          lang={lang}
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => {
            if (cat !== 'all') setSelectedCategory(cat);
          }}
          onBookService={handleBookService}
        />

        {/* 7. Why Choose Us & Sameer Bhai's Workshop Showcase */}
        <WhyChooseUs
          lang={lang}
          selectedCity={selectedCity}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* 8. Verified Google Reviews (928+ Reviews on GMB Profile) */}
        <GoogleReviews lang={lang} />

        {/* 9. Mobile App Showcase & Store Badges (Google Play & iOS Soon) */}
        <AppDownloadShowcase onOpenSimulator={() => setMobileAppsModalOpen(true)} />

        {/* 10. Instagram Video Reels Hub & ₹100 Follower Discount */}
        <InstagramReelsSection
          lang={lang}
          onApplyCoupon={() => {
            setBookingModalOpen(true);
          }}
        />

        {/* 10. Annual Maintenance Contracts (AMC) */}
        <CommercialAMC
          lang={lang}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* 11. Technician Partner Network */}
        <PartnerNetwork lang={lang} />

        {/* 12. Frequently Asked Questions (FAQ) */}
        <FAQSection />
      </main>

      {/* Modern Footer */}
      <Footer
        lang={lang}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenQr={() => setQrModalOpen(true)}
        onOpenPortals={() => setPortalsModalOpen(true)}
      />

      {/* Mobile App Bottom Navigation Bar */}
      <MobileStickyBar
        lang={lang}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenBooking={() => {
          setPreSelectedService(null);
          setPreSelectedPrice(undefined);
          setBookingModalOpen(true);
        }}
        onOpenPortals={() => setPortalsModalOpen(true)}
        onOpenQr={() => setQrModalOpen(true)}
        onOpenMobileApps={() => setMobileAppsModalOpen(true)}
      />

      {/* 14. Smart QR Code AC Sticker Modal */}
      <QRCodeStickerModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
      />

      {/* 15. Customer & Partner Management Hub Modal */}
      <PortalHubModal
        isOpen={portalsModalOpen}
        onClose={() => setPortalsModalOpen(false)}
        selectedCity={selectedCity}
      />

      {/* 16. Urban Company-Inspired Mobile Applications Simulator */}
      <MobileAppSimulatorModal
        isOpen={mobileAppsModalOpen}
        onClose={() => setMobileAppsModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenWebBooking={() => {
          setMobileAppsModalOpen(false);
          setBookingModalOpen(true);
        }}
      />

      {/* 17. 3-Step Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        lang={lang}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        preSelectedService={preSelectedService}
        preSelectedQuantity={preSelectedQuantity}
        preSelectedPrice={preSelectedPrice}
      />
    </div>
  );
}

export default App;
