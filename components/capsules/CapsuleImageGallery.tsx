'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from '@/components/ui/image-modal';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CapsuleImageGalleryProps {
  images: string[];
  alt: string;
}

export function CapsuleImageGallery({ images, alt }: CapsuleImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentMainImage, setCurrentMainImage] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMainImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className="mb-8">
        <div className="relative h-96 rounded-2xl overflow-hidden bg-neutral-200">
          <Image
            src="/images/placeholder.jpg"
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        {/* Main Image */}
        <div
          className="relative h-96 rounded-2xl overflow-hidden mb-4 cursor-pointer group"
          onClick={() => handleImageClick(currentMainImage)}
        >
          <Image
            src={images[currentMainImage]}
            alt={`${alt} - Main Image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />

          {/* Zoom Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4">
              <ZoomIn className="h-8 w-8 text-[#1C1C1C]" />
            </div>
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentMainImage + 1} / {images.length}
            </div>
          )}

          {/* Navigation Arrows for Main Image */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  "border-0 hover:scale-110"
                )}
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-[#1C1C1C]" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  "border-0 hover:scale-110"
                )}
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-[#1C1C1C]" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.slice(0, 4).map((image: string, index: number) => (
              <div
                key={index}
                className={cn(
                  "relative h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  index === currentMainImage && "ring-2 ring-[#2EC4B6] scale-105"
                )}
                onClick={() => setCurrentMainImage(index)}
              >
                <Image
                  src={image}
                  alt={`${alt} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                {index === 3 && images.length > 4 && (
                  <div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(0);
                    }}
                  >
                    +{images.length - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageModal
        images={images}
        initialIndex={selectedImageIndex}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        alt={alt}
      />
    </>
  );
}
