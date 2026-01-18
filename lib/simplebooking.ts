export interface BookingCriteria {
  locale: 'he' | 'en' | 'fr';
  currency?: 'ILS' | 'USD' | 'EUR';
  checkin?: string;
  checkout?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  roomType?: string;
}

const LOCALE_MAP = {
  he: 'HE',
  en: 'EN',
  fr: 'FR',
} as const;

export function buildSimpleBookingUrl(criteria: BookingCriteria): string {
  const baseUrl = process.env.SIMPLEBOOKING_BASE_URL || 'https://www.simplebooking.it/ibe2/hotel/9240';
  const url = new URL(baseUrl);

  // Language parameter
  url.searchParams.set('lang', LOCALE_MAP[criteria.locale] || 'EN');

  // Currency - always EUR as per SimpleBooking requirements
  url.searchParams.set('cur', 'EUR');

  // Guests parameter - always 'A' as per SimpleBooking format
  url.searchParams.set('guests', 'A');

  // Check-in date (using 'in' parameter)
  if (criteria.checkin) {
    url.searchParams.set('in', criteria.checkin);
  }

  // Check-out date (using 'out' parameter)
  if (criteria.checkout) {
    url.searchParams.set('out', criteria.checkout);
  }

  // Coupon parameter (empty as per SimpleBooking format)
  url.searchParams.set('coupon', '');

  return url.toString();
}

export function trackBookingEvent(eventName: string, criteria: BookingCriteria) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      locale: criteria.locale,
      currency: criteria.currency,
      adults: criteria.adults,
      children: criteria.children,
      rooms: criteria.rooms,
      checkin: criteria.checkin,
      checkout: criteria.checkout,
      room_type: criteria.roomType,
      item_name: criteria.roomType,
    });
  }
}
