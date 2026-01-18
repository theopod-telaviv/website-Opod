'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye } from 'lucide-react';
import SearchBar from './SearchBar';

interface BlogPost {
  id: string;
  slug: string;
  cover_image: string;
  category: string;
  reading_time: number;
  views: number;
  title_en?: string;
  title_fr?: string;
  title_he?: string;
  excerpt_en?: string;
  excerpt_fr?: string;
  excerpt_he?: string;
  tags?: string[];
}

interface BlogListProps {
  posts: BlogPost[];
  locale: string;
  translations: {
    minRead: string;
    views: string;
    readMore: string;
    noPostsFound: string;
    searchPlaceholder: string;
    previous: string;
    next: string;
    searchResults: string;
    resultsFor: string;
  };
}

const POSTS_PER_PAGE = 6;

export default function BlogList({ posts, locale, translations }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Inverse arrows for Hebrew (RTL language)
  const isRTL = locale === 'he';
  const prevArrow = isRTL ? '→' : '←';
  const nextArrow = isRTL ? '←' : '→';

  const getLocalizedField = (post: BlogPost, field: string) => {
    const fieldWithLocale = `${field}_${locale}` as keyof BlogPost;
    const fieldEn = `${field}_en` as keyof BlogPost;
    return (post[fieldWithLocale] || post[fieldEn]) as string;
  };

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const title = getLocalizedField(post, 'title').toLowerCase();
      const excerpt = getLocalizedField(post, 'excerpt').toLowerCase();
      const category = post.category.toLowerCase();
      const tags = (post.tags || []).join(' ').toLowerCase();

      return (
        title.includes(query) ||
        excerpt.includes(query) ||
        category.includes(query) ||
        tags.includes(query)
      );
    });
  }, [posts, searchQuery, locale]);

  // Calculate pagination based on filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayedPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        placeholder={translations.searchPlaceholder}
        searchQuery={searchQuery}
      />

      {searchQuery && (
        <div className="mb-6 text-center px-4">
          <p className="text-sm sm:text-base text-neutral-600 break-words">
            <span className="font-semibold">{filteredPosts.length}</span> {translations.searchResults}{' '}
            <span className="text-[#2EC4B6] font-semibold break-all">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {displayedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600">{translations.noPostsFound}</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {post.cover_image && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={`${getLocalizedField(post, 'title')} - ${post.category} | The O Pod Hotel Blog`}
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
                        <span>{post.reading_time} {translations.minRead}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views} {translations.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-[#2EC4B6] font-semibold group-hover:underline">
                    {translations.readMore} →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 sm:mt-12">
              {/* Mobile: Navigation buttons on one line */}
              <div className="flex sm:hidden justify-center items-center gap-2 mb-3">
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="flex-1 px-3 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-[#F5EFE7] transition-colors text-sm"
                  >
                    {prevArrow} {translations.previous}
                  </button>
                )}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="flex-1 px-3 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-[#F5EFE7] transition-colors text-sm"
                  >
                    {translations.next} {nextArrow}
                  </button>
                )}
              </div>

              {/* Mobile: Page numbers below */}
              <div className="flex sm:hidden gap-2 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm min-w-[40px] ${
                      pageNum === currentPage
                        ? 'bg-[#2EC4B6] text-white font-semibold'
                        : 'bg-white border border-neutral-200 hover:bg-[#F5EFE7]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Desktop: All on one line */}
              <div className="hidden sm:flex justify-center items-center gap-2">
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-[#F5EFE7] transition-colors"
                  >
                    {prevArrow} {translations.previous}
                  </button>
                )}

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors min-w-[44px] ${
                        pageNum === currentPage
                          ? 'bg-[#2EC4B6] text-white font-semibold'
                          : 'bg-white border border-neutral-200 hover:bg-[#F5EFE7]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-[#F5EFE7] transition-colors"
                  >
                    {translations.next} {nextArrow}
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
