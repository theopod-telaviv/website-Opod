import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CapsuleCard } from '@/components/capsules/CapsuleCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';
import { TestimonialsCarousel } from '@/components/testimonials/TestimonialsCarousel';
import { Wifi, Sparkles, Lock, Clock, Droplets, Wind, MapPin, Star } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  const descriptions = {
    en: "Your hotel in Tel Aviv by the Mediterranean Sea from 165₪. Modern pod hotel steps from the beach. Book your stay now!",
    fr: "Votre hôtel à Tel Aviv au bord de la Méditerranée à partir de 165₪. Hôtel capsule moderne à deux pas de la plage. Réservez maintenant !",
    he: "המלון שלכם בתל אביב על חוף הים התיכון מ-165₪. מלון קפסולות מודרני צעדים מהחוף. הזמינו עכשיו!"
  };

  const titles = {
    en: "The O Pod Hotel Tel Aviv - Modern Pod Hotel by the Mediterranean",
    fr: "The O Pod Hotel Tel Aviv - Hôtel Capsule Moderne au Bord de la Méditerranée",
    he: "The O Pod Hotel תל אביב - מלון קפסולות מודרני על חוף הים התיכון"
  };

  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  const title = titles[locale as keyof typeof titles] || titles.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
          width: 512,
          height: 512,
          alt: 'The O Pod Hotel Logo',
          type: 'image/png',
        },
        {
          url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-home.png',
          width: 1200,
          height: 630,
          alt: 'The O Pod Hotel Tel Aviv - Modern Pod Hotel by the Mediterranean Sea',
          type: 'image/png',
        }
      ],
      locale: locale,
      type: 'website',
      siteName: 'The O Pod Hotel Tel Aviv',
      url: `https://the-opod-hotel-telaviv.netlify.app/${locale}`
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-home.png'],
    },
    metadataBase: new URL('https://the-opod-hotel-telaviv.netlify.app'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'he': '/he',
      },
    },
  };
}

async function getCapsules() {
  const capsulesDir = path.join(process.cwd(), 'content/capsules');
  const files = fs.readdirSync(capsulesDir);

  const capsules = files.map((file) => {
    const content = fs.readFileSync(path.join(capsulesDir, file), 'utf-8');
    return JSON.parse(content);
  });

  return capsules.sort((a, b) => a.price_from.ILS - b.price_from.ILS);
}

async function getTestimonials() {
  const testimonialsPath = path.join(process.cwd(), 'content/testimonials.json');
  const content = fs.readFileSync(testimonialsPath, 'utf-8');
  return JSON.parse(content);
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tFeatures = await getTranslations({ locale, namespace: 'features' });
  const tCapsules = await getTranslations({ locale, namespace: 'capsules' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tTestimonials = await getTranslations({ locale, namespace: 'testimonials' });

  const capsules = await getCapsules();
  const featuredCapsules = capsules.slice(0, 6);
  const testimonialsData = await getTestimonials();

  const features = [
    { icon: Wifi, label: tFeatures('wifi') },
    { icon: Sparkles, label: tFeatures('towels') },
    { icon: Lock, label: tFeatures('lockers') },
    { icon: Clock, label: tFeatures('reception') },
    { icon: Droplets, label: tFeatures('showers') },
    { icon: Wind, label: tFeatures('air') },
  ];

  return (
    <>
      <JsonLd data={getOrganizationSchema(locale)} />
      <JsonLd data={getWebsiteSchema(locale)} />

      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/3-%20the-o-pod-hotel-tel-aviv-sea-view.webp)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/80 to-[#1C1C1C]/40" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 font-manrope leading-tight">
              {t('title')}
            </h1>

            {/* Rating and Tagline */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-[#FFD700] text-[#FFD700]" />
                ))}
                <span className="text-lg font-semibold text-[#F5EFE7] ml-2">
                  (320 {locale === 'fr' ? 'avis' : locale === 'he' ? 'ביקורות' : 'reviews'})
                </span>
              </div>
              <p className="text-lg md:text-xl font-medium text-[#2EC4B6] bg-[#1C1C1C]/50 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
                {t('tagline')}
              </p>
            </div>

            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-[#F5EFE7]">
              {t('subtitle')}
            </p>
            <Link href={`/${locale}/capsules`}>
              <Button size="lg" className="bg-[#2EC4B6] hover:bg-[#28b0a3] text-white text-lg px-8 py-6">
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-[#2EC4B6]" />
                </div>
                <p className="text-sm font-medium text-[#1C1C1C]">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">
              {tCapsules('title')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {tHome('capsuleSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCapsules.map((capsule) => (
              <CapsuleCard key={capsule.id} capsule={capsule} locale={locale} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${locale}/capsules`}>
              <Button size="lg" variant="outline" className="border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white">
                {tCapsules('viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1C1C1C] mb-6 font-manrope">
                {tHome('discoverTelAviv')}
              </h2>
              <p className="text-lg text-neutral-700 mb-6">
                {tHome('discoverSubtitle')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#2EC4B6]" />
                  <span className="text-neutral-700">{tHome('walkToBeach')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#2EC4B6]" />
                  <span className="text-neutral-700">{tHome('walkToMarket')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#2EC4B6]" />
                  <span className="text-neutral-700">{tHome('walkToJaffa')}</span>
                </div>
              </div>
              <Link href={`/${locale}/hotel`}>
                <Button className="mt-8 bg-[#2EC4B6] hover:bg-[#28b0a3] text-white">
                  {tHome('exploreArea')}
                </Button>
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/5-%20Sea-tel-aviv-yafo-visit-hotel-the-o-pod-view.webp)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1C1C1C] mb-12 text-center font-manrope">
            {tTestimonials('title')}
          </h2>
          <TestimonialsCarousel reviews={testimonialsData.reviews} locale={locale} />
          <div className="flex justify-center mt-8">
            <Button
              asChild
              className="bg-[#2EC4B6] hover:bg-[#26a89c] text-white px-8 py-6 text-lg rounded-full transition-colors"
            >
              <a
                href="https://www.google.com/travel/search?q=avis%20capsule%20hotel%20opod%20tel%20aviv&g2lb=202952%2C4965990%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C72959983%2C73053698%2C73059275%2C73064764%2C73107089%2C73148424&hl=fr-IL&gl=il&ssta=1&ts=CAEaRwopEicyJTB4MTUxZDRjOTdkNGM0N2U0MzoweDlhNWMxYzEzZWFjZDRiMTASGhIUCgcI6Q8QCxgFEgcI6Q8QCxgGGAEyAhAA&qs=CAEyFENnc0lrSmExMXI2Q2g2NmFBUkFCOAJCCQkQS83qExxcmkIJCRBLzeoTHFya&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwjYxs2FhsKQAxUAAAAAHQAAAAAQBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tTestimonials('seeAllReviews')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
