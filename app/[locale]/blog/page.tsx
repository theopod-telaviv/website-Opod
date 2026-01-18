import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/lib/supabase';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBlogSchema } from '@/lib/schema';
import BlogList from '@/components/blog/BlogList';

// Force cette page à être générée dynamiquement (pas pendant le build)
export const dynamic = 'force-dynamic';
// ISR: Refresh page every 60 seconds automatically
export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'blog' });

  const descriptions = {
    en: 'Travel tips, local insights, and Tel Aviv stories from The O Pod Hotel. Discover the best of Tel Aviv beach life.',
    fr: 'Conseils voyage, découvertes locales et histoires de Tel Aviv depuis The O Pod Hotel. Découvrez le meilleur de la vie sur la plage de Tel Aviv.',
    he: 'טיפים לטיולים, תובנות מקומיות וסיפורים מתל אביב מבית The O Pod Hotel. גלו את המיטב של חיי החוף בתל אביב.',
  };

  const titles = {
    en: "Blog | The O Pod Tel Aviv - Travel Tips",
    fr: "Blog | The O Pod Tel Aviv - Conseils Voyage",
    he: "בלוג | The O Pod תל אביב - טיפי טיול"
  };

  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  const title = titles[locale as keyof typeof titles] || titles.en;

  return {
    title,
    description,
    keywords: 'Tel Aviv blog, travel tips, local insights, beach life, hotel blog, Tel Aviv stories',
    openGraph: {
      title: `${t('title')} | The O Pod Hotel`,
      description,
      images: [{
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-home.png',
        width: 1200,
        height: 630,
        alt: 'The O Pod Hotel Blog',
      }],
      locale: locale,
      type: 'website',
      siteName: 'The O Pod Hotel',
      url: `https://opodhotel.com/${locale}/blog`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | The O Pod Hotel`,
      description,
      images: ['https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-og-home.png'],
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        'en': '/en/blog',
        'fr': '/fr/blog',
        'he': '/he/blog',
      },
    },
  };
}

export default async function BlogPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });

  // Fetch blog posts with error handling
  let allPosts: any[] = [];

  try {
    allPosts = await getBlogPosts();
  } catch (e) {
    console.error('Error in BlogPage:', e);
  }

  // Filter out posts with missing critical data
  const validPosts = allPosts.filter((post) => post && post.cover_image && post.slug);

  // Prepare translations object for BlogList component
  const translations = {
    minRead: t('minRead'),
    views: t('views'),
    readMore: t('readMore'),
    noPostsFound: t('noPostsFound'),
    searchPlaceholder: t('searchPlaceholder'),
    previous: t('previous'),
    next: t('next'),
    searchResults: t('searchResults'),
    resultsFor: t('resultsFor'),
  };

  return (
    <>
      <JsonLd data={getBlogSchema(locale)} />
      <section className="py-8 sm:py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 font-manrope">{t('title')}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList posts={validPosts} locale={locale} translations={translations} />
        </div>
      </section>
    </>
  );
}
