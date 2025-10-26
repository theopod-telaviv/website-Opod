"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset position when we've scrolled past the first set of reviews
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-hidden"
        style={{
          scrollBehavior: 'auto',
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className="flex-shrink-0 w-[350px] bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#C9A227] text-[#C9A227]" />
              ))}
            </div>
            <p className="text-neutral-700 mb-4">
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
  );
}
