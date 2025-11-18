import { getTranslations } from 'next-intl/server';
import { Accessibility } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'accessibilityPage' });
  return {
    title: `${t('title')} | The O Pod Hotel`,
    description: t('intro'),
  };
}

export default async function AccessibilityPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'accessibilityPage' });

  return (
    <>
      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center">
              <Accessibility className="h-6 w-6 text-[#2EC4B6]" />
            </div>
            <h1 className="text-5xl font-bold text-[#1C1C1C] font-manrope">{t('title')}</h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-neutral-700 leading-relaxed mb-8">
            {t('intro')}
          </p>

          <div className="space-y-8">
            {['section1', 'section2', 'section3', 'section4', 'section5'].map((section) => (
              <div key={section} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4 font-manrope">
                  {t(`${section}Title`)}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t(`${section}Text`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#F5EFE7] rounded-2xl">
            <p className="text-neutral-700 text-center">
              📧 <strong>Contact:</strong> hello@theopodhotel.com | 📞 077-756-5350
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
