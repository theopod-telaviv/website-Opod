import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Newspaper, Tv, ExternalLink } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPressPageSchema, getMediaCoverageSchema } from '@/lib/schema';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'press' });

  const descriptions = {
    en: "Discover media coverage of The O Pod Hotel Tel Aviv. Featured on Channel 13, Ynet, i24NEWS and more. Award-winning capsule hotel on Kaufmann St 2 near Gordon Beach and the Mediterranean Sea. Budget-friendly accommodation in Tel Aviv city center.",
    fr: "Découvrez la couverture médiatique de The O Pod Hotel Tel Aviv. Présenté sur Channel 13, Ynet, i24NEWS et plus. Hôtel capsule primé sur Kaufmann St 2 près de Gordon Beach et la mer Méditerranée. Hébergement économique au centre de Tel Aviv.",
    he: "גלו את הסיקור התקשורתי של The O Pod Hotel תל אביב. הוצג בערוץ 13, Ynet, i24NEWS ועוד. מלון קפסולות עטור פרסים ברחוב קאופמן 2 ליד חוף גורדון והים התיכון. לינה משתלמת במרכז תל אביב."
  };

  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  const titles = {
    en: "Press | The O Pod Tel Aviv - Media Coverage",
    fr: "Presse | The O Pod Tel Aviv - Couverture",
    he: "עיתונות | The O Pod תל אביב - סיקור"
  };

  const title = titles[locale as keyof typeof titles] || titles.en;

  return {
    title,
    description,
    openGraph: {
      title: `${t('title')} | The O Pod Hotel`,
      description,
      images: [{
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/logo-app-share/the-o-pod-hotel-og-home.png',
        width: 1200,
        height: 630,
        alt: 'The O Pod Hotel Press Coverage',
      }],
      locale: locale,
      type: 'website',
      siteName: 'The O Pod Hotel',
      url: `https://opodhotel.com/${locale}/press`
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | The O Pod Hotel`,
      description,
      images: ['https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/logo-app-share/the-o-pod-hotel-og-home.png'],
    },
    alternates: {
      canonical: `/${locale}/press`,
      languages: {
        'en': '/en/press',
        'fr': '/fr/press',
        'he': '/he/press',
        'x-default': '/en/press'
      }
    },
    keywords: 'The O Pod Hotel, Tel Aviv hotel, capsule hotel, pod hotel, Kaufmann Street, Kaufmann St 2, Gordon Beach, Mediterranean Sea, budget hotel Tel Aviv, cheap accommodation Tel Aviv, Tel Aviv city center, beach hotel, press coverage, media coverage, Channel 13, Ynet, i24NEWS, Walla, Mako, Jewish Chronicle',
  };
}

export default async function PressPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'press' });

  const tvFeatures = [
    {
      title: t('channel13'),
      description: t('channel13Desc'),
      videoId: 'pwdp_oRBC-4',
      url: 'https://www.youtube.com/watch?v=pwdp_oRBC-4'
    },
    {
      title: t('channel13'),
      description: t('channel13Desc'),
      videoId: 'S1-bgDrGeGs',
      url: 'https://www.youtube.com/watch?v=S1-bgDrGeGs'
    },
    {
      title: t('i24news'),
      description: t('i24newsDesc'),
      videoId: 'OYtPKL_4a_g',
      url: 'https://www.youtube.com/watch?v=OYtPKL_4a_g'
    }
  ];

  const pressArticles = [
    {
      title: t('ynet'),
      description: t('ynetDesc'),
      image: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/1-%20Page-on-parle-de-nous/Ynet-press-news-israel-populare-celebrate-news-hotel-capsule-event-futurist-tel-aviv.webp',
      url: 'https://www.ynet.co.il/vacation/flights/article/rynuopilc',
      publisher: 'Ynet',
      datePublished: '2024-03-15'
    },
    {
      title: t('theJC'),
      description: t('theJCDesc'),
      image: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/1-%20Page-on-parle-de-nous/jewish-chronicle-press-numeric-tech-israel-tel-aviv-news-concept-capsule-hotel-theopod-future.webp',
      url: 'https://www.thejc.com/life/revealed-the-smallest-hotel-room-in-israel-puhqdun2',
      publisher: 'The Jewish Chronicle',
      datePublished: '2024-04-10'
    },
    {
      title: t('walla'),
      description: t('wallaDesc'),
      image: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/1-%20Page-on-parle-de-nous/walla-News-Tel-aviv-capsule-hotel-news-tv-press.webp',
      url: 'https://home.walla.co.il/item/3579615',
      publisher: 'Walla! News',
      datePublished: '2024-05-20'
    },
    {
      title: t('mako'),
      description: t('makoDesc'),
      image: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/1-%20Page-on-parle-de-nous/capsule-hotel-telaviv-front-beach-luxury-awesome-vacations-News-Mako.webp',
      url: 'https://www.mako.co.il/living-architecture/local/Article-91d05a21c891881026.htm?sCh=3d385dd2dd5d4110&pId=1288949548',
      publisher: 'Mako',
      datePublished: '2024-06-05'
    }
  ];

  return (
    <>
      {/* JSON-LD Schema for Press Page */}
      <JsonLd data={getPressPageSchema(locale)} />

      {/* JSON-LD Schema for each press article */}
      {pressArticles.map((article, index) => (
        <JsonLd
          key={index}
          data={getMediaCoverageSchema({
            name: article.title,
            description: article.description,
            url: article.url,
            publisher: article.publisher,
            datePublished: article.datePublished
          }, locale)}
        />
      ))}

      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Newspaper className="h-5 w-5 sm:h-6 sm:w-6 text-[#2EC4B6]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] font-manrope">{t('title')}</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600">{t('subtitle')}</p>
        </div>
      </section>

      {/* TV Features Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Tv className="h-6 w-6 sm:h-7 sm:w-7 text-[#2EC4B6]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] font-manrope">{t('tvFeatures')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {tvFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video bg-neutral-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${feature.videoId}`}
                    title={feature.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#1C1C1C] mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4 line-clamp-3">{feature.description}</p>
                  <a
                    href={feature.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#2EC4B6] font-semibold hover:underline text-sm sm:text-base"
                  >
                    {t('watchVideo')}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Articles Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Newspaper className="h-6 w-6 sm:h-7 sm:w-7 text-[#2EC4B6]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] font-manrope">{t('webArticles')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {pressArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#1C1C1C] mb-2">{article.title}</h3>
                  <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4 line-clamp-3">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#2EC4B6] font-semibold hover:underline text-sm sm:text-base"
                  >
                    {t('readArticle')}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
