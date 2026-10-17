export type CityId = 'kadapa' | 'bangalore';

export interface CityConfig {
  id: CityId;
  name: string;
  displayName: string;
  state: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  workshopName: string;
  workshopAddress: string;
  pincode: string;
  googleMapsQuery: string;
  diagnosticFee: number;
  expressDispatchTime: string;
  coverageScope: string;
  coverageNote: string;
  cityHubLocalities: string[];
  districtTowns: string[];
  localities: string[];
}

export const CITIES_DATA: Record<CityId, CityConfig> = {
  kadapa: {
    id: 'kadapa',
    name: 'Kadapa',
    displayName: 'Kadapa District (Flagship HQ)',
    state: 'Andhra Pradesh',
    tagline: '10+ Years Legacy • 50,000+ Homes Serviced • 100% District-Wide Coverage',
    phone: '+91 78158 51330',
    phoneRaw: '917815851330',
    whatsappNumber: '917815851330',
    email: 'acrepairskadapa@gmail.com',
    workshopName: 'Mariapuram Flagship Workshop & Service Center',
    workshopAddress: '74/15/1 Ground Floor, Lohiya Nagar, Kadapa - Pulivendula Rd, beside 2, Mariapuram, Kadapa – 516001',
    pincode: '516001',
    googleMapsQuery: '74/15/1+Lohiya+Nagar,+Mariapuram,+Kadapa',
    diagnosticFee: 350,
    expressDispatchTime: '60 Mins Express Arrival in Kadapa City • Same-Day District Dispatch',
    coverageScope: '100% Comprehensive Coverage across Entire Kadapa (YSR) District',
    coverageNote: 'Master Lead Shaik Sameer & certified technicians provide complete doorstep repair coverage across Kadapa City Central Hub and all 36+ District Mandals & Towns.',
    cityHubLocalities: [
      'Mariapuram (HQ / Workshop)',
      'Lohiya Nagar',
      'Pulivendula Road',
      'RTC Bus Stand Circle',
      'Chinna Chowk',
      'Pedda Chowk',
      'Akkayapalli',
      'NGO Colony',
      'RIMS Hospital Area',
      'Ravindra Nagar',
      'Prakash Nagar',
      '1 Town Area',
      'Yerramukkapalli',
      'Nagarajupalli',
      'Almaspet',
      'Co-operative Colony',
      'Madhavaram Road',
      'Built-Up Circle',
      'Devuni Kadapa'
    ],
    districtTowns: [
      'Proddatur',
      'Pulivendula',
      'Badvel',
      'Rayachoty',
      'Jammalamadugu',
      'Mydukur',
      'Kamalapuram',
      'Yerraguntla',
      'Vontimitta',
      'Rajampet',
      'Chennur',
      'Porumamilla',
      'Lakkireddipalli',
      'Sidhout (Siddhavatam)',
      'Vempalli',
      'Vallur',
      'Pendlimarri',
      'Sambepalli',
      'Galiveedu',
      'Chapadu',
      'Duvvur',
      'Khajipet',
      'Muddanur',
      'Simhadripuram',
      'Lingala'
    ],
    localities: [
      'Mariapuram (HQ / Workshop)',
      'Lohiya Nagar',
      'Pulivendula Road',
      'RTC Bus Stand Circle',
      'Chinna Chowk',
      'Pedda Chowk',
      'Akkayapalli',
      'NGO Colony',
      'RIMS Hospital Area',
      'Ravindra Nagar',
      'Prakash Nagar',
      '1 Town Area',
      'Yerramukkapalli',
      'Nagarajupalli',
      'Almaspet',
      'Co-operative Colony',
      'Madhavaram Road',
      'Built-Up Circle',
      'Devuni Kadapa',
      'Proddatur',
      'Pulivendula',
      'Badvel',
      'Rayachoty',
      'Jammalamadugu',
      'Mydukur',
      'Kamalapuram',
      'Yerraguntla',
      'Vontimitta',
      'Rajampet',
      'Chennur',
      'Porumamilla',
      'Lakkireddipalli',
      'Sidhout (Siddhavatam)',
      'Vempalli',
      'Vallur',
      'Pendlimarri',
      'Sambepalli',
      'Galiveedu'
    ]
  },
  bangalore: {
    id: 'bangalore',
    name: 'Bangalore',
    displayName: 'Bangalore (Kammanahalli Branch)',
    state: 'Karnataka',
    tagline: 'Doorstep AC & Appliance Repair in Kammanahalli & Nearby Areas',
    phone: '+91 80732 06402',
    phoneRaw: '918073206402',
    whatsappNumber: '918073206402',
    email: 'asrefrigerationbangalore@gmail.com',
    workshopName: 'Kammanahalli Service Hub',
    workshopAddress: '#2, Sree Residency, Venkateshappa Layout, Kammanahalli, Bangalore – 560084',
    pincode: '560084',
    googleMapsQuery: '2+Sree+Residency,+Venkateshappa+Layout,+Kammanahalli,+Bangalore',
    diagnosticFee: 400,
    expressDispatchTime: '60 Mins Express Arrival',
    coverageScope: 'Kammanahalli Branch Hub & Adjacent Neighborhoods Only',
    coverageNote: 'The Bangalore branch operates from #2 Sree Residency, Venkateshappa Layout, Kammanahalli and exclusively serves Kammanahalli and immediate surrounding North-East Bangalore localities for rapid 60-minute doorstep turnaround.',
    cityHubLocalities: [
      'Kammanahalli (Branch Hub)',
      'Venkateshappa Layout',
      'Kalyan Nagar (HRBR Layout)',
      'Banaswadi',
      'HBR Layout',
      'Hennur & Hennur Cross',
      'Lingarajapuram',
      'Ramamurthy Nagar',
      'Horamavu',
      'Kasturi Nagar',
      'Cooke Town',
      'Cox Town',
      'Frazer Town (Pulikeshi Nagar)',
      'Babu Sahib Palya (Babusapalya)',
      'Kothanur',
      'Richards Town'
    ],
    districtTowns: [],
    localities: [
      'Kammanahalli (Branch Hub)',
      'Venkateshappa Layout',
      'Kalyan Nagar (HRBR Layout)',
      'Banaswadi',
      'HBR Layout',
      'Hennur & Hennur Cross',
      'Lingarajapuram',
      'Ramamurthy Nagar',
      'Horamavu',
      'Kasturi Nagar',
      'Cooke Town',
      'Cox Town',
      'Frazer Town (Pulikeshi Nagar)',
      'Babu Sahib Palya (Babusapalya)',
      'Kothanur',
      'Richards Town'
    ]
  }
};
