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
  localities: string[];
}

export const CITIES_DATA: Record<CityId, CityConfig> = {
  kadapa: {
    id: 'kadapa',
    name: 'Kadapa',
    displayName: 'Kadapa (Flagship Hub)',
    state: 'Andhra Pradesh',
    tagline: '10+ Years Legacy • 50,000+ Homes Serviced',
    phone: '+91 78158 51330',
    phoneRaw: '917815851330',
    whatsappNumber: '917815851330',
    email: 'acrepairskadapa@gmail.com',
    workshopName: 'Mariapuram Workshop & Service Center',
    workshopAddress: '74/15/1 Ground Floor, Lohiya Nagar, Kadapa - Pulivendula Rd, beside 2, Mariapuram, Kadapa – 516001',
    pincode: '516001',
    googleMapsQuery: '74/15/1+Lohiya+Nagar,+Mariapuram,+Kadapa',
    diagnosticFee: 350,
    expressDispatchTime: '60 Mins Express Arrival',
    localities: [
      'Mariapuram (HQ / Workshop)',
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
    ]
  },
  bangalore: {
    id: 'bangalore',
    name: 'Bangalore',
    displayName: 'Bangalore (Kammanahalli Branch)',
    state: 'Karnataka',
    tagline: 'Doorstep AC & Appliance Repair in North-East Bangalore',
    phone: '+91 78158 51330', // Can be updated with new dedicated Bangalore SIM
    phoneRaw: '917815851330',
    whatsappNumber: '917815851330',
    email: 'asrefrigerationbangalore@gmail.com',
    workshopName: 'Kammanahalli Service Hub',
    workshopAddress: '#2, Sree Residency, Venkateshappa Layout, Kammanahalli, Bangalore – 560084',
    pincode: '560084',
    googleMapsQuery: '2+Sree+Residency,+Venkateshappa+Layout,+Kammanahalli,+Bangalore',
    diagnosticFee: 400,
    expressDispatchTime: '60 Mins Express Arrival',
    localities: [
      'Kammanahalli (Branch Hub)',
      'Venkateshappa Layout',
      'Kalyan Nagar (HRBR Layout)',
      'HBR Layout',
      'Banaswadi',
      'Hennur Gardens / Hennur Cross',
      'Lingarajapuram',
      'Frazer Town / Pulikeshi Nagar',
      'Cooke Town',
      'Cox Town',
      'Kasturi Nagar',
      'Horamavu',
      'Ramamurthy Nagar',
      'Babu Sahib Palya (Babusapalya)',
      'Kothanur',
      'TC Palya',
      'Nagawara',
      'Hebbal Kempapura',
      'Indiranagar (100ft Road / CMH Rd)',
      'Ulsoor',
      'Jeevan Bima Nagar',
      'CV Raman Nagar',
      'Byappanahalli',
      'Maruthi Seva Nagar',
      'Jal Vayu Vihar'
    ]
  }
};
