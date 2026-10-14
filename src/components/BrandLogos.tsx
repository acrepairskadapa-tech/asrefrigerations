import React from 'react';

interface LogoProps {
  className?: string;
}

// 1. DAIKIN (Cyan parallelogram emblem + bold Daikin wordmark)
export const DaikinLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 160 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Daikin Triangle Emblem */}
    <path d="M4 32L24 6L32 6L12 32H4Z" fill="#0097E6" />
    <path d="M16 32L34 8L38 8L20 32H16Z" fill="#0097E6" opacity="0.6" />
    {/* DAIKIN Wordmark */}
    <text x="44" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1" fill="#0097E6">
      DAIKIN
    </text>
  </svg>
);

// 2. VOLTAS (Bold Tata navy typography + A TATA Enterprise)
export const VoltasLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 160 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" letterSpacing="1.5" fill="#002B49">
      VOLTAS
    </text>
    <rect x="4" y="30" width="88" height="2" fill="#0097E6" rx="1" />
    <text x="96" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.5" fill="#64748B">
      A TATA ENTERPRISE
    </text>
  </svg>
);

// 3. LG (Official Burgundy Circle Emblem with wink face + LG typography)
export const LgLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 130 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* LG Red/Pink Circle */}
    <circle cx="20" cy="20" r="16" fill="#A50034" />
    {/* Inner face: 'G' outer arc, 'L' nose, eye dot */}
    <path d="M20 11C24.97 11 29 15.03 29 20C29 24.97 24.97 29 20 29C15.03 29 11 24.97 11 20C11 16.5 13 13.5 15.9 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M29 20H20" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 16V22H24" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="17" r="1.6" fill="white" />
    {/* LG Letters */}
    <text x="44" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" letterSpacing="1" fill="#6B7280">
      LG
    </text>
  </svg>
);

// 4. SAMSUNG (Official Samsung Blue Wordmark with characteristic 'A')
export const SamsungLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 170 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="166" height="30" rx="15" fill="#1428A0" />
    <text x="85" y="26" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" letterSpacing="2.5" fill="white">
      SAMSUNG
    </text>
  </svg>
);

// 5. BLUE STAR (Twin 4-Point Stars + Blue Star Typography)
export const BlueStarLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 170 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue Star Emblem */}
    <g transform="translate(4, 8) scale(0.7)">
      <path d="M16 0L20 11L31 16L20 21L16 32L12 21L1 16L12 11Z" fill="#0054A6" />
      <path d="M28 22L30 27L35 29L30 31L28 36L26 31L21 29L26 27Z" fill="#00A3E0" />
    </g>
    <text x="36" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1" fill="#0054A6">
      BLUE STAR
    </text>
  </svg>
);

// 6. WHIRLPOOL (Iconic Swirl Orbit + Navy Whirlpool wordmark)
export const WhirlpoolLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 170 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gold Orbit Oval Ring */}
    <ellipse cx="85" cy="20" rx="80" ry="14" stroke="#F58220" strokeWidth="2.5" fill="none" transform="rotate(-6 85 20)" />
    <text x="85" y="27" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold" fontSize="21" fill="#003865">
      Whirlpool
    </text>
  </svg>
);

// 7. BOSCH (Iconic Red Magneto Armature Emblem + Bold BOSCH Wordmark)
export const BoschLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 155 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bosch Magneto Symbol */}
    <g transform="translate(6, 6)">
      <circle cx="14" cy="14" r="13" stroke="#EA1B23" strokeWidth="2.8" fill="none" />
      <rect x="5" y="9" width="18" height="10" stroke="#EA1B23" strokeWidth="2.2" fill="white" rx="1" />
      <circle cx="14" cy="14" r="2.5" fill="#EA1B23" />
    </g>
    <text x="42" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" letterSpacing="1.2" fill="#111827">
      BOSCH
    </text>
  </svg>
);

// 8. CARRIER (Iconic Blue Oval Badge with Script Typography)
export const CarrierLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 155 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="77" cy="20" rx="72" ry="16" fill="#003366" />
    <ellipse cx="77" cy="20" rx="69" ry="13.5" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
    <text x="77" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold" fontSize="20" fill="white">
      Carrier
    </text>
  </svg>
);

// 9. HITACHI (Hitachi Red Wordmark + Inspire the Next tagline)
export const HitachiLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 160 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="6" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.8" fill="#E60012">
      HITACHI
    </text>
    <text x="8" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="1.2" fill="#1F2937">
      Inspire the Next
    </text>
  </svg>
);

// 10. IFB (Bold Red & Blue IFB Emblem)
export const IfbLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 130 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="30" height="28" rx="6" fill="#D32F2F" />
    <text x="21" y="27" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="white">
      I
    </text>
    <text x="44" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="25" letterSpacing="2" fill="#1E293B">
      FB
    </text>
  </svg>
);

// 11. HAIER (Signature Haier Cyan-Blue Wordmark with distinctive font)
export const HaierLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 145 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="6" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="25" letterSpacing="1.5" fill="#005AAA">
      Haier
    </text>
  </svg>
);

// 12. GODREJ (Elegant Green Script Godrej Signature)
export const GodrejLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 150 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="6" y="28" fontFamily="'Brush Script MT', cursive, Georgia, serif" fontStyle="italic" fontWeight="bold" fontSize="30" fill="#1E7E34">
      Godrej
    </text>
  </svg>
);

// 13. PANASONIC (Signature Wide Cobalt Blue Panasonic Typography)
export const PanasonicLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 170 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1.2" fill="#004098">
      Panasonic
    </text>
  </svg>
);

// 14. LLOYD (Bold Red Lloyd Typography with Havells tag)
export const LloydLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 150 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="6" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" letterSpacing="2" fill="#D32F2F">
      LLOYD
    </text>
    <text x="8" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="1" fill="#64748B">
      A HAVELLS BRAND
    </text>
  </svg>
);

// 15. MITSUBISHI ELECTRIC (Iconic 3 Red Diamonds Emblem + Typography)
export const MitsubishiLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 190 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 3 Red Diamonds */}
    <g transform="translate(6, 7) scale(0.8)">
      {/* Top Diamond */}
      <polygon points="16,0 24,14 16,28 8,14" fill="#ED1B24" />
      {/* Bottom Left Diamond */}
      <polygon points="4,21 16,28 8,42 -4,35" fill="#ED1B24" />
      {/* Bottom Right Diamond */}
      <polygon points="28,21 36,35 24,42 16,28" fill="#ED1B24" />
    </g>
    <text x="44" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.8" fill="#111827">
      MITSUBISHI
    </text>
    <text x="44" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1" fill="#ED1B24">
      ELECTRIC
    </text>
  </svg>
);

// 16. O GENERAL (Red Triangle Chevron + GENERAL Typography)
export const OGeneralLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 170 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Red Chevron Triangle */}
    <polygon points="6,6 26,20 6,34" fill="#C41230" />
    <text x="32" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" letterSpacing="1.5" fill="#C41230">
      GENERAL
    </text>
  </svg>
);

// 17. SIEMENS (Petrol Teal Modern Typography)
export const SiemensLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 160 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="6" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="2.5" fill="#00646E">
      SIEMENS
    </text>
  </svg>
);

// 18. LIEBHERR (Deep Blue Industrial Precision Wordmark)
export const LiebherrLogo: React.FC<LogoProps> = ({ className = 'h-7' }) => (
  <svg viewBox="0 0 170 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="6" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.8" fill="#003865">
      LIEBHERR
    </text>
    <rect x="6" y="31" width="130" height="2.5" fill="#FDB813" rx="1" />
  </svg>
);
