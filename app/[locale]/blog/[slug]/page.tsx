import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost, getBlogPosts, incrementViews } from '@/lib/supabase';
import { Clock, Eye, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBlogPostingSchema } from '@/lib/schema';

// Force cette page à être générée dynamiquement (pas pendant le build)
export const dynamic = 'force-dynamic';
// ISR: Refresh page every 60 seconds automatically
export const revalidate = 60;
export const dynamicParams = true; // Allow new articles without rebuild

export async function generateStaticParams() {
  // Return empty array during build to avoid Supabase dependency
  // Pages will be generated on-demand when first visited
  return [];
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | The O Pod Hotel',
    };
  }

  const title = post[`title_${locale}` as keyof typeof post] || post.title_en;
  const description = post[`meta_description_${locale}` as keyof typeof post] ||
                     post[`excerpt_${locale}` as keyof typeof post] ||
                     post.excerpt_en;

  return {
    title: `${title} | The O Pod Hotel Blog`,
    description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: `${title} | The O Pod Hotel Blog`,
      description,
      images: post.cover_image ? [{
        url: post.cover_image,
        width: 1200,
        height: 630,
        alt: title,
      }] : [],
      locale: locale,
      type: 'article',
      siteName: 'The O Pod Hotel',
      url: `https://opodhotel.com/${locale}/blog/${slug}`,
      article: {
        publishedTime: post.published_at,
        modifiedTime: post.updated_at || post.published_at,
        authors: [post.author || 'The O Pod Hotel Team'],
        section: post.category,
        tags: post.tags || [],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | The O Pod Hotel Blog`,
      description,
      images: post.cover_image ? [post.cover_image] : [],
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        'en': `/en/blog/${slug}`,
        'fr': `/fr/blog/${slug}`,
        'he': `/he/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Increment views (async, don't await)
  incrementViews(slug);

  // Fetch latest 3 posts (excluding current post)
  const allPosts = await getBlogPosts();
  const latestPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const getLocalizedField = (field: string, postData = post) => {
    const fieldWithLocale = `${field}_${locale}`;
    return postData[fieldWithLocale as keyof typeof postData] || postData[`${field}_en` as keyof typeof postData];
  };

  const title = getLocalizedField('title') as string;
  const content = getLocalizedField('content') as string;

  return (
    <>
      <JsonLd data={getBlogPostingSchema(post, locale)} />
      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-[#2EC4B6] hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToBlog')}
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-[#2EC4B6] bg-[#2EC4B6]/10 px-4 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-6 font-manrope">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.published_at).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} {t('minRead')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views} {t('views')}</span>
              </div>
            </div>
          </div>

          {post.cover_image && post.cover_image !== null && (
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.cover_image}
                alt={`${title} - ${post.category} article | The O Pod Hotel Tel Aviv Blog`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-manrope prose-headings:text-[#1C1C1C]
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-neutral-700 prose-p:leading-relaxed
              prose-a:text-[#2EC4B6] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#1C1C1C] prose-strong:font-semibold
              prose-ul:list-disc prose-ol:list-decimal
              prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-5 w-5 text-neutral-500" />
                <span className="font-semibold text-neutral-700">{t('tags')}:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-[#F5EFE7] text-neutral-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Latest Posts Section */}
          {latestPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 font-manrope">
                {t('latestPosts')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {latestPosts.map((latestPost) => (
                  <Link
                    key={latestPost.id}
                    href={`/${locale}/blog/${latestPost.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100"
                  >
                    {latestPost.cover_image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={latestPost.cover_image}
                          alt={`${getLocalizedField('title', latestPost)} - ${latestPost.category} | The O Pod Hotel Blog`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-[#2EC4B6] bg-[#2EC4B6]/10 px-3 py-1 rounded-full">
                          {latestPost.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1C1C1C] mb-2 group-hover:text-[#2EC4B6] transition-colors line-clamp-2">
                        {getLocalizedField('title', latestPost)}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                        {getLocalizedField('excerpt', latestPost)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{latestPost.reading_time} {t('minRead')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{latestPost.views}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
