import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/supabase';
import { Clock, Eye } from 'lucide-react';

// Force cette page à être générée dynamiquement (pas pendant le build)
export const dynamic = 'force-dynamic';
// ISR: Refresh page every 60 seconds automatically
export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: `${t('title')} | The O Pod Hotel`,
    description: t('subtitle'),
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'blog' });

  // Fetch blog posts with error handling
  let posts: any[] = [];
  let error = null;

  try {
    posts = await getBlogPosts();
  } catch (e) {
    console.error('Error in BlogPage:', e);
    error = e;
  }

  const getLocalizedField = (post: any, field: string) => {
    const fieldWithLocale = `${field}_${locale}`;
    return post[fieldWithLocale] || post[`${field}_en`];
  };

  return (
    <>
      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">{t('title')}</h1>
          <p className="text-xl text-neutral-600">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-600">{t('noPostsFound')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts
                .filter((post) => post && post.cover_image && post.slug)
                .map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {post.cover_image && (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={getLocalizedField(post, 'title') || 'Blog post image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#2EC4B6] bg-[#2EC4B6]/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#2EC4B6] transition-colors line-clamp-2">
                      {getLocalizedField(post, 'title')}
                    </h2>
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {getLocalizedField(post, 'excerpt')}
                    </p>
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.reading_time} {t('minRead')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views} {t('views')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-[#2EC4B6] font-semibold group-hover:underline">
                      {t('readMore')} →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
