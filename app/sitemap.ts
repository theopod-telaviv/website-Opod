import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import fs from 'fs';
import path from 'path';
import { getBlogPosts } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://the-opod-hotel-telaviv.netlify.app';

  // Get capsules
  const capsulesDir = path.join(process.cwd(), 'content/capsules');
  const capsuleFiles = fs.readdirSync(capsulesDir);
  const capsuleSlugs = capsuleFiles.map((file) => file.replace('.json', ''));

  // Get blog posts dynamically from Supabase
  const blogPosts = await getBlogPosts();

  // Static routes - includes blog index, privacy, terms, accessibility, sitemap
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
    '/sitemap-page'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add localized static routes
  locales.forEach((locale) => {
    routes.forEach((route) => {
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
      let priority = 0.8;

      // Homepage: daily crawl, highest priority
      if (route === '') {
        changeFrequency = 'daily';
        priority = 1.0;
      }
      // Blog index: updated 3x/week (Mon, Wed, Fri)
      else if (route === '/blog') {
        changeFrequency = 'daily';
        priority = 0.9;
      }
      // Capsules pages: high priority
      else if (route === '/capsules') {
        priority = 0.9;
      }
      // Legal pages: low frequency
      else if (['/privacy', '/terms', '/accessibility', '/sitemap-page'].includes(route)) {
        changeFrequency = 'monthly';
        priority = 0.3;
      }

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    });

    // Add individual capsule pages
    capsuleSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/capsules/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });

    // Add blog posts dynamically (3 new articles/week = high crawl frequency)
    blogPosts.forEach((post) => {
      const publishedDate = new Date(post.published_at || post.created_at);
      const updatedDate = new Date(post.updated_at);

      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: updatedDate,
        changeFrequency: 'weekly', // Articles updated weekly
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
