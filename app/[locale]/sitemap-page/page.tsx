import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Map, Home, Bed, Building2, Sparkles, MessageSquare, HelpCircle, Mail } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'sitemap' });
  return {
    title: `${t('title')} | The O Pod Hotel`,
    description: t('intro'),
  };
}

export default async function SitemapPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'sitemap' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tFooter = await getTranslations({ locale, namespace: 'footer' });

  const mainPages = [
    { name: tNav('discover'), href: `/${locale}`, icon: Home },
    { name: tNav('capsules'), href: `/${locale}/capsules`, icon: Bed },
    { name: tNav('hotel'), href: `/${locale}/hotel`, icon: Building2 },
    { name: tNav('blog'), href: `/${locale}/blog`, icon: MessageSquare },
    { name: tNav('faq'), href: `/${locale}/faq`, icon: HelpCircle },
    { name: tNav('contact'), href: `/${locale}/contact`, icon: Mail },
  ];

  const legalPages = [
    { name: tFooter('privacyPolicy'), href: `/${locale}/privacy` },
    { name: tFooter('terms'), href: `/${locale}/terms` },
    { name: tFooter('accessibility'), href: `/${locale}/accessibility` },
  ];

  return (
    <>
      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center">
              <Map className="h-6 w-6 text-[#2EC4B6]" />
            </div>
            <h1 className="text-5xl font-bold text-[#1C1C1C] font-manrope">{t('title')}</h1>
          </div>
          <p className="text-xl text-neutral-600">{t('intro')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Pages */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 font-manrope">
                {t('mainPages')}
              </h2>
              <ul className="space-y-4">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="flex items-center gap-3 text-neutral-700 hover:text-[#2EC4B6] transition-colors group"
                    >
                      <page.icon className="h-5 w-5 text-[#2EC4B6]" />
                      <span className="group-hover:underline">{page.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Pages */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 font-manrope">
                {t('legalPages')}
              </h2>
              <ul className="space-y-4">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-neutral-700 hover:text-[#2EC4B6] hover:underline transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 bg-[#F5EFE7] rounded-2xl text-center">
            <p className="text-neutral-700">
              Need help finding something? <Link href={`/${locale}/contact`} className="text-[#2EC4B6] font-semibold hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
