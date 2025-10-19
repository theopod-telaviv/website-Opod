import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CapsuleCard } from '@/components/capsules/CapsuleCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';
import { Wifi, Sparkles, Lock, Clock, Droplets, Wind, MapPin, Star } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: `${t('title')} | The O Pod Hotel Tel Aviv`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | The O Pod Hotel`,
      description: t('subtitle'),
      images: ['/images/hero.jpg'],
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
            backgroundImage: 'url(https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/3-%20the-o-pod-hotel-tel-aviv-sea-view.webp)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/80 to-[#1C1C1C]/40" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-manrope leading-tight">
              {t('title')}
            </h1>
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
                  backgroundImage: 'url(https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/5-%20Sea-tel-aviv-yafo-visit-hotel-the-o-pod-view.webp)',
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
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.reviews.map((review: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4">{review.text[locale]}</p>
                <div>
                  <p className="font-semibold text-[#1C1C1C]">{review.name}</p>
                  <p className="text-sm text-neutral-500">{review.country[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
