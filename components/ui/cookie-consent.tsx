"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Cookie, X, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
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
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                {t('description')}
              </p>

              {/* Learn More Button */}
              <Dialog open={showPolicy} onOpenChange={setShowPolicy}>
                <DialogTrigger asChild>
                  <button className="text-sm text-[#2EC4B6] hover:text-[#28b0a3] font-medium flex items-center gap-1 transition-colors">
                    <FileText className="h-4 w-4" />
                    {t('learnMore')}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#1C1C1C]">
                      {t('privacyPolicy.title')}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-neutral-600">
                      {t('privacyPolicy.subtitle')}
                      <br />
                      {t('privacyPolicy.lastUpdated')}
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-6">
                      {/* Section 1 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section1.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section1.content')}
                        </p>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section2.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section2.content')}
                        </p>
                      </div>

                      {/* Section 3 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section3.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section3.content')}
                        </p>
                      </div>

                      {/* Section 4 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section4.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section4.content')}
                        </p>
                      </div>

                      {/* Section 5 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section5.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section5.content')}
                        </p>
                      </div>

                      {/* Section 6 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section6.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section6.content')}
                        </p>
                      </div>

                      {/* Section 7 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section7.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section7.content')}
                        </p>
                      </div>

                      {/* Section 8 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section8.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section8.content')}
                        </p>
                      </div>

                      {/* Section 9 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section9.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section9.content')}
                        </p>
                      </div>

                      {/* Section 10 */}
                      <div>
                        <h4 className="font-bold text-[#1C1C1C] mb-2">
                          {t('privacyPolicy.section10.title')}
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {t('privacyPolicy.section10.content')}
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
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
