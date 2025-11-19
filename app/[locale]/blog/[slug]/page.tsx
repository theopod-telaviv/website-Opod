import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost, getBlogPosts, incrementViews } from '@/lib/supabase';
import { Clock, Eye, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

// Force dynamic rendering - page served by Netlify Function (not pre-generated)
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    const locales = ['en', 'fr', 'he'];

    return posts.flatMap(post =>
      locales.map(locale => ({
        locale,
        slug: post.slug,
      }))
    );
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
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

  const getLocalizedField = (field: string) => {
    const fieldWithLocale = `${field}_${locale}`;
    return post[fieldWithLocale as keyof typeof post] || post[`${field}_en` as keyof typeof post];
  };

  const title = getLocalizedField('title') as string;
  const content = getLocalizedField('content') as string;

  return (
    <>
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

          {post.cover_image && (
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.cover_image}
                alt={title}
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
        </div>
      </article>
    </>
  );
}
