"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: t('capsules'), href: `/${locale}/capsules` },
    { name: t('hotel'), href: `/${locale}/hotel` },
    { name: t('experiences'), href: `/${locale}/experience-tel-aviv` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('faq'), href: `/${locale}/faq` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <img
              src="https://ljzzccjrxialnmbypvox.supabase.co/storage/v1/object/public/images/2-%20images%20site%20web/2-%20logo%20-%20the-o-pod-tel-aviv-hotel-capsule-luxe-experrience-sea-beach.webp"
              alt="The O Pod Hotel Logo"
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold text-[#1C1C1C]">The O Pod Hotel</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-[#2EC4B6] transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LocaleSwitcher locale={locale} />

            <Link href={`/${locale}/capsules`} className="hidden md:block">
              <Button className="bg-[#2EC4B6] hover:bg-[#28b0a3] text-white">
                {t('book')}
              </Button>
            </Link>

            <button
              className="md:hidden text-neutral-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-neutral-700 hover:text-[#2EC4B6] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={`/${locale}/capsules`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full mt-4 bg-[#2EC4B6] hover:bg-[#28b0a3] text-white">
                {t('book')}
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
