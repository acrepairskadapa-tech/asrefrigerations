# AS REFRIGERATIONS – Multi-City Appliance Service Platform

[![Vite](https://img.shields.io/badge/Vite-8.3.4-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)]()

> Official digital web and mobile platform for **AS REFRIGERATIONS**.
> Operating across **Kadapa Flagship HQ (Andhra Pradesh)** and **Bangalore East Branch Hub (Kammanahalli, Karnataka)**.

---

## Key Architecture & Features

1. **Two-Step Doorstep Pricing & Dynamic NPCI UPI QR:**
   - **Step 1:** Customer views estimated starting base online; books with **₹0 advance deposit**.
   - **Step 2:** Shaik Sameer or visiting technician diagnoses physical fault on-site, itemizes spares, and locks final bill. ₹350 diagnostic visit is 100% adjusted into final repair bill upon quote approval.
   - **Step 3:** System generates a Dynamic NPCI UPI QR code (`upi://pay?pa=8074945415@ybl&pn=AS%20REFRIGERATIONS&am=...&tn=...&cu=INR`) pre-filling the exact bill for PhonePe, Google Pay, and Paytm with **0% gateway commission**.
   - Automatic 5-star Google Review funnel to [reviewsmart.online/r/as-refrigeration](https://www.reviewsmart.online/r/as-refrigeration).

2. **Multi-City Dual Branch Switching:**
   - **Kadapa Flagship HQ:** 74/15/1 Lohiya Nagar, Mariapuram, Pulivendula Rd, Kadapa – 516001 (19 pre-indexed wards).
   - **Bangalore Branch Hub:** #2 Sree Residency, Venkateshappa Layout, Kammanahalli, Bangalore – 560084 (25 pre-indexed localities).
   - Zero per-request Google Maps geocoding API overhead.

3. **Sameer-First Priority 1 Dispatch Engine:**
   - Kadapa bookings sound an audio alert and allocate to Master Shaik Sameer as Priority 1.
   - Delegation engine routes overflow jobs to vetted Priority 2 mechanics (Shaik Imran, K. Venkatesh) with 100% rate-card payouts (0% commission cuts).

4. **Zero-SMS 4-Digit PIN Authentication:**
   - Eliminates recurring SMS gateway costs and OTP delivery failures. Customer mobile serves as user ID; 4-digit PIN is stored securely on device storage.

5. **Mobile Native App Shells (Urban Company UX):**
   - Customer App (`com.asrefrigerations.customer`) with 6-stage doorstep tracking stepper.
   - Partner Technician App (`com.asrefrigerations.partner`) with duty switcher and 1-tap Google Maps GPS navigation.
   - Photorealistic in-browser mobile simulator for instant testing.

---

## Project Structure

```
├── public/                 # Static assets, logos, PWA manifest.json
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── Header.tsx                 # Multi-city navigation bar
│   │   ├── Hero.tsx                   # 30-sec express booking card
│   │   ├── DynamicUpiPaymentModal.tsx # Zero-commission NPCI UPI QR modal
│   │   ├── PortalHubModal.tsx         # Customer PIN portal & Sameer admin console
│   │   ├── MobileAppSimulatorModal.tsx# Urban Company dual-app phone preview
│   │   ├── AppDownloadShowcase.tsx    # Google Play Store & iOS Soon badges
│   │   ├── BookingModal.tsx           # Estimated base booking flow
│   │   └── ...
│   ├── data/               # City coordinates, services rate cards, translations
│   ├── services/           # Reactive booking store & NPCI UPI engine
│   └── types/              # Database models and TypeScript schemas
├── apps/                   # Capacitor mobile application configurations
│   ├── customer-app/       # Android package com.asrefrigerations.customer
│   └── partner-app/        # Android package com.asrefrigerations.partner
├── backend/                # Cloud Firestore rules, schemas, and webhooks
├── vercel.json             # Vercel SPA rewrites and caching headers
├── netlify.toml            # Netlify deployment configuration
└── vite.config.ts          # Vite build config with manual code splitting
```

---

## Local Development & Build

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Production build (Type-checked & bundled)
npm run build

# Preview production build locally
npm run preview
```

---

## 1-Click Deployment to Vercel

This repository is pre-configured with `vercel.json` for zero-configuration Vite deployment.

1. Connect your repository to [Vercel](https://vercel.com/new).
2. Framework Preset will automatically detect **Vite**.
3. Click **Deploy**.
4. Point custom domain `asrefrigerations.com` to Vercel via CNAME/A records.

---

## License & Enterprise Rights

All digital IP, trade secrets, software assets, and brand trademarks are the exclusive proprietary property of **AS REFRIGERATIONS** (Shaik Sameer). Powered by Momo IT Technologies.
