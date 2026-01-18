import { getTranslations } from 'next-intl/server';
import { FileText } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: `${t('title')} | The O Pod Hotel`,
    description: t('intro'),
  };
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <>
      <section className="py-8 sm:py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-[#2EC4B6]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] font-manrope">{t('title')}</h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">{t('lastUpdated')}</p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-base sm:prose-lg max-w-none">
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6 sm:mb-8">
              {t('intro')}
            </p>

            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div key={num} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-neutral-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 font-manrope">
                    {t(`section${num}Title`)}
                  </h2>
                  <div className="text-sm sm:text-base text-neutral-700 leading-relaxed whitespace-pre-line break-words">
                    {t(`section${num}Text`)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-[#F5EFE7] rounded-xl sm:rounded-2xl">
              <p className="text-sm sm:text-base text-neutral-700 text-center break-words">
                📧 <strong>Contact:</strong> opodhotel@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
