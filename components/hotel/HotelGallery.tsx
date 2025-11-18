'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from '@/components/ui/image-modal';
import { Button } from '@/components/ui/button';
import { ZoomIn } from 'lucide-react';

interface HotelGalleryProps {
  images: string[];
  translations: {
    title: string;
    viewMore: string;
    viewAll: string;
    showLess: string;
  };
}

export function HotelGallery({ images, translations }: HotelGalleryProps) {
  const [displayCount, setDisplayCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    if (displayCount === 6) {
      setDisplayCount(9);
    } else if (displayCount === 9) {
      setDisplayCount(images.length);
    } else {
      setDisplayCount(6);
    }
  };

  const getButtonText = () => {
    if (displayCount === 6) {
      return translations.viewMore;
    } else if (displayCount === 9) {
      return translations.viewAll;
    } else {
      return translations.showLess;
    }
  };

  const visibleImages = images.slice(0, displayCount);

  return (
    <>
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-[#1C1C1C] mb-12 text-center font-manrope">
          {translations.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt={`Hotel gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                  <div className="bg-white/90 hover:bg-[#2EC4B6] rounded-full p-4 transition-all duration-300 hover:scale-110">
                    <ZoomIn className="h-8 w-8 text-[#1C1C1C] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Image Number Badge */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {images.length > 6 && (
          <div className="text-center">
            <Button
              onClick={handleLoadMore}
              className="bg-[#2EC4B6] hover:bg-[#28b0a3] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {getButtonText()}
              <span className="ml-2">
                ({displayCount === images.length ? images.length : displayCount}/{images.length})
              </span>
            </Button>
          </div>
        )}
      </div>

      <ImageModal
        images={images}
        initialIndex={selectedImageIndex}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        alt="Hotel gallery"
      />
    </>
  );
}
