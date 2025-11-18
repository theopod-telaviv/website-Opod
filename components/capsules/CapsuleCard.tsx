"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { ImageModal } from "@/components/ui/image-modal";
import { Users, Eye, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface CapsuleCardProps {
  capsule: {
    id: string;
    name: Record<string, string>;
    slug: string;
    occupancy: number;
    sea_view: boolean;
    accessible: boolean;
    balcony: boolean;
    price_from: Record<string, number>;
    images: string[];
    short: Record<string, string>;
  };
  locale: string;
  currency?: string;
}

export function CapsuleCard({ capsule, locale, currency = 'ILS' }: CapsuleCardProps) {
  const t = useTranslations('capsules');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative">
          <ImageCarousel
            images={capsule.images}
            alt={capsule.name[locale]}
            onImageClick={handleImageClick}
            showZoomIcon={true}
          />
          <div className="absolute top-4 right-4 flex gap-2 z-10 pointer-events-none">
            {capsule.sea_view && (
              <Badge className="bg-[#2EC4B6] text-white">
                <Eye className="h-3 w-3 mr-1" />
                {t('seaview')}
              </Badge>
            )}
            {capsule.accessible && (
              <Badge className="bg-[#1C1C1C] text-white">{t('accessible')}</Badge>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          <Link href={`/${locale}/capsules/${capsule.slug}`}>
            <h3 className="text-2xl font-semibold text-[#1C1C1C] mb-2 hover:text-[#2EC4B6] transition-colors">
              {capsule.name[locale]}
            </h3>
          </Link>

          <p className="text-neutral-600 mb-4 line-clamp-2">{capsule.short[locale]}</p>

          <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{capsule.occupancy} {capsule.occupancy === 1 ? t('person') : t('people')}</span>
            </div>
            {capsule.balcony && (
              <div className="flex items-center gap-1">
                <Maximize2 className="h-4 w-4" />
                <span>{t('balcony')}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">{t('from')}</p>
              <p className="text-2xl font-bold text-[#2EC4B6]">
                {capsule.price_from[currency]} {currency}{t('excludingVat')}
                <span className="text-sm font-normal text-neutral-500">/{t('night')}</span>
              </p>
            </div>

            <Link href={`/${locale}/capsules/${capsule.slug}`}>
              <Button className="bg-[#2EC4B6] hover:bg-[#28b0a3] text-white">
                {t('details')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <ImageModal
        images={capsule.images}
        initialIndex={selectedImageIndex}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        alt={capsule.name[locale]}
      />
    </>
  );
}
