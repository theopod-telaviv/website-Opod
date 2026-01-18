import { getTranslations } from 'next-intl/server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFAQSchema } from '@/lib/schema';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: 'Frequently Asked Questions | The O Pod Hotel',
    description: 'Find answers to common questions about The O Pod Hotel Tel Aviv. Check-in times, amenities, location, and more.',
  };
}

async function getFAQs() {
  const faqPath = path.join(process.cwd(), 'content/faq.json');
  const content = fs.readFileSync(faqPath, 'utf-8');
  return JSON.parse(content);
}

export default async function FAQPage({ params: { locale } }: { params: { locale: string } }) {
  const faqData = await getFAQs();

  return (
    <>
      <JsonLd data={getFAQSchema(faqData.items, locale)} />

      <section className="py-12 bg-[#F5EFE7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#1C1C1C] mb-4 font-manrope">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-neutral-600">
            Everything you need to know about staying at The O Pod Hotel
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.items.map((item: any, index: number) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-xl border border-neutral-200 px-6">
                <AccordionTrigger className="text-lg font-semibold text-[#1C1C1C] hover:text-[#2EC4B6]">
                  {item.q[locale]}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700">
                  {item.a[locale]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
