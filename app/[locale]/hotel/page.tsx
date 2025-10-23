import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { JsonLd } from '@/components/seo/JsonLd';
import { HotelGallery } from '@/components/hotel/HotelGallery';
import { getOrganizationSchema } from '@/lib/schema';
import { Clock, Lock, Droplets, Wind, Wifi, MapPin, Users, Shield } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const descriptions = {
    en: "Modern pod hotel in Tel Aviv by the Mediterranean. 24/7 reception, secure lockers, modern showers. Steps from the beach. Book from 165₪!",
    fr: "Hôtel capsule moderne à Tel Aviv au bord de la Méditerranée. Réception 24/7, casiers sécurisés, douches modernes. À deux pas de la plage. À partir de 165₪ !",
    he: "מלון קפסולות מודרני בתל אביב על חוף הים התיכון. קבלה 24/7, לוקרים מאובטחים, מקלחות מודרניות. צעדים מהחוף. מ-165₪!"
  };

  const titles = {
    en: "The Hotel | The O Pod Hotel Tel Aviv - Modern Pod Hotel by the Beach",
    fr: "L'Hôtel | The O Pod Hotel Tel Aviv - Hôtel Capsule Moderne Près de la Plage",
    he: "המלון | The O Pod Hotel תל אביב - מלון קפסולות מודרני ליד החוף"
  };

  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  const title = titles[locale as keyof typeof titles] || titles.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-og-image.png',
        width: 1200,
        height: 630,
        alt: 'The O Pod Hotel Tel Aviv - Modern Pod Hotel'
      }],
      locale: locale,
      type: 'website',
      siteName: 'The O Pod Hotel Tel Aviv',
      url: `https://theopodhotel.com/${locale}/hotel`
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-og-image.png'],
    },
    alternates: {
      canonical: `/${locale}/hotel`,
    },
  };
}

const hotelImages = [
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/1-%20hall-entree-design-hotel-the-o-pod-hotel-style-surf_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/2-%20espace-lounge-vue-mer-hotel-the-o-pod-%20boheme-chic_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/3-%20mezzanine-lounge-vue-mer-bar-panoramique-escalier-industriel-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/4-%20sea-view-lounge-the-o-pod-hotel.webp_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/5%20-%20panoramic-bar-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/6%20-%20coworking-space-sea-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/7-elevator-hall-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/8%20-%20green-wall-lounge-sea-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/9%20-%20capsule-corridor-sea-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/10%20-%20reception-hall-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/11%20-%20surf-style-hallway-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/12%20-%20relaxation-area-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/13-%20hallway-sea-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/14%20-%20art-gallery-corner-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/15%20-%20hotel-reception-desk-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/16%20-%20surf-inspired-hallway-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/17%20-%20green-wall-entrance-the-o-pod-%20hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/19%20-%20panoramic-lounge-ocean-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/20%20-%20design-seating-area-the-o-pod-hotel.webp_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/21%20-%20modern-coworking-space-the-o-pod-hotel.webp_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/22%20-%20sea-view-terrace-the-o-pod-hotel.webp_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/23%20-%20indoor-green-wall-the-o-pod-hotel.webp_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/24%20-%20boho-lounge-sea-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/25%20-%20modern-lockers-area-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/26%20-%20industrial-locker-room-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/27%20-%20elevator-hall-design-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/28%20-%20oceanfront-coworking-space-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/29%20-%20elegant-restroom-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/30%20-%20modern-shower-area-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/31%20-%20sea-view-lounge-curtains-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/32%20-%20surfboard-hallway-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/33%20-%20ocean-inspired-locker-hall-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/34%20-%20modern-locker-entrance-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/35%20-%20industrial-elevator-lobby-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/36%20-%20beachfront-lounge-area-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/37%20-%20sunset-terrace-sea-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/38%20-%20decorative-hallway-design-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/39%20-%20green-wall-lounge-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/40%20-%20panoramic-sea-view-lounge-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/41%20-%20rattan-chair-ocean-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/42%20-%20bohemian-lounge-interior-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/43%20-%20hallway-sunset-view-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/44%20-%20reception-lobby-design-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/45%20-%20art-gallery-ceiling-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/46%20-%20locker-room-vanity-area-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/47%20-%20mens-restroom-entrance-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/48%20-%20modern-shower-cabins-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/49%20-%20minimalist-locker-room-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/50%20-%20private-locker-area-the-o-pod-hotel_11zon.webp',
  'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Hotel/51%20-%20capsule-room-entrance-the-o-pod-hotel_11zon.webp',
];

