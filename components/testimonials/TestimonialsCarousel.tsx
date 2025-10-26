"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  name: string;
  date: string;
  country: {
    en: string;
    fr: string;
    he: string;
  };
  rating: number;
  text: {
    en: string;
    fr: string;
    he: string;
  };
}

interface TestimonialsCarouselProps {
  reviews: Review[];
  locale: string;
}

export function TestimonialsCarousel({ reviews, locale }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Calculate how many reviews to show per page
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    autoScrollInterval.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [goToNext]);

  // Reset auto-scroll when user interacts
  const resetAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    autoScrollInterval.current = setInterval(() => {
      goToNext();
    }, 5000);
  };

  // Touch/Mouse handlers for swipe
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    resetAutoScroll();
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than 100px, change slide
    if (translateX > 100) {
      goToPrev();
    } else if (translateX < -100) {
      goToNext();
    }

    setTranslateX(0);
  };

  // Get reviews for current page
  const getCurrentReviews = () => {
    const start = currentIndex * reviewsPerPage;
    const end = start + reviewsPerPage;
    return reviews.slice(start, end);
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {getCurrentReviews().map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="bg-white rounded-2xl p-6 shadow-lg select-none"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 min-h-[120px]">
                  {review.text[locale as keyof typeof review.text]}
                </p>
                <div>
                  <p className="font-semibold text-[#1C1C1C]">{review.name}</p>
                  <p className="text-sm text-neutral-500">
                    {review.country[locale as keyof typeof review.country]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            goToPrev();
            resetAutoScroll();
          }}
          className="rounded-full h-12 w-12 border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetAutoScroll();
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[#C9A227]"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            goToNext();
            resetAutoScroll();
          }}
          className="rounded-full h-12 w-12 border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
