import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://the-opod-hotel-telaviv.netlify.app';

  const capsulesDir = path.join(process.cwd(), 'content/capsules');
  const capsuleFiles = fs.readdirSync(capsulesDir);
  const capsuleSlugs = capsuleFiles.map((file) => file.replace('.json', ''));

  const routes = ['', '/capsules', '/hotel', '/experience-tel-aviv', '/faq', '/contact', '/accessibilite'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });

    capsuleSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/capsules/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  return sitemapEntries;
}
