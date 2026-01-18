export function getOrganizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': 'https://opodhotel.com/#organization',
    name: 'The O Pod Hotel',
    alternateName: 'O Pod Hotel Tel Aviv',
    url: 'https://opodhotel.com',
    logo: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
    image: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-home.png',
    description: {
      he: 'מלון הקפסולות הזול והממוקם הטוב ביותר בתל אביב מול הים החל מ-165₪. מלון קפסולות מודרני צעדים מחוף הים התיכון.',
      en: 'The cheapest and best-located pod hotel in Tel Aviv facing the sea from 165₪. Modern pod hotel steps from the Mediterranean beach.',
      fr: "L'hôtel capsule le moins cher et le mieux placé de Tel Aviv en face de la mer à partir de 165₪. Hôtel capsule moderne à deux pas de la plage.",
    }[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kaufmann St 2',
      addressLocality: 'Tel Aviv-Yafo',
      postalCode: '6801294',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.0798,
      longitude: 34.7694,
    },
    telephone: '+972-3-516-6666',
    email: 'opodhotel@gmail.com',
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
    '@id': 'https://opodhotel.com/#website',
    url: 'https://opodhotel.com',
    name: 'The O Pod Hotel',
    inLanguage: locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://opodhotel.com/${locale}/capsules?search={search_term_string}`,
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
      url: `https://opodhotel.com/${locale}/capsules/${capsule.slug}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IL',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 2,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        refundType: 'https://schema.org/FullRefund',
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Standard Rate',
            value: 'Free cancellation up to 48 hours before arrival (3:00 PM). Cancellations within 48 hours are charged 100% of first night.',
          },
          {
            '@type': 'PropertyValue',
            name: 'Non-Refundable Rate',
            value: 'No cancellation or modification allowed. No refund provided.',
          },
          {
            '@type': 'PropertyValue',
            name: 'Long Stays (30+ nights)',
            value: '30% deposit required. 30% cancellation fee applies. Remaining 70% refunded per standard policy.',
          },
        ],
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: currency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IL',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
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

export function getBlogPostingSchema(post: any, locale: string) {
  const title = post[`title_${locale}`] || post.title_en;
  const excerpt = post[`excerpt_${locale}`] || post.excerpt_en;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://opodhotel.com/${locale}/blog/${post.slug}`,
    headline: title,
    description: excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: post.author || 'The O Pod Hotel Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The O Pod Hotel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://opodhotel.com/${locale}/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(', ') || '',
    articleSection: post.category,
    wordCount: post.reading_time ? post.reading_time * 200 : undefined,
    inLanguage: locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
  };
}

export function getBlogSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `https://opodhotel.com/${locale}/blog`,
    url: `https://opodhotel.com/${locale}/blog`,
    name: 'The O Pod Hotel Blog',
    description: {
      en: 'Travel tips, local insights, and Tel Aviv stories from The O Pod Hotel',
      fr: 'Conseils voyage, découvertes locales et histoires de Tel Aviv',
      he: 'טיפים לטיולים, תובנות מקומיות וסיפורים מתל אביב',
    }[locale],
    publisher: {
      '@type': 'Organization',
      name: 'The O Pod Hotel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
      },
    },
    inLanguage: locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
  };
}

export function getPressPageSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://opodhotel.com/${locale}/press`,
    url: `https://opodhotel.com/${locale}/press`,
    name: {
      en: 'Press Coverage - The O Pod Hotel Tel Aviv',
      fr: 'Couverture Presse - The O Pod Hotel Tel Aviv',
      he: 'סיקור תקשורתי - The O Pod Hotel תל אביב',
    }[locale],
    description: {
      en: "Discover media coverage of The O Pod Hotel. Featured on Channel 13, Ynet, i24NEWS and more. See what the press says about Tel Aviv's innovative capsule hotel.",
      fr: "Découvrez la couverture médiatique de The O Pod Hotel. Présenté sur Channel 13, Ynet, i24NEWS et plus. Voyez ce que la presse dit de l'hôtel capsule innovant de Tel Aviv.",
      he: 'גלו את הסיקור התקשורתי של The O Pod Hotel. הוצג בערוץ 13, Ynet, i24NEWS ועוד. ראו מה העיתונות אומרת על מלון הקפסולות החדשני של תל אביב.',
    }[locale],
    about: {
      '@type': 'Hotel',
      name: 'The O Pod Hotel',
      url: 'https://opodhotel.com',
    },
    inLanguage: locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
  };
}

export function getMediaCoverageSchema(article: {
  name: string;
  description: string;
  url: string;
  publisher: string;
  datePublished?: string;
}, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.name,
    description: article.description,
    url: article.url,
    publisher: {
      '@type': 'Organization',
      name: article.publisher,
    },
    about: {
      '@type': 'Hotel',
      name: 'The O Pod Hotel',
      url: 'https://opodhotel.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kaufmann St 2',
        addressLocality: 'Tel Aviv-Yafo',
        postalCode: '6801294',
        addressCountry: 'IL',
      },
    },
    datePublished: article.datePublished || '2024-01-01',
    inLanguage: locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
    mentions: {
      '@type': 'Hotel',
      name: 'The O Pod Hotel',
      url: 'https://opodhotel.com',
    },
  };
}
