export interface ServiceItem {
  id: string;
  name: string;
  nameTe: string;
  category: 'ac' | 'fridge' | 'washing_machine' | 'electrical' | 'amc';
  price: number;
  duration: string;
  popular?: boolean;
  description: string;
  descriptionTe: string;
  features: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
}

export const KADAPA_AREAS = [
  'Mariapuram (HQ)',
  'Lohiya Nagar',
  'Pulivendula Road',
  'Built-Up Circle',
  '1 Town Area',
  'RTC Bus Stand Circle',
  'Yerramukkapalli',
  'Nagarajupalli',
  'Akkayapalli',
  'NGO Colony',
  'RIMS Hospital Area',
  'Chinna Chowk',
  'Pedda Chowk',
  'Ravindra Nagar',
  'Prakash Nagar',
  'Almaspet',
  'Co-operative Colony',
  'Madhavaram Road',
  'Devuni Kadapa'
];

export const SERVICES_DATA: ServiceItem[] = [
  // AC Services
  {
    id: 'ac-normal-wash',
    name: 'AC Normal Basic Wash',
    nameTe: 'ఏసీ నార్మల్ బేసిక్ వాష్',
    category: 'ac',
    price: 550,
    duration: '30 mins',
    description: 'Filter cleaning, indoor coil brush wash, drain tray flushing, and basic airflow test.',
    descriptionTe: 'ఫిల్టర్ క్లీనింగ్, ఇండోర్ కాయిల్ బ్రష్ వాష్, డ్రైన్ ట్రే ఫ్లషింగ్ మరియు ఎయిర్‌ఫ్లో టెస్ట్.',
    features: ['Indoor filter wash', 'Dust removal', 'Basic performance check']
  },
  {
    id: 'ac-jet-wash',
    name: 'AC Deep Jet Pump Wash',
    nameTe: 'ఏసీ డీప్ జెట్ పంప్ వాష్',
    category: 'ac',
    price: 1000,
    duration: '45 mins',
    popular: true,
    description: 'High-pressure water jet cleaning for deep dust, outdoor condenser fin flush & 2x cooling boost.',
    descriptionTe: 'హై ప్రెజర్ వాటర్ జెట్ క్లీనింగ్, ఔట్‌డోర్ కండెన్సర్ డీప్ వాష్ మరియు సూపర్ కూలింగ్.',
    features: ['High-pressure jet wash', 'Indoor & outdoor deep cleaning', 'Drain pipe unclogging', 'Cooling inspection']
  },
  {
    id: 'ac-foam-wash',
    name: 'AC Antibacterial Foam Wash',
    nameTe: 'ఏసీ యాంటీ బాక్టీరియల్ ఫోమ్ వాష్',
    category: 'ac',
    price: 1200,
    duration: '45 mins',
    popular: true,
    description: 'Special active foam spray kills 99.9% germs, eliminates bad odors, and dissolves stubborn grime.',
    descriptionTe: 'యాక్టివ్ ఫోమ్ స్ప్రే బాక్టీరియా మరియు దుర్వాసనను తొలగిస్తుంది, స్వచ్ఛమైన చల్లని గాలిని ఇస్తుంది.',
    features: ['Antibacterial foam treatment', 'Fungus & odor removal', 'Jet pump rinse', 'Improves air quality']
  },
  {
    id: 'ac-chemical-wash',
    name: 'AC Chemical Master Wash',
    nameTe: 'ఏసీ కెమికల్ మాస్టర్ వాష్',
    category: 'ac',
    price: 1800,
    duration: '60 mins',
    description: 'Industrial coil-safe chemical wash for heavily choked cooling coils and outdoor units.',
    descriptionTe: 'చాలా మురికిపట్టిన కాయిల్స్ కోసం కెమికల్ వాష్, నూతన ఏసీ లాంటి కూలింగ్ అనుభవం.',
    features: ['Deep chemical de-scaling', 'Condenser coil restoration', 'Max cooling power restoration']
  },
  {
    id: 'ac-gas-32',
    name: 'AC R-32 Gas Charging (Complete Refill)',
    nameTe: 'ఏసీ R-32 గ్యాస్ చార్జింగ్ (పూర్తి రీఫిల్)',
    category: 'ac',
    price: 3250,
    duration: '45 mins',
    popular: true,
    description: 'Vacuum leak testing, Nitrogen pressure check, and 100% genuine R-32 eco-friendly refrigerant refill.',
    descriptionTe: 'లీకేజ్ టెస్టింగ్, వాక్యూమ్ టెస్ట్ మరియు ఒరిజినల్ R-32 గ్యాస్ ఫిల్లింగ్.',
    features: ['Leak identification & fix', 'Vacuum machine process', '100% Pure R-32 gas', '30-day gas warranty']
  },
  {
    id: 'ac-gas-410',
    name: 'AC R-410A Gas Charging (Inverter AC)',
    nameTe: 'ఏసీ R-410A గ్యాస్ చార్జింగ్ (ఇన్వర్టర్ ఏసీ)',
    category: 'ac',
    price: 3200,
    duration: '45 mins',
    description: 'Full leak test & precision weighing refill with genuine R-410A refrigerant for inverter ACs.',
    descriptionTe: 'ఇన్వర్టర్ ఏసీల కోసం కచ్చితమైన ఒరిజినల్ R-410A గ్యాస్ ఫిల్లింగ్.',
    features: ['Nitrogen pressure testing', 'Digital weight scale refill', 'Ampere load verification', '30-day warranty']
  },
  {
    id: 'ac-gas-22',
    name: 'AC R-22 Gas Charging (Conventional AC)',
    nameTe: 'ఏసీ R-22 గ్యాస్ చార్జింగ్ (నాన్-ఇన్వర్టర్)',
    category: 'ac',
    price: 2800,
    duration: '45 mins',
    description: 'Dedicated R-22 gas charging for conventional split and window air conditioners.',
    descriptionTe: 'నాన్-ఇన్వర్టర్ ఏసీల కోసం R-22 గ్యాస్ రీఫిల్లింగ్.',
    features: ['Full system flush', 'Original R-22 refill', 'Thermostat testing']
  },
  {
    id: 'ac-uninstallation-fitting',
    name: 'AC Complete Uninstallation & Re-Installation',
    nameTe: 'ఏసీ రిమూవల్ & కొత్త ఫిట్టింగ్',
    category: 'ac',
    price: 2200,
    duration: '90 mins',
    description: 'Safe gas lock uninstallation from old location and professional alignment installation at new home.',
    descriptionTe: 'పాత ఇంటి నుంచి సురక్షితంగా తీసి కొత్త ఇంట్లో పర్ఫెక్ట్ లెవలింగ్‌తో ఫిట్టింగ్ చేయడం.',
    features: ['Safe refrigerant pump-down', 'Copper pipe routing', 'Heavy-duty wall bracket mounting', 'Post-fit test']
  },
  {
    id: 'ac-fitting-only',
    name: 'AC Installation / Fitting Only',
    nameTe: 'ఏసీ ఫిట్టింగ్ / ఇన్‌స్టాలేషన్ మాత్రమే',
    category: 'ac',
    price: 1400,
    duration: '60 mins',
    description: 'Professional indoor and outdoor bracket mounting with precise leveling and vacuum check.',
    descriptionTe: 'ఇండోర్ మరియు ఔట్‌డోర్ యూనిట్ పర్ఫెక్ట్ ఫిట్టింగ్ మరియు వైరింగ్ కనెక్షన్.',
    features: ['Precision wall drilling', 'Indoor/Outdoor alignment', 'Drain piping test']
  },
  {
    id: 'ac-visit',
    name: 'AC Inspection & Visiting Charge',
    nameTe: 'ఏసీ చెకప్ & విజిటింగ్ ఛార్జ్',
    category: 'ac',
    price: 350,
    duration: '30 mins',
    description: 'Complete fault diagnosis by master technician. (Adjusted in final repair bill upon approval).',
    descriptionTe: 'ఏసీ సమస్యను పూర్తిగా తనిఖీ చేయడం. పని చేయిస్తే ఈ ఛార్జ్ సర్వీస్ బిల్లులో మినహాయించబడుతుంది.',
    features: ['On-site doorstep inspection', 'No hidden charges', 'Transparent estimate']
  },

  // Refrigerator Services
  {
    id: 'fridge-single-134',
    name: 'Single Door Fridge R-134a Gas Charging',
    nameTe: 'సింగిల్ డోర్ ఫ్రిజ్ R-134a గ్యాస్ చార్జింగ్',
    category: 'fridge',
    price: 1800,
    duration: '45 mins',
    popular: true,
    description: 'Capillary clearing, filter drier replacement, vacuum and original R-134a gas charging.',
    descriptionTe: 'క్యాపిలరీ క్లీనింగ్, ఫిల్టర్ డ్రైయర్ మార్పు, వాక్యూమ్ మరియు ఒరిజినల్ గ్యాస్ ఫిల్లింగ్.',
    features: ['Copper filter drier replacement', 'Leak brazing repair', 'Deep cooling restored', '30-day warranty']
  },
  {
    id: 'fridge-single-600',
    name: 'Single Door Fridge R-600a Gas Refill',
    nameTe: 'సింగిల్ డోర్ ఫ్రిజ్ R-600a గ్యాస్ రీఫిల్',
    category: 'fridge',
    price: 1800,
    duration: '45 mins',
    description: 'Safe handling & precision refill of Isobutane R-600a eco-refrigerant.',
    descriptionTe: 'R-600a గ్రీన్ గ్యాస్ రీఫిల్లింగ్ మరియు కూలింగ్ చెక్.',
    features: ['Safe pinching & brazing', 'Pure R-600a charging', 'Defrost check']
  },
  {
    id: 'fridge-double-600',
    name: 'Double Door Frost-Free R-600a Gas Charging',
    nameTe: 'డబుల్ డోర్ ఫ్రాస్ట్-ఫ్రీ R-600a గ్యాస్ చార్జింగ్',
    category: 'fridge',
    price: 2200,
    duration: '60 mins',
    popular: true,
    description: 'For all major brands (LG, Samsung, Whirlpool, Godrej, Haier). Leak sealing & genuine charging.',
    descriptionTe: 'ఎల్జీ, శామ్‌సంగ్, వర్ల్‌పూల్, గోద్రెజ్ మొదలైన అన్ని డబుల్ డోర్ ఫ్రిజ్ లకు గ్యాస్ ఫిల్లింగ్.',
    features: ['Condenser coil leak test', 'Evaporator fan check', 'Full chamber chill test']
  },
  {
    id: 'fridge-double-134',
    name: 'Double Door Fridge R-134a Gas Refill',
    nameTe: 'డబుల్ డోర్ ఫ్రిజ్ R-134a గ్యాస్ రీఫిల్',
    category: 'fridge',
    price: 2050,
    duration: '60 mins',
    description: 'High-durability R-134a gas refill with high-pressure nitrogen testing.',
    descriptionTe: 'నైట్రోజన్ టెస్ట్ తో డబుల్ డోర్ ఫ్రిజ్ గ్యాస్ చార్జింగ్.',
    features: ['Filter & valve replacement', 'Thermostat setting', 'Quick cooling guarantee']
  },
  {
    id: 'fridge-double-290',
    name: 'Inverter Double Door / Side-by-Side R-290 Gas Refill',
    nameTe: 'ఇన్వర్టర్ / సైడ్-బై-సైడ్ R-290 గ్యాస్ రీఫిల్',
    category: 'fridge',
    price: 3200,
    duration: '60 mins',
    description: 'Specialized inverter compressor charging with high-grade R-290 refrigerant.',
    descriptionTe: 'హై-ఎండ్ ఇన్వర్టర్ ఫ్రిజ్ ల కొరకు స్పెషలిస్ట్ గ్యాస్ సర్వీస్.',
    features: ['Inverter PCB diagnostics', 'Precision digital gauge refill', 'Commercial freezer compatibility']
  },
  {
    id: 'fridge-visit',
    name: 'Refrigerator Inspection & Visiting Charge',
    nameTe: 'ఫ్రిజ్ చెకప్ & విజిటింగ్ ఛార్జ్',
    category: 'fridge',
    price: 350,
    duration: '30 mins',
    description: 'Doorstep diagnosis for cooling failure, water leakage, strange sounds or power issues.',
    descriptionTe: 'కూలింగ్ అవ్వకపోవడం, నీళ్లు కారడం లేదా పవర్ సమస్యలను ఇంటివద్దనే తనిఖీ చేయడం.',
    features: ['Doorstep technician visit', 'Comprehensive electrical & cooling test', 'Adjustable in repair bill']
  },

  // Washing Machine Services
  {
    id: 'wm-visit',
    name: 'Washing Machine Doorstep Diagnosis & Visiting Charge',
    nameTe: 'వాషింగ్ మెషిన్ విజిటింగ్ & చెకప్ ఛార్జ్',
    category: 'washing_machine',
    price: 350,
    duration: '30 mins',
    popular: true,
    description: 'Complete fault diagnosis of motor, drain pump, inlet valve, belt, or control board.',
    descriptionTe: 'మోటార్, డ్రైన్ పంప్, ఇన్లెట్ వాల్వ్ లేదా పిసిబి బోర్డు సమస్యలను సమగ్రంగా పరిశీలించడం.',
    features: ['Doorstep inspection in 60 mins', 'Front/Top Load expert', 'Transparent quote']
  },
  {
    id: 'wm-service-cleaning',
    name: 'Washing Machine Deep Scale Clean & Drum Wash',
    nameTe: 'వాషింగ్ మెషిన్ డీప్ స్కేల్ క్లీన్ & డ్రమ్ వాష్',
    category: 'washing_machine',
    price: 750,
    duration: '45 mins',
    description: 'Drum de-scaling, lint trap clearing, pulsator cleaning, and high-pressure hose flush.',
    descriptionTe: 'డ్రమ్ మురికి మరియు ఉప్పు నీటి మరకలను తొలగించి బట్టలు పరిశుభ్రంగా ఉతికేలా చేయడం.',
    features: ['Lime scale removal', 'Pulsator disassembly wash', 'Drainage hose unclogging']
  },
  {
    id: 'wm-pcb-repair',
    name: 'Washing Machine PCB Board Repair & Diagnostics',
    nameTe: 'వాషింగ్ మెషిన్ పీసీబీ బోర్డ్ రిపేర్',
    category: 'washing_machine',
    price: 1500,
    duration: '60 mins',
    description: 'Microcontroller repair, relay change, sensor error clearing (OE, UE, dE, IE error codes).',
    descriptionTe: 'ఎర్రర్ కోడ్స్ (OE, UE, dE, IE) మరియు కంట్రోల్ సర్క్యూట్ బోర్డు రిపేర్.',
    features: ['Component level repair', 'Original spare relays', 'Tested with load']
  },

  // Electricals & Appliances
  {
    id: 'appliance-geyser',
    name: 'Water Heater / Geyser Repair & Coil Replacement',
    nameTe: 'గీజర్ రిపేర్ & హీటింగ్ కాయిల్ మార్పు',
    category: 'electrical',
    price: 450,
    duration: '30 mins',
    description: 'Thermostat replacement, heating element change, water leak repair & safe grounding.',
    descriptionTe: 'హీటింగ్ కాయిల్ మార్పు, థర్మోస్టాట్ రిపేర్ మరియు షాక్ ప్రూఫ్ సేఫ్టీ టెస్ట్.',
    features: ['Heating element check', 'Thermostat calibration', 'Safety earthing verification']
  },
  {
    id: 'appliance-microwave',
    name: 'Microwave Oven Doorstep Repair',
    nameTe: 'మైక్రోవేవ్ ఓవెన్ రిపేర్',
    category: 'electrical',
    price: 550,
    duration: '45 mins',
    description: 'Magnetron repair, high-voltage diode replacement, fuse change & turntable fix.',
    descriptionTe: 'వేడి కాకపోవడం, స్పార్కింగ్ రావడం వంటి సమస్యల పరిష్కారం.',
    features: ['Magnetron testing', 'Safe high-voltage discharge', 'Door switch alignment']
  },
  {
    id: 'appliance-fan-wiring',
    name: 'Ceiling Fan, Inverter & Switchboard Electrical Service',
    nameTe: 'సీలింగ్ ఫ్యాన్, ఇన్వర్టర్ & స్విచ్‌బోర్డ్ వైరింగ్',
    category: 'electrical',
    price: 300,
    duration: '30 mins',
    description: 'Short circuit troubleshooting, inverter rewiring, fan capacitor replacement.',
    descriptionTe: 'షార్ట్ సర్క్యూట్ సమస్యలు, ఇన్వర్టర్ కనెక్షన్ మరియు ఫ్యాన్ రిపేర్.',
    features: ['Certified electrician work', 'Safe power routing', 'Prompt fix']
  },

  // AMC Packages
  {
    id: 'amc-home-comfort',
    name: 'Home Comfort AMC (1 Year AC Protection)',
    nameTe: 'హోమ్ కంఫర్ట్ ఏసీ AMC (1 సంవత్సరం ప్రొటెక్షన్)',
    category: 'amc',
    price: 1999,
    duration: '12 Months',
    popular: true,
    description: '2 Free Jet/Foam washes, unlimited breakdown callouts, 20% flat discount on gas & spare parts.',
    descriptionTe: '2 ఉచిత జెట్ వాష్‌లు, అపరిమిత బ్రేక్‌డౌన్ విజిట్స్, గ్యాస్ మరియు స్పేర్ పార్ట్స్ పై 20% డిస్కౌంట్.',
    features: ['2 Scheduled Deep Jet Washes', 'Priority 2-hour technician dispatch', 'Flat 20% off on spare parts & gas', 'Free gas top-up inspection']
  },
  {
    id: 'amc-commercial',
    name: 'Commercial Showroom & Hospital HVAC AMC',
    nameTe: 'కమర్షియల్ షోరూమ్ & హాస్పిటల్ HVAC AMC',
    category: 'amc',
    price: 4999,
    duration: '12 Months',
    description: 'Tailored for Kadapa retail stores, doctors clinics, diagnostic labs & corporate offices.',
    descriptionTe: 'కడపలోని దుకాణాలు, ఆసుపత్రులు మరియు కార్యాలయాల కోసం ప్రత్యేక వార్షిక ప్యాకేజీ.',
    features: ['Quarterly preventive maintenance', 'Emergency 60-min response guarantee', 'Dedicated account technician', 'GST invoice & compliance report']
  }
];

