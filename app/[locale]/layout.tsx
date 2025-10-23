import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Manrope } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { CookieConsent } from '@/components/ui/cookie-consent';
import { locales } from '@/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" type="image/x-icon" href="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-favicon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/Logo%20app%20share/the-o-pod-hotel-favicon-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2EC4B6" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header locale={locale} />
          <main className="min-h-screen">{children}</main>
          <Footer locale={locale} />
          <Toaster />
          <WhatsAppButton />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
