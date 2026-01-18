'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  onImageClick?: (index: number) => void;
  className?: string;
  showZoomIcon?: boolean;
}

export function ImageCarousel({
  images,
  alt,
  onImageClick,
  className,
  showZoomIcon = false
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  };

  if (images.length === 0) {
    return (
      <div className={cn("relative h-64 w-full overflow-hidden bg-neutral-200", className)}>
        <Image
          src="/images/placeholder.jpg"
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative group", className)}>
      <div
        className="relative h-64 w-full overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Zoom Icon */}
        {showZoomIcon && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-[#2EC4B6] rounded-full p-3 hover:scale-110 cursor-pointer">
              <ZoomIn className="h-6 w-6 text-[#1C1C1C] group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "border-0 hover:scale-110"
            )}
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-[#1C1C1C]" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "border-0 hover:scale-110"
            )}
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-[#1C1C1C]" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