export const INSTAGRAM_PROFILE = {
  handle: '@asrefrigerations.kadapa',
  url: 'https://www.instagram.com/asrefrigerations.kadapa/',
  couponCode: 'INSTA100',
  discountAmount: 100
};

export const GMB_PROFILE = {
  url: 'https://www.reviewsmart.online/r/as-refrigeration',
  reviewCount: 928,
  rating: 4.9
};

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Kondaiah Bathala',
    location: 'Mariapuram, Kadapa',
    rating: 5,
    date: 'Recent',
    service: 'Fridge Gas Refill & Service',
    comment: 'Reasonable price excellent work for my double door fridge repair. Came within 40 minutes and cooled immediately. Highly recommend Sameer Bhai!'
  },
  {
    id: 'rev-2',
    name: 'Shaik Fahimun',
    location: 'Nagarajupalli, Kadapa',
    rating: 5,
    date: 'Recent',
    service: 'Washing Machine Repair',
    comment: 'Good washing machine repair. Drum wasn’t spinning and motor had issue. Fixed cleanly on the spot without taking to shop.'
  },
  {
    id: 'rev-3',
    name: 'Venkata Subba Reddy',
    location: 'RIMS Road, Kadapa',
    rating: 5,
    date: '1 week ago',
    service: 'AC Jet Pump Wash & Gas Refill',
    comment: 'Best AC technician in Kadapa! Our 1.5 ton split AC was blowing warm air. They checked nitrogen leak, refilled R32 gas and jet washed the outdoor unit. Chilling like brand new now.'
  },
  {
    id: 'rev-4',
    name: 'Mohammed Irfan',
    location: 'RTC Bus Stand Circle, Kadapa',
    rating: 5,
    date: '2 weeks ago',
    service: 'AC Uninstallation & Fitting',
    comment: 'Shifted my home from 1 Town to Yerramukkapalli. AS Refrigerations team pumped down the gas safely and re-fitted both ACs with zero gas leakage. Very polite and professional.'
  },
  {
    id: 'rev-5',
    name: 'P. Lakshmi Narayana',
    location: 'NGO Colony, Kadapa',
    rating: 5,
    date: '3 weeks ago',
    service: 'Foam Jet AC Wash',
    comment: 'Done foam jet wash for our 2 split ACs before summer. Water jet and foam cleaning took out so much dust. Electricity bill also reduced because AC cools much faster.'
  },
  {
    id: 'rev-6',
    name: 'Suresh Kumar',
    location: 'Akkayapalli, Kadapa',
    rating: 5,
    date: '1 month ago',
    service: 'Single Door Fridge Repair',
    comment: 'Sameer Bhai is an expert technician. Very honest pricing compared to other local mechanics who ask double money. Giving 5/5 stars.'
  }
];

