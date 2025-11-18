"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

interface FooterProps {
  locale: string;
}

export function Footer({ locale: initialLocale }: FooterProps) {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-[#1C1C1C] text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#F5EFE7]">The O Pod Hotel</h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>{t('address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${t('phone')}`} className="hover:text-[#2EC4B6] transition-colors">
                  {t('phone')}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${t('email')}`} className="hover:text-[#2EC4B6] transition-colors">
                  {t('email')}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F5EFE7]">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link href={`/${locale}/capsules`} className="hover:text-[#2EC4B6] transition-colors">
                  Capsules
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/hotel`} className="hover:text-[#2EC4B6] transition-colors">
                  The Hotel
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/experience-tel-aviv`} className="hover:text-[#2EC4B6] transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-[#2EC4B6] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[#2EC4B6] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F5EFE7]">{t('legal')}</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-[#2EC4B6] transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-[#2EC4B6] transition-colors">
                  {t('termsConditions')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/accessibility`} className="hover:text-[#2EC4B6] transition-colors">
                  {t('accessibility')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sitemap-page`} className="hover:text-[#2EC4B6] transition-colors">
                  {t('sitemap')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F5EFE7]">{t('followUs')}</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/theopodhotel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2EC4B6] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/theopodhotel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2EC4B6] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} The O Pod Hotel. {t('rights')}.</p>
          <p className="mt-2">
            {t('madeBy')}{' '}
            <a
              href="https://webfityou.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:text-[#2EC4B6] transition-colors"
            >
              WebFitYou
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
