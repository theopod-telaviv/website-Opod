const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'ljzzccjrxialnmbypvox.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'your-supabase-bucket.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
