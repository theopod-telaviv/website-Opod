"use client";

import { useState } from "react";
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
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentReviews = () => {
    const start = currentIndex * reviewsPerPage;
    const end = start + reviewsPerPage;
    return reviews.slice(start, end);
  };

  return (
    <div className="relative">
      {/* Reviews Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {getCurrentReviews().map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#C9A227] text-[#C9A227]" />
              ))}
            </div>
            <p className="text-neutral-700 mb-4 min-h-[100px]">
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

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrev}
          className="rounded-full h-12 w-12 border-2 border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[#2EC4B6]"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full h-12 w-12 border-2 border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
