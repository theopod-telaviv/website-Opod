import { getTranslations } from 'next-intl/server';
import { CapsuleCard } from '@/components/capsules/CapsuleCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema } from '@/lib/schema';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'capsules' });

  const descriptions = {
    en: "Discover our modern pod accommodations in Tel Aviv from 165₪. Solo, double, and sea-view capsules. Book your perfect pod by the Mediterranean!",
    fr: "Découvrez nos capsules modernes à Tel Aviv à partir de 165₪. Capsules solo, double et vue mer. Réservez votre pod parfait au bord de la Méditerranée !",
    he: "גלו את הקפסולות המודרניות שלנו בתל אביב מ-165₪. קפסולות יחיד, זוגי ונוף ים. הזמינו את הפוד המושלם שלכם על חוף הים התיכון!"
  };

  const titles = {
    en: "Capsules | The O Pod Tel Aviv - From 165₪",
    fr: "Capsules | The O Pod Tel Aviv - Dès 165₪",
    he: "קפסולות | The O Pod תל אביב - מ-165₪"
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
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-capsules.png',
        width: 1200,
        height: 630,
        alt: 'The O Pod Hotel Capsules - Modern Pod Accommodations in Tel Aviv'
      }],
      locale: locale,
      type: 'website',
      siteName: 'The O Pod Hotel Tel Aviv',
      url: `https://opodhotel.com/${locale}/capsules`
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-capsules.png'],
    },
    alternates: {
      canonical: `/${locale}/capsules`,
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

export default async function CapsulesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'capsules' });
  const capsules = await getCapsules();

  const breadcrumbs = [
    { name: 'Home', url: `https://theopodhotel.com/${locale}` },
    { name: 'Capsules', url: `https://theopodhotel.com/${locale}/capsules` },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">
            {t('title')}
          </h1>
          <p className="text-xl text-neutral-600">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capsules.map((capsule) => (
              <CapsuleCard key={capsule.id} capsule={capsule} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