export default async function HotelPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hotel' });

  return (
    <>
      <JsonLd data={getOrganizationSchema(locale)} />

      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">{t('title')}</h1>
          <p className="text-xl text-neutral-600">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-[#1C1C1C] mb-6 font-manrope">{t('aboutTitle')}</h2>
              <p className="text-lg text-neutral-700 mb-4">{t('aboutText1')}</p>
              <p className="text-lg text-neutral-700 mb-4">{t('aboutText2')}</p>
              <p className="text-lg text-neutral-700 mb-4">{t('aboutText3')}</p>
              <p className="text-lg text-neutral-700 mb-4">{t('aboutText4')}</p>
              <p className="text-lg text-neutral-700 mb-4">{t('aboutText5')}</p>
              <p className="text-lg text-neutral-700">{t('aboutText6')}</p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/4-%20Tel-aviv-the-o-pod-hotel-skyline-view-tayelet-sea-beach.webp"
                alt="Tel Aviv Skyline View"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <HotelGallery
            images={hotelImages}
            translations={{
              title: t('galleryTitle'),
              viewMore: t('viewMore'),
              viewAll: t('viewAll'),
              showLess: t('showLess'),
            }}
          />

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#1C1C1C] mb-12 text-center font-manrope">
              {t('servicesTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-[#2EC4B6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{t('reception247')}</h3>
                <p className="text-neutral-600">{t('receptionDesc')}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-7 w-7 text-[#2EC4B6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{t('secureLockers')}</h3>
                <p className="text-neutral-600">{t('lockersDesc')}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="h-7 w-7 text-[#2EC4B6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{t('modernShowers')}</h3>
                <p className="text-neutral-600">{t('showersDesc')}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <Wind className="h-7 w-7 text-[#2EC4B6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{t('airConditioning')}</h3>
                <p className="text-neutral-600">{t('acDesc')}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <Wifi className="h-7 w-7 text-[#2EC4B6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{t('highSpeedWifi')}</h3>
                <p className="text-neutral-600">{t('wifiDesc')}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-[#2EC4B6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{t('commonAreas')}</h3>
                <p className="text-neutral-600">{t('areasDesc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F5EFE7] rounded-2xl p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-3xl font-bold text-[#1C1C1C] mb-6 font-manrope">{t('locationTitle')}</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#2EC4B6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1C1C1C]">Kaufmann St 2, Tel Aviv-Yafo</p>
                      <p className="text-neutral-600">Prime beachfront location</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#2EC4B6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1C1C1C]">5 minutes to Gordon Beach</p>
                      <p className="text-neutral-600">Walk to the Mediterranean in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#2EC4B6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1C1C1C]">20 minutes from Ben Gurion Airport</p>
                      <p className="text-neutral-600">Easy access by train or taxi</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1C1C1C] mb-4 mt-8">{t('hoursTitle')}</h3>
                <div className="space-y-2 text-neutral-700">
                  <div className="flex justify-between">
                    <span className="font-medium">{t('reception')}</span>
                    <span>{t('always247')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('checkin')}</span>
                    <span>{t('from1500')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('checkout')}</span>
                    <span>{t('until1100')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('lateArrival')}</span>
                    <span>{t('alwaysPossible')}</span>
                  </div>
                </div>
              </div>

              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.4156799999997!2d34.76939!3d32.07056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c97d4c47e43%3A0x9a5c1c13eacd4b10!2sThe%20O%20Pod%20Hotel!5e0!3m2!1sen!2sil!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The O Pod Hotel Location"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-[#2EC4B6] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-[#1C1C1C] mb-2 font-manrope">{t('accessibilityTitle')}</h3>
                  <p className="text-neutral-700 mb-4">{t('accessibilityText1')}</p>
                  <p className="text-neutral-700">{t('accessibilityText2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
