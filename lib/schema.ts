export function getOrganizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': 'https://the-opod-hotel-telaviv.netlify.app/#organization',
    name: 'The O Pod Hotel',
    alternateName: 'O Pod Hotel Tel Aviv',
    url: 'https://the-opod-hotel-telaviv.netlify.app',
    logo: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
    image: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-home.png',
    description: {
      he: 'מלון הקפסולות הזול והממוקם הטוב ביותר בתל אביב מול הים החל מ-165₪. מלון קפסולות מודרני צעדים מחוף הים התיכון.',
      en: 'The cheapest and best-located pod hotel in Tel Aviv facing the sea from 165₪. Modern pod hotel steps from the Mediterranean beach.',
      fr: "L'hôtel capsule le moins cher et le mieux placé de Tel Aviv en face de la mer à partir de 165₪. Hôtel capsule moderne à deux pas de la plage.",
    }[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Herbert Samuel St',
      addressLocality: 'Tel Aviv',
      postalCode: '63000',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.0798,
      longitude: 34.7694,
    },
    telephone: '+972-3-XXX-XXXX',
    email: 'reservations@theopodhotel.com',
    priceRange: '₪₪',
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '320',
      bestRating: '5',
      worstRating: '1',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Reception', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Secure Lockers', value: true },
    ],
    sameAs: [
      'https://www.instagram.com/theopodhotel',
      'https://www.facebook.com/theopodhotel',
      'https://www.booking.com/hotel/il/the-o-pod-hotel.html',
      'https://www.google.com/maps/place/The+O+Pod+Hotel',
    ],
  };
}

export function getWebsiteSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://the-opod-hotel-telaviv.netlify.app/#website',
    url: 'https://the-opod-hotel-telaviv.netlify.app',
    name: 'The O Pod Hotel',
    inLanguage: locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://the-opod-hotel-telaviv.netlify.app/${locale}/capsules?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getCapsuleSchema(
  capsule: any,
  locale: string,
  currency: string = 'ILS'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: capsule.name[locale],
    description: capsule.description?.[locale] || capsule.short[locale],
    image: capsule.images,
    offers: {
      '@type': 'Offer',
      price: capsule.price_from[currency],
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: `https://the-opod-hotel-telaviv.netlify.app/${locale}/capsules/${capsule.slug}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    brand: {
      '@type': 'Brand',
      name: 'The O Pod Hotel',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '120',
    },
  };
}

export function getFAQSchema(faqItems: Array<{ q: Record<string, string>; a: Record<string, string> }>, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[locale],
      },
    })),
  };
}
