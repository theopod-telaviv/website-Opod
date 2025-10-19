import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { CapsuleImageGallery } from '@/components/capsules/CapsuleImageGallery';
import { JsonLd } from '@/components/seo/JsonLd';
import { getCapsuleSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wifi, Sparkles, Lock, Wind, Eye, Maximize2 } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const capsulesDir = path.join(process.cwd(), 'content/capsules');
  const files = fs.readdirSync(capsulesDir);

  return files.map((file) => ({
    slug: file.replace('.json', ''),
  }));
}

async function getCapsule(slug: string) {
  try {
    const capsulePath = path.join(process.cwd(), 'content/capsules', `${slug}.json`);
    const content = fs.readFileSync(capsulePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const capsule = await getCapsule(slug);

  if (!capsule) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${capsule.name[locale]} | The O Pod Hotel`,
    description: capsule.short[locale],
    openGraph: {
      title: `${capsule.name[locale]} | The O Pod Hotel`,
      description: capsule.short[locale],
      images: [capsule.images[0]],
    },
  };
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  towels: Sparkles,
  lockers: Lock,
  air_conditioning: Wind,
  sea_view: Eye,
  balcony: Maximize2,
};

export default async function CapsuleDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const capsule = await getCapsule(slug);
  const t = await getTranslations({ locale, namespace: 'capsules' });

  if (!capsule) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: `https://theopodhotel.com/${locale}` },
    { name: 'Capsules', url: `https://theopodhotel.com/${locale}/capsules` },
    { name: capsule.name[locale], url: `https://theopodhotel.com/${locale}/capsules/${slug}` },
  ];

  // Helper function to translate amenity names
  const translateAmenity = (amenity: string) => {
    const key = amenity.replace(/ /g, '_');
    return t(key) !== key ? t(key) : amenity.replace(/_/g, ' ');
  };

  return (
    <>
      <JsonLd data={getCapsuleSchema(capsule, locale)} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      {capsule.faq && capsule.faq.length > 0 && <JsonLd data={getFAQSchema(capsule.faq, locale)} />}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">
                  {capsule.name[locale]}
                </h1>
                <div className="flex gap-2 mb-4">
                  {capsule.sea_view && (
                    <Badge className="bg-[#2EC4B6] text-white">
                      <Eye className="h-3 w-3 mr-1" />
                      {t('seaview')}
                    </Badge>
                  )}
                  {capsule.accessible && <Badge className="bg-[#1C1C1C] text-white">{t('accessible')}</Badge>}
                  {capsule.balcony && <Badge className="bg-[#D8C3A5] text-[#1C1C1C]">{t('balcony')}</Badge>}
                </div>
                <p className="text-xl text-neutral-600">{capsule.short[locale]}</p>
              </div>

              <CapsuleImageGallery
                images={capsule.images}
                alt={capsule.name[locale]}
              />

              <div className="bg-[#F5EFE7] rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4 font-manrope">{t('aboutPod')}</h2>
                <p className="text-neutral-700 mb-6">{capsule.description?.[locale] || capsule.short[locale]}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{t('occupancy')}</p>
                    <p className="text-lg font-semibold text-[#1C1C1C]">
                      {capsule.occupancy} {capsule.occupancy === 1 ? t('person') : t('people')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{t('bedSize')}</p>
                    <p className="text-lg font-semibold text-[#1C1C1C]">{capsule.bed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{t('dimensions')}</p>
                    <p className="text-lg font-semibold text-[#1C1C1C]">
                      {capsule.dimensions_m.w} × {capsule.dimensions_m.l} m
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">{t('amenities')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {capsule.amenities.map((amenity: string) => {
                      const Icon = amenityIcons[amenity] || Sparkles;
                      return (
                        <div key={amenity} className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5 text-[#2EC4B6]" />
                          </div>
                          <span className="text-sm text-neutral-700 capitalize">
                            {translateAmenity(amenity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {capsule.faq && capsule.faq.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4 font-manrope">{t('faq')}</h2>
                  <Accordion type="single" collapsible>
                    {capsule.faq.map((item: any, index: number) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.q[locale]}</AccordionTrigger>
                        <AccordionContent>{item.a[locale]}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 mb-6 shadow-lg">
                  <p className="text-sm text-neutral-500 mb-1">{t('from')}</p>
                  <p className="text-4xl font-bold text-[#2EC4B6] mb-4">
                    {capsule.price_from.ILS} ILS
                    <span className="text-lg font-normal text-neutral-500">/{t('night')}</span>
                  </p>
                </div>
                <BookingWidget locale={locale as 'he' | 'en' | 'fr'} capsuleSlug={slug} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
