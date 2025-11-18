import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} | The O Pod Hotel`,
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">{t('title')}</h1>
          <p className="text-xl text-neutral-600">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1C1C1C] mb-8 font-manrope">{t('getInTouch')}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#2EC4B6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1C] mb-1">{t('phone')}</h3>
                    <a
                      href="tel:0777565350"
                      className="text-neutral-700 hover:text-[#2EC4B6] transition-colors"
                    >
                      {t('phoneNumber')}
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">{t('reception247')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#2EC4B6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1C] mb-1">{t('email')}</h3>
                    <a
                      href="mailto:hello@theopodhotel.com"
                      className="text-neutral-700 hover:text-[#2EC4B6] transition-colors"
                    >
                      {t('emailAddress')}
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">{t('replyTime')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#2EC4B6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1C] mb-1">{t('address')}</h3>
                    <p className="text-neutral-700">{t('addressLine1')}</p>
                    <p className="text-neutral-700">{t('addressLine2')}</p>
                    <p className="text-sm text-neutral-500 mt-1">{t('walkToBeach')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1C] mb-1">{t('whatsapp')}</h3>
                    <p className="text-neutral-700 mb-2">{t('chatInstantly')}</p>
                    <a
                      href="https://wa.me/972585950580"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {t('startChat')}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-[#F5EFE7] rounded-2xl">
                <h3 className="font-bold text-[#1C1C1C] mb-3">{t('openingHours')}</h3>
                <div className="space-y-2 text-neutral-700">
                  <div className="flex justify-between">
                    <span>{t('reception')}</span>
                    <span className="font-semibold">{t('always247')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('checkin')}</span>
                    <span className="font-semibold">{t('from1500')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('checkout')}</span>
                    <span className="font-semibold">{t('until1100')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-neutral-200 rounded-2xl h-[500px] overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.4156799999997!2d34.76939!3d32.07056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c97d4c47e43%3A0x9a5c1c13eacd4b10!2sThe%20O%20Pod%20Hotel!5e0!3m2!1sen!2sil!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The O Pod Hotel Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
