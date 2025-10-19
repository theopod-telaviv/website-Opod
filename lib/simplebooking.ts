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

  url.searchParams.set('lang', LOCALE_MAP[criteria.locale] || 'EN');
  url.searchParams.set('cur', criteria.currency || 'ILS');

  if (criteria.checkin) {
    url.searchParams.set('checkin', criteria.checkin);
  }

  if (criteria.checkout) {
    url.searchParams.set('checkout', criteria.checkout);
  }

  if (criteria.adults && criteria.adults > 0) {
    url.searchParams.set('adults', criteria.adults.toString());
  }

  if (criteria.children && criteria.children > 0) {
    url.searchParams.set('children', criteria.children.toString());
  }

  if (criteria.rooms && criteria.rooms > 0) {
    url.searchParams.set('rooms', criteria.rooms.toString());
  }

  if (criteria.roomType) {
    url.searchParams.set('roomType', criteria.roomType);
  }

  url.searchParams.set('utm_source', 'website');
  url.searchParams.set('utm_medium', 'booking_widget');
  url.searchParams.set('utm_campaign', 'direct');

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
    });
  }
}
