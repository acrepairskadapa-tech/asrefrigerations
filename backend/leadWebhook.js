/**
 * AS REFRIGERATIONS - Serverless Lead Dispatcher
 * Zero-SMS Architecture: Routes leads directly to Sameer's WhatsApp and updates real-time queues.
 */

const SAMEER_PHONE = "917815851330";
const BANGALORE_BRANCH_PHONE = "917815851330";

exports.onBookingCreated = async (bookingData) => {
  const {
    id,
    customerName,
    customerMobile,
    serviceTitle,
    city,
    locality,
    fullAddress,
    estimatedPrice,
    timeSlot,
    isAssignedToSameer
  } = bookingData;

  // Format WhatsApp message
  const dispatchText = 
    `*🚨 NEW DOORSTEP BOOKING - AS REFRIGERATIONS*\n` +
    `Booking ID: ${id}\n` +
    `City / Branch: ${city.toUpperCase()} (${locality})\n` +
    `Customer: ${customerName} (+91 ${customerMobile})\n` +
    `Service: ${serviceTitle}\n` +
    `Time Slot: ${timeSlot}\n` +
    `Address: ${fullAddress}\n` +
    `Est. Price: ₹${estimatedPrice}\n` +
    `Priority Route: ${isAssignedToSameer ? "👑 Shaik Sameer (Priority 1)" : "Branch Partner Lead"}\n\n` +
    `Open Portal to update status: https://asrefrigerations.com/#portals`;

  const targetPhone = city === "kadapa" ? SAMEER_PHONE : BANGALORE_BRANCH_PHONE;
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(dispatchText)}`;

  console.log(`[DISPATCH] Booking ${id} routed for ${city} to ${targetPhone}`);
  return { success: true, bookingId: id, whatsappUrl };
};
