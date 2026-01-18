import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://opodhotel.com'),
  icons: {
    icon: [
      {
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: 'https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-images-site-web/logo-app-share/the-o-pod-hotel-favicon-512x512.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
