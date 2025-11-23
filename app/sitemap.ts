import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import fs from 'fs';
import path from 'path';
import { getBlogPosts } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://opodhotel.com';

  // Get capsules
  const capsulesDir = path.join(process.cwd(), 'content/capsules');
  const capsuleFiles = fs.readdirSync(capsulesDir);
  const capsuleSlugs = capsuleFiles.map((file) => file.replace('.json', ''));

  // Get blog posts dynamically from Supabase (with error handling)
  let blogPosts: any[] = [];
  try {
    blogPosts = await getBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue without blog posts if Supabase fails
  }

  // Static routes - includes blog index, privacy, terms, accessibility
  const routes = [
    '',
    '/capsules',
    '/hotel',
    '/blog',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/accessibility',
    '/sitemap-page',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add localized static routes
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
      });
    });

    // Add individual capsule pages
    capsuleSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/capsules/${slug}`,
        lastModified: new Date(),
      });
    });

    // Add blog posts dynamically (3 new articles/week = high crawl frequency)
    blogPosts.forEach((post) => {
      const updatedDate = new Date(post.updated_at || post.published_at || post.created_at);

      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: updatedDate,
      });
    });
  });

  return sitemapEntries;
}
