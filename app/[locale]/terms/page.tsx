import { getTranslations } from 'next-intl/server';
import { ScrollText } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: `${t('title')} | The O Pod Hotel`,
    description: t('intro'),
  };
}

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'terms' });

  const sections = [
    { title: t('section1Title'), text: t('section1Text') },
    { title: t('section2Title'), text: t('section2Text') },
    {
      title: t('section3Title'),
      text: '',
      subsections: [
        { title: t('section3subsection1Title'), text: t('section3subsection1Text') },
        { title: t('section3subsection2Title'), text: t('section3subsection2Text') },
        { title: t('section3subsection3Title'), text: t('section3subsection3Text') },
      ]
    },
    { title: t('section4Title'), text: t('section4Text') },
    { title: t('section5Title'), text: t('section5Text') },
    { title: t('section6Title'), text: t('section6Text') },
    { title: t('section7Title'), text: t('section7Text') },
    { title: t('section8Title'), text: t('section8Text') },
    { title: t('section9Title'), text: t('section9Text') },
    { title: t('section10Title'), text: t('section10Text') },
    { title: t('section11Title'), text: t('section11Text') },
    { title: t('section12Title'), text: t('section12Text') },
  ];

  return (
    <>
      <section className="py-8 sm:py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <ScrollText className="h-5 w-5 sm:h-6 sm:w-6 text-[#2EC4B6]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] font-manrope">{t('title')}</h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">{t('lastUpdated')}</p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6 sm:mb-8">
            {t('intro')}
          </p>

          <div className="space-y-6 sm:space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-neutral-100">
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 font-manrope">
                  {section.title}
                </h2>
                {section.text && (
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {section.text}
                  </p>
                )}
                {section.subsections && (
                  <div className="mt-4 space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="pl-4 border-l-2 border-[#2EC4B6]/20">
                        <h3 className="text-base sm:text-lg font-semibold text-[#2EC4B6] mb-2">
                          {subsection.title}
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                          {subsection.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-5 sm:p-6 bg-[#F5EFE7] rounded-xl sm:rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-2 sm:mb-3 text-center">
              {t('contactTitle')}
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 text-center mb-2">
              {t('contactText')}
            </p>
            <p className="text-sm sm:text-base text-neutral-700 text-center">
              📧 <strong className="text-[#2EC4B6]">{t('contactEmail')}</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
