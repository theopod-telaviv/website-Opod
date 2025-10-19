"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations('cookies');

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center">
                <Cookie className="h-6 w-6 text-[#2EC4B6]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2 font-manrope">
                {t('title')}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={acceptCookies}
                className="bg-[#2EC4B6] hover:bg-[#28b0a3] text-white whitespace-nowrap"
              >
                {t('accept')}
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 whitespace-nowrap"
              >
                {t('decline')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