export const PARTNER_TIERS = [
  {
    id: 'tier-fridge',
    role: 'Refrigerator Technician',
    roleTe: 'రిఫ్రిజిరేటర్ టెక్నీషియన్',
    monthlyFee: 6350,
    leadsExpected: '40-60 Qualified Leads / Month',
    badge: 'Steady Earner',
    benefits: [
      'Verified refrigerator repair & gas refill leads',
      'Preferred service territory in Kadapa district',
      'Transparent job allocation on mobile dashboard',
      'Support for genuine spare parts & technical escalation',
      'No hidden commissions per job'
    ]
  },
  {
    id: 'tier-ac',
    role: 'AC Specialist Technician',
    roleTe: 'ఏసీ స్పెషలిస్ట్ టెక్నీషియన్',
    monthlyFee: 8285,
    leadsExpected: '60-90 High-Value Leads / Month',
    badge: 'Most Popular',
    popular: true,
    benefits: [
      'Peak-season priority job allocation for AC repairs',
      'High ticket service calls (Jet wash, Gas refills, Installations)',
      'Direct customer WhatsApp contact & route guidance',
      'Technical backup from Master Shaik Sameer',
      'Weekly payouts & clear earnings record'
    ]
  },
  {
    id: 'tier-wm',
    role: 'Washing Machine Specialist',
    roleTe: 'వాషింగ్ మెషిన్ టెక్నీషియన్',
    monthlyFee: 4950,
    leadsExpected: '35-50 Verified Leads / Month',
    badge: 'Quick Join',
    benefits: [
      'Automatic & semi-automatic machine service calls',
      'Nearby locality requests only (save petrol & time)',
      '100% direct customer collections',
      'Dedicated helpline & spare parts dealer rates',
      'Instant partner profile on AS Refrigerations app'
    ]
  }
];
