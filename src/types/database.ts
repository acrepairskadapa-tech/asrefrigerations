import { CityId } from '../data/citiesData';

export type UserRole = 'customer' | 'technician' | 'admin';

export type BookingStatus = 
  | 'booking_received'      // Booking placed / received
  | 'under_review'         // Shaik Sameer or team reviewing symptoms
  | 'technician_assigned'  // Assigned to Sameer (Primary) or Partner Tech (Secondary)
  | 'technician_on_the_way'// Traveling to customer doorstep
  | 'service_in_progress'  // At customer doorstep, repair/wash ongoing
  | 'completed'            // Service completed, payment collected
  | 'cancelled';           // Cancelled

export type PaymentMethod = 'UPI' | 'CASH';
export type PaymentStatus = 'PENDING' | 'PAID';

export interface BookingStatusHistoryItem {
  status: BookingStatus;
  timestamp: string;
  updatedBy: string;
}

export interface BookingLead {
  id: string;
  bookingRef?: string;
  city: CityId;
  locality: string;
  fullAddress: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;

  // Customer Details
  customerName: string;
  customerMobile: string;

  // Service Details
  serviceTitle: string;
  applianceType: string;
  quantity?: number;
  estimatedPrice: number;
  finalPrice?: number; // Decided and fixed on doorstep by Sameer / Technician
  quoteItemization?: { item: string; price: number }[];
  quoteStatus?: 'pending' | 'approved' | 'rejected';
  date: string;
  timeSlot: string;
  notes?: string;

  // Status & Dispatch Details
  status: BookingStatus;
  statusHistory: BookingStatusHistoryItem[];
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  assignedTechnicianPhone?: string;
  isAssignedToSameer: boolean; // Priority 1: Sameer Direct vs Priority 2: Partner Tech

  // Financials & Audit
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  upiTransactionRef?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TechnicianProfile {
  id: string;
  name: string;
  phone: string;
  city: CityId;
  priority: 1 | 2;
  skills: string[];
  rating: number;
  totalJobsCompleted: number;
  isActive: boolean;
  isMasterLead: boolean; // true for Shaik Sameer
  workshopAddress?: string;
}
