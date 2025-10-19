import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'experiences' });
  return {
    title: `${t('bookTour')} | The O Pod Hotel`,
    description: 'Book exciting tours and experiences in Tel Aviv',
  };
}

export default async function ExperienceTelAvivPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'experiences' });

  return (
    <div className="min-h-screen bg-[#F5EFE7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#1C1C1C] font-manrope mb-4">
            {t('bookTour')}
          </h1>
          <p className="text-lg text-neutral-600">
            Discover the best tours and experiences in Tel Aviv
          </p>
        </div>

        {/* Modern Frame with Iframe */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-neutral-200">
          <div className="relative w-full" style={{ minHeight: '800px' }}>
            <iframe
              src="https://www.beinharimtours.com/iframe/?SessionId=99309507-01fe-4275-972b-b70ce80aaa01"
              className="w-full rounded-2xl border-0"
              style={{ minHeight: '800px', height: '100vh' }}
              title={t('bookTour')}
              loading="lazy"
              allow="payment; geolocation"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-[#2EC4B6]/10 rounded-2xl p-6">
          <p className="text-center text-neutral-700">
            Book your tours directly through our trusted partner. All prices are in USD and include VAT.
          </p>
        </div>
      </div>
    </div>
  );
}
